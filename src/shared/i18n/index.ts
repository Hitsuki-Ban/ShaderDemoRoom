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
      embeddedRuntime: 'Embedded runtime',
      standaloneExhibit: 'Standalone exhibit',
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
          swell: 'Swell',
          chop: 'Chop',
          foam: 'Foam',
          clarity: 'Clarity',
          surfaceDetail: 'Surface Detail',
          current: 'Current',
          currentDirection: 'Current Direction',
          currentStrength: 'Current Strength',
          skyAndColor: 'Sky & Color',
          skyTime: 'Sky Time',
          colorTemperature: 'Color Temperature',
          voxelColorVariance: 'Voxel Color Variation',
          rotateCurrent: 'Rotate current',
          shiftSky: 'Shift sky',
          shiftPalette: 'Shift palette',
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
      animeLiquidOrb: {
        title: 'Anime Liquid Orb',
        kicker: 'NPR fluid specimen',
        shortDescription: 'Interactive toon liquid character',
        description:
          'MIZU//KOKORO is an embedded anime-style liquid specimen with phase switching, sculptable ripples, bloom, chroma, and sound-reactive controls inside the exhibit.',
        controls: {
          runtime: 'Embedded Exhibit',
          runtimeNote:
            'This room preserves the original full-screen exhibit runtime inside the shared showroom shell.',
          reload: 'Reload exhibit',
          openStandalone: 'Open standalone',
        },
      },
      ninthTideArchive: {
        title: 'Ninth Tide Archive',
        kicker: 'Audio archive room',
        shortDescription: 'Audio-reactive shoreless archive',
        description:
          'Archive of the Ninth Tide: The Shoreless Layer is a submerged Three.js installation driven by synthetic or user-started audio, with sonar pulses, depth telemetry, and post-processing.',
        controls: {
          runtime: 'Embedded Exhibit',
          runtimeNote:
            'Use the dive gate inside the frame to start audio or enter silently. The showroom controls reload or open the standalone version.',
          reload: 'Reload exhibit',
          openStandalone: 'Open standalone',
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
      embeddedRuntime: '嵌入式运行时',
      standaloneExhibit: '独立展品',
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
          swell: '涌浪',
          chop: '碎浪',
          foam: '泡沫',
          clarity: '清澈度',
          surfaceDetail: '表面细节',
          current: '洋流',
          currentDirection: '洋流方向',
          currentStrength: '洋流强度',
          skyAndColor: '天空与色彩',
          skyTime: '天空时间',
          colorTemperature: '色温',
          voxelColorVariance: '体素色彩变化',
          rotateCurrent: '旋转洋流',
          shiftSky: '切换天空',
          shiftPalette: '切换色彩',
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
      animeLiquidOrb: {
        title: '动漫液体球',
        kicker: 'NPR 流体标本',
        shortDescription: '可交互的 Toon 液态角色',
        description:
          'MIZU//KOKORO 以嵌入式展品形式保留原始动漫风格液体球体验，支持相位切换、拖拽塑形、涟漪、辉光、色差和声场交互。',
        controls: {
          runtime: '嵌入式展品',
          runtimeNote:
            '该展厅在共享展厅外壳中保留原始全屏展品运行时。',
          reload: '重载展品',
          openStandalone: '独立打开',
        },
      },
      ninthTideArchive: {
        title: '第九潮汐档案馆',
        kicker: '声音档案展厅',
        shortDescription: '音频驱动的无岸层档案馆',
        description:
          '《第九潮汐档案馆：无岸层》是由合成或用户启动音频驱动的 Three.js 水下装置，包含声呐脉冲、深度遥测和后期处理。',
        controls: {
          runtime: '嵌入式展品',
          runtimeNote:
            '可在画面内的下潜入口启动音频或静默进入；展厅控制器负责重载或独立打开。',
          reload: '重载展品',
          openStandalone: '独立打开',
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
