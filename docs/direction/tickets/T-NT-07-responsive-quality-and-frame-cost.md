# [T-NT-07] resize 後の品質 tier と定常フレームコストを正しく更新する

- 分類: TA
- 優先度: P3
- 状態: **実装・ローカル検証完了 (2026-07-21; PR 待ち)**
- 評価軸: 対応環境 / フレームバジェット
- 依存: T-NT-05

## 現状(証拠)

`isMobile` はロード時の `isCoarse || innerWidth < 820` で固定され、resize は pixelRatio の一部しか再評価しない。また `updateCamera()` の毎フレーム `Vector3` 生成と、値が変わらない CSS custom property の毎フレーム書き込みが定常コストを作る。

## 本票の唯一の結果

**viewport/DPR 変更後も現在の品質 tier が一意に再計算され、静止フレームで不要な allocation/style write が0になる。**

## 改善方向

1. tier 判定を単一関数にし、初期化と resize/DPR change が同じ現在値を使う。ロード時 const や旧 tier 維持 fallback は残さない。
2. tier 変更時は renderer、composer、pixelRatio と tier 依存 geometry/particle assets を同じ transaction で再構築・dispose する。部分更新や reload 案内へ逃がさない。
3. camera target は既存 scratch vector を再利用する。CSS property は整形後の前回値と異なる時だけ書く。

## 受け入れ基準

- 820px 閾値と DPR を往復すると desktop/mobile の全 tier 所有値が現在条件へ一致し、旧 asset が dispose される。
- 静止状態でフレーム毎 `Vector3` allocation 0、変化のない CSS `setProperty` 0。
- T-NT-05 の11状態に意図しない視覚差がなく、同一環境 frameTimeMs が退行しない。
- resize stress 後も console error 0、`qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- performance/quality だけを所有する。音声、静默周回、raycast、dead code は扱わない。
- ref/ で実装し exhibits を再生成する。

## 实施决策 (2026-07-21)

本节记录实施前调查中出现的非阻塞疑问及其结论；当前没有需要人类判断的 BLOCK。

- 质量判定只有一个纯 `QualityProfile`：`coarse || width < 820` 为 mobile，否则为 desktop；DPR 只决定 profile 的有效 pixel ratio，不增加隐式 tier。
- 监听 `window.resize`、`(pointer: coarse)` media query change，以及按当前 DPR 重绑的 resolution media query change。事件只合并调度一次 reconcile，reconcile 必须重新读取并严格校验当前 width、height、DPR、coarse；不监听 `visualViewport.resize`，避免把 pinch zoom/软键盘误判为质量变化。
- desktop/mobile pulse 容量保持 `5+3=8` / `2+2=4`，同一 profile 同时驱动 history、uniform arrays、GLSL array length 与 loop bound。不能为了少重建而常驻 8 槽 shader。desktop→mobile 按 serial 保留 system/user 各自最新两项；mobile→desktop 保留现有项并留下空槽。
- 跨 tier 使用可整体替换的 `QualityRuntime` generation，事务内同时重建 tier-owned assets、pulse-dependent materials、renderer/WebGL context、composer 与完整 pass chain。`antialias` 是 context 构造属性，因此 desktop/mobile 切换必须替换 canvas/context；同 tier 的 viewport/DPR 更新不重建 geometry 或 context。
- scene、camera、音频/作品时钟、交互状态、palette、共享纹理、platform/lights 保持稳定。所有直接或因全局 PRNG 调用顺序间接依赖 tier 的资产都纳入固定 seed generation；同一 profile 往返必须得到与直接启动相同的静态构图。
- stage 完整生成并校验后才原子提交；成功后每项旧 owner 只 dispose 一次并永久 loss 旧 context。stage/commit 失败时清理新 generation、停止 RAF 并抛错，不继续运行旧 tier，不 reload，也不使用 fallback/兼容路径。
- DPR-only 更新必须同时更新 renderer 和 composer 的公开 pixel-ratio/size API；值未变化时不得调用 resize API。
- 每帧 CSS custom property 全部通过“格式化结果变化才写入”的单一 writer；camera target 使用持久 scratch `Vector3`。
- 新增浏览器质量门禁覆盖 819↔820、coarse 与 DPR 往返、资源一次性销毁、单 canvas/context plateau、静止帧 CSS 写入 0、camera 热路径 allocation 0、console error 0，以及 T-NT-05 十一状态视觉不漂移。
- paired frame-time 的 baseline 临时 preview 原计划使用 4174/4175，但两端口均已由非本任务的既有 Vite 进程占用，且 4174 的目标路径为 404。验证不终止未知进程，最终用经只读确认空闲的 4177 并启用 `--strictPort`；端口不属于测量变量，baseline/candidate 仍由完整 revision 与 bundle SHA 固定。
- 首轮 `qa:exhibits` 完整通过后，同一串行命令内的 `qa:visual` 在 URL-state `waitForHash` 等待 30 秒超时；此前没有 console/page error，失败点也不位于 Ninth Tide。隔离重跑 `qa:visual` 用 210.6 秒完整通过，URL state、14 captures、console error 0、mobile overflow false、HUD overlap false；因此记录为长串行套件后的单次调度抖动，不改产品代码、不放宽 30 秒门槛。
- 最终 verifier 发现 pulse manifest 原 schema 没有 app SHA，只能以同 URL 和执行顺序间接关联 candidate。该证据缺口不留作隐含假设：pulse gate 改为在启动浏览器前严格 fetch `app.js` 并记录 bytes/SHA，重跑后以 manifest 内的 `ae65b19d…` 直接固定 candidate。

## 实装・検証結果 (2026-07-21)

- `quality-profile.js` 将 819/820、coarse pointer、DPR cap、antialias、pulse 容量及全部 tier-owned asset 数量收敛为单一深冻结 profile；`pulse-history.js` 改为显式容量契约，并在 8↔4 slots 时按 serial 投影最新 system/user pulse。
- 跨 tier 使用固定 seed 的 generation transaction，同步替换 pulse-dependent materials、geometry/particles、renderer/context、composer 与 `RenderPass → Bloom → Afterimage → Veil → DitheredOutput`。stage 保持 live pulse/random 不变；commit 先预检，拒绝路径一次性释放 55 项 staged 资源并 loss context，不沿用旧 tier fallback。
- 同 tier 只在 effective DPR 或 width/height 真正变化时调用公开 sizing API；DPR `2→3` 在 desktop cap `1.6` 下四个 renderer/composer sizing 计数保持不变。deterministic step/dither 与 quality reconcile 互斥，generation 切换后重新捕获 deterministic baseline。
- camera 热路径改用持久 scratch `Vector3`；全部逐帧 CSS custom property 经 change-only writer。sonar pillar 的初始与重建实例矩阵都保持 `DynamicDrawUsage`。
- 新增 `qa:ninth-tide-quality` 并接入 Pages production QA。最终 36 steps / 30 次额外 tier stress 全通过：generation `1→33`、desktop/mobile pulse slots `8/4`、单 canvas、完整 asset counts、antialias 与 drawing/composer buffer 一致、renderer memory plateau `55 geometries / 18 textures`、静止帧 custom-property write 最大值 `0`、console/page error `0`。原始 manifest 150,695 bytes，SHA-256 `14872644bea60bff4a3e5f6ac48367713ce76a9c7f5a9baf5c4d22ef5bd5e602`；固化摘要为 `docs/direction/evidence/t-nt-07-quality-manifest.json`。
- paired performance 对 `origin/main@c92fccb2ed5a067613923c003595644834db9749` 与 candidate app `ae65b19d4b6ca860c2ebe410340d1afd664e77886b96c7f8caa0b08a25b9f45d` 做 5 对 AB/BA。Chrome 150 / RTX 4070 Ti / D3D11 下 bridge paired median `+0.609756%`、cadence `+0.075873%`，均通过 `≤ +5%` gate；原始 performance SHA-256 `4b493a3f54e7e78dfdd6c82626add849b82a4a1ae2dd91235616771409050083`。
- 独立 review 首轮提出 4 项：commit 拒绝清理、deterministic 并发、pillar dynamic usage、cap 后无效 resize。全部修复并机械化后，delta reviewer 给出 **APPROVE，无剩余 P0–P3**。
- gates: `pnpm lint`、`pnpm typecheck`、`pnpm test`（43 files / 381 tests）、`pnpm build`、`pnpm qa:ninth-tide`（11 状态）、`pnpm qa:ninth-tide-pulses`、`pnpm qa:ninth-tide-dither`、`pnpm qa:ninth-tide-near-black`（5 captures）、`pnpm qa:ninth-tide-quality`、`pnpm qa:exhibits`、隔离 `pnpm qa:visual` 全通过。`exhibits:check` 在未提交 public bundle 时按 dirty-tree 契约失败，但 `ref/.../dist/app.js` 与 `public/.../app.js` 字节一致；提交后复跑。
- QA manifests: 11-state `0bd098d58225548a1c9a3b6c5a299b21414476774d7332e29b454d7092aa6329`；pulse `9192bda49721587a9e72cdedf8d0480b625da2c7b7fb4664a6f31b4f04df5908`（manifest 内 app SHA `ae65b19d…`）；dither `80947c4803a34573af37dff992063f2d87e30ad6e7a32bc07c9eb8289e0dd9ef`。
