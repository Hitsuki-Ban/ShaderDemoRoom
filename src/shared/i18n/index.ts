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
        title: 'MIZU//KOKORO',
        kicker: 'Rheology specimen LQ-09',
        shortDescription: 'A liquid body with phase memory',
        description:
          'An NPR liquid specimen where touch becomes rheology: tension, viscosity, flow lines, and phase memory give each state its own way of returning.',
        controls: {
          runtime: 'Embedded Exhibit',
          runtimeNote:
            'Work inside the specimen frame. The showroom shell handles reload and standalone viewing; material controls remain inside the artwork.',
          reload: 'Reload exhibit',
          openStandalone: 'Open standalone',
        },
      },
      ninthTideArchive: {
        title: 'Ninth Tide Archive',
        kicker: 'The Shoreless Layer',
        shortDescription: 'Sound becomes depth and echo',
        description:
          'A submerged instrument reads sound into space: sonar reveals distant structures, nine phases reshape the field, and the opening asks the viewer to listen before control returns.',
        controls: {
          runtime: 'Embedded Exhibit',
          runtimeNote:
            'Use the dive gate inside the frame for audio or silent entry. The opening ceremony takes time before the space hands control back.',
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
        title: 'MIZU//KOKORO',
        kicker: '流变标本 LQ-09',
        shortDescription: '具有相变记忆的液态生命',
        description:
          '一件 NPR 液体标本：张力、黏度、表面流线和相变记忆把触碰转译为迟滞、过冲与回弹。',
        controls: {
          runtime: '嵌入式展品',
          runtimeNote:
            '请在标本画面内操作；展厅外壳只负责重载与独立打开，物性控制保留在作品内部。',
          reload: '重载展品',
          openStandalone: '独立打开',
        },
      },
      ninthTideArchive: {
        title: '第九潮汐档案馆',
        kicker: '无岸层',
        shortDescription: '把声音读成空间的深海仪器',
        description:
          '一台把声音读成空间的深海仪器：声呐让远端结构显影，九个段落重写光场，开场先要求观者倾听。',
        controls: {
          runtime: '嵌入式展品',
          runtimeNote:
            '可在画面内的下潜入口启动音频或静默进入；开场仪式需要一段时间，之后空间才交还控制。',
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
