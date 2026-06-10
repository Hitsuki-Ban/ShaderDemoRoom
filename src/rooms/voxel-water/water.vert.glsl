uniform float uTime;
uniform float uWaveHeight;
uniform float uWind;
uniform float uToonSteps;

varying vec2 vUv;
varying float vWave;
varying vec3 vWorldPosition;

float waveField(vec2 p) {
  float windTime = uTime * (0.45 + uWind * 0.22);
  float a = sin(p.x * 2.4 + windTime * 1.4);
  float b = sin((p.x + p.y) * 1.8 - windTime * 1.1);
  float c = cos(p.y * 3.1 + windTime * 0.9);
  return (a + b * 0.65 + c * 0.42) / 2.07;
}

void main() {
  vUv = uv;
  vec3 displaced = position;
  float wave = waveField(position.xz);
  float stepped = floor((wave * 0.5 + 0.5) * uToonSteps) / uToonSteps;
  float signedStep = stepped * 2.0 - 1.0;
  displaced.y += signedStep * uWaveHeight;
  vWave = stepped;

  vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
