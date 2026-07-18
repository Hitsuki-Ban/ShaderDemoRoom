# docs/direction — 調整フェーズ準備資料

2026-07-18 完了。目的: **各展示品の把握 → TA/AD知見収集 → 問題洗い出し → 調整チケット作成 → 実装** の流れの前半をすべて済ませ、チケット作成フェーズを即開始できる状態にする。

埋め込み展示の変更は必ず `ref/` の正本へ行い、ルートの `pnpm exhibits:build` で `public/exhibits/**` を再生成する。公開成果物を直接編集してはならない。

準備は3層構成: (1) 7並列の深掘り読解(全コード・シェーダー・QAログ・ART_DIRECTION原典・スクリーンショット群)、(2) 11並列のカルテ執筆+Web調査(出典検証つき)、(3) 独立クリティークによる網羅性監査と追補。監査判定は**条件付きREADY**で、指摘された処置(事実訂正・欠落追補・証拠キャプチャ)は本READMEの日付時点ですべて反映済み。

## 資料マップ

| 資料 | 内容 |
|---|---|
| [tickets/](tickets/README.md) | **起票済みチケット(第1バッチ: プラットフォーム13本、依存グラフ・着手順つき)**。D-1=fork運用 / 永続レンダラー化 / D-2=リデザイン方針は 2026-07-18 にユーザー承認済み |
| [review-framework.md](review-framework.md) | チケット作成の起点。評価軸(AD/TA)、優先度定義、チケットテンプレート、候補ロングリスト(VW/GO/AO/NT/SH 番号付き)、横断注意事項 |
| [dossier-voxel-water.md](dossier-voxel-water.md) | Voxel Water カルテ(WEATHER_LOOKS 全hex・全16パラメータ・QA約60ラウンド史含む) |
| [dossier-glass-optics.md](dossier-glass-optics.md) | Glass Optics カルテ(光路ヒューリスティックの詳細・renderOrder連鎖・テストピン留め一覧) |
| [dossier-anime-liquid-orb.md](dossier-anime-liquid-orb.md) | Anime Liquid Orb カルテ(4相パレット/レオロジー全値・ART_DIRECTION §8照合・埋め込み関係) |
| [dossier-ninth-tide-archive.md](dossier-ninth-tide-archive.md) | Ninth Tide カルテ(9章×5役割パレット全hex・4層深度構成・preview機構) |
| [dossier-shell.md](dossier-shell.md) | 共有シェル カルテ(レンダラーライフサイクル・トークン・i18nカタログ・CI/QA実態) |
| [research-stylized-water.md](research-stylized-water.md) | トゥーン水面の技術知見(Gerstner、単一ソース化、SoT/Wind Waker分析、§2.10水シート合成) |
| [research-glass-optics.md](research-glass-optics.md) | ガラス/屈折/コースティクス知見(dispersion r164+、レイ球交差、Evan Wallace方式ほか) |
| [research-npr-liquid.md](research-npr-liquid.md) | NPR流体知見(フローマップ、Wave Particles、Xrd流法線制御、postMessageブリッジ仕様) |
| [research-audio-reactive.md](research-audio-reactive.md) | オーディオリアクティブ知見(多重パルスFBO、スペクトラルフラックス、暗部ディザ、near-black UX) |
| [research-webgl-platform.md](research-webgl-platform.md) | プラットフォーム知見(コンテキスト属性不変性、永続レンダラー設計、CI×SwiftShader、URL状態) |
| [research-exhibition-direction.md](research-exhibition-direction.md) | 展示演出知見(ヒーローショット設計、天候の視覚言語、明暗展示の共存、telemetry表示) |
| [captures/](captures/) | 証拠キャプチャ(下記) |

## 証拠ログ(2026-07-18 取得)

- **健全性**: `pnpm build` ✅ / `pnpm test` 51件全パス ✅ / `pnpm lint` ✅ / `pnpm typecheck` ✅ / `pnpm qa:visual` ✅(コンソールエラー0)
- **最新スクリーンショット**: `output/playwright/`(qa:visual で再取得済み。gitignore対象なのでローカルのみ)
- **Ninth Tide 本編キャプチャ(初)**: `captures/ninth-tide-opening.png`, `ninth-tide-ch1..9.png`, `ninth-tide-ending.png` — `?preview=main&section=0..8` 機構で全9章+開幕+終幕を取得。これまでタイトルゲートしか証拠がなかったギャップ(NT-1)を解消。再取得手順: `pnpm build && vite preview` 起動後 `node docs/direction/captures/capture.mjs`
- **旧 FPS チップ実測**: `captures/fps-samples-2026-07-18.json` + `captures/voxel-water-hud-evidence.png` / `glass-optics-hud-evidence.png` — 丸め済み HUD 文字列を読む旧手順の履歴証拠。新しい性能基準には使用しない。
- **Telemetry protocol v1 参照記録**: `captures/telemetry-reference-2026-07-18.json` — Voxel Water / 1440×900 / 5秒 warm-up + 15秒 measurement。SwiftShader は median 14.52 FPS / 68.88 ms、system Chrome D3D11 (RTX 4070 Ti) は median 200 FPS / 5.00 ms。両方 19 logical-frame calls、renderer raw string と software/hardware 三態を記録。

## 統合優先度ビュー(カルテP1 × リサーチP0 の整合)

カルテは「見た目の結果」優先、リサーチは「構造の前提」優先で順位が食い違う。着手順は**証拠 → 構造 → 見た目**で統合する:

1. **証拠と決定(すべての前提)**: FPS統一計測プロトコル(SH-1)、D-1(埋め込み展示の改変方針)、ref/ の git 管理(AO-7/NT-2)
2. **構造チケット(見た目調整の土台)**: 波モデル単一ソース化+太陽方向uniform共有(VW-5, research P0)、柱の透明パス除去+水シート合成是正(VW-9+research §2.10)、Glass の Tube 再生成解消(GO-6)、シェルの renderer 契約(SH-2+横断注意6)
3. **見た目のP1**: Voxel Water 構図ランドマーク+雨の可視化+バリュー分離(VW-1/2/4)、縦シーム修正(VW-3)、Glass ステージング+コースティクス強化(GO-2/5)、モバイルHUD(AO-1)
4. **P2以降**: framework のロングリスト順

## 未調査項目(意識的にスコープ外と記録 — チケット化時は調査タスクを含めること)

- Glass: `toneMapped=false` FX群とトーンマップされるガラス本体の混合カラーパイプラインの色科学検証(dossier リスク14に記載)
- Orb: kiosk/インスタレーションの音のエチケット(アイドル・アトラクトping抑制の業界慣行)
- Orb: Ryoji Ikeda 流バーコード/スキャン文法による VOID 相の強化(ART_DIRECTION §13 が引用する方向性)
- Tide: マリンスノー後方散乱・ROV光減衰による nearSnow のアートディレクション(dossier P3に注記済み)

## 要確認事項(チケットの検証ステップへ転記する用)

- Orb SURGE の色相齟齬: コードは `#ec3b9b`(マゼンタ)、リファレンス批評は「muted lavender-gray」— トーンマッピングの結果か要実機確認
- Glass FPS: ソフトウェアGLで2-4 FPSは確定。T-SH-03 で Voxel の実GPU参照は取得済みだが、Glass の実GPU値と Tube再生成/transmission の寄与切り分けは未了
- Tide `preview=main` の既定 section 4(第V章・唯一の暖色)vs 原典ヒーロー preview.png(第VIII章)の不一致 — QA既定章の変更判断
- Voxel Water の FPS は環境を必ず併記する。protocol v1 参照値は SwiftShader 14.52 FPS、RTX 4070 Ti / D3D11 200 FPS で、環境を跨いだ比較や hard gate は行わない

## 修正履歴(監査反映)

- Orb 三角形数の事実誤りを訂正: IcosahedronGeometry(1.65,5) は 720 tris/シェル(当初「≒20k」は28倍過大)。AO-3 はプロファイル実測を前提条件化
- research-stylized-water.md に §2.10(水シート合成)を追補
- dossier-glass-optics.md にリスク14(transmission/FX分離・ワイヤーフレーム非屈折)を追補
- review-framework.md に横断注意 6-8(共有レンダラー状態契約・整数比アップスケール・FPSプロトコル)と要決定 D-1〜D-3 を追補
