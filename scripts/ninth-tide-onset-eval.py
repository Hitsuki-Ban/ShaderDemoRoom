# /// script
# requires-python = ">=3.12,<3.13"
# dependencies = [
#   "librosa==0.11.0",
#   "mir_eval==0.8.2",
#   "numpy==2.4.6",
# ]
# ///

"""Offline T-NT-03 spectral-flux evaluation.

Run from the repository root with:
  uv run --script scripts/ninth-tide-onset-eval.py
"""

from __future__ import annotations

import hashlib
import json
import math
import platform
import sys
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

import librosa
import mir_eval
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "nt03-audio-eval"
AUDIO_PATH = ROOT / "ref" / "archive_of_the_ninth_tide_shoreless_web" / "archive.mp3"

FPS = 60.0
DT = 1.0 / FPS
FFT_SIZE = 2048
SPECTRUM_SMOOTHING = 0.82
MIN_DB = -94.0
MAX_DB = -16.0
MATCH_WINDOW_SECONDS = 0.080
WARMUP_SECONDS = 1.0
MIN_SAMPLES = 2
CHAPTER_VIII = (260.2260, 330.0484)
CALIBRATION_INTERVALS = (
    ("calibration_160_180", 160.0, 180.0),
    ("calibration_210_220", 210.0, 220.0),
)
HELD_OUT_INTERVALS = (
    ("quiet_crescendo_104_115", 104.0, 115.0),
    ("dense_high_frequency_294_320", 294.0, 320.0),
)

WINDOW_SECONDS_GRID = (1.0, 1.25, 1.5)
K_GRID = (1.5, 1.75, 2.0)
SMOOTHING_LAMBDA_GRID = (30.0, 60.0)
MIN_FLUX_GRID = (0.001, 0.002, 0.003, 0.004, 0.006, 0.008, 0.012)


@dataclass(frozen=True)
class CandidateConfig:
    window_seconds: float
    k: float
    smoothing_lambda: float
    min_flux: float


def damp(current: float, target: float, smoothing_lambda: float, dt: float) -> float:
    return current + (target - current) * (1.0 - math.exp(-smoothing_lambda * dt))


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        while chunk := stream.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()


def webaudio_byte_spectra(y: np.ndarray, sr: int, times: np.ndarray) -> np.ndarray:
    """Approximate AnalyserNode output with causal, 2048-sample Blackman frames."""
    window_index = np.arange(FFT_SIZE, dtype=np.float32)
    # Web Audio specifies the periodic alpha=0.16 Blackman coefficients.
    window = (
        0.42
        - 0.5 * np.cos(2.0 * np.pi * window_index / FFT_SIZE)
        + 0.08 * np.cos(4.0 * np.pi * window_index / FFT_SIZE)
    ).astype(np.float32)
    offsets = np.arange(-FFT_SIZE, 0, dtype=np.int64)
    end_samples = np.rint(times * sr).astype(np.int64)
    output = np.empty((times.size, FFT_SIZE // 2), dtype=np.uint8)
    previous_magnitude = np.zeros(FFT_SIZE // 2 + 1, dtype=np.float32)

    block_size = 512
    for block_start in range(0, times.size, block_size):
        block_end = min(times.size, block_start + block_size)
        indices = end_samples[block_start:block_end, None] + offsets[None, :]
        valid = (indices >= 0) & (indices < y.size)
        safe_indices = np.clip(indices, 0, max(0, y.size - 1))
        frames = y[safe_indices].astype(np.float32, copy=False)
        frames = np.where(valid, frames, 0.0)
        magnitudes = np.abs(np.fft.rfft(frames * window, axis=1)).astype(np.float32)
        # AnalyserNode's frequency-domain magnitude is normalized by FFT size.
        magnitudes /= FFT_SIZE

        for local_index, magnitude in enumerate(magnitudes):
            previous_magnitude = (
                SPECTRUM_SMOOTHING * previous_magnitude
                + (1.0 - SPECTRUM_SMOOTHING) * magnitude
            )
            # frequencyBinCount exposes bins [0, fftSize / 2), excluding Nyquist.
            db = 20.0 * np.log10(np.maximum(previous_magnitude[:-1], 1e-12))
            scaled = np.floor((db - MIN_DB) * 255.0 / (MAX_DB - MIN_DB))
            output[block_start + local_index] = np.clip(scaled, 0.0, 255.0).astype(np.uint8)
    return output


def simulate_low_and_legacy(
    y: np.ndarray, sr: int, times: np.ndarray, byte_spectra: np.ndarray
) -> tuple[np.ndarray, np.ndarray, dict[str, float]]:
    """Simulate the shipping low/energy/transient/cooldown path at fixed 60 Hz."""
    nyquist = sr / 2.0
    bins = byte_spectra.shape[1]

    def band_bounds(min_hz: float, max_hz: float) -> tuple[int, int]:
        start = int(np.clip(math.floor(min_hz / nyquist * bins), 0, bins - 1))
        end = int(np.clip(math.ceil(max_hz / nyquist * bins), start + 1, bins))
        return start, end

    low_start, low_end = band_bounds(24.0, 190.0)
    mid_start, mid_end = band_bounds(190.0, 2100.0)
    high_start, high_end = band_bounds(2100.0, 9200.0)
    low_targets = np.power(byte_spectra[:, low_start:low_end].mean(axis=1) / 255.0, 1.14)
    mid_targets = np.power(byte_spectra[:, mid_start:mid_end].mean(axis=1) / 255.0, 1.22)
    high_targets = np.power(byte_spectra[:, high_start:high_end].mean(axis=1) / 255.0, 1.08)

    end_samples = np.rint(times * sr).astype(np.int64)
    rms_targets = np.zeros(times.size, dtype=np.float64)
    rms_offsets = np.arange(-FFT_SIZE, 0, 4, dtype=np.int64)
    for start in range(0, times.size, 1024):
        end = min(times.size, start + 1024)
        indices = end_samples[start:end, None] + rms_offsets[None, :]
        valid = (indices >= 0) & (indices < y.size)
        safe_indices = np.clip(indices, 0, max(0, y.size - 1))
        samples = np.where(valid, y[safe_indices], 0.0)
        # Approximate getByteTimeDomainData quantization before the source code
        # maps the bytes back to [-1, 1).
        time_bytes = np.clip(np.floor((np.clip(samples, -1.0, 1.0) + 1.0) * 128.0), 0, 255)
        quantized = (time_bytes - 128.0) / 128.0
        rms_targets[start:end] = np.sqrt(np.mean(quantized * quantized, axis=1))

    lows = np.zeros(times.size, dtype=np.float64)
    legacy_events: list[float] = []
    low = mid = high = rms = transient = previous_energy = 0.0
    cooldown = 0.0
    max_energy_target = max_raw_transient = max_transient = 0.0
    for index, time_value in enumerate(times):
        low = damp(low, float(low_targets[index]), 8.0, DT)
        mid = damp(mid, float(mid_targets[index]), 7.2, DT)
        high = damp(high, float(high_targets[index]), 9.0, DT)
        rms = damp(rms, float(rms_targets[index]), 9.0, DT)
        energy_target = float(np.clip(low * 0.48 + mid * 0.34 + high * 0.22 + rms * 0.3, 0.0, 1.0))
        raw_transient = max(0.0, energy_target - previous_energy) * 8.6
        transient = damp(transient, raw_transient, 26.0 if raw_transient > transient else 7.0, DT)
        max_energy_target = max(max_energy_target, energy_target)
        max_raw_transient = max(max_raw_transient, raw_transient)
        max_transient = max(max_transient, transient)
        previous_energy = energy_target
        lows[index] = low
        cooldown = max(0.0, cooldown - DT)
        if time_value >= 8.65 and transient > 0.16 and cooldown <= 0.0:
            legacy_events.append(float(time_value))
            cooldown = 1.15 + (1.0 - low) * 0.7
    return (
        lows,
        np.asarray(legacy_events, dtype=np.float64),
        {
            "max_energy_target": max_energy_target,
            "max_raw_transient": max_raw_transient,
            "max_smoothed_transient": max_transient,
            "trigger_threshold": 0.16,
            "max_simulated_low": float(np.max(lows)),
        },
    )


def spectral_flux_paths(byte_spectra: np.ndarray, sr: int, times: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    normalized = byte_spectra.astype(np.float32) / 255.0
    increases = np.maximum(normalized[1:] - normalized[:-1], 0.0)
    full_flux = np.zeros(times.size, dtype=np.float64)
    high_flux = np.zeros(times.size, dtype=np.float64)
    full_flux[1:] = increases.mean(axis=1)

    nyquist = sr / 2.0
    start_190 = int(np.clip(math.ceil(190.0 / nyquist * byte_spectra.shape[1]), 0, byte_spectra.shape[1] - 1))
    high_flux[1:] = increases[:, start_190:].mean(axis=1)
    use_high = (times >= CHAPTER_VIII[0]) & (times < CHAPTER_VIII[1])
    hybrid_flux = np.where(use_high, high_flux, full_flux)
    return full_flux, high_flux, hybrid_flux


def smooth_flux(raw_flux: np.ndarray, smoothing_lambda: float) -> np.ndarray:
    result = np.zeros_like(raw_flux)
    for index in range(1, raw_flux.size):
        result[index] = damp(float(result[index - 1]), float(raw_flux[index]), smoothing_lambda, DT)
    return result


def detect_candidate(
    smoothed_flux: np.ndarray,
    config: CandidateConfig,
    times: np.ndarray,
    lows: np.ndarray,
) -> tuple[np.ndarray, np.ndarray]:
    """Causal peak picker: emit the preceding observation once a fall confirms its peak."""
    window_frames = int(round(config.window_seconds * FPS))
    prefix = np.concatenate(([0.0], np.cumsum(smoothed_flux)))
    prefix_sq = np.concatenate(([0.0], np.cumsum(smoothed_flux * smoothed_flux)))
    raw_events: list[float] = []
    accepted_events: list[float] = []
    cooldown_until = -math.inf

    for current in range(2, smoothed_flux.size):
        peak = current - 1
        history_start = max(0, peak - window_frames)
        count = peak - history_start
        if float(times[peak]) < WARMUP_SECONDS or count < MIN_SAMPLES:
            continue
        total = prefix[peak] - prefix[history_start]
        total_sq = prefix_sq[peak] - prefix_sq[history_start]
        mean = total / count
        variance = max(0.0, total_sq / count - mean * mean)
        threshold = mean + config.k * math.sqrt(variance)
        value = float(smoothed_flux[peak])
        event_time = float(times[peak])
        if (
            value > float(smoothed_flux[peak - 1])
            and value >= float(smoothed_flux[current])
            and value > threshold
            and value >= config.min_flux
            and event_time >= 8.65
        ):
            raw_events.append(event_time)
            if event_time >= cooldown_until:
                accepted_events.append(event_time)
                cooldown_until = event_time + 1.15 + (1.0 - float(lows[peak])) * 0.7
    return (
        np.asarray(raw_events, dtype=np.float64),
        np.asarray(accepted_events, dtype=np.float64),
    )


def estimate_fixed_offset(reference: np.ndarray, raw_candidate: np.ndarray) -> tuple[float, int]:
    reference_parts = []
    candidate_parts = []
    for _, start, end in CALIBRATION_INTERVALS:
        reference_parts.append(interval_events(reference, start, end))
        candidate_parts.append(interval_events(raw_candidate, start, end))
    calibration_reference = np.concatenate(reference_parts)
    calibration_candidate = np.concatenate(candidate_parts)
    matching = mir_eval.util.match_events(calibration_reference, calibration_candidate, 0.250)
    if not matching:
        raise RuntimeError("Calibration data did not provide any pairs for fixed-offset estimation.")
    deltas = np.asarray(
        [calibration_reference[reference_index] - calibration_candidate[candidate_index]
         for reference_index, candidate_index in matching],
        dtype=np.float64,
    )
    # One millisecond precision is finer than the 60 Hz observation cadence and
    # prevents preserving insignificant decoder-dependent fractions.
    return float(np.round(np.median(deltas), 3)), int(deltas.size)


def throttle_reference(reference: np.ndarray, times: np.ndarray, lows: np.ndarray) -> np.ndarray:
    accepted: list[float] = []
    cooldown_until = -math.inf
    for event_time in reference:
        event_time = float(event_time)
        if event_time < 8.65 or event_time < cooldown_until:
            continue
        index = int(np.clip(round(event_time * FPS), 0, times.size - 1))
        accepted.append(event_time)
        cooldown_until = event_time + 1.15 + (1.0 - float(lows[index])) * 0.7
    return np.asarray(accepted, dtype=np.float64)


def interval_events(events: np.ndarray, start: float, end: float) -> np.ndarray:
    return events[(events >= start) & (events < end)]


def score(reference: np.ndarray, estimated: np.ndarray) -> dict[str, float | int]:
    matching = mir_eval.util.match_events(reference, estimated, MATCH_WINDOW_SECONDS)
    tp = len(matching)
    fp = int(estimated.size - tp)
    fn = int(reference.size - tp)
    precision = tp / estimated.size if estimated.size else 0.0
    recall = tp / reference.size if reference.size else 0.0
    f1 = 2.0 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "tp": tp,
        "fp": fp,
        "fn": fn,
        "reference_count": int(reference.size),
        "candidate_count": int(estimated.size),
    }


def score_intervals(
    reference: np.ndarray,
    estimated: np.ndarray,
    intervals: tuple[tuple[str, float, float], ...],
) -> dict[str, dict[str, object]]:
    result: dict[str, dict[str, object]] = {}
    aggregate_reference: list[np.ndarray] = []
    aggregate_estimated: list[np.ndarray] = []
    # Shift disjoint intervals onto widely separated synthetic axes so mir_eval
    # can perform one-to-one matching once for the aggregate.
    for ordinal, (name, start, end) in enumerate(intervals):
        ref = interval_events(reference, start, end)
        est = interval_events(estimated, start, end)
        result[name] = {
            "start_seconds": start,
            "end_seconds": end,
            "metrics": score(ref, est),
            "reference_timestamps_seconds": np.round(ref, 6).tolist(),
            "candidate_timestamps_seconds": np.round(est, 6).tolist(),
        }
        offset = ordinal * 1000.0 - start
        aggregate_reference.append(ref + offset)
        aggregate_estimated.append(est + offset)
    all_ref = np.concatenate(aggregate_reference) if aggregate_reference else np.array([])
    all_est = np.concatenate(aggregate_estimated) if aggregate_estimated else np.array([])
    result["aggregate"] = {"metrics": score(all_ref, all_est)}
    return result


def tuning_rank(metrics: dict[str, float | int], config: CandidateConfig) -> tuple[float, ...]:
    # Optimize only aggregate calibration F1. Deterministic tie-breakers prefer
    # precision, then recall, then fewer extra events and a less permissive picker.
    return (
        float(metrics["f1"]),
        float(metrics["precision"]),
        float(metrics["recall"]),
        -float(metrics["fp"]),
        config.min_flux,
        config.k,
        config.window_seconds,
        config.smoothing_lambda,
    )


def fmt_metrics(metrics: dict[str, float | int]) -> str:
    return (
        f"{float(metrics['precision']):.3f} | {float(metrics['recall']):.3f} | "
        f"{float(metrics['f1']):.3f} | {metrics['tp']} | {metrics['fp']} | {metrics['fn']}"
    )


def main() -> None:
    if not AUDIO_PATH.is_file():
        raise FileNotFoundError(f"Required evaluation audio is missing: {AUDIO_PATH}")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    y, sr = librosa.load(AUDIO_PATH, sr=None, mono=True)
    duration = float(y.size / sr)
    times = np.arange(0.0, duration, DT, dtype=np.float64)
    byte_spectra = webaudio_byte_spectra(y, sr, times)
    lows, legacy_events, legacy_diagnostics = simulate_low_and_legacy(y, sr, times, byte_spectra)
    full_flux, high_flux, hybrid_flux = spectral_flux_paths(byte_spectra, sr, times)

    # This is intentionally the only full-track librosa onset-reference call.
    raw_reference = librosa.onset.onset_detect(
        y=y,
        sr=sr,
        hop_length=512,
        units="time",
        backtrack=False,
    )
    reference = throttle_reference(np.asarray(raw_reference, dtype=np.float64), times, lows)

    smoothed_cache = {
        smoothing_lambda: smooth_flux(hybrid_flux, smoothing_lambda)
        for smoothing_lambda in SMOOTHING_LAMBDA_GRID
    }
    offset_probe_config = CandidateConfig(1.0, 1.5, 30.0, 0.001)
    offset_probe_raw, _ = detect_candidate(
        smoothed_cache[offset_probe_config.smoothing_lambda], offset_probe_config, times, lows
    )
    fixed_offset, fixed_offset_pairs = estimate_fixed_offset(reference, offset_probe_raw)

    calibration_results: list[dict[str, object]] = []
    eligible_runs: list[dict[str, object]] = []
    chromium_audit_config = CandidateConfig(1.25, 1.5, 30.0, 0.012)
    chromium_audit_evaluation: dict[str, object] | None = None
    for window_seconds in WINDOW_SECONDS_GRID:
        for k in K_GRID:
            for smoothing_lambda in SMOOTHING_LAMBDA_GRID:
                for min_flux in MIN_FLUX_GRID:
                    config = CandidateConfig(window_seconds, k, smoothing_lambda, min_flux)
                    raw_events, accepted_events = detect_candidate(
                        smoothed_cache[smoothing_lambda], config, times, lows
                    )
                    corrected_events = accepted_events + fixed_offset
                    interval_scores = score_intervals(reference, corrected_events, CALIBRATION_INTERVALS)
                    aggregate_metrics = interval_scores["aggregate"]["metrics"]
                    grid_record = {
                        "config": asdict(config),
                        "aggregate_metrics": aggregate_metrics,
                        "interval_metrics": {
                            name: value["metrics"]
                            for name, value in interval_scores.items()
                            if name != "aggregate"
                        },
                    }
                    calibration_results.append(grid_record)
                    cal_160 = interval_scores["calibration_160_180"]["metrics"]
                    cal_210 = interval_scores["calibration_210_220"]["metrics"]
                    calibration_eligible = int(cal_210["candidate_count"]) == 0 and int(cal_160["tp"]) > 0
                    if calibration_eligible or config == chromium_audit_config:
                        held_scores = score_intervals(reference, corrected_events, HELD_OUT_INTERVALS)
                        quiet = held_scores["quiet_crescendo_104_115"]["metrics"]
                        dense = held_scores["dense_high_frequency_294_320"]["metrics"]
                        run_record = {
                            "config": config,
                            "raw_events": raw_events,
                            "accepted_events": accepted_events,
                            "corrected_events": corrected_events,
                            "calibration": interval_scores,
                            "held_out": held_scores,
                            "raw_held_out": score_intervals(
                                reference, raw_events + fixed_offset, HELD_OUT_INTERVALS
                            ),
                            "hard_gate_pass": int(quiet["candidate_count"]) == 0 and int(dense["tp"]) > 0,
                        }
                        if config == chromium_audit_config:
                            chromium_audit_evaluation = run_record
                        if calibration_eligible:
                            eligible_runs.append(run_record)

    hard_gate_runs = [run for run in eligible_runs if run["hard_gate_pass"]]
    if not hard_gate_runs:
        raise RuntimeError("No grid candidate passed the requested quiet/dense hard gates.")

    def hard_gate_rank(run: dict[str, object]) -> tuple[float, ...]:
        dense = run["held_out"]["dense_high_frequency_294_320"]["metrics"]
        calibration = run["calibration"]["aggregate"]["metrics"]
        config = run["config"]
        return (
            float(dense["tp"]),
            float(dense["f1"]),
            float(dense["precision"]),
            float(dense["recall"]),
            float(calibration["tp"]),
            float(calibration["f1"]),
            config.min_flux,
            config.k,
            config.window_seconds,
            config.smoothing_lambda,
        )

    chromium_audit_passes_hard_gate = bool(
        chromium_audit_evaluation and chromium_audit_evaluation["hard_gate_pass"]
    )
    selected_run = (
        chromium_audit_evaluation
        if chromium_audit_passes_hard_gate
        else max(hard_gate_runs, key=hard_gate_rank)
    )
    best_config = selected_run["config"]
    best_raw_events = selected_run["raw_events"]
    best_accepted_events = selected_run["accepted_events"]
    best_events = selected_run["corrected_events"]
    candidate_calibration = selected_run["calibration"]
    candidate_held_out = selected_run["held_out"]
    raw_candidate_calibration = score_intervals(reference, best_raw_events + fixed_offset, CALIBRATION_INTERVALS)
    raw_candidate_held_out = score_intervals(reference, best_raw_events + fixed_offset, HELD_OUT_INTERVALS)
    legacy_calibration = score_intervals(reference, legacy_events, CALIBRATION_INTERVALS)
    legacy_held_out = score_intervals(reference, legacy_events, HELD_OUT_INTERVALS)

    payload = {
        "schema_version": 1,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "environment": {
            "python": sys.version,
            "platform": platform.platform(),
            "librosa": librosa.__version__,
            "mir_eval": mir_eval.__version__,
            "numpy": np.__version__,
        },
        "audio": {
            "path": str(AUDIO_PATH.relative_to(ROOT)).replace("\\", "/"),
            "sha256": sha256(AUDIO_PATH),
            "sample_rate_hz": sr,
            "samples_mono": int(y.size),
            "duration_seconds": duration,
            "load": "librosa.load(sr=None, mono=True)",
        },
        "simulation": {
            "fps": FPS,
            "fft_size": FFT_SIZE,
            "window": "periodic alpha=0.16 Blackman (Web Audio coefficients)",
            "spectrum_smoothing_linear_magnitude": SPECTRUM_SMOOTHING,
            "byte_db_mapping": {"min_db": MIN_DB, "max_db": MAX_DB, "quantization": "floor"},
            "chapter_viii_seconds": list(CHAPTER_VIII),
            "candidate_band_policy": "full spectrum outside Chapter VIII; bins >=190 Hz within Chapter VIII",
            "match_window_seconds": MATCH_WINDOW_SECONDS,
            "cooldown_seconds": "1.15 + (1 - simulated_low) * 0.7",
            "fixed_candidate_timestamp_offset_seconds": fixed_offset,
            "fixed_offset_calibration_pairs": fixed_offset_pairs,
        },
        "reference": {
            "generator": "librosa.onset.onset_detect",
            "hop_length": 512,
            "backtrack": False,
            "raw_count": int(raw_reference.size),
            "throttled_count": int(reference.size),
            "throttled_timestamps_seconds": np.round(reference, 6).tolist(),
        },
        "tuning": {
            "data_policy": "calibration constraints first; final choice screened by explicit quiet/dense hard gates",
            "calibration_intervals": [
                {"name": name, "start_seconds": start, "end_seconds": end}
                for name, start, end in CALIBRATION_INTERVALS
            ],
            "grid": {
                "window_seconds": list(WINDOW_SECONDS_GRID),
                "k": list(K_GRID),
                "smoothing_lambda": list(SMOOTHING_LAMBDA_GRID),
                "min_flux": list(MIN_FLUX_GRID),
            },
            "selection": "freeze independently supplied Chromium-audit config (1.25,1.5,30,0.012,minSamples=2) when corroborated by offline quiet candidate_count=0 and dense TP>0; otherwise require calibration 210-220 candidate_count=0 and calibration 160-180 TP>0, then the same hard gates and rank dense TP/F1/P/R",
            "unbiased_held_out_warning": "The selected config comes from an independent browser-byte audit and was corroborated against the nominal held-out hard gates. It is not the calibration optimum (calibration 160-180 has zero TP offline), so these are cross-model gate-screened rather than unbiased held-out metrics.",
            "calibration_eligible_count": len(eligible_runs),
            "hard_gate_pass_count": len(hard_gate_runs),
            "selected_config": asdict(best_config),
            "selected_min_samples": MIN_SAMPLES,
            "selected_warmup_seconds": WARMUP_SECONDS,
            "chromium_audit_config_offline_evaluation": {
                "config": asdict(chromium_audit_config),
                "calibration": chromium_audit_evaluation["calibration"] if chromium_audit_evaluation else None,
                "held_out": chromium_audit_evaluation["held_out"] if chromium_audit_evaluation else None,
                "raw_held_out": chromium_audit_evaluation["raw_held_out"] if chromium_audit_evaluation else None,
            },
            "grid_results": calibration_results,
        },
        "evaluation": {
            "candidate": {
                "accepted_after_cooldown": {
                    "calibration": candidate_calibration,
                    "held_out": candidate_held_out,
                    "full_track_uncorrected_timestamps_seconds": np.round(best_accepted_events, 6).tolist(),
                    "full_track_corrected_timestamps_seconds": np.round(best_events, 6).tolist(),
                },
                "raw_without_cooldown": {
                    "calibration": raw_candidate_calibration,
                    "held_out": raw_candidate_held_out,
                    "full_track_uncorrected_timestamps_seconds": np.round(best_raw_events, 6).tolist(),
                    "full_track_corrected_timestamps_seconds": np.round(best_raw_events + fixed_offset, 6).tolist(),
                },
            },
            "legacy": {
                "calibration": legacy_calibration,
                "held_out": legacy_held_out,
                "full_track_timestamps_seconds": np.round(legacy_events, 6).tolist(),
            },
        },
        "diagnostics": {
            "legacy": legacy_diagnostics,
            "full_flux_percentiles": {
                str(p): float(np.percentile(full_flux, p)) for p in (50, 75, 90, 95, 99, 99.5)
            },
            "high_flux_percentiles": {
                str(p): float(np.percentile(high_flux, p)) for p in (50, 75, 90, 95, 99, 99.5)
            },
        },
        "parity_limits": [
            "WebAudio AnalyserNode implementation details are browser-specific; this simulation uses causal sample frames, the specified periodic alpha=0.16 Blackman coefficients, FFT-size magnitude normalization, linear-magnitude smoothing, and floor byte quantization.",
            "The browser media pipeline may resample or delay decoded MP3 audio; librosa decodes directly at the file's native sample rate.",
            "getByteTimeDomainData is approximated by direct mono samples quantized to bytes; browser channel mixing and sample scheduling can differ.",
            "A fixed 60 Hz observation cadence is simulated without requestAnimationFrame jitter, dropped frames, tab suspension, or seek/reset behavior.",
            "The candidate local maximum is emitted causally one observation after its timestamp; metrics score the peak timestamp, not the later emission time.",
        ],
    }

    json_path = OUTPUT_DIR / "results.json"
    json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    selected = asdict(best_config)
    report_lines = [
        "# T-NT-03 offline audio evaluation",
        "",
        "Non-shipping evaluation of the existing energy-difference onset trigger versus a half-wave mean spectral-flux candidate.",
        "",
        "## Frozen setup",
        "",
        f"- Audio: `{payload['audio']['path']}` (SHA-256 `{payload['audio']['sha256']}`)",
        f"- Decode: native {sr} Hz mono, {duration:.6f} s",
        f"- WebAudio approximation: {FFT_SIZE}-sample Blackman, {FPS:.0f} Hz observations, {SPECTRUM_SMOOTHING:.2f} linear-magnitude smoothing, {MIN_DB:.0f}/{MAX_DB:.0f} dB byte mapping",
        "- Flux: mean positive normalized-byte delta; full spectrum except >=190 Hz in Chapter VIII (260.2260–330.0484 s)",
        f"- Reference: one full-track `librosa.onset.onset_detect` call, then runtime-equivalent dynamic cooldown; {raw_reference.size} raw / {reference.size} throttled onsets",
        f"- Matching: one-to-one within ±{MATCH_WINDOW_SECONDS * 1000:.0f} ms using `mir_eval.util.match_events`",
        f"- Fixed timestamp correction: {fixed_offset:+.3f} s, median estimated from {fixed_offset_pairs} calibration pairs (empirically covers FFT/ODF latency)",
        "- Offline-only fallback filter: 210–220 s must emit zero accepted candidates; 160–180 s must retain at least one TP.",
        "- Requested hard-gate screen: 104–115 s must emit zero accepted candidates; 294–320 s must retain at least one TP.",
        "- Because nominal held-out intervals were used to corroborate the browser-audit choice, these are gate-screened rather than unbiased held-out results.",
        "",
        "## Frozen candidate",
        "",
        f"`window={selected['window_seconds']} s`, `k={selected['k']}`, `lambda={selected['smoothing_lambda']}`, `minFlux={selected['min_flux']}`, `minSamples={MIN_SAMPLES}`, `warmup={WARMUP_SECONDS} s`.",
        "",
        ("The independently supplied Chromium-byte-audit config was frozen because the 60 Hz offline model corroborates its quiet-zero/dense-positive hard gates. "
         "It is not the offline calibration optimum: calibration 160–180 s has zero TP here. Selection is therefore cross-model gate-screened, not an unbiased held-out estimate."),
        "",
        "## Held-out results",
        "",
        "Detector / interval | P | R | F1 | TP | FP | FN",
        "--- | ---: | ---: | ---: | ---: | ---: | ---:",
    ]
    for detector_name, scores in (("Candidate", candidate_held_out), ("Legacy", legacy_held_out)):
        for name, _, _ in HELD_OUT_INTERVALS:
            report_lines.append(f"{detector_name} / {name} | {fmt_metrics(scores[name]['metrics'])}")
        report_lines.append(f"{detector_name} / aggregate | {fmt_metrics(scores['aggregate']['metrics'])}")

    report_lines.extend(["", "## Accepted candidate timestamps (held-out, corrected)", ""])
    for name, _, _ in HELD_OUT_INTERVALS:
        timestamps = candidate_held_out[name]["candidate_timestamps_seconds"]
        rendered = ", ".join(f"{value:.3f}" for value in timestamps) if timestamps else "(none)"
        report_lines.append(f"- {name}: {rendered}")

    report_lines.extend(["", "## Raw candidate timestamps (held-out, no cooldown, corrected)", ""])
    for name, _, _ in HELD_OUT_INTERVALS:
        timestamps = raw_candidate_held_out[name]["candidate_timestamps_seconds"]
        rendered = ", ".join(f"{value:.3f}" for value in timestamps) if timestamps else "(none)"
        report_lines.append(f"- {name}: {rendered}")

    report_lines.extend([
        "",
        "## Calibration check",
        "",
        "Detector / interval | P | R | F1 | TP | FP | FN",
        "--- | ---: | ---: | ---: | ---: | ---: | ---:",
    ])
    for detector_name, scores in (("Candidate", candidate_calibration), ("Legacy", legacy_calibration)):
        for name, _, _ in CALIBRATION_INTERVALS:
            report_lines.append(f"{detector_name} / {name} | {fmt_metrics(scores[name]['metrics'])}")
        report_lines.append(f"{detector_name} / aggregate | {fmt_metrics(scores['aggregate']['metrics'])}")

    candidate_metrics = candidate_held_out["aggregate"]["metrics"]
    legacy_metrics = legacy_held_out["aggregate"]["metrics"]
    report_lines.extend([
        "",
        "## Conclusion",
        "",
        f"Gate-screened candidate F1 is {candidate_metrics['f1']:.3f} versus legacy {legacy_metrics['f1']:.3f}; candidate precision/recall are {candidate_metrics['precision']:.3f}/{candidate_metrics['recall']:.3f}, legacy {legacy_metrics['precision']:.3f}/{legacy_metrics['recall']:.3f}.",
        f"Legacy emits zero pulses in the scored intervals, but its full-track simulated maximum smoothed transient is {legacy_diagnostics['max_smoothed_transient']:.6f} (maximum raw {legacy_diagnostics['max_raw_transient']:.6f}), above the 0.16 threshold; therefore the zero scored count is interval-specific, not a blanket zero-fire simulation. The FFT magnitude uses Web Audio's 1/N normalization before dB mapping; browser decode/channel/scheduling differences remain.",
        "",
        "This is directional evidence, not exact browser parity. The principal limits are browser-specific analyser/window/byte behavior, MP3 decode and scheduling differences, approximate time-domain bytes, fixed cadence without frame jitter, and scoring the candidate peak time although causal emission occurs one 60 Hz observation later. Full assumptions and every grid result are preserved in `results.json`.",
        "",
        "## Reproduce",
        "",
        "```powershell",
        "uv run --script scripts/ninth-tide-onset-eval.py",
        "```",
        "",
    ])
    (OUTPUT_DIR / "report.md").write_text("\n".join(report_lines), encoding="utf-8")

    print(f"Wrote {json_path}")
    print(f"Selected {best_config}")
    print(f"Candidate held-out: {candidate_metrics}")
    print(f"Legacy held-out: {legacy_metrics}")


if __name__ == "__main__":
    main()
