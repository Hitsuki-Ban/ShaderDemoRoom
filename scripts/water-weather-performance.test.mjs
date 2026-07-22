import { describe, expect, it } from 'vitest';
import {
  BASELINE_REVISION,
  MINIMUM_ABSOLUTE_FPS,
  MINIMUM_PAIRED_SPEED_RATIO,
  PAIR_COUNT,
  assertCandidateTopology,
  createPerformanceReport,
  median,
  parseWeatherPerformanceConfig,
  summarizeScenario,
} from './water-weather-performance.mjs';

const candidateRevision = 'abcdef0123456789abcdef0123456789abcdef01';
const environment = {
  SHOWROOM_URL: 'http://candidate.test/ShaderDemoRoom',
  TELEMETRY_BASELINE_URL: 'http://baseline.test/ShaderDemoRoom/',
  TELEMETRY_SOURCE_REVISION: candidateRevision,
  TELEMETRY_BASELINE_REVISION: BASELINE_REVISION,
};

function measurement(fps) {
  return { cadence: { fps } };
}

function pairs(candidateFps, baselineFps) {
  return Array.from({ length: PAIR_COUNT }, (_, index) => ({
    pair: index + 1,
    baseline: measurement(baselineFps[index]),
    candidate: measurement(candidateFps[index]),
    speedRatio: candidateFps[index] / baselineFps[index],
  }));
}

describe('water weather performance configuration', () => {
  it('accepts only the locked baseline and a full candidate SHA', () => {
    expect(parseWeatherPerformanceConfig(environment, ['output/performance'])).toEqual({
      baselineRevision: BASELINE_REVISION,
      baselineUrl: 'http://baseline.test/ShaderDemoRoom',
      candidateRevision,
      candidateUrl: 'http://candidate.test/ShaderDemoRoom',
      outputDirectory: 'output/performance',
    });
  });

  it.each([
    ['TELEMETRY_BASELINE_REVISION', candidateRevision, 'accepted T-VW-08 main revision'],
    ['TELEMETRY_SOURCE_REVISION', 'short', 'full 40-character'],
    ['TELEMETRY_SOURCE_REVISION', BASELINE_REVISION, 'must differ'],
    ['SHOWROOM_URL', 'file:///candidate', 'HTTP(S)'],
    ['TELEMETRY_BASELINE_URL', 'http://baseline.test/?mutable=yes', 'query or hash'],
  ])('rejects invalid %s', (name, value, message) => {
    expect(() => parseWeatherPerformanceConfig(
      { ...environment, [name]: value },
      ['output/performance'],
    )).toThrow(message);
  });

  it('rejects missing inputs and identical server URLs', () => {
    expect(() => parseWeatherPerformanceConfig(
      { ...environment, SHOWROOM_URL: '' },
      ['output/performance'],
    )).toThrow('SHOWROOM_URL');
    expect(() => parseWeatherPerformanceConfig(environment, [])).toThrow('Exactly one');
    expect(() => parseWeatherPerformanceConfig(
      { ...environment, SHOWROOM_URL: 'http://baseline.test/ShaderDemoRoom' },
      ['output/performance'],
    )).toThrow('must be distinct');
  });
});

describe('water weather performance gates', () => {
  it('calculates odd and even medians without mutating input', () => {
    const values = [9, 1, 5];
    expect(median(values)).toBe(5);
    expect(values).toEqual([9, 1, 5]);
    expect(median([1, 3, 5, 7])).toBe(4);
    expect(() => median([])).toThrow('empty');
  });

  it('requires the exact candidate topology instead of the VW08 21-call topology', () => {
    const topology = {
      drawCalls: 8,
      drawCallsMax: 8,
      trianglesAvg: 61_972,
      textures: 1,
      geometries: 8,
      programs: 8,
    };
    expect(() => assertCandidateTopology(topology, 'weather-only-storm')).not.toThrow();
    expect(() => assertCandidateTopology(
      { ...topology, drawCalls: 21 },
      'weather-only-storm',
    )).toThrow('did not match 8');
  });

  it('passes only when absolute and paired medians both pass', () => {
    const passing = summarizeScenario('weather-only-storm', pairs(
      [14, 14.1, 14.2, 14.3, 14.4],
      [14, 14, 14, 14, 14],
    ));
    expect(passing.gates.absoluteFps.passed).toBe(true);
    expect(passing.gates.pairedSpeedRatio.passed).toBe(true);

    const absoluteFailure = summarizeScenario('weather-only-storm', pairs(
      [13.7, 13.8, 13.82, 13.9, 14],
      [13, 13, 13, 13, 13],
    ));
    expect(absoluteFailure.candidateFpsMedian).toBeLessThan(MINIMUM_ABSOLUTE_FPS);
    expect(absoluteFailure.gates.absoluteFps.passed).toBe(false);
    expect(absoluteFailure.gates.pairedSpeedRatio.passed).toBe(true);

    const pairedFailure = summarizeScenario('weather-only-storm', pairs(
      [14, 14, 14, 14, 14],
      [15, 15, 15, 15, 15],
    ));
    expect(pairedFailure.pairedSpeedRatioMedian).toBeLessThan(MINIMUM_PAIRED_SPEED_RATIO);
    expect(pairedFailure.gates.absoluteFps.passed).toBe(true);
    expect(pairedFailure.gates.pairedSpeedRatio.passed).toBe(false);
  });

  it('uses the worse scenario median for the final gate', () => {
    const raw = {
      recordedAt: '2026-07-23T00:00:00.000Z',
      artifacts: { raw: 'raw.json', report: 'report.json' },
      builds: {},
      method: {},
      candidateTopology: {},
      scenarios: [
        { id: 'weather-only-storm', pairs: pairs(
          [15, 15, 15, 15, 15],
          [15, 15, 15, 15, 15],
        ) },
        { id: 'full-storm', pairs: pairs(
          [14, 14, 14, 14, 14],
          [15, 15, 15, 15, 15],
        ) },
      ],
    };
    const report = createPerformanceReport(raw);
    expect(report.gates.minimumScenarioCandidateFpsMedian.actual).toBe(14);
    expect(report.gates.minimumScenarioPairedSpeedRatioMedian.actual)
      .toBeCloseTo(14 / 15);
    expect(report.gates.minimumScenarioPairedSpeedRatioMedian.passed).toBe(false);
    expect(report.pass).toBe(false);
  });
});
