# [T-AO-02] PointerEvent 単一所有者で double-tap freeze を1回だけ発火させる

- 分類: TA
- 優先度: P2
- 評価軸: 対応環境(マウス/タッチ/ペン) / QA担保
- 依存: なし

## 現状(証拠)

`ref/mizu-kokoro-2-source/src/main.js` では freeze の double-tap 判定を `endPointer()` の手動タップ窓と canvas の `dblclick` が別々に所有する。タッチ由来の合成 `dblclick` が発生する環境では、1回の操作で `toggleFreeze()` が2回呼ばれ、freeze→melt が即時に往復する。ロード時に一度だけ評価される `isCoarsePointer` も、ハイブリッド端末の実際の入力種別を表さない。

## 問題

同じジェスチャに2つの所有者があり、どちらが発火したかを後段の時間ガードで推測しなければならない。最大の見せ場である結晶化が入力デバイス依存で消える。

## 改善方向

**double-tap の所有者を `pointerup` の1経路だけにする。**

1. `dblclick` リスナーと、`isCoarsePointer` を使った旧 double-tap 分岐を削除する。`toggleFreeze()` に 300ms デバウンスや重複抑止は追加しない。
2. `pointerup` が受け取る実測 `event.pointerType` ごとに、直前の有効タップの時刻・位置・pointerType を1件だけ保持する。時間窓と移動距離の両方を満たす2回目の `pointerup` だけが `toggleFreeze()` を1回呼ぶ。
3. sculpt/drag と判定された操作、`pointercancel`、異なる pointerType、距離閾値を超えた操作は候補を明示的に破棄する。`pointercancel` から freeze を発火させない。
4. mouse / touch / pen を同じ PointerEvent 状態機械で処理する。別イベント型への互換入口や silent fallback は設けない。

## 受け入れ基準

- Playwright の synthetic PointerEvent で mouse / touch / pen を各2回送ると、1ジェスチャにつき `#matter-state` が LIQUID→CRYSTAL の1遷移だけを行う。次の double-tap で CRYSTAL→LIQUID の1遷移だけを行う。
- 同じシナリオで `toggleFreeze()` の呼び出し回数を計測し、各 double-tap につき厳密に1回である。
- sculpt/drag→release、単発 tap、`pointercancel`、閾値外の2 tap では状態が変わらない。
- ソースに canvas の `dblclick` freeze リスナー、二つ目の double-tap 判定、300ms 重複抑止が残っていないことをコードレビューで確認する。
- 4相で `#matter-state` と核形成位置を確認し、`qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- 改修は `ref/mizu-kokoro-2-source/` で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public の手編集は禁止。
- ブリッジ契約には触れない。
- 時間窓と距離閾値は単一 PointerEvent 状態機械の入力条件であり、二重発火を隠す後段デバウンスとして実装しない。

## 実施報告 (2026-07-19)

- freeze の所有者を `pointerup` の1経路へ統合した。各接触は down 起点からの最大移動量を追跡し、`10px` 以下だけを tap として扱う。直前の有効 tap とは `pointerType`、up-to-up `285ms`、up 座標 `24px` の3条件で照合し、成功時は候補を先に破棄してから `toggleFreeze()` を1回だけ呼ぶ。跨る2 tap の `pointerId` は照合条件にしていない。
- `pointercancel`、drag、異なる `pointerType`、距離超過、球外操作、別 pointer の割り込みは候補を明示的に破棄する。凍結中も同じ状態機械を使うため、mouse / touch / pen のいずれでも crystal / liquid を往復できる。旧 `lastTapTime` 分岐と canvas `dblclick` listener は削除し、debounce・互換イベント・silent fallback は追加していない。`isCoarsePointer` は品質 tier の既存用途だけに残した。
- `pnpm qa:exhibits` は4相で mouse / touch / pen の synthetic PointerEvent を検証し、各 double-tap が `CRYSTAL` または `LIQUID` を厳密に1回だけ書くこと、全体で8回の toggle、4件の合成 `dblclick` が追加発火しないことを確認した。単発+時間切れ、sculpt drag、cancel 後の3回目、距離超過、異種 pointer は全て0遷移だった。4相の凍結 capture では指定 tap 座標に核形成中心が一致し、console error は0件だった。
- 回帰門は `pnpm test` (31 files / 180 tests)、`pnpm lint`、`pnpm typecheck`、`pnpm build`、`pnpm qa:orb`、`pnpm qa:visual` を通過した。決定論 hash は standalone `7441cd852325cb714023e496bd2e3dcf4b06307ee5c8f9f3b26df30513bbc8f6`、showroom `009cdf3b18b976a44b6297accbc44e98ae7de0c575fc433cefd2a5c376eb81b7` のまま。visual QA は14 capture、overflow / HUD overlap / console error なし。
- ref / public の生成 JS は SHA-256 `7df792bc271041aa6137314df5d0f9db7e169b38aef213c86f4bbf9ea29735ca` で一致し、bridge 契約には差分がない。独立 reviewer は material finding なしで APPROVE とした。
