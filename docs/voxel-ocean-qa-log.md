# Voxel Ocean Visual QA Log

This pass re-baselines the Voxel Water showroom after changing the target from a central voxel island to a viewport-filling voxel ocean with dynamic sky, current ribbons, and per-cell color control.

Metrics come from `pnpm qa:water`. `strongRatio` is the share of sampled canvas pixels whose consecutive-frame RGB delta is greater than 28. Region metrics are sampled from the first captured canvas frame.

| Round | Focus | Preset | Mean Delta | Strong Ratio | Max Delta | Water Coverage | Sky Luma | Voxel Local Contrast |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 00 | Old central-island baseline | default | 8.588 | 0.07982 | 97.8 | n/a | n/a | n/a |
| 05 | Viewport ocean, 72x72 voxel field, edge mist | default | 8.338 | 0.03804 | 74.5 | 1.00000 | 84.03 | 4.658 |
| 06 | Dynamic sky gradient and slow sky drift | default | 8.468 | 0.03499 | 76.7 | 1.00000 | 85.37 | 5.002 |
| 07 | Storm contrast and Timer migration | default | 8.497 | 0.03629 | 72.5 | 1.00000 | 85.26 | 5.008 |
| 09 | Storm preset contrast check | storm | 4.572 | 0.02504 | 114.0 | 1.00000 | 68.59 | 1.502 |
| 12 | Calm preset motion check | calm | 17.344 | 0.20617 | 62.3 | 1.00000 | 90.91 | 9.212 |
| Final | Final default baseline | default | 8.579 | 0.03547 | 74.0 | 1.00000 | 85.23 | 5.029 |
| Prepublish | Full verification rerun | default | 8.655 | 0.03480 | 76.7 | 1.00000 | 85.21 | 5.051 |

Visual targets established for this baseline:

- The water body should read as a continuous ocean field, not a square island on a plane.
- The foreground and midground should expose individual fine voxels while the far field can dissolve into shader-driven ocean bands.
- Current direction should read through sparse moving ribbons and foam/highlight phase, not dense arrows.
- Sky should respond to weather and time controls through procedural gradient and cloud movement without volumetric cost.
- Per-voxel color variation should be stable in world space and remain subordinate to the shared water palette.

Research inputs used for the pass:

- Derivative-filtered grids and screen-footprint fade for shimmer control.
- Flow-map style directional water cues, using aligned foam/highlight motion instead of arrows.
- Procedural sky dome uniforms for static GitHub Pages deployment.
- Instanced voxel colors with a white base material so per-cell color is not double-multiplied.
