# [T-AO-04] exhibit内HUDの FPS 表示を完成させ、証拠・資料を現状へ同期する

- 分類: TA
- 優先度: P2
- 評価軸: フレームバジェット(HUDのFPS表示は正確か) / QA担保
- 依存: T-EMB-02 / T-SH-03(いずれも完了済み — 本票はその残作業)

## 現状(証拠)

第1バッチの T-SH-03 では「MIZU//KOKORO exhibit 内 HUD の FPS『—』表示修理(ref/ fork 側)」が後続作業として委譲された。**現行 ref HEAD を照合した結果、主要部分は T-EMB-02 で既に実装済み**:

- **exhibit 内 HUD の FPS 表示は配線済み**: `animate()` が 500ms 窓で実測サンプリングし(main.js:2685-2696)、`fpsEl.textContent = `${fps} FPS``(main.js:2692)で `#fps`(index.html:29 の FRAME 欄)を更新する。カルテ記載の「fpsLastUpdate は書くだけで読まれない」デッドコードは現行に存在しない(stats 実装に置換済み)。
- **シェル telemetry への stats 供給も実装済み**: bridge capabilities `['pause','stats','set-mode','set-quality']`(main.js:35)、`publishRuntimeStats()` が `{fps, frameTimeMs, frameCount, paused}` を 500ms cadence で親へ送信(main.js:2340-2346, 2693)、ready ハンドシェイク(main.js:2710-2713)。shell 側は `src/shared/embedded/bridge.ts`(`EmbeddedRoomStats` :15-20)で strict parse し TelemetryPanel が実測2指標を表示する(T-EMB-02 完了レポートで検証済み)。

**残っている問題**(本票のスコープ):

1. **pause 中の HUD が stale**: `synchronizePauseState()` の pause 経路(main.js:2396-2420)は shell へ `publishRuntimeStats(true)` を送る(main.js:2407)が、exhibit 内 `#fps` は更新しない。shell の `set-paused` は可視状態でも送られうるため、**一時停止中の HUD が直前の「57 FPS」等を表示し続ける**。`#fps` の更新箇所は main.js:2692 の1箇所のみ(grep 確認済み)。
2. **初期表示は `-- FPS`**(index.html:29)。最初の 500ms サンプルまでは dash のまま。非表示タブでロードされた場合はサンプルが走らず dash が継続する(挙動として妥当だが未文書化)。
3. **証拠・資料が古いまま**: 原典 `preview.png` と visual-current.json 批評(「FPS 欄が『—』表示で壊れて見える」)、カルテの P1 種(dossier-anime-liquid-orb.md「[P1] FPS 表示が「—」のまま」および「シェル⇔iframe ブリッジ不在」節)は修理前の記述。ヒーローショット再取得と資料訂正が未了。

## 問題

「60fps 約束 vs 壊れた FPS 表示」は showroom 全体の信頼毀損テーマ(SH-1)の一部。実装は直ったのに、pause 中の stale 表示という新しい不正確さが残り、ヒーローショット・カルテ・批評 JSON は「壊れている」と言い続けている。表示の正確さと証拠の鮮度を揃えて初めてこの項目を閉じられる。

## 改善方向

1. **pause 状態の HUD 反映**(ref/ 側): `synchronizePauseState()` の pause 経路で `#fps` を `PAUSED`(または `-- FPS` へのリセット)に更新し、resume 経路でサンプル窓リセット後の初回更新まで dash を表示する。表記はラボ HUD の文法(モノスペース・英大文字)に合わせる。
2. **仕様の明文化**: 「FRAME 欄 = 直近 500ms 窓の実測平均。paused 中は PAUSED。初回サンプルまでは --」を ref README(または UPGRADE_NOTES)に1段落追記。
3. **QA 化**: `qa:exhibits` に「warm-up 後の `#fps` テキストが `/^\d+ FPS$/` にマッチ」「`set-paused(true)` 後に PAUSED 表記、resume 後に数値へ復帰」の assert を追加(bridge stats の assert は既存なので HUD 側の1〜2 assert を足すだけ)。
4. **証拠の再取得と資料訂正**:
   - ヒーローショット/状態キャプチャを再取得し、FRAME 欄が実数値の状態で `preview.png` 相当を更新するか判断(原典 preview.png の差し替えは fork 運用上可能だが、原典の記録性を尊重して別名保存でも可 — 実装時に判断し本票へ記録)。
   - dossier-anime-liquid-orb.md の該当節(P1 種2件・リスク1「通信チャネル皆無」・「postMessage ブリッジなし」)に現状追記(訂正日付き)。

## 受け入れ基準

- 実行中: FRAME 欄が 500ms ごとに実測値へ更新される(`-- FPS` が warm-up 後に残らない)。
- `set-paused(true)`(shell から)およびタブ非表示で FRAME 欄が PAUSED(または dash)になり、stale な数値が残らない。resume で数値表示へ復帰する。
- shell telemetry の実測2指標(fps / frameTimeMs)と live/paused 状態の表示が引き続き機能する(T-EMB-02 の gate を再走して確認)。
- `qa:exhibits` に HUD FPS の assert が追加され、恒常 gate として通る。
- dossier / 批評由来の「FPS が—のまま」という記述に訂正注記が入り、再取得したキャプチャが captures/ または ref/docs/screenshots に保存されている。

## 影響範囲・注意

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。
- **bridge 契約(envelope / capabilities / stats スキーマ)には触れない**。qa:exhibits と shell 側 strict parser(bridge.ts)が exact shape を hard assert しており、変更は契約バージョニング(v2)の話になる。本票は HUD 表示と文書のみ。
- stats の cadence(500ms)や計測方式を変えないこと。T-SH-03 の telemetry protocol v1 参照記録・5% overhead gate と整合が取れている現状を壊さない。
- pause 中に `publishRuntimeStats(true)` が送る fps 値は「停止直前の最終サンプル」であり、shell 側は paused フラグで区別している — HUD 側も同じ意味論(paused 表示が数値に優先)に揃える。

## 実施報告 (2026-07-20)

- `synchronizePauseState()` の単一 lifecycle に HUD 表示を揃えた。host pause または `document.hidden` で即座に `PAUSED`、aggregate pause 解除時は既存サンプル窓のリセットと同時に `-- FPS`、新しい 500ms wall-clock 窓が完成してから `NN FPS` を表示する。bridge v1 envelope / capabilities / stats exact shape、`lastRuntimeFps` / `lastRuntimeFrameTimeMs`、cadence と frameCount の意味論は変更していない。
- `qa:exhibits` は Orb の host pause と visibility の両方で、warm-up 後の数値、`PAUSED`、750ms の frameCount 停止、復帰履歴 `PAUSED → -- FPS → 数値` を MutationObserver で恒常 gate 化した。最新版実走は host `PAUSED → -- FPS → 9/7 FPS`、visibility `PAUSED → -- FPS → 9/7 FPS`、console error 0。既存の wall-clock telemetry、audio intent、pause race、iframe identity、Ninth Tide、4相 × mouse/touch/pen freeze/melt、無効 gesture も同時に通過した。
- ref README に FRAME の500ms平均、初回/復帰 warm-up、pause/hidden、software renderer の非代表性を明文化した。旧 `visual-current.json` 等は repository / git history に存在しないため、追跡可能な Orb / shell dossier に 2026-07-20 訂正を入れ、bridge、CI、ref 追跡、既完了の double-tap / volume freeze も現状へ同期した。
- 原典 `preview.png` は `docs/screenshots/v2-calm-water.png` と同一 SHA-256 の歴史リファレンスなので差し替えず保持した。新しい 1440×900 / DPR 1 の実行証拠を `docs/direction/captures/t-ao-04-orb-hud-running.png`、pause 証拠を `docs/direction/captures/t-ao-04-orb-hud-paused.png` に保存し、loading overlay なし・FRAME がそれぞれ数値 / `PAUSED` であることを目視確認した。画像内の低 FPS は SwiftShader の互換性値であり性能 golden ではない。
- 回帰門は `pnpm lint`、`pnpm typecheck`、`pnpm test` (31 files / 180 tests)、`pnpm build:shell`、`pnpm qa:exhibits`、`pnpm qa:orb`、`pnpm qa:visual` を通過した。Orb full-scene hash は standalone `7441cd852325cb714023e496bd2e3dcf4b06307ee5c8f9f3b26df30513bbc8f6`、showroom `009cdf3b18b976a44b6297accbc44e98ae7de0c575fc433cefd2a5c376eb81b7` のまま。生成 JS は ref / public とも SHA-256 `91748fb875eaac9a1a7214436733569f486197a342578c69a266a731a6d9da2c` で一致した。独立 reviewer は material finding なしで APPROVE、独立 verifier は同じ HUD sequence、180 tests、build、Orb hash、生成物同期と証拠を再確認して PASS とした。
