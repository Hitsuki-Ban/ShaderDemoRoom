import { describe, expect, it, vi } from 'vitest';

import { resolvePnpmInvocation } from './pnpm-invocation.mjs';

function missing(path) {
  return Object.assign(new Error(`Missing: ${path}`), { code: 'ENOENT' });
}

describe('resolvePnpmInvocation', () => {
  it('runs an accessible JavaScript CLI through Node', async () => {
    const accessPath = vi.fn().mockResolvedValue(undefined);

    await expect(resolvePnpmInvocation('/tools/pnpm.cjs', {
      accessPath,
      nodeExecutable: '/tools/node',
      platform: 'linux',
    })).resolves.toEqual({
      command: '/tools/node',
      prefixArgs: ['/tools/pnpm.cjs'],
    });
    expect(accessPath).toHaveBeenCalledExactlyOnceWith('/tools/pnpm.cjs');
  });

  it('runs the exact native executable declared by npm_execpath', async () => {
    const accessPath = vi.fn().mockResolvedValue(undefined);

    await expect(resolvePnpmInvocation('C:\\tools\\pnpm.exe', {
      accessPath,
      platform: 'win32',
    })).resolves.toEqual({
      command: 'C:\\tools\\pnpm.exe',
      prefixArgs: [],
    });
    expect(accessPath).toHaveBeenCalledExactlyOnceWith('C:\\tools\\pnpm.exe');
  });

  it('runs an accessible POSIX native executable directly', async () => {
    const accessPath = vi.fn().mockResolvedValue(undefined);

    await expect(resolvePnpmInvocation('/tools/pnpm', {
      accessPath,
      platform: 'linux',
    })).resolves.toEqual({
      command: '/tools/pnpm',
      prefixArgs: [],
    });
    expect(accessPath).toHaveBeenCalledExactlyOnceWith('/tools/pnpm');
  });

  it('resolves the documented @pnpm/exe extensionless Windows launcher', async () => {
    const accessPath = vi.fn(async (path) => {
      if (path === 'C:\\tools\\pnpm.exe') return;
      throw missing(path);
    });

    await expect(resolvePnpmInvocation('C:\\tools\\pnpm', {
      accessPath,
      platform: 'win32',
    })).resolves.toEqual({
      command: 'C:\\tools\\pnpm.exe',
      prefixArgs: [],
    });
    expect(accessPath.mock.calls).toEqual([
      ['C:\\tools\\pnpm'],
      ['C:\\tools\\pnpm.exe'],
    ]);
  });

  it('fails fast instead of falling back to a PATH executable', async () => {
    const accessPath = vi.fn(async (path) => { throw missing(path); });

    await expect(resolvePnpmInvocation('C:\\tools\\pnpm', {
      accessPath,
      platform: 'win32',
    })).rejects.toThrow(
      'The pnpm CLI declared by npm_execpath is unavailable: C:\\tools\\pnpm',
    );
    expect(accessPath.mock.calls).toEqual([
      ['C:\\tools\\pnpm'],
      ['C:\\tools\\pnpm.exe'],
    ]);
  });

  it('does not append another extension to a missing Windows executable', async () => {
    const accessPath = vi.fn(async (path) => { throw missing(path); });

    await expect(resolvePnpmInvocation('C:\\tools\\pnpm.exe', {
      accessPath,
      platform: 'win32',
    })).rejects.toThrow(
      'The pnpm CLI declared by npm_execpath is unavailable: C:\\tools\\pnpm.exe',
    );
    expect(accessPath).toHaveBeenCalledExactlyOnceWith('C:\\tools\\pnpm.exe');
  });

  it('rejects non-absolute npm_execpath values', async () => {
    await expect(resolvePnpmInvocation('pnpm', { platform: 'linux' }))
      .rejects.toThrow('Run this build through `pnpm exhibits:build`.');
  });
});
