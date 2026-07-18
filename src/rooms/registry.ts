import { lazy } from 'react';
import type { ComponentType } from 'react';
import { roomAccentTokens } from '../styles/designTokens';
import { animeLiquidOrbDefaults } from './anime-liquid-orb/state';
import { glassOpticsDefaults } from './glass-optics/state';
import { ninthTideArchiveDefaults } from './ninth-tide-archive/state';
import type {
  AnyRoomSettings,
  RoomControlsProps,
  RoomDefinition,
  RoomId,
  RoomRuntimeModule,
} from './types';
import { voxelWaterDefaults } from './voxel-water/state';

type AnyControlsModule = {
  default: ComponentType<RoomControlsProps<AnyRoomSettings>>;
};

const loadVoxelWaterScene = () =>
  import('./voxel-water/runtime').then((module) => module as unknown as RoomRuntimeModule);
const loadVoxelWaterControls = () =>
  import('./voxel-water/Controls').then((module) => module as unknown as AnyControlsModule);
const loadGlassOpticsScene = () =>
  import('./glass-optics/runtime').then((module) => module as unknown as RoomRuntimeModule);
const loadGlassOpticsControls = () =>
  import('./glass-optics/Controls').then((module) => module as unknown as AnyControlsModule);
const loadAnimeLiquidOrbControls = () =>
  import('./anime-liquid-orb/Controls').then((module) => module as unknown as AnyControlsModule);
const loadNinthTideArchiveControls = () =>
  import('./ninth-tide-archive/Controls').then((module) => module as unknown as AnyControlsModule);

export const roomRegistry = [
  {
    id: 'voxel-water',
    kind: 'shader',
    titleKey: 'rooms.voxelWater.title',
    kickerKey: 'rooms.voxelWater.kicker',
    descriptionKey: 'rooms.voxelWater.description',
    shortDescriptionKey: 'rooms.voxelWater.shortDescription',
    i18nNamespace: 'rooms.voxelWater',
    accent: roomAccentTokens.cyan,
    techTags: ['Toon Shader', 'Voxel Surface', 'Weather Uniforms'],
    defaultPreset: voxelWaterDefaults,
    loadScene: loadVoxelWaterScene,
    loadControls: loadVoxelWaterControls,
    ControlsComponent: lazy(loadVoxelWaterControls),
  },
  {
    id: 'glass-optics',
    kind: 'shader',
    titleKey: 'rooms.glassOptics.title',
    kickerKey: 'rooms.glassOptics.kicker',
    descriptionKey: 'rooms.glassOptics.description',
    shortDescriptionKey: 'rooms.glassOptics.shortDescription',
    i18nNamespace: 'rooms.glassOptics',
    accent: roomAccentTokens.amber,
    techTags: ['MeshPhysicalMaterial', 'IOR', 'Light Path'],
    defaultPreset: glassOpticsDefaults,
    loadScene: loadGlassOpticsScene,
    loadControls: loadGlassOpticsControls,
    ControlsComponent: lazy(loadGlassOpticsControls),
  },
  {
    id: 'anime-liquid-orb',
    kind: 'embedded',
    titleKey: 'rooms.animeLiquidOrb.title',
    kickerKey: 'rooms.animeLiquidOrb.kicker',
    descriptionKey: 'rooms.animeLiquidOrb.description',
    shortDescriptionKey: 'rooms.animeLiquidOrb.shortDescription',
    i18nNamespace: 'rooms.animeLiquidOrb',
    accent: roomAccentTokens.magenta,
    techTags: ['NPR Fluid', 'Post FX', 'Interactive Phase'],
    defaultPreset: animeLiquidOrbDefaults,
    embedPath: 'exhibits/anime-liquid-orb/index.html',
    // WebAudio playback plus the exhibit's getUserMedia-driven MIC mode.
    permissions: ['autoplay', 'microphone'],
    loadControls: loadAnimeLiquidOrbControls,
    ControlsComponent: lazy(loadAnimeLiquidOrbControls),
  },
  {
    id: 'ninth-tide-archive',
    kind: 'embedded',
    titleKey: 'rooms.ninthTideArchive.title',
    kickerKey: 'rooms.ninthTideArchive.kicker',
    descriptionKey: 'rooms.ninthTideArchive.description',
    shortDescriptionKey: 'rooms.ninthTideArchive.shortDescription',
    i18nNamespace: 'rooms.ninthTideArchive',
    accent: roomAccentTokens.mint,
    techTags: ['Audio Reactive', 'Archive Core', 'Post FX'],
    defaultPreset: ninthTideArchiveDefaults,
    embedPath: 'exhibits/ninth-tide-archive/index.html',
    // Preserve user-initiated archive audio playback inside the iframe.
    permissions: ['autoplay'],
    loadControls: loadNinthTideArchiveControls,
    ControlsComponent: lazy(loadNinthTideArchiveControls),
  },
] satisfies readonly RoomDefinition[];

export function getRoomById(roomId: string | undefined): RoomDefinition<AnyRoomSettings> | undefined {
  return roomRegistry.find((room) => room.id === roomId) as
    | RoomDefinition<AnyRoomSettings>
    | undefined;
}

export function isRoomId(roomId: string | undefined): roomId is RoomId {
  return roomRegistry.some((room) => room.id === roomId);
}
