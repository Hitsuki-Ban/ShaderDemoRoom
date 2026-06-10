uniform float uTime;
uniform float uIntensity;
uniform float uSpread;

varying vec2 vUv;

void main() {
  vec2 p = vUv - 0.5;
  float radius = length(p);
  float angle = atan(p.y, p.x);
  float rings = sin(radius * (38.0 - uSpread * 12.0) - uTime * 1.8);
  float spokes = sin(angle * 6.0 + uTime * 0.8);
  float caustic = smoothstep(0.56, 1.0, rings * 0.62 + spokes * 0.22);
  caustic *= smoothstep(0.48, 0.04, radius);
  vec3 color = vec3(0.78, 0.94, 1.0) * caustic * uIntensity;
  gl_FragColor = vec4(color, caustic * 0.55 * uIntensity);
}
