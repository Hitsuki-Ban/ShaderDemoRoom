# [T-I18N-01] i18n 契約を完全化する

- 分類: TA / Platform
- 優先度: P2
- 評価軸: Locked Decision #5「all visible copy flows through `t(key)`」/ locale 契約 / accessibility / QA
- 依存: T-QA-01（完了済み。water QA は locale 非依存の `data-testid` を使用）

## 現状（2026-07-18 再調査）

- locale は `Locale` union、Provider の supported list、language select の option という3箇所に重複していた。
- Provider は常に `en` で起動し、選択値を保存しなかった。`document.documentElement.lang` の同期だけは実装済みだった。
- translator は未知 locale / 欠落 key を `en`、次に raw key へ暗黙 fallback した。この経路は catalog の不整合と誤った呼び出しを隠す。
- `ShaderCanvas` は room id を aria-label と loader に露出し、embedded iframe の title も room id だった。
- Voxel Water の Storm / Calm と Glass Optics の Focus / Crystal は raw English copy だった。
- T-SH-03 後の telemetry は `Intl.NumberFormat('en-US')` と `toFixed()` が混在し、renderer の内部英語診断 `classificationReason` を可視 tooltip に露出した。slider output も `toFixed()` を使っていた。
- 旧票の `ShowroomPage` 内 `Loading renderer`、water QA の role/name selector、`ShaderCanvas.test.ts` pin は現 HEAD では既に存在せず、旧 `ja → en → raw key` テストは fail-fast 契約と矛盾していた。

## 確定スコープ

### 1. locale と catalog の単一契約

- `localeManifest` を唯一の locale 一覧とし、`Locale` 型と language select をそこから導出する。option label 自体も catalog key を通す。
- `defaultLocale = 'en'` は「保存値が存在しない初回起動」だけに適用する明示的な product default とする。
- `parseLocale` は manifest 外の値を拒否する。translator は locale を必須引数とし、未知 locale、欠落 key、非 leaf key、補間 parameter の不足・過剰を即時エラーにする。locale fallback、raw-key fallback、旧 API wrapper は持たない。
- English catalog を shape source とし、全 catalog の tree/key parity を TypeScript で検査する。room loader は `{room}` の必須補間で語順を locale 側に所有させる。

### 2. 明示的な locale 永続化

- storage key は `sdr.locale` の1個だけとする。値が無い時は `en`、存在する値は `parseLocale` で検証する。
- user setter は storage write 成功後に state を更新する。storage read/write failure と不正保存値は隠さず失敗させる。
- `useLayoutEffect` で canonical app locale を `<html lang>` に同期する。
- `navigator.languages` 推定、言語 tag alias、旧 storage key、cross-tab 同期、storage failure 時の in-memory fallback は本票に導入しない。これらは別の product policy であり、明示選択の永続化という本件に第二の初期化経路を加えない。

### 3. visible / accessibility copy と数値

- Showroom 境界で translated room label / loader label を解決し、i18n 非依存の `ShaderCanvas` と `EmbeddedExhibitFrame` に required props として渡す。
- 4個の preset action、loader、locale labels、telemetry unit、degree unit を catalog 化する。
- Telemetry と全22 slider は current `Locale` を required prop として受け、明示的な `Intl.NumberFormat(locale, options)` で表示する。QA JSON の raw metrics は変更しない。
- telemetry tooltip は localized renderer classification と renderer identity のみを表示する。内部 `classificationReason` は machine-readable QA JSON に保持するが UI copy として露出しない。

### 4. 恒常 QA

- `qa:visual` は zh-CN 選択 → reload 後も zh-CN、`html[lang]`、localized preset、canvas aria-label、iframe title、renderer diagnostic 非露出を hard assert し、中文 screenshot を artifact に加える。
- `water-qa` は locale allowlist を重複保持せず、存在しない option は Playwright が直接失敗させる。操作は既存 `data-testid` のまま維持する。

## 受け入れ基準

- manifest + 対応 catalog の追加だけが新 locale を宣言する経路であり、catalog key の欠落・余剰は compile/test で失敗する。
- 未保存起動=`en`、保存済み `zh-CN` は初回 render と `<html lang>` に反映され、reload 後も保持される。不正 locale と storage failure は失敗する。
- `Storm preset` / `Calm preset` / `Focus beam` / `Crystal preset` / machine room loader は catalog 外の JSX から消える。
- zh-CN で canvas aria-label=`体素水体`、Ninth iframe title=`第九潮汐档案馆`。iframe 本体は locale 切替で remount しない。
- telemetry / slider の表示数値は current locale を明示し、可視経路に固定 `en-US` / `toFixed()` を残さない。raw telemetry JSON は未丸めのまま。
- en / zh-CN × storm / calm / rain の water QA 操作が完走し、production visual QA は console error、mobile overflow、HUD overlap を出さない。
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` / exhibit sync / `pnpm qa:visual` が通る。

## 参照

- [HTML `lang` attribute](https://html.spec.whatwg.org/multipage/dom.html#the-lang-and-xml:lang-attributes)
- [W3C H57: language of the page](https://www.w3.org/WAI/WCAG22/Techniques/html/H57)
- [W3C H64: iframe title](https://www.w3.org/WAI/WCAG22/Techniques/html/H64)
- [ECMA-402 Intl.NumberFormat](https://tc39.es/ecma402/#numberformat-objects)
- [WHATWG Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html)

## 完了レポート（2026-07-18）

### 判断と境界

- T-QA-01 の selector 前提が完了したことを確認し、旧票の過時証拠を現 HEAD に合わせて修正した。
- translation missing と非法 locale は開発/契約エラーとして fail fast に統一した。初回 default 以外の fallback、alias、migration shim は追加していない。
- browser language negotiation と storage failure fallback は便利さより product policy の選択を必要とするため、本票から外した。明示選択の保存という単一経路を完成させた。
- slider 数値も本票へ含め、第三 locale 追加時に shell telemetry だけが追従する半端な seam を残さなかった。

### 実装

- manifest 駆動の locale / option、exact-shape catalog、strict translator と `{room}` interpolation、`sdr.locale` persistence、paint 前の document language 同期を実装した。
- room title / loader を Showroom で翻訳して canvas / iframe に渡し、4 preset と全 unit copy を catalog 化した。
- Telemetry と22 slider を locale-aware formatter に移行し、renderer の raw English reason は QA JSON に保持しつつ tooltip から除去した。
- unit/component tests を 91件へ拡張し、production visual QA に zh-CN persistence / accessible-name contract と中文 capture を追加した。

### 検証

- `pnpm lint` / token lint、`pnpm typecheck`、22 files / 91 tests、`pnpm build`、exhibit snapshot sync、`git diff --check`: pass。
- production `qa:visual`: 14 screenshots、zh-CN reload persistence=true、`html lang=zh-CN`、canvas=`体素水体`、iframe=`第九潮汐档案馆`、locale 切替時の iframe instance preserved=true、console error 0、mobile overflow 0、HUD overlap 0。既存 Ninth paired luma 3 region も全て gate 内。
- en / zh-CN × storm / calm / rain の6ケースはすべて locale 非依存 selector で page/canvas PNG と JSON report を生成した。
- 独立审查は strict locale/catalog、storage write→state、Intl formatter、raw telemetry 境界、dynamic iframe QA を確認し APPROVE（P0-P2 なし）。
