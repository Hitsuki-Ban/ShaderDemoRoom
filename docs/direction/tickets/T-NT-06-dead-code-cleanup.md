# [T-NT-06] Ninth Tide の確認済みデッドコードを最終 cleanup で除去する

- 分類: TA
- 優先度: P3
- 評価軸: デッドコード・デッド出力
- 依存: T-NT-01〜05 / T-NT-07〜11

## 現状(証拠)

`ref/archive_of_the_ninth_tide_shoreless_web/src/main.js` には、機能結果を持たない残骸がある。

- `CircleGeometry(16, 256)` 上の `if (radius > 16.0) discard;` は到達不能。
- `triggerPulse()` の `sonarShell.visible = state.pulseMode === 0` は同フレーム以降の `updatePulse()` に必ず上書きされる。
- `core.userData.interactive = 'core'` は参照されない。

これらを機能票に混ぜると、視覚差の原因と bisect 境界が曖昧になる。

## 本票の唯一の結果

**全 NT 機能票の完了後、静的参照監査と T-NT-05 baseline で挙動不変を証明できるデッドコードだけを一度に除去する。**

## 実施内容

1. 上記3項目を削除し、それぞれが未参照または必ず上書きされることをレビュー記録に残す。
2. behavior、visual、audio、performance、quality tier の変更を追加しない。
3. cleanup の前後で T-NT-05 の同一 build/runtime 11状態比較を取る。

## 受け入れ基準

- 対象コードが bundle/source から消え、置換 alias、no-op wrapper、互換分岐が追加されていない。
- T-NT-05 の11状態 hash/metrics が cleanup 前後で一致する。
- pulse、core click/hover、床表示の既存 QA が通り、console error/warning 0。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- この票を NT の最後に実施し、機能修正を同じ commit に含めない。
- 改修は ref/ 側で行い `pnpm exhibits:build` で public を再生成する。public の手編集は禁止。
