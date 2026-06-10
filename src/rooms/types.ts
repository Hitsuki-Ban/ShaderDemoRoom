import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import type { WebGLRenderer } from 'three';

export type RoomId = 'voxel-water' | 'glass-optics';

export interface VoxelWaterSettings {
  weather: 'clear' | 'rain' | 'storm';
  wind: number;
  rain: number;
  waveHeight: number;
  toonSteps: number;
  cloudCover: number;
  swell: number;
  chop: number;
  foam: number;
  clarity: number;
  surfaceDetail: number;
  currentDirection: number;
  currentStrength: number;
  skyTime: number;
  colorTemperature: number;
  voxelColorVariance: number;
}

export interface GlassOpticsSettings {
  lightX: number;
  lightY: number;
  lightZ: number;
  beamSpread: number;
  ior: number;
  roughness: number;
  thickness: number;
  autoRotate: boolean;
  showCaustics: boolean;
}

export type AnyRoomSettings = VoxelWaterSettings | GlassOpticsSettings;

export interface RoomStats {
  fps: number;
  drawCalls: number;
}

export interface RoomFrame {
  elapsed: number;
  delta: number;
}

export interface RoomSize {
  width: number;
  height: number;
  pixelRatio: number;
}

export interface RoomRuntimeContext {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  onStats: (stats: RoomStats) => void;
}

export interface RoomRuntime<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  updateSettings: (settings: TSettings) => void;
  resize: (size: RoomSize) => void;
  render: (frame: RoomFrame) => void;
  dispose: () => void;
}

export interface RoomRuntimeModule<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  createRoomRuntime: (
    context: RoomRuntimeContext,
    initialSettings: TSettings,
  ) => RoomRuntime<TSettings>;
}

export interface RoomControlsProps<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  settings: TSettings;
  onChange: (settings: TSettings) => void;
  onPatch: (patch: Partial<TSettings>) => void;
  onReset: () => void;
  t: (key: string) => string;
}

export interface RoomDefinition<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  id: RoomId;
  titleKey: string;
  kickerKey: string;
  descriptionKey: string;
  shortDescriptionKey: string;
  i18nNamespace: string;
  accent: string;
  techTags: string[];
  defaultPreset: TSettings;
  loadScene: () => Promise<RoomRuntimeModule<TSettings>>;
  loadControls: () => Promise<{ default: ComponentType<RoomControlsProps<TSettings>> }>;
  ControlsComponent: LazyExoticComponent<ComponentType<RoomControlsProps<AnyRoomSettings>>>;
}

export interface ActionButton {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}
