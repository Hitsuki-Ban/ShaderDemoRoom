# 調整チケット索引

- **第1バッチ(プラットフォーム/抽象レイヤー、13本)**: 2026-07-18 起票 → **PR #1〜#13 で全て実装完了**
- **第2バッチ(各展示のビジュアル/AD調整、29本)**: 2026-07-19 起票。下記参照

各チケットは [review-framework.md](../review-framework.md) のテンプレート準拠。

---

# 第2バッチ — 各展示のビジュアル/AD調整(29本)

2026-07-19 起票。第1バッチ実装後の**現行ソースで行番号・事実を全数照合済み**(カルテとの食い違いは各チケットに明記)。

## 起票時に判明した重要な事実更新(カルテから変化)

- **Voxel Water**: pixel-ratio キャップは 0.55 に変更・antialias 常時有効(T-SH-01)、FPS ベースラインは 15。shader-quality.test.ts は renderOrder 順序と transparent:true を「契約」としてピン留め — T-VW-09(柱不透明化)は契約テストの書き換えが必須
- **Glass Optics**: FPS崩落(17→2-4)は**無操作でも発生**するため Tube 再生成は原因ではない — T-GO-01 は「per-frame コスト(transmission 第一容疑)」と「操作時 GC チャーン」の二本立て。旧フェイク仕様(refractedB.y≈0.04)が挙動テストで固定されており T-GO-04 で書き換え必須
- **Anime Liquid Orb**: ブリッジ v1 は pause/stats/set-mode/set-quality 対応済み、exhibit 内 HUD の FPS「—」も修理済み — T-AO-04 は残作業(pause 中の stale 表示、QA assert、証拠更新)に限定
- **Ninth Tide**: ブリッジの set-tide-preview による9章QAは DOM アサート済み — T-NT-05 は「ピクセル証拠の常設化・QAログ新設・既定章是正」に限定。darkroom(stageProfile 'dim')はシェル側完了、T-NT-04 は exhibit 内キューの残作業のみ

## チケット一覧(第2バッチ)

| クラスタ | チケット | 推奨着手順 |
|---|---|---|
| Voxel Water(10本) | [T-VW-01](T-VW-01-focal-landmark.md) 焦点ランドマークP1 / [T-VW-02](T-VW-02-weather-thumbnail-identity.md) 天候判別性P1 / [T-VW-03](T-VW-03-vertical-seam-artifact.md) 縦シームP1 / [T-VW-04](T-VW-04-value-structure-redesign.md) 値構造P2 / [T-VW-05](T-VW-05-wave-single-source-sun-uniform.md) 波単一ソース化P2 / [T-VW-06](T-VW-06-weather-crossfade.md) クロスフェードP2 / [T-VW-07](T-VW-07-lightning-as-lighting.md) 稲妻照明化P2 / [T-VW-08](T-VW-08-particle-redesign.md) パーティクルP2 / [T-VW-09](T-VW-09-transparency-pass-water-sheet.md) 水シート合成P2 / [T-VW-10](T-VW-10-cleanup-consolidation.md) 掃除P3 | T-VW-03 → 05(+09同時)→ 04/06/07、08は独立先行可、10は最後 |
| Glass Optics(7本) | [T-GO-01](T-GO-01-fps-collapse-tube-churn.md) FPS崩落P1 / [T-GO-02](T-GO-02-stage-redesign.md) ステージングP1 / [T-GO-03](T-GO-03-caustics-payoff.md) コースティクスP1 / [T-GO-04](T-GO-04-physical-light-path.md) 光路物理化P2 / [T-GO-05](T-GO-05-dispersion.md) 分散P2 / [T-GO-06](T-GO-06-reference-panel-shell.md) パネル/シェルP2 / [T-GO-07](T-GO-07-cleanup.md) 掃除P3 | 02/03 独立着手可、01⇄04 はビーム実装共有、05段階2は04後、06は02後、07は最後 |
| Anime Liquid Orb(6本) | [T-AO-01](T-AO-01-mobile-hud-responsive.md) モバイルHUD P1 / [T-AO-02](T-AO-02-double-tap-freeze.md) double-tap P2 / [T-AO-03](T-AO-03-sculpt-fps-profile.md) FPSプロファイルP2 / [T-AO-04](T-AO-04-hud-fps-and-stats.md) HUD/stats残作業P2 / [T-AO-05](T-AO-05-volume-shell-freeze-time.md) freeze時間P2 / [T-AO-06](T-AO-06-polish-bundle.md) 磨きP3 | 01/02/05 は独立着手可、03はプロファイル実測が前提 |
| Ninth Tide(6本) | [T-NT-01](T-NT-01-multi-pulse-history.md) 多重パルスP2 / [T-NT-02](T-NT-02-dark-banding-dither.md) 暗部ディザP2 / [T-NT-03](T-NT-03-spectral-flux-onset.md) オンセット検出P2 / [T-NT-04](T-NT-04-near-black-ux.md) near-black UX P2 / [T-NT-05](T-NT-05-chapter-capture-qa.md) 章キャプチャQA P2 / [T-NT-06](T-NT-06-runtime-cleanup.md) 掃除P3 | 05を検収基盤として先行推奨、03→01(共有編集)、06は最後 |

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

## 未起票(次バッチ以降)

- 各展示のビジュアル/AD 調整チケット(VW-*/GO-*/AO-*/NT-* — framework のロングリスト参照)。本バッチの Wave 2 完了後が着手適期(単一ソース化・挙動ベーステストが土台になるため)
- MIZU//KOKORO exhibit 内 HUD の FPS「—」表示修理(ref/ fork 側 — T-SH-03 のスコープ外として委譲された)
