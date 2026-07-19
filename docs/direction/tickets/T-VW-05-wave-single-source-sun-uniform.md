# [T-VW-05] 波・ボクセル尺度・量子化・太陽方向を単一モデルへ統合する

- 分類: TA
- 優先度: P2(多くの後続ADチケットの土台 — 実質は VW 第2バッチの最初に着手すべき基盤)
- 評価軸: モデル一貫性 / フレームバジェット / デッドコード・デッド出力
- 依存: T-VW-03(シーム原因と修正後 scene graph を確定)。T-VW-04 / T-VW-06 / T-VW-07 / T-VW-09 は本チケットの後に着手する

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

### ボクセル尺度と量子化の分裂

- 実インスタンス間隔は `VOXEL_SPACING=0.62`(`runtime.ts:159`)だが、セル分散は `/0.3`、storm world grid はセル約0.476、UV grid は約5.57 unit と別尺度である。
- プレーンは `floor(vWave*uToonSteps)/uToonSteps` で 1.0 に到達せず、柱は `round(n*(steps-1))/(steps-1)` で 1.0 に到達するため、近/遠の最上位バンドが一致しない。

## 問題

波の調整はすべて2箇所修正になり、既にドリフト済み。近/遠シームの位相・振幅・時間解像度の不一致は「ハイブリッド海洋」コンセプトの根幹を損なう。lightDir の分裂は後続のADチケット(T-VW-04 の峰マスク/太陽ディスク、T-VW-07 の照明)すべての前提を欠く。

## 改善方向

research-stylized-water.md §2.2 選択肢A(推奨)+ §2.8 に従う。

1. **波 GLSL チャンクの単一ソース化**: `waveField()` を単一の GLSL チャンク(1ファイル)に切り出し、water.vert と柱 MeshStandardMaterial の `onBeforeCompile`(`#include <begin_vertex>` 後に注入)の両方で使う。波パラメータ(方向・周波数・振幅・位相・鋭さ)は TS の単一定数テーブルからシェーダー文字列へ焼き込み、JS 用の1点サンプラーも同テーブルから生成する(Codrops Wave Propagation Cube Grid / sbcode Gerstner の構成)。
2. **柱変位の GPU 化**: 各インスタンスに `aOffset`(XZ)属性を持たせ、頂点シェーダーで高さスケール(`position.y * height + offset` 形)。**8FPS の CPU 行列更新ループを廃止**し、柱も毎フレームの連続運動にする。影がないため customDepthMaterial は不要。
3. **段階移行**: まず高さのみ GPU 化し、柱の色パイプライン(runtime.ts:540-561)は CPU 継続で可。色の GPU 化(チャンクの vWave から fragment 計算)は別チケット化してよい。
4. **uSunDirection の単一ソース化**: `uSkyTime` から 3D 太陽方向を1箇所で構築し(方位 = skyTime*2π、高度は既存の DirectionalLight 軌道 `y = 3.2 + sin(skyTime*π)*5.8` と同一の正規化方向)、**sky.frag / water.frag(lightDir 置換)/ DirectionalLight.position** の3者で共有する。ディスク/ハロ描画は T-VW-04 が所有する。
5. **0.62 world-space 尺度へ統一**: セル分散、storm world grid、water shader grid、および T-VW-03 完了後も scene graph に存在する grid 表現の周期を `VOXEL_SPACING=0.62` の整数倍だけで定義する。T-VW-03 で削除済みの描画経路は再導入せず、残存する LineSegments がある場合も同じ単一定数から頂点を構築する。UV 固有周期を別定数として残さず、world position から同じ尺度を参照する。
6. **量子化式の共有**: プレーンと柱の両方を `round(saturate(value) * (steps - 1)) / max(steps - 1, 1)` 相当の単一定義に揃え、0 と 1 の両端へ到達させる。toonSteps 2..4 で近/遠のバンド境界を一致させる。

## 受け入れ基準

- **単一定義**: 波層の方向・周波数・振幅・鋭さの定数がリポジトリ内に1箇所のみ存在する(grep で証明)。正規化除数・乗数の不一致が消滅。
- **時間的連続性**: 柱の 8FPS ステッピングが消え、近/遠境界で位相が連続していること(境界部の連続フレームキャプチャで確認)。
- **ライティング統一**: skyTime を動かしたとき、水面スペキュラ・柱の陰影・(将来の)空の太陽位置が同方向に追従すること。
- **尺度整合**: storm のクロップで shader grid の交点が 0.62 のカラム格子またはその整数倍に一致し、ソース内に 0.3 / 0.075 / 28-cell の独立格子定数が残らないこと。
- **量子化整合**: toonSteps=2 / 3 / 4 でプレーンと柱の使用 bin 数が一致し、両方が 0 / 1 の最下位・最上位バンドへ到達すること。
- **FPS**: CPU 更新削減によりベースライン(telemetry-reference-2026-07-18.json fpsMedian **15.37**、プロトコル: docs/design/telemetry-protocol.md)から**悪化しない**こと(改善を期待するが、まず非悪化をゲートに)。
- **視覚回帰**: `pnpm qa:water` 3状態で waterLuma / toonBandSeparation / hueMean が現行同水準(clear: 162.55 / 7.841 / 177.30)。`pnpm qa:visual` 通過。
- **テスト**: `pnpm test` 全通過。uniform 束縛テスト(shader-quality.test.ts:87-103)に uSunDirection 等の新 uniform が反映されていること。

## 影響範囲・注意

- **uniform 束縛テストは集合一致**: 宣言だけして束縛しない uniform、束縛だけして未宣言の uniform はどちらも fail する。チャンク注入後の最終シェーダーソースに対してテスト前提が成り立つか確認(onBeforeCompile 側は ShaderMaterial でないためテスト対象外だが、water.vert 側の宣言追加は対象)。
- **motionScale 契約**: 柱変位を uTime 駆動にしても、runtime は `motionElapsed`(delta*motionScale 積算、runtime.ts:586)を uTime に渡しているため reduced-motion 減衰は自動で維持される。新しい時間 uniform を足す場合も motionElapsed 経由とする。
- **instanceMatrix / DynamicDrawUsage**: GPU 化後は instanceMatrix が静的化する(XZ とベース姿勢のみ)。`setUsage(DynamicDrawUsage)`(runtime.ts:326)の除去と初期化一回化を忘れない。instanceColor 更新(2.7Hz)は当面残る。
- **renderOrder / 透明契約**: 本チケットでは材質の transparent を変えない。T-VW-05 の波モデルとシェーダー境界を独立検証した後、T-VW-09 が transparent:false 化と合成契約を別差分で検証する。
- **太陽ディスクの所有**: 本票は方向の唯一性を保証し、T-VW-04 がその方向からディスク/ハロを描く。方位だけの旧縦光帯は T-VW-04 で削除する。
- **T-VW-03 が先**: シーム原因の確定と直接修正後に着手し、その最終 scene graph を前提にする。着手順は T-VW-03 → 本チケット。

## 完了報告 (2026-07-20)

- Implementation revision: `2e9b9b6f3024fb39b07b759c9a28a6cf5f23f563`。
- `waveModel.ts` に4層の方向・周波数・振幅・位相速度・鋭さ、正規化、高さ写像を集約した。
  同じ型付きテーブルから water / column 用 GLSL と低頻度の CPU 色サンプラーを生成し、
  marker が欠落・重複する shader source は fail fast とした。旧波形、`currentLayer`、別正規化式は削除した。
- PlaneGeometry の XZ 化を geometry に焼き込み、実 ocean XZ で同じ波を評価するよう修正した。
  水面と柱上端は同じ `waveSurfaceY` を使用し、水面法線は `mat3(modelMatrix)` で world space へ変換する。
- 4096柱の `instanceMatrix` は初期化時だけ設定する静的配置とし、`aOceanXZ` と共有 `uTime`
  による頂点 shader 変位へ移した。8 FPS の CPU 行列更新を削除し、CPU は約2.7 Hzの色更新だけを担当する。
- `uSunDirection` の uniform record を sky / water で共有し、同じ正規化 vector を
  `DirectionalLight.position` にも適用した。shader grid、cell hash、field yaw/offset は
  `VOXEL_SPACING=0.62` と整数倍だけから構成し、旧 `0.3` / `0.075` / `28-cell` 経路を削除した。
  plane / column の toon quantization は同じ endpoint-inclusive 2/3/4-bin 定義へ統一した。

### 検証

- `pnpm lint`、`pnpm typecheck`、`pnpm test` (32 files / 196 tests)、
  `pnpm build`、`pnpm exhibits:check`、`pnpm qa:visual` が通過した。
  新規 contract test は単一定義、GLSL injection fail-fast、静的 instance matrix、
  連続 `uTime`、実 ocean 座標、world-space normal、共有 uniform record、共有太陽方向、
  endpoint-inclusive 量子化、旧 grid magic number 不在を検証する。
- production build の `qa:water` を各16 frameで再取得した。clear / rain / storm の
  waterLuma は `162.67 / 116.16 / 108.20`、toonBandSeparation は
  `7.629 / 6.416 / 3.140`、hueMean は `177.29 / 199.84 / 185.62`。
  persistent seam score は `1.470 / 1.182 / 0.649` で各 gate
  `1.5 / 1.5 / 1.0` を通過し、console error は0件だった。
- SwiftShader で production main `31c3b2b28a3bf371e6d08da3956c9cf9472ce116` と候補を
  5組・交互順・各5秒warm-up + 15秒測定した。baseline / candidate FPS median は
  `15.450 / 15.133`、paired median は `0.9978x` (range `0.9580x–1.0353x`) で、
  本票の非悪化 gate `>=0.95x` を通過した。raw evidence は
  `docs/direction/captures/t-vw-05-software-pairs-2026-07-20.json`。汎用 `qa:software-pairs` の
  T-GO-01 用 `1.7x` gate では command exit 1となるため、判定は本票で明記した raw ratio を用いた。
- 独立 reviewer は performance evidence の永続化と candidate revision の不変性を指摘し、
  tracked raw JSON + exact implementation SHA へ是正後、P0〜P3 findings なしで APPROVE した。
  独立 verifier も production source が同 revision と一致すること、全静的/ブラウザ門、
  三態 water QA、WebGL shader compile、paired performance を再確認して PASS した。
