# [T-GO-01] FPS 崩落の実測特定と TubeGeometry 再生成チャーンを解消する

- 分類: TA
- 優先度: P1
- 評価軸: フレームバジェット / リソースライフサイクル
- 依存: なし(第1バッチ T-SH-01/02/03 完了が前提。本チケットは Glass バッチの他チケットに先行して着手可。ビーム形状の最終形は T-GO-04 と共有するため「改善方向 3」の設計を T-GO-04 と合意してから実装する)

## 現状(証拠)

- **ソフトウェア GL での崩落実測**: `docs/direction/captures/fps-samples-2026-07-18.json` — headless Chromium(SwiftShader 系)で glass-optics は入場直後 17 FPS → 2-4 FPS へ崩落(サンプル列 `17, 2, 4, 4, 4, 4, 4, 4`)。voxel-water は同環境で 16-17 FPS 安定。draw calls は両ルーム 19 一定。T-SH-03 完了レポートの再計測でも glass は 8 窓 3.09-4.62 FPS(全 19 calls)で再現している。
- **実 GPU の基準値が未記録**: T-SH-03 の `pnpm qa:telemetry-reference`(schema v1、`docs/direction/captures/telemetry-reference-2026-07-18.json`)は **voxel-water のみ**を計測しており(SwiftShader median 15.37 FPS / RTX 4070 Ti median 200 FPS)、glass-optics の hardware 分類での参考値が存在しない。「崩落がソフトウェア GL 固有か、実 GPU でも予算超過か」が未確定。
- **崩落は無操作で発生する**: fps-samples の手法は「入場 2.5s 待機後 1s 間隔サンプル」でスライダー操作を含まない。したがって崩落の原因は per-frame の描画コスト(第一容疑: MeshPhysicalMaterial `transmission: 1` によるフルシーン transmission バッファ描画。`src/rooms/glass-optics/runtime.ts:72`)であり、下記の Tube 再生成とは**別問題**として切り分けが必要。
- **設定更新ごとの TubeGeometry×6 dispose+再生成**: `runtime.ts:122-127` `updateBeamGeometry()` が core/glow の 2 本を dispose → `createTubeGeometry()` で new し、`updateLightPath()`(`runtime.ts:357-359`)が 3 ビーム分呼ぶ = **1 回の設定更新で 6 ジオメトリ再生成**。`updateSettings` → `updateMaterial` → `updateLightPath` は無条件呼び出しで dirty-check がなく(`runtime.ts:384, 390-393`)、**roughness のみの patch でも光路全再構築**が走る。スライダードラッグは input tick ごとに `onPatch` が届くため、ドラッグ中は毎 tick 6 ジオメトリの GC/GPU バッファ再アロケーションになる。
- **再生成 1 回あたりのコスト**: `createTubeGeometry`(`runtime.ts:57-65`)は CatmullRomCurve3 + `TubeGeometry(curve, max(16, points.length*12), radius, 8, false)`。2-3 点の経路で tubularSegments 24-36 × radialSegments 8 の頂点・インデックス・法線・UV を毎回フル生成する。
- **計測基盤は整備済み**: T-SH-03 により RoomStats は fps / frameTimeMs / frameTimeP95Ms / drawCalls / trianglesAvg / textures / **geometries** / programs / environment(software|hardware|unknown 分類)を持ち(`src/rooms/types.ts:64-77`)、HUD の `data-telemetry-json` から未丸め値を QA が読める。`renderer.info` はシェル専有(`src/shared/three/roomAnimationLoop.ts:83-112` がフレーム末尾で reset)。

## 問題

公開ページの telemetry rail が一桁 FPS を表示する状態は、60 FPS を約束するショールームの信頼性を直接毀損する(review-framework.md P1 定義そのもの)。かつ現状は「実 GPU での実力値」が未計測のため、修正の目標値も回帰判定の基線も存在しない。加えてスライダー操作毎の 6 ジオメトリ再生成は低スペック端末のドラッグ操作カクつき要因であり、リソースライフサイクル軸の明確な不合格。

## 改善方向

計測 → 原因特定 → 修正の 3 段構え。research-glass-optics.md §2.5(BufferGeometry in-place 更新)・§2.6(transmission チューニング)に基づく。

1. **実 GPU プロファイルの取得(先行タスク)**: `scripts/telemetry-reference.mjs` を glass-optics 対応に拡張し(room 指定と glass 用アサーション)、T-SH-03 と同じ手順(5s warm-up + 15s measurement、classification=`hardware` を hard assert した D3D11 capture)で glass の hardware / software 両基準値を `docs/direction/captures/` に記録する。あわせてブラウザの GPU プロファイラ(about:tracing / Performance パネル)で transmission パスと FX オーバードローの内訳を 1 回取り、崩落の主因を文書化する。
2. **per-frame コストの緩和**: 主因が transmission バッファと確認できた場合、`renderer.transmissionResolutionScale = 0.5`(r172+、three 0.184 で利用可)を第一手とする。注意: `RoomRuntimeContext.renderer` は `{ render }` のみの絞られた型(`src/rooms/types.ts:90-97`)でルームから renderer グローバルに触れない。T-SH-04「明示的な後続課題」が予告した **shader room 限定の capture → validate/apply → create → finally restore シーム**をプラットフォーム側に追加して適用する。復帰は既存の `RendererStateSnapshot`(`src/shared/three/rendererState.ts:13,29,39` に transmissionResolutionScale 収載済み)+ `disposeRuntimeSession`(`src/shared/three/runtimeSession.ts:50-60`)が既に保証している。ソフトウェア GL では 0.33 への追加縮退(environment 分類で分岐)も検討する。
3. **Tube 再生成の全廃**: ビーム 6 本を**起動時に固定トポロジーで確保**し、更新時は頂点位置のみ書き換える方式へ変更する。
   - 実装は research §2.5 の 2 案から選ぶ: (a) 直線区間前提の `CylinderGeometry` 再利用(position/quaternion/scale 変換のみ。T-GO-04 の物理光路化後は全区間が直線になるため最終形はこちらが本命)、(b) セグメント数固定の TubeGeometry を 1 回生成し `geometry.attributes.position` へ in-place 書き込み + `needsUpdate` + `computeBoundingSphere()`(`setUsage(DynamicDrawUsage)` 指定)。T-GO-04 の着手順に応じて選定し、二度作り直さないこと。
   - あわせて `updateSettings` に **dirty-check** を導入する: 光路に影響するキー(lightX/Y/Z, beamSpread, ior)が変わったときだけ `updateLightPath()` を、マテリアル系キーだけの patch では材質更新のみを実行する。

## 受け入れ基準

- **基準値の記録**: glass-optics の telemetry reference capture(schema v1)が hardware / software 両分類で `docs/direction/captures/` に存在し、renderer string と classification が記録されていること。
- **実 GPU 予算**: hardware 分類環境で glass-optics が 60 FPS(最低 30 FPS)を満たすこと。満たさない場合は原因の内訳文書と追加チケットを残すこと。
- **ソフトウェア GL の崩落緩和**: fps-samples-2026-07-18.json と同一手法の再計測で、緩和後の定常値が現行 2-4 FPS から有意(2 倍以上を目標)に改善するか、改善不能な場合はその理由(SwiftShader の transmission 実装コスト)を計測付きで文書化すること。voxel-water の FPS に ±5% を超える回帰がないこと。
- **アロケーション・ゼロ**: スライダードラッグ中(lightX を 3 秒間連続変化させる Playwright シナリオ)に telemetry の `geometries` が増減せず一定であること。DevTools heap プロファイルで TubeGeometry/BufferAttribute の毎 tick 生成が消えていること。
- **dirty-check**: roughness のみの patch で光路再計算・頂点書き込みが実行されないこと(挙動テストで固定)。
- **描画非回帰**: draw calls 19 を維持(T-SH-02 の production hard gate)。`pnpm qa:visual` 通過、ビームの見た目がスクリーンショット原寸比較で同等であること。
- **renderer 状態復帰**: transmissionResolutionScale を変更した場合、glass 退出後に他ルームで 1.0 に戻っていること(`pnpm qa:renderer` 系シナリオに検査を追加)。

## 影響範囲・注意

- **挙動テスト更新**: `src/rooms/glass-optics/runtime.test.ts:61-72` は `createTubeGeometry` の存在と TubeGeometry 型を挙動として固定している。ジオメトリ方式を変えたら同テストを新 API の挙動テストに置き換える(文字列ピン留めは T-QA-01 で廃止済みなので定数変更自体は安全)。
- **renderer.info 規約**: 計測はシェル専有の info 集計(T-SH-02/03 規約)に載せる。ルーム側から `renderer.info.reset()` を呼ばないこと(現行 glass の dispose は既に呼んでいない — 旧カルテの記述は解消済み)。
- **T-GO-04 との共有**: ビームジオメトリの持ち方は T-GO-04(光路の物理化)が同じコードを書き換える。本チケットを先行する場合は「固定トポロジー + 点列入力」のインターフェースにしておき、T-GO-04 は点列の計算だけを差し替えられる形にする。
- **プラットフォーム接触**: renderer プロファイルシームの追加は `src/shared/three/` 側の変更になる。T-SH-02 契約(ルームは renderer グローバルを所有しない)を壊さず、シェル側で適用・復帰を完結させること。
