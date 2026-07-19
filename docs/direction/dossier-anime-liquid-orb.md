# Anime Liquid Orb(MIZU//KOKORO 液态情绪标本 LQ-09)調整カルテ

> 対象: showroom 内 iframe 埋め込み展示 `anime-liquid-orb`(kind: `embedded`)
> 原典: `ref/mizu-kokoro-2-source/`(MIZU//KOKORO 2.0、Three.js 0.184.0 単一ファイルアプリ)
> 情報源: understand-orb.json / visual-current.json / visual-refs.json に由来する初回調査記録と、追跡中の ref / showroom / QA。3 JSON 自体は repository に保存されていないため、以後の訂正はこのカルテと ticket に記録する。
> 検証事実(2026-07-20 訂正): `public/exhibits/anime-liquid-orb/` は `pnpm exhibits:build` で ref の production build から生成し、`pnpm exhibits:check` が source map を含む同期を検証する。

---

## コンセプト(原典の意図)

インタラクティブなアニメ調(NPR)液体オーブを「キュレーションされた実験室標本 = 液态情绪标本 LQ-09」として提示する作品。バージョン 2.0 のテーゼは以下:

- **4つのテーマは4つのパレットではなく、4つのレオロジー的キャラクターである。** 差異は運動言語(viscosity / tension / swell / flow / turbulence / foam / clarity / elasticity / recovery / shear)に宿らなければならず、色は一目での識別のためだけに使う。ART_DIRECTION.md はグレースケールのモーションだけで4相を判別できることを要求しており、コードはレオロジー数値(release field frequency `mix(24,10,μ)`、ripple frequency `mix(14,31,σ)`、damping ratio 算出式など)でこれを実現している。
- **一行原則:「水らしさは光学・スケール・因果性から生まれ、生命感はヒステリシス・オーバーシュート・非再現性から生まれる」。** 物理インスパイアのインスタレーションであり、CFD ソルバーではないことを明言。
- **インタラクションは6幕構成の演劇**: attract → acknowledge(hover 予兆)→ intervene(drag スカルプト + 二次系スプリング回復)→ return(click 波紋)→ phase-change(double-click で結晶化/融解、ヒット点からの核形成)→ ensemble(Space パルス、プロシージャル音場、マイク駆動)。
- **研究系譜の明示的引用**: Wave Particles / Water Wave Packets(スケール階層波)、Valve Portal 2 の dual-phase flow map(テクスチャ不要の球面接線フローとして書き直し)、screen-space liquid refraction、Guilty Gear Xrd / TF2 / Splatoon の NPR 可読性(「マテリアルは動詞である」)、teamLab のフローライン描画、Rain Room の空間的に正確な応答。
- **showroom との関係(2026-07-20 訂正)**: ref は追跡対象の fork であり、showroom は bridge v1 を通して pause / quality / 4相 mode を同期し、stats を読み出す。作品内部の UI は引き続き完全な操作面として残る。

### 埋め込みで守るべき魔法(visual-refs.json の結論)

1. 手描き感のある塗り(gouache 調スペキュラ、米粒状の泡スペックル)を**ほぼネイティブ解像度で**保持する — ダウンスケールするとスペックルがノイズに潰れる。
2. オーブを接地させる dais(台座)/リップルリングを画面内に保つ。
3. 単一状態の固定ではなく **4相のアクセントカラーシステム全体**を見せる。
4. シアンが映える**暗い周囲環境**。
5. **フレームバジェットの余裕** — スタンドアロンでも sculpt 時 22 FPS(1440x900)まで落ちる。
6. ヒーローショットは CALM/AQUEOUS 状態(`preview.png` = `v2-calm-water.png`)。二番手のショーストッパーは CRYSTAL·NUCLEATION(freeze の Voronoi 亀裂)。

---

## 実装アーキテクチャ(シーングラフ/更新ループ/状態フロー)

### 基盤

- 単一ファイルアプリ `ref/mizu-kokoro-2-source/src/main.js`、Three.js 0.184.0。行数は fork の継続改修で変動するため固定値にしない。
- Renderer: `WebGLRenderer{ antialias:false, alpha:false, powerPreference:'high-performance', preserveDrawingBuffer:true(CAPTURE用) }`、sRGB output、ACESFilmicToneMapping exposure 0.86、PCFShadowMap、clearColor `0x03060d`、`FogExp2(0x03060d, 0.042)`。
- Camera: `PerspectiveCamera(42°, near 0.05, far 80)` at `(0, 1.05, 8.1)`。OrbitControls target `(0, 0.42, 0)`、damping 0.055、pan 無効、distance 5.2–10.2、polar 0.72–1.72、azimuth ±1.0、autoRotateSpeed 0.35。

### シーングラフ(orbGroup at y=0.48)

| # | ノード | ジオメトリ / マテリアル | renderOrder |
|---|---|---|---|
| 1 | liquidOrb | `IcosahedronGeometry(1.65, 5)` ShaderMaterial FrontSide, transparent, depthWrite:false | 3 |
| 2 | outlineOrb | 同ジオメトリの inverted-hull BackSide シェル(**変形関数を完全共有**) | 2 |
| 3 | volumeOrb | 背面吸収シェル、scale 0.985、BackSide | 1 |
| 4 | crystalOrb | 別ジオメトリ `IcosahedronGeometry(1.69, 2)`、freezeProgress > 0.002 でのみ visible | 4 |
| 5 | 結晶内部シャード ×22 | `OctahedronGeometry(0.18, 0)` additive、freezeProgress でスケール成長 + 個別 shimmer | — |
| 6 | crystalCracks | CPU 生成 LineSegments。12本の放射 + 分岐。mulberry32 PRNG(seed = `|floor((o.x*1731 + o.y*3191 + o.z*7919)*10000)| + 17`)、`setDrawRange(0, vertexCount*freezeProgress)` で成長 | — |
| 7 | インタラクションプロキシ | `SphereGeometry(1.76, 28, 20)` colorWrite:false(raycast 用) | — |
| 8 | fresnel core + coreKnot | `IcosahedronGeometry(1.02, 4)` additive / `TorusKnotGeometry(0.57, 0.055, 220, 18, 2, 3)` opacity 0.28 | — |

ステージ側: pedestal `CylinderGeometry(2.22, 2.48, 0.34, 96)` MeshStandardMaterial `0x07101a` rough 0.24 metal 0.82 / トップディスク `0x0b1924`(emissive = mode.floor、強度 ~0.07–0.33 pulse/freeze 駆動)/ 投影 caustic ディスク `CircleGeometry(1.79, 128)`(2層 warped sine 干渉網、uFreezeProgress で10回対称 "crystalRay" にクロスフェード)/ リング `TorusGeometry(1.96, 0.018, 8, 192)` + 48 instanced ティックマーク / additive グリッド床 32×32 at y=-1.50 / ビルボード halo `CircleGeometry(4.25, 192)`(controls.target + viewDir*4.2、renderOrder -2)/ 軌道アーク ×3 / ビルボードライトバー ×7 / 背景ポイントスプライト 950(quality で drawRange 950/700/430)/ MeshToonMaterial 液滴 ×16(3段 DataTexture gradientMap `[35,145,255]`、`scale.y *= 1 + viscosity*1.35 + swell*0.22` の糸引き)/ 320粒リングバッファ BurstParticles / プール式ショックウェーブリング ×7。

### シミュレーション(FBO なし、純プロシージャル頂点変位)

`displacementField()` が `modeWeights(uMode)`(0..3 のテント重み)で相ごとの項をブレンド: 4-octave FBM 大流(球面接線フロー場で移流)+ 細ノイズ×uTurbulence + capillary クロス波(weights.x, freq 22/17)+ swell + 非線形ブレーカー `pow(...,4.0)*uSwell`(weights.y)+ ridged-FBM 粘性ローブ×uViscosity(weights.z)+ 時間量子化メタリックスキャン `floor(t*10)/10`(weights.w)+ 呼吸項 + インタラクション項(負圧ショルダー付き touch バルジ・反対側収縮、drag クレスト、5スロット ripple リングバッファ `uRipples[5]`(vec4 = ローカル方向 + 発生時刻、生存 5.6s、frequency `mix(14,31,tension)`、speed `mix(4.6,13.5,tension)`)、release field(進行リング + local snap × `uReleaseEnergy*uElasticity`)、audio 波、パルス)。全運動は `mobile = 1 - uFreezeProgress*0.94..0.96` 倍。`deformPosition()` が接線 drag(uDragVector の接平面射影)とリリース後の接線リコイルを追加。

**法線は有限差分で再構築**: `deformPosition` を tangent/bitangent ±eps 0.010 で評価 — つまり**頂点ごとに変位場を3回フル評価**。これが liquid と outline **両方の**頂点シェーダで走る。

### 状態フロー(JS 側)

- touchStrength: 明示的二次系スプリング。springStrength は sculpt 中 185、それ以外 `42*mode.recovery*max(0.25, liveliness)`。dampingRatio は sculpt 中 0.92、それ以外 `clamp((0.24 + viscosity*1.02)/sqrt(max(0.22, elasticity*liveliness)), 0.18, 1.42)`。値は [-0.52, 1.46] にクランプ。
- ポインタ: hover で touchStrengthTarget 0.15(凍結時 0.06)、sculpt 1.36。プロキシ上 pointerdown で OrbitControls 無効化 + ripple 発生。drag デルタは球接平面へ射影(`localDelta -= p·dot(localDelta,p)`)、`dragAmount = min(1.6, |Δ|*26 + pointerVelocity*0.32)`、sculptEnergy は 1.65 まで蓄積。release で `uReleasePoint/Vector/Time` と `uReleaseEnergy = min(1.7, 0.35 + sculptEnergy + pointerVelocity*0.45)` を書き込み。
- `pointerup` が mouse / touch / pen 共通の double-tap state machine を所有し、freeze を1回だけトグルする。核形成方向 → uFreezeOrigin / uFreezeTime、CPU 亀裂再構築。freezeProgress は damp rate 2.45(freeze)/ 3.6(melt)。melt は energy 1.15 のリリースを注入。
- アイドルアトラクト: >15s で autoRotate + 徘徊するプロシージャルタッチ点、>30s で 17s ごとの自動相サイクル。
- モード変更: float `uMode` を rate 3.2 で damp しシェーダ重みをクロスフェード。`updateColors()` が約20色(共有 uniform 5 + floor/halo/beam/particles/droplet/knot/ring/tick/emissive/caustic/crystal/arcs/shockwaves/keyLight 0.35x/rimLight 0.45x)を `alpha = 1-exp(-3.4Δ)` で lerp。
- グローバル時間: `sceneTime += delta * mode.speed * settings.userSpeed * (prefers-reduced-motion なら 0.34)`、delta は 0.05 にクランプ(タブ復帰スパイク対策)。
- Audio: SoundField = `mode.note * [1, 1.5, 2.01]` の3オシレータ(sine + triangles)→ 680Hz lowpass、+ ループノイズ → 460Hz bandpass → compressor。`ping()` はインタラクションごとに 0.5s 減衰ブリップ。マイク経路は AnalyserNode fftSize 256、`energy = clamp01((avg(bins 1..30) − 18)/105)` を rate 12 で damp して uAudio へ(変位・core・halo・arcs・lights を駆動、保存はしない)。
- ライト毎フレーム: rim `20 + pulse*15 + audio*18 + freeze*8`、key `48 + pulse*18 + freeze*7`。

### showroom 統合

- registry: kind `'embedded'`、accent `#ff56d8`、techTags `['NPR Fluid','Post FX','Interactive Phase']`、embedPath `exhibits/anime-liquid-orb/index.html`。
- `EmbeddedExhibitFrame` は iframe lifecycle と bridge v1 を所有する。reloadToken による明示的再マウントに加え、exact envelope で `set-paused` / `set-orb-mode` / `set-orb-quality` を送る。
- **2026-07-20 訂正**: capabilities は `pause / stats / set-mode / set-quality`。host pause と `document.hidden` は単一の runtime pause 状態へ集約され、rAF と音声を停止する。stats は `{ fps, frameTimeMs, frameCount, paused }` の exact shape で 500ms ごとに shell telemetry へ流れる。

---

## レンダリングパイプライン(パス構成・uniform・マジックナンバー)

### フレームごとの2パス構成

- **Pass A(renderRefractionBuffer)**: `orbGroup.visible=false` にして残りのシーン全体を `refractionTarget`(WebGLRenderTarget、LinearFilter、mipmap なし、name `'MIZU_REFRACTION_BUFFER'`)へ描画。サイズは drawingBuffer × {high: 0.82, medium: 0.66, low: 0.5}。
- **Pass B(EffectComposer)**: RenderPass → `UnrealBloomPass`(初期 strength = modes[0].bloom = 0.46、radius 0.26、**threshold 0.94**。実行時 strength は `(mode.bloom + freezeProgress*0.24)*settings.bloom*(LOW時 0.72)` に damp、radius は VOID/凍結で 0.28 ↔ 0.16)→ `ShaderPass(FinalGradeShader)` → SMAAPass(LOW では無効)→ OutputPass。

つまり**シーン全体を毎フレーム2回描画**(屈折バッファ + メインパス)+ bloom/SMAA、さらに preserveDrawingBuffer:true のコストが乗る。

### FinalGradeShader

- 放射状色収差: `chroma = uChroma*(0.45 + radius*1.8 + uPulse*1.7)`、R/B を ±offset でサンプル。実行時 uChroma は `0.00075*(mode.chroma + freezeProgress*0.42)*settings.chroma` へ damp。
- ポスタライズ: `floor(color*levels+0.5)/levels`、`levels = mix(256, 10, uPosterize)`、ブレンド量 `uPosterize*0.8`(`uPosterize = mode.posterize + freezeProgress*0.08`。非ゼロは VOID の 0.72 のみ)。
- スキャンライン `sin(vUv.y*uResolution.y*1.12 + uTime*11)*(0.004 + posterize*0.008)`、ビネット `smoothstep(0.84, 0.25, radius)` floor 0.68、フィルムグレイン hash21 振幅 `0.012 + posterize*0.014`、パルスゲートのコーナーアクセントスミア `uAccent * cornerSignal * uPulse * 0.025`。

### Liquid フラグメント(NPR コア)

- 3バンド cel トーン: `ndl = dot(N,L)*0.5+0.5` をハードステップ 0.18/0.25、0.48/0.56、0.79/0.87(重み 0.24/0.35/0.41)で uDeepColor→uMidColor→uLightColor にブレンド。
- **固定ライト方向 `L = (-0.42, 0.73, 0.54)`**(実際の SpotLight と非連動。crystal シェーダは `(-0.48, 0.76, 0.43)`)。
- ファセット量子化 `N → floor(N*7.0+0.5)/7.0` を `uFacet*0.72` でミックス。
- fresnel リム `pow(1-NdV, 2.0)` を `smoothstep(0.34, 0.73)` でバンド化、解析的水平線反射 `mix(uDeepColor*0.72, uLightColor)`。
- Screen-space refraction: vClipPosition から screenUv、`thicknessProxy = 0.18 + pow(rim, 0.58)*0.82`、`offset = (N.xy*0.014 + flow.xy*0.005*uFlowStrength)*(0.52 + uClarity*0.88)*(0.68 + thicknessProxy*0.72)*(1 - frozen*0.82)`、RGB 分散 ×1.08 / ×1.0 / ×0.90、吸収ティント `mix(vec3(0.86,0.96,1.0), uMidColor, 0.32 + thicknessProxy*0.24)`、`transmission = uClarity*(0.38 + NdV*0.46)` を ×0.58 で適用。
- Dual-phase フロー輸送: `phase0/1 = fract(fluidTime*0.115)` と +0.5、三角ブレンド重み。`flowLineAt()`(fbm で歪めた経度/緯度フィラメント場)と `causticAt()` でサンプル。
- 二重ハードスペキュラ: 一次 `pow(NdH, mix(36, 82, uClarity))` を `smoothstep(0.20, 0.54)*0.78` でハードカット、二次 pow 96(固定方向 `(0.5, 0.1, 0.86)` 向き)を `smoothstep(0.20, 0.43)*uAccentColor*0.32`、+ 伸長グリント `flowLines*pow(NdH,18)*(0.16 + uFlowStrength*0.16)`。
- クレスト泡: `slope = clamp(fwidth(vDisplacement)*24, 0, 1)`、`crest = smoothstep(0.025, 0.145, vDisplacement + slope*0.045)`、`foam = crest*(0.42 + flowLines*0.76)*uFoam` + SURGE 限定の照明側項。
- BLOOM 花弁(6回対称 sin、weights.z、accent*0.21)、VOID バーコード + バイナリカットを `weights.w*0.76` でミックス(detailTime は `floor(uTime*12)/12` に量子化)。
- タッチグロー `exp(-d²*29)*|touch|`(accent 0.58)+ 角距離 0.22 のタッチリング(light 0.48)。freeze プレビューは `transmitted*0.72 + icePreview`(`mix(vec3(0.42,0.75,0.92), uLightColor, 0.62)`)へ `frozen*0.72` でミックス。マイクログレイン `hash31*mix(0.013, 0.027, weights.w)`。
- Alpha = `uOpacity + rim*0.055 − uClarity*0.055`、凍結時は `0.15 + rim*0.12` にリマップ。

### Volume シェル(BackSide)

逆オフセット屈折 `(−N.xy*0.021 + flow.xy*0.006*uFlowStrength)`、内部 caustics、吸収 `mix(uMidColor, uDeepColor, edge*0.72)`、alpha `(0.08 + edge*0.25 + innerCaustic*0.08)*(0.62 + uClarity*0.38)*(1 − uFreezeProgress*0.78)`。**2026-07-20 訂正**: liquid と共有する freeze mask から `fluidTime` を算出し、凍結前面の背面フローも同じ時間軸で停止する。

### Crystal シェル

- 頂点: freeze フロント `front = uFreezeProgress*1.24`、`angularDistance(dir, uFreezeOrigin)/PI` 上の smoothstep ±0.055、`smoothstep(0.002, 0.045, uFreezeProgress)` でゲート。セルごとの hash ジッタ ±0.045 の放射インフレーション + 軸スパイク `pow(axial, 13.0)*0.075`。
- フラグメント: `cross(dFdx, dFdy)` によるフェイス法線、5段階量子化 faceLight、Worley cellular3 F2−F1 境界(scale 8.2)、核形成フレーム周りの7回対称放射クラック + リングクラック(freq 17)、閾値ノイズの気泡、強めの分散付き screen-space refraction(×1.22 / ×1.0 / ×0.78)、iceTint `mix(vec3(0.24, 0.63, 0.84), uLightColor, 0.68)`、ハードスペキュラ pow 74 カット `smoothstep(0.12, 0.42)*1.05`。alpha = `vFreezeMask*(0.52 + fresnel*0.26 + cracks*0.20 + bubbles*0.11)` 上限 0.96、mask 0.004 未満は discard。

### 透明度順序

完全に手動: 全オーブシェルが depthWrite:false + renderOrder 1(volume/core/interior)→ 2(outline)→ 3(liquid)→ 4(crystal)。outline alpha は uFreezeProgress で 0.96 → 0.14 にクロスフェード。

---

## パラメータ一覧(名前/範囲/デフォルト/実際の効果)

### showroom 側(Controls.tsx → EmbeddedControls)

| パラメータ | 範囲 | デフォルト | 実際の効果 |
|---|---|---|---|
| reloadToken | number | 0 | 「Reload exhibit」でインクリメント → `?reload=N` 付きで iframe 再マウント。「Open standalone」は embed パスを新規タブで開く。「Reset」は reloadToken をリセット。**iframe 境界を越えるのはこれだけ** |

### 展示内 実験パネル(index.html スライダー → settings)

| ラベル | 内部名 | 範囲 | デフォルト | 実際の効果 |
|---|---|---|---|---|
| 流动幅度 | deform | 0.35–1.8(step 0.01) | 1.00 | `mode.deform` に乗算して uDeform へ(総変位ゲイン) |
| 时间速度 | speed | 0.15–2.2 | 1.00 | sceneTime の進行スケール(全アニメーション) |
| 墨线厚度 | outline | 0–2 | 1.00 | `uOutlineThickness = 0.046*outline`(inverted-hull シェル押し出し) |
| 辉光强度 | bloom | 0–2 | 1.00 | bloomPass.strength をスケール |
| 色差扰动 | chroma | 0–1.5 | **0.45** | gradePass uChroma をスケール(最終色収差)。**デフォルトが 1 ではなく 0.45 な点に注意** |
| 表面流线 | flow | 0–2 | 1.00 | `uFlowStrength = mode.flow*settings.flow`(フローライン輸送・屈折フロー項・グリント) |
| 回弹活性 | liveliness | 0.15–1.8 | 1.00 | uElasticity、回復スプリング強度、uDragVector 振幅に乗算 |

RESET MATERIAL は `{deform 1, speed 1, outline 1, bloom 1, chroma 0.45, flow 1, liveliness 1}` を復元。

### QUALITY(high / medium / low)

| 項目 | high | medium | low |
|---|---|---|---|
| pixelRatio 上限 | 1.5 | 1.25 | 1.0 |
| SMAA / shadows | on | on | **off** |
| 背景パーティクル drawRange | 950 | 700 | 430 |
| 屈折バッファスケール | 0.82 | 0.66 | 0.5 |
| bloom | ×1 | ×1 | ×0.72 |

デフォルトは coarse pointer で 'medium'、それ以外 'high'。README の性能規約: LOW でも本体変形・表面フロー場・結晶化シルエットは維持(削るのは SMAA/影/解像度/パーティクルのみ)— コードは準拠。

### モード・ツール・ポインタ動詞

- モードボタン / キー 1–4: 4相プリセット選択(各プリセットはレオロジー10種 + 色7種 + deform/speed/bloom/chroma/posterize/rim + audio note を設定。全て rate 3.2–5.0 の damp で約1秒クロスフェード)。
- ツールドック: 声场 on/off(プロシージャルドローン、master gain は 0.075 へランプ)/ MIC on/off(uAudio を soundField.visualEnergy の代わりにマイクで駆動)/ 实验参数 パネル / CAPTURE(再レンダして `mizu-kokoro-<mode>-<ts>.png` 保存)/ FULL・キー F(フルスクリーン)。キー M = mic、Space = `triggerPulse(1)`。
- ポインタ動詞: hover = 予兆(0.15)/ オーブ上 press+drag = sculpt(1.36、OrbitControls 無効化)/ release = リコイル波 / click = 波紋(5スロット)/ double-click・double-tap = freeze ↔ melt / オーブ外 drag = カメラ軌道(azimuth ±1.0 rad)。

---

## アートディレクション現状(パレット・構図・カメラ・モーション)

### 4相パレット(main.js の modes 配列より正確に転記)

| モード | deep | mid | light | accent | ink | floor | backdrop |
|---|---|---|---|---|---|---|---|
| CALM 静水 | `#031522` | `#14c8ef` | `#efffff` | `#68f2ff` | `#01070d` | `#48ebff` | `#0f708c` |
| SURGE 涨潮 | `#1b0923` | `#ec3b9b` | `#fff7df` | `#ffb72f` | `#10030d` | `#ff56ba` | `#8b2859` |
| BLOOM 绽生 | `#061b19` | `#35dea8` | `#f4ffed` | `#b2ff4d` | `#02100d` | `#63ffc3` | `#1b826b` |
| VOID 零界 | `#010204` | `#9eabb5` | `#ffffff` | `#ff3a52` | `#000000` | `#e4fbff` | `#677984` |

### 4相レオロジー/ポスト値

| モード | μ(viscosity) | σ(tension) | swell | flow | turb. | foam | clarity | elast. | recov. | shear | deform | speed | bloom | chroma | posterize | rim | note(Hz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CALM | 0.16 | 0.92 | 0.18 | 0.35 | 0.18 | 0.08 | 0.94 | 1.08 | 1.22 | 0.72 | 0.78 | 0.78 | 0.46 | 0.25 | 0 | 1.02 | 55 |
| SURGE | 0.07 | 0.54 | 1.0 | 1.2 | 0.92 | 1.0 | 0.62 | 0.82 | 0.92 | 1.22 | 1.34 | 1.16 | 0.72 | 0.72 | 0 | 1.17 | 65.41 |
| BLOOM | 0.9 | 0.7 | 0.34 | 0.76 | 0.28 | 0.12 | 0.48 | 0.38 | 0.34 | 1.52 | 1.12 | 0.72 | 0.6 | 0.42 | 0 | 1.1 | 73.42 |
| VOID | 0.24 | 1.24 | 0.08 | 0.16 | 0.12 | 0.0 | 0.72 | 1.34 | 1.48 | 0.58 | 0.68 | 0.6 | 0.39 | 1.08 | **0.72** | 1.42 | 41.2 |

> **要確認**: 原典スクリーンショット批評(visual-refs.json)は SURGE のオーブを「muted lavender-gray」と記述しているが、コードのパレットは mid `#ec3b9b`(マゼンタピンク)/ floor `#ff56ba`。HUD アクセントの amber(`#ffb72f`)は一致する。暗いシーンキー + トーンマッピングによる見え方の差か、キャプチャ時点とのパレット差異かは実機で要確認。

### UI CSS トークン

`--accent #50e8ff`、`--accent-2 #ff4fd8`、`--ink #020811`、`--paper #eaffff`、glass `rgba(2,8,17,0.48)`、ページ/テーマ背景 `#03060d`。`setMode()` が --accent/--accent-2 をモードの accent/floor に書き換える。showroom registry のこの部屋のアクセントは `#ff56d8`。

### 構図・カメラ(ART_DIRECTION.md §8 との照合)

| §8 の規定 | コードの実態 |
|---|---|
| 42° パースペクティブ | fov 42 ✓ |
| 被写体はやや中央上、オーブはデスクトップフレーム高の 55–62% | 固定カメラ/orbit クランプから結果的に成立。**コード上で強制も計測もされていない** |
| 観察台座は下 1/3 で caustics と重量を担う | ✓ |
| データ halo は厳密に被写体の背後 | target の 4.2 後方にビルボード、renderOrder -2 ✓ |
| 左上固定キーライトで安定したスペキュラリード | SpotLight `(-4.5, 7.0, 5.4)` ✓ **ただし NPR フラグメントは独自の固定 `L=(-0.42,0.73,0.54)` を使うため、シェーディングは実ライトと非連動** |
| 右後方の色付きリムライトでテーマ分離 | PointLight `0xff4fd8` at `(4.2, 1.8, -2.2)`、モード accent へ 0.45× でのみ lerp ✓/部分的 |
| 黒場を温存し、パルスと freeze が輝度クライマックスを届ける | bloom threshold 0.94 ✓(「Bloom は高エネルギー領域だけに報酬を与え、常時の白い靄にしない」) |

### モーション言語

相ごとの運動差はレオロジー数値から発生(release field frequency `mix(24,10,μ)`、ripple frequency `mix(14,31,σ)`、damping ratio 式)。§5 の「結晶は色替えではなくルール切替であれ」も実装済み: 本当に別個のローポリシェル、フェイス法線、5段量子化ライト、cellular + 放射 + リングクラック、CPU 分岐クラック、シャード、凍結後の脆性クリックフィードバック(freezeProgress > 0.72 で sculpt 抑制)。§1.5/2.2 の dual-phase flow(無限伸長回避)も正確に実装(rate 0.115 の半周期位相ペア + 三角ブレンド)。

---

## 既知の課題(QAログ・ドキュメント由来 — 出典明記)

| # | 課題 | 出典 |
|---|---|---|
| 1 | 宣言済みの境界: 屈折は単一の screen-space 近似(画面外コンテンツはサンプル不可)、thickness は view/rim プロキシで体積積分ではない、波はプロシージャル変位(Navier-Stokes なし)、泡は視覚ヒューリスティック — 技術説明文で正直に明記すべし | ART_DIRECTION.md §11 |
| 2 | §12 受け入れチェックリストが**全項目未チェック([ ])のまま** — 合格記録なし | ART_DIRECTION.md §12 |
| 3 | 修正済みの2つの欠陥の記録: ローディングオーバーレイがフェード後もポインタを奪う問題、ネイティブテキスト選択がドラッグを壊す問題(いずれも修正確認済み: `loading.is-hidden pointer-events:none` / `body user-select:none`) | README / UPGRADE_NOTES |
| 4 | マイクは HTTPS または localhost + ブラウザ許可が必要。`file://` で dist/index.html を開くと ES modules が動かない | STATIC_README |
| 5 | SwiftShader での実行は互換性確認のみ。FPS はディスクリート GPU を代表しない | BUILD_INFO.txt |
| 6 | LOW 品質でも本体変形・表面フロー場・結晶化シルエットは必ず維持する規約 — コードは準拠確認済み | README パフォーマンスノート |
| 7 | sculpt 時にスタンドアロンでも 22 FPS(1440x900)まで低下 — showroom 埋め込みではさらに予算が必要 | visual-refs.json(v2-sculpt-hold.png の FRAME 表示) |

---

## コードリーディングで発見されたリスク(重要度順)

understand-orb.json の risks を重要度順に整理(順位はカルテ執筆者による仮判断)。

1. **解消済み(2026-07-20): シェル⇔iframe 通信チャネル**。bridge v1 が品質設定・4相 mode・pause・stats を exact envelope で扱い、`visibilitychange` も同じ pause state machine に合流する。`qa:exhibits` が pause/visibility 中の frameCount 停止、復帰、audio intent と iframe identity 維持を検証する。
2. **頂点コストのホットスポット(規模訂正済み)**: 法線再構築のため deformPosition が頂点ごとに 3 回評価され、それが liquid と outline 両方の頂点シェーダで走る — 頂点あたり毎フレーム **6 回**の変位場フル評価(各回に 5-ripple ループ、4-octave FBM、ridged FBM、curl ノイズを含む)。ただし `IcosahedronGeometry(1.65, 5)` の実サイズは **720 tris(非インデックスで約 2,160 頂点)/シェル**であり、当初調査の「≒20k tris」は約28倍の過大見積り(three.js PolyhedronGeometry 実装 20面×(detail+1)² で検証済み)。頂点コストが sculpt 時 22 FPS の主犯である可能性は低下しており、**本命はフレーム毎2回のフルシーン描画+bloom/SMAA+preserveDrawingBuffer のフィルレート(リスク3)の可能性が高い。最適化チケットの起票前に Spector.js 等でのプロファイル実測を前提条件とすること**。outline の再構築廃止自体は依然として安価で無リスクな改善。
3. **フレームごとにシーン全体を2回描画**(屈折バッファ + メイン)+ bloom/SMAA + preserveDrawingBuffer:true。ローエンド GPU ではタッチデバイスの MEDIUM デフォルトでも重い可能性。
4. **解消済み: double-tap freeze 所有権**。`pointerup` の単一 state machine が mouse / touch / pen を扱い、旧 `dblclick` owner を撤去。恒常 QA は有効/無効 gesture と厳密な状態遷移回数を検証する。
5. **解消済み: Volume freeze 時間軸**。liquid / volume が同じ freeze mask を共有し、凍結 ROI の t と t+2s byte diff、未凍結 ROI の motion を `qa:orb` で検証する。
6. **NPR ライト方向のハードコード**(liquid `L=(-0.42,0.73,0.54)`、crystal `(-0.48,0.76,0.43)`)が実際の SpotLight/PointLight と非連動 — ステージライトを動かしても cel バンドは動かない。アートディレクション上のリライトはシェーダ定数の変更が必須。
7. **VOID モードのバンディングリスク**: posterize 0.72 + chroma 1.08 + ほぼモノクロパレット(`#9eabb5`/`#ffffff`)の組合せ。ACES パイプラインの bloom threshold 0.94 の後で、ディザなしの量子化バンディングが可視化する危険が高い。
8. **手動透明度順序の脆さ**: 全シェル depthWrite:false + renderOrder 管理。液滴(MeshToonMaterial、transparent、デフォルト depthWrite:true)や additive ステージ要素が、許可された orbit 範囲内のグレージング角でオーブに対して不正ソートしうる。
9. **マジックナンバーの集中**: freeze front 定数 1.24、facet 0.72、屈折ゲイン 0.014/0.005、分散比 1.08/0.90(liquid)vs 1.22/0.78(crystal)、foam 閾値 0.025/0.145 — 中央チューニングテーブルがなく、modes 配列だけが構造化された設定。
10. **アイドル自動展示モードの音**: 30s アイドル後 17s ごとに `setMode()` + `soundField.ping()` — 音声有効のまま放置された kiosk が周期的にピングを発する。また lastInteraction を `now - 20000` に巻き戻してサイクルを維持する小細工あり。
11. **デッドコード/uniform**: liquid フラグメントの uResolution / uAudio は宣言のみで未使用。keyLight は intensity 52 で生成されるが animate() が毎フレーム base 48 で上書き。FinalGradeShader の uChroma 初期値 0.002 は即座に 0.00075 スケールの damp 値に置換。旧調査の `fpsLastUpdate` は現行に存在せず、500ms の wall-clock sampler に置換済み。
12. **iframe allow に `clipboard-write`** が含まれるが展示は使用しない(CAPTURE は `<a download>`)。microphone 許可は正当に必要。
13. **`liquidMaterial.extensions.derivatives = true` は three 0.184 で非推奨 API**(無害だが将来のアップグレードでノイズに)。
14. **公開 embed はフルソースマップを同梱**。公開 fork の透明性とオンライン QA を優先して保持する方針を README に明記済み。
15. **解消済み**: `ref/` は権威ソースとして git 追跡され、public は生成物として同期 gate の対象になった。

---

## ビジュアル現状評価(スクリーンショット批評の要約)

### showroom 内の現状(visual-current.json)

- **デスクトップ: Wow 8/10 — ラインナップ中、唯一「完成されたビジュアルアイデンティティ」を持ち、ローンチに最も近い展示**。バイリンガルな sci-fi ラボタイポグラフィ、明確なヒーローオブジェクト、一貫した線の太さ、コンセプトアートのオーバーレイ言語に呼応する多層 HUD フレーミング。焦点階層も機能(オーブ → タイトル → 相カード)。
- デスクトップの弱点(4件):
  1. オーブ内部の白が**アモルファスでやや内臓的** — シャープなアニメ液体の読みになっていない(原典リファレンスの gouache スペキュラ + 米粒スペックルと比較して)。
  2. **歴史記録(2026-07-20 訂正済み)**: 当時の capture と原典 `preview.png` では FPS 欄が `-- FPS` だった。現行は初回/復帰の 500ms warm-up のみ `-- FPS`、実行中は `NN FPS`、pause/hidden 中は `PAUSED`。再取得証拠は `captures/t-ao-04-orb-hud-running.png` と `captures/t-ao-04-orb-hud-paused.png`。原典 preview は比較記録として保持する。
  3. HUD タイトルブロックがオーブの左上リムに**近接しすぎ**。
  4. 構図の下 1/3 が上より密で、オーブが**やや高く浮いて**見える。
- **モバイル: Wow 6/10 — 固定 HUD がリフローしない**。タイトルプレートがオーブ上に直接重なり、4相カードは英語サブラベルが途中でクロップ、端のマイクロテキストはノイズ化。ヒーローのオーブは UI プレートの間から約 1/4 しか見えない。「デスクトップのスクリーンショットを電話に押し込んだ」読み味。canvas 内ブレークポイント対応(タイトル縮小、相カード 2×2、端テキスト非表示)が必要。
- showroom 全体ランキングでは 4 展示中 **1 位**(2位 Ninth Tide、3位 Glass Optics、4位 Voxel Water)。

### 原典リファレンスとの差分で守るべきもの(visual-refs.json)

- ヒーローショット = CALM/AQUEOUS(`preview.png` = `v2-calm-water.png`、Wow 9)。「柔らかな Ghibli 隣接の painterly 流体 × 硬いモノスペースのラボ HUD」という意図的な緊張が核。スペックルと gouache スペキュラの手描き感**こそが展示物**。
- CRYSTAL·NUCLEATION(Wow 8.5)がサーフェス**構造**を変える唯一の状態で最大の単一フレームデルタ — 来場者の足を止める筆頭。
- SURGE(Wow 7)は 4 パレット中で最も濁りやすく、値分離が弱い。VOID(Wow 6.5)は静止画ではオーブが最も地味で、赤 HUD アクセントに興味を全依存 — HUD なしの埋め込みではフックを失う。
- 960x600 の状態キャプチャでは相パネルがオーブのシルエットを侵食 — 小さい埋め込みビューポートでは同じオーバーラップがヒーローを覆う。
- v2-sculpt-hold.png は 1440x900 スタンドアロンで 22 FPS — showroom 同時稼働でのフレーム予算に警告。

---

## 調整候補の種(チケット化候補)

優先度は仮ラベル。P1 = ローンチ前必須級、P2 = 品質/信頼性で早期に、P3 = 整理・将来向け。

### P1

- **[P1 解消済み 2026-07-20] FRAME HUD**。500ms 実測、pause/hidden の `PAUSED`、初回/復帰 warm-up の `-- FPS` を単一 state machine と恒常 QA で固定した。software renderer の数字は性能 golden として扱わない。
- **[P1] モバイルで HUD がヒーローを覆う → canvas 内ブレークポイント対応**。タイトルプレート縮小、相カードの 2×2 グリッド化、端のマイクロテキスト非表示。オーブの可視面積を最優先。原典改変を避ける方針との整合(fork するか、原典側に upstream するか)の判断が前提。
- **[P1 解消済み] double-tap freeze**。`pointerup` の単一 state machine と mouse / touch / pen の厳密な遷移 QA へ統合済み。
- **[P1 解消済み] シェル⇔iframe bridge v1**。pause / stats / set-mode / set-quality と visibility lifecycle を実装・QA 化済み。
- **[P1] 頂点コスト(変位場 6 回/頂点/フレーム)→ outline シェルの変形簡素化または結果共有、法線の解析的導出やテクスチャ/FBO 化の検討**。sculpt 時 22 FPS(スタンドアロン 1440x900)の主犯格。showroom 同居では予算がさらに厳しい。

### P2

- **[P2] オーブ内部の白がアモルファス → gouache スペキュラの形状制御と米粒スペックルの解像感を強化**。現状批評の「内臓的」読みを、原典ヒーローの「手描きの魅力」に引き戻す。スペキュラのハードカット閾値(smoothstep 0.20/0.54 等)と foam 閾値(0.025/0.145)の再チューニングが起点。
- **[P2] HUD タイトルブロックとオーブ上部リムの近接 + 下 1/3 過密 → HUD レイアウト微調整で構図バランス回復**。§8 の「オーブ 55–62% フレーム高」規定はコードで計測されていないため、まず現状の実測から。
- **[P2 解消済み] Volume freeze 時間軸**。共有 freeze mask と `fluidTime` に統一し、isolated volume の ROI byte gate を追加済み。
- **[P2] VOID の posterize バンディング → ordered/blue-noise ディザの導入検討**。posterize 0.72 + ほぼモノクロパレット + ACES + bloom threshold 0.94 の組合せはバンディング高リスク。
- **[P2] SURGE の値分離が弱い(リファレンス批評で最も濁る)→ 実機で SURGE の見えを確認し、必要なら deep/mid の値差またはリムを補強**。あわせて**要確認**: コードの mid `#ec3b9b`(ピンク)とリファレンス記述「lavender-gray」の食い違いの原因特定。
- **[P2] 透明度ソートの脆さ → 液滴(depthWrite:true)と additive ステージ要素の許容 orbit 範囲内での目視 QA、必要なら renderOrder/depthWrite 調整**。
- **[P2] アイドル自動展示の音 → 音声有効時の自動サイクル ping を抑制するか、attract モード中は音を減衰**。kiosk 運用時の周期ピング問題。
- **[P2 解消済み] ref 追跡方針**。権威ソースを repository 内で追跡し、public は ref からの生成物として同期 gate を持つ。
- **[P2] ART_DIRECTION.md §12 受け入れチェックリストが未実施 → showroom 埋め込み状態でチェックリストを実走し記録**。調整フェーズの完了条件としてそのまま使える。

### P3

- **[P3] デッドコード清掃**: liquid フラグメントの未使用 uResolution/uAudio、keyLight 52→48 の毎フレーム上書き、FinalGradeShader uChroma 初期値 0.002。
- **[P3] `extensions.derivatives` 非推奨 API の置換**(three 0.184、将来アップグレード時のノイズ削減)。
- **[P3] iframe allow から未使用の `clipboard-write` を削除**(microphone は必要なので維持)。
- **[P3 解消済み] 公開ソースマップ同梱**: 公開 fork の透明性とオンライン QA のため保持する方針を README に明文化済み。
- **[P3] マジックナンバーの中央チューニングテーブル化**(freeze front 1.24、facet 0.72、屈折ゲイン 0.014/0.005、分散比、foam 閾値等)— 今後の調整チケットの作業効率に直結。
- **[P3] NPR ライト方向とシーンライトの非連動をドキュメント化**(またはシーンライトから uniform 供給へ)— リライト系チケットの前提知識。
- **[P3] 研究トピックの深掘り**(understand-orb.json researchTopics より): depth-aware screen-space refraction マスキング、Jacobian ベース foam、flowLineAt の極の pinch 対策、OIT/depth-peeling 代替、Wave Particles 的な波紋の群速度/分散、Xrd 流ノーマル編集による 3 バンドの安定化。

---

## 重要ファイル

### 原典(ref/ — git 追跡中の権威ソース)

- `F:\WorkSpace\ShaderDemoRoom\ref\mizu-kokoro-2-source\src\main.js`(実装本体)
- `F:\WorkSpace\ShaderDemoRoom\ref\mizu-kokoro-2-source\ART_DIRECTION.md`(アートディレクション規範)
- `F:\WorkSpace\ShaderDemoRoom\ref\mizu-kokoro-2-source\src\style.css`
- `F:\WorkSpace\ShaderDemoRoom\ref\mizu-kokoro-2-source\index.html`
- `F:\WorkSpace\ShaderDemoRoom\ref\mizu-kokoro-2-source\README.md` / `UPGRADE_NOTES.md` / `STATIC_README.md` / `BUILD_INFO.txt`
- `F:\WorkSpace\ShaderDemoRoom\ref\mizu-kokoro-2-source\preview.png` / `docs\screenshots\v2-*.png`(ヒーロー/状態リファレンス)

### 展示デプロイ(public/ — ref の dist とバイト一致)

- `F:\WorkSpace\ShaderDemoRoom\public\exhibits\anime-liquid-orb\index.html`
- `F:\WorkSpace\ShaderDemoRoom\public\exhibits\anime-liquid-orb\assets\index-*.js`(+ 同梱 .js.map、content hash は build ごとに変化)

### showroom 統合(src/)

- `F:\WorkSpace\ShaderDemoRoom\src\rooms\anime-liquid-orb\state.ts`(reloadToken のみ)
- `F:\WorkSpace\ShaderDemoRoom\src\rooms\anime-liquid-orb\Controls.tsx`
- `F:\WorkSpace\ShaderDemoRoom\src\rooms\embedded\EmbeddedControls.tsx`
- `F:\WorkSpace\ShaderDemoRoom\src\shared\embedded\EmbeddedExhibitFrame.tsx`
- `F:\WorkSpace\ShaderDemoRoom\src\shared\embedded\url.ts`
- `F:\WorkSpace\ShaderDemoRoom\src\rooms\registry.ts`(accent `#ff56d8`、embedPath)

### QA スクリーンショット

- `F:\WorkSpace\ShaderDemoRoom\output\playwright\anime-liquid-orb-desktop.png` / `anime-liquid-orb-mobile.png`
