import { animeLiquidOrbDefaults } from '../rooms/anime-liquid-orb/state';
import { glassOpticsDefaults, glassOpticsDomains } from '../rooms/glass-optics/state';
import { ninthTideArchiveDefaults } from '../rooms/ninth-tide-archive/state';
import type {
  DeepReadonly,
  EmbeddedExhibitSettings,
  RoomId,
  RoomSettingsById,
} from '../rooms/types';
import { voxelWaterDefaults, voxelWaterDomains } from '../rooms/voxel-water/state';

export const URL_STATE_VERSION = '1';
export const URL_STATE_DEBOUNCE_MS = 150;
export const URL_STATE_RESERVED_KEYS = ['qaTime'] as const;

interface NumberFieldSchema {
  readonly type: 'number';
  readonly min: number;
  readonly max: number;
  readonly step: number;
}

interface BooleanFieldSchema {
  readonly type: 'boolean';
}

interface EnumFieldSchema<TValue extends string = string> {
  readonly type: 'enum';
  readonly values: readonly TValue[];
}

interface TransientFieldSchema {
  readonly type: 'transient';
}

type FieldSchemaFor<TValue> = [TValue] extends [string]
  ? EnumFieldSchema<Extract<TValue, string>>
  : [TValue] extends [boolean]
    ? BooleanFieldSchema
    : [TValue] extends [number]
      ? NumberFieldSchema
      : never;

type RoomUrlStateSchema = {
  readonly [TRoomId in RoomId]: RoomSettingsById[TRoomId] extends EmbeddedExhibitSettings
    ? {
        readonly [TKey in keyof RoomSettingsById[TRoomId]]: TransientFieldSchema;
      }
    : {
        readonly [TKey in keyof RoomSettingsById[TRoomId]]: FieldSchemaFor<
          RoomSettingsById[TRoomId][TKey]
        >;
      };
};

export const ROOM_URL_STATE_SCHEMA = {
  'voxel-water': {
    weather: { type: 'enum', values: ['clear', 'rain', 'storm'] },
    wind: { type: 'number', ...voxelWaterDomains.wind },
    rain: { type: 'number', ...voxelWaterDomains.rain },
    waveHeight: { type: 'number', ...voxelWaterDomains.waveHeight },
    toonSteps: { type: 'number', ...voxelWaterDomains.toonSteps },
    cloudCover: { type: 'number', ...voxelWaterDomains.cloudCover },
    swell: { type: 'number', ...voxelWaterDomains.swell },
    chop: { type: 'number', ...voxelWaterDomains.chop },
    foam: { type: 'number', ...voxelWaterDomains.foam },
    clarity: { type: 'number', ...voxelWaterDomains.clarity },
    surfaceDetail: { type: 'number', ...voxelWaterDomains.surfaceDetail },
    currentDirection: { type: 'number', ...voxelWaterDomains.currentDirection },
    currentStrength: { type: 'number', ...voxelWaterDomains.currentStrength },
    skyTime: { type: 'number', ...voxelWaterDomains.skyTime },
    colorTemperature: { type: 'number', ...voxelWaterDomains.colorTemperature },
    voxelColorVariance: { type: 'number', ...voxelWaterDomains.voxelColorVariance },
  },
  'glass-optics': {
    lightX: { type: 'number', ...glassOpticsDomains.lightX },
    lightY: { type: 'number', ...glassOpticsDomains.lightY },
    lightZ: { type: 'number', ...glassOpticsDomains.lightZ },
    beamSpread: { type: 'number', ...glassOpticsDomains.beamSpread },
    ior: { type: 'number', ...glassOpticsDomains.ior },
    roughness: { type: 'number', ...glassOpticsDomains.roughness },
    thickness: { type: 'number', ...glassOpticsDomains.thickness },
    autoRotate: { type: 'boolean' },
    showCaustics: { type: 'boolean' },
  },
  'anime-liquid-orb': {
    reloadToken: { type: 'transient' },
  },
  'ninth-tide-archive': {
    reloadToken: { type: 'transient' },
  },
} as const satisfies RoomUrlStateSchema;

const roomDefaults = {
  'voxel-water': voxelWaterDefaults,
  'glass-optics': glassOpticsDefaults,
  'anime-liquid-orb': animeLiquidOrbDefaults,
  'ninth-tide-archive': ninthTideArchiveDefaults,
} as const satisfies {
  readonly [TRoomId in RoomId]: DeepReadonly<RoomSettingsById[TRoomId]>;
};

type UrlFieldSchema = NumberFieldSchema
  | BooleanFieldSchema
  | EnumFieldSchema
  | TransientFieldSchema;

const STRICT_DECIMAL_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;
const STEP_TOLERANCE = 1e-9;

function cloneDefaults<TRoomId extends RoomId>(
  roomId: TRoomId,
): RoomSettingsById[TRoomId] {
  return { ...roomDefaults[roomId] } as RoomSettingsById[TRoomId];
}

function getRoomSchema(roomId: RoomId): Record<string, UrlFieldSchema> {
  return ROOM_URL_STATE_SCHEMA[roomId] as unknown as Record<string, UrlFieldSchema>;
}

function parseNumber(rawValue: string, schema: NumberFieldSchema): number | undefined {
  if (!STRICT_DECIMAL_PATTERN.test(rawValue)) return undefined;

  const value = Number(rawValue);
  if (!Number.isFinite(value) || value < schema.min || value > schema.max) {
    return undefined;
  }

  const stepOffset = (value - schema.min) / schema.step;
  const stepError = Math.abs(stepOffset - Math.round(stepOffset));
  const tolerance = STEP_TOLERANCE * Math.max(1, Math.abs(stepOffset));
  return stepError <= tolerance ? value : undefined;
}

function parseField(rawValue: string, schema: UrlFieldSchema): unknown | undefined {
  switch (schema.type) {
    case 'number':
      return parseNumber(rawValue, schema);
    case 'boolean':
      if (rawValue === 'true') return true;
      if (rawValue === 'false') return false;
      return undefined;
    case 'enum':
      return schema.values.includes(rawValue) ? rawValue : undefined;
    case 'transient':
      return undefined;
  }
}

export function parseRoomUrlSettings<TRoomId extends RoomId>(
  roomId: TRoomId,
  searchParams: URLSearchParams,
): RoomSettingsById[TRoomId] {
  const defaults = cloneDefaults(roomId);
  const schema = getRoomSchema(roomId);
  const serializableEntries = Object.entries(schema).filter(
    ([, fieldSchema]) => fieldSchema.type !== 'transient',
  );

  if (!serializableEntries.some(([key]) => searchParams.has(key))) {
    return defaults;
  }

  const versions = searchParams.getAll('v');
  if (versions.length !== 1 || versions[0] !== URL_STATE_VERSION) {
    return defaults;
  }

  const parsed = defaults as unknown as Record<string, unknown>;
  for (const [key, fieldSchema] of serializableEntries) {
    const rawValues = searchParams.getAll(key);
    if (rawValues.length === 0) continue;
    if (rawValues.length !== 1 || rawValues[0] === '') continue;

    const value = parseField(rawValues[0], fieldSchema);
    if (value !== undefined) parsed[key] = value;
  }

  return defaults;
}

export function serializeRoomUrlSettings<TRoomId extends RoomId>(
  roomId: TRoomId,
  settings: RoomSettingsById[TRoomId],
): URLSearchParams {
  const searchParams = new URLSearchParams();
  const schema = getRoomSchema(roomId);
  const defaults = roomDefaults[roomId] as unknown as Record<string, unknown>;
  const values = settings as unknown as Record<string, unknown>;

  for (const [key, fieldSchema] of Object.entries(schema)) {
    if (fieldSchema.type === 'transient' || Object.is(values[key], defaults[key])) {
      continue;
    }
    searchParams.set(key, String(values[key]));
  }

  if (searchParams.size > 0) {
    searchParams.set('v', URL_STATE_VERSION);
    searchParams.sort();
  }

  return searchParams;
}
