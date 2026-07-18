# [T-AO-07] SURGE mid パレットを決定論的に較正する

- 分類: AD
- 優先度: P3
- 評価軸: 値構造 / 4相の判別性
- 依存: T-AO-03(profile/baseline gate)

## 現状(証拠)

コードの SURGE は deep `#1b0923` / mid `#ec3b9b` / light `#fff7df` / accent `#ffb72f` だが、既存批評は実効画面を「muted lavender-gray」と記録し、4相で最も値分離が弱いと評価する。パレット定数とトーンマップ後の画面の差は未計測である。

## 本票の唯一の結果

**固定測定で SURGE の `modes[].mid` 1値を必ず明るくし、showroom と standalone の両方で同じグレースケール分離閾値を満たす最小の採用値をコミットする。**

## 実施内容

1. T-AO-03 の `__MIZU_KOKORO_STEP__` で通常rAFを停止し、viewport 1440×900 / DPR 1、SURGE、freeze off、固定 timestamp の1 frameを showroom / standalone で各3回キャプチャする。各 capture は初期状態からhookを呼び、3 hashの完全一致を測定の前提にする。正規化 ROI は orb=(x 0.40..0.60, y 0.28..0.66)、background=(0.05..0.20, 0.15..0.35)、dais=(0.35..0.65, 0.70..0.88) とし、Rec.709 luma の median/mean/p90を保存する。
2. `modes[].mid` の現行 `#ec3b9b` を OKLab へ変換し a/b を固定、L を現行値より **+0.02** した候補から0.02刻み・最大0.90まで単調に上げる。両 route で全閾値を初めて満たす単一候補を採用し、別の色、rim、露出、shader 定数は変更しない。候補が尽きた場合は他フィールドへ切り替えず本票を fail とする。
3. 採用した hex、全候補の測定値、before/after キャプチャを保存する。実装前に調整不要と判定して閉じる経路や、次の色を実装時に選び直す経路は設けない。

## 受け入れ基準

- before/after キャプチャと全候補の測定値が保存され、採用値が「現行より明るい最小L候補」であることを再計算できる。
- showroom / standalone の両方で `|orb median − background median| ≥ 32/255`、`|dais median − background median| ≥ 18/255`、`orb p90 − orb median ≥ 36/255` を満たす。
- 160px幅のグレースケールサムネイルで SURGE と CALM/BLOOM/VOID の各 mean absolute luma difference が ≥8/255 である。
- 4相 × freeze の回帰比較と `qa:visual` が通る。

## 影響範囲・注意

- 改修する場合は ref/ 側で行い exhibits を再生成する。
- `modes[].mid` 以外の色、rim、露出を動かさず、候補探索の順序や閾値を実装中に変更しない。
