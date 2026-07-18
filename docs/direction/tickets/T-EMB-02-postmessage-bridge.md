# [T-EMB-02] シェル⇔埋め込み展示の postMessage ブリッジ v1 を導入する

- 分類: Platform / TA
- 優先度: P2
- 評価軸: リソースライフサイクル / コントラクト遵守 / 対応環境(TA軸)— 非表示中も全力レンダ+音声が走り続け、シェル telemetry・QA から埋め込み展示が不可視
- 依存: T-EMB-01(ref/ の版管理+再ビルドパイプライン。両展示の ref 側改修を含むため必須)。関連: T-SH-03(シェル表現層リデザイン — 本チケットが供給する FPS/stats の受け手。D-2 承認済みの前提で、telemetry 表示側の設計は T-SH-03 が持つ)

## 現状(証拠)

- **シェル→iframe の制御チャネルは `?reload=N` による完全再マウントのみ**:
  - `src/shared/embedded/EmbeddedExhibitFrame.tsx:21-28` — `<iframe key={room.id}-{reloadToken} src={...} allow=... allowFullScreen>`。postMessage 送信コードは存在しない。
  - `src/shared/embedded/url.ts:5` — `reloadToken > 0 ? '?reload=N' : ''`。このクエリは両展示の main.js のどこからも読まれない(grep 確認 — キャッシュバスト+key 変更による remount 専用)。
  - `src/rooms/embedded/EmbeddedControls.tsx:36-47` — Reload / Open standalone / Reset の3ボタンのみ。
- **orb(`ref/mizu-kokoro-2-source/src/main.js`)**: rAF ループは `animate()`(2438-2439 行、起動 2523 行)。`visibilitychange` / `message` リスナーは存在しない(grep 確認)。音声は `SoundField`(1785 行)+マイク経路(1797-1798 行)。品質ティアは `applyQuality(level)`(2188 行、high/medium/low)、相切替は `setMode(index)`(1867 行)。FPS は HUD 内で計測されるが外部へ出す経路がない(dossier-anime-liquid-orb.md リスク1「シェル⇔iframe 通信チャネルが皆無」、showroom 統合節「postMessage ブリッジなし。設定転送なし。pause/visibility シグナルなし」)。
- **tide(`ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`)**: rAF ループ 2701-2703 行。`visibilitychange` / `message` リスナーなし(grep 確認)。QA 用の決定論プレビューは URL パラメータ `?preview=main|opening|ending` + `&section=0..8` およびロード前グローバル `window.__NINTH_TIDE_PREVIEW__`(2720-2729 行。previewSection の既定は 2725 行で 4)で注入するが、**親フレームは load 前の contentWindow へ安全に注入する手段を持たない**(dossier-ninth-tide-archive.md リスク11)。音声は `<audio preload="auto">`(index.html:358)。
- **シェル側 telemetry**: embedded ルームでは HUD が "Embedded runtime" / "Standalone exhibit" の固定ラベルのみで FPS/stats を持たない(dossier-shell.md「状態フロー (ShowroomPage)」節)。orb の展示内 FPS 欄は「—」表示(dossier-anime-liquid-orb.md ビジュアル現状評価・デスクトップ弱点2)。
- 関連資料: research-npr-liquid.md §2.9(player.js 型 postMessage プロトコルの実装要点 — 本チケットの設計原典)、同 §1 表 #9、research-webgl-platform.md §2.8(allow 最小化と postMessage 制御シーム、`{type, payload, v:1}` 形式・フォールバック設計)、research-audio-reactive.md の注意(217 行 — ref 改修はビルド+静的プレビュー QA をセットで回す)、review-framework.md ロングリスト AO-2(P2)。

## 問題

シェル状態にかかわらず両展示は自前の rAF と(有効時)音声を走らせ続け、別ルーム閲覧中・タブ非表示・kiosk 放置でバッテリーと GPU 予算を浪費する(orb はアイドル 30s 後の自動相サイクルで音声 ping まで発する — dossier-anime-liquid-orb.md リスク10)。また FPS がシェルへ届かないため、telemetry リデザイン(T-SH-03)は埋め込み2室に対して表示する数値を持たず、QA は tide の章指定を URL 再マウントでしか制御できず orb に至っては決定論フックが皆無。「1つのショールーム」としての統合品質と QA 可能性の両方を制約している。

## 改善方向

research-npr-liquid.md §2.9 の player.js 型プロトコルをそのまま採用する(D-1 fork 運用承認済み — ref 側改修を正面から行う):

1. **プロトコル v1**(research-webgl-platform.md §2.8 の形式と統合):
   - メッセージ形: `{context: 'shader-demo-room', v: 1, type, payload}`。送信 targetOrigin と受信 `event.origin` はともに `location.origin` で検証(same-origin 配信のため)。
   - **ハンドシェイク**: 子は初期化完了時に `ready`(payload: `{capabilities: string[]}`)を親へ送る。親は ready 受信までコマンドをキューし、タイムアウト(例 3s)で ready が来なければ従来の reload-only UI に降格(旧成果物・スタンドアロン互換)。
   - **コマンド(親→子)**: `pause` / `resume`、`setQuality('high'|'medium'|'low')`、QA フック `setPreview({mode, section})`(tide)/ `setMode(0-3)`(orb)。
   - **イベント(子→親)**: `ready`、`stats`(`{fps, frameMs}` を 0.5-1s 間隔 — シェル telemetry / T-SH-03 へ供給)、必要に応じ `state`(orb: mode/freeze、tide: section)。
   - 素材パラメータ(orb の deform/speed 等)は**ブリッジに載せない**。「マテリアル制御は作品内部に残す」という展示思想(i18n runtimeNote、dossier-anime-liquid-orb.md コンセプト節)と両立させる設計判断を v1 の仕様コメントに明記する。
2. **子側(ref 改修、両展示共通の薄いブリッジモジュール)**:
   - `window.parent === window` なら一切のリスナー登録以外を行わず不活性(スタンドアロン非破壊)。親がいても ready 後にコマンドが来なければ完全自律動作。
   - コマンドは既存内部関数への薄い写像に限定: orb は `applyQuality`(2188 行)/ `setMode`(1867 行)/ 新設 `setPaused(bool)`(rAF ループの early-return + SoundField の gain 0 化)。tide は preview 状態注入(2720-2729 行の処理を関数化して再利用)+ `setPaused`(rAF 停止 + audio.pause())。
   - **visibilitychange 連動は子が自律で持つ**(親の助けなしにスタンドアロンでも省電力): `document.visibilitychange` でタブ非表示時に rAF 停止+音声停止、復帰で再開。復帰時のΔt スパイクは両展示既存の `delta clamp 0.05` が吸収する(dossier 両カルテで確認済み)。ビューポート外 iframe 対策の IntersectionObserver は §2.9 記載の二段構えとして任意(シェルは現状ルームを完全に切り替えるため優先度低 — 実装するなら別チケットに切り出し可)。
3. **親側(シェル)**:
   - `EmbeddedExhibitFrame.tsx` にブリッジフック(ready 待ち+コマンドキュー+stats 購読)を追加。stats は ShowroomPage の既存 `onStats` 経路(`{fps, drawCalls}`)へ合流させ、embedded ルームの HUD 固定ラベルを実測 FPS 表示に置換できる状態にする(表示デザイン自体は T-SH-03)。
   - ルーム切替・アンマウント時に `pause` を送る(iframe を DOM に残す設計へ変える場合)。現行はルーム切替で iframe 自体が破棄されるため v1 では「タブ非表示」対応が主戦場であることを README に明記。
   - QA: `scripts/visual-smoke.mjs` / `docs/direction/captures/capture.mjs` が `setPreview` / `setMode` を使って入場後・章別・相別の決定論キャプチャを撮れるようにする(tide の既存 `?preview=` URL 経路は互換維持 — capture.mjs が依存)。

## 受け入れ基準

- **省電力(数値基準)**: シェルで埋め込みルームを表示中にタブを非表示化 → 1s 以内に子の rAF が停止(子に露出させたフレームカウンタ、または DevTools Performance で検証)し、orb の SoundField / tide の audio が無音になる。復帰後 1s 以内に再開し、映像に Δt スパイク由来のジャンプがない(目視+連続スクリーンショット)。
- **stats 供給**: 埋め込み2ルームでシェルが実測 FPS を 0.5-1s 間隔で受信できる(console/dev 検証で可 — HUD 表示の最終形は T-SH-03 検収)。値は展示内 HUD の FPS と ±2 以内で一致。
- **QA フック**: 親(またはテストスクリプト)から postMessage で tide の任意章(0..8)+ preview モード、orb の任意相(0..3)を再マウントなしで指定でき、visual-smoke / capture.mjs 系の決定論キャプチャが取得できる。
- **スタンドアロン非破壊(回帰)**: 「Open standalone」で開いた単独ページが従来通り全機能動作(orb: 4相・sculpt・freeze・CAPTURE・MIC、tide: 入場・下潜/静默下潜・`?preview=` URL 直指定)。`window.parent === window` でブリッジが不活性であることをコード上も確認。
- **後方互換**: ready タイムアウト時に現行の reload-only UI へ降格する(意図的に古い成果物を配置して確認)。Reload / Open standalone / Reset の3ボタンは従来通り動作。
- **セキュリティ**: 受信側で `event.origin === location.origin` を検証し、異オリジンメッセージが無視されることをユニットまたは手動テストで確認。プロトコルに `v: 1` が入っている。
- **回帰一式**: `pnpm test / lint / typecheck / build / qa:visual` 全パス(コンソールエラー0)。orb 4相+freeze、tide 開幕+代表章(I/V/VIII/IX)+終幕のスクリーンショットが改修前と目視同等。

## 影響範囲・注意

- **ref 側改修 → 再ビルド必須(横断注意4)**: 実装は必ず ref/ ソースで行い `pnpm exhibits:build`(T-EMB-01)で public/exhibits を再生成する。minified バンドルへの直接パッチは禁止。research-audio-reactive.md 217 行の注意どおり、tide の main.js 改修はビルド+ `?preview=` 静的プレビュー QA をセットで回す。
- **renderOrder 連鎖(横断注意5)**: 本チケットは描画順・マテリアルに触れないこと。rAF ループの入口(pause ゲート)とイベント配線のみの追加に留め、orb の5層シェル renderOrder 1-4 / tide の renderOrder 1/4/8 連鎖に変更が入らないことをレビュー観点に含める。
- **文字列ピン留めテスト**: shader-quality.test.ts / runtime.test.ts / water-qa.mjs セレクタはネイティブ2室対象のため非該当。ただし **visual-smoke.mjs のハードフェイル条件(console error / pageerror)**にブリッジ実装のエラーが直撃するため、qa:visual を回帰ゲートとして必ず実行する。シェル側に新規 UI 文言を足す場合は `t(key)` 経由(Locked Decision #5。'Loading renderer' 型の i18n バイパスを増やさない)。
- **T-EMB-03 との編集競合**: 同じ `EmbeddedExhibitFrame.tsx` を触る。T-EMB-03(allow レジストリ化)が小粒のため先行実施を推奨し、本チケットはその上にリベースする。
- **orb のアイドル自動サイクル音(dossier-anime-liquid-orb.md リスク10)**: pause 実装時に自動相サイクルのタイマーも止めること(rAF だけ止めて setTimeout 系が生きていると再開時に状態が飛ぶ)。両展示とも「時計」を止める場所を rAF 起点に一元化できているか確認する。
- **tide の `?preview=` URL 互換**: capture.mjs / 既存 QA 手順が URL パラメータに依存している。postMessage 版 QA フックは追加であり、URL 経路の削除・変更は不可。
- **プロトコルの将来互換**: `v` フィールドと capabilities 宣言を最初から入れる(research-webgl-platform.md §2.8 の注意)。将来の Voxel Water 等ネイティブルームの iframe 化や外部埋め込みを許す場合は origin allowlist へ拡張する前提でコメントを残す。
