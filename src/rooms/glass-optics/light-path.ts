import { Vector3 } from 'three';

export const GLASS_CENTER_X = 0;
export const GLASS_CENTER_Y = 1.25;
export const GLASS_CENTER_Z = 0;
export const GLASS_RADIUS = 1.35;
export const GLASS_AIM_IMPACT_RATIO = 0.6;

const GLASS_CENTER_VECTOR = new Vector3(
  GLASS_CENTER_X,
  GLASS_CENTER_Y,
  GLASS_CENTER_Z,
);

const RAY_EPSILON = 1e-7;
const SURFACE_EPSILON = 1e-6;
const TANGENT_EPSILON = 1e-10;

export const GLASS_SEGMENT_INCOMING = 1 << 0;
export const GLASS_SEGMENT_REFLECTED = 1 << 1;
export const GLASS_SEGMENT_INTERNAL = 1 << 2;
export const GLASS_SEGMENT_OUTGOING = 1 << 3;

export type GlassLightPathStatus =
  | 'complete'
  | 'no-floor-hit'
  | 'invalid-non-finite'
  | 'invalid-source-position'
  | 'invalid-direction'
  | 'invalid-ior'
  | 'no-entry-hit'
  | 'tir-entry'
  | 'no-exit-hit'
  | 'tir-exit';

export interface GlassLightPathResult {
  status: GlassLightPathStatus;
  segmentMask: number;
  hasEntry: boolean;
  hasExit: boolean;
  hasFloorHit: boolean;
  reflectance: number;
  source: Vector3;
  incidentDirection: Vector3;
  entryPoint: Vector3;
  entryNormal: Vector3;
  reflectedDirection: Vector3;
  internalDirection: Vector3;
  exitPoint: Vector3;
  exitNormal: Vector3;
  outgoingDirection: Vector3;
  floorHit: Vector3;
}

export interface GlassLightPathWorkspace {
  sourceOffset: Vector3;
  direction: Vector3;
  closestApproach: Vector3;
}

function setUnavailable(vector: Vector3) {
  vector.set(0, 0, 0);
}

function resetResult(result: GlassLightPathResult) {
  result.status = 'invalid-non-finite';
  result.segmentMask = 0;
  result.hasEntry = false;
  result.hasExit = false;
  result.hasFloorHit = false;
  result.reflectance = 0;
  setUnavailable(result.source);
  setUnavailable(result.incidentDirection);
  setUnavailable(result.entryPoint);
  setUnavailable(result.entryNormal);
  setUnavailable(result.reflectedDirection);
  setUnavailable(result.internalDirection);
  setUnavailable(result.exitPoint);
  setUnavailable(result.exitNormal);
  setUnavailable(result.outgoingDirection);
  setUnavailable(result.floorHit);
}

function isFiniteVector(vector: Vector3) {
  return Number.isFinite(vector.x)
    && Number.isFinite(vector.y)
    && Number.isFinite(vector.z);
}

export function refractVectorInto(
  output: Vector3,
  incident: Vector3,
  normal: Vector3,
  eta: number,
) {
  const normalDotIncident = normal.dot(incident);
  const k = 1 - eta * eta * (1 - normalDotIncident * normalDotIncident);
  if (k < 0) return false;

  output
    .copy(incident)
    .multiplyScalar(eta)
    .addScaledVector(normal, -(eta * normalDotIncident + Math.sqrt(k)))
    .normalize();
  return isFiniteVector(output);
}

function projectOntoSphere(point: Vector3, normal: Vector3) {
  normal.copy(point).sub(GLASS_CENTER_VECTOR).normalize();
  point.copy(GLASS_CENTER_VECTOR).addScaledVector(normal, GLASS_RADIUS);
}

function setStatus(result: GlassLightPathResult, status: GlassLightPathStatus) {
  result.status = status;
  return status;
}

export function createGlassLightPathResult(): GlassLightPathResult {
  return {
    status: 'invalid-non-finite',
    segmentMask: 0,
    hasEntry: false,
    hasExit: false,
    hasFloorHit: false,
    reflectance: 0,
    source: new Vector3(),
    incidentDirection: new Vector3(),
    entryPoint: new Vector3(),
    entryNormal: new Vector3(),
    reflectedDirection: new Vector3(),
    internalDirection: new Vector3(),
    exitPoint: new Vector3(),
    exitNormal: new Vector3(),
    outgoingDirection: new Vector3(),
    floorHit: new Vector3(),
  };
}

export function createGlassLightPathWorkspace(): GlassLightPathWorkspace {
  return {
    sourceOffset: new Vector3(),
    direction: new Vector3(),
    closestApproach: new Vector3(),
  };
}

export function calculateGlassAimDirectionInto(
  source: Vector3,
  outputDirection: Vector3,
  centerDirection: Vector3,
  offsetAxis: Vector3,
  aimPoint: Vector3,
) {
  outputDirection.set(0, 0, 0);
  centerDirection.set(0, 0, 0);
  offsetAxis.set(0, 0, 0);
  aimPoint.set(0, 0, 0);

  if (!isFiniteVector(source)) return false;
  centerDirection.set(
    GLASS_CENTER_X - source.x,
    GLASS_CENTER_Y - source.y,
    GLASS_CENTER_Z - source.z,
  );
  const sourceDistanceSquared = centerDirection.lengthSq();
  const minimumSourceDistance = GLASS_RADIUS + SURFACE_EPSILON;
  const impactParameter = GLASS_AIM_IMPACT_RATIO * GLASS_RADIUS;
  const impactSquared = impactParameter * impactParameter;
  if (
    !Number.isFinite(sourceDistanceSquared)
    || sourceDistanceSquared <= minimumSourceDistance * minimumSourceDistance
  ) {
    centerDirection.set(0, 0, 0);
    return false;
  }

  offsetAxis.set(-centerDirection.z, 0, centerDirection.x);
  if (offsetAxis.lengthSq() <= RAY_EPSILON * RAY_EPSILON) {
    offsetAxis.set(1, 0, 0);
  } else {
    offsetAxis.normalize();
  }

  const sourceDistance = Math.sqrt(sourceDistanceSquared);
  const aimOffset = impactParameter * sourceDistance
    / Math.sqrt(sourceDistanceSquared - impactSquared);
  aimPoint
    .set(GLASS_CENTER_X, GLASS_CENTER_Y, GLASS_CENTER_Z)
    .addScaledVector(offsetAxis, aimOffset);
  outputDirection.copy(aimPoint).sub(source).normalize();
  return isFiniteVector(outputDirection);
}

export function traceGlassRayInto(
  source: Vector3,
  incidentDirection: Vector3,
  ior: number,
  result: GlassLightPathResult,
  workspace: GlassLightPathWorkspace,
): GlassLightPathStatus {
  resetResult(result);

  if (!isFiniteVector(source) || !isFiniteVector(incidentDirection)) {
    return setStatus(result, 'invalid-non-finite');
  }
  if (!Number.isFinite(ior) || ior < 1) {
    return setStatus(result, 'invalid-ior');
  }

  result.source.copy(source);
  workspace.sourceOffset.copy(source).sub(GLASS_CENTER_VECTOR);
  const sourceDistanceSquared = workspace.sourceOffset.lengthSq();
  if (!Number.isFinite(sourceDistanceSquared)) {
    return setStatus(result, 'invalid-non-finite');
  }
  const radiusSquared = GLASS_RADIUS * GLASS_RADIUS;
  if (sourceDistanceSquared <= radiusSquared + SURFACE_EPSILON) {
    return setStatus(result, 'invalid-source-position');
  }

  const directionLengthSquared = incidentDirection.lengthSq();
  if (
    !Number.isFinite(directionLengthSquared)
    || directionLengthSquared <= RAY_EPSILON * RAY_EPSILON
  ) {
    return setStatus(result, 'invalid-direction');
  }
  workspace.direction.copy(incidentDirection).normalize();
  if (!isFiniteVector(workspace.direction) || workspace.direction.lengthSq() <= RAY_EPSILON) {
    return setStatus(result, 'invalid-direction');
  }
  result.incidentDirection.copy(workspace.direction);

  const closestDistance = -workspace.sourceOffset.dot(workspace.direction);
  if (!Number.isFinite(closestDistance) || closestDistance <= RAY_EPSILON) {
    return setStatus(result, 'no-entry-hit');
  }
  workspace.closestApproach
    .copy(workspace.sourceOffset)
    .addScaledVector(workspace.direction, closestDistance);
  const closestDistanceSquared = workspace.closestApproach.lengthSq();
  const halfChordSquared = radiusSquared - closestDistanceSquared;
  if (
    !Number.isFinite(halfChordSquared)
    || halfChordSquared <= TANGENT_EPSILON * radiusSquared
  ) {
    return setStatus(result, 'no-entry-hit');
  }
  const entryDistance = closestDistance - Math.sqrt(halfChordSquared);
  if (!Number.isFinite(entryDistance) || entryDistance <= RAY_EPSILON) {
    return setStatus(result, 'no-entry-hit');
  }

  result.entryPoint.copy(source).addScaledVector(workspace.direction, entryDistance);
  projectOntoSphere(result.entryPoint, result.entryNormal);
  result.hasEntry = true;
  result.segmentMask = GLASS_SEGMENT_INCOMING | GLASS_SEGMENT_REFLECTED;
  result.reflectedDirection.copy(workspace.direction).reflect(result.entryNormal).normalize();

  const cosine = Math.min(1, Math.max(0, -workspace.direction.dot(result.entryNormal)));
  const f0 = ((1 - ior) / (1 + ior)) ** 2;
  result.reflectance = f0 + (1 - f0) * (1 - cosine) ** 5;

  if (!refractVectorInto(
    result.internalDirection,
    workspace.direction,
    result.entryNormal,
    1 / ior,
  )) {
    return setStatus(result, 'tir-entry');
  }

  const exitDistance = -2 * result.entryNormal.dot(result.internalDirection) * GLASS_RADIUS;
  if (!Number.isFinite(exitDistance) || exitDistance <= RAY_EPSILON) {
    return setStatus(result, 'no-exit-hit');
  }
  result.exitPoint
    .copy(result.entryPoint)
    .addScaledVector(result.internalDirection, exitDistance);
  projectOntoSphere(result.exitPoint, result.exitNormal);
  result.hasExit = true;
  result.segmentMask |= GLASS_SEGMENT_INTERNAL;

  workspace.direction.copy(result.exitNormal).negate();
  if (!refractVectorInto(
    result.outgoingDirection,
    result.internalDirection,
    workspace.direction,
    ior,
  )) {
    return setStatus(result, 'tir-exit');
  }

  if (result.outgoingDirection.y >= -RAY_EPSILON) {
    return setStatus(result, 'no-floor-hit');
  }
  const floorDistance = -result.exitPoint.y / result.outgoingDirection.y;
  if (!Number.isFinite(floorDistance) || floorDistance <= RAY_EPSILON) {
    return setStatus(result, 'no-floor-hit');
  }

  result.floorHit
    .copy(result.exitPoint)
    .addScaledVector(result.outgoingDirection, floorDistance);
  result.floorHit.y = 0;
  result.hasFloorHit = true;
  result.segmentMask |= GLASS_SEGMENT_OUTGOING;
  return setStatus(result, 'complete');
}
