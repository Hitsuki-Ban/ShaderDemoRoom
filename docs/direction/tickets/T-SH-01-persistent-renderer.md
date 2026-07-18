# [T-SH-01] WebGLRenderer をアプリ生涯の単一インスタンスへ永続化する

- 分類: TA
- 優先度: P1
- 評価軸: リソースライフサイクル / コントラクト遵守(Locked Decision #3「persistent renderer」との乖離)
- 依存: なし
- 状態: **完了 (2026-07-18)**

## 現状(証拠)

- **renderer がルームごとに再生成される**: `src/shared/three/ShaderCanvas.tsx:43-48` で `new WebGLRenderer({ canvas, antialias: room.id !== 'voxel-water', alpha: false, powerPreference: 'high-performance' })` を effect 内で生成しており、effect の deps は `[onStats, room.id]`(同 116 行)。shader ルーム切替のたびに cleanup(105-115 行)で `renderer.dispose()`(113 行)→ 新規生成が走る。`docs/design/showroom-design-framework.md` の Locked Decision #3「one persistent WebGL renderer」に対し、実際に永続するのは canvas DOM ノードだけ(dossier-shell.md「レンダラーライフサイクル」節・リスク #1)。
- **canvas 再利用で antialias 属性が死ぬ(確定バグ)**: canvas 要素は `ShaderCanvas.tsx:163` に key なしで置かれ、shader ルーム同士の切替では同一 canvas を再利用する。WebGL のコンテキスト属性は最初の `getContext` でのみ有効(WebGL 仕様。research-webgl-platform.md §2.1 で一次情報確認済み)なので、`antialias: room.id !== 'voxel-water'`(45 行)は 2 室目以降サイレントに無視される。訪問順 voxel-water→glass-optics では glass が MSAA なし、逆順では voxel-water が MSAA ありになる(dossier-shell.md リスク #2)。
- **forceContextLoss なしのコンテキスト残留**: cleanup は `renderer.dispose()` のみで `forceContextLoss()` を呼ばない(`ShaderCanvas.tsx:105-115`)。embedded ルーム表示中は `src/app/ShowroomPage.tsx:118-129` の分岐で ShaderCanvas ごとアンマウントされるため、shader→embedded→shader の往復ごとに古い GL コンテキストが GC まで残留し、ブラウザの live context 上限(Chrome 約16 / three.js マニュアルは安全側に約8)に接触し得る(dossier-shell.md リスク #3、research-webgl-platform.md §2.2)。
- **設計判断(ユーザー承認済み)**: renderer はルーティング上位で 1 個生成しアプリ生涯保持。antialias は常時有効で固定し、voxel-water 等の品質差は内部解像度スケーリング(現行 `getRenderPixelRatio` の 0.6x、`ShaderCanvas.tsx:16-21`)で吸収する。

## 問題

「Switch rooms without remounting the WebGL shell.」という自己宣伝(RoomRail コピー)とドキュメント契約に実装が違反しており、その歪みが (1) 訪問順依存の MSAA 不定、(2) コンテキストリーク、(3) ルーム切替ごとのシェーダー再コンパイル/リソース再アップロードという実害として表出している。展示館の土台の信頼性問題であり、後続チケット(T-SH-02/03/04)の前提でもある。

## 改善方向

research-webgl-platform.md §2.1(three.js 公式「Multiple Scenes」の単一 canvas + 単一 renderer + 複数 Scene 推奨)および §3 P1-4 に従う。ただし P1-4 の AA 方式(antialias 属性なし+samples:4 マルチサンプル RenderTarget)は**承認済み設計判断(antialias 常時有効固定+内部解像度スケーリング)で上書きする** — P1-4 からはレンダラーのホイスト構造のみ踏襲。

1. **renderer と canvas をルーティング上位へホイスト**: `src/app/App.tsx` レベル(または App 直下の RendererProvider)で canvas 要素と WebGLRenderer を一度だけ生成し、React context で配布。生成属性は `antialias: true` に固定(初回 getContext で確定するため、以後の品質差は属性で持たない)。ShaderCanvas は「renderer を借りてステージへ canvas をマウントし、ループを回す」薄いホストに書き換える。canvas の DOM 再親付け(appendChild)は WebGL コンテキストを失わない。
2. **ルーム切替はシーンスワップのみ**: 切替時は `runtime.dispose()` → `room.loadScene()` → `createRoomRuntime()` だけを行い、renderer/canvas には触れない。`renderer.dispose()` / `forceContextLoss()` はアプリ終了まで呼ばない(research-webgl-platform.md §2.2 の「二度と使わない canvas に限る」規約により、永続化後は呼ぶ場面自体が消滅する)。
3. **品質差は内部解像度スケーリングで吸収**: `getRenderPixelRatio` の voxel-water キャップは、常時 antialias の実測コストを相殺する 0.55x に較正する。その他 shader room は 2x キャップを維持し、受け入れ基準の FPS / visual / water QA で両方を検証する。
4. **埋め込みルーム表示中の canvas の扱い(推奨方向)**: ShaderCanvas をアンマウントせず **canvas を DOM に維持したまま非表示(`display:none` 等)にし、rAF ループを停止**する。`ShowroomPage.tsx:118-129` の排他分岐を「永続 canvas ホスト+iframe オーバーレイ」の共存構造に再構成する。ループ停止/再開のフックは T-SH-02 の pause/resume 契約に載せる。

## 実装時の決定訂正 (2026-07-18)

起票時の「0.6x を維持すれば antialias 常時有効化のコストは限定的」という予測は、同一の headless Chromium 計測で 16–17 FPS から安定 14 FPS へ落ち、10% 回帰上限を超えたため棄却する。上位の承認済み判断「AA は常時有効、品質差は内部解像度で吸収」と FPS 受け入れ基準を優先し、voxel-water の cap を 0.55 に正式改訂する。

0.55 では同じ 8 サンプル手法で 15 FPS (基線平均 16.625 に対して 9.8% 以内)、実 drawing-buffer ratio 0.5499 を記録した。0.6 の既存 screenshot と 0.55 + AA の最終 screenshot を原寸比較し、輪郭・toon band・UI 合成に有意な劣化なし。`qa:water` も waterCoverage 1、toonBandSeparation 7.841、waterLuma 162.43、hueMean 177.31 を維持した。したがって以下の pixel-ratio 受け入れ値も 0.55 に置き換える。

## 受け入れ基準

- **コンテキスト生成が 1 回**: Playwright の init script で `HTMLCanvasElement.prototype.getContext`('webgl2')呼び出しを計数し、shader↔shader・shader↔embedded を混在させたルーム 20 回切替シナリオでシェル側 canvas のコンテキスト生成が通算 1 回であること(iframe 内 exhibit の生成は除外)。
- **コンテキスト増加ゼロ**: 同シナリオで console に「Too many active WebGL contexts」「THREE.WebGLRenderer: Context Lost」が一度も出ないこと。
- **antialias の訪問順非依存**: voxel-water→glass-optics と glass-optics→voxel-water の両順序で `gl.getContextAttributes().antialias === true` であること。
- **内部解像度ポリシー維持**: voxel-water 表示中 `renderer.getPixelRatio()` が `min(devicePixelRatio, 0.55)`、他 shader ルームで `min(devicePixelRatio, 2)` であること。
- **FPS 回帰なし**: docs/direction/captures/fps-samples-2026-07-18.json と同一手法(headless・入場 2.5s 後から 1s 間隔 8 サンプル)で voxel-water が現行 16-17 FPS から 10% を超えて悪化しないこと。
- **視覚回帰なし**: `pnpm qa:visual` の 3 ハードフェイル条件を全ルームで通過し、`pnpm qa:water`(SHOWROOM_URL 指定)の colorSignature / toonBandSeparation が現行レポートと同水準であること。

## 影響範囲・注意

- **挙動テスト**: 先行 T-QA-01 で旧 `ShaderCanvas.test.ts` の文字列 pin は廃止済み。`renderPolicy.test.ts` で AA 常時有効と 0.55 / 2 の pixel-ratio 契約を挙動として固定する。
- **water-qa.mjs セレクタ**: 'Storm preset' / 'Calm preset' ボタンセレクタ(scripts/water-qa.mjs:320-325)には触れないが、切替構造の変更後に必ず回帰実行すること。
- **runtime 側の dispose は引き続き必須**: renderer が永続化しても、各 runtime の GPU リソース(glass の PMREMGenerator `src/rooms/glass-optics/runtime.ts:94-96` 等)はルーム退出時に dispose する。renderer グローバル状態(info/toneMapping 等)への接触規約は T-SH-02 で契約化する — 本チケットでは既存挙動(`renderer.info.reset()` 呼び出し等)をそのまま残してよい。
- **React StrictMode**: dev では effect が二重実行される。ホイスト後の生成コードは StrictMode 二重マウントで renderer を 2 個作らないこと(生成の冪等化)。
- **renderOrder 連鎖**: 両 shader ルームの renderOrder 連鎖には触れない。シーンスワップ化で描画内容が変わらないことをスクリーンショット比較で確認。

## 完了レポート (2026-07-18)

### 実装

- shell canvas と `WebGLRenderer` を `main.tsx` の React `StrictMode` 外で 1 回だけ生成し、root-level `RendererHostProvider` から配布する構造へ変更した。context 属性は `antialias: true` / opaque / high-performance でアプリ生涯固定し、背景は T-DS-01 の必須 `--bg` token から初期化する。
- `ShowroomPage` は room kind にかかわらず `ShaderCanvas` host を常時マウントする。embedded room では同じ canvas を DOM に保持したまま非表示にし、iframe を重ねる。renderer / canvas は room 切替で dispose・再生成・context loss しない。
- `ShaderCanvas` は provider の canvas を stage mount へ接続し、room 切替時は旧 runtime の dispose → 新 module load / runtime 作成だけを行う。effect-local cancellation と room-aware load state により shader → embedded → 同一 shader、および A → B → A の非同期競合を防止した。
- animation ownership を Three.js 推奨の `renderer.setAnimationLoop()` に統一し、shader room で開始、room 切替 cleanup / embedded room で `setAnimationLoop(null)` と `Timer.dispose()` を実行する。ResizeObserver も active shader の間だけ存在する。
- AA 常時有効化の実測コストを FPS budget 内へ戻すため、上記「実装時の決定訂正」のとおり voxel-water の internal pixel-ratio cap を 0.55 に較正した。他 shader room は 2 の cap を維持する。
- `scripts/renderer-lifecycle.mjs` / `pnpm qa:renderer` を追加した。main frame の `getContext` と animation callback を page script より前に監査し、iframe context を除外した上で canvas/context identity、actual attributes、context loss、pixel ratio、FPS、各切替の loop active/paused を hard-fail 契約にした。

### 検証

- `pnpm test`: 12 files / 44 tests pass (AA 常時有効と 0.55 / 2 pixel-ratio policy を含む)
- `pnpm lint` (token lint を含む) / `pnpm typecheck` / `pnpm build` / `git diff --check`: pass
- `pnpm qa:renderer`: voxel-first / glass-first の 2 順序それぞれで shader / embedded 混在 20 回切替。各切替で shader loop active / embedded loop paused。最終 canvas 1、context 1、identity 不変、WebGL2 actual antialias true、context lost 0、creation/browser error 0。
- drawing-buffer ratio は voxel-water 0.5499、glass-optics 1.0 (deviceScaleFactor 1)。voxel FPS は 8 samples すべて 15、glass は 3–4。voxel は起票時 baseline mean 16.625 から 9.8% 以内の回帰で gate を満たす。
- `pnpm qa:visual`: desktop/mobile 合計 7 capture、console error 0、mobile horizontal overflow 0、scene/HUD viewport overlap 0。0.6 baseline と 0.55 + AA の原寸比較でも輪郭・toon band・UI 合成に有意な劣化なし。
- `pnpm qa:water`: waterCoverage 1、waterLuma 162.55、toonBandSeparation 7.841、voxelLocalContrast 1.835、hueMean 177.30。既存 signature と同水準。
- 独立 explorer / reviewer は renderer ownership、StrictMode、async cancellation、runtime dispose、resize、animation cleanup、QA の mutation seam を復核し、最終 P0–P2 findings なし。production preview 終了後に port 4173 が閉じたことも確認した。
