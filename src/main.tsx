import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { createPersistentRendererHost } from './shared/three/rendererHost';
import { RendererHostProvider } from './shared/three/RendererHostProvider';
import './styles/tokens.css';
import './styles/app.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root was not found.');
}

const rendererHost = createPersistentRendererHost();

createRoot(root).render(
  <StrictMode>
    <RendererHostProvider host={rendererHost}>
      <App />
    </RendererHostProvider>
  </StrictMode>,
);
