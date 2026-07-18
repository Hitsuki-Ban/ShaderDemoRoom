# リサーチ: リアルタイムガラス / 屈折 / コースティクス(Glass Optics 改善用)

調査日: 2026-07-18
対象展示: `src/rooms/glass-optics/`(MeshPhysicalMaterial 透過ガラス球 + ヒューリスティックなビーム経路 + 手続きフェイクコースティクス)
前提: GitHub Pages 静的ホスティング / three.js ~0.184 (r184) / WebGL2 / 低〜中スペックGPU / スタイライズド方向

---

## 1. 課題 → 技術マッピング表

| # | 現状の課題(understand-glass.json より) | 適用技術 | 詳細節 | コスト感 |
|---|---|---|---|---|
| 1 | 「Glass Optics」なのにガラスに分散(色収差)がない | `MeshPhysicalMaterial.dispersion`(r164+、r184で利用可) | §2.1 | ほぼゼロ(透過バッファ3回サンプル) |
| 2 | ビームが固定点 (0,1.18,0) を狙うヒューリスティックで、球面と無関係。ターゲットが球の内部にある | CPU側のレイ-球交差 + Snell 屈折 / `Vector3.reflect()` による物理経路計算 | §2.2 | ほぼゼロ(閉形式の数式、設定変更時のみ) |
| 3 | IOR を動かしても屈折ビームの変化が乏しい | RGB 3波長サブチューブ(Cauchy 2項近似で波長別 IOR) | §2.3 | 低(チューブ+2本、CPU計算3倍だが微小) |
| 4 | コースティクスがリング+スポークの手続きパターンで屈折と無関係 | (a) 出射レイ着地点に連動させる (b) 事前計算ループテクスチャ (c) Evan Wallace 式ライトフロントメッシュ | §2.4 | (a)ゼロ (b)低 (c)中 |
| 5 | スライダー操作のたびに TubeGeometry を 6 本 dispose + 再生成 | 直線ビームはシリンダーの transform 再利用 / 固定トポロジー BufferGeometry への in-place 書き込み | §2.5 | 改善(GC/アロケーション削減) |
| 6 | transmission の描画コスト(将来の負荷増に備えた headroom) | `renderer.transmissionResolutionScale`(r172+)ほか | §2.6 | 削減効果大 |
| 7 | depthTest 無効の加算グローがカメラ変更に耐えない | Sprite グロー / FakeGlowMaterial / (選択的ブルームは非推奨) | §2.7 | 低 |
| 8 | カメラ完全固定+無条件の root スウェイ | 拘束付き OrbitControls(damping + polar/azimuth/distance 制限) | §2.8 | ほぼゼロ |
| 9 | RoomEnvironment 汎用 env でガラスの輪郭が弱く、ワイヤーフレームシェルで人工的に補っている | ダークフィールド・ライティングの定石(ストリップライト env、リムライト、グラデーション背景) | §2.9 | 低(PMREM 1回焼き直し) |

---

## 2. 各技術の詳細

### 2.1 MeshPhysicalMaterial の `dispersion`(本命・最小コストで主題を強化)

**何を解決するか**: 展示テーマが「ガラス光学」なのに色分散が皆無という主題との乖離。IOR スライダーの視覚的な手応えも増す。

**事実確認(一次情報)**:
- r164(2024-04)で追加。リリースノート記載 PR は #28051 / #28057 / #28058(@Mugen87)。本プロジェクトの three ~0.184 (r184) で **利用可能**。
- 仕様(公式ドキュメント): 「比較的透明なボリュームを透過する色の角度分離(色収差)の強さ」。デフォルト 0、有効値は 0 以上、現実的な範囲は **[0, 1]**。**transmission > 0 のオブジェクトでのみ有効**(本展示は transmission=1 なので条件を満たす)。
- 実装レベル(three.js dev ブランチ `transmission_pars_fragment.glsl.js` を確認): `USE_DISPERSION` 時、`halfSpread = (ior - 1.0) * 0.025 * dispersion` を計算し、`iors = vec3(ior - halfSpread, ior, ior + halfSpread)` で **同一の透過レンダーターゲットを RGB チャンネルごとに 3 回サンプル**するだけ。**シーンの再レンダリングは発生しない**。α は 3 サンプルの平均。

**実装要点**:
- `glassMaterial.dispersion = 0.3〜0.6` 程度から開始(1.0 は宝石級で誇張が強い)。IOR スライダーと連動させる(`dispersion` の実効スプレッドは `(ior-1)` に比例するため、IOR を上げると自動的に分散も強まる — 教材として好都合)。
- Controls に dispersion スライダー(0〜1)を追加すれば「Crystal preset」で 0.55 など高めを入れる演出ができる。

**コスト/リスク**: フラグメントシェーダで透過サンプリングが 1→3 回になるのみ。ガラス球の画面占有率は中程度なので低スペックでも影響は軽微。リスクはほぼなし。roughness が高いと分散がぼけて見えなくなる点だけ注意(本展示のデフォルト roughness 0.04 は好条件)。

**出典**:
- https://threejs.org/docs/pages/MeshPhysicalMaterial.html (dispersion / transmission / thickness / attenuation の定義)
- https://github.com/mrdoob/three.js/releases/tag/r164
- https://raw.githubusercontent.com/mrdoob/three.js/dev/src/renderers/shaders/ShaderChunk/transmission_pars_fragment.glsl.js (halfSpread 実装)

---

### 2.2 レイ-球交差 + reflect()/refract() による物理ビーム経路

**何を解決するか**: 現状の「固定ターゲット (0,1.18,0)(球の内部!)+ 成分反転の反射 + 1.4/ior で縮む屈折」という非物理経路。ライトをどこへ動かしても球面上の正しい点にビームが当たり、反射・屈折・床着地点・コースティクス位置がすべて整合するようになる。

**数学(検証済みの定石)**:
1. **レイ-球交差**: レイ `p(t) = s + v t`、球(中心 C、半径 r)に対し `(v·v)t² + 2(v·(s−C))t + |s−C|² − r² = 0` の二次方程式。判別式 < 0 なら外れ(その場合は球中心方向へ照準を補正するフォールバックを用意)。小さい方の正根が入射点 P₁。
2. **入射点の法線** `n₁ = (P₁ − C)/r`。**反射**は three.js の `Vector3.reflect(n₁)` がそのまま使える。**屈折**は Snell 則 `η₁ sinθ₁ = η₂ sinθ₂`。three.js の Vector3 に refract はないので GLSL `refract()` 相当を 10 行程度で自前実装(`k = 1 − η²(1 − (n·i)²)`、k<0 で全反射、そうでなければ `t = η i − (η(n·i) + √k) n`)。
3. **内部区間**: 屈折方向で球内部を進み、2 回目の球交差(こんどは大きい方の根)が出射点 P₂。出射法線は `−(P₂−C)/r` ではなく `(P₂−C)/r` を裏返して使用(内側から見るため)。
4. **出射屈折**: η を逆数 (ior→1/ior) にして再度 refract。**球の重要な性質**: 入射時の曲がり角と出射時の曲がり角は等しく、周囲より高屈折率の球では外→内→外の経路で全反射は起こらない(Sam Driver の解説)。つまりこの展示の構成なら TIR 分岐は実質不要(ただし k<0 ガードは入れておく)。
5. **床着地**: 出射レイと床平面 y=0 の交差 `t = −P₂.y / d.y`(d.y ≥ 0 なら床に届かない→コースティクス非表示 or フェード)。この点がコースティクス板の中心になる。
6. 反射と屈折の**強度配分**は Schlick 近似のフレネル `F = F₀ + (1−F₀)(1−cosθ)⁵`、`F₀ = ((1−ior)/(1+ior))²` で反射ビームの opacity を変調すると、掠り角で反射が強くなる教材的に正しい挙動になる。

**実装要点**: すべて CPU(JS)側で settings 更新時に 1 回計算するだけ。ビーム点列は「光源→P₁」「P₁→P₂(球内)」「P₂→床」の 3 直線区間 + 反射「P₁→反射方向」になる。現在は屈折が 2 区間の折れ線なのでデータ構造はほぼ流用できる。マーカーも P₁ / P₂ / 床着地点に置けば「浮いたマーカー」問題が消える。

**コスト/リスク**: 計算コストは無視できる。リスクは「光源が球の真上/真下」等の特異配置で見た目が急変すること(スライダー範囲でクランプするか、交差しない場合のフォールバック照準を球中心に向ける)。テストが生ソース文字列一致なので定数変更でテスト更新が必要(既知の制約)。

**出典**:
- https://samdriver.xyz/article/refraction-sphere (レイ-球交差・二重界面屈折・球の対称性と TIR)
- https://blog.demofox.org/2017/01/09/raytracing-reflection-refraction-fresnel-total-internal-reflection-and-beers-law/ (refract()/Fresnel/Schlick/Beer 則の実装解説)
- https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-shading/reflection-refraction-fresnel.html (フレネルによる反射/屈折の配分)
- https://gist.github.com/wwwtyro/beecc31d65d1004f5a9d (GLSL レイ-球交差の定番実装)

---

### 2.3 スペクトル RGB サブチューブによる分散ビジュアライズ

**何を解決するか**: §2.1 の dispersion はガラス「体」の見た目だけ。ビーム(光路の教材部分)にも分散を可視化すると、「白い光がガラスで色に分かれる」というこの展示の核心が一目で伝わる。

**手法(検証済みの近似)**:
- 波長依存 IOR は **Cauchy の 2 項式** `n(λ) = A + B/λ²` で可視域を十分近似できる(LuxCoreRender wiki / DTU のスペクトルレンダリング講義資料)。実時間用途では **R≈700nm / G≈546nm / B≈435nm の 3 波長**に量子化するのが定石。
- 実装: ユーザーの ior スライダー値を G 波長の IOR とみなし、`ior_R = ior − δ`, `ior_B = ior + δ`(δ = 0.008〜0.02 程度、演出的に誇張可)として §2.2 の経路計算を 3 回実行。**入射ビームは 1 本の白**のまま、P₁ 以降(球内部と出射区間)だけ R/G/B の 3 サブチューブに分ける。
- 加算ブレンドなので 3 本が重なる根元付近は自然に白へ合成され、進むほど角度差で分離してレインボーの扇が開く — Shadertoy の「Light dispersion of a beam」と同じ見せ方。

**実装要点**: サブチューブは細く(現行 refraction core 0.018 の半分程度)、glow は白 1 本を維持すると視覚ノイズが出ない。beamSpread スライダーを「δ の誇張倍率」に再定義すると、現在の「意味の薄い横ずらしパラメータ」に物理的意味を与えられる。

**コスト/リスク**: 描画は +2 メッシュ(数百ポリゴン)で無視できる。リスクは加算合成で opacity 設定を誤ると根元が白飛びすること(3 本の合計が現行の白ビーム輝度と揃うよう各 1/3 程度に)。

**出典**:
- https://wiki.luxcorerender.org/Glass_Material_IOR_and_Dispersion (Cauchy/Abbe と分散)
- https://courses.compute.dtu.dk/02941/slides/02941_slides_10_dispersion.pdf (DTU: 分散とスペクトルレンダリング、波長サンプリング)
- https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S14/final_projects/eric_steven.pdf (RGB 3 波長の実装例)
- https://www.shadertoy.com/view/wlSXz3 (ビーム分散の見せ方のリファレンス)

---

### 2.4 静的サイトで可能なコースティクス

**何を解決するか**: 現状のリング+スポークの手続きパターンは「同心円ノイズ」に見え、屈折光の集束という物理と接続していない。

**選択肢(コスト昇順)**:

**(a) 現行シェーダを物理経路に接続する(推奨・第一段)**
§2.2 の床着地点にコースティクス板の中心を置き、出射レイの入射角(`d.y` の浅さ)で板を楕円に引き伸ばし、集束度(フレネル透過率 × 球レンズの焦点距離と着地距離の関係)で輝度を変調する。パターン自体も同心円リングではなく「中心の焦点ホットスポット + 外周に向かう波紋」構造に書き換えると球レンズのコースティクス(カスプ)らしくなる。追加コスト完全ゼロ。

**(b) 事前計算アニメーションテクスチャ(推奨・第二段)**
空間・時間両方でタイル/ループする水面コースティクス連番を焼いてスプライトシート化し、2 フレーム間クロスフェードで再生する。静的ホスティングと完全に相性が良い。
- **Caustics Generator**(dualheights): 空間・時間ともにシームレスなループ連番を出力。**無償版は非商用限定・512×512 まで**。Pro は無制限・EXR 可(€180〜)。ライセンス確認必須。
- **Figment Caustics 無料サンプル**: 240 フレーム 512×512、タイル・ループ対応(Gumroad 配布)。
- **Jos Stam の Periodic Caustic Textures**(トロント大): 研究配布の周期コースティクスマップ。古典だが今も入手可。
- 投影方法は 2 通り: (i) 現行どおり床の板のテクスチャとして貼る(最安)。(ii) **`SpotLight.map`** にテクスチャを入れて光源位置から投影する(three.js 標準機能。光源スライダーと投影方向が自動連動する利点があるが、影マップ付き SpotLight のコストが乗る)。
- 注意: テクスチャは `NoColorSpace`/リニア扱いにし加算ブレンドで乗せると現行のトーンと馴染む。

**(c) Evan Wallace 式ライトフロントメッシュ(参考・本展示にはオーバーキル)**
水面グリッドの各頂点からライト方向にレイを飛ばし、屈折させて床と交差させた位置へ頂点を移動、**三角形の面積比 = 明るさ**を `dFdx/dFdy` で求める手法(WebGL2 なら派生関数は標準)。1 枚の RT に描いて床へ投影。「水面」前提の手法であり、単一球のガラス展示では (a)+(b) の方が費用対効果が高い。Martin Renou の three.js 移植記事、Maxime Heckel の法線 FBO + コースティクス計算パスの記事も同系統(こちらは FBO 2 パス必要)。将来 Voxel Water 展示に転用する価値はある。

**コスト/リスク**: (a) ゼロ。(b) テクスチャ 1〜2MB 程度の転送量とライセンス確認。(c) RT 1 枚 + 追加ドローで、17-18 FPS の Voxel Water と同居させる予算としては重い。

**出典**:
- https://medium.com/@evanwallace/rendering-realtime-caustics-in-webgl-2a99a29a0b2c (ライトフロントメッシュ + 面積比)
- https://medium.com/@martinRenou/real-time-rendering-of-water-caustics-59cda1d74aa (three.js 移植)
- https://blog.maximeheckel.com/posts/caustics-in-webgl/ (法線 FBO + コースティクス計算パス + 床投影、色収差付き)
- https://www.dualheights.se/caustics/ (Caustics Generator: ループ仕様とライセンス)
- https://henrikbc.gumroad.com/l/figmentcaustics_freesample_caribbean (無料 240f ループ素材)
- https://www.dgp.toronto.edu/~stam/reality/Research/PeriodicCaustics/index.html (周期コースティクスマップ)
- https://discourse.threejs.org/t/how-to-add-caustics-on-top-of-glb-model-just-like-convexseascapesurvey-com-virtual-experience/77468 (SpotLight.map 投影の実例)

---

### 2.5 TubeGeometry 毎フレーム再生成の回避

**何を解決するか**: 現状はスライダー 1 tick ごとに 6 本の TubeGeometry を dispose + new しており、GC チャーンと GPU バッファ再アロケーションが発生する(低スペック機でのドラッグ時カクつき要因)。

**手法**:
- **最良: そもそもチューブをやめる**。§2.2 の物理経路は全区間が**直線**なので、`CylinderGeometry`(または開いた円柱)を 1 回だけ作り、`position` + `quaternion(lookAt)` + `scale.set(1, 長さ, 1)` で区間ごとに変換するだけでよい。ジオメトリ再生成は完全にゼロになる。CatmullRom 由来の「微妙なうねり」は失われるが、光線は直線であるべきなので教材的にはむしろ正しくなる。
- **曲線を残す場合**: セグメント数を固定(tubularSegments / radialSegments を定数化)した TubeGeometry を初期化時に 1 回生成し、更新時は同じトポロジーで頂点位置だけ計算して `geometry.attributes.position.array` に書き込み → `attribute.needsUpdate = true` → `geometry.computeBoundingSphere()`(フラスタムカリング用)。頂点数が不変ならインデックス・UV は再利用できる。これは three.js 公式ドキュメント(BufferAttribute.needsUpdate)とフォーラムで確立されたパターン。`setUsage(THREE.DynamicDrawUsage)` を指定すると毎フレーム更新のヒントになる。
- 注意: `TubeGeometry` クラス自体には「再計算メソッド」はないため、Frenet フレーム計算を自前関数に切り出して同一バッファへ書く形になる。直線なら Frenet 計算も不要。

**コスト/リスク**: 実装工数のみ。シリンダー方式は既存の core/glow 二層構造・opacity 変調をそのまま使える。

**出典**:
- https://threejs.org/docs/#api/en/core/BufferAttribute.needsUpdate
- https://discourse.threejs.org/t/updating-index-position-uv-attributes-of-a-buffergeometry/1342
- https://discourse.threejs.org/t/updating-buffer-attribute-performance-is-incredibly-slow/36415 (アロケーションを避け in-place 更新すべき根拠)

---

### 2.6 transmission の品質・パフォーマンスチューニング

**何を解決するか**: transmission は three.js の中でも高コストな機能(シーンを透過用 RT に別途レンダリング + MeshPhysicalMaterial のピクセル単価)。本展示に dispersion・OrbitControls・コースティクス強化を足しても低スペック機で破綻しないための headroom 確保。

**確認事実**:
- **`renderer.transmissionResolutionScale`**: r172(2024-12, PR #30018)で追加。透過 RT の解像度をビューポート比で縮小するプロパティで、デフォルト 1.0。PR では 33% でも「視覚劣化は最小で大きな性能改善」と報告され、モバイル・低電力デバイス向けと明記。**r184 で利用可能**。
- r164 以降、透過 RT はビューポートサイズに追従(#28088)し、透過パスのプリレンダー(#28097)等の最適化が入っている。
- 透過オブジェクトが複数あるとシーンの再描画が増えるため(drei の MeshTransmissionMaterial ドキュメントでも同趣旨の警告)、**透過メッシュは 1 つに保つ**のが最重要。本展示は現状 1 つで正しい。
- 公式ドキュメント: MeshPhysicalMaterial は「他のマテリアルよりピクセル単価が高く、効果を有効化するほど加算される」。clearcoat も追加パスコストなので、必要性を再評価する余地あり。

**実装要点**:
- `renderer.transmissionResolutionScale = 0.5` を既定にし、`devicePixelRatio` や実測 FPS で 0.33 へ落とすアダプティブ運用が安全。roughness 0.04 のクリアガラスは透過バッファのミップをほぼ先頭しか使わないため、解像度低下は輪郭の滲みとして僅かに見える程度。
- 共有 renderer に設定するプロパティなので、**ルーム離脱時に 1.0 へ戻す**処理を dispose に入れること(他ルームへの影響防止。renderer.info.reset() と同種の共有状態リスク)。
- ガラスの `IcosahedronGeometry(1.35, 8)`(約 1,620 triangles)は妥当。detail を上げる必要はない。

**コスト/リスク**: 設定 1 行で純減。リスクは共有 renderer の状態リークのみ(上記で回避)。

**出典**:
- https://github.com/mrdoob/three.js/pull/30018 / https://github.com/mrdoob/three.js/issues/30017
- https://threejs.org/docs/pages/WebGLRenderer.html
- https://threejs.org/docs/pages/MeshPhysicalMaterial.html (性能ノート)
- https://drei.docs.pmnd.rs/shaders/mesh-transmission-material (透過の多重レンダリング警告)
- https://medium.com/geekculture/understanding-the-three-js-transmission-example-13e952a8ab55

---

### 2.7 depthTest 無効グローの代替(選択的ブルームは非推奨)

**何を解決するか**: ビームの glow チューブと光源ハローが depthTest=false のため、カメラを動かすとガラスや床を貫通して描かれる。§2.8 の OrbitControls 導入の前提整備。

**選択肢の評価**:
- **選択的ブルーム(UnrealBloomPass + layers)**: three.js 公式例はあるが、マテリアル差し替えを毎フレーム行う多パス構成で、フルスクリーンのミップチェーンブラーが走る。QA ログの「ポストプロセス予算なし」方針と低スペック要件に反するため**本展示では非推奨**。
- **Sprite ベースのグロー(推奨)**: Canvas で焼いた放射状グラデーションを `SpriteMaterial`(AdditiveBlending, depthWrite=false, **depthTest=true**)で光源・マーカー位置に置く。ビルボードなのでどの角度でも正しく、depthTest が効くため遮蔽も正しい。光源ハローと 3 つのエンドポイントマーカーはこれで置換できる。
- **FakeGlowMaterial / 背面シェル + フレネル**: ektogamat の fake-glow-material(ポストプロセス不要の GLSL フレネルグロー)や Stemkoski の古典的な BackSide 拡大シェル + `pow(c - dot(view, normal), p)` ハロー。メッシュ形状に沿うグローが欲しい場合(ガラス球自体の縁光)に有効。
- **ビームの glow チューブ**: depthTest=true に戻し、半径をやや太く+opacity を下げて「遮蔽される正しいグロー」にする。ガラス越しのビームは transmission サンプルに含まれるため、貫通表示をやめても見え方は破綻しない。VALORANT の明瞭性の知見(フレネル/グローは「見せたい情報を邪魔しない強度に抑制する」)はビーム輝度設計の参考になる。

**コスト/リスク**: Sprite 化はテクスチャ 1 枚(64×64 canvas 焼き)で追加コストほぼゼロ。リスクは加算 Sprite がガラス手前に来たとき transmission RT に写り込まない点だが、現行チューブも同条件なので後退はない。

**出典**:
- https://threejs.org/examples/webgl_postprocessing_unreal_bloom_selective.html / https://discourse.threejs.org/t/selective-bloom-in-three-js/35345 (選択的ブルームの構成と煩雑さ)
- https://github.com/ektogamat/fake-glow-material-threejs
- https://stemkoski.github.io/Three.js/Shader-Glow.html (BackSide シェル + c/p パラメータ)
- https://www.riotgames.com/en/news/valorant-shaders-and-gameplay-clarity (発光の明瞭性コントロール)

---

### 2.8 展示向け拘束付きカメラ(OrbitControls)

**何を解決するか**: カメラ完全固定のため、ガラスの体積感・分散・コースティクスを別角度から確かめられない。展示として「覗き込める」ことは理解度に直結する。

**実装要点(公式ドキュメント準拠)**:
- `enableDamping = true` + `dampingFactor ≈ 0.05`。**damping / autoRotate 使用時は毎フレーム `controls.update(delta)` が必須**(deltaTime を渡すとフレームレート非依存)。
- 拘束の推奨値: `target.set(0, 1.05, 0)`(現 lookAt を踏襲)/ `minDistance 4.5, maxDistance 12`(ガラスへの没入とステージ全景の間)/ `minPolarAngle 0.35, maxPolarAngle 1.35`(真上と床下・水平グレージングを禁止 → 床コースティクスと depth ソートの破綻角を封じる)/ `minAzimuthAngle −1.2, maxAzimuthAngle 1.2`(リファレンスパネルが常に背景に来る扇形に制限)/ `enablePan = false`(展示は注視点固定が定石)。
- min/max を同値にすると軸回転を固定できる(縦回転だけ許す等の段階導入も可能)。
- **既存要素との衝突**: (1) 無条件の `root.rotation.y` スウェイはカメラ操作と喧嘩するので削除し、autoRotate は `controls.autoRotate`(操作で自動停止する標準挙動)に一本化するのが筋が良い。(2) depthTest=false の FX は §2.7 の置換が前提。(3) 固定カメラ前提でチューニングされた renderOrder チェーン(1,3,4,…,10)は、拘束角度内で総当たり確認する QA 項目を 1 つ立てる。

**コスト/リスク**: OrbitControls 自体のコストはゼロ同然。リスクは上記の既存 FX との整合のみ(だからこそ拘束角を狭く始めて広げるのが安全)。

**出典**:
- https://threejs.org/docs/pages/OrbitControls.html (damping / update(delta) / 各種 min/max)
- https://discourse.threejs.org/t/azimuth-polar-limit/25896 / https://discourse.threejs.org/t/is-there-a-way-to-set-azimuth-and-polar-angles-for-orbitcontrols/14069

---

### 2.9 ダークステージでのガラスの見せ方(アートディレクション定石)

**何を解決するか**: ガラスの輪郭を wireframe シェルで人工的に描いている現状を、写真・プロダクトビズの照明定石で「本物のガラスの読み方」に置き換える。

**定石(スタジオ写真 / ジュエリー CG の一次情報より)**:
- **ダークフィールド・ライティング**: 黒背景のガラスは「面」ではなく**エッジのハイライト**で形を読ませる。背景より大きい光源を背後に置き、背景自体は黒いパッチで落とす → 光が輪郭を「かすめて」細い明線になる(Matt Bristow / Advanced Illumination の解説)。本展示は完全にダークフィールド型の構図であり、この文法に寄せるべき。
- **CG での等価物**: RoomEnvironment(汎用の白い部屋)を、**黒地に縦長ストリップライト 2〜3 本だけを置いたカスタムシーンの PMREM** に差し替える。ガラスの左右輪郭に細く鋭い反射が立ち、wireframe シェルなしで輪郭が読めるようになる。PMREM 焼きは起動時 1 回でランタイムコストは現状と同じ。ストリップは冷色(シアン)+暖色(アンバー)にすれば既存の補色システムをそのまま強化できる。
- **リムライト**: 暗い被写体を背景から切り離す最強の手段で、「ガラス器に美しいグローを与える」用途に最適(ecorn / XO3D)。背後上方からの DirectionalLight 1 灯(暖色・低強度)を追加し、球の上縁に明線を作る。
- **グラデーション照明**: 面に「明→暗のグラデーション」を映すことで立体感と質感を出す(PetaPixel)。ジュエリー CG(HDR Light Studio 系ワークフロー)でもキー/フィルは大面積のソフト光、リム/アクセントはハード光という使い分けが定石(sobling / Lightmap)。
- **グラデーション背景**: 単色黒よりも、注視点背後に**微かなラジアルグラデーション**(中心がわずかに明るい)を置くとガラスの暗部形状が背景から分離する。実装は背景大平面 1 枚のシェーダか `Scene.background` 用の焼きテクスチャで済む。ジュエリーレンダリングでも「グラデーションバックプレート」は標準手法(Light Tracer チュートリアル)。
- **床の整理**: ダークフィールドでは被写体以外の明部がノイズになる。シアンのグリッド中心線(0x42e9ff, opacity 0.28)がコースティクスと輝度競合している現状は定石に反するため、グリッドはさらに減光するか中心線を消す。

**コスト/リスク**: いずれも起動時コスト or 定数変更のみ。リスクは env 差し替えで既存の envMapIntensity(1.55 + thickness×0.42)のバランスが崩れるため再チューニングが必要な点。wireframe シェルは削除ではなく opacity をさらに下げて「保険」として残す選択もある。

**出典**:
- https://www.mattbristow.net/index.php/dark-field-lighting/ (ダークフィールドの原理)
- https://advancedillumination.com/lighting-education/bright-field-dark-field-lighting/ (ブライト/ダークフィールドの体系)
- https://www.instructables.com/Photographing-Glassware/ / https://medium.com/@dtravisphoto/lighting-glass-d9ddf81eeb8f (ガラス器のエッジ定義)
- https://petapixel.com/how-to-create-gradients-of-light-product-photography/ (グラデーション照明)
- https://lighttracer.org/blog/tutorial-jewelry-rendering/ (グラデーションバックプレート)
- https://www.lightmap.co.uk/blog/mastering-jewelry-visualization-with-precision-lighting/ / https://xo3d.co.uk/resources/3d-rendering/product-rendering/lighting-guide/ (キー/フィル=ソフト、リム=ハードの使い分け)
- https://sobling.jewelry/how-to-set-up-proper-studio-lighting-for-jewelry-professional-product-photography/

---

## 3. この展示への適用推奨(優先順)

1. **[S] dispersion 追加**(§2.1): `glassMaterial.dispersion = 0.45` から。Controls にスライダー追加、「Crystal preset」に高分散値を含める。1 行 + UI で主題が立つ最高効率の改善。
2. **[S] transmissionResolutionScale 0.5**(§2.6): 低スペック headroom を先に確保。dispose 時に 1.0 へ復帰を忘れない。
3. **[A] 物理ビーム経路**(§2.2): 固定ターゲット (0,1.18,0) を廃止し、レイ-球交差 + Snell + Schlick フレネルで P₁/P₂/床着地点を算出。マーカー・コースティクス位置がすべてこの計算に従属する形に再配線。beamSpread は「分散誇張率」に意味を変更(§2.3)。
4. **[A] ビームのシリンダー化**(§2.5): 直線区間になるため TubeGeometry 再生成を全廃し transform 更新のみに。3 と同一チケットで実施するのが効率的。
5. **[A] RGB サブチューブ**(§2.3): 出射側のみ 3 波長分離。δ=0.012 × beamSpread 誇張。IOR スライダーで扇の開きが変わる「動く教材」になる。
6. **[B] コースティクス接続 + パターン改善**(§2.4a): 板の中心=床着地点、楕円伸長=入射角、輝度=フレネル透過率。パターンを焦点ホットスポット型に書き換え。余力があれば (§2.4b) の事前計算ループテクスチャ(ライセンス要確認)へ差し替え。
7. **[B] グローの Sprite 化 + depthTest 復帰**(§2.7): OrbitControls の前提整備。光源ハロー/マーカーは加算 Sprite、ビーム glow は depthTest=true で再チューニング。
8. **[B] 拘束付き OrbitControls**(§2.8): damping 0.05、polar 0.35–1.35、azimuth ±1.2、distance 4.5–12、pan 無効。root スウェイ削除、autoRotate を controls 側へ移管。
9. **[C] ダークフィールド env 差し替え**(§2.9): ストリップライト PMREM + リム DirectionalLight + 背景ラジアルグラデーション + グリッド減光。wireframe シェルは減衰して保険化。仕上げのアートパスとして最後に。

**チケット化時の注意(全項目共通)**: `runtime.test.ts` は生ソース文字列一致のため、上記のどれを実装してもテスト文字列の更新が必要。renderer 共有状態(transmissionResolutionScale、info.reset)はルーム間リークをレビュー観点に含めること。

## 未検証事項の明記

- 「dispersion は r164 で PR #28114 により追加」という検索要約が流れてきたが、**#28114 は無関係の PR(LineLoop raycast 修正)だった**。実際のリリースノート記載は #28051/#28057/#28058(本文確認済み)。
- Caustics Generator 無償版の「非商用」の範囲に本ショールーム(個人ポートフォリオ)が入るかは配布元の文言だけでは断定できないため、採用時はライセンス本文の確認が必要。
- SpotLight.map によるコースティクス投影のモバイル実測コストは一次情報が見つからず未検証(フォーラムの実装例のみ)。採用時は実測必須。
