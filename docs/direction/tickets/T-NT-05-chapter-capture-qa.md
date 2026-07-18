# [T-NT-05] 章別決定論キャプチャを実装変更前の証拠門にする

- 分類: QA
- 優先度: P1
- 評価軸: QA担保 / ピクセル証拠の再現性
- 依存: T-EMB-02 / T-QA-02(完了済み)

## 現状(証拠)

- `qa:exhibits` は bridge と standalone の9章を DOM で確認するが、canvas のピクセル証拠を取らない。
- `docs/direction/captures/capture.mjs` は絶対パス、固定 sleep、assert なしの手動スクリプトであり、決定論フック `window.__NINTH_TIDE_STEP__` を使わない。
- opening + 9章 + ending の既存 PNG は一度きりの証拠で、同一実装を再実行して一致する保証がない。

## 本票の唯一の結果

**opening + 9章 + ending の11状態を決定論的に取得・検査する公式 QA gate を作り、後続 NT 実装の before baseline を固定する。** preview の既定章変更は T-NT-11 が所有する。

## 実施内容

1. `capture.mjs` を scripts/ の公式コマンドへ移し、相対出力 `output/playwright/` と `__NINTH_TIDE_STEP__` の固定 step を使う。絶対パス、固定 sleep、旧 FPS チップ採取を削除する。
2. opening / section 0..8 / ending の11状態について、canvas 非全黒、章番号、対象領域の平均輝度レンジ、暖色優勢が第V章だけであることを assert する。
3. 同一 build に対して2回実行し、各状態の hash と測定値を保存する。GPU差を跨ぐ厳密 baseline ではなく、同一 CI/runtime 内の再現性 gate とする。
4. `docs/direction/` にコマンド、環境、11状態の hash/metrics、再較正手順を持つ QA log を作る。

## ハードゲート

- **T-NT-01〜04、T-NT-06〜11 を含む Ninth Tide の shader、visual、interaction、audio、performance 実装は、本票の baseline 取得と独立レビューが完了するまで着手しない。**
- 後続票は変更前に11状態 baseline を保存し、変更後に同じ gate を再実行する。
- 必須 preview hook、build、renderer 情報が欠ける場合は sleep や手動目視へ fallback せず fail fast とする。

## 受け入れ基準

- 公式コマンドが headless で11枚を生成し、章番号・非全黒・輝度・色相の assert と console error 0 で完走する。
- 同一 build の連続2回で hash と測定値が一致する。T-NT-02 前にドライバ由来のピクセル揺れが残る場合は本票を未完了とし、許容レンジだけで完了扱いにしない。
- QA log に環境、renderer raw string、コマンド、hash、metrics が記録され、独立レビュー済み。
- Pages workflow に gate を組み込み、`pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- QA 基盤と証拠取得だけを扱い、展示の見た目や preview の意味論を変更しない。
- レンジ定数は1ファイルに集約するが、未知環境を通す silent tolerance や renderer 別 fallback は設けない。CI renderer を明示的に固定する。
