# 共有シェル(App Shell / RoomRuntime 基盤)調整カルテ

> 対象: アプリ構造・RoomRuntime 契約・デザイントークン・i18n・QA 基盤・CI。
> 展示品ではなく「展示館そのもの」のカルテであるため、章立てを次のように読み替える:
> レンダリングパイプライン → **レンダラーライフサイクル**、パラメータ一覧 → **デザイントークンとレイアウト定数**。
> 情報源: コード深掘り調査 (understand-shell.json) およびスクリーンショット批評 (visual-current.json)。事実(hex 値・uniform 名・定数・FPS 数値)は入力の転記であり、推測を含む箇所は「要確認」と明記する。

---

## コンセプト(原典の意図)

`docs/design/showroom-design-framework.md` は本プロダクトを **「technical-art workbench, not a marketing site」** と定義する。オンライン展覧会のメタファーで、各シェーダー実験は hash ディープリンク可能な独立した「room」。ファーストスクリーンがそのままショールームであり、中央に full-bleed WebGL viewport、左に compact room rail、右に room 所有の inspector、上部に status topbar を置く。

すべてを律する **5 つの Locked Decision**:

1. GitHub Pages への static-first デプロイ(バックエンドなし)
2. hash routing
3. **persistent renderer** — 「React switches room runtimes, but the app owns one persistent WebGL renderer and canvas container」
4. room 所有のコントロールは共有プリミティブのみで構築
5. i18n シームを初日から — 「all visible copy flows through t(key)」

Room は 4 つ: ネイティブシェーダー 2 室(Voxel Water / Glass Optics、RoomRuntime 契約経由)と、embedded 2 室(MIZU//KOKORO anime liquid orb / Ninth Tide Archive、`public/exhibits` の standalone ランタイムを same-origin iframe でマウント。シェル側は reload / standalone-open / reset のみ提供)。

設計ドキュメントは Gemini レビュー由来の 4 つのリスク視点(WebGL context の繰り返し生成、room 切替時の GPU リーク、コントローラー間のグローバル状態汚染、full-bleed canvas と DOM パネルの pointer-event 競合)を明記し、実装はその緩和策に従う、と主張している。

**ビジュアルの原典**は `docs/design/primary-showroom-concept.png`。コンセプト画の viewport は「構図を持つ一枚絵」(灯台のランドマーク、中景の岩、泡のバリュースパークル、雨のアトモスフィア、ニアブラック〜白のフルバリューレンジ)であり、さらに **プロツール的ガーニッシュ** — 左上の monospace カメラ/デバッグ読み出し、右上の XYZ gizmo cube、右下の teal minimap、下部の 7 セル telemetry ストリップ(FPS/Frame Time のスパークライン、Draw Calls 142、Triangles 1.23M、Uniforms 220、Textures 18、VRAM 312 MB)— が「pro tool」の説得力を担う。批評での評価は **Wow 9/10**。これが本カルテの物差しである。

---

## 実装アーキテクチャ(シーングラフ/更新ループ/状態フロー)

### エントリと routing
- `index.html` は最小構成(`lang="en"`、meta description "A static Three.js shader showroom for technical art experiments."、`#root`)。
- `src/main.tsx` が React StrictMode 下で `<App/>` をマウントし、`tokens.css` → `app.css` の順で import。
- `src/app/App.tsx`: `I18nProvider > HashRouter`。ルートは `/` → `/room/voxel-water` へ Navigate、`/room/:roomId` → ShowroomPage、`*` → voxel-water へ Navigate。

### 状態フロー (ShowroomPage)
- 全 room の設定を単一の `useState` マップ `settingsByRoom: Record<RoomId, AnyRoomSettings>` に保持。registry の `defaultPreset` から遅延初期化 — **セッション内では room 切替をまたいで設定が保持されるが、リロードで消える**(URL / localStorage へのシリアライズなし)。
- 公開 API: `updateSettings`(置換)/ `patchSettings`(`as AnyRoomSettings` キャストを伴う shallow merge)/ `resetSettings`(registry の defaultPreset **オブジェクト参照**を復元)。
- Stats state `{fps, drawCalls}` がシーン HUD を駆動。ShaderCanvas は `React.lazy` で遅延ロードされ three.js はエントリチャンクからコード分割される。
- Stage は `activeRoom.kind === 'embedded'` なら EmbeddedExhibitFrame、それ以外は ShaderCanvas を描画。HUD 行は embedded では "Embedded runtime" / "Standalone exhibit" ラベル、shader room では `${Math.round(fps)} FPS` / `${drawCalls} calls` と techTags(" / " 連結)。

### RoomRuntime 契約 (src/rooms/types.ts)
- `RoomId` は 4 id の union。
- `RoomRuntime<TSettings> = { updateSettings(settings), resize({width,height,pixelRatio}), render({elapsed,delta}), dispose() }`
- `RoomRuntimeContext = { canvas, renderer: WebGLRenderer, onStats }`
- `RoomDefinition` は `kind` の discriminated union: `'shader'`(`loadScene` 追加)| `'embedded'`(`embedPath` 追加、settings は `EmbeddedExhibitSettings = { reloadToken: number }` 固定)。
- 設定スキーマ: `VoxelWaterSettings` 16 フィールド(`weather: 'clear'|'rain'|'storm'`, wind, rain, waveHeight, toonSteps, cloudCover, swell, chop, foam, clarity, surfaceDetail, currentDirection, currentStrength, skyTime, colorTemperature, voxelColorVariance)、`GlassOpticsSettings` 9 フィールド(lightX/Y/Z, beamSpread, ior, roughness, thickness, autoRotate, showCaustics)。実際の min/max/step/default は各 room の state.ts / Controls.tsx にあり本カルテのスコープ外。

### Registry (src/rooms/registry.ts)
- 配列リテラル + `satisfies readonly RoomDefinition[]`。runtime と Controls は room ごとに dynamic import。`ControlsComponent = lazy(loadControls)` はモジュールスコープで一度だけ生成。`getRoomById` はキャスト付き find。`isRoomId` は export されているがシェルから未使用(dead code)。

### Embedded 経路
- EmbeddedExhibitFrame は `key=\`${room.id}-${settings.reloadToken}\`` の iframe。src は `getEmbeddedSrc`(BASE_URL 正規化 `${base}${path}`、reloadToken > 0 なら `?reload=N` 付与)。`allow="autoplay; microphone; clipboard-write"`、allowFullScreen。
- Reload = reloadToken インクリメント → key と query が変わり iframe 完全リマウント。
- `createEmbeddedControls`({namespace, standalonePath} を取るファクトリ)が 3 ボタン(Reload exhibit / Open standalone [`window.open`, 'noopener,noreferrer'] / Reset [ghost])の Controls を返す。両 embedded room の Controls.tsx はこのファクトリの 2 行ラッパー、state.ts は `{ reloadToken: 0 }`。

### i18n
- I18nProvider: locale state(default `'en'`、supported `['en','zh-CN']`、`normalizeLocale` は defaultLocale へフォールバック)。`{locale, setLocale, t}` を memo 化し `document.documentElement.lang` を設定。
- `createTranslator` は dot-path キー解決 → English フォールバック → raw キーフォールバック。**locale は永続化されない**。
- カタログ全体は `src/shared/i18n/index.ts`。i18n.test.ts は UI から選択できない `'ja'` locale のフォールバック連鎖をテストしている(第三 locale の潜在意図)。

### インフラ / CI / テスト / QA
- `vite.config.ts`: `base = VITE_BASE_PATH ?? \`/${repoName}/\``(repoName は GITHUB_REPOSITORY、fallback 'ShaderDemoRoom')。build/preview のみ適用、dev は `/`。`chunkSizeWarningLimit: 900`。
- CI (`.github/workflows/pages.yml`): main への push で pnpm 11.5.2 / Node 24 (`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`) / `pnpm install --frozen-lockfile` / `pnpm test` / `pnpm build` / dist upload / `deploy-pages@v5`。**`pnpm lint` も Playwright QA スクリプトも CI では実行されない。**
- `package.json` はほぼ全依存(react, three, vite, react-router-dom…)を `"latest"` にピン。例外は `@types/three` (^0.184.1)、`playwright` (^1.60.0)、`pnpm@11.5.2`、`node>=22`。
- テスト: `registry.test.ts`(4 id の順序・一意性・キー形状 regex `^rooms\.[a-zA-Z0-9]+\.title$`・shader room の loadScene・embedded の `^exhibits/.+/index\.html$`)、`ShaderCanvas.test.ts`(**raw-source 文字列テスト** — `'const rawDelta = timer.getDelta()'`、`'const delta = Math.min(rawDelta, 0.05)'`、`'fpsElapsed += rawDelta'`、`'fpsElapsed += delta'` の不在、`"roomId === 'voxel-water' ? 0.6 : 2"`、`"antialias: room.id !== 'voxel-water'"` の各リテラル存在を検証)、`i18n.test.ts`。
- QA スクリプト:
  - `scripts/visual-smoke.mjs` (`pnpm qa:visual`): headless Chromium 1440x900、`SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom'`。デスクトップ 4 室 + モバイル (390x844) 3 室(glass-optics スキップ)。settle 1600 ms (desktop) / 1400 ms (mobile)。PNG を `output/playwright` へ。ハードフェイル条件は 3 つのみ: console error/pageerror、モバイル横スクロール (`scrollWidth > clientWidth`)、`.scene-hud` と `.stage-viewport` の垂直オーバーラップ(要素欠落もオーバーラップ扱い)。
  - `scripts/water-qa.mjs` (`pnpm qa:water`): `${baseUrl}/#/room/voxel-water`、**baseUrl デフォルトは `'http://127.0.0.1:4173'` で repo サフィックスなし**(visual-smoke と不整合 — 後述)。'Storm preset' / 'Calm preset' / 'Rain' ボタンを QA_PRESET に応じてクリック。QA_FRAMES=8 枚を QA_FRAME_DELAY_MS=120 で取得し、PNG をプロセス内デコード(Paeth フィルタ含む)。算出メトリクス: frame 間 meanDelta / strongRatio(閾値 delta > 28)/ maxDelta(sampleScale=4 px 間引き)、領域メトリクス sky (x 0.08–0.92, y 0.02–0.28) / horizon (0.06–0.94, 0.24–0.52) / water (0.06–0.94, 0.42–0.94) の lumaMean(Rec.709 係数 0.2126/0.7152/0.0722)、waterCoverage ヒューリスティック `g > r*1.05 && b > r*1.08 && g+b > 92`、saturationRange、toonBandSeparation = (p90−p10 luma)/max(1, activeLumaBands−1)(帯幅 22 の 12 バンド、活性閾値サンプルの 1.8%)、voxelLocalContrast、彩度重み付き circular hueMean、colorSignature {rMean, gMean, bMean, hueMean, saturationMean, cyanBias=(g+b−2r)/510, warmCoolBias=(r−b)/255}。**console error 以外は throw しない — 全ビジュアルメトリクスはレポートのみで assert されない。**

---

## レンダラーライフサイクル(レンダリングパイプライン相当 — 設定値・フレームループ・マジックナンバー)

シェル自身はシェーダーパスを持たない。全 shader room が継承する **renderer 構成とフレームループ** を所有する(`src/shared/three/ShaderCanvas.tsx`)。

### Renderer 生成(Effect A、deps `[onStats, room.id]`)
```
new WebGLRenderer({ canvas, antialias: room.id !== 'voxel-water', alpha: false, powerPreference: 'high-performance' })
renderer.outputColorSpace = SRGBColorSpace
renderer.setClearColor(0x070b10, 1)
```
- クリアカラー `0x070b10` はニアブラック青。CSS 側の `.canvas-shell #06090e` / `.embedded-shell #02070d` と同系だが **どちらとも一致しない**(3 種のニアブラック並存)。
- canvas 親要素に ResizeObserver。サイズは親の `getBoundingClientRect` を floor(最小 1)し `renderer.setSize(width, height, false)`(CSS サイズは触らず、canvas は 100%/100% スタイル — voxel-water はブラウザによってアップスケールされる)。

### Pixel ratio ポリシー (`getRenderPixelRatio`)
```
Math.min(window.devicePixelRatio || 1, roomId === 'voxel-water' ? 0.6 : 2)
```
voxel-water は意図的に **内部解像度 0.6x + MSAA off** のフィルレート最適化(ShaderCanvas.test.ts でロック)。他の shader room は最大 2x + MSAA on。

### フレームループ
- three.js `Timer` を document に接続(page-visibility 対応)。
- 毎フレーム: `rawDelta = timer.getDelta()`; シミュレーション用 `delta = Math.min(rawDelta, 0.05)`; `runtime.render({elapsed, delta})`。
- FPS 集計は **rawDelta** で行い、0.5 s ごとに `renderer.info.render.calls` とともに `onStats` へフラッシュ。**注意: calls はフラッシュ時点の直近 1 フレームのスナップショットであり、平均 FPS と並記されるのはややミスリーディング。**

### Room 切替と破棄(Effect B、deps `[room, onStats]`)
- 既存 runtime を dispose → loading 表示 → `room.loadScene()` → `createRoomRuntime({canvas, renderer, onStats}, settingsRef.current)` → 初回 resize。遅延解決は `cancelled` フラグでガード。第三の小 effect が settings 変更ごとに `settingsRef` 更新と `runtime.updateSettings` を実施。
- クリーンアップ: rAF キャンセル、observer disconnect、runtime.dispose()、timer.dispose()、`renderer.dispose()`(**`forceContextLoss()` なし**)。
- **重要なニュアンス**: shader room 同士の切替では ShaderCanvas はマウントされ続け(canvas に key なし)、**同一 canvas 上で renderer が dispose → 再生成される**。ドキュメントの「one persistent renderer」に対し、実際に永続するのは canvas DOM ノードだけで renderer オブジェクトは room ごと。embedded room を経由すると ShaderCanvas 自体がアンマウントされ、復帰時は新しい canvas になる。
- 契約上、GPU リソース回収手段は `dispose()` のみ。embedded room はこのパイプラインを完全にバイパスする(iframe 内ランタイムが自前の context を所有)。

---

## デザイントークンとレイアウト定数(パラメータ一覧相当)

### カラートークン (src/styles/tokens.css)

| トークン | 値 | 実際の役割 |
|---|---|---|
| `--bg` | `#06090e` | ベース背景 |
| `--bg-elevated` | `#0b1118` | 浮きレイヤー背景 |
| `--surface` | `rgba(13,20,28,0.92)` | パネル面 |
| `--surface-strong` | `rgba(18,27,37,0.96)` | 強調面 |
| `--surface-soft` | `rgba(19,31,42,0.72)` | 弱い面 |
| `--border` | `rgba(147,197,211,0.16)` | 細ボーダー |
| `--border-strong` | `rgba(164,223,235,0.3)` | 強ボーダー |
| `--text` | `#eef7f8` | 本文 |
| `--muted` | `#91a6b2` | 副文 |
| `--subtle` | `#647883` | 最弱テキスト(11px 用途でコントラスト懸念) |
| `--cyan` | `#34d5ff` | テクニカルハイライト / voxel-water アクセント |
| `--teal` | `#5af2d1` | ステータスドット等 |
| `--amber` | `#ffbd5a` | 警告 / glass-optics アクセント |
| `--danger` | `#ff6c7a` | 危険 |
| `--focus` | `#8cecff` | フォーカスリング |
| `--shadow` | `0 18px 50px rgba(0,0,0,0.34)` | 影 |

### レイアウト・形状・タイポグラフィ定数

| 定数 | 値 | 備考 |
|---|---|---|
| `--radius-sm` / `--radius-md` | 4px / 8px | 設計ドキュメントの「radius ≦ 8px」に準拠 |
| `--topbar-height` | 64px | |
| `--rail-width` | 236px | |
| `--inspector-width` | 342px | |
| フォントスタック | Inter / ui-sans-serif / system-ui / -apple-system / BlinkMacSystemFont / "Segoe UI" | `color-scheme: dark` |
| 文字サイズ | 11px(小ラベル・HUD チップ・rail note)、12px(コントロール・ステータス)、13px(rail の room タイトル・グループ見出し・説明)、15px(ブランド)、26px desktop / 22px mobile(inspector h1) | **クラスごとハードコードで非トークン化** |
| ブレークポイント | 1080px(1 カラム化、viewport 行 `minmax(56vh,620px)`)、640px(room リスト 1 カラム、`minmax(54vh,520px)`、h1 22px) | |

### Room アクセント(registry.ts のみに存在 — tokens.css 外)

| Room | アクセント hex | 備考 |
|---|---|---|
| voxel-water | `#34d5ff` | `--cyan` と同一 |
| glass-optics | `#ffbd5a` | `--amber` と同一 |
| anime-liquid-orb | `#ff56d8` | ホットマゼンタ — **トークンパレット外** |
| ninth-tide-archive | `#79ead9` | ペールミント — `--teal #5af2d1` の近似重複(非同値) |

Rail のアクティブ/ホバーは `color-mix(in srgb, var(--room-accent), transparent 42%)` ボーダー + `rgba(13,21,30,0.7)` への 88% mix 背景。

### シェル所有のユーザー操作

| 操作 | 型 / デフォルト | 効果 |
|---|---|---|
| Language select | `'en'`(English)/ `'zh-CN'`(中文)、default `'en'` | カタログ全体と `document.documentElement.lang` を切替。**非永続** |
| Source ボタン | 固定リンク | `https://github.com/Hitsuki-Ban/ShaderDemoRoom`(ハードコード) |
| Room rail | 4 NavLink | `--room-accent` CSS 変数を room ごとに注入 |
| Reload exhibit(embedded) | reloadToken: default 0、上限なし整数 | iframe key 変更 + `?reload=N` 付与で完全再起動 |
| Open standalone(embedded) | — | exhibit URL(reloadToken 0)を `window.open` |
| Reset(embedded) | — | `{ reloadToken: 0 }` 復元(key が戻るため同じくリマウント) |

共有コントロールプリミティブ: `SliderControl`(label/value/min/max/step/unit、step が整数なら `toFixed(0)` 表示、そうでなければ `toFixed(2)`)、`ToggleControl`、`SegmentedControl`、`ControlGroup`、`Button`(variants `'primary' | 'secondary'(default) | 'ghost'`、icon、`as` ポリモーフィズム)。範囲制限はシェルでは行わず room 側の責務。

### QA / ビルドの非 UI ノブ

| 変数 | デフォルト |
|---|---|
| `QA_FRAMES` | 8 |
| `QA_FRAME_DELAY_MS` | 120 |
| `QA_SAMPLE_SCALE` | 4 |
| `QA_VIEWPORT_WIDTH` x `QA_VIEWPORT_HEIGHT` | 1440 x 900 |
| `QA_PRESET` | default \| storm \| calm \| rain |
| `QA_LABEL` / `QA_OUTPUT_DIR` | water / output/water-qa |
| `SHOWROOM_URL` | (visual-smoke: `http://127.0.0.1:4173/ShaderDemoRoom`) |
| `VITE_BASE_PATH` / `GITHUB_REPOSITORY` | vite base 算出用 |

---

## アートディレクション現状(正確なパレット hex・構図・カメラ・モーション)

- **規定**(設計ドキュメント): 「dark graphite surfaces, cyan/teal technical highlights, amber warning accents, thin borders, and square controls with radius at or below 8px」。room はローカルアクセント色を持てるが、ボタン/スライダー/パネル/タイポグラフィの新規スタイル定義は禁止。
- **シェルの空気感**(app.css `.showroom-shell`): `linear-gradient(180deg, rgba(15,24,34,0.9), rgba(6,9,14,0.94) 48%)` に、22% 0% の radial cyan glow `rgba(52,213,255,0.1)` と 80% 10% の radial amber glow `rgba(255,189,90,0.08)` を重ねた多層背景。topbar / rail / inspector は `backdrop-filter: blur(18px)`。ステータスドットは teal 発光(`box-shadow 0 0 16px rgba(90,242,209,0.8)`)。
- **ニアブラックの三重奏**: renderer クリアカラー `0x070b10` / `.canvas-shell #06090e` / `.embedded-shell` `.embedded-exhibit-frame` `#02070d` — 微妙に異なる 3 色が、ロード時の DOM 背景と初回フレームの継ぎ目・フラッシュの原因になり得る。
- **モーション**: `prefers-reduced-motion` メディアクエリは CSS transition の平坦化のみ。rAF の WebGL ループはフル振幅で動き続ける(room へ reduced-motion を伝えるシェルレベルのフックが存在しない)。
- **コピーのレジスター分裂**(意図的だが要意識): ネイティブ 2 室はスペックシート調(Voxel Water — kicker "Toon water room" / short "Weather-driven stepped ocean shader"、Glass Optics — "Refraction room" / "Glass reflection with movable light paths")、embedded 2 室は計器ログ的ポエジー(MIZU//KOKORO — "Rheology specimen LQ-09" / "A liquid body with phase memory"、Ninth Tide — "The Shoreless Layer" / "Sound becomes depth and echo")。zh-CN は完全並行(体素水体 / 玻璃光学 / 流变标本 LQ-09 / 第九潮汐档案馆 / 无岸层)で、MIZU//KOKORO の zh 説明は英語より技術的(「把触碰转译为迟滞、过冲与回弹」)。
- **コンセプトとのガーニッシュ差分**: コンセプト画にあるカメラ/デバッグ・オーバーレイ、XYZ gizmo cube、minimap、スパークライン付き 7 セル telemetry ストリップは **一切実装されておらず**、ビルドは 2 つの小さなチップ(FPS / calls)に縮退している。

---

## 既知の課題(QA ログ・ドキュメント由来 — 出典明記)

| # | 課題 | 出典 |
|---|---|---|
| 1 | Gemini レビュー由来の 4 リスク(WebGL context 繰り返し生成 / room 切替時の GPU リソースリーク / コントローラー間グローバル状態汚染 / full-bleed canvas と DOM パネルの pointer-event 競合)を、アーキテクチャが緩和すると宣言 | docs/design/showroom-design-framework.md |
| 2 | Glass Optics は「an explanatory visual simulation, not a physically exact ray tracer」、Voxel Water は「legible shader behavior over physical ocean accuracy」を優先 — 物理精度への不満はスコープ外と設計段階で宣言済み | docs/design/showroom-design-framework.md |
| 3 | リファレンスコンセプト画像として `docs/design/primary-showroom-concept.png` を README / docs が参照 | README.md / docs |
| 4 | リポジトリ直下に untracked の `ref/` ディレクトリが存在し、スコープ内のどのファイルからも参照されていない | git status |
| 5 | CI は `pnpm test` + `pnpm build` のみ。lint も qa:visual も qa:water も未実行で、ビジュアルリグレッション検知は完全に手動/ローカル | .github/workflows/pages.yml |
| 6 | water-qa.mjs のビジュアルメトリクスは JSON レポートのみ(console error 以外 throw しない)— 判定は人間/エージェント任せ | scripts/water-qa.mjs |
| 7 | QA スクリーンショット上の FPS チップ実測: Voxel Water 15 FPS(desktop)/ 20–28 FPS(water-qa 各キャプチャ)、Glass Optics **1 FPS**、MIZU//KOKORO の exhibit 内 FPS 欄は **ダッシュ表示** — コンセプト画のステータスピルは 60 FPS / 16.7 ms を約束している | output/playwright, output/water-qa の各 PNG(visual-current.json) |

---

## コードリーディングで発見されたリスク(重要度順)

1. **Locked Decision #3 との契約乖離**: ドキュメントは「one persistent WebGL renderer」を約束するが、ShaderCanvas の renderer 生成 effect は `[onStats, room.id]` 依存のため、shader room 切替のたびに WebGLRenderer が dispose → 再生成される(永続するのは canvas DOM ノードのみ)。RoomRail の note コピー「Switch rooms without remounting the WebGL shell.」は過大宣伝。
2. **canvas 再利用で antialias 属性が死ぬ**: voxel-water ↔ glass-optics の切替は同一 canvas を再利用するが、WebGL の context 生成属性(antialias 等)は最初の getContext のみ有効。`antialias: room.id !== 'voxel-water'` は 2 室目以降サイレントに無効となり、**訪問順によって glass-optics が MSAA なし / voxel-water が MSAA ありになり得る**。embedded room を経由した場合のみ context がリセットされる。
3. **`renderer.dispose()` に `forceContextLoss()` がない**: shader → embedded → shader の往復で古い GL context が GC まで残留。繰り返しトグルするとブラウザの live context 上限(約 8–16、"Oldest context will be lost")に接触するリスク。
4. **i18n シームのバイパス(Locked Decision #5 違反)**: ShaderCanvas が 'Loading renderer' と `Loading {room.id}` を、voxel-water Controls が 'Storm preset' / 'Calm preset' をリテラル英語で描画(grep 確認済み)。しかも後者は **water-qa.mjs のボタンセレクタと結合しており、ローカライズすると QA_PRESET=storm/calm 実行がサイレントに壊れる**。
5. **water-qa の baseUrl 不整合**: water-qa.mjs デフォルト `http://127.0.0.1:4173`(repo サフィックスなし)vs visual-smoke.mjs `http://127.0.0.1:4173/ShaderDemoRoom`。vite preview は `/ShaderDemoRoom/` 配下で配信するため、`pnpm qa:water` を素で叩くと 404(SHOWROOM_URL 必須という暗黙の罠)。
6. **CI の検証空洞**: lint なし・QA スクリプトなし。かつ package.json がほぼ全依存を `"latest"` ピン — 再現性は pnpm-lock.yaml のみに依存し、lockfile 再生成で three のメジャーが跳ねてもシェーダー破壊が検知されない。
7. **アクセント色のトークン外定義**: `#ff56d8`(anime-liquid-orb)と `#79ead9`(ninth-tide-archive)は registry.ts のみに存在。`#79ead9` は `--teal #5af2d1` の近似重複で、tokens と registry のパレットドリフト。
8. **3 種のニアブラック**(クリアカラー `0x070b10` / `#06090e` / `#02070d`)によるロード時のシーム/フラッシュ可能性。
9. **アクセシビリティ**: aria-label と iframe title が `t(titleKey)` ではなく raw の room.id('voxel-water' 等)— 未翻訳のハイフン付きマシン id が支援技術に露出。加えて `--subtle #647883` の 11px テキストは `rgba(8,13,19)` 系サーフェス上で WCAG コントラスト境界線。
10. **prefers-reduced-motion の未貫通**: CSS のみ平坦化、WebGL ループはフル振幅継続。room runtime に reduced-motion を渡すシェル契約が存在しない。
11. **defaultPreset の参照共有**: settingsByRoom の初期値と reset 値は registry の defaultPreset オブジェクト**参照**。room runtime が settings を mutate すると、そのセッションのデフォルトがサイレント汚染される(readonly 型指定なし)。
12. **HUD の drawCalls はスナップショット**: 0.5 s フラッシュ時点の直近 1 フレームの `renderer.info.render.calls` を、平均化された FPS と並記 — マルチパス room ではミスリーディング。
13. **テストの脆弱性**: ShaderCanvas.test.ts は raw-source 部分文字列テストで、等価リファクタ(rawDelta 改名等)で壊れる一方、挙動保証はゼロ。
14. **QA カバレッジ穴**: visual-smoke はモバイルで glass-optics を撮らず、inspector スクロールもコントロール操作もしない — コントロールパネルのリグレッションは QA から不可視。
15. **iframe 権限過剰**: `allow="autoplay; microphone; clipboard-write"` を両 embedded room に付与。音声リアクティブなのは ninth-tide-archive のみで、anime-liquid-orb には過剰な許可面。
16. **小粒**: `isRoomId` dead export。locale がリロードで 'en' に戻る(非永続)。i18n テストのみに存在する 'ja' locale(UI から選択不可の潜在第三言語)。

---

## ビジュアル現状評価(スクリーンショット批評の要約)

**総評**: シェルは骨格としてはコンセプトの忠実な翻訳(sidebar / top status bar / right parameter rail / status chips が揃い、dark-teal-on-navy システムは破綻していない)。失われたのは「プレミアム感」を作っていた要素すべて — コンセプトの viewport は構図を持つ一枚絵で、プロツール的ガーニッシュ(デバッグオーバーレイ、gizmo、minimap、スパークライン telemetry)が支えていたが、**ビルドにはガーニッシュが皆無で、フラッグシップの部屋には絵もない**。

現時点のビジュアルインパクト順位(批評の Wow スコア付き):

| 順位 | Room | Wow | 要点 |
|---|---|---|---|
| — | コンセプト画 (primary-showroom-concept.png) | 9/10 | 物差し。viewport に主題(灯台・岩・泡・雨)、フルバリューレンジ、pro-tool ガーニッシュ |
| 1 | MIZU//KOKORO (desktop) | 8/10 | 唯一の完成したビジュアルアイデンティティ。バイリンガル sci-fi-lab タイポと明確なヒーローオブジェクト。ただし exhibit 内 **FPS 欄が「—」で壊れて見える**、モバイルで HUD が非リフロー(6/10) |
| 2 | Ninth Tide Archive | 6/10 | 端正なゲート(タイトル画面)タイポグラフィ。**ただし全キャプチャがゲート止まりで、肝心の音声リアクティブシェーダーの証拠がゼロ** |
| 3 | Glass Optics | 5/10 | ビーム→屈折→コースティクスの光学ストーリーは判読可能。だがステージがデフォルト灰色空間、球体はデバッグワイヤーフレーム然、コースティクスが弱い。**チップの「1 FPS」表示はローンチブロッカー**(計測アーティファクトか実性能か要切り分け — 要確認) |
| 4 | Voxel Water(フラッグシップ) | 2/10 | コンセプトから最遠。焦点なし、天候ストーリーテリングなし、シームアーティファクトあり。旧 v2 ビルド(TRON 調、28 FPS)は 5/10 で、**直近の palette/camera パスで維持すべきコントラストを失った**逆行の疑い |

**Voxel Water の具体的欠陥**(水 room カルテと共有すべき事実だが、シェル評価の文脈でも重要):
- Clear/Rain は水・ストライプ帯・空が数バリューステップ内に収まるほぼ単色フィールド。Rain 状態に**雨が描かれていない**(ヒューシフトのみ、サムネイルテスト不合格)。
- Storm の雲は無テクスチャの矩形バー、飛沫は 1px 白スペックル — プレースホルダーに見える。
- palette-camera キャプチャではフレームの 60–80% が無情報の前景で、興味は水平線の細帯に圧縮 — 構図比率が逆。
- **縦シームアーティファクト**(Clear でシアンの縦線、Storm で赤みの縦線)が「final」QA 画像に写っている。

**FPS 表示の信頼性問題**(シェル管轄): チップの公開実測は Glass Optics 1 FPS / Voxel Water 15–28 FPS / MIZU//KOKORO はダッシュ、対してコンセプトは 60 FPS / 16.7 ms を掲示。計測バグか実性能かに関わらず、**公開ステータスチップとしての信頼性毀損**であり、ヘッドレスキャプチャ環境での値か実機値かの切り分けが必要(要確認)。

**モバイル**: Voxel Water は canvas が特徴のない細帯なのに約 15 個のスライダーがスクロールの約 7 割を占有 — プロダクトショットが自分のコントロールに従属している。embedded 2 室の canvas 内 HUD は非レスポンシブ(MIZU のタイトルプレートがオーブに被り、フェーズカードのサブラベルが欠け、Ninth Tide のサブタイトルは 'THE SHORELESS / LAYER' と不格好に折り返し)。

---

## 調整候補の種(チケット化候補)

### P1 — 信頼性・契約・公開品質に直結

- **FPS 表示の信頼性回復** → チップの 1 FPS / 15 FPS / ダッシュ表示の原因切り分け(ヘッドレス Chromium での計測アーティファクトか実性能か — 要確認)。実性能なら最適化、計測系ならヘッドレス時の表示抑制やウォームアップ後計測を検討。drawCalls の「直近フレームスナップショット」も平均系に統一。
- **persistent renderer 契約の解消** → renderer を routing より上にホイストして真の単一 renderer + scene スワップにするか、ドキュメント(Locked Decision #3)と RoomRail コピー「Switch rooms without remounting the WebGL shell.」を実態に合わせて修正するか、方針を決める。
- **antialias 属性の canvas 再利用問題** → 訪問順依存の MSAA 不定を解消(room 切替時に canvas を key で張り替える / 属性を全 room で統一 / FBO ベース AA へ移行のいずれか)。
- **context リーク対策** → `renderer.dispose()` に `forceContextLoss()`(WEBGL_lose_context)を併用し、live context 上限接触を防ぐ。
- **water-qa の baseUrl 不整合修正** → デフォルトを visual-smoke と同じ `http://127.0.0.1:4173/ShaderDemoRoom` に揃える(現状 `pnpm qa:water` 素実行は 404)。
- **i18n バイパス撤去** → 'Loading renderer' / `Loading {room.id}` / 'Storm preset' / 'Calm preset' を `t(key)` 化。同時に water-qa.mjs のボタンセレクタを data-testid 等ロケール非依存に移行(ローカライズで QA が壊れる結合を切る)。

### P2 — コンセプトとの体験差・ガバナンス

- **プロツール・ガーニッシュの復元** → コンセプトの telemetry ストリップ(FPS/Frame Time スパークライン、Draw Calls、Triangles、Uniforms、Textures、VRAM)を段階導入。gizmo cube / minimap / カメラデバッグ読み出しは room 種別ごとに要否を判断。現状 2 チップとの落差が「pro tool」感の最大の欠落要因。
- **CI 検証の拡充** → `pnpm lint` と qa:visual を CI に追加(ヘッドレス GL は SwiftShader/ANGLE で)。water-qa のレポートのみメトリクス(toonBandSeparation / cyanBias 等)にプリセット別バジェットを設けて assert 化。
- **依存ピンの正常化** → `"latest"` ピンをキャレット範囲の明示バージョンへ(特に three のメジャー跳ね対策)。
- **アクセント色のトークン統合** → `#ff56d8` / `#79ead9` を tokens.css に昇格し、`#79ead9` と `--teal #5af2d1` の近似重複を解消(統一 or 意図的差別化の明文化)。
- **ニアブラック統一** → `0x070b10` / `#06090e` / `#02070d` を単一トークンに集約し、ロード時のシーム/フラッシュを排除。
- **設定と locale の永続化** → settingsByRoom の URL(hash query)シリアライズと locale の localStorage 永続化(static ホスティングの Locked Decision と整合)。共有可能なアートディレクション状態にもなる。
- **defaultPreset の参照共有排除** → 初期化/リセット時に deep copy、型に readonly を付与。
- **モバイルの比率逆転** → canvas スライスを主役に(sticky viewport 等)、約 15 スライダーはプリセット先行 + 折りたたみへ。embedded HUD のレスポンシブ化は各 room 側チケットだが、シェルから viewport 幅を iframe に伝えるシームの検討はシェル管轄。
- **アクセシビリティ** → aria-label / iframe title を `t(titleKey)` に。`--subtle` 11px のコントラストを WCAG/APCA で再検証。

### P3 — 品質負債・小粒

- **prefers-reduced-motion の runtime 貫通** → RoomRuntimeContext に reducedMotion フラグ(または振幅係数)を追加し、room が振幅を落とせる契約を作る。
- **iframe allow 最小化** → microphone は ninth-tide-archive のみに限定。
- **ShaderCanvas.test.ts の挙動テスト化** → raw-source 文字列テストを、delta クランプと pixelRatio ポリシーを実際に検証するユニットテストへ置換。
- **QA カバレッジ拡張** → visual-smoke にモバイル glass-optics、inspector スクロール、コントロール操作、Ninth Tide の**ゲート通過後**キャプチャを追加(現状シェーダー本体の視覚的証拠がゼロ)。
- **dead code 掃除** → `isRoomId` の未使用 export 整理。untracked `ref/` ディレクトリの棚卸し(要確認: 保持意図の有無)。
- **'ja' locale の意思決定** → i18n テストにのみ存在する第三 locale を正式サポートするか、テストを en/zh-CN に整理するか決める。
- **コピーレジスターの整合** → ネイティブ 2 室(スペックシート調)と embedded 2 室(計器ログ調)の文体分裂を、意図的コントラストとして明文化するか統一するか判断。

---

## 重要ファイル

| ファイル | 役割 |
|---|---|
| `F:\WorkSpace\ShaderDemoRoom\src\shared\three\ShaderCanvas.tsx` | レンダラーライフサイクルの核心(2 effect 構成・pixelRatio ポリシー・FPS 集計) |
| `F:\WorkSpace\ShaderDemoRoom\src\app\ShowroomPage.tsx` | settingsByRoom 状態フロー・HUD・stage 分岐 |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\registry.ts` | room 定義・アクセント色・dynamic import |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\types.ts` | RoomRuntime / RoomDefinition 契約 |
| `F:\WorkSpace\ShaderDemoRoom\src\shared\i18n\index.ts` | 全コピーのカタログ(en / zh-CN) |
| `F:\WorkSpace\ShaderDemoRoom\src\styles\tokens.css` | デザイントークン |
| `F:\WorkSpace\ShaderDemoRoom\src\styles\app.css` | シェルレイアウト・空気感・ブレークポイント |
| `F:\WorkSpace\ShaderDemoRoom\src\shared\embedded\EmbeddedExhibitFrame.tsx` | iframe 埋め込みと reloadToken リマウント |
| `F:\WorkSpace\ShaderDemoRoom\src\rooms\embedded\EmbeddedControls.tsx` | embedded 3 ボタン Controls ファクトリ |
| `F:\WorkSpace\ShaderDemoRoom\src\shared\ui\ControlPrimitives.tsx` | 共有コントロールプリミティブ |
| `F:\WorkSpace\ShaderDemoRoom\scripts\water-qa.mjs` | 水 QA(メトリクス算出、baseUrl 不整合あり) |
| `F:\WorkSpace\ShaderDemoRoom\scripts\visual-smoke.mjs` | ビジュアルスモーク(4 室スクリーンショット + 3 ハードフェイル条件) |
| `F:\WorkSpace\ShaderDemoRoom\docs\design\showroom-design-framework.md` | 5 つの Locked Decision と Gemini リスクの原典 |
| `F:\WorkSpace\ShaderDemoRoom\docs\design\primary-showroom-concept.png` | ビジュアルの物差し(コンセプト画) |
| `F:\WorkSpace\ShaderDemoRoom\.github\workflows\pages.yml` | CI(test + build のみ、QA なし) |
| `F:\WorkSpace\ShaderDemoRoom\vite.config.ts` | base path 算出(`/ShaderDemoRoom/`) |
