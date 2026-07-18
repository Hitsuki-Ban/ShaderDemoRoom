# [T-NT-01] 複数パルス/エコー履歴を導入する(単一スロットパルスの多重化 + shutdown 幻パルス解消)

- 分類: AD / TA
- 優先度: P2
- 評価軸: ストーリーテリング(「エコーは記憶」原則との自己矛盾)/ モデル一貫性 / デッドコード・意図せぬ結合
- 依存: T-NT-03(スペクトラルフラックス由来の発火イベント列を確定) / T-NT-05(必須の変更前 baseline gate) / T-EMB-01 / T-EMB-02(完了済み)

## 現状(証拠)

対象: `ref/archive_of_the_ninth_tide_shoreless_web/src/main.js`(現行 3062 行。カルテ執筆時の 2753 行からブリッジ v1 導入で行番号がシフト済み)

- パルスは単一スロット: `state.pulseAge/pulseStrength/pulseOrigin`(main.js:154–156)と `globals.pulseAge/pulseStrength/pulseOrigin`(main.js:203–205)を全 ShaderMaterial が共有する。
- `triggerPulse()`(main.js:2274–2290)は無条件にスロットを上書きする。書き手は4系統:
  - オートソナー: `state.transient > 0.16 && state.pulseCooldown <= 0` で発火、cooldown `1.15 + (1 - low) * 0.7` s(main.js:2206–2210)
  - ユーザー操作: コアクリック strength 1.35(:2261)、床クリック 1.05(:2267)、任意点 0.7(:2270)。クリック時 cooldown 0.95 s(:2289)
  - 章交代アナウンス: strength 0.58(:2470)
  - 終幕: mode 8 NULL パルス(:2421)
- 波面/記憶項の消費側は約10マテリアル: 床(:354–357)、アーカイブ格子 LineSegments(:501–504)/ Points(:611–614)、レゾネーター(:717–719)、ソナーシェル/カーテン/スポーク(:799, :842, :906–909)、環境粒子系(:1455–1457, :1540–1541)、veilPass(:1672, :1693–1695)。
- **shutdown 幻パルス**: `updatePulse()` が shutdown>0.5 中、収束シェル演出のために共有 uniform を `globals.pulseStrength.value = Math.max(…, (1 - p) * 1.08)`(main.js:2752)で強制上書きし、床・格子・粒子のシェーダが存在しないパルスを見る。
- **clone の罠**: `convergenceMaterial = sonarShellMaterial.clone()`(main.js:958)で uniforms が共有 globals に再束縛されており、shell と convergence は独立したパルスパラメータを永遠に持てない。
- 原典コンセプト(ART_DIRECTION、カルテ「コンセプト」節): Lozano-Hemmer《Pulse Room》の翻訳として「エコーは履歴を保存する」。原作は直近 300 記録をキューに保持する(research-audio-reactive.md §2.2)。楽曲の密な区間ではオートソナーが 1.15–1.85 s 間隔で常時発火するため、ユーザーがクリックしたエコー(寿命 4.0–5.35 s)は伝播途中でほぼ必ず消される。

## 問題

「エコーは記憶」という展示の中核原則を、実装が激しい楽曲区間で自ら毀損している。ユーザーの操作痕跡が自動演出に上書きされるため、インタラクションの因果が学習できず、クリックの手応えが乱数のように見える。さらに終幕では共有 uniform 汚染により全マテリアルが幻パルスを受け、消灯演出の輝度制御が意図しない結合を持つ。

## 改善方向

research-audio-reactive.md §2.2 案A(uniform 配列リングバッファ)を第一段とする:

- `uniform vec4 uPulses[N];`(xyz=origin+sourceY, w=startTime)+ `uniform vec4 uPulseMeta[N];`(strength, mode, flags)。WebGL2 の `MAX_FRAGMENT_UNIFORM_VECTORS` 最低保証 224 に対し十分小さい。
- **slot 数と所有者を固定する**:
  - desktop: N=8、auto/system ring=5、user ring=3。
  - mobile: N=4、auto/system ring=2、user ring=2。
  - auto/system ring の書き手は transient 起点のオートソナー、章交代アナウンス、通常の終幕 NULL pulse。user ring の書き手はコア/床/任意点の明示クリックだけ。分類不能な source を空き slot へ入れる fallback は設けず、未知 source は fail fast とする。
  - 各 ring は自分の最古 slot だけを上書きする。auto/system が user slot を借りること、user が auto/system slot を借りることを禁止する。
- Pulse Room の「新規記録で全灯が一瞬消えキューが進む」文法は、最古スロット上書き時に既存トレースを約100 ms だけ 0.5 倍に沈めてから再放射する演出として直訳する(§2.9 の指摘とも一致)。
- 全消費マテリアルの front/memory 項を固定長ループ化する。exp/abs 主体で ALU 負荷は軽く、本展示のボトルネックはフィルレート側(§2.7)。
- **shutdown 幻パルスの同時解消**: convergence は ring に入れない専用 uniform に分離し、main.js:2752 の共有 `globals.pulseStrength` 上書きと :958 の clone 共有を廃止する。
- **veil の pulse 選択を固定する**: veilPass の chroma / NULL sonar は、通常 slot(auto/system + user)のうち現在生存している pulse の **最大寄与値 `strength * lifeEnvelope(age, mode)`** 1本だけを読む。同値なら `startTime` が新しい方を選ぶ。shutdown convergence は候補に含めない。最新 pulse、auto 優先、slot 0 などへの fallback は設けない。
- 第二段(任意): 床の「航跡」表現のみ ping-pong FBO(§2.2 案B、256² HalfFloat)を併用する二段構え。本チケットでは設計メモに留め、実装は別票に切る。

## 受け入れ基準

- 視覚(決定論キャプチャ比較): `?preview=main&section=N` + `__NINTH_TIDE_STEP__` で、ユーザーパルス発火→1秒後に中心パルス(オートソナー相当)を注入するシナリオを再現し、ユーザーパルスの波面がモード別寿命(4.0–5.35 s)まで床/アーカイブ格子上に残存すること(現行は消える)。
- 終幕: `?preview=ending` で shutdown>0.5 中、convergence 以外のマテリアル(床・格子・粒子)に波面/記憶項が現れないこと(現行キャプチャとの差分で確認)。
- パルス0個のベースライン(入場直後静止状態)のキャプチャが改修前後でピクセル一致相当であること(退行なし)。
- 数値: フラグメント uniform 増分見積りを記録し 224 予算内。desktop は auto/system 5 + user 3、mobile は auto/system 2 + user 2 であることをテストする。bridge stats(`fps` / `frameTimeMs`)の before/after で同一環境フレームタイム退行 5% 以内。
- `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm exhibits:check` / `qa:exhibits` / `qa:visual` 通過。

## 影響範囲・注意

- **改修は ref/ 側で行い `pnpm exhibits:build` で public/exhibits を再生成する**。public/ の手編集は禁止(`exhibits:check` が CI で同期を強制)。Windows worktree では source map の改行差に注意(LF canonical、T-EMB-02 完了レポート参照)。
- 全 ShaderMaterial の一括改修になるため、`qa:exhibits` の standalone/bridge 9章検査と `qa:visual` の stage-profile paired luma gate を必ずセットで回す。
- veilPass は最大寄与 pulse 1本という上記の契約を守る。全 pulse の加算や最新 pulse への読み替えは本票の仕様外。
- オートソナー発火条件(:2206–2210)は T-NT-03(スペクトラルフラックス化)と同一箇所。両票を続けて実施する場合は T-NT-03 を先にして発火イベント列を安定させてから多重化の検収をすると比較が楽になる。
- 参照: research-audio-reactive.md §2.2(uniform 上限・Pulse Room 仕様の出典リンク含む)
