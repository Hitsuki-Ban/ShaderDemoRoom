# Shader Demo Room

A lightweight static showroom for technical-art shader experiments built with React, Vite, and Three.js.

The showroom currently ships four independent demo rooms:

- **Voxel Water**: toon-style voxel water with weather, rain, wind, wave-height, and toon-step controls.
- **Glass Optics**: transparent glass material with refraction/reflection controls and a movable light-path controller.
- **Anime Liquid Orb**: embedded NPR fluid specimen with the original full-screen shader runtime preserved in the shared showroom shell.
- **Ninth Tide Archive**: embedded audio-reactive archive scene with a silent-entry path for static visual QA.

The app is designed for GitHub Pages:

- Hash-based routing for static hosting.
- Vite `base` configured from `GITHUB_REPOSITORY` during Actions builds.
- GitHub Actions workflow publishes `dist` to Pages.
- Room scenes and room controllers are owned by each demo module, while base UI and design tokens stay shared.
- Complex external exhibits can be mounted as static iframe rooms from `public/exhibits`.

## Development

```powershell
pnpm install
pnpm dev
```

Preview the production GitHub Pages path after a build:

```powershell
pnpm build
pnpm preview
```

## Verification

```powershell
pnpm test
pnpm lint
pnpm build
pnpm qa:visual
```

## Architecture

```txt
src/
  app/              Shared app shell and routing
  rooms/            Independent demo rooms and registry
  shared/embedded/  Static iframe exhibit mounting utilities
  shared/i18n/      Lightweight translation seam
  shared/three/     Persistent renderer and runtime contracts
  shared/ui/        Shared controller primitives
  styles/           Design tokens and layout styles
public/exhibits/    Static embedded exhibit runtimes copied into dist
```

See [docs/design/showroom-design-framework.md](./docs/design/showroom-design-framework.md).
