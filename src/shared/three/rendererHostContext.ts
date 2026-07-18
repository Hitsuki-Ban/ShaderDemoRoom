import { createContext } from 'react';
import type { PersistentRendererHost } from './rendererHost';

export const RendererHostContext = createContext<PersistentRendererHost | null>(null);
