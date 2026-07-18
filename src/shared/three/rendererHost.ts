import { SRGBColorSpace, WebGLRenderer } from 'three';
import {
  colorTokenNames,
  readRequiredRootColorToken,
} from '../../styles/designTokens';
import { getRendererAntialias } from './renderPolicy';

export interface PersistentRendererHost {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
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
  renderer.setClearColor(
    readRequiredRootColorToken(colorTokenNames.shellBackground),
    1,
  );

  return { canvas, renderer };
}
