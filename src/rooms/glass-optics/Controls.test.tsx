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
