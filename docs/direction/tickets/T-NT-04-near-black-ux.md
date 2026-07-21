# [T-NT-04] near-black 区間の「壊れて見える」問題を展示内キューで解消する

- 分類: AD / UX / A11y
- 優先度: P2
- 状態: **完了 (2026-07-21; PR #40)**
- 評価軸: ストーリーテリング / 一見客の誤認防止 / 近黒階調の維持
- 依存: T-NT-02 / T-NT-05 / T-SH-04 / T-I18N-01（すべて完了）

## 2026-07-21 再調査で確定した問題

基準 revision `58a38116f4fe211a34f608a4e795f05de8106f82` を Playwright 1.60.0 / bundled Chromium / SwiftShader / 1440×900 で full-page capture した。従来票は Canvas の暗さから開幕・第 IX 章・終幕を一括して問題視していたが、DOM compositor を含む実測では次のように分離される。

- 開幕 5.75 s: HUD は opacity `0` だが既存儀式キャプション「它先看见了我们。」が表示される。キャプション領域は 3:1 以上 1,565 px、4.5:1 以上 1,376 px、最大 18.93:1。故障誤認の空白ではない。
- 第 IX 章通常 preview: 既存 HUD は opacity `.68`、章番号領域の最大コントラスト 8.61:1。章・進行情報とも読めるため追加キューは不要。
- 終幕 preview: `body.ending` が通常 HUD を opacity `0` にし、一時メッセージ消失後は恒久 UI がない。`role=status` / `role=progressbar` / live region も各 0。これが唯一再現した「壊れて見える」空白である。
- 進行表示は描画側の visual score clock と別計算だった。第 IX 章 preview が `00:02`、終幕が `00:00` / `0.005%` を示す一方、描画側の終幕時刻は 346.0 / 354.504 s = `97.601%`。見えるキューを足す前に同一時計へ統一する必要がある。
- 旧 `docs/direction/captures/ninth-tide-ending.png` は Canvas-only のため、DOM キューの有無を受け入れ判定できない。以後は full-page compositor capture を正とする。

原始証拠は `docs/direction/baselines/t-nt-04-before.json`、before/after は `docs/direction/captures/t-nt-04-*.png` に固定する。

## 採用方針

1. **終幕専用の最小アンカー**: `body.ending:not(.ended)` の間だけ、既存の造形言語を使った大きな `IX` と visual score の playhead を独立 DOM layer に出す。通常 HUD、開幕、第 IX 章通常表示、エピローグ、T-NT-02 の composer / dither / spectral comb は変更しない。
2. **静止した状態表示**: 新しい装飾アニメーションや残光は追加しない。playhead の変化は作品時間そのものだけに従い、pause 時は止まる。`prefers-reduced-motion` でも余分な動作を発生させない。
3. **単一 visual score clock**: 潮位選択、表示時刻、CSS `--progress`、索引、ARIA progressbar を同じ `visualScoreTime / visualScoreDuration` から更新する。preview と silent playback で表示だけが別時間を示す経路を残さない。
4. **意味情報を別経路で提供**: 装飾 HUD は `aria-hidden=true` のまま維持し、章/終幕/完了の離散状態を polite status、進行を progressbar として公開する。毎 frame の live announcement は行わない。
5. **シェル予告**: en / zh-CN の `rooms.ninthTideArchive.controls.runtimeNote` に、終幕が意図的に近黒へ退くことを 1 文で明示する。

## 疑問・決定記録（非 BLOCK）

2026-07-21 の mock 比較では、終幕アンカー全体 opacity `.40` が章番号領域 P90 `3.512:1`（3:1 以上 873 px、全画面の 0.067%）、`.47` が P90 `4.535:1` だった。

- 疑問: 誤認防止を優先して 4.5:1 まで上げるか、原作の暗順応と階調を優先して大きな章番号の 3:1 基準に留めるか。
- 現行決定: `.40` を採用する。最小 28 px の通常ウェイト serif は WCAG large text の 3:1 基準を満たし、画面占有も小さい。`.47` は読みやすい代わりに終幕の主視覚へ寄り過ぎるため保留する。
- 再評価条件: 実装後 full-page capture が P90 3:1 未満、モバイルで章番号が large text 条件を外れる、またはユーザーテストで故障誤認が残る場合のみ `.47` を再検討する。
- 非 BLOCK 残余: score 終端は renderer の境界選択のため `scoreDuration - 0.001` に clamp される。媒体へ戻した表示値は完了直前だけ最終秒を切り捨てる可能性があるが、その時点では `ended` がアンカー/HUD を即時非表示にして完了 status と epilogue へ移るため、本票の可視・操作経路には影響しない。将来 transport を完了画面にも表示する場合に再検討する。

この疑問は受け入れ基準を満たす可逆な値選択であり BLOCK ではない。2026-07-21 の運用指示に従い、票内に根拠を残して `.40` で進行する。

## 受け入れ基準

- `?preview=opening&section=0`: 既存儀式キャプションが full-page capture で 4.5:1 以上の画素を持ち、新アンカーは hidden。
- `?preview=main&section=8`: 既存 HUD / IX が可視で、新アンカーは hidden。通常第 IX 章の構図を変えない。
- `?preview=ending&section=8`: 一時メッセージに依存せず `IX` と playhead が可視。章番号領域 P90 が 3:1 以上 4.5:1 未満、全画面の 3:1 以上画素は 0.25% 以下。
- 終幕 progress は `346.0 / 354.504 = 97.601%`、DOM progressbar は同値（丸め許容 ±0.1 percentage point）。表示時刻は `05:46 / 05:54`。
- `role=status` と `role=progressbar` が各 1。status は章切替・終幕開始・完了だけを通知し、装飾 HUD / アンカーは accessibility tree に重複露出しない。
- 新アンカーに CSS animation がなく、reduced-motion capture でも位置・opacity・進行値が一致する。
- `body.ended` では新アンカーが消え、既存エピローグと replay 導線だけが残る。
- en / zh-CN catalog のキー完全一致を維持し、近黒終幕の予告を表示する。
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `pnpm qa:exhibits` / `pnpm qa:visual` / `pnpm qa:ninth-tide` / 新設 full-page near-black gate が通る。

## 実装境界

- exhibit 側は `ref/archive_of_the_ninth_tide_shoreless_web/` を正とし、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public を直接編集しない。
- full-page gate は compositor 後の PNG と computed DOM / ARIA を同時に検査する。dither による連続 frame 差分を「稼働中」の証拠にしない。
- 「アンカーがシーン最大輝度以下」のような、シーンが完全黒なら常に破綻する相対条件は使わない。絶対コントラスト帯と占有率で上限・下限を固定する。
- 既存 T-NT-02 の deterministic framebuffer hash は Canvas-only なので、DOM overlay 追加後も不変であることを既存 `qa:ninth-tide` で確認する。

## 実装・検証結果（2026-07-21）

- 作業報告: 実装 commit `9fe584e` を [PR #40](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/40) として提出し、初回 review の BLOCK を `817da68` で解消。head `3b593a1` の独立 APPROVE と CI success を確認して `main@4e711b4` へ squash merge した。
- desktop ending: `IX` P90 `3.417:1` / P99 `3.417:1` / max `3.455:1`、3:1 以上 855 px、4.5:1 以上 0 px。全画面の 3:1 以上占有率 `0.0675%`、playhead は 3:1 以上 7 px。
- mobile 390×844: `IX` は 28 px、P90 `3.417:1`、3:1 以上 158 px。全画面占有率 `0.0501%`、scroll width / height は viewport と一致。
- ending transport: CSS `97.601%`、ARIA `97.6`、表示 `05:46 / 05:54`。status / progressbar / live region は各 1。
- custom audio: 120 s / 600 s の音源を visual score 全体へ正規化する unit gate を追加。transport の表示時間は同じ score progress から媒体 duration へ戻すため、長尺音源でも 354.504 s で停止しない。
- review BLOCK と解消: 初回 PR review で、withdrawal だけが媒体末尾の固定 13.6 s を使い、120 s 音源では visual score 314.327 s（第 VIII 章）から早期退潮する不整合を検出した。withdrawal も本 frame の visual score time から導出し、旧開始点 106.4 s と第 IX 章開始点 111.722 s では `shutdown = 0`、score 最後の 13.6 s だけで退潮する組合せ回帰を追加した。
- state exit: 同一 page で ending → main、ending → opening、ending → ended を実行し、3 経路すべて即時 `opacity: 0; visibility: hidden` を確認。退出時の 2.4 s 残留 transition はない。
- reduced motion: desktop ending と screenshot SHA-256 が完全一致（`ee31c8380e9b8f676223c388cb9c07377a6a0640419f0b083152a0c16cfa00d2`）。
- Canvas 不変: opening / section IX / ending framebuffer hash は before と after でそれぞれ `3200649e…` / `15855092…` / `8e2dda6c…` のまま。既存 3×11 deterministic matrix も通過。
- 証拠: before `t-nt-04-ending-before.png`（SHA-256 `7312168b…`）、desktop after `t-nt-04-ending-after.png`（`ee31c838…`）、mobile after `t-nt-04-ending-mobile-after.png`（`d9b1d191…`）、5 capture manifest `t-nt-04-near-black-qa-2026-07-21.json`。
- gates: blocker 修正後に `pnpm lint`、`pnpm typecheck`、`pnpm test`（41 files / 340 tests）、`pnpm build`、`pnpm exhibits:check`、`pnpm qa:ninth-tide`、`pnpm qa:ninth-tide-near-black`（5 captures）を再通過。初回実装 head では `pnpm qa:exhibits` と `pnpm qa:visual` も通過しており、現 head は PR CI で全組を再実行する。
