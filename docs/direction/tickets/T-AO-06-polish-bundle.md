# [T-AO-06] 磨き統合 — VOIDディザ / SURGE値分離検証 / アイドル音エチケット / デッドuniform掃除

- 分類: AD / TA
- 優先度: P3
- 評価軸: 値構造(VOID/SURGE) / デッドコード・デッド出力 / ストーリーテリング(アイドル自動展示)
- 依存: なし(d は T-AO-03 のプロファイルと重複作業を避けるため、着手時に T-AO-03 の状況を確認)

小粒な磨き4件の統合票。行番号はすべて現行 `ref/mizu-kokoro-2-source/src/main.js`(2,714行)。

## 問題

個別には小さいが、いずれも展示の「完成品」としての格を削る項目群: VOID のバンディングは Ikeda 的ミニマリズムの命である滑らかな無彩グラデを毀損し(a)、SURGE の値分離不足はリファレンス批評で最弱と指摘された状態の放置であり(b)、アイドル自動展示の無断ピング音はキオスク設置時の信頼問題になり(c)、デッド uniform は今後の ref/ fork 開発の可読性を落とす(d)。放置すると「気づく人が気づく」形で品質評価を下げる。

---

## a. VOID ポスタライズバンディングのディザ導入(TA/AD)

### 現状(証拠)

- VOID モードは posterize 0.72(main.js:145)+ chroma 1.08 + ほぼ無彩色パレット(mid `#9eabb5` / light `#ffffff`)。
- FinalGradeShader の量子化: `levels = mix(256.0, 10.0, uPosterize); quantized = floor(color * levels + 0.5) / levels;`(main.js:1725-1727)— ≒10階調へのハード量子化でディザなし。
- 既存 film grain(main.js:1732-1733)は白色ノイズで量子化と無関係な位置に加算されており、バンディング対策として機能しない(research-npr-liquid.md §2.6)。
- 全モード共通でも背景 `#03060d` 近傍の暗部グラデ(ハロー・ビネット)は 8bit 量子化バンディングの常連。

### 改善方向(research-npr-liquid.md §2.6)

1. **ポスタライズの内側に IGN(Interleaved Gradient Noise)を注入**: `floor(color * levels + ign)/levels`(中心化、振幅は 1/levels の1ステップ)。バンド境界が点描スクリーントーン状に割れ、VOID の「印刷物/Ryoji Ikeda」文法とむしろ整合する。
2. **出力直前に全モード共通の 1/255 IGN ディザ**を追加(暗部バンディング対策。grain とは役割分担: grain=質感、ディザ=量子化対策)。
3. IGN はテクスチャ不要(式は §2.6 に記載)。時間回転させる場合は golden-ratio オフセット。

### 受け入れ基準

- VOID 静止画でオーブ・背景のバンド境界が段差でなく点描に分解している(拡大比較 before/after)。
- 他3相の見た目が実質無変化(ディザ振幅 1/255 は通常鑑賞距離で不可視)。
- ズーム系スクリーンショット QA(qa:visual)の既存 gate が通る。

---

## b. SURGE の値分離 — まず実機確認(AD)

### 現状(証拠)

- コードの SURGE パレット: deep `#1b0923` / mid `#ec3b9b`(マゼンタピンク)/ light `#fff7df` / accent `#ffb72f`(main.js:121-130)。
- 一方、原典リファレンス批評(visual-refs.json)は SURGE のオーブを「muted lavender-gray」と記述し、4パレット中で最も濁り値分離が弱い(Wow 7)と評価。**コードと批評の色記述が食い違っている**(README「要確認事項」に登録済み)。暗いシーンキー+ACES トーンマッピングの結果か、批評時点とのパレット差異かは未特定。

### 改善方向

**検証が先、調整は後**:

1. 実機で SURGE を showroom 内/スタンドアロン双方でキャプチャし、スポイトで実効色を計測。`#ec3b9b` がトーンマップ後にどこへ落ちるかを記録し、「lavender-gray」評の原因(トーンマッピング / bloom / 屈折ティントの合成)を特定して本票に追記する。
2. 原因特定後に必要なら: deep/mid の値差拡大、リム強化(rim 1.17 の再調整)、または mid の彩度/明度調整。**調整する場合は modes 配列(単一情報源)経由**で行い、シェーダ定数へ直書きしない。
3. 調整の判断基準は「グレースケールで4相が判別できる」(ART_DIRECTION のモーション判別要件の静止画版)+ サムネイルテスト。

### 受け入れ基準

- 齟齬の原因が特定され、実測値(キャプチャ+計測色)つきで本票または dossier に記録されている。
- 調整を行った場合: SURGE のグレースケール変換でオーブ/背景/dais が分離し、他3相との判別が保たれる。4相すべて再検収。
- 調整を行わない判断をした場合もその根拠を記録(「トーンマップ後の見えが意図通り」等)。

---

## c. アイドル自動展示の音エチケット(AD/TA)— 未調査項目の調査タスク込み

### 現状(証拠)

- `autoExhibitionMode()`(main.js:2599-2616): アイドル 15s で autoRotate + 徘徊タッチ、30s 以降は 17s ごとに `setMode((activeMode + 1) % modes.length, false)`(main.js:2612)。サイクル維持のため `lastInteraction = now - 20000` に巻き戻す小細工あり(main.js:2614)。
- `setMode()` は `announce = false` でもトーストを抑制するだけで、`soundField.ping(0.72, next === 3)` は無条件に発火する(main.js:1966)。
- 結果: **音声有効のまま放置された kiosk が 17s ごとに ping を鳴らし続ける**(dossier リスク10)。
- README の未調査項目: 「kiosk/インスタレーションの音のエチケット(アイドル・アトラクト ping 抑制の業界慣行)は意識的にスコープ外」— **チケット化時は調査タスクを含める規約**に従い、本票に調査を含める。

### 改善方向

1. **調査タスク(先行)**: kiosk / メディアインスタレーション運用でのアトラクトループ音の慣行(無音アトラクト、減衰、営業時間制御、再インタラクションでの復帰など)を1〜2時間で調査し、要点(出典つき)を research-audio-reactive.md または本票へ追記。teamLab / 美術館 AV 運用ガイド / デジタルサイネージ規格(例: 無人時の音出し制限)あたりを起点に。
2. **実装(調査結果で微修正)**: 最小案は `setMode` に音抑制フラグを追加し、自動サイクル起点の呼び出し(main.js:2612)では ping を鳴らさない。加えてアイドル中(attract 状態)は soundField の master gain を減衰し、ユーザーインタラクションで復帰させる案を検討。
3. ブリッジの `set-orb-mode`(shell からのモード指定)経由でも ping が鳴る現状が適切かを同時に判断する(shell 操作は「ユーザーの意図的操作」なので鳴らす、が現時点の仮説)。

### 受け入れ基準

- 調査要約(出典つき)が資料に追記されている。
- 音声 ON のままアイドル放置しても周期的な ping が発生しない(30s+17s×2 周期以上の無操作で確認)。
- ユーザー操作(モードボタン / キー 1-4 / ブリッジコマンド)での ping・フィードバックは従来どおり。
- 自動展示サイクル自体(視覚)は無変化。

---

## d. デッド uniform / デッド代入の掃除(TA)

### 現状(証拠)

- liquid フラグメントの `uniform vec2 uResolution;`(main.js:550)と `uniform float uAudio;`(main.js:554)は**宣言のみで本文未使用**(uAudio は頂点側変位 main.js:441 では使用、フラグメントでは不使用。uResolution は FinalGradeShader 側 main.js:1728/1732 では使用)。
- `keyLight` は intensity 52 で生成(main.js:222)されるが、`animate()` が毎フレーム base 48 で上書き(main.js:2675)— 初期値がデッド。
- FinalGradeShader の `uChroma` 初期値 0.002(main.js:1689)は即座に damp 値(0.00075 スケール、main.js:2490-2492)に置換されるデッド初期値。
- `liquidMaterial.extensions.derivatives = true`(main.js:931)/ `crystalMaterial.extensions.derivatives = true`(main.js:974)は three 0.184 で非推奨 API(無害だが将来アップグレード時のノイズ)。
- 注: カルテ記載の「fpsLastUpdate デッドコード」は T-EMB-02 の stats 実装で既に消滅している(現行に存在しない)。

### 改善方向

- liquid フラグメントの `uResolution` / `uAudio` **宣言のみ**削除(sharedUniforms 本体は他所で使用中なので触らない)。
- keyLight 生成 intensity を base 48 に揃える(または生成時コメントで「animate が上書き」と明示)。uChroma 初期値も同様に実効値へ。
- `extensions.derivatives` 2箇所を現行 API へ置換(WebGL2 では標準機能のため単純削除で足りるかを three 0.184 のマイグレーションノートで確認)。

### 受け入れ基準

- 全モード × freeze × sculpt でスクリーンショット無回帰(掃除は挙動不変が定義)。
- コンソール警告(derivatives 非推奨系)が出ない。`pnpm build` / `qa:exhibits` / `qa:visual` が通る。

---

## 影響範囲・注意(4件共通)

- **改修は必ず `ref/mizu-kokoro-2-source/` 側で行い、`pnpm exhibits:build` で `public/exhibits/` を再生成する。public 配下の手編集は禁止(`pnpm exhibits:check` と CI が同期を強制)**。
- a と d はシェーダ/レンダリング変更のため、検収は 4相 × freeze の全状態スクリーンショット比較(横断注意3の精神)。a のディザは意図的な視覚変化なので before/after を票に添付して「変化が意図どおりか」で判定する。
- c は音の挙動変更 — qa:exhibits の SoundField intent アサート(T-EMB-02 で `intent=true` を検証)と衝突しないか確認し、必要ならテストシナリオを更新する。
- b で modes 配列を調整する場合、updateColors が lerp する約20色の連動先(floor/halo/beam/particles/droplet 等)すべてに波及する — SURGE の1色変更でもステージ全体を再検収する。
- ブリッジ契約(envelope / capabilities / stats)には一切触れない。
