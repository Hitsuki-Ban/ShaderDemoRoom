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
3. **実装タスク**: 承認されたデザインを実装。技術要点: 計測モジュールは EMA 平滑化 FPS + 60 サンプルリングバッファ、2D `<canvas>` によるスパークライン(数十 μs/frame 規模)。telemetry セルは renderer.info から FPS / Frame Time / Draw Calls / Triangles / Textures / Programs を実測で埋め、**VRAM は WebGL に API がないため省略または「推計」明記**(research-exhibition-direction.md §6・注記)。デスクトップはフルストリップ、モバイルは FPS + Frame Time の 2 セルに縮退。
4. **埋め込みルームの「—」根絶**: postMessage で親へ FPS 報告(将来の T-SH-02 iframe シーム拡張)するか、当面は「External runtime」等の**意図された計測外表示**に置き換え、ダッシュの「壊れて見える」状態を解消する。exhibit 内 HUD(MIZU の FPS 欄)の修理は ref/ fork 側の別チケット(D-1 前提)とし、本チケットはシェル側表示を所掌。
5. **低 FPS の文脈提示**: 計測修正後もソフトウェア GL 環境で値が低い場合、環境バッジ(例: "SW GL")併記で文脈を与える。**表示を消すのは最後の手段**(計測帯自体が pro-tool 感の演出資産)。

## 受け入れ基準

- **プロトコル文書**: `docs/design/telemetry-protocol.md`(仮)が存在し、窓・集計・環境判定・記録形式が定義され、T-SH-02 (d) の実装がこれを参照していること。
- **数値の整合**: HUD の FPS と drawCalls が同一窓の集計値であること。glass-optics の calls が transmission 2 パスを含む値になること(fps-samples の「19 一定」からの変化を実装時に記録)。
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
