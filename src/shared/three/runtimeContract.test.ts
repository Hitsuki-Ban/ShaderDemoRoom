import { describe, expect, it } from 'vitest';

const roomSources = import.meta.glob('../../rooms/**/*.{ts,tsx}', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

describe('RoomRuntime v2 source boundary', () => {
  it('keeps renderer information ownership outside room implementations', () => {
    const forbidden = new RegExp(`renderer[.]${'info'}`);
    const offenders = Object.entries(roomSources)
      .filter(([, source]) => forbidden.test(source))
      .map(([file]) => file);

    expect(offenders).toEqual([]);
  });
});
