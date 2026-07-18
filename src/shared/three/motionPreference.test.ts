import { describe, expect, it, vi } from 'vitest';
import {
  createMotionPreferenceStore,
  FULL_MOTION_SCALE,
  getMotionScale,
  REDUCED_MOTION_QUERY,
  REDUCED_MOTION_SCALE,
} from './motionPreference';

describe('motion preference', () => {
  it('maps the operating-system preference to the runtime scale', () => {
    expect(getMotionScale(false)).toBe(FULL_MOTION_SCALE);
    expect(getMotionScale(true)).toBe(REDUCED_MOTION_SCALE);
  });

  it('uses one media query and propagates live change notifications', () => {
    let matches = false;
    const listeners = new Set<() => void>();
    const addEventListener = vi.fn((_type: string, callback: () => void) => {
      listeners.add(callback);
    });
    const removeEventListener = vi.fn();
    const matchMedia = vi.fn(() => ({
      get matches() {
        return matches;
      },
      addEventListener,
      removeEventListener,
    }) as unknown as MediaQueryList);
    const store = createMotionPreferenceStore(matchMedia);
    const onChange = vi.fn();

    expect(store.getSnapshot()).toBe(false);
    const unsubscribe = store.subscribe(onChange);
    matches = true;
    [...listeners][0]?.();

    expect(store.getSnapshot()).toBe(true);
    expect(onChange).toHaveBeenCalledOnce();
    expect(matchMedia).toHaveBeenCalledOnce();
    expect(matchMedia).toHaveBeenCalledWith(REDUCED_MOTION_QUERY);

    unsubscribe();
    expect(removeEventListener).toHaveBeenCalledWith('change', onChange);
  });
});
