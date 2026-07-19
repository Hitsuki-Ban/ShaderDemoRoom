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
- software 分類の定常値が同一プロトコルの before 比 **1.7 倍以上**に改善すること(2026-07-19 裁定で 2.0x から改訂 — 下記「裁定」参照)。voxel-water の同一プロトコル値に ±5% を超える回帰がないこと。
- Glass 入場中だけ `transmissionResolutionScale === 0.5`、退出直後は snapshot 値へ復帰することを `pnpm qa:renderer` 系シナリオで検証すること。
- 未知/範囲外 rendererProfile が検証で失敗し、環境分類による値分岐が存在しないことをテストで固定すること。
- draw calls 19 を維持し、`pnpm test` / `pnpm lint` / `pnpm build` / `pnpm qa:visual` を通過すること。

## 影響範囲・注意

- renderer profile の capture/apply/restore は `src/shared/three/` 側で完結させ、`RoomRuntimeContext.renderer` の絞られた `{ render }` 契約を広げない。
- `RendererStateSnapshot` は `transmissionResolutionScale` を収載済み(`src/shared/three/rendererState.ts:13,29,39`)。復帰経路を二重実装しない。
- ビームの固定トポロジー化、更新時ゼロアロケーション、dirty-check は物理光路と同じデータ構造を所有する T-GO-04 に統合する。本票ではビーム形状や設定更新経路を変更しない。

## 実装・計測監査 (2026-07-19、裁定済み — 完了)

### 現在の候補

- shader room必須の厳密な `rendererProfile` を実装し、Voxel Waterは `transmissionResolutionScale = 1`、Glass Opticsは本票指定どおり `0.5` を宣言した。未知field、欠落、非finite、`0 < value <= 1` 外はfail fastする。環境分岐、adaptive値、fallbackはない。
- sessionはrenderer stateをsnapshotした後、runtime生成前にprofileをvalidate/applyする。runtime生成失敗、通常dispose、dispose失敗の全経路が既存の `RendererStateSnapshot` だけで復帰する。Glass runtimeへraw renderer権限は追加していない。
- `pnpm qa:renderer` はactual renderer readbackを監査し、2訪問順序 × 20切替でGlass=`0.5`、Voxel/embedded退出後=`1`、単一canvas/context、context loss 0、Glass 19 callsを確認した。

### 正式A/B

同一1440×900 / DPR 1 / 5秒warm-up + 15秒measurementで、main `6dfcb4f` と候補を計測した。

| environment | before | candidate 0.5 | change | gate |
|---|---:|---:|---:|---:|
| SwiftShader | 4.80 FPS | 8.10 FPS | 1.69x / +68.8% | 2.0x 未達 |
| RTX 4070 Ti / D3D11 | 89.26 FPS | 102.79 FPS | +15.2% | median 60 / min 30 達成 |

- 5組のSwiftShader交錯・交互順序A/Bでも、baseline median 4.58、candidate median 8.29、speedup median **1.784x** (各組1.727〜1.840x)だった。単発の順序・熱状態差ではない。
- Voxel Water候補はSwiftShader 15.61 FPS (既存15.37)、hardware交錯pair regression 1.15%で、±5%非回帰gateを通過した。
- actual allocation監査ではcanvas 862×735に対しtransmission RTが431×367、4× MSAAで生成され、profile readbackは0.5だった。color/depth初期allocation以外の反復resizeはなく、適用時機・RT寸法・復帰経路に実装欠陥はない。
- `pnpm qa:visual` は14 screenshots、console error 0、overflow/HUD overlapなしで通過。0.5の固定画も目視回帰なし。

### 仕様矛盾と裁定(2026-07-19、ユーザー決定)

**矛盾の内容**: 本票は当初 `0.5` を唯一の採用値とし `0.33` を禁止する一方、software baseline から 2x を要求していた。正しく適用された 0.5 の再現可能な上限は 1.78x(5組交錯 median)で、両方を同時には満たせないことが実測で判明。診断として固定 `0.33` を一時適用すると SwiftShader median 9.76 FPS(before比 2.03x)でゲートを通過し、固定時刻・auto-rotate off の 0.33 vs 0.5 画面差は mean RGB delta 0.055/255・delta>3 pixel 0.322% で目視不可だった(診断後は 0.5 へ復帰済み、0.33 はソースに残していない)。

**裁定: (B) 固定 0.5 を維持し、software ゲートを実測準拠の ≥1.7x へ改訂する。**

理由: この展示は屈折そのものが主題であり品質保守側を採る。0.33 の「目視差なし」証拠は固定1フレームのみで、今後の T-GO-02(ステージ再設計)/ T-GO-05(dispersion)で transmission バッファの内容が変わるため画質余裕を残す。1.78x でも実利は十分大きい。

**フォローアップ**: `0.33` への引き下げは T-GO-02 / T-GO-05 完了後の再評価オプションとして記録する(再評価時は複数カメラ時刻・複数プリセットでの画像差分を要件とする)。
