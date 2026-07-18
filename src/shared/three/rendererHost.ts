import { SRGBColorSpace, WebGLRenderer } from 'three';
import {
  colorTokenNames,
  readRequiredRootColorToken,
} from '../../styles/designTokens';
import { getRendererAntialias } from './renderPolicy';
import {
  getRendererEnvironment,
  type RendererEnvironment,
} from './rendererEnvironment';

export interface PersistentRendererHost {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  environment: RendererEnvironment;
}

export function createPersistentRendererHost(): PersistentRendererHost {
  const canvas = document.createElement('canvas');
  canvas.className = 'shader-canvas';
  canvas.dataset.rendererHost = 'shell';

  const renderer = new WebGLRenderer({
    canvas,
    antialias: getRendererAntialias(),
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.info.autoReset = false;
  renderer.info.reset();
  renderer.setClearColor(
    readRequiredRootColorToken(colorTokenNames.shellBackground),
    1,
  );
  const environment = getRendererEnvironment(renderer);

  return { canvas, renderer, environment };
}
