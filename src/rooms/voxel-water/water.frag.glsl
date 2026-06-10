uniform float uTime;
uniform float uRain;
uniform float uStorm;
uniform float uCloudCover;
uniform float uToonSteps;
uniform float uFoam;
uniform float uClarity;
uniform float uSurfaceDetail;
uniform float uCurrentDirection;
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
uniform float uLightningPulse;

varying vec2 vUv;
varying float vWave;
varying float vRawWave;
varying float vFoam;
varying float vSlope;
varying vec3 vWorldPosition;
varying vec3 vWaterNormal;

float gridLine(vec2 uv) {
  vec2 gridUv = uv * 28.0;
  vec2 gridDerivativeX = dFdx(gridUv);
  vec2 gridDerivativeY = dFdy(gridUv);
  vec2 gridFootprint = vec2(
    length(vec2(gridDerivativeX.x, gridDerivativeY.x)),
    length(vec2(gridDerivativeX.y, gridDerivativeY.y))
  );
  vec2 lineWidth = clamp(vec2(0.075), gridFootprint, vec2(0.48));
  vec2 lineAA = max(gridFootprint * 1.65, vec2(0.015));
  vec2 gridUvDistance = abs(fract(gridUv - 0.5) - 0.5);
  vec2 axisLines = smoothstep(lineWidth + lineAA, lineWidth - lineAA, gridUvDistance);
  float footprintFade = 1.0 - smoothstep(0.18, 0.62, max(gridFootprint.x, gridFootprint.y));
  return max(axisLines.x, axisLines.y) * footprintFade;
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
  for (int i = 0; i < 2; i++) {
    value += noise(p) * amplitude;
    p = p * 2.03 + vec2(7.1, 3.4);
    amplitude *= 0.58;
  }
  return value;
}

void main() {
  float toonPhase = vWave * uToonSteps;
  float toonRamp = floor(toonPhase) / max(uToonSteps, 1.0);
  float toonBandDistance = min(fract(toonPhase), 1.0 - fract(toonPhase));
  float toonBandWidth = max(fwidth(toonPhase), 0.012);
  float toonEdgeAccent = 1.0 - smoothstep(toonBandWidth, 0.085 + toonBandWidth, toonBandDistance);
  vec3 deep = mix(vec3(0.014, 0.2, 0.32), vec3(0.026, 0.38, 0.48), uClarity);
  vec3 mid = mix(vec3(0.03, 0.5, 0.62), vec3(0.12, 0.78, 0.84), uClarity);
  vec3 shallow = vec3(0.34, 0.92, 0.96);
  vec3 lagoon = vec3(0.42, 1.0, 0.84);
  vec3 foamColor = vec3(0.95, 1.0, 0.92);
  vec3 stormTint = vec3(0.38, 0.5, 0.58);
  float opticalDepth = smoothstep(-1.0, 0.85, vWorldPosition.y);
  float skyFill = smoothstep(0.05, 0.82, sin(uSkyTime * 3.14159265));
  float viewDistance = length(cameraPosition - vWorldPosition);
  float nearToonRead = 1.0 - smoothstep(12.0, 34.0, viewDistance);
  float smoothRamp = smoothstep(0.05, 0.95, vWave);
  float toonColorRamp = mix(smoothRamp, toonRamp, 0.42 + nearToonRead * 0.58);
  vec3 color = mix(deep, mid, smoothstep(0.08, 0.72, toonColorRamp));
  color = mix(color, shallow, smoothstep(0.42, 0.95, toonColorRamp) * (0.14 + nearToonRead * 0.44 + uClarity * 0.16));
  color = mix(color, lagoon, smoothstep(0.68, 0.98, toonColorRamp) * 0.18 * nearToonRead * (1.0 - uStorm * 0.5));
  color = mix(color, stormTint, uStorm * 0.14 + uCloudCover * 0.06);
  color = mix(color, uWeatherWaterTint, (0.12 + uRainCurtain * 0.16 + uStorm * 0.08) * (0.55 + nearToonRead * 0.45));
  float clearMintSignature = (1.0 - uStorm) * (1.0 - smoothstep(0.18, 0.56, uRainCurtain));
  float rainBlueSignature = smoothstep(0.18, 0.54, uRainCurtain) * (1.0 - uStorm * 0.45);
  color = mix(color, lagoon, clearMintSignature * smoothstep(0.34, 0.96, toonColorRamp) * (0.08 + nearToonRead * 0.07));
  color = mix(color, vec3(0.16, 0.48, 0.74), rainBlueSignature * (0.08 + nearToonRead * 0.04));
  color = mix(color, deep * vec3(0.92, 1.05, 1.12), (1.0 - smoothRamp) * uClarity * 0.08);
  color += smoothRamp * uClarity * vec3(0.02, 0.08, 0.06);
  color = mix(color, color * vec3(0.74, 0.92, 0.96), toonEdgeAccent * nearToonRead * (0.12 + uClarity * 0.12));
  color += toonEdgeAccent * nearToonRead * smoothstep(0.45, 0.95, toonColorRamp) * vec3(0.04, 0.18, 0.16);
  float stormToonContrast = uStorm * (0.28 + nearToonRead * 0.72);
  color = mix(color, uWeatherRimColor, toonEdgeAccent * stormToonContrast * (0.06 + uRainCurtain * 0.05));
  color += toonEdgeAccent * stormToonContrast * smoothstep(0.38, 0.96, toonColorRamp) * vec3(0.02, 0.12, 0.14);

  vec2 stableCell = floor(vWorldPosition.xz / 0.3);
  float cellTint = hash(stableCell) - 0.5;
  float warmMix = smoothstep(0.0, 1.0, uColorTemperature);
  float coolMix = smoothstep(0.0, 1.0, -uColorTemperature);
  color += cellTint * uVoxelColorVariance * vec3(0.035, 0.07, 0.055);
  color = mix(color, color * vec3(0.8, 0.92, 1.12), coolMix * 0.24);
  color = mix(color, color * vec3(1.12, 0.98, 0.82), warmMix * 0.2);

  float grid = gridLine(vUv);
  float gridDistanceFade = 1.0 - smoothstep(14.0, 48.0 + uStorm * 20.0, viewDistance);
  float voxelSurfaceGrid = 0.0;
  if (uStorm > 0.02 || rainBlueSignature > 0.02) {
    voxelSurfaceGrid = gridLine(vWorldPosition.xz * 0.075);
    voxelSurfaceGrid *= (1.0 - smoothstep(22.0, 68.0, viewDistance)) * (uStorm * 0.92 + rainBlueSignature * 0.22);
  }
  grid = max(grid * gridDistanceFade, voxelSurfaceGrid);
  float gridIntensity = grid * (0.08 + uRain * 0.05 + uStorm * 0.07) * (0.45 + vRawWave * 0.45);
  color = mix(color, vec3(0.5, 0.86, 0.88), gridIntensity);
  float stormSurfaceContour = 0.0;
  if (uStorm > 0.02) {
    float stormContourPhase = vWave * (uToonSteps + 2.0) + noise(vWorldPosition.xz * 0.18) * 0.34;
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
    float ripple = smoothstep(0.46, 0.5, abs(fract(length(vUv * 18.0 + rainCell) - uTime * 1.8) - 0.5));
    rainCurtain = smoothstep(
      0.5,
      0.86,
      noise(vWorldPosition.xz * 0.055 + vec2(-uTime * 0.08, uTime * 0.035))
    ) * uRainCurtain;
    color += rainSpark * vec3(0.28, 0.54, 0.78);
    color += ripple * uRain * 0.022 * vec3(0.46, 0.78, 0.92);
    color = mix(color, uWeatherFogColor, rainCurtain * 0.14);
  }

  float currentAngle = radians(uCurrentDirection);
  vec2 currentDirection = normalize(vec2(cos(currentAngle), sin(currentAngle)));
  vec2 currentRight = vec2(-currentDirection.y, currentDirection.x);
  vec2 flowSpace = vec2(dot(vWorldPosition.xz, currentRight), dot(vWorldPosition.xz, currentDirection));
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
  vec3 lightDir = normalize(vec3(-0.35, 0.82, 0.44));
  float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 5.0);
  float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), mix(18.0, 62.0, uClarity));
  float translucentGlow = (smoothstep(-0.72, 0.62, vWorldPosition.y) * (0.22 + skyFill * 0.16) + fresnel * 0.28) * uClarity;
  float glitterDetailFade = (1.0 - smoothstep(6.0, 13.0, viewDistance)) * uSurfaceDetail;
  float glitterNoise = sin(vUv.x * 76.0 + vUv.y * 31.0 + uTime * 0.72) * 0.5 + 0.5;
  float glitterWidth = max(0.035, fwidth(glitterNoise) * 1.8);
  float glitterMask = smoothstep(0.78 - glitterWidth, 0.78 + glitterWidth, glitterNoise);
  float toonSpecular = smoothstep(0.46, 0.54, specular * glitterMask) * nearToonRead;
  color += translucentGlow * vec3(0.12, 0.42, 0.38);
  color += fresnel * mix(vec3(0.08, 0.28, 0.34), uWeatherRimColor, uClarity) * (0.16 + uSurfaceDetail * 0.16);
  color += specular * glitterMask * glitterDetailFade * (0.06 + uClarity * 0.12) * vec3(0.86, 1.0, 0.94);
  color += toonSpecular * glitterDetailFade * (0.08 + uClarity * 0.14) * vec3(0.82, 1.0, 0.9);
  float lightningRim = uLightningPulse * (0.2 + fresnel * 1.8) * (0.25 + nearToonRead * 0.75);
  color += lightningRim * uWeatherLightningTint;

  float crestNoise = sin(vUv.x * 29.0 - vUv.y * 21.0 + uTime * 0.34) * 0.5 + 0.5;
  float crestGate = smoothstep(0.62, 0.9, vRawWave + vSlope * 0.16);
  float crestFoam = smoothstep(0.68, 1.02, vFoam + crestNoise * 0.1 + vSlope * 0.14) * uFoam * crestGate;
  crestFoam += smoothstep(0.92, 1.08, grid + vRawWave * 0.08) * uFoam * 0.08;
  color = mix(color, foamColor, clamp(crestFoam, 0.0, 0.56));

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
  vec3 horizonWaterColor = mix(uWeatherFogColor, vec3(0.5, 0.88, 0.9), max(0.0, 0.38 - uStorm));
  color = mix(color, horizonWaterColor, weatherFog);

  float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float edgeFade = smoothstep(0.004, 0.045, edgeDistance);
  color = mix(color * vec3(0.72, 0.86, 0.92), color, edgeFade);
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
  float stormGridInk = voxelSurfaceGrid * uStorm;
  color = mix(color, vec3(0.002, 0.08, 0.11), stormGridInk * 0.36);
  color += stormGridInk * (uWeatherRimColor * 0.18 + vec3(0.02, 0.16, 0.18) * nearToonRead);

  float foregroundStormWindow = (1.0 - smoothstep(18.0, 56.0, viewDistance)) * uStorm * uStorm;
  float rainyForegroundGrade = rainBlueSignature * (1.0 - uStorm) * 0.34;
  float stormForegroundGrade = foregroundStormWindow * 0.34 + uStorm * 0.18;
  vec3 weatherForegroundColor = mix(vec3(0.08, 0.34, 0.58), vec3(0.024, 0.22, 0.28), uStorm);
  color = mix(color, weatherForegroundColor, clamp(rainyForegroundGrade + stormForegroundGrade, 0.0, 0.58));
  float weatherTransparency = uStorm * 0.12 + foregroundStormWindow * 0.36 + uRainCurtain * 0.05;
  float surfaceAlpha = clamp((mix(0.66, 0.82, uClarity) - weatherTransparency) * mix(0.86, 1.0, edgeFade), 0.28, 0.84);
  gl_FragColor = vec4(color, surfaceAlpha);
}
