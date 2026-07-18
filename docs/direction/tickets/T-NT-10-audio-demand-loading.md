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
