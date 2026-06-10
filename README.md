# Shader Demo Room

A lightweight static showroom for technical-art shader experiments built with React, Vite, and Three.js.

The first milestone ships two independent demo rooms:

- **Voxel Water**: toon-style voxel water with weather, rain, wind, wave-height, and toon-step controls.
- **Glass Optics**: transparent glass material with refraction/reflection controls and a movable light-path controller.

The app is designed for GitHub Pages:

- Hash-based routing for static hosting.
- Vite `base` configured from `GITHUB_REPOSITORY` during Actions builds.
- GitHub Actions workflow publishes `dist` to Pages.
- Room scenes and room controllers are owned by each demo module, while base UI and design tokens stay shared.

## Development

```powershell
pnpm install
pnpm dev
```

## Verification

```powershell
pnpm test
pnpm lint
pnpm build
```

## Architecture

```txt
src/
  app/              Shared app shell and routing
  rooms/            Independent demo rooms and registry
  shared/i18n/      Lightweight translation seam
  shared/three/     Persistent renderer and runtime contracts
  shared/ui/        Shared controller primitives
  styles/           Design tokens and layout styles
```

See [docs/design/showroom-design-framework.md](./docs/design/showroom-design-framework.md).
