# [T-GO-01] Glass Optics の FPS 崩落を計測し transmission コストを是正する

- 分類: TA
- 優先度: P1
- 評価軸: フレームバジェット / renderer 状態所有権
- 依存: なし(第1バッチ T-SH-01/02/03 完了が前提。Glass バッチの最初に実施)

## 現状(証拠)

- **ソフトウェア GL での崩落実測**: `docs/direction/captures/fps-samples-2026-07-18.json` — headless Chromium(SwiftShader 系)で glass-optics は入場直後 17 FPS → 2-4 FPS へ崩落(サンプル列 `17, 2, 4, 4, 4, 4, 4, 4`)。voxel-water は同環境で 16-17 FPS 安定。draw calls は両ルーム 19 一定。T-SH-03 完了レポートの再計測でも glass は 8 窓 3.09-4.62 FPS(全 19 calls)で再現している。
- **実 GPU の基準値が未記録**: T-SH-03 の `pnpm qa:telemetry-reference`(schema v1、`docs/direction/captures/telemetry-reference-2026-07-18.json`)は voxel-water のみを計測しており、glass-optics の hardware 分類での参考値が存在しない。
- **崩落は無操作で発生する**: fps-samples の手法は「入場 2.5s 待機後 1s 間隔サンプル」でスライダー操作を含まない。第一容疑は MeshPhysicalMaterial `transmission: 1` によるフルシーン transmission バッファ描画(`src/rooms/glass-optics/runtime.ts:72`)である。
- **計測基盤は整備済み**: RoomStats は fps / frameTimeMs / frameTimeP95Ms / drawCalls / trianglesAvg / textures / geometries / programs / environment を持ち(`src/rooms/types.ts:64-77`)、HUD の `data-telemetry-json` から QA が未丸め値を読める。

## 問題

公開ページが一桁 FPS を表示する一方、実 GPU 基準値と原因別コストがないため、修正効果も回帰も判定できない。ルームが renderer グローバルを直接変更して性能を合わせる実装は T-SH-02 の所有権契約にも反する。

## 改善方向

1. **glass の基準値取得**: `scripts/telemetry-reference.mjs` を room 指定対応にし、5s warm-up + 15s measurement で hardware / software 両分類の glass capture を `docs/direction/captures/` に記録する。hardware capture は classification=`hardware` を hard assert する。Performance パネル等で transmission パスと FX オーバードローの内訳を一度採取し、主因を記録する。
2. **宣言的 `rendererProfile`**: room registry の Glass Optics エントリに、現在必要な renderer 差分として `transmissionResolutionScale` を持つ型付き・検証可能な `rendererProfile` を宣言する。シェルは profile を validate → session 開始時に apply → `finally` で `RendererStateSnapshot` へ restore する。profile 欠落・未知フィールド・範囲外値はエラーとし、environment 分類による別値やルーム内からの直接変更は設けない。
3. **transmission コスト修正**: 計測で主因と確認したうえで `transmissionResolutionScale = 0.5` を唯一の採用値として適用し、同一プロトコルで再計測する。0.33 などの自動縮退、software/hardware 別の silent fallback は追加しない。

## 受け入れ基準

- glass-optics の telemetry reference capture が hardware / software 両分類で存在し、renderer string、classification、schema version、計測時間が記録されていること。
- hardware 分類で 60 FPS、最低 30 FPS を満たすこと。満たさない場合は本票を完了扱いにせず、原因を追加計測して同じ修正経路を詰めること。
- software 分類の定常値が現行 2-4 FPS から 2 倍以上に改善すること。voxel-water の同一プロトコル値に ±5% を超える回帰がないこと。
- Glass 入場中だけ `transmissionResolutionScale === 0.5`、退出直後は snapshot 値へ復帰することを `pnpm qa:renderer` 系シナリオで検証すること。
- 未知/範囲外 rendererProfile が検証で失敗し、環境分類による値分岐が存在しないことをテストで固定すること。
- draw calls 19 を維持し、`pnpm test` / `pnpm lint` / `pnpm build` / `pnpm qa:visual` を通過すること。

## 影響範囲・注意

- renderer profile の capture/apply/restore は `src/shared/three/` 側で完結させ、`RoomRuntimeContext.renderer` の絞られた `{ render }` 契約を広げない。
- `RendererStateSnapshot` は `transmissionResolutionScale` を収載済み(`src/shared/three/rendererState.ts:13,29,39`)。復帰経路を二重実装しない。
- ビームの固定トポロジー化、更新時ゼロアロケーション、dirty-check は物理光路と同じデータ構造を所有する T-GO-04 に統合する。本票ではビーム形状や設定更新経路を変更しない。
