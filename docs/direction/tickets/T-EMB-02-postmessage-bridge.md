# [T-EMB-02] シェル⇔埋め込み展示の postMessage ブリッジ v1 を導入する

- 分類: Platform / TA
- 優先度: P2
- 評価軸: リソースライフサイクル / 埋め込み契約 / telemetry / 決定論 QA
- 依存: T-EMB-01、T-SH-03（いずれも完了済み）

## 現状（2026-07-18 再調査）

- Showroom は room 切替時に active iframe をアンマウントする。旧票の「別 room 閲覧中も iframe が走り続ける」は現 HEAD には該当しない。残る実問題は、active iframe がタブ非表示中も自律ループを継続すること、shell が embedded runtime の状態を観測できないこと、親から決定論的に制御できないことである。
- T-EMB-01 により `ref/` が唯一の編集元となり、`pnpm exhibits:build` が `public/exhibits` を決定論的に再生成する。旧成果物へ降格する runtime fallback は不要で、現在の契約不履行を隠す。
- T-SH-03 の telemetry は native room の renderer stats を表示できるが、embedded 2室は固定ラベルだけだった。embedded runtime は renderer 内部 counter を共有しないため、native `RoomStats` へ optional field を足して擬似的に合流させるべきではない。
- Tide の `?preview=main|opening|ending&section=0..8` とロード前 `window.__NINTH_TIDE_PREVIEW__` / `__NINTH_TIDE_PREVIEW_SECTION__` は文書化済み standalone QA 契約であり、bridge 導入後も維持する。入力は暗黙 clamp せず厳密に拒否する。
- Reload / Open standalone / Reset は現在の製品操作として維持する。bridge 不在時の代替経路として扱わない。

## 確定スコープ

### 1. 厳密な same-origin protocol v1

- envelope は `{ context: 'shader-demo-room', v: 1, instanceId, type, payload }` の exact shape とする。`instanceId` は子 runtime が生成する UUID で、再ロード前の stale message を明示的に破棄する。
- 送信 `targetOrigin` は `location.origin`。受信は `event.origin === location.origin` と exact `event.source` を検査する。異なる origin/source は無視し、正しい source から来た未知 type・余剰 field・不正値は bridge error とする。
- 子→親は `ready { capabilities }` と `stats { fps, frameTimeMs, frameCount, paused }`。capabilities は canonical order の exact list とし、room registry の required 宣言と一致しなければ失敗する。
- 親→子は `set-paused`、Orb の `set-orb-mode` / `set-orb-quality`、Tide の `set-tide-preview`。素材パラメータ、freeze、作品内 UI 状態は v1 に含めない。
- 親は ready 前 command queue や replay を持たず、ready 後に現在の desired visibility state だけを送る。15秒以内に ready が来なければ telemetry に bridge unavailable を明示し、旧 bundle / reload-only fallback は行わない。

### 2. 子 runtime の pause ownership

- pause は `documentHidden || hostPaused` の合成状態とする。一方の resume が他方の pause reason を上書きしてはならない。
- pause 時は scheduled rAF を cancel し、Orb は実際に running だった AudioContext、Tide は再生中 media element と AudioContext を停止する。resume は pause 前に running だった対象だけを再開し、timer / delta sample を reset して時間ジャンプを防ぐ。
- standalone でも `visibilitychange` を自律処理する。`window.parent === window` では message listener / ready event を作らず、従来の直接操作と URL/global preview 契約を維持する。

### 3. shell telemetry と QA

- `EmbeddedRoomStats` を native `RoomStats` と分離する。embedded telemetry は実測 FPS / frame time の2指標、live / paused、raw QA JSON を表示し、存在しない draw calls / triangles / textures を捏造しない。
- telemetry identity は `roomId + location.key + reloadToken` とし、iframe 再ロード後に旧 instance stats を再利用しない。
- `qa:exhibits` は実 production iframe を通して capability、Orb 4 mode / 3 quality、Tide 9 section、通常 pause、快速 pause/resume 競合、Page Visibility event seam、instance preservation、standalone URL / keyboard / freeze、console error 0 を hard assert する。
- `qa:visual` は embedded 2室で bridge ready と live telemetry を待ち、desktop/mobile とも2個の実測 metric を要求する。Pages CI は visual QA の前に `qa:exhibits` を実行する。

## 受け入れ基準

- 両展示が exact capability 付き ready を送り、0.5秒程度の cadence で finite/non-negative stats を shell に供給する。embedded telemetry は live / paused / unavailable を明示する。
- `set-paused(true)` 後は frameCount が停止し、`false` 後に再増加する。タブ visibility と host pause は独立 reason として合成される。active audio/media は pause/resume lifecycle に従う。
- Orb 4 mode / 3 quality と Tide section 0..8 を再マウントなしに指定できる。stale instance、異 origin、異 source は現在の runtime を変更しない。
- standalone Orb の4相・freeze、Tide の `?preview=` 9章と load-time globals は維持される。不正 preview mode / section は fail fast する。
- bridge timeout / schema / capability mismatch は明示的 error となる。compatibility alias、silent fallback、旧 bundle 降格、ready command queue は存在しない。
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` / exhibit sync / production `qa:exhibits` / `qa:visual` / `qa:water` / `git diff --check` が通る。

## 参照

- [HTML cross-document messaging](https://html.spec.whatwg.org/dev/web-messaging.html)
- [HTML MessageEvent](https://html.spec.whatwg.org/multipage/comms.html#the-messageevent-interface)
- [MDN Window.postMessage security concerns](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns)
- [HTML Page Visibility](https://html.spec.whatwg.org/multipage/interaction.html#page-visibility)
- [Web Audio `AudioContext.suspend()`](https://www.w3.org/TR/webaudio-1.0/#dom-audiocontext-suspend)
- [HTML media `pause()`](https://html.spec.whatwg.org/multipage/media.html#dom-media-pause-dev)

## 完了レポート（2026-07-18）

### 判断と境界

- 現 HEAD の mount lifecycle を追跡し、room 切替は既に iframe 破棄で安全と確認した。本票は active iframe の visibility、省電力、shell observability、QA control seam に集中した。
- T-EMB-01 の source ownership を前提に、古い成果物への降格を削除した。bridge 契約が満たせない場合は telemetry error を表示する単一経路とした。
- native / embedded telemetry は意味の異なるデータ型として分離し、embedded 側は実在する2指標だけを表示する。作品内素材 control は bridge に漏らしていない。
- Tide の文書化済み standalone URL/global preview は現在の外部 QA 契約として保持し、従来の clamp / unknown mode 受容は strict validation へ改めた。

### 実装

- shell に strict parser / command creator / capability contract と instance-aware `EmbeddedExhibitFrame` を追加し、registry で2展示の required capabilities を宣言した。
- Orb / Tide の ref source に ready/stats、command mapping、合成 pause reason、rAF cancellation、desired-state + persistent ownership による audio/media suspend/resume、standalone visibility lifecycle を実装し、生成物を `public/exhibits` へ再ビルドした。快速 pause/resume と paused 中の media start でも intent を失わない。
- Showroom と TelemetryPanel に embedded 専用 state / raw JSON / live-paused-error 表示を追加し、locale catalog と responsive 2-column metric layout を更新した。
- unit/component tests、production `qa:exhibits`、`qa:visual`、Pages workflow を恒常 gate として更新した。

### 検証

- `pnpm lint` / token lint、`pnpm typecheck`、23 files / 100 tests、`pnpm build`: pass。
- production `qa:exhibits`: exact capability handshake、Orb 4 mode / 3 quality、Tide I–IX、両 runtime の通常/快速交錯 pause-resume と synthetic hidden-visible event frameCount、iframe instance preservation、standalone 9章 / Orb freeze、console error 0。Orb は意図的な約80ms cadence で `5.29 FPS / 188.9ms` を報告し、simulation delta clamp ではなく wall-clock 実測であることを確認。Orb SoundField intent=`true`、Tide は paused 中に開始した media が resume 後 `PLAYING` へ復帰した。
- production `qa:visual`: 14 screenshots、embedded desktop/mobile metric count=2、console error 0、mobile overflow 0、HUD overlap 0。既存 i18n persistence と Ninth paired luma 3 region も gate 内。
- production `qa:water`: frameCount 8、meanDelta 3.182、waterCoverage 1、既存 color / motion / structure gate を通過。
- 独立审查は protocol / React lifecycle / stale instance、wall-clock stats、快速 pause race、AudioContext/media ownership と non-Abort rollback、ref→public / QA gate を delta review し APPROVE（P0–P2 なし）。headless CI の visibility は synthetic event seam の検証であり、OS の実タブ伝播そのものは非阻塞 residual とした。
- Linux CI と Windows worktree の CRLF 差で source map の `sourcesContent` だけが変動することを検出し、runtime bundle/hash を変えず LF canonical source map を commit した。CI の ref→public check は同一 canonical artifact を検証する。
