# Voxel Water(トゥーンボクセル海洋)調整カルテ

> **ポジション**: ショールームのフラッグシップ展示。しかし直近のスクリーンショット批評(visual-current)では **4展示中最下位**(1位 MIZU//KOKORO、2位 Ninth Tide Archive、3位 Glass Optics、4位 Voxel Water)と評価された。「コンセプトから最も遠い展示」であり、調整フェーズの最優先対象。
>
> 入力ソース: コード深掘り調査(understand-voxel.json)/スクリーンショット批評(visual-current.json)。本カルテは両者の事実を転記・統合したもので、数値・hex・uniform名はすべて入力由来。

---

## コンセプト(原典の意図)

ショールーム用の「トゥーンボクセル海洋」— 無限に見えるスタイライズドな海を、次のハイブリッドで構成する:

- **近景**: 64x64 の InstancedMesh ボックス柱フィールド。連続的なマルチサイン波モデルに高さが追従し、per-instance のトゥーンバンドカラーを持つ。
- **遠景**: 156 unit の透明シェーダープレーン。同じ波モデルで変位し、量子化されたトゥーンカラーランプで描画。

3つの離散的な天候状態(clear / rain / storm)が、集中管理されたアートディレクションテーブル **WEATHER_LOOKS** を駆動する。docs/voxel-water-toon-infinite-qa.md に記録された意図:

- **Clear** = 明るく透明感のあるミントシアン、クリスプなボクセルバンド
- **Rain** = 水体・空ともにクールなブルーグレー、柔らかいフォグ
- **Storm** = 暗いディープティールの塊。純粋な暗さではなく、グラフィックな「ink」輪郭・world-space grid ink・rain sheets・lightning rim tint で可読性を保つ

**制約**: 静的 GitHub Pages デプロイ、バックエンドなし、FFT/ソルバーなし、WebGPU なし、PMREM なし。

QAログには約60回以上のチューニングラウンドが記録されており、優先順位は (1) 時間的スパークル/フリッカーの排除、(2) 有限ボクセルフィールドが「小島」に見えないようにする、(3) 天候パレットの分離、(4) 失敗した 144x144 密度実験後のフレームレート回復。

**コンセプトアート(primary-showroom-concept.png)との対比**: 原典のビューポートは「構図された絵」— 灯台のランドマーク、中景のボクセル岩、白い砕け泡、雨の斜めストリーク、ほぼ黒の崖から白い泡までのフルバリューレンジ。批評では Wow factor 9/10 の基準点とされた。現ビルドにはこの「主題」が存在しない。

---

## 実装アーキテクチャ(シーングラフ/更新ループ/状態フロー)

### シーングラフ(runtime.ts `createRoomRuntime`)

Scene(linear Fog 付き)+ root Group:

1. **water plane** — PlaneGeometry(WATER_PLANE_SIZE=156, WATER_PLANE_SEGMENTS=72x72)、-PI/2 回転、y=-0.08。ShaderMaterial(transparent, depthWrite:false)、renderOrder 1。`userData.oceanStrategy='hybrid-near-voxel-field-camera-relative-far-plane'`(INFINITE_OCEAN_STRATEGY)。
2. **columns** — InstancedMesh、BoxGeometry(VOXEL_SIZE=0.6, 1, 0.6)、count 64x64=4096(VOXEL_GRID_SIDE=64, VOXEL_SPACING=0.62)。MeshStandardMaterial(color white, roughness 0.58, metalness 0.03, emissive 0x54d8d3, emissiveIntensity 0.68, vertexColors:true, toneMapped:false, transparent:true, opacity:1)。instanceColor は白初期化の InstancedBufferAttribute、instanceMatrix は DynamicDrawUsage。rotation.y=VOXEL_FIELD_YAW=-0.045、オフセット VOXEL_FIELD_OFFSET_X=8 / OFFSET_Z=0。renderOrder 2。
3. **gridOverlay** — LineSegments。**X軸に平行な63本のみ**(内部の各 z 行に1本、両側 gridLinePadding=28 延長)、y=0.03。LineBasicMaterial(0x1599a0, opacity 0.14 base, depthTest:false, depthWrite:false, toneMapped:false)、renderOrder 5。
4. **rain** — Points、RAIN_DROP_COUNT=420。範囲 x ±(156*0.42)、y 2..11、z ±(156*0.36)。PointsMaterial(0xa8ddf5, size 0.03 base, opacity 0.36 base, depthWrite:false)、renderOrder 4。
5. **spray** — Points、220粒を ±7 の円盤内に配置。PointsMaterial(0xd6fbff, size 0.05, opacity 0.28, depthWrite:false)、renderOrder 3。
6. **cloudDeck** — 14個のフラットなボックス(1.2+rnd x 0.16 x 0.38)、y 4.2..5.3、z -5..-11。共有 MeshBasicMaterial(コンストラクタ 0x385062、weatherLook.cloudColor で上書き)。

root 外: **sky** — Mesh(SphereGeometry(SKY_RADIUS=62, 36, 18), ShaderMaterial BackSide, depthWrite:false, depthTest:false)、renderOrder 0、毎フレームカメラに再センタリング。ライト: AmbientLight + DirectionalLight(初期位置 (-4,7,3)、skyTime で再配置)。

レイアウト乱数は createSeededRandom(0x5ea9f1)(LCG 1664525/1013904223)。セルごとのノイズは hashCell = fract(sin(x*127.1+z*311.7)*43758.5453123)。

### 波モデル(二重実装 — 最重要リスクの源)

**water.vert.glsl `waveField()`**: 4層の `waveLayer()`(pow(sin*0.5+0.5, sharpness)*amplitude、解析的勾配付き)の合算:

| 層 | dir | freq | amp | phase | sharpness |
|---|---|---|---|---|---|
| A | (0.78, 0.62) | 1.12 | 0.32+uSwell*0.15 | uTime*timeScale*0.92 | chopShape=mix(1.2, 3.8, uChop) |
| B | (-0.64, 0.77) | 2.45 | 0.28+uChop*0.12 | -t*1.36 | 1.6+uChop*2.1 |
| C | (0.18, -0.98) | 4.2 | 0.16+uSurfaceDetail*0.08 | t*1.9 | 1.2+uSurfaceDetail*2.0 |
| D | (-0.95, 0.31) | 0.86 | 0.18*uSwell | -t*0.72 | 1.4 |

timeScale = 0.44+uWind*0.15。合算を max(1.0, 1.02+uSwell*0.54) で除算。頂点は (normalizedWave*2-1)*uWaveHeight*(0.72+uSwell*0.34) で y 変位。world XZ は position.xz+uOceanOriginXZ でサンプル。varying: vWave=vRawWave(clamp 済み高さ)、vSlope、vFoam=smoothstep(0.78-uFoam*0.12, 0.98, wave+slope*0.18)、vWaterNormal=normalize(-grad.x, 1.35, -grad.y)、vWorldPosition、vUv。

**runtime.ts `updateColumns`(JSコピー)**: 同じ4層を手書きで再実装しているが、**方向の正規化なし**、プレーンにない追加の currentLayer = pow(sin(currentPhase),1.55)*currentStrength*0.14(currentPhase = (px*cos+pz*sin)*(0.9+currentStrength*0.8) - elapsed*(0.24+currentStrength*0.54))、**正規化除数が異なる**(Math.max(1, 1.04+swell*0.56) vs シェーダー 1.02+0.54)。柱の高さ = 0.2 + max(0.08, normalized*waveHeight*(0.7+swell*0.22) + crestLift*0.75)(crestLift = normalized>0.76 で foam*0.12)。柱 y = -0.24 + height*0.5、y スケール height*(0.8+edgeFade*0.2)。事前計算配列: cellPositionsX/Z、cellEdgeFade、cellDepthFade、cellNoise。

### 柱カラーパイプライン(updateColors 時のみ実行)

columnColorBand = round(normalized*(toonSteps-1))/(toonSteps-1) から開始し、lowColumnColor 0x8efff0 → highColumnColor 0xdffff1(band*1.18)、troughColumnColor 0x60e4e4、foamColumnColor 0xfffff6、weatherLook.columnTint、stormShadowColumnColor 0x073f49、weatherLook.columnEmissive、columnTopTint、warmColumnColor 0xc8ffd6 / coolColumnColor 0x91e4ff(|colorTemperature|*0.24)、edgeMistColumnColor 0xc8f5ee を順次 lerp。最後に offsetHSL(cellNoise ベース)と multiplyScalar(columnBrightness + depthFade*0.3 + edgeFade*0.14 + storm*0.12)。

### 更新ループ(render)

- animatedSkyTime = clamp(skyTime + sin(elapsed*0.035)*0.025)
- fogBreath = sin(elapsed*0.18 + rainCurtain*2)*rainCurtain*0.035(uWeatherFogDensity に加算、床 0.12)
- lightningPulse = lightningIntensity * pow(max(0, sin(elapsed*0.72 + sin(elapsed*0.19)*3.2)), 10) — water と sky で共有
- カメラ相対オーシャン: plane.position を OCEAN_SNAP_SIZE = 0.62*8 = 4.96 にスナップ(**カメラ固定のため実質定数**)
- 柱ジオメトリは **8 FPS ケイデンス**(COLUMN_GEOMETRY_FPS=8)、色は3回に1回(COLUMN_COLOR_REFRESH_INTERVAL=3、約 2.7 Hz)または updateSettings 直後
- rain は1つの剛体 Points ブロックとして落下(position.y -= delta*(5+wind*1.8)、y=-4 から 1.5 へテレポートリセット)。spray は剛体円盤として回転(rotation.y += delta*(0.18+wind*0.04))+ボブ
- cloudDeck は x ±0.6 スウェイ、gridOverlay は y ±0.012 ボブ、root 全体が rotation.y = sin(elapsed*0.035)*0.018(PRESENTATION_DRIFT_SPEED/AMPLITUDE)
- **天候切替は即時のテーブルルックアップ — クロスフェードなし**
- updateSettings → updateUniforms: scene.background(skyドームに遮蔽される)、fog、ライト(ambient = ambientBase + clarity*0.28 + skyTime*0.14; sun = sunBase + clarity*0.44 + skyTime*0.34 - cloudCover*0.3)、太陽軌道(cos/sin(skyTime*2PI)*5, y=3.2+sin(skyTime*PI)*5.8)、パーティクル、雲不透明度、柱マテリアル(roughness 0.7-clarity*0.12+rain*0.08; emissiveIntensity 0.46+clarity*0.2+foam*0.05+rainCurtain*0.07+strength*0.16)、グリッド線(opacity 0.05+surfaceDetail*0.04+strength*0.12)
- dispose() は traverse/dispose し renderer.info.reset() を呼ぶ

### カメラ

PerspectiveCamera(45, aspect, **0.3, 72**)、**固定位置 (5.8, 7.2, 13.8)**、lookAt(0, -0.08, -5)。ユーザーナビゲーションなし。モーションは root のプレゼンテーションドリフトのみ。LOD・クリップマップ・ジオメトリマージなし(docsで明示的に先送り)。

---

## レンダリングパイプライン(パス構成・uniform・マジックナンバー)

### パス構成

**単一フォワードパス。ポストFXなし、レンダーターゲットなし、PMREMなし(テストで強制)。**

room固有レンダラー設定(src/shared/three/ShaderCanvas.tsx): roomId 'voxel-water' のみ **maxPixelRatio = 0.6**(他のルームは 2)かつ **antialias: false** — 0.6x デバイスピクセルでレンダリング(QA実測: 862x836 CSS ビューポートに対しバッキングストア 517x501)。**意図的にソフト/ブラーな部屋になっている。**

透明度の順序は renderOrder で明示管理:

| renderOrder | オブジェクト | 備考 |
|---|---|---|
| 0 | sky | BackSide 球、depthTest:false、depthWrite:false、カメラ中心 |
| 1 | water plane | transparent、depthWrite:false |
| 2 | columns | transparent だが opacity 常時1、depthWrite デフォルト(true) |
| 3 | spray | depthWrite:false |
| 4 | rain | depthWrite:false |
| 5 | gridOverlay | depthTest:false — **すべての上に描画される** |

柱が alpha 1 でプレーンの後に描画されるため、「ボクセル本体の上の半透明水シート」は **柱間の 0.02 unit の隙間とフィールド外にしか存在しない**。柱の上では柱色自体が水の見た目を担う。

### water.frag.glsl の要点

- **トゥーン量子化**: toonPhase = vWave*uToonSteps; toonRamp = floor(toonPhase)/max(uToonSteps,1)。fwidth ベースのバンドエッジアクセント(バンド幅 max(fwidth, 0.012)、アクセント到達 0.085+bandWidth)。
- **距離ブレンド**: nearToonRead = 1-smoothstep(12,34,viewDistance)。toonColorRamp = mix(smoothRamp, toonRamp, 0.42+nearToonRead*0.58)(近景=量子化、遠景=smoothstep(0.05,0.95,vWave))。
- **ベースパレット(float)**: deep = mix(vec3(0.014,0.2,0.32), vec3(0.026,0.38,0.48), uClarity); mid = mix(vec3(0.03,0.5,0.62), vec3(0.12,0.78,0.84), uClarity); shallow vec3(0.34,0.92,0.96); lagoon vec3(0.42,1.0,0.84); foamColor vec3(0.95,1.0,0.92); stormTint vec3(0.38,0.5,0.58)。
- **天候シグネチャ**: clearMintSignature = (1-uStorm)*(1-smoothstep(0.18,0.56,uRainCurtain)); rainBlueSignature = smoothstep(0.18,0.54,uRainCurtain)*(1-uStorm*0.45) → vec3(0.16,0.48,0.74) 方向へ。
- **グリッド**: gridLine() は微分フィルタ付き AA グリッド(UV 28セル、線幅 clamp 0.075..0.48、footprint>0.62 でフェード)。storm 用 world-space grid は gridLine(vWorldPosition.xz*0.075)、距離 22..68 でゲート。
- **storm 輪郭 ink**: stormContourPhase = vWave*(uToonSteps+2)+noise(xz*0.18)*0.34。vec3(0.02,0.22,0.27) 方向へ、uWeatherRimColor でリムライト。
- **rain 表現**: セル状スパークル rainSurfaceCells vec2(56,38) → vec3(0.28,0.54,0.78)、同心円 UV リップル *0.022*vec3(0.46,0.78,0.92)、world ノイズの rain curtain(uWeatherFogColor*0.14)。
- **カレント**: flow-space リボン。flowRibbon = smoothstep(0.7,0.88,...)*uCurrentStrength*(0.08+uFoam*0.14)*(1-smoothstep(5,11,viewDistance)) — 近景のみ。
- **ライティング**: **lightDir はハードコード normalize(vec3(-0.35,0.82,0.44))(動く太陽に追従しない)**。fresnel pow5、specular pow mix(18,62,uClarity)、解析的グリッターマスク(sin 76/31 UV 周波数、fwidth フィルタ)、トゥーン量子化された第二スペキュラ smoothstep(0.46,0.54,...)。translucentGlow → vec3(0.12,0.42,0.38)。lightningRim = uLightningPulse*(0.2+fresnel*1.8)*(0.25+nearToonRead*0.75)*uWeatherLightningTint。
- **フォーム**: crestGate = smoothstep(0.62,0.9, vRawWave+vSlope*0.16)、foamColor への mix 上限 0.56。
- **スタイライズドフォグ**: horizonMist smoothstep(18,46,dist)、fog バンド(sin(dist*0.12+y*1.8+t*0.035))、weatherFog 上限 0.58+uRainCurtain*0.16、nearFogRelease は 8..24(+storm*8) 内で 32-56% 解放。horizonWaterColor = mix(uWeatherFogColor, vec3(0.5,0.88,0.9), max(0,0.38-uStorm))。
- **storm グレーディング**: stormRainSheet → vec3(0.006,0.11,0.15)、stormGridInk → vec3(0.002,0.08,0.11)、foregroundStormWindow = (1-smoothstep(18,56,dist))*uStorm^2、weatherForegroundColor = mix(vec3(0.08,0.34,0.58), vec3(0.024,0.22,0.28), uStorm) 最大 0.58 適用。
- **アルファ**: surfaceAlpha = clamp((mix(0.66,0.82,uClarity) - weatherTransparency)*mix(0.86,1.0,edgeFade), 0.28, 0.84)。weatherTransparency = uStorm*0.12+foregroundStormWindow*0.36+uRainCurtain*0.05。
- **セル分散**: stableCell = floor(worldXZ/0.3)、cellTint*(uVoxelColorVariance)*vec3(0.035,0.07,0.055)。クールグレード *vec3(0.8,0.92,1.12)*0.24、ウォーム *vec3(1.12,0.98,0.82)*0.2。
- **デッドコード**: 2オクターブ fbm() が定義されているが未呼び出し。shader-quality.test.ts が 'for (int i = 0; i < 2; i++)' の存在をピン留めしているため削除するとテストが壊れる。

### sky.frag.glsl の要点

- view-direction グラデーション。dayStrength = smoothstep(0.05,0.82,sin(uSkyTime*PI))。
- zenith: 夜 vec3(0.018,0.04,0.075) → 昼 mix(vec3(0.09,0.3,0.52), vec3(0.16,0.44,0.68))、storm で vec3(0.09,0.12,0.15)+uWeatherSkyTint。horizon: 夜 vec3(0.04,0.14,0.18) → 昼 vec3(0.48,0.82,0.86)、夕焼け vec3(0.82,0.56,0.34)(warmEdge = 1-smoothstep(0.18,0.52,|uSkyTime-0.5|))、storm vec3(0.14,0.18,0.2)、uWeatherHorizonTint 0.32+。
- 雲: 平面投影 UV(direction.xz/max(0.15, direction.y+0.72))上の4オクターブ fbm。cloudMask smoothstep(0.47,0.74, fbm+cloudCover*0.42+storm*0.16)。雲色 mix(vec3(0.28,0.42,0.48), vec3(0.78,0.92,0.9), day) → storm vec3(0.22,0.26,0.3) → uWeatherCloudTint 0.42+。
- **太陽は方位角のみ**: sunDir = (cos,sin)(uSkyTime*2PI)、sunGlow smoothstep(0.78,1.0, dot(dir.xz, sunDir))、sunDisc smoothstep(0.998,1.0,...)。垂直方向は広いバンド変調のみ — **ディスクではなく縦の光の筋として描画される**。色 vec3(0.16,0.18,0.14) / vec3(0.56,0.42,0.26)、storm で消える。
- lightning: uLightningPulse*uWeatherLightningTint*(0.18+cloudBand*0.46)。hash 定数は water と異なる(41.7, 289.1, 45758.5453)。

### 全 uniform 一覧

**waterMaterial**: uTime, uWaveHeight, uWind, uRain, uStorm, uCloudCover, uToonSteps, uSwell, uChop, uFoam, uClarity, uSurfaceDetail, uCurrentDirection, uCurrentStrength, uSkyTime, uColorTemperature, uVoxelColorVariance, uOceanOriginXZ (vec2), uWeatherWaterTint, uWeatherFogColor, uWeatherRimColor, uWeatherLightningTint (vec3), uWeatherFogDensity, uRainCurtain, uLightningPulse。

**skyMaterial**: uTime, uStorm, uCloudCover, uSkyTime, uColorTemperature, uWeatherSkyTint, uWeatherHorizonTint, uWeatherCloudTint, uWeatherLightningTint, uLightningPulse。

備考: uRainCurtain = max(settings.rain*0.42, weatherLook.rainCurtain)。uStorm = weatherLook.strength(0 / 0.48 / 0.88)であり **ユーザースライダーではない**。

### 主要マジックナンバー

WATER_PLANE_SIZE=156 / camera.far=72 / fogFar 58-70 / SKY_RADIUS=62 — プレーンの半対角(約110)は camera.far を超えており、フォグと空ドームがクリップを隠すことで構図が成立している(不変条件のドキュメントなし)。他: VOXEL_SIZE=0.6、VOXEL_SPACING=0.62、OCEAN_SNAP_SIZE=4.96、COLUMN_GEOMETRY_FPS=8、RAIN_DROP_COUNT=420、spray 220、cloudDeck 14個。

---

## パラメータ一覧(Controls.tsx / state.ts voxelWaterDefaults)

すべてのスライダーは step 0.01(注記除く)。

| 名前 | 範囲 | デフォルト | 実際の効果 |
|---|---|---|---|
| weather | clear / rain / storm(セグメント) | clear | WEATHER_LOOKS 行選択 → uStorm strength(0/0.48/0.88)、全天候ティント、フォグ、ライトベース、rainCurtain 床、lightning 強度、柱ティント表。**ハード切替・補間なし** |
| rain | 0..1 | 0.12 | フラグの rain スパークル/リップルゲイン、雨パーティクル opacity(min(0.64, rain*0.62+strength*0.2))とサイズ(0.024+rain*0.022+surfaceDetail*0.006)、雨の可視条件(rain>0.02 または weather!=clear)、rainCurtain 床 rain*0.42、柱 roughness +rain*0.08 |
| cloudCover | 0..1 | 0.18 | 空の雲マスク(+0.42)、水の減光(1-cloudCover*0.04)、stormTint mix +0.06、cloud deck opacity +0.44、太陽強度 -0.3、background lerp *0.16、柱 tint mix +0.02 |
| clarity | 0..1 | 0.9(テスト下限 >= 0.82) | deep/mid パレットのリフト、shallow mix +0.16、specular power mix(18,62)、surfaceAlpha mix(0.66,0.82)、translucentGlow ゲイン、ambient +0.28、sun +0.44、柱 roughness -0.12、柱 emissiveIntensity +0.2、foregroundColumnGlow +0.08 |
| wind | 0.2..3 | 0.82 | timeScale = 0.44+wind*0.15(**両方の波シミュレーションに影響**)、雨落下速度 5+wind*1.8、spray 回転 0.18+wind*0.04 |
| waveHeight | 0.1..1.6 | 0.48 | プレーン振幅 *(0.72+swell*0.34)(符号付き)、柱の高さ *(0.7+swell*0.22) |
| swell | 0..1.2 | 0.42 | 層A amp +0.15、層D amp 0.18*swell、正規化除数、両 waveHeight 乗数 |
| chop | 0..1 | 0.26 | 層A sharpness mix(1.2,3.8)、層B amp +0.12 / sharpness 1.6+2.1 |
| toonSteps | 2..9(step 1) | 5(calm プリセット 4) | フラグ toonRamp 量子化、storm 輪郭数(uToonSteps+2)、柱バンド数 round(n*(steps-1))/(steps-1) |
| foam | 0..1 | 0.28 | vFoam 閾値シフト(0.78-foam*0.12)、crestFoam ゲイン、柱 crestLift/crestAmount、spray 可視条件(foam>0.52)・opacity・サイズ、flowRibbon ゲイン +0.14、柱 emissiveIntensity +0.05 |
| surfaceDetail | 0..1 | 0.36 | 層C amp +0.08 / sharpness +2.0、normalRipple・グリッターのフェード、fresnel ゲイン +0.16、雨サイズ +0.006、グリッドオーバーレイ opacity +0.04 |
| currentDirection | 0..360 deg(step 1) | 34(storm 58、calm 18) | フラグ flow-space 回転、柱の currentPhase 方向。「Rotate current」ボタンで +90 deg |
| currentStrength | 0..1 | 0.28 | flowRibbon ゲイン/速度、柱 currentLayer amp *0.14、phase ゲイン(0.9+0.8x)・速度(0.24+0.54x) |
| skyTime | 0..1 | 0.56 | 空の dayStrength/warmEdge/太陽方位、水の skyFill、太陽軌道と強度。ランタイムが ±0.025(0.035 rad/s)で揺らす。「Shift sky」ボタンで 0.18/0.62 トグル |
| colorTemperature | -1..1 | 0.06(storm -0.22) | 水/空のウォーム・クールグレード(x0.2/x0.24)、柱 warm 0xc8ffd6 / cool 0x91e4ff lerp *0.24。「Shift palette」ボタンで -0.28/0.22 トグル |
| voxelColorVariance | 0..1 | 0.26(storm 0.46) | フラグの 0.3 unit セルティント vec3(0.035,0.07,0.055)、柱 offsetHSL(h *(0.045+storm*0.02), s *(0.08+storm*0.04), l *0.08) |

**プリセット**:
- voxelWaterStormPreset: wind 2.1, rain 0.74, waveHeight 1.08, cloudCover 0.78, swell 0.9, chop 0.82, foam 0.78, clarity 0.52, surfaceDetail 0.86, currentStrength 0.78, skyTime 0.24, colorTemperature -0.22, variance 0.46
- voxelWaterCalmPreset: wind 0.46, rain 0.05, waveHeight 0.3, toonSteps 4, swell 0.24, chop 0.12, foam 0.2, clarity 0.84, surfaceDetail 0.28, currentStrength 0.18, skyTime 0.58, colorTemperature 0.08, variance 0.18
- Reset(デフォルト復帰)

---

## アートディレクション現状(正確なパレットhex・構図・カメラ・モーション)

### WEATHER_LOOKS パレット(runtime.ts、正確な hex)

| フィールド | CLEAR | RAIN | STORM |
|---|---|---|---|
| strength (uStorm) | 0 | 0.48 | 0.88 |
| waterTint | 0x6dffdd | 0x2c9fe2 | 0x127f92 |
| fogColor | 0xb2f4e7 | 0x90a8be | 0x607784 |
| ambientColor | 0xc0fff4 | 0xb0d8ef | 0x94c7d3 |
| sunColor | 0xf4fff5 | 0xc4d7e9 | 0xa2bdc6 |
| rimColor | 0xc8ffe8 | 0xa8ecff | 0x8dfcff |
| lightningTint | 0xc8ffe8 | 0xd6f8ff | 0xd8ffff |
| cloudColor | 0x91c8bf | 0x6d8395 | 0x465766 |
| backgroundColor | 0x9ee8dc | 0x7598b0 | 0x546c78 |
| columnTint | 0xc8fff0 | 0x2e8dce | 0x156f7b |
| columnTopTint | 0xf4ffd9 | 0xc6ecff | 0xa3efd9 |
| columnEmissive | 0x54d8d3 | 0x2a8fbd | 0x238d98 |
| fogDensity / fogNear / fogFar | 0.28 / 34 / 70 | 0.48 / 24 / 64 | 0.62 / 20 / 58 |
| rainCurtain | 0.02 | 0.38 | 0.6 |
| lightningIntensity | 0 | 0.06 | 0.42 |
| ambientBase / sunBase | 1.58 / 3.08 | 1.46 / 2.18 | 1.28 / 1.18 |
| columnTintMix | 0.04 | 0.6 | 0.5 |
| columnBrightness / columnLightFloor | 1.16 / 0.12 | 0.98 / 0.02 | 0.96 / 0.12 |
| columnOpacity | 1 | 1 | 1 |
| cloudOpacityBase | 0.06 | 0.16 | 0.28 |

### 柱ランプ定数

low 0x8efff0 / trough 0x60e4e4 / high 0xdffff1 / foam 0xfffff6 / warm 0xc8ffd6 / cool 0x91e4ff / edgeMist 0xc8f5ee / stormShadow 0x073f49。グリッドオーバーレイ 0x1599a0、rain points 0xa8ddf5、spray 0xd6fbff、cloud コンストラクタ 0x385062。

### 構図・カメラ・モーション

- 固定の高所斜めショールームビュー: position (5.8, 7.2, 13.8)、lookAt (0, -0.08, -5)、FOV 45、near 0.3 / far 72(テストで 'tight clip range'・'elevated showroom camera' としてピン留め)。
- モーション言語は意図的にミニマル: root スウェイ 0.018 rad @ 0.035 rad/s(テストピン留め)、柱の 8 FPS ステッピング、遅い空ドリフト。
- docs の規定: Clear = 明るい透明ミントシアン・高い空輝度・クリスプなボクセルバンド(QA実測 waterLuma 約162-172、水の hue 約177)/ Rain = 空だけでなく水体全体がブルーグレーへ(hue 約199)/ Storm = 暗いディープティール、**設計上コントラスト低め**、ink・rain sheets・lightning tint が担う(QA: toonBandSeparation storm 0.5-0.9 vs clear 約8)。

### docs とコードの乖離(レビュー用注記)

1. docs の「ボクセル本体上の半透明シート」意図は render order により部分的にしか実現されていない(柱 alpha 1 がプレーンを上書き)。
2. フラグメントの光方向は固定なのに、docs/コントロールは動く太陽を示唆。
3. storm の「lightning」はボクセル柱を照らさない — sky/水のティントのみ。

---

## 既知の課題(QAログ・ドキュメント由来 — 出典明記)

1. **Storm は意図的に暗くトゥーンバンドが弱い**(toonBandSeparation 約0.5-1.1 vs 約8-9)。将来の storm 専用パス(lightning・シアンリムハイライト)が候補として記録済み。 — voxel-water-toon-infinite-qa.md「Final Baseline」「Weather Color」
2. **パフォーマンスパス後のフレームレートは約17-18 FPS、最大フレームデルタ 66.8 ms**(QA RAF サンプル)。「stable pacing」として受容されており 60 FPS ではない。 — voxel-water-toon-infinite-qa.md
3. **0.6 pixel-ratio キャップ + MSAA 無効**(ShaderCanvas.tsx、テストピン留め)。バッキングストア 517x501 / ビューポート 862x836 — 意図的にソフト/ブラー。
4. 近景グリッドオーバーレイは「物理的というよりグラフィック」— 認知済みの妥協。自由カメラ導入時のみ clipmap/LOD 化。 — voxel-water-toon-infinite-qa.md 結び
5. **不透明水パスは試行され却下**(voxel-water-qa-log.md round 04)。ボクセル可読性のため透明水が必要 → 明示的 render ordering が妥協策。
6. **Projected-grid 無限海洋は調査の上、明示的に先送り**(水平線/逆投影のエッジケース)。 — voxel-water-toon-infinite-qa.md「Research Direction」
7. Gemini レビューのリスク記録: 近/遠の水スタイル不一致、半透明ランプなしのプラスチック的明るさ、トゥーンはジオメトリだけでなくライティングにも効くべき、horizonMist は空の色と一致すべき — 部分対応済みだが**近/遠シームの懸念は構造的に残存**。
8. **144x144 ボクセル密度実験がフレームレート低下を招き、64x64 / spacing 0.62 にロールバック**。 — voxel-water-toon-infinite-qa.md「Performance And Surface Readability Pass」
9. Storm QA round 09(voxel-ocean-qa-log.md): maxDelta 114.0 — lightning パルスが大きなフレームデルタとして記録される。calm プリセット round 12: meanDelta 17.3 / strongRatio 0.206 — デフォルトベースラインを大幅超過。

---

## コードリーディングで発見されたリスク(重要度順)

### 高(見た目・保守性への直接影響)

1. **波モデルの二重実装ドリフト**: runtime.ts `updateColumns` が water.vert.glsl `waveField` を手書き再実装。正規化除数が異なる(1.04+swell*0.56 vs 1.02+swell*0.54)、方向正規化なし、プレーンにない currentLayer 項、高さマッピングが異なる(柱は符号なし 0.2+max(0.08,...) vs プレーンは符号付き (n*2-1))、waveHeight 乗数も異なる(0.7+swell*0.22 vs 0.72+swell*0.34)。**近/遠シームで位相・振幅が視覚的に不一致になりうる上、波の変更はすべて2箇所修正が必要。**
2. **render order がコンセプトと矛盾**: プレーン(renderOrder 1, depthWrite:false)は alpha-1 の柱(renderOrder 2)より先に描画されるため、「半透明トゥーン水シートがボクセル本体を覆う」は柱間 0.02 unit の隙間にしか存在しない。
3. **フラグメントの lightDir がハードコード** normalize(vec3(-0.35,0.82,0.44))。シーンの DirectionalLight は skyTime で軌道運動するため、水プレーンのスペキュラ/フレネルは太陽を追わず、Lambert の柱は追う — **近景と遠景でライティングの読みが分裂**。
4. **Lightning が照明にならない**: パルスは sky と水シェーダーのティントのみ。シーンライトも柱マテリアルもフラッシュしないため、storm の雷は「色のウォッシュ」にしか見えない。
5. **天候切替が即時テーブルスワップ**: WEATHER_LOOKS の全フィールド(fog near/far、ティント、ライト強度)が1フレームでスナップ。補間なし。
6. **フラグメント内の3つの「ボクセル」スケールが実際のインスタンシングと不一致**: 実スペーシング 0.62 に対し、セル分散 0.3(floor(xz/0.3))、storm world grid 約0.476(xz*0.075*28)、UV grid 約5.57 world units。**シェーダーのボクセル的キューが物理ボクセルと噛み合わない。**
7. **8 FPS 柱ケイデンス vs 60 FPS プレーン変位の時間的不一致**: 近/遠境界で柱はステップし周囲の水は流れる。色リフレッシュ(約2.7 Hz)はジオメトリから最大約375 ms 遅延しうる。

### 中(構造的・拡張時に問題化)

8. **マジックナンバーの網**: プレーン半対角(約110)> camera.far=72 > fogFar(58-70)> SKY_RADIUS=62。フォグと空ドームがクリップを隠すことで成立しており、不変条件が未文書。156 / 72 / 70 / 62 のいずれかを触ると壊れる。
9. **量子化式が近/遠で異なる**: プレーンの toonRamp = floor(vWave*steps)/steps は 1.0 に到達しない(最大 (steps-1)/steps)ため低 toonSteps で最上位 shallow/lagoon バンドが系統的に弱い。柱は round(n*(steps-1))/(steps-1) で 1.0 に到達する — **近景の柱とプレーンのバンドは異なる量子化**。
10. **gridOverlay はグリッドではない**: X 平行の63本のみ(直交線なし)。depthTest:false + renderOrder 5 のため柱・spray・雨の上に描画され、視点によってはスクリーンスペースのアーティファクトに見える。
11. **columnMaterial は transparent:true なのに opacity 常時1**(全 WEATHER_LOOKS で columnOpacity: 1)。columnOpacity は死んだ制御であり、4096 インスタンスが不必要に透明パス(ソート+ブレンドコスト)を通り、なおかつ depth を書く。
12. **雨が単一剛体ブロック**: 420粒が一体で降下し y=-4 → 1.5 に約0.9秒ごと(速度 5+wind*1.8)に一斉テレポート — **全粒同時ポップ**。spray も剛体回転円盤でリム部が機械的。
13. **空の太陽が方位角のみ**の縦の明るい筋(dot(direction.xz, sunDir))。warmEdge がピークする夕暮れ skyTime で不自然に見える。

### 低(死蔵コード・無害だが誤解を招く)

14. **デッドコード群**: water.frag.glsl の fbm() は未呼び出し(shader-quality.test.ts が 'for (int i = 0; i < 2; i++)' をピン留めしており削除でテスト破損)。vRawWave は vWave の完全重複(varying 1本無駄)。scene.background の計算(backgroundColor lerp fogColor by cloudCover*0.16)は depthTest:false の空ドームに完全遮蔽され死んだ視覚出力。
15. **カメラ相対スナップ(OCEAN_SNAP_SIZE=4.96)が毎フレーム実行されるがカメラ固定のため定数**(4.96, 14.88)。無害だが誤解を招く future-proofing。uOceanOriginXZ は root のプレゼンテーションドリフト回転を無視。
16. **shader-quality.test.ts が実装詳細に文字列ピン留め**('camera.position.set(5.8, 7.2, 13.8)'、'0x8efff0'、式の断片など)。**ほぼすべてのアート調整がテストの同期編集を要求**し、テストはレンダリング挙動でなくテキストの存在を検証している。

---

## ビジュアル現状評価(スクリーンショット批評の要約)

**総合ランキング: 4展示中4位**(1. MIZU//KOKORO 8/10、2. Ninth Tide Archive 6/10、3. Glass Optics 5/10、4. Voxel Water 2-4/10)。「フラッグシップでありながらコンセプトから最も遠い」と明記された。

| キャプチャ | 状態 | Wow | 要旨 |
|---|---|---|---|
| primary-showroom-concept.png | コンセプト | 9/10 | 基準点。灯台ランドマーク+中景の岩+泡+雨で「構図された絵」。フルバリューレンジ。pro-tool ガーニッシュ(デバッグオーバーレイ、gizmo、ミニマップ、スパークライン統計) |
| voxel-water-desktop.png | Clear | 2/10 | ほぼ均一な彩度の高いミントシアンの壁。水・ストライプ・空が数バリューステップ内に収まり、水平線・シルエット・焦点なし。目は右パネルのスライダーに逃げる。輝くシアン縦縞は「光の柵」に見える。チップは 15 FPS |
| voxel-water-desktop-v2.png | 旧ビルド | 5/10 | 皮肉にも新ビルドより強いコントラスト(暗い地+光るグリッド)。ただし TRON 的で絵画的シースケープではない。柱クラスタは棒グラフのグリッチに見える。28 FPS |
| voxel-water-mobile.png | モバイル | 2/10 | キャンバスが薄い無特徴シアン帯、コントロールがスクロールの約70%。15本のスライダーはパラメータスープ |
| pages-clear-final-canvas.png | Clear | 4/10 | 「clear」なのにバリュー構造が逆転: 近景の水が最も暗く濁り、遠景バンドが光る。ストライプは遠近収束も落ち込みもなく「垂直に光る壁」。泡なし、スパークルなし、空グラデーションなし。20 FPS |
| pages-rain-final-canvas.png | Rain | 3/10 | **状態変化は色相シフトのみで雨が見えない**: ストリークなし、水紋なし、表面の荒れなし。細目で見ると Clear と同じ画に青フィルター。サムネイルテスト不合格 |
| pages-storm-final-canvas.png | Storm | 4/10 | 3状態中最良のムード(暗いキー+水平線の波クレストシルエット)。しかし雲は文字通りの無テクスチャ矩形(UI プレースホルダーバー)、白い斑点はスプレーでなくドット欠陥/星に見える。storm 中の光の筋は天候の物語と矛盾。20 FPS |
| palette-camera-final-clear-canvas.png | Clear(低カメラ) | 2/10 | セット中最弱。フレームの約80%が単一無変調カラー、水平線バンドは細切れ、**水面を縦に走る目に見えるシーム線**。25 FPS |
| palette-camera-final-rain-canvas.png | Rain(低カメラ) | 2/10 | 同じ構図破綻+青いフィル。final QA で Rain 状態に雨が描かれていない。シーム残存。20 FPS |
| palette-camera-final-storm-canvas.png | Storm(低カメラ) | 4/10 | トリオ中最良(空/照らされた水平線バンド/暗い水の実バリュー分離、不規則で有機的なクレストシルエット)。しかし前景は巨大な低情報フィールドで、**視覚的興味が水平線の約15%、空虚な前景が約60%** — 比率が逆。右下に薄い赤みのシームアーティファクト。20 FPS |

### impactGaps(Voxel Water 関連の抜粋)

- 焦点・ランドマークの不在(コンセプトの灯台/崖/岩の構図が未実装)— 主題なきカラーフィールドがフラッグシップのヒーローイメージ
- Clear/Rain のバリュー構造がほぼモノトーンに圧縮 — 水平線と波シルエットがほぼ存在しない
- **Rain 状態が雨をレンダリングしない**(全 Rain キャプチャでストリーク・水紋・表面の荒れゼロ)
- Storm の雲はフラット無テクスチャ矩形、スプレーは単ピクセル白斑点 — 両者ともプレースホルダー/デバッグに見える
- 遠景の明るいシアン「光の筋」バンドは遠近収束と水面への落ち込みがなく垂直に光る壁に見え、storm 時は天候と矛盾
- palette-camera 構図はフラット前景に60-80%を割き、興味を水平線の細帯に押し込む — 構図比率が逆転
- **水面を横切る縦シームアーティファクト**(Clear でシアン、Storm で赤み)— 'final' QA 画像に残るハードバグ
- FPS チップが公開表示で 15-28 FPS(コンセプトの約束は 60 FPS)— 信頼性ダメージ
- コンセプトの pro-tool ガーニッシュ(カメラデバッグオーバーレイ、gizmo、ミニマップ、7セルテレメトリストリップ)が全面的に不在(2チップに縮退)
- モバイルではキャンバスが薄いスライスで約15本のスライダーがスクロールを支配

**要確認**: QAログのフレームレート記録(約17-18 FPS、maxDelta 66.8 ms)とスクリーンショットチップ(15 / 20 / 25 / 28 FPS)は計測時点・条件が異なる可能性がある。調整前に統一的な計測基準を確立すること。

---

## 調整候補の種(チケット化候補)

### P1 — フラッグシップの体裁に関わる

- **[構図] 主題の不在** → コンセプトの灯台/ボクセル崖/中景の岩に相当するランドマークを導入し、「構図された絵」を作る。前景60-80%のフラットフィールド比率を反転し、興味領域を拡大する(カメラ再調整含む)。
- **[天候] Rain 状態に雨が見えない** → 雨ストリーク(剛体ブロックでなく per-drop 位相の頂点シェーダーリサイクル)、水面の水紋・荒れの可視性を Rain キャプチャで確認できるレベルまで増強。サムネイルテスト(縮小しても3状態が区別できる)を合格基準に。
- **[バリュー] Clear/Rain のトーン圧縮** → 水・ストライプバンド・空のバリュー分離を再設計。Clear は「近景が最暗・遠景が発光」の逆転を解消し、明るい水+暗さのアクセント(波影・ボクセル側面)を確立。
- **[バグ] 水面の縦シームアーティファクト**(Clear シアン / Storm 赤)→ 原因調査(プレーンのUVエッジフェード、grid、スナップ位置いずれか — 要確認)と修正。
- **[パフォーマンス/画質] 15-28 FPS + 0.6 pixel-ratio + AA なし** → columnMaterial の transparent:false 化(4096インスタンスの透明パス回避)、柱色パイプラインの負荷確認などで FPS を回復し、pixel-ratio キャップの緩和または安価なポスト AA(FXAA/CMAA)を検討。FPS チップの計測基準も統一(要確認)。

### P2 — 質感・語彙の底上げ

- **[構造] 波モデル二重実装のドリフト** → 単一ソース化(共有ハイトフィールドテクスチャ、または GLSL から生成した JS 関数)。少なくとも正規化除数・乗数を一致させ、近/遠シームの位相/振幅不一致を解消。
- **[天候] 雲が矩形プレースホルダー** → cloudDeck の14個のフラットボックスを形状のあるスタイライズド雲(複数ボックスのクラスタ、ノイズ変形、輪郭処理など)へ。
- **[天候] スプレー/雨の白斑点問題** → パーティクルのサイズ・形状・アルファを再設計し「スプレー」として読めるように。spray の剛体円盤回転も個別位相化。
- **[天候] 即時切替** → WEATHER_LOOKS フィールドの1-2秒クロスフェード(Color lerp + スカラー damp)。
- **[ライティング] 雷が照明にならない** → lightningPulse を柱の emissiveIntensity・ambient に接続し、露出パルス+スクリーンフラッシュのトゥーン雷を設計。
- **[ライティング] frag lightDir 固定 vs 軌道する太陽** → uniform 化して DirectionalLight と同期し、近/遠のライティング読みを統一。
- **[遠景] 光の筋バンド** → 遠近収束と水面への落ち込み(反射帯)を持つ形に再設計。storm 時は減衰させ天候の物語と整合させる。
- **[モバイル] キャンバス比率とパラメータスープ** → ビューポートを先頭で大きく、プリセット主導、詳細スライダーは折りたたみ。
- **[量子化] 近/遠のバンド式不一致** → プレーン toonRamp(floor/steps、1.0 未到達)と柱バンド(round/(steps-1))の統一。シェーダーのセルスケール(0.3 / 約0.476 / 約5.57)を物理スペーシング 0.62 に整列。

### P3 — 整理・保守性

- **[コード] デッドコード掃除** → fbm() 未使用関数、vRawWave 重複 varying、scene.background の死んだ計算、columnOpacity 死制御、定数化しているカメラスナップの整理(テスト同期編集込み)。
- **[コード] gridOverlay を実グリッドに** → 直交線の追加、または depthTest:false/renderOrder 5 の見直しでスクリーンスペースアーティファクト感を解消。
- **[テスト] shader-quality.test.ts の文字列ピン留め緩和** → テキスト存在検証からレンダリング挙動/スクリーンショット比較ベースへ移行し、アート調整のたびのテスト同期編集を不要に。
- **[空] 太陽を実ディスクに** → 3D 太陽方向の dot(direction, sunDir3D) による角半径ディスク描画。
- **[UI] pro-tool ガーニッシュ復元** → コンセプトのカメラデバッグオーバーレイ、gizmo、ミニマップ、スパークライン付きテレメトリストリップの段階的導入(全ルーム共通課題)。
- **[ドキュメント] マジックナンバーの不変条件文書化** → 156(プレーン)/ 72(camera.far)/ 70-58(fogFar)/ 62(SKY_RADIUS)の依存関係を明文化。

---

## 重要ファイル

| パス | 役割 |
|---|---|
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\runtime.ts | シーングラフ・更新ループ・WEATHER_LOOKS・柱カラーパイプライン(639行) |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\water.vert.glsl | 波モデル(4層 waveLayer)・varying 出力 |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\water.frag.glsl | トゥーン量子化・パレット・フォグ・storm ink・rain 表現 |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\sky.frag.glsl | 空グラデーション・雲 fbm・太陽・雷 |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\state.ts | voxelWaterDefaults・プリセット |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\Controls.tsx | スライダー/ボタン UI 定義 |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\shader-quality.test.ts | 文字列ピン留めテスト(調整時に同期編集必須) |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\voxel-water\state.test.ts | 状態テスト |
| F:\WorkSpace\ShaderDemoRoom\src\shared\three\ShaderCanvas.tsx | room 別レンダラーキャップ(maxPixelRatio 0.6 / antialias:false) |
| F:\WorkSpace\ShaderDemoRoom\src\rooms\types.ts | VoxelWaterSettings 型 |
| F:\WorkSpace\ShaderDemoRoom\docs\voxel-water-toon-infinite-qa.md | 最新 QA ログ(意図・ベースライン・先送り判断) |
| F:\WorkSpace\ShaderDemoRoom\docs\voxel-ocean-qa-log.md | 旧 QA ログ(storm maxDelta 114.0 等) |
| F:\WorkSpace\ShaderDemoRoom\docs\voxel-water-qa-log.md | 初期 QA ログ(不透明水パス却下 round 04 等) |
| F:\WorkSpace\ShaderDemoRoom\scripts\water-qa.mjs | QA キャプチャスクリプト |
| F:\WorkSpace\ShaderDemoRoom\docs\design\primary-showroom-concept.png | コンセプトアート(評価の基準点) |
