# Shader Demo Room Design Framework

## Product Shape

Shader Demo Room is a technical-art workbench, not a marketing site. The first screen is the actual showroom: a full-bleed WebGL viewport, a compact room rail, a top status bar, and a room-owned inspector. The interaction model borrows from online exhibitions: rooms are discrete chapters, deep links are shareable, and the 3D canvas is paired with DOM controls rather than trying to make every UI element spatial.

Reference concept: `docs/design/primary-showroom-concept.png`.

## Locked Decisions

1. **Static-first deployment**: the app must run as a GitHub Pages static site with no backend, secrets, or server rewrites.
2. **Hash routing**: room URLs use the hash path, so direct links work on Pages without custom 404 routing.
3. **Persistent renderer**: React switches room runtimes, but the app owns one persistent WebGL renderer and canvas container.
4. **Room-owned controls**: every room exports its own controller component and runtime while using shared UI primitives and tokens.
5. **i18n seam from day one**: all visible copy flows through `t(key)`. English is the default source language; additional locales can be added without changing room code.

## Layout

- Left rail: room navigation, technical tags, and compact descriptions.
- Center viewport: the active Three.js scene with a minimal scene HUD.
- Right inspector: room-specific controls composed from shared `SliderControl`, `ToggleControl`, `SegmentedControl`, and action buttons.
- Top bar: title, static deploy status, current room, and language switch.
- Mobile: rail and inspector stack under the viewport so the canvas remains usable.

## Room Contract

Each room owns:

- `state.ts`: default settings and typed settings.
- `runtime.ts`: `createRoomRuntime(context, initialSettings)`.
- `Controls.tsx`: controller UI for the right inspector.
- optional shader files and room-local assets.

Each runtime must implement:

- `updateSettings(settings)`.
- `resize(size)`.
- `render(frame)`.
- `dispose()`.

This keeps future rooms composable without turning the app shell into a shader-specific monolith.

## Visual System

The shared design system uses dark graphite surfaces, cyan/teal technical highlights, amber warning accents, thin borders, and square controls with radius at or below 8px. Room modules can set local accent colors, but they should not define new button, slider, panel, or typography styles.

## Initial Room Scope

### Voxel Water

The water room demonstrates stylized wave bands, stepped voxel columns, rain density, wind speed, storm lighting, and toon quantization. It favors legible shader behavior over physical ocean accuracy.

### Glass Optics

The glass room demonstrates transparent material tuning, reflection/refraction appearance, a movable light source, and simplified light-path visualization. It is an explanatory visual simulation, not a physically exact ray tracer.

## Gemini Summary

Gemini highlighted four risks: repeated WebGL context creation, GPU resource leaks on room switches, global state contamination between controllers, and pointer-event conflicts between a full-bleed canvas and DOM panels. Its key recommendations were to keep one app-level renderer, define a strict room control/runtime interface, require explicit disposal of room resources, and use hash routing for GitHub Pages.

## Integrated Conclusion

The implementation follows those recommendations with one persistent renderer, room runtime lifecycle methods, shared UI primitives, HashRouter, and a lightweight i18n interface.
