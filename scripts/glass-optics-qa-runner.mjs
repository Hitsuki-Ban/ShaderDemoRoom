import { spawn } from 'node:child_process';
import { build, preview } from 'vite';

const host = '127.0.0.1';
const port = Number.parseInt(process.env.GLASS_QA_PORT ?? '4175', 10);
const outputDirectory = process.env.GLASS_QA_OUTPUT ?? 'output/glass-qa';
const buildDirectory = process.env.GLASS_QA_BUILD_OUTPUT ?? 'output/glass-qa-dist';

function runNode(script, environment) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], {
      env: environment,
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(
        signal
          ? `${script} stopped by ${signal}.`
          : `${script} exited with code ${code}.`,
      ));
    });
  });
}

await build({
  base: '/',
  build: {
    minify: false,
    outDir: buildDirectory,
  },
});

const server = await preview({
  base: '/',
  build: { outDir: buildDirectory },
  preview: { host, port, strictPort: true },
});

try {
  await runNode('scripts/glass-optics-qa.mjs', {
    ...process.env,
    GLASS_QA_ALLOCATION_NAMES: 'readable',
    GLASS_QA_OUTPUT: outputDirectory,
    SHOWROOM_URL: `http://${host}:${port}`,
  });
} finally {
  await new Promise((resolve, reject) => {
    server.httpServer.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}
