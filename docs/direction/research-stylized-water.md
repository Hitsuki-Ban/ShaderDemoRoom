# スタイライズド/トゥーン水面レンダリング 技術調査(Voxel Water 改善用)

- 調査日: 2026-07-18
- 対象展示: `src/rooms/voxel-water`(64x64 InstancedMesh ボクセル柱 + 156unit シェーダー平面のハイブリッド・トゥーン海。0.6x pixelRatio / MSAA無効 / 17-18 FPS)
- 前提制約: GitHub Pages 静的ホスティング / three.js ~0.184 + React 19 + Vite / WebGL2(WebGPU不可)/ 低〜中スペックGPU対応 / スタイライズド・NPR方向(フォトリアル物理正確性は非目標)
- 出典ポリシー: 本書の技術記述はすべて調査で確認した一次〜二次資料に基づく。出典が見つからなかった項目・本展示向けの独自適用案(推論)はその旨を明記した。

---

## 1. 課題 → 技術マッピング表

| # | 現状の課題(understand-voxel.json の knownIssues/risks より) | 対応技術 | 詳細節 | コスト感 |
|---|---|---|---|---|
| 1 | pow-sine 縦変位のみでクレストが丸く、トゥーンらしい鋭いシルエットが出ない | Gerstner(トロコイド)波の水平変位 + steepness 制約 | §2.1 | 頂点シェーダー内 sin/cos 数個。現行 pow 層と同等 |
| 2 | JS(updateColumns)と GLSL(water.vert)の波モデル二重実装がドリフト済み(正規化定数・振幅乗数が既に不一致) | 波を GLSL 単一ソース化し、柱の高さも GPU 側で変位(onBeforeCompile + インスタンス属性)/ または高さフィールドテクスチャ共有 | §2.2 | CPU 8FPS 更新ループ(4096行列)を丸ごと削減できるため、むしろ高速化 |
| 3 | 天候切替が WEATHER_LOOKS の瞬間スワップ(全フィールドが1フレームでスナップ) | current/target ルックの毎フレーム damp 補間(全フィールドがスカラー or Color で lerp 可能) | §2.3 | CPU で数十個の lerp/フレーム。無視できる |
| 4 | 稲妻が空と水のティントにしか効かず「照明」に見えない。演出も sin エンベロープのみ | SoT 式ベイク済みボルトメッシュ + 頂点シェーダー再生、ambient/emissive パルス連動 | §2.4 | ボルトメッシュ数百頂点 + 既存 uniform 流用 |
| 5 | 泡が高さフィールドの静的閾値で、波の動きに追従しない | (a) フローマップ2位相アドベクション(安価)/(b) SoT 式フィードバックブラー泡バッファ(中コスト) | §2.5 | (a) ほぼ無料 (b) 低解像度 ping-pong RT 1枚 |
| 6 | 0.6x 内部解像度 + CSS 拡大でトゥーン線がぼやける | FXAA 後段パス / sharp-bilinear・iq フィルタ式アップスケール / CAS 風シャープナー | §2.6 | フルスクリーン1パス(FXAA は低スペック GPU 向け最適化版あり) |
| 7 | 雨が剛体 Points ブロックの一括テレポートで、全滴が同時にポップ | 頂点シェーダーでの per-drop fract(time*speed+seed) 個別リサイクル | §2.7 | CPU 毎フレーム更新ゼロ化。頂点シェーダーに数命令 |
| 8 | 太陽が方位のみの dot(dir.xz, sunDir) で「縦の光の帯」になっている | 3D 太陽方向ベクトル + dot(viewDir, sunDir3D) の角半径ディスク | §2.8 | フラグメントに dot + smoothstep 数個 |
| 9 | 水フラグメントの lightDir がハードコードで太陽軌道と乖離 | uSunDirection uniform を空・水・DirectionalLight で単一ソース共有 | §2.8 | uniform 1個 |
| 10 | Storm が暗くなるだけで読みにくい / シェーダー内「ボクセル」スケールが実グリッド(0.62)と不一致 | WW/SoT 流の「線・泡・クレスト明化」によるグラフィック的可読性 + セルスケールの物理グリッド整合 | §2.9 | 定数調整のみ |

---

## 2. 技術詳細

### 2.1 Gerstner(トロコイド)波によるトゥーン向け鋭いクレスト

**何を解決するか**: 現行の `pow(sin*0.5+0.5, sharpness)` 縦変位はピークを尖らせられるが、頂点が水平に寄らないため「クレストに質量が集まる」トロコイド特有のシルエット(鋭い峰・広い谷)は出ない。トゥーン水面で欲しい「峰のエッジが立つ」見た目には水平変位が本質的に効く。

**実装要点(出典確認済みの数式)**:
- GPU Gems Ch.1(NVIDIA): Gerstner 波は頂点をクレスト方向へ水平変位させ、ジオメトリを峰に集中させる。尖り度パラメータ Q は `Q=0` で通常のサイン波、`Q = 1/(w_i·A_i)` で最も鋭いクレスト。**`Σ Q_i·w_i·A_i > 1` になるとクレスト上にループ(自己交差)が発生**するため、実運用ではアーティスト用 steepness 0..1 を `Q_i = Q/(w_i·A_i·numWaves)` に分配する。法線・接線も解析的に求まり「計算は十分効率的」と明記。
- Catlike Coding「Waves」: 頂点はアンカー点の周りを円軌道し、`P = [x + (s/k)·cos(f), (s/k)·sin(f), z + (s/k)·cos(f)]`(s=steepness, k=波数, `f = k(D·xz − c·t)`)。接線 `T = [1 − D_x²·s·sin f, D_x·s·cos f, −D_x D_z·s·sin f]`、従法線も同型で、`N = normalize(cross(B, T))`。**複数波を足すときは steepness 合計が 1 を超えないよう制約**(超えると偏導関数が 1 を超えループが形成される)。
- three.js 実例: madblade/waves-gerstner(頂点シェーダーでのトロコイド波)、sbcode.net の Gerstner Water チュートリアル(JS 側に同関数を移植してボート浮力を同期するパターンも提示)。

**コスト/リスク**:
- コスト: 1波あたり sin/cos 各1回 + ベクトル積。現行の `pow()` 4層と同等以下。頂点シェーダーのみで完結。
- リスク①: **水平変位を入れると「位置 (x,z) → 高さ」の関数ではなくなる**。現行の JS 柱サンプラーや泡・トゥーンランプは高さフィールド前提なので、遠景平面のみに水平変位を適用し、近景ボクセル柱は縦変位のままにするのが安全(§2.2 の単一ソース化とセットで検討)。〔この切り分けは本展示向けの推論〕
- リスク②: steepness 合計制約を守らないとループ髪飾りのようなアーティファクトが出る(上記2出典どちらも明記)。uChop スライダーを Q に割り当てるなら `numWaves` 分配式をそのまま使うこと。
- 折衷案〔推論〕: 完全な Gerstner にせず、高さ評価前にサンプリング座標を `xz' = xz − Q·A·D·cos(f)` とドメインワープする「見かけトロコイド」なら height-only 性質を保ったまま峰を尖らせられる。JS 側と式を揃えやすい。

**出典**: [GPU Gems Ch.1](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models) / [Catlike Coding – Waves](https://catlikecoding.com/unity/tutorials/flow/waves/) / [madblade/waves-gerstner](https://github.com/madblade/waves-gerstner) / [sbcode Gerstner Water](https://sbcode.net/threejs/gerstnerwater/)

### 2.2 波モデルの単一ソース化(JS/GLSL 二重実装の解消)

**何を解決するか**: understand-voxel.json が指摘する最重要リスク——`runtime.ts updateColumns` は `water.vert.glsl waveField()` の手書きコピーで、既に正規化除数(1.04+swell·0.56 vs 1.02+swell·0.54)、方向正規化の有無、波高乗数(0.7+swell·0.22 vs 0.72+swell·0.34)が食い違っている。将来の波調整はすべて2回書く必要がある。

**選択肢A(推奨): 柱の変位を GPU に移す(onBeforeCompile + インスタンス属性)**
- Codrops「Interactive Wave Propagation Cube Grid」(2026-07)がほぼそのままの設計図: InstancedMesh の各キューブに `aOffset`(XZ 位置)インスタンス属性を持たせ、`onBeforeCompile` で `#include <begin_vertex>` の後に波変位 GLSL を注入。数百ドローコールを1つに統合し、CPU 側の per-instance 計算を排除。影が必要なら `customDepthMaterial` に同じ注入をして同期(本展示は影なしなので不要)。
- 本展示への適用〔推論〕: `waveField()` を GLSL チャンク(1ファイル)として水平面の vert と柱の MeshStandardMaterial 注入の両方に `#include` する。柱は box 頂点の y>0 側だけを `scale` する形で伸縮(頂点シェーダー内で `position.y * height + offset`)。**これで 8FPS の CPU 行列更新ループ(4096 instance × 60/8 Hz)が消え、近/遠のシーム位相差・8FPS ステッピングの時間的不一致も同時に解消される**。17-18 FPS の主犯候補を一つ削れる。
- 柱の色バンド(現 CPU の columnColorBand パイプライン)も同じチャンクの `vWave` から fragment 側で計算可能。CPU 色更新(~2.7Hz)の遅延も消える。移行を段階化するなら、まず高さのみ GPU 化し色は CPU 継続でもよい。

**選択肢B: 高さフィールドテクスチャの共有**
- DataTexture(例 128×1 や 64×64 の RGBA float)に CPU で書いた値を両マテリアルの頂点シェーダーでサンプルする(WebGL2 は頂点テクスチャフェッチ可)。Codrops 記事は 128×1 float DataTexture をマウストレイルの受け渡しに使い、`needsUpdate = true` を毎フレーム1回だけ呼ぶ。
- GPUComputationRenderer で heightmap を GPU 内で反復更新する方式(Franky Hung の three.js 水面記事)は、CPU-GPU 転送を完全に避けられるが、本展示の解析的な波(時刻から直接計算できる)には過剰。インタラクティブな波紋を将来足すなら候補。
- リスク: CPU が波高を知る必要が残る場合(将来ブイや船を浮かべる等)、テクスチャ方式なら CPU 側が書き込み元なので同期は自明。GPU 完結方式(選択肢A)では JS 用に同式の1点サンプラーだけ残すことになる——その場合は**波パラメータ(方向・周波数・振幅・位相・鋭さ)を単一の定数テーブル(TS の配列)にして、GLSL には文字列テンプレートで焼き込む**のが定石〔このコード生成パターン自体の単独の一次出典は見つからなかったが、sbcode の Gerstner チュートリアルが「同じ関数を JS に移植して浮力を取る」構成を示している〕。

**出典**: [Codrops – Wave Propagation Cube Grid](https://tympanus.net/codrops/2026/07/09/building-an-interactive-wave-propagation-cube-grid-with-three-js/) / [Franky Hung – Realistic and Fast Water Waves in Three.js](https://franky-arkon-digital.medium.com/realistic-but-fast-water-waves-in-three-js-a48e2c9b0695) / [three.js DataTexture docs](https://threejs.org/docs/#api/en/textures/DataTexture) / [sbcode Gerstner Water](https://sbcode.net/threejs/gerstnerwater/)

### 2.3 天候状態のクロスフェード

**何を解決するか**: `updateSettings` → `updateUniforms` の WEATHER_LOOKS 瞬間テーブルスワップ。フォグ near/far、全ティント、ライト強度が1フレームで切り替わる。

**実装パターン(業界標準の確認)**:
- ゲーム天候システムの解説記事(peerdh ほか)は一致して「状態間の全数値・色デルタを時間補間でブレンドし、フォグのフェードイン・風の漸増・ライトの緩やかな変化としてスナップを避ける」「current state と target state を分離し、設定間隔で補間する」パターンを提示。商用アセット(BuiltByBit Weather System)も「全数値と Color デルタの lerp 補間」「Storm プリセットへのスムーズなクロスフェード」を仕様として明記。
- three.js 側の道具はすべて揃っている: `Color.lerp` / `Color.lerpColors`、スカラーは `MathUtils.damp`(フレームレート非依存の指数減衰)または `lerp`。
- 本展示への適用〔推論・具体案〕: WEATHER_LOOKS が既に「全フィールドがスカラー or Color の純データテーブル」なので、(1) `blendedLook` ワーキングコピーを1個持つ、(2) weather 切替時は `targetLook` を差し替えるだけ、(3) 毎フレーム `blendedLook.field = damp(blendedLook.field, targetLook.field, λ≈2.5, dt)`(色は作業用 Color で lerp)、(4) `updateUniforms` は blendedLook を読む——に変えるだけで全プロパティが 1〜2 秒のシネマティック遷移になる。rainCurtain・lightningIntensity・fogNear/far も同経路なので個別対応不要。
- 注意点〔推論〕: 色 lerp は現行どおり linear 空間の Color 同士で行う(sRGB hex から `new Color()` した後の値)。また shader-quality.test.ts が定数文字列をピン留めしているため、テーブル値自体は変えず「読み出し経路」だけ差し替えるのがテスト影響最小。
- 演出強化のオプション: Codrops「The Sleepers」は B/W テクスチャの赤チャンネルを**ピクセル毎の閾値**として使い、progress 増加で領域が波打ちながら遷移する安価なトランジションを紹介(天候変化の「前線が通過する」表現に転用可能。ただしポストパス1枚が必要)。

**出典**: [peerdh – Advanced Techniques for Dynamic Weather Systems](https://peerdh.com/blogs/programming-insights/advanced-techniques-for-dynamic-weather-systems-in-game-engines) / [BuiltByBit – Weather System (仕様記述)](https://builtbybit.com/resources/weather-system-storms-rain-snow.107475/) / [three.js Fog manual](https://threejs.org/manual/en/fog.html) / [Codrops – The Sleepers](https://tympanus.net/codrops/2026/07/10/the-sleepers-creating-an-atmospheric-webgl-experience-with-lightweight-techniques/)

### 2.4 トゥーン調の稲妻・嵐演出

**何を解決するか**: 現状の稲妻は `lightningPulse`(nested-sine pow-10 エンベロープ)が空と水のティントを押すだけで、ボクセル柱は一切光らず「照明ではなく色被り」に見える(knownIssues 明記)。

**一次情報: Sea of Thieves(SIGGRAPH 2018 Talk, Rare)の分岐稲妻**:
- Houdini でランダム化 L-System から分岐稲妻の 3D 形状を生成し最長パスを主枝として選択。**各頂点に「主枝か否か」「原点からの距離」をベイク**し、終点が始点の真上1ユニットになるよう回転・スケールして正規化。**頂点シェーダーがこの距離属性を使ってストライクをアニメーション**(スローモーション映像のような複雑な動態を安価に再生)。
- 本展示への移植〔推論〕: Houdini は不要。ビルド時スクリプト(既に scripts/ ディレクトリの前例あり)か手書きの再帰分岐で折れ線ボルトを生成し、`aDistanceAlongBolt` / `aIsMainBranch` を頂点属性に焼いた LineSegments または細長い quad ストリップを1〜2本用意。フラグメントで `step(uStrikeProgress, aDistance)` により先端へ伸びる描画、`lightningPulse` 減衰で消灯。GitHub Pages 制約(ビルド時アセット生成可)に完全適合。
- ライティング連動〔推論・実装は既存 uniform の流用のみ〕: パルス時に (a) `ambientLight.intensity += lightningPulse * k`、(b) 柱マテリアルの `emissiveIntensity += lightningPulse * k`(柱は toneMapped:false なので renderer.toneMappingExposure ではなく emissive/ambient 経由が正しい)、(c) 空は現行の `uLightningPulse` 加算を維持——で「稲妻が世界を照らす」1フレーム級の説得力が出る。lightningPulse は既に水・空で共有されているので配線は小さい。
- スタイライズドの流儀(二次資料): カートゥーン稲妻は「煙・稲妻・火花・インパクト」の要素分解でフリップブック(スプライトアニメ)として作られるのが定番(ArtStation の Cartoon Lightning VFX 事例、VFX Apprentice のコース記述)。フル 3D ボルトの代わりに、空ドームへ 2〜3 フレームのジグザグ形状を一瞬描く「フラッシュフレーム」でも様式として成立する。
- Wind Waker の嵐: サイクロン周辺で「大気が変わり、1マイル先からも視認でき、曇天・風・時々雨に移行する」という**遠距離から読める前兆演出**が資料で確認できる(Zelda wiki)。稲妻自体の技術的解説は見つからなかった(該当出典なし)。「嵐を暗さではなく、遠くから読めるシルエットと前兆で描く」というディレクション原則として引用するに留める。

**出典**: [The Technical Art of Sea of Thieves (SIGGRAPH 2018 PDF)](https://history.siggraph.org/wp-content/uploads/2022/09/2018-Talks-Ang_The-Technical-Art-of-Sea-of-Thieves.pdf) / [ArtStation – Cartoon Lightning VFX](https://www.artstation.com/artwork/xDRJlr) / [Zelda wiki – Cyclone](https://zelda.fandom.com/wiki/Cyclone)

### 2.5 スタイライズド・フォーム(泡)のアドベクション/クレスト泡

**何を解決するか**: 現行 `vFoam = smoothstep(0.78−uFoam·0.12, 0.98, wave+slope·0.18)` は高さフィールドの静的閾値で、泡が波と一緒に「流れず」、峰に瞬間的に貼り付くだけ。

**一次情報: Sea of Thieves の泡パイプライン(SIGGRAPH 2018)**:
1. 泡はウェーブピークで生成(Tessendorf 2001 の手法 = チョッピネス変位由来。Gerstner/FFT では水平変位のヤコビアンが負に近づく箇所が「折り重なり=砕波」)。
2. オブジェクト交差部にも depth buffer 比較で泡を追加(カメラ中心ウィンドウ内)。
3. **泡バッファをフィードバック付きで漸進的にブラーし、泡が「散っていく」様子とソフトなマスクを得る**(スタイルに合う柔らかさ)。
4. 結果マスクをアーティスト作テクスチャとブレンドしてスタイライズ。
5. **泡の生成量・拡散・ブレンドは calm / normal / stormy の天候状態で変える**(storm は攪拌の泡を増やし、calm は交差泡のみ)。
- 水色も「深水色⇔サブサーフェス色を、視線角・太陽方向・**ウェーブピークマスク**(チョッピネス変位が大きい=光の透過距離が短い=明るい)でブレンド」— 泡だけでなく「峰で水色自体が明るく透ける」のが SoT のスタイライズの核。

**安価なアドベクション(泡が流れる)テクニック**:
- Daniel Ilett(WW 風 URP 水面): Voronoi の白グリッド線テクスチャをフローマップで UV 歪曲しながらスクロールし、**同じテクスチャを (0.1,0.1) オフセットで2回サンプルして「白い泡+下の暗い泡」の2層**にする。1024 枚の水メッシュで GTX1070 約 400fps と報告(激安)。
- gameidea(2026)Stylized 3D Water: 泡の渦巻きは「時間で動くフロー UV によるドメインワープ」で表現。Gerstner のクレスト係数に「泡の分散(dispersion)」を足す構成。
- Roystan トゥーン水: ノイズを `sample > cutoff ? 1 : 0` の二値化 + smoothstep で縁だけ AA、という「トゥーン泡の縁の作法」。
- 本展示への適用〔推論・優先度順〕:
  - 【安価・即効】泡マスクのサンプリング UV を波レイヤー A/B の合成方向 × 時間で移流させ、`fract` 2位相(0.5 ずらした2サイクルを三角波でクロスフェード)でリセット時のポップを隠す。静的閾値 → 「峰から風下へ尾を引く泡」になる。追加コストはノイズサンプル1〜2回。
  - 【中コスト】SoT 式フィードバック: 128〜256px の ping-pong RT にクレストマスクを書き→前フレームを 0.95 減衰 + 1px ブラーで合成。泡が数秒かけて散る。フルスクリーンパス2枚だが低解像度なので 0.6x 制約下でも現実的。ただし §2.6 のポストパス導入と同時にやるとパス数が嵩む点に注意。
  - 【色の峰抜け】SoT のウェーブピークマスクを流用し、泡以外に `mid→shallow` パレットの持ち上げを `vSlope`(既存)+チョッピネス由来項で駆動する。「白を足す」より「水色が透ける」方が Storm の可読性に効く。

**出典**: [The Technical Art of Sea of Thieves (PDF)](https://history.siggraph.org/wp-content/uploads/2022/09/2018-Talks-Ang_The-Technical-Art-of-Sea-of-Thieves.pdf) / [Daniel Ilett – Stylised Water in Shader Graph and URP](https://danielilett.com/2020-04-05-tut5-3-urp-stylised-water/) / [gameidea – Creating a Stylized 3D Water Shader](https://gameidea.org/2026/02/01/creating-a-stylized-3d-water-shader/) / [Roystan – Toon Water](https://roystan.net/articles/toon-water/)

### 2.6 低解像度レンダリング(0.6x)の知覚品質向上

**何を解決するか**: pixelRatio 0.6 + antialias:false により、細いトゥーン線(グリッドインク・バンド境界・柱エッジ)が CSS 由来のバイリニア拡大でぼやける(862×836 viewport に対しバッキングストア 517×501)。

**選択肢A: FXAA 後段パス(「ぼかしを整える」方向)**
- three.js 標準の FXAAShader を EffectComposer の最終 ShaderPass として追加し、`resolution` uniform を実描画サイズ(pixelRatio 込み)で設定するのが公式の作法(three.js issue #15553 で例示要望と使い方が確認できる)。
- mattdesl/three-shader-fxaa: **テクスチャ座標を頂点シェーダーから渡して依存テクスチャ読み(5回)を回避した最適化 FXAA**。PowerVR(iOS)等の帯域制限 GPU に好適と明記。本展示の低スペック要件に合う。
- 注意: EffectComposer は pixelRatio を自動処理しないため、二重エイリアシングを避けるには uniform を実サイズに合わせる必要がある(issue #10238)。

**選択肢B: シャープアップスケール(「低解像度を様式として立てる」方向)**
- Sharp-bilinear: **整数倍への NN プリスケール後、残りの端数だけバイリニア**。テクスチャサンプル1回で GPU のスケーリングハードウェアがほぼ無料で処理。ピクセルの「揺れ」ゼロで最小限のブラー(Filthy Pants / Bumbershoot 両記事で確認)。
- Inigo Quilez の improved texture filtering(バイリニア前に UV を加工)は「プレーンなバイリニアより顕著にシャープで、ピクセルサイズは均等のまま」。
- 本展示への適用〔推論〕: ボクセル美学の展示なので、0.6x を隠すのではなく「レトロ・ボクセル調のクリスプなピクセル」として見せる B 案が芸風に合う。手順: シーンを 0.6x の WebGLRenderTarget に描き、キャンバス自体はフル解像度にして sharp-bilinear/iq フィルタでブリット(フルスクリーン三角形1枚)。ゼロコスト実験として、まず現行キャンバスに CSS `image-rendering: pixelated` を当てて見た目の方向性だけ先に確認できる(この CSS 手法自体は各記事の「NN 拡大」に相当)。
- どちらの案も**フルスクリーンパスが1枚増える**(現在ポスト FX ゼロ)。17-18 FPS の現状では、§2.2 の CPU 負荷削減とセットで導入し、RT 解像度は 0.6x のまま維持するのが安全。FXAA は「線を溶かす」副作用があるため、トゥーンの細線が主役の本展示ではまず B → 物足りなければ A を B の後段に足す順を推奨〔推論〕。

**出典**: [mattdesl/three-shader-fxaa](https://github.com/mattdesl/three-shader-fxaa) / [three.js issue #15553 (FXAA 使用法)](https://github.com/mrdoob/three.js/issues/15553) / [three.js issue #10238 (composer と pixelRatio)](https://github.com/mrdoob/three.js/issues/10238) / [Filthy Pants – Shaders for Sharpest Pixels](http://filthypants.blogspot.com/2017/01/shaders-for-sharpest-pixels.html) / [Bumbershoot – Sharp Bilinear Filters](https://bumbershootsoft.wordpress.com/2025/10/11/sharp-bilinear-filters-big-clean-pixels-for-pixel-art/)

### 2.7 雨パーティクルの個別リサイクル(剛体ブロック解消)

**何を解決するか**: 現行の雨は 420 滴入りの単一 Points を `position.y -= delta*speed` で丸ごと下げ、y=−4 で一括 y=1.5 テレポート——約 0.9 秒ごとに**全滴が同時にポップ**する。

**実装パターン(出典確認済み)**:
- Cyanilux「Rain Effects Breakdown」: セル毎に**ランダムな時間オフセット**を持たせ `frac(Time + offset)` で繰り返しサイクルを作る(パーティクルの効率的な再利用)。速度は乱数を `lerp` で 0.7〜1.7 倍にリマップしてばらつかせ、再出現直後の「即ポップ」はフェード(値を10倍→saturate→one-minus)で隠す。雨筋は Stretched Billboard。
- WebGL GPU パーティクル一般論(dev.to / suboorkhan): `uTime` uniform だけ渡し、位置計算を頂点シェーダーに置けば **JS の毎フレームコストはゼロ**。
- 本展示への適用〔推論・具体案〕: Points ジオメトリに `aSeed`(0..1 乱数)と `aSpeed`(0.7..1.7)属性を追加し、頂点シェーダーで `float cycle = fract(uTime * uFallSpeed * aSpeed / SPAN + aSeed); pos.y = mix(TOP, BOTTOM, cycle);` とする。CPU 側の `rain.position.y` 更新と一括テレポートを削除。着水間際の `gl_PointSize` 縮小や alpha フェードも cycle から導ける。スプレイ(剛体回転ディスク)にも同型の per-particle 位相を適用すれば「機械的な縁」も解消。PointsMaterial のままでは頂点シェーダーを書けないため ShaderMaterial 化(または onBeforeCompile)が必要——ただし雨は 420 頂点なので移行は小さい。

**出典**: [Cyanilux – Rain Effects Breakdown](https://www.cyanilux.com/tutorials/rain-effects-breakdown/) / [dev.to – GPU-Accelerated Particle System with WebGL](https://dev.to/hexshift/building-a-custom-gpu-accelerated-particle-system-with-webgl-and-glsl-shaders-25d2)

### 2.8 グラデーションドームへの太陽ディスク(3D 方向ベース)

**何を解決するか**: 現行 sky.frag は `sunDir = (cos, sin)(uSkyTime·2π)` の**方位のみ**で `dot(dir.xz, sunDir)` を取るため、太陽が「縦の明るい帯」になる。加えて water.frag の lightDir はハードコードで、DirectionalLight の軌道と乖離している。

**実装パターン(出典確認済みの数式)**:
- Kelvin van Hoorn(Unity skybox チュートリアル): `sunViewDot = dot(viewDir, sunDir3D)` に対し `GetSunMask: stepRadius = 1 − sunRadius²; return step(stepRadius, sunViewDot)` で角半径ベースの円盤を作る。色は `sunColor = lightColor · mask`。地平線下は `sunZenithDot`(太陽高度)でマスク。柔らかい縁はブルームに任せるか smoothstep で直接。
- Godot「Stylized sky with procedural sun and moon」等でも同型(dot + smoothstep が定番)。検索で確認した典型例は `smoothstep(0.03, 0.026, sunAmount)` のような**二値に近い狭い smoothstep**(トゥーンに向く)。
- 本展示への適用〔推論〕: `uSkyTime` から 3D 太陽方向を1箇所で構築する——`azimuth = skyTime·2π`, `altitude` は既存の DirectionalLight 軌道(`y = 3.2 + sin(skyTime·π)·5.8`)と同じ正規化方向を使い、`uSunDirection`(vec3)として **sky.frag(ディスク+ハロ)/ water.frag(スペキュラ・フレネルの lightDir 置換)/ JS の DirectionalLight.position** の3者で共有する。これで「太陽の絵・水面ハイライト・柱の陰影」が初めて同じ光源を向き、リスク一覧の「照明の読みが近/遠で分裂」も同時に解消。ディスクは `smoothstep(cos(r+w), cos(r), sunViewDot)`(角半径 r ≈ 0.03〜0.05 rad)+ 広い warm ハロ smoothstep の2段で、ポストブルームなしでもトゥーンらしく決まる。

**出典**: [Kelvin van Hoorn – Unity skybox tutorial](https://kelvinvanhoorn.com/tutorials/unity_skybox_shader/) / [Godot Shaders – Stylized sky with procedural sun and moon](https://godotshaders.com/shader/stylized-sky-with-procedural-sun-and-moon/) / [Maxime Heckel – On Rendering the Sky](https://blog.maximeheckel.com/posts/on-rendering-the-sky-sunsets-and-planets/)(WebGL 文脈の大気・太陽描画の参考)

### 2.9 名作リファレンスのアートディレクション分析

**Wind Waker(Nathan Gordon の Graphics Analysis / 各種再現シェーダー)**:
- 海は「フラットな青の大面 + 泡の線のネットワーク」。**同じタイル可能な線テクスチャを2回、座標をずらしてサンプルし、1回目は白(明るい泡線)、2回目は暗青(影の線)として重ねる**——これだけで反復感のない豊かな面になる。
- 頂点変位は複合サイン波: `y = (sin(x·1.0 + t·1.0) + sin(x·2.3 + t·1.5) + sin(x·3.3 + t·0.4)) / 3.0`。「基本的な Perlin noise に見えるが計算は非常に安い」。
- 移動はメッシュではなく**テクスチャ座標のオフセット**で偽装(船は中心のまま、海が下をスクロール)。
- GameCube に頂点シェーダーがなかったため元は CPU 変位——つまり**この様式は計算資源をほぼ要求しない**ことが証明済み。
- 教訓→本展示: 「泡線 = 明+暗の2層オフセットサンプル」は現行 gridLine/storm ink をそのまま進化させられる(現在は1層)。線ネットワークのスケールは §1 の指摘どおり物理ボクセルグリッド(0.62)の整数倍に揃えると「ボクセルの海」として意味が通る〔整合の推奨は推論〕。

**Sea of Thieves(SIGGRAPH 2018, Rare)**:
- ベースは Tessendorf FFT だが、スタイライズの本体は (1) **視線角 × 太陽方向 × ウェーブピークマスクによる deep⇔subsurface の色ブレンド**(峰で水が明るく透ける)、(2) フィードバックブラー泡、(3) **天候3状態(calm/normal/stormy)で泡の量と挙動を変える**、(4) 低い太陽用のエリアスペキュラ(Karis の closest-point-on-sphere)。
- 雲はレイマーチせず「不透明ジオメトリ + 頂点単位の擬似 SSS 照明 + 1/4 解像度バッファでブラー合成」。**遠方の雲はアルファ閾値でエッジを立たせてカートゥーン的に**——本展示の cloudDeck(フラットボックス14個)の輪郭処理の先例になる。
- 稲妻は §2.4 のとおり L-System ベイク + 頂点シェーダー再生。
- 教訓→本展示: 「Storm = 暗くする」ではなく「Storm = 泡と攪拌が増え、峰の透けが強まり、稲妻が世界を照らす」。SoT の状態別泡量マッピング(calm は交差泡のみ/storm は churn 泡)は、そのまま uFoam の weather 連動 floor として移植できる〔移植案は推論〕。

**Townscaper(Oskar Stålberg)**:
- 「無限の海に浮かぶ歪んだグリッドの町」。水面は演出をほぼ排したフラットな穏やかさで、**彩度の高い建物を引き立てる「静かなネガティブスペース」**として機能する(Wikipedia / 公式)。水シェーダーの技術的解説の一次資料は見つからなかった(該当出典なし)。
- 教訓→本展示: Clear 状態の理想像。水自体の演出を盛るほど良いわけではなく、ボクセル柱(主役)を引き立てる静けさの設計が Clear の完成度を決める。

**Wandersong**: 技術解説・アートディレクションの信頼できる一次資料は今回の調査では見つからなかった(該当出典なし)。フラットなベクター調の色帯という一般的印象に基づく言及は本書では避ける。

**トゥーン水の実装作法の共通項(Roystan / Ilett / godotshaders / Codrops R3F)**:
- 二値化(step/閾値)+ 縁だけ smoothstep AA、が「トゥーンの硬さ」と「ちらつき防止」の両立点。
- 深度ベースの色グラデーション(浅→深)と交差泡は depth texture が要る(本展示は単一パスなので不採用が妥当だが、ボクセル柱の「水面下の柱が透けて見える」表現を将来やるなら候補)。

**出典**: [Nathan Gordon – The Ocean (Wind Waker analysis)](https://medium.com/@gordonnl/the-ocean-170fdfd659f1) / [The Technical Art of Sea of Thieves (PDF)](https://history.siggraph.org/wp-content/uploads/2022/09/2018-Talks-Ang_The-Technical-Art-of-Sea-of-Thieves.pdf) / [Townscaper (Wikipedia)](https://en.wikipedia.org/wiki/Townscaper) / [Roystan – Toon Water](https://roystan.net/articles/toon-water/) / [Codrops – Stylized Water Effects with React Three Fiber](https://tympanus.net/codrops/2025/03/04/creating-stylized-water-effects-with-react-three-fiber/)

### 2.10 半透明水シートをボクセル柱の上に本当に重ねる合成(監査追補)

**何を解決するか**: カルテのリスク「透明プレーン(renderOrder 1, depthWrite:false)が alpha=1 の柱(renderOrder 2)より**先に**描画されるため、『ボクセル本体を覆う半透明トゥーン水シート』というコンセプトは柱間 0.02 unit の隙間にしか存在しない」。監査でどの資料にも対応節がないと指摘された欠落分。

**選択肢(安い順)**〔適用検討は推論、技法自体は出典あり〕:
1. **描画順の是正 + 深度テスト(本命・ほぼ無料)**: 柱を透明パスから外し(`transparent:false` — columnOpacity は恒等 1 なのでデッドフラグ掃除と同時に)、**不透明の柱を先に描いて深度を書き、その後に透明プレーンを depthTest:true / depthWrite:false で描く**。プレーンより手前に突き出た柱は深度テストで正しく抜け、水面下の柱の上にはシートがブレンドされる。three.js の透明ソート問題の標準解であり、renderOrder は「柱 < プレーン」に反転するだけ。透明パスから 4096 インスタンスが消えるため VW-9(パフォーマンス)にも直接寄与。
2. **alphaHash(three r154+、確率的透明)**: `material.alphaHash = true` でソート不要の順序非依存透明が得られる(Wyman & McGuire の Hashed Alpha Testing)。ノイズが出るため通常は TAA 前提だが、本展示は 0.6x 内部解像度でノイズが増幅される点に注意。ブルーノイズ的なスクリーンドア見えが「ボクセル/レトロ様式」として成立する可能性はあり、**様式実験としてプロトタイプ価値あり**(採否はアートジャッジ)。
3. **深度プリパス(colorWrite:false で深度のみ先行描画)**: 自己交差する透明メッシュの内部二重ブレンド防止の定石。単一プレーン+柱の本件では 1 で足りるため、将来「水中ボリューム」等で透明要素が増えた場合の保険として記録。

**推奨**: まず 1 を実施(コンセプトの実現+透明パス負荷減の一石二鳥)。2 は 1 の結果を見て様式実験として別チケット化。

**出典**: [three.js example – webgl_materials_alphahash](https://threejs.org/examples/webgl_materials_alphahash.html) / [Wyman & McGuire – Hashed Alpha Testing (NVIDIA Research)](https://research.nvidia.com/labs/rtr/publication/wyman2017hashed/) / [three.js discourse – Three.js and the transparent problem](https://discourse.threejs.org/t/threejs-and-the-transparent-problem/11553)

---

## 3. この展示への適用推奨(優先度つき)

パフォーマンス予算(17-18 FPS)を悪化させないため、「まず減らす→次に足す」の順を推奨する。

### P0: 負荷を減らしつつ品質構造を直す(他のすべての前提)
1. **波モデル単一ソース化 + 柱変位の GPU 化**(§2.2 選択肢A)。波 GLSL チャンクを平面 vert と柱 onBeforeCompile で共有し、CPU の 8FPS×4096 行列更新を廃止。ドリフト解消・シーム位相一致・CPU 時間削減が一挙に得られる。波パラメータは TS の単一テーブルからシェーダー文字列へ焼き込み、JS 用1点サンプラーも同テーブルから生成。
2. **雨・スプレイの頂点シェーダーリサイクル**(§2.7)。`aSeed`/`aSpeed` + `fract` ループ。CPU 更新削除とポップ解消。
3. **uSunDirection の単一ソース化**(§2.8 後半)。ハードコード lightDir を廃し、空・水・DirectionalLight で共有。

### P1: 見た目の底上げ(安価な順)
4. **天候クロスフェード**(§2.3)。blendedLook + damp。体感品質への寄与が最も大きい割に実装が小さい。
5. **太陽ディスク**(§2.8)。3D sunDir の角半径ディスク + warm ハロ。skyTime スライダーの価値が一気に上がる。
6. **泡の2位相アドベクション**(§2.5 安価案)+ WW 式「明+暗」2層泡線(§2.9)。静的閾値から「流れる泡」へ。
7. **Storm の可読性**: SoT 式ウェーブピーク透け(峰で mid→shallow を持ち上げ)+ 天候別泡量(calm=最少, storm=churn)+ 稲妻の ambient/emissive 連動(§2.4)。「暗い storm」から「荒れて光る storm」へ。

### P2: 予算が確認できたら
8. **アップスケール様式の決定**(§2.6)。まず CSS `image-rendering: pixelated` で方向性確認 → sharp-bilinear ブリットパス(低解像度をボクセル様式として立てる)→ 必要なら最適化 FXAA を後段に。P0 の削減分を原資にする。
9. **Gerstner 水平変位を遠景平面のみに導入**(§2.1)。steepness 合計 ≤ 1 の制約を uChop に割り当て。近景柱は縦変位のままにしてシームは距離ブレンドで隠す。
10. **ベイク済み分岐ボルトメッシュ**(§2.4)。ビルド時生成の L-System 風ポリライン + 距離属性アニメーション。
11. **SoT 式フィードバック泡バッファ**(§2.5 中コスト案)。ポストパス導入(#8)と RT インフラを共有できるタイミングで。

### 実装時の注意(リポジトリ固有)
- `shader-quality.test.ts` が定数文字列をピン留めしているため、上記はいずれもテストの同期修正が必要になる。特に P0-1 は波式の移動を伴うので、テストを「文字列一致」から「挙動(サンプル値)検証」へ書き換える好機〔推論〕。
- 柱マテリアルの `transparent:true`(opacity 常時1)は P0-1 の onBeforeCompile 移行時に false へ直すと透明パスソートコストも削れる(リスク一覧の既知項目)。

---

## 4. 出典一覧(本文で実際に参照したもの)

**一次情報(講演・公式・作者ブログ)**
- The Technical Art of Sea of Thieves — SIGGRAPH 2018 Talk, Rare Ltd.(PDF 全文確認): https://history.siggraph.org/wp-content/uploads/2022/09/2018-Talks-Ang_The-Technical-Art-of-Sea-of-Thieves.pdf
- GPU Gems Ch.1 Effective Water Simulation from Physical Models(NVIDIA): https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models
- Catlike Coding — Waves(Gerstner 数式): https://catlikecoding.com/unity/tutorials/flow/waves/
- Nathan Gordon — The Ocean(Wind Waker 分析): https://medium.com/@gordonnl/the-ocean-170fdfd659f1
- Cyanilux — Rain Effects Breakdown: https://www.cyanilux.com/tutorials/rain-effects-breakdown/
- Kelvin van Hoorn — Unity skybox tutorial(太陽ディスク数式): https://kelvinvanhoorn.com/tutorials/unity_skybox_shader/
- Daniel Ilett — Stylised Water in Shader Graph and URP: https://danielilett.com/2020-04-05-tut5-3-urp-stylised-water/
- Roystan — Toon Water: https://roystan.net/articles/toon-water/
- Codrops — Building an Interactive Wave Propagation Cube Grid with Three.js: https://tympanus.net/codrops/2026/07/09/building-an-interactive-wave-propagation-cube-grid-with-three-js/
- Codrops — The Sleepers(軽量アトモスフィア遷移): https://tympanus.net/codrops/2026/07/10/the-sleepers-creating-an-atmospheric-webgl-experience-with-lightweight-techniques/
- mattdesl/three-shader-fxaa: https://github.com/mattdesl/three-shader-fxaa
- Franky Hung — Realistic and Fast Water Waves in Three.js: https://franky-arkon-digital.medium.com/realistic-but-fast-water-waves-in-three-js-a48e2c9b0695

**二次資料・実装例**
- Filthy Pants — Shaders for Sharpest Pixels: http://filthypants.blogspot.com/2017/01/shaders-for-sharpest-pixels.html
- Bumbershoot — Sharp Bilinear Filters: https://bumbershootsoft.wordpress.com/2025/10/11/sharp-bilinear-filters-big-clean-pixels-for-pixel-art/
- three.js issue #15553(FXAA 後段パスの作法): https://github.com/mrdoob/three.js/issues/15553
- three.js issue #10238(EffectComposer と pixelRatio): https://github.com/mrdoob/three.js/issues/10238
- sbcode — Gerstner Water(three.js、JS 側同関数移植): https://sbcode.net/threejs/gerstnerwater/
- madblade/waves-gerstner(three.js トロコイド波): https://github.com/madblade/waves-gerstner
- peerdh — Advanced Techniques for Dynamic Weather Systems: https://peerdh.com/blogs/programming-insights/advanced-techniques-for-dynamic-weather-systems-in-game-engines
- BuiltByBit — Weather System 仕様記述: https://builtbybit.com/resources/weather-system-storms-rain-snow.107475/
- gameidea — Creating a Stylized 3D Water Shader: https://gameidea.org/2026/02/01/creating-a-stylized-3d-water-shader/
- ArtStation — Cartoon Lightning VFX: https://www.artstation.com/artwork/xDRJlr
- Godot Shaders — Stylized sky with procedural sun and moon: https://godotshaders.com/shader/stylized-sky-with-procedural-sun-and-moon/
- Maxime Heckel — On Rendering the Sky, Sunsets, and Planets: https://blog.maximeheckel.com/posts/on-rendering-the-sky-sunsets-and-planets/
- Zelda wiki — Cyclone(WW 嵐の前兆演出): https://zelda.fandom.com/wiki/Cyclone
- Townscaper(Wikipedia): https://en.wikipedia.org/wiki/Townscaper
- dev.to — GPU-Accelerated Particle System with WebGL: https://dev.to/hexshift/building-a-custom-gpu-accelerated-particle-system-with-webgl-and-glsl-shaders-25d2
- Codrops — Creating Stylized Water Effects with React Three Fiber: https://tympanus.net/codrops/2025/03/04/creating-stylized-water-effects-with-react-three-fiber/

**出典が見つからなかった項目(明記)**
- Wandersong の水面の技術・アートディレクション解説: 信頼できる資料なし。
- Townscaper の水シェーダー実装詳細: 一次資料なし(アートディレクション面の言及のみ)。
- Wind Waker の稲妻演出の技術解説: 資料なし(サイクロンの前兆演出のみ wiki で確認)。
- 「波パラメータテーブルから JS/GLSL 両方をコード生成する」パターン単体の解説記事: 直接の出典なし(sbcode の JS 移植例と Codrops のチャンク注入例からの構成案)。
