export const MODE_LIFETIMES = Object.freeze([5.35, 4.1, 4.35, 4.0, 4.9, 4.5, 4.2, 4.05, 4.3]);

const QUEUE_ADVANCE_SECONDS = 0.1;
const SOURCES = new Set(['auto', 'system', 'user']);
const histories = new WeakMap();

function assertFinite(value, name) {
  if (!Number.isFinite(value)) throw new RangeError(`${name} must be a finite number.`);
}

function assertNonNegativeFinite(value, name) {
  assertFinite(value, name);
  if (value < 0) throw new RangeError(`${name} must be non-negative.`);
}

function assertMode(mode) {
  if (!Number.isInteger(mode) || mode < 0 || mode >= MODE_LIFETIMES.length) {
    throw new RangeError(`mode must be an integer from 0 through ${MODE_LIFETIMES.length - 1}.`);
  }
}

function assertCapacities(capacities) {
  if (!capacities || typeof capacities !== 'object' || Array.isArray(capacities)) {
    throw new TypeError('Pulse history capacities are required.');
  }
  for (const name of ['systemCapacity', 'userCapacity']) {
    if (!Number.isInteger(capacities[name]) || capacities[name] <= 0) {
      throw new RangeError(`${name} must be a positive integer.`);
    }
  }
}

function getState(history) {
  const state = histories.get(history);
  if (!state) throw new TypeError('A pulse history created by createPulseHistory is required.');
  return state;
}

function cloneSlot(slot) {
  return slot === null ? null : { ...slot };
}

function freezeSlot(slot) {
  return slot === null ? null : Object.freeze({ ...slot });
}

function isLive(slot, clockSeconds) {
  return slot !== null && clockSeconds - slot.startTime < MODE_LIFETIMES[slot.mode];
}

function contributionScale(state, slot) {
  const queueAdvanceActive = state.queueAdvanceStartedAt !== null
    && state.clockSeconds - state.queueAdvanceStartedAt < QUEUE_ADVANCE_SECONDS;
  return queueAdvanceActive && slot.serial < state.queueAdvanceSerial ? 0.5 : 1;
}

function toLivePulse(state, slot) {
  const age = state.clockSeconds - slot.startTime;
  return Object.freeze({
    age,
    originX: slot.originX,
    originZ: slot.originZ,
    sourceY: slot.sourceY,
    screenX: slot.screenX,
    screenY: slot.screenY,
    startTime: slot.startTime,
    strength: slot.strength,
    mode: slot.mode,
    source: slot.source,
    serial: slot.serial,
    contributionScale: contributionScale(state, slot),
    lifetime: MODE_LIFETIMES[slot.mode],
  });
}

function assertSnapshotSlot(slot, ring, clockSeconds, nextSerial, index) {
  if (slot === null) return;
  if (!slot || typeof slot !== 'object' || Array.isArray(slot)) {
    throw new TypeError(`${ring}Slots[${index}] must be a pulse slot or null.`);
  }
  if (!SOURCES.has(slot.source) || (ring === 'user' ? slot.source !== 'user' : slot.source === 'user')) {
    throw new RangeError(`${ring}Slots[${index}] has an invalid source.`);
  }
  for (const name of ['originX', 'originZ', 'sourceY', 'screenX', 'screenY', 'startTime', 'strength']) {
    assertFinite(slot[name], `${ring}Slots[${index}].${name}`);
  }
  if (slot.startTime < 0 || slot.startTime > clockSeconds) {
    throw new RangeError(`${ring}Slots[${index}].startTime is outside the history clock.`);
  }
  if (slot.strength <= 0) throw new RangeError(`${ring}Slots[${index}].strength must be positive.`);
  assertMode(slot.mode);
  if (!Number.isInteger(slot.serial) || slot.serial < 1 || slot.serial >= nextSerial) {
    throw new RangeError(`${ring}Slots[${index}].serial is invalid.`);
  }
}

function assertSnapshotRingLayout(slots, cursor, ring) {
  const firstEmptyIndex = slots.indexOf(null);
  if (firstEmptyIndex !== -1) {
    if (cursor !== firstEmptyIndex || slots.slice(firstEmptyIndex).some((slot) => slot !== null)) {
      throw new RangeError(`${ring}Slots and ${ring}Cursor do not form a valid ring.`);
    }
  }
  const chronological = firstEmptyIndex === -1
    ? [...slots.slice(cursor), ...slots.slice(0, cursor)]
    : slots.slice(0, cursor);
  for (let index = 1; index < chronological.length; index++) {
    if (chronological[index - 1].serial >= chronological[index].serial) {
      throw new RangeError(`${ring}Slots are not ordered by pulse serial.`);
    }
  }
}

function assertSnapshot(snapshot, state) {
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) {
    throw new TypeError('A pulse history snapshot is required.');
  }
  if (snapshot.systemCapacity !== state.systemCapacity
    || snapshot.userCapacity !== state.userCapacity) {
    throw new RangeError('Snapshot ring capacities do not match the pulse history.');
  }
  assertNonNegativeFinite(snapshot.clockSeconds, 'snapshot.clockSeconds');
  if (!Number.isInteger(snapshot.nextSerial) || snapshot.nextSerial < 1) {
    throw new RangeError('snapshot.nextSerial must be a positive integer.');
  }
  if (!Number.isInteger(snapshot.systemCursor)
    || snapshot.systemCursor < 0
    || snapshot.systemCursor >= state.systemCapacity) {
    throw new RangeError('snapshot.systemCursor is invalid.');
  }
  if (!Number.isInteger(snapshot.userCursor)
    || snapshot.userCursor < 0
    || snapshot.userCursor >= state.userCapacity) {
    throw new RangeError('snapshot.userCursor is invalid.');
  }
  if (!Array.isArray(snapshot.systemSlots)
    || snapshot.systemSlots.length !== state.systemCapacity
    || !Array.isArray(snapshot.userSlots)
    || snapshot.userSlots.length !== state.userCapacity) {
    throw new RangeError('Snapshot ring capacities do not match the pulse history.');
  }
  snapshot.systemSlots.forEach((slot, index) => {
    assertSnapshotSlot(slot, 'system', snapshot.clockSeconds, snapshot.nextSerial, index);
  });
  snapshot.userSlots.forEach((slot, index) => {
    assertSnapshotSlot(slot, 'user', snapshot.clockSeconds, snapshot.nextSerial, index);
  });
  assertSnapshotRingLayout(snapshot.systemSlots, snapshot.systemCursor, 'system');
  assertSnapshotRingLayout(snapshot.userSlots, snapshot.userCursor, 'user');
  const serials = [...snapshot.systemSlots, ...snapshot.userSlots]
    .filter((slot) => slot !== null)
    .map((slot) => slot.serial);
  if (new Set(serials).size !== serials.length) {
    throw new RangeError('Snapshot pulse serials must be unique.');
  }
  if (snapshot.queueAdvanceStartedAt === null) {
    if (snapshot.queueAdvanceSerial !== 0) {
      throw new RangeError('An inactive queue advance must have serial 0.');
    }
  } else {
    assertNonNegativeFinite(snapshot.queueAdvanceStartedAt, 'snapshot.queueAdvanceStartedAt');
    if (snapshot.queueAdvanceStartedAt > snapshot.clockSeconds) {
      throw new RangeError('snapshot.queueAdvanceStartedAt cannot exceed the history clock.');
    }
    if (!Number.isInteger(snapshot.queueAdvanceSerial)
      || snapshot.queueAdvanceSerial < 1
      || snapshot.queueAdvanceSerial >= snapshot.nextSerial) {
      throw new RangeError('snapshot.queueAdvanceSerial is invalid.');
    }
    if (!serials.includes(snapshot.queueAdvanceSerial)) {
      throw new RangeError('snapshot.queueAdvanceSerial must identify a retained pulse.');
    }
  }
}

export function lifeEnvelope(age, mode) {
  assertNonNegativeFinite(age, 'age');
  assertMode(mode);
  const progress = Math.min(1, age / MODE_LIFETIMES[mode]);
  const smoothProgress = progress * progress * (3 - 2 * progress);
  return 1 - smoothProgress;
}

export function createPulseHistory(capacities) {
  assertCapacities(capacities);
  const { systemCapacity, userCapacity } = capacities;

  const history = Object.freeze({
    systemCapacity,
    userCapacity,
    totalCapacity: systemCapacity + userCapacity,
  });
  histories.set(history, {
    systemCapacity,
    userCapacity,
    systemSlots: Array(systemCapacity).fill(null),
    userSlots: Array(userCapacity).fill(null),
    systemCursor: 0,
    userCursor: 0,
    clockSeconds: 0,
    nextSerial: 1,
    queueAdvanceStartedAt: null,
    queueAdvanceSerial: 0,
  });
  return history;
}

export function resetPulseHistory(history) {
  const state = getState(history);
  state.systemSlots.fill(null);
  state.userSlots.fill(null);
  state.systemCursor = 0;
  state.userCursor = 0;
  state.clockSeconds = 0;
  state.nextSerial = 1;
  state.queueAdvanceStartedAt = null;
  state.queueAdvanceSerial = 0;
}

export function insertPulse(history, pulse) {
  const state = getState(history);
  if (!pulse || typeof pulse !== 'object' || Array.isArray(pulse)) {
    throw new TypeError('pulse must be an object.');
  }
  if (!SOURCES.has(pulse.source)) {
    throw new RangeError("source must be 'auto', 'system', or 'user'.");
  }
  for (const name of ['originX', 'originZ', 'sourceY', 'screenX', 'screenY', 'strength']) {
    assertFinite(pulse[name], name);
  }
  if (pulse.strength <= 0) throw new RangeError('strength must be positive.');
  assertMode(pulse.mode);

  const ring = pulse.source === 'user' ? 'user' : 'system';
  const slots = state[`${ring}Slots`];
  const cursorName = `${ring}Cursor`;
  const index = state[cursorName];
  const overwritesOccupiedSlot = slots[index] !== null;
  const slot = {
    originX: pulse.originX,
    originZ: pulse.originZ,
    sourceY: pulse.sourceY,
    screenX: pulse.screenX,
    screenY: pulse.screenY,
    startTime: state.clockSeconds,
    strength: pulse.strength,
    mode: pulse.mode,
    source: pulse.source,
    serial: state.nextSerial++,
  };
  slots[index] = slot;
  state[cursorName] = (index + 1) % slots.length;

  if (overwritesOccupiedSlot) {
    state.queueAdvanceStartedAt = state.clockSeconds;
    state.queueAdvanceSerial = slot.serial;
  }
  return toLivePulse(state, slot);
}

export function advancePulseHistory(history, dtSeconds) {
  const state = getState(history);
  assertNonNegativeFinite(dtSeconds, 'dtSeconds');
  if (dtSeconds === 0) return state.clockSeconds;
  state.clockSeconds += dtSeconds;
  if (state.queueAdvanceStartedAt !== null
    && state.clockSeconds - state.queueAdvanceStartedAt >= QUEUE_ADVANCE_SECONDS) {
    state.queueAdvanceStartedAt = null;
    state.queueAdvanceSerial = 0;
  }
  return state.clockSeconds;
}

export function getLivePulses(history) {
  const state = getState(history);
  const live = [];
  for (const slot of [...state.systemSlots, ...state.userSlots]) {
    if (isLive(slot, state.clockSeconds)) live.push(toLivePulse(state, slot));
  }
  return Object.freeze(live);
}

export function getPulseUniformSnapshot(history) {
  const state = getState(history);
  const slots = [...state.systemSlots, ...state.userSlots].map((slot) => {
    const active = isLive(slot, state.clockSeconds) ? 1 : 0;
    if (slot === null) {
      return Object.freeze({
        originX: 0,
        sourceY: 0,
        originZ: 0,
        startTime: 0,
        strength: 0,
        mode: 0,
        contributionScale: 1,
        active,
      });
    }
    return Object.freeze({
      originX: slot.originX,
      sourceY: slot.sourceY,
      originZ: slot.originZ,
      startTime: slot.startTime,
      strength: slot.strength,
      mode: slot.mode,
      contributionScale: contributionScale(state, slot),
      active,
    });
  });
  return Object.freeze({ clockSeconds: state.clockSeconds, slots: Object.freeze(slots) });
}

export function selectVeilPulse(history) {
  let selected = null;
  let selectedContribution = Number.NEGATIVE_INFINITY;
  for (const pulse of getLivePulses(history)) {
    const contribution = pulse.strength * lifeEnvelope(pulse.age, pulse.mode);
    const isNewerTie = selected !== null
      && contribution === selectedContribution
      && (pulse.startTime > selected.startTime
        || (pulse.startTime === selected.startTime && pulse.serial > selected.serial));
    if (contribution > selectedContribution || isNewerTie) {
      selected = pulse;
      selectedContribution = contribution;
    }
  }
  return selected === null ? null : Object.freeze({ ...selected, contribution: selectedContribution });
}

export function selectNewestArtifactPulse(history) {
  let selected = null;
  for (const pulse of getLivePulses(history)) {
    if (selected === null
      || pulse.startTime > selected.startTime
      || (pulse.startTime === selected.startTime && pulse.serial > selected.serial)) {
      selected = pulse;
    }
  }
  return selected;
}

export function capturePulseHistory(history) {
  const state = getState(history);
  return Object.freeze({
    systemCapacity: state.systemCapacity,
    userCapacity: state.userCapacity,
    clockSeconds: state.clockSeconds,
    nextSerial: state.nextSerial,
    systemCursor: state.systemCursor,
    userCursor: state.userCursor,
    queueAdvanceStartedAt: state.queueAdvanceStartedAt,
    queueAdvanceSerial: state.queueAdvanceSerial,
    systemSlots: Object.freeze(state.systemSlots.map(freezeSlot)),
    userSlots: Object.freeze(state.userSlots.map(freezeSlot)),
  });
}

export function restorePulseHistory(history, snapshot) {
  const state = getState(history);
  assertSnapshot(snapshot, state);
  state.clockSeconds = snapshot.clockSeconds;
  state.nextSerial = snapshot.nextSerial;
  state.systemCursor = snapshot.systemCursor;
  state.userCursor = snapshot.userCursor;
  state.queueAdvanceStartedAt = snapshot.queueAdvanceStartedAt;
  state.queueAdvanceSerial = snapshot.queueAdvanceSerial;
  state.systemSlots = snapshot.systemSlots.map(cloneSlot);
  state.userSlots = snapshot.userSlots.map(cloneSlot);
}

function projectRing(slots, capacity) {
  const retained = slots
    .filter((slot) => slot !== null)
    .sort((left, right) => right.serial - left.serial)
    .slice(0, capacity)
    .sort((left, right) => left.serial - right.serial)
    .map(cloneSlot);
  return {
    cursor: retained.length % capacity,
    slots: [...retained, ...Array(capacity - retained.length).fill(null)],
  };
}

export function projectPulseHistory(history, capacities) {
  const source = getState(history);
  assertCapacities(capacities);
  const projected = createPulseHistory(capacities);
  const target = getState(projected);
  const system = projectRing(source.systemSlots, target.systemCapacity);
  const user = projectRing(source.userSlots, target.userCapacity);

  target.clockSeconds = source.clockSeconds;
  target.nextSerial = source.nextSerial;
  target.systemCursor = system.cursor;
  target.userCursor = user.cursor;
  target.queueAdvanceStartedAt = source.queueAdvanceStartedAt;
  target.queueAdvanceSerial = source.queueAdvanceSerial;
  target.systemSlots = system.slots;
  target.userSlots = user.slots;
  assertSnapshot(capturePulseHistory(projected), target);
  return projected;
}
