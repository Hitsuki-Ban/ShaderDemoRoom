# 調査: NPRアニメ流体・セルルック液体 (Anime Liquid Orb / MIZU//KOKORO 2.0 改善用)

調査日: 2026-07-18
対象展示: `public/exhibits/anime-liquid-orb/` (原典 `ref/mizu-kokoro-2-source/src/main.js`, 2523行)
前提: GitHub Pages 静的ホスティング / three.js ~0.184 + WebGL2 / 低〜中スペックGPU対応 / スタイライズドNPR方向

> 検証度の凡例 — ★★★: 一次情報を本文まで確認 / ★★: 一次情報の存在と要旨を複数の二次情報で確認 / ★: 二次情報のみ(その旨明記)

---

## 1. 課題→技術マッピング表

| # | 現状の課題 (understand-orb.json より) | 適用技術 | 期待効果 | コスト影響 |
|---|---|---|---|---|
| 1 | 二相フローブレンドが全球同位相 → 周期的な「脈動」が見える恐れ。スペキュラが等方でフローを語らない | Portal 2式 位相ノイズオフセット + 流速依存位相レート + フロー方向異方性ハイライト | 流れの説得力向上、脈動消滅 | ほぼゼロ (ALU数個) |
| 2 | スクリーンスペース屈折が前景オブジェクト(周回ドロップレット等)を誤って球内に取り込む | GPU Gems 2 Ch.19 マスク方式 or 深度比較フォールバック / レイヤー除外 | 屈折の破綻消滅 | レイヤー除外ならゼロ |
| 3 | クリックリップルが単一速度・単一周波数(分散なし)で「ゴム膜」的 | Wave Packets式 群速度/位相速度分離 (包絡線 cg・波峰 cp) | 相ごとの水らしい波の個性(重力波/表面張力波) | ALU数個 (5スロットループ内) |
| 4 | 泡が変位の高さ閾値のみ → 収束・圧縮と無関係に山なら泡が出る | ヤコビアン(表面圧縮率)ヒューリスティック | 泡が「流れがぶつかる場所」に集まる | varying 2本 + ALU数個 |
| 5 | 三帯セル境界が高周波変位で暴れる(バンドのクロール) | Xrd式「シェーディング法線の分離」= 低周波変位のみで帯を評価 + 閾値バイアス | 帯の形が安定し作画的に | むしろ削減(§8と相乗) |
| 6 | VOID: posterize 0.72 + ACES + bloom でバンディング必至。既存グレインは白色ノイズ | IGN / blue-noise ディザをポスタライズ量子化の内側に注入 + 最終 1/255 ディザ | 帯→点描化、暗部グラデ救済 | ほぼゼロ |
| 7 | 5層シェル depthWrite:false + renderOrder 手動。ドロップレットは depthWrite:true でソート漏れ | 手動順序を維持しつつ穴を塞ぐ(WBOIT/ピーリングは非推奨と結論) | 斜め視点の破綻解消 | ゼロ〜負 |
| 8 | deformPosition が液体+アウトラインで計 6回/頂点評価(実測 720 tri ×2 — §2.8 の規模訂正参照。適用はプロファイル実測が前提) | (a)アウトラインの法線再構築廃止 → (b)解析的微分 → (c)GPGPUテクスチャベイク の三段構え | 頂点コスト 33%〜80%減(絶対量は当初想定の約1/28) | 実装工数のみ |
| 9 | シェル⇔iframe 通信ゼロ。非表示時も rAF・音が走り続ける | player.js 型 postMessage プロトコル + Page Visibility / IntersectionObserver | 品質/pause/フェーズ同期、電力節約、スタンドアロン非破壊 | ゼロ(むしろ節約) |
| 10 | インタラクションの気持ちよさが物理由来のみで「作画」的快感が薄い | エフェクト作画原則(フォルム優先・タメツメ・衝撃時のギザ形状・クライマックス配給) | 「アニメらしさ」の決定打 | ほぼゼロ |

---

## 2. 各技術の詳細

### 2.1 Portal 2 フローマップの改良 — 位相ノイズ・流速依存レート・異方性スペキュラ ★★★

**何を解決するか**: 現実装 (`main.js` の phase0/1 = `fract(fluidTime*0.115)` / `+0.5` + 三角ブレンド) は Valve 方式の骨格を正しく写しているが、**全頂点が同一位相**なので、ブレンド重みが谷を通過する瞬間に球全体のフローディテールが同時に「薄く」なる周期的脈動が原理上発生する。Valve のオリジナルはこれをノイズテクスチャによる**画素ごとの位相オフセット**で殺している。

**実装要点** (一次スライドPDFはバイナリ抽出不可だったため、忠実な再実装2件から数値を確認):
- Graphics Runner (XNA再実装): `cycleOffset = noise(uv).r; phase0 = cycleOffset*0.5 + FlowMapOffset0; phase1 = cycleOffset*0.5 + FlowMapOffset1`。ブレンドは `flowLerp = abs(HalfCycle - offset0)/HalfCycle`。
- Catlike Coding (詳細な式の導出): 重み `w(p) = 1 - |1 - 2p|`(三角波)、B相は +0.5 オフセット。**周期ごとのUVジャンプ 0.2〜0.25**(例 6/25 と 5/24 のペアで約600周期のループ)で繰り返し感を先送り。さらに**フロー速度で高さ・時間をスケール**する変種を提示 — これが「流速による位相レート可変」の実装済み前例にあたる。
- 異方性スペキュラ: Polycount wiki は「フローマップはヘアの異方性ハイライトの方向制御にも使う」と明記。原理は接線方向にNDFを引き伸ばす標準的異方性(Blender Principled の anisotropy と同型)。水では「ハイライトをフロー接線方向に伸ばす」= Kajiya-Kay 的に `dot(T_flow, H)` 項でハイライトを楕円化する。

**この展示への翻訳**:
- テクスチャ不要のまま、`fluidTime*0.115` に**方向依存の滑らかなオフセット**を加える: `phaseNoise = fbm_low(dir*2.0) * 0.5`(既存の fbm を1オクターブで流用)→ `phase0 = fract(fluidTime*0.115 + phaseNoise)`。これで脈動が空間的に分散する。
- 位相レートを局所流速でスケール: `rate = 0.115 * (0.6 + 0.8*length(flowVec))`。速い場所ほど模様が速く更新され「流れの速さ」が読める。
- 既存の glint (`flowLines * pow(NdH,18)`) を異方性化: `H` を `H - T_flow*dot(H,T_flow)*k`(k≈0.5〜0.7)で流線方向に潰してから pow する。SURGE(flow 1.2)で流線に沿った長いハイライトが出る。

**コスト/リスク**: ALU数個。リスクは位相オフセットにより A/B 相の境界が空間的に見えること → オフセットは滑らかなノイズ(ハッシュ不可)にすること。ジャンプ導入時は ±0.25 以内(Catlike の推奨)でないと流れの向きが濁る。

**出典**:
- Valve/Vlachos, "Water Flow in Portal 2" SIGGRAPH 2010 — https://cdn.akamai.steamstatic.com/apps/valve/2010/siggraph2010_vlachos_waterflow.pdf (本文抽出不可、存在と要旨は下記で裏取り)
- https://advances.realtimerendering.com/s2010/index.html
- http://graphicsrunner.blogspot.com/2010/08/water-using-flow-maps.html (本文確認)
- https://catlikecoding.com/unity/tutorials/flow/texture-distortion/ (本文確認)
- https://catlikecoding.com/unity/tutorials/flow/directional-flow/
- http://wiki.polycount.com/wiki/Flow_map / http://wiki.polycount.com/wiki/Anisotropic_map

### 2.2 スクリーンスペース屈折の深度対応マスキング ★★★

**何を解決するか**: 現実装は refractionTarget を「orbGroup 非表示で全景」レンダしている。球より**手前**にある動的要素(周回ドロップレット、シャークウェーブリング、バーストパーティクル)がバッファに写り込み、屈折オフセットで球の内側に「手前の物が透けて曲がる」矛盾が起きる。

**実装要点** (GPU Gems 2 Ch.19, Tiago Sousa / Far Cry の手法を本文確認):
- 屈折バッファのアルファに「屈折オブジェクト自身のマスク」を焼き、摂動後のサンプルがマスク領域(=誤サンプル)に落ちたら**非摂動サンプルへフォールバック**: `color = refrPerturbed * mask + refrStraight * (1-mask)`。
- 限界も明記されている: 「遮蔽物のピクセルを背景色で置き換えるため若干のアーティファクトは残る」。
- 現代版(lettier "3D Game Shaders For Beginners" 等)は深度比較: 屈折UV先の深度が屈折面より手前なら棄却し `depthMax` パラメータでフォールバック強度を制御。WebGL2 なら refractionTarget に `DepthTexture` を付けて1フェッチで比較可能。

**この展示への翻訳** (安い順):
1. **レイヤー除外(推奨・即効)**: ドロップレット/シャークウェーブ/バーストパーティクルを `THREE.Layers` で屈折パスから外す。これらは additive・小型で「球越しに見えなくても」誰も気づかない。コストはむしろ減る(屈折パスの描画物が減る)。
2. 深度比較: refractionTarget に depthTexture を付け、液体フラグメントで `texDepth(refractedUv) < gl_FragCoord.z` なら `screenUv`(非摂動)へフォールバック。背景(ハロー・グリッド)は常に球より奥なので誤判定しない。
3. Sousa 式アルファマスクは、three.js では refraction パスで override material を使う追加コードが要るため、この規模では 2 に劣る。

**コスト/リスク**: 1 はゼロコスト。2 は depth attachment 追加 + フラグメント1フェッチ。リスク: 屈折バッファは 0.5〜0.82 倍解像度なので深度もその解像度 — エッジ1px の判定揺れは `smoothstep` 幅で吸収する。

**出典**:
- https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-19-generic-refraction-simulation (本文確認)
- https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-refraction.html
- https://godotshaders.com/shader/screen-space-refraction-shader/

### 2.3 Wave Particles / Water Wave Packets — リップルへの群速度と分散 ★★★

**何を解決するか**: 現リップルは 5スロットの vec4 リングで、速度 `mix(4.6,13.5,tension)`・周波数 `mix(14,31,tension)` の**単色波**。実水面の波束は分散する: 深水重力波は**群速度 cg = 位相速度 cp の 1/2**、表面張力(毛細)波は **cg = 1.5·cp**。つまり重力波では波峰が包絡線の後端で生まれ前端で消え、毛細波では逆に**包絡線が波峰を追い越す**。この「波峰の生死」が単色リングには絶対に出ない水の署名。

**実装要点**:
- 分散関係 ω² = gk + (γ/ρ)k³。クロスオーバー波長は約1cm(=球のスケール感を「小さな水滴」に寄せるなら毛細レジーム、「海」に寄せるなら重力レジーム)。
- Yuksel 2007 (Wave Particles): 粒子=局所波峰、固定速度で移動・分裂・減衰、ハイトフィールドに集積。**原法は位相速度でエネルギーを運び分散を扱わない**(論文・学位論文で明言)。安定・高速の代わりに音色が単調。
- Jeschke & Wojtan 2017 (Water Wave Packets): パケットが**波長区間+群速度+振幅**を運び、包絡線は cg、内部の波峰は cp で動く。無条件安定、実時間動作、直感的パラメータ。公式実装が GitHub に公開。
- 展示に必要なのはソルバーではなく**この見た目の式**: `h = A(t) · exp(-((d - cg·t)/w(t))²) · sin(k·d - ω·t)`。`cg ≠ ω/k` にするだけで波峰の生死が現れる。パケット幅は `w(t) = w0 + Δcg·t` で拡散、振幅は球面上のリング周長 `sin(θ)` に反比例させエネルギー保存風に減衰(θ = 角距離)。

**この展示への翻訳**:
- 5スロットループの1スロットあたり: 現行 `sin(freq·(d - speed·age))·decay` を上式に置換。`cg = cp * mix(0.5, 1.5, tensionσ)` とすれば **CALM(σ0.92)は毛細波的(包絡線が波峰を追い越す)、BLOOM(σ0.7,粘性0.9)は重力波的**になり、ART_DIRECTION の「グレースケール運動だけで相を判別」要件をリップルでも満たす。
- さらに安く: 1リップルを速い低周波+遅い高周波の**2成分**にするだけでも「長波が先着し、細かいさざ波が遅れて着く」分散の印象が出る(パケットの離散近似)。
- 5スロット×数ALU増で済む。FBOも粒子系も不要。

**コスト/リスク**: ごく小。リスクは包絡線ガウスの exp が既存 5.6s の生存窓と噛み合わない場合の「消え際のポップ」→ 既存 decay と乗算で解決。

**出典**:
- https://www.cemyuksel.com/research/waveparticles/ (本文確認) / https://www.cemyuksel.com/research/waveparticles/waveparticles.pdf
- https://visualcomputing.ist.ac.at/publications/2017/WWP/ (本文確認) / https://github.com/jeschke/water-wave-packets
- 分散関係の教育的整理: https://pubs.aip.org/aapt/ajp/article/93/9/691/3359554/Shallow-and-deep-water-ocean-waves-Deconstructing

### 2.4 表面ヤコビアン/ストレッチからの泡ヒューリスティック ★★★

**何を解決するか**: 現行 foam は `vDisplacement` の高さ閾値 (0.025/0.145) + `fwidth` 勾配。「高い所=泡」であって「流れが折り重なる所=泡」ではないため、SURGE の泡が砕波の説得力を持たない。

**実装要点** (Tessendorf 系の標準):
- 変位写像のヤコビアン `J = (1+λ·∂Dx/∂x)(1+λ·∂Dz/∂z) − λ²(∂Dx/∂z)(∂Dz/∂x)`。**J が小さい(≤0)= 表面が自分に折り畳まれている**= 砕波・ホワイトキャップ。
- 実装レシピ (George Bolba のFFT海洋実装より): `biasedJ = max(0, -(J - foamBias)); if (biasedJ > threshold) foam += foamAdd * biasedJ;` 毎フレーム `foam *= exp(-decayRate)` で減衰(蓄積には状態=FBOが要る)。
- Tessendorf 本人の whitecap 現象論文が物理側の一次資料。

**この展示への翻訳** (状態レスで):
- **スクリーンスペース面積比ヤコビアン**: varying に変形前位置 `vSpherePos` を追加し、フラグメントで
  `Jproxy = length(cross(dFdx(vWorldPos), dFdy(vWorldPos))) / max(length(cross(dFdx(vSpherePos), dFdy(vSpherePos))), eps)`。
  `Jproxy < 1` = 局所圧縮。`foamMask = smoothstep(0.85, 0.55, Jproxy)` を既存 crest 項と **max ではなく加算気味に合成**し、`flowLines` で筋状に割る。既存の `fwidth(vDisplacement)` 項はそのまま「峰の鋭さ」担当として残す。
- 頂点側 3重評価(§8)を解析的微分に置き換える場合は、接平面の変位勾配 `∂h/∂t1, ∂h/∂t2` から `J ≈ (1+∂²h…)` を直接組める(2階微分が要るので、まずはスクリーンスペース版を推奨)。
- 泡の蓄積・減衰(時間ヒステリシス)は FBO が要るため**現段階では見送り**が妥当。NPR ではステートレスでも「収束地帯に泡」の因果が出れば十分。

**コスト/リスク**: varying 2本 + ALU数個。dFdx 系はすでに使用中 (`fwidth(vDisplacement)`, crystal 面法線) なので追加負担なし。リスク: ポリゴンエッジで J がステップ状になる → smoothstep 幅を広めに。

**出典**:
- Tessendorf, "Simulating Ocean Water": https://jtessen.people.clemson.edu/reports/papers_files/coursenotes2004.pdf
- Tessendorf, "Whitecap Phenomenology for Ocean Surface Simulation": https://jtessen.people.clemson.edu/reports/papers_files/whitecap_fraction.pdf
- https://gikster.dev/posts/Ocean-Simulation/ (実装式を本文確認)
- https://github.com/tessarakkt/godot4-oceanfft (ヤコビアン泡の稼働実装)

### 2.5 Guilty Gear Xrd の法線編集・影制御をデフォーム下で安定させる ★★★

**何を解決するか**: 液体オーブの三帯セルは有限差分法線をそのまま使うため、高周波変位(fine noise × turbulence, capillary)で**帯境界がフレームごとに這い回る**。Xrd の核心は「影の形は物理の従属変数ではなく作画対象」— 法線・閾値を編集して影形状を固定する思想。

**実装要点** (GDC 2015 Motomura 講演 + 各種ブレークダウンで確認):
- 頂点法線を手編集(スカルプト的に転写)して影境界を単純化。スケルタルメッシュでも動くようUDK改造までした。
- ilm テクスチャ: スペキュラ強度/サイズ、**shadow bias map(セル閾値の局所オフセット)**、頂点カラーにAO を仕込み閾値をバイアス。
- アウトラインは反転ハル + 頂点カラーで太さ制御 + 深度で減衰(この展示は前2つ実装済み)。
- デフォーム下の安定化の現代的定石 (aversionofreality): **「滑らかな代理メッシュの法線を主変形にだけ追従させて転写し、ディテール法線を上に重ねる」**。= シェーディング法線とジオメトリ法線の分離。

**この展示への翻訳**:
- `displacementField()` を `large`(大域フロー+swell+粘性ローブ)と `detail`(fine noise, capillary, scan)の2値返しに分割し、**セル三帯の ndl は large のみから再構築した法線で評価**、スペキュラ/リム/フレネル/泡は full 法線で評価する。これが Xrd の「代理メッシュ法線」のプロシージャル等価物。帯は大きくゆったり動き、きらめきは細かく動く — 作画の「影は面で、光は点で」に一致。
- **shadow bias 項の導入**: `ndl += displacementMagnitude * k1 + touchGlow * k2` のように、盛り上がりや触位置で帯閾値を意図的に押す。Xrd の bias map のプロシージャル版で、「触った所が明るい帯に入る」演出制御が閾値1行で効く。
- 帯境界のエイリアス対策として `smoothstep(t-w, t+w, ndl)` の `w` を `fwidth(ndl)` 基準にする(既存の固定幅 0.18/0.25 等を置換)。バンドのちらつきが減り、LOWのSMAA無し環境で効く。
- ライト方向がハードコードで実ライトと乖離している問題 (knownIssues) は、この機会に「セル用ライト方向 uniform」に昇格させると、アートディレクションの再照明が uniform 1本になる。

**コスト/リスク**: large のみの法線再構築は**むしろ頂点コストを下げる**(§8 と同じ分割を共有)。リスク: 分割の境界周波数の選定 — swell を large に入れないと SURGE の砕波で帯が動かなくなる。

**出典**:
- Motomura, "GuiltyGearXrd's Art Style" GDC 2015 スライド: https://www.ggxrd.com/Motomura_Junya_GuiltyGearXrd.pdf / 講演アーカイブ: https://archive.org/details/GDC2015Motomura
- https://www.arcsystemworks.com/guilty-gear-xrds-art-style-the-x-factor-between-2d-and-3d-talk-from-gdc-2015-is-now-available-online/
- ブレークダウン: https://www.scribd.com/document/354898858/GuilltyGearXrd-shader-pdf
- デフォーム下の法線転写ワークフロー: http://www.aversionofreality.com/blog/2022/4/21/custom-normals-workflow (本文確認)

### 2.6 ポスタライズバンディング抑制 — ordered/blue-noise ディザ (ACES下) ★★★

**何を解決するか**: VOID は posterize 0.72(≒10階調)+ chroma 1.08 + ほぼ無彩色 + ACES + bloom 閾値0.94。量子化バンドがそのまま見える。また全モードで背景 #03060d 付近の暗部グラデ(ハロー、ビネット)は 8bit 量子化バンディングの常連。既存の film grain (hash21, 0.012) は**白色ノイズで量子化と無関係な位置に足されている**ため両問題を解決しない。

**実装要点** (frost.kiwi 記事 + Bart Wronski で確認):
- ディザは**トーンマップ後・量子化直前**に、量子化1ステップぶんの振幅で、平均を保つよう中心化して足す。
- Interleaved Gradient Noise (IGN): `fract(52.9829189 * fract(dot(uv, vec2(0.06711056, 0.00583715))))` — テクスチャ不要・タイル感なし・ordered Bayer より視覚的に良い。Valve のスクリーンスペースディザ定数も公開されている。
- 8bit 出力向け振幅は `(1/255)*noise - 0.5/255`。
- blue noise がベストだがテクスチャが要る — 無料タイル可能テクスチャ集: momentsingraphics(64×64で十分)。Playdead INSIDE は blue noise + TAA でバンディングをほぼ根絶した事例。
- Wronski: 三角分布ノイズ(2サンプル和)が量子化下で平均・分散を最もよく保つ。

**この展示への翻訳**:
- **ポスタライズの内側に注入**(これが本命): `posterized = floor(color*levels + ign - 0.5 + 0.5)/levels`。バンド境界が点描のスクリーントーン状に割れ、VOID の「印刷物/Ryoji Ikeda」アイデンティティとむしろ整合する。振幅はポスタライズの1ステップ(1/levels)であり 1/255 ではない点に注意。
- FinalGradeShader の最後(出力直前)に**全モード共通の 1/255 IGN ディザ**を追加し、暗部バンディングを消す。既存 grain とは役割が別(grain は質感、ディザは量子化対策)。
- ノイズを毎フレーム回すなら golden-ratio オフセット(`ign + fract(frame*0.618)`)で時間平均化。静止でも可(IGN は静止でも見苦しくない)。
- 注意: 6bit パネルの自前ディザと干渉する場合がある(frost.kiwi)— 振幅を上げすぎない。

**コスト/リスク**: ALU数個・テクスチャ不要(IGN案)。リスクなしに近い。blue noise 案は 64×64 テクスチャ1枚(ビルド時アセット生成可の制約内)。

**出典**:
- https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/ (本文確認・式取得)
- https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/
- https://momentsingraphics.de/BlueNoise.html (無料 blue noise テクスチャ)
- https://mini.gmshaders.com/p/gm-shaders-mini-dither

### 2.7 5層透明シェルスタックのソート — 実践解 ★★

**何を解決するか**: volume(1)→outline(2)→liquid(3)→crystal(4) は**同心シェルなので renderOrder 固定で常に正しい**(カメラがシェル間に入れない)。破綻源はスタック外: MeshToonMaterial ドロップレット(transparent だが depthWrite:true デフォルト)、additive ステージ要素が斜め視点で液体と交差するケース。

**選択肢の評価**:
- **Weighted Blended OIT** (three-wboit): three.js 用の既成パス。ただし「不透明度が1に近づいても人工的に透けたままになる」と作者が明記 — ほぼ不透明に読ませたいオーブ本体には**不適**。
- **Dual Depth Peeling**: 正確だがレイヤー数×シーン再描画。すでに 2パス+bloom+SMAA の本展示では**予算外**。three.js 公式には未統合(#9977 で長年議論)、gkjohnson のデモが参考実装。
- **Alpha Hash** (three.js r154+ `material.alphaHash`): ソート不要・交差正確。ただし粒状ノイズが出て TAA/SSAA でないと消えない(本展示は SMAA)。**ドロップレットのような小物にのみ**許容範囲。
- **結論: 手動 renderOrder 維持が正解**。three.js フォーラムの実務コンセンサスも「順序が既知ならソート指定が最速で正確」。

**この展示への翻訳**:
1. ドロップレットに `depthWrite:false` + 明示 renderOrder(液体より奥に読ませたいなら 3 未満)を設定 — 現状の最有力破綻源をゼロコストで塞ぐ。
2. コアノット/コア(renderOrder 1 相当)が outline(2) より先に描かれることを確認し、additive 要素は blending 上ソート非依存であることを利用して renderOrder を「非additive の後」に寄せる。
3. どうしても液体×クリスタルの交差が問題化したときだけ、crystal に限定した alphaHash 化を試す(全面 OIT 化はしない)。

**コスト/リスク**: 1・2 はゼロコスト。リスク: renderOrder 変更は既知の見た目を変えうるので、4モード×freeze でスクリーンショット回帰を取ること。

**出典**:
- https://github.com/stevinz/three-wboit (本文確認・制限事項)
- https://discourse.threejs.org/t/demo-order-independent-transparency-with-depth-peeling/88044
- https://github.com/mrdoob/three.js/issues/9977
- https://tsherif.github.io/webgl2examples/oit-dual-depth-peeling.html
- https://threejs.org/examples/webgl_materials_alphahash.html / https://research.nvidia.com/labs/rtr/publication/wyman2017hashed/
- https://discourse.threejs.org/t/threejs-and-the-transparent-problem/11553/28

### 2.8 頂点変位の法線再構築3重評価の最適化 ★★★

**何を解決するか**: `deformPosition` が液体・アウトライン両頂点シェーダで ±eps 2方向 = 各3回評価。**フレームあたり6回のフル変位場評価/頂点**(各評価に 5リップルループ + 4オクターブFBM + ridged FBM + curlノイズ)。
> **規模訂正(2026-07-18 監査)**: IcosahedronGeometry(1.65,5) の実サイズは 20面×(5+1)² = **720 tris(非インデックス約2,160頂点)/メッシュ**。当初の「≒20k tri」は約28倍の過大見積りで、「最重量ホットスポット」の断定は撤回する。総頂点シェーダ負荷は約 4,320頂点×6評価/フレームに留まり、sculpt 時 22 FPS の主因はフルシーン2回描画+bloom/SMAA+preserveDrawingBuffer のフィルレート側である可能性が高い。**本節の施策は「プロファイル実測でボトルネックが頂点側と確認された場合のみ」適用すること。**

**実装要点** (段階案・安い順):
1. **アウトラインの再構築廃止(即効・33%減)**: 反転ハルは法線方向に 0.046 押すだけ。変位前の球面解析法線(=`normalize(position)`)+ large 変位の勾配程度で視覚差はほぼない。まず outline の ±eps 2評価を削る。
2. **解析的微分 (iquilez)**: gradient noise は値と勾配を同時に計算できる(3Dは8隅の勾配ベクトル+クインティック補間、`du = 30f²(f(f-2)+1)`)。有限差分の複数サンプルより速く、FBM はチェーンルールで各オクターブの微分を振幅・周波数を掛けて総和。サイン波系(capillary/swell/リップル)は自明に微分可能。ridged FBM は折り返し点で微分が不連続(sign 反転)だが、法線用途では `sign(n)·dn` で実用上問題ない。接平面勾配 `g = ht1·t1 + ht2·t2` から `N = normalize(N0 - g)`(小変位近似)。**6評価→2評価(液体1+アウトライン1)**、しかも各評価が微分同梱。
3. **GPGPUベイク(最大効果・工数大)**: 変位場をフレーム毎に一度だけ 256×128 程度の float テクスチャへ全画面クアッドで書き(three.js の gpgpu_water と同型)、両頂点シェーダは WebGL2 の頂点テクスチャフェッチで読む。法線は隣接テクセル差分。**頂点数に依存しない一定コスト**になり、LOW でジオメトリ解像度を下げても変位は劣化しない。球のパラメータ化は経度緯度だと極でピンチする(既存 flowLineAt の既知問題と同根)ので**オクタヘドラルマッピング**を推奨。
- §5 の large/detail 分割と併用すると、セル帯用法線は large のみの解析微分(激安)、ディテール法線は fragment 側の dFdx 系でも代替可能。

**コスト/リスク**: 1 はリスクほぼゼロ。2 は既存ノイズ実装を「値+勾配」返しに書き換える工数(FBM/curl/リップル全項)。3 は 1パス追加とパラメータ化の品質検証が必要。**1→2 の順で入れ、3 は FPS 実測で必要になったときだけ**。

**出典**:
- https://iquilezles.org/articles/gradientnoise/ (本文確認・式取得)
- https://devtalk.blender.org/t/proposal-analytic-derivatives-for-procedural-noise/40847
- three.js GPGPU 水面の先例: https://github.com/rollup/three-jsnext/blob/master/examples/webgl_gpgpu_water.html
- https://tympanus.net/codrops/2024/08/27/grid-displacement-texture-with-rgb-shift-using-three-js-gpgpu-and-shaders/

### 2.9 iframe 埋め込み展示の postMessage 制御ブリッジ ★★★

**何を解決するか**: 現状シェル⇔展示間は `?reload=N` の再マウントのみ。品質設定・pause・フェーズ同期・FPS読み出しが不可能で、非表示 iframe でも rAF と(有効時)音が走る。

**実装要点** (player.js 仕様 = YouTube/Vimeo/SoundCloud API を一般化した公開スペックをパターンとして採用):
- メッセージは JSON `{context: "player.js", version, method, value, listener}`。**子が 'ready' イベントを送るまで親はコマンドをキューする**ハンドシェイクが核。ready を受けて初めて能力(サポートするメソッド一覧)を知る。
- 受信側は `event.origin` を検証(MDN/実装各社が必須と明記)。GitHub Pages なら同一オリジンなので `event.origin === location.origin` で足りる。将来の外部埋め込みを許すならオリジン allowlist。
- **スタンドアロンを壊さないパターン**: 子(展示)側ブリッジは (a) `window.parent === window` なら何もしない、(b) 親がいても ready 後に一度もコマンドが来なければ完全に自律動作、(c) ブリッジの全コマンドは既存の内部関数 (setMode/setQuality/settings 更新/pause) への薄い写像に限定し、UI と状態の二重管理をしない。親(シェル)側は load 後タイムアウト付きで ready を待ち、来なければ現行の reload-only UI に降格 — 既存の「無改造 iframe 展示」と後方互換。
- **可視性制御**: ブラウザは非表示**タブ**の rAF を自動停止するが、**スクロールで画面外に出た iframe** は止まらない。展示内で (1) `visibilitychange`(タブ非表示→音を停止・rAF 停止)、(2) `IntersectionObserver`(ビューポート外→rAF 停止)の二段構え。これは親の助けなしに動くのでスタンドアロンでも省電力になる。復帰時のΔtスパイクは既存の `delta clamp 0.05` が既にガードしている。
- 提案メッセージ最小集合: `ready / setQuality(high|medium|low) / setMode(0-3) / pause / resume / pulse / getState→state イベント(fps, mode, freeze)`。version フィールドで前方互換。

**コスト/リスク**: 実行コストゼロ(節約のみ)。リスク: 展示は「素材コントロールは作品内」という展示思想 (i18n runtimeNote) を持つ — ブリッジは**品質・省電力・同期のみ**に限定し、素材パラメータ(deform 等)は渡さない設計判断が思想と両立する。

**出典**:
- player.js 仕様書: https://github.com/embedly/player.js/blob/master/SPEC.rst / https://github.com/embedly/player.js/
- https://developers.google.com/youtube/iframe_api_reference (同パターンの最大手実装)
- https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame (非表示タブでの rAF 停止の仕様記述)
- https://developers.mention-me.com/docs/using-postmessage-to-control-an-iframe

### 2.10 アニメエフェクト作画の液体原則 → リアルタイム翻訳 ★★ (一部★)

**何を解決するか**: 現在の「気持ちよさ」は物理(ばね・減衰)由来で、**作画的な快感 — フォルムの変形・タメツメ・衝撃の形状言語 — が未使用**。ここが「アニメ流体」を名乗る展示の伸びしろ。

**検証できた一次/準一次原則**:
- 吉田徹(『吉田流!アニメエフェクト作画』/CGWorld インタビュー、本文確認): エフェクト作画は**物理正確性でなくフォルムの認識**(「くしゃくしゃの紙でも形と動きが正しければ炎に見える」)。**水は丸い塊で動き、面に当たると鋭いギザ形状に割れる**。炎は上へ・水は下へという方向性。**タメ(ホールド)**が重さと衝撃を作る — 滑らかな補間より4フレームのホールドがリズムを生む。基本は4枚のキーの繰り返し+変奏。
- Riot『League of Legends VFX Style Guide』(公開PDF、一次): 明確なシルエット、ソフト/ハードエッジの混在、**タイミングの3段階(予兆→クライマックス→消散)**、明度ヒエラルキー(最大輝度はクライマックスのみに配給)。
- Wind Waker の海 (Nathan Gordon の解析): 反射を捨てフラットな色帯+曲線的な表面ライン — 本展示の flowLine アプローチの妥当性を裏付ける先行例。
- **注記(誠実性)**: 吉成曜(TRIGGER系)個人の液体作画原則を体系化した一次文書は今回の調査では見つからなかった(画集・インタビューは作例中心)。上記は吉田徹の教本と Riot ガイドで代替検証した。「吉成流」を名指しで謳う場合は出典を作らないこと。

**この展示への翻訳** (すべて既存 uniform/式の変形で実装可):
1. **衝撃の形状言語**: リップル第1波に角張り変調 `r *= 1 + jag * n8(atan…)`(8〜12回対称ノイズ)を age で減衰させる — 「当たった瞬間はギザ、広がると丸く」の吉田原則そのもの。
2. **タメ→ツメ**: release recoil とリップルの age を `easeWithPlateau(t)`(最初の 2-3 フレーム相当を位相ホールドしてから一気に放つ)でリマップ。ばねの応答自体は触らず、視覚の時間だけ歪める。
3. **限定コマ演出の局所化**: VOID の `floor(t*12)/12` 量子化を、他モードでも**高エネルギーイベント(release, pulse)の間だけ**その項に適用 — 全体は滑らか、決め所だけ「作画のコマ」になる。
4. **クライマックス配給**: bloom 閾値 0.94 の思想(黒場を空けて輝度の山場を作る)を維持し、泡・グリントの最大値を pulse/release にゲートする(常時最大を出さない)。Riot の明度ヒエラルキーと一致。
5. droplet の「ちぎれ」(stringiness) はすでに μ 依存 — 分離の瞬間に 1 フレームのスケールオーバーシュート(1.0→1.25→0.9→1.0)を足すと作画のスミア/リカバリに相当する。

**コスト/リスク**: ほぼゼロ(時間リマップと角度変調のみ)。リスク: タメの入れすぎは入力遅延に感じる — ホールドは 50ms 相当以下に留め、A/B で確認。

**出典**:
- https://cgworld.jp/feature/201805-yoshida.html (本文確認)
- 『吉田流!アニメエフェクト作画』: https://wgn-obs.shop-pro.jp/?pid=150452433
- Riot VFX Style Guide (PDF): https://nexus.leagueoflegends.com/wp-content/uploads/2017/10/VFX_Styleguide_final_public_hidpjqwx7lqyx0pjj3ss.pdf / 解説: https://nexus.leagueoflegends.com/en-us/2017/10/dev-leagues-vfx-style-guide/
- https://medium.com/@gordonnl/the-ocean-170fdfd659f1 (Wind Waker 海解析)
- 吉成曜の背景情報のみ: https://ja.wikipedia.org/wiki/%E5%90%89%E6%88%90%E6%9B%9C

---

## 3. この展示への適用推奨(優先順位つき)

### Tier 1 — 低リスク・即効(見た目/性能の純益)
1. **アウトラインシェルの法線3重評価を廃止** (§2.8-1): 頂点変位コストの約1/3を無条件削減。低スペック対応の第一歩。
2. **ドロップレットの depthWrite:false + renderOrder 明示** (§2.7): ソート破綻の最有力源をゼロコストで封鎖。
3. **屈折バッファから前景動的要素をレイヤー除外** (§2.2-1): 誤サンプルの主因を除去。描画物も減る。
4. **最終 1/255 IGN ディザ + VOID ポスタライズ内ディザ** (§2.6): 5行程度で全モードの暗部と VOID の帯を救済。
5. **フロー位相のノイズオフセット** (§2.1): 二相ブレンドの全球同期脈動を殺す。fbm 1タップ。

### Tier 2 — 表現の核を上げる(工数中・差が大きい)
6. **リップルへ群速度/位相速度分離** (§2.3): `cg = cp·mix(0.5, 1.5, σ)` で CALM/BLOOM のリップルの「性格」が分かれる。本展示のテーゼ(相=レオロジーの性格)に最も効く1項目。
7. **セル帯法線の低周波化 + shadow bias 項** (§2.5): 三帯の作画的安定。§2.8-2 の large/detail 分割と同時実装が効率的。
8. **スクリーンスペース面積比ヤコビアン泡** (§2.4): SURGE の泡に「収束→砕け」の因果を与える。
9. **衝撃ギザ形状 + タメツメ時間リマップ** (§2.10): 「アニメらしさ」の決定打。角度変調と ease 差し替えのみ。
10. **異方性グリント** (§2.1): SURGE/フロー強モードでハイライトが流れに沿って伸びる。

### Tier 3 — 基盤投資(工数大・効果は状況依存)
11. **postMessage ブリッジ + IntersectionObserver/visibilitychange 省電力** (§2.9): player.js 型 ready ハンドシェイク・タイムアウト降格でスタンドアロン非破壊。素材パラメータは渡さず品質/pause/同期のみ(展示思想と両立)。Voxel Water 等、他の埋め込み展示にも同一プロトコルを横展開できる共通基盤。
12. **ノイズの解析的微分化** (§2.8-2): 液体シェルの残り2評価を1評価へ。FPS 実測で Tier 1 適用後も 30fps を割る端末が確認された場合に着手。
13. **GPGPU 変位ベイク(オクタヘドラル)** (§2.8-3): 頂点数非依存化 + flowLineAt の極ピンチ問題も同時に解消できるが、最後の手段。深度対応屈折 (§2.2-2) もこの段で depthTexture と併せて検討。

### 採用を見送るもの(調査の結論として)
- **WBOIT / depth peeling の全面導入** (§2.7): 同心シェルは renderOrder で既に正しく、WBOIT は高不透明度で人工的に透け、ピーリングは描画コスト予算外。
- **泡の時間蓄積 (FBO)** (§2.4): ステートレス近似で NPR 的には十分。FBO 追加は §2.8-3 とセットになったときのみ再検討。
- **リップルの粒子系化 (Wave Particles 完全実装)** (§2.3): 5スロット uniform で式だけ借りるのが本展示の規模に適正。

---

## 4. 調査で確認できなかったこと(明示)

- Valve SIGGRAPH 2010 スライド PDF はバイナリのままテキスト抽出できず、**本文の数値(スクロール速度等)は未確認**。手法の骨格は忠実な再実装2件 (Graphics Runner / Catlike Coding) と Polycount wiki で裏取りした。
- 吉成曜個人の「液体表現原則」を一次文書として体系化した資料は発見できず。§2.10 は吉田徹の教本・インタビューと Riot スタイルガイドによる代替検証である。
- Water Wave Packets 論文の内部式(パケット幅の時間発展の厳密形)は論文 PDF 本文まで到達しておらず、本文書の式は分散関係の標準物理 + プロジェクトページの記述からの再構成である(見た目の再現には十分)。
