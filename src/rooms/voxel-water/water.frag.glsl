uniform float uTime;
uniform float uRain;
uniform float uStorm;
uniform float uCloudCover;
uniform float uToonSteps;
uniform float uFoam;
uniform float uClarity;
uniform float uSurfaceDetail;

varying vec2 vUv;
varying float vWave;
varying float vRawWave;
varying float vFoam;
varying float vSlope;
varying vec3 vWorldPosition;
varying vec3 vWaterNormal;

float gridLine(vec2 uv) {
  vec2 grid = abs(fract(uv * 34.0 - 0.5) - 0.5) / fwidth(uv * 34.0);
  float line = 1.0 - min(min(grid.x, grid.y), 1.0);
  return smoothstep(0.12, 0.85, line);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += noise(p) * amplitude;
    p = p * 2.03 + vec2(7.1, 3.4);
    amplitude *= 0.52;
  }
  return value;
}

void main() {
  float bands = floor(vWave * uToonSteps) / max(uToonSteps, 1.0);
  vec3 deep = mix(vec3(0.006, 0.09, 0.16), vec3(0.018, 0.24, 0.33), uClarity);
  vec3 mid = mix(vec3(0.02, 0.38, 0.47), vec3(0.03, 0.66, 0.78), uClarity);
  vec3 shallow = vec3(0.14, 0.78, 0.84);
  vec3 foamColor = vec3(0.82, 0.98, 0.95);
  vec3 stormTint = vec3(0.34, 0.42, 0.52);
  float opticalDepth = smoothstep(-1.0, 0.85, vWorldPosition.y);
  vec3 color = mix(deep, mid, bands);
  color = mix(color, shallow, smoothstep(0.48, 0.92, bands) * uClarity * 0.36);
  color = mix(color, stormTint, uStorm * 0.34 + uCloudCover * 0.17);

  float grid = gridLine(vUv);
  color = mix(color, vec3(0.8, 1.0, 0.96), grid * (0.16 + uRain * 0.16) * (0.55 + vRawWave));

  float rainCell = hash(floor(vUv * vec2(120.0, 80.0)) + floor(uTime * 18.0));
  float rainSpark = step(0.985 - uRain * 0.045, rainCell) * uRain;
  float ripple = smoothstep(0.46, 0.5, abs(fract(length(vUv * 24.0 + rainCell) - uTime * 1.8) - 0.5));
  color += rainSpark * vec3(0.42, 0.72, 1.0);
  color += ripple * uRain * 0.035 * vec3(0.55, 0.88, 1.0);

  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  vec3 normal = normalize(vWaterNormal + vec3(
    (fbm(vUv * 24.0 + uTime * 0.12) - 0.5) * 0.28 * uSurfaceDetail,
    0.0,
    (fbm(vUv * 21.0 - uTime * 0.1) - 0.5) * 0.28 * uSurfaceDetail
  ));
  vec3 lightDir = normalize(vec3(-0.35, 0.82, 0.44));
  float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 5.0);
  float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), mix(18.0, 62.0, uClarity));
  float glitterMask = step(0.78, fbm(vUv * 55.0 + vec2(uTime * 0.55, -uTime * 0.22)));
  color += fresnel * mix(vec3(0.04, 0.16, 0.22), vec3(0.22, 0.58, 0.68), uClarity) * (0.14 + uSurfaceDetail * 0.18);
  color += specular * glitterMask * (0.1 + uClarity * 0.22) * vec3(0.86, 1.0, 0.94);

  float crestNoise = fbm(vUv * 18.0 + vec2(uTime * 0.2, -uTime * 0.12));
  float crestFoam = smoothstep(0.66, 1.04, vFoam + crestNoise * 0.18 + vSlope * 0.18) * uFoam;
  crestFoam += smoothstep(0.9, 1.08, grid + vRawWave * 0.12) * uFoam * 0.1;
  color = mix(color, foamColor, clamp(crestFoam, 0.0, 0.48));

  float depthFade = smoothstep(10.0, -5.0, vWorldPosition.z);
  color *= 0.68 + depthFade * 0.22 + opticalDepth * 0.18;
  color *= 1.0 - uCloudCover * 0.08 - uStorm * 0.1;

  float alpha = mix(0.86, 0.95, uClarity) - uStorm * 0.04;
  gl_FragColor = vec4(color, alpha);
}
