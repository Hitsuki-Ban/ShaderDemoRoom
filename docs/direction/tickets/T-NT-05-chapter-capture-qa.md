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

1. `capture.mjs` を scripts/ の公式コマンドへ移し、相対出力 `output/playwright/` と決定論的な `__NINTH_TIDE_STEP__` を使う。絶対パス、固定 sleep、旧 FPS チップ採取を削除する。
2. preview mode では起動時の animation loop を停止し、hook 呼び出しごとに Timer、scene/audio state、synthetic clock、pulse/random seed、camera、postprocess を既知の初期状態へ戻す。hook は要求された章と固定 timestamp を適用して `scheduleNext:false` の単一 frameを**ちょうど1回**描画し、完了後も停止したまま Promise を解決する。`requestAnimationFrame` を予約せず、現在の `animate()` を再入してはならない。
3. opening / section 0..8 / ending の11状態について、canvas 非全黒、章番号、対象領域の平均輝度レンジ、暖色優勢が第V章だけであることを assert する。
4. 同一 build に対して各状態を初期化から3回実行し、各状態の完全一致する hash と測定値を保存する。1 hook call = 1 render、queued rAF = 0、同じ timestamp の連続呼び出しで state/hash が一致することを挙動テストでも固定する。
5. viewport 1440×900 / DPR 1 と章別固定 timestamp で `hit-targets-v1.json` を作る。section 0..8 ごとに silhouette 中心、70% 半径の上下左右4 positive、115% 半径の上下左右4 negativeの画面座標と beforeHit を保存する。section 7/8 は現行で `beforeHit=false` となる横方向 edge positive を最低1点ずつ含め、実装前 artifact として独立レビューで承認する。
6. `docs/direction/` にコマンド、環境、11状態の hash/metrics、hit fixture、再較正手順を持つ QA log を作る。

## ハードゲート

- **T-NT-01〜04、T-NT-06〜11 を含む Ninth Tide の shader、visual、interaction、audio、performance 実装は、本票の baseline 取得と独立レビューが完了するまで着手しない。**
- 後続票は変更前に11状態 baseline を保存し、変更後に同じ gate を再実行する。
- 必須 preview hook、build、renderer 情報が欠ける場合は sleep や手動目視へ fallback せず fail fast とする。

## 受け入れ基準

- 公式コマンドが headless で11枚を生成し、章番号・非全黒・輝度・色相の assert と console error 0 で完走する。
- 同一 build の初期化からの連続3回で hash と測定値が一致し、各 hook 呼び出し後に rAF が0件、renderer 呼び出しが1回である。T-NT-02 前にピクセル揺れが残る場合は本票を未完了とし、許容レンジだけで完了扱いにしない。
- `hit-targets-v1.json` が9章すべての固定 positive/negative 座標を持ち、section 7/8 の現行失敗点が `beforeHit=false` として再現する。
- QA log に環境、renderer raw string、コマンド、hash、metrics が記録され、独立レビュー済み。
- Pages workflow に gate を組み込み、`pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- QA 基盤と証拠取得だけを扱い、展示の見た目や preview の意味論を変更しない。
- レンジ定数は1ファイルに集約するが、未知環境を通す silent tolerance や renderer 別 fallback は設けない。CI renderer を明示的に固定する。
