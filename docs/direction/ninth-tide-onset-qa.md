# Ninth Tide onset QA log

- Ticket: [T-NT-03](tickets/T-NT-03-spectral-flux-onset.md)
- Date: 2026-07-21
- Audio: `ref/archive_of_the_ninth_tide_shoreless_web/archive.mp3`
- Audio SHA-256: `e579f806bf9ab69117492c52fac6bbe985786def60f7cd36de59d4e501bab3cd`
- Decode: mono, native 48 kHz, 354.479979 s

## 実装した検出器

auto-sonar の離散発火だけを、全帯域エネルギー差分から半波整流 spectral flux へ置換した。既存の
`transient` 計算と、それを参照する連続的な視覚表現は変更していない。

- ODF: `mean(max(0, currentByte - previousByte) / 255)`
- 経路: 全帯域と 190 Hz 以上の帯域限定 flux を独立に計算・平滑化・閾値化
- 章選択: Chapter VIII は帯域限定経路、その他の章は全帯域経路
- 適応閾値: 過去 1.25 s の `mean + 1.5 * standardDeviation`
- ODF low-pass: exponential lambda 30/s
- noise floor: 0.012
- warm-up: 1.0 s かつ 12 samples
- peak picker: 1 frame look-ahead の局所極大。plateau は先頭だけを選択
- auto-sonar cooldown: 既存の `1.15 + (1 - low) * 0.7` s を維持
- reset: source change、play、pause、seek、replay、deterministic baseline restore
- silent path: 64-band synthetic spectrum を同じ検出器へ渡すが、`playing=false` なので発火しない

Meyda、Essentia.js、別 analyser、legacy trigger fallback は追加していない。実音声では
`audio.currentTime` 差分で履歴時間を進め、低 FPS 時も 1.25 s の意味を維持する。時刻が進まない最初の
frame、buffering、量子化された同値時刻では ODF sample を追加しない。負方向の時刻跳変は経過時間を
生成せず再アンカーする。

## オフライン比較

出荷しない `uv` 一時ツールで全曲を一度だけ解析した。参照は librosa 0.11.0 の full-track
`onset_detect(backtrack=False)`、照合は mir_eval 0.8.2 の one-to-one matching、許容幅は ±80 ms。
参照と候補の双方へ runtime と同じ動的 cooldown を適用した。固定時刻補正 -13 ms は calibration
区間の 12 pair の中央値であり、runtime の発火時刻には使用しない。

Web Audio 近似は 2048-point periodic Blackman、60 Hz 観測、linear magnitude smoothing 0.82、
-94/-16 dB の byte mapping。評価区間は解析前に次で固定した。

- quiet crescendo: 104–115 s
- dense high-frequency attacks: 294–320 s
- calibration/audit: 160–180 s、210–220 s

| Detector / interval | Precision | Recall | F1 | TP | FP | FN |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| spectral flux / quiet 104–115 | 0.000 | 0.000 | 0.000 | 0 | 0 | 7 |
| spectral flux / dense 294–320 | 0.308 | 0.222 | 0.258 | 4 | 9 | 14 |
| spectral flux / aggregate | **0.308** | **0.160** | **0.211** | 4 | 9 | 21 |
| legacy transient / aggregate | 0.000 | 0.000 | 0.000 | 0 | 0 | 25 |

quiet crescendo の accepted event は 0 で、誤発火も 0。dense 区間では legacy の TP 0 に対して
TP 4 となり、高域 attack の取りこぼしを減らした。accepted event は 13 個で、すべて動的 cooldown
を満たした。

Dense accepted timestamps (seconds, offline correction applied):

`295.570, 298.420, 300.554, 302.354, 304.137, 306.454, 308.054, 309.854, 311.987, 313.770, 315.570, 317.704, 319.487`

Raw candidate は dense 区間で 26 個、quiet 区間で 0 個。dense raw の TP/FP/FN は `4/22/14`。
固定パラメータは Chromium の実 `AnalyserNode` byte trace と 60 Hz モデルの両方で quiet-zero / dense-positive
を満たすものを選んだため、純粋な calibration optimum ではない。nominal held-out hard gate でも選別した
gate-screened evidence であり、無偏な音楽 onset benchmark とは主張しない。

再現用の一時コマンド:

```powershell
uv run --no-project --with librosa==0.11.0 --with mir_eval==0.8.2 output/nt03-audio-eval/evaluate.py
```

一時スクリプトと全 grid JSON は `output/` にのみ置き、製品・リポジトリへ出荷しない。

## 視覚・runtime 回帰

変更前 production build の `qa:ninth-tide` manifest SHA-256 は
`9ee9de41f777f5427f945f0f94f2891e2b23f570f35a46631442830b27ab3f9f`。
最終 build の manifest SHA-256 は
`d4f3a0f9ef8f528dfa4de7138416d1d386b015fbf8d97e65b16c4975a19735b8`、app bundle SHA-256 は
`7631ca8e9ddaba36c064182ffd92b883797d3b88880b5e3f704fc84ba9b7ba9d`。

app SHA だけを正規化すると、変更前後の manifest は完全一致した。したがって 3 fresh runs × 11 states ×
3 same-page repeats の framebuffer hash、canvas hash、state digest、metrics、hit results、renderer audit は
すべて不変。連続 `transient` 視覚に回帰はない。

- `pnpm test`: 36 files / 289 tests pass
- `pnpm lint`: pass
- `pnpm typecheck`: pass
- `pnpm build`: pass
- production `pnpm qa:ninth-tide`: pass
- production `pnpm qa:exhibits`: pass。silent demand loading、autoplay retry、pause/visibility race、9章 bridge、console errors 0
- production `pnpm qa:visual`: pass。desktop/mobile、overflow/overlap、dim chrome、console errors 0
- 独立 verifier: targeted 10 tests、全量 gates、manifest と offline 数値を再検証し pass
- 独立 reviewer: buffering 時の media-clock/RAF 二重計時を指摘。修正・回帰テスト・差量復審後 approve

`pnpm exhibits:check` は committed `public/exhibits` の clean 状態を検査するため、生成物を含む実装 commit 後に
最終実行する。

## 参照

- [Web Audio API 1.1 — AnalyserNode FFT windowing and smoothing](https://www.w3.org/TR/webaudio-1.1/#fft-windowing-and-smoothing-over-time)
- [librosa 0.11.0 onset strength](https://librosa.org/doc/0.11.0/generated/librosa.onset.onset_strength.html)
- [librosa 0.11.0 onset detection](https://librosa.org/doc/0.11.0/generated/librosa.onset.onset_detect.html)
- [mir_eval onset matching](https://mir-eval.readthedocs.io/latest/api/onset.html)
- [uv running scripts](https://docs.astral.sh/uv/guides/scripts/)
