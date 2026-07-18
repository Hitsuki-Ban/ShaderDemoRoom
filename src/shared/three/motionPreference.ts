import { useSyncExternalStore } from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
export const REDUCED_MOTION_SCALE = 0.15;
export const FULL_MOTION_SCALE = 1;

interface MotionPreferenceStore {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => boolean;
}

export function createMotionPreferenceStore(
  matchMedia: (query: string) => MediaQueryList,
): MotionPreferenceStore {
  let media: MediaQueryList | null = null;
  const getMedia = () => {
    media ??= matchMedia(REDUCED_MOTION_QUERY);
    return media;
  };

  return {
    subscribe(callback) {
      const current = getMedia();
      current.addEventListener('change', callback);
      return () => current.removeEventListener('change', callback);
    },
    getSnapshot() {
      return getMedia().matches;
    },
  };
}

const browserMotionPreference = createMotionPreferenceStore((query) =>
  window.matchMedia(query),
);

export function getMotionScale(prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? REDUCED_MOTION_SCALE : FULL_MOTION_SCALE;
}

export function useMotionScale(): number {
  const prefersReducedMotion = useSyncExternalStore(
    browserMotionPreference.subscribe,
    browserMotionPreference.getSnapshot,
    () => false,
  );
  return getMotionScale(prefersReducedMotion);
}
