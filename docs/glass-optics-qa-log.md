# Glass Optics QA Log

## Baseline observations

- Default and preset states render the light path as a single-pixel line, so the beam is hard to read against the floor grid.
- The light source starts close to the left edge or outside the framed viewport, which weakens the movable-light interaction.
- The glass body reads as a smoky gray sphere because there is no strong refracted reference target behind it.
- Caustics are visible only as a faint floor glow and are not clearly tied to the refracted ray.
- The floor grid has higher visual weight than the exhibit object.

## Working hypotheses

- Tube-based emissive beam geometry will make incoming, reflected, and refracted paths readable without adding post-processing.
- A lightweight animated reference panel behind the glass gives the transmissive material something concrete to bend.
- Caustics should follow the computed refracted endpoint and use additive color so beam controls produce visible feedback.
- Lower grid opacity and a closer camera should keep the exhibit object dominant while preserving spatial orientation.

## Fix target

- Keep the room static-deployable and light enough for GitHub Pages.
- Preserve the shared controller design system.
- Improve the default view first, then validate Focus beam and Crystal preset states through browser screenshots.

## Final QA notes

- Replaced single-pixel light paths with additive tube geometry and endpoint markers.
- Added a low-cost animated reference panel behind the glass so transmission and IOR changes have visible context.
- Moved the default and Focus beam light positions into the framed stage for desktop and mobile.
- Bound the caustic plane position and scale to the refracted beam endpoint.
- Reduced floor/grid dominance and corrected the source halo so it follows the movable light instead of sitting at the origin.
- Verified desktop and 390px mobile cold loads through the in-app browser.
- Verified production smoke with a local-root build because the normal build intentionally uses the GitHub Pages base path.
