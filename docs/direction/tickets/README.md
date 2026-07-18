# 調整チケット索引 — プラットフォーム/抽象レイヤー(第1バッチ)

2026-07-18 起票。将来の展示追加を前提とした共有基盤の全面見直しバッチ。全13本、現物照合つき監査済み(must-fix 0件)。各チケットは [review-framework.md](../review-framework.md) のテンプレート準拠。

## 確定済み設計判断(このバッチの前提)

- **D-1 = fork運用**: ref/ の埋め込み展示原典は版管理して改修する。「原典の魔法」は受け入れ基準で担保
- **レンダラー = 真の永続化**: App レベルで1個生成・生涯保持。antialias 常時有効固定、品質差は内部解像度スケーリングで吸収
- **D-2 = コンセプト取り込みつつ全体リデザイン**: ガーニッシュは単純コピーでも全不採用でもなく、シェル表現層のリデザインとして扱う(gizmo/minimap の採否はリデザイン内で判断)

## チケット一覧

| ID | タイトル | 優先度 | 依存 |
|---|---|---|---|
| [T-QA-01](T-QA-01-behavior-based-tests.md) | 文字列ピン留めテストの挙動ベース化 | P1(SH-11から昇格) | なし |
| [T-SH-01](T-SH-01-persistent-renderer.md) | 真の永続レンダラー化 | P1 | T-QA-01(antialias行のピン留め解除) |
| [T-SH-02](T-SH-02-room-runtime-contract-v2.md) | RoomRuntime契約v2+新規展示追加ガイド | P1 | T-SH-01 |
| [T-SH-03](T-SH-03-telemetry-hud-redesign.md) | FPS計測プロトコル+シェルHUD/telemetryリデザイン | P1 | T-SH-02 |
| [T-EMB-01](T-EMB-01-ref-under-git.md) | ref/ を版管理下へ+再現可能ビルドパイプライン | P1 | なし(T-EMB-03を先行推奨) |
| [T-EMB-02](T-EMB-02-postmessage-bridge.md) | postMessage ブリッジ v1 | P2 | T-EMB-01(stats受け手はT-SH-03) |
| [T-EMB-03](T-EMB-03-iframe-permissions.md) | iframe allow 最小化のレジストリ化 | P2(小粒) | なし |
| [T-QA-02](T-QA-02-ci-hardening.md) | CI強化(lint/qa:visual/メトリクスアサート) | P2 | T-QA-01(段階2はT-SH-01後) |
| [T-SH-04](T-SH-04-per-room-stage-profile.md) | 展示別ステージプロファイル | P2 | T-SH-02(T-DS-01と相互参照) |
| [T-DS-01](T-DS-01-token-governance.md) | デザイントークン統治 | P2 | なし(T-SH-04と共有定数の調整) |
| [T-I18N-01](T-I18N-01-i18n-integrity.md) | i18nシーム完全化 | P2 | T-QA-01(セレクタdata-testid化) |
| [T-DEP-01](T-DEP-01-dependency-pinning.md) | 依存ピン戦略("latest"廃止) | P2 | なし |
| [T-SH-05](T-SH-05-url-state-serialization.md) | 設定のURLシリアライズ | P3 | T-SH-02(e)と併走可 |

## 推奨着手順

```
Wave 1(並行可): T-QA-01 / T-EMB-03 / T-DEP-01 / T-DS-01
Wave 2:         T-SH-01 → T-SH-02          T-EMB-01
Wave 3(並行可): T-SH-03 / T-SH-04 / T-QA-02(段階2) / T-I18N-01 / T-EMB-02
Wave 4:         T-SH-05(任意のタイミングで可)
```

順序の根拠(監査・執筆時の現物確認から):
- **T-QA-01 が最初**: `ShaderCanvas.test.ts:14` が T-SH-01 で削除される `antialias: room.id !== 'voxel-water'` をピン留めしており、テスト刷新なしに永続レンダラー化するとテストが割れる。また全アート調整チケットのブロッカー
- **T-EMB-03 → T-EMB-01 → T-EMB-02**: 依存ではなく編集衝突回避(T-EMB-03 と T-EMB-02 が EmbeddedExhibitFrame.tsx / types.ts / registry.ts を共有編集)
- **T-QA-02 の段階2(メトリクスバジェット較正)は T-SH-01 後**: antialias 常時有効化で描画特性が変わり再較正になるため
- **water-qa.mjs:5 の baseUrl 1行修正だけは即日可**(既存ピン留めに接触しない)

## 執筆時の重要発見(チケット本文に反映済み)

- `renderer.info.reset()` は glass だけでなく **voxel-water(runtime.ts:635)も呼んでいる**(T-SH-02 証拠)
- water-qa.mjs の `'Rain'` セレクタ(:325)は i18n カタログ値由来で、**zh-CN ロケールでは現時点で既に壊れている**(T-QA-01)
- `shader-quality.test.ts` は water-qa.mjs 自体も ?raw ピン留めしている(:5)— QA スクリプト改修も T-QA-01 が前提
- archive.mp3 の「リポジトリ重量倍増」(カルテ NT-2)は不正確: バイト一致のため git blob は単一。真の問題は working tree の二重実体と手動同期ドリフト(T-EMB-01 で整理)
- ref/mizu-kokoro-2-source/dist はルート .gitignore の非アンカー `dist` パターンで自動除外される(T-EMB-01 に明文化)
- accent `#ff56d8`(orb)は APCA Lc≈|49| で他アクセント(|72|-|82|)より突出して低い(T-DS-01 の選定ルール策定時の判断ポイント)
- D-3(source map 同梱)は T-EMB-01 内タスク化。推奨は「維持」(fork 運用でソース公開のため除去に秘匿効果なし)

## 未起票(次バッチ以降)

- 各展示のビジュアル/AD 調整チケット(VW-*/GO-*/AO-*/NT-* — framework のロングリスト参照)。本バッチの Wave 2 完了後が着手適期(単一ソース化・挙動ベーステストが土台になるため)
- MIZU//KOKORO exhibit 内 HUD の FPS「—」表示修理(ref/ fork 側 — T-SH-03 のスコープ外として委譲された)
