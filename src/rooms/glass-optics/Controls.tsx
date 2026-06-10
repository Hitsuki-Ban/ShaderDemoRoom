import { Lightbulb, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import {
  ControlGroup,
  SliderControl,
  ToggleControl,
} from '../../shared/ui/ControlPrimitives';
import type { GlassOpticsSettings, RoomControlsProps } from '../types';

export default function GlassOpticsControls({
  settings,
  onPatch,
  onReset,
  t,
}: RoomControlsProps<GlassOpticsSettings>) {
  return (
    <div className="inspector-controls">
      <ControlGroup title={t('rooms.glassOptics.controls.lightPath')}>
        <SliderControl
          label={t('rooms.glassOptics.controls.lightX')}
          min={-6}
          max={6}
          step={0.01}
          value={settings.lightX}
          onChange={(lightX) => onPatch({ lightX })}
        />
        <SliderControl
          label={t('rooms.glassOptics.controls.lightY')}
          min={0.8}
          max={6}
          step={0.01}
          value={settings.lightY}
          onChange={(lightY) => onPatch({ lightY })}
        />
        <SliderControl
          label={t('rooms.glassOptics.controls.lightZ')}
          min={-6}
          max={6}
          step={0.01}
          value={settings.lightZ}
          onChange={(lightZ) => onPatch({ lightZ })}
        />
        <SliderControl
          label={t('rooms.glassOptics.controls.beamSpread')}
          min={0.05}
          max={0.9}
          step={0.01}
          value={settings.beamSpread}
          onChange={(beamSpread) => onPatch({ beamSpread })}
        />
      </ControlGroup>

      <ControlGroup title={t('rooms.glassOptics.title')}>
        <SliderControl
          label={t('rooms.glassOptics.controls.ior')}
          min={1}
          max={2.4}
          step={0.01}
          value={settings.ior}
          onChange={(ior) => onPatch({ ior })}
        />
        <SliderControl
          label={t('rooms.glassOptics.controls.roughness')}
          min={0}
          max={0.55}
          step={0.01}
          value={settings.roughness}
          onChange={(roughness) => onPatch({ roughness })}
        />
        <SliderControl
          label={t('rooms.glassOptics.controls.thickness')}
          min={0.2}
          max={2.4}
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
          onClick={() => onPatch({ lightX: -0.28, lightY: 2.85, lightZ: 1.45, beamSpread: 0.18 })}
        >
          Focus beam
        </Button>
        <Button
          icon={<Sparkles size={16} />}
          onClick={() => onPatch({ ior: 1.72, thickness: 1.8, roughness: 0.01, showCaustics: true })}
        >
          Crystal preset
        </Button>
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={onReset}>
          {t('app.reset')}
        </Button>
      </div>
    </div>
  );
}
