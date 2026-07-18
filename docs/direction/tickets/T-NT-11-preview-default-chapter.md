# [T-NT-11] main preview の既定章を原典ヒーローの第VIII章へ合わせる

- 分類: QA / AD
- 優先度: P2
- 評価軸: ヒーローショット成立性
- 依存: T-NT-05

## 現状(証拠)

`?preview=main` の section 無指定時は第V章を選ぶ。第V章は唯一の暖色章だが、原典 `preview.png` のヒーローは寒色の第VIII章であり、無指定スチルが作品を非代表的に見せる。

## 本票の唯一の結果

**section 無指定の `preview=main` が第VIII章を表示する。**

## 改善方向

- main の default section を 7 に変更する。明示 `section=0..8` と bridge `set-tide-preview` の意味論は変更しない。
- 旧 default へ戻る fallback、section alias、移行分岐は置かない。

## 受け入れ基準

- `?preview=main` で `#phaseNumber` が VIII、T-NT-05 の第VIII章 hash/metrics と一致する。
- `?preview=main&section=N` は全9章で N を厳密に表示し、bridge 明示経路も不変。
- 原典ヒーローとの比較スチルを記録し、`qa:exhibits` / T-NT-05 が通る。

## 影響範囲・注意

- preview default だけを所有する。QA capture 基盤は T-NT-05、作品本編の章順は変更しない。
- ref/ で実装し exhibits を再生成する。
