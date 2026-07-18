# [T-SH-04] 展示別ステージプロファイルを導入する(明暗展示の露出分離)

- 分類: AD
- 優先度: P2
- 評価軸: 値構造(明るい展示と暗黒展示の共存)/ パレット規律(ニアブラック 3 種のドリフト)
- 依存: T-SH-02(renderer 状態 save/restore 契約 — review-framework.md 横断注意 #6 が「SH-4 のルーム別露出分離を実装する場合はこの契約の明文化が前提」と明記)。T-DS-01(ニアブラック 3 種の統一)と相互参照

## 現状(証拠)

- **シェルクロームは全ルーム一律**: `src/styles/app.css:1-11` — `.showroom-shell` の背景はグラファイト・グラデーション+ 22% 0% の cyan glow `rgba(52,213,255,0.1)` + 80% 10% の amber glow `rgba(255,189,90,0.08)` で固定。topbar(13-24 行)・rail/inspector(124-130 行)の輝度・blur も全ルーム共通。registry(`src/rooms/registry.ts:32-93`)にはアクセント色(41 / 56 / 71 / 86 行)以外にステージ環境を宣言するフィールドがない。
- **暗黒展示の保護がない**: 95% 黒の Ninth Tide Archive と高彩度の MIZU//KOKORO が同一シェルに同居し、Ninth Tide 表示時は「ページ内で最も明るいのがサイドバー」という本末転倒(research-exhibition-direction.md §0-5・§5 の refs 警告「Ninth Tide のマジックはコントラスト脆弱。隔離された露出/トーン設定が必要」、review-framework.md ロングリスト SH-4)。
- **ニアブラック 3 種のシーム**: renderer クリアカラー `0x070b10`(`src/shared/three/ShaderCanvas.tsx:51`)/ `.canvas-shell` `#06090e`(app.css:234-241)/ `.embedded-shell` `.embedded-exhibit-frame` `#02070d`(app.css:249-259)が微妙に異なり、ロード時の DOM 背景と初回フレームの継ぎ目・フラッシュ要因(dossier-shell.md「ニアブラックの三重奏」・リスク #8)。統一先トークンは T-DS-01 の所掌で、本チケットは「プロファイルがそのトークンを参照する」形で連携する。
- **toneMapping はルーム別に設定不可**: 現契約に露出/トーンマッパーの宣言箇所がなく、shader ルームが renderer に直接触れば汚染リスク(T-SH-02 (a) の証拠と同じ)。three.js の `toneMapping` / `toneMappingExposure` はレンダラーレベルで動的変更可・コストほぼゼロ(research-exhibition-direction.md §5)。

## 問題

明るい展示(Orb)の隣で暗黒展示(Ninth Tide)の下位輝度層がシェルの明るさに殺され、逆に暗室的な演出をシェル側から支援する手段が存在しない。展示ごとの「部屋の照明」が作れないことは、オンライン展覧会メタファーの根幹(部屋=独立した展示環境)に対する構造的欠落。

## 改善方向

research-exhibition-direction.md §5「ルームごとのレンダープロファイル」に従い、registry 駆動のステージプロファイルを導入する。

1. **`RoomDefinition` に `stageProfile` を追加**(`src/rooms/types.ts` / `registry.ts`): 例 `{ shellChrome: 'default' | 'dim', stageGlow?: {...} | null, canvasBackground: <トークン参照>, toneMapping?, toneMappingExposure? }`。宣言的にし、適用はシェル専有(ルーム runtime が renderer を直接触らない — T-SH-02 (a) の save/restore の上に載せる)。
2. **シェルクロームの減光モード**: Ninth Tide 選択時は `.showroom-shell` にプロファイル由来の CSS クラス(例 `stage-dim`)を付与し、rail / inspector / topbar の表面輝度と背景グローを落とす(「暗順応」演出兼用)。Orb / ネイティブ 2 室は現行 default を維持。
3. **canvas-shell / ステージ背景のルーム別トークン化**: プロファイルの `canvasBackground` は T-DS-01 で統一されるニアブラックトークンを参照し、renderer クリアカラーと CSS 背景をプロファイル経由で必ず同値にする(ロード時シームの構造的排除)。
4. **toneMapping / exposure のルーム別適用**: NPR 系(voxel-water)は `NoToneMapping` + sRGB 維持、HDR 的ハイライトを持つ glass-optics のみ AgX / ACES を検討(research-exhibition-direction.md §5 実装要点 2)。適用と復元はシェルが T-SH-02 のスナップショット機構で行う。
5. **遷移演出(任意・小)**: ルーム切替時に exposure / クローム減光を 0.3〜0.5s で lerp し「部屋の照明が変わる」物語にする(同 §5 実装要点 4)。reduced-motion 時は即時切替(T-SH-02 (c) の motionScale に従う)。

## 受け入れ基準

- **視覚基準(暗室)**: Ninth Tide 表示時、rail / inspector 表面の実測平均 luma(スクリーンショットの該当領域サンプリング — water-qa.mjs の lumaMean 方式を流用)が default プロファイル時より 30% 以上低いこと。批評指摘「ページ内で最も明るいのがサイドバー」がスクリーンショット比較で解消していること。
- **視覚基準(明室の無回帰)**: voxel-water / glass-optics / anime-liquid-orb の各スクリーンショットが現行と同等(visual-smoke 通過+目視レビュー)であること。
- **数値基準(シーム)**: 各ルームで renderer クリアカラーと canvas-shell CSS 背景が同一値(プロファイル経由)であること。ルーム入場直後のキャプチャに背景色の継ぎ目・フラッシュが写らないこと。
- **状態復元**: ルームを 1 巡して voxel-water に戻った時点で toneMapping / toneMappingExposure が voxel-water プロファイルの宣言値と一致すること(T-SH-02 の状態リーク検査に本プロファイル項目を追加)。
- **回帰確認**: `pnpm test / lint / build / qa:visual` 全通過。glass-optics のトーンマッパー変更を行う場合は展示単位のリファレンススクショで色ずれを検収(research-exhibition-direction.md §5 のリスク項)。

## 影響範囲・注意

- **共有レンダラー状態契約(review-framework.md 横断注意 #6)**: toneMapping / toneMappingExposure に触れる実装は必ず T-SH-02 の save/restore 機構経由。ルーム runtime からの直接設定は契約違反。
- **T-DS-01 と相互参照**: ニアブラック統一トークン(`0x070b10` / `#06090e` / `#02070d` の集約)は T-DS-01 の成果物を参照する。T-DS-01 未完了で先行する場合は暫定トークンを 1 箇所に定義し、TODO で紐付ける。
- **文字列ピン留めテスト**: `src/shared/three/ShaderCanvas.test.ts` は clearColor 文字列をピン留めしていないが、shader-quality.test.ts / runtime.test.ts はルーム側ソースをピン留めしている。ルーム側の toneMapped / 色定数に触れる場合は同期更新が必要。
- **visual-smoke セレクタ**: `.scene-hud` / `.stage-viewport` のオーバーラップ検査があるため、減光クラス追加でレイアウトを変えないこと(色のみの変更に留める)。
- **glass の toneMapped=false FX レイヤー**(review-framework.md GO-10): glass-optics にトーンマッパーを適用する場合、FX レイヤーとの混在パイプラインを再検証すること。
- **renderOrder 連鎖**: 本チケットはシーングラフに触れないが、背景色変更は透明要素の見えに影響し得るため、両 shader ルームのスクリーンショット比較を必須とする。
