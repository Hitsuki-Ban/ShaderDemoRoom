# [T-NT-04] near-black 区間の「壊れて見える」問題を展示内キューで解消する

- 分類: AD / UX
- 優先度: P2
- 評価軸: ストーリーテリング(意図的な暗黒の伝達)/ 対応環境(一見客の誤認防止)/ ヒーローショット成立性
- 依存: T-NT-02(最終出力の暗部階調を確定) / T-NT-05(必須の変更前 baseline gate) / T-SH-04 / T-I18N-01(完了済み)

## 現状(証拠)

### 済んでいるもの(第1バッチでカバー済み — 本票のスコープ外)

- **シェル側の暗室化は T-SH-04 で実装済み**: `stageProfile: { shellChrome: 'dim' }`(src/rooms/registry.ts:94)→ `data-shell-chrome`(src/app/ShowroomPage.tsx:160)で topbar / rail / inspector を減光し、`qa:visual` が paired luma ratio ≤ 0.70 を hard gate(scripts/visual-smoke.mjs:128–188)。「サイドバーがページ最輝部になる」問題は解消済み。
- postMessage ブリッジ v1(T-EMB-02)で pause / stats / set-preview は導入済みだが、**暗黒区間の可読性キューはブリッジの守備範囲外**。

### 残っている問題(本票のスコープ)

対象: `ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`(現行 3062 行)+ シェル i18n カタログ

- 開幕 0–8.65 s: `--blackout = max(1 - lightLevel, …)`(main.js:2900–2902)でほぼ全黒。HUD は `body.calibrated` 付与(8.65 s、reduced-motion 4.2 s)までフェードインしない。
- 終幕: 露出が `× (1 - smoothstep(0.76,1,shutdown) * 0.96)` まで崩壊(main.js:2898)、`finishEnding()` で `--blackout: 1`(main.js:2392)。**証拠キャプチャ `docs/direction/captures/ninth-tide-ending.png` は事実上の黒画面**。原典批評も preview_ending.png を「サムネイルでは黒い長方形。代表スチルに絶対使用禁止」と明記(カルテ「ビジュアル現状評価」)。
- 第IX章: パレット deep `0x000405`(main.js:89)+ 露出テーブル最小 0.54(main.js:2897)で、章途中参加した閲覧者には「消えかけの画面」だけが見える。
- シェル側の説明文(`rooms.ninthTideArchive.controls.runtimeNote`、src/shared/i18n/index.ts の en/zh 両カタログ)は汎用文言のみで、「ほぼ暗転する章がある」ことへの言及がない。
- research-audio-reactive.md §2.10: 黒画面+音のみはユーザーが故障と解釈する典型パターン(Unity 系フォーラムの反面事例)。誤認リスクが残るのは「開幕 0–8.65 s」と「章 IX / 終幕の途中参加」の2点。

## 問題

シェルの暗室化で「周囲がうるさい」問題は解決したが、**展示自身が近黒になる区間で稼働中であることを伝える要素がない**。ショールーム経由の一見客は開幕・第IX章・終幕を「iframe が死んだ」と誤認しうる。意図的な暗黒(Ganzfeld / 消灯の演出)が故障に見えることは、展示の信頼性を最も安く毀損する。

## 改善方向

research-audio-reactive.md §2.10 の3点を、exhibit 側(ref/ fork)+シェル側(i18n 1行)に振り分けて実装する:

1. **常時可視の最小シグナル(exhibit 側)**: 近黒区間でも HUD のタイムライン(既存 `--progress`、main.js:2921)と章インデックスに opacity 下限(0.25 程度)を設ける。9章構成が見えるタイムラインは「これは 5:54 の作品で、いま暗い章にいる」ことを一目で伝える最強の周辺キュー。「読ませたい」要素だけ下限を高くする二層構造(§2.9 の HUD 設計と整合)。
2. **知覚閾値上の残光(exhibit 側)**: blackout 中も 1 要素(スペクトラルコームの 2–3 セグメント、または信号ドット)だけ知覚閾値ぎりぎりの輝度で動かし続ける。「灯灭以后,海仍在读。」のコンセプト自体を UX 保険として使う。開幕は儀式キャプション(既存)があるため、適用対象は終幕と章IX 途中参加に絞る。
3. **ショールーム側の予告(シェル側)**: `rooms.ninthTideArchive.controls.runtimeNote`(en/zh 両カタログ)に「この展示はほぼ暗転する章・終幕を含む」旨を 1 行追記する。iframe 改修不要で最も安い保険。
- 適用しないもの: エンディングのエピローグカード(既存)はリプレイ導線として正しいので触らない。HUD 色の章パレット連動(NT-8)は別票(P3)であり本票に含めない — ただし opacity 下限の実装は NT-8 の opacity 連動設計と衝突しないよう `--hud-floor` 相当の変数に分離しておく。

## 受け入れ基準

- 視覚: `?preview=ending` キャプチャで (a) タイムラインと章インデックスが判読可能(opacity 下限が効いている)、(b) 知覚閾値上の残光要素が 1 つ存在し、連続フレームのピクセル差分が非ゼロ(動いている)こと。現行 `ninth-tide-ending.png` との before/after を docs/direction/captures/ に残す。
- AD 規則の維持: 残光・HUD 下限はシーンの最大輝度を超えない(「HUD がシーンを食う」逆転を起こさない)。原典の輝度3層構造(カルテ「ビジュアル現状評価」)を崩さないことを目視検収。
- 開幕: 0–8.65 s 区間のいずれかの時点でタイムラインまたは進行キューが視認できること(儀式キャプションと重複しない配置)。
- i18n: en/zh 両カタログに注記が入り、T-I18N-01 の整合性テスト(キー完全一致)を通過すること。
- シェル回帰なし: `qa:visual` の stage-profile paired luma gate(3 region ≤ 0.70)と mobile overflow / HUD overlap 0 を維持。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` 通過。

## 影響範囲・注意

- exhibit 側変更は **ref/ で行い `pnpm exhibits:build` で再生成**(public 手編集禁止、`exhibits:check` が同期強制)。シェル側変更は i18n カタログ 1 箇所のみ。
- HUD opacity の変更は `qa:exhibits` の DOM 検査(phaseNumber ローマ数字の可視判定)に影響しうる — セレクタ/可視性アサートを同期確認。
- 残光要素は T-NT-02(暗部ディザ)と同じ輝度帯で動く。両票を実施する場合、残光の知覚閾値検収はディザ導入後に行うと安定する(ディザなしでは残光自体が縞に埋もれて評価がぶれる)。
- prefers-reduced-motion 時は残光のアニメーションを静的表示に落とす(既存の reduced-motion 分岐と同じ流儀)。
- 参照: research-audio-reactive.md §2.10(Active Silence / キオスク実務 / 反面事例の出典)、§2.9(HUD 二層構造)
