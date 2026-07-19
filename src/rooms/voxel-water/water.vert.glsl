uniform float uToonSteps;
uniform vec2 uOceanOriginXZ;

/*__VOXEL_WAVE_MODEL__*/

varying vec2 vUv;
varying float vWave;
varying float vRawWave;
varying float vFoam;
varying float vSlope;
varying vec3 vWorldPosition;
varying vec3 vWaterNormal;
varying vec2 vOceanXZ;

void main() {
  vUv = uv;
  vec3 displaced = position;
  vec2 oceanWorldXZ = position.xz + uOceanOriginXZ;
  vOceanXZ = oceanWorldXZ;
  WaveSample wave = sampleWaveField(oceanWorldXZ);
  float normalizedWave = clamp(wave.height, 0.0, 1.0);
  displaced.y = waveSurfaceY(normalizedWave);
  vWave = normalizedWave;
  vRawWave = normalizedWave;
  vSlope = clamp(length(wave.gradient), 0.0, 1.0);
  vFoam = smoothstep(0.78 - uFoam * 0.12, 0.98, normalizedWave + vSlope * 0.18);
  float elevationScale = waveElevationScale();
  vec3 localWaterNormal = normalize(vec3(
    -wave.gradient.x * elevationScale,
    1.0,
    -wave.gradient.y * elevationScale
  ));
  vWaterNormal = normalize(mat3(modelMatrix) * localWaterNormal);

  vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
