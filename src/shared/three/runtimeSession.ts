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

export interface RuntimeSession<
  TSettings extends AnyRoomSettings = AnyRoomSettings,
> {
  runtime: RoomRuntime<TSettings>;
  rendererState: RendererStateSnapshot;
}

export function createRuntimeSession<TSettings extends AnyRoomSettings>(
  renderer: WebGLRenderer,
  canvas: HTMLCanvasElement,
  module: RoomRuntimeModule<TSettings>,
  settings: DeepReadonly<TSettings>,
  motionScale: number,
): RuntimeSession<TSettings> {
  const rendererState = captureRendererState(renderer);

  try {
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
    return { rendererState, runtime };
  } catch (error) {
    restoreRendererState(renderer, rendererState);
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
    renderer.info.reset();
  }
}
