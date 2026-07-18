// @ts-expect-error -- Vitest runs this contract in Node; app types stay browser-only.
import { readFileSync } from 'node:fs';
// @ts-expect-error -- Vitest runs this contract in Node; app types stay browser-only.
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
// @ts-expect-error -- Vitest can load the Node-side policy module; app types stay browser-only.
import { parseCssCustomProperties, parseCssRuleDeclarations } from '../../scripts/token-policy.mjs';
import {
  colorTokenNames,
  readRequiredRootColorToken,
  roomAccentTokens,
} from './designTokens';

const appSource = readFileSync(resolve('src/styles/app.css'), 'utf8');
const tokenSource = readFileSync(resolve('src/styles/tokens.css'), 'utf8');

function customPropertyNames(source: string, prefix: string): string[] {
  return [...parseCssCustomProperties(source).keys()]
    .filter((name) => name.startsWith(prefix))
    .sort();
}

function backgroundBase(source: string, selector: string): string {
  const value = parseCssRuleDeclarations(source, selector).get('background');
  if (!value) {
    throw new Error(`Missing background declaration for ${selector}.`);
  }
  const normalized = value.replace(/\s+/g, ' ');
  return normalized.includes(',') ? normalized.slice(normalized.lastIndexOf(',') + 1).trim() : normalized;
}

describe('design token runtime contract', () => {
  afterEach(() => {
    document.documentElement.style.removeProperty(colorTokenNames.shellBackground);
  });

  it('keeps room accent values closed over the governed token names', () => {
    expect(Object.values(roomAccentTokens)).toEqual(
      Object.values(colorTokenNames.roomAccent).map((name) => `var(${name})`),
    );
    expect(Object.values(colorTokenNames.roomAccent).sort()).toEqual(
      customPropertyNames(tokenSource, '--accent-'),
    );
  });

  it('binds every stage background consumer to the renderer token', () => {
    for (const selector of [
      '.canvas-shell',
      '.embedded-shell',
      '.embedded-exhibit-frame',
    ]) {
      expect(backgroundBase(appSource, selector)).toBe(
        `var(${colorTokenNames.shellBackground})`,
      );
    }
    expect(parseCssCustomProperties(tokenSource).get(colorTokenNames.shellBackground)).toMatch(
      /^var\(--palette-/,
    );
  });

  it('reads the renderer background from the required root token', () => {
    document.documentElement.style.setProperty(
      colorTokenNames.shellBackground,
      '#06090e',
    );

    expect(readRequiredRootColorToken(colorTokenNames.shellBackground)).toBe('#06090e');
  });

  it('fails fast when the renderer background token is absent', () => {
    expect(() => readRequiredRootColorToken(colorTokenNames.shellBackground)).toThrow(
      /is not defined/,
    );
  });
});
