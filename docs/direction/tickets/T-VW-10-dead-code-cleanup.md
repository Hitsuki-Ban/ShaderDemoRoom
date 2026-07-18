# [T-VW-10] Voxel Water の残余デッド shader/runtime 経路を除去する

- 分類: TA
- 優先度: P3
- 評価軸: デッドコード・デッド出力
- 依存: T-VW-01〜09 の後に実施(最終実装に残るデッド経路だけを対象にする)

## 現状(証拠)

- `fbm()` は `water.frag.glsl:61-70` に定義されているが未呼び出し。
- `vRawWave` は `water.vert.glsl:53-54` で `vWave` と同値を代入する重複 varying。
- `scene.background` の毎フレーム代入(`runtime.ts:484-486`)は depthTest:false の空ドーム(renderOrder 0、258-260行)に完全遮蔽される。
- カメラ相対スナップ(`runtime.ts:602-611`)は固定カメラでは同じ値を毎フレーム再計算している。

## 問題

第2バッチ完了後も実行結果へ寄与しない shader/runtime 経路が残ると、次の調整者が有効な入力と誤認し、uniform・varying・描画所有権の調査コストを増やす。

## 改善方向

最終 HEAD を再監査し、出力へ寄与しない `fbm`、重複 `vRawWave`、遮蔽される `scene.background` 更新、固定カメラ下の per-frame snap 再計算を削除する。カメラ snap が T-VW-03 の原因修正で既に必要な静的初期化へ移っていれば、その経路を唯一の実装として維持する。将来の可動カメラ用コードや互換分岐は残さない。

## 受け入れ基準

- `rg "fbm|vRawWave|scene\.background|OCEAN_SNAP_SIZE" src/rooms/voxel-water` で、仕様上必要な単一定義を除く残余デッド参照が0件であること。
- vertex/fragment interface と runtime uniform 集合が一致し、未使用 varying/uniform が shader compile log に出ないこと。
- 同一 QA time の clear/rain/storm キャプチャが変更前とピクセル一致し、draw calls、triangles、textures、geometries、FPS が同値(計測誤差 ±5%)であること。
- `pnpm test` / `pnpm lint` / `pnpm build` / `pnpm qa:visual` / `pnpm qa:water` を通過すること。

## 影響範囲・注意

- gridOverlay の削除は T-VW-03、0.62 格子尺度と近/遠量子化は T-VW-05、太陽方向は T-VW-05、太陽ディスク/ハロは T-VW-04 が所有する。本票へ残余調整として戻さない。
- `columnOpacity` は T-VW-09 が所有する。本票では既に削除済みであることだけを監査し、別の修正成果にしない。
- 本票は視覚値を変更しない。ピクセル差が出た場合はデッドでなかった証拠なので削除対象の判定へ戻り、別表現への fallback は行わない。
