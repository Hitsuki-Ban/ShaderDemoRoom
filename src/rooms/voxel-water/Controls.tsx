import { CloudRain, RotateCcw, Waves } from 'lucide-react';
import type { RoomControlsProps, VoxelWaterSettings } from '../types';
import { Button } from '../../shared/ui/Button';
import {
  ControlGroup,
  SegmentedControl,
  SliderControl,
} from '../../shared/ui/ControlPrimitives';

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
          label={t('rooms.voxelWater.controls.toonSteps')}
          min={2}
          max={9}
          step={1}
          value={settings.toonSteps}
          onChange={(toonSteps) => onPatch({ toonSteps })}
        />
      </ControlGroup>

      <div className="control-actions">
        <Button icon={<CloudRain size={16} />} onClick={() => onPatch({ weather: 'storm', rain: 0.8, cloudCover: 0.9 })}>
          Storm preset
        </Button>
        <Button icon={<Waves size={16} />} onClick={() => onPatch({ weather: 'clear', rain: 0.05, cloudCover: 0.12 })}>
          Calm preset
        </Button>
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={onReset}>
          {t('app.reset')}
        </Button>
      </div>
    </div>
  );
}
