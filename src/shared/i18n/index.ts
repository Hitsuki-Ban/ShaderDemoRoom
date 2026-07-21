export const localeManifest = [
  { code: 'en', labelKey: 'app.locales.english' },
  { code: 'zh-CN', labelKey: 'app.locales.simplifiedChinese' },
] as const;

export type Locale = (typeof localeManifest)[number]['code'];
export type TranslationParams = Readonly<Record<string, string | number>>;
export type Translator = (key: string, params?: TranslationParams) => string;

type MessageTree = { readonly [key: string]: string | MessageTree };
type CatalogShape<T> = {
  readonly [Key in keyof T]: T[Key] extends string
    ? string
    : T[Key] extends MessageTree
      ? CatalogShape<T[Key]>
      : never;
};

export const defaultLocale: Locale = 'en';

const englishMessages = {
    app: {
      title: 'Shader Demo Room',
      subtitle: 'Static technical-art showroom',
      locales: {
        english: 'English',
        simplifiedChinese: '简体中文',
      },
      rooms: 'Rooms',
      viewport: 'Shader viewport',
      inspector: 'Room inspector',
      status: 'Deployment status',
      staticReady: 'GitHub Pages ready',
      sceneStats: 'Scene statistics',
      embeddedRuntime: 'Embedded runtime',
      standaloneExhibit: 'Standalone exhibit',
      loadingRoom: 'Loading {room}…',
      telemetry: {
        liveTelemetry: 'Live telemetry',
        cadence: 'Cadence',
        frameTime: 'Frame time',
        drawCalls: 'Draw calls',
        triangles: 'Triangles',
        resources: 'Renderer resources',
        programsUnavailable: 'PGM unavailable',
        maximum: 'Max',
        sameWindow: 'Same 2 s window',
        twoSecondAverage: '2 s average',
        measuring: 'Measuring',
        bridgeConnecting: 'Connecting exhibit telemetry',
        bridgeUnavailable: 'Exhibit bridge unavailable',
        warming: 'Warming up',
        live: 'Live',
        paused: 'Paused',
        p95Warming: 'P95 warming up',
        externalRuntime: 'External runtime',
        unavailable: 'Telemetry unavailable',
        units: {
          fps: 'FPS',
          milliseconds: 'ms',
          p95: 'P95',
          textures: 'TX',
          geometries: 'GEO',
          programs: 'PGM',
        },
        environment: {
          software: 'SW GL',
          hardware: 'GPU',
          unknown: 'Renderer unknown',
        },
      },
      language: 'Language',
      source: 'Source',
      loadingControls: 'Loading controls...',
      navigationHint: 'Switch rooms without remounting the WebGL shell.',
      reset: 'Reset',
      preset: 'Preset',
      units: {
        degrees: '°',
      },
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
          stormPreset: 'Storm preset',
          calmPreset: 'Calm preset',
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
          dispersion: 'Dispersion',
          roughness: 'Roughness',
          thickness: 'Thickness',
          autoRotate: 'Auto Rotate',
          showCaustics: 'Show Caustics',
          focusBeam: 'Focus beam',
          crystalPreset: 'Crystal preset',
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
            'Use the dive gate inside the frame for audio or silent entry. The opening ceremony takes time before the space hands control back; the final passage intentionally withdraws to near-black.',
          reload: 'Reload exhibit',
          openStandalone: 'Open standalone',
        },
      },
    },
} as const;

const simplifiedChineseMessages = {
    app: {
      title: 'Shader Demo Room',
      subtitle: '静态技术美术展厅',
      locales: {
        english: 'English',
        simplifiedChinese: '简体中文',
      },
      rooms: '展览室',
      viewport: 'Shader 视窗',
      inspector: '展厅控制器',
      status: '部署状态',
      staticReady: 'GitHub Pages 就绪',
      sceneStats: '场景统计',
      embeddedRuntime: '嵌入式运行时',
      standaloneExhibit: '独立展品',
      loadingRoom: '正在加载 {room}…',
      telemetry: {
        liveTelemetry: '实时遥测',
        cadence: '帧节奏',
        frameTime: '帧时间',
        drawCalls: '绘制调用',
        triangles: '三角形',
        resources: '渲染器资源',
        programsUnavailable: '程序数不可用',
        maximum: '最大',
        sameWindow: '同一 2 秒窗口',
        twoSecondAverage: '2 秒平均',
        measuring: '正在测量',
        bridgeConnecting: '正在连接展品遥测',
        bridgeUnavailable: '展品通信桥不可用',
        warming: '正在预热',
        live: '实时',
        paused: '已暂停',
        p95Warming: 'P95 正在预热',
        externalRuntime: '外部运行时',
        unavailable: '遥测暂不可用',
        units: {
          fps: 'FPS',
          milliseconds: '毫秒',
          p95: 'P95',
          textures: '纹理',
          geometries: '几何体',
          programs: '程序',
        },
        environment: {
          software: '软件 GL',
          hardware: 'GPU',
          unknown: '渲染器未知',
        },
      },
      language: '语言',
      source: '源码',
      loadingControls: '正在加载控制器...',
      navigationHint: '切换展厅时保持 WebGL 外壳稳定。',
      reset: '重置',
      preset: '预设',
      units: {
        degrees: '°',
      },
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
          stormPreset: '风暴预设',
          calmPreset: '平静预设',
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
          dispersion: '色分散',
          roughness: '粗糙度',
          thickness: '厚度',
          autoRotate: '自动旋转',
          showCaustics: '显示焦散',
          focusBeam: '聚焦光束',
          crystalPreset: '晶体预设',
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
            '可在画面内的下潜入口启动音频或静默进入；开场仪式需要一段时间，之后空间才交还控制，终幕会有意退入近黑。',
          reload: '重载展品',
          openStandalone: '独立打开',
        },
      },
    },
} satisfies CatalogShape<typeof englishMessages>;

const catalogs = {
  en: englishMessages,
  'zh-CN': simplifiedChineseMessages,
} satisfies Record<Locale, CatalogShape<typeof englishMessages>>;

const supportedLocaleSet: ReadonlySet<string> = new Set(
  localeManifest.map(({ code }) => code),
);

export function parseLocale(value: string): Locale {
  if (!supportedLocaleSet.has(value)) {
    throw new Error(`Unsupported locale: ${JSON.stringify(value)}.`);
  }

  return value as Locale;
}

function lookup(catalog: MessageTree, key: string): string {
  let cursor: string | MessageTree = catalog;

  for (const part of key.split('.')) {
    if (typeof cursor === 'string' || !Object.hasOwn(cursor, part)) {
      throw new Error(`Missing translation key: ${JSON.stringify(key)}.`);
    }
    cursor = cursor[part];
  }

  if (typeof cursor !== 'string') {
    throw new Error(`Translation key does not resolve to text: ${JSON.stringify(key)}.`);
  }

  return cursor;
}

function interpolate(message: string, key: string, params?: TranslationParams): string {
  const expectedNames = new Set(
    Array.from(message.matchAll(/\{([A-Za-z][A-Za-z0-9]*)\}/g), (match) => match[1]),
  );
  const providedNames = Object.keys(params ?? {});
  const missingNames = [...expectedNames].filter((name) => !params || !Object.hasOwn(params, name));
  const extraNames = providedNames.filter((name) => !expectedNames.has(name));

  if (missingNames.length > 0) {
    throw new Error(
      `Missing translation params for ${JSON.stringify(key)}: ${missingNames.join(', ')}.`,
    );
  }
  if (extraNames.length > 0) {
    throw new Error(
      `Unexpected translation params for ${JSON.stringify(key)}: ${extraNames.join(', ')}.`,
    );
  }

  return message.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g, (_, name: string) =>
    String(params![name]),
  );
}

export function createTranslator(locale: Locale): Translator {
  const parsedLocale = parseLocale(locale);
  const catalog = catalogs[parsedLocale];

  return (key, params) => interpolate(lookup(catalog, key), key, params);
}
