# [T-AO-03] sculpt 時FPSをプロファイル実測し、実測に基づいて最適化する

- 分類: TA
- 優先度: P2
- 評価軸: フレームバジェット
- 依存: なし(T-SH-03 の FPS 計測プロトコル v1 と T-EMB-02 の bridge stats を計測手段として利用)

## 現状(証拠)

- 実測の症状: スタンドアロン 1440×900 でも sculpt 中 22 FPS まで低下(visual-refs.json、`v2-sculpt-hold.png` の FRAME 表示)。showroom 同居ではさらに予算が厳しい。
- **規模訂正(2026-07-18 監査)**: `IcosahedronGeometry(1.65, 5)`(main.js:922)は **720 tris/シェル(非インデックス約 2,160 頂点)**。当初の「≒20k tris」は約28倍の過大見積りで、「頂点コストが主犯」の断定は撤回済み(research-npr-liquid.md §2.8、README 修正履歴)。
- 現行 `ref/mizu-kokoro-2-source/src/main.js` のコスト構造(行番号は現行 HEAD):
  - **フルシーン2回描画**: `renderRefractionBuffer()`(main.js:2580-2590)で orbGroup 以外の全シーンを `refractionTarget` へ描画後、`composer.render()`(main.js:2682-2683)で本描画。
  - **ポストチェーン**: RenderPass → UnrealBloomPass → FinalGradeShader → SMAAPass(LOW では無効)→ OutputPass。
  - **`preserveDrawingBuffer: true`**(main.js:180)が常時有効。ただし CAPTURE ボタンは toBlob 直前に明示的に再レンダしている(main.js:2290-2306)ため、同期レンダ→toBlob の流れなら preserveDrawingBuffer なしでも成立する可能性が高い(要検証)。
  - **頂点側**: 法線の有限差分再構築が liquid 頂点シェーダ(eps 評価 main.js:528-530)と outline 頂点シェーダ(main.js:713-734、`deformPosition` 呼び出し ×3 = :720, :727, :728)の両方で走り、頂点あたり毎フレーム6回の変位場フル評価。ただし総量は約 4,320 頂点 × 6 で、絶対量は小さい。
  - 品質ノブ: pixelRatio 上限 1.5/1.25/1.0(main.js:2269)、屈折バッファスケール 0.82/0.66/0.5(main.js:2316)、SMAA/影の LOW 無効(main.js:2272-2273)。
- 計測チャネル: bridge stats(`fps` / `frameTimeMs`、500ms サンプリング、main.js:2685-2696)が T-EMB-02 で実装済み。shell 側 telemetry からも読める。

## 問題

22 FPS の主犯が未特定のまま最適化すると、当初の「20k tris」誤認のように誤った標的へ工数を投じ、最悪アート(法線品質・輪郭線)を毀損して性能が戻らない。有力仮説はフルシーン2回描画+bloom/SMAA+preserveDrawingBuffer のフィルレート側だが、これも**実測されていない**。

## 改善方向

**プロファイル第一**。順序を固定する:

1. **第一手(実測不要・無条件に安価)**: outline シェルの法線再構築廃止(research-npr-liquid.md §2.8-1)。反転ハルは法線方向へ 0.046 押すだけなので、`baseNormal`(+必要なら大域変位の粗い勾配)での押し出しに置換し、±eps の `deformPosition` 2回評価(main.js:727-728)を削る。頂点あたり評価 6→4回。視覚差はシルエット比較で検収。
2. **プロファイル実測**: 同一ハードウェアで sculpt 保持状態(自動化する場合は synthetic pointer で drag 維持)を対象に:
   - Spector.js または Chrome tracing でフレーム内訳(屈折パス / メイン / bloom / SMAA / grade)を取得。
   - **パス無効化マトリクス**: 一時ビルドで SMAA off / bloom off / preserveDrawingBuffer false / 屈折バッファスケール sweep(0.82→0.5→0.33)/ pixelRatio sweep を1変数ずつ切り替え、bridge stats(500ms サンプル)で frameTimeMs を記録。
   - 計測は T-SH-03 のプロトコル v1 に従う(5s warm-up + 15s measurement、環境・renderer raw string 併記。環境を跨いだ比較や hard gate は行わない)。
   - 結果は `docs/direction/captures/orb-profile-<date>.json`(+要約 md)として保存。
3. **実測に従った処置**(候補、上から可能性が高い順):
   - `preserveDrawingBuffer: false` 化 + CAPTURE の同期再レンダ維持(main.js:2290-2306 は既にその形。全ブラウザで toBlob が空にならないことを確認)。
   - sculpt 中の一時的な屈折バッファスケール降格 or 屈折パスのフレームスキップ(1/2 レート更新)。ヒステリシス付きで復帰。
   - bloom 解像度 / SMAA の動的降格(既存 quality 系のノブを流用)。
   - 頂点側が支配的と判明した場合のみ: 解析的微分化(§2.8-2)。GPGPU ベイク(§2.8-3)は最後の手段。
4. LOW 品質規約(本体変形・表面フロー場・結晶化シルエットは削らない — ref README)を全処置で維持する。

## 受け入れ基準

- プロファイル成果物(パス別内訳+無効化マトリクスの frameTimeMs 表、環境併記)が captures/ にコミットされ、ボトルネックの結論が本票に追記されている。
- outline 法線再構築廃止後、4相 × freeze × sculpt のスクリーンショット比較で輪郭線の視覚回帰なし(太さ・途切れ・ジッタ)。
- 同一ハードウェアのペア計測で、sculpt 保持中の median frameTimeMs が処置前より改善している(目標: sculpt 時 30 FPS 以上/1440×900・実GPU。ただし環境依存のため hard gate ではなく計測記録で判断)。
- アイドル時(非 sculpt)の FPS・見た目に回帰がない。CAPTURE(PNG保存)が全処置後も機能する。
- LOW/MID/HIGH の品質規約(削ってよいもの・削ってはいけないもの)が維持されている。

## 影響範囲・注意

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。プロファイル用の一時ビルドは絶対にコミットしない。
- `preserveDrawingBuffer` 変更は WebGL コンテキスト属性の変更 = 全ブラウザ実機確認が必要(特に Safari の toBlob タイミング)。
- シェーダ変更は 4相すべての見た目に影響しうる。検収は 4相 × freeze の全状態スクリーンショット比較で行う(review-framework 横断注意3の精神)。
- bridge stats のスキーマ(fps/frameTimeMs/frameCount/paused)には触れない。qa:exhibits が envelope を hard assert している。
- FPS 数値を資料に書くときは必ず環境を併記する(README「要確認事項」の規約)。
