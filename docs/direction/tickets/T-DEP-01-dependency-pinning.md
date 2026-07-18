# [T-DEP-01] "latest" 依存を exact ピンに移行し three 更新プロトコルを定める

- 分類: Platform
- 優先度: P2
- 評価軸: TA「QA担保」(依存の無検査ジャンプがビジュアルリグレッションとして QA をすり抜ける構図。review-framework.md SH-7「"latest" 依存ピン戦略(three メジャー跳ねのシェーダー破壊リスク)」が本件)
- 依存: なし(CI への qa:visual 追加チケット(SH-6 系)と連携すると更新プロトコルのゲートが自動化されるが、本チケット単体で完結する)

## 現状(証拠)

**1. package.json のほぼ全依存が "latest"**

- `package.json:17-24` — dependencies **全 6 件**が `"latest"`: `@vitejs/plugin-react` / `lucide-react` / `react` / `react-dom` / `react-router-dom` / **`three`**
- `package.json:25-43` — devDependencies も例外 2 件(`@types/three: "^0.184.1"`(32行目)、`playwright: "^1.60.0"`(38行目))を除きすべて `"latest"`
- `package.json:44-48` — `engines.node >= 22`、`packageManager: pnpm@11.5.2`

**2. pnpm-lock.yaml の現行実バージョン(importers 節より転記)**

| パッケージ | 実バージョン |
|---|---|
| three | **0.184.0**(pnpm-lock.yaml:1193) |
| @types/three | **0.184.1**(pnpm-lock.yaml:480) |
| react / react-dom | 19.2.7 |
| react-router-dom | 7.17.0 |
| lucide-react | 1.17.0 |
| @vitejs/plugin-react | 6.0.2 |
| vite | 8.0.16 |
| vitest | 4.1.8 |
| typescript | 6.0.3 |
| eslint | 10.4.1 |
| typescript-eslint | 8.61.0 |
| @eslint/js | 10.0.1 |
| eslint-plugin-react-hooks / react-refresh | 7.1.1 / 0.5.2 |
| @testing-library/react / jest-dom | 16.3.2 / 6.9.1 |
| @types/react / react-dom / node | 19.2.17 / 19.2.3 / 25.9.2 |
| globals / jsdom / playwright | 17.6.0 / 29.1.1 / 1.60.0 |

**3. CI の再現性は lockfile のみが担保**

- `.github/workflows/pages.yml:39` — `pnpm install --frozen-lockfile`。CI 上では跳ねないが、ローカルで lockfile を再生成(`pnpm up`、lockfile 削除、pnpm メジャー更新に伴う再解決など)した瞬間に "latest" が無検査で最新へ解決される。
- CI は `pnpm test` + `pnpm build` のみで lint / qa:visual / qa:water なし(pages.yml:41-45)— ビジュアル破壊は CI で検知されない。
- 参照: dossier-shell.md「インフラ / CI / テスト / QA」節・コードリーディングリスク 6、review-framework.md SH-7。

## 問題

- three は semver ではなく**月次リビジョン制**で「マイナー=メジャー相当」(API はどのリビジョンでも変わりうる)。`"latest"` のままでは lockfile 再生成の一手で 0.184 → 0.19x に跳び、renderOrder・透明ソート・`Timer`・`renderer.info` 等の内部挙動に依存する両シェーダールームが**無検査で破壊**される。
- `@types/three`(^0.184.1)と three 本体("latest")が独立に動ける構造のため、型と実体のリビジョン乖離が起こりうる(現状は偶然 0.184 系で一致)。
- react 19 / vite 8 / vitest 4 等の他依存も同じ構図で、アップグレードが「意図した作業」ではなく「事故」として発生する。

## 改善方向

research-webgl-platform.md §2.10(three のリビジョン制、0.x キャレットの実質パッチ固定、「lockfile はピンを補完するのであって代替しない」、更新ボット+視覚 QA ゲートのセット運用)に従う。

1. **exact ピンへの置換**: `package.json` の全 `"latest"` を上表の lockfile 現行実バージョンの **exact 指定**に置き換える(例: `"three": "0.184.0"`、`"react": "19.2.7"`、`"vite": "8.0.16"`)。既存の `@types/three` は `"0.184.1"`、`playwright` は `"1.60.0"` へ exact 化して統一する。置換後に `pnpm install` を実行し、**lockfile に差分が出ないこと**でピンと実体の一致を証明する。
2. **three ⇔ @types/three の対応規約の明文化**: 「両者は常に同一リビジョン(0.184.x なら両方 0.184.x)で更新する。three だけ・型だけの単独更新は禁止」を依存ポリシー文書(例 `docs/direction/dependency-policy.md`、置き場所は実装時判断)に明記。@types/three は DefinitelyTyped 由来でパッチ番号は一致しないことがある(現に 0.184.0 vs 0.184.1)ため、**一致単位はリビジョン(マイナー)**とする。
3. **three アップグレードプロトコルの文書化**(同文書内、チェックリスト形式):
   - (a) 1 リビジョンずつ上げる(複数リビジョンのジャンプ禁止)。three.js Wiki の Migration Guide で該当リビジョンの破壊的変更を確認
   - (b) `pnpm test` / `pnpm lint` / `pnpm build` — 文字列ピン留めテストが赤になった場合は「等価リファクタによるピン破損」か「実挙動の破壊」かを必ず切り分けてから対処
   - (c) `pnpm qa:visual`(4 室スクリーンショット)+ `pnpm qa:water`(default / storm / calm / rain)で before/after 比較
   - (d) **全 4 ルーム手動スモーク**: voxel-water 3 天候切替・プリセット、glass-optics スライダー操作と Focus beam / Crystal preset、embedded 2 室のロードと Reload exhibit。特に透明ソート/renderOrder まわりの見た目を重点確認
   - (e) 記録: 更新前後のスクリーンショットを output/ 配下に保存し、コミットメッセージにリビジョン差分の要約を残す
4. **他依存の更新運用**: `pnpm up --latest` の一括実行を禁止し、`pnpm up <pkg>` の個別更新+レビュー可能な lockfile 差分を原則とする。react / vite / vitest のメジャー更新は three と同様に qa:visual を伴う。
5. **任意提案(必須にしない)**: Renovate または Dependabot をグルーピング+スケジュール設定で導入し、three の更新 PR に CI の視覚 QA(SH-6 系チケットで CI 化された場合)をゲートとして紐付ける。導入しない場合は「四半期ごとに個別更新をレビュー付きで行う」等の手動サイクルをポリシー文書に明記する。

## 受け入れ基準

- `grep '"latest"' package.json` → **0 件**(全依存が exact バージョン)
- ピン置換後の `pnpm install` で pnpm-lock.yaml に差分が出ない(`git diff --exit-code pnpm-lock.yaml` で検証)— 実行環境のバージョンが 1 つも動いていないことの証明
- three(0.184.0)と @types/three(0.184.1)が同一リビジョンであり、対応規約が依存ポリシー文書に明文化されている
- three アップグレードプロトコルがチェックリスト形式で文書化され、qa:visual + qa:water + 全 4 室手動スモークを含む
- 回帰: `pnpm test` / `pnpm lint` / `pnpm build` / `pnpm qa:visual` がすべて緑(依存実体が変わっていないため、ここで差分が出る場合はピン作業のミス)
- CI(pages.yml)が従来どおり `--frozen-lockfile` で成功する(package.json と lockfile の同時コミットの確認)

## 影響範囲・注意

- **package.json と lockfile の同時コミット必須**: CI は `--frozen-lockfile`(pages.yml:39)のため、package.json のピン変更と pnpm-lock.yaml が不整合だと CI が即失敗する。1 コミットで両方を含めること
- **文字列ピン留めテスト**(`shader-quality.test.ts` / `runtime.test.ts` / `ShaderCanvas.test.ts`): 依存ピン作業自体はソースを触らないため破壊しないが、**将来の three 更新時**には API 改名で「ピンの破損」と「実破壊」が同時に起こりうる。切り分け手順をプロトコル (b) に含めた理由であり、更新作業者は必ずこの順で確認する
- **water-qa.mjs セレクタ / renderOrder 連鎖**: 本チケットでは不変更。ただし three 更新時のリグレッションが最も出やすいのは両ルームの手動 renderOrder 連鎖・透明ソートであるため、プロトコル (d) の重点確認項目として明記済み
- **pnpm ラッパー環境**: この環境では `npm` コマンドが pnpm にリダイレクトされる(グローバル設定)。検証コマンドは pnpm 表記で統一する
- `engines.node >= 22` / `packageManager: pnpm@11.5.2` は本チケットのスコープ外(現状維持)
