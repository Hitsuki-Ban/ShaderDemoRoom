import { PMREMGenerator, type WebGLRenderer } from 'three';
import type {
  AnyRoomSettings,
  DeepReadonly,
  RoomRuntime,
  RoomRuntimeModule,
} from '../../rooms/types';
import {
  captureRendererState,
  restoreRendererState,
  type RendererStateSnapshot,
} from './rendererState';
import {
  applyRendererProfile,
  validateRendererProfile,
  type RendererProfile,
} from './rendererProfile';

export interface RuntimeSession<
  TSettings extends AnyRoomSettings = AnyRoomSettings,
> {
  canvas: HTMLCanvasElement;
  runtime: RoomRuntime<TSettings>;
  rendererState: RendererStateSnapshot;
}

function writeRendererProfileAudit(
  canvas: HTMLCanvasElement,
  renderer: WebGLRenderer,
): void {
  canvas.dataset.rendererTransmissionResolutionScale = String(
    renderer.transmissionResolutionScale,
  );
}

export function createRuntimeSession<TSettings extends AnyRoomSettings>(
  renderer: WebGLRenderer,
  canvas: HTMLCanvasElement,
  module: RoomRuntimeModule<TSettings>,
  rendererProfile: RendererProfile,
  settings: DeepReadonly<TSettings>,
  motionScale: number,
): RuntimeSession<TSettings> {
  const rendererState = captureRendererState(renderer);

  try {
    validateRendererProfile(rendererProfile);
    applyRendererProfile(renderer, rendererProfile);
    writeRendererProfileAudit(canvas, renderer);
    const runtime = module.createRoomRuntime(
      {
        canvas,
        renderer: {
          render: (scene, camera) => renderer.render(scene, camera),
        },
        createPmremGenerator: () => new PMREMGenerator(renderer),
        motionScale,
      },
      settings,
    );
    return { canvas, rendererState, runtime };
  } catch (error) {
    restoreRendererState(renderer, rendererState);
    writeRendererProfileAudit(canvas, renderer);
    renderer.info.reset();
    throw error;
  }
}

export function disposeRuntimeSession<TSettings extends AnyRoomSettings>(
  renderer: WebGLRenderer,
  session: RuntimeSession<TSettings>,
): void {
  try {
    session.runtime.dispose();
  } finally {
    restoreRendererState(renderer, session.rendererState);
    writeRendererProfileAudit(session.canvas, renderer);
    renderer.info.reset();
  }
}
