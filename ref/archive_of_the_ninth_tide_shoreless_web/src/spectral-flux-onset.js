const SELECTED_PATHS = new Set(['full', 'band']);

function assertPositiveFinite(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number.`);
  }
}

export function createMediaTimeDeltaTracker() {
  let previousTime = null;

  const reset = () => {
    previousTime = null;
  };

  const advance = (currentTime) => {
    if (!Number.isFinite(currentTime) || currentTime < 0) {
      throw new RangeError('currentTime must be a non-negative finite number.');
    }
    if (previousTime === null || currentTime < previousTime) {
      previousTime = currentTime;
      return 0;
    }
    const deltaSeconds = currentTime - previousTime;
    if (deltaSeconds > 0) previousTime = currentTime;
    return deltaSeconds;
  };

  return { advance, reset };
}

function createPeakTracker(config) {
  let clock = 0;
  let smoothedFlux = 0;
  let smoothingPrimed = false;
  let pending = null;
  const history = [];
  let historySum = 0;
  let historySumSquares = 0;

  const reset = () => {
    clock = 0;
    smoothedFlux = 0;
    smoothingPrimed = false;
    pending = null;
    history.length = 0;
    historySum = 0;
    historySumSquares = 0;
  };

  const update = (rawFlux, dtSeconds) => {
    clock += dtSeconds;
    const smoothingAlpha = 1 - Math.exp(-config.lowpassLambda * dtSeconds);
    smoothedFlux = smoothingPrimed
      ? smoothedFlux + (rawFlux - smoothedFlux) * smoothingAlpha
      : rawFlux;
    smoothingPrimed = true;

    let onset = false;
    let strength = 0;
    if (pending) {
      onset = pending.warmed
        && pending.value >= config.minFlux
        && pending.value > pending.leftValue
        && pending.value >= smoothedFlux
        && pending.value > pending.threshold;
      if (onset) {
        const scale = Math.max(pending.threshold, config.minFlux);
        strength = Math.min(1, Math.max(0, (pending.value - pending.threshold) / scale));
      }

      history.push({ time: pending.time, value: pending.value });
      historySum += pending.value;
      historySumSquares += pending.value * pending.value;
    }

    const oldestAllowed = clock - config.historySeconds;
    while (history.length > 0 && history[0].time < oldestAllowed) {
      const removed = history.shift();
      historySum -= removed.value;
      historySumSquares -= removed.value * removed.value;
    }

    const sampleCount = history.length;
    const mean = sampleCount > 0 ? historySum / sampleCount : 0;
    const variance = sampleCount > 0
      ? Math.max(0, historySumSquares / sampleCount - mean * mean)
      : 0;
    const standardDeviation = Math.sqrt(variance);
    const warmed = sampleCount >= config.minSamples && clock >= config.warmupSeconds;
    const threshold = mean + config.thresholdStdDeviations * standardDeviation;

    pending = {
      leftValue: pending?.value ?? Number.NEGATIVE_INFINITY,
      threshold,
      time: clock,
      value: smoothedFlux,
      warmed,
    };

    return {
      onset,
      strength,
      rawFlux,
      flux: smoothedFlux,
      threshold,
      mean,
      standardDeviation,
      sampleCount,
      warmed,
    };
  };

  return { reset, update };
}

function emptyDiagnostics() {
  return {
    onset: false,
    strength: 0,
    rawFlux: 0,
    flux: 0,
    threshold: 0,
    mean: 0,
    standardDeviation: 0,
    sampleCount: 0,
    warmed: false,
  };
}

export function createSpectralFluxOnsetDetector(config) {
  if (!config || typeof config !== 'object') {
    throw new TypeError('Spectral flux onset config is required.');
  }
  assertPositiveFinite(config.historySeconds, 'historySeconds');
  assertPositiveFinite(config.warmupSeconds, 'warmupSeconds');
  assertPositiveFinite(config.thresholdStdDeviations, 'thresholdStdDeviations');
  assertPositiveFinite(config.lowpassLambda, 'lowpassLambda');
  assertPositiveFinite(config.minFlux, 'minFlux');
  if (!Number.isInteger(config.minSamples) || config.minSamples < 2) {
    throw new RangeError('minSamples must be an integer of at least 2.');
  }

  const fullTracker = createPeakTracker(config);
  const bandTracker = createPeakTracker(config);
  let previousSpectrum = null;

  const reset = () => {
    previousSpectrum = null;
    fullTracker.reset();
    bandTracker.reset();
  };

  const update = (spectrum, dtSeconds, options) => {
    if (!(spectrum instanceof Uint8Array) || spectrum.length === 0) {
      throw new TypeError('spectrum must be a non-empty Uint8Array.');
    }
    assertPositiveFinite(dtSeconds, 'dtSeconds');
    if (!options || typeof options !== 'object') {
      throw new TypeError('Spectral flux onset update options are required.');
    }
    const { bandStartIndex, selectedPath } = options;
    if (!Number.isInteger(bandStartIndex)
      || bandStartIndex < 0
      || bandStartIndex >= spectrum.length) {
      throw new RangeError('bandStartIndex must address the supplied spectrum.');
    }
    if (!SELECTED_PATHS.has(selectedPath)) {
      throw new RangeError("selectedPath must be 'full' or 'band'.");
    }

    if (!previousSpectrum || previousSpectrum.length !== spectrum.length) {
      reset();
      previousSpectrum = new Uint8Array(spectrum);
      const full = emptyDiagnostics();
      const band = emptyDiagnostics();
      return { onset: false, strength: 0, selectedPath, primed: false, full, band };
    }

    let fullFlux = 0;
    let bandFlux = 0;
    for (let index = 0; index < spectrum.length; index++) {
      const rise = Math.max(0, spectrum[index] - previousSpectrum[index]) / 255;
      fullFlux += rise;
      if (index >= bandStartIndex) bandFlux += rise;
    }
    fullFlux /= spectrum.length;
    bandFlux /= spectrum.length - bandStartIndex;
    previousSpectrum.set(spectrum);

    const full = fullTracker.update(fullFlux, dtSeconds);
    const band = bandTracker.update(bandFlux, dtSeconds);
    const selected = selectedPath === 'band' ? band : full;
    return {
      onset: selected.onset,
      strength: selected.strength,
      selectedPath,
      primed: true,
      full,
      band,
    };
  };

  return { reset, update };
}
