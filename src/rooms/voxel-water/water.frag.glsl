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
  for (int i = 0; i < 3; i++) {
    value += noise(p) * amplitude;
    p = p * 2.03 + vec2(7.1, 3.4);
    amplitude *= 0.52;
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
  float nearToonRead = 1.0 - smoothstep(9.0, 26.0, viewDistance);
  float smoothRamp = smoothstep(0.05, 0.95, vWave);
  float toonColorRamp = mix(smoothRamp, toonRamp, 0.42 + nearToonRead * 0.58);
  vec3 color = mix(deep, mid, smoothstep(0.08, 0.72, toonColorRamp));
  color = mix(color, shallow, smoothstep(0.42, 0.95, toonColorRamp) * (0.14 + nearToonRead * 0.44 + uClarity * 0.16));
  color = mix(color, lagoon, smoothstep(0.68, 0.98, toonColorRamp) * 0.18 * nearToonRead * (1.0 - uStorm * 0.5));
  color = mix(color, stormTint, uStorm * 0.14 + uCloudCover * 0.06);
  color = mix(color, deep * vec3(0.92, 1.05, 1.12), (1.0 - smoothRamp) * uClarity * 0.08);
  color += smoothRamp * uClarity * vec3(0.02, 0.08, 0.06);
  color = mix(color, color * vec3(0.74, 0.92, 0.96), toonEdgeAccent * nearToonRead * (0.12 + uClarity * 0.12));
  color += toonEdgeAccent * nearToonRead * smoothstep(0.45, 0.95, toonColorRamp) * vec3(0.04, 0.18, 0.16);

  vec2 stableCell = floor(vWorldPosition.xz / 0.3);
  float cellTint = hash(stableCell) - 0.5;
  float warmMix = smoothstep(0.0, 1.0, uColorTemperature);
  float coolMix = smoothstep(0.0, 1.0, -uColorTemperature);
  color += cellTint * uVoxelColorVariance * vec3(0.035, 0.07, 0.055);
  color = mix(color, color * vec3(0.8, 0.92, 1.12), coolMix * 0.24);
  color = mix(color, color * vec3(1.12, 0.98, 0.82), warmMix * 0.2);

  float grid = gridLine(vUv);
  float gridDistanceFade = 1.0 - smoothstep(8.0, 15.0, viewDistance);
  grid *= gridDistanceFade;
  float gridIntensity = grid * (0.07 + uRain * 0.08) * (0.45 + vRawWave * 0.45);
  color = mix(color, vec3(0.5, 0.86, 0.88), gridIntensity);

  vec2 rainSurfaceCells = vec2(72.0, 48.0);
  float rainCell = hash(floor(vUv * rainSurfaceCells));
  float rainPhase = fract(rainCell * 13.7 + uTime * (1.2 + uRain * 1.1));
  float rainPulse = 1.0 - smoothstep(0.0, 0.24, abs(rainPhase - 0.12));
  float rainChance = smoothstep(0.82 - uRain * 0.12, 0.96 - uRain * 0.04, rainCell);
  float rainSpark = rainPulse * rainChance * uRain;
  float ripple = smoothstep(0.46, 0.5, abs(fract(length(vUv * 24.0 + rainCell) - uTime * 1.8) - 0.5));
  color += rainSpark * vec3(0.28, 0.54, 0.78);
  color += ripple * uRain * 0.026 * vec3(0.46, 0.78, 0.92);

  float currentAngle = radians(uCurrentDirection);
  vec2 currentDirection = normalize(vec2(cos(currentAngle), sin(currentAngle)));
  vec2 currentRight = vec2(-currentDirection.y, currentDirection.x);
  vec2 flowSpace = vec2(dot(vWorldPosition.xz, currentRight), dot(vWorldPosition.xz, currentDirection));
  float flowNoise = fbm(flowSpace * vec2(0.28, 1.25) + vec2(0.0, -uTime * (0.1 + uCurrentStrength * 0.42)));
  float flowRibbon = smoothstep(0.7, 0.88, flowNoise + vRawWave * 0.12) * uCurrentStrength;
  flowRibbon *= (0.22 + uFoam * 0.34) * (1.0 - smoothstep(7.0, 15.0, viewDistance));
  color = mix(color, foamColor, flowRibbon * 0.18);
  color += flowRibbon * vec3(0.06, 0.18, 0.2);

  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float normalDetailFade = (1.0 - smoothstep(6.5, 14.0, viewDistance)) * uSurfaceDetail;
  vec3 normal = normalize(vWaterNormal + vec3(
    (fbm(vUv * 16.0 + uTime * 0.1) - 0.5) * 0.18 * normalDetailFade,
    0.0,
    (fbm(vUv * 14.0 - uTime * 0.08) - 0.5) * 0.18 * normalDetailFade
  ));
  vec3 lightDir = normalize(vec3(-0.35, 0.82, 0.44));
  float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 5.0);
  float specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), mix(18.0, 62.0, uClarity));
  float translucentGlow = (smoothstep(-0.72, 0.62, vWorldPosition.y) * (0.22 + skyFill * 0.16) + fresnel * 0.28) * uClarity;
  float glitterDetailFade = (1.0 - smoothstep(6.0, 13.0, viewDistance)) * uSurfaceDetail;
  float glitterNoise = fbm(vUv * 34.0 + vec2(uTime * 0.38, -uTime * 0.16));
  float glitterWidth = max(0.035, fwidth(glitterNoise) * 1.8);
  float glitterMask = smoothstep(0.78 - glitterWidth, 0.78 + glitterWidth, glitterNoise);
  float toonSpecular = smoothstep(0.46, 0.54, specular * glitterMask) * nearToonRead;
  color += translucentGlow * vec3(0.12, 0.42, 0.38);
  color += fresnel * mix(vec3(0.08, 0.28, 0.34), vec3(0.34, 0.78, 0.84), uClarity) * (0.16 + uSurfaceDetail * 0.16);
  color += specular * glitterMask * glitterDetailFade * (0.06 + uClarity * 0.12) * vec3(0.86, 1.0, 0.94);
  color += toonSpecular * glitterDetailFade * (0.08 + uClarity * 0.14) * vec3(0.82, 1.0, 0.9);

  float crestNoise = fbm(vUv * 14.0 + vec2(uTime * 0.16, -uTime * 0.1));
  float crestGate = smoothstep(0.62, 0.9, vRawWave + vSlope * 0.16);
  float crestFoam = smoothstep(0.68, 1.02, vFoam + crestNoise * 0.1 + vSlope * 0.14) * uFoam * crestGate;
  crestFoam += smoothstep(0.92, 1.08, grid + vRawWave * 0.08) * uFoam * 0.08;
  color = mix(color, foamColor, clamp(crestFoam, 0.0, 0.56));

  float depthFade = smoothstep(10.0, -5.0, vWorldPosition.z);
  color *= 0.88 + depthFade * 0.12 + opticalDepth * 0.12 + skyFill * 0.08;
  color *= 1.0 - uCloudCover * 0.04 - uStorm * 0.06;
  float horizonMist = smoothstep(18.0, 46.0, viewDistance);
  vec3 horizonWaterColor = mix(vec3(0.5, 0.82, 0.86), vec3(0.58, 0.74, 0.82), uCloudCover + uStorm * 0.4);
  color = mix(color, horizonWaterColor, horizonMist * (0.42 + uCloudCover * 0.12));

  float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float edgeFade = smoothstep(0.004, 0.045, edgeDistance);
  color = mix(color * vec3(0.72, 0.86, 0.92), color, edgeFade);

  float surfaceAlpha = (mix(0.9, 0.97, uClarity) - uStorm * 0.03) * mix(0.9, 1.0, edgeFade);
  gl_FragColor = vec4(color, surfaceAlpha);
}
