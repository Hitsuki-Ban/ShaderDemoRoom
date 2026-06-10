# Voxel Water Visual QA Log

This log records the 20 focused visual-QA tuning iterations for the Voxel Water showroom.
Metrics come from `pnpm qa:water`, comparing consecutive `.canvas-shell` screenshots.

| Round | Focus | Mean Delta | Strong Ratio | Max Delta |
| --- | --- | ---: | ---: | ---: |
| 00 | Baseline | 12.771 | 0.15066 | 133.6 |
| 01 | Soft rain/glitter thresholds | 13.191 | 0.16230 | 124.8 |
| 02 | Grid footprint/distance fade | 12.393 | 0.14136 | 127.8 |
| 03 | Lower rain surface density | 11.964 | 0.13222 | 123.1 |
| 04 | Opaque water pass trial | 13.313 | 0.15087 | 125.7 |
| 05 | Transparent render ordering | 12.274 | 0.13790 | 125.7 |
| 06 | Subtle presentation drift | 11.770 | 0.12759 | 125.3 |
| 07 | Continuous column heights | 11.370 | 0.12064 | 125.8 |
| 08 | Normal detail distance fade | 10.667 | 0.10865 | 128.6 |
| 09 | Filtered glitter | 10.735 | 0.11017 | 132.4 |
| 10 | Refined default preset | 10.389 | 0.10454 | 110.7 |
| 11 | Subtle grid overlay | 10.515 | 0.10678 | 111.2 |
| 12 | Crest foam gating | 9.968 | 0.10209 | 110.9 |
| 13 | Water volume alpha | 10.531 | 0.10640 | 110.4 |
| 14 | Seeded layout randomness | 10.049 | 0.10160 | 112.1 |
| 15 | Water edge fade | 9.512 | 0.09774 | 111.6 |
| 16 | Camera depth range | 9.547 | 0.09834 | 113.6 |
| 17 | Sparser rain particles | 9.743 | 0.09964 | 109.0 |
| 18 | Refined column material | 9.931 | 0.09464 | 104.7 |
| 19 | Spray threshold | 9.635 | 0.09072 | 96.4 |
| 20 | Calmer wave advection | 8.945 | 0.08468 | 96.0 |

Key takeaways:

- The highest-impact flicker fixes were filtering procedural thresholds, reducing rain/spray density, adding grid distance/footprint fade, and slowing presentation/wave motion.
- The failed opaque water pass confirmed that this scene still needs transparent water for voxel readability; explicit render ordering was the safer compromise.
- Final round canvas-frame instability dropped from `12.771 / 0.15066 / 133.6` to `8.945 / 0.08468 / 96.0`.
- The prepublish rerun measured `8.611 / 0.07959 / 98.3`, confirming the final tuning remained stable after the full verification pass.
