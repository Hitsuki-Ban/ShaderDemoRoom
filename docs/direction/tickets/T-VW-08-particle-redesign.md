# [T-VW-08] 雨・スプレーのパーティクルを再設計する(一斉テレポートと剛体円盤の解消)

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
