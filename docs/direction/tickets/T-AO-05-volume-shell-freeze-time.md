# [T-AO-05] freeze 中も動き続ける volume shell を fluidTime へ差し替える

- 分類: TA
- 優先度: P2
- 評価軸: モデル一貫性(凍結ルール) / 描画正当性
- 依存: なし

## 現状(証拠)

現行 `ref/mizu-kokoro-2-source/src/main.js`:

- **liquid フラグメントは freeze で時間をロックする**: `float frozen = freezeMask(vLocalDir); ... float fluidTime = mix(detailTime, uFreezeTime, frozen);`(main.js:612-614)。凍結領域では流体時間が核形成時刻 `uFreezeTime` に固定され、表面フローが止まる。
- **volume シェル(背面吸収シェル)は生の `uTime` を使い続ける**: `volumeFragmentShader`(main.js:763-797)内で
  - `surfaceFlowVector(vLocalDir, uTime, uTurbulence)`(main.js:783)
  - `innerCaustic` の fbm と sin の時間項(main.js:787-788)
  の3箇所が freeze 状態を無視して進行する。`uFreezeProgress` は宣言済み(main.js:771)だが alpha フェード(`alpha *= 1.0 - uFreezeProgress * 0.78`、main.js:794)にしか使われていない。
- `volumeMaterial` は `sharedUniforms` をそのまま共有している(main.js:951-958)ため、`uFreezeTime` の値は JS 側配線なしで既に利用可能 — 不足しているのは GLSL 側の `uniform float uFreezeTime;` 宣言と使用箇所の差し替えのみ。
- 現象: 凍結中、グレージング角で背面シェルのフロー模様と内部コースティクスが動き続ける。alpha 0.78 減衰で部分的に隠蔽されているが、freeze 進行中(progress 0.2〜0.7 の帯)では十分視認できる。

## 問題

ART_DIRECTION の凍結ルール(「結晶は色替えではなくルール切替であれ」「凍結時に表面フローはロックされる」)への違反。liquid 表面は静止するのに背面だけ流れ続けるのは、最大の見せ場である結晶化の説得力 — 「相転移で運動言語が変わる」というテーゼそのもの — を裏から侵食する。

## 改善方向

volume を liquid と同じ**空間的な凍結フロント**へ揃える。全体 progress lock や簡易近似は実装しない。

1. `volumeFragmentShader` に `uFreezeTime` と `uFreezeOrigin` を宣言し、liquid と同じ angular distance、front threshold、smoothstep を単一の共有 GLSL 定義から参照して `freezeMask(vLocalDir)` を計算する。
2. `float fluidTime = mix(uTime, uFreezeTime, freezeMask(vLocalDir));` を使い、volume の surface flow、fbm、innerCaustic の全時間項を `fluidTime` へ置換する。別の mask 定数や progress-only 分岐を作らない。
3. melt 時も同じ mask が後退して `uTime` へ戻る。liquid と volume の再開領域/時刻が一致することを検収し、ジャンプを隠す別時間軸は追加しない。
4. T-AO-03 の `?qa=1` 初期化上に QA-only `window.__MIZU_KOKORO_CAPTURE_VOLUME__({ mode, freezeProgress, freezeOrigin, timestamp })` を実装する。本票が JS harness、offscreen render target、volume-only scene/camera wiring、uniformの保存/復元を所有する。`uSceneTexture` は seedや外部frameに依存させず、固定64×64 RGBA8 linear DataTexture(座標から生成する仕様固定の2軸グラデーション+8px checker)へ差し替え、capture完了時に元のtextureを復元する。hookはvolume `uTime` だけを指定timestampへ設定して1 frame描画し、通常composerやrAFを起動しない。

## 受け入れ基準

- 固定 viewport 1440×900 / DPR 1、SURGE、freezeOrigin=`normalize(vec3(0,0,1))`、progress=0.5、時刻 t と t+2s で、**volume meshだけ**を黒背景の同一 offscreen targetへ描く QA captureを使う。camera/transform/freeze stateを固定し、FinalGrade(scanline/grain)、bloom、outline、liquid、crystalは通さず、比較間では volume の `uTime` だけを2秒進める。凍結済み hemisphere ROI は mean absolute RGB diff ≤0.5/255 かつ p99 ≤2/255、未凍結 hemisphere ROI は mean diff ≥2/255 であること。
- freeze 完了(progress=1)では同じ隔離 volume pass の ROI 全体が静止閾値を満たし、progress=0 では変更前の隔離 pass の運動量/見た目が維持されること。最終合成は別途 before/after 目視回帰だけを行い、動く postprocess のピクセル一致を要求しない。
- QA harness の挙動テストで、同一入力3回のhash一致、固定DataTextureのbyte一致、capture後の `uSceneTexture` / render target / camera / scene state復元、通常起動でhook非公開を固定する。
- melt 後は背面フローが再開し、liquid 表面との時間的整合(同時に動き出す)が保たれる。
- 非 freeze 時の見た目は 4相すべてで無回帰(volume シェルの通常時アルファ・色は変更しない)。
- reduced-motion 環境でも破綻しない(sceneTime スケールの変更はしていないので原理上影響なし — 確認のみ)。

## 影響範囲・注意

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。
- 製品側のfreeze実装は GLSL 変更だけで、sharedUniforms の本番配線は増やさない。JS差分は上記 `?qa=1` の isolated-volume harness とテストに限定し、volume 用の別本番uniformオブジェクトを作らないこと。
- crystal シェル(main.js:831-)は独自に freeze 演出を持つため本票では触れない。outline は時間項を持たない(main.js:736-746)ので対象外。
- 検収は 4相 × freeze/melt のスクリーンショット比較(review-framework 横断注意3の精神で全状態を再検収)。
- shader-quality.test.ts / runtime.test.ts は shell 側ルームのソースをピン留めしており ref/ の GLSL には届かないはずだが、`pnpm test` 全走で確認する。

## 実施報告 (2026-07-20)

- liquid 内にあった angular-distance / front / smoothstep の freeze mask を、アプリ内の単一 `freezeMaskGLSL` 定義へ抽出し、liquid と volume の両 fragment shader から参照するようにした。volume は `uFreezeTime` / `uFreezeOrigin` を宣言し、`mix(uTime, uFreezeTime, freezeMask(vLocalDir))` の `fluidTime` を surface flow、fbm、inner caustic の3時間項へ適用した。progress-only 分岐、別定数、別時間軸、crystal の変更は追加していない。
- 厳密な単一 `?qa=1` でのみ `__MIZU_KOKORO_CAPTURE_VOLUME__` を公開した。固定 1440×900 / DPR 1 / RGBA8 target、黒背景、+X 固定 camera、volume mesh のみ、固定 64×64 Linear-sRGB RGBA8 DataTexture (x/y gradient + 8px checker) を使い、composer / bloom / outline / liquid / crystal / rAF を通さず1回だけ描画する。共有 uniform と元の `uSceneTexture` identity、render target / cube face / mip level は `finally` で復元する。
- 同一 Chromium / SwiftShader 上の変更前後比較では、SURGE progress=0.5 の frozen ROI が mean `1.0793/255`・p99 `12/255` から mean `0/255`・p99 `0/255` へ、progress=1 の interior ROI が mean `0.3070/255`・p99 `4/255` から `0/255`・`0/255` へ改善した。未凍結 ROI は t=10s→12s で mean `2.1403/255` を維持した。固定 DataTexture hash は `0d234066642703173913f4289bf01773230ff6b613f7ed4a5de0118bf8bd6788`。
- progress=0 の変更前/変更後 isolated framebuffer hash は4相すべて完全一致した: CALM `1648b20740c653669ea92902624505035eb581dd040cf405ae0fb35d9f8ddbf1`、SURGE `e4c8265e92d31030155647e2ab1268bd6fe4a8ca817196d0dfb43be48d878bed`、BLOOM `c68933ec63255264c39de463f741e8db310ca5483e9c18cb35095d8d42ea4ec2`、VOID `29bf90ef978cb44fced7cbab62f11949f977970c4a6926a226b66c01ce08f6c1`。melt 後も同じ progress=0 frame へ戻り、通常時間軸で motion threshold を満たした。
- `pnpm qa:orb` は同入力3回の exact hash、固定 texture byte/hash、strict input rejection、通常/重複 QA URL で hook 非公開、STEP 前後の状態復元、4相 progress=0、melt、standalone/showroom、reduced-motion を通過した。isolated volume hash は両経路とも `5c5ad142c321769988921c96951cfcbe8f4daf80aff90e77d7d6dd4794f0edbd`。既存 full-scene hash も standalone `7441cd852325cb714023e496bd2e3dcf4b06307ee5c8f9f3b26df30513bbc8f6`、showroom `009cdf3b18b976a44b6297accbc44e98ae7de0c575fc433cefd2a5c376eb81b7` のまま。
- 回帰門は `pnpm test` (31 files / 180 tests)、`pnpm lint`、`pnpm build`、`pnpm qa:exhibits`、`pnpm qa:visual` を通過した。4相 freeze/melt、mouse / touch / pen、14 capture、console error / mobile overflow / HUD overlap なしを確認した。ref / public の生成 JS は SHA-256 `1793f918860fcc3d6a4f050b3551572a91342b30a30c9631aa92a07f3e227fe4` で一致した。独立 reviewer は material finding なしで APPROVE、独立 verifier は同じ ROI / hash / state-restoration 証拠を再現して PASS とした。
