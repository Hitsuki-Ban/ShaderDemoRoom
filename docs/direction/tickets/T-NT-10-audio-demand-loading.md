# [T-NT-10] 音声選択時だけ archive.mp3 本体を取得する

- 分類: TA
- 優先度: P3
- 評価軸: ネットワーク予算 / メディアライフサイクル
- 依存: T-NT-05

## 現状(証拠)

`<audio src="./archive.mp3" preload="auto">` により、静默下潜と `?preview=` でも 8.28 MB の本体が取得対象になる。オンライン Pages 展示では、音声を選ばない訪問にも帯域コストが発生する。

## 本票の唯一の結果

**音声入場を明示的に選んだ時だけ archive.mp3 本体 request を開始する。**

## 改善方向

1. 初期 DOM は metadata/body を要求しない状態とし、音声入場 action が唯一の `src` 設定 + `load()` owner になる。
2. silent/preview から audio request へ進む fallback、timeout 後の自動 load、旧 `preload=auto` 経路は残さない。
3. autoplay failure は既存 UI で明示し、同じ owner をユーザーが再試行する。silent へ自動降格しない。

## 受け入れ基準

- silent 入場と全 preview URL の network log に archive.mp3 request が0件。
- audio 入場では action 後に request が厳密に1件発生し、再生/pause/resume が機能する。
- autoplay 拒否時は明示 UI となり、retry で同じ source を再利用して重複 download しない。
- `qa:exhibits` media lifecycle と Pages build が通る。

## 影響範囲・注意

- audio network lifecycle だけを所有する。kiosk 設置運用は現在のオンライン製品境界外。
- ref/ で実装し exhibits を再生成する。

## 実施報告 (2026-07-20)

- 初期 `<audio>` から `src` を除去し、`preload="none"` の source-free DOM にした。音声入場だけが共通 `setAudioSource()` を通して `preload="auto"` への切替、source 設定、`load()` 1回を所有する。silent、preview、timeout からこの owner へ進む経路はなく、ローカル file/drop も同じ setter で現在 source を明示的に置換する。
- `ensureBundledAudioSource()` は source が未選択の最初の音声入場だけで `archive.mp3` を選ぶ。autoplay の `NotAllowedError` は gate を再表示し、`PLAYBACK BLOCKED`、説明文、「重试音频」を可視化する。retry は同じ audio/source に `play()` だけを再実行し、silent へ自動降格しない。従来は failure UI が `body.entered` に隠れていた問題も同じ lifecycle 内で解消した。
- `qa:exhibits` に独立ページの silent、拒播/retry、通常 audio、host pause、Space pause/resume を追加した。最新版実走では silent が request 0 / load 0 / source null。拒播時は request 1 / load 1 / play 1、retry 後も request 1 / load 1 のまま同じ `src/currentSrc` で再生し、Space pause/resume/pause 後も request/load は増えなかった。embedded の paused-start も request/load 1回、host resume と transport 復帰、pause 中の currentTime 停止を確認し、console error は0件だった。
- 初回 main deploy は低速 runner で Space resume 直後の pause が未 settle の `play()` Promise を中断し、標準 `AbortError` が async key handler から未処理 console error になって停止した。全 `play()` owner を `playAudioElement()` に統合し、ユーザー/lifecycle の中断を表す `AbortError` だけを吸収、`NotAllowedError` 等は従来どおり明示失敗 UI へ伝播させた。QA は次回 play を決定論的に `AbortError` にして paused 維持、playCalls +1、request/load 不変、console error 不増を固定した。
- `qa:ninth-tide` は旧 metadata 到達待ちを削除し、opening、九章、ending の各 fresh page で `archive.mp3` request 0を恒常 gate 化した。最終 manifest は3 runs × 11 states = 33/33で `archiveAudioRequests: []`、既存の capture/framebuffer hash、hit fixture、rAF 確定性も通過した。
- 回帰門は `pnpm lint`、`pnpm typecheck`、`pnpm test` (31 files / 180 tests)、`pnpm build`、`pnpm qa:exhibits`、`pnpm qa:ninth-tide` を通過した。ref/dist と public の `index.html`、`app.js`、`archive.mp3`、license は SHA-256 が一致し、最終生成 `app.js` は双方 `50b5e5bd8d8ed5318edd35a221ed23b17ed75130ae925b0c186a5bc5e8d91f0b`。独立 reviewer は material finding なしで APPROVE、独立 verifier も同じ request/load/play 数値と既存 lifecycle 回帰を再走して PASS とした。
