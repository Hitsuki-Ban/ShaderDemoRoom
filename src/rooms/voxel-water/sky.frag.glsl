uniform float uTime;
uniform float uStorm;
uniform float uCloudCover;
uniform float uSkyTime;
uniform float uColorTemperature;

varying vec3 vWorldDirection;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.7, 289.1))) * 45758.5453);
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
  float amplitude = 0.55;
  for (int i = 0; i < 4; i++) {
    value += noise(p) * amplitude;
    p = p * 2.02 + vec2(5.7, 2.4);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec3 direction = normalize(vWorldDirection);
  float vertical = clamp(direction.y * 0.5 + 0.5, 0.0, 1.0);
  float dayStrength = smoothstep(0.05, 0.82, sin(uSkyTime * 3.14159265));
  float warmEdge = 1.0 - smoothstep(0.18, 0.52, abs(uSkyTime - 0.5));
  float coolMix = smoothstep(0.0, 1.0, -uColorTemperature);
  float warmMix = smoothstep(0.0, 1.0, uColorTemperature);

  vec3 nightZenith = vec3(0.014, 0.028, 0.055);
  vec3 dayZenith = mix(vec3(0.045, 0.19, 0.34), vec3(0.08, 0.3, 0.5), 1.0 - coolMix);
  vec3 stormZenith = vec3(0.045, 0.06, 0.082);
  vec3 zenith = mix(nightZenith, dayZenith, dayStrength);
  zenith = mix(zenith, stormZenith, uStorm * 0.74 + uCloudCover * 0.18);

  vec3 horizon = mix(vec3(0.025, 0.09, 0.13), vec3(0.33, 0.64, 0.68), dayStrength);
  horizon = mix(horizon, vec3(0.72, 0.43, 0.25), warmEdge * (0.22 + warmMix * 0.32));
  horizon = mix(horizon, vec3(0.055, 0.07, 0.09), uStorm * 0.58);

  vec3 color = mix(horizon, zenith, smoothstep(0.28, 0.96, vertical));

  vec2 cloudUv = direction.xz / max(0.15, direction.y + 0.72);
  float cloudNoise = fbm(cloudUv * 2.4 + vec2(uTime * 0.012, -uTime * 0.006));
  float cloudMask = smoothstep(0.47, 0.74, cloudNoise + uCloudCover * 0.42 + uStorm * 0.16);
  float cloudBand = smoothstep(0.18, 0.44, vertical) * (1.0 - smoothstep(0.86, 1.0, vertical));
  vec3 cloudColor = mix(vec3(0.22, 0.34, 0.4), vec3(0.66, 0.82, 0.82), dayStrength);
  cloudColor = mix(cloudColor, vec3(0.16, 0.18, 0.21), uStorm * 0.65);
  color = mix(color, cloudColor, cloudMask * cloudBand * (0.12 + uCloudCover * 0.36 + uStorm * 0.12));

  vec2 sunDir = normalize(vec2(cos(uSkyTime * 6.2831853), sin(uSkyTime * 6.2831853)));
  float sunDisc = smoothstep(0.998, 1.0, dot(normalize(direction.xz), sunDir)) * smoothstep(0.32, 0.8, vertical);
  color += sunDisc * (1.0 - uStorm) * vec3(0.56, 0.42, 0.26) * (0.18 + warmMix * 0.16);

  gl_FragColor = vec4(color, 1.0);
}
