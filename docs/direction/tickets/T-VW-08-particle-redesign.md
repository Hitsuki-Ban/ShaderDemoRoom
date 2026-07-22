# [T-VW-08] 雨・スプレーのパーティクルを再設計する(一斉テレポートと剛体円盤の解消)

- 状態: 実装・検証完了（PR #49 draft / CI待ち、product `3acfed9c9bd805757a42255875d7591838338921`、2026-07-23）
- 分類: AD / TA
- 優先度: P2
- 評価軸: モーション言語 / フレームバジェット / リソースライフサイクル
- 依存: なし(T-VW-02 の実装手段として先行推奨。T-VW-05 と同じ onBeforeCompile / ShaderMaterial 作法を共有するため同バッチ実施が効率的)

## 現状(証拠)

- **雨は単一剛体ブロック**: 420粒の Points(`src/rooms/voxel-water/runtime.ts:381-399`)を `rain.position.y -= delta * motionScale * (5 + wind*1.8)` で丸ごと降下させ、`y < -4` で **y=1.5 へ一括テレポート**(627-630行)。デフォルト wind 0.82 で約0.85秒ごとに**全粒が同時にポップ**する。
- **スプレーは剛体円盤**: 220粒の Points(401-419行)を `spray.rotation.y += delta * ...` で円盤ごと回転+ `spray.position.y` ボブ(631-632行)。粒に個別の寿命・軌道がなく、リム部が機械的に回る。批評では「白い斑点はスプレーでなくドット欠陥/星に見える」(dossier-voxel-water.md、pages-storm-final-canvas.png)。
- 両者とも `PointsMaterial`(389-395, 409-415行)のため頂点シェーダーに介入できず、per-particle の位相・速度・フェードを持てない。
- review-framework.md AD軸「モーション言語」の代表的不合格例(「雨420粒の一斉テレポート」)。

## 問題

粒子の動きが「素材の性格」(雨=個別に落ち続ける、飛沫=波から生まれて散る)を語らず、剛体ジオメトリの機械的な移動として読める。一斉ポップは周期的な全画面ノイズでもあり、Rain/Storm の説得力(T-VW-02)の土台を欠く。CPU 毎フレームの position/rotation 更新も無駄。

## 改善方向

research-stylized-water.md §2.7(Cyanilux Rain Effects Breakdown / GPU パーティクル一般論)に従う。

1. **雨の頂点シェーダー個別リサイクル**: ジオメトリに `aSeed`(0..1 乱数)と `aSpeed`(0.7..1.7 リマップ)属性を追加し、頂点シェーダーで
   `float cycle = fract(uTime * uFallSpeed * aSpeed / SPAN + aSeed); pos.y = mix(TOP, BOTTOM, cycle);`
   とする。CPU 側の `rain.position.y` 更新と一括テレポート(627-630行)を削除。JS の毎フレームコストはゼロになる。
   - 再出現直後のポップは cycle からのフェードイン(値を10倍→saturate→one-minus)で隠す(Cyanilux の作法)。
   - 着水間際の `gl_PointSize` 縮小 / alpha フェードも cycle から導出。
   - PointsMaterial のままでは頂点シェーダーを書けないため **ShaderMaterial 化(または onBeforeCompile)**。420頂点なので移行は小さい。
2. **雨条化(T-VW-02 連携)**: ドットでなく「落下ストリーク」として読める形状へ。第一候補は Stretched Billboard 相当の細長 quad の InstancedMesh(1 draw call)、低コスト代替はポイント+縦グラデーションテクスチャ。採否は T-VW-02 のサムネイルテストで判定。
3. **スプレーの個別位相化**: 円盤の剛体回転を廃し、per-particle の `aSeed` による発生位相・上昇/落下アーク(簡易重力)・サイズ/アルファのライフサイクルを頂点シェーダーで与える。「波から生まれて散る」読みを作り、白ドット感を解消する(発生域は波のクレスト付近に寄せる — T-VW-05 の波チャンクを頂点シェーダーで参照できれば波高連動が安価に足せる)。
4. **天候連動**: 粒数・opacity・ストリーク長・落下角(風で斜行)は WEATHER_LOOKS / settings から uniform で駆動し、T-VW-06 の blendedLook 補間に乗せる。

## 受け入れ基準

- **一斉ポップ消滅**: 連続フレーム差分で約0.85秒周期の全画面スパイクが消えること(qa:water の diffs 配列で周期スパイクがないこと)。
- **雨条の可読性**: rain プリセット(`voxel-water-weather-rain` testid)の静止キャプチャで雨条が判別できること(T-VW-02 の受け入れと共通)。
- **スプレーの読み**: storm キャプチャでスプレーが「飛沫」として読め、ドット欠陥批評が解消していること(レビュー承認+キャプチャ保存)。
- **CPU 更新ゼロ**: render ループ内の rain/spray の per-frame position/rotation 変更コードが削除されていること。
- **FPS**: ベースライン(telemetry-reference-2026-07-18.json fpsMedian **15.37**、プロトコル: docs/design/telemetry-protocol.md)から悪化しないこと(CPU 削減ぶん改善余地あり)。
- **reduced-motion**: `pnpm qa:motion` 通過。uTime は motionElapsed(delta*motionScale 積算)経由なので落下・回転が自動減速することを確認。

## 影響範囲・注意

- **オブジェクト名とテスト契約**: `shader-quality.test.ts:105-145` は 'voxel-water-rain' / 'voxel-water-spray' を名前で検索し、renderOrder 順序(columns < spray < rain < grid)と transparent / depthWrite:false を検証する。名前は維持し、材質差し替え後も契約が成立することを確認(ShaderMaterial 化しても transparent:true / depthWrite:false は維持)。Points → InstancedMesh へ変える場合は 118-125 行の instanceof Points ガードの更新が必要。
- **決定論**: 雨レイアウトのシードテスト(shader-quality.test.ts:173-204、createSeededRandom による再現性)を壊さない — aSeed/aSpeed も seeded random から生成する。
- **0.55x 解像度でのストリーク**: 1px 級の細線は内部解像度で消える。ストリーク幅・輝度は 0.55x 実機キャプチャで判定すること(T-VW-02 と同じ注意)。
- rain.visible / spray.visible のブール切替(runtime.ts:469-471)は T-VW-06 で opacity 閾値化される予定 — 本チケットでは現行ロジックを維持してよい。

## 完了報告 (2026-07-23)

- Product revision: `3acfed9c9bd805757a42255875d7591838338921`。
- 雨とスプレーを、それぞれ1つの `InstancedMesh + ShaderMaterial` に置換した。最終構成は
  rain 200 instance / spray 96 instance、各1 draw、追加 texture 0。旧 `Points` / `PointsMaterial`
  と render loop の `rain.position` / `spray.position` / `spray.rotation` 更新は削除した。
- 固定 seed から rain / spray 共通の `aSeed`、`aSpeed`、`aScale` と、spray 固有の
  `aLaunch`、`aVelocity` を初期化する。雨は per-instance の `fract` cycle で連続落下し、
  風による斜行と出生・消滅 fade を持つ。スプレーは個別位相の初速・重力による放物線と
  teardrop mask を持ち、剛体円盤の回転を廃止した。
- 両 material は既存 `waveUniforms.uTime` record を共有するため、`motionScale=0` では
  粒子も正確に停止する。drawing-buffer の `width * pixelRatio` / `height * pixelRatio` を
  `uResolution` に渡し、0.55x 内部解像度でも雨条幅を1.25px以上に保つ。
- `transparent:true`、`depthTest:true`、`depthWrite:false`、spray `renderOrder=3`、
  rain `renderOrder=4`、既存 object name を維持した。GPU displacement 用に
  `frustumCulled=false` とし、Three r184 の fog / tone mapping / color-space pipeline と
  unique resource の exact-once dispose を接続した。
- performance harness `pnpm qa:water-particle-performance` は Storm topology を正確に
  21 calls へ固定し、console error / pageerror、SwiftShader renderer、full source revision を
  raw report に記録する。最終 raw には candidate / baseline の full SHA を明示した。
  0.90 の暫定門は、票面の「悪化しない」と T-VW-05 の先例に合わせて
  `paired median >= 0.95` へ是正した。

### 検証

- `pnpm exec vitest run src/rooms/voxel-water/shader-quality.test.ts`: 24/24。
  `pnpm test`: 46 files / 455 tests。`pnpm lint`、`pnpm typecheck`、`pnpm build`、
  `git diff --check` はすべて通過した。
- `pnpm qa:motion`: normal `meanDelta=20.137` / `strongRatio=0.25398`、reduced
  `5.533 / 0.05600`、比率 `0.275 / 0.220` で通過した。browser error は0件。
- 最終 Rain 20-frame capture は `meanDelta=37.395`、range `35.977..39.358`、
  `max/mean=1.052`。約0.85秒周期の全粒子 spike はなく、0.55x capture でも雨条を判別できる。
  最終 Storm は `meanDelta=38.080`、range `35.411..45.207`。高い終端差分は既存 lightning
  window と一致し、スプレーは疎な個別 teardrop / 放物線として読める。seam score は
  Rain `0.667 <= 1.5`、Storm `0 <= 1.0`、browser error は両方0件。
- performance は accepted main
  `2b4dc0a9a706608cf6fdf4e47ba6ba47186176d3` と product revision を、同一 SwiftShader、
  1440x900、5秒 warm-up + 15秒 measurement、AB/BA交互順で2回×5 pair測定した。
  run 1 median `0.9769585253x`、run 2 `0.9637960888x`、結合10 pair median
  `0.9679712101x`（range `0.9175247640x..0.9964340529x`）で `>=0.95x` を通過した。
  全20 page sample は正確に21 calls、browser error 0件だった。
- 調整中の `171395232061573417f4190bbcc1177eb7a404bd` は、2 run結合 median
  `0.9497848287x` で門を厳密に下回ったため失敗 raw を保持した。`dbe580e` の測定は
  shell timeout 後の orphan process と次 run が重複したため全結果を無効化し、採用していない。
  PASS run の選別や丸めによる通過は行っていない。
- 独立 verifier は全静的・browser・motion・visual・performance 証拠を再実行して PASS。
  独立 reviewer は最終 product revision と最終0.55x画像を確認し、阻断なしで APPROVE した。

### 証拠

- Final performance raw:
  `docs/direction/captures/t-vw-08-performance-run-1.json`
  (`865b05a3893643f17297c5c73c765bd8aa6eb3ba787e3fbba29e61745c9f77eb`) と
  `t-vw-08-performance-run-2.json`
  (`863d0ab67f88a964b3da90d7900c2dce973ce6297b252e4688e6a68f47a11bf7`)。
- Combined summary:
  `docs/direction/captures/t-vw-08-performance-summary.json`
  (`c33db410cac6c335bdb3b8695d7df3797cbe82bc9a94187667a063dbb144e531`)。
- Final Rain PNG / report:
  `docs/direction/captures/t-vw-08-rain-final.png`
  (`b6b72167cb098d0ea49fb129aed33939bd1bcf77d50a34f3e62d088b5a10e3a1`) / JSON
  (`f180f2bf7b9cd7c70e2651d7cb49ead2abf6d448a8b118c3ba57185f1480c6b0`)。
- Final Storm PNG / report:
  `docs/direction/captures/t-vw-08-storm-final.png`
  (`525298d05a39eba7d9dcf348fcdf38ce7541f5082f3be82d6a7a7523cc5a97c2`) / JSON
  (`7b0580f7de97da85b4c5ac2a629b97fead3171d03a359db930c7f25ba4fed191`)。
- 変更前の専用 capture は Rain のみ存在し、Storm の同条件 before capture はない。
  このため Storm の before/after 数値差は主張せず、最終20-frame evidence、shader/runtime 契約、
  独立 reviewer の motion read で本票の受け入れを判定した。
