# [T-NT-02] 暗部バンディング/ゴーストを最終段ディザで解消する

- 分類: TA
- 優先度: P2
- 評価軸: 描画正当性(近黒階調の量子化)/ QA 担保(決定論キャプチャとの両立)
- 依存: T-NT-05(必須の変更前 baseline gate) / T-EMB-01(完了済み)

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

- **プロジェクト所有の `DitheredOutputPass` を実装し、既存 `OutputPass` を置き換える。** この pass は three の現行 OutputPass と同じ tone mapping + sRGB 出力を明示的に行った直後、IGN(Interleaved Gradient Noise) 1/255 を加える。振幅 `1.0/255.0`、平均輝度保存のため `0.5/255.0` を減算、座標は `gl_FragCoord.xy`。
- `DitheredOutputPass` は `ref/archive_of_the_ninth_tide_shoreless_web/src/` 内の独立 module とし、main.js はそれを直接 import/instantiate する。three の `OutputPass` shader 文字列置換、実行時 monkey patch、失敗時に素の OutputPass へ戻る fallback は禁止する。必須 shader chunk/API がない場合は build を失敗させる。
- ディザ位置は AfterimagePass のフィードバックループ**より後**(= tone mapping + sRGB 変換後)を厳守する。ループ内に入れると damp 0.94–0.982 で蓄積して汚れる。
- 時間アニメーション(毎フレーム時間オフセット)で時間平均をさらに滑らかにするが、**静止画 QA のため seed を uniform 化**し、`?preview=` 経路では固定 seed にする。
- 併せて検証系を1本: 近黒ランプ領域の 8-bit ヒストグラムから隣接階調ジャンプを測る小スクリプト(検収と将来の回帰検知を兼ねる)。half-float 前提(r152+ デフォルト)と afterimage フィードバックの色空間が想定通りかもこのとき現物確認する。

## 受け入れ基準

- 視覚: `?preview=main&section=8` と `?preview=ending` の近黒グラデーション領域(perceptualField / 床周辺)を拡大比較し、現行キャプチャで視認できる縞が知覚不能になること。
- 数値: 変更前 baseline の実測で section-8 は luma 1..32 の全 bin が既に occupied だったため、
  空白 bin の増減を合否条件にはしない。8-bit histogram は診断値として保存し、banding の空間的な
  plateau を測る horizontal equal-pair ratio を各 ROI で 0.1 以上、longest horizontal run を5 pixel
  以上減らす。occupied near-black bin は減少不可、平均輝度シフトは ±0.5/255 以内とする。
- 決定論: 固定 seed で同一 preview URL の連続2回キャプチャが一致すること(`qa:exhibits` / T-NT-05 キャプチャ基盤の決定論を壊さない)。
- ゴースト: shutdown 中(damp 0.982)にディザ粒がフィードバック蓄積で汚れないこと(ending キャプチャの残像領域を確認)。
- 構造: composer の最終出力 owner が `DitheredOutputPass` 1つだけであり、`new OutputPass()`、shader 文字列置換、fallback 分岐がソースに存在しない。
- 性能: 既存 OutputPass を1対1で置換し、フルスクリーン pass 数を増やさず、frameTimeMs 退行 5% 以内(bridge stats で before/after)。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` 通過。

## 影響範囲・注意

- **改修は ref/ 側で行い `pnpm exhibits:build` で public/exhibits を再生成**(public 手編集禁止、`exhibits:check` が同期強制)。
- `DitheredOutputPass` が参照する three shader chunk/API は T-DEP-01 の更新時に compile と near-black histogram を再検収する。
- CSS スケーリングが 1:1 でないとディザ粒が潰れる(§2.5 注意)。pixelRatio 1.6 → CSS ダウンスケールは平均化方向で実害小だが、将来の動的解像度(<1.0)導入時は再確認。
- ディスプレイ内蔵ディザ(6-bit パネル)との二重ディザは環境要因として 8-bit 基準で検収する。
- 検収キャプチャは T-NT-05 の章別キャプチャ QA に載せると before/after が自動化できる。
- 参照: research-audio-reactive.md §2.5(IGN 式・注入位置・出典リンク一式)

## 完了報告 (2026-07-21)

- three r184 `OutputPass` と同じ `RawShaderMaterial + FullScreenQuad`、tone-mapping define 7種、
  exposure、sRGB OETF、render target / clear / dispose 契約を持つプロジェクト所有の
  `DitheredOutputPass` を新設した。r184 の tone-mapping / colorspace chunk は静的 import して shader に
  埋め込むため、必須 path/API が消えた build は失敗する。`OutputShader` の文字列置換、monkey patch、
  素の `OutputPass` への fallback はない。
- 最終色は tone mapping → sRGB OETF の後、`gl_FragCoord.xy` と uint8 seed による IGN を
  `(ign - 0.5) / 255` として RGB だけへ加え、0..1 に clamp する。alpha は保持する。
  composer は `RenderPass → Bloom → Afterimage → veil → DitheredOutputPass` の5本で、追加の fullscreen
  pass はない。実行時 ownership audit でも output owner は常に1本だった。
- live は実際に完了した top-level render count を 0..255 で循環させる。URL/forced preview は seed 0 に
  固定し、pass 内部に自動増分 state を持たせない。したがって同一 preview の再実行と fresh browser は
  exact hash のまま、live では時間平均が得られる。
- 変更前 baseline `70a67ea` を `docs/direction/baselines/t-nt-02-before.json` に固定した。実測では
  section-8 の luma 1..32 は既に全 bin occupied で、票面の「空白帯」だけでは退行を検出できなかった。
  そこで同じ histogram に加え、空間 banding を直接測る horizontal equal-pair ratio と longest run を
  fail-fast gate にした。section-8 field/floor は equal-pair が `0.6484→0.4732` / `0.6631→0.4893`、
  longest run がともに `116→31`。ending は `0.7197→0.5535` / `0.8018→0.6604`、
  `25→18` / `25→10` となった。
- 4 ROI の平均 luma shift は 8-bit code で `+0.0008..+0.0326` (上限 ±0.5)。seed 0 / 137 の
  final RGB 差は各 channel 最大1 code、alpha changed pixels 0、平均 RGB shift は section-8
  `+0.000134`、ending `-0.000033` code。8× / 24× の同一変換拡大でも構図・輝度は維持され、
  長い等値段だけが微細な分散へ変わることを確認した。
- `__NINTH_TIDE_DITHER_SCENARIO__` は seed 0 の同頁反復と2 fresh browserを exact 比較し、seed 137との
  paired capture では Afterimage の HalfFloat feedback hash が section-8
  `ea14f576…`、ending `4f707a86…` のまま完全一致した。final framebuffer は異なるため、ディザが
  最終段では有効だが damp 0.982 の feedback には一切蓄積しないことを同時に証明する。同 hook は
  render から非同期 half-float readback の完了まで single-flight lock を保持し、重複 call は決め打ちの
  error で拒否する。この拒否も section-8 / ending の各 run で gate が検証する。
- RTX 4070 Ti / Chrome 150 / D3D11、1440×900、section-8 live の基線/候補5組 AB/BA で、bridge
  `frameTimeMs` paired median regression は `-3.00%` (各 pair は `-21.02, -19.50, +11.27, -3.00,
  +39.53%`)、別の8秒 rAF cadence paired median は `-1.20%` (各 pair は `+9.08, -15.51, +10.76,
  -1.20, -8.57%`) で、両方とも事前定義した上限5%を通過した。個別 pair の分散を隠さず、bundle SHA、
  browser/renderer、全 bridge samples と cadence を `docs/direction/baselines/t-nt-02-performance.json`
  (SHA-256 `22d54aeb…`) に保存した。
- 最終 bundle SHA-256 は `9af8896fb19877a4bbab9898848bcc83d7e16485022d8d29dd05a6db1ce6f34c`
  (ref dist / public / root dist一致)。`qa:ninth-tide-dither` manifest は
  `bb7aae8877519698fbf0640e0249eb1d303f14ac24507e2ed90e42d1d8dc328c`、full capture は
  `dc8d21b95d0635db26865e25bcdc0cade0dfaa56002836d1fbccef12dce53810`、pulse QA は
  `034b204de6b7b106f1b06cc9f6de0c07323c4b2a84b4e9f0617b287d3e9e42fc`。
  pulse zero golden は同じ固定 seed の意図的な最終出力変更 `d0e920bb…` へ明示的に更新した。
- `pnpm lint`、`pnpm test` (39 files / 320 tests)、`pnpm build`、`qa:ninth-tide-dither`、
  `qa:ninth-tide-dither-performance`、`qa:ninth-tide-pulses`、production `qa:ninth-tide`
  (3 browsers × 11 states × 3 repeats)、
  `qa:exhibits`、`qa:visual` を通過した。公式実装照合は
  [three r184 OutputPass](https://github.com/mrdoob/three.js/blob/r184/examples/jsm/postprocessing/OutputPass.js)、
  IGN 原典は [SIGGRAPH 2014 course](https://advances.realtimerendering.com/s2014/index.html#_NEXT_GENERATION_POST)
  を使用した。
