import { describe, expect, it } from 'vitest';
import { parseTelemetryReferenceConfig } from './telemetry-reference-config.mjs';

const environment = {
  SHOWROOM_URL: 'http://candidate.test',
  TELEMETRY_BASELINE_URL: 'http://baseline.test',
  TELEMETRY_BUILD_ID: 'candidate',
  TELEMETRY_SOURCE_REVISION: 'abc123',
};

describe('telemetry reference configuration', () => {
  it.each(['voxel-water', 'glass-optics'])('requires an explicit supported room: %s', (roomId) => {
    expect(parseTelemetryReferenceConfig(environment, [roomId, 'capture.json'])).toMatchObject({
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
  ])('rejects missing, unknown, or additional arguments: $argumentsList', ({ argumentsList }) => {
    expect(() => parseTelemetryReferenceConfig(environment, argumentsList)).toThrow(
      'a supported room ID',
    );
  });

  it('rejects missing required environment', () => {
    expect(() =>
      parseTelemetryReferenceConfig(
        { ...environment, TELEMETRY_BASELINE_URL: '' },
        ['glass-optics', 'capture.json'],
      ),
    ).toThrow('TELEMETRY_BASELINE_URL');
  });
});
