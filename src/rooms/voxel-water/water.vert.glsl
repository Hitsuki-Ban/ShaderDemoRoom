uniform float uTime;
uniform float uWaveHeight;
uniform float uWind;
uniform float uToonSteps;
uniform float uSwell;
uniform float uChop;
uniform float uFoam;
uniform float uSurfaceDetail;
uniform vec2 uOceanOriginXZ;

varying vec2 vUv;
varying float vWave;
varying float vRawWave;
varying float vFoam;
varying float vSlope;
varying vec3 vWorldPosition;
varying vec3 vWaterNormal;

struct WaveSample {
  float height;
  vec2 gradient;
};

WaveSample waveLayer(vec2 p, vec2 direction, float frequency, float amplitude, float phase, float sharpness) {
  float theta = dot(p, normalize(direction)) * frequency + phase;
  float s = sin(theta) * 0.5 + 0.5;
  float shaped = pow(max(s, 0.0001), sharpness);
  float derivative = 0.5 * frequency * cos(theta) * sharpness * pow(max(s, 0.0001), sharpness - 1.0);
  return WaveSample(shaped * amplitude, normalize(direction) * derivative * amplitude);
}

WaveSample waveField(vec2 p) {
  float timeScale = 0.44 + uWind * 0.15;
  float chopShape = mix(1.2, 3.8, uChop);
  WaveSample a = waveLayer(p, vec2(0.78, 0.62), 1.12, 0.32 + uSwell * 0.15, uTime * timeScale * 0.92, chopShape);
  WaveSample b = waveLayer(p, vec2(-0.64, 0.77), 2.45, 0.28 + uChop * 0.12, -uTime * timeScale * 1.36, 1.6 + uChop * 2.1);
  WaveSample c = waveLayer(p, vec2(0.18, -0.98), 4.2, 0.16 + uSurfaceDetail * 0.08, uTime * timeScale * 1.9, 1.2 + uSurfaceDetail * 2.0);
  WaveSample d = waveLayer(p, vec2(-0.95, 0.31), 0.86, 0.18 * uSwell, -uTime * timeScale * 0.72, 1.4);
  WaveSample result;
  result.height = (a.height + b.height + c.height + d.height) / max(1.0, 1.02 + uSwell * 0.54);
  result.gradient = a.gradient + b.gradient + c.gradient + d.gradient;
  return result;
}

void main() {
  vUv = uv;
  vec3 displaced = position;
  vec2 oceanWorldXZ = position.xz + uOceanOriginXZ;
  WaveSample wave = waveField(oceanWorldXZ);
  float normalizedWave = clamp(wave.height, 0.0, 1.0);
  float signedWave = normalizedWave * 2.0 - 1.0;
  displaced.y += signedWave * uWaveHeight * (0.72 + uSwell * 0.34);
  vWave = normalizedWave;
  vRawWave = normalizedWave;
  vSlope = clamp(length(wave.gradient), 0.0, 1.0);
  vFoam = smoothstep(0.78 - uFoam * 0.12, 0.98, normalizedWave + vSlope * 0.18);
  vWaterNormal = normalize(vec3(-wave.gradient.x, 1.35, -wave.gradient.y));

  vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
