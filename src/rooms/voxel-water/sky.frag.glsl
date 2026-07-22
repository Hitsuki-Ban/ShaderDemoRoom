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
uniform float uSunVisibility;
uniform vec3 uSunDirection;

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
  float stormPhase = smoothstep(0.52, 0.92, uStorm);
  float warmEdge = 1.0 - smoothstep(0.18, 0.52, abs(uSkyTime - 0.5));
  float coolMix = smoothstep(0.0, 1.0, -uColorTemperature);
  float warmMix = smoothstep(0.0, 1.0, uColorTemperature);

  vec3 nightZenith = vec3(0.002, 0.011, 0.034);
  vec3 dayZenith = mix(vec3(0.7, 0.88, 0.68), vec3(0.82, 1.0, 0.76), 1.0 - coolMix);
  vec3 stormZenith = vec3(0.006, 0.042, 0.084);
  vec3 zenith = mix(nightZenith, dayZenith, dayStrength);
  zenith = mix(zenith, stormZenith, stormPhase * 0.62 + uCloudCover * 0.12);
  zenith = mix(zenith, uWeatherSkyTint, 0.18 + uStorm * 0.22 + uCloudCover * 0.08);

  vec3 horizon = mix(vec3(0.024, 0.168, 0.198), vec3(1.08, 1.0, 0.82), dayStrength);
  horizon = mix(horizon, vec3(1.0, 0.687, 0.328), warmEdge * (0.08 + warmMix * 0.12));
  horizon = mix(horizon, vec3(0.238, 0.61, 0.434), stormPhase * 0.34);
  horizon = mix(horizon, uWeatherHorizonTint, 0.12 + uStorm * 0.14 + uCloudCover * 0.06);

  vec3 color = mix(horizon, zenith, smoothstep(0.28, 0.96, vertical));

  vec2 cloudUv = direction.xz / max(0.15, direction.y + 0.72);
  float cloudNoise = fbm(cloudUv * 2.4 + vec2(uTime * 0.012, -uTime * 0.006));
  float cloudMask = smoothstep(0.47, 0.74, cloudNoise + uCloudCover * 0.42 + uStorm * 0.16);
  float cloudBand = smoothstep(0.18, 0.44, vertical) * (1.0 - smoothstep(0.86, 1.0, vertical));
  vec3 cloudColor = mix(vec3(0.084, 0.198, 0.238), vec3(0.847, 0.888, 0.694), dayStrength);
  cloudColor = mix(cloudColor, vec3(0.168, 0.434, 0.352), stormPhase * 0.46);
  cloudColor = mix(cloudColor, uWeatherCloudTint, 0.24 + uStorm * 0.14);
  color = mix(color, cloudColor, cloudMask * cloudBand * (0.12 + uCloudCover * 0.36 + uStorm * 0.12));

  float sunAngle = acos(clamp(dot(direction, normalize(uSunDirection)), -1.0, 1.0));
  float sunGlow = 1.0 - smoothstep(0.04, 0.085, sunAngle);
  float sunDisc = 1.0 - smoothstep(0.032, 0.04, sunAngle);
  color += sunGlow * uSunVisibility * vec3(1.0, 0.687, 0.328) * (0.018 + warmMix * 0.012);
  color = mix(color, vec3(1.0, 0.687, 0.328), sunDisc * uSunVisibility);
  float clearMorningLift = (1.0 - smoothstep(0.28, 0.48, uSkyTime)) * (1.0 - uStorm);
  color += clearMorningLift * vec3(0.12, 0.11, 0.07);
  color += uLightningPulse * uWeatherLightningTint * (0.18 + cloudBand * 0.46);

  gl_FragColor = vec4(color, 1.0);
}
