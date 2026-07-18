# [T-NT-09] 後半章の core hit target を可視形状へ一致させる

- 分類: UX / TA
- 優先度: P3
- 評価軸: モデル一貫性 / インタラクション
- 依存: T-NT-05

## 現状(証拠)

click/hover は可視 `core` 自体を raycast する。第VIII章 `[1.46,0.62,0.34]`、第IX章 `[0.48,0.48,0.48]` の scale により、虹彩/真珠として見える領域と hit area が一致せず操作が外れる。

## 本票の唯一の結果

**全9章で、同じ可視 core silhouette 内の座標が click と hover の双方に命中する。**

## 改善方向

1. 章別 shape と呼吸 scale から毎フレーム1つの raycast 用 proxy transform を更新する。
2. click と hover は同じ proxy raycast 関数だけを使う。可視 core への別 fallback は残さない。
3. proxy は描画せず renderOrder 網へ参加させない。hit area は可視 silhouette の検収座標から定義し、画面全体を覆う最小半径などの guessed default を置かない。

## 受け入れ基準

- section 0..8 の登録座標で click/hover が一致し、特に section 7/8 の現行失敗座標が通る。
- silhouette 外の負例では反応しない。
- archive toggle、cursor、pulse origin が同じ hit 結果を使う。
- T-NT-05 11状態の見た目が不変、`qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- interaction/visual hit consistency だけを所有する。未参照 marker の削除は最終 T-NT-06。
- ref/ で実装し exhibits を再生成する。
