# [T-VW-09] 透明パスを整理し「水シートがボクセルを覆う」合成を実現する

- 分類: TA
- 優先度: P2
- 評価軸: 描画正当性 / フレームバジェット / デッドコード・デッド出力(columnOpacity 恒等1)
- 依存: T-VW-03(シーム原因を確定) / T-VW-05(波モデルと柱 onBeforeCompile 境界を独立検証)。両票完了後に着手する

## 現状(証拠)

- **描画順がコンセプトと逆**: water plane は renderOrder 1 / transparent / depthWrite:false(`src/rooms/voxel-water/runtime.ts:262-266, 303`)、柱は renderOrder 2(329行)。透明プレーンが**先に**描かれ、alpha=1 の柱が後から上書きするため、「半透明トゥーン水シートがボクセル本体を覆う」というコンセプト(docs の意図、dossier-voxel-water.md「docsとコードの乖離」#1)は柱間 0.02 unit の隙間とフィールド外にしか存在しない。
- **柱は透明パスに居るのに不透明**: columnMaterial は `transparent: true, opacity: 1`(runtime.ts:307-317)で、WEATHER_LOOKS の columnOpacity は全状態 1(96, 122, 148行)— 死んだ制御。4096 インスタンスが不必要に透明パス(ソート+ブレンドコスト)を通り、かつ depth を書く。
- **パフォーマンス文脈**: 現行ベースライン fpsMedian **15.37**(`docs/direction/captures/telemetry-reference-2026-07-18.json`、計測プロトコル: `docs/design/telemetry-protocol.md`)。透明パスからの 4096 インスタンス除去は §2.10 で「VW-9(パフォーマンス)にも直接寄与」とされる打ち手。
- **過去の却下判断との関係**: 「不透明**水**パス」は round 04 で試行・却下済み(docs/voxel-water-qa-log.md:12「Opaque water pass trial」、33行「ボクセル可読性のため透明水が必要」)。**本チケットは水を不透明にするのではなく柱を不透明化する**ものであり、却下判断とは別物(水の透明度は維持される)。

## 問題

透明ソートの原則(不透明を先に depth 書き込み付きで、透明を後に depthTest あり/depthWrite なしで)に反した構成のため、(1) コンセプトの水シート合成が実現されず、(2) 4096 インスタンス分の透明パスコストを無駄に払い、(3) renderOrder の手動連鎖が「たまたま成立している」状態で追加変更に脆い。

## 改善方向

research-stylized-water.md §2.10 選択肢1(本命・ほぼ無料)を実施する。

1. **柱の不透明化**: columnMaterial を `transparent: false` にし、columnOpacity フィールドを WEATHER_LOOKS から削除(デッドフラグ掃除)。不透明キューは three.js が透明キューより先に描くため、柱が depth を書き、その後の透明プレーンが正しく合成される。
2. **描画順の反転**: renderOrder を「柱 < プレーン」に変更(プレーンは depthTest:true / depthWrite:false のまま)。プレーンより手前に突き出た柱頭は深度テストで正しく抜け、水面下の柱の上には半透明シートがブレンドされる — コンセプトの実現。
3. **surfaceAlpha の再検分**: シートが柱上に本当に乗るようになるため、`surfaceAlpha`(water.frag.glsl:247-248、clamp 0.28..0.84)の見え方が変わる。3状態で水面下の柱の透け具合を確認し、必要なら weatherTransparency 項を再調整する(値変更は最小限に留め、大掛かりな再設計は T-VW-04 へ)。
4. **様式実験の記録**: alphaHash(three r154+、順序非依存透明)は 0.55x 解像度でノイズ増幅の懸念があるが「ボクセル/レトロ様式」として成立する可能性あり — 採否はアートジャッジとして**別チケット化**し、本チケットでは選択肢1のみ。

## 受け入れ基準

- **合成の実現**: 水面レベルより低い柱の上面に水シートのティントが乗っていることをキャプチャで確認(プレーン近傍の柱を横切るクロップ比較: before は柱色のみ / after はシート越しの柱色)。水面上に突き出た柱はクリスプなまま。
- **FPS 改善**: 公式プロトコル(docs/design/telemetry-protocol.md)の計測でベースライン fpsMedian **15.37** から**悪化しない**こと(透明パス除去による改善を期待。改善幅を完了レポートに記録)。
- **視覚回帰の限定**: `pnpm qa:water` 3状態で waterCoverage 1 を維持、waterLuma / toonBandSeparation の変化が意図(シート合成)によるものだけであることをクロップ比較で示す。
- **透明水の維持**: round 04 の却下事由(ボクセル可読性)を再侵害していないこと — 柱のバンド可読性が storm 含め維持されている(toonBandSeparation の非悪化)。
- `pnpm test / lint / build / qa:visual` 通過。

## 影響範囲・注意

- **テスト契約の書き換えが必須**: `shader-quality.test.ts:105-145` は現行の意図(plane.renderOrder < columns.renderOrder、全5オブジェクト transparent:true)をピン留めしている。新しい意図(柱 opaque・depth 書き込み、プレーンは柱の後、spray/rainとT-VW-03後に実在するgridだけが透明)に合わせて契約テストを書き換える。T-VW-03でgridが削除済みなら `voxel-water-grid` が存在しないことをassertし、存在する場合だけtransparent/depthWrite/renderOrderをassertする。削除済みobjectを必須取得するテストは残さない。
- **WEATHER_LOOKS 構造テスト**: columnOpacity 削除は `shader-quality.test.ts:67-85` のキー完全性テスト(77-78行が columnOpacity を直接参照)の同期更新を要する。
- **renderOrder 網の再監査**: review-framework.md 横断注意5のとおり、透明要素の順序変更は T-VW-03 完了後の scene graph に実在する連鎖全体(sky / spray / rain / 残存 grid)を再監査する。削除済み要素を前提にした契約や順位は残さない。
- **T-VW-05 との境界**: T-VW-05 の波モデル変更を先に独立検収し、本票は透明合成と `transparent:false` の視覚差分だけを所有する。
- 柱が不透明化すると柱の描画は early-z が効く順序依存になる — 描画順そのものに視覚依存はなくなるため、将来の柱追加(T-VW-01 のランドマーク)にも安全側。

## 完了レポート (2026-07-20)

### 実装と描画契約

- 実装コミットは `409c82c4e59e8ec5a02f527af33759fd686a051f`。`columnOpacity` を `WeatherLook`、3 weather look、更新処理から完全に削除し、column は `transparent:false / depthTest:true / depthWrite:true`、water plane は `transparent:true / depthTest:true / depthWrite:false` に固定した。
- semantic order は sky `0` / columns `1` / plane `2` / spray `3` / rain `4` / grid `5`。Three r184 は material の transparent 分類後に opaque → transmissive → transparent の順で描画するため、column が先に depth を書く根拠は queue 分類であり、opaque/transparent 間の renderOrder 数値比較ではない。sky と columns の `0 < 1`、および transparent queue 内の `2 < 3 < 4 < 5` を実 object の contract test で固定した。
- 4096 column は1個の `InstancedMesh`、すなわち render-list item は1個である。成果は「4096 sorting item の削除」ではなく、不要な blending の無効化、opaque depth 書き込み、後続 water fragment の depth reject である。既存の transparent cloud 14 mesh は本票の範囲外で変更していない。

### 合成と三態 QA

- before/after crop は `docs/direction/captures/t-vw-09-clear-before.png` / `t-vw-09-clear-after.png`。前者は T-VW-05 live serial clear、後者は候補 clear の canvas からともに `700x430+80+240` を切り出した非 time-lock 比較である。before では column 色だけだった低い上面に、after では water sheet の tint / highlight / shadow が乗り、水面上の column edge は crisp なまま残ることを目視確認した。
- 正式16-frame記録は `output/water-qa/vw09-final4-{clear,rain,storm}/`。全状態で `waterCoverage=1`、console error 0。`surfaceAlpha` は変更せず、正しい合成だけで toon band が T-VW-05 の `7.629 / 6.416 / 3.140` から `10.778 / 7.437 / 12.291` へ改善したため、追加調整は不要と判断した。

| preset | waterLuma | toonBandSeparation | hueMean | seam score / gate |
|---|---:|---:|---:|---:|
| clear | 155.73 | 10.778 | 181.43 | 1.167 / <=1.5 |
| rain | 114.94 | 7.437 | 198.30 | 0.667 / <=1.5 |
| storm | 104.20 | 12.291 | 186.97 | 0.667 / <=1.0 |

- 初回の seam detector は左右5px平均との差の全行平均だったため、新しく露出した合法な column edge を clear/rain/storm で `3.642 / 2.008 / 2.344` と誤検出した。threshold は変更せず、各channelで center から左右どちらか近い実 neighborhood への距離を使い、path の昇順p40を採用して「少なくとも約60%の行で続く薄い異常線」だけを評価するよう修正した。直線、斜線、storm低contrast、通常の広いedge、広いedge上の中間色1px seam、間欠点列、時間的な transient/persistent の12 testで旧gate能力と誤検出除外を固定した。

### 性能・回帰・独立確認

- raw paired record は `docs/direction/captures/t-vw-09-software-pairs-2026-07-20.json`。Pages の `af9ba06584a5aea4edc909e385df5ce668d67fe2` と local candidate implementation commit を同一 SwiftShader / 1440x900 / DPR1、5秒warmup + 15秒計測、5組交互順序で比較した。
- baseline / candidate の個別 fps median は `16.1647 / 16.1160`、paired speedup median は **1.0125x**、範囲は `0.9649x–1.0134x`。本票の non-regression gate `>=0.95x` を満たす。共用 script の別票向け `1.7x` gate は失敗するが、raw record を先に保存する設計であり、本票判定には使用していない。
- `pnpm build`、`pnpm lint`、`pnpm test` (`32 files / 199 tests`)、`pnpm qa:visual`、`pnpm qa:exhibits`、三態 `pnpm qa:water` を通過。独立 reviewer は一度 seam metric の弱化を blocker として差し戻し、edge+seamを保持する上記指標へ修正後に `APPROVE`。独立 verifier も定向23 tests、最終三態、diff-checkを `PASS` とした。
