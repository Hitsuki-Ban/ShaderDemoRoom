# [T-AO-03] sculpt 性能の baseline/profile を確立し最適化対象を決定する

- 分類: TA / QA
- 優先度: P1
- 評価軸: フレームバジェット / 証拠の再現性
- 依存: なし(T-SH-03 の計測プロトコル v1 と T-EMB-02 の bridge stats は完了済み)

## 現状(証拠)

- 既存資料には sculpt 中 22 FPS の観測があるが、GPU・ブラウザ・解像度・warm-up・測定窓を揃えたパス別 baseline はない。
- `IcosahedronGeometry(1.65, 5)` は 720 tris/シェルであり、過去の「約20k tris」見積りは誤りだった。頂点シェーダを主因とみなす証拠はない。
- 候補コストは屈折用フルシーン描画、メイン描画、bloom、SMAA、pixel ratio、屈折 RT、`preserveDrawingBuffer`、液体/outline の変位評価に分散している。

## 問題

baseline がない状態で shader/outline を変更すると、視覚品質を落としても本当のボトルネックを改善しない危険がある。現在の証拠は最適化実装を正当化しない。

## 本票の唯一の結果

**同一環境で再実行できる sculpt baseline/profile を保存し、次の最適化票が扱う単一ボトルネックを証拠で決定する。** 本票では製品コード、shader、outline、品質ノブを変更しない。

## 実施内容

1. T-SH-03 protocol v1 に従い、環境・GPU renderer raw string・viewport・DPR・品質 tier を固定し、5秒 warm-up + 15秒 measurement を行う。
2. idle と synthetic pointer による sculpt 保持をそれぞれ計測し、median / p95 frameTimeMs、fps、frame count を保存する。
3. 一時ビルドだけで SMAA、bloom、`preserveDrawingBuffer`、屈折 RT scale、pixel ratio を1変数ずつ切り替える。Spector.js または Chrome tracing で屈折パス、main、post の内訳を取る。一時変更はコミットしない。
4. shader/outline の評価が必要なら、同じ一時ビルドでのみ測る。baseline/profile 成果物とレビュー結論が揃うまで恒久変更を始めない。
5. `docs/direction/captures/orb-profile-<date>.json` と要約 md に、生データ、再現手順、最大寄与パス、次票で扱う単一処置を記録する。

## ハードゲート

- **本票が完了する前に、AO の shader、outline、屈折、post chain、pixel ratio、`preserveDrawingBuffer` を最適化目的で変更してはならない。**
- 次の最適化票は profile で最大寄与が確認された1項目だけを所有する。候補をまとめた実装票や「念のため」の複数調整は作らない。
- 必須の計測環境・renderer 情報が得られない場合は推測値で続行せず fail fast とする。

## 受け入れ基準

- baseline/profile JSON と要約 md がコミットされ、再現コマンド、環境、idle/sculpt の全測定値、無効化マトリクス、パス内訳を含む。
- 同一条件を2回走らせ、結論が再現する。
- 最大寄与パスと次票の単一処置が数値で説明され、独立レビューで承認されている。
- `git diff` で本票による製品コード・shader・outline の恒久変更がない。

## 影響範囲・注意

- プロファイル用の一時ビルドはコミットしない。
- 環境を跨いだ FPS 比較や絶対 FPS hard gate を置かない。
- bridge stats の schema/cadence は変更しない。
