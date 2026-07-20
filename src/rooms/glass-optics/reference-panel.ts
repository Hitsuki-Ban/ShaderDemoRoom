import {
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
} from 'three';

export const REFERENCE_PANEL_TEXTURE_WIDTH = 512;
export const REFERENCE_PANEL_TEXTURE_HEIGHT = 288;

type Rgb = readonly [number, number, number];

const background: Rgb = [0.012, 0.018, 0.021];
const ink: Rgb = [0.58, 0.62, 0.61];
const midInk: Rgb = [0.28, 0.34, 0.35];
const toneInk: Rgb = [0.48, 0.48, 0.48];
const slantedInk: Rgb = [0.22, 0.22, 0.22];
const cyanInk: Rgb = [0.26, 0.91, 1];
const amberInk: Rgb = [1, 0.72, 0.28];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (lower: number, upper: number, value: number) => {
  const normalized = clamp01((value - lower) / (upper - lower));
  return normalized * normalized * (3 - 2 * normalized);
};
const mix = (base: Rgb, target: Rgb, amount: number): Rgb => [
  base[0] + (target[0] - base[0]) * amount,
  base[1] + (target[1] - base[1]) * amount,
  base[2] + (target[2] - base[2]) * amount,
];
const rectangle = (
  u: number,
  v: number,
  centerX: number,
  centerY: number,
  halfWidth: number,
  halfHeight: number,
) => Math.abs(u - centerX) <= halfWidth && Math.abs(v - centerY) <= halfHeight;
const rectangleStroke = (
  u: number,
  v: number,
  centerX: number,
  centerY: number,
  halfWidth: number,
  halfHeight: number,
  thickness: number,
) => rectangle(u, v, centerX, centerY, halfWidth, halfHeight)
  && !rectangle(
    u,
    v,
    centerX,
    centerY,
    halfWidth - thickness,
    halfHeight - thickness,
  );
const circle = (
  u: number,
  v: number,
  centerX: number,
  centerY: number,
  radius: number,
) => Math.hypot(u - centerX, v - centerY) <= radius;
const ring = (
  u: number,
  v: number,
  centerX: number,
  centerY: number,
  radius: number,
  thickness: number,
) => Math.abs(Math.hypot(u - centerX, v - centerY) - radius) <= thickness;
const threeBarGroup = (
  u: number,
  v: number,
  centerX: number,
  centerY: number,
  barHalfWidth: number,
  barHalfHeight: number,
  spacing: number,
  horizontal: boolean,
) => {
  const localX = horizontal ? v - centerY : u - centerX;
  const localY = horizontal ? u - centerX : v - centerY;
  return [-spacing, 0, spacing].some((offset) =>
    Math.abs(localX - offset) <= barHalfWidth && Math.abs(localY) <= barHalfHeight);
};
const checkerTarget = (u: number, v: number) => {
  if (!rectangle(u, v, 0.5, 0.205, 0.175, 0.09)) return false;
  const cellX = Math.floor(((u - 0.325) / 0.35) * 4);
  const cellY = Math.floor(((v - 0.115) / 0.18) * 3);
  return (cellX + cellY) % 2 !== 0;
};
const siemensStar = (u: number, v: number) => {
  const localX = (u - 0.5) * (3.8 / 2.7);
  const localY = v - 0.56;
  const radius = Math.hypot(localX, localY);
  if (radius <= 0.027) return true;
  return radius >= 0.035
    && radius <= 0.16
    && Math.sin(Math.atan2(localY, localX) * 12) >= 0;
};
const fract = (value: number) => value - Math.floor(value);

function sampleReferencePanel(u: number, v: number): Rgb {
  const star = siemensStar(u, v);
  const frame = rectangleStroke(u, v, 0.5, 0.5, 0.47, 0.455, 0.014)
    || rectangleStroke(u, v, 0.5, 0.5, 0.435, 0.42, 0.006);
  const axis = rectangle(u, v, 0.5, 0.56, 0.19, 0.0045)
    || rectangle(u, v, 0.5, 0.56, 0.0035, 0.205);
  const barGroups = threeBarGroup(u, v, 0.205, 0.67, 0.014, 0.085, 0.044, false)
    || threeBarGroup(u, v, 0.205, 0.4, 0.011, 0.065, 0.035, true)
    || threeBarGroup(u, v, 0.795, 0.66, 0.014, 0.085, 0.044, true)
    || threeBarGroup(u, v, 0.795, 0.4, 0.011, 0.065, 0.035, false);
  const checker = checkerTarget(u, v);
  const checkerFrame = rectangleStroke(u, v, 0.5, 0.205, 0.188, 0.103, 0.006);
  const resolutionWedge = rectangle(u, v, 0.69, 0.49, 0.15, 0.105)
    && Math.abs(fract((u - 0.6) * 20) - 0.5) < 0.12;
  const orientationMarks = circle(u, v, 0.115, 0.845, 0.027)
    || ring(u, v, 0.865, 0.835, 0.033, 0.007)
    || ring(u, v, 0.865, 0.835, 0.015, 0.005)
    || rectangle(u, v, 0.115, 0.145, 0.055, 0.008)
    || rectangle(u, v, 0.087, 0.173, 0.008, 0.036)
    || rectangle(u, v, 0.885, 0.145, 0.055, 0.008);

  let color = background;
  if (
    frame
    || star
    || barGroups
    || checker
    || checkerFrame
    || resolutionWedge
    || orientationMarks
  ) {
    const lowerInkGain = 0.38 + 0.62 * smoothstep(0.04, 0.2, v);
    color = [ink[0] * lowerInkGain, ink[1] * lowerInkGain, ink[2] * lowerInkGain];
  }
  if (axis && !star) color = mix(color, midInk, 0.72);
  if (
    rectangle(u, v, 0.2, 0.235, 0.075, 0.075)
    || rectangle(u, v, 0.8, 0.235, 0.075, 0.075)
  ) color = toneInk;

  const deltaX = u - 0.31;
  const deltaY = v - 0.82;
  const slantedX = 0.9945 * deltaX - 0.1045 * deltaY;
  const slantedY = 0.1045 * deltaX + 0.9945 * deltaY;
  if (Math.abs(slantedX) <= 0.078 && Math.abs(slantedY) <= 0.038) {
    color = mix(color, slantedInk, 0.72);
  }
  if (circle(u, v, 0.74, 0.825, 0.012)) color = cyanInk;
  if (circle(u, v, 0.775, 0.825, 0.012)) color = amberInk;
  return color;
}

function rasterizeReferencePanel() {
  const pixels = new Uint8Array(
    REFERENCE_PANEL_TEXTURE_WIDTH * REFERENCE_PANEL_TEXTURE_HEIGHT * 4,
  );
  const offsets = [0.25, 0.75];
  for (let y = 0; y < REFERENCE_PANEL_TEXTURE_HEIGHT; y += 1) {
    for (let x = 0; x < REFERENCE_PANEL_TEXTURE_WIDTH; x += 1) {
      const accumulated = [0, 0, 0];
      for (const offsetY of offsets) {
        for (const offsetX of offsets) {
          const sample = sampleReferencePanel(
            (x + offsetX) / REFERENCE_PANEL_TEXTURE_WIDTH,
            (y + offsetY) / REFERENCE_PANEL_TEXTURE_HEIGHT,
          );
          accumulated[0] += sample[0];
          accumulated[1] += sample[1];
          accumulated[2] += sample[2];
        }
      }
      const pixelIndex = (y * REFERENCE_PANEL_TEXTURE_WIDTH + x) * 4;
      pixels[pixelIndex] = Math.round((accumulated[0] / 4) * 255);
      pixels[pixelIndex + 1] = Math.round((accumulated[1] / 4) * 255);
      pixels[pixelIndex + 2] = Math.round((accumulated[2] / 4) * 255);
      pixels[pixelIndex + 3] = 255;
    }
  }
  return pixels;
}

const referencePanelPixels = rasterizeReferencePanel();

export function createReferencePanelTexture() {
  const texture = new DataTexture(
    new Uint8Array(referencePanelPixels),
    REFERENCE_PANEL_TEXTURE_WIDTH,
    REFERENCE_PANEL_TEXTURE_HEIGHT,
  );
  texture.name = 'glass-optics-calibration-target-map';
  texture.magFilter = LinearFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.flipY = false;
  texture.colorSpace = NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}
