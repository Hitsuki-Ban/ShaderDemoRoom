# Ninth Tide deterministic capture QA

- Ticket: `T-NT-05`
- Implementation revision: `a846b3c13e89fa77601b0106b0421dee04e5d8c2`
- Baseline: `captures/ninth-tide-deterministic-baseline-2026-07-19.json`
- Hit fixture: `hit-targets-v1.json`

## Official command

```powershell
pnpm build
pnpm preview
$env:SHOWROOM_URL='http://127.0.0.1:4173/ShaderDemoRoom'
pnpm qa:ninth-tide
```

`qa:ninth-tide` は `SHOWROOM_URL`、production build、strict preview hook、
`WEBGL_debug_renderer_info`、SwiftShader、1440×900 / DPR 1、fixture を必須とする。
いずれかが欠けた場合は sleep、system browser、GPU renderer、座標再計算へ
fallback せず失敗する。成功・失敗のどちらでも先に
`output/playwright/ninth-tide/manifest.json` と `report.md` を書き、成功時は
opening + 9章 + ending の11 PNGを同ディレクトリへ保存する。

Pages workflow は既存のproduction preview serverに対して同じコマンドを実行し、
`output/playwright` を14日 artifactとして保存する。

## Deterministic contract

- URL `?preview=...` / forced preview だけが capture modeであり、起動時rAFは0件。
  standalone と embedded `set-tide-preview` のlive loopは従来通り継続する。
- strict hookは `__NINTH_TIDE_STEP__({ mode, section, timestampMs })` のみ。
  numeric signature、既定timestamp、未知keyは受け付けない。
- 各callはstate/globals、scene transform、material/uniform、geometry/instance buffer、
  camera/pointer、synthetic/audio state、PRNG、DOM/CSS、composer/bloom/Afterimage
  render targetをbaselineへ戻す。
- main章は章内絶対timestampへ向けて120×1/60秒のCPU-only settleを行い、
  その後Composerをちょうど1回だけrenderする。opening/endingは固定stateから1回renderする。
  hook解決後もrAFは0件である。
- capture modeだけ `preserveDrawingBuffer=true` とし、同じ停止frameから
  direct `readPixels` とcanvas PNGを得る。両方のcanonical RGBA8 hashが一致しなければ失敗する。
- canonical bytesは `rgba8\0 + u32be(width) + u32be(height) + top-left RGBA8`。
  PNG file SHAは転送/encoding診断だけに使う。
- 3つの独立browser process × 各状態fresh page × 同page3回、合計99 hook callsで、
  framebuffer hash、canvas hash、state digest、metrics、hit resultsの完全一致を要求する。
- captureのvisual score durationは九章境界の終端 `354.504` 秒に固定し、network media metadataを
  clock sourceにしない。第2 browser runのopeningでは `archive.mp3` requestを最初のrepeatまで保留し、
  その後releaseしてfinite durationを確認してから残り2 repeatを実行する。metadata前後もexact一致が必須である。

exact hashは同一gate内の固定Playwright/Chromium/SwiftShader stackだけに対する契約である。
WebGL実装、OS、CPU architecture、headless mode、browser versionをまたぐ永久goldenにはしない。
cross-run gateはchapter、非黒、luma range、warm rule、fixtureを使い、hashは証拠として記録する。

## 2026-07-19 baseline environment

- Windows x64 / Node `v24.16.0` / pnpm `11.5.2`
- Playwright `1.60.0` bundled Chromium `148.0.7778.96`
- flags: `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`
- renderer: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`
- viewport / screen: 1440×900, DPR 1, `en-US`, UTC, dark, reduced-motion no-preference
- HTML SHA-256: `de0cd43deb4c6c3a2899fd80ebef4a8615fc0ae0f719cb1fc43f10762fac66a0`
- app.js SHA-256: `d89ac26484226a19769a3f68f664e18ba54c2623f545d5caefc98286db854889`

## Pixel policy and baseline

ROIはcanvasの `(144,90)` から `1152×720`。lumaはRec.709の
`(2126R + 7152G + 722B) / 10000` を整数累積して小数4桁へ丸める。
warm-dominantはROI合計で `R > 1.08G` かつ `R > 1.15B` とし、金色の第V章だけをtrueにする。

| State | Timestamp ms | Phase | ROI luma | Accepted range | Warm | RGBA8 SHA-256 |
|---|---:|---:|---:|---:|---:|---|
| opening | 5,750 | I | 0.2922 | 0.15–0.55 | false | `b4d1e4aa2c05…e7dd` |
| section 0 | 24,485.45 | I | 6.6903 | 4.5–9.0 | false | `3d8592b2d712…2f50` |
| section 1 | 62,008.9 | II | 4.0563 | 2.7–5.5 | false | `41ad9f84a23a…0cf1` |
| section 2 | 89,071.75 | III | 4.8006 | 3.2–6.5 | false | `90302b1bdf5d…0660` |
| section 3 | 124,168.7 | IV | 2.2538 | 1.4–3.2 | false | `31d5a4c18cf1…96b0` |
| section 4 | 164,525 | V | 5.2573 | 3.5–7.2 | **true** | `e0c346deb362…0913` |
| section 5 | 204,347.25 | VI | 4.1908 | 2.8–5.7 | false | `bcbc94bf2feb…4a7` |
| section 6 | 242,555.65 | VII | 0.9692 | 0.55–1.5 | false | `050ca2bd914a…4399` |
| section 7 | 295,137.2 | VIII | 3.6748 | 2.4–5.0 | false | `d4891b579a84…64f2` |
| section 8 | 342,276.2 | IX | 2.9147 | 1.8–4.2 | false | `a17ea1d95d3c…fa13` |
| ending | 346,000 | IX | 0.0461 | 0.02–0.09 | false | `b30370c7d26e…8440` |

完全なhash、state digest、RGB mean、non-black pixel数はbaseline JSONに保存する。

## Hit fixture calibration

座標はviewport CSS pixel。各章の可視core silhouetteを楕円としてcenterと半径を固定し、
center、70%半径の上下左右、115%半径の上下左右を記録した。CIはfixtureを読むだけで、
実行中に輪郭や座標を再計算しない。

| Section | Center | Silhouette radius X/Y | 70% horizontal before | 70% vertical before | 115% |
|---:|---:|---:|---|---|---|
| 0 | 719,440 | 120 / 120 | hit / hit | hit / hit | all miss |
| 1 | 721,439 | 125 / 150 | hit / hit | hit / hit | all miss |
| 2 | 720,440 | 128 / 128 | hit / hit | hit / hit | all miss |
| 3 | 718,439 | 66 / 205 | hit / hit | hit / hit | all miss |
| 4 | 717,440 | 140 / 110 | hit / hit | hit / hit | all miss |
| 5 | 720,439 | 98 / 162 | hit / hit | hit / hit | all miss |
| 6 | 720,439 | 168 / 140 | hit / hit | hit / hit | all miss |
| 7 | 721,440 | 210 / 75 | **miss / miss** | hit / hit | all miss |
| 8 | 720,440 | 120 / 55 | **miss / miss** | hit / hit | all miss |

section 7/8のhorizontal 70% pointsが`beforeHit=false`なのはT-NT-09が直すべき現行欠陥のbaselineであり、
本票でpass扱いへ変更していない。

## Recalibration

renderer/browserの更新、または意図的なNinth Tide visual/camera/postprocess変更時だけ再較正する。

1. 変更前に本gateを実行してmanifestと11 PNGを保存する。
2. 変更後も同じstackでgateを実行し、99 callsのwithin-run exact一致を先に確認する。
3. luma/warm/hitの差を意図した変更で説明し、policyまたはfixtureを手作業で更新する。
4. section 7/8の既知missを含むfixtureと新しいrangeを独立レビューする。
5. baseline JSON、implementation revision、bundle SHA、QA logを同時に更新する。

renderer別tolerance、retry、online fixture regeneration、旧hook compatibilityは追加しない。
