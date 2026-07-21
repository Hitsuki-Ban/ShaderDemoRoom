import { describe, expect, it } from 'vitest';
import { createStylePropertyWriter } from './style-property-writer.js';

class StyleTarget {
  values = new Map();

  writes = [];

  getPropertyValue(propertyName) {
    return this.values.get(propertyName) ?? '';
  }

  setProperty(propertyName, value) {
    this.writes.push([propertyName, value]);
    this.values.set(propertyName, value);
  }

  changeExternally(propertyName, value) {
    this.values.set(propertyName, value);
  }
}

describe('Ninth Tide style property writer', () => {
  it('tracks properties independently on each explicit target', () => {
    const firstTarget = new StyleTarget();
    const secondTarget = new StyleTarget();
    const firstWriter = createStylePropertyWriter(firstTarget);
    const secondWriter = createStylePropertyWriter(secondTarget);

    expect(firstWriter.set('--blackout', '0.250')).toBe(true);
    expect(firstWriter.set('--phase-veil', '0.250')).toBe(true);
    expect(secondWriter.set('--blackout', '0.250')).toBe(true);

    expect(firstTarget.writes).toEqual([
      ['--blackout', '0.250'],
      ['--phase-veil', '0.250'],
    ]);
    expect(secondTarget.writes).toEqual([['--blackout', '0.250']]);
  });

  it('does not call setProperty for a repeated exact formatted value', () => {
    const target = new StyleTarget();
    const writer = createStylePropertyWriter(target);

    expect(writer.set('--v', '0.500')).toBe(true);
    expect(writer.set('--v', '0.500')).toBe(false);

    expect(target.writes).toEqual([['--v', '0.500']]);
  });

  it('coalesces values that produce the same formatted string', () => {
    const target = new StyleTarget();
    const writer = createStylePropertyWriter(target);

    const firstValue = (1 / 3).toFixed(3);
    const secondValue = (0.3334).toFixed(3);
    expect(firstValue).toBe(secondValue);

    expect(writer.set('--progress', `${firstValue}%`)).toBe(true);
    expect(writer.set('--progress', `${secondValue}%`)).toBe(false);
    expect(target.writes).toHaveLength(1);
  });

  it('uses the target current value as truth after an external change', () => {
    const target = new StyleTarget();
    const writer = createStylePropertyWriter(target);

    expect(writer.set('--blackout', '0.400')).toBe(true);
    target.changeExternally('--blackout', '0.900');

    expect(writer.set('--blackout', '0.400')).toBe(true);
    expect(target.getPropertyValue('--blackout')).toBe('0.400');
    expect(target.writes).toEqual([
      ['--blackout', '0.400'],
      ['--blackout', '0.400'],
    ]);
  });

  it('does not overwrite an externally supplied value that already matches', () => {
    const target = new StyleTarget();
    const writer = createStylePropertyWriter(target);

    expect(writer.set('--blackout', '0.200')).toBe(true);
    target.changeExternally('--blackout', '0.700');

    expect(writer.set('--blackout', '0.700')).toBe(false);
    expect(target.writes).toEqual([['--blackout', '0.200']]);
  });

  it.each([
    [undefined],
    [null],
    [{}],
    [{ getPropertyValue: () => '' }],
    [{ setProperty: () => undefined }],
  ])('rejects an invalid style target %#', (target) => {
    expect(() => createStylePropertyWriter(target)).toThrow(TypeError);
  });

  it.each([
    [undefined],
    [null],
    [42],
    ['color'],
    ['--'],
    ['--phase_veil'],
    ['--Phase-veil'],
    ['--phase veil'],
  ])('rejects invalid custom property name %#', (propertyName) => {
    const writer = createStylePropertyWriter(new StyleTarget());
    expect(() => writer.set(propertyName, '0.500')).toThrow(TypeError);
  });

  it.each([
    [undefined],
    [null],
    [0.5],
    [Number.NaN],
    [{}],
  ])('rejects unformatted custom property value %#', (value) => {
    const writer = createStylePropertyWriter(new StyleTarget());
    expect(() => writer.set('--v', value)).toThrow(TypeError);
  });

  it('fails fast if the target does not retain the exact written value', () => {
    const target = {
      value: '',
      getPropertyValue() {
        return this.value;
      },
      setProperty(_propertyName, value) {
        this.value = value.trim();
      },
    };
    const writer = createStylePropertyWriter(target);

    expect(() => writer.set('--v', ' 0.500 ')).toThrow(
      'CSS style target did not retain the exact value written for --v.',
    );
  });

  it('fails fast if the target returns a non-string current value', () => {
    const writer = createStylePropertyWriter({
      getPropertyValue: () => undefined,
      setProperty: () => undefined,
    });

    expect(() => writer.set('--v', '0.500')).toThrow(TypeError);
  });
});
