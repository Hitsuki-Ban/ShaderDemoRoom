import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createTranslator } from '../../shared/i18n';
import VoxelWaterControls from './Controls';
import {
  voxelWaterCalmPreset,
  voxelWaterDefaults,
  voxelWaterStormPreset,
} from './state';

describe('voxel water QA controls', () => {
  it('selects presets and weather through locale-independent test ids', () => {
    const onPatch = vi.fn();
    const t = createTranslator('zh-CN');

    render(
      <VoxelWaterControls
        settings={voxelWaterDefaults}
        onChange={vi.fn()}
        onPatch={onPatch}
        onReset={vi.fn()}
        locale="zh-CN"
        t={t}
      />,
    );

    fireEvent.click(screen.getByTestId('voxel-water-preset-storm'));
    fireEvent.click(screen.getByTestId('voxel-water-preset-calm'));
    fireEvent.click(screen.getByTestId('voxel-water-weather-rain'));

    expect(onPatch).toHaveBeenNthCalledWith(1, voxelWaterStormPreset);
    expect(onPatch).toHaveBeenNthCalledWith(2, voxelWaterCalmPreset);
    expect(onPatch).toHaveBeenNthCalledWith(3, { weather: 'rain' });
    expect(screen.getByTestId('voxel-water-weather-rain')).toHaveTextContent('降雨');
    expect(screen.getByTestId('voxel-water-preset-storm')).toHaveTextContent('风暴预设');
    expect(screen.getByTestId('voxel-water-preset-calm')).toHaveTextContent('平静预设');
  });
});
