import { useContext } from 'react';
import { RendererHostContext } from './rendererHostContext';
import type { PersistentRendererHost } from './rendererHost';

export function useRendererHost(): PersistentRendererHost {
  const host = useContext(RendererHostContext);
  if (!host) {
    throw new Error('RendererHostProvider is required.');
  }
  return host;
}
