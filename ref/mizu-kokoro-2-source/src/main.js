import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const canvas = $('#scene');
const loading = $('#loading');
const fpsEl = $('#fps');
const pipelineEl = $('#pipeline');
const stateNameEl = $('#state-name');
const materialTypeEl = $('#material-type');
const materialMetricsEl = $('#material-metrics');
const materialNoteEl = $('#material-note');
const matterStateEl = $('#matter-state');
const toastEl = $('#toast');
const panel = $('#lab-panel');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

const clamp01 = (value) => THREE.MathUtils.clamp(value, 0, 1);
const damp = (current, target, lambda, delta) => THREE.MathUtils.damp(current, target, lambda, delta);
const hexColor = (value) => new THREE.Color(value);

const bridgeContext = 'shader-demo-room';
const bridgeVersion = 1;
const bridgeCapabilities = Object.freeze(['pause', 'stats', 'set-mode', 'set-quality']);
const embeddedBridge = window.parent === window
  ? null
  : Object.freeze({ instanceId: crypto.randomUUID(), targetOrigin: location.origin });

function isPlainRecord(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.getPrototypeOf(value) === Object.prototype;
}

function hasExactKeys(value, expectedKeys) {
  if (!isPlainRecord(value)) return false;
  const actualKeys = Object.keys(value).sort();
  const sortedExpectedKeys = [...expectedKeys].sort();
  return actualKeys.length === sortedExpectedKeys.length
    && actualKeys.every((key, index) => key === sortedExpectedKeys[index]);
}

function postBridgeMessage(type, payload) {
  if (!embeddedBridge) return;
  window.parent.postMessage({
    context: bridgeContext,
    v: bridgeVersion,
    instanceId: embeddedBridge.instanceId,
    type,
    payload
  }, embeddedBridge.targetOrigin);
}

function assertCommandPayload(type, payload) {
  if (type === 'set-paused') {
    if (!hasExactKeys(payload, ['paused']) || typeof payload.paused !== 'boolean') {
      throw new Error('Invalid set-paused payload');
    }
    return;
  }
  if (type === 'set-orb-mode') {
    if (!hasExactKeys(payload, ['mode']) || !Number.isInteger(payload.mode) || payload.mode < 0 || payload.mode > 3) {
      throw new Error('Invalid set-orb-mode payload');
    }
    return;
  }
  if (type === 'set-orb-quality') {
    if (!hasExactKeys(payload, ['quality']) || !['high', 'medium', 'low'].includes(payload.quality)) {
      throw new Error('Invalid set-orb-quality payload');
    }
    return;
  }
  throw new Error(`Unknown embedded command: ${String(type)}`);
}

function handleBridgeMessage(event) {
  if (!embeddedBridge || event.origin !== location.origin || event.source !== window.parent) return;
  const message = event.data;
  if (!hasExactKeys(message, ['context', 'v', 'instanceId', 'type', 'payload'])) {
    throw new Error('Invalid embedded command envelope');
  }
  if (message.context !== bridgeContext || message.v !== bridgeVersion) {
    throw new Error('Embedded command envelope does not match this runtime');
  }
  if (message.instanceId !== embeddedBridge.instanceId) return;
  if (typeof message.type !== 'string') throw new Error('Embedded command type must be a string');
  assertCommandPayload(message.type, message.payload);

  if (message.type === 'set-paused') {
    setHostPaused(message.payload.paused);
  } else if (message.type === 'set-orb-mode') {
    setMode(message.payload.mode);
  } else if (message.type === 'set-orb-quality') {
    applyQuality(message.payload.quality);
  }
}

const modes = [
  {
    zh: '静水', en: 'CALM', material: 'AQUEOUS / WATER',
    deep: '#031522', mid: '#14c8ef', light: '#efffff', accent: '#68f2ff', ink: '#01070d',
    floor: '#48ebff', backdrop: '#0f708c',
    deform: 0.78, speed: 0.78, bloom: 0.46, chroma: 0.25, posterize: 0.0, rim: 1.02,
    viscosity: 0.16, tension: 0.92, swell: 0.18, flow: 0.35, turbulence: 0.18,
    foam: 0.08, clarity: 0.94, elasticity: 1.08, recovery: 1.22, shear: 0.72,
    note: 55,
    noteZh: '高表面张力、清澈折射与短促毛细波。'
  },
  {
    zh: '涨潮', en: 'SURGE', material: 'OCEANIC / BREAKER',
    deep: '#1b0923', mid: '#ec3b9b', light: '#fff7df', accent: '#ffb72f', ink: '#10030d',
    floor: '#ff56ba', backdrop: '#8b2859',
    deform: 1.34, speed: 1.16, bloom: 0.72, chroma: 0.72, posterize: 0.0, rim: 1.17,
    viscosity: 0.07, tension: 0.54, swell: 1.0, flow: 1.2, turbulence: 0.92,
    foam: 1.0, clarity: 0.62, elasticity: 0.82, recovery: 0.92, shear: 1.22,
    note: 65.41,
    noteZh: '低黏度大惯性浪涌，陡峭波峰与破碎泡沫。'
  },
  {
    zh: '绽生', en: 'BLOOM', material: 'VISCOUS / PROTOPLASM',
    deep: '#061b19', mid: '#35dea8', light: '#f4ffed', accent: '#b2ff4d', ink: '#02100d',
    floor: '#63ffc3', backdrop: '#1b826b',
    deform: 1.12, speed: 0.72, bloom: 0.6, chroma: 0.42, posterize: 0.0, rim: 1.1,
    viscosity: 0.9, tension: 0.7, swell: 0.34, flow: 0.76, turbulence: 0.28,
    foam: 0.12, clarity: 0.48, elasticity: 0.38, recovery: 0.34, shear: 1.52,
    note: 73.42,
    noteZh: '高黏度活体胶质，形变滞留并拉出缓慢流丝。'
  },
  {
    zh: '零界', en: 'VOID', material: 'METALLIC / SUPERCOOLED',
    deep: '#010204', mid: '#9eabb5', light: '#ffffff', accent: '#ff3a52', ink: '#000000',
    floor: '#e4fbff', backdrop: '#677984',
    deform: 0.68, speed: 0.6, bloom: 0.39, chroma: 1.08, posterize: 0.72, rim: 1.42,
    viscosity: 0.24, tension: 1.24, swell: 0.08, flow: 0.16, turbulence: 0.12,
    foam: 0.0, clarity: 0.72, elasticity: 1.34, recovery: 1.48, shear: 0.58,
    note: 41.2,
    noteZh: '超冷却金属水体，流动稀少、回弹尖锐并带离散扫描。'
  }
].map((mode) => ({
  ...mode,
  deepColor: hexColor(mode.deep),
  midColor: hexColor(mode.mid),
  lightColor: hexColor(mode.light),
  accentColor: hexColor(mode.accent),
  inkColor: hexColor(mode.ink),
  floorColor: hexColor(mode.floor),
  backdropColor: hexColor(mode.backdrop)
}));

const settings = {
  userDeform: 1,
  userSpeed: 1,
  outline: 1,
  bloom: 1,
  chroma: 0.45,
  flow: 1,
  liveliness: 1,
  quality: isCoarsePointer ? 'medium' : 'high'
};

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true
  });
} catch (error) {
  loading.innerHTML = `<p>WEBGL INITIALIZATION FAILED<br>${String(error.message || error)}</p>`;
  throw error;
}

renderer.setClearColor(0x03060d, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.86;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.debug.checkShaderErrors = true;

pipelineEl.textContent = renderer.capabilities.isWebGL2 ? 'WEBGL2 / GLSL' : 'WEBGL / GLSL';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03060d);
scene.fog = new THREE.FogExp2(0x03060d, 0.042);

const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 80);
camera.position.set(0, 1.05, 8.1);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.42, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = 5.2;
controls.maxDistance = 10.2;
controls.minPolarAngle = 0.72;
controls.maxPolarAngle = 1.72;
controls.minAzimuthAngle = -1.0;
controls.maxAzimuthAngle = 1.0;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.35;
controls.update();

const cameraFrames = Object.freeze({
  default: Object.freeze({ fov: 42, targetY: 0.42, offsetY: 0.63, positionZ: 8.1 }),
  portrait: Object.freeze({ fov: 42, targetY: 0.05, offsetY: 0.62, positionZ: 10.18 }),
  compact: Object.freeze({ fov: 58, targetY: -0.65, offsetY: 0.54, positionZ: 10.18 })
});
let activeCameraFrame = '';

function applyResponsiveCameraFrame(width, height) {
  const frameName = width <= 420 ? (height <= 520 ? 'compact' : 'portrait') : 'default';
  if (frameName === activeCameraFrame) return;
  const frame = cameraFrames[frameName];
  const orbitDistance = Math.hypot(frame.offsetY, frame.positionZ);
  if (orbitDistance < controls.minDistance || orbitDistance > controls.maxDistance) {
    throw new Error(`Orb ${frameName} camera frame violates OrbitControls distance limits.`);
  }
  camera.fov = frame.fov;
  camera.position.set(0, frame.targetY + frame.offsetY, frame.positionZ);
  controls.target.set(0, frame.targetY, 0);
  controls.update();
  activeCameraFrame = frameName;
}

const hemi = new THREE.HemisphereLight(0x9eeeff, 0x12040f, 0.72);
scene.add(hemi);

const keyLight = new THREE.SpotLight(0xd9fbff, 52, 24, Math.PI / 5.5, 0.7, 1.5);
keyLight.position.set(-4.5, 7.0, 5.4);
keyLight.target.position.set(0, 0, 0);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.bias = -0.0002;
scene.add(keyLight, keyLight.target);

const rimLight = new THREE.PointLight(0xff4fd8, 22, 16, 2);
rimLight.position.set(4.2, 1.8, -2.2);
scene.add(rimLight);

const refractionTarget = new THREE.WebGLRenderTarget(1, 1, {
  depthBuffer: true,
  stencilBuffer: false,
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter
});
refractionTarget.texture.name = 'MIZU_REFRACTION_BUFFER';
refractionTarget.texture.generateMipmaps = false;

const commonNoiseGLSL = /* glsl */`
#define PI 3.141592653589793

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yxx) * p3.zyx);
}

float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash31(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash31(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash31(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash31(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash31(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash31(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash31(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash31(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  float nxy0 = mix(nx00, nx10, f.y);
  float nxy1 = mix(nx01, nx11, f.y);
  return mix(nxy0, nxy1, f.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.52;
  mat3 rot = mat3(
    0.00, 0.80, 0.60,
   -0.80, 0.36,-0.48,
   -0.60,-0.48, 0.64
  );
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise3(p);
    p = rot * p * 2.03 + 0.17;
    amplitude *= 0.5;
  }
  return value;
}

float ridgedFbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.55;
  for (int i = 0; i < 4; i++) {
    float n = noise3(p);
    value += (1.0 - abs(n * 2.0 - 1.0)) * amplitude;
    p = p * 2.07 + vec3(0.31, -0.17, 0.23);
    amplitude *= 0.48;
  }
  return value;
}

vec4 modeWeights(float mode) {
  vec4 w = max(vec4(1.0) - abs(vec4(mode) - vec4(0.0, 1.0, 2.0, 3.0)), 0.0);
  return w / max(dot(w, vec4(1.0)), 0.0001);
}

float angularDistance(vec3 a, vec3 b) {
  return acos(clamp(dot(normalize(a), normalize(b)), -1.0, 1.0));
}

vec3 surfaceFlowVector(vec3 direction, float time, float turbulence) {
  vec3 d = normalize(direction);
  vec3 axisA = normalize(vec3(0.22, 0.96, 0.18));
  vec3 axisB = normalize(vec3(-0.78, 0.18, 0.60));
  vec3 flow = cross(axisA, d) * (0.72 + 0.28 * sin(dot(d, axisB) * 8.0 + time * 0.31));
  flow += cross(axisB, d) * (0.34 + 0.24 * cos(dot(d, axisA) * 11.0 - time * 0.21));

  float e = 0.035;
  vec3 q = d * 3.7 + vec3(time * 0.035, -time * 0.028, time * 0.021);
  vec3 gradient = vec3(
    noise3(q + vec3(e, 0.0, 0.0)) - noise3(q - vec3(e, 0.0, 0.0)),
    noise3(q + vec3(0.0, e, 0.0)) - noise3(q - vec3(0.0, e, 0.0)),
    noise3(q + vec3(0.0, 0.0, e)) - noise3(q - vec3(0.0, 0.0, e))
  );
  vec3 curlish = cross(d, gradient / (2.0 * e));
  flow = mix(flow, curlish, clamp(turbulence * 0.68, 0.0, 0.82));
  flow -= d * dot(flow, d);
  return normalize(flow + vec3(0.0001));
}
`;

const deformGLSL = /* glsl */`
uniform float uTime;
uniform float uDeform;
uniform float uTouchStrength;
uniform float uPointerVelocity;
uniform float uPulse;
uniform float uAudio;
uniform float uTension;
uniform float uMode;
uniform float uViscosity;
uniform float uSwell;
uniform float uFlowStrength;
uniform float uTurbulence;
uniform float uElasticity;
uniform float uShear;
uniform float uFreezeProgress;
uniform float uReleaseTime;
uniform float uReleaseEnergy;
uniform vec3 uTouchPoint;
uniform vec3 uDragVector;
uniform vec3 uReleasePoint;
uniform vec3 uReleaseVector;
uniform vec4 uRipples[5];

float rippleField(vec3 dir) {
  float sum = 0.0;
  for (int i = 0; i < 5; i++) {
    float age = uTime - uRipples[i].w;
    float alive = step(0.0, age) * step(age, 5.6);
    float dist = angularDistance(dir, uRipples[i].xyz);
    float frequency = mix(14.0, 31.0, clamp(uTension, 0.0, 1.3));
    float velocity = mix(4.6, 13.5, clamp(uTension, 0.0, 1.3));
    float damping = mix(0.48, 1.4, 1.0 - uViscosity);
    float envelope = exp(-dist * mix(3.4, 7.2, uTension)) * exp(-age * damping);
    sum += sin(dist * frequency - age * velocity) * envelope * alive;
  }
  return sum;
}

float releaseField(vec3 dir) {
  float age = uTime - uReleaseTime;
  float alive = step(0.0, age) * exp(-age * mix(3.8, 0.82, uViscosity));
  float dist = angularDistance(dir, uReleasePoint);
  float waveRadius = age * mix(3.5, 1.05, uViscosity);
  float frequency = mix(24.0, 10.0, uViscosity);
  float traveling = sin((dist - waveRadius) * frequency) * exp(-dist * 2.3);
  float localSnap = cos(age * mix(16.0, 5.4, uViscosity))
    * exp(-age * mix(4.5, 1.15, uViscosity))
    * exp(-dist * dist * mix(22.0, 8.0, uViscosity));
  return (traveling * 0.12 + localSnap * 0.28) * alive * uReleaseEnergy * uElasticity;
}

float displacementField(vec3 p, vec3 n) {
  vec3 dir = normalize(p);
  vec4 weights = modeWeights(uMode);
  float mobile = 1.0 - uFreezeProgress * 0.94;
  float fluidTime = uTime * mix(1.0, 0.34, uViscosity);
  vec3 flow = surfaceFlowVector(dir, fluidTime, uTurbulence);
  float flowOscillation = sin(fluidTime * 0.37) * 0.16 + sin(fluidTime * 0.13 + 1.7) * 0.08;
  vec3 advected = normalize(dir - flow * flowOscillation * uFlowStrength);

  float largeFlow = fbm(advected * mix(2.25, 1.5, uViscosity)
    + vec3(fluidTime * 0.12, -fluidTime * 0.075, fluidTime * 0.09)) - 0.5;
  float fineFlow = noise3(advected * 7.2
    + vec3(-fluidTime * 0.42, fluidTime * 0.29, fluidTime * 0.19)) - 0.5;

  vec3 waveA = normalize(vec3(0.82, 0.22, 0.52));
  vec3 waveB = normalize(vec3(-0.34, 0.58, 0.74));
  float capillary = sin(dot(dir, waveA) * 22.0 - fluidTime * 3.4)
    * sin(dot(dir, waveB) * 17.0 + fluidTime * 2.7) * 0.012 * weights.x;

  float swellWave = sin(dot(dir, waveA) * 4.4 - fluidTime * 1.75)
    + sin(dot(dir, waveB) * 6.1 - fluidTime * 1.18 + 1.2) * 0.58;
  float swell = swellWave * 0.085 * uSwell;
  float breaker = pow(max(0.0, swellWave * 0.5 + 0.38), 4.0) * 0.075 * uSwell * weights.y;

  float viscousLobe = (ridgedFbm(advected * 1.65 + vec3(fluidTime * 0.055, 0.0, -fluidTime * 0.04)) - 0.54)
    * 0.19 * uViscosity * (0.35 + weights.z * 0.95);
  float breath = sin(fluidTime * mix(1.4, 0.52, uViscosity) + dir.y * 3.1 + dir.x * 1.8) * 0.018;

  float heldTime = floor(fluidTime * 10.0) / 10.0;
  float metallicScan = sin((dir.y + noise3(dir * 4.2)) * 46.0 - heldTime * 4.0)
    * 0.021 * weights.w;

  float displacement = largeFlow * mix(0.21, 0.31, uViscosity)
    + fineFlow * 0.045 * uTurbulence
    + capillary + swell + breaker + viscousLobe + breath + metallicScan;
  displacement *= uDeform * mobile;

  float touchDist = angularDistance(dir, uTouchPoint);
  float touchWidth = mix(24.0, 8.0, uViscosity);
  float touch = exp(-touchDist * touchDist * touchWidth) * uTouchStrength;
  float shoulder = exp(-pow((touchDist - mix(0.29, 0.42, uViscosity)) * mix(13.0, 8.0, uViscosity), 2.0));
  float dragCrest = sin(touchDist * mix(15.0, 8.0, uViscosity) - fluidTime * 4.0)
    * exp(-touchDist * mix(4.8, 2.7, uViscosity)) * uTouchStrength;
  float opposite = exp(-pow(angularDistance(dir, -uTouchPoint), 2.0) * 7.0) * uTouchStrength;

  displacement += touch * (0.31 + uPointerVelocity * 0.28) * (0.82 + uShear * 0.32) * mobile;
  displacement -= shoulder * uTouchStrength * mix(0.075, 0.038, uViscosity) * mobile;
  displacement += dragCrest * 0.075 * (1.0 - uViscosity * 0.42) * mobile;
  displacement -= opposite * 0.060 * mobile;
  displacement += rippleField(dir) * 0.115 * uDeform * mobile;
  displacement += releaseField(dir) * mobile;

  float audioWave = sin(dir.y * 13.0 - fluidTime * 7.0 + dir.x * 4.0) * uAudio;
  displacement += audioWave * 0.065 * (0.45 + uTurbulence) * mobile;
  displacement += uPulse * (0.068 + 0.042 * sin(dir.y * 8.0 + fluidTime * 4.0)) * mobile;
  return displacement;
}

vec3 deformPosition(vec3 p, vec3 n) {
  vec3 dir = normalize(p);
  vec3 displaced = p + n * displacementField(p, n);
  float mobile = 1.0 - uFreezeProgress * 0.96;
  float touchDist = angularDistance(dir, uTouchPoint);
  float dragMask = exp(-touchDist * touchDist * mix(17.0, 5.8, uViscosity));
  vec3 tangentDrag = uDragVector - dir * dot(uDragVector, dir);
  float dragMagnitude = length(tangentDrag);
  tangentDrag = normalize(tangentDrag + vec3(0.0001));
  displaced += tangentDrag * dragMask * uTouchStrength * dragMagnitude
    * (0.44 + uShear * 0.36 + uViscosity * 0.28) * mobile;

  float releaseAge = uTime - uReleaseTime;
  float releaseAlive = step(0.0, releaseAge) * exp(-releaseAge * mix(4.2, 0.9, uViscosity));
  float releaseDist = angularDistance(dir, uReleasePoint);
  vec3 releaseTangent = uReleaseVector - dir * dot(uReleaseVector, dir);
  releaseTangent = normalize(releaseTangent + vec3(0.0001));
  float recoil = sin(releaseAge * mix(17.0, 5.0, uViscosity))
    * exp(-releaseDist * releaseDist * mix(18.0, 6.0, uViscosity));
  displaced += releaseTangent * recoil * releaseAlive * uReleaseEnergy * uElasticity * 0.31 * mobile;
  return displaced;
}
`;

const sharedUniforms = {
  uTime: { value: 0 },
  uDeform: { value: modes[0].deform },
  uTouchStrength: { value: 0 },
  uPointerVelocity: { value: 0 },
  uPulse: { value: 0 },
  uAudio: { value: 0 },
  uTension: { value: modes[0].tension },
  uMode: { value: 0 },
  uViscosity: { value: modes[0].viscosity },
  uSwell: { value: modes[0].swell },
  uFlowStrength: { value: modes[0].flow },
  uTurbulence: { value: modes[0].turbulence },
  uFoam: { value: modes[0].foam },
  uClarity: { value: modes[0].clarity },
  uElasticity: { value: modes[0].elasticity },
  uShear: { value: modes[0].shear },
  uTouchPoint: { value: new THREE.Vector3(0, 0, 1) },
  uDragVector: { value: new THREE.Vector3() },
  uReleasePoint: { value: new THREE.Vector3(0, 0, 1) },
  uReleaseVector: { value: new THREE.Vector3() },
  uReleaseTime: { value: -100 },
  uReleaseEnergy: { value: 0 },
  uFreezeProgress: { value: 0 },
  uFreezeOrigin: { value: new THREE.Vector3(0, 0, 1) },
  uFreezeTime: { value: 0 },
  uRipples: { value: Array.from({ length: 5 }, () => new THREE.Vector4(0, 0, 1, -100)) },
  uSceneTexture: { value: refractionTarget.texture },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uDeepColor: { value: modes[0].deepColor.clone() },
  uMidColor: { value: modes[0].midColor.clone() },
  uLightColor: { value: modes[0].lightColor.clone() },
  uAccentColor: { value: modes[0].accentColor.clone() },
  uInkColor: { value: modes[0].inkColor.clone() },
  uRimStrength: { value: modes[0].rim },
  uFacet: { value: 0 },
  uOpacity: { value: 0.88 },
  uOutlineThickness: { value: 0.046 }
};

const liquidVertexShader = /* glsl */`
${commonNoiseGLSL}
${deformGLSL}

varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying vec3 vLocalDir;
varying float vDisplacement;
varying vec4 vClipPosition;

void main() {
  vec3 baseNormal = normalize(normal);
  vec3 displaced = deformPosition(position, baseNormal);

  vec3 axis = abs(baseNormal.y) < 0.92 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(baseNormal, axis));
  vec3 bitangent = normalize(cross(baseNormal, tangent));
  float eps = 0.010;
  vec3 p1 = position + tangent * eps;
  vec3 p2 = position + bitangent * eps;
  vec3 d1 = deformPosition(p1, normalize(p1));
  vec3 d2 = deformPosition(p2, normalize(p2));
  vec3 displacedNormal = normalize(cross(d1 - displaced, d2 - displaced));
  if (dot(displacedNormal, baseNormal) < 0.0) displacedNormal *= -1.0;

  vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
  vWorldPosition = worldPosition.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * displacedNormal);
  vLocalDir = normalize(position);
  vDisplacement = length(displaced) - length(position);
  vClipPosition = projectionMatrix * viewMatrix * worldPosition;
  gl_Position = vClipPosition;
}
`;

const liquidFragmentShader = /* glsl */`
${commonNoiseGLSL}

uniform sampler2D uSceneTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform float uTouchStrength;
uniform float uPulse;
uniform float uAudio;
uniform float uMode;
uniform float uFacet;
uniform float uOpacity;
uniform float uRimStrength;
uniform float uViscosity;
uniform float uFlowStrength;
uniform float uTurbulence;
uniform float uFoam;
uniform float uClarity;
uniform float uFreezeProgress;
uniform float uFreezeTime;
uniform vec3 uFreezeOrigin;
uniform vec3 uTouchPoint;
uniform vec3 uDeepColor;
uniform vec3 uMidColor;
uniform vec3 uLightColor;
uniform vec3 uAccentColor;

varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying vec3 vLocalDir;
varying float vDisplacement;
varying vec4 vClipPosition;

float freezeMask(vec3 dir) {
  float normalizedDistance = angularDistance(dir, uFreezeOrigin) / PI;
  float front = uFreezeProgress * 1.24;
  float mask = smoothstep(front + 0.055, front - 0.055, normalizedDistance);
  return mask * smoothstep(0.002, 0.045, uFreezeProgress);
}

float flowLineAt(vec3 q) {
  float longitude = atan(q.z, q.x);
  float latitude = asin(clamp(q.y, -1.0, 1.0));
  float warp = fbm(q * 4.3) - 0.5;
  float filament = abs(sin(longitude * 7.0 + latitude * 5.5 + warp * 7.5));
  float thin = 1.0 - smoothstep(0.055, 0.24, filament);
  float secondary = sin(longitude * 3.0 - latitude * 11.0 + warp * 4.0) * 0.5 + 0.5;
  return max(thin, smoothstep(0.86, 0.98, secondary) * 0.44);
}

float causticAt(vec3 q) {
  float a = sin((q.x + q.z * 0.36) * 20.0 + fbm(q * 5.0) * 5.0);
  float b = sin((q.y - q.x * 0.24) * 23.0 - fbm(q.zxy * 4.4) * 4.0);
  return smoothstep(0.70, 0.98, a * b);
}

vec3 sampleChromaticScene(vec2 uv, vec2 offset) {
  uv = clamp(uv, vec2(0.004), vec2(0.996));
  float r = texture2D(uSceneTexture, clamp(uv + offset * 1.08, vec2(0.004), vec2(0.996))).r;
  float g = texture2D(uSceneTexture, clamp(uv + offset, vec2(0.004), vec2(0.996))).g;
  float b = texture2D(uSceneTexture, clamp(uv + offset * 0.90, vec2(0.004), vec2(0.996))).b;
  return vec3(r, g, b);
}

void main() {
  vec4 weights = modeWeights(uMode);
  float frozen = freezeMask(vLocalDir);
  float detailTime = mix(uTime, floor(uTime * 12.0) / 12.0, weights.w * 0.72);
  float fluidTime = mix(detailTime, uFreezeTime, frozen);

  vec3 N = normalize(vWorldNormal);
  vec3 facetedNormal = normalize(floor(N * 7.0 + 0.5) / 7.0);
  N = normalize(mix(N, facetedNormal, uFacet * 0.72));
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 L = normalize(vec3(-0.42, 0.73, 0.54));
  vec3 H = normalize(L + V);
  vec3 flow = surfaceFlowVector(vLocalDir, fluidTime, uTurbulence);

  float phase0 = fract(fluidTime * 0.115);
  float phase1 = fract(fluidTime * 0.115 + 0.5);
  float blend0 = 1.0 - abs(phase0 * 2.0 - 1.0);
  float blend1 = 1.0 - abs(phase1 * 2.0 - 1.0);
  vec3 advected0 = normalize(vLocalDir - flow * (phase0 - 0.5) * 0.56 * uFlowStrength);
  vec3 advected1 = normalize(vLocalDir - flow * (phase1 - 0.5) * 0.56 * uFlowStrength);
  float flowLines = (flowLineAt(advected0) * blend0 + flowLineAt(advected1) * blend1)
    / max(blend0 + blend1, 0.001);
  float caustic = (causticAt(advected0) * blend0 + causticAt(advected1) * blend1)
    / max(blend0 + blend1, 0.001);

  float ndl = dot(N, L) * 0.5 + 0.5;
  float band1 = smoothstep(0.18, 0.25, ndl);
  float band2 = smoothstep(0.48, 0.56, ndl);
  float band3 = smoothstep(0.79, 0.87, ndl);
  float tone = band1 * 0.24 + band2 * 0.35 + band3 * 0.41;

  vec3 baseColor = mix(uDeepColor, uMidColor, tone);
  baseColor = mix(baseColor, uLightColor, band3 * 0.15);

  float rim = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  float rimBand = smoothstep(0.34, 0.73, rim);
  vec3 reflectionDir = reflect(-V, N);
  float horizon = smoothstep(-0.3, 0.82, reflectionDir.y);
  vec3 analyticReflection = mix(uDeepColor * 0.72, uLightColor, horizon);

  vec2 screenUv = vClipPosition.xy / max(vClipPosition.w, 0.0001) * 0.5 + 0.5;
  float thicknessProxy = 0.18 + pow(rim, 0.58) * 0.82;
  vec2 refractionOffset = (N.xy * 0.014 + flow.xy * 0.005 * uFlowStrength)
    * (0.52 + uClarity * 0.88) * (0.68 + thicknessProxy * 0.72) * (1.0 - frozen * 0.82);
  vec3 transmitted = sampleChromaticScene(screenUv, refractionOffset);
  vec3 absorption = mix(vec3(0.86, 0.96, 1.0), uMidColor, 0.32 + thicknessProxy * 0.24);
  transmitted *= absorption;

  float transmission = uClarity * (0.38 + max(dot(N, V), 0.0) * 0.46);
  vec3 color = mix(baseColor, transmitted, transmission * 0.58);
  color = mix(color, analyticReflection, rimBand * (0.42 + uRimStrength * 0.14));
  color = mix(color, uLightColor, rimBand * 0.20 * uRimStrength);

  float specular = pow(max(dot(N, H), 0.0), mix(36.0, 82.0, uClarity));
  specular = smoothstep(0.20, 0.54, specular);
  float secondarySpec = pow(max(dot(N, normalize(vec3(0.5, 0.1, 0.86))), 0.0), 96.0);
  secondarySpec = smoothstep(0.20, 0.43, secondarySpec);
  float elongatedGlint = flowLines * pow(max(dot(N, H), 0.0), 18.0);
  color += uLightColor * specular * 0.78;
  color += uAccentColor * secondarySpec * 0.32;
  color += uLightColor * elongatedGlint * (0.16 + uFlowStrength * 0.16);

  float slope = clamp(fwidth(vDisplacement) * 24.0, 0.0, 1.0);
  float crest = smoothstep(0.025, 0.145, vDisplacement + slope * 0.045);
  float foam = crest * (0.42 + flowLines * 0.76) * uFoam;
  foam += flowLines * uFoam * weights.y * smoothstep(0.48, 0.9, ndl) * 0.18;
  color = mix(color, uLightColor, clamp(foam, 0.0, 0.92));

  color += uLightColor * caustic * (0.035 + rim * 0.13 + uClarity * 0.06) * (1.0 - frozen);
  color = mix(color, uAccentColor, flowLines * uViscosity * weights.z * 0.23);

  float touchDist = angularDistance(vLocalDir, uTouchPoint);
  float touchGlow = exp(-touchDist * touchDist * 29.0) * abs(uTouchStrength);
  float touchRing = exp(-pow((touchDist - 0.22) * 16.0, 2.0)) * abs(uTouchStrength);
  color = mix(color, uAccentColor, touchGlow * 0.58);
  color += uLightColor * touchRing * 0.48;

  float petals = sin(atan(vLocalDir.z, vLocalDir.x) * 6.0
    + asin(clamp(vLocalDir.y, -1.0, 1.0)) * 9.0 + fluidTime * 1.15);
  petals = smoothstep(0.76, 0.98, petals) * weights.z;
  color += uAccentColor * petals * 0.21;

  float barcode = step(0.76, fract((asin(clamp(vLocalDir.y, -1.0, 1.0))
    + noise3(vLocalDir * 3.8) * 0.10 + detailTime * 0.018) * 28.0));
  float binaryCut = step(0.55, noise3(floor(vLocalDir * 18.0) + floor(detailTime * 2.0)));
  vec3 voidPattern = color * (0.64 + barcode * 0.44) + uAccentColor * barcode * binaryCut * 0.58;
  color = mix(color, voidPattern, weights.w * 0.76);

  color += uAccentColor * uPulse * rimBand * 0.30;
  color += uLightColor * max(vDisplacement, 0.0) * 0.34;

  vec3 icePreview = mix(vec3(0.42, 0.75, 0.92), uLightColor, 0.62);
  color = mix(color, transmitted * 0.72 + icePreview * (0.42 + rim * 0.58), frozen * 0.72);

  float microGrain = hash31(vWorldPosition * 31.0 + floor(detailTime * 18.0)) - 0.5;
  color += microGrain * mix(0.013, 0.027, weights.w);

  float alpha = uOpacity + rim * 0.055 - uClarity * 0.055;
  alpha = mix(alpha, 0.15 + rim * 0.12, frozen);
  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
`;

const outlineVertexShader = /* glsl */`
${commonNoiseGLSL}
${deformGLSL}
uniform float uOutlineThickness;

void main() {
  vec3 baseNormal = normalize(normal);
  vec3 displaced = deformPosition(position, baseNormal);
  vec3 axis = abs(baseNormal.y) < 0.92 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(baseNormal, axis));
  vec3 bitangent = normalize(cross(baseNormal, tangent));
  float eps = 0.010;
  vec3 p1 = position + tangent * eps;
  vec3 p2 = position + bitangent * eps;
  vec3 d1 = deformPosition(p1, normalize(p1));
  vec3 d2 = deformPosition(p2, normalize(p2));
  vec3 displacedNormal = normalize(cross(d1 - displaced, d2 - displaced));
  if (dot(displacedNormal, baseNormal) < 0.0) displacedNormal *= -1.0;
  displaced += displacedNormal * uOutlineThickness;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const outlineFragmentShader = /* glsl */`
uniform vec3 uInkColor;
uniform vec3 uAccentColor;
uniform float uPulse;
uniform float uFreezeProgress;
void main() {
  vec3 color = mix(uInkColor, uAccentColor, uPulse * 0.16);
  float alpha = mix(0.96, 0.14, uFreezeProgress);
  gl_FragColor = vec4(color, alpha);
}
`;

const volumeVertexShader = /* glsl */`
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying vec3 vLocalDir;
varying vec4 vClipPosition;
void main() {
  vLocalDir = normalize(position);
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vClipPosition = projectionMatrix * viewMatrix * worldPosition;
  gl_Position = vClipPosition;
}
`;

const volumeFragmentShader = /* glsl */`
${commonNoiseGLSL}
uniform sampler2D uSceneTexture;
uniform float uTime;
uniform float uMode;
uniform float uFlowStrength;
uniform float uTurbulence;
uniform float uClarity;
uniform float uFreezeProgress;
uniform vec3 uDeepColor;
uniform vec3 uMidColor;
uniform vec3 uLightColor;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying vec3 vLocalDir;
varying vec4 vClipPosition;
void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  float edge = pow(1.0 - abs(dot(N, V)), 0.72);
  vec3 flow = surfaceFlowVector(vLocalDir, uTime, uTurbulence);
  vec2 uv = vClipPosition.xy / max(vClipPosition.w, 0.0001) * 0.5 + 0.5;
  vec2 offset = (-N.xy * 0.021 + flow.xy * 0.006 * uFlowStrength) * (0.5 + edge);
  vec3 refracted = texture2D(uSceneTexture, clamp(uv + offset, vec2(0.004), vec2(0.996))).rgb;
  float innerCaustic = sin((vLocalDir.x + vLocalDir.z) * 21.0 + fbm(vLocalDir * 5.0 + uTime * 0.08) * 6.0);
  innerCaustic *= sin(vLocalDir.y * 25.0 - uTime * 1.4);
  innerCaustic = smoothstep(0.66, 0.98, innerCaustic);
  vec3 absorption = mix(uMidColor, uDeepColor, edge * 0.72);
  vec3 color = mix(refracted * absorption, uMidColor, 0.26 + edge * 0.38);
  color += uLightColor * innerCaustic * 0.22;
  float alpha = (0.08 + edge * 0.25 + innerCaustic * 0.08) * (0.62 + uClarity * 0.38);
  alpha *= 1.0 - uFreezeProgress * 0.78;
  gl_FragColor = vec4(color, alpha);
}
`;

const crystalVertexShader = /* glsl */`
${commonNoiseGLSL}
uniform float uFreezeProgress;
uniform vec3 uFreezeOrigin;
varying vec3 vWorldPosition;
varying vec3 vLocalDir;
varying vec4 vClipPosition;
varying float vFreezeMask;
void main() {
  vec3 dir = normalize(position);
  float normalizedDistance = angularDistance(dir, uFreezeOrigin) / PI;
  float front = uFreezeProgress * 1.24;
  vFreezeMask = smoothstep(front + 0.055, front - 0.055, normalizedDistance)
    * smoothstep(0.002, 0.045, uFreezeProgress);

  vec3 axisA = normalize(vec3(0.78, 0.58, 0.22));
  vec3 axisB = normalize(vec3(-0.31, 0.91, 0.27));
  float axial = max(abs(dot(dir, axisA)), abs(dot(dir, axisB)));
  float spike = pow(axial, 13.0);
  float cell = hash31(floor(dir * 9.0 + 0.5));
  float radial = 1.0 + vFreezeMask * ((cell - 0.5) * 0.045 + spike * 0.075);
  vec3 crystalline = position * radial;
  crystalline += dir * sin(dot(dir, vec3(13.0, 17.0, 19.0))) * 0.018 * vFreezeMask;

  vec4 worldPosition = modelMatrix * vec4(crystalline, 1.0);
  vWorldPosition = worldPosition.xyz;
  vLocalDir = dir;
  vClipPosition = projectionMatrix * viewMatrix * worldPosition;
  gl_Position = vClipPosition;
}
`;

const crystalFragmentShader = /* glsl */`
${commonNoiseGLSL}
uniform sampler2D uSceneTexture;
uniform float uTime;
uniform float uFreezeProgress;
uniform vec3 uFreezeOrigin;
uniform vec3 uMidColor;
uniform vec3 uLightColor;
uniform vec3 uAccentColor;
varying vec3 vWorldPosition;
varying vec3 vLocalDir;
varying vec4 vClipPosition;
varying float vFreezeMask;

vec2 cellular3(vec3 P) {
  vec3 Pi = floor(P);
  vec3 Pf = fract(P);
  float F1 = 10.0;
  float F2 = 10.0;
  for (int z = -1; z <= 1; z++) {
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec3 cell = vec3(float(x), float(y), float(z));
        vec3 feature = hash33(Pi + cell);
        vec3 delta = cell + feature - Pf;
        float d = dot(delta, delta);
        if (d < F1) {
          F2 = F1;
          F1 = d;
        } else if (d < F2) {
          F2 = d;
        }
      }
    }
  }
  return sqrt(vec2(F1, F2));
}

void main() {
  if (vFreezeMask < 0.004) discard;
  vec3 N = normalize(cross(dFdx(vWorldPosition), dFdy(vWorldPosition)));
  if (dot(N, cameraPosition - vWorldPosition) < 0.0) N *= -1.0;
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 L = normalize(vec3(-0.48, 0.76, 0.43));
  vec3 H = normalize(L + V);
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  float faceLight = floor((dot(N, L) * 0.5 + 0.5) * 5.0) / 5.0;

  vec2 cell = cellular3(vLocalDir * 8.2 + vec3(0.0, uFreezeOrigin.y * 2.0, 0.0));
  float cellBorder = 1.0 - smoothstep(0.035, 0.13, cell.y - cell.x);
  float originDistance = angularDistance(vLocalDir, uFreezeOrigin);
  vec3 tangent = normalize(cross(uFreezeOrigin, abs(uFreezeOrigin.y) < 0.92 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 bitangent = normalize(cross(uFreezeOrigin, tangent));
  vec2 local = vec2(dot(vLocalDir, tangent), dot(vLocalDir, bitangent));
  float angle = atan(local.y, local.x);
  float radialCrack = 1.0 - smoothstep(0.025, 0.095,
    abs(sin(angle * 7.0 + noise3(vLocalDir * 11.0) * 2.4)) * (0.42 + originDistance));
  radialCrack *= exp(-originDistance * 0.72);
  float ringCrack = 1.0 - smoothstep(0.025, 0.09,
    abs(sin(originDistance * 17.0 + noise3(vLocalDir * 9.0) * 2.0)));
  ringCrack *= 0.42;
  float cracks = clamp(max(cellBorder * 0.72, max(radialCrack, ringCrack)), 0.0, 1.0);
  float bubbles = step(0.88, noise3(vLocalDir * 34.0 + floor(vLocalDir * 7.0)))
    * smoothstep(0.1, 0.9, noise3(vLocalDir * 18.0));

  vec2 uv = vClipPosition.xy / max(vClipPosition.w, 0.0001) * 0.5 + 0.5;
  vec2 offset = N.xy * (0.017 + fresnel * 0.02);
  float r = texture2D(uSceneTexture, clamp(uv + offset * 1.22, vec2(0.004), vec2(0.996))).r;
  float g = texture2D(uSceneTexture, clamp(uv + offset, vec2(0.004), vec2(0.996))).g;
  float b = texture2D(uSceneTexture, clamp(uv + offset * 0.78, vec2(0.004), vec2(0.996))).b;
  vec3 refracted = vec3(r, g, b);

  vec3 iceTint = mix(vec3(0.24, 0.63, 0.84), uLightColor, 0.68);
  vec3 color = mix(refracted * 0.78, iceTint, 0.34 + faceLight * 0.28 + fresnel * 0.25);
  color += uLightColor * cracks * (0.54 + fresnel * 0.48);
  color += uLightColor * bubbles * 0.48;
  float hardSpec = pow(max(dot(N, H), 0.0), 74.0);
  hardSpec = smoothstep(0.12, 0.42, hardSpec);
  color += uLightColor * hardSpec * 1.05;
  color += uAccentColor * cellBorder * fresnel * 0.18;

  float alpha = vFreezeMask * (0.52 + fresnel * 0.26 + cracks * 0.20 + bubbles * 0.11);
  gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.96));
}
`;


const orbGroup = new THREE.Group();
orbGroup.position.y = 0.48;
scene.add(orbGroup);

const orbGeometry = new THREE.IcosahedronGeometry(1.65, 5);
const liquidMaterial = new THREE.ShaderMaterial({
  uniforms: sharedUniforms,
  vertexShader: liquidVertexShader,
  fragmentShader: liquidFragmentShader,
  transparent: true,
  depthWrite: false,
  side: THREE.FrontSide
});
liquidMaterial.extensions.derivatives = true;

const outlineMaterial = new THREE.ShaderMaterial({
  uniforms: sharedUniforms,
  vertexShader: outlineVertexShader,
  fragmentShader: outlineFragmentShader,
  transparent: true,
  depthWrite: false,
  side: THREE.BackSide
});

const liquidOrb = new THREE.Mesh(orbGeometry, liquidMaterial);
liquidOrb.renderOrder = 3;
orbGroup.add(liquidOrb);

const outlineOrb = new THREE.Mesh(orbGeometry, outlineMaterial);
outlineOrb.renderOrder = 2;
orbGroup.add(outlineOrb);

// Back-face absorption shell: a second optical path makes the orb read as a volume, not a painted solid.
const volumeMaterial = new THREE.ShaderMaterial({
  uniforms: sharedUniforms,
  vertexShader: volumeVertexShader,
  fragmentShader: volumeFragmentShader,
  transparent: true,
  depthWrite: false,
  side: THREE.BackSide
});
const volumeOrb = new THREE.Mesh(orbGeometry, volumeMaterial);
volumeOrb.scale.setScalar(0.985);
volumeOrb.renderOrder = 1;
orbGroup.add(volumeOrb);

// Crystal state uses a genuinely low-poly silhouette, not only quantized lighting.
const crystalGeometry = new THREE.IcosahedronGeometry(1.69, 2);
const crystalMaterial = new THREE.ShaderMaterial({
  uniforms: sharedUniforms,
  vertexShader: crystalVertexShader,
  fragmentShader: crystalFragmentShader,
  transparent: true,
  depthWrite: false,
  side: THREE.FrontSide
});
crystalMaterial.extensions.derivatives = true;
const crystalOrb = new THREE.Mesh(crystalGeometry, crystalMaterial);
crystalOrb.renderOrder = 4;
orbGroup.add(crystalOrb);

const crystalInteriorMaterial = new THREE.MeshBasicMaterial({
  color: modes[0].lightColor.clone(),
  transparent: true,
  opacity: 0,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});
const crystalInteriorGroup = new THREE.Group();
const crystalShards = [];
const crystalShardGeometry = new THREE.OctahedronGeometry(0.18, 0);
for (let i = 0; i < 22; i += 1) {
  const shard = new THREE.Mesh(crystalShardGeometry, crystalInteriorMaterial);
  const direction = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).normalize();
  const radius = 0.18 + Math.pow(Math.random(), 0.72) * 1.25;
  shard.position.copy(direction).multiplyScalar(radius);
  shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  const width = 0.22 + Math.random() * 0.48;
  const length = 0.72 + Math.random() * 1.75;
  shard.scale.set(width, length, width * (0.66 + Math.random() * 0.55));
  shard.userData.baseScale = shard.scale.clone();
  shard.userData.phase = Math.random() * Math.PI * 2;
  crystalInteriorGroup.add(shard);
  crystalShards.push(shard);
}
crystalInteriorGroup.visible = false;
crystalInteriorGroup.renderOrder = 1;
orbGroup.add(crystalInteriorGroup);

const crystalCrackGeometry = new THREE.BufferGeometry();
crystalCrackGeometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
const crystalCrackMaterial = new THREE.LineBasicMaterial({
  color: modes[0].lightColor.clone(),
  transparent: true,
  opacity: 0,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});
const crystalCracks = new THREE.LineSegments(crystalCrackGeometry, crystalCrackMaterial);
crystalCracks.renderOrder = 3;
crystalCracks.visible = false;
crystalCracks.userData.vertexCount = 0;
orbGroup.add(crystalCracks);

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rebuildCrystalCracks(origin) {
  const o = origin.clone().normalize();
  const seed = Math.abs(Math.floor((o.x * 1731 + o.y * 3191 + o.z * 7919) * 10000)) + 17;
  const random = mulberry32(seed);
  const tangent = new THREE.Vector3().crossVectors(
    o,
    Math.abs(o.y) < 0.92 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)
  ).normalize();
  const bitangent = new THREE.Vector3().crossVectors(o, tangent).normalize();
  const points = [];

  const traceBranch = (start, initialDirection, steps, stepLength, jitter = 0.22) => {
    let p = start.clone();
    let direction = initialDirection.clone().normalize();
    for (let step = 0; step < steps; step += 1) {
      const randomVector = tangent.clone().multiplyScalar((random() - 0.5) * 2)
        .addScaledVector(bitangent, (random() - 0.5) * 2)
        .addScaledVector(o, (random() - 0.5) * 0.45)
        .normalize();
      const inward = p.clone().normalize().multiplyScalar(-0.19);
      direction.multiplyScalar(0.78)
        .addScaledVector(randomVector, jitter)
        .add(inward)
        .normalize();
      const next = p.clone().addScaledVector(direction, stepLength * (0.78 + random() * 0.46));
      if (next.length() > 1.57) next.normalize().multiplyScalar(1.55);
      points.push(p.x, p.y, p.z, next.x, next.y, next.z);
      p = next;
    }
  };

  for (let ray = 0; ray < 12; ray += 1) {
    const spreadA = (random() - 0.5) * 0.82;
    const spreadB = (random() - 0.5) * 0.82;
    const start = o.clone().multiplyScalar(1.57)
      .addScaledVector(tangent, spreadA * 0.08)
      .addScaledVector(bitangent, spreadB * 0.08);
    const direction = o.clone().multiplyScalar(-0.76 - random() * 0.22)
      .addScaledVector(tangent, spreadA)
      .addScaledVector(bitangent, spreadB)
      .normalize();
    traceBranch(start, direction, 8 + Math.floor(random() * 6), 0.13, 0.20);

    const branchStart = start.clone().addScaledVector(direction, 0.42 + random() * 0.3);
    const branchDirection = direction.clone()
      .addScaledVector(tangent, (random() - 0.5) * 1.0)
      .addScaledVector(bitangent, (random() - 0.5) * 1.0)
      .normalize();
    traceBranch(branchStart, branchDirection, 3 + Math.floor(random() * 4), 0.105, 0.32);
  }

  crystalCrackGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  crystalCrackGeometry.computeBoundingSphere();
  crystalCracks.userData.vertexCount = points.length / 3;
  crystalCrackGeometry.setDrawRange(0, 0);
}

const proxyMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
proxyMaterial.colorWrite = false;
const interactionProxy = new THREE.Mesh(new THREE.SphereGeometry(1.76, 28, 20), proxyMaterial);
interactionProxy.renderOrder = -10;
orbGroup.add(interactionProxy);

const coreUniforms = {
  uTime: sharedUniforms.uTime,
  uAudio: sharedUniforms.uAudio,
  uPulse: sharedUniforms.uPulse,
  uMode: sharedUniforms.uMode,
  uFreezeProgress: sharedUniforms.uFreezeProgress,
  uMidColor: sharedUniforms.uMidColor,
  uLightColor: sharedUniforms.uLightColor,
  uAccentColor: sharedUniforms.uAccentColor
};

const coreMaterial = new THREE.ShaderMaterial({
  uniforms: coreUniforms,
  vertexShader: /* glsl */`
    varying vec3 vNormalW;
    varying vec3 vWorldPos;
    varying vec3 vLocal;
    void main() {
      vLocal = normalize(position);
      vec4 world = modelMatrix * vec4(position, 1.0);
      vWorldPos = world.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  fragmentShader: /* glsl */`
    ${commonNoiseGLSL}
    uniform float uTime;
    uniform float uAudio;
    uniform float uPulse;
    uniform float uMode;
    uniform float uFreezeProgress;
    uniform vec3 uMidColor;
    uniform vec3 uLightColor;
    uniform vec3 uAccentColor;
    varying vec3 vNormalW;
    varying vec3 vWorldPos;
    varying vec3 vLocal;
    void main() {
      vec3 V = normalize(cameraPosition - vWorldPos);
      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), V), 0.0), 2.6);
      float n = fbm(vLocal * 3.2 + vec3(uTime * 0.22, -uTime * 0.19, uTime * 0.16));
      float longitude = atan(vLocal.z, vLocal.x);
      float band = sin(longitude * 7.0 + vLocal.y * 12.0 + n * 5.0 - uTime * 2.0);
      band = smoothstep(0.28, 0.88, band);
      float pulse = 0.55 + uPulse * 0.55 + uAudio * 0.75;
      vec3 color = mix(uMidColor, uAccentColor, band);
      color = mix(color, uLightColor, fresnel * 0.75);
      color *= 1.25 + pulse;
      float alpha = (0.10 + fresnel * 0.46 + band * 0.18) * (0.72 + pulse * 0.22);
      alpha *= 1.0 - uFreezeProgress * 0.88;
      gl_FragColor = vec4(color, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide
});

const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 4), coreMaterial);
core.renderOrder = 1;
orbGroup.add(core);

const knotMaterial = new THREE.MeshBasicMaterial({
  color: modes[0].accentColor,
  transparent: true,
  opacity: 0.28,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});
const coreKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.57, 0.055, 220, 18, 2, 3), knotMaterial);
coreKnot.renderOrder = 1;
orbGroup.add(coreKnot);

// 展台：把“球”处理成被观测、被驯化的活体标本。
const pedestalGroup = new THREE.Group();
scene.add(pedestalGroup);

const pedestalMaterial = new THREE.MeshStandardMaterial({
  color: 0x07101a,
  roughness: 0.24,
  metalness: 0.82
});
const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.22, 2.48, 0.34, 96, 1), pedestalMaterial);
pedestal.position.y = -1.32;
pedestal.receiveShadow = true;
pedestal.castShadow = true;
pedestalGroup.add(pedestal);

const topDiscMaterial = new THREE.MeshStandardMaterial({
  color: 0x0b1924,
  roughness: 0.12,
  metalness: 0.88,
  emissive: modes[0].floorColor.clone(),
  emissiveIntensity: 0.08
});
const topDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.82, 1.88, 0.065, 96), topDiscMaterial);
topDisc.position.y = -1.12;
topDisc.receiveShadow = true;
pedestalGroup.add(topDisc);

// A projected caustic pool gives the transparent body a readable optical consequence in the room.
const causticUniforms = {
  uTime: sharedUniforms.uTime,
  uMode: sharedUniforms.uMode,
  uFlowStrength: sharedUniforms.uFlowStrength,
  uTurbulence: sharedUniforms.uTurbulence,
  uFoam: sharedUniforms.uFoam,
  uFreezeProgress: sharedUniforms.uFreezeProgress,
  uColor: { value: modes[0].floorColor.clone() },
  uLightColor: sharedUniforms.uLightColor
};
const causticDisc = new THREE.Mesh(
  new THREE.CircleGeometry(1.79, 128),
  new THREE.ShaderMaterial({
    uniforms: causticUniforms,
    vertexShader: /* glsl */`
      varying vec2 vUv2;
      void main() {
        vUv2 = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform float uMode;
      uniform float uFlowStrength;
      uniform float uTurbulence;
      uniform float uFoam;
      uniform float uFreezeProgress;
      uniform vec3 uColor;
      uniform vec3 uLightColor;
      varying vec2 vUv2;
      float causticLayer(vec2 p, float time, float scale) {
        vec2 q = p * scale;
        q += vec2(
          sin(q.y * 1.7 + time * 1.2) + sin(q.x * 0.9 - time * 0.7),
          cos(q.x * 1.5 - time * 1.0) + cos(q.y * 1.1 + time * 0.8)
        ) * 0.22;
        float a = sin(q.x * 2.1 + q.y * 0.7 + time);
        float b = sin(q.y * 2.4 - q.x * 0.6 - time * 0.83);
        float c = sin((q.x + q.y) * 1.55 + time * 0.42);
        float network = abs(a + b + c) / 3.0;
        return 1.0 - smoothstep(0.05, 0.31, network);
      }
      void main() {
        vec2 p = (vUv2 - 0.5) * 2.0;
        float radius = length(p);
        float time = uTime * (0.42 + uFlowStrength * 0.32);
        float c0 = causticLayer(p, time, 4.8 + uTurbulence * 1.7);
        float c1 = causticLayer(p.yx * vec2(-1.0, 1.0), -time * 0.73, 7.2);
        float liquidCaustic = max(c0, c1 * 0.68);
        float angle = atan(p.y, p.x);
        float crystalRay = 1.0 - smoothstep(0.025, 0.085, abs(sin(angle * 10.0 + radius * 8.0)));
        crystalRay *= smoothstep(0.08, 0.8, radius);
        float pattern = mix(liquidCaustic * (0.52 + uFoam * 0.22), crystalRay, uFreezeProgress);
        float fade = smoothstep(1.0, 0.12, radius) * smoothstep(1.0, 0.68, radius);
        float pulse = 0.7 + 0.3 * sin(time * 2.0 + radius * 12.0);
        vec3 color = mix(uColor, uLightColor, pattern * 0.58 + uFreezeProgress * 0.34);
        float alpha = pattern * fade * (0.18 + pulse * 0.14 + uFreezeProgress * 0.18);
        gl_FragColor = vec4(color * (0.8 + pattern * 1.45), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  })
);
causticDisc.rotation.x = -Math.PI / 2;
causticDisc.position.y = -1.078;
causticDisc.renderOrder = 2;
pedestalGroup.add(causticDisc);

const ringMaterial = new THREE.MeshBasicMaterial({
  color: modes[0].floorColor,
  transparent: true,
  opacity: 0.72,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});
const pedestalRing = new THREE.Mesh(new THREE.TorusGeometry(1.96, 0.018, 8, 192), ringMaterial);
pedestalRing.rotation.x = Math.PI / 2;
pedestalRing.position.y = -1.075;
pedestalGroup.add(pedestalRing);

const tickMaterial = new THREE.MeshBasicMaterial({ color: modes[0].floorColor, transparent: true, opacity: 0.3 });
const tickGeometry = new THREE.BoxGeometry(0.025, 0.012, 0.16);
const ticks = new THREE.InstancedMesh(tickGeometry, tickMaterial, 48);
const tickDummy = new THREE.Object3D();
for (let i = 0; i < 48; i += 1) {
  const angle = (i / 48) * Math.PI * 2;
  tickDummy.position.set(Math.cos(angle) * 2.28, -1.105, Math.sin(angle) * 2.28);
  tickDummy.rotation.y = -angle;
  tickDummy.scale.z = i % 4 === 0 ? 1.7 : 0.65;
  tickDummy.updateMatrix();
  ticks.setMatrixAt(i, tickDummy.matrix);
}
pedestalGroup.add(ticks);

const floorUniforms = {
  uTime: sharedUniforms.uTime,
  uPulse: sharedUniforms.uPulse,
  uAudio: sharedUniforms.uAudio,
  uColor: { value: modes[0].floorColor.clone() }
};
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(32, 32, 1, 1),
  new THREE.ShaderMaterial({
    uniforms: floorUniforms,
    vertexShader: /* glsl */`
      varying vec2 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform float uPulse;
      uniform float uAudio;
      uniform vec3 uColor;
      varying vec2 vWorld;
      float lineMask(float value, float width) {
        return 1.0 - smoothstep(0.0, width, abs(fract(value) - 0.5));
      }
      void main() {
        float r = length(vWorld);
        float angle = atan(vWorld.y, vWorld.x);
        float fade = exp(-r * 0.16);
        float gridX = lineMask(vWorld.x * 0.34, 0.045);
        float gridY = lineMask(vWorld.y * 0.34, 0.045);
        float grid = max(gridX, gridY) * 0.18;
        float rings = lineMask(r * 0.68 - uTime * 0.055, 0.06) * 0.34;
        float radial = lineMask(angle / 0.261799, 0.055) * smoothstep(2.2, 5.6, r) * 0.22;
        float scan = lineMask((vWorld.y + uTime * 0.7) * 0.12, 0.09) * 0.12;
        float signal = (grid + rings + radial + scan) * fade;
        signal *= 0.72 + uAudio * 0.8 + uPulse * 0.75;
        float centralVoid = smoothstep(1.5, 2.3, r);
        float alpha = signal * centralVoid;
        gl_FragColor = vec4(uColor * (0.7 + signal * 1.6), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.50;
scene.add(floor);

const haloUniforms = {
  uTime: sharedUniforms.uTime,
  uPulse: sharedUniforms.uPulse,
  uAudio: sharedUniforms.uAudio,
  uColor: { value: modes[0].backdropColor.clone() },
  uAccent: sharedUniforms.uAccentColor
};
const halo = new THREE.Mesh(
  new THREE.CircleGeometry(4.25, 192),
  new THREE.ShaderMaterial({
    uniforms: haloUniforms,
    vertexShader: /* glsl */`
      varying vec2 vUv2;
      void main() {
        vUv2 = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform float uPulse;
      uniform float uAudio;
      uniform vec3 uColor;
      uniform vec3 uAccent;
      varying vec2 vUv2;
      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      void main() {
        vec2 p = (vUv2 - 0.5) * 2.0;
        float r = length(p);
        float a = atan(p.y, p.x);
        float ring = 1.0 - smoothstep(0.01, 0.035, abs(r - 0.72 - sin(a * 5.0 + uTime * 0.3) * 0.018));
        float spokes = 1.0 - smoothstep(0.01, 0.055, abs(fract(a / 0.261799) - 0.5));
        spokes *= smoothstep(0.28, 0.96, r);
        vec2 cells = floor((p + 1.0) * 32.0);
        float dots = step(0.76, hash21(cells));
        dots *= smoothstep(0.10, 0.72, r) * (1.0 - smoothstep(0.72, 0.98, r));
        float coreGlow = exp(-r * r * 2.7) * 0.10;
        float alpha = (ring * 0.28 + spokes * 0.045 + dots * 0.045 + coreGlow) * (1.0 - smoothstep(0.92, 1.0, r));
        alpha *= 0.82 + uAudio * 0.7 + uPulse * 0.8;
        vec3 color = mix(uColor, uAccent, ring * 0.3 + uPulse * 0.18);
        gl_FragColor = vec4(color * (0.42 + alpha * 1.15), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  })
);
halo.renderOrder = -2;
scene.add(halo);

const arcGroup = new THREE.Group();
scene.add(arcGroup);
const arcMaterials = [];
for (let i = 0; i < 3; i += 1) {
  const material = new THREE.MeshBasicMaterial({
    color: modes[0].floorColor,
    transparent: true,
    opacity: 0.18 - i * 0.035,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  arcMaterials.push(material);
  const arc = new THREE.Mesh(new THREE.TorusGeometry(2.4 + i * 0.42, 0.009 + i * 0.002, 6, 256), material);
  arc.rotation.set(Math.PI * (0.18 + i * 0.21), i * 0.75, i * 0.45);
  arc.position.y = 0.42;
  arcGroup.add(arc);
}

const beamUniforms = {
  uTime: sharedUniforms.uTime,
  uPulse: sharedUniforms.uPulse,
  uColor: { value: modes[0].backdropColor.clone() }
};
const lightBars = new THREE.Group();
scene.add(lightBars);
for (let i = 0; i < 7; i += 1) {
  const bar = new THREE.Mesh(
    new THREE.PlaneGeometry(0.08 + (i % 3) * 0.05, 7.5),
    new THREE.ShaderMaterial({
      uniforms: beamUniforms,
      vertexShader: /* glsl */`
        varying vec2 vUv2;
        void main() { vUv2 = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */`
        uniform float uTime;
        uniform float uPulse;
        uniform vec3 uColor;
        varying vec2 vUv2;
        void main() {
          float edge = smoothstep(0.0, 0.22, vUv2.x) * smoothstep(0.0, 0.22, 1.0 - vUv2.x);
          float vertical = smoothstep(0.0, 0.18, vUv2.y) * smoothstep(0.0, 0.28, 1.0 - vUv2.y);
          float scan = 0.55 + 0.45 * sin(vUv2.y * 42.0 - uTime * 2.0);
          float alpha = edge * vertical * (0.025 + scan * 0.025 + uPulse * 0.025);
          gl_FragColor = vec4(uColor * 1.45, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    })
  );
  bar.position.set((i - 3) * 1.18 + (i % 2) * 0.28, 1.35 + (i % 2) * 0.2, -4.1 - Math.abs(i - 3) * 0.08);
  lightBars.add(bar);
}

// 漂浮粒子：将空间从“背景”变成可读的体积。
const backgroundParticleCount = 950;
const particlePositions = new Float32Array(backgroundParticleCount * 3);
const particleScale = new Float32Array(backgroundParticleCount);
const particlePhase = new Float32Array(backgroundParticleCount);
for (let i = 0; i < backgroundParticleCount; i += 1) {
  const radius = 4.0 + Math.random() * 8.5;
  const angle = Math.random() * Math.PI * 2;
  particlePositions[i * 3] = Math.cos(angle) * radius;
  particlePositions[i * 3 + 1] = -3.6 + Math.random() * 10.2;
  particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.72 - 1.5;
  particleScale[i] = Math.random();
  particlePhase[i] = Math.random() * Math.PI * 2;
}
const backgroundGeometry = new THREE.BufferGeometry();
backgroundGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
backgroundGeometry.setAttribute('aScale', new THREE.BufferAttribute(particleScale, 1));
backgroundGeometry.setAttribute('aPhase', new THREE.BufferAttribute(particlePhase, 1));
const backgroundUniforms = {
  uTime: sharedUniforms.uTime,
  uAudio: sharedUniforms.uAudio,
  uColor: { value: modes[0].floorColor.clone() }
};
const backgroundParticles = new THREE.Points(
  backgroundGeometry,
  new THREE.ShaderMaterial({
    uniforms: backgroundUniforms,
    vertexShader: /* glsl */`
      uniform float uTime;
      uniform float uAudio;
      attribute float aScale;
      attribute float aPhase;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * (0.18 + aScale * 0.2) + aPhase) * (0.18 + aScale * 0.3);
        p.x += sin(uTime * 0.11 + aPhase * 1.7) * 0.12;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp((0.8 + aScale * 2.2 + uAudio * 0.6) * (10.0 / max(2.0, -mv.z)), 1.0, 11.0);
        vAlpha = 0.035 + aScale * 0.16;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        vec2 p = gl_PointCoord - 0.5;
        float d = length(p);
        float core = 1.0 - smoothstep(0.02, 0.5, d);
        float crossLine = max(1.0 - smoothstep(0.0, 0.08, abs(p.x)), 1.0 - smoothstep(0.0, 0.08, abs(p.y)));
        float alpha = max(core, crossLine * 0.14) * vAlpha;
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(uColor * (0.52 + core * 0.52), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })
);
scene.add(backgroundParticles);

const gradientMap = new THREE.DataTexture(new Uint8Array([35, 145, 255]), 3, 1, THREE.RedFormat);
gradientMap.needsUpdate = true;
gradientMap.minFilter = THREE.NearestFilter;
gradientMap.magFilter = THREE.NearestFilter;
const dropletMaterial = new THREE.MeshToonMaterial({
  color: modes[0].midColor,
  gradientMap,
  transparent: true,
  opacity: 0.66
});
const dropletGeometry = new THREE.IcosahedronGeometry(0.13, 2);
const dropletGroup = new THREE.Group();
scene.add(dropletGroup);
const droplets = [];
for (let i = 0; i < 16; i += 1) {
  const mesh = new THREE.Mesh(dropletGeometry, dropletMaterial);
  const scale = 0.45 + Math.random() * 1.2;
  mesh.scale.setScalar(scale);
  dropletGroup.add(mesh);
  droplets.push({
    mesh,
    radius: 2.2 + Math.random() * 2.7,
    phase: Math.random() * Math.PI * 2,
    speed: (0.08 + Math.random() * 0.12) * (Math.random() > 0.5 ? 1 : -1),
    yAmp: 0.35 + Math.random() * 1.5,
    tilt: -0.35 + Math.random() * 0.7,
    scale
  });
}

class BurstParticles {
  constructor(max = 320) {
    this.max = max;
    this.cursor = 0;
    this.positions = new Float32Array(max * 3);
    this.velocities = new Float32Array(max * 3);
    this.life = new Float32Array(max);
    this.size = new Float32Array(max);
    for (let i = 0; i < max; i += 1) {
      this.positions[i * 3 + 1] = -999;
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aLife', new THREE.BufferAttribute(this.life, 1));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1));
    this.uniforms = { uColor: { value: modes[0].accentColor.clone() } };
    this.points = new THREE.Points(
      this.geometry,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: /* glsl */`
          attribute float aLife;
          attribute float aSize;
          varying float vLife;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = clamp(aSize * aLife * (8.0 / max(2.0, -mv.z)), 1.0, 14.0);
            vLife = aLife;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */`
          uniform vec3 uColor;
          varying float vLife;
          void main() {
            vec2 p = gl_PointCoord - 0.5;
            float d = length(p);
            float alpha = (1.0 - smoothstep(0.08, 0.5, d)) * vLife * vLife;
            gl_FragColor = vec4(uColor * (1.2 + vLife), alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(this.points);
  }

  spawn(origin, normal, intensity = 1, count = 36) {
    const tangent = new THREE.Vector3().crossVectors(normal, Math.abs(normal.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
    const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    for (let i = 0; i < count; i += 1) {
      const index = this.cursor;
      this.cursor = (this.cursor + 1) % this.max;
      const i3 = index * 3;
      const spreadA = (Math.random() - 0.5) * 2;
      const spreadB = (Math.random() - 0.5) * 2;
      const outward = 0.45 + Math.random() * 1.4;
      const speed = (0.8 + Math.random() * 1.8) * intensity;
      const velocity = normal.clone().multiplyScalar(outward)
        .addScaledVector(tangent, spreadA)
        .addScaledVector(bitangent, spreadB)
        .normalize()
        .multiplyScalar(speed);
      this.positions[i3] = origin.x + normal.x * 0.04;
      this.positions[i3 + 1] = origin.y + normal.y * 0.04;
      this.positions[i3 + 2] = origin.z + normal.z * 0.04;
      this.velocities[i3] = velocity.x;
      this.velocities[i3 + 1] = velocity.y;
      this.velocities[i3 + 2] = velocity.z;
      this.life[index] = 0.62 + Math.random() * 0.38;
      this.size[index] = 2.5 + Math.random() * 4.5;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aLife.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
  }

  update(delta) {
    for (let i = 0; i < this.max; i += 1) {
      if (this.life[i] <= 0) continue;
      const i3 = i * 3;
      this.life[i] = Math.max(0, this.life[i] - delta * 0.72);
      this.positions[i3] += this.velocities[i3] * delta;
      this.positions[i3 + 1] += this.velocities[i3 + 1] * delta;
      this.positions[i3 + 2] += this.velocities[i3 + 2] * delta;
      this.velocities[i3] *= Math.pow(0.94, delta * 60);
      this.velocities[i3 + 1] = this.velocities[i3 + 1] * Math.pow(0.94, delta * 60) - 0.28 * delta;
      this.velocities[i3 + 2] *= Math.pow(0.94, delta * 60);
      if (this.life[i] === 0) this.positions[i3 + 1] = -999;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aLife.needsUpdate = true;
  }
}
const burstParticles = new BurstParticles();

const shockwaves = [];
for (let i = 0; i < 7; i += 1) {
  const material = new THREE.MeshBasicMaterial({
    color: modes[0].accentColor,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.38, 96), material);
  mesh.visible = false;
  scene.add(mesh);
  shockwaves.push({ mesh, life: 0 });
}
let shockwaveCursor = 0;
function spawnShockwave(point, normal, intensity = 1) {
  const wave = shockwaves[shockwaveCursor];
  shockwaveCursor = (shockwaveCursor + 1) % shockwaves.length;
  wave.life = 1;
  wave.intensity = intensity;
  wave.mesh.visible = true;
  wave.mesh.position.copy(point).addScaledVector(normal, 0.045);
  wave.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  wave.mesh.scale.setScalar(0.08);
  wave.mesh.material.opacity = 0.9;
}

const FinalGradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uChroma: { value: 0.002 },
    uPosterize: { value: 0 },
    uPulse: sharedUniforms.uPulse,
    uAccent: sharedUniforms.uAccentColor
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uChroma;
    uniform float uPosterize;
    uniform float uPulse;
    uniform vec3 uAccent;
    varying vec2 vUv;
    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
    }
    void main() {
      vec2 centered = vUv - 0.5;
      float radius = length(centered);
      vec2 direction = normalize(centered + 0.0001);
      float chroma = uChroma * (0.45 + radius * 1.8 + uPulse * 1.7);
      vec2 offset = direction * chroma;
      float r = texture2D(tDiffuse, vUv + offset).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - offset).b;
      vec3 color = vec3(r, g, b);
      float levels = mix(256.0, 10.0, uPosterize);
      vec3 quantized = floor(color * levels + 0.5) / levels;
      color = mix(color, quantized, uPosterize * 0.8);
      float scanline = sin(vUv.y * uResolution.y * 1.12 + uTime * 11.0) * 0.5 + 0.5;
      color -= scanline * (0.004 + uPosterize * 0.008);
      float vignette = smoothstep(0.84, 0.25, radius);
      color *= mix(0.68, 1.0, vignette);
      float grain = hash21(vUv * uResolution + floor(uTime * 30.0)) - 0.5;
      color += grain * (0.012 + uPosterize * 0.014);
      float cornerSignal = smoothstep(0.47, 0.72, abs(centered.x + centered.y * 0.12)) * smoothstep(0.38, 0.64, radius);
      color += uAccent * cornerSignal * uPulse * 0.025;
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), modes[0].bloom, 0.26, 0.94);
const gradePass = new ShaderPass(FinalGradeShader);
const smaaPass = new SMAAPass();
const outputPass = new OutputPass();
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(gradePass);
composer.addPass(smaaPass);
composer.addPass(outputPass);

class SoundField {
  constructor() {
    this.context = null;
    this.master = null;
    this.active = false;
    this.oscillators = [];
    this.noiseFilter = null;
    this.visualEnergy = 0;
  }

  async start() {
    if (!this.context) this.create();
    await this.context.resume();
    this.active = true;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.075, now + 0.5);
    if (runtimePaused) queueRuntimeAudioReconciliation();
  }

  stop() {
    if (!this.context) return;
    this.active = false;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0.0, now + 0.35);
  }

  create() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) throw new Error('Web Audio is unavailable');
    this.context = new AudioCtx();
    this.master = this.context.createGain();
    this.master.gain.value = 0;
    const compressor = this.context.createDynamicsCompressor();
    compressor.threshold.value = -22;
    compressor.knee.value = 20;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.02;
    compressor.release.value = 0.5;
    this.master.connect(compressor).connect(this.context.destination);

    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 680;
    filter.Q.value = 1.2;
    filter.connect(this.master);
    this.droneFilter = filter;

    [1, 1.5, 2.01].forEach((ratio, index) => {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = index === 0 ? 'sine' : 'triangle';
      osc.frequency.value = modes[0].note * ratio;
      gain.gain.value = index === 0 ? 0.42 : 0.11;
      osc.connect(gain).connect(filter);
      osc.start();
      this.oscillators.push({ osc, gain, ratio });
    });

    const buffer = this.context.createBuffer(1, this.context.sampleRate * 2, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    const noise = this.context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 460;
    noiseFilter.Q.value = 2.2;
    const noiseGain = this.context.createGain();
    noiseGain.gain.value = 0.045;
    noise.connect(noiseFilter).connect(noiseGain).connect(this.master);
    noise.start();
    this.noiseFilter = noiseFilter;
  }

  update(mode, time, pulse) {
    if (!this.context) return;
    const now = this.context.currentTime;
    this.oscillators.forEach(({ osc, ratio }, index) => {
      const detune = Math.sin(time * (0.17 + index * 0.04) + index) * (2 + index * 1.5);
      osc.frequency.setTargetAtTime(mode.note * ratio + detune, now, 0.18);
    });
    this.droneFilter.frequency.setTargetAtTime(480 + mode.speed * 320 + pulse * 840, now, 0.12);
    if (this.noiseFilter) this.noiseFilter.frequency.setTargetAtTime(380 + mode.deform * 240 + pulse * 520, now, 0.15);
    this.visualEnergy = this.active ? (0.06 + (Math.sin(time * 2.35) * 0.5 + 0.5) * 0.12 + pulse * 0.18) : 0;
  }

  ping(intensity = 1, accent = false) {
    if (!this.active || !this.context) return;
    const now = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    osc.type = accent ? 'square' : 'sine';
    osc.frequency.setValueAtTime((accent ? 420 : 220) + Math.random() * 150, now);
    osc.frequency.exponentialRampToValueAtTime(85 + Math.random() * 40, now + 0.42);
    filter.type = 'lowpass';
    filter.frequency.value = accent ? 1500 : 900;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055 * intensity, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.46);
    osc.connect(filter).connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + 0.5);
  }
}
const soundField = new SoundField();

const mic = {
  active: false,
  stream: null,
  context: null,
  analyser: null,
  data: null,
  energy: 0
};

async function enableMic() {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('该浏览器不支持麦克风输入');
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    video: false
  });
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const context = new AudioCtx();
  await context.resume();
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.78;
  source.connect(analyser);
  mic.active = true;
  mic.stream = stream;
  mic.context = context;
  mic.analyser = analyser;
  mic.data = new Uint8Array(analyser.frequencyBinCount);
  if (runtimePaused) queueRuntimeAudioReconciliation();
}

async function disableMic() {
  mic.active = false;
  mic.energy = 0;
  mic.stream?.getTracks().forEach((track) => track.stop());
  if (mic.context && mic.context.state !== 'closed') await mic.context.close();
  mic.stream = null;
  mic.context = null;
  mic.analyser = null;
  mic.data = null;
}

function updateMic() {
  if (!mic.active || !mic.analyser || !mic.data) return 0;
  mic.analyser.getByteFrequencyData(mic.data);
  let sum = 0;
  const bins = Math.min(30, mic.data.length);
  for (let i = 1; i < bins; i += 1) sum += mic.data[i];
  const average = sum / Math.max(1, bins - 1);
  const normalized = clamp01((average - 18) / 105);
  mic.energy = damp(mic.energy, normalized, 12, 1 / 60);
  return mic.energy;
}

let activeMode = 0;
let targetMode = 0;
let modeFloatTarget = 0;
let pulse = 0;
let pulseTarget = 0;
let facetTarget = 0;
let frozen = false;
let freezeProgress = 0;
let freezeProgressTarget = 0;
let sceneTime = 0;
let rippleCursor = 0;
let lastInteraction = performance.now();
let lastAutoModeChange = performance.now();
let toastTimer = 0;

function showToast(message, duration = 1300) {
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), duration);
}

function markInteraction() {
  lastInteraction = performance.now();
  controls.autoRotate = false;
}

function setMode(index, announce = true) {
  const next = THREE.MathUtils.clamp(Number(index), 0, modes.length - 1);
  activeMode = next;
  targetMode = next;
  modeFloatTarget = next;
  const mode = modes[next];
  stateNameEl.textContent = `${mode.zh} ${mode.en}`;
  materialTypeEl.textContent = mode.material;
  materialMetricsEl.textContent = `μ ${mode.viscosity.toFixed(2)} · σ ${mode.tension.toFixed(2)} · FLOW ${mode.flow.toFixed(2)}`;
  materialNoteEl.textContent = mode.noteZh;
  $$('.mode-btn').forEach((button, buttonIndex) => {
    const active = buttonIndex === next;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.documentElement.style.setProperty('--accent', mode.accent);
  document.documentElement.style.setProperty('--accent-2', mode.floor);
  pulse = Math.max(pulse, 0.45);
  pulseTarget = 0;
  markInteraction();
  soundField.ping(0.72, next === 3);
  if (announce) showToast(`PHASE ${String(next + 1).padStart(2, '0')} // ${mode.zh} ${mode.en}`);
}

function triggerPulse(strength = 1) {
  pulse = Math.max(pulse, strength);
  pulseTarget = 0;
  sharedUniforms.uPulse.value = pulse;
  const center = orbGroup.getWorldPosition(new THREE.Vector3());
  burstParticles.spawn(center, new THREE.Vector3(0, 1, 0), strength * 0.75, Math.round(28 + strength * 20));
  soundField.ping(1.15 * strength, activeMode === 3);
  navigator.vibrate?.(Math.round(10 + strength * 14));
  markInteraction();
}

function addRipple(localDirection, worldPoint, worldNormal, intensity = 1) {
  const ripple = sharedUniforms.uRipples.value[rippleCursor];
  ripple.set(localDirection.x, localDirection.y, localDirection.z, sceneTime);
  rippleCursor = (rippleCursor + 1) % sharedUniforms.uRipples.value.length;
  sharedUniforms.uPointerVelocity.value = Math.max(sharedUniforms.uPointerVelocity.value, intensity * 0.7);
  spawnShockwave(worldPoint, worldNormal, intensity);
  burstParticles.spawn(worldPoint, worldNormal, intensity, Math.round(24 + intensity * 18));
  pulse = Math.max(pulse, 0.5 * intensity);
  soundField.ping(0.8 + intensity * 0.35, activeMode === 3);
  navigator.vibrate?.(12);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const currentTouchPoint = new THREE.Vector3(0, 0, 1);
const targetTouchPoint = new THREE.Vector3(0, 0, 1);
let touchStrength = 0;
let touchStrengthTarget = 0;
let touchVelocity = 0;
const dragVector = new THREE.Vector3();
const targetDragVector = new THREE.Vector3();
const lastSculptPoint = new THREE.Vector3(0, 0, 1);
let hasLastSculptPoint = false;
let sculptEnergy = 0;
let isSculpting = false;
let activePointerId = null;
let pointerVelocity = 0;
let lastPointer = { x: 0, y: 0, time: performance.now() };
let lastDragBurst = 0;
let lastTapTime = 0;

function mapPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function intersectOrb(event) {
  mapPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(interactionProxy, false);
  if (!hits.length) return null;
  const hit = hits[0];
  const localPoint = orbGroup.worldToLocal(hit.point.clone()).normalize();
  const worldCenter = orbGroup.getWorldPosition(new THREE.Vector3());
  const worldNormal = hit.point.clone().sub(worldCenter).normalize();
  return { ...hit, localPoint, worldNormal };
}

function updateInteractionPoint(hit) {
  targetTouchPoint.copy(hit.localPoint);
  const now = performance.now();
  const dt = Math.max(8, now - lastPointer.time);
  const distance = Math.hypot(pointer.x - lastPointer.x, pointer.y - lastPointer.y);
  pointerVelocity = clamp01((distance / dt) * 420);
  lastPointer = { x: pointer.x, y: pointer.y, time: now };

  if (isSculpting && hasLastSculptPoint) {
    const localDelta = hit.localPoint.clone().sub(lastSculptPoint);
    localDelta.addScaledVector(hit.localPoint, -localDelta.dot(hit.localPoint));
    const dragAmount = Math.min(1.6, localDelta.length() * 26.0 + pointerVelocity * 0.32);
    if (localDelta.lengthSq() > 0.0000001) {
      localDelta.normalize().multiplyScalar(dragAmount);
      targetDragVector.lerp(localDelta, 0.74);
      sculptEnergy = Math.min(1.65, sculptEnergy + dragAmount * 0.12);
    }
  }
  lastSculptPoint.copy(hit.localPoint);
  hasLastSculptPoint = true;
}

canvas.addEventListener('pointermove', (event) => {
  if (activePointerId !== null && event.pointerId !== activePointerId) return;
  const hit = intersectOrb(event);
  if (hit) {
    updateInteractionPoint(hit);
    touchStrengthTarget = frozen ? 0.06 : (isSculpting ? 1.36 : 0.15);
    canvas.style.cursor = isSculpting ? 'grabbing' : 'crosshair';
    if (isSculpting && performance.now() - lastDragBurst > 90) {
      burstParticles.spawn(hit.point, hit.worldNormal, 0.25 + pointerVelocity * 0.35, 5);
      lastDragBurst = performance.now();
    }
  } else {
    touchStrengthTarget = frozen ? 0 : (isSculpting ? 0.78 : 0);
    canvas.style.cursor = isSculpting ? 'grabbing' : 'grab';
  }
}, { passive: true });

canvas.addEventListener('pointerdown', (event) => {
  const hit = intersectOrb(event);
  if (!hit) {
    controls.enabled = true;
    markInteraction();
    return;
  }
  event.preventDefault();
  activePointerId = event.pointerId;
  canvas.setPointerCapture?.(event.pointerId);
  if (frozen) {
    controls.enabled = true;
    currentTouchPoint.copy(hit.localPoint);
    targetTouchPoint.copy(hit.localPoint);
    burstParticles.spawn(hit.point, hit.worldNormal, 0.42, 14);
    pulse = Math.max(pulse, 0.46);
    soundField.ping(0.68, true);
    markInteraction();
    return;
  }
  isSculpting = true;
  canvas.classList.add('is-sculpting');
  controls.enabled = false;
  hasLastSculptPoint = false;
  targetDragVector.set(0, 0, 0);
  dragVector.set(0, 0, 0);
  sculptEnergy = 0.18;
  updateInteractionPoint(hit);
  touchStrengthTarget = 1.36;
  addRipple(hit.localPoint, hit.point, hit.worldNormal, 0.85 + modes[activeMode].swell * 0.15);
  markInteraction();
}, { passive: false });

function endPointer(event) {
  if (activePointerId !== null && event.pointerId !== activePointerId) return;
  const wasSculpting = isSculpting;
  isSculpting = false;
  canvas.classList.remove('is-sculpting');
  controls.enabled = true;
  touchStrengthTarget = 0;
  if (activePointerId !== null) canvas.releasePointerCapture?.(activePointerId);
  activePointerId = null;

  if (wasSculpting) {
    const releaseEnergy = Math.min(1.7, 0.35 + sculptEnergy + pointerVelocity * 0.45);
    sharedUniforms.uReleasePoint.value.copy(currentTouchPoint);
    sharedUniforms.uReleaseVector.value.copy(dragVector.lengthSq() > 0.0001 ? dragVector : targetDragVector);
    sharedUniforms.uReleaseTime.value = sceneTime;
    sharedUniforms.uReleaseEnergy.value = releaseEnergy;
    targetDragVector.set(0, 0, 0);
    hasLastSculptPoint = false;
    pulse = Math.max(pulse, 0.34 + releaseEnergy * 0.18);
  }

  if (wasSculpting && isCoarsePointer) {
    const now = performance.now();
    if (now - lastTapTime < 285) toggleFreeze(currentTouchPoint);
    lastTapTime = now;
  }
}
canvas.addEventListener('pointerup', endPointer, { passive: true });
canvas.addEventListener('pointercancel', endPointer, { passive: true });
canvas.addEventListener('pointerleave', () => {
  if (!isSculpting) touchStrengthTarget = 0;
}, { passive: true });

function toggleFreeze(origin = currentTouchPoint) {
  frozen = !frozen;
  freezeProgressTarget = frozen ? 1 : 0;
  facetTarget = frozen ? 1 : 0;
  pulse = Math.max(pulse, 1.0);
  if (frozen) {
    const nucleation = origin.clone().normalize();
    sharedUniforms.uFreezeOrigin.value.copy(nucleation);
    sharedUniforms.uFreezeTime.value = sceneTime;
    rebuildCrystalCracks(nucleation);
    crystalCracks.visible = true;
    crystalInteriorGroup.visible = true;
    matterStateEl.textContent = 'CRYSTAL';
    matterStateEl.classList.add('is-crystal');
    const worldPoint = orbGroup.localToWorld(nucleation.multiplyScalar(1.64));
    burstParticles.spawn(worldPoint, worldPoint.clone().sub(orbGroup.getWorldPosition(new THREE.Vector3())).normalize(), 1.05, 54);
  } else {
    matterStateEl.textContent = 'LIQUID';
    matterStateEl.classList.remove('is-crystal');
    sharedUniforms.uReleasePoint.value.copy(sharedUniforms.uFreezeOrigin.value);
    sharedUniforms.uReleaseVector.value.copy(sharedUniforms.uFreezeOrigin.value).cross(new THREE.Vector3(0.2, 1, 0.3)).normalize();
    sharedUniforms.uReleaseTime.value = sceneTime;
    sharedUniforms.uReleaseEnergy.value = 1.15;
  }
  soundField.ping(1.25, true);
  showToast(frozen ? 'PHASE TRANSITION // 晶核扩散' : 'PHASE TRANSITION // 晶格熔解');
  markInteraction();
}
canvas.addEventListener('dblclick', (event) => {
  event.preventDefault();
  const hit = intersectOrb(event);
  toggleFreeze(hit?.localPoint || currentTouchPoint);
});

window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) return;
  if (event.code === 'Space') {
    event.preventDefault();
    triggerPulse(1);
  } else if (/^Digit[1-4]$/.test(event.code)) {
    setMode(Number(event.code.slice(-1)) - 1);
  } else if (event.key.toLowerCase() === 'f') {
    toggleFullscreen();
  } else if (event.key.toLowerCase() === 'm') {
    $('#mic-toggle').click();
  }
});

$$('.mode-btn').forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));

$('#audio-toggle').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    if (soundField.active) {
      soundField.stop();
      button.textContent = '声场 OFF';
      button.setAttribute('aria-pressed', 'false');
      showToast('GENERATIVE SOUND FIELD // OFF');
    } else {
      await soundField.start();
      button.textContent = '声场 ON';
      button.setAttribute('aria-pressed', 'true');
      showToast('GENERATIVE SOUND FIELD // ON');
      triggerPulse(0.55);
    }
  } catch (error) {
    showToast(`AUDIO ERROR // ${error.message}`);
  }
});

$('#mic-toggle').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  try {
    if (mic.active) {
      await disableMic();
      button.textContent = 'MIC OFF';
      button.setAttribute('aria-pressed', 'false');
      showToast('MIC REACTIVITY // OFF');
    } else {
      await enableMic();
      button.textContent = 'MIC LIVE';
      button.setAttribute('aria-pressed', 'true');
      showToast('MIC REACTIVITY // LIVE');
      triggerPulse(0.7);
    }
  } catch (error) {
    showToast(`MIC DENIED // ${error.message}`);
  } finally {
    button.disabled = false;
  }
});

function setPanel(open) {
  panel.hidden = !open;
  $('#panel-toggle').setAttribute('aria-expanded', String(open));
}
$('#panel-toggle').addEventListener('click', () => setPanel(panel.hidden));
$('#panel-close').addEventListener('click', () => setPanel(false));

const sliderBindings = [
  ['deform', 'userDeform', 2],
  ['speed', 'userSpeed', 2],
  ['outline', 'outline', 2],
  ['bloom', 'bloom', 2],
  ['chroma', 'chroma', 2],
  ['flow', 'flow', 2],
  ['liveliness', 'liveliness', 2]
];
sliderBindings.forEach(([id, key, digits]) => {
  const input = $(`#${id}`);
  const output = $(`#${id}-out`);
  input.addEventListener('input', () => {
    settings[key] = Number(input.value);
    output.value = settings[key].toFixed(digits);
    output.textContent = output.value;
    markInteraction();
  });
});

$('#reset-params').addEventListener('click', () => {
  const defaults = { deform: 1, speed: 1, outline: 1, bloom: 1, chroma: 0.45, flow: 1, liveliness: 1 };
  Object.entries(defaults).forEach(([id, value]) => {
    const input = $(`#${id}`);
    input.value = value;
    input.dispatchEvent(new Event('input'));
  });
  showToast('MATERIAL PARAMETERS RESET');
});

$$('.quality').forEach((button) => button.addEventListener('click', () => applyQuality(button.dataset.quality)));

function applyQuality(level) {
  settings.quality = level;
  const caps = { high: 1.5, medium: 1.25, low: 1.0 };
  const ratio = Math.min(window.devicePixelRatio || 1, caps[level]);
  renderer.setPixelRatio(ratio);
  smaaPass.enabled = level !== 'low';
  renderer.shadowMap.enabled = level !== 'low';
  backgroundGeometry.setDrawRange(0, level === 'high' ? backgroundParticleCount : level === 'medium' ? 700 : 430);
  $$('.quality').forEach((button) => button.classList.toggle('is-active', button.dataset.quality === level));
  resize();
  showToast(`RENDER QUALITY // ${level.toUpperCase()}`);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
  markInteraction();
}
$('#fullscreen').addEventListener('click', toggleFullscreen);

$('#capture').addEventListener('click', () => {
  renderRefractionBuffer();
  composer.render();
  canvas.toBlob((blob) => {
    if (!blob) {
      showToast('CAPTURE FAILED');
      return;
    }
    const link = document.createElement('a');
    const mode = modes[activeMode];
    link.download = `mizu-kokoro-${mode.en.toLowerCase()}-${Date.now()}.png`;
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    showToast('FRAME CAPTURED // PNG');
  }, 'image/png');
});

function resize() {
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  applyResponsiveCameraFrame(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  composer.setSize(width, height);
  const pixelRatio = renderer.getPixelRatio();
  const refractionScale = { high: 0.82, medium: 0.66, low: 0.5 }[settings.quality] || 0.66;
  const refractionWidth = Math.max(1, Math.floor(width * pixelRatio * refractionScale));
  const refractionHeight = Math.max(1, Math.floor(height * pixelRatio * refractionScale));
  refractionTarget.setSize(refractionWidth, refractionHeight);
  sharedUniforms.uResolution.value.set(refractionWidth, refractionHeight);
  gradePass.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
}
window.addEventListener('resize', resize, { passive: true });

let previousFrameTime = performance.now();
let statsSampleStartedAt = performance.now();
let statsSampleFrames = 0;
let hasRendered = false;
let frameCount = 0;
let lastRuntimeFps = 0;
let lastRuntimeFrameTimeMs = 0;
let animationFrameId = null;
let documentHidden = document.hidden;
let hostPaused = false;
let runtimePaused = null;
const lifecycleAudioContexts = new Set();
const lifecycleMicrophoneTracks = new Set();
let audioTransition = Promise.resolve();

function publishRuntimeStats(paused) {
  postBridgeMessage('stats', {
    fps: lastRuntimeFps,
    frameTimeMs: lastRuntimeFrameTimeMs,
    frameCount,
    paused
  });
}

async function reconcileRuntimeAudio() {
  while (true) {
    const desiredPaused = runtimePaused;
    if (desiredPaused) {
      for (const context of [soundField.context, mic.context]) {
        if (context?.state === 'running') lifecycleAudioContexts.add(context);
      }
      for (const track of mic.stream?.getAudioTracks() ?? []) {
        if (track.enabled && track.readyState === 'live') {
          lifecycleMicrophoneTracks.add(track);
          track.enabled = false;
        }
      }
      await Promise.all([...lifecycleAudioContexts].map((context) =>
        context.state === 'running' ? context.suspend() : undefined
      ));
    } else {
      await Promise.all([...lifecycleAudioContexts].map((context) =>
        context.state === 'suspended' ? context.resume() : undefined
      ));
      for (const track of lifecycleMicrophoneTracks) {
        if (track.readyState === 'live') track.enabled = true;
      }
    }

    if (runtimePaused !== desiredPaused) continue;
    if (!desiredPaused) {
      lifecycleAudioContexts.clear();
      lifecycleMicrophoneTracks.clear();
    }
    return;
  }
}

function queueRuntimeAudioReconciliation() {
  audioTransition = audioTransition
    .then(reconcileRuntimeAudio)
    .catch((error) => {
      console.error('Orb runtime audio transition failed.', error);
    });
}

function scheduleAnimation() {
  if (runtimePaused || animationFrameId !== null) return;
  animationFrameId = requestAnimationFrame(animate);
}

function synchronizePauseState() {
  const nextPaused = documentHidden || hostPaused;
  if (runtimePaused === nextPaused) return;
  runtimePaused = nextPaused;

  if (runtimePaused) {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    queueRuntimeAudioReconciliation();
    publishRuntimeStats(true);
    return;
  }

  const now = performance.now();
  previousFrameTime = now;
  lastInteraction = now;
  lastAutoModeChange = now;
  statsSampleStartedAt = now;
  statsSampleFrames = 0;
  queueRuntimeAudioReconciliation();
  publishRuntimeStats(false);
  scheduleAnimation();
}

function setHostPaused(paused) {
  hostPaused = paused;
  synchronizePauseState();
}

function handleVisibilityChange() {
  documentHidden = document.hidden;
  synchronizePauseState();
}

function updateColors(delta) {
  const mode = modes[targetMode];
  const alpha = 1 - Math.exp(-delta * 3.4);
  sharedUniforms.uDeepColor.value.lerp(mode.deepColor, alpha);
  sharedUniforms.uMidColor.value.lerp(mode.midColor, alpha);
  sharedUniforms.uLightColor.value.lerp(mode.lightColor, alpha);
  sharedUniforms.uAccentColor.value.lerp(mode.accentColor, alpha);
  sharedUniforms.uInkColor.value.lerp(mode.inkColor, alpha);
  floorUniforms.uColor.value.lerp(mode.floorColor, alpha);
  haloUniforms.uColor.value.lerp(mode.backdropColor, alpha);
  beamUniforms.uColor.value.lerp(mode.backdropColor, alpha);
  backgroundUniforms.uColor.value.lerp(mode.floorColor, alpha);
  burstParticles.uniforms.uColor.value.lerp(mode.accentColor, alpha);
  dropletMaterial.color.lerp(mode.midColor, alpha);
  knotMaterial.color.lerp(mode.accentColor, alpha);
  ringMaterial.color.lerp(mode.floorColor, alpha);
  tickMaterial.color.lerp(mode.floorColor, alpha);
  topDiscMaterial.emissive.lerp(mode.floorColor, alpha);
  causticUniforms.uColor.value.lerp(mode.floorColor, alpha);
  crystalInteriorMaterial.color.lerp(mode.lightColor, alpha);
  crystalCrackMaterial.color.lerp(mode.lightColor, alpha);
  arcMaterials.forEach((material) => material.color.lerp(mode.floorColor, alpha));
  shockwaves.forEach((wave) => wave.mesh.material.color.lerp(mode.accentColor, alpha));
  keyLight.color.lerp(mode.lightColor, alpha * 0.35);
  rimLight.color.lerp(mode.accentColor, alpha * 0.45);
}

function updateVisualTargets(delta) {
  const mode = modes[targetMode];
  freezeProgress = damp(freezeProgress, freezeProgressTarget, frozen ? 2.45 : 3.6, delta);
  if (Math.abs(freezeProgress - freezeProgressTarget) < 0.0005) freezeProgress = freezeProgressTarget;
  sharedUniforms.uFreezeProgress.value = freezeProgress;

  sharedUniforms.uMode.value = damp(sharedUniforms.uMode.value, modeFloatTarget, 3.2, delta);
  sharedUniforms.uDeform.value = damp(sharedUniforms.uDeform.value, mode.deform * settings.userDeform, 4.0, delta);
  sharedUniforms.uTension.value = damp(sharedUniforms.uTension.value, mode.tension, 4.2, delta);
  sharedUniforms.uViscosity.value = damp(sharedUniforms.uViscosity.value, mode.viscosity, 4.0, delta);
  sharedUniforms.uSwell.value = damp(sharedUniforms.uSwell.value, mode.swell, 4.0, delta);
  sharedUniforms.uFlowStrength.value = damp(sharedUniforms.uFlowStrength.value, mode.flow * settings.flow, 4.0, delta);
  sharedUniforms.uTurbulence.value = damp(sharedUniforms.uTurbulence.value, mode.turbulence, 4.0, delta);
  sharedUniforms.uFoam.value = damp(sharedUniforms.uFoam.value, mode.foam, 4.0, delta);
  sharedUniforms.uClarity.value = damp(sharedUniforms.uClarity.value, mode.clarity, 4.0, delta);
  sharedUniforms.uElasticity.value = damp(sharedUniforms.uElasticity.value, mode.elasticity * settings.liveliness, 4.0, delta);
  sharedUniforms.uShear.value = damp(sharedUniforms.uShear.value, mode.shear, 4.0, delta);
  sharedUniforms.uRimStrength.value = damp(sharedUniforms.uRimStrength.value, mode.rim, 4.0, delta);
  sharedUniforms.uFacet.value = damp(sharedUniforms.uFacet.value, facetTarget * freezeProgress, 5.0, delta);
  sharedUniforms.uOutlineThickness.value = damp(sharedUniforms.uOutlineThickness.value, 0.046 * settings.outline, 5.0, delta);
  const targetOpacity = 0.86 + (1.0 - mode.clarity) * 0.075 + (activeMode === 3 ? 0.025 : 0);
  sharedUniforms.uOpacity.value = damp(sharedUniforms.uOpacity.value, targetOpacity, 4.0, delta);

  const qualityBloom = settings.quality === 'low' ? 0.72 : 1;
  bloomPass.strength = damp(
    bloomPass.strength,
    (mode.bloom + freezeProgress * 0.24) * settings.bloom * qualityBloom,
    4.0,
    delta
  );
  bloomPass.radius = damp(bloomPass.radius, activeMode === 3 || freezeProgress > 0.5 ? 0.16 : 0.28, 4.0, delta);
  gradePass.uniforms.uChroma.value = damp(
    gradePass.uniforms.uChroma.value,
    0.00075 * (mode.chroma + freezeProgress * 0.42) * settings.chroma,
    5.0,
    delta
  );
  gradePass.uniforms.uPosterize.value = damp(
    gradePass.uniforms.uPosterize.value,
    Math.min(0.92, mode.posterize + freezeProgress * 0.08),
    4.0,
    delta
  );
  topDiscMaterial.emissiveIntensity = damp(topDiscMaterial.emissiveIntensity, 0.07 + pulse * 0.18 + freezeProgress * 0.08, 4.0, delta);

  const visibleCrystal = freezeProgress > 0.002;
  crystalOrb.visible = visibleCrystal;
  crystalInteriorGroup.visible = visibleCrystal;
  crystalCracks.visible = visibleCrystal && crystalCracks.userData.vertexCount > 0;
  crystalInteriorMaterial.opacity = freezeProgress * (0.16 + pulse * 0.08);
  crystalCrackMaterial.opacity = freezeProgress * (0.54 + pulse * 0.22);
  crystalCrackGeometry.setDrawRange(0, Math.floor(crystalCracks.userData.vertexCount * freezeProgress));
  knotMaterial.opacity = 0.28 * (1.0 - freezeProgress * 0.88);
}

function updateSpatialArt(delta) {
  const mode = modes[activeMode];
  const liquidMotion = 1.0 - freezeProgress * 0.88;
  core.rotation.y += delta * (0.19 + mode.speed * 0.12) * liquidMotion;
  core.rotation.x = Math.sin(sceneTime * 0.21) * 0.14 * liquidMotion;
  coreKnot.rotation.x += delta * 0.23 * liquidMotion;
  coreKnot.rotation.y -= delta * 0.31 * liquidMotion;
  coreKnot.scale.setScalar(1 + pulse * 0.07 + sharedUniforms.uAudio.value * 0.08);

  crystalInteriorGroup.rotation.y -= delta * 0.08 * freezeProgress;
  crystalInteriorGroup.rotation.x = Math.sin(sceneTime * 0.16) * 0.08 * freezeProgress;
  crystalShards.forEach((shard, index) => {
    const shimmer = 0.82 + Math.sin(sceneTime * 0.9 + shard.userData.phase + index * 0.17) * 0.12;
    const growth = freezeProgress * shimmer;
    shard.scale.copy(shard.userData.baseScale).multiplyScalar(growth);
    shard.rotation.y += delta * (0.018 + index * 0.0008) * freezeProgress;
  });

  orbGroup.rotation.y += delta * THREE.MathUtils.lerp(0.028, 0.006, freezeProgress);
  orbGroup.rotation.x = Math.sin(sceneTime * 0.19) * THREE.MathUtils.lerp(0.027, 0.006, freezeProgress);
  const floatAmplitude = THREE.MathUtils.lerp(0.048, 0.015, freezeProgress);
  const floatY = Math.sin(sceneTime * 0.72) * (prefersReducedMotion ? 0.012 : floatAmplitude);
  orbGroup.position.y = 0.48 + floatY;

  arcGroup.rotation.y += delta * 0.045;
  arcGroup.rotation.z = Math.sin(sceneTime * 0.12) * 0.08;
  arcGroup.children.forEach((arc, index) => {
    arc.rotation.z += delta * (0.025 + index * 0.013) * (index % 2 ? -1 : 1);
    arc.material.opacity = (0.13 - index * 0.02) + pulse * 0.10 + sharedUniforms.uAudio.value * 0.12 + freezeProgress * 0.04;
  });

  const orbitalSpeed = (0.34 + mode.flow * 0.78) * (1.0 - mode.viscosity * 0.32);
  dropletMaterial.opacity = THREE.MathUtils.lerp(0.72, 0.42, freezeProgress);
  droplets.forEach((drop, index) => {
    const angle = drop.phase + sceneTime * drop.speed * orbitalSpeed;
    const wobble = Math.sin(sceneTime * (0.52 + mode.turbulence * 0.46) + drop.phase) * (0.08 + mode.swell * 0.10);
    drop.mesh.position.set(
      Math.cos(angle) * (drop.radius + wobble),
      0.45 + Math.sin(angle * (1.45 + mode.swell * 0.35) + drop.phase) * drop.yAmp,
      Math.sin(angle) * drop.radius * (0.55 + drop.tilt * 0.15)
    );
    drop.mesh.rotation.set(angle * 0.7, angle * 1.3 + index, angle * 0.35);
    const audioScale = 1 + sharedUniforms.uAudio.value * (0.18 + (index % 4) * 0.04);
    const baseScale = drop.scale * audioScale;
    const stringiness = 1.0 + mode.viscosity * 1.35 + mode.swell * 0.22;
    const sprayFlatten = 1.0 + mode.swell * 0.24;
    drop.mesh.scale.set(baseScale / sprayFlatten, baseScale * stringiness, baseScale / sprayFlatten);
  });

  causticDisc.rotation.z += delta * (0.012 + mode.flow * 0.018) * (1.0 - freezeProgress * 0.72);

  shockwaves.forEach((wave) => {
    if (wave.life <= 0) return;
    const decay = THREE.MathUtils.lerp(1.35, 0.62, mode.viscosity);
    wave.life = Math.max(0, wave.life - delta * decay);
    const progress = 1 - wave.life;
    const reach = 3.1 + mode.tension * 0.72 + mode.swell * 0.55;
    const scale = THREE.MathUtils.lerp(0.08, reach * wave.intensity, 1 - Math.pow(1 - progress, 2));
    wave.mesh.scale.setScalar(scale);
    wave.mesh.material.opacity = wave.life * wave.life * (0.72 + mode.tension * 0.12);
    if (wave.life === 0) wave.mesh.visible = false;
  });

  burstParticles.update(delta);
}

function renderRefractionBuffer() {
  const wasVisible = orbGroup.visible;
  orbGroup.visible = false;
  renderer.setRenderTarget(refractionTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  orbGroup.visible = wasVisible;
}

function updateHaloBillboard() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  halo.position.copy(controls.target).addScaledVector(direction, 4.2);
  halo.quaternion.copy(camera.quaternion);
  lightBars.quaternion.copy(camera.quaternion);
  lightBars.position.copy(controls.target).addScaledVector(direction, 0.25);
}

function autoExhibitionMode() {
  const now = performance.now();
  const idleFor = now - lastInteraction;
  if (idleFor > 15000) {
    controls.autoRotate = true;
    touchStrengthTarget = frozen ? 0 : 0.10;
    targetTouchPoint.set(
      Math.sin(sceneTime * 0.27),
      Math.sin(sceneTime * 0.19 + 1.4) * 0.65,
      Math.cos(sceneTime * 0.27)
    ).normalize();
  }
  if (idleFor > 30000 && now - lastAutoModeChange > 17000) {
    setMode((activeMode + 1) % modes.length, false);
    lastAutoModeChange = now;
    lastInteraction = now - 20000;
  }
}

function animate(timestamp = performance.now()) {
  animationFrameId = null;
  if (runtimePaused) return;
  const delta = Math.min(Math.max((timestamp - previousFrameTime) / 1000, 0), 0.05);
  previousFrameTime = timestamp;
  const mode = modes[activeMode];
  const reduceFactor = prefersReducedMotion ? 0.34 : 1;
  sceneTime += delta * mode.speed * settings.userSpeed * reduceFactor;
  sharedUniforms.uTime.value = sceneTime;
  gradePass.uniforms.uTime.value = sceneTime;

  autoExhibitionMode();
  updateColors(delta);
  updateVisualTargets(delta);

  const trackingRate = isSculpting ? THREE.MathUtils.lerp(20, 8, mode.viscosity) : 6.5;
  currentTouchPoint.lerp(targetTouchPoint, 1 - Math.exp(-delta * trackingRate));
  currentTouchPoint.normalize();
  sharedUniforms.uTouchPoint.value.copy(currentTouchPoint);

  const springStrength = isSculpting
    ? 185
    : 42 * mode.recovery * Math.max(0.25, settings.liveliness);
  const dampingRatio = isSculpting
    ? 0.92
    : THREE.MathUtils.clamp((0.24 + mode.viscosity * 1.02) / Math.sqrt(Math.max(0.22, mode.elasticity * settings.liveliness)), 0.18, 1.42);
  const springDamping = 2 * Math.sqrt(springStrength) * dampingRatio;
  const touchAcceleration = (touchStrengthTarget - touchStrength) * springStrength - touchVelocity * springDamping;
  touchVelocity += touchAcceleration * delta;
  touchStrength = THREE.MathUtils.clamp(touchStrength + touchVelocity * delta, -0.52, 1.46);
  if (freezeProgress > 0.72) {
    touchStrength *= Math.exp(-delta * 10.0);
    touchVelocity *= Math.exp(-delta * 10.0);
  }
  sharedUniforms.uTouchStrength.value = touchStrength;

  if (!isSculpting) {
    const dragDecay = THREE.MathUtils.lerp(10.5, 2.0, mode.viscosity);
    targetDragVector.multiplyScalar(Math.exp(-delta * dragDecay));
  }
  const dragTracking = THREE.MathUtils.lerp(18.0, 5.2, mode.viscosity);
  dragVector.lerp(targetDragVector, 1 - Math.exp(-delta * dragTracking));
  if (freezeProgress > 0.35) dragVector.multiplyScalar(Math.exp(-delta * 8.0 * freezeProgress));
  sharedUniforms.uDragVector.value.copy(dragVector).multiplyScalar(settings.liveliness);

  pointerVelocity = damp(pointerVelocity, 0, 7, delta);
  sharedUniforms.uPointerVelocity.value = damp(sharedUniforms.uPointerVelocity.value, pointerVelocity, 12, delta);

  pulse = damp(pulse, pulseTarget, 3.3, delta);
  sharedUniforms.uPulse.value = pulse;

  soundField.update(mode, sceneTime, pulse);
  const micEnergy = updateMic();
  const audioTarget = mic.active ? micEnergy : soundField.visualEnergy;
  sharedUniforms.uAudio.value = damp(sharedUniforms.uAudio.value, audioTarget, mic.active ? 11 : 5, delta);

  rimLight.intensity = 20 + pulse * 15 + sharedUniforms.uAudio.value * 18 + freezeProgress * 8;
  keyLight.intensity = 48 + pulse * 18 + freezeProgress * 7;
  pedestalRing.scale.setScalar(1 + pulse * 0.04 + sharedUniforms.uAudio.value * 0.025 + freezeProgress * 0.018);
  ringMaterial.opacity = 0.55 + pulse * 0.35 + sharedUniforms.uAudio.value * 0.25 + freezeProgress * 0.08;

  updateSpatialArt(delta);
  controls.update(delta);
  updateHaloBillboard();
  renderRefractionBuffer();
  composer.render(delta);

  frameCount += 1;
  statsSampleFrames += 1;
  const statsSampleDurationMs = timestamp - statsSampleStartedAt;
  if (statsSampleDurationMs >= 500) {
    lastRuntimeFps = statsSampleFrames * 1000 / statsSampleDurationMs;
    lastRuntimeFrameTimeMs = statsSampleDurationMs / statsSampleFrames;
    const fps = Math.round(lastRuntimeFps);
    fpsEl.textContent = `${fps} FPS`;
    publishRuntimeStats(false);
    statsSampleStartedAt = timestamp;
    statsSampleFrames = 0;
  }

  if (!hasRendered) {
    hasRendered = true;
    setTimeout(() => loading.classList.add('is-hidden'), 280);
  }

  scheduleAnimation();
}

applyQuality(settings.quality);
setMode(0, false);
resize();
document.addEventListener('visibilitychange', handleVisibilityChange);
if (embeddedBridge) {
  window.addEventListener('message', handleBridgeMessage);
  postBridgeMessage('ready', { capabilities: [...bridgeCapabilities] });
}
synchronizePauseState();
