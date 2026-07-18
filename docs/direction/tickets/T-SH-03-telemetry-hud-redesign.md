# [T-SH-03] FPS 計測プロトコルを定義し、シェル HUD / telemetry を全体リデザインする

- 分類: TA / AD
- 優先度: P1
- 評価軸: フレームバジェット(HUD の FPS 表示は正確か)/ ヒーローショット成立性(プロツール・ガーニッシュはコンセプト画の説得力の主要素)
- 依存: T-SH-01(レンダラー永続化で計測系統が安定)、T-SH-02(stats 契約 (d) のシームに載せる)

## 現状(証拠)

- **「1 FPS」チップの正体**: docs/direction/captures/fps-samples-2026-07-18.json — headless Chromium(ソフトウェア GL / SwiftShader 系)で glass-optics は入場直後 17 FPS → 2-4 FPS へ崩落(voxel-water は 16-17 FPS で安定)。既報の「1 FPS」チップ(dossier-shell.md 既知の課題 #7、visual-current 批評の「ローンチブロッカー」評価)はこの崩落の観測であり、**公開 QA スクリーンショットの値はソフトウェア GL 値で、実 GPU 値ではない**。一方 glass 固有の per-frame コスト問題(transmission のフルシーン 2 回描画)の存在自体はこのデータで裏付けられた。
- **drawCalls の不整合**: `src/shared/three/ShaderCanvas.tsx:91-98` — FPS は 0.5s 窓の平均、`drawCalls: renderer.info.render.calls`(94 行)はフラッシュ時点の最終フレーム・最終パスのスナップショット。平均値と瞬時値の並記でミスリーディング(dossier-shell.md リスク #12)。fps-samples でも draw calls は両ルーム 19 一定で、glass の 2 パス描画が反映されていない。
- **HUD の現形**: `src/app/ShowroomPage.tsx:132-140` — チップ 3 個(`${Math.round(stats.fps)} FPS` / `${stats.drawCalls} calls` / techTags)。embedded ルームは 134・137 行で "Embedded runtime" / "Standalone exhibit" ラベルに差し替わり性能値ゼロ、さらに MIZU//KOKORO は exhibit 内 HUD の FPS 欄が**ダッシュ「—」表示**で「壊れて見える」(dossier-shell.md 既知の課題 #7、ビジュアル現状評価)。スタイルは `src/styles/app.css:273-293`(.scene-hud)。
- **コンセプトとの落差**: コンセプト画 `docs/design/primary-showroom-concept.png`(Wow 9/10)のプロツール的ガーニッシュ — monospace カメラ/デバッグ読み出し、XYZ gizmo cube、teal minimap、FPS/Frame Time スパークライン付き 7 セル telemetry ストリップ(Draw Calls 142 / Triangles 1.23M / Uniforms 220 / Textures 18 / VRAM 312 MB)— は一切実装されておらず、ビルドは上記 2 チップに縮退(dossier-shell.md「コンセプトとのガーニッシュ差分」)。コンセプトのステータスピルは 60 FPS / 16.7 ms を約束しており、現実測との乖離が信頼毀損になっている(既知の課題 #7)。
- **確定済み設計判断 D-2**: プロツール的ガーニッシュは「単純コピー」でも「全不採用」でもなく、コンセプト画のプロツール的アイデンティティを**デザイン言語として取り込みつつ、シェル表現層(topbar / HUD / telemetry)を全体リデザイン**する。gizmo / minimap の採否はそのリデザインの中で判断する(事前決定しない)。

## 問題

技術ショールームの看板である性能表示が「1 FPS」「—」を公開しており、計測値の意味(どの環境・どの窓の値か)も定義されていない。信頼性の毀損(review-framework.md 優先度定義の P1 例そのもの)であると同時に、コンセプト画の「pro tool」感を支えていた telemetry 表現が丸ごと欠落している。計測の正しさとデザインの説得力を同時に解決する必要がある。

## 改善方向

research-exhibition-direction.md §6(Tufte スパークライン論・stats.js/rStats・「虚偽表示は不可、まず計測修正」)、research-webgl-platform.md §2.9(info.autoReset 規約)・§2.6(SwiftShader 環境の扱い)に基づく。**チケット内タスクを「計測プロトコル定義 → デザイン検討 → 実装」の順に明記し、2 段構え(デザイン承認後に実装)とする。**

1. **先行タスク: FPS 計測プロトコルの定義**(文書 `docs/design/telemetry-protocol.md` 仮): review-framework.md 横断注意 #8 の要求に従い、複数資料でバラついている FPS 数値(QA ログ 17-18 / チップ 15-28 / research 17-20)の基準を統一する。定義項目: (i) 計測点(rAF 間隔ベース、T-SH-02 (d) の窓と同一)、(ii) 平均化窓(移動平均の窓長と EMA 係数、リングバッファ長)、(iii) 集計(FPS 平均 / frame time 平均と p95 / drawCalls・triangles はフレーム単位合算の窓内平均 — autoReset=false 前提)、(iv) **実 GPU / ソフトウェア GL の区別**(`WEBGL_debug_renderer_info` の unmasked renderer に SwiftShader / llvmpipe 等が含まれるかで判定し、計測記録と HUD 表示に環境フラグを付与)、(v) 記録先(QA キャプチャの JSON への記録形式。fps-samples-2026-07-18.json を第 1 号として継承)。
2. **デザイン検討タスク**: D-2 の決定に基づき、コンセプト画のプロツール言語(monospace 読み出し・スパークライン・セル構造)をデザイン言語として抽出し、topbar / HUD / telemetry ストリップを含むシェル表現層のリデザイン案(静止モック、最低 2 案)を作成・承認を得る。gizmo cube / minimap の採否はここで判断して記録する。トークン体系(`src/styles/tokens.css`)と radius ≤ 8px 等の既存デザイン制約に従う。
3. **実装タスク**: 承認されたデザインを実装。技術要点: 計測モジュールは時間固定の rolling window + 60 × 250ms bucket、2D `<canvas>` によるスパークラインを使用する。固定 alpha EMA は 4 FPS と 60 FPS で実時間の意味が変わり、rolling window と二重平滑化になるため採用しない。telemetry セルは renderer.info から FPS / Frame Time / Draw Calls / Triangles / Textures / Programs を実測で埋め、**VRAM は WebGL に API がないため省略**する。デスクトップはフルストリップ、モバイルは FPS + Frame Time の 2 セルに縮退。
4. **埋め込みルームの「—」根絶**: postMessage で親へ FPS 報告(将来の T-SH-02 iframe シーム拡張)するか、当面は「External runtime」等の**意図された計測外表示**に置き換え、ダッシュの「壊れて見える」状態を解消する。exhibit 内 HUD(MIZU の FPS 欄)の修理は ref/ fork 側の別チケット(D-1 前提)とし、本チケットはシェル側表示を所掌。
5. **低 FPS の文脈提示**: 計測修正後もソフトウェア GL 環境で値が低い場合、環境バッジ(例: "SW GL")併記で文脈を与える。**表示を消すのは最後の手段**(計測帯自体が pro-tool 感の演出資産)。

## 受け入れ基準

- **プロトコル文書**: `docs/design/telemetry-protocol.md`(仮)が存在し、窓・集計・環境判定・記録形式が定義され、T-SH-02 (d) の実装がこれを参照していること。
- **数値の整合**: HUD の FPS と drawCalls が同一窓の集計値であること。glass-optics の calls が transmission 2 パスを含むこと。T-SH-02 で production hard gate 化された 19 calls は既に transmission-inclusive の正しい baseline なので、「19 から変化する」という旧前提は撤回し、19 を維持する。
- **「1 FPS」の解消**: fps-samples-2026-07-18.json と同一手法の再計測で、glass-optics のチップが崩落値を裸で出さない(正確な値+環境バッジ、または品質フォールバック後の値)こと。実 GPU 環境での参考値も 1 回記録すること。
- **「—」の根絶**: 埋め込み 2 ルームのシェル HUD に、破損に見えるダッシュ/ゼロ値が存在しないこと(実測値または意図された「計測外」表示)。
- **デザイン承認の証跡**: モック(最低 2 案)と採用判断(gizmo / minimap の採否と理由を含む)が docs/direction/ 配下に記録されていること。
- **視覚基準**: デスクトップ 1440x900 で telemetry ストリップがコンセプト画のプロツール言語(monospace・スパークライン・セル構造)を反映していること(スクリーンショット比較レビュー)。モバイル 390x844 で 2 セル縮退し、visual-smoke の 3 ハードフェイル条件(横スクロール・.scene-hud と .stage-viewport のオーバーラップ・console error)を通過すること。
- **オーバーヘッド**: telemetry 描画のフレームコスト増が voxel-water の FPS を計測誤差(±5%)以上悪化させないこと。

## 影響範囲・注意

- **文字列ピン留めテスト**: `src/shared/three/ShaderCanvas.test.ts:6-9` が `fpsElapsed += rawDelta` 等の生ソース文字列をピン留めしており、計測ループ改変で更新必須(可能なら挙動テスト化 — review-framework.md ロングリスト SH-11)。
- **i18n シーム**: 新規 HUD コピーは必ず `t(key)` 経由(Locked Decision #5)。現状も `ShowroomPage.tsx:117` の 'Loading renderer' 等のバイパスが既知(dossier-shell.md リスク #4)であり、リデザインで新たなバイパスを増やさないこと。
- **water-qa.mjs セレクタ**: HUD の DOM 構造変更は water-qa には非依存だが、visual-smoke の `.scene-hud` セレクタ(オーバーラップ検査)に直結する。クラス名を変える場合は scripts/visual-smoke.mjs の同期更新が必須。
- **renderer.info 規約**: 集計は T-SH-02 の「info はシェル専有・autoReset=false・フレーム末尾 reset」規約の上に実装する。ルーム側から reset を呼ばないこと。
- **QA キャプチャの証拠性**: 受け入れ確認のスクリーンショットは環境フラグ(SW GL / 実 GPU)を必ず記録に残すこと(今回の「1 FPS」誤診の再発防止)。

## 完了レポート (2026-07-18)

### 判断と設計

- `docs/design/telemetry-protocol.md` を単一情報源として追加し、rAF cadence、2秒 headline window、10秒 p95 window、250ms/4Hz publish、nearest-rank p95、15秒/60 bucket sparkline、logical-frame renderer counters、QA schema を定義した。rAF cadence は present/GPU time ではなく、submit time も GPU time ではないことを明記した。
- renderer は `software | hardware | unknown` の三態。SwiftShader / llvmpipe / softpipe / lavapipe / OpenSWR / WARP / Software Rasterizer / Microsoft Basic Render Driver の明示 match だけを software とし、NVIDIA / AMD / Intel / Apple GPU 等の正向 hardware-family marker がない文字列は unmasked でも unknown にする fail-closed 分類とした。
- 3案の静止モックを `docs/direction/mocks/` に保存し、`docs/direction/t-sh-03-telemetry-design.md` で比較した。採用は viewport 下の full-width instrument rail。corner overlay は作品を覆い、status ledger は topbar と重複するため不採用。gizmo / minimap / camera overlay は実データ seam がなく虚偽装飾になるため本票では採用しない。

### 実装

- `FrameStatsWindow` を 10秒 raw / 2秒 headline / 最大4Hz publish に更新し、FPS・frame mean・calls avg/max・triangles avg を同じ frame set から算出する。p95 は30 sample 未満を `warming` とし、60 bucket history は無 sample を `null` gap のまま保持する。
- renderer 作成時に masked/unmasked vendor+renderer を一度だけ取得して分類し、RoomStats に environment、p95、history、textures/geometries/programs を追加した。room switch / hidden resume は既存 active-time clock と reset 契約を維持する。
- `.scene-hud` を monospace / tabular numerals の5セル instrument rail に刷新し、cadence と frame time に 4Hz更新の 2D canvas sparkline を追加した。390px は CSS で正確に2セルへ縮退しつつ renderer badge を残す。embedded 2室は数値・dash・sparkline を作らず `External runtime · telemetry unavailable` を表示する。
- 新規 visible copy は英語/中国語の `t(key)` を通す。canvas は `aria-hidden`、4Hz値に live region を付けず、renderer context は文字ラベルと tooltip の両方で伝える。QA は visible text ではなく未丸め `RoomStats` の `data-telemetry-json` を読む。

### 検証

- `pnpm test` 20 files / 72 tests、`pnpm lint`、token lint、`pnpm typecheck`、`pnpm build`、exhibit sync、`git diff --check`: pass。synthetic 60/30/4 FPS、jitter/long frame、p95 nearest-rank、bucket gaps、reset、renderer classifier、Glass 19 calls、HUD native/external states を固定した。
- `pnpm qa:renderer`: 2訪問順序 × 20切替、canvas/context 各1、context lost / browser error 0。Voxel 8窓 mean 15.078 FPS、全19 calls。Glass 8窓 3.09–4.62 FPS、全19 calls。この実行は lifecycle/counter 回帰の証拠であり、overhead 判定には流用しない。
- `pnpm qa:visual`: desktop/mobile 7 captures、console error 0、mobile horizontal overflow 0、HUD/viewport overlap 0。desktop は5セル、mobile は2セル、embedded は external state の hard assertion を追加。初回 critique で resources cell の密度を下げ、`TX/GEO` と `PGM/context` の2階層へ修正後に再撮影した。
- `pnpm qa:telemetry-reference`: 1440×900 Voxel default、5秒 warm-up + 15秒 measurement の software/hardware 参照に加え、同じ system Chrome D3D11 renderer で T-SH-02 baseline build と T-SH-03 candidate build を5組交錯・交互順序で直接測定する。paired median regression を ±5% gate とし、全 raw pair を schema v1 JSON に保存する。記録は `docs/direction/captures/telemetry-reference-2026-07-18.json`。
- 通常 Chrome の hardware renderer string も確認したが、拡張制御タブは background rAF throttling を受けるため、その約1 FPS値は性能記録から明示的に除外した。正式値は `--disable-software-rasterizer` かつ classification=`hardware` を hard assert する専用 D3D11 capture だけを採用した。
