import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import type { Camera, Object3D, PMREMGenerator } from 'three';
import type { RoomAccentToken } from '../styles/designTokens';

export type RoomId =
  | 'voxel-water'
  | 'glass-optics'
  | 'anime-liquid-orb'
  | 'ninth-tide-archive';

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

export interface EmbeddedExhibitSettings {
  reloadToken: number;
}

export type EmbeddedPermission = 'autoplay' | 'microphone';

export type AnyRoomSettings =
  | VoxelWaterSettings
  | GlassOpticsSettings
  | EmbeddedExhibitSettings;

export type DeepReadonly<T> = T extends object
  ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
  : T;

export interface RoomStats {
  fps: number;
  frameTimeMs: number;
  drawCalls: number;
  drawCallsMax: number;
  trianglesAvg: number;
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
  renderer: {
    render: (scene: Object3D, camera: Camera) => void;
  };
  createPmremGenerator: () => PMREMGenerator;
  motionScale: number;
}

export interface RoomRuntime<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  updateSettings: (settings: DeepReadonly<TSettings>) => void;
  setMotionScale: (scale: number) => void;
  resize: (size: RoomSize) => void;
  render: (frame: RoomFrame) => void;
  pause?: () => void;
  resume?: () => void;
  dispose: () => void;
}

export interface RoomRuntimeModule<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  createRoomRuntime: (
    context: RoomRuntimeContext,
    initialSettings: DeepReadonly<TSettings>,
  ) => RoomRuntime<TSettings>;
}

export interface RoomControlsProps<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  settings: DeepReadonly<TSettings>;
  onChange: (settings: TSettings) => void;
  onPatch: (patch: DeepReadonly<Partial<TSettings>>) => void;
  onReset: () => void;
  t: (key: string) => string;
}

interface BaseRoomDefinition<TSettings extends AnyRoomSettings = AnyRoomSettings> {
  readonly id: RoomId;
  readonly kind: 'shader' | 'embedded';
  readonly titleKey: string;
  readonly kickerKey: string;
  readonly descriptionKey: string;
  readonly shortDescriptionKey: string;
  readonly i18nNamespace: string;
  readonly accent: RoomAccentToken;
  readonly techTags: readonly string[];
  readonly defaultPreset: DeepReadonly<TSettings>;
  readonly loadControls: () => Promise<{
    default: ComponentType<RoomControlsProps<AnyRoomSettings>>;
  }>;
  readonly ControlsComponent: LazyExoticComponent<
    ComponentType<RoomControlsProps<AnyRoomSettings>>
  >;
}

export interface ShaderRoomDefinition<TSettings extends AnyRoomSettings = AnyRoomSettings>
  extends BaseRoomDefinition<TSettings> {
  kind: 'shader';
  readonly loadScene: () => Promise<RoomRuntimeModule<TSettings>>;
}

export interface EmbeddedRoomDefinition extends BaseRoomDefinition<EmbeddedExhibitSettings> {
  kind: 'embedded';
  readonly embedPath: string;
  readonly permissions: readonly EmbeddedPermission[];
}

export type RoomDefinition<TSettings extends AnyRoomSettings = AnyRoomSettings> =
  | ShaderRoomDefinition<TSettings>
  | EmbeddedRoomDefinition;

export interface ActionButton {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}
