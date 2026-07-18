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
4. **スペクトル RGB ビーム分割**: T-GO-04 の経路計算を、ユーザー ior を G 波長とみなし `ior_R = ior − δ` / `ior_B = ior + δ` で 3 回実行する。`δ = 0.02 * dispersion` とし、**beamSpread は δ に掛けない**。入射は白 1 本、P₁ 以降だけ R/G/B に分割し、T-GO-04 の固定 Cylinder mesh を起動時確保して transform/visibility のみ更新する。
5. **beamSpread の既存意味を維持**: beamSpread はビーム束の広がりとコースティクス集束度を制御する既存パラメータのままとし、キー、domain、ラベル、URL 意味を変更しない。dispersion と独立に組み合わせられることをテストする。
4. **コースティクスへの余波(任意)**: 分散導入後、コースティクス外縁への色ずれ(cool/warm ミックスの再配分)は T-GO-03 のパターンに小さく足せる。スコープ肥大を避けるため本チケットでは判断記録のみとし、実装は T-GO-03 側の較正に委ねる。

## 受け入れ基準

- **視覚基準(マテリアル)**: ior 1.48 / 2.4 × dispersion 0 / 採用値 の 4 キャプチャ比較で、ガラス縁の色収差(エッジのレインボーフリンジ)が採用値で明確に視認でき、dispersion 0 では出ないこと。roughness 0.55(最大)で破綻(ノイズ状の色割れ)がないこと。
- **視覚基準(ビーム)**: 出射ビームが根元白 → 先端で R/G/B に分離し、dispersion 0 で白 1 本、0.45 で明確な分離になること。beamSpread 0.05 / 0.9 の双方で分散量は dispersion に従い、beamSpread 自体の束幅/集束度の応答も維持されること。
- **数値基準**: telemetry で FPS 悪化が ±5% 以内(透過サンプル 1→3 回 + サブチューブ 2 メッシュの実測)。draw calls 増は サブチューブ 2 本分(+2)以内で、T-SH-02 の calls gate 値を新基線として更新・記録すること。
- **設定契約**: dispersion が必須フィールドとして型・domain・default・全 preset・control・i18n・material に存在し、v3 URL round-trip と範囲外拒否が通ること。v1/v2 URL は拒否されること。
- **QA 通過**: `pnpm test` / `pnpm lint` / `pnpm typecheck` / `pnpm qa:visual` 通過。i18n カタログの en / zh-CN 差分が同時に入っていること(T-I18N-01 の整合テスト)。

## 影響範囲・注意

- **T-GO-04 との順序**: 物理経路(P₁/P₂/床着地)と固定トポロジーが前提。T-GO-04 未完了のフェイク経路には一部も先行実装しない。
- **固定トポロジー**: RGB サブビーム追加時も更新 tick の Geometry/BufferAttribute 生成や dispose+再生成を復活させない。
- **draw calls gate**: T-SH-02/03 が glass の 19 calls を production hard gate にしている。サブチューブ追加で必ず割れるため、**gate 値の更新を QA スクリプト側の変更としてチケットに含める**(構造変更として意図的に記録し、無言の緩和にしない)。
- **カラーパイプライン**: ビームは `toneMapped = false` の加算 FX、ガラス本体はトーンマップされる混合パイプライン(dossier リスク 14)。分光ビームの色はトーンマッパーを通らないため、ガラス側 dispersion の色味と厳密には一致しない。本チケットでは「視覚的に同系のレインボー」で良しとし、パイプライン統一は T-SH-04 後続課題(Glass の tone mapping 独立チケット)へ委譲する。
- **renderOrder 連鎖**: サブチューブは既存 beam core(renderOrder 7)と同順位に置き、連鎖(1,3,4,5,6,7,8,9,10)へ新しい順位を増やさない。
