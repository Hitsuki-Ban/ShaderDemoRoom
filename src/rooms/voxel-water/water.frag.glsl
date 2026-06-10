uniform float uTime;
uniform float uRain;
uniform float uStorm;
uniform float uCloudCover;
uniform float uToonSteps;

varying vec2 vUv;
varying float vWave;
varying vec3 vWorldPosition;

float gridLine(vec2 uv) {
  vec2 grid = abs(fract(uv * 34.0 - 0.5) - 0.5) / fwidth(uv * 34.0);
  float line = 1.0 - min(min(grid.x, grid.y), 1.0);
  return smoothstep(0.12, 0.85, line);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  float bands = floor(vWave * uToonSteps) / max(uToonSteps, 1.0);
  vec3 deep = vec3(0.015, 0.22, 0.34);
  vec3 mid = vec3(0.03, 0.58, 0.73);
  vec3 foam = vec3(0.72, 0.97, 0.92);
  vec3 stormTint = vec3(0.34, 0.42, 0.52);
  vec3 color = mix(deep, mid, bands);
  color = mix(color, foam, smoothstep(0.72, 0.96, bands) * 0.45);
  color = mix(color, stormTint, uStorm * 0.38 + uCloudCover * 0.18);

  float grid = gridLine(vUv);
  color = mix(color, vec3(0.86, 1.0, 0.96), grid * (0.24 + uRain * 0.18));

  float rainCell = hash(floor(vUv * vec2(120.0, 80.0)) + floor(uTime * 18.0));
  float rainSpark = step(0.985 - uRain * 0.045, rainCell) * uRain;
  color += rainSpark * vec3(0.45, 0.77, 1.0);

  float depthFade = smoothstep(10.0, -5.0, vWorldPosition.z);
  color *= 0.76 + depthFade * 0.28;

  gl_FragColor = vec4(color, 1.0);
}
