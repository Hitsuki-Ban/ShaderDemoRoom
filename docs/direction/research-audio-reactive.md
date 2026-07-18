# 調査: オーディオリアクティブ演出・ダークシーン描画(Ninth Tide Archive 改善用)

調査日: 2026-07-18 / 対象展示: `public/exhibits/ninth-tide-archive/`(ソース: `ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`)
前提: GitHub Pages 静的ホスティング / three.js ~0.184 / WebGL2 / 低〜中スペック GPU / スタイライズド NPR 方向。

---

## 1. 課題 → 技術マッピング表

| # | 現状の課題(understand-tide.json の risks より) | 推奨技術 | 期待効果 | コスト概算 |
|---|---|---|---|---|
| 1 | 共鳴器ビームが薄殻フェイク(alpha ピーク ~0.15)で「ソリッドライト」の量感がない | 多重ネストコーン+ノイズ UV スクロール(Chapman 方式拡張)。レイマーチは非推奨 | McCall 的な「入れる光の柱」の説得力向上 | 低(ドローコール +2〜3/ビーム) |
| 2 | パルスが単一スロットで、auto-sonar がユーザーのエコーを上書き | uniform 配列によるパルスリングバッファ(8スロット、ユーザー枠保護) | Pulse Room の「キューに保持される履歴」概念を実装で担保 | 低〜中(全マテリアルでループ8回) |
| 3 | オンセット検出が単一バンドエネルギー微分×8.6 で音楽的でない | スペクトラルフラックス+適応閾値(移動平均+kσ) | auto-sonar が「音楽的イベント」で発火 | 極低(JS ~30行) |
| 4 | low/mid/high の pow 較正が耳当てで、低域が支配的 | K/A 特性の per-bin ゲイン LUT+ビルド時パーセンタイル較正 | バンド反応の知覚的均等化 | 極低(静的テーブル) |
| 5 | 近黒グラデ(#000405 帯)のバンディング、ディザなし | OutputPass 後段に IGN(Interleaved Gradient Noise)ディザ 1/255 | 暗部の縞を知覚不能に | 極低(1行ノイズ、テクスチャ不要) |
| 6 | veil の 9-tap ブラーが full-res・pixelRatio 1.6 で常時走る | 小半径なら現状維持が正解。大半径演出が要るときのみ 1/4 解像度 dual-Kawase を別立て | 画質維持しつつ帯域削減の選択肢確保 | 中(実装量) |
| 7 | 加算透明の大量オーバードロー、FPS 連動の劣化機構なし | フレーム時間 EMA 駆動の動的 pixelRatio(ヒステリシス+クールダウン付き)+ Spector.js での実測 | 中スペック GPU での FPS 底上げ | 中 |
| 8 | sectionBoundaries が手調整で未検証 | librosa/FMP 方式の Foote ノベルティ曲線でオフライン検証(uv スクリプト) | 章境界の音楽的妥当性を数値で確認 | 低(ビルド時のみ) |
| 9 | 章 IX で HUD シアン(#83eadb)がシーンより明るい | パレット連動 HUD(--cyan を章 glow から導出、opacity を lightLevel×exposure に連動) | 「HUD がシーンを食う」問題の解消 | 低 |
| 10 | 近黒パッセージが「壊れている」と誤認されうる | 常時可視の周辺キュー(タイムライン、信号インジケータ)+「Active Silence」型アイドル設計 | 意図的な暗黒であることの伝達 | 低 |

---

## 2. 各技術の詳細

### 2.1 McCall 風ソリッドライト: 薄殻フェイク vs レイマーチ参加媒質

**背景**: Anthony McCall の Solid Light 連作(1973「Line Describing a Cone」以降)は、ヘイズ中に投影された光錐そのものを「入れる立体」として提示する作品群。現行実装の共鳴器ビームは開口円錐 1 枚 + フィラメント項の薄殻シェーダーで、視線が錐体を貫く「厚み」の情報がない。

**選択肢 A: フェイク円錐(推奨)**
- 基本形は John Chapman "Good Enough Volumetrics for Spotlights" を three.js 化した threex.volumetricspotlight: CylinderGeometry(上細り)+ シェーダーで距離減衰(attenuation)と `anglePower` によるフレネル風エッジ減衰(視線と錐面の角度で縁を減光→中心を貫く視線ほど「厚く」見える)。ソフトパーティクル(深度フェード)は当時の three.js の深度精度の都合で省略されている。
- three.js Issue #16147 で共有されている改良: **半径を少しずつ変えたコーンを複数枚ネスト+ノイズテクスチャ**で、追加パスなしに密度ムラのあるボリューメトリック感が出る。現行ビームは既にフィラメント項を持つので、(1) 同軸コーンを 2〜3 枚に増やし radius を 0.92/1.0/1.08 倍程度に散らす、(2) vUv.y に沿ってスクロールする低周波ノイズで密度ムラ、(3) 視線・錐軸角度による厚み近似(dot(viewDir, axis) ベースの擬似光学深度)を加えるのが最小改修。
- コスト: ビームあたりドローコール +2〜3。9 共鳴器で +18〜27 draw だが小さなコーンのフィル面積は限定的。既存の加算・depthWrite:false 方針とそのまま整合。
- 追加の「売り」: McCall の実物はヘイズ(塵)が本体。錐体内部にだけ小さな Points(50〜100 点/ビーム、既存 nearSnow のシェーダー流用)を撒くと立体感が跳ね上がる。コストは既存パーティクル群に比べ誤差。

**選択肢 B: スクリーンスペース・レイマーチ(参考、今回は非推奨)**
- Maxime Heckel の解説が Web 向け一次資料として最良: 深度バッファから世界座標を復元し、コーン SDF(`cosAngle < cos(halfConeAngle)` で棄却、`smoothstep` でエッジ)内の参加媒質をレイマーチ。**250 ステップ→50 ステップに落としてもブルーノイズジッタでバンディングを消せる**、シーン深度で早期終了、Henyey-Greenstein 位相関数・Beer 減衰・fbm 密度が定石、という具体値が示されている。
- コストはピクセル数×ステップ数に比例(シーン複雑度からは独立)。pixelRatio 1.6 のフルスクリーンで 50 ステップは、既に bloom+afterimage+veil+output の 4 フルスクリーンパスを抱える本展示では予算超過が濃厚。半解像度+バイラテラルアップサンプルで緩和できるが実装量が大きい。**9 本のビーム全部には不適。** 将来「章 VIII の gaze だけ 1 本だけ本物の光錐にする」ような限定演出でのみ検討価値あり。
- 出典:
  - https://blog.maximeheckel.com/posts/shaping-light-volumetric-lighting-with-post-processing-and-raymarching/
  - https://github.com/jeromeetienne/threex.volumetricspotlight
  - https://github.com/mrdoob/three.js/issues/16147
  - https://publicdelivery.org/anthony-mccall-solid-light-works/ (作品文脈)
  - https://www.ericforman.com/anthony-mccall-solid-light (デジタル版はサークルウェーブ合成を Processing でリアルタイム生成、という制作証言)

### 2.2 複数パルス/エコー履歴の保持

**何を解決するか**: 現状は `pulseAge/pulseStrength/pulseOrigin` の単一スロットを全マテリアルが共有し、auto-sonar(transient>0.16、クールダウン 1.15〜1.85 s)がユーザークリックのエコーを伝播途中で上書きする。ART_DIRECTION の典拠である Lozano-Hemmer《Pulse Room》は「**直近 300 個の心拍を記録・保持し、新しい記録が入るとキューが 1 つ進む**(その瞬間全灯が一斉に短く消える)」という履歴保持がコンセプトの核であり、単一スロットはこれと矛盾する。

**選択肢 A: uniform 配列リングバッファ(推奨)**
- `uniform vec4 uPulses[8];`(xyz=origin, w=startTime)+ `uniform vec4 uPulseMeta[8];`(strength, mode, sourceY, flags)。WebGL2 の `MAX_FRAGMENT_UNIFORM_VECTORS` は**最低保証 224**なので 8〜16 スロットは全マテリアルで余裕(現行 globals 全部足しても数十 vec4)。
- フラグメント側は固定長ループで front/memory 項を加算合成。exp/abs 主体の軽い算術なので 8 スロットでも ALU 律速にはなりにくい(本展示のボトルネックはフィルレート/帯域)。ただし ~10 マテリアル全部に入るので、モバイル分岐ではスロット数 4 に落とす保険を推奨。
- **ユーザー枠の保護**が本質: スロット 0–4 を auto-sonar 用リング、スロット 5–7 をユーザークリック専用リングに分けると「クリックしたエコーがかき消される」問題が構造的に消える。Pulse Room の「新規記録時に全灯が一瞬消えてキューが進む」動作は、「ユーザーパルス発火時に既存トレースを 100 ms だけ 0.5 倍に沈めてから再放射」という演出として直訳できる。
- 副次修正: shutdown 中の `globals.pulseStrength` 強制上書き問題(全マテリアル共有 uniform への幻パルス)も、convergence 専用スロット/専用 uniform に分離することで同時に解消できる。

**選択肢 B: ping-pong FBO のエコーフィールド**
- three.js 公式の `GPUComputationRenderer`(webgl_gpgpu_water 例)と同じ構成で、床平面(または極座標)ドメインの小さな RT(例 256²、HalfFloat)に「エコー場」を書き、毎フレーム減衰+新パルスをスタンプ、各マテリアルはそのテクスチャを 1 fetch するだけにする。履歴数が無制限になり、減衰=「記憶」が場として残るので Pulse Room 的には最も美しい。
- ただし本展示のパルスは床だけでなく 3D 半径場(アーカイブ格子・共鳴器・nearSnow)に効くため、床平面 1 枚では z 方向の位相情報が落ちる。ドメイン設計(worldPos→UV 射影の決め方)が難所。**コスト自体は小さい(256² 1 パス+1 fetch)が実装リスクが A より高い**。第一段は A、床シェーダーの「航跡」表現だけ B を併用する二段構えが現実的。
- 出典:
  - https://www.lozano-hemmer.com/texts/manuals/pulse_room.pdf / https://macm.org/en/collections/oeuvre/pulse-room/ / https://www.bitforms.art/artwork/pulse-room (キュー仕様)
  - https://webgl2fundamentals.org/webgl/lessons/webgl-cross-platform-issues.html (uniform 上限 224 の最低保証)
  - https://jayconrod.com/posts/34/water-simulation-in-glsl / https://franky-arkon-digital.medium.com/realistic-but-fast-water-waves-in-three-js-a48e2c9b0695 (ping-pong / GPUComputationRenderer パターン)

### 2.3 スペクトラルフラックスによるオンセット検出と適応閾値

**何を解決するか**: 現行の `transient = max(0, Δenergy) * 8.6` は全帯域合成エネルギーの微分なので、持続音のうねりでも発火し、逆に高域だけのアタック(ハイハット等)を取りこぼす。スペクトラルフラックスは「**前フレームよりエネルギーが増えたビンだけを合算**」するオンセット検出関数(ODF)で、新しい音の立ち上がりに選択的に反応する。

**実装要点(ライブラリ不要、~30 行)**:
1. 既存 AnalyserNode の周波数バイト列 `freqData` を保持し、`flux = Σ max(0, freqData[i] - lastSpectrum[i])`(dev.to の実装例は FFT 2048 = 現行と同一設定)。
2. ODF をローパス(既存の damp() でよい)してノイズ除去。
3. **適応閾値**: 直近 ~1〜1.5 s(60fps なら 64〜96 フレーム)のリングバッファで移動平均 μ と標準偏差 σ を持ち、`flux > μ + k·σ`(k≈1.5〜2.0)かつ局所極大のときオンセット。Web-Onset や audiojs/beat が「local mean × delta」「running mean + n×std」型の同じ流儀を採る。
4. 不応期(refractory)を現行クールダウンと統合。低域ラムブル対策として、フラックス合算を 190 Hz 以上のビンに限定した「帯域限定フラックス」も併走させ、章ごとにどちらを auto-sonar トリガに使うか選べると演出の幅が出る。
- 連続エンベロープ(コアの呼吸等)は現行 transient のままで良い。**離散イベント(auto-sonar 発火)だけフラックス+適応閾値に置換**するのが低リスク。
- ライブラリ選択肢: Meyda(純 JS、`spectralFlux` 実装あり、Web Audio 擬似ノード)は導入容易。Essentia.js(WASM、SuperFlux 系や beat tracking まで持つ)は強力だが **AGPLv3** なので本リポジトリのライセンス方針と要照合。自前 30 行で足りるため原則不要。
- 出典:
  - https://github.com/Keavon/Web-Onset (局所平均閾値の可視化実装)
  - https://github.com/audiojs/beat-detection (spectral flux ODF + adaptive threshold peak-picker)
  - https://dev.to/hacker_ea/real-time-beat-detection-in-web-based-dj-applications-40p3 (Web Audio での flux 計算の具体形)
  - https://transactions.ismir.net/articles/10.5334/tismir.202 (ノベルティ/活性化関数の理論的チュートリアル)
  - https://mtg.github.io/essentia.js/docs/api/Essentia.html / https://program.ismir2020.net/static/final_papers/260.pdf (Essentia.js、AGPLv3)
  - https://github.com/meyda/meyda/releases (Meyda)

### 2.4 A/K 特性による知覚ラウドネス重み付けとバンド較正

**何を解決するか**: 現行の low/mid/high は生スペクトルの平均に pow(1.14/1.22/1.08) を当てただけで、人間の等ラウドネス感度(低域に鈍く 2–4 kHz に敏感)を反映していない。低域エネルギーが物理的に大きい音源では low が常に飽和気味になり、pow 指数の耳当て調整で辻褄を合わせている状態。

**知識の確認(出典ベース)**:
- **A 特性**: `R_A(f) = 12194²·f⁴ / [(f²+20.6²)·√((f²+107.7²)(f²+737.9²))·(f²+12194²)]`、`A(f) = 20log₁₀R_A(f) + 2.00`(1 kHz 正規化)。低域を強く減衰、2–4 kHz 付近が感度ピーク。
- **K 特性(ITU-R BS.1770 / LUFS)**: 約 80 Hz 以下をハイパスで減衰+約 2 kHz 以上に +4 dB 台のシェルフ、これにゲーティングを組み合わせて番組ラウドネスを測る。音楽向けには A 特性より現代的。
- 6 kHz 帯を重視する ITU-R 468 という選択肢もある(ブロードバンドノイズ向け)。

**実装要点**:
1. AnalyserNode のビン周波数ごとに A または K カーブのゲインを**起動時に 1 回だけ LUT 化**し、low/mid/high 集計と 64 バンドテクスチャ書き込みの両方で乗算する。ランタイムコストは実質ゼロ。K の方が式が単純(2 つの biquad 近似 or 折れ線近似で十分。装飾目的なので厳密実装は不要)。
2. **楽曲固有の較正はビルド時に**: archive.mp3 は固定アセットなので、オフラインスクリプトで全曲の per-band ヒストグラムを取り、5–95 パーセンタイルを 0–1 に正規化するマップ(バンドごとの offset/scale)を JSON で焼き込むのが最も確実。pow 指数の耳当てをデータで置き換えられる。ユーザーがドロップした任意音源には、既存の damp を流用したランタイム自動ゲイン(移動パーセンタイル)でフォールバック。
- 出典:
  - https://en.wikipedia.org/wiki/A-weighting (式・特性)
  - https://apu.software/2023/10/06/lufs.html (K 特性の 80 Hz ロールオフ+高域 +4 dB シェルフの平易な説明)
  - https://aes2.org/resources/audio-topics/loudness-project/loudness-basics/ (BS.1770 系の時間重み+ゲーティングの位置づけ)

### 2.5 暗部バンディング対策(ディザ、half-float、Afterimage フィードバック)

**確認済みの事実**:
- three.js **r152 以降、EffectComposer のレンダーターゲットはデフォルトで HalfFloatType**(Migration Guide / r153 リリースノート)。three 0.184 の本展示では bloom・afterimage・veil 間の中間バッファは既に半精度浮動小数であり、**パス間の精度劣化とフィードバックの量子化滞留(トレイルが消え残る古典的 Afterimage バグ)は既に回避されている**。したがって残るバンディング源は「最終 8-bit 出力への量子化」1 点。
- 修正は frost.kiwi のまとめが決定版: **Jimenez の Interleaved Gradient Noise(IGN)1 行関数**を最終出力直前に注入する。
  ```glsl
  float gradientNoise(vec2 uv){ return fract(52.9829189 * fract(dot(uv, vec2(0.06711056, 0.00583715)))); }
  color.rgb += (1.0/255.0) * gradientNoise(gl_FragCoord.xy) - (0.5/255.0);
  ```
  振幅は 8-bit 1 階調分(1/255)、平均輝度を保つため 0.5/255 を引く、座標は必ず `gl_FragCoord`。テクスチャ不要でブルーノイズテクスチャ(momentsingraphics 配布)とほぼ同等の視覚品質。IGN は CoD:AW の「Next Generation Post Processing」由来で TAA/時間的安定性にも強い。
- **注入位置が重要**: AfterimagePass のフィードバックループ**より後**、すなわち OutputPass のトーンマップ+sRGB 変換後に足すこと。ループ内にノイズを入れると damp 0.94–0.982 で蓄積して汚れる。実装は (a) OutputPass の後に 1 枚 ShaderPass を足す(フルスクリーン 1 パス増、最も単純)か、(b) OutputPass のフラグメントシェーダーを文字列置換で拡張して sRGB 変換直後に加算(パス増なし、推奨)。three.js 本体にもマテリアル向け dithering フラグの前例がある(PR #11076)が、ポストチェーン最終段には自前注入が必要。
- ノイズを毎フレーム時間オフセットでアニメーションさせると時間平均でさらに滑らかになる(demofox)。ただし静止画スクリーンショット QA では固定シードにできるよう uniform 化しておく。
- 注意: 6-bit パネル等のディスプレイ内蔵ディザとの**二重ディザ干渉**は避けられない環境要因なので 8-bit を基準とする。また CSS 拡大縮小が 1:1 ピクセルでないとディザ粒が潰れる(pixelRatio 1.6 → CSS へのダウンスケールは平均化方向なので実害小、動的解像度で 1.0 未満に落とす場合は要確認)。
- 出典:
  - https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/ (IGN・振幅・注入位置の決定版解説)
  - https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/ (IGN 原典)
  - https://github.com/mrdoob/three.js/wiki/Migration-Guide (r152: composer デフォルト HalfFloatType)
  - https://github.com/pmndrs/postprocessing/discussions/322 (半精度がリニアワークフロー精度の要件という傍証)
  - https://momentsingraphics.de/BlueNoise.html (ブルーノイズテクスチャ配布、代替案)
  - https://blog.demofox.org/2017/10/31/animating-noise-for-integration-over-time/ (時間アニメーション)

### 2.6 周辺ブラー実装比較(9-tap radial vs Kawase vs dual-filter)

**アルゴリズム知識(出典ベース)**:
- ブラーのコストはテクスチャタップ数と帯域が支配的(GPU は演算より メモリアクセスが遅い)。分離ガウスで kernel² → 2k、Kawase は 1 パス 4 タップの多段、**dual filter(dual Kawase)は縮小→拡大チェーンで低解像度で処理するため大半径では最も帯域効率が良い**(ARM の SIGGRAPH 2015「Bandwidth-Efficient Rendering」が原典、モバイル GPU 向け)。Intel の検証記事も大カーネルでは帯域律速になることを示す。
- **ただし優位性は「大半径」の話**。現行 veil の blurAmount は最大でも ~0.006 UV(1080p で数ピクセル)であり、この半径域では単パス 9-tap の方が縮小拡大チェーンの固定費(RT 切替・パス数)より安い。**「9-tap を dual-Kawase に置換」は本展示では改善にならない可能性が高い**、というのが調査結論。
- 現実的な適用は二段構え:
  1. 通常時: 現行 9-tap を維持(radial+tangential の方向性ブラーは dual filter では表現できない、という表現上の理由もある)。
  2. shutdown・phaseTransition 時など「大きく滲ませたい」瞬間だけ、1/4 解像度で dual-Kawase 2〜3 段(ダウン2+アップ2 パス、各 4〜9 タップ)を回して veil 内で edge マスク合成。1/4 解像度なのでフルスクリーン 1 パス相当以下の帯域で大半径が買える。
- pixelRatio 1.6 ではフルスクリーンパス 1 枚が CSS 解像度の 2.56 倍のフィルであることに常に留意(veil 自体より、後述の動的解像度の方が効果が大きい)。
- 出典:
  - https://blog.frost.kiwi/dual-kawase/ (各アルゴリズムの体系的比較)
  - https://community.arm.com/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-20-66/siggraph2015_2D00_mmg_2D00_marius_2D00_slides.pdf (dual filter 原典スライド)
  - https://www.intel.com/content/www/us/en/developer/articles/technical/an-investigation-of-fast-real-time-gpu-based-image-blur-algorithms.html (Kawase/moving box の実測)
  - https://blog.en.uwa4d.com/2022/09/06/screen-post-processing-effects-chapter-5-dual-blur-and-its-implementation/ (dual blur 実装解説)

### 2.7 加算オーバードローのプロファイリングと動的解像度スケーリング

**プロファイリング**:
- **Spector.js**(ブラウザ拡張)でフレームをキャプチャし、ドローコール単位でフィル面積・ブレンド状態・RT 切替を確認するのが WebGL の標準手段。stats.js / stats-gl で GPU 時間の趨勢、`renderer.info` で draw call / triangle 数の常時監視。
- オーバードローの可視化は「全マテリアルを一定アルファの加算シェーダーに差し替えて重なり回数を輝度で見る」古典手法が有効(本展示はほぼ全て加算なので、bloom/veil を切って素のシーンを見るだけでも重なりが読める)。
- 本展示の疑い順位: (1) coreHalo 等の巨大スプライト(ワールド ~7 unit のフィル)、(2) nearSnow の大粒ポイント、(3) フルスクリーンパス 4 枚 × pixelRatio 1.6、(4) 12,636 点のアーカイブポイント群。タイル型 GPU(Apple/ARM)ではブレンドはオンチップで安いが、フィル面積×レイヤー数と RT 往復(ポストチェーン)が帯域を食う、というのが ARM 資料の骨子。

**動的解像度スケーリング(DRS)**:
- three.js フォーラムの議論で確立している注意点: **FPS 連動の解像度変更はヒステリシスループ(下げる→FPS 回復→上げる→また落ちる)に陥りやすい**。対策は (a) 20 フレーム以上の移動平均で判定(google/model-viewer の scaleFactor 方式)、(b) 上げ下げに別の閾値(例: 45 fps 未満で下げ、58 fps 超が 3 秒続いたら上げ)、(c) 変更後クールダウン 2 s 以上、(d) 段階を離散化(1.6 → 1.35 → 1.15 → 1.0)。
- 解像度を下げて効くのは**フィルレート律速のときだけ**(頂点/CPU 律速では無効)。本展示は加算オーバードロー+ポスト 4 枚で典型的なフィル律速なので効果が見込める、というのが判断根拠。
- 実装は `renderer.setPixelRatio()` と `composer.setSize()` を同時に呼ぶ(RT 再確保が走るので頻繁な変更は禁物=クールダウン必須)。drei の PerformanceMonitor は「DPR を 20% 刻みで増減」という同型パターンの既製実装で、バニラ移植は容易。
- 併せて安い恒久策: isMobile 判定を resize で再評価(現状はロード時 1 回)、UnrealBloomPass の resolution 引数を明示的に下げる(bloom は元々 mip チェーンで縮小するが入力解像度依存)、nearSnow のポイントサイズ上限と coreHalo スケールの章別クランプ。
- 出典:
  - https://discourse.threejs.org/t/changing-pixelratio-based-on-fps-good-or-bad-idea/34563 (落とし穴と model-viewer 方式)
  - https://r3f.docs.pmnd.rs/advanced/scaling-performance (PerformanceMonitor の増減パターン)
  - https://tympanus.net/codrops/2025/02/11/building-efficient-three-js-scenes-optimize-performance-while-maintaining-quality/ (Spector.js / stats 系ツールと DPR 運用の実例)
  - https://emscripten.org/docs/optimizing/Optimizing-WebGL.html (オーバードロー・ブレンドコストの一般論)
  - https://community.arm.com/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-20-66/siggraph2015_2D00_mmg_2D00_marius_2D00_notes.pdf (タイル GPU の帯域観点)

### 2.8 楽曲構造セグメンテーションの検証ツール

**何を解決するか**: sectionBoundaries = [48.97, 75.05, 103.10, 145.24, 183.81, 224.89, 260.23, 330.05] s は手調整であり、音楽的な構造変化点と一致しているかの客観検証がない。

**手法(一次資料で確立)**:
- Foote (2000) の古典手法: 特徴量(クロマ、MFCC、CQT など)の自己相似行列(SSM)の対角線に**チェッカーボードカーネル**を畳み込み、ノベルティ曲線のピーク=構造境界とする。FMP Notebooks(Müller, AudioLabs Erlangen)に Gaussian チェッカーボードカーネル込みの実装ノートブックがあり、librosa でビート同期特徴量に集約してから SSM を作るのが定番。
- **MSAF**(Music Structure Analysis Framework, Nieto & Bello)は Foote / spectral clustering / OLDA など複数の境界検出アルゴリズムを同一 API で回せる Python フレームワークで、複数アルゴリズムの合議と手調整境界の照合に最適。
- 提案ワークフロー(ビルド時のみ、成果物は出荷しない):
  1. `uv init tools/section-check && uv add librosa msaf matplotlib`
  2. archive.mp3 → ノベルティ曲線+検出境界を、既存 sectionBoundaries(±2 s 許容)と重ねてプロット。
  3. 一致しない境界は「意図的なズレ(演出上のフライング)」か「単なる誤差」かを人間が判定し、docs/ に検証ログを残す(既存の glass-optics / voxel-water QA ログと同格の QA 資産になる)。
- ブラウザ内でやるなら Essentia.js でも可能だが、検証は一回きりなのでオフライン Python が合理的。
- 出典:
  - https://ccrma.stanford.edu/workshops/mir2009/references/Foote_00.pdf (原典)
  - https://www.audiolabs-erlangen.de/resources/MIR/2019_TutorialFMP_ISMIR/ (FMP Notebooks)
  - https://transactions.ismir.net/articles/10.5334/tismir.202 (ノベルティ関数チュートリアル)
  - https://ismir2015.uma.es/LBD/LBD30.pdf (MSAF)

### 2.9 Ikeda / Lozano-Hemmer 系の翻訳事例と HUD/シーンのコントラスト設計

**インスタレーション側の一次情報(検証済み)**:
- **Ryoji Ikeda / datamatics**: 公式記述は「純粋データを素材に、モノクロ基調+**鋭い色のアクセント**、極端なフレームレートと可変ビット深度で知覚の閾値を試す」。本展示の「64 バンドスペクトラムを複数系統が同時参照する(EQ バーは描かない)」方針は既に忠実。追加で拾える意匠は「**閾値ギリギリの提示**」——章 IX の near-black はまさにこれで、バンディング対策(2.5)が整えば「知覚閾値上の階調」をさらに攻められる。
- **Lozano-Hemmer / Pulse Room**: 300 灯キュー、新規記録で全灯消灯→キュー前進、という履歴機構(2.2 参照)。「記録が押し出されて消える」ことまで含めて作品。マルチパルス化の際、最古スロットが上書きされる瞬間に微かな減光を入れると原典の文法に一致する。
- **Web 翻訳事例**: Ikeda / McCall 作品の検証可能な WebGL 再現事例は今回の検索範囲では**発見できなかった**(公式・美術館ページは作品解説のみ)。teamLab についても技術的一次資料は検索で確認できず。**この項は「実装済み事例の模倣」ではなく上記の作品原理の直訳として設計するのが正しい**、というのが調査結論。

**HUD/シーン コントラスト設計(ゲーム UI 系の知見)**:
- ダークシーンの UI 定石: (1) **シーン(バイオーム)ごとに輝度レンジを設定**し UI をそこに収める、(2) フェード階層——重要情報はパルスし、低優先ヒントは退く、(3) 必読情報は非ダイジェティック高コントラスト、雰囲気情報はダイジェティック側へ、(4) 暗環境+高速移動でのプレイテスト。Dead Space のスーツ組込み体力表示は「暗所で読める鮮やかな 1 色」の代表例。
- 本展示への直訳: HUD の `--cyan` を固定 #83eadb でなく**章パレットの glow/accent から導出**し、HUD 全体の opacity を `lightLevel × toneMappingExposure` に比例させる(下限は可読性のため 0.25 程度でクランプ)。章 IX では HUD がシーンと同じ「消えかけの階調」に沈み、原典の「画がキャプションを証明してから出す」原則とも整合する。タイムラインや章番号など「読ませたい」要素だけ下限を高めに設定する二層構造にする。
- 出典:
  - https://www.ryojiikeda.com/project/datamatics/ (datamatics 公式)
  - https://www.lozano-hemmer.com/texts/manuals/pulse_room.pdf / https://macm.org/en/collections/oeuvre/pulse-room/ (Pulse Room 仕様)
  - https://gdkeys.com/keys-efficient-user-interfaces/ / https://www.yamii.shop/2026/04/04/diegetic-ui-guide/ / https://nastyrodent.com/diegetic-and-non-diegetic-ui/ (ダークシーン UI・ダイジェティック設計の定石)

### 2.10 「壊れている」と誤認させない near-black UX

**何を解決するか**: 開幕儀式の blackout、章 IX、エンディングの光学的崩壊は意図的な近黒だが、ショールーム経由の一見客には「iframe が死んだ」ように見えるリスクがある(黒画面+音声のみ、はユーザーが故障と解釈する典型パターンとして Unity 系フォーラムに多数報告がある種の状況)。

**確認できた設計知見**:
- 公共インタラクティブディスプレイ研究(CHI 2026 EA「Active Silence」): アイドル/静止状態でも**低強度で動き続けることで「見ているだけでも参加でき、始めるのに覚悟が要らない」**状態を作る。「アイドル状態は最初のチュートリアルであり、機能説明ではなくペースと許可を表現する」。
- ミュージアムキオスクの実務知見: 静的な待機画面より**微細なモーションを持つアンビエント表示**の方が通行者の注意を引き、稼働中であることを伝える。
- 適用(展示内、ビルド 1 本で完結):
  1. **常時可視の最小シグナル**: 近黒区間でも HUD のタイムライン(既存 `--progress`)と章インデックスは 2.9 の opacity 下限側に残す。9 章構成が見えるタイムラインは「これは 5:54 の作品で、いま暗い章にいる」ことを一目で伝える最強の周辺キュー。
  2. **知覚閾値上の残光**: blackout でも 1 要素(例: スペクトラルコームの 2〜3 セグメント、または信号ドット)だけ知覚閾値ぎりぎりの輝度で動かし続ける。「灯滅以後、海仍在読。」のコンセプトそのものを UX 保険として使える。
  3. **ショールーム側の予告**: レール/コントロールパネルの説明文(i18n)に「この展示はほぼ暗転する章を含む」ことを 1 行明記し、reload ボタンの隣に案内する。iframe 側改修不要で最も安い。
  4. エンディングのエピローグカード(既存)はリプレイ導線として既に正しい。誤認リスクが残るのは「開幕 0〜8.65 s」と「章 IX 途中参加」の 2 点なので、そこに 1・2 を集中させる。
- 出典:
  - https://dl.acm.org/doi/10.1145/3772363.3798810 (Active Silence, CHI 2026 EA)
  - https://workinman.com/trade-show-museum-kiosk-design-development/ (アトラクトモード実務)
  - https://discussions.unity.com/t/webgl-black-screen-on-mobile/937905 (黒画面+音のみ=故障と解釈される反面事例)

---

## 3. この展示への適用推奨(優先順)

**P1 — 低コスト・高効果(すぐやる)**
1. **最終段 IGN ディザ(2.5)**: OutputPass のシェーダー文字列置換で 3 行。near-black 章の品質が最も安く上がる。AfterimagePass より後に入れることだけ厳守。QA 用に seed uniform 化。
2. **auto-sonar のスペクトラルフラックス化(2.3)**: JS 側のみ ~30 行。移動平均+1.5σ 閾値、不応期は現行クールダウン流用。演出の「音楽性」が体感で変わる。
3. **HUD パレット連動(2.9)**: `--cyan`/HUD opacity を章パレットと lightLevel から導出。CSS 変数ブリッジは既存機構で、変更箇所は updateTide 周辺に閉じる。
4. **near-black 周辺キュー(2.10)**: タイムライン・章インデックスの opacity 下限確保+ショールーム側 i18n に 1 行注記。

**P2 — 中コスト・コンセプト充実**
5. **パルス uniform 配列化(2.2 案 A)**: 8 スロット(auto 5 + ユーザー 3 保護枠)。shutdown 時の幻パルス問題も専用スロット分離で同時解消。全 ShaderMaterial の front/memory 項をループ化する一括改修なので、ビルド(esbuild)と静的プレビュー QA(?preview=)をセットで回すこと。
6. **ビームの多重コーン化(2.1 案 A)**: 同軸 2〜3 枚+anglePower 型エッジ+錐内ダストで McCall 感を強化。レイマーチには行かない。
7. **バンド重み LUT+ビルド時較正(2.4)**: K 特性 LUT は即日、archive.mp3 のパーセンタイル較正はオフラインスクリプト込みで。

**P3 — 検証・保険**
8. **Foote ノベルティ検証スクリプト(2.8)**: uv + librosa/MSAF で sectionBoundaries を照合し、結果を docs/ の QA ログとして残す(本展示だけ QA ログ不在の穴も埋まる)。
9. **動的 pixelRatio(2.7)**: 20 フレーム移動平均・二重閾値・2 s クールダウン・離散段(1.6/1.35/1.15/1.0)。実装前に Spector.js で coreHalo / nearSnow / ポスト 4 枚のフィル実測を取り、効果の当たりを付けてから。
10. **周辺ブラーは現状維持(2.6)**: 調査の結論として、小半径域では 9-tap 単パスが合理的。大半径演出を足したくなった時のみ 1/4 解像度 dual-Kawase を検討。

**調査で確認できなかったこと(明記)**
- Ikeda / McCall / teamLab 作品の検証可能な WebGL 公式・準公式再現事例(2.9)。
- AfterimagePass のフィードバックを意図的に sRGB 空間で回した場合の色ズレの定量比較(r152+ のリニア半精度が標準であること以上の一次資料は見つからず。現行 three 0.184 では問題が生じない構成であることは Migration Guide で確認済み)。
- 現行 9-tap veil と dual-Kawase の「pixelRatio 1.6 での実測ミリ秒比較」に相当する公開ベンチマークは存在せず、上記 2.6 の結論は帯域理論(ARM/Intel/frost.kiwi)からの推論である。実測するなら Spector.js + disjoint timer query で自前計測が必要。
