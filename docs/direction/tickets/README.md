# 調整チケット索引

- **第1バッチ(プラットフォーム/抽象レイヤー、13本)**: 2026-07-18 起票 → **PR #1〜#13 で全て実装完了**
- **第2バッチ(各展示のビジュアル/AD調整、36本)**: 2026-07-19 起票・独立レビュー済み。下記の厳密順序で実施

各チケットは [review-framework.md](../review-framework.md) のテンプレート準拠。

## 追加チケット

- **QA**: [T-QA-03](T-QA-03-exhibit-smoke-observability.md) — `qa:exhibits` の長時間・無出力実行を段階化し、Ninth Tide `#audio` timeout のような波動を retry や閾値緩和なしで診断可能にする（2026-07-22、T-VW-04 検収中に起票）

---

# 第2バッチ — 各展示のビジュアル/AD調整(36本)

2026-07-19 起票。第1バッチ実装後の**現行ソースで行番号・事実を全数照合済み**(カルテとの食い違いは各チケットに明記)。初稿29本を独立レビューし、複数結果を束ねていた AO / NT cleanup を単一成果へ分割、曖昧な fallback と後追い再調整を除去して36本へ確定した。

## 起票時に判明した重要な事実更新(カルテから変化)

- **Voxel Water**: pixel-ratio キャップは 0.55 に変更・antialias 常時有効(T-SH-01)、FPS ベースラインは 15。shader-quality.test.ts は renderOrder 順序と transparent:true を「契約」としてピン留め — T-VW-09(柱不透明化)は契約テストの書き換えが必須
- **Glass Optics**: FPS崩落(17→2-4)は**無操作でも発生**するため、T-GO-01 は renderer profile / transmission コストだけを所有する。Tube churn は同じ光路データ構造を置換する T-GO-04 に統合。旧フェイク仕様(refractedB.y≈0.04)は同票で全面置換する
- **Anime Liquid Orb**: ブリッジ v1 は pause/stats/set-mode/set-quality 対応済み、exhibit 内 HUD の FPS「—」も修理済み — T-AO-04 は残作業(pause 中の stale 表示、QA assert、証拠更新)に限定
- **Ninth Tide**: ブリッジの set-tide-preview による9章DOMアサートは実装済み。T-NT-05 は opening + 9章 + ending の11状態を実装変更前の決定論キャプチャ門にし、既定章、品質、静默終幕、hit target、音声ロードは独立票で検収する

## チケット一覧(第2バッチ)

- **Voxel Water(10本)**: [T-VW-01](T-VW-01-focal-landmark.md) / [T-VW-02](T-VW-02-weather-thumbnail-identity.md) / [T-VW-03](T-VW-03-vertical-seam-artifact.md) / [T-VW-04](T-VW-04-value-structure-redesign.md) / [T-VW-05](T-VW-05-wave-single-source-sun-uniform.md) / [T-VW-06](T-VW-06-weather-crossfade.md) / [T-VW-07](T-VW-07-lightning-as-lighting.md) / [T-VW-08](T-VW-08-particle-redesign.md) / [T-VW-09](T-VW-09-transparency-pass-water-sheet.md) / [T-VW-10](T-VW-10-dead-code-cleanup.md)
- **Glass Optics(7本)**: [T-GO-01](T-GO-01-transmission-performance.md) / [T-GO-02](T-GO-02-stage-redesign.md) / [T-GO-03](T-GO-03-caustics-payoff.md) / [T-GO-04](T-GO-04-physical-light-path.md) / [T-GO-05](T-GO-05-dispersion.md) / [T-GO-06](T-GO-06-reference-panel-shell.md) / [T-GO-07](T-GO-07-cleanup.md)
- **Anime Liquid Orb(8本)**: [T-AO-01](T-AO-01-mobile-hud-responsive.md) / [T-AO-02](T-AO-02-double-tap-freeze.md) / [T-AO-03](T-AO-03-sculpt-fps-profile.md) / [T-AO-04](T-AO-04-hud-fps-and-stats.md) / [T-AO-05](T-AO-05-volume-shell-freeze-time.md) / [T-AO-06](T-AO-06-void-dither.md) / [T-AO-07](T-AO-07-surge-value-separation.md) / [T-AO-08](T-AO-08-final-dead-code-cleanup.md)
- **Ninth Tide(11本)**: [T-NT-01](T-NT-01-multi-pulse-history.md) / [T-NT-02](T-NT-02-dark-banding-dither.md) / [T-NT-03](T-NT-03-spectral-flux-onset.md) / [T-NT-04](T-NT-04-near-black-ux.md) / [T-NT-05](T-NT-05-chapter-capture-qa.md) / [T-NT-06](T-NT-06-dead-code-cleanup.md) / [T-NT-07](T-NT-07-responsive-quality-and-frame-cost.md) / [T-NT-08](T-NT-08-silent-cycle-ending.md) / [T-NT-09](T-NT-09-core-hit-target.md) / [T-NT-10](T-NT-10-audio-demand-loading.md) / [T-NT-11](T-NT-11-preview-default-chapter.md)

## 厳密な実施順序

各票を個別に実装・検証・レビュー・報告・PR merge してから次へ進む。括弧内の票も並列実装せず、記載順に処理する。

```text
Stage 1  証拠門と公開阻害
VW-03 → GO-01 → NT-05 → AO-01 → AO-03 → NT-11 → AO-02 → AO-05 → AO-04 → NT-10

Stage 2  構造基盤
VW-05 → VW-09 → GO-04 → NT-03 → NT-01 → NT-02 → NT-04 → NT-07 → NT-08 → NT-09

Stage 3  視覚成果
VW-04 → VW-01 → VW-08 → VW-02 → VW-06 → VW-07 → GO-02 → GO-03 → GO-05 → GO-06 → AO-06 → AO-07

Stage 4  最終 cleanup
AO-08 → GO-07 → NT-06 → VW-10
```

順序を変更する場合は、先行票の受け入れ証拠が不要であることをチケット本文へ先に反映し、同じPRで独立レビューする。実装中の都合で暫定経路・後追い再調整・旧方式 fallback は追加しない。

## 埋め込み展示の共通規約(AO/NT 全チケット)

改修は **ref/ 側で行い `pnpm exhibits:build` で public/exhibits に再生成**する。public/ の手編集は禁止(`pnpm exhibits:check` が同期を強制)。

---

# 第1バッチ — プラットフォーム/抽象レイヤー(13本、実装完了)

2026-07-18 起票、PR #1〜#13 で全て実装済み。将来の展示追加を前提とした共有基盤の全面見直しバッチ。現物照合つき監査済み(must-fix 0件)。

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
| [T-SH-05](T-SH-05-url-state-serialization.md) | 設定のURLシリアライズ | P3 | T-SH-02(完了済み) |

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
