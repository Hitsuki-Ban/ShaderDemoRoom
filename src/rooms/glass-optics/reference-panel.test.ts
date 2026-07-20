import { describe, expect, it } from 'vitest';
import {
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
} from 'three';
import {
  REFERENCE_PANEL_TEXTURE_HEIGHT,
  REFERENCE_PANEL_TEXTURE_WIDTH,
  createReferencePanelTexture,
} from './reference-panel';

function sample(texture: DataTexture, u: number, v: number) {
  const x = Math.min(
    REFERENCE_PANEL_TEXTURE_WIDTH - 1,
    Math.floor(u * REFERENCE_PANEL_TEXTURE_WIDTH),
  );
  const y = Math.min(
    REFERENCE_PANEL_TEXTURE_HEIGHT - 1,
    Math.floor(v * REFERENCE_PANEL_TEXTURE_HEIGHT),
  );
  const pixels = texture.image.data as Uint8Array;
  const index = (y * REFERENCE_PANEL_TEXTURE_WIDTH + x) * 4;
  return [...pixels.slice(index, index + 4)];
}

describe('Glass Optics calibration reference texture', () => {
  it('creates one deterministic mip-filtered linear RGBA texture', () => {
    const texture = createReferencePanelTexture();

    expect(texture).toBeInstanceOf(DataTexture);
    expect(texture.image.width).toBe(REFERENCE_PANEL_TEXTURE_WIDTH);
    expect(texture.image.height).toBe(REFERENCE_PANEL_TEXTURE_HEIGHT);
    expect(texture.image.data).toHaveLength(
      REFERENCE_PANEL_TEXTURE_WIDTH * REFERENCE_PANEL_TEXTURE_HEIGHT * 4,
    );
    expect(texture.magFilter).toBe(LinearFilter);
    expect(texture.minFilter).toBe(LinearMipmapLinearFilter);
    expect(texture.generateMipmaps).toBe(true);
    expect(texture.flipY).toBe(false);
    expect(texture.colorSpace).toBe(NoColorSpace);
    texture.dispose();
  });

  it('encodes the chart frame, star, bars, checker, wedge, and registration marks', () => {
    const texture = createReferencePanelTexture();
    const background = sample(texture, 0.5, 0.9);
    const frame = sample(texture, 0.5, 0.948);
    const star = sample(texture, 0.5, 0.56);
    const bars = sample(texture, 0.205, 0.67);
    const checkerOn = sample(texture, 0.5, 0.205);
    const checkerOff = sample(texture, 0.43, 0.205);
    const wedgeOn = sample(texture, 0.625, 0.49);
    const wedgeOff = sample(texture, 0.61, 0.49);
    const cyan = sample(texture, 0.74, 0.825);
    const amber = sample(texture, 0.775, 0.825);

    expect(Math.max(...background.slice(0, 3))).toBeLessThan(10);
    for (const mark of [frame, star, bars, checkerOn, wedgeOn]) {
      expect(Math.min(...mark.slice(0, 3))).toBeGreaterThan(100);
      expect(mark[3]).toBe(255);
    }
    expect(Math.max(...checkerOff.slice(0, 3))).toBeLessThan(10);
    expect(Math.max(...wedgeOff.slice(0, 3))).toBeLessThan(10);
    expect(cyan[0]).toBeLessThan(100);
    expect(cyan[1]).toBeGreaterThan(200);
    expect(cyan[2]).toBeGreaterThan(240);
    expect(amber[0]).toBeGreaterThan(240);
    expect(amber[1]).toBeGreaterThan(150);
    expect(amber[2]).toBeLessThan(100);
    texture.dispose();
  });
});
