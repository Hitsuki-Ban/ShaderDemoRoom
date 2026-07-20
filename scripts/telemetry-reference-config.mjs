export const telemetryReferenceRoomIds = Object.freeze([
  'voxel-water',
  'glass-optics',
]);

export function parseTelemetryReferenceConfig(environment, argumentsList) {
  const [roomId, outputPath] = argumentsList;
  const requiredEnvironment = [
    'SHOWROOM_URL',
    'TELEMETRY_BASELINE_URL',
    'TELEMETRY_BASELINE_REVISION',
    'TELEMETRY_BUILD_ID',
    'TELEMETRY_SOURCE_REVISION',
  ];
  const missingEnvironment = requiredEnvironment.filter(
    (name) => typeof environment[name] !== 'string' || environment[name].length === 0,
  );

  if (
    missingEnvironment.length > 0 ||
    argumentsList.length !== 2 ||
    typeof outputPath !== 'string' ||
    outputPath.length === 0 ||
    !telemetryReferenceRoomIds.includes(roomId) ||
    !/^[0-9a-f]{40}$/i.test(environment.TELEMETRY_BASELINE_REVISION ?? '') ||
    !/^[0-9a-f]{40}$/i.test(environment.TELEMETRY_SOURCE_REVISION ?? '')
  ) {
    throw new Error(
      'SHOWROOM_URL, TELEMETRY_BASELINE_URL, TELEMETRY_BASELINE_REVISION, TELEMETRY_BUILD_ID, TELEMETRY_SOURCE_REVISION, a supported room ID, and one output path are required; revisions must be full 40-character Git commit hashes.',
    );
  }

  return {
    baseUrl: environment.SHOWROOM_URL,
    baselineRevision: environment.TELEMETRY_BASELINE_REVISION,
    baselineUrl: environment.TELEMETRY_BASELINE_URL,
    buildId: environment.TELEMETRY_BUILD_ID,
    outputPath,
    roomId,
    sourceRevision: environment.TELEMETRY_SOURCE_REVISION,
  };
}
