# [T-SH-05] 設定の URL シリアライズを導入する(共有可能状態 + QA ディープリンク)

- 分類: Platform
- 優先度: P3
- 評価軸: QA 担保 / コントラクト遵守(ロングリスト SH-5。共有可能なアートディレクション状態)
- 依存: なし(T-SH-02 (e) の settings readonly 化・deep copy と併走可。water-qa の URL 注入活用は本チケット完了後)

## 現状(証拠)

- `src/app/ShowroomPage.tsx:33` — `settingsByRoom` は単一の `useState` のみで、URL / localStorage へのシリアライズなし。リロードで全設定消失、調整結果の共有・ブックマーク不可(dossier-shell.md「状態フロー」節)。
- `scripts/water-qa.mjs:320-325` — QA のプリセット注入は 'Storm preset' / 'Calm preset' / 'Rain' のボタン文字列クリックに依存しており、i18n 化でサイレントに壊れる既知リスク(dossier-shell.md リスク #4)。URL 注入が可能になればこの結合を切れる。
- ルーティングは HashRouter(`src/app/App.tsx:8`)。クエリはハッシュ内側(`#/room/x?k=v`)になるため `window.location.search` は常に空という罠がある(research-webgl-platform.md §2.7)。

## 問題

調整フェーズの成果(アートディレクション状態)を URL で共有・再現できず、QA もロケール依存のボタンクリックでしかプリセットを注入できない。静的ホスティング(Locked Decision #1)では URL が唯一のサーバレス状態コンテナである。

## 改善方向

research-webgl-platform.md §2.7 および §3 P2-6 の設計提案に従う。

1. 新規 `src/shared/url-state.ts`(仮)で **既定値と異なるキーだけの差分シリアライズ**を実装。形式例: `#/room/voxel-water?weather=storm&waveHeight=1.4&v=1`。スキーマバージョン `v=1` を必須キーに。
2. 読み書きは react-router の `useSearchParams` / `useLocation` を使用(HashRouter の内部 location に対して動くため安全。`window.location.search` を読むサードパーティフックは使用禁止)。
3. パースは registry の `defaultPreset` にマージ+各ルームの min/max/step でクランプ。不正値は黙って既定値へ。
4. スライダードラッグ中は debounce + `setSearchParams(..., { replace: true })` で履歴汚染を防止。
5. QA ディープリンク: 予約キー(例 `qaTime=12.5` による経過時間固定)を仕様として予約だけ行い(実装は任意)、water-qa の `QA_PRESET` をボタンクリックから URL 注入へ移行できる下地を作る。

## 受け入れ基準

- **ラウンドトリップ**: 任意の設定変更 → URL コピー → 別タブで開く、で同一の見た目・設定値が再現されること(voxel-water の storm 系設定で確認)。
- **差分性**: 既定値のままなら URL にクエリが付かないこと。1 項目だけ変えれば 1 キー+`v` のみ付くこと。
- **頑健性**: 範囲外値・未知キー・不正型を含む URL でもクラッシュせず既定値へフォールバックすること(ユニットテスト)。
- **履歴衛生**: スライダーを連続ドラッグしてもブラウザ履歴が 1 エントリのまま(back で前のルームへ戻れる)。
- **回帰確認**: GitHub Pages のベースパス(`/ShaderDemoRoom/`)配下でリンクが機能すること。`pnpm test / lint / build / qa:visual` 全通過。water-qa の既存ボタンクリック経路が引き続き動作すること。

## 影響範囲・注意

- **water-qa.mjs セレクタ**: 本チケット自体はボタンセレクタ(scripts/water-qa.mjs:320-325)を変更しないが、完了後に QA_PRESET の URL 注入化(i18n 結合の解消)を後続タスクとして起票すること。
- **文字列ピン留めテスト**: shader-quality.test.ts / runtime.test.ts のピン留め対象(ルーム runtime ソース)には触れない。ShowroomPage / 新規モジュールのみの変更に留める。
- **HashRouter の罠**: `window.location.search` は常に空。実装・テストとも react-router 経由でのみクエリへアクセスすること(research-webgl-platform.md §2.7 の issue 参照)。
- **T-SH-02 (e) との整合**: URL パース結果は defaultPreset への直接 merge で参照を汚染しないこと(deep copy 前提)。
