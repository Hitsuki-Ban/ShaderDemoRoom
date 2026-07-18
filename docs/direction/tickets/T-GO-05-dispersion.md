# [T-GO-05] dispersion(色分散)を導入する — MeshPhysicalMaterial.dispersion + スペクトル RGB ビーム分割

- 分類: AD / TA
- 優先度: P2
- 評価軸: 焦点階層 / ストーリーテリング(「Glass Optics」という主題の成立)
- 依存: **段階 1(マテリアル dispersion)は独立着手可**。**段階 2(RGB ビーム分割)は T-GO-04 の物理経路計算を 3 波長で再実行する構造のため T-GO-04 完了後**。T-GO-01 のビーム固定トポロジー化とも実装を共有(サブチューブ 2 本追加はそのジオメトリ方式で作る)

## 現状(証拠)

- **「Glass Optics」なのに色分散がゼロ**: `src/rooms/glass-optics/runtime.ts:67-89` `createGlassMaterial` に `dispersion` プロパティは未設定(three.js デフォルト 0)。ビームも単色チューブ 3 本(incoming 0x8deeff / reflection 0xffc067 / refraction 0xf8ffff、`runtime.ts:291-293`)で、白色光が色に分かれる描写が展示のどこにもない(dossier リスク 3)。
- **バージョン要件は充足済み**: three は `0.184.0` に固定(package.json:31、T-DEP-01 で "latest" 廃止済み)。`MeshPhysicalMaterial.dispersion` は r164(2024-04、PR #28051/#28057/#28058)で追加され **r184 で利用可能**(research-glass-optics.md §2.1 で一次情報確認済み。「PR #28114 由来」という検索要約は誤りと判明している — research「未検証事項の明記」)。
- **実装コストは極小**: three の実装は `halfSpread = (ior − 1.0) * 0.025 * dispersion` で `iors = (ior−halfSpread, ior, ior+halfSpread)` を作り、**既存の透過レンダーターゲットを RGB チャンネル別に 3 回サンプルするだけ**。シーン再レンダリングは発生しない(research §2.1)。`transmission > 0` が有効条件で、本展示は transmission=1(`runtime.ts:72`)。
- **好条件が揃っている**: デフォルト roughness 0.04(`state.ts:27`)は分散が明瞭に見える条件(roughness 高だと分散がぼける — research §2.1 リスク)。IOR スライダーは 1.0-2.4(`state.ts:13`)と広く、halfSpread が (ior−1) に比例するため IOR 操作で分散も自動的に強弱する教材的好都合がある。
- **beamSpread の意味の空洞化(T-GO-04 後)**: T-GO-04 で refractedB の横オフセットが消えると、beamSpread は演出変調のみのパラメータになる。research §2.3 は「δ(波長別 IOR 差)の誇張倍率」への再定義を提案している。

## 問題

展示タイトルが約束する光学現象の中核(白色光の分光)が完全に欠落しており、IOR スライダーの視覚的な手応えの乏しさ(T-GO-04 の問題)と併せて「ガラス光学」の主題が立っていない。1 プロパティで導入できる機能が three のバージョン都合で見送られたまま残っている状態。

## 改善方向

research-glass-optics.md §2.1(マテリアル)と §2.3(ビーム)の 2 段階。

1. **段階 1 — `glassMaterial.dispersion`**: `createGlassMaterial` に `dispersion: 0.45` 程度から導入し、視覚検分で 0.3-0.6 帯に較正する(1.0 は宝石級の誇張)。`glassOpticsCrystalPreset`(`state.ts:40-45`)には高め(0.55 前後)を入れて「クリスタル」の演出差を作る。**設定スライダー化する場合**は `GlassOpticsSettings`(`src/rooms/types.ts:33-43`)+ `glassOpticsDomains`/defaults(`state.ts`)+ `Controls.tsx` + i18n カタログ(en / zh-CN 両方、`src/shared/i18n/index.ts` の rooms.glassOptics.controls)+ URL スキーマ(`src/shared/url-state.ts:75-82` に number フィールド追加)+ 挙動テストの 6 点セットを同時更新する(T-I18N-01 / T-SH-05 の契約)。スライダー化の要否自体はデザイン判断としてチケット内で決定・記録する。
2. **段階 2 — スペクトル RGB ビーム分割**: T-GO-04 の経路計算を、ユーザー ior を G 波長とみなし `ior_R = ior − δ` / `ior_B = ior + δ`(δ = 0.008-0.02 × 誇張倍率)で 3 回実行する。**入射ビームは白 1 本のまま、P₁ 以降(球内部と出射区間)だけ R/G/B サブチューブに分割**。加算ブレンドにより根元は白へ合成され、進むほど扇状にレインボーが開く(research §2.3 の定石)。サブチューブは現行 refraction core 半径 0.018 の半分程度に細く、glow は白 1 本を維持して視覚ノイズを抑える。合計輝度が現行の白ビームと揃うよう各サブチューブの opacity を約 1/3 に配分(加算白飛び対策)。
3. **beamSpread の再定義**: beamSpread を「分散誇張率」に写像する(δ の倍率)。スライダーのキー・レンジ・URL 互換は維持したまま、ラベルの i18n 文言(`rooms.glassOptics.controls.beamSpread`)を意味に合わせて更新する(en / zh-CN 同時)。
4. **コースティクスへの余波(任意)**: 分散導入後、コースティクス外縁への色ずれ(cool/warm ミックスの再配分)は T-GO-03 のパターンに小さく足せる。スコープ肥大を避けるため本チケットでは判断記録のみとし、実装は T-GO-03 側の較正に委ねる。

## 受け入れ基準

- **視覚基準(マテリアル)**: ior 1.48 / 2.4 × dispersion 0 / 採用値 の 4 キャプチャ比較で、ガラス縁の色収差(エッジのレインボーフリンジ)が採用値で明確に視認でき、dispersion 0 では出ないこと。roughness 0.55(最大)で破綻(ノイズ状の色割れ)がないこと。
- **視覚基準(ビーム)**: 出射ビームが根元白 → 先端で R/G/B に分離する扇を描き、IOR スライダー掃引で扇の開きが単調に変化すること。beamSpread(誇張率)0.05 で実質白 1 本、0.9 で明確な分離になること。25% サムネイルでも分光が判別できること。
- **数値基準**: telemetry で FPS 悪化が ±5% 以内(透過サンプル 1→3 回 + サブチューブ 2 メッシュの実測)。draw calls 増は サブチューブ 2 本分(+2)以内で、T-SH-02 の calls gate 値を新基線として更新・記録すること。
- **設定契約**: 新設定フィールドを追加した場合、URL round-trip(シリアライズ → 復元)テスト、domains 内クランプ、preset 検証(`runtime.test.ts:55-59` 相当)が通ること。追加しない場合もその判断理由を本チケットに追記すること。
- **QA 通過**: `pnpm test` / `pnpm lint` / `pnpm typecheck` / `pnpm qa:visual` 通過。i18n カタログの en / zh-CN 差分が同時に入っていること(T-I18N-01 の整合テスト)。

## 影響範囲・注意

- **T-GO-04 との順序**: 段階 2 は物理経路(P₁/P₂/床着地)の 3 波長再計算が前提。T-GO-04 未完了のまま現行フェイク経路に分光を載せると、嘘の経路を 3 色で強調することになるため**実施しない**。段階 1 のみ先行可。
- **T-GO-01 との共有**: サブチューブは T-GO-01 の固定トポロジー方式(直線 Cylinder 変換)で追加する。ジオメトリ再生成方式を復活させないこと。
- **draw calls gate**: T-SH-02/03 が glass の 19 calls を production hard gate にしている。サブチューブ追加で必ず割れるため、**gate 値の更新を QA スクリプト側の変更としてチケットに含める**(構造変更として意図的に記録し、無言の緩和にしない)。
- **カラーパイプライン**: ビームは `toneMapped = false` の加算 FX、ガラス本体はトーンマップされる混合パイプライン(dossier リスク 14)。分光ビームの色はトーンマッパーを通らないため、ガラス側 dispersion の色味と厳密には一致しない。本チケットでは「視覚的に同系のレインボー」で良しとし、パイプライン統一は T-SH-04 後続課題(Glass の tone mapping 独立チケット)へ委譲する。
- **renderOrder 連鎖**: サブチューブは既存 beam core(renderOrder 7)と同順位に置き、連鎖(1,3,4,5,6,7,8,9,10)へ新しい順位を増やさない。
