# [T-VW-07] 稲妻を「照明」にする(色被せからの脱却)

- 分類: AD
- 優先度: P2
- 評価軸: ストーリーテリング / モーション言語 / 描画正当性(ライティングの読みの統一)
- 依存: T-VW-04(Storm の値構造を確定) / T-VW-06(blendedLook と lightningIntensity の遷移を確定)。ボルトメッシュは T-VW-01 の造形語彙に合わせる

## 現状(証拠)

- lightningPulse は `weatherLook.lightningIntensity * pow(max(0, sin(...)), 10)` の nested-sine エンベロープ(`src/rooms/voxel-water/runtime.ts:590-593`)で、**水と空のティントにしか配線されていない**: 水は `lightningRim = uLightningPulse * (0.2 + fresnel*1.8) * ... * uWeatherLightningTint`(water.frag.glsl:190-191)、空は `uLightningPulse * uWeatherLightningTint * (0.18 + cloudBand*0.46)`(sky.frag.glsl:77)。
- **柱・シーンライトは一切フラッシュしない**: AmbientLight / DirectionalLight の intensity(runtime.ts:477-478)と columnMaterial.emissiveIntensity(498-499行)に lightningPulse は乗っていない。dossier-voxel-water.md リスク#4「storm の雷は『色のウォッシュ』にしか見えない」。
- ボルト(稲妻の形状)は存在しない。フラッシュのみ。
- 参考記録: storm QA round 09 で maxDelta 114.0(docs/voxel-ocean-qa-log.md:13)— 雷パルスは既にフレーム差分として観測される規模だが、視覚上は「空と水が一瞬明るい色になる」に留まる。

## 問題

雷は Storm 状態の最大の見せ場候補なのに、シーン内のオブジェクト(柱=画面の主面積)が照らされないため「照明イベント」として成立していない。Storm の「暗いだけで読みにくい」問題(T-VW-02/04)を救う最も安い光源を放置している。

## 改善方向

research-stylized-water.md §2.4(Sea of Thieves SIGGRAPH 2018 の方式)に従い、段階導入する。

以下の数値ゲートを実装前の固定仕様とし、調整中に緩和しない。変更が必要な場合は実装差分とは別にレビューし、根拠と新値を先に承認する。

### 段階1: 照明連動(配線のみ・即効)

- パルス時に (a) `ambient.intensity += lightningPulse * k1`、(b) `columnMaterial.emissiveIntensity += lightningPulse * k2` を加算する。柱は toneMapped:false(runtime.ts:314)なので **renderer.toneMappingExposure ではなく emissive/ambient 経由が正しい**(§2.4 の指摘どおり。かつ T-SH-02 の契約上、room runtime は renderer グローバル状態を所有しない — exposure パルスは禁じ手)。
- 空・水の既存ティント経路は維持。3系統(空・水・柱)が同じ lightningPulse を読むことで「世界が一瞬照らされる」読みになる。
- k1/k2 は、下記の柱 luma 上昇・非発火差分・clipping 閾値を同時に満たす値へ調整する。

### 段階2: ボルトメッシュ(ベイク済み分岐稲妻)

- SoT 方式の静的化: ビルド時に分岐点列を決定論的に生成し、画面解像度と WebGL line width に依存しない細長 quad ストリップのボルトを 1〜2 本用意する。`aDistanceAlongBolt` / `aIsMainBranch` を頂点属性に焼き、フラグメントで `step(uStrikeProgress, aDistance)` により先端へ伸ばし、lightningPulse 減衰で消灯する。LineSegments、空ドームへのフラッシュ描き込み、実行時ランダム生成は採用しない。
- 発火タイミングは現行エンベロープを流用し、ボルト表示 → 全体照明パルス → 減衰、の順序で1ストライクを構成する。

## 受け入れ基準

- **柱が光る**: storm の固定カメラ/固定時刻で、柱リージョン平均 luma が非発火フレーム比 **15%以上**かつ **+12 luma 以上**上昇すること。柱リージョンの RGB いずれかが 255 のピクセル比は **1%以下**とする。
- **renderer グローバル不可侵**: toneMapping / toneMappingExposure 等に触れていないこと(T-SH-02 の runtime session snapshot/restore テストが通過し続けること)。
- **非発火時の同一性**: pulse=0 の clear / rain / storm で柱リージョン平均 luma と全画面 SSIM が基線比それぞれ **±1 luma** / **>=0.995**であること。
- **ストライクの読み**(段階2): ボルト可視開始から全体照明ピークまで **50..200ms**、ピーク後 **650ms以内**に pulse が最大値の5%未満へ戻ることを fake-clock test と連続キャプチャで固定する。
- **FPS**: ボルトメッシュは数百頂点で計測誤差内。ベースライン(telemetry-reference-2026-07-18.json fpsMedian **15.37**)維持。

## 影響範囲・注意

- **QA メトリクスの想定内スパイク**: 雷パルスは frame-diff の maxDelta / strongRatio を押し上げる(round 09 の 114.0 が前例)。T-QA-02 のメトリクスアサート導入時に「storm は雷スパイクを許容するバジェット」を明記し、誤検知でゲートを割らないこと。
- **T-VW-06 経由の強度**: lightningIntensity は blendedLook 補間後の値だけを読み、Storm 進入中も同じ2秒遷移へ従う。WEATHER_LOOKS の直接読み出し経路は追加しない。
- **motionScale**: パルスは motionElapsed 由来(runtime.ts:590-593)なので reduced-motion で自動減速する。ボルトの uStrikeProgress も同じ時間源を使うこと。
- **emissiveIntensity の恒常項と衝突しない**: 498-499行の恒常式に加算する形にし、updateUniforms の再入(設定変更)でパルス項が焼き込まれないよう、恒常値とパルス値を分離した変数管理にする。
