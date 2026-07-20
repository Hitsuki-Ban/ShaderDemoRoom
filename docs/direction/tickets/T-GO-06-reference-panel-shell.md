# [T-GO-06] リファレンスパネルを明確化し、ワイヤーフレームシェルを削除する

- 分類: AD
- 優先度: P2
- 評価軸: ストーリーテリング / 焦点階層 / デッドコード・デッド出力(意図が伝わらない描画は「見えない描画」と同種の不合格)
- 依存: T-GO-02(ダークフィールド env を確定) / T-GO-05(最終的なガラスと分散ビームの輪郭を確定)

## 現状(証拠)

- **リファレンスパネルの役割が伝わらない**: `src/rooms/glass-optics/runtime.ts:186-223` — `PlaneGeometry(3.3, 2.35)` at (0, 1.35, −1.85)、renderOrder 1。インライン ShaderMaterial でスキャンライン(`fract((vUv.x + uTime*0.018) * 7.0)`)+ クロスヘア + エッジビネット + シアン→アンバー水平グラデーション、alpha = mask*0.58。visual-current 批評は「アンバーのストライプパネルの役割が曖昧 — 受光板? スクリーン? アーティファクト? — 鑑賞者に意図が伝わらない」と評価。QA ログ上の設計意図は「透過マテリアルが具体的に何かを屈折している様子を見せる屈折対象」(dossier「コンセプト」節)だが、その読みが成立していない。
- **機能自体は正しく働いている**: パネルは renderOrder 1 でガラス(renderOrder 3)より先に描かれ、transmission バッファに含まれるため、**ガラス越しに屈折像として実際に見えている**。問題は視覚言語(役割の記名性)のみ。
- **ワイヤーフレームシェルが「デバッグ球」に見える**: `runtime.ts:234-245` — `IcosahedronGeometry(1.365, 3)` + `MeshBasicMaterial{ color: 0xb9fbff, wireframe: true, additive, opacity 0.08 }`、renderOrder 4、`toneMapped = false`。opacity は ior 連動で `min(0.14, 0.05 + (ior−1)*0.05)`(`runtime.ts:372`)。批評は「開発中の見た目と受け取られる」と評価。
- **シェルは屈折に参加しない(dossier リスク 14)**: シェルは renderOrder 4 でガラスの**上に直描き**され、transmission バッファにも取り込まれない。球の輪郭線が屈折・遮蔽と無関係に常に最前面へ出るため、体積の錯覚を平坦化している。シェルの本来の機能は「汎用 RoomEnvironment ではガラスの輪郭が弱い」ことの人工的な補填(research-glass-optics.md §1 表 #9)。

## 問題

観客に「ガラスが何を屈折しているか」を読ませるための 2 要素(背後のパネル、輪郭のシェル)が、どちらも意図と逆の読み(謎のストライプ / デバッグ表示)を発生させている。展示の光学ストーリーは判読可能(批評の「良い点」)なのに、その周辺装置が信頼感を削っている状態。

## 改善方向

1. **パネルを「屈折対象」として記名する**: 視覚言語をキャリブレーションチャート(テストパターン)に寄せる — 解像度ウェッジ、同心格子、明確な十字基準線、縁のフレーム(物理的な「板」の読み)など、光学試験の記号体系を借りる。ガラス越しの屈折像で**倒立・歪曲が一目で分かる高コントラストパターン**(粗い格子 + 単純図形)を優先する。文字ラベルは i18n 不能なテクスチャ焼き込みになるため避け、抽象記号のみで構成する(Locked Decision の i18n シームを回避しない)。
2. **パネルの配置・スケール検討**: 現位置 (0, 1.35, −1.85) はガラス背後で正しい。カメラ(5.9, 3.35, 6.4 固定)から見て**球の輪郭内にパネルの屈折像が確実に収まる**よう、パネル寸法/位置を微調整する。T-GO-02 の再フレーミングと同時に検分する。
3. **ワイヤーフレームシェルを削除**: T-GO-02 のダークフィールド env と本票のキャリブレーションパネルで輪郭/屈折対象を読ませ、`glassShell`、材質、ior-opacity 更新、dispose 経路を削除する。フレネル置換、減光維持、保険表示は追加しない。
4. **ior 連動の再配置**: 現行の「ior → シェル opacity」連動(`runtime.ts:372`)はシェル削除で失われる。ior の視覚フィードバックは T-GO-04(屈折角)/ T-GO-05(分散)が本筋で担うため、この連動は移植せず廃止してよい(判断を記録)。

## 受け入れ基準

- **屈折像の可読性**: デフォルト設定のデスクトップキャプチャで、ガラス球内にパネルの屈折像(倒立/歪曲した格子)が視認でき、球外のパネル本体と「同じものが屈折されている」対応が読めること。ビフォー/アフター比較で承認を得る。
- **役割の伝達(記名性)**: パネル単体のクローズアップで「光学試験チャート」という読みが成立すること(レビュー承認。少なくとも「アーティファクト/バグ」という誤読が出る要素 — 意味のないストライプの流れ等 — が除去されていること)。
- **シェル削除の証跡**: 同一条件の before/after キャプチャを docs/direction/ 配下に記録し、削除後に「デバッグジオメトリに見える」批評点が解消していること。
- **輪郭非劣化**: シェル変更後も、ガラス球のシルエットが背景から分離して読めること(25% サムネイルテスト)。autoRotate OFF・静止状態でも成立すること。
- **数値基準**: FPS ±5% 以内。T-GO-05 完了時の16 callsからシェル1 drawを削除し、シーン総 draw calls は **15** とする。
- **QA 通過**: `pnpm test` / `pnpm lint` / `pnpm qa:visual` 通過。

## 影響範囲・注意

- **renderOrder 連鎖の再監査**: パネル(1)とシェル(4)はどちらも手動連鎖(1,3,4,5,6,7,8,9,10)の要素。シェル削除時は連鎖から順位が 1 つ消えるだけで再番号は不要だが、透明要素の描画順に依存する見え方(パネル × ガラス × ビーム)をキャプチャで再確認する(review-framework 横断注意 5)。
- **dispose リストの同期**: シェル/パネルのマテリアル差し替え時は `runtime.ts:416-432` の明示 dispose リストを更新する(T-GO-07 のリスト整理と衝突するため、先に着手した方が現状を変えたことを他方へ申し送る)。
- **挙動テストへの影響**: `runtime.test.ts` はパネル・シェルを直接固定していないため定数変更は安全。ただしシェル削除で `createGlassMaterial` 以外の公開 API を変える場合はテスト同期。
- **T-GO-05 との相互作用**: パネルの高コントラストパターンは dispersion(T-GO-05)の色ずれを見せる背景としても機能する。パターン設計時に細線(色収差が見えやすい)を 1 要素含めておくと相乗する。
- **モーション**: パネルのスキャンラインアニメーション(uTime 連動)を残す場合は `motionScale = 0` で静止しても意図が読めるデザインにする(reduced-motion 契約)。

## 作業報告 (2026-07-21)

### 実装

- 旧ストライプ Shader を廃止し、512×288 / 2×2 supersampling の決定論的なキャリブレーションターゲットを `DataTexture` として起動時に1回だけ生成する `reference-panel.ts` を追加した。Siemens star、3-bar group、checker、resolution wedge、tone blocks、slanted edge、非対称の向きマーカーを文字なしで構成し、パネル本体と球内の屈折像を対応づけられるようにした。
- パネルは不透明な1枚の plane (`3.8 × 2.1`, position `(0.8, 1.0, -1.85)`, renderOrder 1) とし、実行時 Shader は単一 texture sample のみにした。静的画素は module 単位で共有し、room session ごとの texture 所有と明示 dispose を維持する。
- `glassShell` の geometry / material / renderOrder / IOR-opacity 更新 / dispose をすべて削除した。フレネルや代替シェルは追加せず、IOR の視覚フィードバックはガラス本体・光路・分散へ一本化した。
- QA はシェルなしの広域輪郭を測る `broadContrast`、default 15 calls / caustics-off 14 calls、180-frame drag 中の geometry / texture / program 不変を固定した。T-GO-07 には `referenceTexture` が material dispose の対象外である所有境界を申し送った。

### 視覚・計測証拠

- before: [`../captures/t-go-06-before.png`](../captures/t-go-06-before.png)
- after: [`../captures/t-go-06-after.png`](../captures/t-go-06-after.png)
- calibration target close-up: [`../captures/t-go-06-reference-panel-closeup.png`](../captures/t-go-06-reference-panel-closeup.png)
- Glass QA: [`../captures/t-go-06-glass-qa-2026-07-21.json`](../captures/t-go-06-glass-qa-2026-07-21.json) — 16 states pass、default `15 calls / 5 textures / 23 geometries / 14 programs / 5,542 triangles`、25% glass-disc local contrast `21.04`、maximum roughness broad contrast `11.39`、静止2回差分 `maxDelta 0`、IOR=1 dispersion collapse `meanDelta 0`、180-frame drag `15 → 15 calls / 23 → 23 geometries / 5 → 5 textures / 15 → 15 warmed programs / forbidden allocation 0`。
- performance: [`../captures/t-go-06-telemetry-2026-07-21.json`](../captures/t-go-06-telemetry-2026-07-21.json) — 同一 RTX 4070 Ti / D3D11 で T-GO-05 の公開版と候補を5組交錯・交互測定し、paired median regression **−6.12%** (許容上限 +5%)。候補の system Chrome median `89.70 FPS`、SwiftShader median `5.95 FPS`、いずれも 15 calls。

### 検証

- `pnpm build` ✅
- `pnpm test` ✅ — 35 files / 271 tests
- `pnpm lint` ✅
- `pnpm typecheck` ✅
- `pnpm exhibits:check` ✅
- `pnpm qa:visual` ✅ — desktop/mobile 14 captures、console errors 0、overflow/telemetry/i18n/URL-state gates pass
- `pnpm qa:glass` ✅ — 16 states、default 15 calls、stable geometry/resources
- `pnpm qa:telemetry-reference` ✅ — paired overhead gate −6.12%
- `pnpm qa:renderer` ⚠️ — Glass は8回すべて 15 calls (`6.05–6.24 FPS`) で安定。未変更の Voxel Water が同じ SwiftShader run で mean `13.86 FPS` となり、歴史基準の 10% FPS budget だけを下回ったためコマンド全体は fail。本票の Glass topology / lifecycle 回帰は検出されていない。
