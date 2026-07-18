import { describe, expect, it } from 'vitest';
import {
  capabilitiesMatch,
  createEmbeddedBridgeCommand,
  parseEmbeddedBridgeEvent,
} from './bridge';

const instanceId = '123e4567-e89b-42d3-a456-426614174000';

describe('embedded bridge protocol', () => {
  it('parses ready and stats events with exact schemas', () => {
    expect(parseEmbeddedBridgeEvent({
      context: 'shader-demo-room',
      v: 1,
      instanceId,
      type: 'ready',
      payload: { capabilities: ['pause', 'stats', 'set-mode', 'set-quality'] },
    })).toEqual({
      context: 'shader-demo-room',
      v: 1,
      instanceId,
      type: 'ready',
      payload: { capabilities: ['pause', 'stats', 'set-mode', 'set-quality'] },
    });

    expect(parseEmbeddedBridgeEvent({
      context: 'shader-demo-room',
      v: 1,
      instanceId,
      type: 'stats',
      payload: { fps: 59.8, frameTimeMs: 16.7, frameCount: 120, paused: false },
    })).toMatchObject({ type: 'stats', payload: { frameCount: 120, paused: false } });
  });

  it.each([
    [{ context: 'shader-demo-room', v: 2, instanceId, type: 'ready', payload: { capabilities: [] } }],
    [{ context: 'shader-demo-room', v: 1, instanceId: 'old', type: 'ready', payload: { capabilities: [] } }],
    [{ context: 'shader-demo-room', v: 1, instanceId, type: 'ready', payload: { capabilities: ['stats', 'pause'] } }],
    [{ context: 'shader-demo-room', v: 1, instanceId, type: 'ready', payload: { capabilities: ['pause'], extra: true } }],
    [{ context: 'shader-demo-room', v: 1, instanceId, type: 'stats', payload: { fps: NaN, frameTimeMs: 0, frameCount: 0, paused: false } }],
  ])('rejects invalid event %j', (event) => {
    expect(() => parseEmbeddedBridgeEvent(event)).toThrow();
  });

  it('creates versioned commands and compares canonical capabilities', () => {
    expect(createEmbeddedBridgeCommand(instanceId, {
      type: 'set-paused',
      payload: { paused: true },
    })).toEqual({
      context: 'shader-demo-room',
      v: 1,
      instanceId,
      type: 'set-paused',
      payload: { paused: true },
    });
    expect(capabilitiesMatch(
      ['pause', 'stats', 'set-preview'],
      ['pause', 'stats', 'set-preview'],
    )).toBe(true);
    expect(capabilitiesMatch(
      ['pause', 'stats'],
      ['pause', 'stats', 'set-preview'],
    )).toBe(false);
  });
});
