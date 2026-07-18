# [T-SH-02] RoomRuntime 契約を v2 へ拡張する(renderer 状態 save/restore・pause/resume・motionScale・stats 標準化・settings readonly 化)

- 分類: TA / Platform
- 優先度: P1
- 評価軸: コントラクト遵守 / 対応環境(reduced-motion 契約の不在) / QA 担保
- 依存: T-SH-01(永続レンダラー化により「共有 renderer 状態」が文字通り全ルーム共有になるため、契約の明文化が前提条件になる)

## 現状(証拠)

- **契約の現形**: `src/rooms/types.ts:66-77` — `RoomRuntimeContext = { canvas, renderer, onStats }`、`RoomRuntime = { updateSettings, resize, render, dispose }`。pause/resume・reduced-motion・renderer 状態の接触規約は一切存在しない。
- **(a) renderer グローバル状態の汚染実例**: `src/rooms/glass-optics/runtime.ts:397` と `src/rooms/voxel-water/runtime.ts:635` の両 dispose が `renderer.info.reset()` を呼ぶ。永続レンダラー(T-SH-01)後はシェルの stats 集計を直接汚染する。また research-glass-optics.md §2.6 / 適用推奨 2 は `renderer.transmissionResolutionScale = 0.5` 導入を推奨しており「dispose 時に 1.0 へ復帰を忘れない」という規約を確立済み(同 237 行・適用推奨 2)。review-framework.md 横断注意 #6 はこの規約の全ルーム一般化を要求している。
- **(b) pause/resume フックの不在**: T-SH-01 の推奨方向「埋め込みルーム表示中は canvas 維持+ループ停止」を受けるフックがない。また `document.hidden` 時も rAF ループはブラウザのスロットリング任せ。
- **(c) reduced-motion の未貫通**: `src/styles/app.css:588-596` の `prefers-reduced-motion` は CSS transition の平坦化のみ。WebGL ループへ振幅係数を渡すシームがない(dossier-shell.md リスク #10、research-webgl-platform.md §2.5)。
- **(d) stats 報告の不整合**: `src/shared/three/ShaderCanvas.tsx:91-98` — FPS は 0.5s 窓の平均だが、`drawCalls: renderer.info.render.calls`(94 行)はフラッシュ時点の直近 1 フレーム・最終パスのスナップショット。マルチパス(glass の transmission はフルシーン 2 回描画)では過少報告になる(dossier-shell.md リスク #12、research-webgl-platform.md §2.9 の autoReset 公式パターン)。`RoomStats` 型は `{ fps, drawCalls }` のみ(`src/rooms/types.ts:50-53`)。
- **(e) defaultPreset の参照共有**: `src/app/ShowroomPage.tsx:25` で `settings[room.id] = room.defaultPreset`(参照代入)、`ShowroomPage.tsx:65` の reset も同一オブジェクト参照を復元。runtime 側は `let settings = initialSettings` で参照を保持(`voxel-water/runtime.ts:200`、`glass-optics/runtime.ts:78`)。現状ソース上に直接 mutate は確認できなかったが、型レベルの防止(readonly)がなく、1 箇所の mutate でセッションのデフォルトがサイレント汚染される構造(dossier-shell.md リスク #11)。
- **(f) 展示追加手順の文書不在**: RoomDefinition の追加手順・義務(i18n キー・QA フック・renderer 接触禁止事項)をまとめたガイドが存在しない。ルームは今後も増える前提(docs/design/showroom-design-framework.md のオンライン展覧会メタファー)。

## 問題

永続レンダラー化により renderer は文字通り全ルームの共有インフラになるが、現契約には「ルームが renderer に何をしてよいか」の規定がなく、info.reset() のような汚染が既に実在する。また pause・reduced-motion・stats の各シームが欠けているため、T-SH-01/03/04 が各自で場当たり的に穴を開けることになる。契約を一度 v2 として拡張し、以後の展示追加を安全化する。

## 改善方向

research-webgl-platform.md §2.5 / §2.9 / §3 P1-5・P2-7、review-framework.md 横断注意 #6 に基づく。

1. **(a) renderer 状態の save/restore をシェル側で機械化**: ルーム runtime 生成前に `{ toneMapping, toneMappingExposure, transmissionResolutionScale, outputColorSpace, clearColor(+alpha), autoClear }` をスナップショットし、dispose 後にシェルが復元する(ルームの自己申告に頼らない)。`renderer.info` は autoReset を含めシェル専有とし、**ルームは info.autoReset / info.reset() に触れてはならない**を契約に明記 → `glass-optics/runtime.ts:397` / `voxel-water/runtime.ts:635` の `renderer.info.reset()` を削除。
2. **(b) pause/resume フック**: `RoomRuntime` に任意メソッド `pause?()` / `resume?()` を追加。rAF の停止/再開はシェルの責務、フックはルーム内部のタイマー・オーディオ等の付随停止用。発火条件は (i) 埋め込みルーム表示中(T-SH-01 の canvas 維持+ループ停止)、(ii) `document.visibilitychange` で非表示時。
3. **(c) motionScale 伝搬**: シェルが `matchMedia('(prefers-reduced-motion: reduce)')` を 1 箇所で監視(change リスナー付き)し、`RoomRuntimeContext` に `motionScale: number`(reduce 時 0.15 / 通常 1.0)と変更通知(updateSettings とは別の `setMotionScale?(scale)` または context の getter)を追加。ルームは「動き由来」パラメータ(波振幅・雨量・カメラ揺れ)にのみ乗算し、色・形状には触れない規約。iframe への postMessage 伝搬は将来拡張として契約にプロトコル名だけ予約(実装は別チケット)。
4. **(d) stats 標準化**: renderer 生成直後に `info.autoReset = false`。フレームループを「render → info.render.calls 等を蓄積 → info.reset()」に変更し、フラッシュ窓(現行 0.5s、T-SH-03 の計測プロトコルで最終決定)内の**移動平均(および最大値)**を報告。`RoomStats` を `{ fps, frameTimeMs, drawCalls(平均), trianglesAvg? }` 系に拡張し、マルチパスはフレーム単位合算で自然に集計されることを定義。窓・平滑化の数値定義自体は T-SH-03 の計測プロトコル文書を単一情報源とする。
5. **(e) settings の readonly 化**: `RoomRuntime<TSettings>` / `RoomControlsProps` の settings 受け渡しを `Readonly<TSettings>`(ネストがあれば DeepReadonly)化し、registry の `defaultPreset` も readonly 型に。あわせて `ShowroomPage.tsx` の初期化(25 行)と reset(65 行)を `structuredClone` による deep copy に変更。
6. **(f) 新規展示追加ガイドの作成(成果物)**: `docs/design/adding-a-room.md`(仮)として、registry エントリ追加手順・RoomRuntime v2 の義務(dispose で返すもの/触ってはいけない renderer 状態)・i18n キー命名(`rooms.<id>.*`)・QA(visual-smoke への組み込み)・ステージプロファイル(T-SH-04 へのポインタ)を 1 ページに集約。契約 v2 の仕様文書を兼ねる。

## 受け入れ基準

- **状態リーク検査**: 4 ルームを 1 巡(+shader↔shader 直行)した後、`toneMapping / toneMappingExposure / transmissionResolutionScale / clearColor / autoClear / outputColorSpace` が初期スナップショットと全一致することを自動テスト(モック renderer のユニットテストまたは Playwright 評価)で確認。
- **info 接触ゼロ**: `src/rooms/**` に `renderer.info` への参照が grep で 0 件(シェル `src/shared/three/` のみ許可)。
- **drawCalls の整合**: glass-optics 表示中の HUD calls 値が「窓内平均」であり、transmission の 2 パス分を含む値になっていること(現行 19 一定 — docs/direction/captures/fps-samples-2026-07-18.json — から集計定義変更後の期待値をチケット実装時に記録し、以後の基準にする)。
- **motionScale 貫通**: Playwright `page.emulateMedia({ reducedMotion: 'reduce' })` で voxel-water を開き、`pnpm qa:water` の meanDelta / strongRatio が通常時より有意に低下すること(数値バジェットは実装時に初回計測から設定)。OS 設定トグル(matchMedia change)への即応をユニットテストで確認。
- **readonly の型担保**: runtime 内で `settings.foo = x` 相当の書き込みが tsc エラーになることを `// @ts-expect-error` 付きの型テストで固定。reset 後の settings オブジェクトが `defaultPreset` と別参照であること。
- **pause/resume**: 埋め込みルーム表示中と `document.hidden` 中に shader ルームの rAF が停止していること(rAF 計数で確認)。復帰時に経過時間ジャンプでシミュレーションが破綻しない(delta クランプ 0.05 の既存挙動を維持)。
- **ガイド文書**: `docs/design/adding-a-room.md` が存在し、契約 v2 の全義務(a〜e)を網羅していること(レビューでチェックリスト照合)。

## 影響範囲・注意

- **文字列ピン留めテスト**: `src/rooms/glass-optics/runtime.test.ts` と `src/rooms/voxel-water/shader-quality.test.ts` は runtime ソースの生文字列をピン留めしている。`renderer.info.reset()` 削除・settings 型変更で該当アサーションの同期更新が必要。`src/shared/three/ShaderCanvas.test.ts:6-9` の `fpsElapsed += rawDelta` 系ピン留めも stats ループ改変で更新必須。
- **water-qa.mjs セレクタ**: 'Storm preset' / 'Calm preset'(scripts/water-qa.mjs:320-325)は本チケットで触れないが、motionScale 検証で water-qa を流用するため、reduce エミュレーションなしの通常実行がベースラインとして先に取得されていること。
- **renderOrder 連鎖**: 両ルームの描画内容には触れないが、autoReset=false 化はマルチパス描画の info 集計に影響するため、glass の transmission パス込みで calls 値を実機確認する。
- **T-SH-03 との境界**: 本チケットは「契約とシーム」まで。計測窓・平滑化定数・SW GL 判定・HUD 表現は T-SH-03 が所掌(二重定義しない)。
- **T-SH-04 との連携**: toneMapping / exposure をルーム別に設定する仕組み(ステージプロファイル)は T-SH-04。本チケットの save/restore はその前提となる安全網。

## 完了レポート (2026-07-18)

### 実装

- shell の runtime session が共有 renderer の tone mapping / exposure / transmission scale / output color space / clear color+alpha / auto-clear 4項目を生成前に snapshot し、通常 dispose と生成・dispose 例外の双方で `finally` 復元するようにした。room へは `render()` と PMREM factory だけを渡し、`src/rooms/**` の `renderer.info` 接触を 0 件にした。
- animation loop を hidden / inactive の独立 pause reason、active-time clock、0.5 秒 telemetry window を持つ shell controller に統一した。pause 中は loop を止め、復帰時は wall time を破棄する。`info.autoReset=false` の下で logical frame 全 pass 後に calls / triangles を採取して reset し、FPS、frame time、calls 平均/最大、triangles 平均を報告する。
- shell の単一 `matchMedia('(prefers-reduced-motion: reduce)')` store が 1 / 0.15 を初期値と live update の両方で runtime に渡す。Voxel Water / Glass Optics は `motionElapsed += delta * motionScale` と速度項だけを縮小し、色・形状・settings は変更しない。
- `DeepReadonly` を registry defaults、runtime 初期値/保持値、controls 入力まで貫通させ、初期化と reset は `structuredClone` で別オブジェクトを作る。`docs/design/adding-a-room.md` に runtime v2、renderer 禁止事項、motion、i18n、registry、QA、T-SH-04 境界を集約した。
- `pnpm qa:motion` を追加し、同一ページで Playwright の reduced-motion を live 切替して meanDelta / strongRatio を比較する。校准 gate は reduced meanDelta ≤ normal の 35%、strongRatio ≤ 25%。`qa:renderer` は production preview の FPS/calls を各8窓記録し、Glass の logical-frame baseline 19 calls を hard fail 化した。

### 検証

- `pnpm typecheck` / `pnpm lint` / `pnpm test` / `pnpm build` / `git diff --check`: pass。最終 unit suite は 18 files / 56 tests。
- renderer state の全 governed fields、5セッション連続切替、factory/dispose 例外、info ownership grep、pause reason 交差、pause 後 delta、stats 平均/最大、matchMedia change、readonly 負向型、reset clone を自動テストした。
- `pnpm qa:renderer`: 2訪問順序 × 20切替、canvas/context 各1、shader loop active / embedded loop stopped、context lost / browser error 0。Voxel 8窓は全て 19 calls、FPS mean 15.125。Glass 8窓は全て 19 calls (3–5 FPS) で、transmission を含む logical-frame 集計値を baseline として固定した。
- `pnpm qa:motion`: normal `meanDelta=3.261 / strongRatio=0.02672`、reduce `0.622 / 0`、比率 `0.191 / 0` で gate pass。個別 `qa:water` でも normal `3.241 / 0.02808`、reduce `0.590 / 0`。水面 signature は coverage 1、luma 162.40、toon-band 7.841、hue 177.31 と従来同水準。
- `pnpm qa:visual`: desktop/mobile 7 captures、console error 0、horizontal overflow 0、HUD overlap 0。独立审查发现的 readonly P1 与真实 Glass telemetry P2 均已修复，并追加负向类型测试与生产预览硬门禁后复核。
- Windows `core.autocrlf=true` 下で既存 exhibit sync build が4つの生成物を EOL-only dirty にする非阻塞問題も確認した。bundle hash / sourcemap sources+mappings / 正規化後 sourcesContent は不変で、本チケットには無関係な生成物差分を含めず、committed exhibit snapshot の sync check は pass した。
