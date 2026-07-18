# [T-DS-01] デザイントークン統治を確立する(room accent 取り込み・ニアブラック統一・コントラスト検証)

- 分類: AD / Platform
- 優先度: P2
- 評価軸: AD「パレット規律」(トークン/レジストリ/シェーダー定数が一つの体系か — review-framework.md 評価軸表の不合格例「#79ead9 vs --teal #5af2d1 のドリフト」がそのまま本件)
- 依存: なし(相互参照: T-SH-04 — ニアブラック統一のレンダラー側実装と同一箇所を触るため実装順を調整すること)
- 状態: **完了 (2026-07-18)**

## 現状(証拠)

**1. room accent のトークン外定義**

- `src/styles/tokens.css:3-18` — カラートークンは `--bg #06090e` / `--subtle #647883`(12行目)/ `--cyan #34d5ff`(13行目)/ `--teal #5af2d1`(14行目)/ `--amber #ffbd5a`(15行目)など。マゼンタ系・ミント系のトークンは存在しない。
- `src/rooms/registry.ts` — 各 room の `accent` が生 hex で直書き:
  - 41行目 `accent: '#34d5ff'`(voxel-water、`--cyan` と同値)
  - 56行目 `accent: '#ffbd5a'`(glass-optics、`--amber` と同値)
  - 71行目 `accent: '#ff56d8'`(anime-liquid-orb、**トークンパレット外**)
  - 86行目 `accent: '#79ead9'`(ninth-tide-archive、**`--teal #5af2d1` の近似重複・非同値**。RGB 距離 ≈ 33)
- `src/app/RoomRail.tsx:36` — `style={{ '--room-accent': room.accent }}` で CSS 変数としてインライン注入。`src/styles/app.css:202-203` が `color-mix(in srgb, var(--room-accent), ...)` で消費。つまり **accent の消費側は既に CSS 変数経由**であり、`var(--accent-*)` 参照に置き換え可能な構造。
- 参照: dossier-shell.md「Room アクセント(registry.ts のみに存在 — tokens.css 外)」節、コードリーディングリスク 7。

**2. ニアブラック 3 種の並存**

- `src/shared/three/ShaderCanvas.tsx:51` — `renderer.setClearColor(0x070b10, 1)`
- `src/styles/app.css:238-240` — `.canvas-shell` 背景の最終フォールバック `#06090e`(= tokens.css:3 の `--bg` と同値だが**生 hex 直書き**)
- `src/styles/app.css:250` / `258` — `.embedded-shell` と `.embedded-exhibit-frame` の背景 `#02070d`
- 3 値が微妙に異なるため、ロード時・room 切替時に DOM 背景と初回フレームの継ぎ目/フラッシュの原因になり得る。参照: dossier-shell.md「ニアブラックの三重奏」、リスク 8、review-framework.md SH-10。

**3. `--subtle` 11px テキストのコントラスト**

- 使用箇所は 2 つ(grep 確認: `--subtle` の参照は app.css の 2 箇所のみ):
  - `src/styles/app.css:189-194` — `.room-link small`(11px)
  - `src/styles/app.css:208-215` — `.rail-note`(11px)
- 起票時概算(APCA 0.0.98G-4g 式・WCAG 2.x 相対輝度式による自前計算。**採用前に https://apcacontrast.com/ で実測確認すること**):
  - `#647883` on `--bg #06090e`: WCAG **4.33:1**、APCA **Lc ≈ |29.5|**
  - `#647883` on `--bg-elevated #0b1118`: WCAG 4.11:1、APCA Lc ≈ |29.2|
  - `#647883` on `--surface`(`--bg` 合成後 ≈ #0c131b): WCAG 4.05:1、APCA Lc ≈ |29.0|
  - research-webgl-platform.md §2.4 の目標値(12-14px マイクロコピーで Lc 75-90)に対し**大幅未達**。WCAG 2.x でも通常サイズ AA(4.5:1)を面によっては下回る。
- 参考: 現行 4 accent の on `--bg` APCA は `#34d5ff` Lc ≈ |72| / `#ffbd5a` ≈ |74| / `#79ead9` ≈ |82| / `#ff56d8` ≈ **|49|**(マゼンタのみ突出して低い)。
- 参照: dossier-shell.md リスク 9、research-webgl-platform.md §2.4。

## 問題

- トークン・レジストリ・CSS 直書きの 3 箇所にパレットが分散し、single source of truth がない。将来展示を追加するたびにドリフトが再生産される(D-2 のシェル表現層リデザインは、この土台が整っていないと色決定のたびに場当たりになる)。
- `#79ead9` と `--teal #5af2d1` の近似重複は「意図的な差別化」か「事故」かが判別不能で、調整時にどちらを触るべきか判断できない。
- ニアブラック 3 種は room 切替時の背景シーム/フラッシュという実害の候補であり、`--subtle` 11px は最弱テキストが読めないというアクセシビリティ実害。

## 改善方向

research-webgl-platform.md §2.4(2 層トークンモデル・ビルド時コントラスト検証・APCA 目標値)および §3-11(トークン統治の適用推奨)に従う。

1. **primitive + semantic の 2 層化**: tokens.css に primitive として `--accent-cyan` / `--accent-amber` / `--accent-magenta`(#ff56d8 昇格)/ `--accent-mint` を登録。`#79ead9` は (a) `--teal` へ統一するか (b) `--accent-mint` として正式登録し差別化理由を tokens.css コメントに明文化するか、どちらかに決める(近似重複の放置だけは不可)。透明度バリアントは既存の `color-mix()` 流儀を維持(research §2.4 が現行実装のこの部分を「主流に合致」と評価済み)。
2. **registry の参照替え**: `registry.ts` の `accent` を `'var(--accent-magenta)'` 等のトークン参照へ変更(RoomRail.tsx:36 の CSS 変数注入経路ではそのまま解決される)。JS 側で hex 実値が必要になった場合は tokens を単一ソースとする定数モジュール(例 `src/styles/palette.ts` に hex を持ち、tokens.css と unit test で一致検証)を導入。
3. **将来展示のアクセント選定ルールを docs に明文化**(D-2 リデザインの色決定にもそのまま使う)。出発点の提案値:
   - 既存全 accent とのRGB 距離下限(例: ≥ 60。現行の `#79ead9` vs `#5af2d1` = 33 は「重複」と判定される値に設定)+ 色相の分離を目視確認
   - APCA コントラスト下限: on `--bg` で非テキスト用途 |Lc| ≥ 45、テキストとして使う場合 |Lc| ≥ 75(現行 `#ff56d8` は |49| でテキスト不可・非テキスト可の判定になる — ルール側をこの実態に合わせるか色を調整するかを決める)
   - 選定手順(候補色 → 距離/APCA 検証 → tokens.css 登録 → registry 参照)をチェックリスト化
4. **ニアブラック統一**: `0x070b10` / `#06090e` / `#02070d` を単一トークン(`--bg` へ集約、または `--bg-deep` を新設して canvas 系のみ分離)に統合。renderer クリアカラーはトークンと同値の共有定数から読む(T-SH-04 のレンダラーホイストと同一ファイル `ShaderCanvas.tsx` を触るため、実装順を T-SH-04 と調整し、どちらが先でも同じ定数モジュールを参照する形にする)。
5. **`--subtle` の是正**: APCA 実測の上、Lc ≥ 75 を満たす明度へ引き上げ(概算では `--muted #91a6b2` でも Lc ≈ |52| なので、11px 用途には muted より明るい値が必要になる見込み)。明度を上げると「最弱テキスト」の階層が潰れる場合は、フォントサイズを 12px へ上げる選択も許容(その場合も Lc 60 以上は確保)。
6. **リンタブルな検出**: `scripts/token-lint.mjs`(または stylelint `declaration-property-value-allowed-list`)で、シェル表面(`src/styles/app.css` / `src/app/**` / `src/shared/**` / `src/rooms/registry.ts`)の生 hex リテラルを検出して fail させる。**room runtime / シェーダー内の hex(voxel-water の `0x8efff0` 等)はシェーダーアート定数でありスコープ外**と明記して除外する。

## 受け入れ基準

- `registry.ts` に生 hex が存在せず、4 room の accent がすべて tokens.css のトークンに解決される(unit test: registry の accent 値 ⊆ 定義済みトークン集合)
- `#79ead9` vs `--teal` の重複が「統一」または「差別化理由の明文化+距離ルール上の例外記載」のいずれかで解消されている
- ニアブラックが単一トークンに集約され、`renderer.setClearColor` / `.canvas-shell` / `.embedded-shell` が同一値に解決される。視覚基準: room 切替(shader ↔ embedded 往復)のスクリーンショット連写で背景色の継ぎ目・フラッシュ差が観測されない
- `--subtle` 11px テキストの APCA 実測値(apcacontrast.com)が記録され、調整後に Lc ≥ 75(サイズ変更で対応した場合は当該サイズの推奨 Lc)かつ WCAG 4.5:1 以上を満たす
- 将来アクセント選定ルール(色差下限・APCA 下限・手順)が docs に存在する
- token-lint が `pnpm lint`(または専用 script)で動作し、スコープ内ファイルのトークン外 hex を検出して fail する。現行違反(app.css:240, 250, 258、registry.ts:41, 56, 71, 86)がゼロになっている
- 回帰: `pnpm test / lint / build` 緑、`qa:visual` ハードフェイルなし。rail のアクティブ/ホバー色は意図した変更以外で変わらない(before/after スクリーンショット比較)

## 影響範囲・注意

- **文字列ピン留めテスト**: `shader-quality.test.ts` は voxel-water runtime/シェーダーの hex(`0x8efff0`、`vec3(0.5, 0.86, 0.88)` 等)をピン留めしている(96行目ほか)。これらは本チケットのスコープ外(シェーダーアート定数)であり、**誤ってトークン化するとテストが割れる**。`ShaderCanvas.test.ts` のピン対象は rawDelta / antialias / pixelRatio 文字列でクリアカラー行は含まれないため、`setClearColor` の定数化自体はテストを割らないが、同ファイルを触る以上ピン留め 7 アサーション(ShaderCanvas.test.ts:6-9 の4個+13-15 の3個)を維持したまま編集すること
- **T-SH-04 との相互参照**: ニアブラック統一のレンダラー側(`ShaderCanvas.tsx:51`)は T-SH-04(永続レンダラー化)と同一ファイル。先行した側が共有定数モジュールを切り、後行側はそれを参照する
- **water-qa.mjs**: colorSignature / hueMean は水面ピクセルを測るためシェルトークン変更の影響は原則ないが、`.embedded-shell` 背景変更後に embedded 2 室のキャプチャ(visual-smoke)で意図せぬ差分が出ないか確認
- **renderOrder 連鎖**: 本チケットは CSS/トークン/registry のみで scene graph に触れないため非該当(触れないことを保証する意味で記載)

## 完了レポート (2026-07-18)

### 実装

- `tokens.css` を opaque palette primitive と semantic role の 2 層に整理した。opaque hex は一意な `--palette-*` にだけ存在し、`--bg` / text / accent / danger / focus は primitive を直接参照する。alias、互換名、silent fallback は設けていない。
- `roomAccentTokens` を型付きの閉集合として追加し、registry の 4 room はすべて `var(--accent-*)` を参照する。旧 Ninth Tide の `#79ead9` は既存 mint `#5af2d1` と OKLab ΔE×100 3.39 しか離れていなかったため、意味のない近似重複として `--accent-mint` に統一した。
- renderer は root の必須 `--bg` 実値を読み、canvas shell / embedded shell / iframe も同じ semantic token を使う。token 欠落は fail fast とし、`0x070b10` / `#06090e` / `#02070d` の分岐を廃止した。
- rail microcopy は `--microcopy` (`#eef7f8`) に統一し、room description を 13px/700、navigation hint を 15px/500 にした。弱い階層は低コントラストではなく typography で表現する。
- `pnpm lint` に token lint を統合した。対象 shell の raw hex / numeric color、重複 primitive、semantic hex、semantic alias、欠落 primitive を拒否し、実 CSS から accent と microcopy typography を動的に読み取って WCAG / APCA font lookup / OKLab の契約を検証する。TS token 集合、CSS 定義、registry、3 種の stage background の跨層契約もテスト化した。
- `docs/design-token-policy.md` に source/consumption rules、accent 追加手順、色差・contrast guardrail、text contract を記録し、README から導線を追加した。

### 起票時の受け入れ基準の訂正

起票時の「11px なら Lc 75、12px へ変更した場合は Lc 60」および RGB 距離の提案は、現行の公式資料・実装に照らすと成立しないため、次の基準で置き換えた。

- WCAG 2.2 の通常テキスト 4.5:1 を normative gate とし、exact pin した `apca-w3@0.1.9` (0.0.98G-4g beta) の `fontLookupAPCA()` を追加の project quality signal とする。APCA / WCAG 3 compliance は主張しない。
- 旧 `#647883` 11px/400 は `--bg` 上で 4.33:1 / Lc -29.55。公式 lookup では白でも 11px/400 を満たせないため、色だけでなく size / weight を同時に直した。
- 新 `#eef7f8` は `--bg` 上で 18.32:1 / Lc -101.31、`--bg-elevated` 上で 17.42:1 / Lc -100.94。lookup の最小値は 700 weight で 13px、500 weight で 14.5px であり、実 CSS の 13px/700 と 15px/500 が双方を満たす。
- accent の重複判定は知覚一様でない RGB 距離ではなく CSS Color 4 の OKLab ΔE を使う。ΔE×100 ≥ 10 と raw accent |Lc| ≥ 45 は本 showroom の追加/重複防止 guardrail であり、W3C の適合閾値ではない。

### 検証

- `pnpm test`: 12 files / 43 tests pass
- `pnpm lint` (token lint を含む) / `pnpm typecheck` / `pnpm build` / `git diff --check`: pass
- `pnpm qa:visual`: desktop/mobile 合計 7 capture、console error 0、mobile horizontal overflow 0、scene/HUD viewport overlap 0。結果は ignored の `output/t-ds-01/after` に保存した。
- Chromium で 4 room を実測し、root / canvas / embedded shell / iframe の背景はすべて `rgb(6, 9, 14)`。shader → embedded → shader の切替を 40 animation frames 採取し、異なる shell background 0、console error 0。
- desktop と 279px mobile の実レンダーを比較し、microcopy の階層・折返し・overflow を確認した。active / hover の room accent 表現は token 参照化以外の意図しない変更なし。
- 独立 explorer / reviewer の mutation review で comment、short/alpha/composite hex、semantic alias、missing primitive の各 bypass を検証・修正し、最終 P0–P2 findings なし。
