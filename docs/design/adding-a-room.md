# Adding a room

This guide is the source of truth for the RoomRuntime v2 boundary. A room owns its art and GPU resources; the shell owns navigation, the persistent renderer, animation scheduling, accessibility preferences, and telemetry.

## 1. Choose the room kind

- A native shader room provides `state.ts`, `runtime.ts`, `Controls.tsx`, and any room-local shaders or assets.
- An embedded exhibit provides a static entry point under `public/exhibits/` and declares only the iframe permissions it needs.
- Add one typed entry to `src/rooms/registry.ts`. Keep the id unique, add governed `techTags` and an accent token, and lazy-load controls and native runtime code.
- Put visible copy in both locale catalogs under `rooms.<camelCaseId>.*`. Do not put user-facing strings in the runtime or controls.

`defaultPreset` is deeply readonly. Initial settings and resets are created with `structuredClone`; never retain a mutable registry default or mutate a settings argument. Return a new settings object from a control change.

## 2. Implement RoomRuntime v2

A native runtime receives a restricted context:

```ts
createRoomRuntime(
  { canvas, renderer, createPmremGenerator, motionScale },
  initialSettings,
)
```

Implement every required method:

- `updateSettings(readonlySettings)` applies a new immutable snapshot.
- `setMotionScale(scale)` stores live accessibility changes separately from settings.
- `resize({ width, height, pixelRatio })` updates room cameras and render targets.
- `render({ elapsed, delta })` renders one logical frame through the restricted renderer facade.
- `dispose()` releases every room-owned geometry, material, texture, render target, listener, and helper.

`pause?()` and `resume?()` are optional hooks for room-owned clocks, audio, or workers. The shell stops the animation loop before `pause` when the document is hidden or the active route is embedded, calls `resume` before restarting, and discards paused wall time. `dispose` remains terminal; it is not a pause substitute.

## 3. Respect shared renderer ownership

The shell snapshots and restores the shared renderer around every runtime session, including creation and resize failures. The governed state is `toneMapping`, `toneMappingExposure`, `transmissionResolutionScale`, `outputColorSpace`, clear color and alpha, `autoClear`, and its color/depth/stencil subflags.

Room code must not receive or recover the raw `WebGLRenderer`. In particular:

- Do not access `renderer.info`, change `info.autoReset`, or call `info.reset()`.
- Do not start an animation loop or create another WebGL renderer/context.
- Render through `context.renderer.render(scene, camera)`.
- Request PMREM through `context.createPmremGenerator()` and dispose the returned generator and environment texture.
- Do not depend on renderer state left by another room. Per-room tone mapping and exposure belong to the stage-profile mechanism tracked by T-SH-04.

The shell keeps `renderer.info.autoReset = false`. For each logical frame it renders all passes, samples total calls and triangles, resets info, then reports the current telemetry window. A room must not report or reset telemetry itself. Window lengths, p95 warm-up, renderer classification, and QA records are defined only in [Shell telemetry protocol](./telemetry-protocol.md).

## 4. Apply motionScale only to motion

Use an integrated animation clock such as `motionElapsed += delta * motionScale`. Multiply velocity increments by the same scale. Apply it to waves, rain travel, camera drift, rotation, particles, and other time-derived movement.

Do not multiply color, geometry dimensions, user settings, visibility, or simulation configuration by `motionScale`. A live operating-system preference change must alter speed without an animation phase jump. The shell maps normal motion to `1` and reduced motion to `0.15`. The reserved future iframe message name is `shader-demo-room:motion-preference`; native runtimes must not emit or consume it.

## 5. Register QA coverage

Before submitting a room:

1. Add behavior-based unit tests for settings domains, shader/uniform bindings, resource ownership, and runtime-specific invariants.
2. Add the room to desktop and relevant mobile cases in `scripts/visual-smoke.mjs`; selectors must use stable ids or test ids, never localized labels.
3. If lifecycle behavior changes, extend `scripts/renderer-lifecycle.mjs` and verify one persistent canvas/context, active shader loops, and stopped embedded loops.
4. Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm qa:visual`, and `pnpm qa:renderer` against a production preview.
5. For motion-heavy native rooms, run `pnpm qa:motion` or add an equivalent region metric. Use Playwright reduced-motion emulation and record the calibrated normal/reduced budget.
6. Document intentional visual changes and representative metrics in the ticket report. Do not update a baseline until the visual difference has been reviewed.

Room-specific stage lighting, renderer profiles, and shell surface treatment are defined by T-SH-04; this runtime contract is the isolation layer they rely on.
