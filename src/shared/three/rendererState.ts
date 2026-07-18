import { Color, type WebGLRenderer } from 'three';

export interface RendererStateSnapshot {
  autoClear: boolean;
  autoClearColor: boolean;
  autoClearDepth: boolean;
  autoClearStencil: boolean;
  clearAlpha: number;
  clearColor: Color;
  outputColorSpace: WebGLRenderer['outputColorSpace'];
  toneMapping: WebGLRenderer['toneMapping'];
  toneMappingExposure: number;
  transmissionResolutionScale: number;
}

export function captureRendererState(
  renderer: WebGLRenderer,
): RendererStateSnapshot {
  return {
    autoClear: renderer.autoClear,
    autoClearColor: renderer.autoClearColor,
    autoClearDepth: renderer.autoClearDepth,
    autoClearStencil: renderer.autoClearStencil,
    clearAlpha: renderer.getClearAlpha(),
    clearColor: renderer.getClearColor(new Color()).clone(),
    outputColorSpace: renderer.outputColorSpace,
    toneMapping: renderer.toneMapping,
    toneMappingExposure: renderer.toneMappingExposure,
    transmissionResolutionScale: renderer.transmissionResolutionScale,
  };
}

export function restoreRendererState(
  renderer: WebGLRenderer,
  snapshot: RendererStateSnapshot,
): void {
  renderer.toneMapping = snapshot.toneMapping;
  renderer.toneMappingExposure = snapshot.toneMappingExposure;
  renderer.transmissionResolutionScale = snapshot.transmissionResolutionScale;
  renderer.outputColorSpace = snapshot.outputColorSpace;
  renderer.autoClear = snapshot.autoClear;
  renderer.autoClearColor = snapshot.autoClearColor;
  renderer.autoClearDepth = snapshot.autoClearDepth;
  renderer.autoClearStencil = snapshot.autoClearStencil;
  renderer.setClearColor(snapshot.clearColor, snapshot.clearAlpha);
}
