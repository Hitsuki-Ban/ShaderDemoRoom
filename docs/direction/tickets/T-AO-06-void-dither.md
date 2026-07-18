# [T-AO-06] VOID の量子化バンドを点描ディザへ置き換える

- 分類: AD / TA
- 優先度: P3
- 評価軸: 値構造(VOID) / 描画正当性
- 依存: T-AO-03(profile/baseline gate。ディザ前後のフレームタイム証拠を同条件で取る)

## 現状(証拠)

- VOID は FinalGradeShader で `levels = mix(256.0, 10.0, uPosterize)`、`floor(color * levels + 0.5) / levels` により約10階調へ量子化される。
- 既存 film grain は量子化後の質感ノイズであり、量子化境界を面積比で分解するディザではない。
- 無彩色に近いオーブと近黒背景では、ハードな階調境界が VOID の印刷物的な画面を「低品質な縞」に見せる。

## 本票の唯一の結果

**VOID の posterize 境界を、平均値を保つスクリーントーン状の IGN ディザへ変える。** 他モード共通の出力ディザ、SURGE 調整、音声挙動、デッドコード掃除は扱わない。

## 改善方向

1. VOID の posterize 量子化の内側だけに、固定座標の IGN を中心化して注入する。1量子化 step を超えない振幅とし、平均輝度を変えない。
2. film grain は質感として維持し、ディザと役割を混ぜない。
3. 時間アニメーションや代替 blue-noise 経路は追加しない。単一の決定論 IGN 実装とする。

## 受け入れ基準

- VOID 静止画のオーブと背景で、連続していた量子化境界が点描の面積比へ分解している(before/after 拡大比較)。
- 対象領域の平均輝度シフトが ±0.5/255 以内である。
- CALM / SURGE / BLOOM の shader 出力はピクセル一致相当である。
- 固定 preview の連続2回キャプチャが一致し、T-AO-03 と同一環境で frameTimeMs 退行が5%以内。
- `qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- 改修は `ref/mizu-kokoro-2-source/` で行い、`pnpm exhibits:build` で public を再生成する。public の手編集は禁止。
- SURGE の値分離は T-AO-07、デッド宣言の最終掃除は T-AO-08 が所有する。
- オンライン Pages 展示の現在の製品境界にない kiosk/idle 音声エチケットは活動中バッチから除外し、本票にも別票にも含めない。
