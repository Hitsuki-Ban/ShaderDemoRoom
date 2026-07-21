# [T-NT-08] 静默周回でも IX→終幕→I の物語遷移を成立させる

- 分類: AD / TA
- 優先度: P3
- 状態: **実装中 (2026-07-22)**
- 評価軸: ストーリーテリング / 状態機械
- 依存: T-NT-05

## 現状(証拠)

静默入場は約118秒の仮想 musicTime を modulo 周回するが、`updateEnding()` は実 audioReady/duration を条件にする。このため静默経路は終幕を発火せず、第IX章から通常遷移で第I章へ戻る。

## 本票の唯一の結果

**静默 clock も既存の ending state machine を1回通り、IX→shutdown→epilogue→I の順序を決定論的に実行する。**

## 改善方向

1. ending の開始条件を clock source から分離し、audio clock と silent clock が同じ state machine/`finishEnding()` を呼ぶ。
2. silent 専用 ending の複製、IX→I の直接 fallback、preview 専用の別演出は作らない。
3. reduced-motion は同じ状態遷移で duration だけ既存方針に従う。

## 受け入れ基準

- synthetic clock で一巡させ、IX→shutdown→epilogue→I が各1回・同順序で発火する。
- audio 経路と silent 経路の状態列が一致し、二重 ending/直接 wrap がない。
- `?preview=ending` と T-NT-05 11状態が再現し、console error 0。

## 影響範囲・注意

- 状態機械の挙動だけを所有する。near-black の見た目は T-NT-04、audio fetch は T-NT-10。
- ref/ で実装し exhibits を再生成する。

## 实施决策 (2026-07-22)

本节记录实施前调查中出现的疑问及结论；当前没有需要人类判断的 BLOCK。

- “epilogue→I”沿用现有交互，定义为用户在 epilogue 点击 replay 或按 Space 后回到 I；不新增无依据的自动超时回卷。replay 保留上一轮明确选择的 `audio` / `silent` clock source，静默 replay 不请求 `archive.mp3`。
- 每轮体验拥有显式 `clockSource: 'audio' | 'silent'` 与 session-local round origin。silent position 从用户进入/重播时的 active `THREE.Timer.getElapsed()` 锚定，118 秒内单调映射到完整 visual score，并在终点 clamp；页面进入前等待、document hidden 与 host pause 都不计入本轮故事时间。
- audio/silent 只提供 canonical visual-score position，不拥有 ending 分支。`updateEnding()` 是唯一终幕 reducer：shutdown 单调不减，cue cursor 只能 `0→1→2→3`，所有跨越阈值的事件必须按序补齐；视觉终点样本与原生 `ended` 事件都汇入同一幂等 finish，不得直接跳过 withdrawal/cues。
- audio clock 只有在 media duration 为正有限数时成立；metadata pending 是显式 pending 状态，不以 `scoreDuration`、118 秒或其他 guessed duration 替代。未知 clock source、非法 duration/elapsed、elapsed 早于 round origin 均 fail fast。
- reduced-motion 不改变 118 秒 score、ending 状态图、阈值、cue 顺序或 epilogue dwell；只保留现有 opening 校准时长差异。`?preview=ending` 继续固定在既有取景状态，不 finish、不 replay、不请求音频。
- QA 使用生产 clock adapter/reducer 的只读审计序列，覆盖 normal/reduced-motion、进入前 idle、IX→shutdown→3 cues→epilogue、同源 replay→I、silent 零音频请求，以及终点/`ended` 竞争下 finish 恰好一次。Playwright fake clock 不推进 `HTMLMediaElement.currentTime`，因此 audio/silent 等价由同一 reducer 的单元/浏览器审计输入验证，真实音频只保留 metadata/ended smoke；不增加可写 QA clock 或第二套演出路径。

## 实装・検証結果 (2026-07-22)

- `visual-score-clock.js` 新增 118 秒 silent→354.504 秒 visual score 的单调 clamp 映射，以及唯一的 ending reducer。reducer 严格补发 `shutdown-start → outer-silence → echo-reverses → last-light → finish`，终态为吸收态；原生 `ended` 后下一帧 media duration 修正导致的略短 position 也不会二次 finish，未完成态的时间倒退仍 fail fast。
- `main.js` 将体验时钟改为显式 `audio` / `silent` source 和每轮 active-timer origin。silent 不再 modulo；进入前 idle、document/host pause 不计入故事时间；replay 保持上一轮 source，并在重置时取消旧 epilogue timer。media `ended` 只向同一 reducer 提交终点样本，不能绕过 IX、withdrawal 或 cue。
- metadata 未到时 audio duration 是显式 pending；metadata 已到而 duration 非正或非有限时立即报错，不用 visual-score duration 猜测。opening/main/ending preview 使用明确的 preview score；`?preview=ending` 仍固定在原取景状态且不 finish。
- 新增只读 `?qa=cycle` 审计 hook 与 `qa:ninth-tide-cycle`，并接入 Pages production visual QA。normal 与 reduced-motion 都在进入前 idle 5 秒后得到相同状态序列 `enter → I → IX → shutdown → 3 cues → finish → epilogue`；每轮 `finishCount=1`。silent replay 回到 I、source 保持 silent、`archive.mp3` 请求 0；真实音频 metadata→IX→native `ended` 同序完成，三个场景 console/page error 均为 0。
- 最终 candidate app SHA-256 为 `489bc5c5f1cf33cebc7083fee6d019f8d81167355d02649f620928dabdc93652`，ref dist 与 public exhibit 字节一致。cycle manifest SHA-256 `263466334327590228ac061ebc7c6a5898e3b704a06186ce648a3de5c839afc0`；11-state manifest `23d9e376cb2cfb398d9904470f5989574b480e0c4cf26235c9490e0a866a9d77`；near-black manifest `bdc64de5d491fd629c21d1c5558e5faaaa071fced98e186c6101d33ef7d8ebe2`。
- gates: `pnpm test`（43 files / 402 tests）、`pnpm lint`、`pnpm typecheck`、`pnpm build`、production `qa:ninth-tide`（3 fresh browser runs × 11 states × repeats）、`qa:ninth-tide-near-black`（5 captures）、`qa:ninth-tide-cycle` 全通过。提交后继续执行 exhibit sync、PR CI、独立 exact-head review 与部署验证。
