import { lazy } from 'react';
import type { ComponentType } from 'react';
import { glassOpticsDefaults } from './glass-optics/state';
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

export const roomRegistry = [
  {
    id: 'voxel-water',
    titleKey: 'rooms.voxelWater.title',
    kickerKey: 'rooms.voxelWater.kicker',
    descriptionKey: 'rooms.voxelWater.description',
    shortDescriptionKey: 'rooms.voxelWater.shortDescription',
    i18nNamespace: 'rooms.voxelWater',
    accent: '#34d5ff',
    techTags: ['Toon Shader', 'Voxel Surface', 'Weather Uniforms'],
    defaultPreset: voxelWaterDefaults,
    loadScene: loadVoxelWaterScene,
    loadControls: loadVoxelWaterControls,
    ControlsComponent: lazy(loadVoxelWaterControls),
  },
  {
    id: 'glass-optics',
    titleKey: 'rooms.glassOptics.title',
    kickerKey: 'rooms.glassOptics.kicker',
    descriptionKey: 'rooms.glassOptics.description',
    shortDescriptionKey: 'rooms.glassOptics.shortDescription',
    i18nNamespace: 'rooms.glassOptics',
    accent: '#ffbd5a',
    techTags: ['MeshPhysicalMaterial', 'IOR', 'Light Path'],
    defaultPreset: glassOpticsDefaults,
    loadScene: loadGlassOpticsScene,
    loadControls: loadGlassOpticsControls,
    ControlsComponent: lazy(loadGlassOpticsControls),
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
