import type { RoomId } from '../../rooms/types';

const MAX_SIMULATION_DELTA_SECONDS = 0.05;

export function getRenderPixelRatio(roomId: RoomId, devicePixelRatio: number) {
  if (!Number.isFinite(devicePixelRatio) || devicePixelRatio <= 0) {
    throw new Error(`Invalid device pixel ratio: ${devicePixelRatio}`);
  }

  const maxPixelRatio = roomId === 'voxel-water' ? 0.6 : 2;
  return Math.min(devicePixelRatio, maxPixelRatio);
}

export function getRendererAntialias(roomId: RoomId) {
  return roomId !== 'voxel-water';
}

export function getFrameTiming(rawDelta: number) {
  if (!Number.isFinite(rawDelta)) {
    throw new Error(`Invalid frame delta: ${rawDelta}`);
  }

  const elapsedDelta = Math.max(0, rawDelta);

  return {
    simulationDelta: Math.min(elapsedDelta, MAX_SIMULATION_DELTA_SECONDS),
    statsDelta: elapsedDelta,
  };
}
