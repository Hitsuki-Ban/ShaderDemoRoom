# [T-VW-06] 天候クロスフェードを導入する(WEATHER_LOOKS 全フィールドの補間)

- 分類: AD
- 優先度: P2
- 評価軸: ストーリーテリング / モーション言語
- 依存: T-VW-02(3天候の最終 WEATHER_LOOKS と視覚識別性を確定) / T-VW-05(uniform 配線と時間源を確定)。T-VW-07 は本票の blendedLook を前提とする

## 現状(証拠)

- 天候切替は即時のテーブルルックアップ: `updateSettings` → `updateUniforms`(`src/rooms/voxel-water/runtime.ts:435-502`)が `WEATHER_LOOKS[settings.weather]`(72-151行)の全フィールド — 水/空の全ティント、fog near/far/色(487-492行)、ライト色・強度(475-483行)、パーティクル opacity/size(468-473行)、柱マテリアル(494-499行)— を**1フレームでスナップ**させる。補間は存在しない。
- 可視性もブール即時切替: `rain.visible = settings.rain > 0.02 || settings.weather !== 'clear'`(469行)、`spray.visible`(471行)。
- review-framework.md AD軸「ストーリーテリング」の代表的不合格例(「WEATHER_LOOKSの即時テーブルスワップ」)として明記。research-exhibition-direction.md §7 も「プリセット切替を 2-3 秒のクロスフェード振付にすると切替自体が見せ場になる」と指摘。

## 問題

天候はこの展示の主演出だが、状態遷移が「設定パネルの値が変わった」以上の体験になっていない。1フレームの全画面スナップは展示としての振付の放棄であり、Storm への突入・Clear への回復という物語の見せ場を捨てている。

## 改善方向

WEATHER_LOOKS は「全フィールドがスカラー or Color の純データテーブル」なので、固定 wall-clock の source→target 補間を一経路で適用する。

1. `sourceLook`、`targetLook`、`blendedLook` と `transitionElapsed` を持つ。weather 切替時は現在の blendedLook を source にスナップショットし、target を差し替え、elapsed を 0 にする。
2. render の**非スケール wall-clock delta**を `transitionElapsed` に加算し、`p = smoothstep(0, 1, clamp(elapsed / 2.0s, 0, 1))` で全フィールドを source→target 補間する。`motionElapsed` / `motionScale` は使わない。
3. elapsed >= **2.0s** で全フィールドを target の値へ厳密代入して遷移を完了する。damp 残差、視覚閾値による早期打切り、reduced-motion 時の即時切替は設けない。
4. `updateUniforms` と `render` 内の weatherLook 参照(runtime.ts:436, 511, 588-597)をすべて blendedLook 読みに変える。rainCurtain・lightningIntensity・fogNear/far も同経路なので個別対応不要。
5. **可視性はブールから閾値へ**: rain/spray の visible 判定は blendedLook 由来の opacity が実質0になったら非表示、の形に置き換えて遷移中のポップを消す。
6. 色 lerp は linear 空間の Color 同士(sRGB hex から `new Color()` した後の値)で行う。
7. 項目別の遅延や別 duration は導入せず、全フィールドを同じ 2.0s progress へ載せる。

## 受け入れ基準

- **固定 wall-clock**: 通常設定と `motionScale=0` の双方で、切替後 0ms は source、1000ms は progress 0.5、2000ms は target と一致すること(テスト用 fake clock、許容 ±1 frame)。2000ms より前の target 即時代入がないこと。
- **全6遷移の検収**: clear↔rain↔storm↔clear の6方向すべてで、遷移中間状態に破綻(フォグの逆転、パーティクルのポップ、色の濁り)がないこと。
- **収束の正確性**: 2000ms 到達フレームで各 uniform / material 値が WEATHER_LOOKS target と厳密一致し、その後ドリフトしないこと。
- **既存テスト**: `shader-quality.test.ts` の「updateSettings 後に uStorm が weatherLook.strength になる」テスト(147-171行)は**即時反映を前提**としている — 遷移導入後のテスト意図(最終収束値の検証、または updateSettings 直後は target を返す設計)を明確化して更新すること。
- **FPS**: 補間は CPU で数十 lerp/フレームであり計測誤差内であること(ベースライン 15 FPS 維持)。

## 影響範囲・注意

- **qa:water の決定論**: `scripts/water-qa.mjs:55` はプリセットクリック後 1200ms 待機してキャプチャする。1〜2秒遷移だと**未収束の中間状態を撮る**ことになるため、待機時間の延長(または収束待ちフック)を同時に入れ、3状態のベースラインを再取得する。
- **reduced-motion**: `motionScale=0` でも同じ非スケール wall-clock 2.0s で完了する。即時切替 fallback、duration 0、motionScale 連動を禁止し、`qa:motion` と fake-clock test で固定する。
- **T-VW-07 連動**: lightningIntensity が blendedLook 経由になることで、Storm 進入時に雷が徐々に始まる演出が自動で手に入る。T-VW-07 のパルス強度はこの補間後の値を読むこと。
- WEATHER_LOOKS テーブル値自体は変更しない(読み出し経路のみ差し替え)— T-VW-02 / T-VW-04 の値変更とはコミットを分けると検収が楽。
