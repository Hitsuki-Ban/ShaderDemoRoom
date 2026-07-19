# T-NT-11 preview default comparison

- Date: 2026-07-20 (Asia/Tokyo)
- Ticket: `T-NT-11`
- Capture gate: `pnpm qa:ninth-tide`
- Environment: Playwright 1.60.0 bundled Chromium 148.0.7778.96, SwiftShader, 1440×900, DPR 1

## Visual comparison

| Evidence | Chapter | Role |
|---|---|---|
| [`../../../ref/archive_of_the_ninth_tide_shoreless_web/preview.png`](../../../ref/archive_of_the_ninth_tide_shoreless_web/preview.png) | VIII | Original 1600×900 hero reference |
| [`t-nt-11-default-before.png`](t-nt-11-default-before.png) | V | Previous section-less `preview=main` result |
| [`t-nt-11-default-after.png`](t-nt-11-default-after.png) | VIII | New section-less `preview=main` result |

The new default restores the original hero's cold green chapter identity and horizontal core silhouette. The old default was the sole warm gold chapter and therefore over-represented a palette exception. The original hero and deterministic gate use different capture timing and dimensions, so the acceptance contract is chapter identity plus the existing T-NT-05 section-VIII deterministic baseline, not pixel equality with `preview.png`.

## Deterministic evidence

| State | Phase | Canonical RGBA8 SHA-256 | ROI luma | Warm dominant | PNG SHA-256 |
|---|---|---|---:|---:|---|
| Before default | V | `e0c346deb362c521466207eb1b91073940cc2545b12d18d498b8a552c5250913` | 5.2573 | true | `e5386409d5da8fde810baa3a4173adcc33a0a72dfcacdf6c3c3637b5c724ae43` |
| After default | VIII | `d4891b579a844c36e3ac74432d68a55e50bcc35286601aa6b68c934c5fb964f2` | 3.6748 | false | `19a6b26566c684ede2c58fd37885fb4fbc25c6bd31c45c51120df7d57992f0c1` |

- The complete before/after `runs` objects were exactly equal across 3 browser processes × 11 states × 3 repeats (99 hook calls). No explicit chapter pixels, metrics, state digests, hit results, or scheduling results changed.
- `qa:exhibits` reported `tideDefaultPhase: "VIII"`; explicit standalone sections still produced I–IX and bridge commands still produced I–IX without iframe replacement or console errors.
- The Ninth Tide app bundle changed from `d89ac26484226a19769a3f68f664e18ba54c2623f545d5caefc98286db854889` to `bd677af4cc26e394aa78af49878e543491c49f4e9ce95828e20665b7d1ee80e7`; the generated bundle was byte-stable across consecutive builds.
