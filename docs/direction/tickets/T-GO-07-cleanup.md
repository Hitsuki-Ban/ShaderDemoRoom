# [T-GO-07] Glass Optics の dispose を単一所有経路へ整理する

- 分類: TA
- 優先度: P3
- 評価軸: リソースライフサイクル
- 依存: T-GO-01〜06 の後に実施(最終シーングラフを対象にする)

## 現状(証拠)

- T-GO-06 完了後の `src/rooms/glass-optics/runtime.ts` は `disposeObject(root)` の traverse で全ジオメトリ・マテリアルを破棄した後、9 マテリアルの明示リストを再度 dispose する。three.js の dispose は冪等だが、2つの所有リストが将来の追加/削除でドリフトする。
- root の material から参照される `referenceTexture` は material の `dispose()` では解放されないため、明示的な所有権が必要。
- root 外の PMREM 資産 `environment.texture` / `pmrem` は traverse では回収できず、明示的な所有権が必要。
- 旧カルテ記載の `renderer.info.reset()` 呼び出しは現行 dispose には存在せず、シェル専有へ移管済み。

## 問題

同じシーングラフ資産を traverse と手書きリストの二経路で解放しており、実体追加時に「どちらへ登録するか」という不要な判断と更新漏れを生む。

## 改善方向

`disposeObject(root)` を root 配下の Geometry / Material を解放する唯一の経路にする。重複する明示 material リストを削除し、material が所有しない `referenceTexture` と root 外で所有する `environment.texture` / `pmrem` だけを明示 dispose する。シーン実体は必ず root 配下へ追加する不変条件を runtime の所有境界に記す。

## 受け入れ基準

- dispose 実装に root 配下 material の手書きリストが存在せず、各 root 資産の `dispose` 呼び出しが1回だけであることを spy テストで固定する。
- glass ⇄ 他ルームを10往復して、各退出後の telemetry `geometries` / `textures` / `programs` が初回退出後と同値へ戻ること。
- `environment.texture` と `pmrem` が各 session で1回解放されること。
- `referenceTexture` が各 session で1回解放されること。
- 視覚差分がなく、`pnpm test` / `pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm qa:renderer` を通過すること。

## 影響範囲・注意

- autoRotate=false の sway 停止は比較キャプチャの前提として T-GO-02 が所有する。
- envMapIntensity は T-GO-02、uIntensity は T-GO-03、光路 Vector3 の非破壊化と TubeGeometry churn は T-GO-04、グリッド輝度は T-GO-02/03 がそれぞれ所有する。本票へ残余対応として戻さない。
- root 外資産が新たに見つかった場合は所有者を明示し、本票の唯一の成果である「解放経路の単一化」の範囲で扱う。

## 実装結果 (2026-07-21)

- root traverse は Geometry / Material を object identity の `Set` へ集約してから各1回だけ解放する単一経路になり、9 material の手書きリストを削除した。Glass の `coreBeams` / `glowBeams` と Voxel Water の `columns` は `InstancedMesh.dispose()` を各1回呼び、geometry dispose だけでは回収されない `instanceMatrix` / `instanceColor` の WebGL buffer も所有経路へ含めた。
- `referenceTexture`、PMREM 出力 target、PMREM generator は root 外資産として各 session の明示 cleanup に残した。PMREM bake 用の一時 scene は成功・失敗の双方で直ちに traverse dispose する。
- 実機調査で、three r184 は Scene ごとの `WebGLRenderState` 内に Camera ID ごとの transmission target を保持し、per-Scene の公開 release API を持たないことを確認した。永続 renderer に対して毎 session 新しい Scene / Camera を渡す旧実装は、Glass へ入るたびに `renderer.info.memory.textures` を1ずつ増加させていた。これは r185 と 2026-07-20 時点の dev でも同じ構造であり、`renderer.info.reset()` / `renderLists.dispose()` / `Scene.clear()` では解放できない。
- Glass runtime は `WeakMap<HTMLCanvasElement, { scene, camera, owner }>` の1スロット lease を使う。同一 canvas の順次 session は安定した Scene / Camera identity を再利用し、session ごとの root と GPU 資産だけを新規作成・解放する。同一 canvas の同時 runtime は fail fast、異なる canvas は独立、構築失敗・dispose 例外でも lease は `finally` で解放する。dispose 後に Scene の root / background / environment / fog / override material が残れば次回 acquire は黙って修復せずエラーにする。
- `qa:renderer` は Voxel Water 首発 scenario に10回の Glass → Voxel 往復を追加した。各 room の新しい telemetry publication を room ID と publication index で待ち、全 raw `calls / textures / geometries / programs / state` を `output/renderer-lifecycle.json` へ保存する。初回 Voxel 退出値を platform baseline とし、後続9回の textures / geometries / programs を exact compare する。telemetry protocol が software FPS の絶対値を跨環境 hard gate にしないため、旧 `voxelMean >= 14.9` assert は削除し、samples / mean / log は診断値として維持した。

## 検証記録 (2026-07-21)

- Unit: 35 files / 279 tests pass。stable Scene / Camera の順次再利用、同一 canvas の並行 acquire 拒否、構築失敗後の再 acquire、全 unique root Geometry / Material、Glass 2 batches、Voxel columns、reference texture、environment target、PMREM generator の各1回 dispose を spy で固定した。root asset の dispose を故意に失敗させても残りの material / root 外 GPU asset をすべて cleanup し、元の例外を再送出したうえで同じ canvas の lease を再取得できることも固定した。
- Static: `pnpm lint`、`pnpm typecheck`、`pnpm build`、`git diff --check` pass。
- Glass QA: 16 states pass、default topology 15 calls。180 frame の continuous drag は calls `15 → 15`、textures `5 → 5`、geometries `23 → 23`、warmed programs `15 → 15`、forbidden allocation 0、console error 0。normal / reduced-motion の静止画は 1秒対11秒で pixel diff 0。
- Renderer lifecycle: 2 visit orders × 20 mixed switches pass。追加10往復は全 round で Glass `calls/textures/geometries/programs = 15/5/23/14`、Glass 退出後の Voxel は `19/2/19/6`。Voxel programs も10回すべて6で安定した。
- 独立 review は初回に cleanup 例外で後続 dispose が短絡する経路と programs が診断値だけだった経路を P2 として検出した。全 cleanup step を試行して最初の失敗を再送出する処理、fault-injection test、programs exact gate を追加し、検証記録の test 数も同期した後の delta review は `APPROVE`。独立 verifier も 44 targeted tests、279 full tests、lint、typecheck、両 QA artifact の raw 値を再検査して `PASS` とした。
