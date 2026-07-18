import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import {
  contrastMetrics,
  deltaEOklab,
  findOpaqueColorLiterals,
  minimumFontSizeForWeight,
  parseCssCustomProperties,
  parseCssFontSize,
  parseCssFontWeight,
  parseCssRuleDeclarations,
  resolveCssHexToken,
  validateOpaqueTokenLayers,
} from './token-policy.mjs';

const root = resolve('.');
const scanTargets = [
  'src/styles/app.css',
  'src/app',
  'src/shared',
  'src/rooms/registry.ts',
];
const scannedExtensions = new Set(['.css', '.ts', '.tsx']);
const microcopyTypography = [
  { role: 'room description', selector: '.room-link small' },
  { role: 'navigation hint', selector: '.rail-note' },
];

async function collectFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(child)));
    } else if (scannedExtensions.has(extname(entry.name)) && !entry.name.includes('.test.')) {
      files.push(child);
    }
  }

  return files;
}

async function expandTarget(target) {
  const absolute = resolve(root, target);
  return extname(absolute) ? [absolute] : collectFiles(absolute);
}

const files = (await Promise.all(scanTargets.map(expandTarget))).flat();
const rawColorFindings = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const finding of findOpaqueColorLiterals(source)) {
    rawColorFindings.push(
      `${relative(root, file)}:${finding.line} ${finding.literal}`,
    );
  }
}

if (rawColorFindings.length > 0) {
  throw new Error(
    `Opaque shell colors must come from tokens.css:\n${rawColorFindings.join('\n')}`,
  );
}

const tokenSource = await readFile(resolve(root, 'src/styles/tokens.css'), 'utf8');
const appSource = await readFile(resolve(root, 'src/styles/app.css'), 'utf8');
const properties = parseCssCustomProperties(tokenSource);
validateOpaqueTokenLayers(properties);
const background = resolveCssHexToken(properties, '--bg');
const microcopy = resolveCssHexToken(properties, '--microcopy');
const microcopyBackgrounds = ['--bg', '--bg-elevated'].map((name) => ({
  name,
  color: resolveCssHexToken(properties, name),
}));
const accents = [...properties.keys()]
  .filter((name) => name.startsWith('--accent-'))
  .sort()
  .map((name) => ({
    name,
    color: resolveCssHexToken(properties, name),
  }));
const typographyContracts = microcopyTypography.map(({ role, selector }) => {
  const declarations = parseCssRuleDeclarations(appSource, selector);
  return {
    role,
    selector,
    fontSize: parseCssFontSize(declarations.get('font-size')),
    fontWeight: parseCssFontWeight(declarations.get('font-weight')),
  };
});

for (const { name, color } of microcopyBackgrounds) {
  const metrics = contrastMetrics(microcopy, color);
  if (metrics.wcag < 4.5 || Math.abs(metrics.apca) < 90) {
    throw new Error(
      `Microcopy contract failed on ${name}: WCAG ${metrics.wcag.toFixed(2)}, ` +
        `Lc ${metrics.apca.toFixed(2)}.`,
    );
  }

  for (const typography of typographyContracts) {
    const minimumSize = minimumFontSizeForWeight(metrics.apca, typography.fontWeight);
    if (minimumSize > typography.fontSize) {
      throw new Error(
        `${typography.role} (${typography.selector}) requires ${minimumSize}px at ` +
          `weight ${typography.fontWeight} ` +
          `on ${name}; configured size is ${typography.fontSize}px.`,
      );
    }
  }

  console.log(
    `microcopy ${name}: WCAG ${metrics.wcag.toFixed(2)}, ` +
      `Lc ${metrics.apca.toFixed(2)}`,
  );
}

for (const accent of accents) {
  const metrics = contrastMetrics(accent.color, background);
  if (Math.abs(metrics.apca) < 45) {
    throw new Error(
      `${accent.name} falls below the project raw-accent target: Lc ${metrics.apca.toFixed(2)}.`,
    );
  }
}

for (let first = 0; first < accents.length; first += 1) {
  for (let second = first + 1; second < accents.length; second += 1) {
    const distance = deltaEOklab(accents[first].color, accents[second].color);
    if (distance < 0.1) {
      throw new Error(
        `${accents[first].name} and ${accents[second].name} are too similar: ` +
          `OKLab ΔE×100 ${(distance * 100).toFixed(2)}.`,
      );
    }
  }
}

console.log(
  `token lint: ${files.length} shell files contain no opaque raw colors; ` +
    `${accents.length} accents satisfy contrast and OKLab separation targets.`,
);
