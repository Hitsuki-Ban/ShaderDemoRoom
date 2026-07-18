# [T-I18N-01] i18n シームを完全化する(リテラル英語の除去・aria/title の翻訳・ロケール永続化)

- 分類: TA / Platform
- 優先度: P2
- 評価軸: TA「コントラクト遵守」(RoomRuntime 契約・i18n シーム・トークン体系に従っているか — Locked Decision #5「all visible copy flows through t(key)」への違反。review-framework.md 不合格例「"Storm preset" 等のハードコード英語」が本件)
- 依存: T-QA-01(water-qa.mjs のボタン文字列セレクタを data-testid 化するチケット。**T-QA-01 完了前に本チケットを実装すると `QA_PRESET=storm/calm` 実行がサイレントに壊れる**)

## 現状(証拠)

**1. t() を通らないリテラル英語(grep + 現物確認済み)**

| 箇所 | 内容 |
|---|---|
| `src/app/ShowroomPage.tsx:117` | Suspense fallback `<div className="canvas-loader">Loading renderer</div>` |
| `src/shared/three/ShaderCanvas.tsx:164` | `<div className="canvas-loader">Loading {room.id}</div>`(翻訳なし+機械 id 露出。「Loading voxel-water」と表示される) |
| `src/rooms/voxel-water/Controls.tsx:167` | `Storm preset`(Button 子要素の生文字列) |
| `src/rooms/voxel-water/Controls.tsx:170` | `Calm preset`(同上) |
| `src/rooms/glass-optics/Controls.tsx:95` | `Focus beam`(同上) |
| `src/rooms/glass-optics/Controls.tsx:101` | `Crystal preset`(同上) |

**2. aria-label / iframe title の機械 id 露出**

- `src/shared/three/ShaderCanvas.tsx:163` — `<canvas ... aria-label={room.id} />`(支援技術に 'voxel-water' 等のハイフン付き id が読み上げられる)
- `src/shared/embedded/EmbeddedExhibitFrame.tsx:25` — `<iframe ... title={room.id}`(同様)
- 対照的に `ShowroomPage.tsx` の他の aria-label(72, 80, 115, 132, 143 行)は `t()` 経由で正しい。

**3. ロケールの非永続**

- `src/shared/i18n/I18nProvider.tsx:17` — `useState<Locale>(defaultLocale)` で常に 'en' 起動。src 全体に `localStorage` / `navigator.language` の使用ゼロ(grep 確認)。リロードで言語選択が消える。

**4. 第 3 ロケール追加の現状コスト(3 箇所+カタログ)**

- `src/shared/i18n/index.ts:1` — `export type Locale = 'en' | 'zh-CN'`(union 直書き)
- `src/shared/i18n/I18nProvider.tsx:10` — `const supportedLocales: Locale[] = ['en', 'zh-CN']`(重複定義)
- `src/app/ShowroomPage.tsx:96-98` — `<option value="en">English</option>` / `<option value="zh-CN">中文</option>`(ハードコード)
- `src/shared/i18n/i18n.test.ts:19` — `createTranslator(messages, 'ja')` で **UI から選択できない 'ja' のフォールバック連鎖を既に試験している**(en フォールバック → raw キー。第三 locale の潜在意図)
- カタログ本体は `src/shared/i18n/index.ts:10-223`(en / zh-CN 完全並行)。`createTranslator`(242-248 行)は dot-path 解決 → en フォールバック → raw キーで、**カタログ追加だけで新 locale が機能する構造は既にある**。詰まっているのは型 union・supportedLocales・select の 3 箇所。

**5. QA との結合**

- `scripts/water-qa.mjs:321` `getByRole('button', { name: 'Storm preset' })` / `:323` `'Calm preset'` / `:325` `'Rain'`。前 2 つは上記ハードコード文字列、`'Rain'` は `t('rooms.voxelWater.controls.rainy')` の en 値であり、**いずれもロケール依存セレクタ**。
- 参照: dossier-shell.md リスク 4・9・16、review-framework.md SH-8 / GO-8 / 横断注意 2。

## 問題

- Locked Decision #5(i18n シームを初日から)の明確な違反が 6 文字列+aria/title に残っており、zh-CN 表示で英語が混入する。展示館としての仕上げ品質(コントラクト遵守)を毀損する。
- リテラル文字列が QA セレクタと結合しているため、「翻訳するとQAが壊れる」という調整フェーズ全体の摩擦源になっている(依存の T-QA-01 で解消)。
- ロケール非永続はリロードごとに言語がリセットされる実害。

## 改善方向

dossier-shell.md 調整候補「i18n バイパス撤去」「設定と locale の永続化」「アクセシビリティ」、および research-webgl-platform.md §2.7(QA 注入をセレクタから URL/data-testid へ移し、i18n によるセレクタ破壊リスクを切る)に従う。

1. **カタログにキー追加**(en / zh-CN 両方を同時に):
   - `app.loadingRenderer`("Loading renderer" / "正在加载渲染器…" 等)
   - `app.loadingRoom` — room 名は既存の `t(room.titleKey)` を再利用して合成する(例: ShowroomPage/ShaderCanvas 側で `` `${t('app.loadingRoom')} ${t(room.titleKey)}` `` または translator に `{name}` プレースホルダ置換を追加。現行 `createTranslator` は引数なしなので、置換導入は最小差分で)
   - `rooms.voxelWater.controls.stormPreset` / `calmPreset`、`rooms.glassOptics.controls.focusBeam` / `crystalPreset`
2. **aria-label / iframe title の t(titleKey) 化**: `ShaderCanvas` と `EmbeddedExhibitFrame` は現在 `t` を受け取らない。コンポーネントを i18n 非依存に保つため、**ShowroomPage 側で `t(activeRoom.titleKey)` を解決し、`label` / `title` prop として渡す**形を推奨(ShaderCanvas.tsx:163 → `aria-label={label}`、EmbeddedExhibitFrame.tsx:25 → `title={title}`)。
3. **ロケール永続化**: `I18nProvider` で初期値を `localStorage`(キー例 `'sdr.locale'`)→ `normalizeLocale` フォールバックの順に解決し、`setLocale` 時に書き戻す。`navigator.language` からの初回推定は任意(入れる場合も normalizeLocale を通す)。`document.documentElement.lang` 同期は既存実装(I18nProvider.tsx:28-30)のまま。
4. **第 3 ロケール追加の作法整理**(このチケットでは 'ja' を追加しない — 構造だけ直す):
   - `index.ts` に locale マニフェスト(例 `export const locales = [{ code: 'en', label: 'English' }, { code: 'zh-CN', label: '中文' }] as const`)を単一ソースとして置き、`Locale` 型は `typeof locales[number]['code']` で導出
   - `I18nProvider.tsx:10` の supportedLocales と `ShowroomPage.tsx:96-98` の `<option>` をマニフェスト駆動に置換
   - 以後の locale 追加が「カタログ+マニフェスト 1 エントリ」で完結することを受け入れ基準で確認
   - `i18n.test.ts:19` の 'ja' フォールバック試験は「未登録 locale が en に落ちる」保証としてそのまま維持
5. **QA との切り離し**: 本チケットは T-QA-01 で water-qa.mjs のセレクタが `data-testid`(例 `preset-storm` / `preset-calm` / `weather-rain`)へ移行済みであることを前提とする。Controls 側にはその data-testid を付与したまま文字列だけを t() 化する。

## 受け入れ基準

- 上記 6 リテラル文字列がすべて t() 経由になり、`src` 内にユーザー可視のハードコード英語コピーが残っていない(検証: `grep -rn "Storm preset\|Calm preset\|Focus beam\|Crystal preset\|Loading renderer" src/` → 0 件)
- 視覚基準: zh-CN 切替時にプリセットボタン・ローダー表示が中文になる(en / zh-CN 両方のスクリーンショット確認)。en 表示は従来と文言同一(意図的変更を除く)
- DOM 基準: `canvas` の aria-label と `iframe` の title が現在ロケールの room タイトル(例 '体素水体')になる(devtools / testing-library で確認)
- 言語を zh-CN にしてリロード → zh-CN のまま起動する(手動確認+可能なら Provider の unit test)
- locale 追加シミュレーション: カタログとマニフェストに仮エントリを足すだけで select に選択肢が現れ、型エラーが出ないことをレビューで確認(確認後に仮エントリは削除)
- 回帰: `pnpm test` 緑(i18n.test.ts の 'ja' フォールバック含む)、`QA_PRESET=storm` / `calm` / `rain` の `pnpm qa:water` が data-testid セレクタで通る、`pnpm qa:visual` ハードフェイルなし

## 影響範囲・注意

- **water-qa セレクタ連動(最重要)**: `water-qa.mjs:321-325` は 'Storm preset' / 'Calm preset' / 'Rain' のロケール依存セレクタ。**T-QA-01(data-testid 化)完了が先行条件**であり、順序を破ると QA_PRESET 実行がサイレント破壊される(review-framework.md 横断注意 2)
- **文字列ピン留めテスト**: `runtime.test.ts`(glass-optics)は Controls.tsx のプリセット数値リテラル(`lightX: -0.28` 等、runtime.test.ts:25-27)をピン留めしている。ボタン文字列の t() 化ではプリセット値の行を変更しないこと。`ShaderCanvas.test.ts:6-15` は ShaderCanvas.tsx の rawDelta / antialias / pixelRatio 文字列をピン留め — ローダー行・aria-label 行の変更はピン対象外だが、同ファイル編集時にピン留め行を崩さないこと。`shader-quality.test.ts` への影響なし
- **カタログ整合**: zh-CN 側のキー追加漏れは en フォールバックで隠れて気づきにくい。en / zh-CN のキー集合一致を検証する test の追加を推奨(既存 i18n.test.ts に 1 ケース追記)
- **renderOrder 連鎖**: 非該当(UI 文字列と Provider のみ、scene graph に触れない)
