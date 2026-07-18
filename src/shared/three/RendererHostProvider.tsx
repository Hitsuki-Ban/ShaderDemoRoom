import type { ReactNode } from 'react';
import type { PersistentRendererHost } from './rendererHost';
import { RendererHostContext } from './rendererHostContext';

interface RendererHostProviderProps {
  children: ReactNode;
  host: PersistentRendererHost;
}

export function RendererHostProvider({ children, host }: RendererHostProviderProps) {
  return (
    <RendererHostContext.Provider value={host}>
      {children}
    </RendererHostContext.Provider>
  );
}
