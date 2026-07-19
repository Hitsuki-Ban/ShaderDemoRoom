import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  EmbeddedExhibitSettings,
  EmbeddedRoomDefinition,
} from '../../rooms/types';
import { getEmbeddedSrc } from './url';
import {
  capabilitiesMatch,
  createEmbeddedBridgeCommand,
  parseEmbeddedBridgeEvent,
  type EmbeddedBridgeCapability,
  type EmbeddedBridgeState,
  type EmbeddedRoomStats,
} from './bridge';

interface EmbeddedExhibitFrameProps {
  room: EmbeddedRoomDefinition;
  settings: EmbeddedExhibitSettings;
  title: string;
  qaCapture?: boolean;
  onBridgeState: (state: EmbeddedBridgeState) => void;
  onStats: (stats: EmbeddedRoomStats) => void;
}

export function EmbeddedExhibitFrame({
  room,
  settings,
  title,
  qaCapture = false,
  onBridgeState,
  onStats,
}: EmbeddedExhibitFrameProps) {
  const src = useMemo(
    () => getEmbeddedSrc(room.embedPath, settings.reloadToken, qaCapture),
    [qaCapture, room.embedPath, settings.reloadToken],
  );
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const instanceIdRef = useRef<string | null>(null);
  const bridgeStateRef = useRef<EmbeddedBridgeState>('waiting');
  const onBridgeStateRef = useRef(onBridgeState);
  const onStatsRef = useRef(onStats);
  const [bridgeState, setBridgeState] = useState<EmbeddedBridgeState>('waiting');
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<EmbeddedBridgeCapability[]>([]);

  useEffect(() => {
    onBridgeStateRef.current = onBridgeState;
    onStatsRef.current = onStats;
  }, [onBridgeState, onStats]);

  const transitionBridgeState = useCallback((nextState: EmbeddedBridgeState) => {
    bridgeStateRef.current = nextState;
    setBridgeState(nextState);
    onBridgeStateRef.current(nextState);
  }, []);

  const sendPaused = useCallback((paused: boolean) => {
    const activeInstanceId = instanceIdRef.current;
    const targetWindow = iframeRef.current?.contentWindow;
    if (
      bridgeStateRef.current !== 'ready'
      || activeInstanceId === null
      || !targetWindow
    ) {
      return;
    }
    targetWindow.postMessage(
      createEmbeddedBridgeCommand(activeInstanceId, {
        type: 'set-paused',
        payload: { paused },
      }),
      window.location.origin,
    );
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (bridgeStateRef.current === 'waiting') {
        transitionBridgeState('error');
      }
    }, 15_000);

    const handleMessage = (event: MessageEvent<unknown>) => {
      if (
        event.origin !== window.location.origin
        || event.source !== iframeRef.current?.contentWindow
      ) {
        return;
      }

      let bridgeEvent;
      try {
        bridgeEvent = parseEmbeddedBridgeEvent(event.data);
      } catch {
        transitionBridgeState('error');
        return;
      }

      if (bridgeEvent.type === 'ready') {
        if (!capabilitiesMatch(bridgeEvent.payload.capabilities, room.bridgeCapabilities)) {
          transitionBridgeState('error');
          return;
        }
        instanceIdRef.current = bridgeEvent.instanceId;
        setInstanceId(bridgeEvent.instanceId);
        setCapabilities(bridgeEvent.payload.capabilities);
        transitionBridgeState('ready');
        window.clearTimeout(timeoutId);
        sendPaused(document.hidden);
        return;
      }

      if (
        bridgeStateRef.current !== 'ready'
        || bridgeEvent.instanceId !== instanceIdRef.current
      ) {
        return;
      }
      onStatsRef.current(bridgeEvent.payload);
    };

    const handleVisibility = () => sendPaused(document.hidden);
    window.addEventListener('message', handleMessage);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [room.bridgeCapabilities, sendPaused, transitionBridgeState]);

  return (
    <div className="canvas-shell embedded-shell">
      <iframe
        ref={iframeRef}
        key={`${room.id}-${settings.reloadToken}`}
        className="embedded-exhibit-frame"
        src={src}
        title={title}
        data-bridge-state={bridgeState}
        data-bridge-instance-id={instanceId ?? undefined}
        data-bridge-capabilities={capabilities.join(' ')}
        allow={room.permissions.join('; ')}
        allowFullScreen
      />
    </div>
  );
}
