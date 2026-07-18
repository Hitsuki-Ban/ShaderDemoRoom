import { calcAPCA, fontLookupAPCA } from 'apca-w3';

const opaqueColorPattern =
  /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})\b|0x(?:[0-9a-f]{8}|[0-9a-f]{6})\b/gi;

export function stripComments(source) {
  let result = '';
  let state = 'code';
  let quote = '';

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (state === 'line-comment') {
      if (character === '\n' || character === '\r') {
        result += character;
        state = 'code';
      } else {
        result += ' ';
      }
      continue;
    }

    if (state === 'block-comment') {
      if (character === '*' && next === '/') {
        result += '  ';
        index += 1;
        state = 'code';
      } else {
        result += character === '\n' || character === '\r' ? character : ' ';
      }
      continue;
    }

    if (state === 'string') {
      result += character;
      if (character === '\\' && next !== undefined) {
        result += next;
        index += 1;
      } else if (character === quote) {
        state = 'code';
      }
      continue;
    }

    if (character === '/' && next === '/') {
      result += '  ';
      index += 1;
      state = 'line-comment';
    } else if (character === '/' && next === '*') {
      result += '  ';
      index += 1;
      state = 'block-comment';
    } else {
      result += character;
      if (character === '"' || character === "'" || character === '`') {
        quote = character;
        state = 'string';
      }
    }
  }

  return result;
}

export function findOpaqueColorLiterals(source) {
  const uncommented = stripComments(source);
  const findings = [];

  for (const match of uncommented.matchAll(opaqueColorPattern)) {
    const index = match.index ?? 0;
    findings.push({
      literal: match[0],
      line: uncommented.slice(0, index).split(/\r?\n/).length,
    });
  }

  return findings;
}

export function parseCssCustomProperties(source) {
  const properties = new Map();
  const declarationPattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;

  for (const match of stripComments(source).matchAll(declarationPattern)) {
    const [, name, value] = match;
    if (properties.has(name)) {
      throw new Error(`CSS custom property ${name} is declared more than once.`);
    }
    properties.set(name, value.trim());
  }

  return properties;
}

export function resolveCssHexToken(properties, name, stack = []) {
  if (stack.includes(name)) {
    throw new Error(`CSS custom property cycle: ${[...stack, name].join(' -> ')}`);
  }

  const value = properties.get(name);
  if (!value) {
    throw new Error(`CSS custom property ${name} is not defined.`);
  }
  if (/^#[0-9a-f]{6}$/i.test(value)) {
    return value.toLowerCase();
  }

  const reference = value.match(/^var\((--[a-z0-9-]+)\)$/i);
  if (!reference) {
    throw new Error(`${name} must resolve to an opaque six-digit hex color.`);
  }

  return resolveCssHexToken(properties, reference[1], [...stack, name]);
}

export function validateOpaqueTokenLayers(properties) {
  const primitiveValues = new Map();
  const hexLiteralPattern = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})\b/i;

  for (const [name, value] of properties) {
    if (name.startsWith('--palette-')) {
      if (!/^#[0-9a-f]{6}$/i.test(value)) {
        throw new Error(`Primitive ${name} must be a six-digit opaque hex color.`);
      }
      const normalized = value.toLowerCase();
      const existing = primitiveValues.get(normalized);
      if (existing) {
        throw new Error(`Primitive color ${normalized} is duplicated by ${existing} and ${name}.`);
      }
      primitiveValues.set(normalized, name);
    } else if (hexLiteralPattern.test(value)) {
      throw new Error(`Hex color ${value} is only allowed on --palette-* primitives.`);
    }
  }

  for (const [name, value] of properties) {
    if (name.startsWith('--palette-')) {
      continue;
    }
    const reference = value.match(/^var\((--[a-z0-9-]+)\)$/i);
    if (
      reference &&
      (!reference[1].startsWith('--palette-') || !properties.has(reference[1]))
    ) {
      throw new Error(`${name} must directly reference one --palette-* primitive.`);
    }
  }
}

export function parseCssRuleDeclarations(source, selector) {
  const declarations = new Map();
  let matched = false;

  for (const rule of stripComments(source).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = rule[1].split(',').map((candidate) => candidate.trim());
    if (!selectors.includes(selector)) {
      continue;
    }
    matched = true;
    for (const declaration of rule[2].matchAll(/([a-z-]+)\s*:\s*([^;]+);/gi)) {
      declarations.set(declaration[1].toLowerCase(), declaration[2].trim());
    }
  }

  if (!matched) {
    throw new Error(`CSS selector ${selector} is not defined.`);
  }
  return declarations;
}

export function parseCssFontSize(value) {
  const match = value?.match(/^(\d+(?:\.\d+)?)px$/);
  if (!match) {
    throw new Error(`Expected a pixel font size, received ${value ?? 'missing'}.`);
  }
  return Number(match[1]);
}

export function parseCssFontWeight(value) {
  const weight = Number(value);
  if (!Number.isInteger(weight) || weight < 100 || weight > 900 || weight % 100 !== 0) {
    throw new Error(`Expected a 100-900 numeric font weight, received ${value ?? 'missing'}.`);
  }
  return weight;
}

export function parseHexColor(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) {
    throw new Error(`Expected a six-digit hex color, received ${hex}.`);
  }

  return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

function srgbChannelToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function hexToOklab(hex) {
  const [red, green, blue] = parseHexColor(hex).map(srgbChannelToLinear);
  const l = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
  const m = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
  const s = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);

  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

export function deltaEOklab(firstHex, secondHex) {
  const first = hexToOklab(firstHex);
  const second = hexToOklab(secondHex);
  return Math.hypot(...first.map((component, index) => component - second[index]));
}

function relativeLuminance(hex) {
  const [red, green, blue] = parseHexColor(hex).map(srgbChannelToLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function wcagContrastRatio(firstHex, secondHex) {
  const values = [relativeLuminance(firstHex), relativeLuminance(secondHex)].sort(
    (first, second) => second - first,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}

export function contrastMetrics(textHex, backgroundHex) {
  const apca = Number(calcAPCA(textHex, backgroundHex));
  if (!Number.isFinite(apca)) {
    throw new Error(`APCA could not evaluate ${textHex} on ${backgroundHex}.`);
  }

  return {
    apca,
    wcag: wcagContrastRatio(textHex, backgroundHex),
  };
}

export function minimumFontSizeForWeight(apca, weight) {
  if (!Number.isInteger(weight) || weight < 100 || weight > 900 || weight % 100 !== 0) {
    throw new Error(`APCA font lookup requires a 100-900 weight step, received ${weight}.`);
  }

  return fontLookupAPCA(apca)[weight / 100];
}
