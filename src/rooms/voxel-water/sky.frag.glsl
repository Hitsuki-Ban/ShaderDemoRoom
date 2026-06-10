uniform float uTime;
uniform float uStorm;
uniform float uCloudCover;
uniform float uSkyTime;
uniform float uColorTemperature;
uniform vec3 uWeatherSkyTint;
uniform vec3 uWeatherHorizonTint;
uniform vec3 uWeatherCloudTint;
uniform vec3 uWeatherLightningTint;
uniform float uLightningPulse;

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

  vec3 nightZenith = vec3(0.018, 0.04, 0.075);
  vec3 dayZenith = mix(vec3(0.09, 0.3, 0.52), vec3(0.16, 0.44, 0.68), 1.0 - coolMix);
  vec3 stormZenith = vec3(0.09, 0.12, 0.15);
  vec3 zenith = mix(nightZenith, dayZenith, dayStrength);
  zenith = mix(zenith, stormZenith, uStorm * 0.62 + uCloudCover * 0.12);
  zenith = mix(zenith, uWeatherSkyTint, 0.18 + uStorm * 0.22 + uCloudCover * 0.08);

  vec3 horizon = mix(vec3(0.04, 0.14, 0.18), vec3(0.48, 0.82, 0.86), dayStrength);
  horizon = mix(horizon, vec3(0.82, 0.56, 0.34), warmEdge * (0.18 + warmMix * 0.28));
  horizon = mix(horizon, vec3(0.14, 0.18, 0.2), uStorm * 0.48);
  horizon = mix(horizon, uWeatherHorizonTint, 0.32 + uStorm * 0.2 + uCloudCover * 0.12);

  vec3 color = mix(horizon, zenith, smoothstep(0.28, 0.96, vertical));

  vec2 cloudUv = direction.xz / max(0.15, direction.y + 0.72);
  float cloudNoise = fbm(cloudUv * 2.4 + vec2(uTime * 0.012, -uTime * 0.006));
  float cloudMask = smoothstep(0.47, 0.74, cloudNoise + uCloudCover * 0.42 + uStorm * 0.16);
  float cloudBand = smoothstep(0.18, 0.44, vertical) * (1.0 - smoothstep(0.86, 1.0, vertical));
  vec3 cloudColor = mix(vec3(0.28, 0.42, 0.48), vec3(0.78, 0.92, 0.9), dayStrength);
  cloudColor = mix(cloudColor, vec3(0.22, 0.26, 0.3), uStorm * 0.58);
  cloudColor = mix(cloudColor, uWeatherCloudTint, 0.42 + uStorm * 0.22);
  color = mix(color, cloudColor, cloudMask * cloudBand * (0.12 + uCloudCover * 0.36 + uStorm * 0.12));

  vec2 sunDir = normalize(vec2(cos(uSkyTime * 6.2831853), sin(uSkyTime * 6.2831853)));
  float sunAlignment = dot(normalize(direction.xz), sunDir);
  float sunGlow = smoothstep(0.78, 1.0, sunAlignment) * smoothstep(0.18, 0.7, vertical);
  float sunDisc = smoothstep(0.998, 1.0, sunAlignment) * smoothstep(0.32, 0.8, vertical);
  color += sunGlow * (1.0 - uStorm) * vec3(0.16, 0.18, 0.14) * (0.12 + warmMix * 0.12);
  color += sunDisc * (1.0 - uStorm) * vec3(0.56, 0.42, 0.26) * (0.18 + warmMix * 0.16);
  color += uLightningPulse * uWeatherLightningTint * (0.18 + cloudBand * 0.46);

  gl_FragColor = vec4(color, 1.0);
}
