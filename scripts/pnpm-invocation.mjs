import { access } from 'node:fs/promises';
import { posix, win32 } from 'node:path';

function isMissing(error) {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

function unavailableError(pnpmCli, cause) {
  return new Error(
    `The pnpm CLI declared by npm_execpath is unavailable: ${pnpmCli}`,
    { cause },
  );
}

export async function resolvePnpmInvocation(
  pnpmCli,
  {
    accessPath = access,
    nodeExecutable = process.execPath,
    platform = process.platform,
  } = {},
) {
  const pathApi = platform === 'win32' ? win32 : posix;
  if (!pnpmCli || !pathApi.isAbsolute(pnpmCli)) {
    throw new Error('Run this build through `pnpm exhibits:build`.');
  }

  if (/\.[cm]?js$/i.test(pnpmCli)) {
    try {
      await accessPath(pnpmCli);
    } catch (error) {
      throw unavailableError(pnpmCli, error);
    }
    return { command: nodeExecutable, prefixArgs: [pnpmCli] };
  }

  try {
    await accessPath(pnpmCli);
    return { command: pnpmCli, prefixArgs: [] };
  } catch (error) {
    if (
      platform !== 'win32'
      || pathApi.extname(pnpmCli) !== ''
      || !isMissing(error)
    ) {
      throw unavailableError(pnpmCli, error);
    }
  }

  // @pnpm/exe reports its extensionless launcher path through npm_execpath on
  // Windows while installing the native executable beside it as `pnpm.exe`.
  const nativeCli = `${pnpmCli}.exe`;
  try {
    await accessPath(nativeCli);
    return { command: nativeCli, prefixArgs: [] };
  } catch (error) {
    throw unavailableError(pnpmCli, error);
  }
}
