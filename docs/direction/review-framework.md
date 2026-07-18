# 調整レビュー・フレームワーク

調整フェーズ(問題洗い出し → 調整チケット作成 → 実装)の運用基盤。
各展示の事実情報は `dossier-*.md`、技術知見は `research-*.md` を参照。

## 次フェーズの流れ

1. **問題洗い出し**: 本書の評価軸で各展示を採点し、下記ロングリストを確定・補強する
2. **チケット化**: 下記テンプレートで1問題=1チケットに切る(`docs/direction/tickets/` 配下を想定)
3. **実装**: チケット単位で調整 → `pnpm test / lint / build / qa:visual` + スクリーンショット比較で検収

## 評価軸

### アートディレクション軸 (AD)

| 軸 | 問い | 現状の代表的な不合格例 |
|---|---|---|
| 焦点階層 | 3秒で視線が止まる主役がいるか | Voxel Water: ランドマーク不在の「主題なき色面」 |
| 値構造 | 明度設計に階調があるか(水面/空/主役が分離するか) | Voxel Water Clear/Rain: 数段分の明度に圧縮 |
| サムネイルテスト | 縮小しても状態・内容が判別できるか | 天候3状態が色相シフトでしか区別できない |
| 構図 | 画面の面積配分が興味の配分と一致するか | palette-camera構図: 手前60-80%が空虚な平面 |
| モーション言語 | 動きが素材の性格を語るか(剛体テレポートや同期ポップがないか) | 雨420粒の一斉テレポート、天候の1フレーム切替 |
| ストーリーテリング | 状態遷移・時間経過が演出として設計されているか | WEATHER_LOOKSの即時テーブルスワップ |
| パレット規律 | トークン/レジストリ/シェーダー定数が一つの体系か | #79ead9 vs --teal #5af2d1 のドリフト |
| ヒーローショット成立性 | 公開スクリーンショットが展示の最良の瞬間を捉えているか | Ninth Tide: タイトルゲートしか撮れていない |

### テクニカルアート軸 (TA)

| 軸 | 問い | 現状の代表的な不合格例 |
|---|---|---|
| フレームバジェット | 60fps(最低30fps)を守れているか。HUDのFPS表示は正確か | Voxel Water 17-18 FPS、Glass Optics「1 FPS」表示 |
| モデル一貫性 | 同じ現象が複数実装でドリフトしていないか | 波モデルのJS/GLSL二重実装(正規化定数まで不一致) |
| リソースライフサイクル | 毎フレーム/毎操作のアロケーションがないか | Glass: スライダー操作毎に TubeGeometry ×6 再生成 |
| コントラクト遵守 | RoomRuntime契約・i18nシーム・トークン体系に従っているか | "Storm preset" 等のハードコード英語(QAセレクタと結合) |
| 描画正当性 | 透明ソート・renderOrder・depthTestが意図通りか | 透明シート(renderOrder 1)が不透明カラム(2)より先に描画 |
| デッドコード/デッド出力 | 効いていないuniform・見えない描画がないか | columnOpacity恒等1、scene.background(ドームで全遮蔽)、fbm未使用 |
| QA担保 | テストが挙動でなく文字列をピン留めしていないか | 定数変更でテスト破損(shader-quality.test.ts / runtime.test.ts) |
| 対応環境 | モバイル/低速GPU/reduced-motionへの契約があるか | reduced-motionはCSSのみ、WebGLループは全振幅 |

## 優先度定義

- **P1 (公開ブロッカー)**: 信頼性を毀損する・展示価値が成立しない。例: FPS表示「1 FPS」、Voxel Waterの焦点不在、水面の縦シームアーティファクト、Ninth Tideの本編未撮影
- **P2 (インパクトの主要打ち手)**: 「悪くない」を「見せたい」に変える調整。例: 天候ストーリーテリング、Glassのステージング、稲妻の照明化、分散(dispersion)導入
- **P3 (磨き込み・負債)**: 気づく人だけが気づく品質・保守性。例: デッドコード除去、テストの挙動ベース化、パレットトークン統合

## チケットテンプレート

```markdown
# [展示ID] タイトル(動詞で: 「〜を導入する」「〜を修正する」)

- 分類: AD / TA / Platform
- 優先度: P1 / P2 / P3
- 評価軸: (上記のどの軸の不合格か)

## 現状 (証拠)
- ファイル:行 への参照、該当スクリーンショット、QAログ引用

## 問題
- なぜ展示価値/信頼性を損なうか(1-3文)

## 改善方向
- research-*.md の該当節への参照 + 具体的アプローチ

## 受け入れ基準
- 視覚的基準(スクリーンショット比較观点)+ 数値基準(FPS、コントラスト等)

## 影響範囲・注意
- 文字列ピン留めテストの同期更新(shader-quality.test.ts / runtime.test.ts / water-qa.mjs セレクタ)
- WEATHER_LOOKS等のテーブル変更は3状態すべて再検収
```

## 調整候補ロングリスト(シード)

チケット化前の候補。深掘り調査(understand)と視覚評価から抽出。確定・却下・統合は洗い出しフェーズで判断する。

### Voxel Water(フラッグシップ再建 — 視覚インパクト4位/4)

| # | 候補 | 分類 | 仮優先度 |
|---|---|---|---|
| VW-1 | 焦点ランドマークの導入(コンセプトアートの灯台/岩礁に相当する主役) | AD | P1 |
| VW-2 | 天候3状態のサムネイル判別性(雨: 実際に見える雨条・波紋 / 嵐: シルエット変化。色相シフト頼み脱却) | AD | P1 |
| VW-3 | palette-camera構図の縦シーム・アーティファクト修正 | TA | P1 |
| VW-4 | 値構造の再設計(Clear/Rainのニアモノトーン圧縮解消、水平線とクレストの分離) | AD | P2 |
| VW-5 | 波モデル単一ソース化(JS updateColumns と water.vert.glsl のドリフト解消) | TA | P2 |
| VW-6 | 天候クロスフェード(WEATHER_LOOKS 全フィールドの1-2秒補間) | AD | P2 |
| VW-7 | 稲妻の「照明化」(空の色被せでなく、カラム emissive・ライト強度・露出パルス連動) | AD | P2 |
| VW-8 | 雨パーティクルの個別リサイクル(一斉テレポートポップ解消)+ スプレーの剛体円盤感解消 | AD/TA | P2 |
| VW-9 | フレームレート回復(透明パス上の不透明4096インスタンス、8FPSカラム更新と60FPS平面の時間的不整合) | TA | P2 |
| VW-10 | シェーダー内3種の「ボクセル格子スケール」を物理インスタンス格子(0.62)に整合 | TA | P3 |
| VW-11 | gridOverlay 修正(X平行線のみで格子でない、depthTest:false で最前面貫通) | TA | P3 |
| VW-12 | 太陽を方位ストライプでなくディスクとして描画(skyTime夕景の成立) | AD | P3 |
| VW-13 | 平面toonRamp(floorで最上段未到達)とカラム量子化(round)の不一致解消 | TA | P3 |
| VW-14 | デッド出力の掃除(fbm未使用、vRawWave重複、scene.background遮蔽、columnOpacity恒等1) | TA | P3 |

### Glass Optics

| # | 候補 | 分類 | 仮優先度 |
|---|---|---|---|
| GO-1 | FPS表示「1 FPS」問題の解明・修正(計測バグか実性能か。renderer.info.reset() の共有レンダラー汚染含む) | TA | P1 |
| GO-2 | ステージング再設計(デフォルト灰色床の脱却、下手側デッドスペース、ガラス製品ビズ的なダークステージ演出) | AD | P2 |
| GO-3 | ビーム経路の物理化(固定点(0,1.18,0)=球体内部ターゲット廃止、レイ×球交差+reflect()/refract()) | TA | P2 |
| GO-4 | dispersion(色分散)導入 — MeshPhysicalMaterial.dispersion または スペクトルRGBビーム分割 | AD/TA | P2 |
| GO-5 | コースティクスのペイオフ強化(現状「かすかすぎる」評価。屈折終点との視覚的因果を強調) | AD | P2 |
| GO-6 | スライダー操作毎の TubeGeometry×6 再生成を BufferGeometry 書き換えに置換 + dirty-check | TA | P2 |
| GO-7 | ワイヤーフレームシェルの「デバッグ球」見え問題(屈折に参加しない・最前面描画) | AD | P3 |
| GO-8 | "Focus beam"/"Crystal preset" の i18n 化(文字列ピン留めテストと同期) | TA | P3 |
| GO-9 | autoRotate オフ時も root sway が継続する挙動の整理 | TA | P3 |
| GO-10 | toneMapped=false のFXレイヤーとガラス本体の混在カラーパイプライン検証 | TA | P3 |

### Anime Liquid Orb(埋め込み — 完成度1位、保全と統合が主題)

| # | 候補 | 分類 | 仮優先度 |
|---|---|---|---|
| AO-1 | モバイルHUD崩れ(タイトルプレートがオーブに重畳、フェーズカードのクロップ) | AD | P1 |
| AO-2 | postMessage 制御ブリッジ(品質/pause/visibilitychange rAF抑制。シェルUIと二重HUD問題の整理) | TA | P2 |
| AO-3 | sculpt時22FPSのボトルネック特定と最適化(**先にプロファイル実測必須** — 監査で頂点数は720 tris/シェルと判明し当初想定の1/28。本命候補はフルシーン2回描画+bloom/SMAA+preserveDrawingBufferのフィルレート。outline法線再構築の廃止は無条件で安価) | TA | P2 |
| AO-4 | タッチ二重タップのfreeze二重発火(endPointer <285ms と dblclick の競合) | TA | P2 |
| AO-5 | VOIDモードのポスタライズバンディング(blue-noiseディザ) | TA | P3 |
| AO-6 | freeze中も動き続ける volume shell(uTime vs fluidTime)の凍結ルール違反 | TA | P3 |
| AO-7 | ref/ ソースの git 管理(現状 untracked — 原典が版管理外)+ source map 公開の意思決定 | Platform | P1 |
| AO-8 | 不要な clipboard-write permission の除去 | Platform | P3 |
| AO-9 | SURGE状態の値分離改善(リファレンス評価で最弱: 薄紫×チャコールが濁る) | AD | P3 |

### Ninth Tide Archive(埋め込み — 実証と保全が主題)

| # | 候補 | 分類 | 仮優先度 |
|---|---|---|---|
| NT-1 | 本編ビジュアルの実証(タイトルゲート以降の各章キャプチャ体制。preview=main が第V章=唯一の暖色章に偏る問題の是正) | AD/QA | P1 |
| NT-2 | ref/ ソースの git 管理(minified 644KB バンドルのみでは調整不能)+ archive.mp3 8.28MB 重複の整理 | Platform | P1 |
| NT-3 | 複数パルス履歴(単一スロットで自動ソナーがユーザーエコーを上書き — 「エコーは記憶」コンセプトとの矛盾) | AD/TA | P2 |
| NT-4 | 暗部バンディング対策(deep #000405 系、AfterimagePass damp 0.982、ディザなし) | TA | P2 |
| NT-5 | オンセット検出の質(単一バンドエネルギー微分×8.6 → スペクトラルフラックス) | TA | P2 |
| NT-6 | ほぼ黒画面区間の「壊れて見える」問題(ショールーム側の周辺キュー設計) | AD/UX | P2 |
| NT-7 | shutdown時の共有 pulseStrength uniform 汚染(全マテリアルに幻パルス) | TA | P3 |
| NT-8 | 章IX等でHUDがシーンより明るい問題(パレット連動のHUDコントラスト) | AD | P3 |
| NT-9 | isMobile 判定がロード時1回のみ(リサイズ/DPR変化に追従しない) | TA | P3 |
| NT-10 | 不要な microphone permission の除去(このiframeはマイク未使用) | Platform | P3 |
| NT-11 | サイレントモードの章周回(3倍速で第IX章エンディング未発火のまま第I章へ)の演出整理 | AD | P3 |

### 共有シェル / Platform

| # | 候補 | 分類 | 仮優先度 |
|---|---|---|---|
| SH-1 | FPS/telemetry 表示の信頼性回復(計測方法、表示形式。「60fps約束 vs 1-28FPS表示」の信頼毀損解消) | TA | P1 |
| SH-2 | 永続レンダラー契約の実現 or 文言修正(現状ルーム切替毎に renderer 再生成。antialias 属性が canvas 再利用で無効化) | TA | P2 |
| SH-3 | コンセプトアートとのギャップ解消の選択(プロツール的ガーニッシュ: gizmo/minimap/sparkline を入れるか、入れないと決めるか) | AD | P2 |
| SH-4 | 明るい展示(Orb)と暗い展示(Ninth Tide)の露出分離(暗黒展示の保護) | AD | P2 |
| SH-5 | 設定のURLシリアライズ(共有可能なアートディレクション状態) | Platform | P3 |
| SH-6 | CI強化(lint / qa:visual を Actions に、water-qa の report-only 指標のアサート化、SwiftShader) | QA | P2 |
| SH-7 | "latest" 依存ピン戦略(three メジャー跳ねのシェーダー破壊リスク) | Platform | P2 |
| SH-8 | i18nリーク修正("Loading renderer"、aria-label の機械ID、ロケール非永続) | TA | P3 |
| SH-9 | reduced-motion のランタイム契約(RoomRuntime に振幅減衰を渡すシーム) | TA | P3 |
| SH-10 | 3種の近似ニアブラック(0x070b10 / #06090e / #02070d)の統一 | AD | P3 |
| SH-11 | 文字列ピン留めテストの挙動ベース化(調整フェーズ全体の摩擦源) | QA | P2 |
| SH-12 | water-qa.mjs のデフォルトURL 404(/ShaderDemoRoom ベースパス不一致) | QA | P3 |

## 横断的な注意事項(チケット作成時に必ず参照)

1. **テスト連動**: `shader-quality.test.ts` / `runtime.test.ts` はソース文字列をピン留めしている。定数・数式を1つ変えるだけでテストが割れるため、調整チケットには必ずテスト更新を含める(または先に SH-11 を実施)
2. **QAセレクタ連動**: `water-qa.mjs` は "Storm preset"/"Calm preset" のボタン文字列に依存。i18n化はQAスクリプトと同時に
3. **WEATHER_LOOKS はアートディレクションの単一情報源**: 天候調整はこのテーブル経由で行い、3状態同時に検収する
4. **埋め込み展示の調整は ref/ 側で行い再ビルド**: public/exhibits は成果物。ref/ の git 管理(AO-7/NT-2)が全ての前提
5. **renderOrder 網**: 両シェーダールームとも手動 renderOrder 連鎖に依存。透明要素の追加・削除は連鎖全体の再監査が必要
6. **共有レンダラー状態契約(監査追補)**: renderer はルーム間で共有される(少なくとも canvas と、同種ルーム連続時は状態)。`toneMapping` / `toneMappingExposure` / `transmissionResolutionScale` / `renderer.info.reset()` 等、renderer グローバル状態に触れる調整は**必ず dispose 時の復帰処理をセットで**チケット化する(research-glass-optics.md が transmissionResolutionScale で確立した規約を全ルームに一般化。SH-4 のルーム別露出分離を実装する場合はこの契約の明文化が前提)
7. **低解像度アップスケールの整数比ルール(監査追補)**: research-stylized-water.md §2.6 の「現行 0.6x のまま CSS image-rendering: pixelated」案と research-webgl-platform.md §2.3 の「整数比(0.5x)スナップ」要求が不整合。**platform 側(整数比)を正とする** — 非整数スケールの pixelated は不揃いブロックを生む
8. **FPS 計測プロトコル(SH-1 の前提)**: 複数資料が FPS 数値を別基準で引用している(QAログ 17-18 / チップ 15-28 / research 17-20)。SH-1 では先に統一計測手順(計測点・平均化窓・記録先)を定義してから修正に入ること

## 要決定事項(チケット化の前にユーザー判断が必要)

- **D-1: 埋め込み展示の「原典無改変」方針 vs 改修**: postMessage ブリッジ(AO-2/NT-QAフック)、モバイルHUDレスポンシブ化(AO-1)、パルス多重化(NT-3)はいずれも ref/ 原典の改変を要する。「iframe 展示は原典を触らない」という現方針を維持するか、ref/ を fork として育てるかの決定が先行条件(全資料がこの判断を保留している)
- **D-2: コンセプトアートのプロツール・ガーニッシュ**: gizmo/minimap/sparkline テレメトリを実装するか、意図的に採用しないと決めて概念画とビルドの乖離を公式に整理するか(SH-3)
- **D-3: 公開 embed のソースマップ同梱**(AO関連): 意図的な透明性として維持するか除去するか
