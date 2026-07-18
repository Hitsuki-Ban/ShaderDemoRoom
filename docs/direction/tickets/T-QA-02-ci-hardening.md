# [T-QA-02] CI を lint・ビジュアルQA・メトリクスバジェットで強化する

- 分類: QA
- 優先度: P2
- 評価軸: TA「QA担保」/「フレームバジェット」(計測とビジュアル回帰検知の恒常化)
- 依存: T-QA-01(完了済み。`water-qa.mjs` の操作は `data-testid`、計測は `water-qa-metrics.mjs` に分離されており、段階1の CI 組み込み条件を満たす)

## 現状(証拠)

- 着手前の `.github/workflows/pages.yml`: CI の検証は `pnpm test` → `pnpm build` のみで、lint / typecheck / qa:visual / qa:water と PR 段階の検証ゲートが存在しなかった(docs/direction/dossier-shell.md「既知の課題」#5)
- `package.json` 12-14行: `qa:visual` / `qa:water` / `lint` スクリプトは定義済みだが CI から呼ばれていない
- 着手前の `scripts/water-qa.mjs`: 既定 URL が `http://127.0.0.1:4173` で、`/ShaderDemoRoom/` 配下に配信する production preview と不整合だったため、`SHOWROOM_URL` 未指定の実行は 404 になった(dossier リスク#5、review-framework.md SH-12)
- `scripts/water-qa.mjs` 345-347行: throw するのは console error のみ。算出済みビジュアルメトリクス — `toonBandSeparation`(263行)、`waterCoverage`(261行)、`voxelLocalContrast`(264行)、`colorSignature` / `weatherSeparation`(381-387行)— は**すべて JSON レポート出力のみで assert されない**(dossier 既知の課題#6)
- `docs/direction/captures/fps-samples-2026-07-18.json`: ヘッドレス Chromium(ソフトウェアGL / SwiftShader 系)の実測 — voxel-water は 16-17 FPS で安定、**glass-optics は入場直後 17 FPS → 2-4 FPS へ崩落**。CI ランナーの描画性能特性はこの環境に準ずる(実GPU値ではない)
- 参照: docs/direction/research-webgl-platform.md §2.6(Playwright + Actions での WebGL QA、SwiftShader の決定性とベースライン運用、段階導入の推奨)、§3-10(CI への視覚 QA 段階導入)、review-framework.md SH-6

## 問題

water-qa の領域メトリクスという他所にない QA 資産を持ちながら、CI では活用されず、視覚回帰の検知が完全に手動・ローカル任せになっている。調整フェーズは1チケットごとに視覚回帰リスクを伴うため、CI ゲートがなければ検収コストが人力に張り付き、`"latest"` 依存構成(package.json 18-42行)と相まって「気づかない破壊」が main に到達しうる。qa:water が素で 404 になる罠は、QA 実行そのものの心理的コストを上げている。

## 改善方向

research-webgl-platform.md §2.6 の段階導入プランに従い、2段階で導入する。**本チケットで完了判定するのは段階1のみ**であり、段階2の閾値較正、10連続実行、故障注入は後続の昇格判断に使う証拠であって段階1をブロックしない。

### 段階1(本チケットの完了範囲): 静的検証 + qa:visual/qa:water + アーティファクト保存

- **water-qa baseUrl バグ修正**: `scripts/water-qa.mjs` 5行の既定値を visual-smoke と同一の `http://127.0.0.1:4173/ShaderDemoRoom` に統一(素の `pnpm qa:water` の 404 解消)
- **lint ステップ追加**: pages.yml の Test の前に `pnpm lint` を追加
- **production preview 上の QA**: `pnpm build` 後に preview を起動し、`/ShaderDemoRoom/` の URL ポーリングが成功してから `qa:visual` と `qa:water` を実行する。Playwright Chromium と Linux 依存は workflow 内で明示的に導入する
- **ソフトGL 性能特性への配慮**: fps-samples-2026-07-18.json のとおり glass-optics はソフトGLで 2-4 FPS まで落ちる。visual-smoke の settle は単一の `QA_SETTLE_SCALE` で制御し、ローカル既定値を 1、CI を 2 とする。不正値は即時失敗し、別名や暗黙値は持たない。**FPS 数値の CI アサートは行わない**
- **スクリーンショットのアーティファクト保存**: `output/playwright` / `output/water-qa`(PNG + JSON レポート)を `actions/upload-artifact` で保存(retention 例: 14日)。PR レビュー時の視覚検収を Actions から辿れるようにする
- **PR トリガー追加**: lint / test / build / qa ジョブは `pull_request` でも実行し、deploy ジョブは従来どおり main push のみに限定する

### 段階2(閾値較正後): water-qa メトリクスのプリセット別バジェットアサート化

- 蓄積済みレポート(output/water-qa)+ CI 環境で複数回実行した分布から、preset ごとのバジェットを較正する。例:
  - storm: `waterCoverage` 下限、`toonBandSeparation` の範囲、`skyLuma` 上限(暗い空)
  - clear ↔ storm 間: `weatherSeparation`(hueMean 距離 / cyanBias 差)の下限 — サムネイル判別性(VW-2)の数値的裏付け
- 閾値導入時は較正済み設定を単一の必須経路として設計し、`QA_ASSERT` のような旧経路併存用スイッチは追加しない
- スクリーンショットのベースライン画像比較まで踏み込む場合は、**CI 環境で生成したベースライン**を使い `maxDiffPixelRatio: 0.01` を出発点にケース別調整(research §2.6。ローカル生成ベースラインとの比較は禁止)

## 段階1の受け入れ基準

- `SHOWROOM_URL` 未指定で `pnpm build && pnpm preview` + `pnpm qa:water` がローカルで 404 にならず完走し、JSON レポートを出力する
- main への push で lint / typecheck / test / build / exhibit sync / qa:visual / qa:water がすべて実行され、いずれかの失敗でデプロイが止まる
- PR 作成時に同じ検証ジョブが走り、deploy ジョブは走らない
- CI 実行のスクリーンショット(desktop 4室 + mobile 3室、water-qa の canvas/page PNG)が Actions アーティファクトとしてダウンロードできる
- `pnpm test` / `pnpm lint` / `pnpm build` が緑(水面・シェルの見た目には一切変更を加えない)

## 段階2へ進むための証拠(段階1の非ブロック項目)

- CI 10連続実行で偽陽性 0 を記録する
- 一時ブランチで `console.error` を故障注入し、qa:visual が赤になることを確認する
- 段階2実装後、WEATHER_LOOKS を意図的に劣化させ、プリセット別バジェットが赤になることを確認する

## 影響範囲・注意

- **T-QA-01 の着地済み境界**: water のメトリクス関数は `water-qa-metrics.mjs` に分離済みで、操作セレクタも `data-testid` 化済み。Stage 1 はこの公開 QA seam をそのまま利用し、メトリクス閾値や描画ロジックには触れない
- **SwiftShader とベースライン(research §2.6)**: ソフトGLの出力は実GPUと微妙に異なる。画像比較を導入する場合は必ず CI 生成ベースラインを使用。SwiftShader はキャンバス初期化が遅くタイムアウト起因のフレークが既知 — タイムアウト増とリトライを設計に含める
- **glass-optics の崩落特性**: fps-samples のとおり入場直後に 17→2-4 FPS へ落ちるため、settle 待ちが不足すると「描画途中のフレーム」を撮ってしまう。settle 延長は qa:visual の全ルームに一律でなくルーム別に調整できる形が望ましい
- **Pages デプロイ経路の保全**: configure-pages → upload-pages-artifact → deploy-pages の流れと `concurrency: group: pages` に触れない。PR トリガー追加時は deploy ジョブが `github.event_name == 'push'` 条件等で確実にスキップされることを確認する
- **永続レンダラー設計との順序**: 承認済み設計(WebGLRenderer をルーティング上位で1個生成・antialias 常時有効・内部解像度スケーリング)が着地すると描画特性が変わる。段階2のバジェット較正は永続レンダラーチケットの後に行うのが効率的(先に較正すると再較正が必要になる)
- **renderOrder 連鎖(横断注意5)**: 本チケット自体は描画に触れないが、段階2のバジェットは透明パス構成の変更(VW-9 等)で分布が動く。バジェット逸脱時の一次切り分け手順(どのチケットが較正値を動かしたか)をレポート JSON の label 運用に含めること
