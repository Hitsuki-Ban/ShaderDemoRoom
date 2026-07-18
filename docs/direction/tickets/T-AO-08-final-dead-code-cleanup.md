# [T-AO-08] AO の確認済みデッド宣言を最終 cleanup で除去する

- 分類: TA
- 優先度: P3
- 評価軸: デッドコード・デッド出力
- 依存: T-AO-01〜07

## 現状(証拠)

liquid fragment の未使用 `uResolution` / `uAudio`、毎フレーム上書きされる初期値、three 0.184 で不要な `extensions.derivatives` 指定が残る。機能票と一緒に掃除すると、視覚差の原因と bisect 境界が曖昧になる。

## 本票の唯一の結果

**全 AO 機能票の後に、静的検索と shader compile で未使用が証明された宣言・代入だけを除去し、出力を不変に保つ。**

## 実施内容

- fragment 内で未参照の uniform 宣言だけを削除する。共有 uniform object は他 shader の利用があるため削除しない。
- 生成直後に無条件で上書きされる初期値は実効初期値へ揃える。
- `extensions.derivatives` は three 0.184 / WebGL2 で不要であることを現行公式仕様で確認してから削除する。
- 挙動変更、最適化、色調整、音声変更は追加しない。

## 受け入れ基準

- 対象識別子の参照監査と shader compile が通る。
- 4相 × freeze × sculpt の決定論キャプチャが cleanup 前後でピクセル一致相当。
- console warning 0、`pnpm build` / `qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- AO の最後に実施し、この票以外へ dead uniform cleanup を混ぜない。
- 改修は ref/ 側で行い exhibits を再生成する。public の手編集は禁止。
