# [T-EMB-01] ref/ を版管理下に置き、public/exhibits への再現可能ビルドパイプラインを確立する

- 分類: Platform
- 優先度: P1
- 評価軸: コントラクト遵守 / QA担保(TA軸)— 権威ソースが版管理外で、成果物のみがコミットされている状態は「調整可能である」という基盤契約そのものの不履行
- 依存: なし(逆に本チケットが T-EMB-02 および埋め込み展示の全調整チケットの前提。review-framework.md 横断注意4「埋め込み展示の調整は ref/ 側で行い再ビルド。ref/ の git 管理(AO-7/NT-2)が全ての前提」)

## 現状(証拠)

- `git status` で `?? ref/` — 両埋め込み展示の権威ソースがリポジトリ未追跡(現物確認済み。dossier-anime-liquid-orb.md リスク15、dossier-ninth-tide-archive.md リスク9、dossier-shell.md 既知の課題4)。
- **Anime Liquid Orb**(`ref/mizu-kokoro-2-source/`):
  - ソース: `src/main.js`(2,523行)+ `src/style.css` + `index.html`。ビルドは Vite(`package.json:6-10` — `dev`/`build`/`preview`、three 0.184.0 固定、vite ^8.0.16、npm 形式の `package-lock.json` 同梱)。
  - `vite.config.js:4-8`: `base: './'`、`sourcemap: true` — source map 同梱は明示的なビルド設定由来。
  - `dist/` と `public/exhibits/anime-liquid-orb/` はバイト一致を cmp で確認(`assets/index-CR_YyWXx.js` 702,936 byte、`index-CR_YyWXx.js.map` 3,054,146 byte、`index-DXkfpgO2.css` 13,921 byte、`index.html` 6,045 byte)。
- **Ninth Tide Archive**(`ref/archive_of_the_ninth_tide_shoreless_web/`):
  - ソース: `src/main.js`(2,753行)。ビルドは `package.json:7` の `esbuild src/main.js --bundle --format=iife --platform=browser --target=es2020 --minify --outfile=app.js` — **生成物 `app.js`(644,588 byte)が ref ルート直下に in-place で出力される**。dist ディレクトリなし。
  - 開発サーブは `serve.py`(`package.json:8` の `python3 serve.py`)+ `start_windows.bat` / `start_linux.sh` / `start_macos.command`。
  - `public/exhibits/ninth-tide-archive/` の `index.html`(18,058 byte)/ `app.js` / `archive.mp3`(8,279,999 byte)は ref 側とバイト一致を cmp で確認。
  - `archive.mp3` は ref と public の**2箇所に実体を持つ**(working tree で計 16.56 MB)。なお両者はバイト一致のため git オブジェクトとしては同一 blob になり履歴は肥大しない — dossier-ninth-tide-archive.md リスク9 の「リポジトリ重量が倍増」は working tree / デプロイ側の話として読むのが正確。真の問題はサイズよりも**手動同期によるドリフトリスク**。
- ルート `.gitignore` に**非アンカーの `dist` / `node_modules` / `output`** がある(現物確認)。このため ref/ を単純に `git add` しても `ref/mizu-kokoro-2-source/dist/` は自動的に除外される。tide 側の生成物 `app.js` は ref ルート直下のため .gitignore に掛からず、無方針だと生成物がソースと同列にコミットされる。
- CI(`.github/workflows/pages.yml:38-45`)は `pnpm install --frozen-lockfile` → `pnpm test` → `pnpm build` のみ。ref 側のビルドはどこからも実行されない。ルート `package.json` の scripts に exhibits 関連の項目はない(現物確認)。`pnpm-workspace.yaml` は存在しない。
- 関連資料: review-framework.md ロングリスト AO-7(P1)/ NT-2(P1)、要決定 D-1(fork 運用 — **承認済み**)/ D-3(source map 同梱)、dossier-ninth-tide-archive.md 冒頭「正本ソース」注記。

## 問題

public/exhibits は minified 成果物のみで、ref/ が版管理外の現状では「ソースを直せばよい」という前提自体が成立していない。ref/ のディレクトリが失われれば orb は 702KB、tide は 644KB の minified バンドルが事実上編集不能な正本になる。fork 運用(D-1 承認済み)で予定されている全ての ref 側改修(T-EMB-02 の postMessage ブリッジ、モバイル HUD、パルス多重化ほか)は、再現可能な「ref → public/exhibits」ビルド経路が先に存在しなければ着手できない。

## 改善方向

review-framework.md 横断注意4 と research-webgl-platform.md §2.6(CI とビルド再現性)の方針に沿って:

1. **ref/ のコミット対象化**
   - `ref/mizu-kokoro-2-source/`(src / index.html / package.json / vite.config.js / ドキュメント群 / docs/screenshots)と `ref/archive_of_the_ninth_tide_shoreless_web/`(src / index.html / package.json / serve.py / start_* / ドキュメント群 / preview*.png)をコミットする。
   - 生成物はコミットしない方針を明文化: orb の `dist/` はルート .gitignore の `dist` で既に除外される(この挙動を意図として README に記録)。tide の `app.js` は `.gitignore` に `ref/archive_of_the_ninth_tide_shoreless_web/app.js` を追加するか、esbuild の `--outfile` を `dist/app.js` に変更して dist 除外に寄せる(後者を推奨 — 「生成物は dist/」の規約が2展示で揃う)。
   - ref 内の npm 形式 `package-lock.json` は pnpm 方針(グローバル規約)に合わせて扱いを決める。推奨: リポジトリルートに `pnpm-workspace.yaml` を置き ref 配下2パッケージをワークスペース化(単一 pnpm-lock.yaml で `--frozen-lockfile` の再現性が CI までつながる)。ワークスペース化を見送る場合も、各 ref ディレクトリで `pnpm install` が通ることを確認し lockfile を pnpm 形式へ移行する。
2. **「ref → public/exhibits」ビルド/コピーのスクリプト化(pnpm スクリプト化を推奨)**
   - `scripts/build-exhibits.mjs`(Node)を新設し、ルート `package.json` に `exhibits:build` を追加。内容:
     - orb: `vite build`(ref/mizu-kokoro-2-source)→ `dist/*` + `THIRD_PARTY_NOTICES.md` を `public/exhibits/anime-liquid-orb/` へコピー(古い assets/ の掃除込み — Vite のハッシュ付きファイル名が変わるため上書きでなく置換)。
     - tide: esbuild ビルド → `index.html` / `app.js` / `LICENSE_THREE.txt` + `archive.mp3` を `public/exhibits/ninth-tide-archive/` へコピー。
   - public/exhibits(成果物)のコミットは維持し、**同期検証**をチケット完了条件に含める: `pnpm exhibits:build` 直後に `git diff --exit-code -- public/exhibits` が通ること(lockfile 固定下では minify 出力は決定的)。CI への同期検証ステップ追加は SH-6(CI 強化)側と調整し、本チケットではローカル検証手順の確立まででも可。
3. **archive.mp3 の single source 化**
   - 正本を ref 側(`ref/archive_of_the_ninth_tide_shoreless_web/archive.mp3`)と定め、public 側はビルドスクリプトのコピーでのみ更新される生成物とする(手動編集禁止を README に明記)。
   - さらに working tree の二重実体まで解消する場合は `public/exhibits/ninth-tide-archive/archive.mp3` を .gitignore に追加し CI の build 前に `exhibits:build`(または mp3 コピーのみ)を挟む。ただしこれは pages.yml の変更を要するため、リスクを最小化するなら第一段階は「正本宣言+スクリプト経由コピーのみ」で完了とし、gitignore 化は SH-6 と同時に行う。
4. **D-3 の決定(source map 同梱の維持 or 除去)を本チケット内タスクとして実施**
   - 対象は orb の `index-CR_YyWXx.js.map`(3,054,146 byte。`vite.config.js:7` の `sourcemap: true` 由来。dossier-anime-liquid-orb.md リスク14)。tide は esbuild コマンドに sourcemap フラグがなく元々非同梱。
   - 判断軸: 意図的な透明性(fork 運用でソースは公開リポジトリに載るため、map を消しても秘匿効果はない)vs 配信サイズ 3MB(ブラウザは DevTools を開かない限り .map を取得しないため、一般来場者の転送量には影響しない)。**推奨: 維持**(ソース公開と整合し、公開ページ上のデバッグ可能性が QA 資産になる)。ただし決定と根拠をチケットクローズ時に docs へ記録することが必須であり、除去を選ぶ場合は `sourcemap: false` とビルド再実行・public 側 .map 削除をセットで行う。

## 受け入れ基準

- `git status` で `ref/` 配下のソース一式が追跡済みになり、`?? ref/` が消えている。生成物(orb dist / tide app.js)は追跡されない(方針の README 記録込み)。
- **クリーンな環境(git clean -xfd 相当 + `pnpm install`)から `pnpm exhibits:build` 1発で `public/exhibits/anime-liquid-orb/` と `public/exhibits/ninth-tide-archive/` が ref/ から再生成でき、生成物が現行と機能同等である。** 検証手順:
  - 同一 lockfile 下での再生成物が現行コミットとバイト一致すること(`git diff --exit-code -- public/exhibits`)。ツールチェーン更新等でバイト一致しない場合は、差分理由の記録+下記の機能同等確認をもって代替とする。
  - `pnpm build && pnpm qa:visual` がパス(コンソールエラー0)し、両展示のデスクトップ/モバイルスクリーンショットが現行と目視同等。
  - tide は `?preview=main&section=0..8` の決定論キャプチャ(`docs/direction/captures/capture.mjs` の再取得手順)が引き続き動作。orb はスタンドアロン URL 直開きで 4相切替・freeze が動作。
- `archive.mp3` の正本が1箇所に定まり(ref 側)、public 側はスクリプト経由でのみ更新されることが README / スクリプトコメントに明文化されている。配信 URL(`exhibits/ninth-tide-archive/archive.mp3`)での再生は従来通り。
- D-3 の判断(source map 維持 or 除去)が根拠つきで記録され、`vite.config.js` の設定と public 側成果物の実態が判断と一致している。
- `pnpm test / lint / typecheck / build` 全パス。CI(pages.yml)が現行のまま green(ワークスペース化した場合は `--frozen-lockfile` が新 lockfile で通ること)。

## 影響範囲・注意

- **横断注意4(review-framework.md)の実現そのもの**: 本チケット完了までは、埋め込み展示のいかなる調整チケットも「minified バンドル直編集」以外の実装手段がない。T-EMB-02 は本チケットに依存。
- **registry.test.ts の embedPath ピン留め**: `^exhibits/.+/index\.html$`(registry.test.ts:26)。ビルドスクリプトの出力先ディレクトリ名・index.html 名を変えないこと(変える場合は registry.ts:74/89 とテストを同期)。
- **文字列ピン留めテスト(shader-quality.test.ts / runtime.test.ts)・water-qa.mjs セレクタ**: ネイティブ2室のみを対象とするため本チケットでは非該当。ただし qa:visual(visual-smoke.mjs)は embedded 2室のスクリーンショットとコンソールエラー検査を含むため、再生成物の回帰確認に必ず使用する。
- **ルート .gitignore の非アンカーパターン**: `dist` / `node_modules` / `output` は ref サブディレクトリにも波及する。ref に「コミットしたい dist」を将来置く場合は `!ref/**/dist` の否定パターンが必要になる — 本チケットでは逆にこの挙動を利用するため、意図をコメントで残すこと。
- **preview.png 等のバイナリ**: orb の `preview.png`(1.3MB)+ `docs/screenshots/`、tide の `preview*.png`(計約1MB)がコミット対象に入る。ヒーローショット参照資産として保持推奨だが、初回コミットのサイズ増(mp3 8.28MB 含め約15MB)を PR 説明に明記する。
- **エージェント/後続作業者への注意**: 本チケット以降、`public/exhibits/**` への直接編集は禁止(必ず ref 側を編集して `pnpm exhibits:build`)。この規約を docs/direction/README.md か CONTRIBUTING 相当へ1行で追記すること。

## 作業報告 (2026-07-18)

- `ref/` の両展示について、編集可能ソース、文書、参照画像、ライセンス、Tide の音源正本を版管理対象化した。両 `package-lock.json`、Orb の `dist/`、Tide の旧ルート `app.js` / 新 `dist/` は生成物として除外した。
- pnpm 11.5.2 の単一 workspace / root lock を導入した。直接依存は exact pin、依存 build は審査済みの `esbuild` のみ許可し、未一致 filter と lock drift は fail fast とした。未使用だった Tide の `playwright-core` は依存から除去した。
- Tide は `build.mjs` で完全な `dist/` (`index.html`, `app.js`, `archive.mp3`, Three.js license) を生成する形へ統一した。ルートの `pnpm exhibits:build` は両 package の build 成功と全入力の存在を確認してから、固定された `public/exhibits/*` の2ディレクトリを丸ごと置換する。`archive.mp3` の正本は ref 側だけであり、public は公開スナップショットである。
- ルート `pnpm build` と Pages workflow を再生成経路へ接続し、`scripts/check-exhibit-sync.mjs` で tracked 差分と新しい hash asset の untracked 差分をともに拒否するようにした。`docs/direction/README.md` と各 ref README に public 直接編集禁止を記録した。
- D-3 は **source map 維持**と決定した。fork のソースは公開済みで秘匿効果がなく、外部 map は通常のページロード payload に含まれず、オンラインデバッグ / QA に有用なため。初回 pnpm workspace build では map 内の15件の Three.js source path のみ npm 配置から pnpm virtual-store 配置へ変化し、`sourcesContent` / `mappings`、JS / CSS / HTML は不変だった。Tide bundle と音源も従来スナップショットと SHA-256 一致を確認した。
- 検証: `pnpm install --frozen-lockfile`、`pnpm test` (12 files / 44 tests)、`pnpm lint`、`pnpm typecheck`、`pnpm build`、`pnpm qa:visual` (desktop/mobile 7 captures、console error 0、overflow/overlap なし)、`pnpm qa:exhibits` (Tide 9章、各 canvas 1、Orb 4相、LIQUID→CRYSTAL→LIQUID、console error 0) を通過した。独立レビューは P0–P2 指摘なしで APPROVE。
