import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createTranslator } from '../../shared/i18n';
import GlassOpticsControls from './Controls';
import {
  glassOpticsCrystalPreset,
  glassOpticsDefaults,
  glassOpticsFocusPreset,
} from './state';

describe('glass optics controls', () => {
  it.each([
    ['en', 'Dispersion'],
    ['zh-CN', '色分散'],
  ] as const)('exposes the dispersion domain and localized label in %s', (locale, label) => {
    const onPatch = vi.fn();

    render(
      <GlassOpticsControls
        settings={glassOpticsDefaults}
        onChange={vi.fn()}
        onPatch={onPatch}
        onReset={vi.fn()}
        locale={locale}
        t={createTranslator(locale)}
      />,
    );

    const valueOutput = screen.getByRole('status', {
      name: new RegExp(`^${label} 0[.,]45$`),
    });
    const slider = valueOutput.closest('label')?.querySelector('input[type="range"]');
    expect(slider).not.toBeNull();
    if (!slider) throw new Error('Dispersion slider is missing from its localized control.');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '1');
    expect(slider).toHaveAttribute('step', '0.01');
    expect(slider).toHaveValue('0.45');

    fireEvent.change(slider, { target: { value: '0' } });
    expect(onPatch).toHaveBeenCalledWith({ dispersion: 0 });
  });

  it('localizes preset actions without changing their payloads', () => {
    const onPatch = vi.fn();

    render(
      <GlassOpticsControls
        settings={glassOpticsDefaults}
        onChange={vi.fn()}
        onPatch={onPatch}
        onReset={vi.fn()}
        locale="zh-CN"
        t={createTranslator('zh-CN')}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '聚焦光束' }));
    fireEvent.click(screen.getByRole('button', { name: '晶体预设' }));

    expect(onPatch).toHaveBeenNthCalledWith(1, glassOpticsFocusPreset);
    expect(onPatch).toHaveBeenNthCalledWith(2, glassOpticsCrystalPreset);
  });
});
