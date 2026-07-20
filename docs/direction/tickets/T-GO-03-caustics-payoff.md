# [T-GO-03] コースティクスのペイオフを強化する(強度カーブ再設計と屈折終点との因果強調)

- 分類: AD
- 優先度: P1
- 評価軸: 焦点階層 / 値構造 / ストーリーテリング
- 依存: T-GO-02(床との相対輝度を確定)、T-GO-04(物理着地点と固定トポロジー光路を確定)。両票の完了後に着手する

## 現状(証拠)

- **強度カーブが alpha クランプでピーク平坦化**: `src/rooms/glass-optics/caustics.frag.glsl:20` — `gl_FragColor.a = caustic * 0.82 * uIntensity`。有効時 `uIntensity = 1.25`(`runtime.ts:374`)なので alpha 最大 ≈ 1.025 となり 1.0 でクランプ、**最も明るいはずのピーク付近の階調が失われて平坦に飽和**する。RGB 側も `color * caustic * uIntensity * 1.25`(`caustics.frag.glsl:19`)で実効 ~1.56 倍の一律ゲインであり、「ピークを立てる」設計になっていない。
- **パターンが物理と接続しない同心円ノイズ**: `caustics.frag.glsl:11-16` — `rings = sin(radius * (38.0 - uSpread*12.0) - uTime*1.8)` + `spokes = sin(angle*6.0 + ...)` + `streaks` の合成を `smoothstep(0.48, 1.0, …)` → `pow(caustic, 0.82)`。球レンズの集束(中心の焦点ホットスポット + カスプ)ではなく「リング + スポーク」の装飾模様に見える(research-glass-optics.md §2.4 の課題認識)。
- **批評の直接評価**: visual-current 批評(dossier-glass-optics.md)は「コースティクスが薄すぎてペイオフ不足 — 屈折の『ご褒美』として感じられない」とし、「ダークな反射する床とより強いコースティクスのホットスポット」を +2 ポイントの最有力施策に挙げている。
- **屈折終点との因果が弱い**: 板の中心は屈折ビーム 2 点の中点(`runtime.ts:113-117`)、スケールは `0.78 + beamSpread*0.58 + (ior-1)*0.16`(`runtime.ts:118`)で追従はしているが、パターンの輝点が**ビーム着地マーカー(refractionMarker、`runtime.ts:362`)の位置と一致しない**ため、「ビームがここに集まったから光る」という読みが成立しない。
- **グリッドとの輝度競合**: 床上でシアンのグリッド中心線(opacity 0.28)がコースティクスと同帯域の明るさで拮抗する(dossier リスク 13。抑制自体は T-GO-02 所掌)。

## 問題

コースティクスは「光がガラスで曲がった結果」を観客に払い戻す本展示唯一のペイオフ演出だが、ピークが飽和で潰れ、パターンが物理の形をしておらず、ビーム終点との空間的因果も曖昧なため、報酬として機能していない。焦点階層の頂点になるべき要素が背景装飾に沈んでいる。

## 改善方向

research-glass-optics.md §2.4(a)「現行シェーダを物理経路に接続する」を、T-GO-04 の物理着地点を唯一の入力として実施する。

1. **強度カーブの再設計**: alpha は設計上 1.0 未満に収め(例: alpha 予算 ≤ 0.9)、「強さ」は alpha ゲインではなく**空間分布の集中**で表現する。エネルギー保存の考え方で、ピーク(焦点)に輝度を集めて裾を落とす: `smoothstep(0.48, 1.0)` の閾値と `pow(0.82)` を、中心ホットスポット項(半径ベースのガウシアン/急峻な falloff)+ 外周波紋項(現行 rings の減衰版)の 2 項構成に置き換える。調査訂正: `toneMapped = false` はトーンマッピングを迂回するだけで、既定の unsigned-byte WebGL 出力先は固定小数点範囲へクランプされ、additive 合成も飽和し得る([three.js Material](https://threejs.org/docs/pages/Material.html)、[WebGL 1.0 §2.1](https://registry.khronos.org/webgl/specs/latest/1.0/))。したがって 1.0 超を HDR 余裕として扱わず、RGB/alpha の出力余裕と ON/OFF キャプチャの channel clip を同時に検証する。
2. **屈折終点との因果強調**: ホットスポットの中心を T-GO-04 が返す**物理的な床着地点**に一致させる。refractionMarker(r=0.07)とホットスポットを重ね、「ビーム → 着地 → 発光」の因果を 1 本の線で読ませる。床へ到達しない経路では T-GO-04 の明示的な no-hit 結果に従いコースティクスを非表示にする。
3. **色設計の維持**: cool/warm のシアン/アンバー補色体系を踏襲し、中心を warm、cusp/ring を cool に配分する。実装値は固定小数点出力の余裕を残す `cool vec3(0.42,0.72,0.86)` / `warm vec3(0.90,0.58,0.24)` とし、光源ランプ(0xffd48b)との因果を色で繋ぐ。
4. **床との相対輝度**: T-GO-02 の値設計(床アルベド低減・グリッド抑制)を前提に、「床の最輝要素はコースティクスのピーク」を成立させる。旧床を対象にした暫定値や後続での再調整経路は作らない。
5. **強度の単一ソース化**: caustics `uIntensity` の生成時初期値と更新時実効値を同じ定数/関数から設定し、生成直後に無条件上書きされる値を残さない。

## 受け入れ基準

- **視覚基準(スクリーンショット比較)**: デフォルト設定で、(1) コースティクスのピークが refractionMarker 位置と視覚的に一致すること、(2) 床上でコースティクスのピークがグリッド線・床反射より明るい最輝要素であること、(3) 25% サムネイル縮小でもホットスポットが視認できること。
- **クランプ非依存**: シェーダ上の alpha 最大値が設計値(≤ 0.9)以内で、宣言された最大 `uIntensity` を掛けても 1.0 に到達しないこと(式から静的に検証し、挙動テストまたはコードレビューで確認)。ピーク近傍に階調が残っていること(キャプチャの断面輝度プロファイルで平坦域がないこと)。
- **パラメータ応答**: beamSpread 0.05 / 0.34 / 0.9、ior 1.0 / 1.48 / 2.4 の 6 キャプチャで、ホットスポットの位置・集束度が単調かつ破綻なく変化すること。`showCaustics` OFF で完全に消灯すること(`runtime.ts:373-374` の分岐維持)。
- **モーション**: `motionScale = 0`(reduced-motion)で波紋アニメーションが停止しても静止画として成立すること(`uTime` 停止時の見た目を確認)。
- **数値基準**: フラグメントコスト増によるFPS 悪化が telemetry で ±5% 以内。T-GO-02/T-GO-04 完了時の draw calls **16** を維持する。
- **QA 通過**: `pnpm test` / `pnpm lint` / `pnpm qa:visual` 通過。

## 影響範囲・注意

- **テスト**: `runtime.test.ts` はシェーダ文字列をピン留めしていない(T-QA-01 で挙動ベース化済み — 旧カルテの `'caustic * 0.82 * uIntensity'` ピン留め記述は失効)。ただし `calculateGlassLightPath` の causticsPosition/causticsScale を挙動固定しているため(`runtime.test.ts:40-53`)、位置計算の uniform 追加は既存テストと両立させること。
- **beamSpread の意味**: T-GO-05 後も beamSpread は既存のビーム束/コースティクス集束度を表す。`uSpread` はその意味でのみ使用し、dispersion と混同しない。
- **T-GO-04 との接続**: 旧 `refractedB` のヒューリスティック値や中点計算を残さず、物理経路 API の floor hit/no-hit を直接受け取る。
- **renderOrder / ブレンド**: caustics は renderOrder 5・AdditiveBlending・depthWrite false(`runtime.ts:336-343`)。強度を上げてもブレンドモードと描画順は変えない(手動 renderOrder 連鎖 1,3,4,5,6,7,8,9,10 の再監査を避ける)。

## 作業報告 (2026-07-20)

- 実装 revision: `3ae0ffd0223cea5050c3957b337014d98a1736c9`。
- PR: [#33 `[T-GO-03] Strengthen caustics payoff`](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/33)。
- シェーダ: 旧 rings/spokes/streaks ノイズを撤去し、暖色ガウシアン焦点・出射方向に沿う冷色 cusp・弱い減衰 ring の bounded union へ置換した。alpha 上限は `1.0 × 0.70 = 0.70`。焦点の IOR 応答を shader/profile の単一経路へ集約し、wide spread は実 `hotspotRadius × planeScale` 面積の二乗に対して強度を逆比例させ、焦点エネルギー代理を保存する。
- 物理接続: caustics と cyan floor marker は T-GO-04 の同じ `floorHit` を中心とし、cusp 方向は `outgoingDirection` の床面投影を使用する。no-hit / OFF は実効強度 0 かつ mesh 非表示、`motionScale=0` は `uTime=0`。デフォルト光源を `(2.0, 3.2, 1.0)` に再構図し、低 IOR でも beam → 着地点 → 暖核を画面内で読めるようにした。marker は depth test を維持した低輝度補助、PointLight は 1.5 へ抑え、底辺反射が焦点を超えない値構造にした。
- QA 強化: `glass-optics-qa-metrics.mjs` を追加し、sRGB→linear の ON/OFF 差分、P99.9 peak、half-max 半径/重心、active footprint、plateau、channel clip、25% box downsample を測る。dim tail と単一 255 outlier の双方で平坦ピークを見逃さない反例テストを追加した。`qa:glass` は spread 0.05/0.34/0.9 と IOR 1.0/1.48/2.4 の 6 対、OFF pixel identity、底辺反射 ROI、静止/運動、180-frame drag allocation を恒常 gate にした。
- 視覚/数値: spread の half-max 半径は **9.24 → 10.90 → 15.11 px**、active coverage は **0.896% → 1.440% → 3.079%** と単調に拡大し、wide peak は 0.161 まで低下。IOR の linear peak は **0.590 → 0.620 → 0.710**、重心移動距離は 0.0416 / 0.0327 で同方向。全状態の all-channel clip は 0、plateau ratio は 0.055〜0.148、25% thumbnail の active pixels は最少 392。デフォルト p99 は caustics **194.27**、bottom reflection **142.42**、floor **60.60**、grid **8.80**、bottom all-channel clip は 0。
- 決定論/安定性: 通常/reduced-motion の 1 s→11 s 静止差分は mean/max/strong pixels すべて 0、motion positive control は mean delta 1.314。ON/OFF は 16/15 calls、デフォルトは 5,606 triangles / 25 geometries。Light X 180 frame drag は calls `16→16`、geometries `25→25`、禁止 allocation 0。
- 性能: 同一 RTX 4070 Ti / Chrome D3D11、`b7256e9` baseline と revision `3ae0ffd` の 5 組 interleaved production 比較は paired median regression **-0.0007%** (上限 +5%)。software median 6.72 FPS、hardware reference 200 FPS、16 calls / 5,606 triangles。
- 証拠: `captures/t-go-03-default-after.png`、`t-go-03-payoff-matrix.png`、spread/IOR 6 枚、`t-go-03-glass-qa-2026-07-20.json`、`t-go-03-telemetry-2026-07-20.json`。
- 検証: `pnpm lint`、`pnpm typecheck`、`pnpm test` (34 files / 251 tests)、`pnpm build`、`pnpm exhibits:check`、`pnpm qa:visual`、`pnpm qa:exhibits`、`pnpm qa:glass` を通過。独立 code review / visual review はともに `APPROVE`、独立 test verification は `PASS`。
