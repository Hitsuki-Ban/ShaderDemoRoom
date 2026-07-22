# [T-VW-04] 値構造を再設計する(ニアモノトーン圧縮の解消)

- 状態: 実装・固定ゲート・独立審査完了（PR作成待ち、2026-07-22）
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

## 着手時の疑問・決定 (2026-07-22、実装前固定)

### 実装中に判明した非ブロッキング事項

- 疑問: 泡の意味領域を明るくするため、column fragment が diffuseColor の明るさだけを見て頂面を発光させる案を試したが、storm の最高値 bin を約16%まで広げても foam median は約184に留まり、water mid の p10/p90 も契約外へ広がった。これは実波峰ではなく既に明るい面を循環的に増幅するためで、採用しない。vertex 側の共有 wave SoT から `vColumnWave` を渡し、実波峰かつ頂面だけを foam accent にする。画面マスク、debug mode、別波関数、diffuse 値 fallback は置かない。
- 疑問: 暗部を掘った後、既存 `qa:water` の seam path が storm 前景で `(688,529)→(664,689)` の透視斜率に沿って上昇した。経路は幾何の継ぎ目ではなく装飾 grid overlay と一致し、暗い column side に対する細い高コントラスト線へ変質していた。4値構造を壊す装飾線なので、geometry や seam 閾値を変えず、grid opacity を全天候で低い補助線へ下げる。QA 契約は維持する。
- 最終 `qa:water` では clear の高コントラスト波紋に対し、各フレームで別々の最良経路を選んだ後にその最大値を median 化する実装が `persistent seam 1.667` を報告した。grid overlay の opacity=0 A/B でも同値かつ経路だけ移動し、T-VW-03 の既存原因排除とも一致した。さらに検出器は1px幾何裂缝を探すのに左右±5pxを比較しており、4–8px幅の意図した toon band の両側を同時参照していた。同じ誤検出経路は±5で1.667、±2で0.667、1px合成 seam は±2でも50超だった。`measurePersistentVerticalSeam` を同一候補経路の8フレーム score の median 最大化へ修正し、thin-line probe を±2へ絞る。毎フレーム異なる位置の線と5px幅の値帯を persistent seam と数えない fixture を追加する。scan、continuity percentile、上限1.5/1.0、grid/水面/column描画は維持する。
- 疑問: column fragment の反復調整が HMR 後の画像へほぼ反映されない局面を追跡すると、`customProgramCacheKey` が共有 wave GLSL だけを含み、vertex/fragment builder 自体の変更を表現していなかった。Three.js program cache が初回 shader を再利用できるため、開発時の捕獲が古い GPU program を測る可能性があった。cache key を両 builder の実ソースから決定し、shader builder の変更時は必ず再コンパイルされるようにする。固定 QA 値や production fallback は追加しない。
- 疑問: 同一 shader と fresh context でも 16フレーム集約値が閾値を跨いだ。loader 消失までに RAF が不定回数進み、`ActiveFrameClock` の delta clamp と約2.67 FPS の column color 更新がスクリーンショット列の開始相位を変えていた。壁時計 sleep の延長や製品側 `qaTime` / step hook は採用しない。Playwright Clock を navigation 前に固定 epoch で install/pause し、warm-up 1200ms と各120ms間隔を `runFor` で進める。これは製品の実 RAF / delta / animation path を通しつつ、PNG 取得中だけ時刻を進めない test-driver 制御であり、「16フレーム×120ms」「製品側 QA 専用時刻なし」の固定契約を維持する。artifact には epoch と1320..3120msの16時刻を記録する。
- 疑問: 固定 Playwright Clock 導入後も、列色の低頻度更新が `elapsed - lastUpdate >= 0.375` という初回 RAF 相位依存の条件を使っていたため、同じ source/build の連続実行で交互フレームの hash が変わり、default の最暗 bin が `5.018%` と `4.990%` を跨いだ。門を通すため暗部を増やすのでなく、製品の列色更新を `motionElapsed` の固定 2.667 FPS bucket へ量子化し、bucket 起点時刻で波色を評価する。低頻度性能契約は維持し、QA hook / retry / golden hash gate は追加しない。修正後は fresh context 2回の64 frame hash と report SHA-256 が完全一致した。
- 独立再検証では、上記の2回とは別に default の偶数8フレームだけ hash が変わり、他56フレームは一致した。値・shape 門は両方通過したが、これは固定ゲートの再現性契約を満たさないため阻断とした。`100ms` の wall-time readback settle を各 sample に加える診断でも default/rain の偶数フレームだけが変わり、GPU完了待ちでは解消しなかったため撤回した。ロック済み Playwright 1.60 の injected clock source を確認すると RAF は厳密に `16 - ticks % 16` で予定され、`1200ms` warm-up に `120ms` 間隔を足す契約は sample を `8ms / 0ms` の RAF 相位へ交互に置いていた。実際、16ms整点の奇数フレームは全実行・全状態で一致していた。名目上の120ms分布は維持し、各名目時刻を直後のRAFへ切り上げる。実取得は `1328, 1440, 1568, 1680, ... 3120ms`、間隔は128/112ms交互となり、report に名目列・実列・`playwrightClockRafMs=16` を明記する。全間隔を128msにする診断は分布を後ろへずらして default 最暗面積を `4.715%` にしたため採用しない。
- 疑問: navigation 前に時刻を pause すると Playwright の通常 click が待つ actionability RAF も停止し、遅延ロードの control button をテスト状態注入に使えない。門禁は control interaction ではなく最終描画状態を検証するため、rain と storm は正式な v3 URL state（storm は preset 全フィールド）で初期化する。DOM click、製品側 test hook、暗黙の既定値 fallback は使わない。
- 独立審査で、column 頂面を water plane より `0.08` 下げ、water material に polygon offset を加えた初期案は、T-VW-05 の `waveSurfaceY` 単一 SoT と T-VW-09 の透明合成境界を分岐させると判定した。両方を削除し、water/column は同じ `waveSurfaceY(normalizedWave)` をそのまま使う。z-fighting を隠す別深度経路は置かない。
- 同じ審査で、column crest/foam emission が側面にも微量に残る初期式を却下した。emissive の全項を `voxelTopFace` でゲートし、側面は diffuse/lighting だけで値を作る。program cache key も builder の `toString()` ではなく、実際に canonical shader template へ注入した vertex/fragment 出力の安定 hash 2本から構成し、挙動入力の変更で key が変わることをテストする。
- Playwright Clock の仮想 warm-up 直後に GPU readback が未完了の白フレームを3枚観測した。製品時刻や animation phase を追加で進めず、clock を pause したまま固定 `1000ms` の wall-time render settle を置く。これは assertion timeout 延長や retry ではなく、同一仮想時刻の compositor 完了待ちであり、report に `renderSettleMs` を記録する。
- foam の初期測定は threshold 15 の全構造 ridge を中央値へ入れ、白帽だけでなく暗い toon step の上縁まで「foam」と数えていた。qualifying component を先に選び、その内部だけ `Y' >=176` へ後置 filtering する案を試したが、暗い大 component 内の孤立1px亮点でも形態条件を迂回でき、元の不合格を直接合格へ変えるため独立審査で却下した。測定は実装前に固定した全 foam ridge candidate の morphology / median / total-pixels 契約へ戻し、shader 側で候補自体を白帽値へ上げる。`valueFoamRidge` を含む全 foam mask は `uFoam` を読み、全 mask 統合後に weather / foreground suppression を一度だけ適用する。
- 疑問: 最終 source を fresh build して既存 `qa:water` を再実行すると、default だけが `(758,205)→(719,689)` の同一路線で seam `2.667 > 1.5` を再現した。column 非表示で `0.333`、grid overlay 非表示で `2.5`、列数64→80で同一路線 `2.667`、water plane 分割72→252で悪化、column size 1.015倍と shader grid-ridge 無効化では不変だった。したがって外周、water triangulation、overlay 単独、instance gap、foam grid のいずれでもなく、ほぼ画面垂直へ投影された列境界が暗側面上で一条の裂け目に見える構図問題と判断した。列を隠したり detector の `-0.15..0` scan / 1.5・1.0閾値を変えず、field yaw を `-0.045→-0.16 rad` として格子を明確な透視斜線へ戻す。最終 seam は default `0.167`、rain `0`、storm `0` となり、列・grid・暗側面はすべて描画したまま維持した。

### 方向性とパレット

3案の参照スタディを比較した。写実的な黒曜石群島案はランドマーク依存が強く T-VW-01 の責務を先取りし、等高線ストーム案は暗部と幾何情報が過密になるため採用しない。4値をそのまま面積設計へ写せる **Graphic Tide Atlas** 案を採用する。既存のボクセル形状と UI/タイポグラフィは変更せず、狭いミント色の峰、濃紺の段丘、水面内の明確な4値、一つの暖色円盤を署名要素とする。追加モーションは導入しない。

出力色の目標値は raw shader 定数ではなく、現行 QA と同じ encoded Rec.709 Y' で評価する。

| 役割 | 目標色 | Y' |
| --- | --- | ---: |
| abyss | `#071B34` | 24.6 |
| column ink | `#123A52` | 51.2 |
| water mid | `#2B727B` | 99.6 |
| crest mint | `#86CDB0` | 187.8 |
| sky / foam | `#EDF2D9` | 239.1 |
| sun ivory | `#FFD89B` | 219.9 |

### 太陽方向の矛盾と解消

疑問: カメラ `(5.8, 7.2, 13.8)` / lookAt `(0, -0.08, -5)` / FOV 45° の可視仰角は概算 `-42.9°..+2.1°` だが、現行 `SUN_ORBIT` の最低仰角は `atan(3.2 / 5) = 32.6°` である。さらに `skyTime=0.18` の方位はカメラ背面を向く。したがって「同一の3D太陽方向」「skyTime=0.18」「18..80 px の可視円盤」は sky shader だけの変更では同時成立しない。

決定: T-VW-01 が所有するカメラ構図は変更せず、唯一の SoT である `SUN_ORBIT` を修正する。独立した画面座標の偽太陽や方向 fallback は作らない。方位を `(skyTime + 0.51) * 2π`、`baseHeight=-3.25`、`radius=5`、`heightAmplitude=5.8` とし、`skyTime=0.18` では方向を概ね `(-0.368, -0.028, -0.929)` とする。初回実機計測で `baseHeight=-3.1` は外周 feather が探索域上端へ接したため、同じ軌道の低角度を約0.03 rad下げ、円盤全体を測定域内へ収めた。太陽は低角度の時刻だけ可視になり、正午に上昇する一つの軌道として扱う。

`0.04 rad` は外側の角半径、`0.008 rad` は内向き feather と定義する (`inner=0.032`, `outer=0.04`)。halo は別の広い項とし、円盤・DirectionalLight・水面スペキュラはすべて同じ `uSunDirection` を読む。

初回16フレームでは既存 presentation drift `0.018` が低い太陽を水平方向へ約60px移動させ、後半フレームで円盤ではなく水平線を最大 component として選ばせた。署名要素を安定した一つの円盤に保つため drift 振幅を `0.003` に縮小する。QA 専用停止や別時計は導入せず、製品側の緩やかな軌道運動は維持する。

### 実装前に固定する QA 契約

- 新しい独立ゲートを `qa:water-value` とし、既存 `qa:water` の seam / motion 契約は維持する。WebGL QA との並列実行はしない。
- viewport `1440x900`、DPR 1、locale `en`、reduced motion 無効、`.canvas-shell` CSS `862x735`、backing store `474x404` を固定する。loader 消失、canvas 可視、寸法一致、console error 0 を前提条件とする。
- default / rain / storm / `#/room/voxel-water?v=3&skyTime=0.18` の各状態を新しい context で取得する。1200 ms warm-up 後に名目120 ms間隔の16フレームを測定し、各名目時刻は Playwright Clock の直後の16ms RAF境界へ揃える。製品の実アニメーションを止める QA 専用時刻・step・debug render mode は追加しない。
- フレーム集約は water luma=median、toon/contrast=10th percentile、4値各 bin=10th percentile。意味領域は column side=各フレーム median の p90 `<64`、water mid=p10 `>=64` かつ p90 `<=127`、crest=p10 `>=128` かつ p90 `<=191`、foam=p10 `>=192` とする。
- 4値は CSS canvas 全域の encoded Rec.709 Y' を `[0,64) / [64,128) / [128,192) / [192,256)` に分類し、各状態・各 bin の p10 面積を `>=5%` とする。
- 固定 ROI (CSS 正規化): column side `(0.275,0.750)..(0.426,0.830)`、water mid `(0.650,0.422)..(0.835,0.531)`。crest/foam 探索域 `(0.093,0.204)..(0.905,0.680)`。ridgeDelta は上下7px平均との差とし、crest は threshold 5 / area 24 / width 12 / aspect 1.3、foam は threshold 15 / area 12 / width 8 / aspect 1.2 / total pixels 256 を最低値とする。
- 太陽探索域は `(0.05,0.02)..(0.95,0.30)`。行中央値に対して `luma>=180`、`R-rowMedianR>=12`、`(R-B)-(rowMedianR-rowMedianB)>=10` を候補とし、最大 connected component を選ぶ。area `>=100`、bbox 18..80 px、aspect `0.80..1.25`、circularity `>=0.75`、area/convex-hull area `>=0.78`、縦の高輝度連続長 / 等価直径 `<=1.5`。円/楕円/縦帯/halo/欠損 component の合成 fixture で測定器自体をテストする。
- 各状態の water luma median に最も近い代表フレームを area-average で `160x136` に縮小し、`[0,85,170,255]` に posterize する。4値各 `>=3%`、gray p05 `<64`、p95 `>=192`、縮小後の意味マスク `>=8 px` をサムネイル契約とする。
- baseline は default `[0,0,94.06,5.94]`、calm `[0,1.28,95.98,2.74]`、rain `[0,93.94,6.06,0]`、storm `[0.47,99.49,0.03,0]` で全状態が4値面積契約を満たさない。clear / rain / storm の water luma は概ね `158.2 / 114.9 / 103.6`、rain-storm 差は約11で不合格。fixture と baseline identity は shader 編集前に記録するが、変動する framebuffer SHA は golden gate にしない。

以上に人間判断を要する BLOCK はない。実装中に新しい非阻害疑問が出た場合も、この節へ判断根拠とともに追記する。

実装中の疑問: face-value を一律に上げると clear water luma は145まで届く一方、固定 column / water ROI も約132 / 148へ上がり、再び粉彩板へ戻った。逆に全側面を落とすと暗部が画面の約25%を占め、water luma が100前後で止まる。固定 ROI をカメラから世界平面へ反投影すると、column-side は概ね `(x=1.4,z=4.8)` の前景台地、water-mid は `(x=4.7,z=-6.6)` の中景水面に対応する。

決定: 画面座標マスクや QA 分岐は作らず、世界空間に (1) 前景の暗い台地アンカー、(2) 中景の静かな water-mid 領域を置く。柱は頂面だけの crest/foam emission と diffuse/lighting だけの側面値を分け、暗台地は既存 ocean coordinate 上の半径7.5の連続 falloff、水面中値は `vWorldPosition.xz` 上の半径2..7の連続 falloff とする。field yaw 修正後も最暗 bin に安定した面積を与えつつ clear-rain 分離を保つため、Clear/Rain の column brightness は `0.84 / 0.18` とした。整列前の診断で最暗面積の余裕不足が見えたため、5%契約は変えず、Clear の実外観輝度だけを `0.85` から約1.2%下げた。両アンカーとも実波形・天候・透明合成を通り、カメラや viewport に追従する screen-space patch ではない。

### 参照した一次資料

- Rare, *The Technical Art of Sea of Thieves*: 視線角・太陽方向・波峰マスクによる水色ブレンドと、泡を別項として扱う構造。
- Crest Water Appearance: subsurface / directional specular / foam を別 material group として設計する実例。
- GPU Gems, Chapter 1: 遠距離で高周波ディテールを収束させる根拠。
- Three.js Lights manual: AmbientLight の全方向加算と DirectionalLight による面方向差。
- ITU-R BT.709: 本ゲートで維持する encoded Rec.709 Y' の基準。
- NASA, Exploring Angular Diameter: 物理太陽との比較上、0.04 rad は写実値ではなく意図的なアート値であること。

## 実装・検証結果（2026-07-22）

### 実装

- Graphic Tide Atlas の4値構造へ再設計した。water fragment は深水、water mid、峰透色、whitecap を別応答として合成し、天候ごとに暗部アンカーと foam の面積を制御する。column は共有 wave SoT の実波峰を頂面 accent に使い、face normal と世界座標の連続 falloff で前景台地・中景水面・側面陰影を分離した。画面座標マスク、別波関数、debug render、QA 専用 product hook は追加していない。
- Clear/Rain/Storm の column emission と ambient/directional balance を再配分し、Clear の粉彩全面発光、Rain/Storm の値域接近、遠景の垂直発光壁を解消した。shader builder の実ソースを program cache key に含め、HMR 中も変更済み vertex/fragment が古い GPU program に置換されないようにした。
- 太陽は `SUN_ORBIT` の単一3D方向から outer radius `0.04 rad` / inner feather `0.008 rad` の warm disc と halo を生成する。sky、DirectionalLight、水面 specular は同じ方向を読み、`skyTime=0.18` で一つの円盤として可視になる。presentation drift は円盤の署名を壊さない `0.003` に縮小した。
- 新設 `qa:water-value` は navigation 前に Playwright Clock を固定し、4状態を fresh context、16フレーム、名目1320..3120msを直後の16ms RAFへ揃えた1328..3120msの同一仮想時刻列で取得する。4値面積、意味領域、thumbnail、太陽 geometry、water separation を固定閾値で検査し、PNG/hash/report/contact sheet を artifact 化して Pages workflow に直列追加した。
- 既存 seam gate は閾値を変更せず、同一候補経路の8フレーム median と±2px thin-line probe へ測定意味を訂正した。毎フレーム別位置の線、5px幅の意図した値帯、1px seam の合成 fixture で誤検知除去と感度維持を固定した。
- 列色の約2.667 FPS更新は `motionElapsed` の固定 bucket 起点で評価し、初回 RAF の発生相位に依存しない。field yaw は `-0.16 rad` とし、暗側面を一条の垂直接縫に見せず、明確な透視格子として読む構図へ戻した。

### 固定ゲートの結果

| 状態 | column side p90 | water mid p10..p90 | crest p10..p90 | foam p10 | water luma |
| --- | ---: | ---: | ---: | ---: | ---: |
| default | 42.54 | 118.94..122.53 | 181.39..185.53 | 202.75 | 128.02 |
| rain | 18.88 | 82.77..85.09 | 183.35..188.24 | 197.82 | 92.65 |
| storm | 29.34 | 65.19..73.77 | 180.29..188.86 | 192.39 | 53.35 |
| solar | 38.65 | 84.58..85.58 | 179.60..186.90 | 197.12 | 104.35 |

- default/rain/storm/solar は4値各 bin の p10 `>=5%`、160×136 thumbnail の各 bin `>=3%` と全意味マスクを通過した。default の最暗 bin は `5.028%`、default-rain は `35.37`、rain-storm は `39.29` の water-luma 差を持つ。
- 太陽は width p10/p90 `73/73px`、height `76/77px`、aspect p10/p90 `0.948/0.961`、circularity p10 `0.972`、solidity p10 `0.977`、vertical-run ratio p90 `1.030` で固定形状門を通過した。
- 同一 production build で RAF整列後の `qa:water-value` を連続2回実行し、4状態×16フレームの64 SHA-256 と report SHA-256 `35B7FE1408B8332E2A2C7A6AFA511C1C60C5F997C25FD9871DC0CEB24785A9AF` が一致した。console error は全状態0、report `passed=true`。
- 独立 verifier も fresh process で同じ門を連続2回実行し、64フレームの差分0、同一 report SHA-256、全契約通過を再現した。さらに `qa:water` 三状態（seam default `0.167`、rain `0`、storm `0`）、44 files / 422 tests、lint、typecheck、build、foam=0/1 production probe を独立確認した。reviewer は RAF整列がロック済み Playwright 実装に一致し、閾値・ROI・製品経路を変えないこと、Clear `0.84` が Graphic Tide Atlas の暗部設計を維持することを確認し APPROVE とした。
- 既存 `qa:water` は default seam `0.167 <= 1.5`、rain `0 <= 1.5`、storm `0 <= 1.0` で通過し、motion/toon/contrast/coverage も維持した。`qa:visual` は14 captures、URL/i18n、mobile overflow/HUD overlap、console error 0 で通過した。
- 固定時刻の production probe で ridge 探索域の `Y' >=192` pixel は `foam=0` の `10,615 (4.25%)` から `foam=1` の `58,662 (23.47%)` へ5.5倍増え、whitecap が foam control に実質応答し、0で残る空/水面由来高輝度だけを誤って消していないことを確認した。
- 静的/単体門は `pnpm lint`、`pnpm typecheck`、`pnpm test`（44 files / 422 tests）、`pnpm build`、`pnpm exhibits:check`、`git diff --check` を通過した。

### 検収中に分離した工单

`qa:exhibits` が2回、Ninth Tide の独立 `#audio` locator で timeout した一方、同 URL の12回定向 probe と後続の完全実行は通過し、製品 DOM 回帰は再現しなかった。長時間 gate が最終 JSON まで段階を出力しないため診断不能であることを独立問題として [T-QA-03](T-QA-03-exhibit-smoke-observability.md) に起票した。T-VW-04 の shader delta へ混ぜず、T-QA-03 は PR #44 で独立審査・完全 CI 後に先行 merge 済みである。
