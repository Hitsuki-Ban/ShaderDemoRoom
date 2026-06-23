import { ExternalLink, RefreshCw, RotateCcw } from 'lucide-react';
import { getStandaloneExhibitUrl } from '../../shared/embedded/url';
import { Button } from '../../shared/ui/Button';
import { ControlGroup } from '../../shared/ui/ControlPrimitives';
import type {
  EmbeddedExhibitSettings,
  RoomControlsProps,
} from '../types';

interface EmbeddedControlsOptions {
  namespace: string;
  standalonePath: string;
}

export function createEmbeddedControls({
  namespace,
  standalonePath,
}: EmbeddedControlsOptions) {
  return function EmbeddedExhibitControls({
    settings,
    onPatch,
    onReset,
    t,
  }: RoomControlsProps<EmbeddedExhibitSettings>) {
    const openStandalone = () => {
      window.open(getStandaloneExhibitUrl(standalonePath), '_blank', 'noopener,noreferrer');
    };

    return (
      <div className="inspector-controls">
        <ControlGroup title={t(`${namespace}.controls.runtime`)}>
          <div className="embedded-control-copy">
            {t(`${namespace}.controls.runtimeNote`)}
          </div>
          <div className="control-actions">
            <Button
              icon={<RefreshCw size={16} />}
              onClick={() => onPatch({ reloadToken: settings.reloadToken + 1 })}
            >
              {t(`${namespace}.controls.reload`)}
            </Button>
            <Button icon={<ExternalLink size={16} />} onClick={openStandalone}>
              {t(`${namespace}.controls.openStandalone`)}
            </Button>
            <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={onReset}>
              {t('app.reset')}
            </Button>
          </div>
        </ControlGroup>
      </div>
    );
  };
}
