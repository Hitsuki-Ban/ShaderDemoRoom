# [T-AO-01] モバイルHUDをレスポンシブ化しオーブの可視面積を回復する

- 分類: AD
- 優先度: P1
- 評価軸: 対応環境 / 構図(面積配分) / ヒーローショット成立性
- 依存: なし(T-EMB-01 fork運用・T-EMB-02 ブリッジは完了済み。本票は ref/ の style.css / index.html のみを触る)

## 現状(証拠)

- visual-current.json 批評: モバイル Wow 6/10。「固定 HUD がリフローしない。タイトルプレートがオーブ上に直接重なり、4相カードは英語サブラベルが途中でクロップ、端のマイクロテキストはノイズ化。ヒーローのオーブは UI プレートの間から約 1/4 しか見えない」。スクリーンショット: `output/playwright/anime-liquid-orb-mobile.png`(qa:visual で再取得可)。
- ref 側には既にブレークポイントが存在する(`ref/mizu-kokoro-2-source/src/style.css:411-443` の 900px / 680px / 420px)が、縮小・非表示の度合いが不足しており批評の指摘を解消できていない:
  - `.hero-ui` は 680px 以下でも `width: calc(100vw - 48px)` の全幅プレートのまま画面最上部に居座る(style.css:419)。h1 は 420px 以下でも 34px(style.css:442)。
  - `.mode-buttons` は全幅員で `repeat(4, 1fr)` 固定(style.css:193)。375px 級ビューポートでは1カードあたり約 78px しかなく、`CALM / SURGE / BLOOM / VOID` サブラベル(`mode-btn small` 7px、style.css:429)と `em` 行の削除(style.css:517)でも密度が過剰。
  - 680px 以下で `.vertical-label` / `.credit` / `.interaction-hint` は既に非表示、420px 以下で `.telemetry` も非表示(style.css:414, 433, 438)— 「端テキスト非表示」は概ね実施済みで、残る主犯はタイトルプレートと相カードの2つ。
- HUD 構造は `ref/mizu-kokoro-2-source/index.html:21-47`(`.hero-ui` ヘッダ、`.telemetry`、`.mode-rail` + `.material-profile`)。
- 埋め込み時のメディアクエリは iframe 自身のビューポート幅に反応する。showroom モバイル表示では shell 側 HUD が上下を占有した残りが iframe 幅・高さになるため、スタンドアロンの 375px 検証だけでは不十分(shell 内実寸での確認が必要)。

## 問題

ラインナップ中デスクトップ1位(Wow 8/10)の展示が、モバイルでは「デスクトップのスクリーンショットを電話に押し込んだ」読み味に落ち、ヒーローであるオーブ本体が約 1/4 しか見えない。展示の主役より UI が優先される構図はアートディレクションの面積配分原則に反し、モバイル来場者にとって展示価値が成立しない。

## 改善方向

ref/ 側 `style.css`(必要なら `index.html` の構造微修正)のブレークポイント再設計。dossier の処方(タイトル縮小・相カード 2×2・端テキスト非表示)を基準に:

1. **タイトルプレートの縮退**(680px 以下): 全幅プレートをやめ、eyebrow を1行省略形へ、h1 をさらに縮小(24-28px 級)し、padding/クリップパスを詰めたコンパクトチップ化。オーブ上端リムとの重畳をなくすことが目的で、消すことは要件ではない(バイリンガル・ラボタイポは展示アイデンティティなので保持)。
2. **相カードの 2×2 グリッド化**(420px 以下): `.mode-buttons { grid-template-columns: repeat(2, 1fr); }`。1カードの幅を回復してサブラベルのクロップを解消。縦に伸びる分は `.material-profile` 非表示(既存)と `min-height` 縮小で相殺。
3. **縦方向の予算配分を明文化**: portrait ではオーブ+dais が画面中央帯を占有する。上部(タイトル)・下部(相カード+ツールドック)の合計占有を検証し、オーブと dais のシルエットが HUD プレートと重ならない配置にする(visual-refs.json の「dais を画面内に保つ」要件と両立させる)。
4. 検証は3面: (a) スタンドアロン 375×812 / 390×844、(b) showroom モバイル埋め込み(qa:visual の mobile プロファイル)、(c) デスクトップ無回帰。

## 受け入れ基準

- showroom モバイル(qa:visual mobile)スクリーンショットで、タイトルプレートおよび相カードがオーブ+dais のシルエットに重畳しない。
- 4相カードの中文・英語サブラベル(CALM/SURGE/BLOOM/VOID)がクロップ・省略なしで全4枚判読できる(4相すべての active 状態で確認)。
- オーブの可視状態が批評の「約 1/4」から「シルエット全体が判読できる」水準へ回復(before/after スクリーンショット比較を票に添付)。
- デスクトップ(1440×900 級)のレイアウトは視覚回帰なし(既存 desktop スクリーンショットと比較)。
- スタンドアロン(`public/exhibits/anime-liquid-orb/index.html` 直開き)でも同等に成立する。

## 影響範囲・注意

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。
- CSS のみの変更でも dist の CSS ファイル名ハッシュが変わり `index.html` 参照も変わる。ビルド生成物のコミット漏れに注意。
- qa:visual は mobile overflow 0 / HUD overlap 0 を gate している(T-EMB-02 で確立)— これは DOM 要素同士の判定であり、canvas 内のオーブとの重畳は検出しない。本票の検収はスクリーンショット目視+票内に判定基準を記録する。
- shell 側 HUD(TelemetryPanel 等)は本票のスコープ外。二重 HUD の整理は shell リデザイン(T-SH-03/D-2 系)の管轄。
- `.hero-ui` 等のセレクタ/DOM 構造を変える場合、`scripts/exhibit-smoke.mjs`(qa:exhibits)と capture 系スクリプトが exhibit 内 DOM に依存していないか確認する(現状の hard assert はブリッジ挙動と console error 0 が中心)。
