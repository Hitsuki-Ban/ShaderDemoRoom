export const NINTH_TIDE_VIEWPORT = Object.freeze({
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
});

const captureRoi = Object.freeze({ x: 144, y: 90, width: 1152, height: 720 });

const state = (id, mode, section, timestampMs, expectedPhase, lumaMin, lumaMax, warmDominant) =>
  Object.freeze({
    id,
    fileName: `${id}.png`,
    mode,
    section,
    timestampMs,
    expectedPhase,
    roi: captureRoi,
    roiLuma: Object.freeze({ min: lumaMin, max: lumaMax }),
    warmDominant,
  });

export const NINTH_TIDE_CAPTURE_POLICY = Object.freeze([
  state('opening', 'opening', 0, 5_750, 'I', 0.15, 0.55, false),
  state('section-0', 'main', 0, 24_485.45, 'I', 4.5, 9.0, false),
  state('section-1', 'main', 1, 62_008.9, 'II', 2.7, 5.5, false),
  state('section-2', 'main', 2, 89_071.75, 'III', 3.2, 6.5, false),
  state('section-3', 'main', 3, 124_168.7, 'IV', 1.4, 3.2, false),
  state('section-4', 'main', 4, 164_525, 'V', 3.5, 7.2, true),
  state('section-5', 'main', 5, 204_347.25, 'VI', 2.8, 5.7, false),
  state('section-6', 'main', 6, 242_555.65, 'VII', 0.55, 1.5, false),
  state('section-7', 'main', 7, 295_137.2, 'VIII', 2.4, 5.0, false),
  state('section-8', 'main', 8, 342_276.2, 'IX', 1.8, 4.2, false),
  state('ending', 'ending', 8, 346_000, 'IX', 0.02, 0.09, false),
]);

export const NINTH_TIDE_WARM_DOMINANCE = Object.freeze({
  redToGreenPercent: 108,
  redToBluePercent: 115,
});
export const NINTH_TIDE_REPEAT_COUNT = 3;
