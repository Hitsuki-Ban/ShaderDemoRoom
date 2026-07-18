# [T-AO-02] タッチ double-tap freeze の二重発火を修正する

- 分類: TA
- 優先度: P2
- 評価軸: 対応環境(モバイル/タッチ) / QA担保
- 依存: なし

## 現状(証拠)

現行 `ref/mizu-kokoro-2-source/src/main.js`(2,715行)で freeze トグルの入口が2系統ある:

1. **タッチ用の手動 double-tap 判定**: `endPointer()`(main.js:2102-2128)の末尾で、sculpt 終了かつ coarse pointer のとき前回タップからの経過が 285ms 未満なら `toggleFreeze()` を呼ぶ:
   - `let lastTapTime = 0;`(main.js:2010)
   - `if (wasSculpting && isCoarsePointer) { ... if (now - lastTapTime < 285) toggleFreeze(currentTouchPoint); lastTapTime = now; }`(main.js:2123-2127)
   - `endPointer` は `pointerup` / `pointercancel` に登録(main.js:2129-2130)。
2. **`dblclick` リスナー**: `canvas.addEventListener('dblclick', ...)` が `toggleFreeze(hit?.localPoint || currentTouchPoint)` を呼ぶ(main.js:2163-2167)。

多くのモバイルブラウザはダブルタップ後に合成 `dblclick` を発火するため、**1回のダブルタップで両経路が発火し、freeze→即 melt(または melt→即 freeze)の2回転**が起きうる。`toggleFreeze()`(main.js:2135-2162)は結晶亀裂再構築・バースト・トースト・ping まで実行するため、二重発火時は演出も二重になる。

補足の現物確認:

- `isCoarsePointer` はロード時に1回だけ評価される matchMedia(main.js:27)。ハイブリッド端末(タッチ+マウス)ではポインタ種別と一致しない場合がある。
- `dblclick` ハンドラは MouseEvent で `pointerType` を持たないため、ハンドラ単体ではタッチ由来かを判別できない。

## 問題

CRYSTAL·NUCLEATION(freeze)は visual-refs.json で「サーフェス構造を変える唯一の状態・最大の単一フレームデルタ = 来場者の足を止める筆頭」と評価された本展示最大の見せ場。それがタッチデバイスでは double-tap の度に freeze→即 melt で潰れうる。モバイル来場者にとってショーストッパーが壊れているに等しい。

## 改善方向

freeze トグルの発火権限を一本化する:

1. **直近ポインタ種別の記録**: `pointerdown` で `event.pointerType` を変数(例 `lastPointerType`)に保存し、`dblclick` ハンドラの先頭で `lastPointerType !== 'mouse'` なら early return(タッチ/ペンは endPointer 経路が担当、マウスは dblclick 経路が担当)。ロード時固定の `isCoarsePointer` ではなくイベント実測を使う。
2. **保険のデバウンス**: `toggleFreeze()` 側に「前回トグルから 300ms 以内の再トグルは無視」のガードを追加(手動判定と合成 dblclick のタイミング揺れ、および OS 側 dblclick 間隔設定の差異への防御)。285ms 判定窓との整合を取ること。
3. 端末側ジェスチャとの競合確認: canvas の `touch-action` 設定を確認し、double-tap zoom が発生しないこと(発生する場合は `touch-action: manipulation` 等を併せて検討)。
4. 手動判定を残す理由(pointer capture 中は環境により dblclick が飛ばないケースがある)をコードコメントに1行残し、将来の「dblclick に一本化すればよいのでは」という再発見を防ぐ。

## 受け入れ基準

- タッチエミュレーション(Playwright touch)および実機で、ダブルタップ1回につき freeze/melt がちょうど1回転する(HUD の `#matter-state` が LIQUID→CRYSTAL→(次のダブルタップで)LIQUID と遷移し、往復しない)。
- マウスのダブルクリック挙動は無変化(freeze/melt 1回転、ヒット点核形成も維持)。
- sculpt(長押しドラッグ)→ release がダブルタップと誤認されない(既存の `wasSculpting` 条件の挙動を維持)。
- 可能なら `qa:exhibits` にタッチ double-tap シナリオ(synthetic pointer events で2連タップ→ freeze 状態を assert)を追加し、回帰を恒常 gate 化する。
- 4相すべてで確認(VOID は posterize が乗るため視認確認しづらい — `#matter-state` テキストで判定)。

## 影響範囲・注意

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。
- `toggleFreeze` へのガード追加は Space パルスや自動展示モードの経路には影響しない(freeze の入口は上記2系統のみ)ことを確認済みだが、実装時に再確認する。
- `qa:exhibits`(`scripts/exhibit-smoke.mjs`)は standalone freeze シナリオを hard assert している(T-EMB-02 完了レポート参照)。デバウンス導入でテストのトグル間隔が 300ms を割る場合、テスト側の待機を調整する。
- ブリッジ契約(envelope / capabilities)には触れない。
