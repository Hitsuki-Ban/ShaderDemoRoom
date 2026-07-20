import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import {
  GLASS_CENTER_X,
  GLASS_CENTER_Y,
  GLASS_CENTER_Z,
  GLASS_AIM_IMPACT_RATIO,
  GLASS_RADIUS,
  GLASS_SEGMENT_INCOMING,
  GLASS_SEGMENT_INTERNAL,
  GLASS_SEGMENT_OUTGOING,
  GLASS_SEGMENT_REFLECTED,
  calculateGlassAimDirectionInto,
  createGlassLightPathResult,
  createGlassLightPathWorkspace,
  refractVectorInto,
  traceGlassRayInto,
} from './light-path';

const GLASS_CENTER = new Vector3(
  GLASS_CENTER_X,
  GLASS_CENTER_Y,
  GLASS_CENTER_Z,
);

function createHarness() {
  return {
    result: createGlassLightPathResult(),
    workspace: createGlassLightPathWorkspace(),
  };
}

function directionTo(target: Vector3, source: Vector3) {
  return target.clone().sub(source).normalize();
}

describe('glass light path physics', () => {
  it('intersects both sphere surfaces, reflects about the entry normal, and reaches the floor', () => {
    const { result, workspace } = createHarness();
    const source = new Vector3(-0.05, 3.2, 2.05);
    const sourceBefore = source.clone();
    const incident = directionTo(new Vector3(0, 1.45, 0), source);
    const incidentBefore = incident.clone();

    expect(traceGlassRayInto(source, incident, 1.48, result, workspace)).toBe('complete');
    expect(result.entryPoint.distanceTo(GLASS_CENTER)).toBeCloseTo(GLASS_RADIUS, 10);
    expect(result.exitPoint.distanceTo(GLASS_CENTER)).toBeCloseTo(GLASS_RADIUS, 10);
    expect(result.floorHit.y).toBe(0);
    expect(result.segmentMask).toBe(
      GLASS_SEGMENT_INCOMING
      | GLASS_SEGMENT_REFLECTED
      | GLASS_SEGMENT_INTERNAL
      | GLASS_SEGMENT_OUTGOING,
    );

    const expectedReflection = incident.clone().reflect(result.entryNormal);
    expect(result.reflectedDirection.distanceTo(expectedReflection)).toBeLessThan(1e-12);
    expect(source.toArray()).toEqual(sourceBefore.toArray());
    expect(incident.toArray()).toEqual(incidentBefore.toArray());
  });

  it.each([
    ['vertical near-top', new Vector3(0, 2.61, 0)],
    ['default-like', new Vector3(-0.05, 3.2, 2.05)],
    ['negative extreme', new Vector3(-6, 2.61, -6)],
    ['positive extreme', new Vector3(6, 6, 6)],
  ])('keeps the ruled incidence angle constant for %s', (_label, source) => {
    const outputDirection = new Vector3();
    const centerDirection = new Vector3();
    const offsetAxis = new Vector3();
    const aimPoint = new Vector3();

    expect(calculateGlassAimDirectionInto(
      source,
      outputDirection,
      centerDirection,
      offsetAxis,
      aimPoint,
    )).toBe(true);
    const impactParameter = centerDirection.clone().cross(outputDirection).length();
    expect(impactParameter).toBeCloseTo(GLASS_AIM_IMPACT_RATIO * GLASS_RADIUS, 12);

    const { result, workspace } = createHarness();
    expect(traceGlassRayInto(source, outputDirection, 1.48, result, workspace)).toBe('complete');
    const incidenceAngle = Math.acos(-outputDirection.dot(result.entryNormal));
    expect(incidenceAngle).toBeCloseTo(Math.asin(GLASS_AIM_IMPACT_RATIO), 12);
  });

  it('uses the ruled +X offset axis for vertical alignment', () => {
    const source = new Vector3(0, 2.61, 0);
    const outputDirection = new Vector3();
    const centerDirection = new Vector3();
    const offsetAxis = new Vector3();
    const aimPoint = new Vector3();

    calculateGlassAimDirectionInto(
      source,
      outputDirection,
      centerDirection,
      offsetAxis,
      aimPoint,
    );

    expect(offsetAxis.toArray()).toEqual([1, 0, 0]);
    expect(aimPoint.x).toBeGreaterThan(GLASS_CENTER_X);
    expect(aimPoint.y).toBe(GLASS_CENTER_Y);
    expect(aimPoint.z).toBe(GLASS_CENTER_Z);
  });

  it.each([
    ['non-finite', new Vector3(Number.NaN, 3, 2)],
    ['inside the sphere', new Vector3(0, 2.25, 0)],
    ['on the sphere', new Vector3(0, GLASS_CENTER_Y + GLASS_RADIUS, 0)],
  ])('rejects a %s aim source and leaves finite unavailable outputs', (_label, source) => {
    const outputDirection = new Vector3(9, 8, 7);
    const centerDirection = new Vector3(6, 5, 4);
    const offsetAxis = new Vector3(3, 2, 1);
    const aimPoint = new Vector3(-1, -2, -3);

    expect(calculateGlassAimDirectionInto(
      source,
      outputDirection,
      centerDirection,
      offsetAxis,
      aimPoint,
    )).toBe(false);
    for (const output of [outputDirection, centerDirection, offsetAxis, aimPoint]) {
      expect(output.toArray()).toEqual([0, 0, 0]);
      expect(output.toArray().every(Number.isFinite)).toBe(true);
    }
  });

  it('fixes the legal extreme floor hit used by the visual capture', () => {
    const source = new Vector3(-6, 2.61, -6);
    const outputDirection = new Vector3();
    const centerDirection = new Vector3();
    const offsetAxis = new Vector3();
    const aimPoint = new Vector3();
    const { result, workspace } = createHarness();

    expect(calculateGlassAimDirectionInto(
      source,
      outputDirection,
      centerDirection,
      offsetAxis,
      aimPoint,
    )).toBe(true);
    expect(traceGlassRayInto(source, outputDirection, 1.48, result, workspace)).toBe('complete');
    expect(result.floorHit.x).toBeGreaterThan(6.99);
    expect(result.floorHit.x).toBeLessThan(7);
    expect(result.floorHit.y).toBe(0);
    expect(result.floorHit.z).toBeGreaterThan(4.03);
    expect(result.floorHit.z).toBeLessThan(4.05);
  });

  it('never reaches a TIR status for ruled legal sphere inputs', () => {
    const outputDirection = new Vector3();
    const centerDirection = new Vector3();
    const offsetAxis = new Vector3();
    const aimPoint = new Vector3();
    const { result, workspace } = createHarness();

    for (const lightX of [-6, 0, 6]) {
      for (const lightY of [2.61, 6]) {
        for (const lightZ of [-6, 0, 6]) {
          const source = new Vector3(lightX, lightY, lightZ);
          calculateGlassAimDirectionInto(
            source,
            outputDirection,
            centerDirection,
            offsetAxis,
            aimPoint,
          );
          for (const ior of [1, 1.48, 2.4]) {
            const status = traceGlassRayInto(
              source,
              outputDirection,
              ior,
              result,
              workspace,
            );
            expect(status).not.toBe('tir-entry');
            expect(status).not.toBe('tir-exit');
            expect(result.hasEntry).toBe(true);
            expect(result.hasExit).toBe(true);
          }
        }
      }
    }
  });

  it('travels straight through both interfaces when ior is one', () => {
    const { result, workspace } = createHarness();
    const source = new Vector3(-0.8, 3.4, 2.2);
    const incident = directionTo(new Vector3(0.15, 1.5, 0), source);

    expect(traceGlassRayInto(source, incident, 1, result, workspace)).toBe('complete');
    expect(result.internalDirection.distanceTo(incident)).toBeLessThan(1e-12);
    expect(result.outgoingDirection.distanceTo(incident)).toBeLessThan(1e-12);
  });

  it('reports total internal reflection without mutating its inputs', () => {
    const output = new Vector3(9, 8, 7);
    const incident = new Vector3(Math.sqrt(3) / 2, 0.5, 0);
    const normal = new Vector3(0, -1, 0);
    const incidentBefore = incident.clone();
    const normalBefore = normal.clone();

    expect(refractVectorInto(output, incident, normal, 1.5)).toBe(false);
    expect(output.toArray()).toEqual([9, 8, 7]);
    expect(incident.toArray()).toEqual(incidentBefore.toArray());
    expect(normal.toArray()).toEqual(normalBefore.toArray());
  });

  it('accepts derived spectral IOR values above the UI domain maximum', () => {
    const { result, workspace } = createHarness();
    const source = new Vector3(-0.8, 3.4, 2.2);
    const incident = directionTo(new Vector3(0.15, 1.5, 0), source);

    expect(traceGlassRayInto(source, incident, 2.435, result, workspace)).toBe('complete');
  });

  it('uses stable roots for a distant source with a small entry root', () => {
    const { result, workspace } = createHarness();
    const source = new Vector3(1e12, GLASS_CENTER_Y, 0);
    const incident = new Vector3(-1, 0, 0);

    expect(traceGlassRayInto(source, incident, 1.48, result, workspace)).toBe('no-floor-hit');
    expect(result.entryPoint.x).toBeCloseTo(GLASS_RADIUS, 10);
    expect(result.entryPoint.y).toBeCloseTo(GLASS_CENTER_Y, 10);
    expect(result.entryPoint.z).toBeCloseTo(0, 10);
    expect(result.entryPoint.distanceTo(GLASS_CENTER)).toBeCloseTo(GLASS_RADIUS, 12);
  });

  it('reuses every buffer while clearing and restoring staged results', () => {
    const { result, workspace } = createHarness();
    const resultVectors = Object.fromEntries(
      Object.entries(result).filter(([, value]) => value instanceof Vector3),
    );
    const workspaceVectors = { ...workspace };
    const completeSource = new Vector3(-0.05, 3.2, 2.05);
    const completeIncident = directionTo(new Vector3(0, 1.45, 0), completeSource);
    const noFloorSource = new Vector3(-6, 2.61, -6);
    const noFloorIncident = directionTo(new Vector3(0, 0.75, 0), noFloorSource);

    expect(traceGlassRayInto(
      completeSource,
      completeIncident,
      1.48,
      result,
      workspace,
    )).toBe('complete');
    expect(traceGlassRayInto(
      noFloorSource,
      noFloorIncident,
      2.4,
      result,
      workspace,
    )).toBe('no-floor-hit');
    expect(result.hasFloorHit).toBe(false);
    expect(result.floorHit.toArray()).toEqual([0, 0, 0]);
    expect(traceGlassRayInto(
      GLASS_CENTER,
      new Vector3(0, -1, 0),
      1.48,
      result,
      workspace,
    )).toBe('invalid-source-position');
    expect(result.segmentMask).toBe(0);
    expect(result.entryPoint.toArray()).toEqual([0, 0, 0]);
    expect(traceGlassRayInto(
      completeSource,
      completeIncident,
      1.48,
      result,
      workspace,
    )).toBe('complete');

    for (const [key, vector] of Object.entries(resultVectors)) {
      expect(result[key as keyof typeof result]).toBe(vector);
    }
    expect(workspace.sourceOffset).toBe(workspaceVectors.sourceOffset);
    expect(workspace.direction).toBe(workspaceVectors.direction);
    expect(workspace.closestApproach).toBe(workspaceVectors.closestApproach);
  });

  it('bends monotonically toward the entry normal as ior rises', () => {
    const { result, workspace } = createHarness();
    const source = new Vector3(-0.8, 3.4, 2.2);
    const incident = directionTo(new Vector3(0.15, 1.5, 0), source);
    const angles: number[] = [];

    for (const ior of [1, 1.2, 1.48, 1.8, 2.4]) {
      traceGlassRayInto(source, incident, ior, result, workspace);
      angles.push(result.internalDirection.angleTo(result.entryNormal.clone().negate()));
    }

    expect(angles.every((angle, index) => index === 0 || angle < angles[index - 1])).toBe(true);
  });

  it('increases Schlick reflectance from normal toward grazing incidence', () => {
    const normalHarness = createHarness();
    const grazingHarness = createHarness();
    const normalSource = new Vector3(0, 4, 0);
    const grazingSource = new Vector3(-4, 2.8, 4);
    const normalIncident = directionTo(GLASS_CENTER, normalSource);
    const grazingIncident = directionTo(new Vector3(0, 2.3, 0), grazingSource);

    traceGlassRayInto(
      normalSource,
      normalIncident,
      1.48,
      normalHarness.result,
      normalHarness.workspace,
    );
    traceGlassRayInto(
      grazingSource,
      grazingIncident,
      1.48,
      grazingHarness.result,
      grazingHarness.workspace,
    );

    const expectedF0 = ((1 - 1.48) / (1 + 1.48)) ** 2;
    expect(normalHarness.result.reflectance).toBeCloseTo(expectedF0, 12);
    expect(grazingHarness.result.reflectance).toBeGreaterThan(normalHarness.result.reflectance);
  });

  it.each([
    {
      label: 'non-finite source',
      source: new Vector3(Number.NaN, 3, 2),
      direction: new Vector3(0, -1, 0),
      ior: 1.48,
      status: 'invalid-non-finite',
    },
    {
      label: 'source inside the sphere',
      source: GLASS_CENTER.clone(),
      direction: new Vector3(0, -1, 0),
      ior: 1.48,
      status: 'invalid-source-position',
    },
    {
      label: 'source on the sphere',
      source: GLASS_CENTER.clone().add(new Vector3(0, GLASS_RADIUS, 0)),
      direction: new Vector3(0, -1, 0),
      ior: 1.48,
      status: 'invalid-source-position',
    },
    {
      label: 'zero direction',
      source: new Vector3(0, 4, 0),
      direction: new Vector3(),
      ior: 1.48,
      status: 'invalid-direction',
    },
    {
      label: 'invalid ior',
      source: new Vector3(0, 4, 0),
      direction: new Vector3(0, -1, 0),
      ior: 0.99,
      status: 'invalid-ior',
    },
    {
      label: 'sphere miss',
      source: new Vector3(0, 4, 0),
      direction: new Vector3(1, 0, 0),
      ior: 1.48,
      status: 'no-entry-hit',
    },
    {
      label: 'tangent ray',
      source: new Vector3(0, 4, GLASS_RADIUS),
      direction: new Vector3(0, -1, 0),
      ior: 1.48,
      status: 'no-entry-hit',
    },
  ])('returns $status without fallback coordinates for $label', ({ source, direction, ior, status }) => {
    const { result, workspace } = createHarness();

    expect(traceGlassRayInto(source, direction, ior, result, workspace)).toBe(status);
    expect(result.segmentMask).toBe(0);
    expect(result.hasEntry).toBe(false);
    expect(result.hasExit).toBe(false);
    expect(result.hasFloorHit).toBe(false);
    expect(result.entryPoint.toArray()).toEqual([0, 0, 0]);
    expect(result.floorHit.toArray()).toEqual([0, 0, 0]);
  });

  it('keeps the valid sphere path but omits the outgoing segment when the floor is not ahead', () => {
    const { result, workspace } = createHarness();
    const source = new Vector3(-6, 2.61, -6);
    const incident = directionTo(new Vector3(0, 0.75, 0), source);

    expect(traceGlassRayInto(source, incident, 2.4, result, workspace)).toBe('no-floor-hit');
    expect(result.hasEntry).toBe(true);
    expect(result.hasExit).toBe(true);
    expect(result.hasFloorHit).toBe(false);
    expect(result.segmentMask).toBe(
      GLASS_SEGMENT_INCOMING | GLASS_SEGMENT_REFLECTED | GLASS_SEGMENT_INTERNAL,
    );
    expect(result.floorHit.toArray()).toEqual([0, 0, 0]);
  });
});
