# [T-GO-02] ステージングを再設計する(ダーク反射床・グリッド抑制・デッドスペース解消)

- 分類: AD
- 優先度: P1
- 評価軸: 構図 / 値構造 / ヒーローショット成立性
- 依存: T-GO-01(renderer profile と性能基線を確定) / T-GO-04(固定2-batch光路と15-call基線を確定)。両票完了後に着手する。T-GO-03 は本チケットの床値設計を前提とし、T-GO-06 はダークフィールド env の完成を前提とする

## 現状(証拠)

- **床が「デフォルトの灰色の虚空」**: `src/rooms/glass-optics/runtime.ts:164-174` — `PlaneGeometry(16,16)` + `MeshStandardMaterial{ color: 0x121c26, metalness: 0.1, roughness: 0.5 }`。マットで無個性な平面が画面下半分を占有する。visual-current 批評(dossier-glass-optics.md「ビジュアル現状評価」)は Wow 5/10 の主因にステージの虚無感を挙げ、**「ダークな反射する床とより強いコースティクスのホットスポットだけで安価に 2 ポイント稼げる」**と明言している。
- **グリッド中心線が床の最輝要素**: `runtime.ts:176-184` — `GridHelper(16, 32, 0x42e9ff, 0x163949)`、opacity 0.28、depthWrite false。シアンの中心線がコースティクスプール(デフォルト位置 x≈0.8-1.6 帯)と輝度競合する(dossier リスク 13)。ダークフィールドの文法では被写体以外の明部はノイズ(research-glass-optics.md §2.9「床の整理」)。
- **左下デッドスペース**: カメラは `runtime.ts:150-151` で (5.9, 3.35, 6.4) → lookAt(0, 1.05, 0) に完全固定(OrbitControls なし)。批評は「構図は左寄りで左下にデッドスペース」と指摘。面積配分が興味の配分と一致していない(構図軸の不合格)。
- **環境が汎用 RoomEnvironment**: `runtime.ts:154-156` — `pmrem.fromScene(new RoomEnvironment(), 0.04)`。汎用の白い部屋の env はガラスの輪郭に効かず、輪郭可読性をワイヤーフレームシェル(T-GO-06 の対象)で人工的に補っている(research §1 表 #9)。
- **背景・フォグ**: `runtime.ts:148-149` — `Scene.background = 0x071018` / `Fog(0x071018, 16, 34)` の単色ニアブラック。被写体背後に明度の分離がない。

## 問題

展示の主役(ガラス球と光路)以外の画面要素がすべて「未演出のデフォルト」に見え、光学ドラマの受け皿になっていない。焦点・値構造・構図の 3 軸で興味配分が崩れており、公開スクリーンショットの第一印象を最も安価に引き上げられる箇所が手つかずのまま残っている。

## 改善方向

research-glass-optics.md §2.9(ダークフィールド・ライティングの定石)に従い、「黒背景のガラスはエッジのハイライトで形を読ませる」文法へステージ全体を寄せる。

1. **ダークフィールド env への差し替え**: RoomEnvironment を、黒地に縦長ストリップライト 2-3 本(冷色シアン + 暖色アンバーで既存の補色システムを強化)だけを置いたカスタムシーンの PMREM に差し替える。ガラスの左右輪郭に細く鋭い反射が立ち、床のスペキュラの光源にもなる。PMREM ベイクは現行同様起動時 1 回でランタイムコスト不変。
2. **床を「暗い反射床」へ**: 床マテリアルを低 roughness・高 metalness 側へ振り、ストリップ env の写り込みで「磨かれた黒床」を成立させる(追加パスなしのフェイク反射。ポストプロセスや Reflector 経路は追加しない)。アルベドは現行 0x121c26 からさらに落とし、コースティクスとビーム着地点が床の最輝要素になる値関係を作る。
3. **グリッドの主張抑制**: 中心線色 0x42e9ff の彩度・明度を落とすか中心線を消し(GridHelper の colorCenterLine)、全体 opacity を 0.28 から低減。もしくはグリッドを外周のみのフロアマーキングに置き換え、コースティクス周辺 2m を無地に保つ。
4. **背景の分離**: 注視点背後に、起動時に焼いたラジアルグラデーションテクスチャを貼る背景平面を1枚追加する。シェーダー経路との選択肢は設けず、中心だけをわずかに明るくしてガラスの暗部形状を背景から分離する。
5. **構図の再フレーミング**: 固定カメラの位置/注視点を微調整し(例: lookAt をコースティクス側へ寄せる、FOV/位置の再調整)、左下デッドスペースを潰す。要素配置(コースティクス初期位置 `runtime.ts:342` (0.8, 0.02, 0.4)、パネル位置)側での解消も併用可。ヒーローショット(デフォルト設定のデスクトップキャプチャ)で「主役 3 秒テスト」を通す構図を正とする。
6. **比較キャプチャの決定論性**: `autoRotate=false` では root sway も停止させ、`root.rotation.y = 0` を設定適用時と各 render で維持する。OFF にした瞬間の位相を保持する挙動は採用しない。通常環境・reduced-motion のどちらでも同じ静止姿勢を基準画像に使う。

## 受け入れ基準

- **視覚基準(スクリーンショット比較)**: デフォルト設定のデスクトップ 1440×900 キャプチャで、(1) 床にストリップライト/ガラスのスペキュラが読めること、(2) 床の最輝要素がグリッド線ではなくコースティクス(または屈折ビーム着地点)であること、(3) 左下 1/4 領域に意味のある要素(床の反射・グラデーション・コースティクスのいずれか)が入ること。
- **値構造**: キャプチャのヒストグラム検分で、背景 / 床 / ガラス・ビーム系の 3 階調が分離していること(ニアモノトーン圧縮の禁止)。サムネイル縮小(25%)でもガラス球・ビーム・コースティクスが判別できること。
- **数値基準**: telemetry(`data-telemetry-json`)で FPS が T-GO-01 hardware 基線から ±5% 以内。T-GO-04 完了時の15 callsへ背景平面1 drawだけを追加し、シーン総 draw calls は **16** とする。
- **envMapIntensity 再チューニング**: env 差し替え後、thickness スライダー全域(0.2-2.4)でガラスが白飛び/黒潰れしないこと(`envMapIntensity = 1.55 + thickness*0.42`、`runtime.ts:371` の係数再較正を含む)。
- **決定論的静止**: `autoRotate=false` で入場 1 秒後と 11 秒後の同一 viewport キャプチャがピクセル一致し、root の Y 回転が常に 0 であること。`autoRotate=true` では回転が観測されること。
- **QA 通過**: `pnpm qa:visual`(console error 0 / overflow 0 / HUD overlap 0)、`pnpm test` / `pnpm lint` / `pnpm build` 通過。

## 影響範囲・注意

- **T-GO-03 との値設計共有**: コースティクスの「床より明るい」関係は床アルベドと相対で決まる。床の目標輝度を先に確定し、T-GO-03 の強度カーブはその上に載せる(逆順だと二度調整になる)。
- **T-GO-06 の前提**: ワイヤーフレームシェルの削減はダークフィールド env が輪郭を担えることが条件。本チケット完了後に T-GO-06 で判断する。
- **挙動テスト**: `runtime.test.ts` は現在マテリアル・光路の挙動のみ固定しており、床・グリッド・env の定数変更でテストは壊れない(T-QA-01 済み)。新たに値関係(床 vs コースティクス輝度)をテスト化する場合は QA スクリプト側(キャプチャのピクセル検分)に置く。
- **トークン体系**: 床・グリッド・背景の hex はシーン内アート定数であり CSS トークン(T-DS-01)の対象外だが、`Scene.background` はシェルの `--bg` と視覚的に連続する。差し替え後もルーム切替時のフラッシュが出ないことを確認する。
- **envMapIntensity の単一ソース化**: env 差し替え時にコンストラクタ初期値と更新式を一本化し、生成直後に無条件上書きされる値を残さない。
- **stageProfile**: shell chrome は `default` のまま(`src/rooms/registry.ts:59`)。シーン内の暗化はシェル chrome(T-SH-04 の dim)とは別レイヤーであり、registry には触れない。

## 作業報告 (2026-07-20)

- PR: [#32 `[T-GO-02] Redesign glass optics stage`](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/32)
- 実装: 汎用 `RoomEnvironment` を黒地 + 冷色/暖色/トップの 3 本ストリップによる一回限りの PMREM に置換し、ラジアル背景、低 roughness の反射床、抑制したグリッド、固定カメラの再フレーミングを導入した。背景平面 1 draw を含む総 draw calls は全検証状態で 16。`envMapIntensity` は thickness を入力とする単一関数へ集約した。
- 決定論性: `autoRotate=false` の適用時点で即座に canonical pose と shader time をゼロへ戻し、通常環境/reduced-motion とも 1 秒後・11 秒後の canvas 差分は mean/max/strong pixels すべて 0。`autoRotate=true` の正例では mean delta 1.518 を観測した。
- 視覚 QA: 8 状態を 1440×900 で検証。thickness 0.2/2.4 の glass-disc マスクで白飛び・黒潰れなし、25% 縮小時も glass/background p99/p95 比 4.168、caustics/grid mean 比 2.223 を維持。デフォルトの caustics p99 は 110.35、floor 61.39、grid 8.44 で、左下の意味領域 coverage は 0.366。
- 安定性/性能: thickness drag 前後で 16 calls / 25 geometries を維持し、禁止 allocation 0、console error 0。`b63b3dd` との 5 組 interleaved production 比較の paired median は **-0.83%**（許容上限 +5%）。hardware reference は 163.36 FPS。
- 証拠: `docs/direction/captures/t-go-02-default-after.png`、`t-go-02-thickness-0-2.png`、`t-go-02-thickness-2-4.png`、`t-go-02-glass-qa-2026-07-20.json`、`t-go-02-telemetry-2026-07-20.json`。
- 検証: `pnpm lint`、`pnpm typecheck`、`pnpm test`（33 files / 237 tests）、`pnpm build`、`pnpm exhibits:check`、`pnpm qa:visual`、`pnpm qa:renderer`、`pnpm qa:glass` を通過。独立レビューで指摘された 2 件の P2（OFF 切替直後の pose reset、hero/thumbnails の ROI）を修正し、delta review は APPROVE、独立 test verification は PASS。
