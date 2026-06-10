# Voxel Water Toon / Infinite-Ocean QA

This pass responds to the visual target change: the Voxel Water room should feel brighter, clearer, more toon-stylized, and closer to an infinite ocean while remaining a static GitHub Pages-friendly Three.js/Vite showroom.

## Research Direction

The chosen implementation path is a hybrid ocean:

- Near field: a fine `InstancedMesh` voxel surface, currently `96 x 96`, using continuous geometry height and toon-banded color.
- Far field: a large camera-relative shader plane, with world-space wave sampling through `uOceanOriginXZ`.
- Transition: horizon mist and edge-tinted voxel columns instead of a hard geometric seam.
- Deployment: no backend, no heavy water solver, no runtime texture baking, and no WebGPU-only dependency.

This avoids a full projected-grid implementation for now. Projected grids are a strong long-range water technique, but they add horizon/back-projection and swimming edge cases that are not needed for this showroom stage. A future second phase can add rolling grid rings or clipmap-style LOD if the room gains camera navigation.

Research inputs:

- Projected grid water rendering: https://fileadmin.cs.lth.se/graphics/theses/projects/projgrid/projgrid-lq.pdf
- Stylized water depth/color practice: https://ameye.dev/notes/stylized-water-shader/
- Toon water color/foam practice: https://roystan.net/articles/toon-water/
- Crest ocean rendering notes for fog/refraction tradeoffs: https://crest.readthedocs.io/en/4.11/user/rendering.html
- Three.js `ShaderMaterial`: https://threejs.org/docs/pages/ShaderMaterial.html
- Three.js `InstancedMesh`: https://threejs.org/docs/pages/InstancedMesh.html

## Gemini Review

Gemini reviewed the round-10 screenshot and flagged four useful risks:

- Near voxel and far plane can read as two different water styles if the transition is too visible.
- Pure brightness can become plastic unless trough/crest color ramps fake translucency.
- Toon style should affect lighting and highlights, not only geometry.
- Horizon mist should match sky color rather than muddy the dynamic sky.

Accepted changes from that review:

- Added a faked depth/translucency ramp.
- Added tight `smoothstep` toon specular highlights instead of hard `step`.
- Added edge mist coloring on voxel boundary columns.
- Kept opaque/high-alpha water rather than introducing complex transparent sorting.

## QA Metrics

Metrics come from `pnpm qa:water`. `strongRatio` is the share of sampled canvas pixels with consecutive-frame RGB delta greater than 28. `waterLuma`, `waterSaturationRange`, and `toonBandSeparation` are region-aware water metrics added during this pass.

Pre-round baseline after the first bright/toon guardrail implementation:

| Label | Mean Delta | Strong Ratio | Water Luma | Toon Band Separation | Voxel Local Contrast |
| --- | ---: | ---: | ---: | ---: | ---: |
| `toon-baseline-01` | 28.751 | 0.47351 | 79.17 | 16.129 | 17.206 |

## 40-Round Visual QA Log

| Round | Label | Focus | Preset / View | Mean Delta | Strong Ratio | Water Luma | Toon Band Separation |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 01 | `toon-r01-filled-voxels` | Fill low voxel holes and lighten columns | default | 12.559 | 0.17202 | 94.53 | 32.012 |
| 02 | `toon-r02-infinite-plane` | Expand far ocean plane and camera range | default | 15.344 | 0.21979 | 94.45 | 32.012 |
| 03 | `toon-r03-distance-bands` | Distance-fade far toon bands | default | 15.538 | 0.22288 | 94.49 | 32.012 |
| 04 | `toon-r04-far-ramp` | Smooth far ramp while preserving near toon | default | 15.894 | 0.22953 | 94.49 | 32.012 |
| 05 | `toon-r05-lower-swell` | Lower default swell and wave height | default | 15.235 | 0.21483 | 94.68 | 32.012 |
| 06 | `toon-r06-cross-waves` | Cross wave directions to reduce parallel scanlines | default | 14.646 | 0.20630 | 94.46 | 32.012 |
| 07 | `toon-r07-column-palette` | Brighten voxel palette and close dark seams | default | 12.294 | 0.16648 | 103.03 | 10.160 |
| 08 | `toon-r08-horizon-mist` | Add shader horizon mist | default | 10.894 | 0.14239 | 102.99 | 10.160 |
| 09 | `toon-r09-crest-foam` | Strengthen crest foam | default | 10.967 | 0.14431 | 103.05 | 10.160 |
| 10 | `toon-r10-camera-horizon` | Lower camera angle for sky/ocean space | default | 9.262 | 0.11141 | 99.30 | 9.660 |
| 11 | `toon-r11-toon-specular` | Add hard-edged toon specular | default | 9.141 | 0.10885 | 99.28 | 9.660 |
| 12 | `toon-r12-depth-ramp` | Add faked translucency depth ramp | default | 9.390 | 0.11251 | 99.22 | 9.660 |
| 13 | `toon-r13-voxel-96` | Expand near voxel surface to `96 x 96` | default | 8.145 | 0.09197 | 99.41 | 9.554 |
| 14 | `toon-r14-far-soften` | Soften far shallow bands with stronger mist | default | 7.275 | 0.07245 | 99.66 | 9.554 |
| 15 | `toon-r15-sky-glow` | Add directional sky glow | default | 7.363 | 0.07743 | 99.44 | 9.554 |
| 16 | `toon-r16-column-bands` | Quantize column colors, not geometry | default | 7.178 | 0.07084 | 99.54 | 9.554 |
| 17 | `toon-r17-mint-crests` | Push crests toward mint green | default | 7.440 | 0.07807 | 99.68 | 9.554 |
| 18 | `toon-r18-storm-check` | Inspect storm darkness | storm | 3.099 | 0.02848 | 79.53 | 1.425 |
| 19 | `toon-r19-storm-clarity` | Raise storm clarity and reduce cloud weight | storm | 3.647 | 0.03039 | 82.05 | 1.850 |
| 20 | `toon-r20-storm-tint` | Reduce storm tint swallowing voxel color | storm | 3.681 | 0.03399 | 82.08 | 1.850 |
| 21 | `toon-r21-calm-check` | Inspect calm preset flatness | calm | 5.832 | 0.06309 | 102.17 | 7.771 |
| 22 | `toon-r22-calm-bands` | Add calm wave height and fewer toon steps | calm | 6.362 | 0.06709 | 102.05 | 7.916 |
| 23 | `toon-r23-mobile-default` | Mobile viewport check | mobile default | 6.936 | 0.06225 | 95.45 | 11.974 |
| 24 | `toon-r24-brightness-mid` | Push default brightness slightly | default | 7.633 | 0.08231 | 99.66 | 9.660 |
| 25 | `toon-r25-edge-mist` | Mist-color voxel boundary columns | default | 7.659 | 0.08396 | 99.68 | 9.660 |
| 26 | `toon-r26-wide-default` | Wide desktop viewport check | 1600w | 7.602 | 0.08413 | 99.73 | 10.160 |
| 27 | `toon-r27-square-default` | Square/tall viewport check | 900w | 7.483 | 0.07634 | 99.10 | 10.766 |
| 28 | `toon-r28-cloud-opacity` | Reduce default cloud opacity | default | 7.646 | 0.08296 | 99.66 | 9.660 |
| 29 | `toon-r29-page-warmup` | Confirm page screenshot timing issue | default | 7.366 | 0.07665 | 99.78 | 9.660 |
| 30 | `toon-r30-qa-page-after-frames` | Capture page screenshot after frames | default | 7.100 | 0.06664 | 99.49 | 9.660 |
| 31 | `toon-r31-long-default` | Longer default frame sequence | default | 7.405 | 0.07744 | 99.52 | 9.660 |
| 32 | `toon-r32-current-down` | Reduce default current strength | default | 7.557 | 0.08138 | 99.67 | 9.660 |
| 33 | `toon-r33-rain-check` | Add and test rain QA preset | rain | 6.742 | 0.06034 | 98.23 | 16.895 |
| 34 | `toon-r34-dense-sampling` | Denser sample scale check | default | 7.412 | 0.07887 | 99.54 | 9.660 |
| 35 | `toon-r35-large-wide` | Large wide viewport check | 1920w | 7.819 | 0.08831 | 99.92 | 10.766 |
| 36 | `toon-r36-preview-root-base` | Static preview build check | preview default | 7.524 | 0.07978 | 99.65 | 9.554 |
| 37 | `toon-r37-preview-rain` | Static preview rain check | preview rain | 6.768 | 0.06005 | 98.10 | 17.108 |
| 38 | `toon-r38-preview-storm` | Static preview storm check | preview storm | 3.670 | 0.03287 | 82.09 | 1.638 |
| 39 | `toon-r39-final-dev-default` | Final desktop baseline | default | 7.401 | 0.07668 | 99.54 | 9.660 |
| 40 | `toon-r40-final-mobile` | Final mobile baseline | mobile default | 6.951 | 0.06268 | 95.65 | 12.081 |

## Final Baseline

Default desktop final:

- `meanDelta`: 7.401
- `strongRatio`: 0.07668
- `waterLuma`: 99.54
- `waterSaturationRange`: 0.4769
- `toonBandSeparation`: 9.66
- `waterCoverage`: 1.0

Default mobile final:

- `meanDelta`: 6.951
- `strongRatio`: 0.06268
- `waterLuma`: 95.65
- `waterSaturationRange`: 0.6568
- `toonBandSeparation`: 12.081
- `waterCoverage`: 1.0

The remaining deliberate tradeoff is Storm mode: it stays darker and less banded than default because rain, cloud, and fog dominate the mood. It is stable and readable, but a future storm-specific pass could add lightning or cyan rim highlights if the storm preset needs stronger stylization.

## Implementation Notes

- `VITE_BASE_PATH` can now override production `base` for local static preview. GitHub Actions keeps the default `/ShaderDemoRoom/` path.
- `qa:water` now captures the full page after animation frames, so status labels do not show initial `0 FPS / 0 calls` values.
- `QA_PRESET=rain` is supported for weather-button QA.
- The water room keeps high-alpha/faked translucency instead of deep transparent sorting, matching the static lightweight deployment target.
