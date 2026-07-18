# [T-SH-05] 設定の URL シリアライズを導入する（共有可能状態 + QA ディープリンク）

- 分類: Platform
- 優先度: P3
- 評価軸: QA 担保 / コントラクト遵守（共有可能なアートディレクション状態）
- 依存: T-SH-02（完了済み。deep-readonly / deep copy 契約を利用）

## 現状（2026-07-19 再調査）

- `ShowroomPage` の room settings は React state だけに存在し、リロード、共有、新規タブ、back / forward で再現できない。
- shell は `HashRouter` を使う。React Router 7.17 は hash 内の `pathname/search/hash` を解析し、`useSearchParams` は Router の `location.search` を読み書きする。正しい URL は `#/room/x?k=v` であり、外側の `window.location.search` は使用しない。
- T-SH-02 により defaults の deep-readonly と clone ownership は既に実装済み。旧票の「並走可」は完了済み依存へ更新する。
- water QA は T-QA-01 で locale 非依存 `data-testid` へ移行済み。URL state は共有・履歴・deep-link の価値で実装し、旧い英語ボタン文字列リスクの修正とは位置づけない。
- Voxel の numeric domain は Controls JSX、Glass の step は Controls JSX に散在していた。codec 側へ範囲を複製すると UI と URL validation が drift する。
- embedded rooms の `reloadToken` は iframe instance を更新する transient command で、アート状態ではない。URL 対象にはしない。

## 確定コントラクト

### 1. 型付き schema と canonical codec

- `RoomSettingsById` で room ID と settings type を対応づけ、全4室・全フィールドを compile-time exhaustive schema で分類する。
- Voxel / Glass の numeric `{ min, max, step }` は各 room state の単一情報源へ集約し、Controls と URL codec が同じ値を消費する。
- shader room の enum / number / boolean だけを serialize する。両 embedded room の `reloadToken` は schema 上で required `transient` とする。
- defaults と異なるキーだけを書き、差分が1件以上ある時だけ `v=1` を加える。`URLSearchParams.sort()` により一意の key order を作る。defaults は完全に query-free とする。
- `qaTime` は予約名として export するが、本票では elapsed 固定の意味・parser・runtime 接続を実装しない。未実装の予約値を受理する互換経路は設けない。

### 2. 入力 validation

- serialize 対象キーが1件以上ある URL は、単一の `v=1` を必須とする。欠落、重複、未知 version は room defaults 全体を返す。
- 未知キーは無視する。既知キーの重複、空値、不正 enum / boolean、非 strict-decimal、非有限、範囲外、step 不整合はそのフィールドだけ default に戻し、他の valid field は保持する。
- 旧票の本文は「clamp」、受け入れ基準は「default fallback」と矛盾していた。共有 URL の誤値を別の見た目へ丸めないため、明示的な受け入れ基準である field-default を採用し、clamp / migration / alias は実装しない。
- parser は defaults を変更せず、毎回 fresh settings object を返す。

### 3. HashRouter 双方向同期と履歴

- 初期表示および route/search の navigation ごとに `useSearchParams` から active room settings を hydrate する。query-free room は defaults を意味し、session 内の古い room state を暗黙復元しない。
- UI edit は settings を即時反映し、150ms debounce 後に最新 snapshot から新しい `URLSearchParams` を1回構築する。同じ canonical query なら navigation しない。
- write は常に `setSearchParams(next, { replace: true })`。hook が返す mutable object と functional updater は使用しない。
- pending write は navigation identity に所属し、room switch / back / forward / query navigation で cancel する。古い room の debounce が新しい URL を上書きしない。

## 受け入れ基準

- **ラウンドトリップ**: Voxel storm 系設定を含む任意の shader settings が URL コピー → 新規タブで同じ controls / runtime settings に復元される。
- **差分性**: defaults は query なし。1項目だけ変更するとその1キー + `v=1` だけになり、key order と number representation は canonical。
- **頑健性**: version、enum、boolean、number、range、step、duplicate、unknown key を unit test し、クラッシュや defaults mutation がない。
- **履歴衛生**: 連続 slider input は現在 entry を replace し、history length を増やさない。back は前 room、forward は URL-backed settings を復元する。
- **境界**: embedded reload は URL に出ず、既存 iframe lifecycle、shader runtime、water QA の locale 非依存 preset path は維持する。
- **回帰**: `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` / exhibit sync / production `pnpm qa:visual` / `pnpm qa:water` が通過し、GitHub Pages base path `/ShaderDemoRoom/` 配下で deep link が動作する。

## 参照

- [React Router 7.17 Hash history source](https://github.com/remix-run/react-router/blob/react-router%407.17.0/packages/react-router/lib/router/history.ts#L447-L493)
- [React Router `useSearchParams`](https://api.reactrouter.com/v7/functions/react-router.useSearchParams.html)
- [React Router `NavigateOptions.replace`](https://api.reactrouter.com/v7/interfaces/react-router.NavigateOptions.html#replace)
- [WHATWG URL Standard: `URLSearchParams`](https://url.spec.whatwg.org/#urlsearchparams)

## 完了レポート（2026-07-19）

### 実装

- `url-state.ts` に4室 exhaustive schema、strict parser、diff serializer、`v=1`、canonical sort、150ms debounce / reserved-key constants を追加。Voxel / Glass の domain を state に集約し Controls と codec の二重真実を解消した。
- `ShowroomPage` は active HashRouter location を URL → settings の真値源とし、ユーザー edit だけを settings → URL に送る。room/search navigation は render-time state adjustment で古い settings を子へ公開せず、layout effect は navigation commit 時の timer cancellation / identity 更新だけを担当する。
- pending write は navigation identity を検査し、単一 `replace` で commit する。defaults へ戻すと query と version を削除する。embedded room は URL writer 自体を起動せず、`reloadToken` と既存 query の双方を保持する。
- production visual QA に query-free default、3連続 slider input、canonical single-diff、history length、back / forward、新規 browser page の deep-link hydration、invalid field + valid sibling、unknown key を追加した。

### 検証

- unit: 24 files / 114 tests。default / single diff / full storm / Glass boolean round-trip、version、unknown / duplicate / empty、strict decimal、range / step、sort、transient、fresh clone を通過。
- `pnpm lint` + token lint、`pnpm typecheck`、`pnpm build`、ref→public exhibit sync: pass。Windows exhibit build の既知 EOL-only 差分は ref 非変更を確認して復元し、sync を再検査した。
- production `qa:visual`: 14 screenshots、shared URL `#/room/voxel-water?v=1&waveHeight=1.4` を別 browser page で hydrate、連続 input 前後の history length `3 → 3`、back / forward 復元、invalid field default / unknown ignore、query 付き embedded reload の query 保持 / single remount を hard gate。console error 0、mobile overflow 0、HUD overlap 0、既存 i18n / stage-profile gate も通過。
- production `qa:water`: frameCount 8、meanDelta 3.217、waterCoverage 1、既存 motion / color / structure gate を通過。既存 `data-testid` preset path は変更していない。
- 独立审查は codec/version/canonicalization、HashRouter hydrate / replace、navigation と debounce の臨界競合、embedded transient、visual QA の実効性を確認した。指摘された embedded query 付き reload の二重 remount と passive-effect timer race を URL writer skip / `useLayoutEffect` で修正後、delta review は APPROVE（P0–P2 なし）。
