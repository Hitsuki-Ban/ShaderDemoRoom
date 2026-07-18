# [T-QA-01] 文字列ピン留めテストを挙動ベーステストへ置換する

- 分類: QA
- 優先度: P1(review-framework.md ロングリスト SH-11 の仮 P2・優先度定義の P3 例示からの**昇格判断** — 文字列ピン留めが全アート調整チケットのブロッカーであるため。昇格理由の詳細は「問題」節)
- 評価軸: TA「QA担保」(テストが挙動でなく文字列をピン留めしていないか)
- 依存: なし(本チケットが全アート調整チケットのブロッカー解除。VW-*/GO-* 系および永続レンダラーチケットより先に着地させる)

## 現状(証拠)

現行のユニットテスト4本のうち3本が `?raw` import によるソース文字列一致テストであり、定数1つの変更でテストが割れる。

- `src/rooms/voxel-water/shader-quality.test.ts`
  - 2-5行: `water.frag.glsl` / `runtime.ts` / `water.vert.glsl` / **`scripts/water-qa.mjs`** までを `?raw` で import し、部分文字列の存在/不在を約40ケースでピン留め
  - 33-34行: `PRESENTATION_DRIFT_AMPLITUDE = 0.018` / `PRESENTATION_DRIFT_SPEED = 0.035` の数値リテラル一致
  - 86-87行: `camera.position.set(5.8, 7.2, 13.8)` / `camera.lookAt(0, -0.08, -5)` のカメラ位置リテラル
  - 96行・100-102行: hex `0x8efff0` と算術式 `weatherLook.rainCurtain * 0.07 + weatherLook.strength * 0.16` の文字列一致
  - 129-133行: 波アドベクション定数 `0.44 + uWind * 0.15` を vert シェーダーと runtime の両方でピン留め(係数調整=即テスト破損)
  - 135-143行: `VOXEL_GRID_SIDE = 64` 等バジェット定数7個の一括ピン留め
  - 23-30行: renderOrder テストは `'plane.renderOrder'` 等の**部分文字列の存在のみ**を見ており、実際の順序関係(透明パスの描画順)は一切検証していない — リネームで割れるのに、順序を逆にしても割れない
  - 198-203行・219-223行・260-264行: `water-qa.mjs` 内の識別子(`regionMetrics` / `toonBandSeparation` / `colorSignature` 等)の存在チェック — QAスクリプトのリファクタまでテストと結合
- `src/rooms/glass-optics/runtime.test.ts`
  - 22-27行: `lightX: -0.05` 等プリセット数値6個のリテラル一致
  - 32-34行: `uTime * 0.018` / `material.opacity = 0.28` の係数一致
  - 48行・51行: `(refractedA.x + refractedB.x) * 0.5` / `caustic * 0.82 * uIntensity` の式一致
- `src/shared/three/ShaderCanvas.test.ts`
  - 6-9行: `const rawDelta = timer.getDelta()` 等の実装文字列4個(等価リファクタ=変数リネームで破損)
  - 13-14行: `roomId === 'voxel-water' ? 0.6 : 2` / `antialias: room.id !== 'voxel-water'` — 後者は**承認済みの永続レンダラー設計(antialias 常時有効・品質差は内部解像度スケーリングで吸収)で削除される行**をピン留めしており、そのままでは設計実装時に確実に割れる
- `src/rooms/voxel-water/state.test.ts` は対照的に既に挙動ベース(20-36行: 「storm は default より荒く・泡が多く・透明度が低い」という関係アサート、しきい値アサート)であり、置換後テストのモデルになる
- `scripts/water-qa.mjs` 320-326行: プリセット注入が `page.getByRole('button', { name: 'Storm preset' })` / `'Calm preset'` / `'Rain'` のボタン表示文字列に依存
  - 'Storm preset' / 'Calm preset' は `src/rooms/voxel-water/Controls.tsx` 166-171行のハードコード英語(i18n バイパス)
  - 'Rain' は `src/shared/i18n/index.ts` 64行の en カタログ値(`rooms.voxelWater.controls.rainy`)であり、**zh-CN ロケールでは現時点で既に動かない**(169-171行は「降雨」)
- 参照: docs/direction/dossier-shell.md「インフラ / CI / テスト / QA」節(ShaderCanvas.test.ts の raw-source 文字列テスト)、同「コードリーディングで発見されたリスク」#4(i18n バイパスと QA セレクタの結合)・#13(テストの脆弱性)、docs/direction/review-framework.md 横断注意1・2、TA軸「QA担保」、ロングリスト SH-11

## 問題

調整フェーズは「定数・数式・hex を変える」作業の連続だが、現行テストはまさにその定数・数式・hex を文字列でピン留めしているため、**すべてのアート調整チケットが本質と無関係なテスト同期更新を強制される**(横断注意1)。一方で本来守るべき不変条件(透明パスの描画順序、pixelRatio キャップ、シェーダーと runtime の uniform 契約)は実際には検証されておらず、「割れやすいのに守れていない」二重の失敗状態にある。さらに water-qa の文字列セレクタは i18n 化(GO-8 / SH-8 系)の前提を塞いでいる。

## 改善方向

research-webgl-platform.md §2.7(QA注入のURL化にも言及)および dossier-shell.md「調整候補の種」P3「ShaderCanvas.test.ts の挙動テスト化」を基礎に、以下の4本柱で置換する。

1. **実行時検証ユニットテストへの置換**(uniform 値・シーングラフ構造・マテリアルプロパティ)
   - three.js のシーングラフ構築は `renderer.render()` を呼ぶまで GL コンテキストを要しない。`createRoomRuntime(context, settings)` にスタブ renderer を渡してシーンを構築し、traverse して検証する(構築が renderer の実メンバーに依存する場合はシーン構築部を関数として分離)
   - 例: WEATHER_LOOKS を export し「3状態が同一フィールド集合を持つ」「fogDensity 等が定義域内」を検証(hex 値そのものは検証しない)。マテリアルは `transparent` / `depthWrite` / `toneMapped` のフラグを実オブジェクトで検証
   - uniform 契約テスト: `water.frag.glsl` / `water.vert.glsl` の `uniform` 宣言をパースし、runtime の uniforms オブジェクトのキー集合と突き合わせる(宣言漏れ・設定漏れを検出、シェーダー内の定数調整では割れない)
   - `getRenderPixelRatio` と delta クランプは pure function に抽出して直接テスト(devicePixelRatio 1/2/3 でのキャップ挙動、`delta <= 0.05`)。永続レンダラー設計実装後は内部解像度スケーリング API のテストへ引き継ぐ
2. **保護したい不変条件の明示テスト化**
   - 透明パス renderOrder: シーン内の透明オブジェクト(plane / columns / rain / spray / gridOverlay)の renderOrder を実値で取得し**順序関係**をアサート(現行の部分文字列テストが守れていなかった本丸)
   - glass-optics プリセット: 「default と focus のライト位置がステージ境界内」という関係アサート(state.test.ts 流)に置換し、`-0.05` 等のリテラル一致を廃止
   - 現行の全文字列テストについて「守りたかった不変条件 → 新テスト or 削除理由」の**置換マッピング表**を作成し PR に添付(保護の暗黙的喪失を防ぐ)
3. **water-qa.mjs セレクタの data-testid 化**(i18n チケットの前提)
   - `src/shared/ui/ControlPrimitives.tsx` の Button / SegmentedControl に `data-testid` パススルーを追加
   - Controls.tsx の Storm/Calm ボタンと weather SegmentedControl の rain オプションに `data-testid="voxel-water-preset-storm"` 等を付与
   - water-qa.mjs 320-326行を `page.getByTestId(...)` へ移行(表示文字列から完全に分離)
4. **shader-quality.test.ts の qaSource ピン(5行・198-264行)の廃止**
   - 代替として water-qa.mjs のメトリクス計算(luma / hue / toonBandSeparation)を関数分離し、合成ピクセルデータでの数値ユニットテストを追加(T-QA-02 のアサート化の土台にもなる)

## 受け入れ基準

- **調整耐性**: WEATHER_LOOKS の任意 hex(例: clear.waterTint `0x6dffdd`)を変更しても `pnpm test` が緑のまま。同様に PRESENTATION_DRIFT_* 定数・カメラ位置・glass プリセット数値の変更でも割れない(state.test.ts 型の関係アサートに違反しない限り)
- **不変条件の検出力**: 以下の意図的な破壊(mutation)を各1回実施し、テストが赤になることを確認して結果をチケットクローズ時に記録する
  1. rain の renderOrder を plane より小さくする → fail
  2. 透明マテリアルの depthWrite を true に変える → fail
  3. pixelRatio キャップ(Math.min)を外す → fail
  4. シェーダーから uniform 宣言を1つ削除し runtime 側は残す → fail
- **QAスクリプト**: `QA_PRESET=storm` / `calm` / `rain` の water-qa 実行が data-testid セレクタで従来どおり完走し、ロケールを zh-CN に切り替えた状態でも動作する
- **回帰確認**: 置換前後で `pnpm qa:visual` / `pnpm qa:water` のスクリーンショットとメトリクス(toonBandSeparation / waterCoverage / colorSignature)が一致(本チケットは製品コードの見た目を変えない)
- 置換マッピング表(旧テスト → 新不変条件 or 削除理由)が PR に添付されている
- `pnpm test` / `pnpm lint` / `pnpm build` が緑

## 影響範囲・注意

- **本チケット自体が横断注意1(文字列ピン留めテスト連動)の解消**。着地までの間に他チケットが先行する場合は従来どおり shader-quality.test.ts / runtime.test.ts / ShaderCanvas.test.ts の同期更新が必要 — だからこそ最優先で着地させる
- **横断注意2(water-qa セレクタ連動)は本チケットに内包**: data-testid 化完了までは 'Storm preset' / 'Calm preset' の文言変更・i18n 化(GO-8 / SH-8 系)を着手禁止とする
- shader-quality.test.ts:5 の `water-qa.mjs?raw` import を廃止することで、T-QA-02(baseUrl 修正・メトリクスアサート化)が water-qa.mjs を自由にリファクタできるようになる — **T-QA-02 より先に着地させること**
- **renderOrder 連鎖(横断注意5)**: 新設する順序関係テストは今後の透明要素追加・削除時の再監査を自動化する資産になる。透明要素を増減するチケットはこのテストの順序表を必ず更新する
- ShaderCanvas.test.ts の `antialias: room.id !== 'voxel-water'` ピン(14行)は承認済み永続レンダラー設計で削除されるコードを保護している。永続レンダラーチケットの前提として、本チケットで「AA 方針」「解像度スケーリング」を挙動レベルの契約テストに置き換えておく
- Controls.tsx への data-testid 付与は DOM 属性の追加のみで視覚に影響しないが、`pnpm qa:visual` のハードフェイル3条件(console error / 横スクロール / HUD オーバーラップ)で回帰確認する
