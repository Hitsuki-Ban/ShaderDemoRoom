# [T-VW-01] 焦点ランドマークを導入する(構図再建)

- 状態: 完了（PR #47、main `90c298a`、Pages deploy・live検証済み、2026-07-22）
- 分類: AD
- 優先度: P1
- 評価軸: 焦点階層 / 構図 / ヒーローショット成立性
- 依存: T-VW-04(4値ヒエラルキーと太陽表現を確定)。T-VW-05 は T-VW-04 の前提として完了済みであること

## 現状(証拠)

- シーングラフに「主役」が存在しない。`src/rooms/voxel-water/runtime.ts` の構成要素は water plane(296-305行)、columns 4096本(307-330行)、gridOverlay(352-379行)、rain/spray Points(381-419行)、cloudDeck 14個のフラットボックス(421-433行)のみで、視線が止まるオブジェクトがない。
- カメラは固定の高所斜めビュー `camera.position.set(5.8, 7.2, 13.8)` / `lookAt(0, -0.08, -5)`(runtime.ts:231-232)。この視点で画面の大半が均質なカラム面になる。
- コンセプトアート `docs/design/primary-showroom-concept.png`(批評 Wow 9/10)は灯台ランドマーク+中景のボクセル岩+砕け泡で「構図された絵」になっている。現ビルドの批評は 4展示中最下位(Clear 2/10)で「主題なき色面」「目は右パネルのスライダーに逃げる」(dossier-voxel-water.md ビジュアル現状評価)。
- `output/water-qa/palette-camera-final-clear-canvas.png` では画面の約80%が単一無変調カラー。storm(`palette-camera-final-storm-canvas.png`)でも視覚的興味は水平線の約15%に圧縮され、空虚な前景が約60%(dossier 同節)。

## 問題

フラッグシップ展示に焦点階層が存在せず、「3秒で視線が止まる主役」テスト(review-framework.md AD軸)に不合格。環境シェーダー単体では被写体が成立せず、公開ヒーローショットも撮れない。コンセプト(9/10)と現状(2/10)の Wow ギャップの最大要因。

## 改善方向

research-exhibition-direction.md §3(weenie=視覚磁石)・§2(値ヒエラルキー/3層構図/観測スポット)を根拠に、**デザイン検討→実装の2段構え**で進める。

### 段階1: デザイン検討(ブロックアウト+値スタディ)

1. 候補は概念画準拠の「灯台+岩礁クラスタ」。垂直シルエット(記念碑性)+点滅灯(動きがドミナントを強化する原則の最安実装)+長いサイトラインという weenie の教科書構成。
2. グレーボックスの InstancedMesh ブロックアウトを中景(現カメラで画面の1/4〜1/3の高さになる位置)に置き、スクリーンショット→グレースケール→4値ポスタライズの値スタディで構図を確定する(research-exhibition-direction.md §2 のプロトコル)。
3. 同時にデフォルトカメラを「観測スポット」として再設計する: 前景(カラム面)20-30% / 中景(ランドマーク)/ 背景(空)の3層。前景60-80%の現比率を反転する。
4. 天候3状態それぞれでの見えを検討する(Storm では灯台光が主光源に反転する等、T-VW-02 の状態差別化と整合させる)。

### 段階2: 実装

- ボクセル灯台+岩は InstancedMesh で draw call 1-2 に収める(research-exhibition-direction.md §3: 「水面より遥かに安い」)。ライトは既存 DirectionalLight+emissive+スプライトグローで賄い、新規リアルタイムライトは追加しない。
- 点滅・回転灯は uniform 駆動(uTime ベース)とし、`motionScale`(RoomRuntimeContext、src/rooms/types.ts:96)で減衰可能にする。
- ブロックアウト→値スタディ→ディテールの順。造形品質がリスクなので、ディテール前に必ず段階1の値スタディ承認を挟む。

## 受け入れ基準

- **3秒テスト**: デフォルトビューの新規スクリーンショットで、視線が最初に止まる要素がランドマークであること(レビュー承認)。
- **サムネイルテスト**: 160px 幅に縮小してもランドマークのシルエットが判別できること。
- **値スタディ**: 4値ポスタライズで空/ランドマーク/水面/暗部アクセントが分離していること(単一値に80%が潰れる現状の解消)。
- **構図比率**: 無情報の前景が画面の30%以下(現状60-80%)。
- **FPS**: 公式計測プロトコル(`docs/design/telemetry-protocol.md`: 5s warm-up + 15s median)による `docs/direction/captures/telemetry-reference-2026-07-18.json` の voxel-water fpsMedian **15.37**(software GL 分類)をベースラインとし、そこから10%を超えて悪化しないこと。※fps-samples-2026-07-18.json(手動8サンプル、16-17 FPS)は別手法の歴史的証拠であり基準値には使わない。
- **3状態検収**: clear/rain/storm すべてでランドマークが破綻しない(Storm の暗部でも読める)こと。

## 影響範囲・注意

- **マジックナンバー網**: カメラ再調整時は WATER_PLANE_SIZE=156 / camera.far=72 / fogFar 58-70 / SKY_RADIUS=62 の依存関係(フォグと空ドームがプレーンのクリップを隠して成立)に注意。far を触る場合は水平線の見えを3状態で再確認。
- **挙動テスト**: `shader-quality.test.ts:206-216` はカメラを「near>0 / far/near<300 / position.y>0」の挙動レンジでしか固定していないため、カメラ微調整は許容されるが、レンジ外に出る変更はテスト意図の再確認を要する。
- **qa:water ベースライン**: ランドマークが水域リージョンに入ると `waterLuma` / `waterCoverage` / `toonBandSeparation` の基準値がシフトする。`scripts/water-qa-metrics.mjs` のリージョン定義とレポート基準値の再較正を完了条件に含める(T-QA-02 のメトリクスバジェットと調整)。
- **新規設定を追加しない**: ランドマークのトグル等を VoxelWaterSettings に足す場合は T-SH-05 の URL スキーマと i18n カタログ整合(T-I18N-01 のパリティテスト)が連動する。初版は設定なし(常時表示)を推奨。
- 灯台の点滅は T-VW-07(稲妻の照明化)と光の語彙を揃えること(同じ emissive パルス経路)。

## 着手時の疑問・決定（2026-07-22、段階1固定）

- 疑問: 本票はカメラを観測スポットとして「再設計」するとしているが、依存先 T-VW-04 は現カメラ `(5.8,7.2,13.8) → (0,-0.08,-5)` から4値ROI、暗台地、静かなwater-mid、太陽探索域を反投影し、PR #45 で固定した。ここで先にカメラを動かすと、ランドマークを評価する前に依存票の契約を無効化する。決定: 現カメラを観測スポットとして確定し、まず幾何で3層構図を作る。人間Gate Aが全候補の画角を明確に否決した場合だけ、カメラ変更と全ROI/太陽契約の再固定を別判断として扱う。
- 疑問: T-VW-04 のcolumn-side ROIが暗い「穴」に見える一方、その暗部面積は4値門を支える。決定: world `(1.4,4.8)` の暗台地を消さず、同じ場所から後左の灯台基台 `xz≈(-0.8,0)` へ連なる一つの前景岩礁として実体化する。`(2.15,4.52)` は `VOXEL_FIELD_YAW=-0.16` の逆変換後のinstance-local座標であり、world座標として再利用しない。右側の静かなwater-mid `(4.7,-6.6)` は負の空間として残し、第二の暗島を置かない。
- 画面上の固定目安は `862x735` canvasで、暗台地 `(314,617)`、灯台中心 `x≈307`、基台頂 `y≈347`、灯頭 `y≈148` とする。灯頭 `y≈5.5`、基台頂 `y≈2.0` を初期値とし、塔身が画面高の25–33%を占める候補だけを残す。
- 段階1は2–3案の**不透明グレーボックス**に限定する。各案は同じ単一連結footprint、同じカメラ、同じ右側負空間を共有し、岬角のscreen占有率・塔身の収束・屋根silhouetteだけを変える。beacon glow、接触泡、weather色、追加ライト、透明beam、ディテールはGate A前に作らない。
- グレーボックス材質は候補の形と4値を照明変動から切り離して比較するため、段階1だけ固定neutral値の不透明unlit材質を使う。これは最終材質のfallbackではない。Gate A後は採用形を既存Ambient/Directional/Fogへ応答する単一opaque `MeshStandardMaterial` に置き換え、未採用候補と段階1材質を残さない。
- 岩礁・塔・屋根は決定論的な純データlayoutを単一SoTとし、`Math.random()`を使わない。静的 `InstancedMesh` 1 draw、512 instance / 約6144 triangles以下を段階1の上限とする。波柱を持ち上げて陸地に見せず、同じfootprintで覆われるcolumn instanceを生成時に除外する。fragment discard、polygon offset、別深度経路は置かない。
- Gate A候補はclear/rain/stormの原色、grayscale、4値、160pxを同じcontact sheetへ並べる。人間判断は「最初に灯台+岬角を読む」「煙突やUI柱に見えない」「左の暗質量が海面を潰さない」「3天候で同じidentity」の4点に限定し、承認前に段階2へ進まない。これは本票に明記された唯一の人間BLOCKである。
- 現 `COLUMN_SIDE_ROI` は候補の岩礁と重なるため、最終実装後も同名で使うと偽のcolumn-side合格になる。Gate A後に旧ROIを `landmarkDarkAnchor` として分離し、landmark外の右前景へ実column-side ROIを再固定する。water luma/toonは岩礁を除外した水面ROI、crest/foamは灯頭/glowを除外した探索域へ再定義する。段階1では既存閾値を緩和せず、候補比較用の別artifactとして測る。
- パフォーマンスは絶対15.37 FPSの異環境比較ではなく、deploy済み T-VW-04 baseline とcandidateを同一SwiftShader sessionでAB/BA 5組計測し、paired speed ratio median `>=0.90` を満たす。段階2の目標draw callsはdefault 19→21、storm 20→22以内とし、実測前に改善を主張しない。

## Gate A 提示（2026-07-22、人間判断 BLOCK）

- 3候補の決定論的layout、単一opaque `InstancedMesh`、同一SDF footprint、covered column生成除外まで実装した。候補は `sheltered=49`、`balanced=50`、`monumental=51` instancesで、いずれも512 budget内。64×64の4096 column中46本を、center-in-SDFまたは回転済み0.62角柱と0.5岩blockのSAT overlapで生成対象から除外し、残る4050本がfootprint/岩blockの双方と交差しないことをテストした。右側water-mid `(4.7,-6.6)` のSDFは `+7.5713` で負の空間を維持する。
- Gate A contact sheet: `docs/direction/captures/t-vw-01-gate-a-contact-sheet.png`、SHA-256 `71cfbb1d946ebefa6f0cb6d7fda7dc3bec2ed2d7092005d4481eae4df021740d`。機械可読の候補・行・列順、共通study revision、各候補のsource/build asset provenanceは `docs/direction/captures/t-vw-01-gate-a-study.json`、SHA-256 `3b483dde1a6eafec33190edb82b7d8417fa46903f898ef7b9c2d3be411f4ceee`。3候補はactive IDだけを正規化した同一study revision `020c07c154065ec5a72676b26f84d62ab37b288d8cf480b48f72dfc23af17dc7` から、各capture直前にfresh buildしている。
- sheetの候補順は上から `sheltered` / `balanced` / `monumental`。各候補内の行順はclear / rain / storm、列順はoriginal / grayscale / four-value / 160px thumbnail。`balanced` をコード上の暫定activeとするが、Gate A承認前の採用決定ではない。
- 実装側の暫定推奨は `balanced`。`sheltered` は岬角が軽い反面、広いslab roofが煙突寄りに読まれやすい。`monumental` はspireで灯台性が強い反面、左暗質量が最も重い。`balanced` は3天候で同じidentityを保ち、岬角の重量と階段roofの識別の中間にある。ただし「3秒で最初にランドマークを読むか」は自動指標で確定しない。
- **人間への疑問（本票のGate A）**: `sheltered` / `balanced` / `monumental` のどれを段階2へ進めるか。判断は「最初に灯台+岬角を読む」「煙突やUI柱に見えない」「左の暗質量が海面を潰さない」「3天候で同じidentity」の4点だけで行う。3案すべてが不合格なら、その旨を記録して段階1を再設計する。選択前にbeacon、接触泡、weather材質、ROI再較正、performance比較へ進まない。
- 既存 `qa:water-value` を最終暫定balancedで再実行すると4件失敗した（rain/storm crest p90、default waterLuma、default-rain separation）。これは旧 `WATER_REGION` が新landmarkを水面として、ridge探索域がlandmark edgeをcrestとして集計し、旧 `COLUMN_SIDE_ROI` も本来のcolumn-sideではなくlandmark暗部へ変わる、着手時に予測済みの意味衝突である。既存閾値は変更していない。Gate A後に採用silhouetteを固定してからlandmark/water/crest ROIを分離し、同じ門を再成立させる。

## Gate A 裁定（2026-07-22、ユーザー決定 — BLOCK解除）

**採用: `balanced`**（コンタクトシート SHA-256 `71cfbb1d…` を実見の上、規定4基準のみで判断）。

- 判断根拠: `sheltered` は広いslab roofが160pxサムネイルで煙突キャップに読まれるリスクが最も高く（基準2に抵触の懸念）、`monumental` は左暗質量が最重でストームの4値表現において海面を最も潰す（基準3に抵触の懸念）。`balanced` は3天候で同一identityを保ちつつ両懸念の中間にあり、実装側暫定推奨とも一致。
- 段階2へ進行可: beacon glow、接触泡、weather材質（固定neutral unlit → Ambient/Directional/Fog応答の単一opaque `MeshStandardMaterial`）、ROI再較正（`landmarkDarkAnchor` 分離・water/crest ROI再定義）、performance AB/BA計測（paired speed ratio median ≥0.90、draw calls default 19→21 / storm 20→22以内）。未採用候補（`sheltered` / `monumental`）と段階1グレーボックス材質はコードから削除する。

## 段階2 実装・Gate B 証拠（2026-07-22）

- 採用形は `balanced` 由来の単一 `LANDMARK_MODEL`（50 instances）へ確定し、候補ID・候補selector・段階1 neutral unlit材質・study runnerを削除した。岩礁/塔/屋根/beaconのroleと色roleを決定論的SoTに持ち、既存46 columnのSAT/SDF除外、右側water-mid負空間、512 instance budgetを維持する。
- 最終材質はAmbient/Directional/Fogへ応答する単一opaque `MeshStandardMaterial`。role別emissive色とbeacon maskをinstance attributeで渡し、weather別beacon色・強度・pulseを同じshader programへ注入する。追加Point/Spot light、透明beam、texture、別billboard drawはない。pulseは水面と同じmotion timeを使い、`motionScale=0`で停止する。
- 水面はlandmark capsule SoTをuniform配列として共有し、SDF近傍だけに接触泡を加える。泡強度は既存 `uFoam` に明示的に従い、`foam=0` で寄与が厳密に0になる。右側の静かなwater-midにはlandmarkを追加していない。
- QA ROIは `scripts/water-roi-contract.mjs` へ一本化した。water inclusionからlandmarkを明示除外し、旧column-sideを `landmarkDarkAnchor` として分離、実column-sideを右前景へ再固定した。crestは強foam maskそのものを除外し、radius 1の8近傍中4px以上が強foamである弱ridge境界だけを採用するため、両maskは構造上相互排他的である。既存luma/area/width/aspect閾値は緩和していない。tower検出は中心の長い低彩度塔身、連続warm beacon core、最大2pxの抗鋸齒遷移後に4行以上連続する暗roof capを一体として測り、bboxは実maskから算出する。無roofの灰柱+暖点と水面短横線はいずれも候補にしない。

### Gate B visual

- 原寸canvas（862×735、順にclear/rain/storm）:
  - `docs/direction/captures/t-vw-01-gate-b-clear.png` — SHA-256 `faca3daf718db6b9dbbb431ab1cae2d735129fa762a653d254cf5f16c1749672`
  - `docs/direction/captures/t-vw-01-gate-b-rain.png` — SHA-256 `55145129fe96c380e0fdac089bb2f46b792d88a36bfe01304cb280b114633987`
  - `docs/direction/captures/t-vw-01-gate-b-storm.png` — SHA-256 `868e94e46a475e96959b5e50cb026d0cfa7b8953072b23b20548cf0bc4c9d670`
- 4値/160px sheet（default/rain/storm/solar）: `docs/direction/captures/t-vw-01-gate-b-value-sheet.png` — SHA-256 `91e4cc66c49d44c525563dc14496c3f6f84753d96b4ac7eb2b7b56f1708323b3`。
- 16 deterministic frames × 4 statesの `qa:water-value` は全門通過。crest median p10はclear/rain/storm/solarで `165.86 / 137.86 / 146.12 / 152.27`、pixel support p10は `2641 / 2384.5 / 1852 / 2414.5`（門: ≥256）、foamとのoverlap maxは全状態 `0`。tower height ratioは全状態 `0.26`、width `0.12–0.14`、160px support `432–462`（門: ≥64）、local contrast p10 `15.60–58.98`（門: ≥12）。clear/rain/solar drawCallsMax `20`、storm `21`。console/page errorは0。
- 3秒テストの機械的前提（画面高25–33%、幅≤14%、160px silhouette、4値分離、3天候同identity）は成立した。最終の「最初に視線が止まる」判断は、上記3原寸captureを使う独立レビューで確定する。

### Performance

- 疑問: 独立透明beacon billboardを維持した最初の候補は21 callsで、5組AB/BAのpaired speed ratio medianが `0.898x` と門 `0.90x` を僅かに下回った。単なる再計測で通すべきか。決定: 再計測で揺らぎを狙わず、billboardを削除してbeacon pulse/color/intensityを既存opaque landmark drawへ統合した。haloは失うが、原寸・4値・160px・storm可読性の全門を再成立させ、T-VW-07と共有できるpulse語彙は維持する。
- 最終product candidate tree `eab20ade99be526c7d06ac10f17850dab19671e8` 対 deploy済みT-VW-04 `d202e7a` を同一SwiftShader process、5s warm-up + 15s measurement、5組交互AB/BAで比較した。paired speed ratio median `0.9467x`（range `0.9172x–0.9671x`）、baseline median `14.1884 FPS`、candidate median `13.4077 FPS`、draw calls `19→20`。門 `≥0.90x` を通過。後続の独立レビュー修正はQA測定器とfixtureだけで、計測済みproduct runtime/shaderは変更していない。
- 機械可読report: `docs/direction/captures/t-vw-01-performance.json` — SHA-256 `08ea6ab12dcc60156815459d249bf02d13ed5ca049a9e50fea271bf568145c14`。

### Regression

- `pnpm test`: 46 files / 450 tests通過（最終beacon統合後の対象testは26/26、water-value metricは19/19通過）。`pnpm lint`、`pnpm typecheck`、`pnpm exhibits:check`、production build通過。
- CI等価browser列の `qa:exhibits` / `qa:orb` / `qa:visual` / `qa:water` / `qa:water-value` / `qa:ninth-tide` / `qa:ninth-tide-near-black` は通過し、`qa:ninth-tide-cycle` / `qa:ninth-tide-hit-target` / `qa:renderer` も通過した。
- 検証時の疑問: 無変更のNinth Tide `qa:ninth-tide-quality` がローカル高速配信時だけ `desktop-dpr-2 renderer memory did not plateau after the first frame` を2回再現した。分岐の `public` / `dist` とdeploy版 `app.js` は同一SHA-256 `6fe0b342…` で、同一scriptのdeploy対照はローカル失敗点を越えて進行したため、VW-01の回帰とは扱わず無関係コードを変更しない。PR CIで独立再判定し、再現時はそのrun evidenceを基に別票化する。

### 独立レビュー

- 初回reviewはcrest/foamの意味的重複と、暗roofを必須にしていないtower detectorを阻断として指摘した。両方を測定器・fixture・64-frame Gateへ反映し、元reviewerの増分再審査と別verifierの増分検証はいずれも阻断なしでPASSした。
- reviewer独立再計算の代表frame crest supportはclear/rain/storm/solarで `2656 / 2489 / 1868 / 2494`、foam overlapは全て `0`。roof gapは `0 / 1 / 2px` を許容し `3px` を拒否することも別probeで確認した。
- 非阻断follow-up: 生産値 `strongerBoundaryMinimumNeighbors=4` は実装・本票・64-frame挙動で一致するが、将来のcontract provenanceをさらに強めるならreport fieldまたは専用unit assertionへ固定できる。本票の受入条件外であり、現実装の合否には影響しない。

### Merge / deploy

- PR #47 は head `a57c92c` の独立APPROVEとGitHub build/production visual QA成功後、squash mergeされ、main `90c298a` となった。main workflow `29930678068` はlint/typecheck/450 tests/build/exhibit sync/全production visual QAを通過し、Pages deploy jobも成功した。
- live `https://hitsuki-ban.github.io/ShaderDemoRoom/` はHTTP 200。配信bundle `index-CeF03xTn.js` のSHA-256 `7e4ced853cc3d138c158241954e912cb26ca725ecceb8d054731a1605462a383` はlocal main buildと一致した。
- liveに対する `pnpm qa:water-value` はdefault/rain/storm/solar各16 frame、合計64 frameで `passed=true` / failures 0。これにより実装、CI artifact、配信物の3点を結び、本票を完了とする。
