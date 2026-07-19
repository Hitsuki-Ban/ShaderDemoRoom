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

**同一環境で再実行できる sculpt baseline/profile と AO 専用の決定論 capture hook を保存し、次の最適化票が扱う単一ボトルネックを証拠で決定する。** 本票では見た目、shader、outline、品質ノブを変更しない。

## 実施内容

1. T-SH-03 protocol v1 に従い、環境・GPU renderer raw string・viewport・DPR・品質 tier を固定し、5秒 warm-up + 15秒 measurement を行う。
2. idle と synthetic pointer による sculpt 保持をそれぞれ計測し、median / p95 frameTimeMs、fps、frame count を保存する。
3. 一時ビルドだけで SMAA、bloom、`preserveDrawingBuffer`、屈折 RT scale、pixel ratio を1変数ずつ切り替える。Spector.js または Chrome tracing で屈折パス、main、post の内訳を取る。一時変更はコミットしない。
4. shader/outline の評価が必要なら、同じ一時ビルドでのみ測る。baseline/profile 成果物とレビュー結論が揃うまで恒久変更を始めない。
5. `?qa=1` だけで有効な `window.__MIZU_KOKORO_STEP__({ mode, freezeProgress, timestamp })` を追加する。standalone / showroom iframeのどちらでも QA query がある場合は通常rAFを停止し、hookごとに Timer、scene/audio state、camera、postprocess seedを初期化して指定 timestamp の1 frameだけを描画し、rAFを予約せず停止状態のまま Promise を解決する。同一入力3回の exact hash、1 call=1 render、queued rAF=0を挙動テストで固定する。QA query がない通常起動ではhookを公開しない。
6. `docs/direction/captures/orb-profile-<date>.json` と要約 md に、生データ、再現手順、最大寄与パス、次票で扱う単一処置、capture hookのhashを記録する。

## ハードゲート

- **本票が完了する前に、AO の shader、outline、屈折、post chain、pixel ratio、`preserveDrawingBuffer` を最適化目的で変更してはならない。**
- 次の最適化票は profile で最大寄与が確認された1項目だけを所有する。候補をまとめた実装票や「念のため」の複数調整は作らない。
- 必須の計測環境・renderer 情報が得られない場合は推測値で続行せず fail fast とする。

## 受け入れ基準

- baseline/profile JSON と要約 md がコミットされ、再現コマンド、環境、idle/sculpt の全測定値、無効化マトリクス、パス内訳を含む。
- 同一条件を2回走らせ、profile結論が再現する。決定論hookは同一入力3回でhash一致、1 call=1 render、queued rAF=0を満たす。
- 最大寄与パスと次票の単一処置が数値で説明され、独立レビューで承認されている。
- `git diff` で本票による製品の見た目・shader・outline の恒久変更がなく、恒久コード差分は `?qa=1` の決定論hookとそのテストに限定される。

## 影響範囲・注意

- プロファイル用の一時ビルドはコミットしない。
- 環境を跨いだ FPS 比較や絶対 FPS hard gate を置かない。
- bridge stats の schema/cadence は変更しない。

## 実施報告 (2026-07-19)

- 決定論 hook と独立 QA gate を source revision `e26d4c7a8e71e493fa2902446d48139333cd1f1b` で実装した。`?qa=1` が1個だけ存在する standalone / showroom iframe で通常 rAF を停止し、strict input、固定初期乱数、scene/audio/camera/post state の再初期化、1 logical frame、canonical RGBA8 SHA-256 を提供する。通常 URL と重複 `qa` query では hook を公開しない。
- `pnpm qa:orb` は standalone / showroom それぞれ同一入力3回の exact hash 一致、`logicalFrameDelta=1`、app/独立 audit の queued rAF 0、Promise 解決後の追加 WebGL draw 0 を確認した。
- RTX 4070 Ti / Chrome 150 / 1440×900 / DPR 2 / high quality で、6条件×idle/sculpt×2逆順 round の24 cadence、14 GPU timer-query breakdown、14 Chrome traceを取得した。全 cadence は headless Chrome の約164.9 FPS ceiling に張り付いたため、FPSを変体順位付けには使用しなかった。
- `bloom-off` だけが sculpt の summed pass GPU median を両 round で低下させた (20.08% / 56.20%)。同変体の round 間総値は1.0839 / 1.0860 ms (0.19%差)。SMAA、`preserveDrawingBuffer`、refraction RT scale、pixel ratio は改善方向がround間で反転したため棄却した。
- 最大寄与パスは `UnrealBloomPass`。次の最適化票が所有する単一処置は **現行見た目を決定論 visual gate で維持しながら bloom working resolution を下げること** とする。本票では bloom、shader、outline、refraction、post順序、pixel ratio、context attributes を恒久変更していない。
- 証拠: [raw JSON](../captures/orb-profile-2026-07-19.json) / [要約・再現手順](../captures/orb-profile-2026-07-19.md)
