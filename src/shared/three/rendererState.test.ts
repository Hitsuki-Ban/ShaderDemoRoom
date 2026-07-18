import { describe, expect, it, vi } from 'vitest';
import {
  ACESFilmicToneMapping,
  Color,
  LinearSRGBColorSpace,
  NoToneMapping,
  SRGBColorSpace,
  type WebGLRenderer,
} from 'three';
import type {
  EmbeddedExhibitSettings,
  RoomRuntimeModule,
} from '../../rooms/types';
import { captureRendererState, restoreRendererState } from './rendererState';
import { createRuntimeSession, disposeRuntimeSession } from './runtimeSession';

function createRendererHarness() {
  let clearColor = new Color(0x112233);
  let clearAlpha = 0.75;
  const renderer = {
    autoClear: true,
    autoClearColor: true,
    autoClearDepth: true,
    autoClearStencil: true,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    transmissionResolutionScale: 1,
    getClearAlpha: () => clearAlpha,
    getClearColor: (target: Color) => target.copy(clearColor),
    setClearColor: (color: Color, alpha: number) => {
      clearColor = color.clone();
      clearAlpha = alpha;
    },
    render: vi.fn(),
    info: {
      autoReset: false,
      render: { calls: 0, triangles: 0 },
      reset: vi.fn(),
    },
  } as unknown as WebGLRenderer;

  return {
    renderer,
    readClear: () => ({ alpha: clearAlpha, color: clearColor.getHex() }),
  };
}

function mutateRenderer(renderer: WebGLRenderer, index = 0) {
  renderer.autoClear = false;
  renderer.autoClearColor = false;
  renderer.autoClearDepth = false;
  renderer.autoClearStencil = false;
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2 + index;
  renderer.transmissionResolutionScale = 0.5;
  renderer.setClearColor(new Color(0xff0000 + index), 0.2);
}

describe('persistent renderer state ownership', () => {
  it('restores every governed renderer field from an independent color snapshot', () => {
    const { renderer, readClear } = createRendererHarness();
    const snapshot = captureRendererState(renderer);
    mutateRenderer(renderer);
    snapshot.clearColor.set(0x112233);

    restoreRendererState(renderer, snapshot);

    expect(renderer.autoClear).toBe(true);
    expect(renderer.autoClearColor).toBe(true);
    expect(renderer.autoClearDepth).toBe(true);
    expect(renderer.autoClearStencil).toBe(true);
    expect(renderer.outputColorSpace).toBe(SRGBColorSpace);
    expect(renderer.toneMapping).toBe(NoToneMapping);
    expect(renderer.toneMappingExposure).toBe(1);
    expect(renderer.transmissionResolutionScale).toBe(1);
    expect(readClear()).toEqual({ alpha: 0.75, color: 0x112233 });
  });

  it('restores state across a full room cycle and a direct shader transition', () => {
    const { renderer, readClear } = createRendererHarness();
    const baseline = captureRendererState(renderer);
    const canvas = document.createElement('canvas');
    const settings: EmbeddedExhibitSettings = { reloadToken: 0 };

    for (let index = 0; index < 5; index += 1) {
      const module: RoomRuntimeModule<EmbeddedExhibitSettings> = {
        createRoomRuntime(context) {
          expect('info' in context.renderer).toBe(false);
          mutateRenderer(renderer, index);
          return {
            updateSettings: vi.fn(),
            setMotionScale: vi.fn(),
            resize: vi.fn(),
            render: vi.fn(),
            dispose: vi.fn(),
          };
        },
      };
      const session = createRuntimeSession(renderer, canvas, module, settings, 1);
      disposeRuntimeSession(renderer, session);

      expect(captureRendererState(renderer)).toEqual(baseline);
      expect(readClear()).toEqual({ alpha: 0.75, color: 0x112233 });
    }
  });

  it('restores state when runtime creation or disposal throws', () => {
    const { renderer } = createRendererHarness();
    const baseline = captureRendererState(renderer);
    const canvas = document.createElement('canvas');
    const settings: EmbeddedExhibitSettings = { reloadToken: 0 };
    const createFailure: RoomRuntimeModule<EmbeddedExhibitSettings> = {
      createRoomRuntime() {
        mutateRenderer(renderer);
        throw new Error('create failed');
      },
    };

    expect(() =>
      createRuntimeSession(renderer, canvas, createFailure, settings, 1),
    ).toThrow('create failed');
    expect(captureRendererState(renderer)).toEqual(baseline);

    const disposeFailure: RoomRuntimeModule<EmbeddedExhibitSettings> = {
      createRoomRuntime() {
        mutateRenderer(renderer);
        return {
          updateSettings: vi.fn(),
          setMotionScale: vi.fn(),
          resize: vi.fn(),
          render: vi.fn(),
          dispose: vi.fn(() => {
            throw new Error('dispose failed');
          }),
        };
      },
    };
    const session = createRuntimeSession(
      renderer,
      canvas,
      disposeFailure,
      settings,
      1,
    );

    expect(() => disposeRuntimeSession(renderer, session)).toThrow('dispose failed');
    expect(captureRendererState(renderer)).toEqual(baseline);
  });
});
