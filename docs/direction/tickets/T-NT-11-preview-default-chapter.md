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

## 完了報告 (2026-07-20)

- Implementation revision: `5dcca94fc0bba3e8f3e740c26777341d1efa16c1`。
- ref側に `defaultMainPreviewSection = 7` を単一の既定値として置き、初期stateとsection無指定URLの
  main経路を第VIII章へ揃えた。旧section 4 fallback、alias、移行分岐は追加していない。
- `qa:exhibits` にsection無指定 `?preview=main` の `VIII` assertを追加した。明示
  `section=0..8` はI〜IXを厳密に維持し、bridge `set-tide-preview` もI〜IX、iframe instance維持、
  console error 0で完走した。
- 変更前後にT-NT-05 gateを実行し、3 browser process × 11 states × 3 repeats = 99 hook callsの
  `runs` objectが完全一致した。第VIII章は既存hash
  `d4891b579a844c36e3ac74432d68a55e50bcc35286601aa6b68c934c5fb964f2`、ROI luma `3.6748`、
  warm false、queued rAF 0を維持した。
- 原典hero / 旧default V / 新default VIIIの比較スチルと判定根拠を
  `docs/direction/captures/t-nt-11-preview-default-comparison-2026-07-20.md` に保存した。
- `pnpm lint`、`pnpm typecheck`、`pnpm test` (31 files / 180 tests)、`pnpm build`、
  `pnpm exhibits:check`、production `qa:ninth-tide`、`qa:exhibits`、`qa:visual` が通過した。
- 独立reviewはP0〜P3なしでAPPROVE。独立verifierもfresh production previewで99 hook calls、
  default VIII、standalone/bridge I〜IX、bundle同期、lint/typecheck/build/testを再確認しPASSした。
