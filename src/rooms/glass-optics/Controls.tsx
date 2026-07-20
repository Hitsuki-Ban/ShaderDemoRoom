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
          {...glassOpticsDomains.lightX}
          value={settings.lightX}
          onChange={(lightX) => onPatch({ lightX })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.lightY')}
          {...glassOpticsDomains.lightY}
          value={settings.lightY}
          onChange={(lightY) => onPatch({ lightY })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.lightZ')}
          {...glassOpticsDomains.lightZ}
          value={settings.lightZ}
          onChange={(lightZ) => onPatch({ lightZ })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.beamSpread')}
          {...glassOpticsDomains.beamSpread}
          value={settings.beamSpread}
          onChange={(beamSpread) => onPatch({ beamSpread })}
        />
      </ControlGroup>

      <ControlGroup title={t('rooms.glassOptics.title')}>
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.ior')}
          {...glassOpticsDomains.ior}
          value={settings.ior}
          onChange={(ior) => onPatch({ ior })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.dispersion')}
          {...glassOpticsDomains.dispersion}
          value={settings.dispersion}
          onChange={(dispersion) => onPatch({ dispersion })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.roughness')}
          {...glassOpticsDomains.roughness}
          value={settings.roughness}
          onChange={(roughness) => onPatch({ roughness })}
        />
        <SliderControl
          locale={locale}
          label={t('rooms.glassOptics.controls.thickness')}
          {...glassOpticsDomains.thickness}
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
