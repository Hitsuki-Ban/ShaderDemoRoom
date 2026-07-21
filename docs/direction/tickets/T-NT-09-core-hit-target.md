# [T-NT-09] 後半章の core hit target を可視形状へ一致させる

- 分類: UX / TA
- 優先度: P3
- 状態: **完了 (2026-07-22; PR #43)**
- 評価軸: モデル一貫性 / インタラクション
- 依存: T-NT-05

## 現状(証拠)

click/hover は可視 `core` 自体を raycast する。第VIII章 `[1.46,0.62,0.34]`、第IX章 `[0.48,0.48,0.48]` の scale により、虹彩/真珠として見える領域と hit area が一致せず操作が外れる。T-NT-05 の `hit-targets-v1.json` は viewport 1440×900 / DPR 1 / 章別固定 timestamp で全章の positive/negative 座標を固定し、section 7/8 の横方向 edge positive が現行 `beforeHit=false` であることを記録する。

## 本票の唯一の結果

**全9章で、同じ可視 core silhouette 内の座標が click と hover の双方に命中する。**

## 改善方向

1. 章別 shape と呼吸 scale から毎フレーム1つの raycast 用 proxy transform を更新する。
2. click と hover は同じ proxy raycast 関数だけを使う。可視 core への別 fallback は残さない。
3. proxy は描画せず renderOrder 網へ参加させない。hit area は `hit-targets-v1.json` の固定 viewport/timestamp/座標だけで検収し、座標の再選定、画面全体を覆う最小半径、guessed default を置かない。

## 受け入れ基準

- `hit-targets-v1.json` の section 0..8 全 positive で click/hover が一致し、section 7/8 の `beforeHit=false` 点が after で true になる。
- 同 fixture の全 negative は false のままである。
- archive toggle、cursor、pulse origin が同じ hit 結果を使う。
- T-NT-05 11状態の見た目が不変、`qa:exhibits` / `qa:visual` が通る。

## 影響範囲・注意

- interaction/visual hit consistency だけを所有する。未参照 marker の削除は最終 T-NT-06。
- ref/ で実装し exhibits を再生成する。

## 实施决策与疑问记录 (2026-07-22)

本节记录实施前出现的非阻塞疑问及裁定；当前没有需要人类判断的 BLOCK。

- “可见 core silhouette”不再按 solid core、energy body、wire 或 rings 中任一图层主观推断；固定 viewport/timestamp 的 positive/negative fixture 是唯一验收边界。`hit-targets-v1.json` 保持不可变，作为 T-NT-05 的 before 审计证据；新增单一 canonical schema v2，在同一坐标上同时记录 `beforeHit` 与 `expectedHit`。运行时/QA 只接受 v2，不增加 v1 fallback 或双 schema loader。
- proxy 跟随每帧 damp 后的实际 `core.scale` 与 `coreGroup` world transform，再应用按 v2 fixture 校准的章节扩张；不在章节切换时提前跳到目标 shape。这样 transition 中 hit 区域与当前画面同步，而非领先演出。
- proxy 只由无 Geometry/Material 的 `THREE.Object3D` transform、单位数学球和 scratch ray/matrix 构成；不加入渲染、renderOrder、GPU ownership/dispose 或 T-NT-07 quality-generation 生命周期。
- client 坐标统一按当前 renderer canvas rect 映射 NDC。click、desktop hover 与 deterministic hook 共享唯一 proxy predicate；不保留可见 `core` raycast fallback。click 命中 proxy 后仍使用原 world ray 检查 floor，因此 predicate 只变换 scratch ray，不改写调用者 ray。
- desktop fixture 是本票正典。coarse profile 仍按现有产品策略禁用 hover；mobile 不临时发明命中坐标，只验证 click/touch 共用 predicate，并在 desktop→mobile→desktop quality 往返后复验 VIII/IX，防止 proxy 随 tier 重建漂移。
- deterministic preview 不运行持续 RAF，旧 hover 只在 frame loop 内同步，导致真实 `pointermove` 无法即时更新 cursor。产品 pointermove 在非拖拽时改为立即调用同一 hover 同步函数，live RAF 继续幂等复核；QA 通过只读 interaction audit 检查 archive/hover/最新 user pulse，不提供写状态或替代演出入口。
- 独立验证发现 pointerup 会移除 cursor class 却保留 `coreHovered=true`，导致鼠标停在 core 上时后续同值比较无法恢复 cursor；初版 QA 还把该缺陷写成了 `cursorActive=false` 期望。修复后 pointerup 立即重跑同一 predicate，`updateHover()` 始终同步 state 与 class，门禁要求点击后 cursor 继续反映当前位置。
- 同一轮验证指出 desktop→819px→desktop generation 往返只证明 proxy 不随质量资源重建漂移，不能替代 coarse touch 行为证据。门禁因此另建 819×900、`hasTouch/isMobile` 的真实浏览器 context，对 VIII/IX 用按 canvas 比例映射的既有 canonical center 执行 trusted touch tap，要求 mobile/coarse profile、同一 hook 命中、archive branch 与 `(0,0)` user pulse 全部一致；不新增 mobile fixture 坐标或产品写入口。

## 实装・検証結果 (2026-07-22)

- `main.js` 将九章 shape 提升为单一常量，并增加无 Geometry/Material 的 persistent hit proxy。proxy 每帧复制 damp 后的可见 core scale，叠加 fixture 校准的章节扩张，并继承 `coreGroup` 的实时 world rotation；数学 ray 只在 scratch local space 与单位 sphere 相交，不改写 click 后续 floor ray。
- client→NDC 统一按 renderer canvas rect 映射；click、desktop hover 与 deterministic hook 全部调用唯一 `intersectsCoreHitProxy()`，原 `core` raycast fallback 已删除。非拖拽 `pointermove` 即时刷新同一 hover predicate，live frame loop 继续幂等同步 cursor。
- 历史 `hit-targets-v1.json` 保持字节不变，SHA-256 仍为 `78e04b66b9f258ba6c25fa265984c8939feae92a9f6e163a4e0ca2b1a435fd06`。新增唯一 canonical v2，保留全部 9×9 坐标与 `beforeHit`，新增 positive/negative 的 `expectedHit`，SHA-256 `7c74325aa5ecbcc603a24bf2794bd17cf2ad912a236dcf0d7853346174c490bd`；validator 只接受 schema 2，不存在兼容 loader。
- 新增 `qa:ninth-tide-hit-target` 并接入 Pages production visual QA。固定 1440×900 / DPR 1 下，9 章 81 点的 production hook、可信真实 desktop hover/cursor 与真实 click core branch 全部一致；positive 全部 toggle archive 且最新 user pulse origin 为 `(0,0)`，negative 全部保持 archive/core UI 且不发 core-origin pulse。VIII/IX 各完成 desktop→819px mobile tier→desktop quality generation 往返后再复验，并在独立 819×900 mobile/coarse context 通过 trusted touch tap smoke；console/page error 0，`archive.mp3` 请求 0。修复后 manifest SHA-256 `87ea9a6957f71cdf7b2244457ab29e97a9ca19f2d80cc9a89b483cddb8b402a8`。
- candidate app SHA-256 `6fe0b3420c92c7a798297a3706336d010bf2e355f0ffcd735647fe50d15714a8`，ref dist 与 public exhibit 字节一致。production `qa:ninth-tide` 的 opening、I..IX、ending 共 11 个 framebuffer hash 与 T-NT-08 基线逐项完全一致，manifest SHA-256 `04cc0acc5f5d395ce3d1314cfb575eb2f07dd5ae9b7d1977b7a9696e069cba68`，证明 proxy 未进入绘制结果。
- gates: `pnpm test`（43 files / 403 tests）、`pnpm lint`、`pnpm typecheck`、`pnpm build`、`qa:ninth-tide`（3 fresh browsers）、`qa:ninth-tide-hit-target`、`qa:ninth-tide-cycle`、`qa:ninth-tide-near-black` 全通过；cycle manifest SHA-256 `61a62712e3ed6c23f5c11ea6b5b211f9bb00b5388e9907c9093b13daee846050`，near-black manifest SHA-256 `9aa1c58deb16a9c9471dc10c3ac74207b2ef13dc1eee8d3fdb053aea63bf3d48`。

## PR・审查・合并报告 (2026-07-22)

- PR [#43](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/43) 以 exact head `c246fe9964f7ad07e7329f46ef49cf726ad058e3` 完成。独立 [ReviewReport](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/43#issuecomment-5038328975) 给出 `APPROVE`，P0–P3 finding 均为 0；审查者独立复跑 9章/81点及 VIII/IX trusted touch 门禁、3 runs/99 hooks 的11状态捕获、focused tests、bundle/source 同步与文档 delta。
- PR CI [run 29862702075](https://github.com/Hitsuki-Ban/ShaderDemoRoom/actions/runs/29862702075) attempt 1 在共享 `qa:visual` 的 URL-state hash 等待中遇到一次 runner 低帧率超时，尚未进入本票专项门禁；exact bundle 本地复跑该共享门禁通过，且改动不涉及 URL state。无代码/阈值变化的 attempt 2 随后通过 lint、typecheck、43 files / 403 tests、build、exhibit sync 与全部 production visual QA，包括新增 hit-target gate；PR deploy 按 workflow 条件正常跳过。
- 2026-07-22 squash merge 到 `main`，merge commit `2a9992ab4c451b56a97a222d0d89a6bc54575e02`。最终 Pages run、HTTP 与 live app hash 记录在同一 PR 的 [Final deployment report](https://github.com/Hitsuki-Ban/ShaderDemoRoom/pull/43#issuecomment-5038736027)，该评论在部署完成后原位更新。
