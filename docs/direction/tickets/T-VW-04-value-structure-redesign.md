# [T-VW-04] 値構造を再設計する(ニアモノトーン圧縮の解消)

- 分類: AD
- 優先度: P2
- 評価軸: 値構造 / サムネイルテスト
- 依存: T-VW-05 の後が効率的(SoT 式の峰マスク×太陽方向ブレンドは uSunDirection と近/遠共通の波値を前提とするため)。T-VW-01 の値スタディと同一手法を共有

## 現状(証拠)

- **Clear/Rain が数段の明度に圧縮**: `output/water-qa/pages-clear-final-canvas.png` は「clear なのにバリュー構造が逆転: 近景の水が最も暗く濁り、遠景バンドが光る」(dossier-voxel-water.md ビジュアル現状評価、4/10)。`palette-camera-final-clear-canvas.png` は約80%が単一無変調カラー。
- 柱カラーパイプライン(`src/rooms/voxel-water/runtime.ts:540-561`)は low 0x8efff0 → high 0xdffff1 → foam 0xfffff6 → columnTopTint 0xf4ffd9 → edgeMist 0xc8f5ee と**明るいパステルへの lerp を多段に重ね**、最後に `multiplyScalar(columnBrightness 1.16 + depthFade*0.3 + edgeFade*0.14 + ...)`(559行)で全体をさらに持ち上げる — 暗部のアンカーが stormShadow(0x073f49、storm 時のみ実質発動、546行)しかない。
- ライティングも平坦化に加担: Clear の ambientBase 1.58 + clarity*0.28 + skyTime*0.14(runtime.ts:477)で環境光が支配し、DirectionalLight の陰影(カラム側面)がほぼ読めない。
- 遠景プレーンの shallow(0.34,0.92,0.96)/ lagoon(0.42,1.0,0.84)バンド(water.frag.glsl:80-81, 90-92)は「遠近収束も水面への落ち込みもなく垂直に光る壁」に見える(dossier 同節)。水平線色 horizonWaterColor も `vec3(0.5,0.88,0.9)` 方向(219行)で高明度に張り付く。
- QA実測: clear の waterLuma 162-172 に対し toonBandSeparation 7.9、voxelLocalContrast 1.835(T-SH-01 完了レポート)— バンドは分離しているが**バリューレンジの床が高すぎる**。コンセプトアートは「ほぼ黒の崖から白い泡までのフルバリューレンジ」(dossier コンセプト節)。

## 問題

明度設計に階調がなく、水面/空/主役が分離しない(review-framework.md AD軸「値構造」の代表的不合格例)。縮小サムネイルでは単色の板になり、T-VW-01 のランドマークを置いても背景が受け止められない。

## 改善方向

research-stylized-water.md §2.5(SoT: 「深水色⇔サブサーフェス色を、視線角×太陽方向×ウェーブピークマスクでブレンド — 峰で水色自体が明るく透ける」)と §2.9(WW/Townscaper の教訓)を軸に、「白を足す」から「暗をアンカーし峰だけ透かす」へ転換する。

1. **4値ヒエラルキーの規定**(値スタディ先行): (1) 空=最明、(2) クレスト/泡=水面内の最明アクセント、(3) 水面ミッド、(4) カラム側面の波影=最暗。各値の面積配分を先に決め、パレット調整はその枠内で行う。
2. **峰の透けの導入**: 既存 `vSlope` / `vWave` に uSunDirection(T-VW-05)を組み合わせたピークマスクで `mid→shallow` の持ち上げを**峰に限定**し、面全体への shallow/lagoon ブレンド(water.frag.glsl:91-92, 97)を絞る。
3. **暗部アンカー**: カラムの multiplyScalar 底上げ(runtime.ts:559)と ambientBase を下げ、DirectionalLight 由来の側面陰影を復活させる。トラフ(谷)の deep を実際に暗くする(deep パレット water.frag.glsl:78 の下限を掘る)。
4. **水平線とクレストの分離**: 遠景バンドは「垂直に光る壁」でなく、(a) 距離に応じた収束(バンド幅の遠近圧縮)、(b) 水面への落ち込み(反射帯としての垂直グラデーション)を持たせる。Storm では減衰(T-VW-02 と整合)。
5. **Clear は静けさで設計**: Townscaper の教訓(research-stylized-water.md §2.9)どおり、Clear は盛らず「主役(T-VW-01)を引き立てるネガティブスペース」として値を整える。
6. **太陽をディスクとして値設計へ統合**: T-VW-05 の `uSunDirection` を用い、`dot(viewDir, sunDir3D)` の角半径ディスク(半径 **0.04 rad**、エッジ幅 **0.008 rad**)と広い warm halo の2項に置換する。現行の方位だけの縦光帯は削除する。ディスク、DirectionalLight、水面スペキュラは同じ方向を読む。

## 受け入れ基準

- **実装前固定ゲート**: 以下の閾値を実装開始後に緩和しない。変更が必要なら実装とは別のレビューで根拠と新値を先に承認する。
- **4値ポスタライズ検証**: 1440×900 の3状態キャプチャを luma 境界 **64 / 128 / 192** で4値化し、各状態で4 bin がそれぞれ画面の **5%以上**を占めること。意味領域の中央値は column side `<64`、water mid `64..127`、crest `128..191`、sky/foam accent `>=192` とする。
- **逆転解消**: Clear で「近景が最暗・遠景バンドが最明」の逆転がないこと(近景ミッド、クレスト最明)。
- **メトリクス**: clear `voxelLocalContrast >= 3.0`、clear `toonBandSeparation >= 7.5`、rain `toonBandSeparation >= 6.3`、clear `waterLuma` は **125..155**、`clear-rain >= 35` / `rain-storm >= 30` の waterLuma 差を満たすこと。
- **太陽形状**: skyTime 0.18 の 1440×900 キャプチャで太陽の connected component が aspect ratio **0.80..1.25**、circularity **>=0.75**、直径 **18..80 px** を満たすこと。太陽中心を通る垂直列の高輝度連続長が直径の **1.5倍以下**で、縦光帯が残っていないこと。
- **3状態同時検収** + サムネイルテスト(T-VW-02 の判定手順を流用)。

## 影響範囲・注意

- **WEATHER_LOOKS / 柱ランプ定数の変更が主戦場**: `shader-quality.test.ts:67-85` の構造テストは値変更に耐える(挙動ベース化済み)が、qa:water のベースライン(waterLuma 等)は必ず再較正し、T-QA-02 のメトリクスバジェットへ反映する。
- **0.55x 内部解像度**(renderPolicy.ts:10)前提で検証すること — 高解像度で成立する微妙な階調はバッキングストアで潰れる。
- ambientBase / sunBase の変更は柱 emissiveIntensity(runtime.ts:498-499)との合算で効くため、露出系は一括で動かして3状態を再検収する。
- T-VW-06(クロスフェード)導入後は、値構造の中間状態(遷移中)も破綻しないか1往復確認する。
