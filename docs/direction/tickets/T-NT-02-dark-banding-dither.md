# [T-NT-02] 暗部バンディング/ゴーストを最終段ディザで解消する

- 分類: TA
- 優先度: P2
- 評価軸: 描画正当性(近黒階調の量子化)/ QA 担保(決定論キャプチャとの両立)
- 依存: T-EMB-01(完了済み)。T-NT-05 の章別キャプチャ QA があると検収が容易(推奨先行)

## 現状(証拠)

対象: `ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`(現行 3062 行)

- 第IX章パレットは deep `0x000405`(main.js:89)のほぼ黒。露出テーブルも IX が最小 0.54 で、shutdown 中は `× (1 - smoothstep(0.76,1,shutdown) * 0.96)` まで落ちる(main.js:2897–2898)。
- AfterimagePass は初期 damp 0.865(main.js:1594)、章別 memoryProfile は VI 0.905 / VIII 0.925 / **IX 0.94**、shutdown>0.45 中は `lerp(0.90, 0.982, …)` で最大 **0.982**(main.js:2895–2896)— 超長寿命トレイル + 加算合成が近黒ランプ上に残る。
- veilPass 内にアニメーショングレイン `color += grain * (0.007 + high*0.007 + abyss*0.004)`(main.js:1704–1705)は存在するが、これは**トーンマップ前**の演出ノイズであり、最終 8-bit 出力の量子化を狙った 1/255 振幅ディザではない。
- パスチェーン末尾は `composer.addPass(new OutputPass())`(main.js:1714)で、**OutputPass(トーンマップ + sRGB 変換)の後段に何もない = 最終量子化はディザなし**。
- three 0.184(r152+)なので EffectComposer の中間 RT はデフォルト HalfFloatType — bloom / afterimage / veil 間の精度劣化と Afterimage フィードバックの量子化滞留は既に回避されている(research-audio-reactive.md §2.5 で確認済み)。残るバンディング源は「最終 8-bit 出力への量子化」の1点。
- 証拠キャプチャ: `docs/direction/captures/ninth-tide-ch9.png` / `ninth-tide-ending.png`(近黒グラデーション帯)。pixelRatio はデスクトップ上限 1.6(main.js:101)。

## 問題

deep `#000405` 系の近黒グラデーション + 露出 0.04 倍域 + damp 0.982 の残像は、8-bit 出力の 1 階調が知覚できる最悪条件で、縞(バンディング)と消え残りゴーストが「圧縮ノイズ/故障」に見える。「知覚閾値ギリギリの階調」を攻める Ikeda 系の意匠(§2.9)にとって、暗部の量子化品質は展示価値そのもの。

## 改善方向

research-audio-reactive.md §2.5 の決定版レシピをそのまま適用する:

- **IGN(Interleaved Gradient Noise)1/255 ディザを OutputPass の後段に注入**する。振幅 `1.0/255.0`、平均輝度保存のため `0.5/255.0` を減算、座標は `gl_FragCoord.xy`。
- 注入位置は AfterimagePass のフィードバックループ**より後**(= トーンマップ + sRGB 変換後)を厳守。ループ内に入れると damp 0.94–0.982 で蓄積して汚れる。実装は (a) OutputPass 後に ShaderPass 1 枚、または (b) OutputPass のフラグメントシェーダ文字列置換で sRGB 変換直後に加算(パス増なし、推奨)。
- 時間アニメーション(毎フレーム時間オフセット)で時間平均をさらに滑らかにするが、**静止画 QA のため seed を uniform 化**し、`?preview=` 経路では固定 seed にする。
- 併せて検証系を1本: 近黒ランプ領域の 8-bit ヒストグラムから隣接階調ジャンプを測る小スクリプト(検収と将来の回帰検知を兼ねる)。half-float 前提(r152+ デフォルト)と afterimage フィードバックの色空間が想定通りかもこのとき現物確認する。
- blue-noise テクスチャ(momentsingraphics 配布)は代替案として温存。IGN で不足する場合のみ。

## 受け入れ基準

- 視覚: `?preview=main&section=8` と `?preview=ending` の近黒グラデーション領域(perceptualField / 床周辺)を拡大比較し、現行キャプチャで視認できる縞が知覚不能になること。
- 数値: 対象領域の 8-bit ヒストグラムで、現行の「階調の孤立ピーク + 空白帯」が連続分布化すること。平均輝度シフトは ±0.5/255 以内(ディザは明るさを変えない)。
- 決定論: 固定 seed で同一 preview URL の連続2回キャプチャが一致すること(`qa:exhibits` / T-NT-05 キャプチャ基盤の決定論を壊さない)。
- ゴースト: shutdown 中(damp 0.982)にディザ粒がフィードバック蓄積で汚れないこと(ending キャプチャの残像領域を確認)。
- 性能: フルスクリーン 1 パス追加なし(方式 b)または追加 1 パスでフレームタイム退行 5% 以内(bridge stats で before/after)。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` 通過。

## 影響範囲・注意

- **改修は ref/ 側で行い `pnpm exhibits:build` で public/exhibits を再生成**(public 手編集禁止、`exhibits:check` が同期強制)。
- OutputPass のシェーダ文字列置換(方式 b)は three のバージョン更新で壊れうる。T-DEP-01 のピン戦略下では安全だが、three 更新チケットの検収項目に「IGN 注入の生存確認」を残すこと。
- CSS スケーリングが 1:1 でないとディザ粒が潰れる(§2.5 注意)。pixelRatio 1.6 → CSS ダウンスケールは平均化方向で実害小だが、将来の動的解像度(<1.0)導入時は再確認。
- ディスプレイ内蔵ディザ(6-bit パネル)との二重ディザは環境要因として 8-bit 基準で検収する。
- 検収キャプチャは T-NT-05 の章別キャプチャ QA に載せると before/after が自動化できる。
- 参照: research-audio-reactive.md §2.5(IGN 式・注入位置・出典リンク一式)
