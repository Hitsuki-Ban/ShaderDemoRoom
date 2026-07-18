import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
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
  wcagContrastRatio,
} from './token-policy.mjs';

describe('token policy', () => {
  it('detects opaque CSS and numeric colors while ignoring comments', () => {
    const source = `
      color: #abc;
      border: #AABBCCDD;
      const clear = 0x070b10;
      doThing();// #fedcba
      /* #ffffff */
      // #123456
      const url = "https://example.test/path";
    `;

    expect(findOpaqueColorLiterals(source)).toEqual([
      { literal: '#abc', line: 2 },
      { literal: '#AABBCCDD', line: 3 },
      { literal: '0x070b10', line: 4 },
    ]);
  });

  it('enforces primitive and semantic token layers', () => {
    const valid = parseCssCustomProperties(`
      --palette-bg: #06090e;
      --palette-text: #eef7f8;
      --bg: var(--palette-bg);
      --text: var(--palette-text);
    `);
    expect(() => validateOpaqueTokenLayers(valid)).not.toThrow();
    expect(() =>
      validateOpaqueTokenLayers(parseCssCustomProperties('--bg: #06090e;')),
    ).toThrow(/only allowed/);
    for (const literal of ['#fff', '#fff8', '#ffffffff']) {
      expect(() =>
        validateOpaqueTokenLayers(
          parseCssCustomProperties(`--semantic-new: ${literal};`),
        ),
      ).toThrow(/only allowed/);
    }
    for (const value of [
      'linear-gradient(#fff, #000)',
      'color-mix(in srgb, #ffffff 50%, transparent)',
    ]) {
      expect(() =>
        validateOpaqueTokenLayers(
          parseCssCustomProperties(`--semantic-composite: ${value};`),
        ),
      ).toThrow(/only allowed/);
    }
    expect(() =>
      validateOpaqueTokenLayers(
        parseCssCustomProperties('--palette-a: #06090e; --palette-b: #06090e;'),
      ),
    ).toThrow(/duplicated/);
    expect(() =>
      validateOpaqueTokenLayers(
        parseCssCustomProperties('--palette-bg: #06090e; --bg: var(--other);'),
      ),
    ).toThrow(/directly reference/);
    expect(() =>
      validateOpaqueTokenLayers(
        parseCssCustomProperties(`
          --palette-mint: #5af2d1;
          --accent-mint: var(--palette-mint);
          --status-ok: var(--accent-mint);
        `),
      ),
    ).toThrow(/directly reference/);
  });

  it('reads typography from the actual CSS selector declarations', () => {
    const declarations = parseCssRuleDeclarations(
      '.room-link small { font-size: 13px; font-weight: 700; }',
      '.room-link small',
    );
    expect(parseCssFontSize(declarations.get('font-size'))).toBe(13);
    expect(parseCssFontWeight(declarations.get('font-weight'))).toBe(700);
    expect(() => parseCssFontSize('0.8rem')).toThrow(/pixel font size/);
    expect(() => parseCssFontWeight('normal')).toThrow(/numeric font weight/);
  });

  it('merges exact CSS selector rules without treating comments as declarations', () => {
    const declarations = parseCssRuleDeclarations(
      `
        .target, .peer { display: block; }
        .target {
          background: var(--bg-elevated);
          /* background: var(--bg); */
        }
      `,
      '.target',
    );
    expect(declarations.get('display')).toBe('block');
    expect(declarations.get('background')).toBe('var(--bg-elevated)');
  });

  it('resolves semantic tokens and rejects missing, duplicate, and cyclic definitions', () => {
    const properties = parseCssCustomProperties(`
      :root {
        --palette-bg: #06090e;
        --bg: var(--palette-bg);
      }
    `);

    expect(resolveCssHexToken(properties, '--bg')).toBe('#06090e');
    expect(() => resolveCssHexToken(properties, '--missing')).toThrow(/not defined/);
    expect(() => parseCssCustomProperties('--a: #000000; --a: #ffffff;')).toThrow(
      /more than once/,
    );
    expect(() =>
      resolveCssHexToken(parseCssCustomProperties('--a: var(--b); --b: var(--a);'), '--a'),
    ).toThrow(/cycle/);
  });

  it('calculates WCAG, APCA, font lookup, and OKLab distance contracts', () => {
    expect(wcagContrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 5);
    expect(contrastMetrics('#647883', '#06090e')).toMatchObject({
      apca: expect.closeTo(-29.55, 2),
      wcag: expect.closeTo(4.326, 3),
    });
    expect(minimumFontSizeForWeight(-91.9, 700)).toBe(14);
    expect(deltaEOklab('#5af2d1', '#79ead9')).toBeCloseTo(0.03392, 4);
    expect(deltaEOklab('#34d5ff', '#5af2d1')).toBeCloseTo(0.12083, 4);
  });

  it('keeps the governed token source within every automated threshold', () => {
    const source = readFileSync('src/styles/tokens.css', 'utf8');
    const properties = parseCssCustomProperties(source);
    const microcopy = resolveCssHexToken(properties, '--microcopy');

    for (const backgroundName of ['--bg', '--bg-elevated']) {
      const background = resolveCssHexToken(properties, backgroundName);
      const metrics = contrastMetrics(microcopy, background);
      expect(metrics.wcag).toBeGreaterThanOrEqual(4.5);
      expect(Math.abs(metrics.apca)).toBeGreaterThanOrEqual(90);
      expect(minimumFontSizeForWeight(metrics.apca, 700)).toBeLessThanOrEqual(13);
      expect(minimumFontSizeForWeight(metrics.apca, 500)).toBeLessThanOrEqual(15);
    }
  });
});
