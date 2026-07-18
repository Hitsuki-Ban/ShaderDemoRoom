export const embeddedBridgeContext = 'shader-demo-room' as const;
export const embeddedBridgeVersion = 1 as const;

export const embeddedBridgeCapabilities = [
  'pause',
  'stats',
  'set-mode',
  'set-quality',
  'set-preview',
] as const;

export type EmbeddedBridgeCapability = (typeof embeddedBridgeCapabilities)[number];
export type EmbeddedBridgeState = 'waiting' | 'ready' | 'error';

export interface EmbeddedRoomStats {
  fps: number;
  frameTimeMs: number;
  frameCount: number;
  paused: boolean;
}

interface EmbeddedBridgeEnvelope {
  context: typeof embeddedBridgeContext;
  v: typeof embeddedBridgeVersion;
  instanceId: string;
}

export type EmbeddedBridgeEvent = EmbeddedBridgeEnvelope & (
  | {
      type: 'ready';
      payload: { capabilities: EmbeddedBridgeCapability[] };
    }
  | {
      type: 'stats';
      payload: EmbeddedRoomStats;
    }
);

export type EmbeddedBridgeCommand =
  | { type: 'set-paused'; payload: { paused: boolean } }
  | { type: 'set-orb-mode'; payload: { mode: 0 | 1 | 2 | 3 } }
  | {
      type: 'set-orb-quality';
      payload: { quality: 'high' | 'medium' | 'low' };
    }
  | {
      type: 'set-tide-preview';
      payload: {
        mode: 'opening' | 'main' | 'ending';
        section: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      };
    };

const instanceIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requireRecord(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function requireExactKeys(
  record: Record<string, unknown>,
  expectedKeys: readonly string[],
  label: string,
) {
  const actualKeys = Object.keys(record).sort();
  const sortedExpectedKeys = [...expectedKeys].sort();
  if (
    actualKeys.length !== sortedExpectedKeys.length
    || actualKeys.some((key, index) => key !== sortedExpectedKeys[index])
  ) {
    throw new Error(`${label} has invalid fields: ${actualKeys.join(', ')}.`);
  }
}

function requireFiniteNonNegative(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite non-negative number.`);
  }
  return value;
}

function parseCapabilities(value: unknown): EmbeddedBridgeCapability[] {
  if (!Array.isArray(value)) {
    throw new Error('Bridge ready capabilities must be an array.');
  }

  const capabilities = value.map((capability) => {
    if (
      typeof capability !== 'string'
      || !embeddedBridgeCapabilities.includes(capability as EmbeddedBridgeCapability)
    ) {
      throw new Error(`Unsupported bridge capability: ${JSON.stringify(capability)}.`);
    }
    return capability as EmbeddedBridgeCapability;
  });
  const indexes = capabilities.map((capability) =>
    embeddedBridgeCapabilities.indexOf(capability),
  );
  if (indexes.some((index, position) => position > 0 && index <= indexes[position - 1])) {
    throw new Error('Bridge ready capabilities must be unique and in canonical order.');
  }
  return capabilities;
}

export function parseEmbeddedBridgeEvent(value: unknown): EmbeddedBridgeEvent {
  const envelope = requireRecord(value, 'Bridge event');
  requireExactKeys(envelope, ['context', 'v', 'instanceId', 'type', 'payload'], 'Bridge event');

  if (envelope.context !== embeddedBridgeContext) {
    throw new Error(`Invalid bridge context: ${JSON.stringify(envelope.context)}.`);
  }
  if (envelope.v !== embeddedBridgeVersion) {
    throw new Error(`Unsupported bridge version: ${JSON.stringify(envelope.v)}.`);
  }
  if (typeof envelope.instanceId !== 'string' || !instanceIdPattern.test(envelope.instanceId)) {
    throw new Error('Bridge instanceId must be a UUID.');
  }

  if (envelope.type === 'ready') {
    const payload = requireRecord(envelope.payload, 'Bridge ready payload');
    requireExactKeys(payload, ['capabilities'], 'Bridge ready payload');
    return {
      context: embeddedBridgeContext,
      v: embeddedBridgeVersion,
      instanceId: envelope.instanceId,
      type: 'ready',
      payload: { capabilities: parseCapabilities(payload.capabilities) },
    };
  }

  if (envelope.type === 'stats') {
    const payload = requireRecord(envelope.payload, 'Bridge stats payload');
    requireExactKeys(
      payload,
      ['fps', 'frameTimeMs', 'frameCount', 'paused'],
      'Bridge stats payload',
    );
    const fps = requireFiniteNonNegative(payload.fps, 'Bridge stats fps');
    const frameTimeMs = requireFiniteNonNegative(
      payload.frameTimeMs,
      'Bridge stats frameTimeMs',
    );
    const frameCount = requireFiniteNonNegative(
      payload.frameCount,
      'Bridge stats frameCount',
    );
    if (!Number.isInteger(frameCount)) {
      throw new Error('Bridge stats frameCount must be an integer.');
    }
    if (typeof payload.paused !== 'boolean') {
      throw new Error('Bridge stats paused must be a boolean.');
    }
    return {
      context: embeddedBridgeContext,
      v: embeddedBridgeVersion,
      instanceId: envelope.instanceId,
      type: 'stats',
      payload: { fps, frameTimeMs, frameCount, paused: payload.paused },
    };
  }

  throw new Error(`Unsupported bridge event type: ${JSON.stringify(envelope.type)}.`);
}

export function createEmbeddedBridgeCommand(
  instanceId: string,
  command: EmbeddedBridgeCommand,
): EmbeddedBridgeEnvelope & EmbeddedBridgeCommand {
  if (!instanceIdPattern.test(instanceId)) {
    throw new Error('Bridge command instanceId must be a UUID.');
  }
  return {
    context: embeddedBridgeContext,
    v: embeddedBridgeVersion,
    instanceId,
    ...command,
  };
}

export function capabilitiesMatch(
  actual: readonly EmbeddedBridgeCapability[],
  expected: readonly EmbeddedBridgeCapability[],
): boolean {
  return actual.length === expected.length
    && actual.every((capability, index) => capability === expected[index]);
}
