# [T-VW-10] クリーンアップを統合実施する(グリッド/スケール整合/太陽ディスク/量子化/デッドコード)

- 分類: TA
- 優先度: P3
- 評価軸: デッドコード・デッド出力 / モデル一貫性 / 描画正当性
- 依存: T-VW-05(太陽ディスクは uSunDirection 前提。波チャンク整理後に残骸が確定する)、T-VW-09(columnOpacity 削除は T-VW-09 で先行実施済みの想定)。T-VW-03 が gridOverlay を先に触った場合は項目1を差分実施

## 現状(証拠)

いずれも現行 HEAD(`src/rooms/voxel-water/`)で確認済み。

1. **gridOverlay は「グリッド」ではない**: X 軸平行の 63 本のみ(直交線なし)を y=0.03 に置き(runtime.ts:352-379)、depthTest:false / depthWrite:false / renderOrder 5(371-378行)で**柱・spray・雨のすべての上**に描画される。視点によってはスクリーンスペースのアーティファクトに見える(T-VW-03 の容疑者でもある)。
2. **シェーダー内ボクセルスケール3種が物理格子と不一致**: 実インスタンス間隔は VOXEL_SPACING=0.62(runtime.ts:159)だが、フラグメントは (a) セル分散 `floor(vWorldPosition.xz / 0.3)`(water.frag.glsl:107)、(b) storm world grid `gridLine(vWorldPosition.xz * 0.075)` = セル約0.476(118-121行)、(c) UV グリッド 28セル/156unit = 約5.57unit(30-31, 115行)と、**3つの異なる「ボクセル的」スケール**を描く。
3. **太陽が方位のみの縦光帯**: `sunDir = (cos, sin)(uSkyTime*2π)`、`dot(normalize(direction.xz), sunDir)` による sunGlow/sunDisc(sky.frag.glsl:71-76)。垂直方向は広いバンド変調のみで、**ディスクでなく縦の光の筋**として描画される。夕景(warmEdge ピーク)で特に不自然。
4. **toonRamp と柱量子化の不一致**: プレーンは `floor(vWave*uToonSteps)/max(uToonSteps,1.0)`(water.frag.glsl:73-74)で最大 (steps-1)/steps — **1.0 に到達しない**ため低 toonSteps で最上位バンドが系統的に弱い。柱は `Math.round(n*(steps-1))/(steps-1)`(runtime.ts:534)で 1.0 に到達 — 近/遠でバンド定義が異なる。
5. **デッドコード/デッド出力**:
   - `fbm()` が water.frag.glsl:61-70 に定義されているが**未呼び出し**(T-QA-01 完了により文字列ピン留めは解除済みで、削除可能になった)。
   - `vRawWave` は `vWave` の完全重複(water.vert.glsl:53-54 で同値代入)— varying 1本無駄。frag 側の vRawWave 参照は vWave へ置換可能。
   - `scene.background` の計算(runtime.ts:484-486)は depthTest:false の空ドーム(renderOrder 0、258-260行)に毎フレーム完全遮蔽される死んだ視覚出力。
   - カメラ相対スナップ(OCEAN_SNAP_SIZE、runtime.ts:602-611)はカメラ固定のため実質定数の毎フレーム再計算。無害だが誤解を招く(T-VW-03 の調査結果を踏まえ、簡素化 or 不変条件コメント化)。

## 問題

個別には小さいが、(1) 効いていない描画・計算が調整時の誤解とレビューコストを生み、(2) スケール不一致は「ボクセルの海」という様式の一貫性を裏切り、(3) 量子化不一致は toonSteps スライダーの近/遠挙動を分裂させる。第2バッチの主要チケット完了後に残すと負債が固定化する。

## 改善方向

1. **gridOverlay**: 直交線(Z 平行)を追加して実グリッド化した上で、depthTest:true 化と renderOrder の見直し(柱に隠れるべきものは隠す)。T-VW-03 / T-VW-09 の結果次第では「フラグメント側の world grid を 0.62 整数倍に整列させ、LineSegments 自体を廃止」も選択肢(描画物が1つ減る)。採否は見た目比較で判断。
2. **スケール整合**: (a) セル分散 0.3 → 0.62、(b) storm world grid を 0.62 の整数倍セルに(gridLine 入力係数の再計算)、(c) UV グリッドを world-space 化するか 0.62 の整数倍周期に。research-stylized-water.md §2.9(WW 分析)の「線ネットワークは物理ボクセルグリッドの整数倍に揃えると『ボクセルの海』として意味が通る」に従う。
3. **太陽ディスク**: T-VW-05 の uSunDirection(vec3)を用い、`dot(viewDir, sunDir3D)` の角半径ディスク(`smoothstep(cos(r+w), cos(r), sunViewDot)`、r≈0.03-0.05 rad)+広い warm ハロの2段(research-stylized-water.md §2.8、Kelvin van Hoorn 方式)。現行の方位光帯は除去または地平線反射の演出として明示的に再設計(T-VW-04 の水平線設計と整合)。
4. **量子化統一**: プレーンと柱のバンド式をどちらかに揃える(推奨: 柱の `round/(steps-1)`。1.0 到達により最上位バンドが復活し、toonSteps の近/遠挙動が一致)。変更は toonBandSeparation メトリクスで検収。
5. **デッドコード除去**: fbm 削除、vRawWave 統合、scene.background 計算削除(または「意図的に空ドームの背後」というコメントと共に単純化)、スナップ処理の整理。

## 受け入れ基準

- **スケール整合の視覚証拠**: storm キャプチャで world grid のセルが物理カラム格子(0.62)と整列していること(クロップ比較)。
- **太陽**: skyTime 0.18(Shift sky の夕景側)で太陽がディスク+ハロとして読め、縦光帯が消えていること。DirectionalLight・水面スペキュラと方向が一致(T-VW-05 の受け入れを継承)。
- **量子化**: toonSteps=2〜4 の低ステップで、プレーン最上位バンド(shallow/lagoon 域)が出現すること。近/遠境界でバンド段数が一致すること。
- **デッドコード**: `fbm` / `vRawWave` / `scene.background` 代入が水ルームのソースから消えていること(grep で証明)。uniform 束縛テスト(shader-quality.test.ts:87-103)が通過。
- **回帰**: `pnpm test / lint / build / qa:visual / qa:water`(3状態)通過。意図した変更(太陽ディスク・グリッド整列・最上位バンド)以外の視覚差分がないこと。FPS ベースライン維持。

## 影響範囲・注意

- **1項目=1コミット**: 本チケットは統合チケットだが、視覚に触る項目(1-4)とデッドコード(5)は個別コミットに分け、qa:water の差分をコミット単位で検収する。
- **メトリクス感度**: 量子化統一とグリッド整列は toonBandSeparation / voxelLocalContrast を動かす。T-QA-02 のバジェットに反映すること。
- **T-VW-03 との整合**: gridOverlay・UV グリッドがシーム原因だった場合、該当項目は T-VW-03 で先行修正されている。本チケット着手時に残作業を差分確認する。
- **スナップ処理**: 将来カメラナビゲーションを導入する場合に必要になる仕組みのため、削除ではなく「カメラ固定下では定数」というコメント+早期 return 化でも可。判断を完了レポートに記録する。
