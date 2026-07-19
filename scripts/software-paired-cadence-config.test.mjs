import { describe, expect, it } from 'vitest';
import { parseSoftwarePairedCadenceConfig } from './software-paired-cadence-config.mjs';

const environment = {
  SHOWROOM_URL: 'http://candidate.test',
  TELEMETRY_BASELINE_URL: 'http://baseline.test',
  TELEMETRY_SOURCE_REVISION: 'candidate-sha',
  TELEMETRY_BASELINE_REVISION: 'baseline-sha',
};

describe('software paired cadence configuration', () => {
  it.each(['voxel-water', 'glass-optics'])('accepts an explicit supported room: %s', (roomId) => {
    expect(
      parseSoftwarePairedCadenceConfig(environment, [roomId, 'capture.json']),
    ).toEqual({
      baselineRevision: 'baseline-sha',
      baselineUrl: 'http://baseline.test',
      candidateRevision: 'candidate-sha',
      candidateUrl: 'http://candidate.test',
      outputPath: 'capture.json',
      roomId,
    });
  });

  it.each([
    { argumentsList: [] },
    { argumentsList: ['glass-optics'] },
    { argumentsList: ['glass-optics', ''] },
    { argumentsList: ['unknown-room', 'capture.json'] },
    { argumentsList: ['glass-optics', 'capture.json', 'extra'] },
  ])('rejects invalid arguments: $argumentsList', ({ argumentsList }) => {
    expect(() =>
      parseSoftwarePairedCadenceConfig(environment, argumentsList),
    ).toThrow('a supported room ID');
  });

  it.each([
    'SHOWROOM_URL',
    'TELEMETRY_BASELINE_URL',
    'TELEMETRY_SOURCE_REVISION',
    'TELEMETRY_BASELINE_REVISION',
  ])('rejects missing required environment: %s', (name) => {
    expect(() =>
      parseSoftwarePairedCadenceConfig(
        { ...environment, [name]: '' },
        ['glass-optics', 'capture.json'],
      ),
    ).toThrow(name);
  });
});
