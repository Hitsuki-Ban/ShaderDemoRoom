import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'ShaderDemoRoom';
const buildBase = process.env.VITE_BASE_PATH ?? `/${repoName}/`;

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? buildBase : '/',
  build: {
    chunkSizeWarningLimit: 900,
  },
  plugins: [react()],
}));
