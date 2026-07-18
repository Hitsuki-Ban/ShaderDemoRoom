# Dependency policy

The showroom exact-pins every direct dependency in `package.json`. The lockfile records the complete resolved graph; it complements the manifest and is not a substitute for an intentional direct-dependency version.

## Routine changes

- Add packages with an explicit version and `--save-exact`, for example `pnpm add --save-exact package@1.2.3` or `pnpm add --save-dev --save-exact package@1.2.3`.
- Upgrade one package or one inseparable package family per pull request by naming every target version explicitly. Do not run `pnpm up --latest` or an unscoped bulk update.
- Commit `package.json` and `pnpm-lock.yaml` together. Review both the importer specifier and every resolved-version change before accepting the update.
- Run `pnpm install --frozen-lockfile` after the manifest and lockfile agree. CI uses the same frozen-lockfile contract.
- Review outdated packages quarterly. An available update is a prompt for an explicit upgrade task, not authority to change the dependency graph automatically.

## Three.js revision contract

`three` and `@types/three` move as one package family. Their patch numbers may differ, but their Three.js revision must match: `three@0.184.x` pairs only with `@types/three@0.184.x`. Updating only one member is not allowed.

Upgrade one Three.js revision at a time and use this checklist:

1. Record the current screenshots and water metrics under ignored `output/` paths.
2. Read the official [Three.js Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide) for exactly the current-to-next revision transition.
3. Select explicit versions for both `three` and `@types/three`, then update them together. Confirm the lockfile contains no unrelated resolved-version changes.
4. Run `pnpm test`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`. Treat a behavior-contract failure as a product regression until the changed runtime behavior is understood.
5. Run `pnpm qa:visual` for all four rooms. Compare transparency, render ordering, glass transmission, color, framing, mobile fit, console errors, and HUD overlap with the recorded baseline.
6. Run `pnpm qa:water` for default, storm, calm, and rain. Compare `waterCoverage`, `waterLuma`, `toonBandSeparation`, `hueMean`, and `colorSignature` with the recorded baseline.
7. Smoke every room through real controls:
   - Voxel Water: clear/rain/storm, storm/calm presets, and representative sliders.
   - Glass Optics: light/material sliders, Focus beam, and Crystal preset.
   - MIZU//KOKORO: load, Reload exhibit, representative phase interaction, and standalone view.
   - Ninth Tide Archive: audio and silent descent, Reload exhibit, and standalone view.
8. Summarize the migration-guide findings, observed before/after differences, and validation evidence in the commit and pull request.

## Other high-impact upgrades

React, Vite, Vitest, TypeScript, ESLint, Playwright, and pnpm major upgrades use the same one-family-per-PR discipline. At minimum they require unit tests, lint, typecheck, build, and visual smoke; runtime or rendering changes also require the relevant interactive and water QA.
