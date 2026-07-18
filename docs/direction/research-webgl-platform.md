# 調査レポート: WebGLプラットフォーム / シェル基盤

- 対象: ShaderDemoRoom 共有シェル(レンダラーライフサイクル、デザイントークン、QA基盤、埋め込みiframe、依存管理)
- 前提制約: GitHub Pages 静的ホスティング / three.js ~0.184 + React 19 + Vite / WebGL2 / 低〜中スペックGPU / スタイライズド・NPR方向
- 調査日: 2026-07-18
- 手法: Web調査(検索16回+一次情報フェッチ6件)。出典が確認できなかった項目はその旨を明記した。

---

## 1. 課題 → 技術のマッピング表

| # | 現状の課題(understand-shell.json の risks より) | 適用技術 | 節 |
|---|---|---|---|
| 1 | `antialias: room.id !== 'voxel-water'` がキャンバス再利用時に無効(コンテキスト属性は初回 getContext でのみ有効) | 真の永続レンダラー(ルーティング上位にホイスト+シーンスワップ)、またはコンテキスト属性に依存しない MSAA(WebGL2 multisampled render target) | §2.1 |
| 2 | `renderer.dispose()` に `forceContextLoss()` が伴わず、shader→embedded→shader 往復で古いコンテキストが GC まで残留(ブラウザ上限 8〜16) | `WEBGL_lose_context` / `forceContextLoss()` を「キャンバスを二度と使わない時だけ」呼ぶ規約 | §2.2 |
| 3 | voxel-water の 0.6x 内部解像度がブラウザの素朴なCSSアップスケールに依存し、エッジがにじむ/ちらつく | FSR 1.0 (EASU+RCAS) の WebGL 移植 / CAS シャープンのみ / `image-rendering: pixelated`(整数スケール) | §2.3 |
| 4 | 部屋アクセント #ff56d8 / #79ead9 が registry.ts だけに存在しトークンから漂流。--subtle #647883 の 11px テキストがコントラスト境界 | 2層トークンモデル(primitive+semantic)、ビルド時コントラスト検証、APCA 目標値(小型テキスト Lc 75〜90) | §2.4 |
| 5 | prefers-reduced-motion が CSS トランジションのみで、WebGL ループは全振幅で動き続ける | matchMedia ランタイム検知 → RoomRuntime への `motionScale` 伝搬契約(iframe へは postMessage) | §2.5 |
| 6 | CI は test+build のみ。qa:visual / qa:water は手動、water-qa のメトリクスは report-only | Playwright + GitHub Actions(SwiftShader 前提のベースライン運用、しきい値設計、メトリクスのバジェット化) | §2.6 |
| 7 | settingsByRoom はセッション内のみ保持。アートディレクション状態を共有できない | ハッシュ内クエリパラメータへの差分シリアライズ(HashRouter の注意点あり) | §2.7 |
| 8 | iframe に `allow="autoplay; microphone; clipboard-write"` を両展示へ一律付与。制御は reloadToken 全再マウントのみ | Permissions Policy 最小化(部屋ごとの allow)+ postMessage 制御シーム(pause/reset/motionScale) | §2.8 |
| 9 | drawCalls が「0.5秒フラッシュ時点の最終フレーム単一パス」のスナップショットで、マルチパス部屋では不正確 | `renderer.info.autoReset = false` + フレーム末尾 `info.reset()` の集計規約 | §2.9 |
| 10 | package.json がほぼ全依存 "latest"。lockfile 再生成で three のマイナー(=破壊的)ジャンプが起こりうる | three.js のリビジョン制を踏まえたピン戦略(^0.184.0 は実質パッチ固定)+ 更新ボットと視覚QAゲートの組合せ | §2.10 |

---

## 2. 各技術の詳細

### 2.1 WebGLコンテキスト属性の不変性と「真の永続レンダラー」設計

**仕様の確認(裏付け済み)**
- WebGL 仕様: WebGLContextAttributes は **最初の getContext 呼び出しでのみ使用され**、作成後にドローイングバッファの属性を変更する手段は提供されない。2回目以降の getContext に渡した属性は完全に無視される。
- WebGL 1.0 では depth/stencil/antialias は「要求」であり保証されないが、**WebGL 2.0 では実装が従わなければならない**(作成時に限る)。
- 実際に得られた属性は `gl.getContextAttributes()` で確認できる(MDN)。

**現状への含意**: ShaderCanvas は同一 canvas 上でレンダラーを部屋ごとに作り直すため、`antialias: room.id !== 'voxel-water'` は最初に訪れた部屋の値で固定される。訪問順によって glass-optics が MSAA なし/voxel-water が MSAA ありになる不具合は仕様通りの挙動であり、確定バグ。

**設計パターン(three.js 公式マニュアル「Multiple Scenes」より)**
- ブラウザのコンテキスト上限(マニュアルは「約8。9個目を作ると最古が失われる」と記述)と、**コンテキスト間でリソース共有が一切できない**(モデル・テクスチャの二重ロード、シェーダの二重コンパイル)ことを理由に、**1つの canvas + 1つの WebGLRenderer + 複数 Scene** を推奨。
- 手法は (a) フルウィンドウ canvas + シザーテスト+仮想ビューポート、(b) オフスクリーン canvas に描いて 2D canvas へ copy(毎フレームコピーで遅い)の2種。本件は同時表示不要なので、単純に「1レンダラーを App レベルで生成し、部屋切替はシーン/ルーチンの差し替えのみ」で足りる。
- react-three-fiber でも Canvas アンマウント時の renderer 破棄が「Context Lost」警告を生む既知問題があり(issue #2655)、ルーティングをまたぐ永続 canvas はコミュニティで確立した要求。

**MSAA を属性に依存させない方法**: WebGL2 なら `WebGLRenderTarget` に `samples: 4` を指定したマルチサンプル FBO へ描画してから blit する構成にすれば、コンテキスト属性の antialias に一切依存せず部屋ごとに AA を切り替えられる(three.js 0.13x 以降の標準機能。voxel-water は AA なし+低解像度、glass-optics は samples:4、をレンダラー再生成なしで実現できる)。※この段落の three.js API 自体は一般知識であり、今回の検索では個別出典を取っていない。

**コスト/リスク**: レンダラーのホイストは ShaderCanvas の2エフェクト構造の書き換え(中規模リファクタ)。レンダーターゲット経由の描画はフルスクリーンパス1枚分のオーバーヘッドが載るが、§2.3 のアップスケール改善と同じ FBO を共用すれば実質無料。

**出典**
- https://registry.khronos.org/webgl/specs/latest/1.0/ (5.2 WebGLContextAttributes)
- https://registry.khronos.org/webgl/specs/latest/2.0/
- https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes
- https://threejs.org/manual/en/multiple-scenes.html
- https://github.com/pmndrs/react-three-fiber/issues/2655
- https://discourse.threejs.org/t/changing-renderer-antialias-on-the-fly/16259

### 2.2 WEBGL_lose_context / forceContextLoss の SPA ベストプラクティス

**確認できた事実**
- MDN WebGL best practices: 「そのキャンバスの描画結果がもう不要だと確定したら、`WEBGL_lose_context` で **積極的に(eagerly)コンテキストを失わせることを検討せよ**。ページ遷移時には不要(そのためだけに unload ハンドラを足すな)」。
- three.js 本体は一度 `renderer.dispose()` 内で自動 forceContextLoss する変更(PR #17588)をマージしたが、**Editor の Play/Stop や react-three-fiber で「loseContext: context already lost」エラーを起こして PR #19022 でリバート**された。現在の公式推奨は開発者が明示的に `renderer.dispose(); renderer.forceContextLoss();` を呼ぶこと。ただし loseContext は即座にキャンバスを空(いわゆる sad canvas)にするので、**そのキャンバスを二度と再利用しない場合に限る**。
- ブラウザのライブコンテキスト上限: Chrome はレンダープロセスあたり約16(超過で「Too many active WebGL contexts. The oldest context will be lost.」、最古のコンテキストが失われる)。Chrome 69 から `--max-active-webgl-contexts` フラグで変更可能だが開発用であり、引き上げの計画はない。Firefox はデスクトップ16 / Android 8。three.js マニュアルは安全側に「約8」と記述。**設計上は 8 を上限と見なすのが安全**。

**現状への含意**: shader→embedded→shader と往復するたびに ShaderCanvas がアンマウントされ、古い canvas のコンテキストが GC まで残る。§2.1 の永続レンダラー化が本命の解決だが、それまでの暫定策として「ShaderCanvas のクリーンアップで、**canvas ごと破棄される場合のみ** `forceContextLoss()` を追加」が正しい。同一 canvas を次の部屋が再利用する場合に呼ぶと、再利用側が失われたコンテキストを掴む(または context already lost エラー)ので呼んではならない — 現状の実装ではアンマウント時=canvas破棄時なので安全に追加できる。

**コスト/リスク**: 数行の変更。リスクは「呼んではいけない場面で呼ぶ」ことのみで、React の cleanup(canvas が DOM から外れるタイミング)に限定すれば安全。

**出典**
- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
- https://github.com/mrdoob/three.js/pull/17588 (マージ後リバートの経緯と推奨パターン)
- https://github.com/mrdoob/three.js/issues/27100
- https://issues.chromium.org/issues/40939743 / https://issues.chromium.org/issues/40543269 (Chrome の16上限と設定フラグ)
- https://bugzilla.mozilla.org/show_bug.cgi?id=1421481 (Firefox モバイル上限)
- https://threejs.org/manual/en/multiple-scenes.html

### 2.3 低内部解像度(0.6x)からのアップスケール品質改善

**確認できた事実**
- MDN best practices 自体が「小さいバックバッファに描いて拡大するのは品質と速度の一般的なトレードオフ。canvas.width/height を減らし CSS サイズは一定に保て」と明記 — 現行アプローチの方向性は正しい。改善余地は「拡大の質」にある。
- 選択肢A: **`image-rendering: pixelated`**(nearest neighbor)。MDN の「Crisp pixel art look」が公式解説。WebGL キャンバスにも効く。ボクセル美学とは相性が良いが、**1ソースピクセル→整数ブロックに写像されないと汚くなる**ため、0.6x のような非整数スケールでは不揃いなブロックが出る。採用するなら内部解像度を 1/2(0.5x)など整数比にスナップする設計とセット。
- 選択肢B: **FSR 1.0 (EASU + RCAS)**。空間アップスケーラで、フレーム履歴・モーションベクタ・深度が不要 — 静的ホスティングの単純なレンダリングループに載せやすい。必ず2パス構成(EASU=拡大、RCAS=拡大後のシャープン)。WebGL 移植の実績あり: Shadertoy 移植(stXSWB)、最適化版(sl3cz8、EASU 12タップ+RCAS 5タップ=計17サンプルで「他の32+タップのアップスケールシェーダに比べ安価」)、WebGL 実装例リポジトリ(Hajime-san/web-fsr)。AMD 公式のスケール段階では Quality=0.67x、Balanced=0.59x であり、**0.6x はまさに想定レンジ内**。シャープネスは renderScale を下げるほど上げるが、過剰シャープに注意。
- 選択肢C: **バイリニア+CAS(シャープンのみ)**。RCAS/CAS 単パスをフル解像度で1回。トゥーンのフラット塗り+ステップ境界には効果が出やすく、実装が最小。Godot 向け CAS 移植など参照実装あり。
- 補助知見: FSR/NIS のオーバーヘッドは「画面中央のみ高価なアルゴリズム、周辺は安価なバイリニア」という固定フォビエーション的ハイブリッドで軽減できる(openvr_fsr の実運用知見)。
- devicePixelRatio 由来のモアレ対策として、CSS の top/left に非整数値を使って canvas をデバイスピクセル整数位置に「プリスナップ」するテクニックが MDN にある。

**コスト/リスク**: B/C はフル解像度での追加パス1〜2枚なので、節約したフィルレートの一部を返上する(ただし 17 タップ規模で軽量)。スタイライズド・トゥーンは時間的情報を要求しないため空間アップスケーラと好相性。リスクは高周波ディテール(雨、泡)のシマー増幅と、シャープン過多のリンギング。Aはほぼ無料だが整数スケール制約が UX(ウィンドウリサイズ)と衝突しうる。

**出典**
- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
- https://developer.mozilla.org/en-US/docs/Games/Techniques/Crisp_pixel_art_look
- https://www.shadertoy.com/view/stXSWB / https://www.shadertoy.com/view/sl3cz8
- https://github.com/Hajime-san/web-fsr
- https://jntesteves.pages.dev/posts/amd-fsr-demystified/ (EASU/RCAS 2パス構成の要点)
- https://gpuopen.com/fidelityfx-superresolution/ / https://github.com/GPUOpen-Effects/FidelityFX-FSR/blob/master/ffx-fsr/ffx_fsr1.h
- https://github.com/fholger/openvr_fsr (ハイブリッド最適化の知見)
- https://webglfundamentals.org/webgl/lessons/webgl-qna-how-to-get-pixelize-effect-in-webgl-.html (低解像度FBO→NEARESTで拡大の基本形)

### 2.4 デザイントークンのアクセントカラー統治と APCA コントラスト

**確認できた事実**
- トークン設計の定石は **primitive(生パレット)+ semantic(用途)の2層モデル**。Radix Themes は 25 アクセント×ライト/ダークをこの構造で統治し、「アクセントは同系背景に対し最低限のコントラストテストを常に通る」ことをシステム側で保証する。
- 不透明度バリアントは `color-mix()` や relative color(`oklch(from var(--color) l c h / 50%)`)でランタイム生成する方が、透明度ごとのトークン乱立より綺麗、という整理が現在の主流。現行の `color-mix(in srgb, var(--room-accent), transparent 42%)` はこの流儀に合致しており、**登録すべきは registry.ts に生えている生 hex の primitive 化**。
- ビルド時にコントラスト計算を行い「保証済み前景色ペア」をトークンとして出力するワークフロー(Style Dictionary ベース)が確立している(Always Twisted の連載)。ランタイム CSS での計算より検証可能性が高い。
- APCA(WCAG 3 候補のコントラスト法)の目標値: **非本文テキストで 12px/400 なら Lc 90 が推奨レベル、12–14px のマイクロコピーは Lc 75–90(Gold)を狙う**。ダーク背景に明るいテキストは負の Lc になるので絶対値で読む。WCAG 2 の比率で「紙の上では合格」するダークテーマが実際には濁って見える問題を APCA はより正しくモデル化する。
- 参考(自前概算・出典なし): --subtle #647883 と --bg #06090e の WCAG 2 比はおよそ 4.3:1 で、11px(通常サイズ扱い)の AA 基準 4.5:1 をわずかに下回る。導入判断の前に https://apcacontrast.com/ で実測すること。

**コスト/リスク**: tokens.css への primitive 追加と registry の参照替えは小規模。ビルド時検証は Style Dictionary 等の導入コストがあるが、まずは CI に軽量なコントラストチェックスクリプト(トークンJSON→APCA計算)を足すだけでも漂流を止められる。リスクは低い。

**出典**
- https://deepwiki.com/radix-ui/themes/3.1-color-system-and-design-tokens
- https://www.alwaystwisted.com/articles/a-design-tokens-workflow-part-16
- https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html / https://git.apcacontrast.com/documentation/APCAeasyIntro.html
- https://apcacontrast.com/
- https://netz-barrierefrei.de/en/deep-dive-contrasts.html
- https://www.contentful.com/blog/design-token-system/ (2層モデル)
- https://imperavi.com/blog/designing-semantic-colors-for-your-system/

### 2.5 prefers-reduced-motion の WebGL ランタイム契約

**確認できた事実**
- CSS メディアクエリだけでは JS 駆動アニメーション(スプリング物理、Canvas/WebGL、カーソル追従)を止められない。**`window.matchMedia('(prefers-reduced-motion: reduce)')` の `matches` を読み、`change` リスナーで OS 設定のトグルに即応する**のが確立パターン(web.dev / Josh Comeau)。Comeau は「ページロード済みでもトグルの瞬間にアニメーションを終了させるためにリスナーが必要」と強調し、React では usePrefersReducedMotion フックとしてカプセル化する。
- アニメーションライブラリへは boolean を渡すだけでよい設計(React Spring の `immediate: true` など)— つまり **検知はシェル、解釈は各ランタイム** という責務分割が前例と一致する。
- **注意(出典の限界)**: 「WebGLアート作品では完全停止ではなく振幅減衰にすべき」という規範を明言した一次情報は今回の調査では見つからなかった。web.dev の記事タイトルが示す通り趣旨は "sometimes less movement is more"(動きの削減)であり、振幅減衰契約は本プロジェクトの設計判断として位置づける(展示品が静止画になると鑑賞対象自体が消えるため、削減が妥当という論拠)。

**契約設計の推奨形**: シェルが matchMedia を1箇所で監視し、`motionScale: number (0.15〜1.0)` のような連続値を (a) 各 RoomRuntime へ updateSettings 経由または RoomRuntimeContext 拡張で伝搬、(b) 埋め込み iframe へは postMessage(§2.8 のシームに相乗り)。各部屋は波振幅・雨量・カメラ揺れなど「動き由来」パラメータにのみ乗算し、色や形状には触れない、を規約化する。

**コスト/リスク**: シェル側は小さい。各部屋の対応は部屋ごとの作業だが、契約(型と既定値)だけ先に切れば漸進導入できる。リスクはほぼなし。

**出典**
- https://web.dev/articles/prefers-reduced-motion
- https://www.joshwcomeau.com/react/prefers-reduced-motion/
- https://dev.to/natclark/checking-for-reduced-motion-preference-in-javascript-4lp9
- https://www.letsbuildui.dev/articles/reducing-motion-in-animations/

### 2.6 Playwright + GitHub Actions での WebGL スクリーンショット QA

**確認できた事実**
- GitHub Actions の headless Chromium は既定で **ANGLE + SwiftShader(ソフトウェアレンダラ)** で WebGL を実行する。GPU を使いたい場合は `--use-angle=gl` や headed モード+xvfb、あるいは GPU 搭載ランナーが要る(Dave Snider が GPU-powered Actions runner での実測を公開)。逆に言えば **`--use-gl=swiftshader` を明示すればローカルと CI で同じソフトウェアレンダラに固定でき、決定性が上がる**。
- SwiftShader は実GPUと出力が微妙に異なるため、**ベースライン画像はテストを実行するのと同じ CI 環境で生成する**のが公式ガイダンス(「OS・設定・ハードウェア・電源(バッテリー/AC)・headless か否かでレンダリングは変わる。一貫したスクリーンショットにはベースライン生成環境で実行せよ」)。スナップショット名にはブラウザ+OS が自動で付く(chromium-linux 等)。
- SwiftShader ではキャンバス初期化が遅くタイムアウト起因のフレークが出るため、タイムアウト増とリトライが必要という実務報告あり。
- しきい値の3点セット(pixelmatch ベース): `threshold` = ピクセル単位の YIQ 色距離許容(0〜1、既定 0.2)/ `maxDiffPixels` = 絶対画素数 / `maxDiffPixelRatio` = 画面比。実務コンセンサスは「単一のグローバル値を追わずケースごとに調整。**0.01(1%)程度の maxDiffPixelRatio が AA 差分を無視しつつ実回帰を捕まえる出発点**」。フレーク源トップ3は CSS アニメーション・動的コンテンツ・環境差で、対策は `animations: 'disabled'`、`mask` オプション、CI でのベースライン生成。
- アニメーションし続けるシェーダーには画素比較より **領域メトリクス(既存 water-qa の luma/hue/バンド分離)をバジェット範囲でアサートする方が本質的**。これは一般記事にはない本リポジトリの資産であり、report-only から assert への昇格が正しい投資。決定性を上げるには「経過時間を固定する QA フック(例: URL パラメータで elapsed を固定)」をシェルに設けるのが有効(§2.7 の URL シリアライズと同じ仕組みで実装できる)。※この最後のフック設計は本調査の提案であり外部出典はない。

**コスト/リスク**: CI へ qa:visual を足すとワークフロー時間+2〜4分程度(preview サーバ起動+8ページ訪問)。SwiftShader は低速なので settle 時間を CI では長めに。リスクはフレークによる赤化で、まず「コンソールエラー+レイアウト検査のみ CI 必須、画素/メトリクス比較は警告」から始め、安定を確認してから昇格させる段階導入が安全。

**出典**
- https://www.createit.com/blog/headless-chrome-testing-webgl-using-playwright/
- https://davesnider.com/posts/gputests
- https://blog.promaton.com/testing-3d-applications-with-playwright-on-gpu-1e9cfc8b54a9
- https://github.com/microsoft/playwright/issues/11627 / https://github.com/microsoft/playwright/issues/18810
- https://playwright.dev/docs/test-snapshots
- https://barthpaleologue.github.io/Blog/posts/webgl-webgpu-playwright-setup/
- https://bug0.com/knowledge-base/playwright-visual-regression-testing
- https://testquality.com/playwright-visual-regression-guide/

### 2.7 ハッシュルーティング静的サイトでの設定 URL シリアライズ

**確認できた事実**
- 「URL を状態コンテナにする」定石: **ページの見え方に影響する状態(フィルタ、プリセット、テーマ等)だけを載せる**。共有・ブックマーク・リロード耐性が得られ、localStorage やサーバ不要 — 静的ホスティングのロック済み決定と完全に整合する。秘密情報は載せない。**状態⇄URL の双方向同期**を確立して古い値の使用を避ける。
- HashRouter 固有の罠(重要): `#/room/x?weather=storm` のようにクエリを**ハッシュの内側**に置く形になるため、`window.location.search` は常に空。`window.location.search` を読むサードパーティフック(react-use の useSearchParam 等)は壊れる(issue #637)。ハッシュより前に `?foo=bar#/room/x` と置く形は react-router が読まない(issue #9027)。**react-router 自身の useSearchParams / useLocation はルーターがハッシュを解析した内部 location に対して動くので、これを使う限り問題ない**。
- 実装パターン: 配列や複雑値はカンマ区切り・JSON・Base64 など。use-query-params のようなシリアライズ補助ライブラリもあるが、本件の規模なら手書きで足りる。
- 推奨の具体形(本調査の設計提案。一般原則の適用であり、個別出典はなし): (1) **既定値と異なるキーだけを書く差分シリアライズ**(URL が短く保たれ、プリセット進化にも耐える)、(2) パース時は registry の defaultPreset にマージ+min/max クランプで検証、(3) スライダードラッグ中は debounce して `history.replaceState` 相当(react-router の `setSearchParams(..., { replace: true })`)で履歴汚染を防ぐ、(4) 将来のスキーマ変更に備え `v=1` を付ける。

**コスト/リスク**: ShowroomPage の settingsByRoom と URL の同期層(1ファイル追加程度)。リスクは QA スクリプトの URL 前提(water-qa がプリセットボタンをクリックしている)との整合で、逆に URL パラメータ化すれば QA_PRESET をクリックではなく URL で注入でき、i18n によるボタンラベル破壊リスク(既知 risk)も同時に消せる。

**出典**
- https://blog.logrocket.com/query-strings-underrated-using-url-apps-state-container/
- https://alfy.blog/2025/10/31/your-url-is-your-state.html
- https://github.com/TanStack/router/discussions/1249
- https://github.com/pbeshai/use-query-params
- https://github.com/streamich/react-use/issues/637 / https://github.com/remix-run/react-router/issues/9027

### 2.8 iframe permission policy 最小化と postMessage 制御シーム

**確認できた事実**
- Permissions Policy の原則は最小権限: 「機能ごとに、直接必要でないものはすべてブロックする。埋め込みコンテンツが権限を悪用しないことを盲信する必要がなくなる — そもそもアクセスできないのだから」(web.dev)。`allow` 属性は iframe 単位で機能を絞る第一の制御点。Chrome/MDN のガイドはレスポンスヘッダでの明示も推奨するが、**GitHub Pages はカスタムレスポンスヘッダを設定できない静的ホスティングなので、本件では `allow` 属性が唯一の制御点**(この制約はプラットフォーム仕様として広く知られるが、今回の検索では Pages ヘッダ制限の一次情報は取得していない)。
- 現状の一律 `allow="autoplay; microphone; clipboard-write"` は、マイクを使うのが **anime-liquid-orb のみ**(ref/mizu-kokoro-2-source/src/main.js:1797 の getUserMedia。ninth-tide-archive はマイク完全不使用)である以上、最小権限違反。**registry の RoomDefinition('embedded')に `allow` フィールドを持たせ、部屋ごとに宣言する**のが自然な着地。clipboard-write は両者とも不要なら削除。〔訂正 2026-07-18: 初版は orb/tide のマイク使用を逆に記載していた。正は T-EMB-03 チケットの grep 証拠〕
- postMessage の定石: 送信時は `targetOrigin` にワイルドカード `*` を使わず正確なオリジン(同一オリジンなら `window.location.origin`)。受信時は必ず `event.origin` を検証。メッセージは必要最小のデータに絞り、受信データは信頼せず検証する。
- 制御シームの価値: 現状の reloadToken 全再マウントは (a) 展示内部の状態を全喪失、(b) iframe の新コンテキスト生成でコンテキスト上限消費に寄与する。`{type: 'pause'|'resume'|'reset'|'motionScale'|'locale', payload, v:1}` 程度の小さなプロトコルを敷けば、再マウントなしのリセット・§2.5 の reduced-motion 伝搬・ロケール同期が1本のシームに載る。

**コスト/リスク**: allow の部屋別化は小変更で即効。postMessage プロトコルは exhibit 側(public/exhibits の各ランタイム)への受信実装が必要で、対応していない exhibit へはフォールバック(従来の再マウント)を残す設計にする。リスクは低いが、プロトコルのバージョン管理を最初から入れておくこと。

**出典**
- https://web.dev/articles/sandboxed-iframes
- https://developer.chrome.com/docs/privacy-security/permissions-policy
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy
- https://www.secureideas.com/blog/being-safe-and-secure-with-cross-origin-messaging
- https://bindbee.dev/blog/secure-cross-window-communication

### 2.9 renderer.info による draw call / FPS 計測の正確な取り方

**確認できた事実**
- three.js 公式: `renderer.info` のフレーム系統計は **既定(autoReset=true)では render() 呼び出しごとにリセット**される。ポストプロセッシング等でフレームあたり複数パスを描く場合、そのまま読むと「最後のパスの数値」しか得られない。正しくは `renderer.info.autoReset = false` にし、**フレームを描き終えた時点で読み取ってから `renderer.info.reset()` を1回呼ぶ**。これがコンポーザーやリフレクタ使用時に正しい info を得る公式パターン(docs / PR #12429 / フォーラム)。
- 現状の HUD は「0.5秒ごとのフラッシュ時点における直近 render() の calls」なので、(a) マルチパス部屋では過少報告、(b) 平均化された FPS と瞬時値の calls が並ぶ表示上の不整合がある(既知 risk と一致)。
- シェル実装の推奨形: フレームループを `runtime.render(frame)` → `calls = renderer.info.render.calls` を毎フレーム蓄積(平均と最大を保持)→ `renderer.info.reset()` の順に変更し、autoReset=false はレンダラー生成直後に設定。RoomRuntime 契約に「rooms は info.autoReset / reset() に触れない」を明記する。HUD には平均 calls(または avg/max 併記)を出せば FPS と整合する。
- GPU 時間の直接計測は WebGL2 では `EXT_disjoint_timer_query_webgl2` に依存するが対応状況が不安定(ベンダ・時期により無効化)なので、標準機能としては CPU 側フレームタイム(ms, 平均/p95)の併記が現実的。※この拡張の可用性変遷は一般知識で、今回の検索では一次情報を取得していないため、導入するなら実機で feature-detect すること。

**コスト/リスク**: ShaderCanvas のループ数行の変更で、リスクはほぼない。唯一の注意は部屋側が独自に reset を呼ぶと二重リセットになる点で、契約明記でカバーする。

**出典**
- https://threejs.org/docs/pages/WebGLRenderer.html (info / autoReset)
- https://threejs.org/docs/pages/Info.html
- https://github.com/mrdoob/three.js/pull/12429 / https://github.com/mrdoob/three.js/issues/12420
- https://discourse.threejs.org/t/webglrenderer-info-and-autoreset/91823

### 2.10 three.js "latest" 依存のリスク管理

**確認できた事実**
- three.js は semver ではなく**月次リビジョン制**(r45→r160…を npm 都合で 0.45.0→0.160.0 と表記)。**API はどのリビジョンでも変わりうる**とされ、非推奨コードは約10リリースで削除される。公式に近いガイダンスは「大きなジャンプを避け、r70→r80→r90 のように段階的に上げよ」+ Wiki の Migration Guide 参照。つまり **three にとって「マイナー」は常に「メジャー相当」**。
- semver の規約上も 0.x 系のキャレットはマイナーを跨がない: `^0.184.0` は `>=0.184.0 <0.185.0` に解決されるため、**"latest" を `^0.184.0` に置き換えるだけで実質パッチ固定になる**(0.x のキャレット挙動は npm semver 仕様)。
- ピン戦略の定石(Renovate docs / The Guild): アプリケーションでは依存をピンし、lockfile と併用する。「lockfile はピンと同じ問題を解くのではなく補完する。lockfile があってもピンし、ピンしても lockfile を使う」が通常の推奨。ピンだけして更新を放置すると逆にリスクが溜まるため、**Renovate 等の更新ボットで「小さく・頻繁に・レビュー付きで」上げ、グルーピングやスケジュールで騒音を抑える**のがセット運用。
- 本件の現状は「CI が --frozen-lockfile なので再現性は lockfile が担保、ただし package.json の "latest" は lockfile 再生成・`pnpm up` の瞬間に無検査メジャージャンプを許す」構図。@types/three(^0.184.1)と three 本体のバージョンが独立に動ける点も型と実体の乖離リスク。

**推奨**: (1) three と @types/three を同一リビジョンでピン(`0.184.x` 明示 or `~`/`^` — 0.x ではどちらもパッチ固定)、(2) react/vite など他の "latest" も通常レンジへ置換、(3) Renovate/Dependabot を導入し three の更新 PR には §2.6 の視覚 QA をゲートとして走らせる、(4) three を上げる際は Migration Guide の該当リビジョン差分を確認する運用をドキュメント化。

**コスト/リスク**: package.json の書き換えのみ。リスクはむしろ現状維持側にある。

**出典**
- https://discoverthreejs.com/book/appendix/threejs-versions/
- https://github.com/mrdoob/three.js/wiki/Migration-Guide
- https://discourse.threejs.org/t/three-js-semver-and-addons/45539
- https://docs.renovatebot.com/dependency-pinning/
- https://the-guild.dev/blog/how-should-you-pin-dependencies-and-why

---

## 3. この展示への適用推奨(優先順位つき・具体)

優先度は「正しさの修復 > 契約の整備 > 品質向上」の順。ファイル名は現行実装の該当箇所。

### P0 — 仕様バグと資源リークの修復(小さく確実)
1. **forceContextLoss の追加**(src/shared/three/ShaderCanvas.tsx): エフェクトAのクリーンアップで `runtime.dispose(); renderer.dispose();` の後に `renderer.forceContextLoss();` を追加。ただし §2.2 の通り「canvas が破棄される unmount 時のみ」であることをコメントで明記。同一 canvas 再利用パス(shader↔shader 切替)がレンダラー再生成をやめるまでは、そのパスでは呼ばない。
2. **three / @types/three のピン**(package.json): "latest" 群を実バージョンレンジへ置換。three は `^0.184.0`(=パッチのみ)、@types/three と揃える。lockfile はそのまま。
3. **iframe allow の部屋別化**(src/rooms/types.ts / registry.ts / EmbeddedExhibitFrame.tsx): RoomDefinition('embedded') に `allow: string` を追加し、anime-liquid-orb は `"autoplay; microphone"`(マイク駆動機能あり)、ninth-tide-archive は `"autoplay"` に。clipboard-write は両方から削除。〔訂正 2026-07-18: 初版は両者の allow 値を逆に処方していた〕

### P1 — 永続レンダラー化(ロック済み決定#3 を実装に一致させる)
4. **レンダラーを ShowroomPage(またはその上)へホイスト**し、部屋切替は「runtime の dispose → 新 runtime 生成」だけにする。canvas と WebGLRenderer は 1 個を生涯保持(three.js マニュアルの単一コンテキスト推奨に一致)。antialias はコンテキスト属性で持たず、**AA が欲しい部屋(glass-optics)は `samples: 4` のマルチサンプル WebGLRenderTarget 経由で描画**するよう RoomRuntime 側の規約にする。これで §2.1 の属性固定バグは構造的に消滅し、コンテキスト残留(§2.2)も発生源ごと消える。埋め込み部屋表示中は shader canvas を display:none で保持し、ループを停止(rAF を止める)する。
5. **renderer.info 集計の是正**(同時に実施が安い): レンダラー生成時 `info.autoReset = false`、ループを render → calls 読み取り(平均/最大蓄積)→ `info.reset()` に。HUD は平均 calls を表示し、契約ドキュメントに「rooms は info を触らない」を追記。

### P2 — 共有・アクセシビリティ契約(シェルの外部インターフェース)
6. **URL シリアライズ**(新規 src/shared/url-state.ts + ShowroomPage): 既定値との差分のみを `#/room/voxel-water?weather=storm&waveHeight=1.4&v=1` の形で保持。読み取りは react-router の useSearchParams(HashRouter 内部 location に対して動作)、書き込みは replace + debounce。パースは defaultPreset マージ+クランプ。加えて QA 用に `qaTime=12.5`(elapsed 固定)を予約キーとして定義し、water-qa のプリセット注入をボタンクリックから URL へ移行(i18n によるセレクタ破壊リスクも解消)。
7. **reduced-motion 契約**: シェルで matchMedia を監視し `motionScale`(reduce 時 0.15 程度、通常 1.0)を全 RoomRuntime に updateSettings で配布。iframe へは postMessage `{type:'motionScale', value, v:1}`。exhibit 側未対応でも壊れない(無視される)片方向設計から始める。
8. **postMessage 制御シーム**(src/shared/embedded/): 同一オリジンなので targetOrigin は `window.location.origin`、受信側は event.origin 検証。`pause/resume/reset/motionScale/locale` をv1とし、reset に応答しない exhibit へは reloadToken 再マウントへフォールバック。

### P3 — 品質向上と QA 恒常化
9. **voxel-water のアップスケール改善**: まず最安の実験として canvas に `image-rendering: pixelated` + 内部スケールの 0.5x スナップを試し、ボクセル美学との整合を目視判断。にじみ・ちらつきが残るなら、低解像度 FBO → EASU → RCAS の2パス(Shadertoy stXSWB / web-fsr 移植参照、17タップ規模)を共有ユーティリティとして実装。P1 の「レンダーターゲット経由描画」と FBO を共用すれば追加コストは最小。効果測定は既存 water-qa の voxelLocalContrast / toonBandSeparation を before/after 比較に流用。
10. **CI に視覚 QA を段階導入**(.github/workflows/pages.yml): まず `--use-gl=swiftshader` を明示した qa:visual(コンソールエラー+レイアウト検査のみ)を PR 必須に。ベースライン画像を使う比較を導入する場合は **CI 上で生成したベースライン**を用い、`maxDiffPixelRatio: 0.01` / `threshold: 0.2` を出発点にケース別調整。water-qa のメトリクスはプリセットごとのバジェット範囲(例: storm の waterCoverage 下限、toonBandSeparation の範囲)を決めて assert へ昇格。あわせて water-qa の baseUrl 既定値を visual-smoke と同じ `/ShaderDemoRoom` 付きに統一。
11. **トークン統治**(src/styles/tokens.css / registry.ts): #ff56d8 → `--accent-magenta`、#79ead9 → `--teal` へ統合(近似重複の解消)または `--accent-mint` として正式登録し、registry は CSS 変数参照に。11px テキスト(--subtle)は apcacontrast.com で実測し、Lc 75 未満なら --subtle を明度アップ(概算では WCAG 2 の 4.5:1 も未達の可能性が高い)。余力があればトークン JSON → APCA 検証の軽量スクリプトを CI に追加。

### 出典が確認できなかった/自前判断として明示した項目
- 「WebGLアートは reduced-motion で停止でなく振幅減衰にすべき」という規範の一次情報(§2.5)
- GitHub Pages がカスタムレスポンスヘッダを設定できない点の一次情報(§2.8。プラットフォーム仕様として広く知られるが今回未取得)
- EXT_disjoint_timer_query_webgl2 の可用性変遷(§2.9)
- --subtle のコントラスト概算値(§2.4。実測必須)
- QA 用 elapsed 固定フックと差分シリアライズの具体形(§2.6/2.7。一般原則からの設計提案)
