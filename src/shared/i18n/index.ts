export type Locale = 'en' | 'zh-CN';

interface MessageTree {
  [key: string]: string | MessageTree;
}
export type MessageCatalog = Record<string, MessageTree>;

export const defaultLocale: Locale = 'en';

export const messages: MessageCatalog = {
  en: {
    app: {
      title: 'Shader Demo Room',
      subtitle: 'Static technical-art showroom',
      rooms: 'Rooms',
      viewport: 'Shader viewport',
      inspector: 'Room inspector',
      status: 'Deployment status',
      staticReady: 'GitHub Pages ready',
      sceneStats: 'Scene statistics',
      language: 'Language',
      source: 'Source',
      loadingControls: 'Loading controls...',
      navigationHint: 'Switch rooms without remounting the WebGL shell.',
      reset: 'Reset',
      preset: 'Preset',
    },
    controls: {
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
    rooms: {
      voxelWater: {
        title: 'Voxel Water',
        kicker: 'Toon water room',
        shortDescription: 'Weather-driven stepped ocean shader',
        description:
          'A stylized voxel water plane combines stepped wave bands, animated columns, rain density, and storm lighting.',
        controls: {
          weather: 'Weather',
          wind: 'Wind',
          rain: 'Rain',
          waveHeight: 'Wave Height',
          toonSteps: 'Toon Steps',
          cloudCover: 'Cloud Cover',
          clear: 'Clear',
          rainy: 'Rain',
          storm: 'Storm',
        },
      },
      glassOptics: {
        title: 'Glass Optics',
        kicker: 'Refraction room',
        shortDescription: 'Glass reflection with movable light paths',
        description:
          'A transparent glass body exposes refraction, reflection, IOR, thickness, and simplified beam-path controls.',
        controls: {
          lightPath: 'Light Path',
          lightX: 'Light X',
          lightY: 'Light Y',
          lightZ: 'Light Z',
          beamSpread: 'Beam Spread',
          ior: 'IOR',
          roughness: 'Roughness',
          thickness: 'Thickness',
          autoRotate: 'Auto Rotate',
          showCaustics: 'Show Caustics',
        },
      },
    },
  },
  'zh-CN': {
    app: {
      title: 'Shader Demo Room',
      subtitle: '静态技术美术展厅',
      rooms: '展览室',
      viewport: 'Shader 视窗',
      inspector: '展厅控制器',
      status: '部署状态',
      staticReady: 'GitHub Pages 就绪',
      sceneStats: '场景统计',
      language: '语言',
      source: '源码',
      loadingControls: '正在加载控制器...',
      navigationHint: '切换展厅时保持 WebGL 外壳稳定。',
      reset: '重置',
      preset: '预设',
    },
    controls: {
      enabled: '开启',
      disabled: '关闭',
    },
    rooms: {
      voxelWater: {
        title: '体素水体',
        kicker: 'Toon 水体展厅',
        shortDescription: '天气驱动的阶梯海面 shader',
        description:
          '阶梯化波带、体素水柱、雨量和风暴光照共同展示风格化水体效果。',
        controls: {
          weather: '天气',
          wind: '风速',
          rain: '雨量',
          waveHeight: '浪高',
          toonSteps: '色阶',
          cloudCover: '云量',
          clear: '晴朗',
          rainy: '降雨',
          storm: '风暴',
        },
      },
      glassOptics: {
        title: '玻璃光学',
        kicker: '折射展厅',
        shortDescription: '可移动光路的玻璃反射/折射',
        description:
          '通过透明玻璃体、IOR、厚度、粗糙度和简化光路控制展示折射反射效果。',
        controls: {
          lightPath: '光路',
          lightX: '光源 X',
          lightY: '光源 Y',
          lightZ: '光源 Z',
          beamSpread: '光束扩散',
          ior: '折射率',
          roughness: '粗糙度',
          thickness: '厚度',
          autoRotate: '自动旋转',
          showCaustics: '显示焦散',
        },
      },
    },
  },
};

function lookup(catalog: MessageTree | undefined, key: string): string | undefined {
  if (!catalog) {
    return undefined;
  }

  let cursor: string | MessageTree | undefined = catalog;

  for (const part of key.split('.')) {
    if (!cursor || typeof cursor === 'string') {
      return undefined;
    }
    cursor = cursor[part];
  }

  return typeof cursor === 'string' ? cursor : undefined;
}

export function createTranslator(
  catalog: MessageCatalog,
  locale: string = defaultLocale,
) {
  return (key: string) =>
    lookup(catalog[locale], key) ?? lookup(catalog[defaultLocale], key) ?? key;
}
