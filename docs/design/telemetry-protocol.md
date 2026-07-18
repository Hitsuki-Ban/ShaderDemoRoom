# Shell telemetry protocol

This document is the source of truth for shell-owned runtime telemetry. It refines the Room Runtime v2 statistics seam without changing room ownership: a room renders one logical frame; the shell samples the renderer after every pass and resets `renderer.info`.

## 1. Measurement semantics

- **Cadence interval** is the difference between adjacent `requestAnimationFrame` timestamps while the room is visible and active. It describes callbacks delivered to the application, not display presentation rate or GPU time.
- The first callback after room creation, room activation, or visibility resume establishes a timestamp and does not produce an interval sample. Paused wall time is discarded.
- Simulation delta clamping is never applied to telemetry intervals.
- **Frame time** in the public HUD means cadence interval. It is paired with cadence FPS so, before display rounding, `fps × frameTimeMs` is approximately `1000`.
- **Submit time** may be captured for QA by timing the synchronous room render call with `performance.now()`. It must be named `submitMs`; it is not GPU time and is not the public frame-time value.
- GPU elapsed time is out of the required HUD. A future diagnostic may use `EXT_disjoint_timer_query_webgl2` only when available, asynchronously, and only for non-disjoint results.

## 2. Windows and publication

- Keep raw active-frame samples for a trailing **10 seconds**.
- Publish to the shell at most **4Hz**: one update after each 250ms of active time.
- Headline cadence, frame-time mean, calls average/maximum, and triangles average use the same trailing **2-second** sample set.
- FPS is `1000 × intervalCount / sum(cadenceMs)`. Do not average instantaneous `1000 / cadenceMs` values.
- Frame-time p95 uses the trailing 10-second cadence set and the nearest-rank rule: sort ascending and select index `ceil(0.95 × N) - 1`.
- p95 is `warming` until at least 30 valid cadence samples exist. Missing values are represented as state, never zero.
- No second EMA is applied to the rolling values. A rolling window plus EMA would make the visible result harder to interpret and would weight 4 FPS and 60 FPS environments inconsistently.

## 3. Sparkline

The sparkline is a fixed 15-second time domain split into 60 × 250ms buckets. Each bucket is the mean cadence interval observed in that period. Empty buckets are gaps; the previous value is not copied forward. The graph is redrawn only on telemetry publication and is not an animation-loop task.

## 4. Renderer counters

With `renderer.info.autoReset = false`, the shell reads counters after the room has completed every pass of a logical frame and then calls `renderer.info.reset()`.

- `drawCalls` and `drawCallsMax`: average and maximum logical-frame `renderer.info.render.calls` over the same 2-second sample set as headline cadence.
- `trianglesAvg`: logical-frame `renderer.info.render.triangles` average over that set.
- `textures` and `geometries`: current live allocation counts from `renderer.info.memory`.
- `programs`: current `renderer.info.programs?.length`.

Textures/geometries/programs are live renderer resource counts, not frame averages. WebGLRenderer does not expose uniform count or VRAM bytes, so the shell must not display either value or an unlabeled estimate.

The calibrated production baseline for both native rooms at T-SH-02 is 19 logical-frame draw calls. Glass transmission is already included in this value; T-SH-03 must preserve that invariant rather than force a change from the obsolete ticket premise.

## 5. Renderer environment

Environment classification has three values: `software`, `hardware`, and `unknown`.

1. Read masked vendor/renderer strings from WebGL.
2. If `WEBGL_debug_renderer_info` is available, also record its unmasked vendor/renderer strings.
3. Classify as `software` only when a normalized raw string matches a documented software renderer marker: `SwiftShader`, `llvmpipe`, `softpipe`, `Software Rasterizer`, or `Microsoft Basic Render Driver`.
4. Classify as `hardware` only when an unmasked renderer string is available and no software marker matches.
5. Otherwise classify as `unknown`. Absence of a software marker is not sufficient evidence of hardware.

The public label is localized as `Software renderer`, `GPU renderer`, or `Renderer unknown`. Raw strings and the match reason belong in QA records and optional tooltips. Headless mode alone is never a classifier.

## 6. Embedded rooms

Until T-EMB-02 provides a versioned bridge, embedded rooms have no shell telemetry samples. The rail displays the localized state `External runtime · telemetry unavailable`. It must not render zeroes, dashes, a sparkline, or inferred renderer data. A later bridge must use the same schema version and active/paused semantics.

## 7. QA record schema

New records use `schemaVersion: 1` and are exported from measured values rather than parsed from HUD text.

The shell serializes the current unrounded `RoomStats` object on the telemetry rail as `data-telemetry-json`. Browser QA reads and parses that object; visible labels are never used as a data source.

```json
{
  "schemaVersion": 1,
  "recordedAt": "2026-07-18T00:00:00.000Z",
  "commit": "git-sha",
  "room": { "id": "voxel-water", "preset": "default" },
  "environment": {
    "browser": "Chromium 140",
    "os": "Windows 11",
    "viewport": { "width": 1440, "height": 900, "deviceScaleFactor": 1 },
    "rendererPixelRatio": 1,
    "contextAttributes": {},
    "maskedVendor": "WebKit",
    "maskedRenderer": "WebKit WebGL",
    "unmaskedVendor": null,
    "unmaskedRenderer": null,
    "classification": "unknown",
    "classificationReason": "unmasked renderer unavailable"
  },
  "measurement": {
    "warmupSeconds": 5,
    "durationSeconds": 15,
    "frameCount": 0,
    "cadenceMs": { "mean": 0, "p50": 0, "p95": 0, "p99": 0, "min": 0, "max": 0 },
    "submitMs": { "mean": 0, "p95": 0 },
    "calls": { "average": 0, "maximum": 0 },
    "triangles": { "average": 0, "maximum": 0 },
    "longAnimationFrames": { "count": 0, "maximumDurationMs": 0 },
    "telemetryEnabled": true
  },
  "samples": []
}
```

The historic `fps-samples-2026-07-18.json` remains provenance for the old rounded-HUD procedure; it is not silently upgraded or treated as a schema-v1 baseline.

## 8. Performance acceptance

- Deterministic software-renderer QA gates calls, triangles, lifecycle, sample cadence, and absence of browser errors. Absolute FPS is not a cross-machine hard gate.
- Hardware overhead is measured on one fixed machine/browser/viewport/DPR/preset with at least five interleaved telemetry-on/off runs after a 5-second warm-up and 15-second measurement.
- Compare paired median cadence. The telemetry-enabled median must not regress by more than 5%; retain raw JSON and environment classification.
- HUD publication must remain at or below 4Hz. Canvas redraw and React commits must not run once per render frame.

## 9. References

- [WHATWG animation frames](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#animation-frames)
- [High Resolution Time Level 3](https://www.w3.org/TR/hr-time-3/)
- [Three.js WebGLRenderer.info](https://threejs.org/docs/pages/WebGLRenderer.html#WebGLRenderer.info)
- [WEBGL_debug_renderer_info](https://registry.khronos.org/webgl/extensions/WEBGL_debug_renderer_info/)
- [EXT_disjoint_timer_query_webgl2](https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/)
- [WCAG 2.2 contrast requirements](https://www.w3.org/TR/WCAG22/#contrast-minimum)
