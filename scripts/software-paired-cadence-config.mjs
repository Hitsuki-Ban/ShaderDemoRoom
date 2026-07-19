import { telemetryReferenceRoomIds } from './telemetry-reference-config.mjs';

export function parseSoftwarePairedCadenceConfig(environment, argumentsList) {
  const [roomId, outputPath] = argumentsList;
  const requiredEnvironment = [
    'SHOWROOM_URL',
    'TELEMETRY_BASELINE_URL',
    'TELEMETRY_SOURCE_REVISION',
    'TELEMETRY_BASELINE_REVISION',
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
      'SHOWROOM_URL, TELEMETRY_BASELINE_URL, TELEMETRY_SOURCE_REVISION, TELEMETRY_BASELINE_REVISION, a supported room ID, and one output path are required.',
    );
  }

  return {
    baselineRevision: environment.TELEMETRY_BASELINE_REVISION,
    baselineUrl: environment.TELEMETRY_BASELINE_URL,
    candidateRevision: environment.TELEMETRY_SOURCE_REVISION,
    candidateUrl: environment.SHOWROOM_URL,
    outputPath,
    roomId,
  };
}
