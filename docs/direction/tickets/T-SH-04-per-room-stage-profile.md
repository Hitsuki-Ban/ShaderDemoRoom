# [T-SH-04] 展示別ステージプロファイルを導入する（Ninth Tide darkroom chrome）

- 分類: AD / Platform
- 優先度: P2
- 評価軸: 値構造（明るい展示と暗黒展示の共存）/ パレット規律 / QA 担保
- 依存: T-DS-01（完了済み）、T-SH-02（完了済み）、T-QA-02 Stage 1（完了済み）

## 現状（2026-07-18 再調査）

- `RoomDefinition` / registry は room accent を宣言するが、shell chrome の明度プロファイルを持たない。`.showroom-shell`、topbar、room rail、inspector、telemetry は全4室で同じ glow / surface を使う。
- Ninth Tide Archive はほぼ黒に近い同一 origin iframe 展示である。現状では shell の rail / inspector / telemetry が展示より明るく、暗室展示の低輝度階調と視線の主従を崩している。
- T-DS-01 は旧 `0x070b10` / `#06090e` / `#02070d` の near-black drift を既に解消した。renderer clear color、canvas shell、embedded shell、iframe background は必須 `--bg` token を単一情報源とし、テストも存在する。per-room `canvasBackground` の再導入はこの契約に逆行する。
- T-SH-02 は `toneMapping`、`toneMappingExposure`、`transmissionResolutionScale`、`outputColorSpace`、clear color/alpha、autoClear を runtime session 前後と失敗時に snapshot / restore する。room runtime は raw renderer global を所有しない。
- ただし Ninth Tide は iframe 内の独立 renderer であり、親 shell の persistent renderer に tone mapping / exposure を適用しても展示ピクセルは変化しない。Glass の tone mapper 変更は `toneMapped=false` の FX との相対輝度を変える別の色彩設計課題で、本票には含めない。

## 問題

オンライン展示の「部屋ごとの照明」に相当する shell 表現が registry に存在しないため、明るいネイティブ展示と暗黒 iframe 展示が同じ chrome 明度で囲われる。Ninth Tide では作品より UI surfaces が先に目へ入り、展示固有の暗順応と奥行きを損なう。一方、背景 token や renderer 色変換まで room 別に分岐させると、既に確立した token / renderer ownership 契約を壊す。

## 確定スコープ

### 1. 必須の shell chrome profile

- `BaseRoomDefinition` に required `stageProfile: { shellChrome: 'default' | 'dim' }` を追加する。optional field、既定 fallback、別名は設けない。
- Voxel Water / Glass Optics / MIZU//KOKORO は `default`、Ninth Tide Archive だけを `dim` と registry で明示する。
- `ShowroomPage` は root `.showroom-shell` の安定した data attribute に値を出す。profile は `ShaderCanvas`、iframe、room runtime へ渡さない。

### 2. Outer-shell だけの darkroom treatment

- dim profile は shell background glow、topbar、room rail、inspector、telemetry、control card / room-link surface と border の局所 custom properties だけを暗化する。
- `--text`、`--muted`、`--microcopy`、`--focus`、room accent は維持する。親要素への `opacity` / `filter: brightness()` は文字・アイコン・focus ring まで暗くするため禁止する。
- `.stage-viewport`、`.canvas-shell`、`.embedded-shell`、iframe、renderer / scene、`ref/` / `public/exhibits` は変更しない。display color space、tone mapping / exposure、clear color も変更しない。
- 首版は transition を持たず即時切替とする。未検証の演出と reduced-motion 分岐を増やさず、visual QA の時系列を決定論的に保つ。

### 3. 同一 DOM の paired visual gate

- production `qa:visual` は desktop 4室すべてで data attribute が registry 決定と一致することを hard assert する。
- Ninth Tide の同一ページ・同一 DOM 内容で `dim` と QA 用に一時適用した `default` を切替え、topbar / room rail / inspector を region 単位で成対 screenshot する。iframe viewport は測定に含めない。
- 各 region の実ピクセル平均 luma を同じ browser / viewport / font / active room で比較し、`dim / default <= 0.70`（30%以上低下）を個別 hard gate とする。加重総平均だけで一方の未達を隠さない。
- paired PNG、raw mean、ratio を既存 `output/playwright` artifact と JSON stdout に残す。比較後は必ず製品状態 `dim` に戻す。

## 受け入れ基準

- **宣言契約**: 四室すべてが required profile を持ち、前三室=`default` / Ninth=`dim`。未知・欠落値は型または QA で即失敗する。
- **暗室効果**: 1440×900 Ninth Tide で topbar / room rail / inspector の paired luma ratio がそれぞれ 0.70 以下。active room と keyboard focus は色以外の border / outline / text でも識別できる。
- **可読性**: 普通文字は背景に対して WCAG 2.2 AA 4.5:1 以上、必要な focus / control indicator は隣接色に対して 3:1 以上。既存 token lint を通過し、foreground tokens を暗化しない。
- **展示非変更**: Ninth iframe viewport の内容・サイズ・制御と、shared renderer state / output は変更なし。前三室の profile と既存 visual capture に回帰なし。
- **回帰**: `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` / exhibit sync / production `pnpm qa:visual` が通過し、console error、mobile overflow、HUD overlap は0。

## 明示的な後続課題

- Glass Optics の AgX / ACES / Neutral 比較は主ガラスと `toneMapped=false` FX の色彩・輝度バランスを再校正する独立 visual ticket とする。renderer profile が必要になった時点で、shader room 限定の capture → validate/apply → create → finally restore seam を設計する。
- darkroom への 0.3〜0.5秒照明 transition は、製品価値と reduced-motion / deterministic QA を別途定義してから扱う。
- T-QA-02 Stage 2 の pixel baseline / water metric budget とは分離し、本票は同一 DOM の相対 chrome luma だけを gate する。

## 参照

- [Three.js WebGLRenderer tone mapping / exposure](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js color management](https://threejs.org/manual/en/color-management.html)
- [WCAG 2.2 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [WCAG 2.2 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)

## 完了レポート（2026-07-18）

### 判断と境界

- T-DS-01 / T-SH-02 の実装を再調査し、旧票の near-black 統一、per-room canvas background、renderer restore は既に完了または本件に不適切と判断した。Ninth は独立 iframe のため、親 renderer の tone mapping は効果がなく、Glass の色調映射も別の視覚校正票へ分離した。
- `design-principles` に従い、作品を最亮焦点に戻す一方で foreground hierarchy は維持する方針を採用した。foreground 全体を `opacity` / `filter` で暗くせず、surface / glow / border の局所 role だけを切替える。
- profile は `default | dim` の required field とし、全 room を明示宣言した。runtime fallback、別名、互換 shim は追加していない。

### 実装

- `RoomStageProfile` と required `stageProfile.shellChrome` を追加。Voxel / Glass / MIZU は `default`、Ninth は `dim`。Showroom root の `data-shell-chrome` から CSS custom properties を切替える。
- default の既存 surface 値と interaction transition は保持した。dim は shell glow、topbar、rail、inspector、telemetry、room/control/input/button surface のみを near-black へ落とし、text / muted / microcopy / focus / accent、stage / canvas / iframe / renderer は変更しない。
- `qa:visual` は desktop 4室の profile mapping を検査し、Ninth の同一 DOM で default/dim を切替えて topbar / rail / inspector の paired PNG を保存する。各 region は full-precision mean luma と ratio を JSON artifact に残し、ratio > 0.70 を hard fail、finally で必ず製品状態 `dim` に戻す。

### 検証

- production 1440×900 paired luma: topbar `8.608 / 19.036 = 0.4522`、room rail `14.720 / 23.757 = 0.6196`、inspector `9.643 / 19.260 = 0.5007`。3 region とも30%低下 gate を通過した。
- production `qa:visual`: full showroom 7枚 + paired region 6枚、console error 0、mobile horizontal overflow 0、HUD / viewport overlap 0。desktop/mobile を目視し、Ninth の作品が shell より優先され、active outline・文字・controls が読めることを確認した。
- `pnpm lint` / token lint、`pnpm typecheck`、20 files / 77 tests、`pnpm build`、exhibit snapshot sync、`git diff --check`: pass。Windows build の既知 EOL-only 生成差分2件は復元後に sync を再確認した。
- 独立审查は required contract、default 無回帰、outer-shell scope、paired gate / finally restore、mobile / foreground 可読性を確認し APPROVE（P0-P2 なし）。
