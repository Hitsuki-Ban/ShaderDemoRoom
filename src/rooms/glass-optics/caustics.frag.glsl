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
  float streaks = sin((p.x * 18.0 - p.y * 9.0) + uTime * 1.15);
  float caustic = smoothstep(0.48, 1.0, rings * 0.58 + spokes * 0.22 + streaks * 0.18);
  caustic *= smoothstep(0.5, 0.03, radius);
  caustic = pow(caustic, 0.82);
  vec3 cool = vec3(0.48, 0.96, 1.0);
  vec3 warm = vec3(1.0, 0.78, 0.42);
  vec3 color = mix(cool, warm, smoothstep(-0.25, 0.65, spokes)) * caustic * uIntensity * 1.25;
  gl_FragColor = vec4(color, caustic * 0.82 * uIntensity);
}
