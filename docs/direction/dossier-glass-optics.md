# Glass Optics 展示 調整カルテ

作成日: 2026-07-18 / 作成者: テクニカルアート・ディレクション班
入力ソース: コード深掘り調査 (understand-glass.json) + スクリーンショット批評 (visual-current.json)

---

## コンセプト(原典の意図)

暗いステージ上に置かれた 1 個の透過ガラス球に対し、可動式ポイント光源からの光路を **3 本の発光ビーム(入射・反射・屈折)** として明示的に可視化するインタラクティブ光学デモ。屈折ビームが床に到達する位置には疑似コースティクス(caustic pool)を描画する。

教育的メカニクス: ユーザーが光源位置 (lightX/lightY/lightZ) とガラスの物理パラメータ (IOR / Roughness / Thickness) を操作すると、全ビーム・終端マーカー・コースティクス・PhysicalMaterial が連動して変化し、屈折の振る舞いを「読める」ようにする。ガラス背後にはアニメーションするスキャンライン調の「リファレンスパネル」を配置し、透過マテリアルが具体的に何かを屈折している様子を見せる(QA ログの作業仮説による)。ワンクリックプリセット 2 種("Focus beam" / "Crystal preset")でキュレーション済み状態を提示。

QA 履歴によれば、v1(1px ラインで判読不能、光源が画面外、ガラスがくすんだ灰色球、床グリッドが支配的)から現行のチューブビーム+リファレンスパネル構成へ再設計された。制約: **GitHub Pages で静的デプロイ可能・ポストプロセスなし** を維持すること。

## 実装アーキテクチャ(シーングラフ/更新ループ/状態フロー)

エントリポイントは `createRoomRuntime({renderer}, initialSettings)`(`src/rooms/glass-optics/runtime.ts`)。`updateSettings/resize/render/dispose` を持つ `RoomRuntime` を返す。

### シーングラフ(すべて root Group 配下)
- `Scene.background = Color(0x071018)` / `Scene.fog = Fog(0x071018, near 16, far 34)`
- 環境: `PMREMGenerator.fromScene(new RoomEnvironment(), 0.04)` → `scene.environment`(起動時に 1 回だけベイク)
- ライト: `AmbientLight(0x8fb8ff, 0.62)`、`DirectionalLight(0xffffff, 1.55)` at (5,7,4)、`PointLight(0xbdeeff, intensity 6.5, distance 18)`(設定更新ごとに可動光源位置へ追従)
- 床: `PlaneGeometry(16,16)` + `MeshStandardMaterial{color:0x121c26, metalness:0.1, roughness:0.5}`、y=-0.05
- グリッド: `GridHelper(16, 32, 0x42e9ff, 0x163949)`、opacity 0.28、depthWrite false、y=0.005
- リファレンスパネル: `PlaneGeometry(3.3, 2.35)` at (0, 1.35, -1.85)、renderOrder 1。インライン ShaderMaterial(uniform は `uTime` のみ)。ストライプ `fract((vUv.x + uTime*0.018)*7.0)`、クロスヘア、エッジビネット、シアン→アンバーの水平グラデーション `vec3(0.24,0.92,1.0) → vec3(1.0,0.72,0.28)`、alpha = mask*0.58
- ガラスグループ (y=1.25): 本体 `IcosahedronGeometry(1.35, detail 8)` + MeshPhysicalMaterial(renderOrder 3)、ワイヤーフレームシェル `IcosahedronGeometry(1.365, detail 3)` + MeshBasicMaterial{color:0xb9fbff, additive, opacity 基準 0.08}(renderOrder 4)
- 光源: 実体球 `SphereGeometry(0.16,28,18)` color 0xffd48b(renderOrder 10)+ ハロー球 `SphereGeometry(0.28,28,18)` opacity 0.08、depthTest false(renderOrder 9)
- ビーム 3 対: `createBeam(color, coreOpacity, glowOpacity)` が core + glow の TubeGeometry ペアを生成(CatmullRomCurve3 centripetal, tension 0.2, tubularSegments max(16, points*12), radialSegments 8)。incoming(0x8deeff, 0.95, 0.24) / reflection(0xffc067, 0.82, 0.18) / refraction(0xf8ffff, 0.9, 0.22)。更新時の半径: incoming 0.017/0.064、reflection 0.014/0.052、refraction 0.018/0.07。glow は depthTest false
- 終端マーカー (renderOrder 8): target 白 r=0.055 opacity 0.86 / reflection 0xffbd66 r=0.07 opacity 0.74 / refraction 0x9ff8ff r=0.085 opacity 0.8
- コースティクス: `PlaneGeometry(5.6,5.6)` + 専用 ShaderMaterial、初期位置 (0.8, 0.02, 0.4)、renderOrder 5、更新ごとに再配置

### 光路計算 (updateLightPath)
- ビームは常に固定ターゲット `Vector3(0, 1.18, 0)` を狙う(**球面との交点計算ではないハードコード**)
- 反射終端 = `target + vec3(-dir.x, abs(dir.y), -dir.z) * 3.6`(法線 reflect() ではなくミラーフリップのヒューリスティック)
- 屈折は 2 セグメントのフェイク: `refractedA = target + direction * (1.4 / settings.ior)`(※ `direction.multiplyScalar` がベクトルを in-place 変異)、`refractedB = (refractedA.x + beamSpread*2.4, 0.04, refractedA.z - beamSpread*3.2)`
- ビームの TubeGeometry は **設定変更のたびに dispose + 再生成(6 本)**
- コースティクス面の中点 = `((refractedA.x+refractedB.x)*0.5, 0.022, (refractedA.z+refractedB.z)*0.5)`、スケール = `0.78 + beamSpread*0.58 + (ior-1)*0.16`

### 状態フロー
`GlassOpticsSettings`(`src/rooms/types.ts` 29-39 行)= `{lightX, lightY, lightZ, beamSpread, ior, roughness, thickness: number; autoRotate, showCaustics: boolean}`。デフォルト(`state.ts`): lightX:-0.05, lightY:2.42, lightZ:2.05, beamSpread:0.34, ior:1.48, roughness:0.04, thickness:1.25, autoRotate:true, showCaustics:true。`Controls.tsx` の `onPatch` で部分更新 → `updateSettings` → `updateMaterial` + `updateLightPath` の全再計算(dirty-check なし)。

### 更新ループ (render({elapsed, delta}))
- `uTime` をコースティクスとリファレンスパネルへ供給
- 光源色 `sourceMaterial.color.setHSL(0.1, 0.95, 0.64 + sin(elapsed*2.4)*0.08)`(暖色パルス、ハローへコピー)
- autoRotate 時: `glassGroup.rotation.y += delta*0.34`、`rotation.x = sin(elapsed*0.42)*0.08`
- **root 全体のスウェイ `root.rotation.y = sin(elapsed*0.05)*0.04` は autoRotate OFF でも無条件に実行**

### カメラ / 破棄
`PerspectiveCamera(fov 42, near 0.1, far 100)` at (5.9, 3.35, 6.4)、lookAt(0, 1.05, 0)。**OrbitControls なし・完全固定**。resize は aspect 更新のみ。dispose は traverse 破棄+ 15 マテリアルの明示リスト破棄(大半が二重 dispose)、PMREM テクスチャ/ジェネレータ破棄、共有 renderer への `renderer.info.reset()` 呼び出しあり。

## レンダリングパイプライン(パス構成・uniform・マジックナンバー)

- **単一フォワードパス。ポストプロセスなし**。レンダーターゲットは起動時の PMREM ベイクのみ。renderer は共有・注入(トーンマッピング設定は本ファイル外)。発光系 FX はほぼすべて `toneMapped = false` でトーンマッパーをバイパス(パネル、シェル、光源、ハロー、ビーム 6 マテリアル、マーカー 3 種、コースティクス)
- 透明順序は renderOrder の手動チェーンで管理(depthWrite は全 FX で無効): panel=1 → glass=3 → shell=4 → caustics=5 → beam glow=6(depthTest も false) → beam core=7 → markers=8 → halo=9(depthTest false) → source=10。全 FX が AdditiveBlending
- **glassMaterial 実パラメータ**: color 0xe8fdff、metalness 0、transmission 1、reflectivity 0.92、clearcoat 1、clearcoatRoughness 0.02、attenuationColor 0x9ff4ff、attenuationDistance 4.2、specularIntensity 1、specularColor 0xffffff。`envMapIntensity` はコンストラクタで 2.15 だが毎更新 `1.55 + thickness*0.42` で上書き(デフォルト実効値 2.075、コンストラクタ値はデッドコード)。**dispersion パラメータは未使用**(ガラスに色収差なし)
- **コースティクスシェーダ**(`caustics.frag.glsl`、uniforms: `uTime` / `uIntensity` / `uSpread`): 極座標プロシージャル。`rings = sin(radius * (38.0 - uSpread*12.0) - uTime*1.8)`、`spokes = sin(angle*6.0 + uTime*0.8)`、`streaks = sin((p.x*18.0 - p.y*9.0) + uTime*1.15)`、`caustic = smoothstep(0.48, 1.0, rings*0.58 + spokes*0.22 + streaks*0.18)` を `pow(caustic, 0.82)` でシャープ化。色 = cool `vec3(0.48,0.96,1.0)` → warm `vec3(1.0,0.78,0.42)` を spokes でミックスし `* caustic * uIntensity * 1.25`。alpha = `caustic * 0.82 * uIntensity`。有効時 `uIntensity = 1.25` のため RGB 実効倍率 ~1.5625x、alpha 最大 ~1.02(クランプされピーク付近の減衰が平坦化)。コンストラクタの `uIntensity: 1` は即上書きされるデッド定数
- ジオメトリコスト: ガラス本体 IcosahedronGeometry(1.35, 8)(三角形数の見積もりは入力内でも揺れがあり **要確認**、~1620 tris と記載)。ビームチューブはスライダードラッグの毎 tick で dispose + 再生成

## パラメータ一覧

すべて `src/rooms/glass-optics/Controls.tsx` から `onPatch` 経由で反映。

| 名前 | UI | 範囲 | step | デフォルト | 実際の効果 |
|---|---|---|---|---|---|
| lightX | slider | -6..6 | 0.01 | -0.05 | 光源球/ハロー/PointLight の X。全ビームを固定ターゲット (0,1.18,0) へ再照準 |
| lightY | slider | 0.8..6 | 0.01 | 2.42 | 同 Y 軸(min 0.8 で床下クランプ) |
| lightZ | slider | -6..6 | 0.01 | 2.05 | 同 Z 軸 |
| beamSpread | slider | 0.05..0.9 | 0.01 | 0.34 | refractedB の横オフセット (x+spread*2.4, z-spread*3.2)、コースティクススケール (+spread*0.58)、リング周波数 (38-spread*12)、入射ビーム不透明度 (core +spread*0.12 / glow +spread*0.18)、光源スケール (0.92+spread*0.35 / halo 0.72+spread*0.58) |
| ior | slider | 1..2.4 | 0.01 | 1.48 | glassMaterial.ior、屈折セグメント短縮 (1.4/ior)、コースティクススケール (+(ior-1)*0.16)、シェル不透明度 min(0.14, 0.05+(ior-1)*0.05)、屈折 glow 不透明度 +min(0.18, ior*0.05) |
| roughness | slider | 0..0.55 | 0.01 | 0.04 | glassMaterial.roughness、反射ビーム減光 (core 0.5+(1-r)*0.32 / glow 0.12+(1-r)*0.08) |
| thickness | slider | 0.2..2.4 | 0.01 | 1.25 | glassMaterial.thickness、envMapIntensity = 1.55+thickness*0.42、屈折 core 不透明度 +min(0.18, thickness*0.05) |
| autoRotate | toggle | — | — | true | ガラスの自転 (y += delta*0.34) と揺動 (sin(elapsed*0.42)*0.08)。**root スウェイはこのトグルの対象外** |
| showCaustics | toggle | — | — | true | caustics.visible と uIntensity (1.25 / 0) |
| "Focus beam" | button | — | — | — | patch {lightX:-0.28, lightY:2.85, lightZ:1.45, beamSpread:0.18}。**ラベルが英語ハードコード(t() 未使用)** |
| "Crystal preset" | button | — | — | — | patch {ior:1.72, thickness:1.8, roughness:0.01, showCaustics:true}。同上 |
| Reset | button | — | — | — | `t('app.reset')` 経由。glassOpticsDefaults へ復帰 |

## アートディレクション現状(パレット・構図・カメラ・モーション)

### パレット(コード内の正確な値)
| 役割 | Hex / 値 |
|---|---|
| ステージ / フォグ | 0x071018(ほぼ黒の青) |
| 床 | 0x121c26 |
| グリッド(中心線 / 補助線) | 0x42e9ff / 0x163949、opacity 0.28 |
| ガラスティント / 吸収色 | 0xe8fdff / attenuationColor 0x9ff4ff(氷結シアン) |
| ワイヤーフレームシェル | 0xb9fbff |
| アンビエント / ポイントライト | 0x8fb8ff / 0xbdeeff |
| 光源ランプ | 0xffd48b(HSL h=0.1, s=0.95, l=0.64±0.08 のアニメーション) |
| ビーム: 入射 / 反射 / 屈折 | 0x8deeff シアン / 0xffc067 アンバー / 0xf8ffff ほぼ白 |
| マーカー | 0xffffff / 0xffbd66 / 0x9ff8ff |
| パネルグラデーション | vec3(0.24,0.92,1.0) → vec3(1.0,0.72,0.28) |
| コースティクス cool → warm | vec3(0.48,0.96,1.0) → vec3(1.0,0.78,0.42) |

体系は **シアン(冷: 光/ガラス/入射)vs アンバー(暖: 光源/反射)の補色システム** で、パネルとコースティクスにも同一の対比が反響している。

### 構図・カメラ・モーション
- 固定カメラ FOV 42°、位置 (5.9, 3.35, 6.4)、注視点 (0, 1.05, 0)。3/4 俯瞰でガラス球を中央左、背後にパネル、床右寄りにコースティクスプール(デフォルト時)。ユーザーによるカメラ操作は不可
- モーション言語はスローなアンビエントドリフト: root スウェイ周期 ~2 分 (sin(elapsed*0.05)*0.04 rad)、ガラス自転 0.34 rad/s、パネルストライプ 0.018 uv/s、コースティクス rings/spokes/streaks 1.8/0.8/1.15 rad/s、ランプ輝度パルス 2.4 rad/s
- ムード: 暗いラボ/ホログラフィー風 — 加算グロー、ワイヤーフレームオーバーレイ、グリッド床
- ドキュメント整合: `docs/glass-optics-qa-log.md` が規定するチューブビーム・リファレンスパネル・屈折終端連動コースティクス・グリッド支配の低減・光源フレーム内配置・GitHub Pages 対応は現行コードがすべて実装済み。**正確な hex はコードにしか存在しない**(ドキュメントにパレット規定なし)

## 既知の課題(QAログ・ドキュメント由来)

出典: `docs/glass-optics-qa-log.md`(understand-glass.json 経由)

1. **v1 ベースライン課題("Final QA notes" で全件 fixed 扱い)**: 1px 光路が判読不能 / 光源初期位置が画面外 / ガラスがくすんだ灰色球に見える(屈折対象の欠如) / コースティクスが屈折レイと非連動 / 床グリッドが視覚的に支配的
2. **ビルド制約**: 通常のプロダクションビルドは GitHub Pages のベースパスを使うため、プロダクションスモークテストには別途ローカルルートビルドが必要
3. **予算制約**: 展示は静的デプロイ可能かつ GitHub Pages で軽量であること(ポストプロセス予算なし)
4. glass-optics ソース内に TODO/FIXME コメントは存在しない

## コードリーディングで発見されたリスク(重要度順)

1. **[高] 光路が物理ではなくヒューリスティック**: 入射ビームのターゲット (0,1.18,0) は球面追跡でなくハードコードで、**球中心 y=1.25・半径 1.35 に対しターゲットは球の内部**にある(入射ビームがガラス内部で終端し、マーカーが球内に浮く)。反射は法線 reflect() でなく成分ミラーフリップ (`abs(direction.y)`) のため、光源位置によっては(光がターゲットより下、lightZ 負など)幾何的に誤った経路を描く。refractedB は形状無関係に常に y=0.04 へ着地
2. **[高] スライダー毎 tick で TubeGeometry×6 を dispose + 再生成**: dirty-check がなく roughness のみの変更でも光路全再構築が走る。低スペック端末で CPU/GC チャーンのリスク
3. **[中] "Glass Optics" なのに分散(色収差)ゼロ**: MeshPhysicalMaterial の dispersion パラメータ(新しめの three.js で利用可)未使用、ビームもモノクロチューブ。IOR 変更の見た目の効果は内部屈折セグメント長 (1.4/ior = 1.4..0.58 world units) の微妙な変化のみ
4. **[中] root スウェイが無条件実行**: autoRotate OFF でもシーンがドリフトし、スクリーンショット比較を妨げ、トグルの意味を曖昧にする
5. **[中] depthTest 無効の glow 群(ビーム glow・ハロー)は固定カメラ前提のチューニング**: カメラを動かす将来変更でハローイングアーティファクトが露呈する
6. **[中] renderOrder 手動チェーン (1,3,4,5,6,7,8,9,10) の脆さ**: 透明要素を 1 つ追加するだけで全チェーンの再監査が必要
7. **[中] テストがソース文字列一致**: `runtime.test.ts` は `?raw` インポートで `'lightX: -0.05'`、`'material.opacity = 0.28'`、`'caustic * 0.82 * uIntensity'` 等の**リテラル文字列をピン留め**。アートリチューンで定数を変えると挙動が正しくてもテストが壊れる — 定数変更チケットはテスト更新工数を見込むこと
8. **[低] デッド定数 2 件**: glassMaterial の `envMapIntensity: 2.15`(即 1.55+thickness*0.42 で上書き、実効デフォルト 2.075)と caustics の `uIntensity: 1`(即 1.25/0 で上書き)。また alpha 項 `caustic*0.82*1.25` は 1.0 超過でクランプされピークが平坦化
9. **[低] `direction.multiplyScalar(1.4/ior)` の in-place 変異**: reflected 計算後なので現状は順序セーフだが、リオーダーに脆弱
10. **[低] i18n 不整合**: プリセットボタン "Focus beam" / "Crystal preset" のみ英語ハードコード(他は t() 経由)
11. **[低] dispose の二重解放と `renderer.info.reset()`**: 二重 dispose は無害だがノイズ。共有 renderer の info リセットは他ルームの統計収集とタイミングが重なると値を歪める可能性
12. **[低] カメラ完全固定 + root スウェイ**: ユーザーがガラスを他アングルから検分できない(バグではなく制約だがアートレビュー上重要)
13. **[低] グリッド中心線 0x42e9ff (opacity 0.28) がコースティクスプール付近で床の最輝要素**: caustic とグリッドのコントラスト関係は beamSpread 依存のスケール重なり(x≈0.8..1.6)に左右される
14. **[中・監査追補] transmission と FX レイヤーの分離、ワイヤーフレームが屈折に参加しない**: MeshPhysicalMaterial の transmission がサンプルするのはスクリーンスペースの transmission バッファであり、加算 FX 群(ビーム・コースティクス)は照明として意味のある形で取り込まれない。またワイヤーフレームシェル(renderOrder 4)はガラスに屈折されず**上に直描き**されるため、体積の錯覚を平坦化している — P2「ワイヤーフレーム表現の再考」チケットの技術的根拠。加えて FX 群は `toneMapped=false` でトーンマッパーを迂回し、ガラス本体はトーンマップされる**混合カラーパイプライン**になっており、露出・トーンマッピング変更時に FX とガラスの色が別々に動く(この色科学検証は research 未実施 — チケット化時に要調査項目として扱う)

## ビジュアル現状評価(スクリーンショット批評の要約)

出典: `output/playwright/glass-optics-desktop.png` の批評(visual-current.json)。**Wow factor 5/10**、ショールーム 4 展示中 3 位。

- **良い点**: 光学ストーリー(ビーム入射 → 屈折 → コースティクス)は判読可能で、これは展示の本務を果たしている。実在する焦点オブジェクトを持つ
- **ステージが「デフォルトの灰色の虚空」**: 床がフラットで無個性な平面のまま画面下半分を占有。構図は左寄りで左下にデッドスペース
- **球のワイヤーフレームが「デバッグジオメトリ」に見える**: ガラスの質感ではなく開発中の見た目と受け取られる
- **コースティクスが薄すぎてペイオフ不足**: 屈折の「ご褒美」として感じられない
- **アンバーのストライプパネルの役割が曖昧**: 受光板? スクリーン? アーティファクト? — 鑑賞者に意図が伝わらない
- **ステータスチップが「1 FPS」を表示**: 計測バグか実測かに関わらず、公開状態でこの表示は**ローンチブロッカー**(コンセプト画は 60 FPS を約束)。※コード側調査に FPS 低下の直接原因の記載はなく、実測か計測異常かは**要確認**
- 批評の提案: 「ダークな反射する床とより強いコースティクスのホットスポットだけで安価に 2 ポイント稼げる」
- ショールーム全体文脈: コンセプト画にある pro-tool ガーニッシュ(カメラデバッグオーバーレイ、ギズモ、ミニマップ、スパークライン付きテレメトリ 7 セル)はビルドに一切存在せず、チップ 2 個に縮退している

## 調整候補の種(チケット化候補)

- **[P1] 「1 FPS」表示 → FPS の実測/計測系を切り分けて修正**。実パフォーマンス問題なら Tube 再生成チャーン(リスク 2)含め原因特定。公開クレディビリティ直結
- **[P1] コースティクスのペイオフ不足 → ホットスポット強化**。現行の `caustic * uIntensity(1.25) * 1.25` は alpha クランプでピークが平坦化している。強度カーブと falloff(smoothstep(0.48,1.0) の閾値、pow 0.82)を再設計し、明確な焦点輝点を作る。※テストが `'caustic * 0.82 * uIntensity'` をピン留めしているためテスト更新込み
- **[P1] ステージの虚無感 → ダークで反射のある床へ**。床 0x121c26 / roughness 0.5 を反射性のあるマテリアルに変更し、グリッド(0x42e9ff, opacity 0.28)の主張をさらに抑制。批評が「安価に +2 ポイント」と明言した最有力施策
- **[P2] ワイヤーフレームシェルのデバッグ感 → 表現の再考**。opacity 0.08〜0.14(IOR 連動)の additive シェルを、シルエット可読性を保ちながら「ガラスらしさ」に寄せる(削除・減光・フレネル風エッジ発光への置換など)
- **[P2] 光路の物理化 → レイ・スフィア交差 + reflect()/refract()**。ターゲット (0,1.18,0) が球内部にある問題を解消し、ビームが実際の球表面に接するようにする。教育展示としての正しさ向上
- **[P2] "Glass Optics" に分散を導入**。three.js の dispersion パラメータ(プロジェクトの three バージョン対応要確認)またはスペクトル RGB サブチューブで色収差を可視化し、IOR スライダーの体感効果を増幅
- **[P2] リファレンスパネルの意図明確化**。役割が曖昧という批評に対し、位置・ラベリング・グラフィックを再設計して「屈折対象」であることを伝える
- **[P2] TubeGeometry 再生成 → 事前確保 BufferGeometry への書き込みに変更**。スライダードラッグ時の GC チャーン解消(P1 の FPS 問題の原因だった場合は P1 へ昇格)
- **[P3] root スウェイを autoRotate トグルに従属させる**(またはトグル名を変更)。スクリーンショット回帰テストの安定化も兼ねる
- **[P3] 構図の左下デッドスペース解消**。固定カメラ (5.9,3.35,6.4) / lookAt (0,1.05,0) の再フレーミング、または要素配置の調整
- **[P3] プリセットボタンの i18n 対応**("Focus beam" / "Crystal preset" を t() 経由に)
- **[P3] デッド定数の掃除**(envMapIntensity 2.15、uIntensity 1)と `direction` in-place 変異の防御的修正、dispose の二重解放整理
- **[P3] ソース文字列一致テストの見直し**。挙動ベースのテストへ移行し、アートリチューンのたびにテストが壊れる構造を解消
- **[P3] 将来のカメラ操作(OrbitControls 等)導入検討**。その場合 depthTest-off glow 群と renderOrder チェーンの再設計が前提条件

## 重要ファイル

| パス | 役割 |
|---|---|
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\glass-optics\runtime.ts` | ランタイム本体(400 行)。シーングラフ・光路計算・更新ループ・リファレンスパネルのインラインシェーダ |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\glass-optics\caustics.frag.glsl` | コースティクスフラグメントシェーダ(21 行) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\glass-optics\caustics.vert.glsl` | パススルー頂点シェーダ(6 行) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\glass-optics\state.ts` | デフォルト設定(13 行) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\glass-optics\Controls.tsx` | UI コントロール(109 行) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\glass-optics\runtime.test.ts` | ソース文字列一致の vitest 6 ケース(53 行) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\types.ts` | `GlassOpticsSettings` インターフェース(29-39 行) |
| `F:\WorkSpace\ShaderDemoRoom\docs\glass-optics-qa-log.md` | QA ログ(32 行)。v1→v2 再設計の経緯と制約 |
| `F:\WorkSpace\ShaderDemoRoom\output\playwright\glass-optics-desktop.png` | 現状スクリーンショット(批評対象) |
