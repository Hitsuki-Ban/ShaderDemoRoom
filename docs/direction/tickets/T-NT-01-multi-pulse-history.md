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

## 完了報告 (2026-07-21)

- `pulse-history.js` を新設し、desktop は system 5 + user 3、mobile は system 2 + user 2 の
  独立 ring とした。`auto/system` と `user` は相互に slot を借りず、各 ring の最古だけを上書きする。
  未知 tier/source、非有限座標、範囲外 mode、負の時刻差は fallback せず例外にする。
- 上書き時だけ、上書き前から存続する trace を 100 ms / 0.5 倍にする。新規 pulse は減光せず、
  pause の `dt=0` では clock と dip window を進めない。capture/restore は slot、cursor、clock、serial、
  dip state を独立して深く保存し、決定論 baseline の `Vector4[]` reference 問題を回避した。
- `uPulses[N] = vec4(originX, sourceY, originZ, startTime)` と
  `uPulseMeta[N] = vec4(strength, mode, queueScale, activeMixScale)` を共有し、floor、archive wire/points、
  resonator beams、near snow、abyssal spines と CPU resonator/pressure consumers を固定上限 loop の
  複数 pulse 加算へ置換した。inactive slot は loop 内 branch で高価な `exp/smoothstep` を実行しない。
- 多数 pulse が同じ opening cue で重なっても既存 exposure を壊さないよう、加算 consumer だけを
  `1 / (1 + 0.55 * (liveCount - 1))` で energy-normalize する。単一 pulse、veil の選択値、単件 artifact
  は正規化しない。既存の `exp(-0.34 * age)` 強度減衰と consumer 固有の寿命 fade は維持した。
- 単件 sonar artifact は最新の生存 pulse を選ぶ。veil は仕様通り全通常 pulse の
  `strength * lifeEnvelope(age, mode)` 最大値を選び、同値は新しい `startTime`、同時刻は serial で決める。
  convergence は専用 uniform に分離し、shutdown が共有 pulse strength を書き換える経路を削除した。
  `shutdown > 0.5` では通常 history の shader/CPU contribution を明示的に 0 にする。
- preview 限定の strict `__NINTH_TIDE_PULSE_SCENARIO__({ scenario, section, timestampMs })` と
  `qa:ninth-tide-pulses` を追加した。desktop/mobile の容量と shader link、zero-pulse、user→1秒後auto、
  ordinary pulse を保持した ending convergence を SwiftShader で検査する。zero は固定 golden、user は
  同じ ring/liveCount/mixScale の epsilon-strength control、ending は history 有無の paired framebuffer と比較する。
- 基点 `e6ba0d8` と変更後の zero-pulse RGBA8 は 1280×720 / RTX 4070 Ti ANGLE で同じ
  `872ac01bbf4e0bd5e6412938cb4e94b78083222cd90a238e49a763511c92bfc5` となり pixel-equivalent。
  user pulse は mode 0 の 5.35 s lifetime に対して 4.5 s 時点でも残り、1 s 後の center auto pulse と
  同時に live であることを browser hook で確認した。
- uniform 配列増分は desktop 16 vec4 / mobile 8 vec4。最低保証に対する残量は fragment 208 / 216、
  vertex 240 / 248 vec4。実測上限は fragment 1024 / vertex 4095。配列は program ごとの active uniform
  であり、材質数を跨いで累積する予算ではない。
- 同じ埋め込み runtime telemetry の 5 sample 中央値で frame time は改修前 10.5167 ms、改修後
  8.6810 ms (`-17.45%`)。最初の inactive branch なし実装は 11.9093 ms (`+13.2%`) で gate を失敗し、
  空 slot の高価な shader path を除去してから再取得した。
- 最終 bundle SHA-256 は
  `457e40a7e6eebf0cce993884b7d403f141dafbe801fd661d1ddc3326a000c944` で ref dist / public / root dist が一致。
  `qa:ninth-tide` manifest は
  `ab98542812ca64ce602c6e7a65712a3a2655d137b6e85ce442fa992514c7bf96`、pulse QA manifest は
  `78570a3cda464ac0dbaa674b34b314604ae64d29d403a653f2ba7b66dfb69010`。
- 独立 review で発見した veil shutdown 漏れと queue dip を winner の比較値へ混入する不具合を修正した。
  最終 pulse QA は strong/epsilon user の同条件 pair が `6c026603…` / `73951f4b…` と異なり、
  ending の history 2本/0本 pair はともに `50845613…` と完全一致することを検証した。
- `pnpm test` (37 files / 303 tests)、`pnpm lint`、`pnpm build`、`qa:ninth-tide-pulses`、
  production `qa:ninth-tide` (3 browsers × 11 states × 3 repeats)、`qa:exhibits`、`qa:visual` を通過した。
  ping-pong FBO 航跡は本票へ混在させず、記載通り将来の独立票に留めた。
