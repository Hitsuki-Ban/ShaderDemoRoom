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

The calibrated production topology is 19 logical-frame draw calls for Voxel Water and, after T-GO-04 replaces six beam meshes with two fixed instanced batches, 15 for Glass Optics. Glass transmission is included in the 15-call value.

## 5. Renderer environment

Environment classification has three values: `software`, `hardware`, and `unknown`.

1. Read masked vendor/renderer strings from WebGL.
2. If `WEBGL_debug_renderer_info` is available, also record its unmasked vendor/renderer strings.
3. Classify as `software` only when a normalized raw string matches a documented software renderer marker: `SwiftShader`, `llvmpipe`, `softpipe`, `lavapipe`, `OpenSWR`, `WARP`, `Software Rasterizer`, or `Microsoft Basic Render Driver`.
4. Classify as `hardware` only when an unmasked renderer string contains an explicit hardware-family marker: NVIDIA/GeForce/Quadro, AMD/Radeon, Intel, Apple GPU, Adreno, Mali, PowerVR/Imagination, Vivante, or Tegra.
5. Otherwise classify as `unknown`. The classifier is fail-closed: an unmasked string and absence of a known software marker are not sufficient evidence of hardware.

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
  "buildId": "index-HASH.js+index-HASH.css",
  "sourceRevision": "git-sha-containing-the-measured-code",
  "room": { "id": "voxel-water", "preset": "default" },
  "references": [
    {
      "label": "bundled-chromium-swiftshader",
      "browserVersion": "148.0.0.0",
      "platform": "Win32",
      "userAgent": "...",
      "viewport": { "width": 1440, "height": 900, "deviceScaleFactor": 1 },
      "environment": {
        "maskedVendor": "WebKit",
        "maskedRenderer": "WebKit WebGL",
        "unmaskedVendor": "Google Inc.",
        "unmaskedRenderer": "ANGLE (... SwiftShader ...)",
        "classification": "software",
        "classificationReason": "software renderer marker matched: swiftshader"
      },
      "method": { "warmupSeconds": 5, "measurementSeconds": 15, "sampleIntervalSeconds": 1 },
      "aggregates": {
        "fpsMedian": 0,
        "frameTimeMsMedian": 0,
        "frameTimeP95MsMedian": 0,
        "drawCallsAverageMedian": 0,
        "drawCallsMaximum": 0,
        "trianglesAverageMedian": 0
      },
      "samples": []
    }
  ],
  "overhead": {
    "comparison": "voxel-water baseline vs candidate",
    "baselineUrl": "https://example.invalid/baseline",
    "candidateUrl": "http://127.0.0.1:4173/ShaderDemoRoom",
    "method": { "pairs": 5, "order": "interleaved and alternating", "warmupSeconds": 5, "measurementSeconds": 15 },
    "pairedMedianRegressionPercent": 0,
    "pairs": []
  }
}
```

Each reference sample contains `second`, the unrounded cadence and renderer-counter fields exported by `RoomStats`, and its sample state. Each overhead pair contains its execution order, independent rAF cadence measurements for baseline and candidate, renderer strings, and the paired regression percentage. `sourceRevision` identifies the commit that contains the measured executable code; a later evidence-only commit may add the generated record.

Room-specific software performance gates use `pnpm qa:software-pairs -- <room-id> <output-path>`. The command requires explicit candidate/baseline URLs and source revisions, launches SwiftShader explicitly, verifies the actual renderer string, and records five alternating pairs plus the exact `pairedSpeedupMedian`. It writes the raw artifact before failing a missed gate; a single reference capture is environment provenance, not a substitute for the paired gate.

The historic `fps-samples-2026-07-18.json` remains provenance for the old rounded-HUD procedure; it is not silently upgraded or treated as a schema-v1 baseline.

## 8. Performance acceptance

- Deterministic software-renderer QA gates calls, triangles, lifecycle, sample cadence, and absence of browser errors. Absolute FPS is not a cross-machine hard gate.
- Hardware overhead is measured on one fixed machine/browser/viewport/DPR/preset by comparing the last accepted T-SH-02 baseline build with the T-SH-03 candidate build. Run at least five interleaved, alternating baseline/candidate pairs after a 5-second warm-up and 15-second measurement for every run.
- Compare the median of the paired cadence regressions. The candidate median must not regress by more than 5%; retain every raw pair, renderer string, reference sample, and environment classification in the JSON record.
- HUD publication must remain at or below 4Hz. Canvas redraw and React commits must not run once per render frame.

## 9. References

- [WHATWG animation frames](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#animation-frames)
- [High Resolution Time Level 3](https://www.w3.org/TR/hr-time-3/)
- [Three.js WebGLRenderer.info](https://threejs.org/docs/pages/WebGLRenderer.html#WebGLRenderer.info)
- [WEBGL_debug_renderer_info](https://registry.khronos.org/webgl/extensions/WEBGL_debug_renderer_info/)
- [EXT_disjoint_timer_query_webgl2](https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/)
- [Mesa source tree: LLVMpipe, Softpipe, and Lavapipe software rasterizers](https://docs.mesa3d.org/sourcetree.html)
- [Chromium SwiftShader documentation](https://chromium.googlesource.com/chromium/src/+/main/docs/gpu/swiftshader.md)
- [WCAG 2.2 contrast requirements](https://www.w3.org/TR/WCAG22/#contrast-minimum)
