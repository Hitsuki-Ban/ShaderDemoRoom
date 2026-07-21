import { describe, expect, it } from 'vitest';

import {
  MODE_LIFETIMES,
  advancePulseHistory,
  capturePulseHistory,
  createPulseHistory,
  getLivePulses,
  getPulseUniformSnapshot,
  insertPulse,
  lifeEnvelope,
  resetPulseHistory,
  restorePulseHistory,
  selectNewestArtifactPulse,
  selectVeilPulse,
} from './pulse-history.js';

function pulse(source, mode = 0, overrides = {}) {
  return {
    source,
    originX: 1,
    originZ: -2,
    sourceY: 0.34,
    screenX: 0.6,
    screenY: 0.4,
    strength: 1,
    mode,
    ...overrides,
  };
}

describe('pulse history rings', () => {
  it('uses the fixed desktop and mobile capacities', () => {
    const desktop = createPulseHistory('desktop');
    const mobile = createPulseHistory('mobile');
    expect(desktop).toMatchObject({ systemCapacity: 5, userCapacity: 3, totalCapacity: 8 });
    expect(mobile).toMatchObject({ systemCapacity: 2, userCapacity: 2, totalCapacity: 4 });
    expect(getPulseUniformSnapshot(desktop).slots).toHaveLength(8);
    expect(getPulseUniformSnapshot(mobile).slots).toHaveLength(4);
  });

  it('shares the system ring between auto and system while keeping user isolated', () => {
    const history = createPulseHistory('desktop');
    for (let serial = 1; serial <= 5; serial++) {
      insertPulse(history, pulse(serial % 2 ? 'auto' : 'system', 0, { originX: serial }));
    }
    for (let serial = 6; serial <= 8; serial++) {
      insertPulse(history, pulse('user', 0, { originX: serial }));
    }
    insertPulse(history, pulse('system', 0, { originX: 9 }));

    const live = getLivePulses(history);
    expect(live.map((entry) => entry.originX)).toEqual([9, 2, 3, 4, 5, 6, 7, 8]);
    expect(live.slice(0, 5).map((entry) => entry.source)).toEqual([
      'system', 'system', 'auto', 'system', 'auto',
    ]);
    expect(live.slice(5).every((entry) => entry.source === 'user')).toBe(true);
  });

  it('overwrites only the oldest member of each mobile ring', () => {
    const history = createPulseHistory('mobile');
    insertPulse(history, pulse('auto', 0, { originX: 1 }));
    advancePulseHistory(history, 0.01);
    insertPulse(history, pulse('system', 0, { originX: 2 }));
    insertPulse(history, pulse('user', 0, { originX: 10 }));
    insertPulse(history, pulse('auto', 0, { originX: 3 }));

    expect(getLivePulses(history).map((entry) => entry.originX)).toEqual([3, 2, 10]);
  });

  it('dims existing live traces for 100ms only when an occupied slot is overwritten', () => {
    const history = createPulseHistory('mobile');
    insertPulse(history, pulse('auto', 0, { originX: 1 }));
    insertPulse(history, pulse('system', 0, { originX: 2 }));
    insertPulse(history, pulse('user', 0, { originX: 10 }));
    expect(getLivePulses(history).every((entry) => entry.contributionScale === 1)).toBe(true);

    const newest = insertPulse(history, pulse('auto', 0, { originX: 3 }));
    expect(newest.contributionScale).toBe(1);
    expect(getLivePulses(history).map((entry) => [entry.originX, entry.contributionScale])).toEqual([
      [3, 1], [2, 0.5], [10, 0.5],
    ]);
    advancePulseHistory(history, 0);
    expect(getLivePulses(history).find((entry) => entry.originX === 2).contributionScale).toBe(0.5);
    advancePulseHistory(history, 0.099);
    expect(getLivePulses(history).find((entry) => entry.originX === 2).contributionScale).toBe(0.5);
    advancePulseHistory(history, 0.001);
    expect(getLivePulses(history).every((entry) => entry.contributionScale === 1)).toBe(true);
  });

  it('expires every mode at its declared lifetime and resets all state', () => {
    expect(MODE_LIFETIMES).toEqual([5.35, 4.1, 4.35, 4, 4.9, 4.5, 4.2, 4.05, 4.3]);
    for (let mode = 0; mode < MODE_LIFETIMES.length; mode++) {
      const history = createPulseHistory('desktop');
      insertPulse(history, pulse('auto', mode));
      advancePulseHistory(history, MODE_LIFETIMES[mode] - 0.001);
      expect(getLivePulses(history)).toHaveLength(1);
      advancePulseHistory(history, 0.001);
      expect(getLivePulses(history)).toHaveLength(0);
    }

    const history = createPulseHistory('desktop');
    insertPulse(history, pulse('user'));
    advancePulseHistory(history, 2);
    resetPulseHistory(history);
    expect(capturePulseHistory(history)).toMatchObject({
      clockSeconds: 0,
      nextSerial: 1,
      systemCursor: 0,
      userCursor: 0,
      queueAdvanceStartedAt: null,
      queueAdvanceSerial: 0,
    });
    expect(getLivePulses(history)).toEqual([]);
  });
});

describe('pulse history consumers', () => {
  it('returns a fixed, immutable uniform snapshot with active flags', () => {
    const history = createPulseHistory('mobile');
    insertPulse(history, pulse('auto', 1, {
      originX: 2,
      originZ: 3,
      sourceY: -2.28,
      strength: 0.75,
    }));
    const snapshot = getPulseUniformSnapshot(history);
    expect(snapshot.clockSeconds).toBe(0);
    expect(snapshot.slots[0]).toEqual({
      originX: 2,
      sourceY: -2.28,
      originZ: 3,
      startTime: 0,
      strength: 0.75,
      mode: 1,
      contributionScale: 1,
      active: 1,
    });
    expect(snapshot.slots[1]).toEqual({
      originX: 0,
      sourceY: 0,
      originZ: 0,
      startTime: 0,
      strength: 0,
      mode: 0,
      contributionScale: 1,
      active: 0,
    });
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.slots[0])).toBe(true);

    advancePulseHistory(history, MODE_LIFETIMES[1]);
    expect(getPulseUniformSnapshot(history).slots[0].active).toBe(0);
  });

  it('computes a smooth mode-lifetime envelope', () => {
    expect(lifeEnvelope(0, 0)).toBe(1);
    expect(lifeEnvelope(MODE_LIFETIMES[0] / 2, 0)).toBeCloseTo(0.5);
    expect(lifeEnvelope(MODE_LIFETIMES[0], 0)).toBe(0);
    expect(lifeEnvelope(MODE_LIFETIMES[0] + 1, 0)).toBe(0);
  });

  it('selects the greatest veil contribution across both rings', () => {
    const history = createPulseHistory('desktop');
    insertPulse(history, pulse('user', 0, { strength: 1.5, originX: 10 }));
    advancePulseHistory(history, 1);
    insertPulse(history, pulse('auto', 0, { strength: 0.5, originX: 20 }));
    const selected = selectVeilPulse(history);
    expect(selected.originX).toBe(10);
    expect(selected.contribution).toBeCloseTo(
      1.5 * lifeEnvelope(1, 0),
    );
  });

  it('does not let the queue-advance dip change the veil winner', () => {
    const history = createPulseHistory('mobile');
    insertPulse(history, pulse('user', 0, { strength: 1, originX: 1 }));
    insertPulse(history, pulse('system', 0, { strength: 0.2, originX: 2 }));
    insertPulse(history, pulse('auto', 0, { strength: 0.1, originX: 4 }));
    insertPulse(history, pulse('auto', 0, { strength: 0.6, originX: 3 }));

    const live = getLivePulses(history);
    expect(live.find((entry) => entry.originX === 1).contributionScale).toBe(0.5);
    expect(selectVeilPulse(history)).toMatchObject({
      originX: 1,
      contribution: 1,
      contributionScale: 0.5,
    });
  });

  it('breaks equal veil contribution ties by newest start time then serial', () => {
    const history = createPulseHistory('desktop');
    insertPulse(history, pulse('auto', 0, { strength: 1, originX: 1 }));
    advancePulseHistory(history, 1);
    const olderEnvelope = lifeEnvelope(1, 0);
    insertPulse(history, pulse('user', 0, { strength: olderEnvelope, originX: 2 }));
    expect(selectVeilPulse(history).originX).toBe(2);

    const sameTime = createPulseHistory('desktop');
    insertPulse(sameTime, pulse('auto', 0, { originX: 3 }));
    insertPulse(sameTime, pulse('user', 0, { originX: 4 }));
    expect(selectVeilPulse(sameTime).originX).toBe(4);
  });

  it('selects the newest live artifact pulse independent of strength', () => {
    const history = createPulseHistory('desktop');
    expect(selectNewestArtifactPulse(history)).toBeNull();
    expect(selectVeilPulse(history)).toBeNull();
    insertPulse(history, pulse('user', 0, { strength: 9, originX: 1 }));
    advancePulseHistory(history, 0.25);
    insertPulse(history, pulse('system', 0, { strength: 0.1, originX: 2 }));
    expect(selectNewestArtifactPulse(history).originX).toBe(2);
  });
});

describe('pulse history snapshots and validation', () => {
  it('captures and restores slots, cursors, clock, serial, and queue advance state', () => {
    const history = createPulseHistory('mobile');
    insertPulse(history, pulse('auto', 0, { originX: 1 }));
    insertPulse(history, pulse('system', 0, { originX: 2 }));
    insertPulse(history, pulse('user', 1, { originX: 10 }));
    advancePulseHistory(history, 0.25);
    insertPulse(history, pulse('auto', 2, { originX: 3 }));
    advancePulseHistory(history, 0.04);
    const captured = capturePulseHistory(history);

    resetPulseHistory(history);
    insertPulse(history, pulse('user', 8, { originX: 99 }));
    restorePulseHistory(history, captured);
    expect(capturePulseHistory(history)).toEqual(captured);
    expect(getLivePulses(history).map((entry) => entry.originX)).toEqual([3, 2, 10]);
    expect(getLivePulses(history).find((entry) => entry.originX === 2).contributionScale).toBe(0.5);

    const inserted = insertPulse(history, pulse('system', 0, { originX: 4 }));
    expect(inserted.serial).toBe(captured.nextSerial);
    expect(getLivePulses(history).map((entry) => entry.originX)).toEqual([3, 4, 10]);
  });

  it('fails fast for unknown tiers, sources, invalid values, handles, and snapshots', () => {
    expect(() => createPulseHistory('tablet')).toThrow(/tier/);
    const history = createPulseHistory('desktop');
    expect(() => insertPulse(history, pulse('legacy'))).toThrow(/source/);
    expect(() => insertPulse(history, pulse('auto', 9))).toThrow(/mode/);
    expect(() => insertPulse(history, pulse('auto', 0, { screenX: Number.NaN }))).toThrow(/screenX/);
    expect(() => insertPulse(history, pulse('auto', 0, { strength: 0 }))).toThrow(/strength/);
    expect(() => advancePulseHistory(history, -0.01)).toThrow(/dtSeconds/);
    expect(() => getLivePulses({})).toThrow(/createPulseHistory/);
    expect(() => restorePulseHistory(history, null)).toThrow(/snapshot/);
    expect(() => restorePulseHistory(history, capturePulseHistory(createPulseHistory('mobile'))))
      .toThrow(/tier/);
    expect(() => lifeEnvelope(-1, 0)).toThrow(/age/);
  });
});
