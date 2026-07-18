import { Lightbulb, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import {
  ControlGroup,
  SliderControl,
  ToggleControl,
} from '../../shared/ui/ControlPrimitives';
import type { GlassOpticsSettings, RoomControlsProps } from '../types';
import {
  glassOpticsCrystalPreset,
  glassOpticsDomains,
  glassOpticsFocusPreset,
} from './state';

export default function GlassOpticsControls({
  settings,
  onPatch,
  onReset,
  locale,
  t,
}: RoomControlsProps<GlassOpticsSettings>) {
  return (
    <div className="inspector-controls">
      <ControlGroup title={t('rooms.glassOptics.controls.lightPath')}>
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.lightX')}
          min={glassOpticsDomains.lightX.min}
          max={glassOpticsDomains.lightX.max}
          step={0.01}
          value={settings.lightX}
          onChange={(lightX) => onPatch({ lightX })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.lightY')}
          min={glassOpticsDomains.lightY.min}
          max={glassOpticsDomains.lightY.max}
          step={0.01}
          value={settings.lightY}
          onChange={(lightY) => onPatch({ lightY })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.lightZ')}
          min={glassOpticsDomains.lightZ.min}
          max={glassOpticsDomains.lightZ.max}
          step={0.01}
          value={settings.lightZ}
          onChange={(lightZ) => onPatch({ lightZ })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.beamSpread')}
          min={glassOpticsDomains.beamSpread.min}
          max={glassOpticsDomains.beamSpread.max}
          step={0.01}
          value={settings.beamSpread}
          onChange={(beamSpread) => onPatch({ beamSpread })}
        />
      </ControlGroup>

      <ControlGroup title={t('rooms.glassOptics.title')}>
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.ior')}
          min={glassOpticsDomains.ior.min}
          max={glassOpticsDomains.ior.max}
          step={0.01}
          value={settings.ior}
          onChange={(ior) => onPatch({ ior })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.roughness')}
          min={glassOpticsDomains.roughness.min}
          max={glassOpticsDomains.roughness.max}
          step={0.01}
          value={settings.roughness}
          onChange={(roughness) => onPatch({ roughness })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.thickness')}
          min={glassOpticsDomains.thickness.min}
          max={glassOpticsDomains.thickness.max}
          step={0.01}
          value={settings.thickness}
          onChange={(thickness) => onPatch({ thickness })}
        />
        <ToggleControl
          label={t('rooms.glassOptics.controls.autoRotate')}
          value={settings.autoRotate}
          onChange={(autoRotate) => onPatch({ autoRotate })}
        />
        <ToggleControl
          label={t('rooms.glassOptics.controls.showCaustics')}
          value={settings.showCaustics}
          onChange={(showCaustics) => onPatch({ showCaustics })}
        />
      </ControlGroup>

      <div className="control-actions">
        <Button
          icon={<Lightbulb size={16} />}
          onClick={() => onPatch(glassOpticsFocusPreset)}
        >
          {t('rooms.glassOptics.controls.focusBeam')}
        </Button>
        <Button
          icon={<Sparkles size={16} />}
          onClick={() => onPatch(glassOpticsCrystalPreset)}
        >
          {t('rooms.glassOptics.controls.crystalPreset')}
        </Button>
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={onReset}>
          {t('app.reset')}
        </Button>
      </div>
    </div>
  );
}
