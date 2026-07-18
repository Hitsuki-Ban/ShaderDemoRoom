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
