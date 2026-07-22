export const rainParticleVertexShader = /* glsl */ `
#include <common>
#include <fog_pars_vertex>
uniform float uTime;
uniform float uLength;
uniform float uWind;
uniform vec2 uResolution;
attribute float aSeed;
attribute float aSpeed;
attribute float aScale;
varying vec2 vParticleUv;
varying float vParticleAlpha;

void main() {
  float age = fract(uTime * 0.17 * aSpeed + aSeed);
  float birthFade = smoothstep(0.0, 0.07, age);
  float deathFade = 1.0 - smoothstep(0.86, 1.0, age);
  float lifeScale = birthFade * deathFade;
  vec3 localCenter = vec3(
    (age - 0.5) * uWind * 1.7,
    mix(11.0, -1.8, age),
    0.0
  );
  vec4 worldCenter = modelMatrix * instanceMatrix * vec4(localCenter, 1.0);
  vec4 mvPosition = viewMatrix * worldCenter;
  vec4 clipPosition = projectionMatrix * mvPosition;
  float internalPixelWidth = (1.25 + aScale * 0.55) * lifeScale;
  float internalPixelLength = uLength * mix(0.72, 1.18, aScale) * lifeScale;
  vec2 streakOffset = vec2(
    position.x * internalPixelWidth + position.y * uWind * 0.9,
    position.y * internalPixelLength
  );
  clipPosition.xy += streakOffset * (2.0 / uResolution) * clipPosition.w;
  gl_Position = clipPosition;
  vParticleUv = uv;
  vParticleAlpha = birthFade * deathFade;
  #include <fog_vertex>
}
`;

export const sprayParticleVertexShader = /* glsl */ `
#include <common>
#include <fog_pars_vertex>
uniform float uTime;
uniform float uLength;
uniform float uWind;
uniform float uFoam;
uniform vec2 uResolution;
attribute float aSeed;
attribute float aSpeed;
attribute float aScale;
attribute vec3 aLaunch;
attribute vec3 aVelocity;
varying vec2 vParticleUv;
varying float vParticleAlpha;

void main() {
  float age = fract(uTime * 0.23 * aSpeed + aSeed);
  float birthFade = smoothstep(0.0, 0.09, age);
  float deathFade = 1.0 - smoothstep(0.76, 1.0, age);
  float lifeScale = birthFade * deathFade;
  float flightTime = age * mix(1.15, 1.85, aScale);
  vec3 gravity = vec3(0.0, -3.8, 0.0);
  vec3 localCenter = aLaunch
    + aVelocity * flightTime
    + 0.5 * gravity * flightTime * flightTime;
  localCenter.x += uWind * flightTime * flightTime * 0.12;
  vec4 worldCenter = modelMatrix * instanceMatrix * vec4(localCenter, 1.0);
  vec4 mvPosition = viewMatrix * worldCenter;
  vec4 clipPosition = projectionMatrix * mvPosition;
  float particlePixels = uLength * mix(0.65, 1.2, aScale) * mix(0.78, 1.12, uFoam) * lifeScale;
  vec2 dropOffset = position.xy * particlePixels;
  clipPosition.xy += dropOffset * (2.0 / uResolution) * clipPosition.w;
  gl_Position = clipPosition;
  vParticleUv = uv;
  vParticleAlpha = birthFade * deathFade;
  #include <fog_vertex>
}
`;

export const rainParticleFragmentShader = /* glsl */ `
#include <common>
#include <fog_pars_fragment>
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vParticleUv;
varying float vParticleAlpha;

void main() {
  vec2 centeredUv = vParticleUv * 2.0 - 1.0;
  float taperedHalfWidth = mix(0.18, 0.82, smoothstep(-1.0, 0.72, centeredUv.y));
  float capsuleDistance = max(abs(centeredUv.x) - taperedHalfWidth, abs(centeredUv.y) - 0.9);
  float edgeWidth = max(fwidth(capsuleDistance), 0.02);
  float shapeAlpha = 1.0 - smoothstep(-edgeWidth, edgeWidth, capsuleDistance);
  if (shapeAlpha <= 0.001) discard;
  gl_FragColor = vec4(uColor, uOpacity * vParticleAlpha * shapeAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;

export const sprayParticleFragmentShader = /* glsl */ `
#include <common>
#include <fog_pars_fragment>
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vParticleUv;
varying float vParticleAlpha;

void main() {
  vec2 centeredUv = vParticleUv * 2.0 - 1.0;
  centeredUv.y += 0.16;
  float teardropRadius = mix(0.72, 0.38, clamp(centeredUv.y * 0.5 + 0.5, 0.0, 1.0));
  float teardropDistance = length(vec2(centeredUv.x / teardropRadius, centeredUv.y));
  float edgeWidth = max(fwidth(teardropDistance), 0.025);
  float shapeAlpha = 1.0 - smoothstep(0.9 - edgeWidth, 0.9 + edgeWidth, teardropDistance);
  if (shapeAlpha <= 0.001) discard;
  gl_FragColor = vec4(uColor, uOpacity * vParticleAlpha * shapeAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;
