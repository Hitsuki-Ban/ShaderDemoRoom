# [T-NT-08] 静默周回でも IX→終幕→I の物語遷移を成立させる

- 分類: AD / TA
- 優先度: P3
- 評価軸: ストーリーテリング / 状態機械
- 依存: T-NT-05

## 現状(証拠)

静默入場は約118秒の仮想 musicTime を modulo 周回するが、`updateEnding()` は実 audioReady/duration を条件にする。このため静默経路は終幕を発火せず、第IX章から通常遷移で第I章へ戻る。

## 本票の唯一の結果

**静默 clock も既存の ending state machine を1回通り、IX→shutdown→epilogue→I の順序を決定論的に実行する。**

## 改善方向

1. ending の開始条件を clock source から分離し、audio clock と silent clock が同じ state machine/`finishEnding()` を呼ぶ。
2. silent 専用 ending の複製、IX→I の直接 fallback、preview 専用の別演出は作らない。
3. reduced-motion は同じ状態遷移で duration だけ既存方針に従う。

## 受け入れ基準

- synthetic clock で一巡させ、IX→shutdown→epilogue→I が各1回・同順序で発火する。
- audio 経路と silent 経路の状態列が一致し、二重 ending/直接 wrap がない。
- `?preview=ending` と T-NT-05 11状態が再現し、console error 0。

## 影響範囲・注意

- 状態機械の挙動だけを所有する。near-black の見た目は T-NT-04、audio fetch は T-NT-10。
- ref/ で実装し exhibits を再生成する。
