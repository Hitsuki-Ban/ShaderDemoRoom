import { describe, expect, it } from 'vitest';
import { getEmbeddedSrc } from './url';

describe('getEmbeddedSrc', () => {
  it('keeps the normal embedded URL free of QA state', () => {
    expect(getEmbeddedSrc('exhibits/mizu-kokoro/', 0)).toBe('/exhibits/mizu-kokoro/');
  });

  it('serializes reload and explicit QA capture state once', () => {
    expect(getEmbeddedSrc('exhibits/mizu-kokoro/', 7, true))
      .toBe('/exhibits/mizu-kokoro/?reload=7&qa=1');
  });
});
