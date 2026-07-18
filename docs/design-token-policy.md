# Design token policy

The showroom keeps its dark technical-gallery identity while governing shell colors through two layers: opaque palette primitives in `src/styles/tokens.css`, then semantic roles consumed by components. Room runtimes and shaders own their art-direction colors separately and are outside this shell policy.

## Source and consumption rules

1. Declare each opaque shell color once as a `--palette-*` primitive in `tokens.css`.
2. Map primitives to semantic roles such as `--bg`, `--microcopy`, and `--accent-*`. Components use semantic roles only.
3. Register room accents through the closed `roomAccentTokens` set in `src/styles/designTokens.ts`. A room definition cannot accept an arbitrary color string.
4. The Three.js renderer reads `--bg` from the loaded root styles. Shader canvas, embedded shell, and embedded iframe use the same semantic token, so shader ↔ embedded transitions have one near-black base.
5. `pnpm lint:tokens` rejects opaque hex and numeric color literals in `src/styles/app.css`, `src/app`, `src/shared`, and `src/rooms/registry.ts`. Transparent `rgb()` / `rgba()` overlays remain local composition values in this ticket; the lint must not be described as governing every CSS color syntax.

Missing required tokens fail fast. There are no aliases, fallback colors, or compatibility names.

## Current room accents

| Room | Semantic token | Primitive | APCA on `--bg` |
|---|---|---:|---:|
| Voxel Water | `--accent-cyan` | `#34d5ff` | Lc -71.68 |
| Glass Optics | `--accent-amber` | `#ffbd5a` | Lc -73.97 |
| MIZU//KOKORO | `--accent-magenta` | `#ff56d8` | Lc -49.34 |
| Ninth Tide Archive | `--accent-mint` | `#5af2d1` | Lc -84.59 |

Ninth Tide previously used `#79ead9`, only OKLab ΔE×100 3.39 from the existing mint. It is now intentionally unified with `#5af2d1`; maintaining two near-identical identities had no semantic value.

The raw accent Lc floor of 45 is a project guardrail for the current icon/border role, not an accessibility-conformance claim. Any future textual use must pass the text rules below for its actual font and background. Actual composited controls must also retain shape/icon cues and be inspected in visual QA.

## Adding an accent

1. Start from the exhibit subject and choose a candidate that remains recognizable beside the existing four accents.
2. Add one palette primitive and one semantic `--accent-*` role.
3. Add the semantic reference to `roomAccentTokens`, then use that closed value in the registry.
4. Run `pnpm lint:tokens`. Every pair of room accents must keep OKLab ΔE×100 ≥ 10, and every raw accent must keep |Lc| ≥ 45 on `--bg`.
5. Inspect default, hover, and active rail states in real desktop and mobile renders. The numeric distance is a duplicate-color guardrail, not a replacement for visual judgment or non-color encoding.

The OKLab rule follows the perceptually uniform color-difference method in [CSS Color 4](https://www.w3.org/TR/css-color-4/#color-difference-OK). The threshold of 10 is a showroom product rule; it is not a W3C conformance threshold.

## Text contrast contract

WCAG 2.2 is the normative gate: ordinary text must keep at least 4.5:1 contrast. APCA is an additional, versioned project quality signal calculated with exact-pinned `apca-w3@0.1.9` (algorithm 0.0.98G-4g beta); this project does not claim APCA or WCAG 3 conformance.

The two rail microcopy roles use `--microcopy`, which shares the readable ink primitive with `--text`; hierarchy comes from typography instead of low contrast. Room descriptions are 13px/700, while the longer navigation hint is 15px/500. Automated results are:

| Pair | WCAG 2.2 ratio | APCA | Official lookup at 700 / 500 weight |
|---|---:|---:|---:|
| `#eef7f8` on `--bg` (`#06090e`) | 18.32:1 | Lc -101.31 | 13px / 14.5px minimum |
| `#eef7f8` on `--bg-elevated` (`#0b1118`) | 17.42:1 | Lc -100.94 | 13px / 14.5px minimum |

The old `#647883` at 11px/400 measured 4.33:1 and Lc -29.55 on `--bg`. Official `fontLookupAPCA()` provides no viable 11px/400 pairing—even white needs a larger font—so changing color alone was not a valid fix.

Sources: [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [official APCA implementation and font lookup](https://github.com/Myndex/apca-w3), and [APCA usage ranges](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html).
