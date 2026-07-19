export const telemetryReferenceRoomIds = Object.freeze([
  'voxel-water',
  'glass-optics',
]);

export function parseTelemetryReferenceConfig(environment, argumentsList) {
  const [roomId, outputPath] = argumentsList;
  const requiredEnvironment = [
    'SHOWROOM_URL',
    'TELEMETRY_BASELINE_URL',
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
    !telemetryReferenceRoomIds.includes(roomId)
  ) {
    throw new Error(
      'SHOWROOM_URL, TELEMETRY_BASELINE_URL, TELEMETRY_BUILD_ID, TELEMETRY_SOURCE_REVISION, a supported room ID, and one output path are required.',
    );
  }

  return {
    baseUrl: environment.SHOWROOM_URL,
    baselineUrl: environment.TELEMETRY_BASELINE_URL,
    buildId: environment.TELEMETRY_BUILD_ID,
    outputPath,
    roomId,
    sourceRevision: environment.TELEMETRY_SOURCE_REVISION,
  };
}
