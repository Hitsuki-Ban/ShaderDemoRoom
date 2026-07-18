# 調査レポート: 展示演出・ショールームアートディレクション(横断)

- 調査日: 2026-07-18
- 対象: ShaderDemoRoom 全展示(Voxel Water / Glass Optics / MIZU//KOKORO / Ninth Tide Archive)+シェルUI
- 前提制約: GitHub Pages 静的ホスティング / three.js ~0.184 + React 19 + Vite / WebGL2(WebGPU不可)/ 低〜中スペックGPU(Voxel Water が既に 17-20 FPS)/ スタイライズド・NPR方向
- 入力: `scratchpad/visual-current.json`(現状ビジュアル評価)、`scratchpad/visual-refs.json`(参照リファレンス評価)

---

## 0. 現状課題の要約(視覚評価より)

visual-current.json の impactGaps を演出観点で分類すると、本調査がカバーすべき課題は以下の6群に集約される。

1. **主役不在**: Voxel Water に焦点・ランドマークがなく「色見本」化(Wow 2/10)。コンセプト画の灯台・崖・岩は未実装
2. **明度構造の崩壊**: Clear/Rain で水面・光帯・空が2〜3明度段に圧縮。構図比も逆転(無情報の前景が60-80%)
3. **天候の識別不能**: Rain 状態に雨が描かれず、状態差が色相シフトのみ。「サムネイルテスト」不合格
4. **信頼性の毀損**: FPSチップが 1 / 15-28 / "—" を公開表示。コンセプトの7セル・スパークライン計測帯も未実装
5. **トーン共存問題**: 95%黒の Ninth Tide と高彩度の MIZU//KOKORO が同一シェル内に同居。露出分離の仕組みなし
6. **モバイル崩れ**: キャンバスが細切れ、15本のスライダーがスクロールの70%を占有。埋め込み展示のHUDが非レスポンシブ

---

## 1. 課題→技術マッピング表

| # | 課題(impactGapsより) | 適用技術/原則 | 詳細節 | コスト | 効果見込み |
|---|---|---|---|---|---|
| 1 | Voxel Water に焦点がない | Weenie(視覚磁石)としてのランドマーク配置。灯台=光源+垂直シルエット | §3 | 中 | ◎ 最重要 |
| 2 | 明度が2〜3段に圧縮 | 3〜4値グレースケールのサムネイルテスト、ドミナント(主役)を最明部に | §2 | 低(検証手法) | ◎ |
| 3 | 前景60-80%が無情報 | 前景=額縁/中景=主役/背景=奥行きの3層構図。カメラは「観測スポット」に固定 | §2 | 低 | ◎ |
| 4 | Rain に雨が無い | 雨は多層キュー(ストリーク+水面リング+霞+音)。色相以外の状態差別化 | §4 | 中 | ◎ |
| 5 | 光帯が「光る壁」に見える | 加算ブレンドの円錐メッシュ/放射ブラーによるフェイクゴッドレイ(減衰と収束を持たせる) | §4 | 低〜中 | ○ |
| 6 | 雲が矩形プレースホルダ | Sea of Thieves 式「単純形状の組合せ+手描き簡略化」雲。レイマーチ不要 | §4 | 中 | ○ |
| 7 | 水面のフラット感 | Wind Waker 式「複合サイン波+泡テクスチャ多層オフセット」。three.js 再現実績あり | §4 | 中 | ○ |
| 8 | 明るい展示と暗い展示の共存 | ルーム毎の toneMappingExposure / トーンマッパー切替(AgX/Neutral)。暗室展示は「露出隔離」 | §5 | 低 | ◎ |
| 9 | FPS 1/—表示の信頼毀損 | stats.js/rStats 系のスパークライン計測帯+Tufte「数値には必ずトレンド線」。虚偽表示は不可、まず計測修正 | §6 | 低 | ◎ |
| 10 | イントロ・遷移の欠如 | しきい値マップ・リビール、ルーム間ショートローダー容認、「1シーンのみアクティブ」原則 | §7 | 低〜中 | ○ |
| 11 | モバイルでコントロール過多 | キャンバス優先+非モーダル・ボトムシート。プリセット先行・微調整は折りたたみ | §8 | 中 | ◎ |
| 12 | 埋め込みHUDが非レスポンシブ | キャンバス内ブレークポイント(タイトル縮小・2x2グリッド・エッジ微細文字非表示) | §8 | 中 | ○ |
| 13 | 三言語コピーの一貫性 | 言語パリティ原則+文字量拡張予算+「スペックシート調/詩的」の使い分けルール | §9 | 低 | ○ |
| 14 | Ninth Tide がゲートしか見えない | ヒーローフレーム規定(サムネイルに終幕フレーム禁止)、ゲーム内写真術の構図規則で公式キャプチャ | §2, §7 | 低 | ○ |

---

## 2. ヒーローショット設計論(焦点階層・サムネイルテスト・値構造)

### 何を解決するか
Voxel Water「壁一面の単色」問題と、全展示の公式キャプチャ品質。コンセプト画(Wow 9/10)と現状(2/10)の差は、ほぼ全てここに帰着する。

### 検証済みの原則
- **値(Value)ヒエラルキー**: 明暗こそが「何が最初に見えるか」を決める。プロダクションでは**パレット議論の前にグレースケール値スタディで構図・焦点・奥行きを確認**するのがプロトコル([Value Study](https://valuestudy.app/en/learn/art/composition-thumbnails/)、[RMCAD Environment Artist Playbook](https://www.rmcad.edu/blog/environment-artist-playbook-from-blockout-to-final-pass/))。3〜4値に単純化して構図構造だけを見る。複数クロップを比較して最強の値パターンを探す。
- **ドミナント(主役)**: 「周囲と溶け合ってはならないが、一貫性は保つ。より明るく、有利な位置に」([Game Developer: Composition in Level Design](https://www.gamedeveloper.com/design/composition-in-level-design))。同記事の実践則:
  - **3層構造**: 前景=額縁(シルエット・低ディテール)/中景=主役+対位/背景=スケールと奥行き(彩度・ディテール減)
  - **リーディングライン**: 水平線=静けさ、垂直=記念碑性、S字曲線=自然な流れ、斜線=動勢
  - **観測スポット**: プレイヤーを「ファンネル」で所定の視点に導く。→ Webデモでは**デフォルトカメラ位置そのものが観測スポット**。現状の低い水平カメラ(前景80%)はこの原則の真逆
  - 視覚的重み(スケール・彩度・ディテール密度・コントラスト)で階層を作り、動きはドミナントを強化する
- **ゲーム内写真術(公式キャプチャの技法)**: 三分割・リーディングライン・ゲーム内要素での額縁化・露出調整(空の白飛び回避)・被写界深度([Red Bull Virtual Photography Guide](https://www.redbull.com/us-en/virtual-photography-guide-fourth-focus-capture-point-2)、[Epic Games: In-game Photography](https://store.epicgames.com/en-US/news/how-to-master-the-art-of-in-game-photography))。
- **参照(refs)からの実証**: MIZU//KOKORO のヒーロー(Wow 9)は「最大・最明・最彩度・最テクスチャの要素が全部オーブ」+「全ての線(軌道楕円・グリッド消失線・台座リング)が主役を指すリーディングライン」。Ninth Tide(Wow 9)は「輝度3階層(床の渦>コア>ヘアライン)以外に競合を作らない」。**どちらも値構造の教科書実装**であり、社内に既にお手本がある。

### 実装要点
1. 各ルームのデフォルトカメラを「構図済みのヒーローショット」として設計し、値スタディ(スクショ→グレースケール→4値ポスタリゼーション)をQAに組み込む
2. サムネイルテスト: 各天候状態のキャプチャを 160px 幅に縮小して並べ、状態が識別できるかを合否判定に
3. Ninth Tide の公式キャプチャは Chapter VIII モーメント(渦+スピンドル)に固定。終幕の暗黒フレームは絶対にサムネイルにしない(refs 評価の明示的指摘)

### コスト/リスク
検証手法自体はゼロコスト(スクリプト化可能)。リスクは「構図のためにシェーダー変更が芋づる式に増える」こと。値スタディを先に行い、変更を明度配分に限定すれば低リスク。

---

## 3. ランドマーク/主役オブジェクト(subject-less シェーダーを展示にする)

### 何を解決するか
「環境シェーダーには被写体がない」問題。Voxel Water が最重症、Glass Optics のグレー虚空も同類。

### 検証済みの原則
- **Weenie(視覚磁石)**: Disney Imagineering 用語。「遠距離から視認できる大きく魅力的な視覚特徴で、来訪者を引き寄せる」。ステージング・サイズ・形状・色・**動き(光)**で成立する([Theory of Theme Parks](http://theoryofthemeparks.blogspot.com/2015/08/wayfinding-in-themed-design-weenie.html)、[Making the Museum: Weenies](https://www.makingthemuseum.com/newsletter/weenies))。博物館展示論では「**どんなに優れた展示も、自己宣伝する視覚的訴求がなければ発見されない**」とまで言う。
- ゲームへの翻訳例: Super Mario Odyssey はオープンな空間でも weenie の連鎖でプレイヤーを誘導する([Game Developer: What Mario Learned from Mickey Mouse](https://www.gamedeveloper.com/design/what-mario-learned-from-mickey-mouse---part-3-decision-making-and-weenies))。
- **バーチャル展示のウェイファインディング**: 「展示物自体をランドマークとしてナビゲーションに使う」ことが仮想環境での定位に有効([Karen Frances Eng: So You Want to Make a Virtual Exhibition?](https://karenfranceseng.medium.com/so-you-want-to-make-a-virtual-exhibition-4a002f43e6e7)、[awwwards Immersive WebGL Exhibitions collection](https://www.awwwards.com/immersive-webgl-virtual-gallery-exhibition-collection.html))。
- **Awwwards 系の実証**: 2026年のベスト three.js サイトは「**単一のヒーローオブジェクトに重量と慣性を持たせる**」(Oryzo, Hubtown)か「製品ごとに独立した3Dルーム」(Cartier)([Utsubo: Best Three.js Websites 2026](https://www.utsubo.com/blog/best-threejs-websites-2026))。「1つの難しいアイデアに全予算を割り、それ以外を足さない」が受賞サイトの共通項。

### 実装要点
1. **Voxel Water**: コンセプト画の灯台+崖は単なる装飾ではなく weenie の教科書(垂直シルエット+点灯=動き+長いサイトライン)。ボクセルなら灯台はインスタンス化した数百キューブで構築可能。**点滅する灯台の光**は「動きがドミナントを強化する」原則の最安実装で、回転ライトのコストはほぼゼロ
2. **Glass Optics**: 球はすでに主役だが舞台が虚空。床を暗い反射面(平面反射 or 暗色+グリッド減light)にし、コースティクスのホットスポットを「payoff」として強化するのが refs 指摘の最安2点アップ
3. **展示ルーム一覧(サイドバー)**: 各ルームカードのサムネイル自体が weenie。ヒーローフレームの静止画/低fpsアニメを与えると回遊が生まれる

### コスト/リスク
灯台+崖: ジオメトリは InstancedMesh で draw call 1〜2。ライトは既存ディレクショナル+エミッシブ+スプライトグローで可。**水面より遥かに安い**。リスクは造形品質(ボクセルアートの巧拙が出る)。ブロックアウト→値スタディ→ディテールの順で。

---

## 4. 天候・時間帯ストーリーテリング(色相以外の差別化)

### 何を解決するか
「Rain に雨がない」「Storm の雲が矩形」「スプレーが白ドット」。天候状態がサムネイルで識別できない問題。

### 検証済みの原則
- **雨は多層キューの複合**: 「雨にはストリーク以外に多様な視覚キューがある」— 落下ストリーク、水面の波紋/スプラッシュ、表面の濡れ、霞・霧、遠景の減衰([PC Gamer: How developers make perfect rain](https://www.pcgamer.com/how-developers-make-perfect-rain-in-games/)、[80.lv: How Rain Works in Video Games](https://80.lv/articles/how-rain-works-in-video-games))。
- **一次情報**: Tatarchuk の SIGGRAPH 2006「Artist-Directable Real-Time Rain Rendering」(ToyShop demo)が芸術的に制御可能な雨の古典。ポストプロセスのレイヤー雨+個別ストリーク+スプラッシュパーティクル+濡れ表面の複合構成([PDF](https://advances.realtimerendering.com/s2006/Tatarchuk-Rain.pdf))。
- **スタイライズドFXの原則**: 「読みやすいシルエット・彩度・誇張された動きを優先し、物理正確性より明快さと感情的インパクト」「コントロールされた密度、高コントラストパーティクスの制限」([RMCAD: The Art of Environmental Effects](https://www.rmcad.edu/blog/the-art-of-environmental-effects-bringing-game-worlds-to-life/))。
- **Sea of Thieves の雲**: レイマーチングなしで「3次元のアート指向クラウドスケープ」を高速描画する専用システムを構築([SIGGRAPH 2018: The Technical Art of Sea of Thieves](https://dl.acm.org/doi/10.1145/3214745.3214820))。アートディレクション面は「単純な構造の組合せで複雑なシーンを達成」「写真参照を手で簡略化」([GDC18: Visual Adventures on Sea of Thieves](https://gdcvault.com/play/1025015/Visual-Adventures-on-Sea-of)、[habrador まとめ](https://blog.habrador.com/2018/08/stylized-graphics-fortnite-sea-of-thieves.html))。
- **Wind Waker の海**: 複合サイン波(頂点)+タイル泡テクスチャの多層オフセット(ベース青+白泡線+暗青オフセットで反復感を消す)+UV歪みアニメ。反射計算を完全に放棄してフラットシェード。three.js での再現実績あり([Nathan Gordon: The Ocean](https://medium.com/@gordonnl/the-ocean-170fdfd659f1))。
- **泡のトゥーン表現**: Voronoi ノイズ+深度マスクで岸泡/波頭泡。オフセットサンプルで泡に暗いエッジを付け厚みを出す([Roystan: Toon Water Shader](https://roystan.net/articles/toon-water/)、[jpanuelos: Ghibli Water Foam](https://jpanuelos.com/2020/10/18/GhibliWater.html))。
- **フェイクゴッドレイ**: 本物のボリューメトリックは Web には重い。(a) 加算ブレンド+depthWrite無効の開放円錐メッシュ、(b) レイヤー分離+放射ブラー。制御パラメータは exposure/decay/density/weight([Wawa Sensei: How to Fake Godrays](https://wawasensei.dev/tuto/how-to-build-godrays)、[thefrontdev: Volumetric Lights with Radial Blur](https://www.thefrontdev.co.uk/creating-volumetric-lights-with-radial-blur-in-three.js-using-layers/)、[Andrew Berg: Volumetric Light Scattering in three.js](https://medium.com/@andrew_b_berg/volumetric-light-scattering-in-three-js-6e1850680a41))。

### 実装要点(Voxel Water の3状態を「色相以外」で差別化する処方)
| 状態 | シルエット | パーティクル | 光 | 水面 |
|---|---|---|---|---|
| Clear | 灯台+静かな水平線(水平線=静けさの原則) | キラmeki(スパークル数点) | 高い太陽、収束するゴッドレイ(円錐)、空グラデーション | 泡少・彩度高・明度高 |
| Rain | 雲底が低くなり灯台が霞む | **落下ストリーク(伸長ビルボード)+水面リング** | 拡散光・光帯なし・遠景減衰(フォグ) | 波紋リング・泡増 |
| Storm | **波頭シルエット増大+雲の塊が不規則形状** | 飛沫(重力付きスプレー、白ドット禁止)+雨ストリーク斜め | 暗いキー+灯台の光が主光源に反転 | 白波(Voronoi泡)大増量 |

- 雨ストリーク: シェーダーで伸長する InstancedMesh クアッド数百枚+カメラ追従ボックス内ループ。1 draw call
- 水面リング: 水面シェーダーに時間駆動のリング関数を数個加算(テクスチャ不要)
- 雲: 矩形ブロックの置換として、複数スケールのボクセル塊を組合せ+底面を暗く(単純形状の組合せ原則)。ライティングは頂点色ベイクで可
- 光帯の修正: 現在の垂直ストライプを、太陽方向から収束する円錐フェイクレイ+水面上のフォールオフに置換。Storm では消灯(refs 指摘: 嵐に光条は矛盾)

### コスト/リスク
ストリーク雨・リングはシェーダー内で完結し 17 FPS 環境でも増分は小さい。放射ブラー式ゴッドレイは追加レンダーパスが必要で**低スペックでは非推奨**、円錐メッシュ式を第一候補に。雲の造形は工数リスク(§3 と同じくブロックアウト先行)。

---

## 5. ダークUIショールームのトーン管理(明暗展示の共存・露出分離)

### 何を解決するか
95%黒の Ninth Tide と高彩度 MIZU//KOKORO の同居。refs の明示的警告:「Ninth Tide のマジックはコントラスト脆弱。隣接展示のブルームや共有トーンマッピングは下位2輝度層を破壊する。**隔離された露出/トーン設定が必要**」。

### 検証済みの原則
- three.js のトーンマッピングと露出は**レンダラーレベルのプロパティ**(`renderer.toneMapping` / `renderer.toneMappingExposure`)で、動的に変更可能([three.js docs: WebGLRenderer.toneMapping](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.toneMapping))。
- オペレータ特性([three.js forum: Tone Mapping Overview](https://discourse.threejs.org/t/tone-mapping-overview/75204)):
  - **ACES Filmic**: 強コントラストだが色相が原色方向にクランプされる(高輝度でオレンジが消える等)
  - **AgX**: ニュートラル。コントラストは弱いがグレーディングの土台に最適
  - **Khronos PBR Neutral**: 色忠実。ブランドカラー保持が必要な場面向け
  - トーンマッピング自体の性能コストは無視できる(行列演算のみ)
- 博物館の実務でも暗室展示(光に敏感な資料)は照明を隔離した専用室に置くのが標準(=「light-locked alcove」)。Cartier Watches & Wonders は Web でこれを再現し「製品ごとに独立した3Dルーム(alcove)」を採用([Utsubo](https://www.utsubo.com/blog/best-threejs-websites-2026))。

### 実装要点
1. **ルームごとのレンダープロファイル**を定義: `{ toneMapping, toneMappingExposure, 背景色, シェルUIの減光レベル }`。ルーム遷移時にレンダラーへ適用(コストゼロ)
2. NPR 展示は物理ベースのトーンマッピングが不要な場合が多い — Voxel Water / MIZU//KOKORO のような「描き割り」色は `NoToneMapping` + sRGB のままの方が彩度の意図が保たれる。Glass Optics のようにHDR的ハイライトを持つものだけ AgX/ACES を検討
3. **Ninth Tide 選択時はシェルも減光**: サイドバー・パネルの明度を落とす(CSS クラス切替)。現状「ページ内で最も明るいのがサイドバー」という本末転倒(current 評価)への直接対策。暗順応の演出も兼ねる
4. 遷移時に露出をフェード(0.3〜0.5s の exposure lerp)すると「部屋の照明が変わる」物語になる

### コスト/リスク
ほぼ設定値の管理のみで、フレームコスト増なし。リスクは展示ごとの独自マテリアルがトーンマッパー変更で色ずれすること — 展示単位のリファレンススクショで回帰確認。

---

## 6. テレメトリHUD(信頼性を毀損しない技術指標表示)

### 何を解決するか
「1 FPS」「—」の公開表示による信用毀損と、コンセプト画の7セル・スパークライン計測帯の未実装。

### 検証済みの原則
- **Tufte のスパークライン論**: 「数値はトレンド線なしには無意味」「データインク最大化・非データインク削除」「単語サイズのデータ密度グラフ」([Edward Tufte: Sparkline theory and practice](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)、[Tufte's Principles of Data-Ink](https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html))。FPS 数値だけのチップより、直近数秒のスパークライン付きの方が情報量も信頼感も上がる(瞬間値のスパイクとトレンドが区別できるため)
- **実装リファレンス**: [mrdoob/stats.js](https://github.com/mrdoob/stats.js/)(FPS/MS/MB+カスタムパネル、グラフ描画つき)、[rStats](https://spite.github.io/rstats/)(renderer.info と連動した draw calls / triangles 等の拡張計測)、[three-performance-panel](https://github.com/AyyyCn/three-performance-panel)(FPS・frame time・draw calls・triangle count)。three.js は `renderer.info` で draw calls / triangles / textures / geometries / programs を無償公開しており、コンセプト画の7セル(FPS・Frame Time・Draw Calls・Triangles・Uniforms・Textures・VRAM)のうち**VRAM 以外は実測値で埋められる**(WebGL に VRAM API はないため VRAM は推計表示か省略)
- **信頼性の設計**: 誇張・虚偽の数値は展示の信用を破壊する(current 評価の「credibility damage」)。原則は (1) まず計測を正す(Glass Optics の 1 FPS、MIZU//KOKORO の "—" は計測バグの疑い — rAF ループと埋め込み iframe の計測系統を統一)、(2) 実性能を上げる、(3) それでも低い数値は「Quality: Low/High」トグルと併記して文脈を与える、の順。**表示を消すのは最後の手段**(計測帯自体が「プロツール感」の主要な演出資産のため)

### 実装要点
1. 計測モジュールを1つ作り(EMA平滑化した FPS + 60サンプルのリングバッファ)、`<canvas>` 2D で 40x12px のスパークラインを描く(自前実装は50行程度、stats.js の移植でも可)
2. 7セル帯はデスクトップのみフル表示、モバイルは FPS+Frame Time の2セルに縮退
3. 埋め込み展示(iframe)は postMessage で親に FPS を報告するか、親側の計測に一本化して「—」を根絶

### コスト/リスク
計測+スパークライン描画は 2D canvas で毎フレーム数十μs、リスクなし。唯一の注意は `renderer.info.reset()` のタイミング(autoReset との整合)。

---

## 7. WebGL演出トレンド 2024-2026(イントロ・カメラ・ポストFX)

### 何を解決するか
「展示としての体験の欠如」。現状はシーンが置いてあるだけで、入場・遷移・見せ場の設計がない。

### 検証済みの知見
- **受賞サイトの共通項**: 「1つの難しいアイデアにコミットし、全てをその周りで予算配分する」「バラバラのエフェクトを積まない」「タイミング・イージング・シーケンシングの振付が良サイトと受賞サイトを分ける」([Utsubo: Best Three.js Websites 2026](https://www.utsubo.com/blog/best-threejs-websites-2026)、[Utsubo: Award-Winning Website Design Guide](https://www.utsubo.com/blog/award-winning-website-design-guide))
- **スクロール/カメラ振付**: 2024-2026 は「スクロールがストーリーテリングエンジン」化(Cartier, Shopify Editions, Primland ほか)。各セクションを「入り・保持・出」の振付ビートとして設計。ツールは GSAP(オーケストレーション)、Lenis(スクロール)、R3F(コンポーネント構成)、Theatre.js(カメラシーケンス)
- **軽量アトモスフェア技法の実例**(Codrops「The Sleepers」、2026-07): 非ボリューメトリックの高さフォグを `onBeforeCompile` で全マテリアルに注入(ワールドY勾配+ノイズ)/ **白黒しきい値テクスチャの赤チャンネルでピクセル毎のリビール時刻を制御するイントロトランジション** / 3x3 タイルのカメラ追従グリッドで無限空間 / 「最小の手段で最大の視覚効果」哲学([Codrops: The Sleepers](https://tympanus.net/codrops/2026/07/10/the-sleepers-creating-an-atmospheric-webgl-experience-with-lightweight-techniques/))
- **ローディング設計**: 「一度にアクティブなシーンは1つだけ。前のシーンが終わる時に次をロード。ルーム間のショートローダーは低速回線サポートのトレードオフとして許容される」([Codrops: The Spark](https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/))
- **デモシーンの教訓**: 64k イントロは「手続き生成しやすいものの周りに美学を設計する」。近年の評価軸は物量よりも「**遷移への特別な配慮**」「演出(direction)にステージを譲る慎ましさ」([lofibucket: How a 64k intro is made](https://www.lofibucket.com/articles/64k_intro.html)、[Laurent Le Brun: Best demos of 2025](https://laurent.le-brun.eu/blog/the-best-demos-of-2025-from-the-demoscene))
- Ninth Tide のオープニングタイトルカード(「它先看见了我们。」)は refs 評価 8/10 の確立された cinematic beat であり、**このパターンを他ルームにも薄く展開する**のが一貫性のある拡張

### 実装要点
1. **ルーム入場シーケンス**(全ルーム共通・1〜2秒): 露出フェードイン+カメラの短いドリーイン(ease-out)+展示タイトルのタイポリビール。GSAP 1本で実装可
2. Voxel Water には**天候遷移の振付**を: プリセット切替を瞬時パラメータジャンプでなく 2〜3 秒のクロスフェード(雲量→光→パーティクルの順に時差)にすると、切替自体が見せ場になる
3. ポストFXは低スペック制約から**フルスクリーンパス最小主義**: ブルームを常設するより、エミッシブ+スプライトグロー等「マテリアル内で光って見せる」手法を優先(The Sleepers 方式)。ポストを足すなら1パス(例: Ninth Tide のみ控えめなブルーム)
4. しきい値マップ・リビールはシェル遷移(ルーム切替)のトランジションとして安価に流用可能

### コスト/リスク
カメラ振付・露出フェードはコストゼロ。天候クロスフェードは uniform 補間のみ。リスクは「演出過多で操作性を損なう」こと — 初回入場のみフル演出、以降はスキップ(即時切替)が定石。

---

## 8. モバイルレイアウト(キャンバス優先・コントロール折りたたみ)

### 何を解決するか
「キャンバスが細い色見本、スライダー15本が70%」問題と、埋め込み展示HUDの崩れ。

### 検証済みの原則
- **ボトムシートパターン**: モバイルでは設定可能なオプションを画面下部(指が届く位置)に置く。**非モーダル/永続ボトムシート**は完全には消えず、展開/折りたたみで切り替わり、背後のキャンバス操作を妨げない([NN/g: Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)、[Material Design 3: Bottom sheets](https://m3.material.io/components/bottom-sheets/overview))
- **コンフィギュレータUXの定石**: 「ナビゲーションコントロールが製品を全ての中心に置く」(Deejo 事例)。プレビュー(=キャンバス)が主、コントロールが従([Smashing Magazine: Designing A Perfect Configurator UX](https://www.smashingmagazine.com/2018/02/designing-a-perfect-responsive-configurator/)、[Commerce-UI: 5 Best product configurator experiences](https://commerce-ui.com/insights/5-best-product-configurator-experiences-with-examples))
- **レスポンシブキャンバスの基礎**: devicePixelRatio 反映(上限クランプで負荷制御)、リサイズ/回転時のアスペクト更新、touchstart/move/end ハンドリング([PixelFree Studio: Responsive 3D Web Experiences](https://blog.pixelfreestudio.com/how-to-create-responsive-3d-web-experiences-with-webgl/))
- バーチャル展示の実務では「ログイン不要・モバイルと低スペックPCでシームレスに動く」ことが成功要因の筆頭([Karen Frances Eng](https://karenfranceseng.medium.com/so-you-want-to-make-a-virtual-exhibition-4a002f43e6e7))

### 実装要点
1. **モバイルはキャンバスをファーストビューの主役に**: ビューポート高の 55〜70% をキャンバスに割り当て(現状は細いスライス)。ルーム一覧はキャンバス上のセグメント/スワイプに
2. **プリセット先行・スライダー格納**: 天候3プリセット+リセットのみを常時表示チップ列にし、15本のスライダーは「詳細パラメータ」ボトムシート(折りたたみ既定)へ。これは current 評価の「presets should lead」と一致
3. **埋め込み展示のキャンバス内ブレークポイント**: 幅 <640px で (a) タイトルプレートを縮小し上端固定、(b) MIZU//KOKORO のフェーズカードを 2x2 グリッド化、(c) エッジの縦微細文字を非表示、(d) ボタン類を44px タップ目標に。iframe 側は自身の `clientWidth` で判定できるため親との通信は不要
4. モバイルでは DPR を 1.5〜2 にクランプ+解像度スケール(内部レンダー 0.75x)で FPS を確保

### コスト/リスク
UI 再構成が主でシェーダー変更なし。中工数。リスクは埋め込み展示(別ソース管理)の改修調整。

---

## 9. 展示コピーライティング(日英中トリリンガル)

### 何を解決するか
シェル(日英)+埋め込み展示(中英)で言語とトーンが混在している状態の整理。

### 検証済みの原則
- **言語パリティ**: 「両言語の平等な扱いが基本。フォントサイズ・色・グラフィックを揃え、一方を視覚的に優先しない」「配置を全展示で一貫させる(横並び or 縦積み)」— 来訪者は文中でも言語を行き来する([Eriksen: Best Practices for Bilingual Exhibition Design](https://eriksen.com/arts-culture/best-practices-for-bilingual-exhibition-design-in-museums/)、[AAM: Best Practices in Bilingual Exhibition Text (PDF)](https://www.aam-us.org/wp-content/uploads/2024/03/12_Exhibition_BestPracticesInBiligualExhibitionText.pdf))
- **言語表記**: 言語名はその言語で書く(「日本語 / English / 中文」)。旗アイコンは使わない(言語は国境を跨ぐ)([Eriksen: Creating Multilingual Exhibit Labels](https://eriksen.com/arts-culture/creating-multilingual-exhibit-labels/))
- **文字量拡張予算**: 翻訳による文字量変動を最初からレイアウトに織り込む(英語→スペイン語で+25%の例)。日中英では逆に CJK が短くなるため、**CJK 大見出し+英語トラッキング小キャプションのロックアップ**(MIZU//KOKORO・Ninth Tide が既に採用)が合理的
- **スタイルガイドの一元化**: 「どのアプローチでも、一貫していること」が繰り返し強調される
- refs の実証: MIZU//KOKORO の「スペックシート調」(μ/σ/FLOW のレオロジー数値+状態カード)と Ninth Tide の「詩的ミニマル」(6文字で世界観)は**どちらも成功しているが混ぜていない** — 展示ごとに1ボイスを選び抜いている。一方 v2-state-board の汎用サンセリフは「モノスペース・ラボ識別と衝突する最弱タイポ」と評価されており、ボイス混在の失敗例

### 実装要点
1. **2層ボイスモデル**を規定: シェルUI(ルーム名・パネル・ボタン)=スペックシート調で三言語パリティ / 展示内世界観テキスト(詩・フレーバー)=展示の母語ロックアップ(CJK主+EN従)を維持し、無理に3言語化しない(詩の翻訳は世界観を薄める)
2. 言語スイッチャは「日本語 / English / 中文」表記に統一
3. 各展示の説明文テンプレートを統一: 1行フック(詩的可)→ 技術3行(スペック調: 使用技法・頂点/フラグメント負荷・操作方法)→ 操作ヒント。CJK/EN の行数差を吸収する `min-height` 予約
4. 数値・単位・技術用語(GLSL, draw calls 等)は翻訳せず英語のまま(スペックシート調の一貫性)

### コスト/リスク
コピー編集のみで実装コスト極小。リスクは埋め込み展示の原作テキストへの手入れ — refs 警告に従い、原作の CJK ロックアップは尊重して**シェル側のラベルだけを揃える**。

---

## 10. この展示への適用推奨(優先順位つき)

視覚評価の Wow ギャップ、実装コスト、17-20 FPS の予算制約を総合した推奨順:

### P0 — 信頼性の修理(演出以前の前提)
1. **FPS計測の統一と修正**(§6): 1 FPS / "—" の根絶。埋め込みは postMessage 報告に一本化。→ その上で7セル・スパークライン計測帯をデスクトップに実装(コンセプト画の「プロツール感」の回収)
2. **水面シームアーティファクトの修正**: QA画像に残る垂直シーム(Clear の cyan 線、Storm の赤線)はどの演出より先に潰す

### P1 — フラッグシップの再構図(最大のWowギャップ)
3. **Voxel Water に灯台+崖の weenie を建てる**(§3): InstancedMesh ボクセル造形+点滅灯。ブロックアウト→4値スタディ→ディテールの順
4. **デフォルトカメラを観測スポットとして再設計**(§2): 前景20-30%/中景(灯台+岩)/背景(空)の3層。値スタディとサムネイルテストをQAゲート化
5. **天候を色相以外で差別化**(§4): Rain=ストリーク+水面リング+フォグ、Storm=波頭シルエット+飛沫+灯台光への主光源反転、Clear=収束ゴッドレイ(円錐式)+スパークル。矩形雲を複合ボクセル塊に置換。プリセット切替は2-3秒のクロスフェード振付に

### P2 — トーンと入場体験(横断・低コスト)
6. **ルーム別レンダープロファイル**(§5): toneMapping/exposure/シェル減光をルームごとに定義。Ninth Tide 選択時はシェルを減光する「暗室」挙動
7. **共通入場シーケンス**(§7): 露出フェード+ドリーイン+タイトルリビール(初回のみ、スキップ可)。Ninth Tide のタイトルカード文法を薄く全館展開
8. **Glass Optics の舞台修理**(§3): 暗い反射床+コースティクスのホットスポット強化+ワイヤーフレーム球の質感改善(refs いわく「最安の2点アップ」)

### P3 — モバイルとコピー
9. **モバイル: キャンバス優先+ボトムシート**(§8): プリセット常設・スライダー格納・DPRクランプ。埋め込み展示にキャンバス内ブレークポイント(2x2フェーズカード等)
10. **コピー2層ボイスモデル**(§9): シェル=三言語パリティのスペックシート調、展示内=原作ロックアップ尊重。言語名表記の統一
11. **公式キャプチャの規定**(§2): 各ルームのヒーローフレームを固定(Ninth Tide は Chapter VIII、MIZU//KOKORO は CALM、Voxel Water は再構図後の Storm または Clear)。終幕暗黒フレームのサムネイル使用禁止

### 見送り推奨(制約に不適合)
- フルスクリーン・ポストFXチェーン(SSR、多段ブルーム、放射ブラー式ゴッドレイ): 17 FPS の現状では予算がない。マテリアル内発光+円錐フェイクレイで代替
- Theatre.js 等の重いシーケンサ導入: GSAP+手書きイージングで足りる規模
- WebGPU/TSL 移行: 制約外(WebGL2 固定)

---

## 出典一覧

### 構図・値構造・ヒーローショット
- https://www.gamedeveloper.com/design/composition-in-level-design
- https://valuestudy.app/en/learn/art/composition-thumbnails/
- https://www.rmcad.edu/blog/environment-artist-playbook-from-blockout-to-final-pass/
- https://www.redbull.com/us-en/virtual-photography-guide-fourth-focus-capture-point-2
- https://store.epicgames.com/en-US/news/how-to-master-the-art-of-in-game-photography

### ランドマーク/weenie・バーチャル展示UX
- http://theoryofthemeparks.blogspot.com/2015/08/wayfinding-in-themed-design-weenie.html
- https://www.makingthemuseum.com/newsletter/weenies
- https://www.gamedeveloper.com/design/what-mario-learned-from-mickey-mouse---part-3-decision-making-and-weenies
- https://karenfranceseng.medium.com/so-you-want-to-make-a-virtual-exhibition-4a002f43e6e7
- https://www.awwwards.com/immersive-webgl-virtual-gallery-exhibition-collection.html

### 天候・水・空
- https://advances.realtimerendering.com/s2006/Tatarchuk-Rain.pdf
- https://www.pcgamer.com/how-developers-make-perfect-rain-in-games/
- https://80.lv/articles/how-rain-works-in-video-games
- https://www.rmcad.edu/blog/the-art-of-environmental-effects-bringing-game-worlds-to-life/
- https://dl.acm.org/doi/10.1145/3214745.3214820
- https://gdcvault.com/play/1025015/Visual-Adventures-on-Sea-of
- https://blog.habrador.com/2018/08/stylized-graphics-fortnite-sea-of-thieves.html
- https://medium.com/@gordonnl/the-ocean-170fdfd659f1
- https://roystan.net/articles/toon-water/
- https://jpanuelos.com/2020/10/18/GhibliWater.html
- https://wawasensei.dev/tuto/how-to-build-godrays
- https://www.thefrontdev.co.uk/creating-volumetric-lights-with-radial-blur-in-three.js-using-layers/
- https://medium.com/@andrew_b_berg/volumetric-light-scattering-in-three-js-6e1850680a41

### トーンマッピング・露出
- https://threejs.org/docs/#api/en/renderers/WebGLRenderer.toneMapping
- https://discourse.threejs.org/t/tone-mapping-overview/75204

### テレメトリHUD
- https://github.com/mrdoob/stats.js/
- https://spite.github.io/rstats/
- https://github.com/AyyyCn/three-performance-panel
- https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/
- https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html

### トレンド・演出
- https://www.utsubo.com/blog/best-threejs-websites-2026
- https://www.utsubo.com/blog/award-winning-website-design-guide
- https://tympanus.net/codrops/2026/07/10/the-sleepers-creating-an-atmospheric-webgl-experience-with-lightweight-techniques/
- https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/
- https://www.lofibucket.com/articles/64k_intro.html
- https://laurent.le-brun.eu/blog/the-best-demos-of-2025-from-the-demoscene

### モバイルUX
- https://www.nngroup.com/articles/bottom-sheet/
- https://m3.material.io/components/bottom-sheets/overview
- https://www.smashingmagazine.com/2018/02/designing-a-perfect-responsive-configurator/
- https://commerce-ui.com/insights/5-best-product-configurator-experiences-with-examples
- https://blog.pixelfreestudio.com/how-to-create-responsive-3d-web-experiences-with-webgl/

### 展示コピー
- https://eriksen.com/arts-culture/best-practices-for-bilingual-exhibition-design-in-museums/
- https://eriksen.com/arts-culture/creating-multilingual-exhibit-labels/
- https://www.aam-us.org/wp-content/uploads/2024/03/12_Exhibition_BestPracticesInBiligualExhibitionText.pdf

### 注記(出典の確度について)
- Sea of Thieves の天候「状態」を一目で判別させる具体則そのもの(嵐の視覚言語の内訳)は、GDC講演の映像本編にあたる必要があり、テキスト一次情報としては確認できなかった。本レポートの §4 の状態別処方は「多層キュー原則(Tatarchuk/80.lv)+スタイライズドFX原則(RMCAD)+コンセプト画」からの合成であり、Sea of Thieves 固有の手法として引用していない。
- VRAM 表示に関する WebGL の公式 API は存在しない(§6 に記載)。コンセプト画の VRAM セルは推計値表示になる旨を明記した。
