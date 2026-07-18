# [T-VW-06] 天候クロスフェードを導入する(WEATHER_LOOKS 全フィールドの補間)

- 分類: AD
- 優先度: P2
- 評価軸: ストーリーテリング / モーション言語
- 依存: T-VW-05 の後が効率的(updateUniforms の uniform 配線整理後に補間層を挟むと二度手間がない)。T-VW-07 と blendedLook 実装を共有。T-VW-02 の WEATHER_LOOKS 新フィールドも同経路に乗せる

## 現状(証拠)

- 天候切替は即時のテーブルルックアップ: `updateSettings` → `updateUniforms`(`src/rooms/voxel-water/runtime.ts:435-502`)が `WEATHER_LOOKS[settings.weather]`(72-151行)の全フィールド — 水/空の全ティント、fog near/far/色(487-492行)、ライト色・強度(475-483行)、パーティクル opacity/size(468-473行)、柱マテリアル(494-499行)— を**1フレームでスナップ**させる。補間は存在しない。
- 可視性もブール即時切替: `rain.visible = settings.rain > 0.02 || settings.weather !== 'clear'`(469行)、`spray.visible`(471行)。
- review-framework.md AD軸「ストーリーテリング」の代表的不合格例(「WEATHER_LOOKSの即時テーブルスワップ」)として明記。research-exhibition-direction.md §7 も「プリセット切替を 2-3 秒のクロスフェード振付にすると切替自体が見せ場になる」と指摘。

## 問題

天候はこの展示の主演出だが、状態遷移が「設定パネルの値が変わった」以上の体験になっていない。1フレームの全画面スナップは展示としての振付の放棄であり、Storm への突入・Clear への回復という物語の見せ場を捨てている。

## 改善方向

research-stylized-water.md §2.3(current/target ルックの毎フレーム damp 補間)をそのまま適用する。WEATHER_LOOKS は既に「全フィールドがスカラー or Color の純データテーブル」なので構造変更は不要。

1. **blendedLook ワーキングコピー**を1個持つ(WeatherLook 型のミュータブル複製)。
2. weather 切替時は `targetLook` 参照を差し替えるだけにする。
3. 毎フレーム `blendedLook.field = MathUtils.damp(blendedLook.field, targetLook.field, λ≈2.5, dt)`(スカラー)/ 作業用 Color の `lerp`(色)。フレームレート非依存の指数減衰で 1〜2 秒のシネマティック遷移になる。
4. `updateUniforms` と `render` 内の weatherLook 参照(runtime.ts:436, 511, 588-597)をすべて blendedLook 読みに変える。rainCurtain・lightningIntensity・fogNear/far も同経路なので個別対応不要。
5. **可視性はブールから閾値へ**: rain/spray の visible 判定は blendedLook 由来の opacity が実質0になったら非表示、の形に置き換えて遷移中のポップを消す。
6. 色 lerp は linear 空間の Color 同士(sRGB hex から `new Color()` した後の値)で行う。
7. **演出時差(オプション)**: research-exhibition-direction.md §7 の「雲量→光→パーティクルの順に時差」を λ の項目別差で安価に実現できる。初版は一律 λ でよい。

## 受け入れ基準

- **スナップ消滅**: 天候切替直後の連続フレーム差分で、現行の1フレーム全画面スワップ(maxDelta スパイク)が消え、遷移が約1〜2秒(damp λ 設定値と整合)かけて完了すること。切替前後の動画または連続キャプチャを証拠として残す。
- **全6遷移の検収**: clear↔rain↔storm↔clear の6方向すべてで、遷移中間状態に破綻(フォグの逆転、パーティクルのポップ、色の濁り)がないこと。
- **収束の正確性**: 遷移完了後の各 uniform / マテリアル値が WEATHER_LOOKS テーブル値と一致すること(damp の残差が視覚閾値以下で打ち切られること)。
- **既存テスト**: `shader-quality.test.ts` の「updateSettings 後に uStorm が weatherLook.strength になる」テスト(147-171行)は**即時反映を前提**としている — 遷移導入後のテスト意図(最終収束値の検証、または updateSettings 直後は target を返す設計)を明確化して更新すること。
- **FPS**: 補間は CPU で数十 lerp/フレームであり計測誤差内であること(ベースライン 15 FPS 維持)。

## 影響範囲・注意

- **qa:water の決定論**: `scripts/water-qa.mjs:55` はプリセットクリック後 1200ms 待機してキャプチャする。1〜2秒遷移だと**未収束の中間状態を撮る**ことになるため、待機時間の延長(または収束待ちフック)を同時に入れ、3状態のベースラインを再取得する。
- **reduced-motion**: 遷移は低頻度・低振幅なので `motionScale` での減速はかえって「壊れて見える」リスクがある。motionScale=0 相当でも遷移自体は固定時間で完了させる(即時切替へのフォールバックも可)方針を実装時に決め、`qa:motion` で確認する。
- **T-VW-07 連動**: lightningIntensity が blendedLook 経由になることで、Storm 進入時に雷が徐々に始まる演出が自動で手に入る。T-VW-07 のパルス強度はこの補間後の値を読むこと。
- WEATHER_LOOKS テーブル値自体は変更しない(読み出し経路のみ差し替え)— T-VW-02 / T-VW-04 の値変更とはコミットを分けると検収が楽。
