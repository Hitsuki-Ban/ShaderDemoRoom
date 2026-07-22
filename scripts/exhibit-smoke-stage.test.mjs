import { describe, expect, it, vi } from 'vitest';
import {
  createStageRunner,
  formatStageEvent,
  formatStageFailure,
} from './exhibit-smoke-stage.mjs';

describe('exhibit smoke stage runner', () => {
  it('prints immediate START and timed PASS events', async () => {
    const output = [];
    const times = [100, 142];
    const runStage = createStageRunner({
      write: (line) => output.push(line),
      now: () => times.shift(),
      diagnose: vi.fn(),
    });

    await expect(runStage('Orb lifecycle', async () => 'ok')).resolves.toBe('ok');
    expect(output).toEqual([
      '[exhibit-smoke] START Orb lifecycle',
      '[exhibit-smoke] PASS Orb lifecycle (42 ms)',
    ]);
  });

  it('reports the stage and missing locator page diagnosis before cleanup', async () => {
    const output = [];
    const cleanup = vi.fn();
    const diagnostic = {
      url: 'http://127.0.0.1/exhibits/ninth-tide-archive/index.html',
      title: 'Ninth Tide',
      mainResponse: { status: 200, contentType: 'text/html' },
      locator: { selector: '#audio', count: 0 },
      consoleErrors: [],
      pageErrors: [],
    };
    const runStage = createStageRunner({
      write: (line) => output.push(line),
      now: vi.fn().mockReturnValueOnce(10).mockReturnValueOnce(30_010),
      diagnose: vi.fn(async () => {
        expect(cleanup).not.toHaveBeenCalled();
        return diagnostic;
      }),
    });

    await expect(runStage('Ninth Tide silent demand loading', async (stage) => {
      stage.setDiagnosticTarget({ selector: '#audio' });
      stage.deferCleanup(cleanup);
      throw new Error("locator('#audio').getAttribute('src') timed out");
    })).rejects.toThrow(/Ninth Tide silent demand loading[\s\S]*"selector":"#audio","count":0/);

    expect(cleanup).toHaveBeenCalledOnce();
    expect(output).toHaveLength(2);
    expect(output[1]).toContain('[exhibit-smoke] FAIL Ninth Tide silent demand loading (30000 ms)');
  });

  it('runs deferred cleanup in reverse ownership order', async () => {
    const order = [];
    const runStage = createStageRunner({
      write: vi.fn(),
      now: vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(1),
      diagnose: vi.fn(),
    });

    await runStage('cleanup order', async (stage) => {
      stage.deferCleanup(async () => order.push('first'));
      stage.deferCleanup(async () => order.push('second'));
    });

    expect(order).toEqual(['second', 'first']);
  });

  it('turns cleanup failure into a visible stage failure', async () => {
    const runStage = createStageRunner({
      write: vi.fn(),
      now: vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(5),
      diagnose: vi.fn(),
    });

    await expect(runStage('cleanup failure', async (stage) => {
      stage.deferCleanup(async () => {
        throw new Error('page close failed');
      });
    })).rejects.toThrow(/cleanup failure[\s\S]*page close failed/);
  });

  it('preserves the primary failure and reports a secondary cleanup failure', async () => {
    const runStage = createStageRunner({
      write: vi.fn(),
      now: vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(7),
      diagnose: vi.fn(async () => ({ url: 'https://example.test/failure' })),
    });

    await expect(runStage('combined failure', async (stage) => {
      stage.deferCleanup(async () => {
        throw new Error('cleanup-lost');
      });
      throw new Error('primary');
    })).rejects.toThrow(
      /cause=primary[\s\S]*page={"url":"https:\/\/example.test\/failure"}[\s\S]*cleanup=\["cleanup-lost"\]/,
    );
  });
});

describe('exhibit smoke stage formatting', () => {
  it('formats stable event and failure records', () => {
    expect(formatStageEvent('START', 'A')).toBe('[exhibit-smoke] START A');
    expect(formatStageFailure({
      name: 'A',
      elapsedMs: 8,
      cause: new Error('broken'),
      diagnostic: { url: 'https://example.test/' },
    })).toContain('stage="A"\ncause=broken\npage={"url":"https://example.test/"}');
  });
});
