# [T-GO-07] Glass Optics のクリーンアップを統合実施する(sway 従属・デッド定数・dispose 整理)

- 分類: TA
- 優先度: P3
- 評価軸: デッドコード・デッド出力 / リソースライフサイクル / モーション言語
- 依存: T-GO-01〜06 の**後**に実施(本チケットの項目の一部は先行チケットが該当コードごと置き換えて自然消滅するため、残存項目の後始末として最後に走らせる)。着手時に各項目の生死を再確認すること

## 現状(証拠)

2026-07-19 時点の現物確認による。行番号はすべて `src/rooms/glass-optics/runtime.ts`。

1. **root sway が autoRotate 非従属**: `runtime.ts:411` — `root.rotation.y = Math.sin(motionElapsed * 0.05) * 0.04` が `settings.autoRotate` の分岐(`runtime.ts:407-410`)の**外**で無条件実行。autoRotate OFF でもシーン全体が周期 ~2 分でドリフトし、トグルの意味を曖昧にし、スクリーンショット比較の決定論性を損なう。※第1バッチで導入された motionScale 契約により `motionScale = 0`(reduced-motion)では停止するようになったが、通常環境での非従属は残存。
2. **デッド定数 3 件**:
   - `runtime.ts:78` — `envMapIntensity: 2.15`(コンストラクタ)は毎更新 `1.55 + thickness*0.42`(`runtime.ts:371`)で即上書き。デフォルト実効値 2.075。
   - `runtime.ts:332` — caustics `uIntensity` 初期値 `settings.showCaustics ? 1 : 0` の「1」は `updateMaterial`(`runtime.ts:374`)で即 1.25/0 に上書き。
   - `runtime.ts:87` — `material.ior = settings.ior` はコンストラクタ(`runtime.ts:74` の `ior: settings.ior`)と二重代入(現物確認での新発見。無害だが誤解を招く)。
3. **`direction` の in-place 変異**: `runtime.ts:100` — `direction.multiplyScalar(1.4 / settings.ior)` が正規化済みベクトルを破壊的に変更。reflected 計算(`runtime.ts:97-99`)より後なので現状は順序セーフだが、リオーダーに脆弱(dossier リスク 9)。※T-GO-04 が経路計算を全面置換した場合はそちらで消滅する。
4. **dispose の二重解放**: `runtime.ts:414-435` — `disposeObject(root)` の traverse(`runtime.ts:39-50`)が全ジオメトリ・マテリアルを破棄した後、15 マテリアルの明示リスト(`runtime.ts:416-432`)が同じものを再度 dispose する。three.js の dispose は冪等なので実害はないが、リストは実体追加時の更新漏れ(逆に「リストにあるから安全」という誤信)を生む保守ノイズ。※旧カルテ記載の `renderer.info.reset()` 呼び出しは現行 dispose には存在しない(シェル専有へ移管済み)。
5. **グリッド中心線とコースティクスの輝度競合**: `runtime.ts:176-184` — `GridHelper(16, 32, 0x42e9ff, 0x163949)` opacity 0.28 のシアン中心線が、デフォルトのコースティクスプール位置(x≈0.8-1.6 帯)で床の最輝要素になり得る(dossier リスク 13)。※T-GO-02(グリッド抑制)/ T-GO-03(コースティクス強化)が本丸で解消する想定。本チケットでは両者の完了後に競合が残っていないかの**最終検分と残渣処理**のみを行う。

## 問題

いずれも単独では展示価値を壊さないが、(1) はトグルの契約違反とテスト決定論性の阻害、(2)(3) は「書いてある値と効いている値が違う」ことによる将来チューニングの誤誘導、(4) は実体変更のたびに増える保守コスト。調整バッチ(T-GO-01〜06)で同ファイルを大きく触った後に残すと、次の調整者が再び同じ罠を踏む。

## 改善方向

1. **sway の従属化**: `root.rotation.y` の sway を `settings.autoRotate` 分岐の内側へ移す(トグル OFF = 完全静止)。OFF 遷移時に `root.rotation.y = 0` へ戻すかは「OFF 時点の位相で静止」を採用(ジャンプを避ける)。代替案(sway を常時止めて削除)を選ぶ場合はモーション言語の判断として記録する。
2. **デッド定数の掃除**: コンストラクタの `envMapIntensity` を実効式と同値のコメント付き初期値にするか、`updateMaterial` を生成直後に必ず呼ぶ前提を明記して初期値を除去。caustics `uIntensity` 初期値は `updateMaterial` の式(1.25/0)と単一ソース化(定数抽出)。`runtime.ts:87` の二重代入を削除。※T-GO-02 で envMapIntensity 係数自体が変わっている可能性があるため、着手時の現行値に対して単一ソース化する。
3. **in-place 変異の防御**: T-GO-04 で残存していた場合のみ、`direction.clone()` または一時ベクトルで非破壊化。
4. **dispose の単一経路化**: traverse 破棄(`disposeObject`)を唯一の経路とし、明示リストを削除する。traverse が拾えない非シーングラフ資産(PMREM の `environment.texture` / `pmrem`、`runtime.ts:433-434`)のみ明示 dispose を残す。leak 検査(telemetry の textures/geometries がルーム往復で増えないこと)で等価性を担保する。
5. **輝度競合の最終検分**: T-GO-02/03 完了後の状態で、beamSpread/ior 全域スイープのキャプチャを取り、グリッドがコースティクスを上回る配置が残っていれば当該定数(グリッド opacity/色)を最終調整する。

## 受け入れ基準

- **sway 従属**: autoRotate OFF で 10 秒間のフレーム間差分がゼロ(キャプチャ 2 枚のピクセル一致)であること。ON では従来同様の sway が観測されること。`motionScale = 0` の停止挙動(既存契約)に回帰がないこと。
- **単一ソース化**: `runtime.ts` 内に「代入直後に無条件上書きされる定数」が grep とレビューで検出されないこと。envMapIntensity / uIntensity の実効値が変更前後で不変であること(視覚回帰なし)。
- **dispose 等価性**: glass ⇄ 他ルームの往復 10 回で telemetry の `geometries` / `textures` が入場毎に同値へ戻ること(leak なし)。`pnpm qa:renderer` 系シナリオ通過。
- **視覚非回帰**: sway 従属化以外の項目でスクリーンショットが原寸一致すること(本チケットは挙動を変えないリファクタが主体)。
- **QA 通過**: `pnpm test` / `pnpm lint` / `pnpm typecheck` / `pnpm build` 通過。

## 影響範囲・注意

- **順序が本質**: T-GO-01(updateBeamGeometry 置換)、T-GO-02(床・グリッド・env)、T-GO-03(uIntensity 周辺)、T-GO-04(calculateGlassLightPath 置換)、T-GO-06(シェル/パネルの dispose リスト)がすべて本チケットの対象行を書き換える。**先行チケット完了後に項目リストを現物で棚卸しし、消滅済み項目はチケット上で「解消済み(by T-GO-XX)」と記録して閉じる。**
- **挙動テスト**: sway は現在テスト固定されていないが、従属化を挙動テスト(autoRotate OFF で render 2 回の rotation 不変)として追加すると回帰防止になる。`createGlassMaterial` のテスト(`runtime.test.ts:26-38`)は envMapIntensity を固定していないため定数整理は安全。
- **dispose リスト削除の前提**: `disposeObject` の traverse は root 配下のみを対象とする(`runtime.ts:415`)。root 外に add した実体がないこと(現行は全要素 root 配下)を削除前に確認し、以後も「シーン実体は必ず root 配下」の規約をコメントで残す。
- **スクリーンショット基盤への波及**: sway 従属化により autoRotate OFF での決定論的キャプチャが可能になる。T-QA-02 のピクセルベースライン(将来)や各チケットのビフォー/アフター比較が安定するため、Glass バッチ内で本項目だけ前倒しする選択も可(その場合も他項目は最後に実施)。
