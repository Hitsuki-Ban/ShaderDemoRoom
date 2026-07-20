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
- glass ⇄ 他ルームを10往復して、各退出後の telemetry `geometries` / `textures` が初回退出後と同値へ戻ること。
- `environment.texture` と `pmrem` が各 session で1回解放されること。
- `referenceTexture` が各 session で1回解放されること。
- 視覚差分がなく、`pnpm test` / `pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm qa:renderer` を通過すること。

## 影響範囲・注意

- autoRotate=false の sway 停止は比較キャプチャの前提として T-GO-02 が所有する。
- envMapIntensity は T-GO-02、uIntensity は T-GO-03、光路 Vector3 の非破壊化と TubeGeometry churn は T-GO-04、グリッド輝度は T-GO-02/03 がそれぞれ所有する。本票へ残余対応として戻さない。
- root 外資産が新たに見つかった場合は所有者を明示し、本票の唯一の成果である「解放経路の単一化」の範囲で扱う。
