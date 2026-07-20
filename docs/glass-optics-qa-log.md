# Glass Optics QA Log

## Baseline observations

- Default and preset states render the light path as a single-pixel line, so the beam is hard to read against the floor grid.
- The light source starts close to the left edge or outside the framed viewport, which weakens the movable-light interaction.
- The glass body reads as a smoky gray sphere because there is no strong refracted reference target behind it.
- Caustics are visible only as a faint floor glow and are not clearly tied to the refracted ray.
- The floor grid has higher visual weight than the exhibit object.

## Historical working hypotheses (superseded by T-GO-04)

- Tube-based emissive beam geometry will make incoming, reflected, and refracted paths readable without adding post-processing.
- A lightweight animated reference panel behind the glass gives the transmissive material something concrete to bend.
- Caustics should follow the computed refracted endpoint and use additive color so beam controls produce visible feedback.
- Lower grid opacity and a closer camera should keep the exhibit object dominant while preserving spatial orientation.

## Fix target

- Keep the room static-deployable and light enough for GitHub Pages.
- Preserve the shared controller design system.
- Improve the default view first, then validate Focus beam and Crystal preset states through browser screenshots.

## T-GO-01 QA notes (historical)

- Replaced single-pixel light paths with additive tube geometry and endpoint markers.
- Added a low-cost animated reference panel behind the glass so transmission and IOR changes have visible context.
- Moved the default and Focus beam light positions into the framed stage for desktop and mobile.
- Bound the caustic plane position and scale to the refracted beam endpoint.
- Reduced floor/grid dominance and corrected the source halo so it follows the movable light instead of sitting at the origin.
- Verified desktop and 390px mobile cold loads through the in-app browser.
- Verified production smoke with a local-root build because the normal build intentionally uses the GitHub Pages base path.

## T-GO-04 physical-path QA notes

- Replaced the heuristic target, component-flipped reflection, and fake refracted endpoint with finite-source ray/sphere intersections, normal reflection, Snell refraction through both sphere surfaces, and an explicit outgoing-ray/floor intersection.
- A fixed `0.6r` impact parameter keeps legal source positions at a deterministic 36.9-degree oblique incidence angle, including a specified `+X` orientation for a vertically aligned source.
- Replaced regenerated tube geometry with two permanent four-slot `InstancedMesh` batches (core and glow). Path updates write existing instance matrices and colors; unavailable segments are zero-scaled without changing draw topology.
- The Glass Optics gate is now 15 scene draw calls in all six captured states. Continuous Light X drag keeps geometry count stable; the QA runner samples an unminified build, first proves constructor-name visibility with a positive control, then reports no `Geometry`, `BufferAttribute`, or `Vector3` construction from the real update path.
- Default, Focus, Crystal, legal-extreme, IOR 1.0, and IOR 2.4 states are captured by `pnpm qa:glass`; the IOR pair makes the angle and floor-hit response visible.
- URL state is explicitly version 2. Version 1 and out-of-domain Light Y values fail validation instead of being clamped or migrated.
