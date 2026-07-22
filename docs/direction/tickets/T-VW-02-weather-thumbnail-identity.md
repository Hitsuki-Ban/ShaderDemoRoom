# [T-VW-02] 天候3状態のサムネイル判別性を確立する(色相シフト脱却)

- 状態: 調査・実装中（性能検収環境 BLOCK、T-VW-01 / T-VW-08 完了、2026-07-23）
- 分類: AD
- 優先度: P1
- 評価軸: サムネイルテスト / モーション言語 / ストーリーテリング
- 依存: T-VW-01(ランドマークの3天候演出を確定) / T-VW-08(雨条=パーティクル個別リサイクルを確定)。Rain と Storm の最終 look を本票で確定してから T-VW-06 が補間する

## 疑問・既定判断 (2026-07-23)

- **疑問1 — 主検収が weather selector 自体を測れていない**: 現行 QA は Clear が default、Rain が
  weather selector、Storm が wind / rain / waveHeight / cloudCover / chop / foam 等も同時に変える full Storm preset
  であり、`WEATHER_LOOKS` の3端点と非天候スライダー差を分離できない。**既定判断**: 本票の主検収は
  非天候 settings を完全に揃え、`weather` だけを clear / rain / storm に切り替える。full Storm preset は
  hero / stress / performance QA として残すが、weather identity の合格根拠には使わない。これは後続
  T-VW-06 が補間する端点を先に確定するための最小境界でもある。
- **疑問2 — FPS の絶対門と paired 門の関係**: T-VW-08 の最終 paired median は `0.9679712101x` だが、
  candidate absolute median `13.3959885445 FPS` は票面基準 `15.37` の90%である `13.833 FPS` を下回る。
  **既定判断**: 本票では absolute `fpsMedian >= 13.833` と同一環境 AB/BA paired median `>= 0.95x` を
  どちらも報告し、両方を合格条件とする。環境正規化した paired 値で absolute 未達を置き換えない。
- 人間判断が別途必要になるのは、同一 controls の彩色 / grayscale 160px sheet が機械門を満たした後も
  3状態の意味読みが競合する場合だけとする。それまでは上記既定判断で進める。
- **疑問3 — absolute FPS を再現できるアイドル環境が確保できない**: 候補 `20a4abd` は同一環境
  AB/BA paired median を weather-only Storm `0.9753x`、full Storm `0.9610x` で通過した一方、absolute
  median は `13.7395 / 13.3560 FPS` で未達。固定基線 `328cc638` 自体も直近各 run でおおむね
  `13.70–14.17 FPS`、full Storm は `13.70–13.84 FPS` と absolute 門 `13.833 FPS` 付近または未満まで
  低下した。Playwright / SwiftShader の孤児は0件、preview は候補・基線各1件まで清掃済みだが、Windows
  5秒サンプルでは非プロジェクト負荷を含む active CPU が20論理コア中およそ3–8コア相当で継続している。
  **確認事項**: 非プロジェクトアプリを停止したアイドル窓で同じ5組 AB/BA を再実行してよいか。
  **既定判断**: 本票の権限で無関係なユーザープロセスを終了せず、identity / paired / topology 合格を
  保持したまま absolute gate のみ BLOCK とする。アイドル窓または明示的な停止許可が得られたら、閾値を
  変更せず同一 protocol を再実行する。

## 現状(証拠)

- **Rain 状態に雨が見えない**: `output/water-qa/pages-rain-final-canvas.png` / `palette-camera-final-rain-canvas.png` にストリーク・水紋・表面の荒れが一切写っていない(dossier-voxel-water.md ビジュアル現状評価: 「細目で見ると Clear と同じ画に青フィルター」、Wow 3/10・2/10)。
- 状態差の実体はほぼ色相と輝度のテーブルスワップ: `WEATHER_LOOKS`(`src/rooms/voxel-water/runtime.ts:72-151`)の waterTint 0x6dffdd / 0x2c9fe2 / 0x127f92 等。QA実測(docs/voxel-water-toon-infinite-qa.md「Palette And Camera Correction Pass」166-168行)でも waterLuma 172.09 / 117.57 / 72.41、hueMean 177.35 / 199.76 / 187.77 と「色相+暗さ」しか動いていない。※このログ値は歴史的証拠。**回帰判定の正典は T-SH-01 以降の最新 `pnpm qa:water` レポート(clear: waterLuma 162.55 / toonBandSeparation 7.841 / hueMean 177.30 — T-VW-03/05 と同一基準)とし、本チケットの再較正もそこから行う。**
- 雨の可視性が構造的に不足: 雨パーティクルは 420粒の Points で opacity は `min(0.64, rain*0.62 + strength*0.2)`(runtime.ts:468)、size `0.024 + rain*0.022 + surfaceDetail*0.006`(470行)— Rain 天候+デフォルト rain 0.12 では opacity 約0.17(=0.12*0.62+0.48*0.2)・size 約0.03 のドット。フラグメント側の rain 表現(water.frag.glsl:135-152)もリップルゲイン 0.022 等のサブリミナル級で、0.55x 内部解像度(src/shared/three/renderPolicy.ts:10)では消える。
- Storm のシルエット変化は遠景クレストのみ。雲は14個のフラットボックス(runtime.ts:421-433)で「文字通りの無テクスチャ矩形(UI プレースホルダーバー)」と批評され、スプレーは「ドット欠陥/星に見える」(dossier 同節)。晴天用の太陽の縦光帯が Storm でも構図に残る問題は sky 側(sky.frag.glsl:71-76)。

## 問題

天候セレクタは本展示の主演出だが、サムネイルテスト(縮小して状態が判別できるか)に不合格。「Rain を選んだのに雨が降らない」は展示としての約束違反であり、3状態の存在価値自体を毀損する。

## 改善方向

research-exhibition-direction.md §4「雨は多層キューの複合」+ research-stylized-water.md §2.5/§2.9(SoT の天候別泡量・峰の透け)に従い、**色相以外の差別化チャンネル**を状態ごとに設計する。

| 状態 | シルエット | パーティクル | 水面 |
|---|---|---|---|
| Clear | 静かな水平線(+T-VW-01 ランドマーク) | スパークル数点のみ | 泡少・明度高 |
| Rain | 雲底を下げ遠景を霞ませる | **見える雨条(伸長ストリーク、T-VW-08)** | **時間駆動の波紋リング**、泡やや増 |
| Storm | 波頭シルエット増大+雲塊の不規則形状 | 斜め雨条+重力つき飛沫 | 白波増量、太陽光帯は消灯 |

1. **Rain の雨条**: T-VW-08 の per-drop リサイクルを前提に、ドットでなくストリーク描画(伸長クアッドまたはポイント+縦長テクスチャ)。opacity / size の床値を WEATHER_LOOKS 経由で引き上げ、静止キャプチャで読めるレベルを基準にする。
2. **Rain の水紋**: water.frag に時間駆動リング関数を数個加算(テクスチャ不要、research-exhibition-direction.md §4)。現行の `ripple` 項(water.frag.glsl:143)のゲイン 0.022 を「静止画で見える」まで再設計。
3. **Storm のシルエット**: WEATHER_LOOKS に波形フロア(waveHeight / chop / foam の状態別下限)を追加し、スライダーが低くても Storm は荒れるようにする(SoT の calm/normal/stormy 泡量マッピングの移植、research-stylized-water.md §2.9)。雲は矩形ボックスを複数スケールのボクセル塊クラスタ+底面暗化に置換(research-exhibition-direction.md §4「単純形状の組合せ」)。
4. **Storm の光の整理**: sunGlow / sunDisc はすでに `(1.0 - uStorm)` 減衰(sky.frag.glsl:75-76)だが uStorm=0.88 で残余が出る。Storm では完全消灯し、灯台光(T-VW-01)へ主光源を反転する。

## 受け入れ基準

- **サムネイルテスト(主基準)**: 3状態のキャプチャを 160px 幅に縮小して並べ、(a) カラー、(b) グレースケール化した状態、の両方で3状態が判別できること。判定画像を `docs/direction/captures/` に残す。
- **Rain の静止画証拠**: `pnpm qa:water`(QA_PRESET=rain、`scripts/water-qa.mjs:52-53` の `voxel-water-weather-rain` testid 経由)のキャプチャに雨条と水紋が写ること。
- **メトリクス**: 3状態の `weatherSeparation`(water-qa レポートの waterHue / cyanBias / warmCoolBias)に加え、輝度以外の構造差(雨条による strongRatio の増分、Storm の toonBandSeparation)の目標値を定義し3状態で記録する。
- **3状態同時検収**: WEATHER_LOOKS 変更は clear/rain/storm すべてを再キャプチャ(review-framework.md 横断注意3)。
- **FPS**: telemetry-reference-2026-07-18.json の fpsMedian **15.37**(プロトコル: docs/design/telemetry-protocol.md)から10%以内。

## 影響範囲・注意

- **WEATHER_LOOKS はADの単一情報源**: 新フィールド(波形フロア等)追加時は `shader-quality.test.ts:67-85` の構造完全性テスト(全状態のキー一致・strength 順序)が対象キーを自動検証するため、3状態同時に追加する。
- **T-VW-06 との整合**: 追加フィールドはすべてスカラー or Color とし、クロスフェードの一括補間経路に乗る形を保つ。
- **i18n**: UI 文言の追加・変更は t(key) 経由(T-I18N-01 のカタログパリティテストが監視)。
- 雲の造形は工数リスク。ブロックアウト先行(T-VW-01 と同じ手順)で、最悪ボックスクラスタ+頂点色ベイクまでで切る。
