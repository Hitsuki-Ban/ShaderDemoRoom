import { describe, expect, it } from 'vitest';
import shaderCanvasSource from './ShaderCanvas.tsx?raw';

describe('ShaderCanvas stats', () => {
  it('uses uncapped frame delta for FPS reporting while capping simulation delta', () => {
    expect(shaderCanvasSource).toContain('const rawDelta = timer.getDelta()');
    expect(shaderCanvasSource).toContain('const delta = Math.min(rawDelta, 0.05)');
    expect(shaderCanvasSource).toContain('fpsElapsed += rawDelta');
    expect(shaderCanvasSource).not.toContain('fpsElapsed += delta');
  });

  it('uses a lower internal render scale for the fill-rate heavy voxel water room', () => {
    expect(shaderCanvasSource).toContain("roomId === 'voxel-water' ? 0.6 : 2");
    expect(shaderCanvasSource).toContain("antialias: room.id !== 'voxel-water'");
    expect(shaderCanvasSource).toContain('getRenderPixelRatio(room.id)');
  });
});
