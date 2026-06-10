import { CloudRain, Compass, Palette, RotateCcw, SunMedium, Waves } from 'lucide-react';
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

      <ControlGroup title={t('rooms.voxelWater.controls.current')}>
        <SliderControl
          label={t('rooms.voxelWater.controls.currentDirection')}
          min={0}
          max={360}
          step={1}
          unit="deg"
          value={settings.currentDirection}
          onChange={(currentDirection) => onPatch({ currentDirection })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.currentStrength')}
          min={0}
          max={1}
          step={0.01}
          value={settings.currentStrength}
          onChange={(currentStrength) => onPatch({ currentStrength })}
        />
      </ControlGroup>

      <ControlGroup title={t('rooms.voxelWater.controls.skyAndColor')}>
        <SliderControl
          label={t('rooms.voxelWater.controls.skyTime')}
          min={0}
          max={1}
          step={0.01}
          value={settings.skyTime}
          onChange={(skyTime) => onPatch({ skyTime })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.colorTemperature')}
          min={-1}
          max={1}
          step={0.01}
          value={settings.colorTemperature}
          onChange={(colorTemperature) => onPatch({ colorTemperature })}
        />
        <SliderControl
          label={t('rooms.voxelWater.controls.voxelColorVariance')}
          min={0}
          max={1}
          step={0.01}
          value={settings.voxelColorVariance}
          onChange={(voxelColorVariance) => onPatch({ voxelColorVariance })}
        />
      </ControlGroup>

      <div className="control-actions">
        <Button icon={<CloudRain size={16} />} onClick={() => onPatch(voxelWaterStormPreset)}>
          Storm preset
        </Button>
        <Button icon={<Waves size={16} />} onClick={() => onPatch(voxelWaterCalmPreset)}>
          Calm preset
        </Button>
        <Button
          variant="ghost"
          icon={<Compass size={16} />}
          onClick={() => onPatch({ currentDirection: (settings.currentDirection + 90) % 360 })}
        >
          {t('rooms.voxelWater.controls.rotateCurrent')}
        </Button>
        <Button
          variant="ghost"
          icon={<SunMedium size={16} />}
          onClick={() => onPatch({ skyTime: settings.skyTime > 0.5 ? 0.18 : 0.62 })}
        >
          {t('rooms.voxelWater.controls.shiftSky')}
        </Button>
        <Button
          variant="ghost"
          icon={<Palette size={16} />}
          onClick={() => onPatch({ colorTemperature: settings.colorTemperature > 0 ? -0.28 : 0.22 })}
        >
          {t('rooms.voxelWater.controls.shiftPalette')}
        </Button>
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={onReset}>
          {t('app.reset')}
        </Button>
      </div>
    </div>
  );
}
