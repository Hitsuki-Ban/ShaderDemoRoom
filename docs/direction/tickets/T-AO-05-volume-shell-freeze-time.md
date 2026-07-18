# [T-AO-05] freeze 中も動き続ける volume shell を fluidTime へ差し替える

- 分類: TA
- 優先度: P2
- 評価軸: モデル一貫性(凍結ルール) / 描画正当性
- 依存: なし

## 現状(証拠)

現行 `ref/mizu-kokoro-2-source/src/main.js`:

- **liquid フラグメントは freeze で時間をロックする**: `float frozen = freezeMask(vLocalDir); ... float fluidTime = mix(detailTime, uFreezeTime, frozen);`(main.js:612-614)。凍結領域では流体時間が核形成時刻 `uFreezeTime` に固定され、表面フローが止まる。
- **volume シェル(背面吸収シェル)は生の `uTime` を使い続ける**: `volumeFragmentShader`(main.js:763-797)内で
  - `surfaceFlowVector(vLocalDir, uTime, uTurbulence)`(main.js:783)
  - `innerCaustic` の fbm と sin の時間項(main.js:787-788)
  の3箇所が freeze 状態を無視して進行する。`uFreezeProgress` は宣言済み(main.js:771)だが alpha フェード(`alpha *= 1.0 - uFreezeProgress * 0.78`、main.js:794)にしか使われていない。
- `volumeMaterial` は `sharedUniforms` をそのまま共有している(main.js:951-958)ため、`uFreezeTime` の値は JS 側配線なしで既に利用可能 — 不足しているのは GLSL 側の `uniform float uFreezeTime;` 宣言と使用箇所の差し替えのみ。
- 現象: 凍結中、グレージング角で背面シェルのフロー模様と内部コースティクスが動き続ける。alpha 0.78 減衰で部分的に隠蔽されているが、freeze 進行中(progress 0.2〜0.7 の帯)では十分視認できる。

## 問題

ART_DIRECTION の凍結ルール(「結晶は色替えではなくルール切替であれ」「凍結時に表面フローはロックされる」)への違反。liquid 表面は静止するのに背面だけ流れ続けるのは、最大の見せ場である結晶化の説得力 — 「相転移で運動言語が変わる」というテーゼそのもの — を裏から侵食する。

## 改善方向

liquid と同じ意味論に揃える。工数は uniform 宣言1本+3箇所の置換の見込み:

1. **最小案(推奨)**: `volumeFragmentShader` に `uniform float uFreezeTime;` を追加し、
   `float fluidTime = mix(uTime, uFreezeTime, smoothstep(0.05, 0.9, uFreezeProgress));`
   を main() 冒頭で計算、main.js:783 / 787 / 788 の `uTime` を `fluidTime` に置換する。背面シェルは輪郭のみの淡い要素なので、liquid の空間的核形成マスク(`freezeMask(vLocalDir)`)まで再現せず、進行度による全体ロックで十分 — という仮説をまず視覚検証する。
2. **忠実案(最小案で凍結フロントとの不一致が目立った場合のみ)**: liquid の `freezeMask` 相当(`uFreezeOrigin` からの角距離 smoothstep)を volume 側にも移植し、核形成フロントの通過に同期して局所的に時間ロックする。
3. melt 側の確認: melt 中(progress 減少)は同じ式で自然に `uTime` へ戻るが、`uTime` は進み続けているため復帰時に模様が不連続ジャンプする。liquid 側も同じ特性(mix の frozen 係数が下がると detailTime へ戻る)なので、**liquid と同時に melt させて差が出ないこと**を確認基準にする。

## 受け入れ基準

- freeze 完了状態(freezeProgress ≈ 1)で、グレージング角の背面シェルのフロー模様・innerCaustic が静止する(数秒間隔の2枚のスクリーンショット比較で volume 領域に差分がない。liquid の静止と同判定)。
- freeze 進行中(0.2〜0.7)にも、背面のフローが liquid 表面の停止と明らかに矛盾して流れ続ける状態が解消されている(before/after 動画または連続キャプチャ)。
- melt 後は背面フローが再開し、liquid 表面との時間的整合(同時に動き出す)が保たれる。
- 非 freeze 時の見た目は 4相すべてで無回帰(volume シェルの通常時アルファ・色は変更しない)。
- reduced-motion 環境でも破綻しない(sceneTime スケールの変更はしていないので原理上影響なし — 確認のみ)。

## 影響範囲・注意

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。
- GLSL のみの変更で JS 側の uniform 配線は不要(sharedUniforms 共有のため)。誤って volume 用に別 uniform オブジェクトを作らないこと(共有が本作の設計)。
- crystal シェル(main.js:831-)は独自に freeze 演出を持つため本票では触れない。outline は時間項を持たない(main.js:736-746)ので対象外。
- 検収は 4相 × freeze/melt のスクリーンショット比較(review-framework 横断注意3の精神で全状態を再検収)。
- shader-quality.test.ts / runtime.test.ts は shell 側ルームのソースをピン留めしており ref/ の GLSL には届かないはずだが、`pnpm test` 全走で確認する。
