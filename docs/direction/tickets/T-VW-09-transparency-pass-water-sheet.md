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

- **テスト契約の書き換えが必須**: `shader-quality.test.ts:105-145` は現行の意図(plane.renderOrder < columns.renderOrder、全5オブジェクト transparent:true)をピン留めしている。新しい意図(柱 opaque・depth 書き込み、プレーンは柱の後、spray/rain/grid は透明のまま)に合わせて**契約テストを書き換える**こと。挙動ベーステスト(T-QA-01)の趣旨どおり「新しい正しさ」を検証する形にする。
- **WEATHER_LOOKS 構造テスト**: columnOpacity 削除は `shader-quality.test.ts:67-85` のキー完全性テスト(77-78行が columnOpacity を直接参照)の同期更新を要する。
- **renderOrder 網の再監査**: review-framework.md 横断注意5のとおり、透明要素の順序変更は連鎖全体(sky 0 / spray / rain / grid)の再監査が必要。特に gridOverlay(depthTest:false、renderOrder 5)は柱の depth に関係なく最前面のまま — T-VW-10 の見直しと独立であることを確認。
- **T-VW-05 との境界**: T-VW-05 の波モデル変更を先に独立検収し、本票は透明合成と `transparent:false` の視覚差分だけを所有する。
- 柱が不透明化すると柱の描画は early-z が効く順序依存になる — 描画順そのものに視覚依存はなくなるため、将来の柱追加(T-VW-01 のランドマーク)にも安全側。
