# [T-GO-05] dispersion(色分散)を導入する — MeshPhysicalMaterial.dispersion + スペクトル RGB ビーム分割

- 分類: AD / TA
- 優先度: P2
- 評価軸: 焦点階層 / ストーリーテリング(「Glass Optics」という主題の成立)
- 依存: T-GO-03(物理着地点とコースティクスの値設計を確定) / T-GO-04(物理経路 API、固定トポロジー、URL schema v2 が前提)。段階分割せず、設定・マテリアル・RGB 経路を1票で完了する

## 現状(証拠)

- **「Glass Optics」なのに色分散がゼロ**: `src/rooms/glass-optics/runtime.ts:67-89` `createGlassMaterial` に `dispersion` プロパティは未設定(three.js デフォルト 0)。ビームも単色チューブ 3 本(incoming 0x8deeff / reflection 0xffc067 / refraction 0xf8ffff、`runtime.ts:291-293`)で、白色光が色に分かれる描写が展示のどこにもない(dossier リスク 3)。
- **バージョン要件は充足済み**: three は `0.184.0` に固定(package.json:31、T-DEP-01 で "latest" 廃止済み)。`MeshPhysicalMaterial.dispersion` は r164(2024-04、PR #28051/#28057/#28058)で追加され **r184 で利用可能**(research-glass-optics.md §2.1 で一次情報確認済み。「PR #28114 由来」という検索要約は誤りと判明している — research「未検証事項の明記」)。
- **実装コストは極小**: three の実装は `halfSpread = (ior − 1.0) * 0.025 * dispersion` で `iors = (ior−halfSpread, ior, ior+halfSpread)` を作り、**既存の透過レンダーターゲットを RGB チャンネル別に 3 回サンプルするだけ**。シーン再レンダリングは発生しない(research §2.1)。`transmission > 0` が有効条件で、本展示は transmission=1(`runtime.ts:72`)。
- **好条件が揃っている**: デフォルト roughness 0.04(`state.ts:27`)は分散が明瞭に見える条件(roughness 高だと分散がぼける — research §2.1 リスク)。IOR スライダーは 1.0-2.4(`state.ts:13`)と広く、halfSpread が (ior−1) に比例するため IOR 操作で分散も自動的に強弱する教材的好都合がある。
- **beamSpread は既存契約を維持する**: T-GO-04 後も beamSpread はビーム束幅とコースティクス集束度を表す。分散量へ再定義すると既存 URL の同名フィールドが別の意味になるため、本票では独立した `dispersion` 設定を追加する。

## 問題

展示タイトルが約束する光学現象の中核(白色光の分光)が完全に欠落しており、IOR スライダーの視覚的な手応えの乏しさ(T-GO-04 の問題)と併せて「ガラス光学」の主題が立っていない。1 プロパティで導入できる機能が three のバージョン都合で見送られたまま残っている状態。

## 改善方向

research-glass-optics.md §2.1(マテリアル)と §2.3(ビーム)の 2 段階。

1. **明示的な `dispersion` 設定**: `GlassOpticsSettings` に必須 number フィールド `dispersion` を追加し、domain は **0.00..1.00 / step 0.01**、default は **0.45**、Focus preset は default 継承、Crystal preset は **0.55** とする。`Controls.tsx`、en / zh-CN i18n、domains/defaults/presets、material binding、テストを同時更新し、未指定時の guessed default や旧フィールド alias は設けない。
2. **URL schema v3**: T-GO-04 の v2 に `dispersion` を追加する変更として `URL_STATE_VERSION` を **3** へ上げる。v3 の全フィールド round-trip を固定し、v1/v2 の読み替えや migration shim は追加しない。
3. **マテリアル分散**: `glassMaterial.dispersion = settings.dispersion` とし、0 で完全に無効、0.45/0.55 で採用演出になることを保証する。
4. **スペクトル RGB ビーム分割**: T-GO-04 の経路計算を、ユーザー ior を G 波長とみなし `ior_R = ior − δ` / `ior_B = ior + δ` で 3 回実行する。three のマテリアル実装と同じ依存を持つ `δ = (ior − 1.0) * 0.025 * dispersion` とし、**beamSpread は δ に掛けない**。ior=1 または dispersion=0 では δ=0 となり3経路が完全一致する。入射/反射は白/アンバー各1 instance、内部/出射は R/G/B 各3 instanceとし、T-GO-04 の core/glow `InstancedMesh` 2 drawsをそれぞれ8 instanceへ拡張する。起動時に全 instance を確保し、transform/color/zero-scale だけを更新する。
5. **beamSpread の既存意味を維持**: beamSpread はビーム束の広がりとコースティクス集束度を制御する既存パラメータのままとし、キー、domain、ラベル、URL 意味を変更しない。dispersion と独立に組み合わせられることをテストする。
6. **コースティクスは変更しない**: T-GO-03 で確定した cool/warm のコースティクス配色と強度を恒久的に維持する。本票はガラス材質とビーム経路だけを分光し、コースティクスへの色ずれ、後続較正、別の補正経路は追加しない。

## 受け入れ基準

- **視覚基準(マテリアル)**: ior 1.48 / 2.4 × dispersion 0 / 採用値 の 4 キャプチャ比較で、ガラス縁の色収差(エッジのレインボーフリンジ)が採用値で明確に視認でき、dispersion 0 では出ないこと。roughness 0.55(最大)で破綻(ノイズ状の色割れ)がないこと。
- **視覚基準(ビーム)**: 出射ビームが根元白 → 先端で R/G/B に分離し、dispersion 0 で3経路が完全一致、0.45 で明確な分離になること。ior=1.0 でも δ=0、R/G/B の P₁/P₂/床着地点が数値的に一致すること。beamSpread 0.05 / 0.9 の双方で分散量は dispersion に従い、beamSpread 自体の束幅/集束度の応答も維持されること。
- **数値基準**: telemetry で FPS 悪化が ±5% 以内(透過サンプル 1→3 回を実測)。instance 数だけを増やすため draw calls は T-GO-03 完了時の **16** を維持し、core/glow 以外の beam drawを作らないこと。
- **設定契約**: dispersion が必須フィールドとして型・domain・default・全 preset・control・i18n・material に存在し、v3 URL round-trip と範囲外拒否が通ること。v1/v2 URL は拒否されること。
- **QA 通過**: `pnpm test` / `pnpm lint` / `pnpm typecheck` / `pnpm qa:visual` 通過。i18n カタログの en / zh-CN 差分が同時に入っていること(T-I18N-01 の整合テスト)。

## 影響範囲・注意

- **T-GO-04 との順序**: 物理経路(P₁/P₂/床着地)と固定トポロジーが前提。T-GO-04 未完了のフェイク経路には一部も先行実装しない。
- **固定トポロジー**: RGB サブビーム追加時も更新 tick の Geometry/BufferAttribute 生成や dispose+再生成を復活させない。
- **draw calls gate**: T-GO-04 で導入した core/glow の2 batchを維持し、instance 増加によって production hard gate **16** を変更しない。
- **カラーパイプライン**: ビームは `toneMapped = false` の加算 FX、ガラス本体はトーンマップされる混合パイプラインである。この差は本展示の確定構成として受け入れ、別の統一パスや将来 ticket を設けない。採用色は同一キャプチャ内で視覚的に同系のスペクトルとして読めることを本票で検収する。
- **renderOrder 連鎖**: サブチューブは既存 beam core(renderOrder 7)と同順位に置き、連鎖(1,3,4,5,6,7,8,9,10)へ新しい順位を増やさない。

## 作業報告 (2026-07-20)

- 実装 revision: `426f2e47b1b90a04d39b5d32be0b44579e83b4aa`。`dispersion` を必須設定として domain `0..1 / 0.01`、default `0.45`、Crystal `0.55`、Focus 継承で型・control・en/zh-CN・preset・material へ一括接続した。URL は v3 へ置換し、v1/v2、範囲外、off-step を migration / clamp / alias なしで拒否する。
- 物理/描画: three r184 と同じ `δ=(ior-1)*0.025*dispersion` で R/G/B の3経路を起動時確保した buffer へ追跡し、入射/反射1本 + 内部/出射RGBを core/glow 各8 slot の2 batchに固定した。RGB は純色のため `dispersion=0` / `ior=1` で行列が完全一致して白へ合成される。marker、反射率、caustics は G 経路だけを使用し、beamSpread は中心線へ混入しない。
- 視覚: `MeshPhysicalMaterial.dispersion` を直接設定し、透過対象を細い白線/黒地の静的 calibration target へ整理した。採用値の材質 fringe は default/high IOR の双方で差分画像なしに判読でき、zero は中性、roughness `0.55` は彩色ノイズ/clip なし。三角断面の roll は採用値でのみ読み取り補助となり、経路中心線・端点は誇張しない。独立 visual review は同サイズ T-GO-03 baseline との delta を含め `APPROVE`。
- QA: `qa:glass` を16状態へ拡張し、4材質比較、IOR=1 pixel identity、roughness、16/15 calls、spread/IOR caustics、静止/運動、180-frame allocation を恒常 gate にした。IORごとにRGB beam底色も変わるため、caustics の cross-IOR 強度は最終 half-max linear luminanceで判定し、ON/OFF差分はpresence/shape/coverage/position/clippingを引き続き所有する。最終値は材質 chroma gain **1.898 → 2.508**、`>5` coverage **11.25% → 16.66%**、IOR=1差分0、IOR焦点 **0.88 → 0.89 → 0.96**、all-channel clip 0、drag calls `16→16` / geometries `24→24` / 禁止allocation 0、browser error 0。
- 性能: 同一 RTX 4070 Ti / Chrome D3D11、T-GO-03 merge `73abd13` と revision `426f2e4` の5組 interleaved/alternating production比較は paired median regression **-1.89%** (上限 `+5%`)。hardware reference **195.53 FPS**、16 calls / 5,542 triangles、5組すべて候補がbaseline以上だった。
- 証拠: `captures/t-go-05-default-zero.png`、`t-go-05-default-adopted.png`、`t-go-05-high-ior-zero.png`、`t-go-05-high-ior-adopted.png`、`t-go-05-roughness-0-55.png`、`t-go-05-glass-qa-2026-07-20.json`、`t-go-05-telemetry-2026-07-20.json`。
- 検証: `pnpm test` (34 files / 267 tests)、`pnpm lint`、`pnpm typecheck`、`pnpm build`、`pnpm exhibits:check`、`pnpm qa:visual`、`pnpm qa:glass` を通過。`pnpm qa:renderer` は未変更の Voxel Water software FPS が本機の歴史的 gate を下回り2回失敗(mean `13.96` / `13.42`)したが、同じrunの Glassは16 callsを維持し、本票の独立hardware paired gateは上記のとおり通過した。
