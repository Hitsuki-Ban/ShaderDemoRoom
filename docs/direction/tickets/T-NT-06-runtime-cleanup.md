# [T-NT-06] ランタイム衛生の掃除を統合実施する(品質ティア・静默周回・raycast・微小コスト・デッドコード)

- 分類: TA
- 優先度: P3
- 評価軸: リソースライフサイクル / デッドコード・デッド出力 / 対応環境 / モデル一貫性(視覚とヒット領域の不一致)
- 依存: T-EMB-01(完了済み)。T-NT-05(章別キャプチャ QA)を先行させると全項目の「見た目回帰なし」検収が自動化できる

## 現状(証拠)

対象: `ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`(現行 3062 行)+ `index.html`

1. **isMobile はロード時 1 回のみ**: `const isMobile = isCoarse || innerWidth < 820;`(main.js:35)。resize ハンドラ(main.js:2964)は pixelRatio を再計算するが `isMobile` は const のまま — 820px 閾値をまたぐリサイズ・DPR 変化・ウィンドウ移動で品質ティア(antialias :94、pixelRatio 上限 :101、ジオメトリ分割・粒子数の全分岐)が再評価されない。幅 819px で開いたデスクトップはリロードまで恒久的にモバイルアセットになる。
2. **静默モードの3倍速周回で第IX章終幕が発火しない**: 静默入場時の musicTime は `((elapsed / 118) * duration) % duration`(main.js:2446)のフリーランで約118秒周回。`updateEnding()` の実終幕は `state.audioReady && ui.audio.duration > 20` が条件(main.js:2400)のため静默経路では一度も発火せず、第IX章(真珠)から通常の 2.85 s 遷移で第I章へ突然ラップする。演出設計(消灯→エピローグ)が静默 QA ルートで検証不能。
3. **後半章のコア raycast 極小**: クリック/ホバー判定は `raycaster.intersectObject(core, false)`(main.js:2256, 2908)で、core.scale は章別 shapes テーブル(main.js:2626–2628 — VIII `[1.46,0.62,0.34]`、IX `[0.48,0.48,0.48]` × 呼吸)に lerp 追従(:2631)。第VIII–IX章ではヒット領域が視覚上の虹彩/真珠と不一致に縮み、クリックがほぼ当たらない。`core.userData.interactive = 'core'`(main.js:1047)は誰も読まないデッドコード。
4. **毎フレーム微小コスト**: `updateCamera()` が毎フレーム `new THREE.Vector3(...)` を割り当て(main.js:2538。再利用用の `scratchVec3` は :123 に既存)。CSS カスタムプロパティを値の変化に関係なく毎フレーム書き込み: `--phase-veil` / `--phase-turn`(main.js:2483–2484)、LOW/MID/HIGH メーター `--v`(:2195–2197)、`--blackout`(:2902)、`--progress`(:2921)— いずれも style recalc を誘発。
5. **mp3 preload='auto'(静默経路でも)**: `<audio id="audio" src="./archive.mp3" preload="auto" playsinline>`(index.html:358)。8.28 MB の音源が、音声を使わない静默下潜・`?preview=` キャプチャ経路でもプリロード対象になる。
6. **床シェーダのデッドブランチ**: `CircleGeometry(16, 256)` 上で `if (radius > 16.0) discard;`(main.js:347)— vPlane 半径は 16 を超えないため到達不能。
7. **triggerPulse の冗長 visible 設定**: `sonarShell.visible = state.pulseMode === 0`(main.js:2288)は `updatePulse()` の一括 hide/show(:2733 以降)で毎フレーム上書きされる。無害だが実際の可視性ロジックを不明瞭にする。

## 問題

いずれも単独では P3 だが、放置すると (1)(3) は特定環境で実際の操作不能・品質劣化として表面化し、(2) は静默 QA ルートの検証範囲に穴を残し、(4)(5) は低速環境の予算を静かに食う。ref/ fork の同一ファイルに散在するため、個別チケット化より 1 回の掃除パスで回収する方が再ビルド・検収コストが安い。

## 改善方向

1. **品質ティアの再評価(段階実装)**: 段階1として resize/DPR 変化で pixelRatio 上限・composer サイズ・antialias 非依存パラメータを再評価する(research-audio-reactive.md §2.7 の「安い恒久策」)。ジオメトリ再生成を伴う完全ティア切替はコスト過大なので、閾値をまたいだ場合の挙動(現状維持+コード上に明文化コメント、または再ロード案内)を決めて記録する。FPS 駆動の動的解像度(§2.7 本体)は別票扱いでスコープ外。
2. **静默周回の演出整理**: 方針を1つ選んで実装する — (a) 静默モードのラップ直前に簡易 shutdown シーケンス(shutdown 包絡を musicTime 由来で合成)を与えて IX→終幕→I を成立させる、または (b) QA ルートとしての限界(終幕は `?preview=ending` で検証する)を docs に明記し、ラップ時に phaseTransition を必ず経由させて視覚ジャンプだけ除去する。カルテ P2 の要判断事項をここで確定する。
3. **raycast の視覚追従**: コアのヒットターゲットを可視形状に追従させる(章別 shapes を使う不可視ヒットプロキシ球/楕円体 + 最小ヒット半径の保証)。`core.userData.interactive` は削除。
4. **微小コストの除去**: updateCamera は `scratchVec3`(既存)を再利用。CSS 変数は前回値キャッシュで変化時のみ `setProperty`(toFixed 後の文字列比較で十分)。
5. **preload の見直し**: `preload="metadata"` へ変更し、音声入場(下潜)選択時に本体ロードを開始する。autoplay 失敗時の「重试音频 / 载入音频」フォールバック経路(既存)が壊れないことを確認。
6. **デッドコード除去**: 床シェーダの到達不能 discard(:347)削除、triggerPulse の冗長 visible 設定(:2288)を updatePulse 側に一本化。

## 受け入れ基準

- 見た目回帰なし: T-NT-05 の章別キャプチャ 11 枚が改修前後で一致(ディザ導入済みなら固定 seed で比較)。
- (1) デスクトップでウィンドウ幅を 820px 前後で往復させても pixelRatio・composer サイズが追従し、コンソールエラーゼロ。ジオメトリ系ティアの扱いはコード内コメント+QA ログに明文化されている。
- (2) 静默入場で九章を一巡させたとき、IX→I の遷移が選択方針どおり(簡易終幕が発火する、または phaseTransition 経由の連続遷移になる)であること。方針 (b) の場合は docs に限界の明記があること。
- (3) `?preview=main&section=7` / `section=8` で虹彩/真珠の視覚範囲をクリックし、アーカイブ開閉がトグルされること(現行は失敗する座標を再現ケースとして記録)。ホバーカーソル(:2908)も同座標で反応すること。
- (4) updateCamera のフレーム毎アロケーションゼロ(コードレビューで確認)。CSS `setProperty` 呼び出しが静止状態(パルスなし・章内定常)で毎フレーム 0 回になること(手動プロファイルまたはカウンタで確認)。
- (5) 静默下潜・`?preview=` ロード時に archive.mp3 の本体リクエストが発生しない(DevTools / Playwright のネットワークログで確認)。音声入場では従来どおり再生が始まり、`qa:exhibits` の media pause/resume 検査を通過。
- (6) バンドルから該当デッドコードが消え、床の見た目が不変であること。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` 通過。

## 影響範囲・注意

- **全項目 ref/ 側の改修 → `pnpm exhibits:build` で public/exhibits を再生成**(public 手編集禁止、`exhibits:check` が同期強制)。1 コミットに詰めず、項目単位でコミットを分けて bisect 可能にすること。
- (5) は `qa:exhibits` の「paused 中に開始した media が resume 後 PLAYING へ復帰」検査(T-EMB-02 完了レポート)と干渉しうる — preload 変更後も同検査が通ることを必ず確認。
- (2) で簡易 shutdown を選ぶ場合、updateEnding の music クロック決定論クローズ(main.js:2428–2431 のコメント参照)と `finishEnding()` の状態機械を静默経路に複製しないこと(条件分岐の共通化で対応)。
- (3) のヒットプロキシは transparent メッシュを scene に足す実装になりやすい — renderOrder 網(review-framework 横断注意 5)に触れないよう `visible=false` + raycast 専用(`raycast` 直接呼び出しか `layers` 制御)で実装する。
- (1) の resize 再評価は bridge stats のサンプル窓(ref main.js:1782–1796)とタイマーに影響しない範囲で行う。
- 参照: research-audio-reactive.md §2.7(安い恒久策・DRS の落とし穴)、カルテ「コードリーディングで発見されたリスク」4 / 7 / 12 / 13 / 14 / 16
