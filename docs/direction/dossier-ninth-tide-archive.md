# Ninth Tide Archive(第九潮汐档案馆·无岸层)調整カルテ

> 対象: 埋め込み展示 `ninth-tide-archive`(kind: `embedded`、accent `#79ead9`、techTags: `Audio Reactive` / `Archive Core` / `Post FX`)
> 情報源: understand-tide.json(コード深掘り)/ visual-current.json(現行スクリーンショット批評)/ visual-refs.json(原典リファレンス批評)
> 正本ソース: `ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`(2753行)。`public/exhibits/ninth-tide-archive/` の `index.html` / `app.js`(644,588 byte の esbuild minify バンドル、three 0.184.0)は ref 側とバイト一致(cmp 済み)。ビルドコマンド: `esbuild src/main.js --bundle --format=iife --minify --outfile=app.js`

---

## コンセプト(原典の意図)

「Archive of the Ninth Tide: The Shoreless Layer」(第九潮汐档案馆·无岸层)は、超深海(hadal)を舞台にしたオーディオリアクティブ Three.js インスタレーション。部屋がアーカイブを陳列するのではなく、**「音を空間に読み上げる古代の計器」**として構成される。音楽(`archive.mp3`、5:54 / 約354.5秒)を EQ として描画するのではなく、**ビート同期した9つの構造セクション(九章)が、それぞれ物質・光・残響の法則を書き換える**——音楽を9つの物質状態として解釈する。

ART_DIRECTION.md は5つのリサーチ翻訳を根拠として明記している:

1. **Anthony McCall — Solid Light**: 光は入り込める体積。薄いレゾネーター光錐、章転換の圧力膜、ソナーが届いたときだけ体積を得る遠景構造として実装。
2. **Ryoji Ikeda — datamatics / test pattern / matrix**: データは物質。64バンド log スペクトラムを GPU テクスチャに書き込み、中央ポイントクラウド・アーカイブ内部・機構の揺動・ソナー形態・ポストFX 応答を同時に駆動(伝統的な EQ バーは明示的に排除)。
3. **Lozano-Hemmer — Pulse Room**: エコーは履歴を保存する。波面はゆっくり減衰する読み取り痕跡(memory 項)を残し、空間が短期記憶を持つ。新しいエコーが古いものを上書きする。
4. **無岸空間(Eliasson『Din Blinde Passager』、Marshmallow Laser Feast)**: Ganzfeld 暗黒球、遠景ジオメトリの溶解、近景のデフォーカス粒子、指数フォグ、周辺方向性ブラーでスケール参照を破壊。
5. **深海光学の制約(NOAA ROV ライティング)**: 遠方は決して均一に照らされない。遠景構造はソナーと局所光の下でのみ現像する。**暖色は第V章でのみ短く現れる**。

物語はスケール・遅延・現像・消灯で運ばれ、テキストは入口の銘・章インデックス・終幕の一行(「灯灭以后,海仍在读。」= 灯が消えた後も、海は読み続けている)のみ。コピー原則: 設定を説明しない/一度に知覚可能な事実は一つ/キャプションが現れる前に映像がそれを証明する。

---

## 実装アーキテクチャ(シーングラフ/更新ループ/状態フロー)

### シーングラフ(すべて `world` Group 配下。シード付き PRNG `mulberry32(0x91A7F4)` で決定論的)

| # | オブジェクト | 実装詳細 |
|---|---|---|
| 1 | perceptualField | BackSide `SphereGeometry(42, 64, 36)`、5オクターブ fbm シェーダ(Ganzfeld 背景)。コースティクス項 `pow(...,11.0)`。輝度は `ritual` でゲート、`shutdown` で82%減光 |
| 2 | floor(ソナー譜面盤) | `CircleGeometry(16, 256)` @ y=-2.36、加算合成。同心円リング(lineBand: nr*22 / nr*8)、72本スポーク、9分割リング、拡張波面 `exp(-abs(localRadius-waveRadius)*1.55)` + 記憶項 `exp(-(waveRadius-localRadius)*0.23)*exp(-pulseAge*0.12)` |
| 3 | platform | 円柱 r4.25/4.7、`MeshStandardMaterial` color `0x01080b`、metalness 0.9、emissive `0x031718` + トーラスリング3本(r 2.65/3.55/4.55、color `0x63d8c7`) |
| 4 | アーカイブ格子 | `buildArchiveCells()`: デスクトップ81セル / モバイル45セル、3層(tier0: 9セル r 5.15–6.2 / tier1 〜45%: r 8.0–13.8 / tier2: r 14.5–24.5)。カメラ正面に回廊ギャップ(0.34/0.54 rad)。LineSegments ワイヤーフレーム(セルあたり12箱エッジ、attribute: aCenter/aBand/aOrder/aSeed)+ Points クラウド(セルあたり156点/モバイル72点 ≈ 計12,636点)。spectrum テクスチャを aBand でサンプル。`ritual`<1 で放射状散開(aOrder 順に起動)、`shutdown` で原点へ崩壊(遠方から: offStart = 0.06+(1-aOrder)*0.65)。ソナー前縁 `exp(-|d-waveRadius|*1.46)` + 記憶 `exp(-(waveRadius-d)*0.105)*exp(-pulseAge*0.055)`。カメラ距離フェード `mix(0.035, 1, 1-smoothstep(10,31,camDist))` |
| 5 | 9基のレゾネーター | リング r≈4.55、y≈3.72。各: 中空円錐ビーム `CylinderGeometry(0.035, 1.18, 6.05)` 専用シェーダ(uniform: band=(i+0.5)/9、order=i/8、centerXZ、seed。フィラメント項 `pow(|sin(vUv.y*54+...)|,16)`、フラグメント毎グレイン hash)、トーラスリング(0.34)、crossRing(0.27)、グロースプライト開口、y=9.8 への吊り線 |
| 6 | ソナー方言プロップ(章ごとに1つ、初期は全て invisible) | sonarShell(fresnel^4.8 球)/ sonarCurtain(開円筒、stripe pow 22)/ sonarSpokes(96/48 動的ラインセグメント)/ sonarPillars(InstancedMesh 48/28 箱 0.055²)/ sonarLattice(13³=2197 / 9³ ポイント格子)/ sonarHelix(240/120 セグメント)/ sonarSlabs(9枚の EdgesGeometry 箱 1.9×1.15×0.08、index 8 のみ `0xe1f2d4`、他 `0x72d9cb`)/ sonarConvergence(shell の clone)/ sonarNull(トーラス r1 tube 0.025、`0xc6f0df`) |
| 7 | coreGroup @ y=0.34 | core `IcosahedronGeometry(1.02, detail 5/4)`(頂点呼吸: `low`+`transient`+`open` 駆動。bodyPresence は章ごとに 0.82, 0.60, 0.49, 0.38, 0.38, 0.29, 0.17, 0.10, 0.065 と減衰、`floor(section+0.5)` 閾値)/ coreWire icosa(1.28,2) wireframe `0x94eadc` / coreHalo スプライト / coreRings 9本(半径 1.43+i*0.235、i==8 はアクセント色)/ apertureFins 9枚(金属箱 0.036×1.55×0.28、emissive `0x0a3432`、archiveOpen で周回・展開)/ forecastDust(2600/1200点、9環状層)/ **energyBody(10,500/4,200点)— 中心オブジェクト**: 単一の球状点分布を9つの GLSL モード分岐で再解釈 / spectralComb — CPU 更新の64本動的ラインセグメント(FFT の可読化、`updateSpectralComb()` で章ごとに再振付) |
| 8 | 環境 | mist 3300/1200点 / nearSnow 720/260点(近景大型ボケ、size 1.6–8.5、フォーカス帯 `smoothstep(23,3,depth)*smoothstep(0.3,2.4,depth)`、renderOrder 8)/ abyssalSpines 46/22本(遠景ライン骨格 r 21–37、第VII章以降 phaseLift +0.018)/ pressureStrata 巨大トーラス7本(r 13+i*3.2、基礎 opacity 0.005) |

**ライト**: `HemisphereLight(0x63c8bd, 0x000203, 0.15)` / coreLight `PointLight(0x67d8c8, 0, 18, 2.05)` / upperLight `PointLight(0x2c6870, 0, 34, 1.5)`

### 更新ループ

RAF + `THREE.Timer`、dt clamp 0.05:
`updateAudio → updateCeremony → updateEnding → updateTide → updateCamera → updateCore → updateResonators → updatePulse → updateWorld → updateHover → updateTransport → composer.render`

### 状態フロー

単一の `state` オブジェクト + `globals` uniform 辞書を `shaderUniforms()` スプレッドで**全 ShaderMaterial が文字通り同一の uniform 値オブジェクトを共有**(time、low/mid/high/rms/energy/transient、ritual、ignite、shutdown、pulseAge/Strength/Origin/Screen、open、tide、section、sectionLocal、phaseTransition、sonarMode、pixelRatio、resolution、spectrum、パレット5色)。

**オーディオ経路**: `<audio src=./archive.mp3 preload=auto>` → MediaElementSource → `AnalyserNode(fftSize 2048, smoothingTimeConstant 0.82, minDecibels -94, maxDecibels -16)` → GainNode(目標 0.92 × イントロ `smoothstep(0.12,1.75,ceremonyTime)` × エンディング `(1-smoothstep(0.53,0.98,shutdown))`、ミュート時 0)→ destination。

- バンド: low = `pow(avg 24–190 Hz, 1.14)` / mid = `pow(avg 190–2100, 1.22)` / high = `pow(avg 2100–9200, 1.08)`、rms は時間領域4サンプル毎。ダンピング λ 8.0/7.2/9.0/9.0
- energy = `clamp(low*0.48 + mid*0.34 + high*0.22 + rms*0.3)`
- transient = `max(0, Δenergy)*8.6`、非対称ダンプ(attack λ26 / release λ7)
- 64バンド spectrum: log 配置 28 Hz→17 kHz(`f = 28*(17000/28)^t`)→ spectrumBytes → `DataTexture(RedFormat, UnsignedByte, LinearFilter)`
- 合成フォールバック(静默入場/一時停止時): `spectrumBytes[i] = 22+31*exp(-i/32)*(0.55+0.45*sin(...))`。バンド目標 low 0.14±0.065 @1.08 rad/s、mid 0.10±0.052 @0.43、high 0.05±0.03 @1.91、rms 0.08+low*0.28
- **オートソナー**: calibrated かつ再生中、transient>0.16 かつ cooldown≤0 → 中心パルス strength `0.48+transient*0.7`、cooldown `1.15+(1-low)*0.7`

**章構造(九章、ビート同期・非等分)**: `sectionBoundaries = [0, 48.9709, 75.0469, 103.0966, 145.2408, 183.8092, 224.8853, 260.2260, 330.0484, 354.5040]`(duration フォールバック 354.504)。遷移: `sectionTransitionDuration` 2.85 s。tideIndex は progress 0.49 で交代(新章の方言でオートソナー strength 0.58)。`phaseTransition` 包絡 = `sin(progress*π)^1.18`(energyBody の transitionShell mix、coreLight +26、bloom +0.65、CSS `--phase-veil`/`--phase-turn` に接続)。パレットは `smootherstep(0.08, 0.92, progress)` で lerp。

**開幕(updateCeremony、マスタークロックは audio.currentTime 優先)**: ritual = `smootherstep(0.4, 7.7, t)` / ignite = `smootherstep(4.15, 8.0, t)` / lightLevel = `smoothstep(0.12,1.05,t)*0.22 + smoothstep(2.25,7.85,t)*0.78`。キューは ART_DIRECTION 通り: 0.58 s FIRST RETURN(mode 0 shell、床 y=-2.28、str 0.52)/ 1.52 NO FLOOR(mode 1 curtain、0.62)/ 2.62 DEPTH BELOW DEPTH(mode 2 spokes、0.72)/ 4.10 NINE ROOMS(mode 3 pillars、y 0.34、0.86)/ 5.62 FIRST LIGHT(mode 4 lattice、1.32)/ 7.45 IT LOOKS BACK(mode 7 convergence、0.92)。**キャリブレーション完了 8.65 s**(prefers-reduced-motion 時 4.2 s)→ `body.calibrated`、HUD opacity 0.68 へフェードイン。儀式キャプション(I 听。/ II 海床没有回答。/ III 星图沉在更深处。/ IX 它先看见了我们。)は t<1.65/<3.55/<5.75/else で切替、opacity `smoothstep(0.18,0.62,t)*(1-smoothstep(8.0,9.1,t))`。

**終幕(updateEnding)**: 曲末13.6秒スパン。target = `raw<0.58 ? raw*0.78 : lerp(0.4524, 1.0, smootherstep(0.58,1,raw))`(「息を止め、反転し、急速な光学的崩壊」)。キュー: shutdown>0.05 OUTER SILENCE / >0.41 THE ECHO REVERSES(+pulse mode 8)/ >0.76 LAST LIGHT / ≥0.995 または audio 'ended' → `finishEnding()`(blackout=1、エピローグカード「IX / 归档。/ 灯灭以后,海仍在读。」+ リプレイ)。shutdown>0.5 中は updatePulse が sonarConvergence の崩壊(`lerp(22.0→0.035)`)のみ表示し、`globals.pulseStrength` を `(1-p)*1.08` に強制上書き。消灯順序は全所で距離/order スタガー(マテリアル毎の offStart 式)。

**ショールーム側ラッパー**: `state.ts` は `{ reloadToken: 0 }` のみ export。`Controls.tsx` = `createEmbeddedControls({ namespace 'rooms.ninthTideArchive', standalonePath 'exhibits/ninth-tide-archive/index.html' })` でボタン3つ(Reload → `onPatch({reloadToken+1})` / Open standalone → `window.open` / Reset)。`EmbeddedExhibitFrame` は `<iframe key={room.id}-{reloadToken} src={BASE_URL}exhibits/ninth-tide-archive/index.html?reload=N allow="autoplay; microphone; clipboard-write" allowFullScreen>` を描画。**postMessage 等の親↔iframe プロトコルは一切なし**。リロードは key/query 変更による remount のみ。

**QA/プレビュー経路**: (a) 展示内「静默下潜」→ `enterExperience(false)`: 合成スペクトラム、signal SYNTHETIC、musicTime は `((elapsed/118)*354.504)%354.504` でフリーラン(**118秒で九章一巡 ≈ 3倍速**)。(b) 決定論プレビュー: `?preview=main|opening|ending`(`&section=0..8`)または `window.__NINTH_TIDE_PREVIEW__` / `__NINTH_TIDE_PREVIEW_SECTION__`(main: ritual/ignite/lightLevel=1、archiveOpenTarget 0.76、diveTarget 0.28、section 既定 **4**。opening: ceremonyTime 5.75、ritual 0.73、ignite 0.44、lightLevel 0.72、blackout 0.28。ending: shutdown≥0.68、musicTime 346)。静止画キャプチャ用に `window.__NINTH_TIDE_STEP__ = animate` を公開。

---

## レンダリングパイプライン(パス構成・uniform・マジックナンバー)

### コンポーザ構成

```
RenderPass(scene, camera)
→ UnrealBloomPass(resolution, strength 0.94 desktop / 0.72 mobile, radius 0.72, threshold 0.22)
→ AfterimagePass(0.865)
→ 独自 veilPass (ShaderPass)
→ OutputPass
```

**Renderer**: antialias = `!isMobile`、powerPreference 'high-performance'、pixelRatio = `min(devicePixelRatio, isMobile ? 1.15 : 1.6)`、outputColorSpace SRGB、ACESFilmicToneMapping、初期 toneMappingExposure **0.05**、clearColor `0x000304`。`scene.fog = FogExp2(0x031318, 0.021 初期値)`。**Camera**: `PerspectiveCamera(fov 48, near 0.08, far 85)`。

### 章別ポストテーブル(updateWorld)

| 項目 | 式 / テーブル |
|---|---|
| bloom.strength | base `[0.52, 0.64, 0.58, 0.49, 0.68, 0.60, 0.50, 0.72, 0.38]`(モバイルは一律 0.42)× `(base + energy*0.54 + archiveOpen*0.05 + phaseTransition*0.65)` × `(0.22 + lightLevel*0.78)` × `(1 - smoothstep(0.78,1,shutdown)*0.72)` |
| bloom.radius | `0.64 + high*0.10 + phaseTransition*0.15 + shutdown*0.08` |
| afterimage damp | 章別 base 0.86、ただし VI 0.905 / VIII 0.925 / IX 0.94、`+ high*0.018 + phaseTransition*0.035`。shutdown>0.45 中は `lerp(0.90, 0.982, smoothstep(0.45,0.9,shutdown))`(残像が装置より長生きする演出) |
| toneMappingExposure | `(0.025 + lightLevel*(exposure[tide] + energy*0.10 + phaseTransition*0.12)) * (1 - smoothstep(0.76,1,shutdown)*0.96)`、exposure テーブル `[0.86, 0.80, 0.76, 0.68, 0.88, 0.80, 0.70, 0.74, 0.54]` |
| fog density | `[0.0185, 0.0205, 0.019, 0.024, 0.018, 0.021, 0.023, 0.026, 0.030][tide] + dive*0.0035 + phaseTransition*0.0025` へダンプ |

### veilPass(署名的スクリーンスペースパス)

uniform: `tDiffuse, time, resolution, energy, high, ritual, shutdown, pulseAge, pulseStrength, pulseScreen, section, sectionLocal, phaseTransition, sonarMode, deepColor, fogColor, glowColor`

- edge = `smoothstep(0.20, 0.63, アスペクト補正 radial)`
- 9タップ方向+接線ブラー: blurAmount = `0.00028 + edge*(0.0032 + energy*0.0013 + abyss*0.0007) + shutdown*0.0027 + phaseTransition*0.0018`、abyss = `smoothstep(2.5, 8.0, section)`
- 放射状色収差: chroma = `(0.00018 + high*0.00062 + pulseStrength*exp(-pulseAge*1.8)*0.0011 + phaseTransition*0.0014)*(0.22+edge*1.5)`、r/b チャンネル再混合 0.62
- 周辺溶解: プロシージャル水面 'field' 色 `mix(deep, fog, 0.40 + radial*0.76 + lowerWater*0.18)` へ溶かす — 「周辺のみデフォーカスし、中心は決して滲ませない」という AD 規則をここで強制
- 章転換圧力リング: `exp(-abs(radial-(0.08+phaseTransition*0.55))*22.0)*phaseTransition` を glowColor に加算
- **第IX方言 NULL ソナーはポストで実行**: nullRadius = `mix(0.58, 0.015, smoothstep(0, 4.3, pulseAge))`、内部減光 `color *= 1-nullInterior*0.74` → リム `+glowColor*nullFront*0.22`、`step(7.5, sonarMode)` でゲート — mode 8 ソナーは文字通り光を除去してからリムを返す
- 第VIII章「凝視」項: 画面中心を `exp(-radial²*42)*0.08` 減光(section==7 限定)
- アニメーショングレイン: `noise*(0.007 + high*0.007 + abyss*0.004)`
- ビネット: `smoothstep(0.80, 0.16, radial)`、floor `0.56 - abyss*0.05`
- 最終マスターゲート: `color *= 0.18 + ritual*0.82`

### 透明度と合成順

ほぼ全マテリアルが transparent + AdditiveBlending + depthWrite:false。順序制御は renderOrder のみ(floor 1 / energyBody 4 / nearSnow 8)。加算合成は順序非依存のため破綻はないが**オーバードローが重い**。WebGL の上に DOM HUD: `#blackout` div opacity = CSS 変数 `--blackout` = `max(1-lightLevel, smoothstep(0.72,1,shutdown))` / `#phaseVeil` 放射グラデーション `--phase-veil = phaseTransition*0.72` + blur(9px) / `body::before` スキャンライン/ビネットスクリム opacity 0.14 soft-light。

---

## パラメータ一覧(名前/範囲/デフォルト/実際の効果)

### ショールーム側(設定サーフェスの全て)

| 名前 | 型/範囲 | 既定値 | 実際の効果 |
|---|---|---|---|
| `reloadToken` | number | 0 | 「Reload exhibit」ボタンでインクリメント。iframe key + `?reload=N` クエリが変わり完全 remount |
| Open standalone | ボタン | — | 同 URL を新規タブで開く |
| Reset | ボタン | — | 既定値復元(reloadToken 0) |

スライダー/マテリアル制御は**設計として存在しない**(i18n runtimeNote:「material controls remain inside the artwork」)。

### 展示内インタラクション

| 操作 | パラメータ/式 | 効果 |
|---|---|---|
| 下潜 / 静默下潜 | — | 入場(音声あり / 合成 FFT) |
| 载入音频(隠しファイル入力 + D&D) | — | audio 失敗時に出現。object URL で src 差し替え |
| ドラッグ | `yawTarget -= dx*0.0042`、`pitchTarget clamp(±dy*0.0026, -0.3, 0.5)` | 視線 |
| ホイール | `diveTarget clamp(+deltaY*0.00055, 0, 1)` | カメラ半径 `lerp(13.0, 5.25, dive^1.08)`、HUD 深度 `−(3860+dive*740)` M |
| コアクリック(raycast icosahedron) | archiveOpenTarget 0↔1(λ4 ダンプ→uniform `open`) | DECODING/UNSEALED ↔ OBSERVATION/RESONANT、中心パルス strength 1.35 |
| 床クリック | パルス strength 1.05、sourceY -2.28 | HUD 語(章別): PRESSURE / CURTAIN / QUARTZ / PILLARS / FORECAST / COUNTERTIDE / CODEX / GAZE / NULL |
| その他クリック | `(pointer.x*5, -pointer.y*5)`、strength 0.7、y 0.1 | 任意点パルス。クリックパルスの cooldown 0.95 s |
| キー | Space 再生/停止(終了後は再開)、M ミュート、F フルスクリーン、R カメラリセット(dive 0.12、yaw 0、pitch 0.07) | — |

### URL / QA パラメータ

| 名前 | 値域 | 効果 |
|---|---|---|
| `?preview=` | `main` \| `opening` \| `ending` | 決定論プレビュー状態を注入(main の section 既定 4、ending 8、opening 0) |
| `?section=` | 0..8 | プレビュー章の指定 |
| `window.__NINTH_TIDE_PREVIEW__` / `__NINTH_TIDE_PREVIEW_SECTION__` | — | ロード前グローバルで同等の注入 |
| `window.__NINTH_TIDE_STEP__` | 関数(=animate) | 静止画キャプチャ用の決定論フレームステップ |

### energyBody 9モード(uniform `section`、`floor(section+0.5)` で分岐)

| 章 | モード | 主な式 |
|---|---|---|
| I | 圧力呼吸球 | radial `0.30 + r*1.08 + sin(t*0.74+r*8)*(0.045+low*0.18)` |
| II | 九塩星フィラメント | star = `pow(|cos(az*4.5+…)|,13)`、スペクトラム先鋭化チップ、+high の y ジッター |
| III | 石英 | 方向量子化 `floor(n*5+0.5)/5` を 0.72 mix、ステップ状時間パルス |
| IV | 門 | xz をスリット `0.25+0.10*sin(y*9-…)` で圧縮、`y*(2.75+low*0.62)` |
| V | 九弁の予報花 | petal = `pow(|sin(az*4.5+…)|,4)*(1.22+mid*0.58)` |
| VI | 逆潮ヘリックス | twist = `y*(3.8+mid*1.8)±time`、層分割方向 |
| VII | コーデックス頁 | `x = sign(x)*|x|^0.72*1.72`、`z *= 0.065+high*0.075` + ラインリップル |
| VIII | 虹彩 | `xy*(1.92, 0.68)`、z 平坦化 `0.16+d*0.10`、transient リップル |
| IX | 真珠 | 収縮 `0.36 − sectionLocal*0.10` |

### ソナー方言(pulseMode 0–8)

寿命 `[5.35, 4.1, 4.35, 4.0, 4.9, 4.5, 4.2, 4.05, 4.3]` s、decay = `pow(1-p,0.62)*strength`、基本波速 `4.15+low*1.7`(mode1 `2.2+high*0.8`、mode3 2.5、mode7 `lerp(18→0.15)` over `smootherstep(0,4.05)`、mode8 `lerp(10.5→0.15)` over 4.3)。

| mode | 形態 |
|---|---|
| 0 | 拡張 fresnel シェル |
| 1 | 垂直カーテン(scale y `5.2+age*1.3`) |
| 2 | 石英スポーク(18量子化ファセット) |
| 3 | 48本スペクトラム柱リング(radius `0.35+age*2.5`、height `0.18+spec*(2.4+low*2.1)`) |
| 4 | 13³ ポイント格子拡張、シェル帯 `exp(-shell*3.2)` |
| 5 | 二重ヘリックス(`u*π*8`、±1.1/0.9 逆回転) |
| 6 | 9枚ワイヤーフレームコーデックス板、開帳窓 `smoothstep(i/12, i/12+0.32, p)` スタガー |
| 7 | 収束: 扁球シェルが radius `18+high*3` からクリック点へ崩壊 |
| 8 | NULL トーラス崩壊 10.5→0.15 + ポスト FX の光除去 |

レゾネーター共鳴幅: mode 6→0.55、≥7→0.82、その他 1.35。

---

## アートディレクション現状(パレットhex・構図・カメラ・モーション)

### 章別パレット(palettes[] @ main.js 行80–90。**5役割**: deep / fog / glow / accent / secondary)

| 章 | deep | fog | glow | accent | secondary | 性格 |
|---|---|---|---|---|---|---|
| I | `#010609` | `#031419` | `#67ddce` | `#e3f8e9` | `#1c6470` | 冷シアン |
| II | `#01070d` | `#041728` | `#54bee0` | `#d5f2ff` | `#284a83` | ブルー |
| III | `#030809` | `#10211c` | `#8dd8af` | `#f3edc9` | `#4b7352` | 緑石英 |
| IV | `#03050b` | `#151426` | `#93a5ff` | `#e7eaff` | `#514882` | インディゴ |
| V | `#050709` | `#211d12` | `#d8c879` | `#fff2bc` | `#665324` | **唯一の暖色(金)**— 「暖色は第V章のみ」規則に一致 |
| VI | `#010808` | `#09211f` | `#63d8c0` | `#d9f8ec` | `#286d65` | ティール |
| VII | `#05030b` | `#1e1228` | `#c27ee3` | `#f1d8f8` | `#6c3b7c` | 紫(ブラックウォーター・コーデックス) |
| VIII | `#01070a` | `#0c1e20` | `#83d9bc` | `#e8f5dc` | `#416b5d` | 淡海緑 |
| IX | `#000405` | `#091819` | `#a9e8c9` | `#fff1c7` | `#587964` | ほぼ黒 + 真珠アクセント |

UI クローム: `--cyan #83eadb` / `--pale #def9f1` / `--ink #010609`、theme-color `#010609`、ショールームレールアクセント `#79ead9`。ハードコードのマテリアル色(コンストラクタ値、毎フレーム updateTide でパレットから再着色されるものが大半): platform リング系 `0x63d8c7`、レゾネーターリング `0x78dfcf`、開口スプライト `0x7de5d5`、吊り線 `0x6bcbbb`、spokes `0x8debdc`、pillars `0x79ddcf`、helix `0x86e4d5`、slabs `0x72d9cb`/`0xe1f2d4`、null `0xc6f0df`、coreWire `0x94eadc`、halo `0x74e4d4`、comb `0x9de9db`、pressureStrata `0x265b64`、hemi `0x63c8bd` — 基調はシアン族。

### 構図 — 4層深度構成(AD の「四級結構」に正確に対応)

1. **nearSnow レンズ粒子** — 大型、浅いフォーカス帯、微パララックス
2. **可読装置** — コア + レゾネーター + 第一アーカイブリング(最高空間周波数)
3. **エコー建築** — 遠方セル/スパイン。波面が通過するまでほぼ不可視(距離減衰 `mix(0.035/0.018, 1, ...)` をオブジェクトレベルで実装)
4. **無岸フィールド** — Ganzfeld 球 + pressureStrata(壁も地平線もなし)

スクリーンスペースのポストは**周辺のデフォーカス/CA/溶解のみ**を担当(AD の「コアを滲ませない」規則)。

### カメラ

原点周りの単一軌道リグ。fov 48。半径 13→5.25(dive)。lookAt y `0.17+dive*0.22`。ドリフト = スムーズ化ポインタ ×(yaw 0.095 / pitch 0.05、ドラッグ中 0.015/0.01)。ロール逆傾斜 `-pointerSmooth.x*0.007 - transient*0.003`。イントロ引き +1.6、shutdown 後退 +2.7 + ピッチ沈下 -0.035。

### モーション言語

全て `damp()`(指数減衰)平滑。章別速度プロファイル: コア回転 `[0.55, 0.92, 0.42, 0.20, 0.68, 1.15, 0.34, 0.48, 0.12]` / リング回転 `[0.75, 1.6, 0.35, 0.25, 0.95, 2.0, 0.18, 0.48, 0.08]` / レゾネーター揺動 `[0.8, 1.45, 0.52, 0.32, 0.92, 1.75, 0.38, 0.62, 0.18]`。第VI章は複数の回転が反転(逆潮)。ムード: 写真的で HUD 過多にしない(スクリム opacity 0.14 soft-light、HUD 最大 opacity 0.68、7–9px レタースペース monospace、儀式テキストは Georgia/Noto Serif)。

### ドキュメント vs コード

実装は ART_DIRECTION.md に驚くほど忠実 — 章文法、2.85 s 遷移、開幕キュー時刻(0.58/1.52/2.62/4.10/5.62/7.45/8.65)、13.6 s 終幕、消灯後の afterimage 増強、「純黒は最後の光が引き上げられた後の状態」(blackout div + exposure*0.04 floor)まで全て文字通り。唯一のニュアンス差: AD は遷移を「ジオメトリが最も無意味に近い瞬間に切り替える」と書くが、コードはサイン包絡の固定 progress 0.49 で切替(実質同義)。

---

## 既知の課題(QAログ・ドキュメント由来 — 出典明記)

| # | 課題 | 出典 |
|---|---|---|
| 1 | 一部ブラウザでストリームが報告 duration に達した後も数フレーム `audio.paused===false` のまま — music クロックから shutdown≥0.995 で決定論的にクローズして回避済み | main.js 〜2176 のコードコメント |
| 2 | autoplay 遮断は想定済み失敗経路: 入場ボタンが「重试音频」化、「载入音频」ファイルピッカー表示、ヒント文言。audio 'error' で FILE REQUIRED 状態(未能读取 archive.mp3) | main.js(実装) |
| 3 | 音楽の権利はトラックの生成/使用ライセンスに依存。プロジェクトは音声への追加許諾を与えない | README |
| 4 | モバイルフォールバック: アーカイブセル 81→45、セルあたり点数 156→72、粒子数削減、ジオメトリ分割削減、pixelRatio 上限 1.15、antialias 無効、bloom 一律 0.42 | README / コード |
| 5 | prefers-reduced-motion で開幕 4.2 s に短縮、静默モードで儀式クロック2倍速、ゲート/紋章の CSS アニメ無効 | コード |
| 6 | 静默入場経路が静的ビジュアル QA のサポートルートとして明記されている | ルート README |
| 7 | **この展示の QA ログが docs/ に存在しない**(glass-optics と voxel-water にはある) | docs/ ディレクトリ調査 |

---

## コードリーディングで発見されたリスク(重要度順)

1. **シングルスロット・パルス系**: 波面は常に1つのみ。オートソナー(transient>0.16、cooldown 約1.15–1.85 s)が音の密な区間でユーザー起動パルスを常時上書きし、クリックしたエコーが伝播途中で消される — 「エコーは履歴を保存する」というコンセプトを激しい楽曲区間で自ら弱体化。
2. **shutdown>0.5 中の uniform 汚染**: updatePulse が収束シェル用に共有 `globals.pulseStrength` を `(1-p)*1.08` へ強制上書き。全マテリアルが同一 uniform オブジェクトを共有するため、床/アーカイブ/レゾネーター/nearSnow のシェーダが終幕中に幻のパルスを見る(survive 項で部分的に隠れるが意図せぬ結合)。
3. **convergenceMaterial は sonarShellMaterial.clone() で uniforms を共有 globals に再代入** — shell と convergence は永遠に独立したパルスパラメータを持てない。現状は無害だが将来の編集の罠。
4. **コアの raycast ターゲットが章ごとにスケール**(例: VIII `[1.46,0.62,0.34]`、IX `[0.48,0.48,0.48]` × 呼吸)— 後半章でクリック領域が極小になり視覚上の虹彩と一致しない。`core.userData.interactive='core'` は設定されるが読まれないデッドコード。
5. **`preview=main` の既定が section 4(第V章)** — 唯一の暖色/金パレットのため、静的 QA スチルが展示の最も非代表的な外観を系統的に過剰代表する。
6. **加算透明の重いオーバードロー**: 約32k シェーダポイント + 大型スプライト(coreHalo 最大約7ワールド単位、nearSnow ポイントサイズ clamp 3.8 × size 8.5)+ フル解像度 bloom + afterimage + 9タップ veil を pixelRatio 1.6 で — 中位 GPU でフィルレート危険。**FPS ベースの動的縮退が存在せず**、ロード時に一度だけ評価される静的 isMobile 分岐のみ(幅 <820px のデスクトップはリロードまで恒久的にモバイルアセット)。
7. **isMobile 判定はロード時のみ**: 820px 閾値をまたぐリサイズや DPR 変化で品質ティアが再評価されない。
8. **AfterimagePass damp が shutdown 中最大 0.982(第IX章 0.94)**: 超長寿命トレイル + 加算合成で、ほぼ黒の終幕は露出崩壊頼みで残渣を隠す — 最暗ランプ(deep `#000405`)でのバンディング/ゴーストリスク。ディザリングパスなし。
9. **ソース管理リスク**: public/ には minify 済み 644 KB バンドルのみ。編集可能ソースは ref/(現在 git status で untracked '??')— **ref/ が commit されなければ public バンドルは修正不能になる**。`archive.mp3`(8.28 MB)が public/ と ref/ に重複しリポジトリ重量が倍増。さらに mp3 は静默 QA 経路でも `preload='auto'` でプリロードされる。
10. **iframe allow に 'microphone'** — 展示は一切使用しない。不要な権限サーフェス。
11. **iframe フォーカス依存 + QA フックの不在**: F/R 等のキー操作は iframe フォーカス頼みでショールーム側に案内なし。postMessage チャンネルが皆無(reload 限定制御は設計だが、シェルからのプレビュー強制などの QA フックが不可能。親は load 前の same-origin contentWindow スクリプティングなしに `__NINTH_TIDE_PREVIEW__` を設定できない)。
12. **静默モードの章周回**: musicTime = `((elapsed/118)*354.504)%354.504` — 音楽の約3倍速で章が循環し、IX→I へ突然ラップ(updateEnding は audioReady 必須のため第IX章の終幕振付は静默モードで一度も発火しない。IX 真珠状態から通常の 2.85 s 遷移で I 圧力球へ跳ぶ)。
13. **床シェーダのデッドブランチ**: `CircleGeometry(16)` 内で `if (radius > 16.0) discard` — vPlane が 16 を超えることはない。
14. **毎フレームの微小コスト**: updateCamera が毎フレーム `new THREE.Vector3` を割り当て。updateTide が毎フレーム CSS カスタムプロパティ2つを書く(style recalc)。
15. **HUD/シーンのコントラスト非連動**: 章タイトル HUD(phase-number)は Georgia serif 最大 62px、0.34 opacity のグラデーション罫。第IX章のほぼ黒パレットでも HUD シアン(`#83eadb`)は固定のままで、シーン自体より明るく読める — HUD がパレット非対応。
16. **triggerPulse の sonarShell.visible 設定は updatePulse の一括 hide/show で毎フレーム上書き** — 無害な冗長だが実際の可視性ロジックを不明瞭にする。

---

## ビジュアル現状評価(スクリーンショット批評の要約)

### 現行ビルド(output/playwright/、visual-current.json)

- **デスクトップ(ninth-tide-archive-desktop.png)**: ビューポートはほぼ黒のティール・ゲート画面 — 菱形エンブレム、「HADAL RECORD / NODE IX」、CJK 大タイトル 第九潮汐档案馆、英字サブタイトル、詩行2つ、ボタン2つ(下潜 / 静默下潜)。批評: **エレガントで統制されたタイポグラフィ。MIZU//KOKORO の密度への良い対位。ただしこのスクリーンショットが証明するのは「扉」だけで「部屋」ではない** — オーディオリアクティブシェーダ本体は写っておらず、展示のインパクトは現行キャプチャから検証不能。ゲート内ではキャプション行が判読不能なほど小さく、主行動のボタン2つが視覚的に弱腰、ほぼ黒の field がページ全体のコントラストを押し下げサイドバーが最輝部になる。ゲートとしての wow factor 6/10。**QA には入場後スクリーンショットが必要**。
- **モバイル(ninth-tide-archive-mobile.png)**: 中央対称のゲート構図は全ルーム中で最も狭幅に耐える(対称はスケールする)。ただし英字サブタイトルが「THE SHORELESS / LAYER」と不格好に折り返し、ボタンとキャプションが快適なタップ/可読サイズを下回る。デスクトップと同じ構造的問題: シェーダ本体の証拠ゼロ。wow factor 6/10。
- **全体所見より**: 埋め込み2展示はキャンバス内でアートディレクションを完結させ「native」2ルームより即座に仕上がって見えるが、固定 HUD はモバイル幅で破綻。現行インパクト順位は 1) MIZU//KOKORO、**2) Ninth Tide Archive — ただし実ビジュアライゼーションが一度もキャプチャされておらず、インパクトは未証明**、3) Glass Optics、4) Voxel Water。impactGaps にも明記: 「Ninth Tide Archive はタイトルゲートでしか撮影されていない — 実際のオーディオリアクティブシェーダの視覚的証拠がゼロで、現行スクリーンショットから展示価値の評価もマーケティングもできない」。

### 原典リファレンス(ref/、visual-refs.json)

- **preview.png(メイン/ヒーロー、1600×900)**: 画面の約95%が黒。中央にヘアライン・ワイヤーフレームの水平レンズ/双円錐スピンドル、内部に3–4個のブルームした cyan コア。最輝要素は床のスプリンググリーンの生物発光ヴォルテックス(ソナー状の同心リング)。HUD は最小限のマイクロタイプ(HADAL RECORD / NODE IX、章カード「VIII / 深渊回视 / THE ABYSS LOOKS BACK」、タイムライン 00:00–05:54、LOW/MID/HIGH メーター)。批評: **見事な抑制 — 輝度階層の崇拝。輝度は正確に3層(ヴォルテックス・プール、コア、ヘアライン線)で競合なし**。弱点: 右下ヒントテキストはフル解像度でも判読不能な低コントラスト。**環境光に対して破滅的に脆弱** — わずかな周囲の明るさで下位2輝度層が消える。atmosphere の wow factor 9。
- **preview_opening.png**: ほぼ全黒 + 中央白 CJK「它先看见了我们。」/「IT SAW US FIRST.」。シーンは背後で約5%の不透明度で呼吸。シーケンスのビートとして優秀(wow 8)。
- **preview_ending.png**: ほぼ完全な闇。HUD 全消滅、交差楕円 + 単一の teal モートのみ。**サムネイルでは黒い長方形に見える。代表スチル/サムネイルには絶対に使用してはならない**(静止画として 4、終幕ビートとして 8)。
- **埋め込み時の保存条件(overallImpressions より)**: 真の黒を保てる遮光アルコーブ(隣接展示の bloom/漏れ光が下位2輝度層を消す)、ヴォルテックス・プールのコントラスト非クランプ、判読可能なマイクロタイプスケール、**視聴者をシーケンス途中に落とさない開幕タイトルカードのペーシング**。ヒーローは preview.png の第VIII章的瞬間(休眠コア・スピンドル + 発光ソナー・ヴォルテックス)。
- **要確認**: リファレンスの preview.png は章カード「VIII」を表示しているが、コード上の `preview=main` 既定は section **4**(第V章・唯一の金パレット)。原典ヒーローショットと現行 QA プリセットが指す章が一致していない可能性が高い(understand-tide の risks にも「preview=main は最も非代表的な外観を過剰代表」と指摘あり)。

---

## 調整候補の種(チケット化候補)

各項目は「問題 → 改善方向」。優先度は仮ラベル(P1=公開ブロッカー級 / P2=品質・概念整合 / P3=衛生・改善余地)。

### P1

- **[P1] ゲートしか撮れておらず展示本体の視覚的証拠ゼロ** → `?preview=main|opening|ending`(+`&section=`)と `__NINTH_TIDE_STEP__` を使った入場後の決定論キャプチャを QA パイプライン(Playwright)に追加。章別スチル(最低 I / V / VII / VIII / IX)+ 開幕 + 終幕を撮る。docs/ に ninth-tide-archive の QA ログを新設(現在存在しない)。
- **[P1] ref/ ソースが untracked** → `ref/archive_of_the_ninth_tide_shoreless_web/` を commit しないと public の 644 KB minify バンドルが事実上修正不能になる。ソース管理とビルド手順(esbuild コマンド)を docs 化。合わせて `archive.mp3` 8.28 MB の二重保持の解消方針(シンボリック参照/ビルドコピー)を決める。
- **[P1] `preview=main` 既定 section 4(第V章・唯一の暖色)が QA スチルを歪める** → 既定 section を代表的な寒色章(原典ヒーローに合わせるなら VIII、または I)へ変更するか、QA 側で必ず `&section=` を明示。リファレンス preview.png(第VIII章)との不一致は要確認。
- **[P1] コントラスト脆弱性: ショールーム埋め込みで真の黒が保てないと下位2輝度層が消える** → iframe 周囲のシェル(サイドバー/パネル)の輝度がゲート・本編より明るくならないよう、このルーム選択時のシェル減光(dimming)や露出隔離を検討。visual-current でも「サイドバーがページ最輝部になる」と指摘済み。

### P2

- **[P2] シングルスロット・パルスがユーザーのエコーを上書き(Pulse Room 概念の毀損)** → 小さな uniform 配列またはピンポン FBO による多重波面バッファ(researchTopics 記載)。少なくともユーザー起動パルスをオートソナーより優先保護する。
- **[P2] shutdown 中の共有 `pulseStrength` 強制上書きによる幻パルス** → convergence 専用の uniform 分離(clone 時の globals 再代入をやめ独立パラメータ化)。リスク3(clone の罠)も同時に解消。
- **[P2] 後半章のコア・クリック領域が極小で視覚と不一致** → raycast ターゲットを視覚形状(第VIII章の虹彩スケール等)に追従させるか最小ヒットサイズを保証。デッドコード `core.userData.interactive` の整理。
- **[P2] FPS ベースの動的縮退なし + isMobile がロード時一回のみ** → renderer.info / フレームタイム駆動の動的 pixelRatio、リサイズ/DPR 変化での品質ティア再評価。加算オーバードロー(約32k点 + 大型スプライト + フル解像度ポスト3段)のフィルレート予算を計測(researchTopics: タイル GPU オーバードロー・プロファイリング)。
- **[P2] 最暗部のバンディング/ゴースト(afterimage damp 0.94–0.982 + deep `#000405` + ディザなし)** → OutputPass 前の blue-noise ディザ注入を検証(researchTopics 記載)。afterimage の linear/sRGB・half-float 精度検証も併せて。
- **[P2] HUD がパレット非連動(第IX章でクロームがシーンより明るい)** → CSS `--cyan`/opacity を現行章パレットから駆動する適応コントラスト(researchTopics 記載)。
- **[P2] 静默モード(3倍速周回)で第IX章の終幕振付が発火せず IX→I へ突然ラップ** → 静默モードにも簡易 shutdown シーケンスを与えるか、QA ルートとしての限界を docs に明記して要確認扱いにする。
- **[P2] 埋め込みモバイルでボタン/キャプションがタップ・可読サイズ未満、英字サブタイトルの折り返しが不格好** → ゲート画面のキャンバス内ブレークポイント(ボタン最小 44px、サブタイトルの改行制御)。visual-current の impactGaps に対応。
- **[P2] ショールーム側 QA フック不在(postMessage ゼロ、`__NINTH_TIDE_PREVIEW__` を親から設定不能)** → same-origin なので load 前 contentWindow への注入パターン(researchTopics 記載)を検討。reload-only 制御という設計思想は維持しつつ QA 専用の裏口に限定。

### P3

- **[P3] オートソナーの発火品質(単一バンドのエネルギー微分 ×8.6)** → スペクトラルフラックス・ノベルティ + 適応閾値で音楽的に意味あるイベントに同期(researchTopics)。
- **[P3] バンドマッピングの知覚補正なし** → A/K 加重と pow カーブ(1.14/1.22/1.08)を実際の archive.mp3 ミックスに対して較正(researchTopics)。
- **[P3] レゾネーター光錐が薄殻フェイク(alpha ピーク約0.15)で McCall の Solid Light に対し弱い** → 円錐 fresnel + ノイズ vs レイマーチング参加媒質の比較検討(researchTopics)。
- **[P3] 9タップ放射ブラーのコスト/品質** → mip ベース kawase / dual-filter blur との比較(pixelRatio 1.6 時、researchTopics)。
- **[P3] iframe `allow` の 'microphone' 除去** → 未使用の権限サーフェス削減(`EmbeddedExhibitFrame.tsx`)。
- **[P3] 床シェーダの `if (radius > 16.0) discard` デッドブランチ削除**、triggerPulse の冗長な `sonarShell.visible` 設定整理。
- **[P3] 毎フレームの `new THREE.Vector3`(updateCamera)と CSS カスタムプロパティ2件書き込み(updateTide)** → 再利用ベクトル化、変化時のみ書き込み。
- **[P3] 静默 QA 経路でも mp3(8.28 MB)が `preload='auto'` でロードされる** → 遅延ロード or preload 属性の見直し。
- **[P3] sectionBoundaries(48.97/75.05/103.10/145.24/183.81/224.89/260.23/330.05 s)の妥当性検証** → ノベルティカーブによるビート同期セグメンテーション・ツールで手調整値を検証(researchTopics)。
- **[P3] nearSnow の物理的説得力** → 海中マリンスノーの後方散乱位相関数・ROV 光減衰を参照にサイズ/alpha(基礎 0.018)をアートディレクト。**注: このトピックは research-audio-reactive.md に対応節がない未調査項目**(監査で確認済み)。チケット化する場合は調査タスクを含めるか、アートジャッジのみで進める判断を README の未調査項目リストに従って行うこと。
- **[P3] 音楽ライセンスの確認** → README 記載の通りトラックの生成/使用ライセンス依存。公開前に権利状態を要確認。

---

## 重要ファイル

| パス | 役割 |
|---|---|
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\src\main.js` | **正本・唯一の編集可能ソース**(2753行)。esbuild で app.js へバンドル |
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\ART_DIRECTION.md` | AD 文書(九章文法・4層構成・開幕/終幕キューの根拠) |
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\README.md` | ビルド/QA ルート/ライセンス注記 |
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\package.json` | 依存(three 0.184.0)とビルドスクリプト |
| `F:\WorkSpace\ShaderDemoRoom\public\exhibits\ninth-tide-archive\index.html` | 配信用エントリ(ref とバイト一致) |
| `F:\WorkSpace\ShaderDemoRoom\public\exhibits\ninth-tide-archive\app.js` | 配信用 minify バンドル(644,588 byte、ref とバイト一致) |
| `F:\WorkSpace\ShaderDemoRoom\public\exhibits\ninth-tide-archive\archive.mp3` | 音源(8,279,999 byte、約354.5 s。ref 側と同一) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\ninth-tide-archive\state.ts` | ショールーム状態(`{ reloadToken: 0 }` のみ) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\ninth-tide-archive\Controls.tsx` | 埋め込みコントロール(Reload / Open standalone / Reset) |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\embedded\EmbeddedControls.tsx` | 埋め込みコントロールのファクトリ |
| `F:\WorkSpace\ShaderDemoRoom\src\shared\embedded\EmbeddedExhibitFrame.tsx` | iframe ラッパー(`allow="autoplay; microphone; clipboard-write"`) |
| `F:\WorkSpace\ShaderDemoRoom\src\shared\embedded\url.ts` | 埋め込み URL 構築 |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\registry.ts` | ルーム登録(kind 'embedded'、accent `#79ead9`) |

### 参照スクリーンショット

| パス | 内容 |
|---|---|
| `F:\WorkSpace\ShaderDemoRoom\output\playwright\ninth-tide-archive-desktop.png` | 現行デスクトップ(ゲートのみ) |
| `F:\WorkSpace\ShaderDemoRoom\output\playwright\ninth-tide-archive-mobile.png` | 現行モバイル(ゲートのみ) |
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\preview.png` | 原典ヒーロー(第VIII章的瞬間、輝度3層) |
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\preview_opening.png` | 原典開幕タイトルカード(它先看见了我们。) |
| `F:\WorkSpace\ShaderDemoRoom\ref\archive_of_the_ninth_tide_shoreless_web\preview_ending.png` | 原典終幕(サムネイル使用禁止) |
