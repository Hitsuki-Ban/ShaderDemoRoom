uniform float uTime;
uniform float uRain;
uniform float uStorm;
uniform float uCloudCover;
uniform float uToonSteps;
uniform float uFoam;
uniform float uClarity;
uniform float uSurfaceDetail;
uniform vec2 uCurrentDirectionXZ;
uniform float uCurrentStrength;
uniform float uSkyTime;
uniform float uColorTemperature;
uniform float uVoxelColorVariance;
uniform vec3 uWeatherWaterTint;
uniform vec3 uWeatherFogColor;
uniform vec3 uWeatherRimColor;
uniform vec3 uWeatherLightningTint;
uniform float uWeatherFogDensity;
uniform float uRainCurtain;
uniform float uWeatherRippleStrength;
uniform vec2 uRainRippleStates[4];
uniform float uLightningPulse;
uniform float uVoxelSpacing;
uniform float uWaterGridCellMultiple;
uniform float uStormGridCellMultiple;
uniform vec2 uVoxelFieldOffset;
uniform vec2 uVoxelFieldBasis;
uniform vec3 uSunDirection;
uniform vec4 uHeadlandCapsules[4];
uniform float uHeadlandRadii[4];

/*__VOXEL_TOON_QUANTIZATION__*/

varying vec2 vUv;
varying float vWave;
varying float vRawWave;
varying float vFoam;
varying float vSlope;
varying vec3 vWorldPosition;
varying vec3 vWaterNormal;
varying vec2 vOceanXZ;

float gridLine(vec2 worldPosition, float cellMultiple) {
  float cellSize = uVoxelSpacing * cellMultiple;
  vec2 gridUv = worldPosition / cellSize;
  vec2 gridDerivativeX = dFdx(gridUv);
  vec2 gridDerivativeY = dFdy(gridUv);
  vec2 gridFootprint = vec2(
    length(vec2(gridDerivativeX.x, gridDerivativeY.x)),
    length(vec2(gridDerivativeX.y, gridDerivativeY.y))
  );
  vec2 lineWidth = clamp(vec2((uVoxelSpacing * 0.12) / cellSize), gridFootprint, vec2(0.48));
  vec2 lineAA = max(gridFootprint * 1.65, vec2(0.015));
  vec2 gridUvDistance = abs(fract(gridUv - 0.5) - 0.5);
  vec2 axisLines = smoothstep(lineWidth + lineAA, lineWidth - lineAA, gridUvDistance);
  float footprintFade = 1.0 - smoothstep(0.18, 0.62, max(gridFootprint.x, gridFootprint.y));
  return max(axisLines.x, axisLines.y) * footprintFade;
}

vec2 voxelGridPosition(vec2 oceanPosition) {
  vec2 fieldLocal = vec2(
    uVoxelFieldBasis.x * oceanPosition.x - uVoxelFieldBasis.y * oceanPosition.y,
    uVoxelFieldBasis.y * oceanPosition.x + uVoxelFieldBasis.x * oceanPosition.y
  );
  return fieldLocal - uVoxelFieldOffset;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float rainRipple(vec2 uv, vec2 center, vec2 rippleState) {
  vec2 delta = (uv - center) * vec2(1.0, 1.36);
  float distanceFromImpact = length(delta);
  float radius = rippleState.x;
  float ringWidth = max(0.0026, fwidth(distanceFromImpact) * 1.45);
  float ring = 1.0 - smoothstep(ringWidth, ringWidth * 2.4, abs(distanceFromImpact - radius));
  return ring * rippleState.y;
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
  for (int i = 0; i < 2; i++) {
    value += noise(p) * amplitude;
    p = p * 2.03 + vec2(7.1, 3.4);
    amplitude *= 0.58;
  }
  return value;
}

float signedDistanceToCapsule(vec2 position, vec4 capsule, float radius) {
  vec2 start = capsule.xy;
  vec2 segment = capsule.zw - start;
  vec2 offset = position - start;
  float projection = clamp(dot(offset, segment) / dot(segment, segment), 0.0, 1.0);
  return length(offset - segment * projection) - radius;
}

float signedDistanceToHeadland(vec2 position) {
  float distanceToHeadland = 100000.0;
  for (int index = 0; index < 4; index++) {
    distanceToHeadland = min(
      distanceToHeadland,
      signedDistanceToCapsule(position, uHeadlandCapsules[index], uHeadlandRadii[index])
    );
  }
  return distanceToHeadland;
}

void main() {
  float toonIntervals = max(floor(uToonSteps + 0.5) - 1.0, 1.0);
  float toonPhase = vWave * toonIntervals;
  float toonRamp = quantizeWave(vWave, uToonSteps);
  float toonBandDistance = min(fract(toonPhase), 1.0 - fract(toonPhase));
  float toonBandWidth = max(fwidth(toonPhase), 0.012);
  float toonEdgeAccent = 1.0 - smoothstep(toonBandWidth, 0.085 + toonBandWidth, toonBandDistance);
  vec3 abyss = vec3(0.002, 0.011, 0.034);
  vec3 deep = mix(abyss, vec3(0.006, 0.042, 0.084), 0.56 + uClarity * 0.16);
  vec3 mid = vec3(0.42, 0.78, 0.58);
  vec3 crestMint = vec3(0.22, 0.46, 0.32);
  float clearMorningFoamLift = (1.0 - smoothstep(0.28, 0.48, uSkyTime)) * (1.0 - uStorm);
  vec3 foamColor = mix(vec3(4.6, 4.8, 3.7), vec3(8.0, 8.3, 6.1), uStorm)
    + clearMorningFoamLift * vec3(2.0, 2.1, 1.55);
  vec3 stormTint = vec3(0.006, 0.042, 0.084);
  float opticalDepth = smoothstep(-1.0, 0.85, vWorldPosition.y);
  float skyFill = smoothstep(0.05, 0.82, sin(uSkyTime * 3.14159265));
  float viewDistance = length(cameraPosition - vWorldPosition);
  float nearToonRead = 1.0 - smoothstep(12.0, 38.0, viewDistance);
  float distanceConvergence = smoothstep(18.0, 54.0, viewDistance);
  float smoothRamp = smoothstep(0.05, 0.95, vWave);
  float convergedRamp = mix(smoothRamp, 0.46, distanceConvergence * 0.42);
  float toonColorRamp = mix(convergedRamp, toonRamp, 0.34 + nearToonRead * 0.66);
  float valueBand = quantizeWave(toonColorRamp, 4.0);
  vec3 color = mix(deep, mid, step(0.17, valueBand));
  color = mix(color, crestMint, step(0.82, valueBand) * (0.42 + nearToonRead * 0.34));
  color = mix(color, stormTint, uStorm * 0.44 + uCloudCover * 0.08);
  color = mix(color, uWeatherWaterTint, 0.16 + uRainCurtain * 0.18 + uStorm * 0.08);
  float clearMintSignature = (1.0 - uStorm) * (1.0 - smoothstep(0.18, 0.56, uRainCurtain));
  float rainBlueSignature = smoothstep(0.18, 0.54, uRainCurtain) * (1.0 - uStorm * 0.45);
  color = mix(color, crestMint, clearMintSignature * smoothstep(0.62, 0.92, toonColorRamp) * nearToonRead * 0.18);
  color = mix(color, vec3(0.018, 0.116, 0.168), rainBlueSignature * (0.16 + nearToonRead * 0.08));
  color = mix(color, abyss, (1.0 - smoothRamp) * (0.12 + uStorm * 0.18));
  color = mix(color, color * vec3(0.7, 0.84, 0.9), toonEdgeAccent * nearToonRead * (0.14 + uClarity * 0.1));
  color = mix(
    color,
    crestMint,
    toonEdgeAccent * nearToonRead * smoothstep(0.42, 0.94, toonColorRamp) * 0.42
  );
  float stormToonContrast = uStorm * (0.28 + nearToonRead * 0.72);
  color = mix(color, uWeatherRimColor, toonEdgeAccent * stormToonContrast * (0.06 + uRainCurtain * 0.05));
  color += toonEdgeAccent * stormToonContrast * smoothstep(0.38, 0.96, toonColorRamp) * vec3(0.02, 0.12, 0.14);

  vec2 voxelPosition = voxelGridPosition(vOceanXZ);
  vec2 stableCell = floor(voxelPosition / uVoxelSpacing);
  float cellTint = hash(stableCell) - 0.5;
  float warmMix = smoothstep(0.0, 1.0, uColorTemperature);
  float coolMix = smoothstep(0.0, 1.0, -uColorTemperature);
  color += cellTint * uVoxelColorVariance * vec3(0.035, 0.07, 0.055);
  color = mix(color, color * vec3(0.8, 0.92, 1.12), coolMix * 0.24);
  color = mix(color, color * vec3(1.12, 0.98, 0.82), warmMix * 0.2);

  float grid = gridLine(voxelPosition, uWaterGridCellMultiple);
  float gridDistanceFade = 1.0 - smoothstep(14.0, 48.0 + uStorm * 20.0, viewDistance);
  float voxelSurfaceGrid = 0.0;
  if (uStorm > 0.02 || rainBlueSignature > 0.02) {
    voxelSurfaceGrid = gridLine(voxelPosition, uStormGridCellMultiple);
    voxelSurfaceGrid *= (1.0 - smoothstep(22.0, 68.0, viewDistance)) * (uStorm * 0.92 + rainBlueSignature * 0.22);
  }
  grid = max(grid * gridDistanceFade, voxelSurfaceGrid);
  float stormSurfaceContour = 0.0;
  float stormSurfaceNoise = 0.0;
  if (uStorm > 0.02) {
    stormSurfaceNoise = noise(
      vOceanXZ * 0.19 + vec2(uTime * 0.025, -uTime * 0.018)
    );
    float stormContourPhase = vWave * (uToonSteps + 2.0) + stormSurfaceNoise * 0.34;
    float stormContourDistance = min(fract(stormContourPhase), 1.0 - fract(stormContourPhase));
    stormSurfaceContour = 1.0 - smoothstep(0.035, 0.14 + fwidth(stormContourPhase), stormContourDistance);
    stormSurfaceContour *= stormToonContrast * (1.0 - smoothstep(24.0, 72.0, viewDistance));
    color = mix(color, vec3(0.02, 0.22, 0.27), stormSurfaceContour * 0.18);
    color += stormSurfaceContour * smoothstep(0.58, 0.98, vRawWave) * uWeatherRimColor * 0.16;
  }

  float rainCurtain = 0.0;
  if (uRain > 0.02 || uRainCurtain > 0.02) {
    vec2 rainSurfaceCells = vec2(56.0, 38.0);
    float rainCell = hash(floor(vUv * rainSurfaceCells));
    float rainPhase = fract(rainCell * 13.7 + uTime * (1.2 + uRain * 1.1));
    float rainPulse = 1.0 - smoothstep(0.0, 0.24, abs(rainPhase - 0.12));
    float rainChance = smoothstep(0.82 - uRain * 0.12, 0.96 - uRain * 0.04, rainCell);
    float rainSpark = rainPulse * rainChance * uRain;
    float ripple = rainRipple(vUv, vec2(0.18, 0.36), uRainRippleStates[0]);
    ripple += rainRipple(vUv, vec2(0.39, 0.58), uRainRippleStates[1]);
    ripple += rainRipple(vUv, vec2(0.63, 0.43), uRainRippleStates[2]);
    ripple += rainRipple(vUv, vec2(0.82, 0.66), uRainRippleStates[3]);
    rainCurtain = smoothstep(
      0.5,
      0.86,
      noise(vWorldPosition.xz * 0.055 + vec2(-uTime * 0.08, uTime * 0.035))
    ) * uRainCurtain;
    color += rainSpark * vec3(0.28, 0.54, 0.78);
    float rippleAccent = clamp(ripple * uRain * uWeatherRippleStrength * 3.0, 0.0, 0.78);
    color = mix(color, vec3(0.62, 0.92, 1.08), rippleAccent);
    color = mix(color, uWeatherFogColor, rainCurtain * 0.14);
  }

  vec2 currentRight = vec2(-uCurrentDirectionXZ.y, uCurrentDirectionXZ.x);
  vec2 flowSpace = vec2(
    dot(vWorldPosition.xz, currentRight),
    dot(vWorldPosition.xz, uCurrentDirectionXZ)
  );
  float flowNoise = sin(flowSpace.y * 1.25 - uTime * (0.42 + uCurrentStrength * 0.9));
  flowNoise += sin(flowSpace.x * 0.46 + flowSpace.y * 0.18 + uTime * 0.18) * 0.36;
  flowNoise = flowNoise * 0.36 + 0.5;
  float flowRibbon = smoothstep(0.7, 0.88, flowNoise + vRawWave * 0.12) * uCurrentStrength;
  flowRibbon *= (0.08 + uFoam * 0.14) * (1.0 - smoothstep(5.0, 11.0, viewDistance));
  color = mix(color, foamColor, flowRibbon * 0.08);
  color += flowRibbon * vec3(0.02, 0.08, 0.1);

  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float normalDetailFade = (1.0 - smoothstep(6.5, 14.0, viewDistance)) * uSurfaceDetail;
  vec2 normalRipple = vec2(
    sin(vUv.x * 42.0 + vUv.y * 19.0 + uTime * 0.7),
    sin(vUv.y * 38.0 - vUv.x * 17.0 - uTime * 0.56)
  );
  vec3 normal = normalize(vWaterNormal + vec3(
    normalRipple.x * 0.07 * normalDetailFade,
    0.0,
    normalRipple.y * 0.07 * normalDetailFade
  ));
  vec3 lightDir = uSunDirection;
  float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 5.0);
  float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), mix(18.0, 62.0, uClarity));
  float sunwardSlope = smoothstep(0.18, 0.82, dot(normal, lightDir) * 0.5 + 0.5);
  float peakMask = smoothstep(0.58, 0.88, vRawWave + vSlope * 0.2)
    * sunwardSlope
    * mix(1.0, 0.32, distanceConvergence);
  float translucentGlow = peakMask * (0.38 + skyFill * 0.16) * uClarity;
  float glitterDetailFade = (1.0 - smoothstep(6.0, 13.0, viewDistance)) * uSurfaceDetail;
  float glitterNoise = sin(vUv.x * 76.0 + vUv.y * 31.0 + uTime * 0.72) * 0.5 + 0.5;
  float glitterWidth = max(0.035, fwidth(glitterNoise) * 1.8);
  float glitterMask = smoothstep(0.78 - glitterWidth, 0.78 + glitterWidth, glitterNoise);
  float toonSpecular = smoothstep(0.46, 0.54, specular * glitterMask) * nearToonRead;
  float subsurfaceMask = smoothstep(0.045, 0.28, translucentGlow) * (1.0 - uStorm * 0.28);
  color = mix(color, crestMint, subsurfaceMask * 0.72);
  color += fresnel * mix(vec3(0.08, 0.28, 0.34), uWeatherRimColor, uClarity) * (0.16 + uSurfaceDetail * 0.16);
  color += specular * glitterMask * glitterDetailFade * (0.06 + uClarity * 0.12) * vec3(0.86, 1.0, 0.94);
  color += toonSpecular * glitterDetailFade * (0.08 + uClarity * 0.14) * vec3(0.82, 1.0, 0.9);
  float lightningRim = uLightningPulse * (0.2 + fresnel * 1.8) * (0.25 + nearToonRead * 0.75);
  color += lightningRim * uWeatherLightningTint;

  float crestNoise = sin(vUv.x * 29.0 - vUv.y * 21.0 + uTime * 0.34) * 0.5 + 0.5;
  float crestGate = smoothstep(0.32, 0.68, vRawWave + vSlope * 0.22);
  float crestFoam = smoothstep(0.18, 0.72, vFoam + crestNoise * 0.1 + vSlope * 0.2) * uFoam * crestGate;
  crestFoam += smoothstep(0.92, 1.08, grid + vRawWave * 0.08) * uFoam * 0.08;

  float depthFade = smoothstep(10.0, -5.0, vWorldPosition.z);
  color *= 0.88 + depthFade * 0.12 + opticalDepth * 0.12 + skyFill * 0.08;
  color *= 1.0 - uCloudCover * 0.04 - uStorm * 0.06;
  float horizonMist = smoothstep(18.0, 46.0, viewDistance);
  float stylizedFogBand = smoothstep(
    0.38,
    0.78,
    sin(viewDistance * 0.12 + vWorldPosition.y * 1.8 + uTime * 0.035) * 0.5 + 0.5
  );
  float fogDistanceWeight = smoothstep(14.0, 52.0, viewDistance);
  float nearFogRelease = 1.0 - smoothstep(8.0, 24.0 + uStorm * 8.0, viewDistance);
  float weatherFog = clamp(
    horizonMist * uWeatherFogDensity * (0.74 + uRainCurtain * 0.12)
      + stylizedFogBand * uRainCurtain * 0.14 * fogDistanceWeight
      + rainCurtain * (0.1 + fogDistanceWeight * 0.12),
    0.0,
    0.58 + uRainCurtain * 0.16
  );
  weatherFog *= mix(0.76, 1.0, fogDistanceWeight);
  weatherFog *= 1.0 - nearFogRelease * (0.32 + uStorm * 0.24);
  float horizonReflection = horizonMist * (1.0 - smoothstep(-0.45, 0.46, vWorldPosition.y));
  vec3 horizonWaterColor = mix(mid, uWeatherFogColor, 0.18 + uStorm * 0.12);
  color = mix(color, horizonWaterColor, weatherFog * (0.68 + horizonReflection * 0.22));

  float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float edgeFade = smoothstep(0.002, 0.08, edgeDistance);
  color = mix(color * vec3(0.9, 0.95, 0.97), color, edgeFade);
  float stormInk = stormSurfaceContour * (0.18 + uRainCurtain * 0.18);
  color = mix(color, vec3(0.008, 0.16, 0.2), stormInk);
  color += stormSurfaceContour * smoothstep(0.56, 1.0, vRawWave) * uWeatherRimColor * 0.1;
  float stormRainSheet = 0.0;
  if (uStorm > 0.02) {
    stormRainSheet = smoothstep(
      0.52,
      0.78,
      noise(vWorldPosition.xz * vec2(0.06, 0.2) + vec2(-uTime * 0.035, uTime * 0.018))
    ) * uStorm * (0.24 + uRainCurtain * 0.18);
  }
  color = mix(color, vec3(0.006, 0.11, 0.15), stormRainSheet * 0.22);
  color += stormRainSheet * uWeatherRimColor * 0.035;
  float foregroundStormWindow = (1.0 - smoothstep(18.0, 56.0, viewDistance)) * uStorm * uStorm;
  float rainyForegroundGrade = rainBlueSignature * (1.0 - uStorm) * 0.22;
  float stormForegroundGrade = foregroundStormWindow * 0.26 + uStorm * 0.22;
  vec3 weatherForegroundColor = mix(vec3(0.018, 0.116, 0.168), abyss, uStorm);
  color = mix(color, weatherForegroundColor, clamp(rainyForegroundGrade + stormForegroundGrade, 0.0, 0.52));
  float rainValuePhase = smoothstep(0.18, 0.48, uStorm) * (1.0 - smoothstep(0.55, 0.84, uStorm));
  float stormValuePhase = smoothstep(0.58, 0.88, uStorm);
  color = mix(color, vec3(0.24, 0.5, 0.42), rainValuePhase * 0.62);
  color = mix(color, vec3(0.04, 0.14, 0.17), stormValuePhase * 0.64);
  color = mix(color, deep, rainValuePhase * 0.12 + stormValuePhase * 0.32);
  float clearValuePhase = 1.0 - smoothstep(0.08, 0.42, uStorm);
  float ridgeValueIsolation = 1.0 - smoothstep(0.02, 0.12, toonEdgeAccent * crestGate);
  color += clearValuePhase * ridgeValueIsolation * vec3(0.205, 0.215, 0.14);
  color += rainValuePhase * vec3(0.04, 0.045, 0.028);
  float terraceAnchor = 1.0 - smoothstep(1.5, 5.2, length(vWorldPosition.xz - vec2(1.4, 4.8)));
  color = mix(color, deep, terraceAnchor * 0.84);
  color *= 1.0 - rainValuePhase * 0.66;
  color *= 1.0 - stormValuePhase * 0.94;
  float compositionMid = 1.0 - smoothstep(2.0, 7.0, length(vWorldPosition.xz - vec2(4.7, -6.6)));
  vec3 compositionMidColor = mix(vec3(0.063, 0.252, 0.222), vec3(0.27, 0.58, 0.52), uStorm);
  color = mix(color, compositionMidColor, compositionMid * (0.7 - uStorm * 0.05));
  color *= 1.0 - clearValuePhase * 0.08;
  vec3 weatherCrestColor = mix(crestMint, vec3(0.37, 0.7, 0.5), rainValuePhase);
  weatherCrestColor = mix(weatherCrestColor, crestMint, stormValuePhase);
  float clearCrestShoulderStrength = mix(0.24, 0.18, clearMorningFoamLift);
  float crestShoulderMask = smoothstep(0.03, 0.18, toonEdgeAccent * crestGate)
    * mix(clearCrestShoulderStrength, 0.16, smoothstep(0.0, 0.48, uStorm));
  color = mix(color, weatherCrestColor, crestShoulderMask);
  float clearFinalCrestStrength = mix(0.22, 0.18, clearMorningFoamLift);
  float finalCrestMask = smoothstep(0.12, 0.42, toonEdgeAccent * crestGate)
    * mix(clearFinalCrestStrength, 0.74, smoothstep(0.0, 0.48, uStorm))
    * (1.0 - foregroundStormWindow * 0.85);
  color = mix(color, weatherCrestColor, finalCrestMask);
  float distantClearValueCompression = clearValuePhase * smoothstep(22.0, 46.0, viewDistance);
  color = mix(color, vec3(0.18, 0.42, 0.32), distantClearValueCompression);
  float foamRidgeSource = toonEdgeAccent
    * mix(0.38, 1.0, smoothstep(0.48, 0.88, vRawWave))
    * uFoam;
  float foamRidgeMask = smoothstep(0.18, 0.42, foamRidgeSource);
  float slopeFoamMask = smoothstep(0.08, 0.22, vSlope)
    * smoothstep(0.42, 0.78, vRawWave)
    * uFoam;
  float surfaceFoamBand = smoothstep(0.32, 0.58, vRawWave + vSlope * 0.25)
    * smoothstep(0.25, 0.75, uFoam)
    * mix(0.35, 1.0, uStorm);
  float foamSource = max(
    max(max(smoothstep(0.055, 0.24, crestFoam), foamRidgeMask), slopeFoamMask),
    surfaceFoamBand
  );
  float foamWeatherPhase = smoothstep(0.0, 0.48, uStorm);
  float foamThreshold = mix(0.374, 0.575, foamWeatherPhase);
  foamThreshold = mix(foamThreshold, 0.6, stormValuePhase);
  float foamWidth = mix(0.002, 0.08, foamWeatherPhase);
  float foamMask = smoothstep(foamThreshold, foamThreshold + foamWidth, foamSource);
  float clearFoamDetail = smoothstep(0.03, 0.12, crestFoam)
    * smoothstep(0.3, 0.65, vRawWave);
  foamMask *= mix(clearFoamDetail, 1.0, smoothstep(0.0, 0.48, uStorm));
  float clearFoamPatch = mix(
    0.0,
    0.3,
    smoothstep(0.35, 0.6, noise(vOceanXZ * 0.16 + vec2(2.3, -1.7)))
  );
  foamMask *= mix(clearFoamPatch, 1.0, max(foamWeatherPhase, clearMorningFoamLift));
  float clearMorningFoamPatch = smoothstep(
    0.55,
    0.72,
    noise(vOceanXZ * 0.21 + vec2(-4.7, 3.1))
  );
  float clearMorningFoamMask = clearMorningFoamLift * 0.9
    * max(foamRidgeMask, slopeFoamMask)
    * smoothstep(0.28, 0.62, vRawWave)
    * clearMorningFoamPatch;
  foamMask = max(foamMask, clearMorningFoamMask);
  float nearClearFoamSuppression = (1.0 - smoothstep(14.0, 32.0, viewDistance))
    * (1.0 - stormValuePhase)
    * 0.8
    * (1.0 - clearMorningFoamLift);
  float strongClearFoamRidge = smoothstep(0.16, 0.23, foamRidgeSource)
    * smoothstep(0.56, 0.75, vRawWave)
    * (1.0 - foamWeatherPhase);
  foamMask = max(foamMask, strongClearFoamRidge * mix(0.18, 1.0, clearMorningFoamLift));
  float verticalRidgeShare = abs(dFdy(toonPhase)) / max(fwidth(toonPhase), 0.0001);
  float valueFoamWaveMinimum = mix(0.1, 0.14, clearMorningFoamLift);
  float valueFoamWaveMaximum = mix(0.38, 0.42, clearMorningFoamLift);
  valueFoamWaveMinimum = mix(valueFoamWaveMinimum, 0.04, rainValuePhase);
  valueFoamWaveMaximum = mix(valueFoamWaveMaximum, 0.28, rainValuePhase);
  valueFoamWaveMinimum = mix(valueFoamWaveMinimum, 0.0, stormValuePhase);
  valueFoamWaveMaximum = mix(valueFoamWaveMaximum, 0.12, stormValuePhase);
  float valueFoamVerticalMinimum = mix(0.76, 0.66, rainValuePhase);
  float valueFoamVerticalMaximum = mix(0.9, 0.86, rainValuePhase);
  float valueFoamAccentMinimum = mix(0.95, 0.92, rainValuePhase);
  float valueFoamAccentMaximum = mix(0.992, 0.986, rainValuePhase);
  valueFoamVerticalMinimum = mix(valueFoamVerticalMinimum, 0.15, stormValuePhase);
  valueFoamVerticalMaximum = mix(valueFoamVerticalMaximum, 0.45, stormValuePhase);
  valueFoamAccentMinimum = mix(valueFoamAccentMinimum, 0.35, stormValuePhase);
  valueFoamAccentMaximum = mix(valueFoamAccentMaximum, 0.75, stormValuePhase);
  float valueFoamRidge = smoothstep(
    valueFoamVerticalMinimum,
    valueFoamVerticalMaximum,
    verticalRidgeShare
  ) * smoothstep(valueFoamAccentMinimum, valueFoamAccentMaximum, toonEdgeAccent)
    * smoothstep(0.0, 0.35, uFoam);
  float valueFoamResponse = mix(1.0, 0.6, rainValuePhase);
  valueFoamResponse = mix(valueFoamResponse, 0.2, stormValuePhase);
  valueFoamRidge = pow(valueFoamRidge, valueFoamResponse)
    * smoothstep(valueFoamWaveMinimum, valueFoamWaveMaximum, vRawWave);
  foamMask = max(foamMask, valueFoamRidge * mix(0.82, 1.0, stormValuePhase));
  float distantRainFoamRidge = smoothstep(
    0.05,
    0.22,
    verticalRidgeShare * toonEdgeAccent
  ) * smoothstep(0.0, 0.35, uFoam)
    * smoothstep(8.0, 18.0, viewDistance)
    * rainValuePhase * 0.2;
  float distantStormWhitecap = smoothstep(
    0.02,
    0.08,
    verticalRidgeShare * toonEdgeAccent
  ) * smoothstep(0.0, 0.35, uFoam)
    * smoothstep(28.0, 42.0, viewDistance)
    * stormValuePhase;
  foamMask = max(foamMask, max(distantRainFoamRidge, distantStormWhitecap));
  foamMask *= 1.0 - nearClearFoamSuppression;
  foamMask *= 1.0 - foregroundStormWindow * 0.9;
  float stormWhitecapPatch = smoothstep(0.03, 0.16, toonEdgeAccent + vSlope * 0.35)
    * smoothstep(0.6, 0.72, stormSurfaceNoise)
    * smoothstep(0.42, 0.64, uFoam)
    * stormValuePhase;
  foamMask = max(foamMask, stormWhitecapPatch);
  float headlandDistance = abs(signedDistanceToHeadland(vOceanXZ));
  float contactBand = 1.0 - smoothstep(0.03, 0.38, headlandDistance);
  float contactAgitation = smoothstep(0.2, 0.72, vRawWave + vSlope * 0.34);
  float contactBreakup = mix(
    0.58,
    1.0,
    smoothstep(0.3, 0.72, noise(vOceanXZ * 1.7 + vec2(uTime * 0.04, -uTime * 0.03)))
  );
  float contactFoam = contactBand * contactAgitation * contactBreakup * uFoam;
  foamMask = max(foamMask, contactFoam * 0.72);
  float stormBackgroundCompression = stormValuePhase * 0.99
    * (1.0 - compositionMid * 0.965);
  color *= 1.0 - stormBackgroundCompression;
  vec3 valueFoamColor = mix(foamColor, vec3(8.0, 8.3, 6.1), stormValuePhase);
  float visibleFoamMask = mix(
    foamMask,
    step(0.55, foamMask),
    stormValuePhase
  );
  color = mix(color, valueFoamColor, clamp(visibleFoamMask, 0.0, 1.0));
  float strongestClearRidge = smoothstep(0.62, 0.88, verticalRidgeShare)
    * smoothstep(0.9, 0.995, toonEdgeAccent)
    * (1.0 - foamWeatherPhase);
  float strongestClearRidgeLift = mix(0.2565, 0.12, clearMorningFoamLift);
  color += strongestClearRidge * strongestClearRidgeLift * vec3(1.0, 1.0, 0.78);
  float weatherTransparency = uStorm * 0.04 + foregroundStormWindow * 0.08 + uRainCurtain * 0.03;
  float surfaceAlpha = clamp((mix(0.66, 0.82, uClarity) - weatherTransparency) * mix(0.86, 1.0, edgeFade), 0.28, 0.84);
  float foamAlphaLift = mix(
    smoothstep(0.1, 0.7, foamMask) * (1.0 - stormValuePhase),
    smoothstep(0.1, 0.7, visibleFoamMask),
    stormValuePhase
  );
  surfaceAlpha = mix(surfaceAlpha, mix(0.88, 0.9, stormValuePhase), foamAlphaLift);
  gl_FragColor = vec4(color, surfaceAlpha);
}
