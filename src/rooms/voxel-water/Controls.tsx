import { CloudRain, RotateCcw, Waves } from 'lucide-react';
import type { RoomControlsProps, VoxelWaterSettings } from '../types';
import { Button } from '../../shared/ui/Button';
import {
  ControlGroup,
  SegmentedControl,
  SliderControl,
} from '../../shared/ui/ControlPrimitives';
import { voxelWaterCalmPreset, voxelWaterStormPreset } from './state';

export default function VoxelWaterControls({
  settings,
  onPatch,
  onReset,
  t,
}: RoomControlsProps<VoxelWaterSettings>) {
  return (
    <div className="inspector-controls">
      <ControlGroup title={t('rooms.voxelWater.controls.weather')}>
        <SegmentedControl
          label={t('rooms.voxelWater.controls.weather')}
          value={settings.weather}
          options={[
            { value: 'clear', label: t('rooms.voxelWater.controls.clear') },
            { value: 'rain', label: t('rooms.voxelWater.controls.rainy') },
            { value: 'storm', label: t('rooms.voxelWater.controls.storm') },
          ]}
          onChange={(weather) => onPatch({ weather })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.rain')}
          min={0}
          max={1}
          step={0.01}
          value={settings.rain}
          onChange={(rain) => onPatch({ rain })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.cloudCover')}
          min={0}
          max={1}
          step={0.01}
          value={settings.cloudCover}
          onChange={(cloudCover) => onPatch({ cloudCover })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.clarity')}
          min={0}
          max={1}
          step={0.01}
          value={settings.clarity}
          onChange={(clarity) => onPatch({ clarity })}
        />
      </ControlGroup>

      <ControlGroup title={t('rooms.voxelWater.controls.waveHeight')}>
        <SliderControl
          label={t('rooms.voxelWater.controls.wind')}
          min={0.2}
          max={3}
          step={0.01}
          value={settings.wind}
          onChange={(wind) => onPatch({ wind })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.waveHeight')}
          min={0.1}
          max={1.6}
          step={0.01}
          value={settings.waveHeight}
          onChange={(waveHeight) => onPatch({ waveHeight })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.swell')}
          min={0}
          max={1.2}
          step={0.01}
          value={settings.swell}
          onChange={(swell) => onPatch({ swell })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.chop')}
          min={0}
          max={1}
          step={0.01}
          value={settings.chop}
          onChange={(chop) => onPatch({ chop })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.toonSteps')}
          min={2}
          max={9}
          step={1}
          value={settings.toonSteps}
          onChange={(toonSteps) => onPatch({ toonSteps })}
        />
      </ControlGroup>

      <ControlGroup title={t('rooms.voxelWater.controls.surfaceDetail')}>
        <SliderControl
          label={t('rooms.voxelWater.controls.foam')}
          min={0}
          max={1}
          step={0.01}
          value={settings.foam}
          onChange={(foam) => onPatch({ foam })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.surfaceDetail')}
          min={0}
          max={1}
          step={0.01}
          value={settings.surfaceDetail}
          onChange={(surfaceDetail) => onPatch({ surfaceDetail })}
        />
      </ControlGroup>

      <div className="control-actions">
        <Button icon={<CloudRain size={16} />} onClick={() => onPatch(voxelWaterStormPreset)}>
          Storm preset
        </Button>
        <Button icon={<Waves size={16} />} onClick={() => onPatch(voxelWaterCalmPreset)}>
          Calm preset
        </Button>
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={onReset}>
          {t('app.reset')}
        </Button>
      </div>
    </div>
  );
}
