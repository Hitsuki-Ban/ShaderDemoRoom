# [T-VW-03] 水面の縦シームアーティファクトを特定し修正する

- 分類: TA
- 優先度: P1
- 評価軸: 描画正当性
- 依存: なし(最優先で単独調査。T-VW-05 / T-VW-09 の描画順・波モデル変更より**前**に原因を確定させること — 後だと再現条件が変わり切り分け不能になる)

## 現状(証拠)

- **Clear**: `output/water-qa/palette-camera-final-clear-canvas.png` に、水平線付近からカラム面を貫いて画面下部まで走る**明るいシアンの縦線**(わずかに斜行)が写っている(本チケット起票時に画像を実見して確認済み)。
- **Storm**: `output/water-qa/palette-camera-final-storm-canvas.png` の右下に**薄い赤みの縦線**。`palette-camera-final-rain-canvas.png` にも残存(dossier-voxel-water.md ビジュアル現状評価)。
- これらは 'final' ラベルの QA 画像であり、docs/voxel-water-toon-infinite-qa.md「Palette And Camera Correction Pass」(147-174行)で**現行のカメラ位置 (5.8, 7.2, 13.8) に移した後**のキャプチャ。つまり現行ビルド既定構図での再現が期待できる。
- review-framework.md は本件を P1(公開ブロッカー)の代表例として明記。

## 問題

「final」を名乗る公開品質キャプチャにハードなレンダリングバグが写っており、展示の信頼性を直接毀損する。原因未特定のまま波モデルや描画順を触ると(T-VW-05/09)、シームが偶然消えて根本原因が潜伏する危険もある。

## 改善方向

### 段階1: 再現と切り分け(調査タスク)

1. **再現**: `pnpm qa:water` を clear / rain / storm(QA_PRESET 経由、`scripts/water-qa.mjs:48-54`)で実行し、現行 HEAD でシームが再現するキャプチャと座標を記録する。viewport は既定 1440x900 と、シームが顕著だった過去条件の両方。
2. **容疑者の逐次無効化**(現行コードから導いた仮説、疑い順):
   - **(a) プレーンの UV エッジフェード帯**: `water.frag.glsl:222-224` は UV 端で `color * vec3(0.72, 0.86, 0.92)` を適用する。R の減衰が最小のため**相対的に赤みの帯**になる — Storm の赤線と整合。プレーン半幅 78 は camera.far 72 に近く、`OCEAN_SNAP_SIZE`(4.96)スナップ(runtime.ts:602-611)の位置次第でエッジ帯が視錐台内に入り得る。検証: edgeFade を恒等 1 に固定して再キャプチャ。
   - **(b) gridOverlay の最前面貫通**: X 平行 63 本の LineSegments(runtime.ts:352-379)は depthTest:false / renderOrder 5 で全描画物の上に載る。視点によっては消失点へ収束する線群が「1本の斜め縦線」として読める。色はシアン系(0x1599a0 → columnTint/columnTopTint lerp、500行)— Clear のシアン線と整合。検証: `gridOverlay.visible = false` で再キャプチャ。
   - **(c) フラグメントの UV グリッド**: `gridLine(vUv)`(water.frag.glsl:30-44、115行)は 156 unit プレーンに 28 セル(周期約 5.57 unit)。グレージング角で footprintFade(42行)が破れると1本だけ強調される可能性。検証: `grid` 項をゼロ固定。
   - **(d) 波モデルの位相不連続**: waveLayer 合成は連続関数なので単独では縦線を作らないが、`uOceanOriginXZ` スナップ更新とフレームの競合があれば線が出る。検証: スナップを固定値化。
3. **原因確定**: 二分探索の各段のキャプチャを `output/water-qa/`(QA_LABEL で `seam-bisect-*`)に保存し、原因コミットメッセージ/チケット追記に証拠として残す。

### 段階2: 修正

- 原因に応じて最小修正(例: エッジフェード帯なら帯をフォグ到達域外へ移す・camera.far との不変条件を修正、gridOverlay なら depthTest:true 化 = T-VW-10 の先行実施)。
- **回帰ゲート**: 縦方向に連続する色相外れ値ピクセル列を検出する簡易ディテクタ(`scripts/water-qa-metrics.mjs` への列スキャン追加、または単発スクリプト)を作り、3状態のキャプチャで閾値以下を確認する。

## 受け入れ基準

- clear / rain / storm の `pnpm qa:water` キャプチャ(既定ビュー)に縦シームが存在しないこと(目視+縦線ディテクタ)。
- 修正が他の描画に副作用を出していないこと: waterLuma / toonBandSeparation / hueMean が現行レポート(clear: 162.55 / 7.841 / 177.30)と同水準。
- 原因・再現条件・切り分けログがチケット追記として文書化されていること(将来の描画順変更時の回帰知識)。

## 影響範囲・注意

- 修正が water.frag.glsl / gridOverlay に及ぶ場合、`shader-quality.test.ts:87-103` の uniform 束縛テスト(宣言 uniform とランタイム uniform の集合一致)と 105-145 の renderOrder/transparent 契約に接触し得る。挙動を変えた場合はテストの意図ごと更新する。
- gridOverlay を触る場合は T-VW-10(クリーンアップ)の該当項目を先取りしたことを T-VW-10 に反映し、二重作業を避ける。
- 調査段階のトグルはコミットに残さない(キャプチャのみ成果物)。
