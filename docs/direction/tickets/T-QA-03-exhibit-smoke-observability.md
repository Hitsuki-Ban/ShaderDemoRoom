# [T-QA-03] exhibit smoke の段階可観測性と長時間失敗診断を確立する

- 分類: QA
- 優先度: P1（Pages deploy gate の診断不能を解消）
- 状態: 実装・ローカル検証完了（PR 待ち）
- 評価軸: TA「QA担保」/ CI 運用性
- 依存: T-QA-02 / T-EMB-02 / T-NT-10（完了済み）

## 起票理由（2026-07-22）

T-VW-04 の production regression gate で `pnpm qa:exhibits` を連続実行したところ、Ninth Tide の独立 silent-entry ページで `locator('#audio').getAttribute('src')` が 30 秒 timeout になる事象を2回観測した。一方、同じ production preview URL を新規 browser context から12回連続で直接開く定向 probe は、全回 HTTP 200 / title 正常 / `#audio` count 1 / console error 0 だった。

さらに `qa:exhibits` は実行中に段階ログを出さず、成功時の最終 JSON まで無出力である。直近の成功済み PR Actions run では単体で約6分50秒を要しており、ローカルで5分間無出力だった実行が「正常進行中」「特定 assertion で待機中」「browser/resource stall」のどれかを外部から区別できない。Pages workflow はこの gate を直列実行するため、同じ事象が再発すると deploy の停止理由をログだけで特定できない。

## 確認済み境界

- `public/exhibits/ninth-tide-archive/index.html` は静的に `<audio id="audio">` を持つ。
- production preview の `/ShaderDemoRoom/exhibits/ninth-tide-archive/index.html` は HTTP 200 で同じ要素を返す。
- 独立12回 probe は全回成功したため、現時点で exhibit DOM を変更する根拠はない。
- `qa:exhibits` の silent demand-loading、autoplay retry、host pause、visibility、bridge identity、9章、Orb gesture などの既存 assertion は品質契約であり、削除・緩和しない。
- 自動 retry や timeout 延長を追加して失敗を隠さない。まずどの段階とページ状態で止まったかを一意に報告する。

## 改善方向

1. `scripts/exhibit-smoke.mjs` の長い直列シナリオを名前付き段階として実行し、各段階の `START` / `PASS` / elapsed time を stdout へ即時出力する。
2. 段階失敗時は少なくとも stage 名、現在 URL、document title、main response status/content-type、対象 locator count、収集済み console/page errors を単一の診断へ含める。
3. 補助ページは所有段階の終了時に必ず閉じ、後続 WebGL / media シナリオへ不要な page/resource を持ち越さない。単一 browser/context を使う既存 same-session 契約は維持する。
4. stage runner と診断整形は DOM 文字列ピン留めではなく、合成の成功・失敗・cleanup を unit test できる純粋境界へ分離する。

## 受け入れ基準

- production preview に対する `pnpm qa:exhibits` のログだけで、現在または最後に完了した stage と所要時間を判定できる。
- 故障注入した missing `#audio` ケースが、generic Playwright timeout ではなく `Ninth Tide silent demand loading` とページ診断を含んで失敗する。
- 既存の silent request/load/source、autoplay retry、pause/visibility、bridge、9章、Orb gesture assertions は同じ強度で残る。
- `pnpm qa:exhibits` を production preview に対して連続2回完走し、console/page error 0。`pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` も通る。
- PR Actions の production visual QA ログで段階出力を確認し、deploy gate の成否を変えない。

## T-VW-04 との扱い

本票は T-VW-04 の shader / value-structure 実装と無関係であり、製品ビジュアルへ混ぜない。ただし `qa:exhibits` は Pages の必須 gate なので、T-VW-04 PR を merge する前に本票の診断を着地させ、実際の failure point を確定する。

## 実装報告（2026-07-22）

- `exhibit-smoke` を Orb embedded、Ninth Tide silent demand loading、autoplay retry、embedded lifecycle、standalone previews、Orb standalone gestures、final audit の名前付き stage に分割した。各 stage は開始時に `START`、cleanup 完了後に `PASS` と elapsed milliseconds を即時出力する。
- stage failure は `FAIL`、stage 名、元例外、現在 URL、document title、main document response の status / content-type、対象 selector / locator count、当該 page の console error / page error を一つの診断へ整形する。診断取得自体が失敗した場合も元例外を置換せず、診断失敗を明示する。
- silent-entry と autoplay-retry の補助 page は stage 所有 resource とし、失敗診断を採取した後、成功・失敗の両方で stage 終了時に閉じる。全体の browser は top-level `finally` で閉じ、既存の単一 browser/context same-session 契約は維持した。
- retry、timeout 延長、assertion の削除・緩和は追加していない。既存の audio demand-loading、transport race、pause / visibility、bridge identity、9章 preview、Orb gesture 契約はそのまま実行する。
- stage runner / failure formatting / cleanup を `scripts/exhibit-smoke-stage.mjs` へ分離し、成功ログ、missing `#audio` 相当の failure diagnosis、診断前 cleanup 禁止、reverse cleanup、cleanup failure を unit test した。

### ローカル検証

- `node --check scripts/exhibit-smoke.mjs`: PASS
- `node --check scripts/exhibit-smoke-stage.mjs`: PASS
- `pnpm exec vitest run scripts/exhibit-smoke-stage.test.mjs`: PASS（6 tests）
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm test`: PASS（44 files / 409 tests）
- `pnpm build`: PASS
- `pnpm exhibits:check`: PASS

- production preview で最終コードの `pnpm qa:exhibits` を連続2回実行し、`268.5秒 / 254.4秒` で全7 stage が通過した。両回とも silent request/load/source は `0 / 0 / null`、9章 preview と bridge lifecycle、Orb gesture を維持し、console/page error は `0 / 0`。`Final canvas and error audit` は browser close 完了後にそれぞれ `216ms / 233ms` で PASS した。
- 独立 reviewer の初回审查は、(1) top-level close failure が primary failure を置換しうる、(2) browser close 中の late error を final audit が見落とす、(3) primary + deferred-cleanup 同時失敗時に secondary error が消える、の P2 3件を指摘した。try 境界を context/page/mkdir まで拡張し、final stage cleanup 内で browser close 後に error audit、外層で primary + browser cleanup を `AggregateError` として保持、stage runner で全 cleanup errors を記録するよう修正した。組合せ failure test を追加後、再审查は全 finding closed、`APPROVE`。

PR Actions の stage log と deploy gate は PR 上で確認し、merge 後に本票へ追記する。
