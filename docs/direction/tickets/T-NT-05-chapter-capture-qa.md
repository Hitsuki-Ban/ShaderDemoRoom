# [T-NT-05] 章別キャプチャを QA 公式化し preview 既定章を是正する

- 分類: QA
- 優先度: P2
- 評価軸: QA 担保(ピクセル証拠の常設化)/ ヒーローショット成立性(QA 既定章が最も非代表的な外観を過剰代表する問題)
- 依存: T-EMB-02 / T-QA-02(完了済み)。T-NT-02 / T-NT-04 の検収基盤になるため先行実施を推奨

## 現状(証拠)

### 済んでいるもの(第1バッチでカバー済み)

- **ブリッジ v1 の QA フックは実装済み**: `qa:exhibits`(scripts/exhibit-smoke.mjs)が本番 iframe 経由で `set-tide-preview` を 9 章すべてに送信し(:347–358)、standalone `?preview=main&section=0..8` も 9 章検査する(:370–380)。ただし**アサートは DOM のみ**(`#phaseNumber` のローマ数字一致、canvas 数 1)でピクセル証拠は取らない。
- `qa:visual`(scripts/visual-smoke.mjs)は Ninth Tide の stage-profile paired luma gate(3 region)を持つが、iframe 内はゲート画面のみで**本編 9 章の視覚検査はない**。
- 章別キャプチャの実績: `docs/direction/captures/ninth-tide-opening.png` / `ninth-tide-ch1..9.png` / `ninth-tide-ending.png`(2026-07-18、`capture.mjs` で取得)。NT-1「本編ビジュアルの証拠ゼロ」ギャップ自体は解消済み。

### 残っている問題(本票のスコープ)

- **capture.mjs は QA パイプライン外の使い捨てスクリプト**(docs/direction/captures/capture.mjs): 出力先が `F:/WorkSpace/...` のハードコード絶対パス(:5)、`waitForTimeout(4500)` の sleep 依存(:37)でアサートなし。決定論フック `window.__NINTH_TIDE_STEP__`(ref main.js:3019–3048 の `stepPreview`)を使っていない。さらに README が「新しい性能基準には使用しない」と明記した旧 FPS チップサンプリング(:43–58)を同梱したまま。
- **この展示だけ docs/ に QA ログが存在しない**(カルテ既知課題 7。glass-optics / voxel-water にはある)。
- **`preview=main` の既定 section は 4 = 第V章**(ref main.js:3044 `section = mode === 'ending' ? 8 : mode === 'opening' ? 0 : 4;`)。第V章は九章で唯一の暖色(金)パレット(main.js:80–90 の palettes、「暖色は第V章のみ」規則)であり、原典ヒーロー `ref/.../preview.png` は**第VIII章**の瞬間。README「要確認事項」に既定章の不一致として登録済み。section 無指定の QA スチルは展示の最も非代表的な外観を系統的に過剰代表する。

## 問題

本編の視覚証拠が一度きりの手動スクリプトに依存しており、T-NT-01〜04 などの ref/ 改修で 9 章の見た目が退行しても機械検知できない。また QA 既定章(暖色の第V章)が原典ヒーロー(寒色の第VIII章)と食い違ったままでは、無指定キャプチャ・サムネイル・共有スチルが展示の性格を誤って代表し続ける。

## 改善方向

1. **capture.mjs を `qa:tide-captures`(仮)として scripts/ に昇格**する:
   - sleep 依存を廃し、`?preview=main&section=N` ロード後に `__NINTH_TIDE_STEP__` を固定回数呼ぶ決定論ステップ方式へ(T-NT-02 の固定 seed ディザと合わせて連続実行でピクセル安定にする)。
   - 出力先を `output/playwright/`(gitignore 済み)の相対パスにし、opening + 9 章 + ending の 11 枚を生成。
   - 章別の軽量ピクセルアサートを追加: (a) 全章で canvas 非全黒(ending は「非ゼロだが低輝度」の帯域指定)、(b) 暖色 hue 優勢は第V章のみ(他 8 章は寒色系)、(c) 章ごとの平均輝度が登録レンジ内。厳密なピクセル baseline は T-QA-02 Stage 2 の方針(相対指標優先)に合わせ、まずは範囲ゲートに留める。
   - 旧 FPS チップサンプリング部は削除(履歴証拠は captures/fps-samples-2026-07-18.json として保存済み。性能は telemetry protocol v1 が正)。
2. **既定 section の是正(ref/ 側)**: `preview=main` の既定を 7(第VIII章 = 原典ヒーロー)へ変更する。ブリッジ `set-tide-preview` は mode+section 必須のため影響なし。`qa:exhibits` / capture 系は section 明示のため影響なし。変更判断と根拠を README「要確認事項」から本票へ引き取り、解消として記録する。
3. **docs/direction/ に Ninth Tide の QA ログを新設**し、章別キャプチャの取得手順・アサート内容・実行結果を glass-optics / voxel-water のログと同格で記録する(T-NT-03 のオンセット比較ログの置き場も兼ねる)。

## 受け入れ基準

- 新スクリプトが `pnpm build && vite preview` 起動下でヘッドレス実行でき、11 枚(opening + ch1..9 + ending)を生成し、上記 (a)(b)(c) をアサートして console error 0 で完走する。
- 決定論: 連続 2 回実行のキャプチャが一致(T-NT-02 未実施の間は「アサート結果の一致」まで、実施後は「ピクセル一致」に格上げ)。
- 既定章: `?preview=main`(section 無指定)で `#phaseNumber` が VIII を表示する。`qa:exhibits` の既存 9 章検査(明示 section)は変更なしで通過する。
- ドキュメント: QA ログ新設、README「要確認事項」の該当行(preview=main 既定 section 4 vs 原典ヒーロー VIII)を解消済みとして更新、captures/README 相当の再取得手順を新スクリプトに差し替え。
- CI: `qa:tide-captures` を T-QA-02 の CI 構成(Pages workflow)に組み込むか、組み込まない場合はローカル必須ゲートとして tickets/README の着手順に明記する。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` 通過。

## 影響範囲・注意

- 既定 section 変更は **ref/ 側の改修 → `pnpm exhibits:build` で再生成**(public 手編集禁止、`exhibits:check` が同期強制)。`__NINTH_TIDE_PREVIEW_SECTION__` 明示経路・URL `&section=` 明示経路の挙動は変えない。
- 既定章の変更で「無指定 preview=main」を撮っていた既存スクリーンショット(あれば)の見た目が変わる — 差し替え対象を洗って本票内で更新する。
- ピクセルアサートのレンジは T-NT-01/02/04 の改修で変動しうる。レンジ定数は 1 ファイルに集約し、各 NT 票の検収時に更新する運用を QA ログに明記する(文字列ピン留めテストの轍を踏まない — review-framework 横断注意 1)。
- SwiftShader CI では色・輝度が実 GPU と微差を持つ(T-QA-02 の知見)。レンジゲートは CI 環境で較正すること。
- 参照: カルテ「QA/プレビュー経路」「調整候補の種 P1」、README「要確認事項」、review-framework NT-1
