# [T-VW-05] 波モデルを単一ソース化し太陽方向 uniform を共有する

- 分類: TA
- 優先度: P2(多くの後続ADチケットの土台 — 実質は VW 第2バッチの最初に着手すべき基盤)
- 評価軸: モデル一貫性 / フレームバジェット / デッドコード・デッド出力
- 依存: なし(T-QA-01 完了済みで文字列ピン留めは解除済み)。T-VW-04 / T-VW-06 / T-VW-07 は本チケットの後が効率的。T-VW-09 と同時実施を推奨

## 現状(証拠)

### 波モデルの二重実装ドリフト(現行 HEAD で確認済み)

`water.vert.glsl` の `waveField()`(32-43行)と `runtime.ts` の `updateColumns`(506-570行)が同じ4層波を別実装しており、以下が食い違う:

| 項目 | GLSL(プレーン) | JS(柱) |
|---|---|---|
| 正規化除数 | `max(1.0, 1.02 + uSwell*0.54)`(vert:40) | `Math.max(1, 1.04 + swell*0.56)`(runtime.ts:526) |
| waveHeight 乗数 | `(0.72 + uSwell*0.34)`(vert:52) | `(0.7 + swell*0.22)`(runtime.ts:529) |
| 方向の正規化 | `normalize(direction)`(vert:25) | なし — 生ベクトル内積(runtime.ts:521-524)。\|dir\| は 0.9964〜1.0013 で、周波数換算 最大約0.36% の位相ドリフトが原点から離れるほど蓄積 |
| currentLayer 項 | なし | あり(runtime.ts:520, 525)— 柱のみ潮流でリフト |
| 高さマッピング | 符号付き `(n*2-1)*uWaveHeight`(vert:51-52) | 符号なし `0.2 + max(0.08, n*waveHeight*...)`(runtime.ts:529) |

(chopShape は JS `1.2 + chop*2.6` ≡ GLSL `mix(1.2, 3.8, uChop)` で一致しており、ドリフト項ではない。)

### 更新レートの時間的不一致

- 柱ジオメトリは 8 FPS ケイデンス(COLUMN_GEOMETRY_FPS=8、runtime.ts:164, 618-626)、色は3回に1回(約2.7Hz)。プレーンは毎フレーム変位 — 近/遠境界で柱がステップし周囲の水は流れる。
- 4096 インスタンス × 最大8Hz の CPU 行列/色更新が現行ベースライン(telemetry-reference-2026-07-18.json fpsMedian 15.37)の主要 CPU 負荷候補。

### ライティングの分裂

- 水フラグメントの lightDir はハードコード `normalize(vec3(-0.35, 0.82, 0.44))`(water.frag.glsl:177)。
- 一方 DirectionalLight は skyTime で軌道し(runtime.ts:479-483, 612-616)、Lambert の柱だけが太陽を追う。
- 空の太陽は方位角のみの縦光帯(sky.frag.glsl:71-76)。3者(空・水スペキュラ・柱陰影)が同じ光源を向いていない。

## 問題

波の調整はすべて2箇所修正になり、既にドリフト済み。近/遠シームの位相・振幅・時間解像度の不一致は「ハイブリッド海洋」コンセプトの根幹を損なう。lightDir の分裂は後続のADチケット(T-VW-04 の峰マスク、T-VW-07 の照明、T-VW-10 の太陽ディスク)すべての前提を欠く。

## 改善方向

research-stylized-water.md §2.2 選択肢A(推奨)+ §2.8 に従う。

1. **波 GLSL チャンクの単一ソース化**: `waveField()` を単一の GLSL チャンク(1ファイル)に切り出し、water.vert と柱 MeshStandardMaterial の `onBeforeCompile`(`#include <begin_vertex>` 後に注入)の両方で使う。波パラメータ(方向・周波数・振幅・位相・鋭さ)は TS の単一定数テーブルからシェーダー文字列へ焼き込み、JS 用の1点サンプラーも同テーブルから生成する(Codrops Wave Propagation Cube Grid / sbcode Gerstner の構成)。
2. **柱変位の GPU 化**: 各インスタンスに `aOffset`(XZ)属性を持たせ、頂点シェーダーで高さスケール(`position.y * height + offset` 形)。**8FPS の CPU 行列更新ループを廃止**し、柱も毎フレームの連続運動にする。影がないため customDepthMaterial は不要。
3. **段階移行**: まず高さのみ GPU 化し、柱の色パイプライン(runtime.ts:540-561)は CPU 継続で可。色の GPU 化(チャンクの vWave から fragment 計算)は別チケット化してよい。
4. **uSunDirection の単一ソース化**: `uSkyTime` から 3D 太陽方向を1箇所で構築し(方位 = skyTime*2π、高度は既存の DirectionalLight 軌道 `y = 3.2 + sin(skyTime*π)*5.8` と同一の正規化方向)、**sky.frag / water.frag(lightDir 置換)/ DirectionalLight.position** の3者で共有する。ディスク描画自体は T-VW-10。

## 受け入れ基準

- **単一定義**: 波層の方向・周波数・振幅・鋭さの定数がリポジトリ内に1箇所のみ存在する(grep で証明)。正規化除数・乗数の不一致が消滅。
- **時間的連続性**: 柱の 8FPS ステッピングが消え、近/遠境界で位相が連続していること(境界部の連続フレームキャプチャで確認)。
- **ライティング統一**: skyTime を動かしたとき、水面スペキュラ・柱の陰影・(将来の)空の太陽位置が同方向に追従すること。
- **FPS**: CPU 更新削減によりベースライン(telemetry-reference-2026-07-18.json fpsMedian **15.37**、プロトコル: docs/design/telemetry-protocol.md)から**悪化しない**こと(改善を期待するが、まず非悪化をゲートに)。
- **視覚回帰**: `pnpm qa:water` 3状態で waterLuma / toonBandSeparation / hueMean が現行同水準(clear: 162.55 / 7.841 / 177.30)。`pnpm qa:visual` 通過。
- **テスト**: `pnpm test` 全通過。uniform 束縛テスト(shader-quality.test.ts:87-103)に uSunDirection 等の新 uniform が反映されていること。

## 影響範囲・注意

- **uniform 束縛テストは集合一致**: 宣言だけして束縛しない uniform、束縛だけして未宣言の uniform はどちらも fail する。チャンク注入後の最終シェーダーソースに対してテスト前提が成り立つか確認(onBeforeCompile 側は ShaderMaterial でないためテスト対象外だが、water.vert 側の宣言追加は対象)。
- **motionScale 契約**: 柱変位を uTime 駆動にしても、runtime は `motionElapsed`(delta*motionScale 積算、runtime.ts:586)を uTime に渡しているため reduced-motion 減衰は自動で維持される。新しい時間 uniform を足す場合も motionElapsed 経由とする。
- **instanceMatrix / DynamicDrawUsage**: GPU 化後は instanceMatrix が静的化する(XZ とベース姿勢のみ)。`setUsage(DynamicDrawUsage)`(runtime.ts:326)の除去と初期化一回化を忘れない。instanceColor 更新(2.7Hz)は当面残る。
- **renderOrder / 透明契約**: 本チケット単独では材質の transparent を変えない。柱の transparent:false 化は T-VW-09 で同時に行うと onBeforeCompile 移行と一度のシェーダー再コンパイル検証で済む(research-stylized-water.md §3 実装時の注意)。
- **T-VW-03 が先**: シーム原因の確定前に波モデルを差し替えると切り分け不能になる。着手順は T-VW-03 → 本チケット。
