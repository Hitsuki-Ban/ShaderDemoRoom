# T-AO-03 Orb sculpt baseline/profile (2026-07-19)

## Result

The fixed RTX 4070 Ti run completed 24 cadence conditions (six one-variable builds × idle/sculpt × two reversed-order rounds), 14 timer-query pass profiles, and 14 Chrome traces. All cadence conditions sat at the headless Chrome rAF ceiling of about 164.9 FPS, so FPS cannot rank the variants on this machine.

The GPU evidence does identify one reproducible direction: disabling bloom reduced the summed sculpt pass GPU medians by **20.08%** and **56.20%** in the two rounds. The bloom-off totals themselves were 1.0839 ms and 1.0860 ms (0.19% apart). No other treatment improved both rounds.

The next ticket owns one treatment only: **reduce bloom working resolution**, while preserving the current bloom appearance with the deterministic visual gate. This ticket does not disable bloom or change shaders, outlines, refraction, post order, pixel ratio, or context attributes.

## Fixed environment

- Source revision: `e26d4c7a8e71e493fa2902446d48139333cd1f1b`
- Browser: Chrome 150.0.7871.125, Playwright 1.60.0
- Runtime: Node v24.16.0, pnpm@11.5.2, Vite 8.0.16, Three.js 0.184.0
- OS/CPU: win32 10.0.26200 x64; Intel(R) Core(TM) i9-10850K CPU @ 3.60GHz
- Renderer raw: `ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 Ti (0x00002782) Direct3D11 vs_5_0 ps_5_0, D3D11)`
- Viewport/DPR/quality: 1440×900 CSS px, DPR 2, high; renderer ratio 1.5; drawing buffer 2160×1350
- Refraction target: 1771×1107; context `preserveDrawingBuffer=true`; SMAA and bloom enabled in baseline
- Protocol: 5 s warm-up + 15 s measurement; each condition is a fresh page; round 2 reverses variant order; an explicit interaction heartbeat prevents the 15 s auto-exhibition threshold from contaminating the window.

## Cadence matrix

| Round | Variant | Phase | Frames | FPS | Median ms | P95 ms |
| ---: | --- | --- | ---: | ---: | ---: | ---: |
| 1 | baseline | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 1 | baseline | sculpt | 2473 | 164.91 | 6.100 | 6.200 |
| 1 | smaa-off | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 1 | smaa-off | sculpt | 2474 | 164.91 | 6.100 | 6.200 |
| 1 | bloom-off | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 1 | bloom-off | sculpt | 2473 | 164.91 | 6.100 | 6.200 |
| 1 | preserve-buffer-off | idle | 2473 | 164.91 | 6.100 | 6.200 |
| 1 | preserve-buffer-off | sculpt | 2473 | 164.91 | 6.100 | 6.200 |
| 1 | refraction-scale-0.5 | idle | 2473 | 164.91 | 6.100 | 6.200 |
| 1 | refraction-scale-0.5 | sculpt | 2474 | 164.91 | 6.100 | 6.200 |
| 1 | pixel-ratio-1.0 | idle | 2473 | 164.91 | 6.100 | 6.200 |
| 1 | pixel-ratio-1.0 | sculpt | 2473 | 164.91 | 6.100 | 6.200 |
| 2 | pixel-ratio-1.0 | idle | 2473 | 164.91 | 6.100 | 6.200 |
| 2 | pixel-ratio-1.0 | sculpt | 2473 | 164.91 | 6.100 | 6.300 |
| 2 | refraction-scale-0.5 | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | refraction-scale-0.5 | sculpt | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | preserve-buffer-off | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | preserve-buffer-off | sculpt | 2473 | 164.91 | 6.100 | 6.200 |
| 2 | bloom-off | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | bloom-off | sculpt | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | smaa-off | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | smaa-off | sculpt | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | baseline | idle | 2474 | 164.91 | 6.100 | 6.200 |
| 2 | baseline | sculpt | 2474 | 164.91 | 6.100 | 6.200 |

FPS is `1000 × intervalCount / sum(intervalMs)`; p95 is nearest-rank. The committed JSON contains every raw rAF interval.

## GPU elimination matrix (sculpt)

| Variant | Round 1 total ms | vs baseline | Round 2 total ms | vs baseline |
| --- | ---: | ---: | ---: | ---: |
| baseline | 1.3563 | 0.00% | 2.4791 | 0.00% |
| smaa-off | 2.4509 | 80.71% | 2.4581 | -0.85% |
| bloom-off | 1.0839 | -20.08% | 1.0860 | -56.20% |
| preserve-buffer-off | 2.5851 | 90.60% | 1.2329 | -50.27% |
| refraction-scale-0.5 | 1.6246 | 19.78% | 2.0961 | -15.45% |
| pixel-ratio-1.0 | 2.6230 | 93.39% | 2.1412 | -13.63% |

Baseline sculpt pass medians averaged across the two rounds: refraction 0.1454 ms, main 0.4874 ms, bloom 0.9452 ms, grade 0.0596 ms, SMAA 0.2007 ms, output 0.0794 ms. Bloom is the largest two-round path and bloom-off is the only repeatable elimination result. The committed JSON retains every timer-query sample and zero-count field; timer queries were asynchronous and no disjoint run was accepted.

## Deterministic hook

- Input: `{"mode":2,"freezeProgress":0.625,"timestamp":4321}`
- standalone: 3 repeats, 1440×900, exact hash `7441cd852325cb714023e496bd2e3dcf4b06307ee5c8f9f3b26df30513bbc8f6`; logical frame deltas `1,1,1`, queued/pending rAF all zero.
- showroom: 3 repeats, 862×735, exact hash `009cdf3b18b976a44b6297accbc44e98ae7de0c575fc433cefd2a5c376eb81b7`; logical frame deltas `1,1,1`, queued/pending rAF all zero.
- Non-QA and duplicate `qa` queries expose no hook; missing/extra/invalid fields fail fast.
- App bundle: `assets/index-D9v6Hjha.js`, SHA-256 `64b01b2ab7feb881f65b56b8590a6d592ffc18f55a05b860d82357c3d4ae0026`.

## Trace evidence

| Round | Variant | Phase | Orb timing events | GPU events | Trace SHA-256 |
| ---: | --- | --- | ---: | ---: | --- |
| 1 | baseline | idle | 263 | 107866 | `479fa47dd9d7c772c53869d830fa05b9bff28cf7d1dcec0e0e01b3b5ac674824` |
| 1 | baseline | sculpt | 275 | 108974 | `068dce40d99c721d131b4a5516e3af95b2ef00babe14d46c353c1cbef39fbe89` |
| 1 | smaa-off | sculpt | 238 | 105764 | `fb208ee8c7cacb553f478f0199f3fd5cec3c1b4709ee54e92c69a946ef30ae8c` |
| 1 | bloom-off | sculpt | 224 | 96926 | `a3744c47acd76b06ef271d1c05c9dbedc1d78b220a41d901f4ffb6f21d97c011` |
| 1 | preserve-buffer-off | sculpt | 280 | 112127 | `edbefc651168936ca41bd81d6e96b61fcd9721318d013005ff6dcd9d1be8708a` |
| 1 | refraction-scale-0.5 | sculpt | 272 | 110519 | `b66c05b92da324c0d8ffcdde373328415c876952d62b543b799d325ca6e70aa4` |
| 1 | pixel-ratio-1.0 | sculpt | 277 | 111020 | `35f41890acc298f7066ad1dd3a612cae022ca0c6048278e10a7ada1a3e563978` |
| 2 | baseline | idle | 276 | 109954 | `f7f60c38b3b9066ade9de3d2b50e6742b8417e02bd9f6d4bc2dd0448e1ebe7eb` |
| 2 | pixel-ratio-1.0 | sculpt | 271 | 110428 | `1481585ca436b63c47514eaffb29735a7480910e2447d407113fd4159f39647d` |
| 2 | refraction-scale-0.5 | sculpt | 275 | 110182 | `618c163cf198e8094ad392cec944092cbcd23d806573e9c82b587882a12302fd` |
| 2 | preserve-buffer-off | sculpt | 269 | 111334 | `92c02f68545dd1bc8b2a92d1f1611662c545709fe750dc32331476ce8c3a7781` |
| 2 | bloom-off | sculpt | 211 | 99794 | `f7729f245a020d0bbbdaa0bca45855d628f7ce7097fb5c9f78fb8df85b6a602c` |
| 2 | smaa-off | sculpt | 235 | 106114 | `43cd18053678cd471ab2d700f3a78a674970de581a30c59dcf0b859040e0be1b` |
| 2 | baseline | sculpt | 271 | 107533 | `eb0194767dfc23e71233ef84346c013aba4d92b3541ef56a4aee3ae15ec6e6a4` |

Trace files remain in ignored `output/orb-profile/traces`; hashes, event counts, per-pass timer data, and raw measurements are committed in the JSON. Trace exports exclude resource contents and source maps.

## Reproduction

1. From the repository root, run `pnpm build`.
2. In one terminal run `pnpm preview --host 127.0.0.1 --port 4173`; in another set `SHOWROOM_URL=http://127.0.0.1:4173/ShaderDemoRoom` and run `pnpm qa:orb`.
3. On the fixed hardware/browser environment run `pnpm qa:orb-profile`. This creates temporary single-variable builds only under ignored `output/orb-profile` and fails if the raw NVIDIA renderer, high quality, context attributes, DPR, drawing buffer, or timer-query extension drift.
4. Run `pnpm qa:orb-report` to validate completeness and regenerate these two committed artifacts.

Method references: [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html), [Khronos timer-query extension](https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/), [Chrome tracing](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/), [Spector.js](https://spector.babylonjs.com/).
