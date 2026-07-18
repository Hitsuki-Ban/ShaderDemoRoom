# [T-NT-07] resize 後の品質 tier と定常フレームコストを正しく更新する

- 分類: TA
- 優先度: P3
- 評価軸: 対応環境 / フレームバジェット
- 依存: T-NT-05

## 現状(証拠)

`isMobile` はロード時の `isCoarse || innerWidth < 820` で固定され、resize は pixelRatio の一部しか再評価しない。また `updateCamera()` の毎フレーム `Vector3` 生成と、値が変わらない CSS custom property の毎フレーム書き込みが定常コストを作る。

## 本票の唯一の結果

**viewport/DPR 変更後も現在の品質 tier が一意に再計算され、静止フレームで不要な allocation/style write が0になる。**

## 改善方向

1. tier 判定を単一関数にし、初期化と resize/DPR change が同じ現在値を使う。ロード時 const や旧 tier 維持 fallback は残さない。
2. tier 変更時は renderer、composer、pixelRatio と tier 依存 geometry/particle assets を同じ transaction で再構築・dispose する。部分更新や reload 案内へ逃がさない。
3. camera target は既存 scratch vector を再利用する。CSS property は整形後の前回値と異なる時だけ書く。

## 受け入れ基準

- 820px 閾値と DPR を往復すると desktop/mobile の全 tier 所有値が現在条件へ一致し、旧 asset が dispose される。
- 静止状態でフレーム毎 `Vector3` allocation 0、変化のない CSS `setProperty` 0。
- T-NT-05 の11状態に意図しない視覚差がなく、同一環境 frameTimeMs が退行しない。
- resize stress 後も console error 0、`qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- performance/quality だけを所有する。音声、静默周回、raycast、dead code は扱わない。
- ref/ で実装し exhibits を再生成する。
