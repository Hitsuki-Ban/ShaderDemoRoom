uniform float uTime;
uniform float uIntensity;
uniform float uFocus;
uniform float uFocusRadius;
uniform float uCuspLength;
uniform float uCuspWidth;
uniform float uRingRadius;
uniform float uRingWidth;
uniform vec2 uDirection;

varying vec2 vUv;

float boundedUnion(float first, float second) {
  first = clamp(first, 0.0, 1.0);
  second = clamp(second, 0.0, 1.0);
  return 1.0 - (1.0 - first) * (1.0 - second);
}

void main() {
  vec2 p = vUv - 0.5;
  float radius = length(p);
  float along = dot(p, uDirection);
  float across = dot(p, vec2(-uDirection.y, uDirection.x));

  float warmFocus = exp(-dot(p, p) / (uFocusRadius * uFocusRadius));
  warmFocus *= (1.0 - smoothstep(0.16, 0.28, radius))
    * mix(0.72, 1.0, uFocus);

  float cuspDistance = max(along, 0.0) + max(-along, 0.0) * 1.7;
  float cuspAxis = 1.0 - smoothstep(uCuspLength * 0.45, uCuspLength, cuspDistance);
  float cuspTaper = max(0.38, 1.0 - cuspDistance / uCuspLength * 0.62);
  float coldCusp = exp(-abs(across) / (uCuspWidth * cuspTaper))
    * cuspAxis * mix(0.64, 0.94, uFocus);

  float animatedRingRadius = uRingRadius + sin(uTime * 0.75) * 0.006;
  float ring = exp(-abs(radius - animatedRingRadius) / uRingWidth)
    * exp(-radius * 3.2) * 0.28;

  float shape = boundedUnion(boundedUnion(warmFocus, coldCusp), ring);
  float warmWeight = warmFocus / max(warmFocus + coldCusp + ring, 0.0001);
  float warmMix = smoothstep(0.24, 0.72, warmWeight)
    * smoothstep(0.34, 0.82, warmFocus)
    * (1.0 - smoothstep(0.08, 0.18, radius));
  vec3 coolLinear = vec3(0.42, 0.72, 0.86);
  vec3 warmLinear = vec3(0.90, 0.58, 0.24);
  vec3 color = mix(coolLinear, warmLinear, warmMix);
  gl_FragColor = vec4(color, shape * 0.70 * uIntensity);
  #include <colorspace_fragment>
}
