import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import {
  createMediaTimeDeltaTracker,
  createSpectralFluxOnsetDetector,
} from './spectral-flux-onset.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / Math.max(1e-6, b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const smootherstep = (a, b, x) => {
  const t = clamp((x - a) / Math.max(1e-6, b - a), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

const ui = {
  gate: $('#gate'), enter: $('#enterBtn'), silent: $('#silentBtn'), replay: $('#replayBtn'),
  file: $('#fileInput'), fileLabel: $('#fileLabel'), hint: $('#gateHint'),
  ritualCaption: $('#ritualCaption'), ritualIndex: $('#ritualIndex'), ritualMain: $('#ritualMain'), ritualSub: $('#ritualSub'),
  phaseNumber: $('#phaseNumber'), phaseName: $('#phaseName'), phaseSub: $('#phaseSub'), sideTicks: $$('#sideIndex i'),
  coreState: $('#coreState'), fieldState: $('#fieldState'), depth: $('#depthValue'), coord: $('#coordValue'), index: $('#indexValue'),
  signal: $('#signalState'), mode: $('#modeState'), audioState: $('#audioState'),
  timeNow: $('#timeNow'), timeTotal: $('#timeTotal'), low: $('#bandLow'), mid: $('#bandMid'), high: $('#bandHigh'),
  cursor: $('#cursor'), message: $('#message'), audio: $('#audio'), unsupported: $('#unsupported')
};

const isCoarse = matchMedia('(pointer: coarse)').matches;
const isMobile = isCoarse || innerWidth < 820;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const previewParams = new URLSearchParams(location.search);
const forcedPreview = window.__NINTH_TIDE_PREVIEW__;
const deterministicCaptureRequested = previewParams.has('preview') || forcedPreview !== undefined;
const defaultMainPreviewSection = 7;

function mulberry32(seed) {
  let randomState = seed >>> 0;
  const generator = function () {
    let t = randomState = (randomState + 0x6D2B79F5) >>> 0;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  generator.getState = () => randomState;
  generator.setState = (value) => {
    if (!Number.isInteger(value) || value < 0 || value > 0xFFFFFFFF) {
      throw new RangeError('Ninth Tide random state must be a uint32.');
    }
    randomState = value >>> 0;
  };
  return generator;
}
const random = mulberry32(0x91A7F4);
const rand = (a = 0, b = 1) => a + (b - a) * random();
const fract = (x) => x - Math.floor(x);

function formatTime(value) {
  if (!Number.isFinite(value)) return '00:00';
  const m = Math.floor(value / 60);
  const s = Math.floor(value % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function showMessage(text, duration = 1700) {
  ui.message.textContent = text;
  ui.message.classList.add('show');
  clearTimeout(showMessage.timer);
  if (!deterministicCaptureActive) {
    showMessage.timer = setTimeout(() => ui.message.classList.remove('show'), duration);
  }
}

const tideMeta = [
  ['I', '无月测深', 'MOONLESS SOUNDING'],
  ['II', '盐星下沉', 'SALT STARS SINKING'],
  ['III', '石英梦语', 'QUARTZ DREAMS'],
  ['IV', '门后之海', 'THE SEA BEHIND THE DOOR'],
  ['V', '未诞之城', 'THE UNBORN CITY'],
  ['VI', '逆潮遗骸', 'RELICS AGAINST THE TIDE'],
  ['VII', '黑水密卷', 'THE BLACKWATER CODEX'],
  ['VIII', '深渊回视', 'THE ABYSS LOOKS BACK'],
  ['IX', '无岸长夜', 'THE SHORELESS NIGHT']
];
// Boundaries follow the track's beat-synchronous structural changes rather than
// slicing its duration into nine equal blocks.
const sectionBoundaries = [0, 48.9709, 75.0469, 103.0966, 145.2408, 183.8092, 224.8853, 260.2260, 330.0484, 354.5040];
const scoreDuration = sectionBoundaries[sectionBoundaries.length - 1];
const sectionTransitionDuration = 2.85;
const onsetDetectorConfig = Object.freeze({
  historySeconds: 1.25,
  warmupSeconds: 1,
  thresholdStdDeviations: 1.5,
  lowpassLambda: 30,
  minFlux: 0.012,
  minSamples: 2,
});
const onsetBandFloorHz = 190;
const onsetPathByChapter = Object.freeze([
  'full', 'full', 'full', 'full', 'full', 'full', 'full', 'band', 'full'
]);

const palettes = [
  { deep: 0x010609, fog: 0x031419, glow: 0x67ddce, accent: 0xe3f8e9, secondary: 0x1c6470 },
  { deep: 0x01070d, fog: 0x041728, glow: 0x54bee0, accent: 0xd5f2ff, secondary: 0x284a83 },
  { deep: 0x030809, fog: 0x10211c, glow: 0x8dd8af, accent: 0xf3edc9, secondary: 0x4b7352 },
  { deep: 0x03050b, fog: 0x151426, glow: 0x93a5ff, accent: 0xe7eaff, secondary: 0x514882 },
  { deep: 0x050709, fog: 0x211d12, glow: 0xd8c879, accent: 0xfff2bc, secondary: 0x665324 },
  { deep: 0x010808, fog: 0x09211f, glow: 0x63d8c0, accent: 0xd9f8ec, secondary: 0x286d65 },
  { deep: 0x05030b, fog: 0x1e1228, glow: 0xc27ee3, accent: 0xf1d8f8, secondary: 0x6c3b7c },
  { deep: 0x01070a, fog: 0x0c1e20, glow: 0x83d9bc, accent: 0xe8f5dc, secondary: 0x416b5d },
  { deep: 0x000405, fog: 0x091819, glow: 0xa9e8c9, accent: 0xfff1c7, secondary: 0x587964 }
].map((p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, new THREE.Color(v)])));

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    powerPreference: 'high-performance',
    alpha: false,
    preserveDrawingBuffer: deterministicCaptureRequested
  });
} catch (error) {
  console.error(error);
  ui.unsupported.style.display = 'grid';
  throw error;
}
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.15 : 1.6));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.05;
renderer.setClearColor(0x000304, 1);
$('#scene').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000304);
scene.fog = new THREE.FogExp2(0x031318, 0.021);

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.08, 85);
camera.position.set(0, 0.75, 13.6);

const world = new THREE.Group();
scene.add(world);

const timer = new THREE.Timer();
timer.connect(document);
const pointer = new THREE.Vector2();
const pointerSmooth = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const scratchVec3 = new THREE.Vector3();

const spectrumSize = 64;
const spectrumBytes = new Uint8Array(spectrumSize);
const spectrumTexture = new THREE.DataTexture(spectrumBytes, spectrumSize, 1, THREE.RedFormat, THREE.UnsignedByteType);
spectrumTexture.magFilter = THREE.LinearFilter;
spectrumTexture.minFilter = THREE.LinearFilter;
spectrumTexture.wrapS = THREE.ClampToEdgeWrapping;
spectrumTexture.wrapT = THREE.ClampToEdgeWrapping;
spectrumTexture.needsUpdate = true;

const state = {
  entered: false,
  calibrated: false,
  ceremonyTime: -1,
  ceremonyCue: 0,
  ritual: 0,
  ignite: 0,
  lightLevel: 0,
  shutdown: 0,
  ending: false,
  ended: false,
  endingCue: 0,
  previewMode: '',
  previewSection: defaultMainPreviewSection,
  audioReady: false,
  playing: false,
  muted: false,
  audioFailed: false,
  archiveOpen: 0,
  archiveOpenTarget: 0,
  pulseAge: 99,
  pulseStrength: 0,
  pulseOrigin: new THREE.Vector2(0, 0),
  pulseSourceY: 0.35,
  pulseCooldown: 0,
  low: 0,
  mid: 0,
  high: 0,
  rms: 0,
  energy: 0,
  transient: 0,
  previousEnergy: 0,
  tideFloat: 0,
  tideIndex: 0,
  transitionFrom: 0,
  pendingTide: -1,
  phaseLocal: 0,
  phaseTransition: 0,
  transitionClock: 99,
  transitionSwitched: false,
  pulseMode: 0,
  pulseSerial: 0,
  pulseScreen: new THREE.Vector2(0.5, 0.5),
  dive: 0.12,
  diveTarget: 0.12,
  yaw: 0,
  yawTarget: 0,
  pitch: 0.07,
  pitchTarget: 0.07,
  dragging: false,
  dragDistance: 0,
  lastPointerX: 0,
  lastPointerY: 0,
  activeSeconds: 0,
  syntheticPhase: 0,
  coreHovered: false
};

const globals = {
  time: { value: 0 },
  low: { value: 0 },
  mid: { value: 0 },
  high: { value: 0 },
  rms: { value: 0 },
  energy: { value: 0 },
  transient: { value: 0 },
  ritual: { value: 0 },
  ignite: { value: 0 },
  shutdown: { value: 0 },
  pulseAge: { value: 99 },
  pulseStrength: { value: 0 },
  pulseOrigin: { value: state.pulseOrigin },
  pulseScreen: { value: state.pulseScreen },
  open: { value: 0 },
  tide: { value: 0 },
  section: { value: 0 },
  sectionLocal: { value: 0 },
  phaseTransition: { value: 0 },
  sonarMode: { value: 0 },
  pixelRatio: { value: renderer.getPixelRatio() },
  resolution: { value: new THREE.Vector2(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio()) },
  spectrum: { value: spectrumTexture },
  deepColor: { value: palettes[0].deep.clone() },
  fogColor: { value: palettes[0].fog.clone() },
  glowColor: { value: palettes[0].glow.clone() },
  accentColor: { value: palettes[0].accent.clone() },
  secondaryColor: { value: palettes[0].secondary.clone() }
};
const shaderUniforms = (extra = {}) => ({ ...globals, ...extra });

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.07, 'rgba(210,255,246,.74)');
  gradient.addColorStop(0.28, 'rgba(88,224,206,.22)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
const glowTexture = createGlowTexture();

// ---------- Perceptual field: a boundaryless, submerged Ganzfeld ----------
const fieldMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,
  uniforms: shaderUniforms(),
  vertexShader: /* glsl */`
    varying vec3 vWorld;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform float low;
    uniform float high;
    uniform float energy;
    uniform float ritual;
    uniform float shutdown;
    uniform float tide;
    uniform vec3 deepColor;
    uniform vec3 fogColor;
    uniform vec3 glowColor;
    varying vec3 vWorld;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
    }
    float noise21(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash21(i), hash21(i + vec2(1.0,0.0)), f.x),
                 mix(hash21(i + vec2(0.0,1.0)), hash21(i + vec2(1.0,1.0)), f.x), f.y);
    }
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.52;
      for (int i = 0; i < 5; i++) {
        v += a * noise21(p);
        p = mat2(1.7, -1.15, 1.15, 1.7) * p + 0.17;
        a *= 0.48;
      }
      return v;
    }
    void main() {
      vec3 d = normalize(vWorld);
      float lon = atan(d.z, d.x) / 6.2831853 + 0.5;
      float lat = asin(clamp(d.y, -1.0, 1.0)) / 3.1415926 + 0.5;
      vec2 uv = vec2(lon, lat);
      float n = fbm(vec2(uv.x * 4.6 + time * 0.006, uv.y * 7.0 - time * 0.004));
      float slow = fbm(vec2(uv.x * 1.9 - time * 0.002, uv.y * 2.5));
      float upper = pow(max(0.0, d.y * 0.5 + 0.5), 2.6);
      float horizon = pow(1.0 - abs(d.y), 4.2);
      float caustic = abs(sin(uv.x * 37.0 + n * 4.0 + time * 0.07) - sin(uv.y * 29.0 - time * 0.05));
      caustic = pow(max(0.0, 1.0 - caustic), 11.0);
      vec3 color = mix(deepColor, fogColor, 0.27 + n * 0.46 + horizon * 0.13);
      color += glowColor * (upper * 0.012 + caustic * upper * (0.012 + high * 0.028));
      color += glowColor * slow * (0.006 + low * 0.009);
      color *= 0.48 + ritual * 0.52;
      color *= 1.0 - shutdown * 0.82;
      color *= 0.92 + sin(tide * 0.64 + n * 2.0) * 0.06;
      gl_FragColor = vec4(color, 1.0);
    }
  `
});
const perceptualField = new THREE.Mesh(new THREE.SphereGeometry(42, 64, 36), fieldMaterial);
world.add(perceptualField);

// ---------- Sonar floor: visible score for the acoustic wave ----------
const floorMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: shaderUniforms(),
  vertexShader: /* glsl */`
    varying vec2 vPlane;
    void main() {
      vPlane = position.xy;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform float low;
    uniform float mid;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform float ritual;
    uniform float shutdown;
    uniform float tide;
    uniform vec2 pulseOrigin;
    uniform vec3 glowColor;
    uniform vec3 secondaryColor;
    varying vec2 vPlane;

    float lineBand(float x, float width) {
      float f = abs(fract(x) - 0.5);
      return 1.0 - smoothstep(width, width * 2.25, f);
    }
    void main() {
      vec2 p = vPlane;
      float radius = length(p);
      if (radius > 16.0) discard;
      float nr = radius / 16.0;
      float angle = atan(p.y, p.x) / 6.2831853 + 0.5;
      float rings = lineBand(nr * 22.0 - time * 0.025, 0.015) * 0.24;
      rings += lineBand(nr * 8.0 + time * 0.009, 0.010) * 0.48;
      float spokes = lineBand(angle * 72.0, 0.006) * smoothstep(0.16, 0.78, nr) * 0.26;
      float nine = lineBand(angle * 9.0 - tide * 0.012, 0.012) * 0.58;
      float localRadius = length(p - pulseOrigin);
      float waveRadius = pulseAge * (4.15 + low * 1.7);
      float wave = exp(-abs(localRadius - waveRadius) * 1.55) * smoothstep(5.2, 0.0, pulseAge) * pulseStrength;
      float wake = step(localRadius, waveRadius) * exp(-(waveRadius - localRadius) * 0.23) * exp(-pulseAge * 0.12) * pulseStrength;
      float center = exp(-nr * 7.0) * (0.08 + low * 0.14);
      float scan = 0.5 + 0.5 * sin(radius * 8.5 - time * 0.75 + mid * 3.0);
      float edgeFade = smoothstep(1.0, 0.69, nr) * smoothstep(0.01, 0.07, nr);
      float activate = smoothstep(0.03, 0.58, ritual);
      float survive = 1.0 - smoothstep(0.43, 0.90, shutdown);
      vec3 color = mix(secondaryColor, glowColor, nr + wave * 0.7);
      float alpha = (rings + spokes + nine * 0.22 + center + wave * 2.4 + wake * 0.32 + scan * 0.008) * edgeFade * activate * survive;
      gl_FragColor = vec4(color * (0.22 + wave * 1.60 + wake * 0.18), alpha * 0.68);
    }
  `
});
const floor = new THREE.Mesh(new THREE.CircleGeometry(16, 256), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.36;
floor.renderOrder = 1;
world.add(floor);

const platformMaterial = new THREE.MeshStandardMaterial({
  color: 0x01080b, roughness: 0.22, metalness: 0.9,
  emissive: 0x031718, emissiveIntensity: 0.12, transparent: true, opacity: 0.78
});
const platform = new THREE.Mesh(new THREE.CylinderGeometry(4.25, 4.7, 0.22, 128), platformMaterial);
platform.position.y = -2.49;
world.add(platform);
const platformRings = [];
for (const radius of [2.65, 3.55, 4.55]) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, radius === 4.55 ? 0.012 : 0.006, 5, 256),
    new THREE.MeshBasicMaterial({ color: 0x63d8c7, transparent: true, opacity: 0.11, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -2.34;
  platformRings.push(ring);
  world.add(ring);
}

// ---------- Archive lattice: wireframe cells containing dense spectral point clouds ----------
function buildArchiveCells() {
  const count = isMobile ? 45 : 81;
  const cells = [];
  for (let i = 0; i < count; i++) {
    let tier;
    if (i < 9) tier = 0;
    else if (i < Math.floor(count * 0.45)) tier = 1;
    else tier = 2;
    const tierStart = tier === 0 ? 0 : tier === 1 ? 9 : Math.floor(count * 0.45);
    const tierCount = tier === 0 ? 9 : tier === 1 ? Math.floor(count * 0.45) - 9 : count - Math.floor(count * 0.45);
    let angle = ((i - tierStart) / Math.max(1, tierCount)) * Math.PI * 2 + rand(-0.16, 0.16);
    const front = Math.atan2(Math.sin(angle - Math.PI / 2), Math.cos(angle - Math.PI / 2));
    const corridor = tier === 0 ? 0.34 : 0.54;
    if (Math.abs(front) < corridor) angle += (front >= 0 ? 1 : -1) * (corridor - Math.abs(front) + rand(0.07, 0.24));
    const radius = tier === 0 ? rand(5.15, 6.2) : tier === 1 ? rand(8.0, 13.8) : rand(14.5, 24.5);
    const width = rand(tier === 2 ? 0.65 : 0.5, tier === 2 ? 1.8 : 1.35);
    const depth = rand(0.36, tier === 2 ? 1.16 : 0.86);
    const height = rand(tier === 0 ? 1.2 : 1.7, tier === 2 ? 7.0 : 5.1);
    const center = new THREE.Vector3(
      Math.cos(angle) * radius,
      -2.31 + height * 0.5 + rand(-0.08, tier === 2 ? 0.72 : 0.34),
      Math.sin(angle) * radius
    );
    const rotation = -angle + Math.PI / 2 + rand(-0.18, 0.18);
    const order = clamp((radius - 4.9) / 20.2, 0, 1);
    const band = fract((i * 0.61803398875 + tier * 0.13) * 0.97);
    cells.push({ center, rotation, width, height, depth, order, band, seed: rand(0, 1000), tier });
  }
  return cells;
}
const archiveCells = buildArchiveCells();

function transformCellPoint(cell, x, y, z) {
  const c = Math.cos(cell.rotation), s = Math.sin(cell.rotation);
  return new THREE.Vector3(
    cell.center.x + x * c - z * s,
    cell.center.y + y,
    cell.center.z + x * s + z * c
  );
}

function createArchiveWireGeometry(cells) {
  const corners = [
    [-0.5,-0.5,-0.5], [0.5,-0.5,-0.5], [0.5,0.5,-0.5], [-0.5,0.5,-0.5],
    [-0.5,-0.5,0.5], [0.5,-0.5,0.5], [0.5,0.5,0.5], [-0.5,0.5,0.5]
  ];
  const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  const vertexCount = cells.length * edges.length * 2;
  const positions = new Float32Array(vertexCount * 3);
  const centers = new Float32Array(vertexCount * 3);
  const bands = new Float32Array(vertexCount);
  const orders = new Float32Array(vertexCount);
  const seeds = new Float32Array(vertexCount);
  let ptr = 0;
  for (const cell of cells) {
    for (const edge of edges) {
      for (const cornerIndex of edge) {
        const q = corners[cornerIndex];
        const p = transformCellPoint(cell, q[0] * cell.width, q[1] * cell.height, q[2] * cell.depth);
        positions[ptr * 3] = p.x; positions[ptr * 3 + 1] = p.y; positions[ptr * 3 + 2] = p.z;
        centers[ptr * 3] = cell.center.x; centers[ptr * 3 + 1] = cell.center.y; centers[ptr * 3 + 2] = cell.center.z;
        bands[ptr] = cell.band; orders[ptr] = cell.order; seeds[ptr] = cell.seed;
        ptr++;
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aCenter', new THREE.BufferAttribute(centers, 3));
  geometry.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
  geometry.setAttribute('aOrder', new THREE.BufferAttribute(orders, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

const archiveWireMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: shaderUniforms(),
  vertexShader: /* glsl */`
    attribute vec3 aCenter;
    attribute float aBand;
    attribute float aOrder;
    attribute float aSeed;
    uniform sampler2D spectrum;
    uniform float time;
    uniform float low;
    uniform float high;
    uniform float ritual;
    uniform float shutdown;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform vec2 pulseOrigin;
    varying float vAlpha;
    varying float vSpec;
    varying float vResonance;
    varying float vBand;

    void main() {
      float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
      float activation = smoothstep(aOrder * 0.56, aOrder * 0.56 + 0.29, ritual);
      float offStart = 0.06 + (1.0 - aOrder) * 0.65;
      float off = smoothstep(offStart, offStart + 0.22, shutdown);
      vec3 radial = normalize(vec3(aCenter.x, 0.22 + fract(aSeed * 0.13) * 0.32, aCenter.z) + vec3(0.0001));
      vec3 p = position + radial * (1.0 - activation) * (2.1 + aOrder * 7.5);
      float waveRadius = pulseAge * (4.15 + low * 1.7);
      float distanceToPulse = length(aCenter.xz - pulseOrigin);
      float front = exp(-abs(distanceToPulse - waveRadius) * 1.46) * pulseStrength;
      float memory = step(distanceToPulse, waveRadius) * exp(-(waveRadius - distanceToPulse) * 0.105) * exp(-pulseAge * 0.055) * pulseStrength;
      vec3 fromCenter = p - aCenter;
      p += normalize(fromCenter + vec3(0.0001)) * (spec * 0.018 + front * 0.095);
      p.y += sin(time * 0.35 + aSeed + aCenter.x * 0.2) * (0.005 + spec * 0.014);
      p = mix(p, vec3(0.0, 0.32, 0.0) + normalize(fromCenter + vec3(0.001)) * 0.28, off * 0.58);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      float cameraDistance = length(cameraPosition - p);
      float farFade = mix(0.035, 1.0, 1.0 - smoothstep(10.0, 31.0, cameraDistance));
      vSpec = spec;
      vResonance = front * 1.45 + memory * 0.28;
      vBand = aBand;
      vAlpha = (0.068 + spec * 0.21 + vResonance * 0.58 + high * 0.028) * activation * (1.0 - off) * farFade;
    }
  `,
  fragmentShader: /* glsl */`
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    uniform vec3 secondaryColor;
    varying float vAlpha;
    varying float vSpec;
    varying float vResonance;
    varying float vBand;
    void main() {
      vec3 color = mix(secondaryColor, glowColor, 0.35 + vBand * 0.48);
      color = mix(color, accentColor, clamp(vResonance * 0.75 + vSpec * 0.18, 0.0, 0.82));
      gl_FragColor = vec4(color * (0.48 + vSpec * 1.25 + vResonance * 1.8), vAlpha);
    }
  `
});
const archiveWires = new THREE.LineSegments(createArchiveWireGeometry(archiveCells), archiveWireMaterial);
world.add(archiveWires);

function createArchivePointCloud(cells) {
  const pointsPerCell = isMobile ? 72 : 156;
  const count = cells.length * pointsPerCell;
  const positions = new Float32Array(count * 3);
  const centers = new Float32Array(count * 3);
  const bands = new Float32Array(count);
  const orders = new Float32Array(count);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  let ptr = 0;
  for (let ci = 0; ci < cells.length; ci++) {
    const cell = cells[ci];
    for (let j = 0; j < pointsPerCell; j++) {
      const u = fract((j + 1) * 0.754877666 + cell.seed * 0.013);
      const v = fract((j + 1) * 0.569840296 + cell.seed * 0.021);
      const w = fract((j + 1) * 0.438579021 + cell.seed * 0.034);
      const localX = (u - 0.5) * cell.width * 0.82;
      const localY = (v - 0.5) * cell.height * 0.88;
      const localZ = (w - 0.5) * cell.depth * 0.78;
      const p = transformCellPoint(cell, localX, localY, localZ);
      positions[ptr * 3] = p.x; positions[ptr * 3 + 1] = p.y; positions[ptr * 3 + 2] = p.z;
      centers[ptr * 3] = cell.center.x; centers[ptr * 3 + 1] = cell.center.y; centers[ptr * 3 + 2] = cell.center.z;
      bands[ptr] = clamp(cell.band + (u - 0.5) * 0.035, 0, 1);
      orders[ptr] = cell.order;
      seeds[ptr] = fract(cell.seed * 0.17 + j * 0.6180339);
      sizes[ptr] = rand(0.72, 2.25);
      ptr++;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aCenter', new THREE.BufferAttribute(centers, 3));
  geometry.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
  geometry.setAttribute('aOrder', new THREE.BufferAttribute(orders, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute vec3 aCenter;
      attribute float aBand;
      attribute float aOrder;
      attribute float aSeed;
      attribute float aSize;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float low;
      uniform float high;
      uniform float transient;
      uniform float ritual;
      uniform float shutdown;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      varying float vResonance;
      varying float vBand;
      varying float vSeed;

      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float activation = smoothstep(aOrder * 0.55, aOrder * 0.55 + 0.31, ritual);
        float offStart = 0.055 + (1.0 - aOrder) * 0.66;
        float off = smoothstep(offStart, offStart + 0.22, shutdown);
        vec3 rel = position - aCenter;
        vec3 radial = normalize(vec3(aCenter.x, 0.18 + aSeed * 0.4, aCenter.z) + vec3(0.001));
        vec3 scattered = position + radial * (2.8 + aOrder * 9.2) + vec3(sin(aSeed * 43.0), cos(aSeed * 37.0), sin(aSeed * 29.0)) * 0.75;
        vec3 p = mix(scattered, position, activation);
        float waveRadius = pulseAge * (4.15 + low * 1.7);
        float distanceToPulse = length(aCenter.xz - pulseOrigin);
        float front = exp(-abs(distanceToPulse - waveRadius) * 1.42) * pulseStrength;
        float memory = step(distanceToPulse, waveRadius) * exp(-(waveRadius - distanceToPulse) * 0.095) * exp(-pulseAge * 0.052) * pulseStrength;
        vec3 relDir = normalize(rel + vec3(0.0001));
        p += relDir * (spec * (0.035 + high * 0.035) + front * 0.22);
        p.y += sin(time * (0.42 + aBand * 0.54) + aSeed * 31.0) * (0.012 + spec * 0.045);
        p = mix(p, vec3(0.0, 0.34, 0.0) + relDir * (0.12 + aSeed * 0.28), off * 0.84);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float perspective = clamp(8.0 / max(1.0, -mv.z), 0.28, 3.3);
        gl_PointSize = aSize * pixelRatio * perspective * (0.72 + spec * 2.15 + front * 2.7 + transient * 0.22);
        float cameraDistance = length(cameraPosition - p);
        float farFade = mix(0.018, 1.0, 1.0 - smoothstep(10.0, 32.0, cameraDistance));
        vSpec = spec;
        vResonance = front * 1.55 + memory * 0.38;
        vBand = aBand;
        vSeed = aSeed;
        vAlpha = (0.20 + spec * 0.62 + vResonance * 0.78) * activation * (1.0 - off) * farFade;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      uniform vec3 secondaryColor;
      varying float vAlpha;
      varying float vSpec;
      varying float vResonance;
      varying float vBand;
      varying float vSeed;
      void main() {
        vec2 q = abs(gl_PointCoord - 0.5);
        float square = 1.0 - smoothstep(0.34, 0.5, max(q.x, q.y));
        float core = 1.0 - smoothstep(0.0, 0.16, length(gl_PointCoord - 0.5));
        if (square <= 0.001) discard;
        vec3 color = mix(secondaryColor, glowColor, 0.28 + vBand * 0.62);
        color = mix(color, accentColor, clamp(vSpec * 0.28 + vResonance * 0.8, 0.0, 0.9));
        float twinkle = 0.82 + 0.18 * sin(vSeed * 91.0);
        float alpha = square * (0.56 + core * 0.44) * vAlpha * twinkle;
        gl_FragColor = vec4(color * (0.7 + core * 0.9 + vSpec * 1.2 + vResonance * 1.8), alpha);
      }
    `
  });
  return new THREE.Points(geometry, material);
}
const archivePoints = createArchivePointCloud(archiveCells);
world.add(archivePoints);

// ---------- Kinetic resonator array: nine suspended light instruments ----------
const resonatorGroup = new THREE.Group();
world.add(resonatorGroup);
const resonators = [];
const suspensionPositions = [];
const beamGeometry = new THREE.CylinderGeometry(0.035, 1.18, 6.05, isMobile ? 20 : 40, 1, true);

function createBeamMaterial(band, order, center, seed) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms({
      band: { value: band },
      order: { value: order },
      centerXZ: { value: new THREE.Vector2(center.x, center.z) },
      seed: { value: seed }
    }),
    vertexShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D spectrum;
      uniform float time;
      uniform float high;
      uniform float ritual;
      uniform float shutdown;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float band;
      uniform float order;
      uniform float seed;
      uniform vec2 centerXZ;
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      varying vec2 vUv;
      varying vec3 vWorld;
      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      void main() {
        float spec = texture2D(spectrum, vec2(band, 0.5)).r;
        float activation = smoothstep(order * 0.42, order * 0.42 + 0.32, ritual);
        float offStart = 0.18 + (1.0 - order) * 0.46;
        float survive = 1.0 - smoothstep(offStart, offStart + 0.19, shutdown);
        float edge = pow(max(0.0, sin(vUv.x * 3.1415926)), 2.5);
        float lengthFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.43, vUv.y);
        float waveRadius = pulseAge * 4.65;
        float d = length(centerXZ - pulseOrigin);
        float resonance = exp(-abs(d - waveRadius) * 1.48) * pulseStrength;
        float filament = pow(abs(sin(vUv.y * 54.0 + time * (0.16 + band * 0.26) + seed)), 16.0);
        float grain = hash21(gl_FragCoord.xy + seed * 71.0);
        float alpha = edge * lengthFade * (0.008 + spec * 0.042 + resonance * 0.095 + high * 0.008);
        alpha *= activation * survive * mix(0.58, 1.0, grain);
        vec3 color = mix(glowColor, accentColor, spec * 0.46 + resonance * 0.7 + filament * 0.18);
        gl_FragColor = vec4(color * (0.34 + spec * 1.6 + resonance * 2.2), alpha);
      }
    `
  });
}

for (let i = 0; i < 9; i++) {
  const angle = i / 9 * Math.PI * 2 + 0.12;
  const radius = 4.55 + (i % 3) * 0.18;
  const position = new THREE.Vector3(Math.cos(angle) * radius, 3.72 + Math.sin(angle * 2) * 0.16, Math.sin(angle) * radius);
  const root = new THREE.Group();
  root.position.copy(position);
  root.rotation.y = -angle + Math.PI / 2;
  root.userData.angle = angle;
  root.userData.seed = rand(0, Math.PI * 2);
  root.userData.band = (i + 0.5) / 9;
  root.userData.order = i / 8;

  const beam = new THREE.Mesh(beamGeometry, createBeamMaterial(root.userData.band, root.userData.order, position, root.userData.seed));
  beam.position.y = -3.025;
  root.add(beam);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x78dfcf, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 5, 96), ringMaterial);
  ring.rotation.x = Math.PI / 2;
  root.add(ring);

  const crossRing = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.006, 4, 72), ringMaterial.clone());
  crossRing.rotation.y = Math.PI / 2;
  root.add(crossRing);

  const aperture = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: 0x7de5d5, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  aperture.scale.set(0.75, 0.75, 1);
  root.add(aperture);

  suspensionPositions.push(position.x, 9.8, position.z, position.x, 3.78, position.z);
  resonatorGroup.add(root);
  resonators.push({ root, beam, ring, crossRing, aperture, index: i });
}
const suspensionGeometry = new THREE.BufferGeometry();
suspensionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(suspensionPositions, 3));
const suspensionMaterial = new THREE.LineBasicMaterial({ color: 0x6bcbbb, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
const suspensions = new THREE.LineSegments(suspensionGeometry, suspensionMaterial);
world.add(suspensions);

// ---------- Three-dimensional sonar shell ----------
const sonarShellMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
  uniforms: shaderUniforms(),
  vertexShader: /* glsl */`
    varying vec3 vNormalW;
    varying vec3 vWorld;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform float high;
    uniform float shutdown;
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorld);
      float fresnel = pow(1.0 - abs(dot(normalize(vNormalW), viewDir)), 4.8);
      float decay = smoothstep(5.4, 0.0, pulseAge) * pulseStrength;
      float alpha = fresnel * decay * (0.08 + high * 0.06) * (1.0 - shutdown * 0.7);
      vec3 color = mix(glowColor, accentColor, fresnel * 0.55);
      gl_FragColor = vec4(color * (0.65 + decay * 1.8), alpha);
    }
  `
});
const sonarShell = new THREE.Mesh(new THREE.SphereGeometry(1, isMobile ? 36 : 64, isMobile ? 20 : 36), sonarShellMaterial);
sonarShell.visible = false;
world.add(sonarShell);

// ---------- Nine sonar dialects ----------
const sonarArtifacts = new THREE.Group();
world.add(sonarArtifacts);

const sonarCurtainMaterial = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
  uniforms: shaderUniforms(),
  vertexShader: /* glsl */`
    varying vec3 vLocal;
    varying vec3 vWorld;
    varying vec3 vNormalW;
    void main() {
      vLocal = position;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform float high;
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    varying vec3 vLocal;
    varying vec3 vWorld;
    varying vec3 vNormalW;
    void main() {
      float stripe = pow(abs(sin(vLocal.y * 20.0 - time * 1.8)), 22.0);
      float fresnel = pow(1.0 - abs(dot(normalize(vNormalW), normalize(cameraPosition - vWorld))), 3.2);
      float decay = smoothstep(4.5, 0.0, pulseAge) * pulseStrength;
      float alpha = (fresnel * 0.14 + stripe * (0.035 + high * 0.08)) * decay;
      gl_FragColor = vec4(mix(glowColor, accentColor, stripe) * (0.45 + stripe * 1.8), alpha);
    }
  `
});
const sonarCurtain = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, isMobile ? 48 : 96, 20, true), sonarCurtainMaterial);
sonarCurtain.visible = false;
sonarArtifacts.add(sonarCurtain);

const sonarSpokeCount = isMobile ? 48 : 96;
const sonarSpokePositions = new Float32Array(sonarSpokeCount * 2 * 3);
const sonarSpokeGeometry = new THREE.BufferGeometry();
sonarSpokeGeometry.setAttribute('position', new THREE.BufferAttribute(sonarSpokePositions, 3).setUsage(THREE.DynamicDrawUsage));
const sonarSpokeMaterial = new THREE.LineBasicMaterial({ color: 0x8debdc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
const sonarSpokes = new THREE.LineSegments(sonarSpokeGeometry, sonarSpokeMaterial);
sonarSpokes.visible = false;
sonarArtifacts.add(sonarSpokes);

const sonarPillarCount = isMobile ? 28 : 48;
const sonarPillars = new THREE.InstancedMesh(
  new THREE.BoxGeometry(0.055, 1, 0.055),
  new THREE.MeshBasicMaterial({ color: 0x79ddcf, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
  sonarPillarCount
);
sonarPillars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
sonarPillars.visible = false;
sonarArtifacts.add(sonarPillars);
const sonarDummy = new THREE.Object3D();

function createSonarLattice() {
  const side = isMobile ? 9 : 13;
  const count = side * side * side;
  const positions = new Float32Array(count * 3);
  const bands = new Float32Array(count);
  const seeds = new Float32Array(count);
  let ptr = 0;
  for (let z = 0; z < side; z++) for (let y = 0; y < side; y++) for (let x = 0; x < side; x++) {
    positions[ptr * 3] = (x / (side - 1) - 0.5) * 2;
    positions[ptr * 3 + 1] = (y / (side - 1) - 0.5) * 2;
    positions[ptr * 3 + 2] = (z / (side - 1) - 0.5) * 2;
    bands[ptr] = fract((x + y * 1.7 + z * 2.3) / side);
    seeds[ptr] = ptr * 0.731;
    ptr++;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute float aBand;
      attribute float aSeed;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float life = smoothstep(4.8, 0.0, pulseAge) * pulseStrength;
        vec3 p = position;
        float shell = abs(length(p) - mod(pulseAge * 0.52, 1.8));
        p *= 1.6 + pulseAge * 0.72;
        p += normalize(position + 0.001) * sin(aSeed + time * 1.4) * spec * 0.16;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = pixelRatio * clamp(7.0 / max(1.0, -mv.z), 0.4, 2.8) * (1.0 + spec * 2.3);
        vAlpha = exp(-shell * 3.2) * life * (0.2 + spec * 0.8);
        vSpec = spec;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec2 q = abs(gl_PointCoord - 0.5);
        float box = 1.0 - smoothstep(0.28, 0.5, max(q.x,q.y));
        if (box < 0.01) discard;
        gl_FragColor = vec4(mix(glowColor, accentColor, vSpec) * (0.65 + vSpec), box * vAlpha);
      }
    `
  });
  return new THREE.Points(geometry, material);
}
const sonarLattice = createSonarLattice();
sonarLattice.visible = false;
sonarArtifacts.add(sonarLattice);

const helixSegments = isMobile ? 120 : 240;
const helixPositions = new Float32Array(helixSegments * 2 * 3);
const helixGeometry = new THREE.BufferGeometry();
helixGeometry.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3).setUsage(THREE.DynamicDrawUsage));
const helixMaterial = new THREE.LineBasicMaterial({ color: 0x86e4d5, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
const sonarHelix = new THREE.LineSegments(helixGeometry, helixMaterial);
sonarHelix.visible = false;
sonarArtifacts.add(sonarHelix);

const sonarSlabs = new THREE.Group();
for (let i = 0; i < 9; i++) {
  const slab = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.9, 1.15, 0.08)),
    new THREE.LineBasicMaterial({ color: i === 8 ? 0xe1f2d4 : 0x72d9cb, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  slab.userData.index = i;
  sonarSlabs.add(slab);
}
sonarSlabs.visible = false;
sonarArtifacts.add(sonarSlabs);

const convergenceMaterial = sonarShellMaterial.clone();
convergenceMaterial.uniforms = shaderUniforms();
const sonarConvergence = new THREE.Mesh(new THREE.SphereGeometry(1, isMobile ? 36 : 64, isMobile ? 20 : 36), convergenceMaterial);
sonarConvergence.visible = false;
sonarArtifacts.add(sonarConvergence);

const sonarNull = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.025, 6, isMobile ? 96 : 192),
  new THREE.MeshBasicMaterial({ color: 0xc6f0df, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
);
sonarNull.visible = false;
sonarArtifacts.add(sonarNull);

// ---------- Central forecasting apparatus ----------
const coreGroup = new THREE.Group();
coreGroup.position.y = 0.34;
world.add(coreGroup);

const coreMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: shaderUniforms(),
  vertexShader: /* glsl */`
    uniform float time;
    uniform float low;
    uniform float mid;
    uniform float transient;
    uniform float open;
    uniform float ignite;
    uniform float shutdown;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    varying float vNoise;
    float waveNoise(vec3 p) {
      float n = sin(p.x * 3.1 + time * 0.7);
      n += sin(p.y * 4.7 - time * 0.43) * 0.55;
      n += sin(p.z * 6.3 + time * 0.31) * 0.32;
      n += sin((p.x + p.y + p.z) * 8.0 - time * 0.23) * 0.18;
      return n / 2.05;
    }
    void main() {
      float n = waveNoise(position);
      float breathing = (0.025 + low * 0.17 + transient * 0.1 + open * 0.07) * ignite;
      vec3 p = position + normal * (n * 0.065 + breathing * (0.58 + n * 0.3));
      p *= 1.0 - smoothstep(0.70, 0.98, shutdown) * 0.72;
      vec4 wp = modelMatrix * vec4(p, 1.0);
      vWorld = wp.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);
      vNoise = n;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float time;
    uniform float mid;
    uniform float high;
    uniform float open;
    uniform float ignite;
    uniform float shutdown;
    uniform float section;
    uniform vec3 fogColor;
    uniform vec3 glowColor;
    uniform vec3 accentColor;
    varying vec3 vNormalW;
    varying vec3 vWorld;
    varying float vNoise;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorld);
      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), viewDir), 0.0), 2.65);
      float latitude = sin(vWorld.y * 14.0 + vWorld.x * 4.2 - time * 0.72 + vNoise * 4.0);
      float veins = pow(max(0.0, latitude), 20.0);
      float lattice = pow(abs(sin((vWorld.x + vWorld.z) * 13.0 + time * 0.24)), 34.0);
      vec3 color = mix(fogColor * 0.34, glowColor, fresnel * 0.76 + veins * 0.34);
      color = mix(color, accentColor, lattice * (0.12 + high * 0.7) + open * fresnel * 0.24);
      float mode = floor(section + 0.5);
      float bodyPresence = 0.82;
      if (mode > 0.5) bodyPresence = 0.60;
      if (mode > 1.5) bodyPresence = 0.49;
      if (mode > 2.5) bodyPresence = 0.38;
      if (mode > 4.5) bodyPresence = 0.29;
      if (mode > 5.5) bodyPresence = 0.17;
      if (mode > 6.5) bodyPresence = 0.10;
      if (mode > 7.5) bodyPresence = 0.065;
      float power = (0.18 + fresnel * 2.4 + veins * (0.28 + mid * 0.9) + lattice * high * 1.5) * ignite * bodyPresence;
      float alpha = ignite * bodyPresence * (1.0 - smoothstep(0.82, 1.0, shutdown));
      gl_FragColor = vec4(color * power, alpha);
    }
  `
});
const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, isMobile ? 4 : 5), coreMaterial);
core.userData.interactive = 'core';
coreGroup.add(core);

const coreWire = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.28, 2),
  new THREE.MeshBasicMaterial({ color: 0x94eadc, wireframe: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
);
coreGroup.add(coreWire);

const coreHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: 0x74e4d4, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
coreHalo.scale.set(5, 5, 1);
coreGroup.add(coreHalo);

const coreRings = [];
for (let i = 0; i < 9; i++) {
  const radius = 1.43 + i * 0.235;
  const material = new THREE.MeshBasicMaterial({
    color: i === 8 ? 0xe5efd1 : 0x72d9c9,
    transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, i % 3 === 0 ? 0.017 : 0.007, 5, isMobile ? 96 : 192), material);
  ring.rotation.set(rand(-1.1, 1.1), rand(-Math.PI, Math.PI), rand(-1.1, 1.1));
  ring.userData.speed = rand(0.032, 0.105) * (i % 2 ? -1 : 1);
  ring.userData.index = i;
  coreRings.push(ring);
  coreGroup.add(ring);
}

const apertureFins = [];
const finGeometry = new THREE.BoxGeometry(0.036, 1.55, 0.28);
for (let i = 0; i < 9; i++) {
  const material = new THREE.MeshStandardMaterial({
    color: 0x061417, metalness: 0.92, roughness: 0.18,
    emissive: 0x0a3432, emissiveIntensity: 0, transparent: true, opacity: 0
  });
  const fin = new THREE.Mesh(finGeometry, material);
  const a = i / 9 * Math.PI * 2;
  fin.userData.angle = a;
  fin.position.set(Math.cos(a) * 1.02, Math.sin(a * 2) * 0.09, Math.sin(a) * 1.02);
  fin.rotation.set(Math.sin(a) * 0.28, -a, Math.cos(a) * 0.22);
  apertureFins.push(fin);
  coreGroup.add(fin);
}

function createForecastDust(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const sizes = new Float32Array(count);
  const bands = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const layer = i % 9;
    const a = rand(0, Math.PI * 2);
    const r = 1.8 + layer * 0.22 + rand(-0.1, 0.38);
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = rand(-2.2, 2.2) + Math.sin(a * (2 + layer % 3)) * 0.22;
    positions[i * 3 + 2] = Math.sin(a) * r;
    phases[i] = rand(0, Math.PI * 2);
    sizes[i] = rand(0.8, 2.8);
    bands[i] = fract(layer / 9 + rand(-0.03, 0.03));
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute float aPhase;
      attribute float aSize;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float low;
      uniform float mid;
      uniform float high;
      uniform float transient;
      uniform float open;
      uniform float ignite;
      uniform float shutdown;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      varying float vBand;
      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        vec3 p = position;
        float a = time * (0.018 + aBand * 0.032) + aPhase * 0.05 + mid * 0.18;
        mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
        p.xz = rot * p.xz;
        p.y += sin(time * 0.22 + aPhase + length(p.xz) * 1.7) * (0.05 + high * 0.12);
        p.xz *= ignite * (1.0 + open * (0.09 + aBand * 0.08) + low * 0.012);
        p *= 1.0 - smoothstep(0.64, 0.98, shutdown) * 0.75;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * pixelRatio * clamp(8.0 / max(1.0, -mv.z), 0.35, 3.2) * (0.6 + spec * 1.7 + high * 0.7 + transient * 0.3);
        vAlpha = (0.18 + spec * 0.56 + high * 0.18) * ignite * (1.0 - shutdown);
        vSpec = spec;
        vBand = aBand;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      varying float vAlpha;
      varying float vSpec;
      varying float vBand;
      void main() {
        vec2 q = abs(gl_PointCoord - 0.5);
        float box = 1.0 - smoothstep(0.34, 0.5, max(q.x, q.y));
        if (box < 0.01) discard;
        vec3 color = mix(glowColor, accentColor, vBand * 0.62 + vSpec * 0.2);
        gl_FragColor = vec4(color * (0.72 + vSpec * 1.45), box * vAlpha);
      }
    `
  });
  return new THREE.Points(geometry, material);
}
const forecastDust = createForecastDust(isMobile ? 1200 : 2600);
coreGroup.add(forecastDust);

// The energy body is one data set interpreted nine different ways.  A section
// change does not swap models; it makes the same matter forget one geometry and
// remember another.
function createEnergyBody(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const bands = new Float32Array(count);
  const layers = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const z = rand(-1, 1);
    const a = rand(0, Math.PI * 2);
    const rr = Math.sqrt(Math.max(0, 1 - z * z));
    const radius = Math.pow(rand(0.02, 1), 0.42);
    positions[i * 3] = Math.cos(a) * rr * radius;
    positions[i * 3 + 1] = z * radius;
    positions[i * 3 + 2] = Math.sin(a) * rr * radius;
    seeds[i] = rand(0, 1000);
    bands[i] = fract(i * 0.61803398875 + rand(-0.02, 0.02));
    layers[i] = rand(0, 1);
    sizes[i] = rand(0.65, 2.45);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
  geometry.setAttribute('aLayer', new THREE.BufferAttribute(layers, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute float aSeed;
      attribute float aBand;
      attribute float aLayer;
      attribute float aSize;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float low;
      uniform float mid;
      uniform float high;
      uniform float transient;
      uniform float open;
      uniform float ignite;
      uniform float shutdown;
      uniform float section;
      uniform float sectionLocal;
      uniform float phaseTransition;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      varying float vMode;
      varying float vSeed;
      const float PI = 3.14159265359;
      mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c,-s,s,c); }
      float hash11(float p) { return fract(sin(p * 127.1) * 43758.5453); }
      void main() {
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        vec3 p = position;
        float radius = max(0.001, length(p));
        vec3 n = p / radius;
        float mode = floor(section + 0.5);
        float life = 0.72 + 0.28 * sin(time * (0.37 + aBand * 0.19) + aSeed);

        if (mode < 0.5) {
          // I — pressure breathing: a dark-water lung, almost spherical.
          float pressure = sin(time * 0.74 + radius * 8.0 + aSeed * 0.02);
          p = n * (0.30 + radius * 1.08 + pressure * (0.045 + low * 0.18));
        } else if (mode < 1.5) {
          // II — salt stars: nine radial filaments, sharpened by upper bands.
          float az = atan(n.z, n.x);
          float star = pow(abs(cos(az * 4.5 + n.y * 1.7 + time * 0.06)), 13.0);
          float spoke = 0.28 + radius * (0.68 + star * (1.05 + spec * 1.18));
          p = n * spoke;
          p.y += sin(az * 9.0 + time * 0.22 + aSeed) * high * 0.16;
        } else if (mode < 2.5) {
          // III — blind quartz: directions quantise into unstable facets.
          vec3 q = floor(n * 5.0 + 0.5) / 5.0;
          q = normalize(mix(n, q, 0.72));
          float stepPulse = floor((time * 1.7 + aSeed) * 2.0) * 0.01;
          p = q * (0.24 + radius * (1.23 + spec * 0.28) + stepPulse);
        } else if (mode < 3.5) {
          // IV — the gate: matter becomes a vertical pressure column.
          float az = atan(p.z, p.x);
          float cr = length(p.xz);
          float slit = 0.25 + 0.10 * sin(p.y * 9.0 - time * 0.45 + aSeed);
          p = vec3(cos(az) * cr * slit, p.y * (2.75 + low * 0.62), sin(az) * cr * slit);
          p.y += (spec - 0.3) * 0.32;
        } else if (mode < 4.5) {
          // V — the unarrived city: a nine-lobed forecast bloom.
          float az = atan(n.z, n.x);
          float petal = pow(abs(sin(az * 4.5 + n.y * 2.6 - time * 0.08)), 4.0);
          p = n * (0.22 + radius * (0.64 + petal * (1.22 + mid * 0.58) + spec * 0.30));
          p.y *= 0.84 + petal * 0.46;
        } else if (mode < 5.5) {
          // VI — counter-current: a helix rotating against its own wake.
          float twist = p.y * (3.8 + mid * 1.8) + time * (aLayer > 0.5 ? 0.23 : -0.19);
          p.xz = rot(twist) * p.xz;
          p.xz *= 0.72 + abs(p.y) * 0.46 + spec * 0.18;
          p.y *= 1.62;
        } else if (mode < 6.5) {
          // VII — codex: data is compressed into a page no eye can read.
          p.x = sign(p.x) * pow(abs(p.x), 0.72) * 1.72;
          p.y *= 1.52;
          p.z *= 0.065 + high * 0.075;
          p.z += sin((p.y + aBand) * 22.0 - time * 1.15) * (0.015 + spec * 0.08);
        } else if (mode < 7.5) {
          // VIII — the abyss looks back: an oblate iris and a hollow pupil.
          float d = length(p.xy);
          p.xy *= vec2(1.92, 0.68);
          p.z *= 0.16 + d * 0.10;
          p.z += sin(d * 15.0 - time * 0.92 + aSeed) * (0.025 + transient * 0.12);
          p *= 0.88 + smoothstep(0.24, 0.92, d) * 0.26;
        } else {
          // IX — shoreless: the field contracts into a cold archival pearl.
          float finalPull = 0.36 - sectionLocal * 0.10;
          p = n * (finalPull * (0.32 + radius * 0.78) + spec * 0.045);
          p += n * sin(time * 0.45 + aSeed) * 0.012;
        }

        p *= 1.0 + open * (0.08 + aLayer * 0.16);
        // At a chapter cut, geometry turns into a transient spherical notation.
        float transition = phaseTransition;
        vec3 transitionShell = n * (1.35 + aLayer * 1.7 + spec * 0.32);
        p = mix(p, transitionShell, transition * (0.58 + aLayer * 0.32));
        p += n * sin(aSeed * 1.91 + time * 7.0) * transition * 0.12;
        p *= ignite * (1.0 - smoothstep(0.66, 0.99, shutdown) * 0.94);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float perspective = clamp(9.0 / max(1.0, -mv.z), 0.36, 3.4);
        gl_PointSize = aSize * pixelRatio * perspective * 1.26 * (0.62 + spec * 1.72 + high * 0.58 + transition * 1.25);
        vAlpha = (0.15 + spec * 0.62 + life * 0.14 + transient * 0.20) * ignite * (1.0 - shutdown) * (0.88 + transition * 0.50);
        vSpec = spec;
        vMode = mode;
        vSeed = aSeed;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      uniform vec3 accentColor;
      uniform vec3 secondaryColor;
      uniform float phaseTransition;
      varying float vAlpha;
      varying float vSpec;
      varying float vMode;
      varying float vSeed;
      void main() {
        vec2 q = gl_PointCoord - 0.5;
        float r = length(q);
        if (r > 0.5) discard;
        float core = smoothstep(0.48, 0.0, r);
        float ring = smoothstep(0.09, 0.0, abs(r - 0.26));
        float grain = 0.82 + 0.18 * sin(vSeed * 17.0);
        vec3 color = mix(glowColor, accentColor, clamp(vSpec * 0.74 + vMode * 0.035, 0.0, 1.0));
        color = mix(color, secondaryColor, ring * 0.18);
        float alpha = (core * 0.78 + ring * (0.18 + phaseTransition * 0.28)) * vAlpha * grain;
        gl_FragColor = vec4(color * (0.68 + vSpec * 1.75 + core * 0.35), alpha);
      }
    `
  });
  return new THREE.Points(geometry, material);
}
const energyBody = createEnergyBody(isMobile ? 4200 : 10500);
energyBody.renderOrder = 4;
coreGroup.add(energyBody);

// 64 spectral needles make the audio analysis legible as part of the apparatus.
const combPositions = new Float32Array(spectrumSize * 2 * 3);
const combGeometry = new THREE.BufferGeometry();
combGeometry.setAttribute('position', new THREE.BufferAttribute(combPositions, 3).setUsage(THREE.DynamicDrawUsage));
const combMaterial = new THREE.LineBasicMaterial({ color: 0x9de9db, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
const spectralComb = new THREE.LineSegments(combGeometry, combMaterial);
coreGroup.add(spectralComb);

// ---------- Ambient matter ----------
function createMist(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const radius = rand(4.0, 30.0);
    const a = rand(0, Math.PI * 2);
    positions[i * 3] = Math.cos(a) * radius;
    positions[i * 3 + 1] = rand(-5.0, 12.0);
    positions[i * 3 + 2] = Math.sin(a) * radius;
    phases[i] = rand(0, Math.PI * 2);
    speeds[i] = rand(0.025, 0.14);
    sizes[i] = rand(0.45, 2.4);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aSize;
      uniform float time;
      uniform float high;
      uniform float ritual;
      uniform float shutdown;
      uniform float pixelRatio;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += mod(time * aSpeed + aPhase * 2.0, 17.0) - 8.5;
        p.x += sin(time * aSpeed * 1.7 + aPhase) * 0.36;
        p.z += cos(time * aSpeed * 1.3 + aPhase) * 0.28;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * pixelRatio * clamp(7.0 / max(1.0, -mv.z), 0.2, 2.0) * (0.7 + high * 0.42);
        float dist = length(cameraPosition - p);
        float farFade = 1.0 - smoothstep(10.0, 38.0, dist);
        vAlpha = (0.08 + high * 0.1) * smoothstep(0.12, 0.8, ritual) * (1.0 - shutdown) * mix(0.2, 1.0, farFade);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(glowColor * 0.55, smoothstep(0.5, 0.0, d) * vAlpha);
      }
    `
  });
  return new THREE.Points(geometry, material);
}
const mist = createMist(isMobile ? 1200 : 3300);
world.add(mist);

// ---------- Bathypelagic depth layers ----------
// Large, soft particles close to the camera create optical backscatter.  They
// move slowly enough to feel suspended, not like a star field.
function createNearSnow(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const bands = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const radius = rand(3.5, 18.0);
    const a = rand(0, Math.PI * 2);
    positions[i * 3] = Math.cos(a) * radius;
    positions[i * 3 + 1] = rand(-7.0, 11.0);
    positions[i * 3 + 2] = Math.sin(a) * radius;
    seeds[i] = rand(0, 1000);
    sizes[i] = rand(1.6, 8.5);
    bands[i] = rand(0, 1);
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aBand', new THREE.BufferAttribute(bands, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute float aSeed;
      attribute float aSize;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float high;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float ritual;
      uniform float shutdown;
      uniform float pixelRatio;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec3 p = position;
        p.y += mod(time * (0.018 + fract(aSeed) * 0.035) + aSeed, 18.0) - 9.0;
        p.x += sin(time * 0.047 + aSeed) * 0.55;
        p.z += cos(time * 0.039 + aSeed * 1.7) * 0.42;
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float waveRadius = pulseAge * 4.8;
        float waveDistance = abs(length(p.xz - pulseOrigin) - waveRadius);
        float scatter = exp(-waveDistance * 0.68) * pulseStrength * smoothstep(5.2, 0.0, pulseAge);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float depth = max(0.8, -mv.z);
        gl_PointSize = aSize * pixelRatio * clamp(12.0 / depth, 0.22, 3.8) * (0.65 + high * 0.55 + scatter * 1.5);
        float focus = smoothstep(23.0, 3.0, depth) * smoothstep(0.3, 2.4, depth);
        vAlpha = (0.018 + spec * 0.035 + scatter * 0.15) * focus * ritual * (1.0 - shutdown);
        vSpec = spec + scatter;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      uniform vec3 fogColor;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float halo = exp(-d * d * 14.0);
        vec3 color = mix(fogColor, glowColor, 0.28 + vSpec * 0.32);
        gl_FragColor = vec4(color * (0.42 + halo * 0.55), halo * vAlpha);
      }
    `
  });
  return new THREE.Points(geometry, material);
}
const nearSnow = createNearSnow(isMobile ? 260 : 720);
nearSnow.renderOrder = 8;
world.add(nearSnow);

// Distant archive spines never resolve into walls.  A sonar wave can reveal a
// few edges, after which the architecture dissolves back into water.
function createAbyssalSpines(count) {
  const positions = [];
  const centers = [];
  const seeds = [];
  const bands = [];
  for (let i = 0; i < count; i++) {
    const a = i / count * Math.PI * 2 + rand(-0.12, 0.12);
    const radius = rand(21.0, 37.0);
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    const base = rand(-6.0, -3.0);
    const top = rand(7.0, 18.0);
    const lean = rand(-1.3, 1.3);
    const add = (ax, ay, az, bx, by, bz) => {
      positions.push(ax,ay,az,bx,by,bz);
      for (let k = 0; k < 2; k++) { centers.push(x, (base+top)*0.5, z); seeds.push(i * 1.713); bands.push(fract(i * 0.381966)); }
    };
    add(x, base, z, x + lean, top, z + rand(-0.8,0.8));
    for (let j = 1; j < 5; j++) {
      const yy = lerp(base, top, j / 5);
      const w = rand(0.5, 1.7) * (1.0 - j * 0.08);
      add(x - Math.cos(a) * w, yy, z - Math.sin(a) * w, x + Math.cos(a) * w, yy, z + Math.sin(a) * w);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aCenter', new THREE.Float32BufferAttribute(centers, 3));
  geometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
  geometry.setAttribute('aBand', new THREE.Float32BufferAttribute(bands, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: shaderUniforms(),
    vertexShader: /* glsl */`
      attribute vec3 aCenter;
      attribute float aSeed;
      attribute float aBand;
      uniform sampler2D spectrum;
      uniform float time;
      uniform float pulseAge;
      uniform float pulseStrength;
      uniform vec2 pulseOrigin;
      uniform float section;
      uniform float ritual;
      uniform float shutdown;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec3 p = position;
        p.x += sin(time * 0.012 + aSeed) * 0.17;
        p.z += cos(time * 0.009 + aSeed * 1.3) * 0.14;
        float spec = texture2D(spectrum, vec2(aBand, 0.5)).r;
        float waveRadius = pulseAge * 4.8;
        float resonance = exp(-abs(length(aCenter.xz - pulseOrigin) - waveRadius) * 0.52) * pulseStrength * smoothstep(5.5, 0.0, pulseAge);
        float distanceFade = 1.0 - smoothstep(21.0, 43.0, distance(cameraPosition, aCenter));
        float phaseLift = 0.018 + step(6.5, section) * 0.018;
        vAlpha = (phaseLift + resonance * 0.62 + spec * 0.018) * distanceFade * ritual * (1.0 - shutdown);
        vSpec = spec + resonance;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 glowColor;
      uniform vec3 secondaryColor;
      varying float vAlpha;
      varying float vSpec;
      void main() {
        vec3 color = mix(secondaryColor, glowColor, clamp(vSpec, 0.0, 1.0));
        gl_FragColor = vec4(color * (0.18 + vSpec * 0.9), vAlpha);
      }
    `
  });
  return new THREE.LineSegments(geometry, material);
}
const abyssalSpines = createAbyssalSpines(isMobile ? 22 : 46);
world.add(abyssalSpines);

const pressureStrata = [];
for (let i = 0; i < 7; i++) {
  const material = new THREE.MeshBasicMaterial({
    color: 0x265b64, transparent: true, opacity: 0.012,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(13 + i * 3.2, 0.018 + i * 0.002, 3, isMobile ? 128 : 256), material);
  ring.position.y = -5.2 + i * 2.25;
  ring.rotation.set(Math.PI * 0.5 + rand(-0.16,0.16), rand(-0.35,0.35), rand(-0.12,0.12));
  ring.userData.seed = rand(0, 10);
  pressureStrata.push(ring);
  world.add(ring);
}

// ---------- Lighting ----------
const hemi = new THREE.HemisphereLight(0x63c8bd, 0x000203, 0.15);
scene.add(hemi);
const coreLight = new THREE.PointLight(0x67d8c8, 0, 18, 2.05);
coreLight.position.copy(coreGroup.position);
scene.add(coreLight);
const upperLight = new THREE.PointLight(0x2c6870, 0, 34, 1.5);
upperLight.position.set(0, 9, -5);
scene.add(upperLight);

// ---------- Post-processing: bloom, optical memory, peripheral dissolution ----------
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), isMobile ? 0.72 : 0.94, 0.72, 0.22);
composer.addPass(bloom);
const afterimage = new AfterimagePass(0.865);
composer.addPass(afterimage);

const veilPass = new ShaderPass({
  uniforms: {
    tDiffuse: { value: null },
    time: globals.time,
    resolution: globals.resolution,
    energy: globals.energy,
    high: globals.high,
    ritual: globals.ritual,
    shutdown: globals.shutdown,
    pulseAge: globals.pulseAge,
    pulseStrength: globals.pulseStrength,
    pulseScreen: globals.pulseScreen,
    section: globals.section,
    sectionLocal: globals.sectionLocal,
    phaseTransition: globals.phaseTransition,
    sonarMode: globals.sonarMode,
    deepColor: globals.deepColor,
    fogColor: globals.fogColor,
    glowColor: globals.glowColor
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
    uniform float time;
    uniform vec2 resolution;
    uniform float energy;
    uniform float high;
    uniform float ritual;
    uniform float shutdown;
    uniform float pulseAge;
    uniform float pulseStrength;
    uniform vec2 pulseScreen;
    uniform float section;
    uniform float sectionLocal;
    uniform float phaseTransition;
    uniform float sonarMode;
    uniform vec3 deepColor;
    uniform vec3 fogColor;
    uniform vec3 glowColor;
    varying vec2 vUv;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    void main() {
      vec2 uv = vUv;
      vec2 center = uv - 0.5;
      float radial = length(center * vec2(1.0, resolution.y / max(1.0, resolution.x)));
      float edge = smoothstep(0.20, 0.63, radial);
      float noise = hash21(uv * resolution * 0.37 + floor(time * 8.0));
      vec2 direction = normalize(center + vec2(0.0001));
      vec2 tangent = vec2(-direction.y, direction.x);
      float abyss = smoothstep(2.5, 8.0, section);
      float blurAmount = 0.00028 + edge * (0.0032 + energy * 0.0013 + abyss * 0.0007) + shutdown * 0.0027 + phaseTransition * 0.0018;
      vec2 d = direction * blurAmount;
      vec2 t = tangent * blurAmount * 0.72;
      vec3 source = texture2D(tDiffuse, uv).rgb;
      vec3 blurred = source * 0.28;
      blurred += texture2D(tDiffuse, uv + d).rgb * 0.13;
      blurred += texture2D(tDiffuse, uv - d).rgb * 0.13;
      blurred += texture2D(tDiffuse, uv + d * 2.2).rgb * 0.08;
      blurred += texture2D(tDiffuse, uv - d * 2.2).rgb * 0.08;
      blurred += texture2D(tDiffuse, uv + t).rgb * 0.10;
      blurred += texture2D(tDiffuse, uv - t).rgb * 0.10;
      blurred += texture2D(tDiffuse, uv + t * 2.0).rgb * 0.05;
      blurred += texture2D(tDiffuse, uv - t * 2.0).rgb * 0.05;

      float chroma = (0.00018 + high * 0.00062 + pulseStrength * exp(-pulseAge * 1.8) * 0.0011 + phaseTransition * 0.0014) * (0.22 + edge * 1.5);
      float r = texture2D(tDiffuse, uv + direction * chroma).r;
      float b = texture2D(tDiffuse, uv - direction * chroma).b;
      source.r = mix(source.r, r, 0.62);
      source.b = mix(source.b, b, 0.62);

      float dissolve = edge * (0.36 + energy * 0.21 + abyss * 0.08) + smoothstep(0.48, 0.98, shutdown) * 0.52;
      dissolve *= 0.86 + noise * 0.14;
      float lowerWater = smoothstep(0.72, 0.08, uv.y);
      vec3 field = mix(deepColor, fogColor, 0.40 + radial * 0.76 + lowerWater * 0.18 + sin(time * 0.05) * 0.025);
      vec3 color = mix(source, blurred, clamp(dissolve, 0.0, 0.82));
      color = mix(color, field, clamp(edge * (0.17 + abyss * 0.05) + shutdown * 0.42 + lowerWater * 0.035, 0.0, 0.76));

      // The chapter cut is a pressure front rather than a typographic card.
      float transitionRing = exp(-abs(radial - (0.08 + phaseTransition * 0.55)) * 22.0) * phaseTransition;
      color += glowColor * transitionRing * (0.08 + high * 0.08);
      color = mix(color, field, phaseTransition * edge * 0.16);

      // Ninth-dialect sonar removes light from the image before returning a rim.
      vec2 pulseDelta = (uv - pulseScreen) * vec2(1.0, resolution.y / max(1.0, resolution.x));
      float pulseDistance = length(pulseDelta);
      float nullRadius = mix(0.58, 0.015, smoothstep(0.0, 4.3, pulseAge));
      float nullFront = exp(-abs(pulseDistance - nullRadius) * 48.0) * pulseStrength * step(7.5, sonarMode) * smoothstep(4.3, 0.0, pulseAge);
      float nullInterior = smoothstep(nullRadius, nullRadius * 0.72, pulseDistance) * pulseStrength * step(7.5, sonarMode) * smoothstep(4.3, 0.0, pulseAge);
      color *= 1.0 - nullInterior * 0.74;
      color += glowColor * nullFront * 0.22;

      // Chapter VIII behaves like an eye: peripheral light is admitted, the
      // centre remains unnaturally still.
      float gaze = step(6.5, section) * (1.0 - step(7.5, section));
      color *= 1.0 - gaze * exp(-radial * radial * 42.0) * 0.08;
      color += glowColor * edge * edge * (0.003 + energy * 0.005 + abyss * 0.002);
      float grain = noise - 0.5;
      color += grain * (0.007 + high * 0.007 + abyss * 0.004);
      float vignette = smoothstep(0.80, 0.16, radial);
      color *= mix(0.56 - abyss * 0.05, 1.0, vignette);
      color *= 0.18 + ritual * 0.82;
      gl_FragColor = vec4(color, 1.0);
    }
  `
});
composer.addPass(veilPass);
composer.addPass(new OutputPass());

// ---------- Audio graph ----------
let audioContext = null;
let mediaSource = null;
let analyser = null;
let gainNode = null;
let frequencyData = null;
let timeData = null;
let objectUrl = null;
const onsetDetector = createSpectralFluxOnsetDetector(onsetDetectorConfig);
const onsetMediaTime = createMediaTimeDeltaTracker();

function resetOnsetDetector() {
  onsetDetector.reset();
  onsetMediaTime.reset();
}

function setAudioSource(source) {
  resetOnsetDetector();
  ui.audio.preload = 'auto';
  ui.audio.src = source;
  ui.audio.load();
}

function ensureBundledAudioSource() {
  if (!ui.audio.hasAttribute('src')) setAudioSource('./archive.mp3');
}

async function playAudioElement(element) {
  try {
    await element.play();
  } catch (error) {
    if (!(error instanceof DOMException) || error.name !== 'AbortError') throw error;
  }
}

const bridgeContext = 'shader-demo-room';
const bridgeVersion = 1;
const bridgeCapabilities = Object.freeze(['pause', 'stats', 'set-preview']);
const isEmbedded = window.parent !== window;
let bridgeInstanceId = null;
let animationFrameId = null;
let runtimePaused = document.hidden;
const pauseReasons = {
  documentHidden: document.hidden,
  hostPaused: false
};
const lifecycleAudioElements = new Set();
const lifecycleAudioContexts = new Set();
let lifecycleAudioStartPending = false;
let mediaTransition = Promise.resolve();
let deterministicCaptureActive = false;
let deterministicStepActive = false;
let frameRenderCount = 0;
const deterministicMainSettleSteps = 120;
const frameStats = {
  frameCount: 0,
  sampleStartedAt: performance.now(),
  sampleFrames: 0,
  fps: 0,
  frameTimeMs: 0
};

function isPlainRecord(value) {
  return value !== null
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.getPrototypeOf(value) === Object.prototype;
}

function hasExactKeys(value, keys) {
  if (!isPlainRecord(value)) return false;
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function postBridgeMessage(type, payload) {
  if (!isEmbedded) return;
  window.parent.postMessage({
    context: bridgeContext,
    v: bridgeVersion,
    instanceId: bridgeInstanceId,
    type,
    payload
  }, location.origin);
}

function emitStats(paused) {
  postBridgeMessage('stats', {
    fps: frameStats.fps,
    frameTimeMs: frameStats.frameTimeMs,
    frameCount: frameStats.frameCount,
    paused
  });
}

function resetStatsSample(now = performance.now()) {
  frameStats.sampleStartedAt = now;
  frameStats.sampleFrames = 0;
}

function recordRenderedFrame(now) {
  frameStats.frameCount++;
  frameStats.sampleFrames++;
  const sampleDurationMs = now - frameStats.sampleStartedAt;
  if (sampleDurationMs < 500) return;
  frameStats.fps = frameStats.sampleFrames * 1000 / sampleDurationMs;
  frameStats.frameTimeMs = sampleDurationMs / frameStats.sampleFrames;
  emitStats(false);
  resetStatsSample(now);
}

async function reconcileRuntimeMedia() {
  while (true) {
    const desiredPaused = runtimePaused;
    if (desiredPaused) {
      for (const element of document.querySelectorAll('audio')) {
        if (!element.paused && !element.ended) lifecycleAudioElements.add(element);
      }
      for (const element of lifecycleAudioElements) {
        if (!element.paused && !element.ended) element.pause();
      }
      if (audioContext?.state === 'running') lifecycleAudioContexts.add(audioContext);
      await Promise.all([...lifecycleAudioContexts].map((context) =>
        context.state === 'running' ? context.suspend() : undefined
      ));
    } else {
      await Promise.all([...lifecycleAudioContexts].map((context) =>
        context.state === 'suspended' ? context.resume() : undefined
      ));
      const elementsToResume = new Set(lifecycleAudioElements);
      if (lifecycleAudioStartPending) elementsToResume.add(ui.audio);
      for (const element of elementsToResume) {
        if (element.isConnected && element.paused && !element.ended) {
          await playAudioElement(element);
        }
      }
    }

    if (runtimePaused !== desiredPaused) continue;
    if (!desiredPaused) {
      lifecycleAudioElements.clear();
      lifecycleAudioContexts.clear();
      lifecycleAudioStartPending = false;
    }
    return;
  }
}

function queueRuntimeMediaReconciliation() {
  mediaTransition = mediaTransition
    .then(reconcileRuntimeMedia)
    .catch((error) => {
      console.error('Ninth Tide media pause transition failed.', error);
    });
}

async function rollbackLifecycleMediaIntent({
  elementWasOwned,
  contextWasOwned,
  startWasPending,
}) {
  const context = audioContext;
  mediaTransition = mediaTransition
    .then(async () => {
      if (!elementWasOwned) lifecycleAudioElements.delete(ui.audio);
      if (!contextWasOwned && context) lifecycleAudioContexts.delete(context);
      if (!startWasPending) lifecycleAudioStartPending = false;
      if (runtimePaused && context?.state === 'running') await context.suspend();
    })
    .catch((error) => {
      console.error('Ninth Tide media intent rollback failed.', error);
    });
  await mediaTransition;
}

function requestNextFrame() {
  if (!runtimePaused && !deterministicCaptureActive && !deterministicStepActive && animationFrameId === null) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function reconcileRuntimePause() {
  const nextPaused = pauseReasons.documentHidden || pauseReasons.hostPaused;
  if (nextPaused === runtimePaused) return;
  runtimePaused = nextPaused;

  if (runtimePaused) {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    queueRuntimeMediaReconciliation();
    emitStats(true);
    return;
  }

  timer.reset();
  resetStatsSample();
  queueRuntimeMediaReconciliation();
  emitStats(false);
  requestNextFrame();
}

function handleVisibilityChange() {
  pauseReasons.documentHidden = document.hidden;
  reconcileRuntimePause();
}

function isValidBridgeEnvelope(value) {
  return hasExactKeys(value, ['context', 'v', 'instanceId', 'type', 'payload'])
    && value.context === bridgeContext
    && value.v === bridgeVersion;
}

function handleBridgeMessage(event) {
  if (!isEmbedded || event.origin !== location.origin || event.source !== window.parent) return;
  const message = event.data;
  if (!isValidBridgeEnvelope(message)) throw new Error('Invalid Ninth Tide bridge command envelope.');
  if (message.instanceId !== bridgeInstanceId) return;
  if (typeof message.type !== 'string') throw new Error('Invalid Ninth Tide bridge command type.');

  if (message.type === 'set-paused') {
    if (!hasExactKeys(message.payload, ['paused']) || typeof message.payload.paused !== 'boolean') {
      throw new Error('Invalid Ninth Tide set-paused payload.');
    }
    pauseReasons.hostPaused = message.payload.paused;
    reconcileRuntimePause();
    return;
  }

  if (message.type === 'set-tide-preview') {
    if (!hasExactKeys(message.payload, ['mode', 'section'])) {
      throw new Error('Invalid Ninth Tide set-tide-preview payload.');
    }
    const { mode, section } = message.payload;
    if (!['opening', 'main', 'ending'].includes(mode)
      || !Number.isInteger(section)
      || section < 0
      || section > 8) {
      throw new Error('Invalid Ninth Tide set-tide-preview payload.');
    }
    applyPreview(mode, section);
    return;
  }

  throw new Error(`Unsupported Ninth Tide bridge command: ${message.type}.`);
}

function initializeRuntimeControl() {
  document.addEventListener('visibilitychange', handleVisibilityChange);
  if (!isEmbedded) return;
  if (typeof crypto.randomUUID !== 'function') {
    throw new Error('Embedded Ninth Tide requires crypto.randomUUID().');
  }
  bridgeInstanceId = crypto.randomUUID();
  window.addEventListener('message', handleBridgeMessage);
  postBridgeMessage('ready', { capabilities: [...bridgeCapabilities] });
  if (runtimePaused) emitStats(true);
}

ui.audio.addEventListener('loadedmetadata', () => { ui.timeTotal.textContent = formatTime(ui.audio.duration); });
ui.audio.addEventListener('play', () => {
  if (runtimePaused) {
    lifecycleAudioElements.add(ui.audio);
    lifecycleAudioStartPending = true;
    ui.audio.pause();
    queueRuntimeMediaReconciliation();
    return;
  }
  resetOnsetDetector();
  state.playing = true;
  ui.audioState.textContent = 'PLAYING';
  ui.signal.textContent = 'LIVE FFT';
});
ui.audio.addEventListener('pause', () => {
  resetOnsetDetector();
  state.playing = false;
  if (!state.ended) ui.audioState.textContent = state.audioReady ? 'PAUSED' : 'STANDBY';
});
ui.audio.addEventListener('seeking', resetOnsetDetector);
ui.audio.addEventListener('ended', () => finishEnding());
ui.audio.addEventListener('error', () => {
  state.audioFailed = true;
  ui.fileLabel.hidden = false;
  ui.hint.textContent = '未能读取 archive.mp3。请选择本地音频文件继续。';
  ui.audioState.textContent = 'FILE REQUIRED';
});

async function prepareAudio() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error('Web Audio API unavailable');
    audioContext = new AudioContextClass();
    mediaSource = audioContext.createMediaElementSource(ui.audio);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.82;
    analyser.minDecibels = -94;
    analyser.maxDecibels = -16;
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    mediaSource.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    timeData = new Uint8Array(analyser.fftSize);
  }
  if (runtimePaused) {
    lifecycleAudioContexts.add(audioContext);
    queueRuntimeMediaReconciliation();
  } else if (audioContext.state !== 'running') {
    await audioContext.resume();
  }
  state.audioReady = true;
}

function resetExperienceState() {
  resetOnsetDetector();
  state.calibrated = false;
  state.ceremonyTime = 0;
  state.ceremonyCue = 0;
  state.ritual = 0;
  state.ignite = 0;
  state.lightLevel = 0;
  state.shutdown = 0;
  state.ending = false;
  state.ended = false;
  state.endingCue = 0;
  state.archiveOpen = 0;
  state.archiveOpenTarget = 0;
  state.pulseAge = 99;
  state.pulseStrength = 0;
  state.pulseCooldown = 0;
  state.pulseMode = 0;
  state.pulseSerial = 0;
  state.tideIndex = 0;
  state.transitionFrom = 0;
  state.pendingTide = -1;
  state.phaseLocal = 0;
  state.phaseTransition = 0;
  state.transitionClock = 99;
  state.transitionSwitched = false;
  globals.section.value = 0;
  globals.sectionLocal.value = 0;
  globals.phaseTransition.value = 0;
  globals.sonarMode.value = 0;
  document.documentElement.style.setProperty('--phase-veil', '0');
  state.diveTarget = 0.12;
  state.yawTarget = 0;
  state.pitchTarget = 0.07;
  document.body.classList.add('entered');
  document.body.classList.remove('calibrated', 'ending', 'ended');
  ui.coreState.textContent = 'CALIBRATING';
  ui.fieldState.textContent = 'DARK ADAPTATION';
  ui.mode.textContent = 'CALIBRATION';
  document.documentElement.style.setProperty('--blackout', '1');
  document.documentElement.style.setProperty('--ritual-caption', '0');
}

async function enterExperience(withAudio, restarting = false) {
  if (!state.entered || restarting || state.ended) {
    state.entered = true;
    resetExperienceState();
    if (Number.isFinite(ui.audio.duration)) ui.audio.currentTime = 0;
  }
  if (!withAudio) {
    state.audioReady = false;
    state.playing = false;
    ui.signal.textContent = 'SYNTHETIC';
    ui.audioState.textContent = 'SILENT';
    return;
  }
  const contextWasOwned = audioContext !== null
    && lifecycleAudioContexts.has(audioContext);
  try {
    ui.enter.disabled = true;
    ui.enter.textContent = '正在校准…';
    ensureBundledAudioSource();
    await prepareAudio();
    if (restarting || state.ended || ui.audio.currentTime > 0.2) ui.audio.currentTime = 0;
    if (runtimePaused) {
      const elementWasOwned = lifecycleAudioElements.has(ui.audio);
      const startWasPending = lifecycleAudioStartPending;
      lifecycleAudioElements.add(ui.audio);
      lifecycleAudioStartPending = true;
      queueRuntimeMediaReconciliation();
      try {
        await playAudioElement(ui.audio);
      } catch (error) {
        await rollbackLifecycleMediaIntent({
          elementWasOwned,
          contextWasOwned,
          startWasPending,
        });
        throw error;
      }
    } else {
      await playAudioElement(ui.audio);
    }
    ui.enter.textContent = '启动共鸣仪式';
    ui.enter.disabled = false;
  } catch (error) {
    const playbackBlocked = error instanceof DOMException && error.name === 'NotAllowedError';
    if (!playbackBlocked) console.error(error);
    state.entered = false;
    document.body.classList.remove('entered');
    ui.enter.disabled = false;
    ui.enter.textContent = '重试音频';
    ui.fileLabel.hidden = false;
    ui.hint.textContent = playbackBlocked
      ? '浏览器阻止了音频播放。点击“重试音频”继续；已载入音频不会重复下载。'
      : '未能播放当前音频。请选择本地音频文件，或点击“重试音频”。';
    ui.audioState.textContent = playbackBlocked ? 'PLAYBACK BLOCKED' : 'FILE REQUIRED';
    state.audioFailed = true;
  }
}

ui.enter.addEventListener('click', () => enterExperience(true));
ui.silent.addEventListener('click', () => enterExperience(false));
ui.replay.addEventListener('click', () => enterExperience(true, true));
ui.file.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(file);
  setAudioSource(objectUrl);
  state.audioFailed = false;
  ui.fileLabel.hidden = true;
  ui.hint.textContent = `已载入 ${file.name}`;
  await enterExperience(true, true);
});
window.addEventListener('dragover', (event) => event.preventDefault());
window.addEventListener('drop', async (event) => {
  event.preventDefault();
  const file = [...event.dataTransfer.files].find((f) => f.type.startsWith('audio/'));
  if (!file) return;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(file);
  setAudioSource(objectUrl);
  await enterExperience(true, true);
  showMessage(`AUDIO LOADED / ${file.name.toUpperCase()}`, 2200);
});

function averageBand(minHz, maxHz) {
  if (!analyser || !frequencyData || !audioContext) return 0;
  const nyquist = audioContext.sampleRate / 2;
  const start = clamp(Math.floor(minHz / nyquist * frequencyData.length), 0, frequencyData.length - 1);
  const end = clamp(Math.ceil(maxHz / nyquist * frequencyData.length), start + 1, frequencyData.length);
  let sum = 0;
  for (let i = start; i < end; i++) sum += frequencyData[i];
  return sum / ((end - start) * 255);
}

function updateSpectrumTexture(elapsed) {
  if (analyser && frequencyData && state.playing && audioContext) {
    const nyquist = audioContext.sampleRate / 2;
    for (let i = 0; i < spectrumSize; i++) {
      const t0 = i / spectrumSize;
      const t1 = (i + 1) / spectrumSize;
      const f0 = 28 * Math.pow(17000 / 28, t0);
      const f1 = 28 * Math.pow(17000 / 28, t1);
      const b0 = clamp(Math.floor(f0 / nyquist * frequencyData.length), 0, frequencyData.length - 1);
      const b1 = clamp(Math.ceil(f1 / nyquist * frequencyData.length), b0 + 1, frequencyData.length);
      let sum = 0;
      for (let b = b0; b < b1; b++) sum += frequencyData[b];
      spectrumBytes[i] = Math.round(sum / Math.max(1, b1 - b0));
    }
  } else {
    for (let i = 0; i < spectrumSize; i++) {
      const envelope = Math.exp(-i / 32);
      const v = 22 + 31 * envelope * (0.55 + 0.45 * Math.sin(elapsed * (0.42 + i * 0.006) + i * 0.53));
      spectrumBytes[i] = clamp(Math.round(v), 0, 255);
    }
  }
  spectrumTexture.needsUpdate = true;
}

function resolveOnsetBandStartIndex(spectrum) {
  if (spectrum === frequencyData && audioContext) {
    const nyquist = audioContext.sampleRate / 2;
    return clamp(Math.ceil(onsetBandFloorHz / nyquist * spectrum.length), 0, spectrum.length - 1);
  }
  const logFrequencyRange = Math.log(17000 / 28);
  const normalizedFloor = Math.log(onsetBandFloorHz / 28) / logFrequencyRange;
  return clamp(Math.ceil(normalizedFloor * spectrum.length), 0, spectrum.length - 1);
}

function resolveOnsetDeltaSeconds(frameDeltaSeconds) {
  if (!state.playing) {
    onsetMediaTime.reset();
    return frameDeltaSeconds;
  }
  return onsetMediaTime.advance(ui.audio.currentTime);
}

function updateAudio(dt, elapsed) {
  let lowTarget;
  let midTarget;
  let highTarget;
  let rmsTarget = 0;
  if (analyser && state.playing) {
    analyser.getByteFrequencyData(frequencyData);
    analyser.getByteTimeDomainData(timeData);
    lowTarget = Math.pow(averageBand(24, 190), 1.14);
    midTarget = Math.pow(averageBand(190, 2100), 1.22);
    highTarget = Math.pow(averageBand(2100, 9200), 1.08);
    let sumSq = 0;
    for (let i = 0; i < timeData.length; i += 4) {
      const v = (timeData[i] - 128) / 128;
      sumSq += v * v;
    }
    rmsTarget = Math.sqrt(sumSq / (timeData.length / 4));
  } else {
    state.syntheticPhase += dt;
    lowTarget = 0.14 + 0.065 * (0.5 + 0.5 * Math.sin(elapsed * 1.08));
    midTarget = 0.10 + 0.052 * (0.5 + 0.5 * Math.sin(elapsed * 0.43 + 1.2));
    highTarget = 0.05 + 0.03 * (0.5 + 0.5 * Math.sin(elapsed * 1.91 + 2.5));
    rmsTarget = 0.08 + lowTarget * 0.28;
  }
  state.low = damp(state.low, lowTarget, 8.0, dt);
  state.mid = damp(state.mid, midTarget, 7.2, dt);
  state.high = damp(state.high, highTarget, 9.0, dt);
  state.rms = damp(state.rms, rmsTarget, 9.0, dt);
  const energyTarget = clamp(state.low * 0.48 + state.mid * 0.34 + state.high * 0.22 + state.rms * 0.3, 0, 1);
  const rawTransient = Math.max(0, energyTarget - state.previousEnergy) * 8.6;
  state.transient = damp(state.transient, rawTransient, rawTransient > state.transient ? 26 : 7, dt);
  state.previousEnergy = energyTarget;
  state.energy = damp(state.energy, energyTarget, 7.8, dt);
  updateSpectrumTexture(elapsed);
  const onsetSpectrum = analyser && frequencyData && state.playing && audioContext
    ? frequencyData
    : spectrumBytes;
  const onsetDeltaSeconds = resolveOnsetDeltaSeconds(dt);
  const onset = onsetDeltaSeconds > 0
    ? onsetDetector.update(onsetSpectrum, onsetDeltaSeconds, {
      bandStartIndex: resolveOnsetBandStartIndex(onsetSpectrum),
      selectedPath: onsetPathByChapter[state.tideIndex],
    })
    : { onset: false, strength: 0 };

  globals.low.value = state.low;
  globals.mid.value = state.mid;
  globals.high.value = state.high;
  globals.rms.value = state.rms;
  globals.energy.value = state.energy;
  globals.transient.value = state.transient;

  ui.low.style.setProperty('--v', clamp(state.low * 1.75, 0, 1).toFixed(3));
  ui.mid.style.setProperty('--v', clamp(state.mid * 1.95, 0, 1).toFixed(3));
  ui.high.style.setProperty('--v', clamp(state.high * 2.8, 0, 1).toFixed(3));

  if (gainNode && audioContext) {
    const introGain = smoothstep(0.12, reducedMotion ? 0.55 : 1.75, state.ceremonyTime);
    const endingGain = 1 - smoothstep(0.53, 0.98, state.shutdown);
    const targetGain = state.muted ? 0 : 0.92 * introGain * endingGain;
    gainNode.gain.setTargetAtTime(targetGain, audioContext.currentTime, 0.07);
  }

  state.pulseCooldown = Math.max(0, state.pulseCooldown - dt);
  if (state.calibrated && !state.ending && state.playing && onset.onset && state.pulseCooldown <= 0) {
    triggerPulse(new THREE.Vector2(0, 0), 0.48 + onset.strength * 0.7, 0.32, false);
    state.pulseCooldown = 1.15 + (1 - state.low) * 0.7;
  }
}

// ---------- Interaction ----------
function updatePointer(event) {
  pointer.x = event.clientX / innerWidth * 2 - 1;
  pointer.y = -(event.clientY / innerHeight) * 2 + 1;
  ui.cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
}
window.addEventListener('pointermove', (event) => {
  updatePointer(event);
  if (state.dragging && !state.ending) {
    const dx = event.clientX - state.lastPointerX;
    const dy = event.clientY - state.lastPointerY;
    state.yawTarget -= dx * 0.0042;
    state.pitchTarget = clamp(state.pitchTarget + dy * 0.0026, -0.3, 0.5);
    state.dragDistance += Math.hypot(dx, dy);
  }
  state.lastPointerX = event.clientX;
  state.lastPointerY = event.clientY;
});
window.addEventListener('pointerdown', (event) => {
  if (event.target.closest('button, label, input') || state.ending) return;
  updatePointer(event);
  state.dragging = true;
  state.dragDistance = 0;
  state.lastPointerX = event.clientX;
  state.lastPointerY = event.clientY;
  ui.cursor.classList.add('active');
});
window.addEventListener('pointerup', (event) => {
  if (!state.dragging) return;
  state.dragging = false;
  ui.cursor.classList.remove('active');
  if (state.dragDistance < 8) handleSceneClick(event);
});
window.addEventListener('pointercancel', () => { state.dragging = false; ui.cursor.classList.remove('active'); });
window.addEventListener('wheel', (event) => {
  if (!state.ending) state.diveTarget = clamp(state.diveTarget + event.deltaY * 0.00055, 0, 1);
}, { passive: true });

function handleSceneClick(event) {
  if (!state.calibrated || state.ending) return;
  pointer.x = event.clientX / innerWidth * 2 - 1;
  pointer.y = -(event.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const coreHit = raycaster.intersectObject(core, false)[0];
  if (coreHit) {
    state.archiveOpenTarget = state.archiveOpenTarget > 0.5 ? 0 : 1;
    ui.mode.textContent = state.archiveOpenTarget ? 'DECODING' : 'OBSERVATION';
    ui.coreState.textContent = state.archiveOpenTarget ? 'UNSEALED' : 'RESONANT';
    triggerPulse(new THREE.Vector2(0, 0), 1.35, 0.34, true);
    showMessage(state.archiveOpenTarget ? 'OPEN' : 'SEALED', 850);
    return;
  }
  const floorHit = raycaster.intersectObject(floor, false)[0];
  if (floorHit) {
    triggerPulse(new THREE.Vector2(floorHit.point.x, floorHit.point.z), 1.05, -2.28, true);
    showMessage(['PRESSURE','CURTAIN','QUARTZ','PILLARS','FORECAST','COUNTERTIDE','CODEX','GAZE','NULL'][state.tideIndex], 760);
  } else {
    triggerPulse(new THREE.Vector2(pointer.x * 5, -pointer.y * 5), 0.7, 0.1, true);
  }
}

function triggerPulse(origin = new THREE.Vector2(0, 0), strength = 1, sourceY = 0.34, announce = false, modeOverride = null) {
  state.pulseAge = 0;
  state.pulseStrength = strength;
  state.pulseOrigin.copy(origin);
  state.pulseSourceY = sourceY;
  state.pulseMode = modeOverride == null ? state.tideIndex : modeOverride;
  state.pulseSerial++;
  const screenPoint = scratchVec3.set(origin.x, sourceY, origin.y).project(camera);
  state.pulseScreen.set(screenPoint.x * 0.5 + 0.5, screenPoint.y * 0.5 + 0.5);
  globals.pulseAge.value = 0;
  globals.pulseStrength.value = strength;
  globals.sonarMode.value = state.pulseMode;
  sonarShell.position.set(origin.x, sourceY, origin.y);
  sonarShell.scale.setScalar(0.001);
  sonarShell.visible = state.pulseMode === 0;
  if (announce) state.pulseCooldown = 0.95;
}

window.addEventListener('keydown', async (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    if (state.ended) {
      await enterExperience(true, true);
    } else if (!state.entered) {
      await enterExperience(true);
    } else if (state.audioReady) {
      if (ui.audio.paused) await playAudioElement(ui.audio); else ui.audio.pause();
    }
  } else if (event.key.toLowerCase() === 'm') {
    state.muted = !state.muted;
    ui.audioState.textContent = state.muted ? 'MUTED' : state.playing ? 'PLAYING' : 'PAUSED';
    showMessage(state.muted ? 'AUDIO MUTED' : 'AUDIO RESTORED');
  } else if (event.key.toLowerCase() === 'f') {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.();
  } else if (event.key.toLowerCase() === 'r' && !state.ending) {
    state.diveTarget = 0.12; state.yawTarget = 0; state.pitchTarget = 0.07;
    showMessage('VIEWPOINT RECALIBRATED');
  }
});

// ---------- Choreography ----------
const openingCues = [
  { time: 0.58, text: 'FIRST RETURN', strength: 0.52, y: -2.28, mode: 0 },
  { time: 1.52, text: 'NO FLOOR', strength: 0.62, y: -2.28, mode: 1 },
  { time: 2.62, text: 'DEPTH BELOW DEPTH', strength: 0.72, y: -2.28, mode: 2 },
  { time: 4.10, text: 'NINE ROOMS', strength: 0.86, y: 0.34, mode: 3 },
  { time: 5.62, text: 'FIRST LIGHT', strength: 1.32, y: 0.34, mode: 4 },
  { time: 7.45, text: 'IT LOOKS BACK', strength: 0.92, y: 0.34, mode: 7 }
];

function updateRitualCaption(t) {
  let main = '';
  let sub = '';
  let index = '';
  if (t < 1.65) {
    index = 'I'; main = '听。'; sub = 'LISTEN.';
  } else if (t < 3.55) {
    index = 'II'; main = '海床没有回答。'; sub = 'NO FLOOR ANSWERED.';
  } else if (t < 5.75) {
    index = 'III'; main = '星图沉在更深处。'; sub = 'THE STARS LIE LOWER.';
  } else {
    index = 'IX'; main = '它先看见了我们。'; sub = 'IT SAW US FIRST.';
  }
  ui.ritualIndex.textContent = index;
  ui.ritualMain.textContent = main;
  ui.ritualSub.textContent = sub;
  const opacity = smoothstep(0.18, 0.62, t) * (1 - smoothstep(8.0, 9.1, t));
  document.documentElement.style.setProperty('--ritual-caption', opacity.toFixed(3));
}

function updateCeremony(dt) {
  if (!state.entered || state.calibrated || state.previewMode === 'main') return;
  // Audio time is the master clock whenever a track is present. This keeps the
  // lighting score locked to musical events even on slow GPUs or background tabs.
  if (state.audioReady && Number.isFinite(ui.audio.currentTime)) {
    state.ceremonyTime = ui.audio.currentTime;
  } else {
    state.ceremonyTime += dt * (reducedMotion ? 2.0 : 1.0);
  }
  const t = state.ceremonyTime;
  state.ritual = smootherstep(0.4, 7.7, t);
  state.ignite = smootherstep(4.15, 8.0, t);
  state.lightLevel = clamp(smoothstep(0.12, 1.05, t) * 0.22 + smoothstep(2.25, 7.85, t) * 0.78, 0, 1);
  globals.ritual.value = state.ritual;
  globals.ignite.value = state.ignite;
  updateRitualCaption(t);

  while (state.ceremonyCue < openingCues.length && t >= openingCues[state.ceremonyCue].time) {
    const cue = openingCues[state.ceremonyCue++];
    triggerPulse(new THREE.Vector2(0, 0), cue.strength, cue.y, false, cue.mode);
    showMessage(cue.text, 1300);
  }
  if (t >= (reducedMotion ? 4.2 : 8.65)) {
    state.calibrated = true;
    state.ritual = 1;
    state.ignite = 1;
    globals.ritual.value = 1;
    globals.ignite.value = 1;
    document.body.classList.add('calibrated');
    ui.coreState.textContent = 'RESONANT';
    ui.fieldState.textContent = 'LIVE / 64 BANDS';
    ui.mode.textContent = 'OBSERVATION';
    document.documentElement.style.setProperty('--ritual-caption', '0');
  }
}

function finishEnding() {
  if (state.ended) return;
  state.shutdown = 1;
  globals.shutdown.value = 1;
  state.ending = true;
  state.ended = true;
  state.playing = false;
  document.body.classList.add('ending');
  setTimeout(() => document.body.classList.add('ended'), 700);
  ui.audioState.textContent = 'CLOSED';
  ui.coreState.textContent = 'EXTINGUISHED';
  ui.fieldState.textContent = 'NO RETURN';
  document.documentElement.style.setProperty('--blackout', '1');
}

function updateEnding() {
  if (!state.entered || state.previewMode === 'main' || state.previewMode === 'opening') return;
  let target = state.shutdown;
  if (state.previewMode === 'ending') {
    target = Math.max(target, 0.68);
  } else if (state.audioReady && Number.isFinite(ui.audio.duration) && ui.audio.duration > 20) {
    const span = 13.6;
    const start = ui.audio.duration - span;
    const raw = clamp((ui.audio.currentTime - start) / span, 0, 1);
    // A held breath, a reversal, then a rapid optical collapse.
    target = raw < 0.58 ? raw * 0.78 : lerp(0.4524, 1.0, smootherstep(0.58, 1.0, raw));
  }
  state.shutdown = Math.max(state.shutdown, target);
  globals.shutdown.value = state.shutdown;

  if (state.shutdown > 0.018 && !state.ending) {
    state.ending = true;
    document.body.classList.add('ending');
    ui.mode.textContent = 'WITHDRAWAL';
  }
  if (state.endingCue === 0 && state.shutdown > 0.05) {
    state.endingCue = 1;
    showMessage('OUTER SILENCE', 1450);
  }
  if (state.endingCue === 1 && state.shutdown > 0.41) {
    state.endingCue = 2;
    triggerPulse(new THREE.Vector2(0, 0), 0.82, 0.34, false, 8);
    showMessage('THE ECHO REVERSES', 1550);
  }
  if (state.endingCue === 2 && state.shutdown > 0.76) {
    state.endingCue = 3;
    showMessage('LAST LIGHT', 1450);
  }
  // Some browsers keep `paused === false` for a few frames after a data-URI
  // audio stream reaches its reported duration. The visual score is already at
  // absolute black here, so close deterministically from the music clock.
  if (state.shutdown >= 0.995) finishEnding();
}

// ---------- Visual updates ----------
const paletteScratch = {
  deep: new THREE.Color(), fog: new THREE.Color(), glow: new THREE.Color(), accent: new THREE.Color(), secondary: new THREE.Color()
};
let lastTide = -1;
function resolveVisualScoreDuration() {
  if (deterministicCaptureRequested) return scoreDuration;
  return Number.isFinite(ui.audio.duration) ? ui.audio.duration : scoreDuration;
}

function updateTide(elapsed, dt) {
  const duration = resolveVisualScoreDuration();
  let musicTime;
  if (state.previewMode === 'main') {
    const i = clamp(state.previewSection, 0, 8);
    musicTime = lerp(sectionBoundaries[i], sectionBoundaries[i + 1], 0.46);
  } else if (state.previewMode === 'ending') musicTime = 346.0;
  else musicTime = state.audioReady && duration > 0 ? ui.audio.currentTime : ((elapsed / 118) * duration) % duration;
  musicTime = clamp(musicTime, 0, sectionBoundaries[sectionBoundaries.length - 1] - 0.001);

  let rawTide = sectionBoundaries.length - 2;
  for (let i = 0; i < sectionBoundaries.length - 1; i++) {
    if (musicTime < sectionBoundaries[i + 1]) { rawTide = i; break; }
  }

  if (rawTide !== state.tideIndex && state.pendingTide !== rawTide) {
    state.transitionFrom = state.tideIndex;
    state.pendingTide = rawTide;
    state.transitionClock = 0;
    state.transitionSwitched = false;
  }

  let transitionProgress = 1;
  if (state.pendingTide >= 0) {
    state.transitionClock += dt;
    transitionProgress = clamp(state.transitionClock / sectionTransitionDuration, 0, 1);
    if (!state.transitionSwitched && transitionProgress >= 0.49) {
      state.transitionSwitched = true;
      state.tideIndex = state.pendingTide;
      globals.section.value = state.tideIndex;
      // The new chapter announces itself in its own sonar dialect.
      if (state.calibrated && !state.ending) triggerPulse(new THREE.Vector2(0, 0), 0.58, 0.34, false, state.tideIndex);
    }
    if (transitionProgress >= 1) {
      state.tideIndex = state.pendingTide;
      state.pendingTide = -1;
      state.transitionClock = 99;
      state.transitionSwitched = false;
      transitionProgress = 1;
    }
  }

  state.phaseTransition = state.pendingTide >= 0 ? Math.pow(Math.sin(transitionProgress * Math.PI), 1.18) : 0;
  globals.phaseTransition.value = state.phaseTransition;
  document.documentElement.style.setProperty('--phase-veil', (state.phaseTransition * 0.72).toFixed(3));
  document.documentElement.style.setProperty('--phase-turn', state.phaseTransition.toFixed(3));

  const startTime = sectionBoundaries[state.tideIndex];
  const endTime = sectionBoundaries[state.tideIndex + 1];
  state.phaseLocal = clamp((musicTime - startTime) / Math.max(0.01, endTime - startTime), 0, 1);
  state.tideFloat = state.tideIndex + state.phaseLocal;
  globals.section.value = state.tideIndex;
  globals.sectionLocal.value = state.phaseLocal;
  globals.tide.value = state.tideFloat;

  const from = state.pendingTide >= 0 ? state.transitionFrom : state.tideIndex;
  const to = state.pendingTide >= 0 ? state.pendingTide : state.tideIndex;
  const paletteMix = state.pendingTide >= 0 ? smootherstep(0.08, 0.92, transitionProgress) : 0;
  for (const key of Object.keys(paletteScratch)) {
    paletteScratch[key].lerpColors(palettes[from][key], palettes[to][key], paletteMix);
    globals[`${key}Color`].value.copy(paletteScratch[key]);
  }
  scene.fog.color.copy(globals.fogColor.value);
  scene.background.copy(globals.deepColor.value);
  coreLight.color.copy(globals.glowColor.value);
  upperLight.color.copy(globals.secondaryColor.value);
  coreWire.material.color.copy(globals.glowColor.value);
  coreHalo.material.color.copy(globals.glowColor.value);
  combMaterial.color.copy(globals.accentColor.value);
  suspensionMaterial.color.copy(globals.secondaryColor.value);
  sonarSpokeMaterial.color.copy(globals.glowColor.value);
  sonarPillars.material.color.copy(globals.glowColor.value);
  helixMaterial.color.copy(globals.accentColor.value);
  sonarNull.material.color.copy(globals.accentColor.value);
  platformRings.forEach((ring) => ring.material.color.copy(globals.glowColor.value));

  if (state.tideIndex !== lastTide) {
    lastTide = state.tideIndex;
    const meta = tideMeta[state.tideIndex];
    ui.phaseNumber.textContent = meta[0];
    ui.phaseName.textContent = meta[1];
    ui.phaseSub.textContent = meta[2];
    ui.sideTicks.forEach((tick, index) => tick.classList.toggle('active', index === state.tideIndex));
    if (state.calibrated && !state.ending && state.activeSeconds > 2) showMessage(`${meta[0]} · ${meta[1]}`, 1150);
  }
}

function updateCamera(dt) {
  state.dive = damp(state.dive, state.diveTarget, 4.1, dt);
  state.yaw = damp(state.yaw, state.yawTarget, 5.0, dt);
  state.pitch = damp(state.pitch, state.pitchTarget, 5.0, dt);
  pointerSmooth.lerp(pointer, 1 - Math.exp(-dt * 4.5));

  const introPull = 1 - state.ritual;
  const radius = lerp(13.0, 5.25, Math.pow(state.dive, 1.08)) + introPull * 1.6 + state.shutdown * 2.7;
  const yaw = state.yaw + pointerSmooth.x * (state.dragging ? 0.015 : 0.095) + introPull * 0.05;
  const pitch = state.pitch + pointerSmooth.y * (state.dragging ? 0.01 : 0.05) - state.shutdown * 0.035;
  const targetY = 0.17 + state.dive * 0.22;
  const horizontal = Math.cos(pitch) * radius;
  const desired = new THREE.Vector3(
    Math.sin(yaw) * horizontal,
    targetY + Math.sin(pitch) * radius * 0.67,
    Math.cos(yaw) * horizontal
  );
  camera.position.lerp(desired, 1 - Math.exp(-dt * 4.2));
  camera.lookAt(0, targetY, 0);
  camera.rotation.z = damp(camera.rotation.z, -pointerSmooth.x * 0.007 - state.transient * 0.003, 4.0, dt);
  const depthMeters = Math.round(3860 + state.dive * 740);
  ui.depth.textContent = `−${String(depthMeters).padStart(6, '0')} M`;
  ui.coord.textContent = `${(yaw * 12.7).toFixed(3)} / ${(pitch * 17.4).toFixed(3)}`;
}

function updateSpectralComb() {
  const pos = combGeometry.attributes.position.array;
  const mode = state.tideIndex;
  const local = state.phaseLocal;
  for (let i = 0; i < spectrumSize; i++) {
    const u = i / spectrumSize;
    const a = u * Math.PI * 2;
    const amp = spectrumBytes[i] / 255;
    const o = i * 6;
    let x0, y0, z0, x1, y1, z1;
    if (mode === 0) {
      const r0 = 1.18, r1 = 1.34 + amp * 0.74;
      x0 = Math.cos(a) * r0; y0 = Math.sin(a * 3 + globals.time.value * 0.18) * 0.13; z0 = Math.sin(a) * r0;
      x1 = Math.cos(a) * r1; y1 = y0 + (amp - 0.2) * 0.13; z1 = Math.sin(a) * r1;
    } else if (mode === 1) {
      const star = Math.pow(Math.abs(Math.cos(a * 4.5)), 8);
      const r0 = 0.78 + star * 0.32, r1 = r0 + 0.28 + amp * (0.65 + star * 0.65);
      x0 = Math.cos(a) * r0; y0 = (u - 0.5) * 1.15; z0 = Math.sin(a) * r0;
      x1 = Math.cos(a) * r1; y1 = y0 + Math.sin(a * 9) * amp * 0.18; z1 = Math.sin(a) * r1;
    } else if (mode === 2) {
      const qa = Math.round(u * 12) / 12 * Math.PI * 2;
      const r0 = 0.72, r1 = 1.15 + amp * 0.88;
      x0 = Math.cos(qa) * r0; y0 = Math.sin(a * 5) * 0.42; z0 = Math.sin(qa) * r0;
      x1 = Math.cos(qa) * r1; y1 = y0 + (amp - 0.25) * 0.34; z1 = Math.sin(qa) * r1;
    } else if (mode === 3) {
      const x = (u - 0.5) * 2.4;
      x0 = x; y0 = -0.82; z0 = Math.sin(a * 3) * 0.13;
      x1 = x; y1 = -0.2 + amp * 2.25; z1 = z0 + Math.cos(a * 2) * 0.09;
    } else if (mode === 4) {
      const petal = 0.45 + Math.pow(Math.abs(Math.sin(a * 4.5)), 3) * 0.74;
      const r0 = 0.74 * petal, r1 = r0 + 0.34 + amp * 0.83;
      x0 = Math.cos(a) * r0; y0 = Math.sin(a * 2) * 0.20; z0 = Math.sin(a) * r0;
      x1 = Math.cos(a) * r1; y1 = y0 + Math.sin(a * 9) * amp * 0.32; z1 = Math.sin(a) * r1;
    } else if (mode === 5) {
      const y = (u - 0.5) * 2.7;
      const twist = a * 2.0 + y * 2.8 + globals.time.value * 0.35;
      const r0 = 0.72, r1 = r0 + 0.24 + amp * 0.48;
      x0 = Math.cos(twist) * r0; y0 = y; z0 = Math.sin(twist) * r0;
      x1 = Math.cos(twist) * r1; y1 = y + (amp - 0.4) * 0.13; z1 = Math.sin(twist) * r1;
    } else if (mode === 6) {
      const row = Math.floor(u * 9);
      const column = fract(u * 9);
      y0 = (row / 8 - 0.5) * 2.2; y1 = y0;
      x0 = -1.2 + column * 2.4; x1 = x0 + 0.18 + amp * 1.15;
      z0 = (row - 4) * 0.018; z1 = z0 + Math.sin(a * 4 + globals.time.value) * 0.035;
    } else if (mode === 7) {
      const r0 = 0.70, r1 = 0.92 + amp * 0.72;
      x0 = Math.cos(a) * r0 * 1.45; y0 = Math.sin(a) * r0 * 0.58; z0 = 0;
      x1 = Math.cos(a) * r1 * 1.45; y1 = Math.sin(a) * r1 * 0.58; z1 = Math.sin(a * 3) * amp * 0.14;
    } else {
      const r0 = 0.46 - local * 0.1, r1 = r0 + 0.08 + amp * 0.22;
      x0 = Math.cos(a) * r0; y0 = Math.sin(a * 2) * 0.04; z0 = Math.sin(a) * r0;
      x1 = Math.cos(a) * r1; y1 = y0; z1 = Math.sin(a) * r1;
    }
    pos[o] = x0; pos[o + 1] = y0; pos[o + 2] = z0;
    pos[o + 3] = x1; pos[o + 4] = y1; pos[o + 5] = z1;
  }
  combGeometry.attributes.position.needsUpdate = true;
}

function updateCore(dt, elapsed) {
  state.archiveOpen = damp(state.archiveOpen, state.archiveOpenTarget, 4.0, dt);
  globals.open.value = state.archiveOpen;
  const mode = state.tideIndex;
  const transition = state.phaseTransition;
  const speedProfiles = [0.55, 0.92, 0.42, 0.20, 0.68, 1.15, 0.34, 0.48, 0.12];
  const speed = speedProfiles[mode];
  coreGroup.rotation.y += dt * (0.02 + speed * 0.055 + state.mid * 0.055) * (1 - state.shutdown * 0.7);
  coreGroup.rotation.x = Math.sin(elapsed * (0.07 + speed * 0.05)) * (mode === 5 ? 0.075 : 0.035) + pointerSmooth.y * 0.025;
  coreGroup.rotation.z = Math.sin(elapsed * 0.061) * 0.02 - pointerSmooth.x * 0.018 + (mode === 6 ? Math.sin(elapsed * 0.17) * 0.035 : 0);

  const audioWeights = [state.low, state.high, state.mid, state.low, state.mid, state.mid, state.high, state.transient, state.low];
  const modeEnergy = audioWeights[mode];
  const breathing = 1 + modeEnergy * 0.09 + state.transient * 0.025 + transition * 0.08;
  const shapes = [
    [1,1,1], [1.05,1.28,1.05], [1.08,1.08,1.08], [0.56,1.72,0.56], [1.18,0.92,1.18],
    [0.82,1.38,0.82], [1.42,1.20,0.28], [1.46,0.62,0.34], [0.48,0.48,0.48]
  ];
  const shape = shapes[mode];
  scratchVec3.set(shape[0] * breathing, shape[1] * breathing, shape[2] * breathing);
  core.scale.lerp(scratchVec3, 1 - Math.exp(-dt * (4.0 + transition * 8.0)));

  const shutdownCollapse = 1 - smoothstep(0.76, 0.98, state.shutdown) * 0.78;
  const wireBase = mode === 6 ? 0.85 : mode === 7 ? 0.9 : mode === 8 ? 0.46 : 1;
  coreWire.scale.set(shape[0] * wireBase, shape[1] * wireBase, shape[2] * wireBase).multiplyScalar((1 + state.archiveOpen * 0.2 + state.high * 0.025 + transition * 0.32) * shutdownCollapse);
  coreWire.rotation.x += dt * (0.05 + speed * 0.11 + state.high * 0.08);
  coreWire.rotation.y -= dt * (0.04 + speed * 0.09 + state.mid * 0.07);
  coreWire.material.opacity = (0.08 + state.high * 0.24 + state.archiveOpen * 0.08 + transition * 0.22) * state.ignite * (1 - smoothstep(0.73, 0.98, state.shutdown));

  const haloProfile = [1.0,1.24,0.86,0.94,1.34,1.02,0.78,1.22,0.54][mode];
  coreHalo.material.opacity = (0.10 + modeEnergy * 0.38 + state.transient * 0.28 + transition * 0.4) * state.ignite * (1 - smoothstep(0.72, 0.96, state.shutdown));
  coreHalo.scale.setScalar((4.0 + haloProfile * 0.8 + modeEnergy * 1.2 + state.archiveOpen * 0.7 + transition * 2.0) * (1 - smoothstep(0.68, 0.98, state.shutdown) * 0.86));
  coreLight.intensity = (5 + modeEnergy * 29 + state.archiveOpen * 9 + state.transient * 16 + transition * 26) * state.ignite * (1 - smoothstep(0.72, 0.99, state.shutdown));

  energyBody.rotation.y += dt * ([0.03,0.075,0.015,0.01,0.04,-0.09,0.008,0.018,0.004][mode] + state.mid * 0.025);
  energyBody.rotation.z = mode === 5 ? Math.sin(elapsed * 0.18) * 0.12 : mode === 6 ? 0.04 : Math.sin(elapsed * 0.055) * 0.025;

  for (const ring of coreRings) {
    const i = ring.userData.index;
    const direction = (i % 2 ? -1 : 1);
    const modeSpin = [0.75,1.6,0.35,0.25,0.95,2.0,0.18,0.48,0.08][mode];
    ring.rotation.x += dt * ring.userData.speed * modeSpin * (1 + state.mid * 1.15);
    ring.rotation.y -= dt * ring.userData.speed * 0.7 * modeSpin * (1 + state.high);
    if (mode === 3) ring.rotation.z = damp(ring.rotation.z, i % 2 ? Math.PI / 2 : 0, 2.2, dt);
    if (mode === 6) ring.rotation.x = damp(ring.rotation.x, Math.PI / 2, 1.8, dt);
    if (mode === 7) ring.rotation.x = damp(ring.rotation.x, Math.PI / 2, 2.4, dt);
    const ringActivation = smoothstep(i / 9 * 0.55, i / 9 * 0.55 + 0.25, state.ignite);
    const collapse = smoothstep(0.5 + (8 - i) / 9 * 0.34, 0.82 + (8 - i) / 9 * 0.16, state.shutdown);
    let radial = 1 + state.archiveOpen * (0.05 + i * 0.017) + modeEnergy * 0.012;
    if (mode === 1) radial *= 0.86 + (i % 3) * 0.14;
    if (mode === 4) radial *= 0.88 + Math.sin(i / 9 * Math.PI) * 0.32;
    if (mode === 8) radial *= 0.48 + (1 - state.phaseLocal) * 0.32;
    const flatY = mode === 7 ? 0.46 : mode === 6 ? 0.72 : 1;
    ring.scale.set(radial, radial * flatY, radial).multiplyScalar(1 - collapse * 0.92);
    ring.material.opacity = ((i % 3 === 0 ? 0.20 : 0.065) + state.high * (i % 3 === 0 ? 0.3 : 0.14) + state.archiveOpen * 0.05 + transition * 0.16) * ringActivation * (1 - collapse);
    ring.material.color.copy(i === 8 ? globals.accentColor.value : globals.glowColor.value);
  }

  for (let i = 0; i < apertureFins.length; i++) {
    const fin = apertureFins[i];
    const a = fin.userData.angle + elapsed * (mode === 5 ? -0.06 : 0.018);
    const activation = smoothstep(i / 9 * 0.55, i / 9 * 0.55 + 0.25, state.ignite);
    const bloom = mode === 4 ? 0.95 + state.mid * 0.65 : mode === 7 ? -0.32 + state.high * 0.2 : mode === 8 ? -0.65 : 0;
    const radius = 0.92 + state.archiveOpen * (0.9 + i * 0.022) + bloom * 0.48 + transition * 0.45;
    fin.position.x = Math.cos(a) * radius;
    fin.position.z = Math.sin(a) * radius;
    fin.position.y = Math.sin(a * 2 + elapsed * 0.25) * (0.06 + state.archiveOpen * 0.17) + (mode === 3 ? (i - 4) * 0.13 : 0);
    fin.rotation.y = -a + state.archiveOpen * Math.PI * 0.34 + bloom * 0.38;
    fin.rotation.z = Math.cos(a) * 0.2 + state.archiveOpen * (i % 2 ? -0.58 : 0.58) + (mode === 6 ? Math.PI * 0.42 : 0);
    fin.material.emissive.copy(i === 8 ? globals.accentColor.value : globals.secondaryColor.value);
    fin.material.emissiveIntensity = (0.05 + state.mid * 0.5 + state.archiveOpen * 0.28 + transition * 0.5) * activation;
    fin.material.opacity = (mode === 8 ? 0.16 : 0.34) * activation * (1 - smoothstep(0.64, 0.94, state.shutdown));
  }

  forecastDust.rotation.y -= dt * (0.008 + state.mid * 0.028) * (mode === 5 ? -2.2 : 1);
  forecastDust.rotation.z = Math.sin(elapsed * 0.075) * (mode === 6 ? 0.02 : 0.05);
  spectralComb.rotation.y += dt * (mode === 5 ? -0.055 : mode === 3 ? 0.008 : 0.018);
  combMaterial.opacity = (0.08 + state.high * 0.3 + state.archiveOpen * 0.09 + transition * 0.24) * state.ignite * (1 - smoothstep(0.65, 0.94, state.shutdown));
  updateSpectralComb();
}

function updateResonators(dt, elapsed) {
  const active = smoothstep(0.18, 0.78, state.ritual);
  suspensionMaterial.opacity = 0.04 * active * (1 - state.shutdown);
  for (const item of resonators) {
    const { root, ring, crossRing, aperture, index } = item;
    const bandIndex = clamp(Math.floor(root.userData.band * (spectrumSize - 1)), 0, spectrumSize - 1);
    const spec = spectrumBytes[bandIndex] / 255;
    const a = root.userData.angle;
    const d = Math.hypot(root.position.x - state.pulseOrigin.x, root.position.z - state.pulseOrigin.y);
    let waveRadius = state.pulseAge * (4.15 + state.low * 1.7);
    if (state.pulseMode === 1) waveRadius = state.pulseAge * (2.2 + state.high * 0.8);
    else if (state.pulseMode === 3) waveRadius = state.pulseAge * 2.5;
    else if (state.pulseMode === 7) waveRadius = lerp(18.0, 0.15, smootherstep(0, 4.05, state.pulseAge));
    else if (state.pulseMode === 8) waveRadius = lerp(10.5, 0.15, smootherstep(0, 4.3, state.pulseAge));
    const resonanceWidth = state.pulseMode === 6 ? 0.55 : state.pulseMode >= 7 ? 0.82 : 1.35;
    const resonance = Math.exp(-Math.abs(d - waveRadius) * resonanceWidth) * state.pulseStrength;
    const activation = smoothstep(index / 9 * 0.55, index / 9 * 0.55 + 0.28, state.ritual);
    const offStart = 0.18 + (1 - index / 8) * 0.46;
    const survive = 1 - smoothstep(offStart, offStart + 0.19, state.shutdown);
    const sectionMotion = [0.8,1.45,0.52,0.32,0.92,1.75,0.38,0.62,0.18][state.tideIndex];
    const reverse = state.tideIndex === 5 ? -1 : 1;
    root.rotation.z = Math.sin(elapsed * (0.15 + index * 0.006) * sectionMotion + root.userData.seed) * (0.045 + spec * 0.17 + resonance * 0.19);
    root.rotation.x = Math.cos(elapsed * 0.12 * reverse + a) * (0.018 + spec * 0.08 + (state.tideIndex === 3 ? state.low * 0.1 : 0));
    ring.rotation.z += dt * (0.12 + spec * 0.5) * (index % 2 ? -1 : 1);
    crossRing.rotation.x += dt * (0.08 + state.mid * 0.25);
    ring.material.color.copy(globals.glowColor.value);
    crossRing.material.color.copy(index === 8 ? globals.accentColor.value : globals.secondaryColor.value);
    ring.material.opacity = (0.08 + spec * 0.48 + resonance * 0.58) * activation * survive;
    crossRing.material.opacity = (0.04 + state.high * 0.16 + resonance * 0.34) * activation * survive;
    aperture.material.color.copy(index === 8 ? globals.accentColor.value : globals.glowColor.value);
    aperture.material.opacity = (0.13 + spec * 0.62 + resonance * 0.72) * activation * survive;
    aperture.scale.setScalar(0.55 + spec * 0.55 + resonance * 0.7);
  }
}

function updatePulse(dt) {
  state.pulseAge += dt;
  globals.pulseAge.value = state.pulseAge;
  state.pulseStrength = damp(state.pulseStrength, 0, 0.34, dt);
  globals.pulseStrength.value = state.pulseStrength;

  sonarShell.visible = false;
  sonarCurtain.visible = false;
  sonarSpokes.visible = false;
  sonarPillars.visible = false;
  sonarLattice.visible = false;
  sonarHelix.visible = false;
  sonarSlabs.visible = false;
  sonarConvergence.visible = false;
  sonarNull.visible = false;
  sonarSpokeMaterial.opacity = 0;
  sonarPillars.material.opacity = 0;
  helixMaterial.opacity = 0;
  for (const slab of sonarSlabs.children) slab.material.opacity = 0;

  if (state.shutdown > 0.5) {
    const p = smoothstep(0.5, 0.92, state.shutdown);
    sonarConvergence.visible = true;
    sonarConvergence.position.set(0, 0.34, 0);
    sonarConvergence.scale.setScalar(lerp(22.0, 0.035, p));
    globals.pulseStrength.value = Math.max(globals.pulseStrength.value, (1 - p) * 1.08);
    return;
  }

  const mode = state.pulseMode;
  const lifetimes = [5.35, 4.1, 4.35, 4.0, 4.9, 4.5, 4.2, 4.05, 4.3];
  const life = lifetimes[mode] || 4.5;
  if (state.pulseAge >= life || state.pulseStrength <= 0.008) return;
  const p = clamp(state.pulseAge / life, 0, 1);
  const decay = Math.pow(1 - p, 0.62) * state.pulseStrength;
  const ox = state.pulseOrigin.x, oy = state.pulseSourceY, oz = state.pulseOrigin.y;

  if (mode === 0) {
    const radius = Math.max(0.01, state.pulseAge * (4.15 + state.low * 1.7));
    sonarShell.visible = true;
    sonarShell.position.set(ox, oy, oz);
    sonarShell.scale.setScalar(radius);
  } else if (mode === 1) {
    sonarCurtain.visible = true;
    sonarCurtain.position.set(ox, -0.2 + oy * 0.2, oz);
    sonarCurtain.rotation.y = globals.time.value * 0.11;
    const radius = 0.2 + state.pulseAge * (2.2 + state.high * 0.8);
    sonarCurtain.scale.set(radius, 5.2 + state.pulseAge * 1.3, radius);
  } else if (mode === 2) {
    sonarSpokes.visible = true;
    const inner = Math.max(0.05, state.pulseAge * 2.0);
    for (let i = 0; i < sonarSpokeCount; i++) {
      const u = i / sonarSpokeCount;
      const a = u * Math.PI * 2;
      const spec = spectrumBytes[Math.floor(u * (spectrumSize - 1))] / 255;
      const facet = Math.round(u * 18) / 18 * Math.PI * 2;
      const outer = inner + 0.34 + spec * 2.2 + Math.pow(Math.abs(Math.cos(a * 4.5)), 8) * 0.95;
      const o = i * 6;
      sonarSpokePositions[o] = ox + Math.cos(facet) * inner;
      sonarSpokePositions[o + 1] = oy + Math.sin(a * 5 + globals.time.value) * 0.16;
      sonarSpokePositions[o + 2] = oz + Math.sin(facet) * inner;
      sonarSpokePositions[o + 3] = ox + Math.cos(facet) * outer;
      sonarSpokePositions[o + 4] = oy + (spec - 0.25) * 1.1;
      sonarSpokePositions[o + 5] = oz + Math.sin(facet) * outer;
    }
    sonarSpokeGeometry.attributes.position.needsUpdate = true;
    sonarSpokeMaterial.opacity = decay * (0.28 + state.high * 0.45);
  } else if (mode === 3) {
    sonarPillars.visible = true;
    const ringRadius = 0.35 + state.pulseAge * 2.5;
    for (let i = 0; i < sonarPillarCount; i++) {
      const u = i / sonarPillarCount;
      const a = u * Math.PI * 2;
      const spec = spectrumBytes[Math.floor(u * (spectrumSize - 1))] / 255;
      const height = 0.18 + spec * (2.4 + state.low * 2.1) + Math.pow(Math.sin(p * Math.PI), 2) * 0.55;
      sonarDummy.position.set(ox + Math.cos(a) * ringRadius, oy - 1.7 + height * 0.5, oz + Math.sin(a) * ringRadius);
      sonarDummy.scale.set(0.7 + spec * 0.45, height, 0.7 + spec * 0.45);
      sonarDummy.rotation.y = -a;
      sonarDummy.updateMatrix();
      sonarPillars.setMatrixAt(i, sonarDummy.matrix);
    }
    sonarPillars.instanceMatrix.needsUpdate = true;
    sonarPillars.material.opacity = decay * (0.22 + state.mid * 0.38);
  } else if (mode === 4) {
    sonarLattice.visible = true;
    sonarLattice.position.set(ox, oy, oz);
    sonarLattice.rotation.y = globals.time.value * 0.18;
    sonarLattice.rotation.x = Math.sin(globals.time.value * 0.11) * 0.22;
    sonarLattice.scale.setScalar(0.45 + state.pulseAge * 1.02);
  } else if (mode === 5) {
    sonarHelix.visible = true;
    for (let i = 0; i < helixSegments; i++) {
      const u = i / (helixSegments - 1);
      const strand = i % 2;
      const y = (u - 0.5) * (4.2 + state.pulseAge * 0.7);
      const a = u * Math.PI * 8 + globals.time.value * (strand ? -1.1 : 0.9) + strand * Math.PI;
      const spec = spectrumBytes[Math.floor(u * (spectrumSize - 1))] / 255;
      const radius = 0.6 + state.pulseAge * 0.62 + spec * 0.38;
      const nextA = a + 0.13;
      const o = i * 6;
      helixPositions[o] = ox + Math.cos(a) * radius;
      helixPositions[o + 1] = oy + y;
      helixPositions[o + 2] = oz + Math.sin(a) * radius;
      helixPositions[o + 3] = ox + Math.cos(nextA) * radius;
      helixPositions[o + 4] = oy + y + 0.045;
      helixPositions[o + 5] = oz + Math.sin(nextA) * radius;
    }
    helixGeometry.attributes.position.needsUpdate = true;
    helixMaterial.opacity = decay * (0.25 + state.mid * 0.52);
  } else if (mode === 6) {
    sonarSlabs.visible = true;
    sonarSlabs.position.set(ox, oy, oz);
    sonarSlabs.rotation.y = globals.time.value * 0.07;
    for (const slab of sonarSlabs.children) {
      const i = slab.userData.index;
      const delayed = smoothstep(i / 12, i / 12 + 0.32, p) * (1 - smoothstep(0.62 + i / 30, 1, p));
      const z = (i - 4) * (0.18 + state.pulseAge * 0.12);
      slab.position.set(Math.sin(i * 1.7) * state.pulseAge * 0.08, (i - 4) * 0.12, z);
      slab.rotation.z = (i - 4) * 0.035 + Math.sin(globals.time.value * 0.4 + i) * 0.02;
      slab.scale.setScalar(0.62 + state.pulseAge * 0.52 + i * 0.025);
      slab.material.opacity = delayed * decay * (0.25 + state.high * 0.42);
    }
  } else if (mode === 7) {
    sonarConvergence.visible = true;
    sonarConvergence.position.set(ox, oy, oz);
    const radius = lerp(18.0 + state.high * 3.0, 0.18, smootherstep(0, 1, p));
    sonarConvergence.scale.set(radius * 1.15, radius * 0.58, radius);
  } else {
    sonarNull.visible = true;
    sonarNull.position.set(ox, oy, oz);
    sonarNull.rotation.x = Math.PI / 2 + Math.sin(globals.time.value * 0.17) * 0.18;
    sonarNull.rotation.y = globals.time.value * -0.12;
    const radius = lerp(10.5, 0.15, smootherstep(0, 1, p));
    sonarNull.scale.set(radius * 1.25, radius * 0.72, radius);
    sonarNull.material.opacity = decay * (0.22 + state.high * 0.35);
  }
}

function updateWorld(dt, elapsed) {
  mist.rotation.y += dt * 0.0018;
  nearSnow.rotation.y -= dt * 0.0032;
  abyssalSpines.rotation.y += dt * 0.0007;

  const fogProfiles = [0.0185,0.0205,0.019,0.024,0.018,0.021,0.023,0.026,0.030];
  scene.fog.density = damp(scene.fog.density, fogProfiles[state.tideIndex] + state.dive * 0.0035 + state.phaseTransition * 0.0025, 1.8, dt);

  for (let i = 0; i < pressureStrata.length; i++) {
    const ring = pressureStrata[i];
    ring.rotation.z += dt * (0.0014 + i * 0.00024) * (i % 2 ? -1 : 1);
    ring.rotation.y += dt * 0.0008;
    ring.material.color.copy(i % 3 === 0 ? globals.glowColor.value : globals.secondaryColor.value);
    const sonarLift = state.pulseAge < 4.5 ? state.pulseStrength * Math.exp(-Math.abs(i - state.pulseAge * 1.15) * 0.72) : 0;
    ring.material.opacity = (0.005 + state.high * 0.007 + sonarLift * 0.055 + state.phaseTransition * 0.025) * state.ritual * (1 - state.shutdown);
  }

  platformMaterial.emissive.copy(globals.secondaryColor.value);
  platformMaterial.emissiveIntensity = (0.035 + state.low * 0.22) * state.ritual * (1 - state.shutdown);
  platformMaterial.opacity = 0.34 + state.ritual * 0.28;
  platformRings.forEach((ring, i) => {
    ring.rotation.z += dt * (0.004 + i * 0.002) * (i % 2 ? -1 : 1);
    ring.material.opacity = (0.018 + state.high * 0.06 + (state.pulseAge < 3 ? state.pulseStrength * 0.075 : 0)) * state.ritual * (1 - state.shutdown);
  });

  upperLight.intensity = 0.55 * state.ritual * (1 - state.shutdown) + state.high * 1.6 + state.phaseTransition * 1.8;
  hemi.intensity = 0.035 + state.ritual * 0.115;
  const bloomProfiles = [0.52,0.64,0.58,0.49,0.68,0.60,0.50,0.72,0.38];
  bloom.strength = ((isMobile ? 0.42 : bloomProfiles[state.tideIndex]) + state.energy * 0.54 + state.archiveOpen * 0.05 + state.phaseTransition * 0.65) * (0.22 + state.lightLevel * 0.78) * (1 - smoothstep(0.78, 1.0, state.shutdown) * 0.72);
  bloom.radius = 0.64 + state.high * 0.10 + state.phaseTransition * 0.15 + state.shutdown * 0.08;
  const memoryProfile = state.tideIndex === 5 ? 0.905 : state.tideIndex === 7 ? 0.925 : state.tideIndex === 8 ? 0.94 : 0.86;
  afterimage.uniforms.damp.value = state.shutdown > 0.45 ? lerp(0.90, 0.982, smoothstep(0.45, 0.9, state.shutdown)) : memoryProfile + state.high * 0.018 + state.phaseTransition * 0.035;
  const exposureProfiles = [0.86,0.80,0.76,0.68,0.88,0.80,0.70,0.74,0.54];
  renderer.toneMappingExposure = (0.025 + state.lightLevel * (exposureProfiles[state.tideIndex] + state.energy * 0.10 + state.phaseTransition * 0.12)) * (1 - smoothstep(0.76, 1.0, state.shutdown) * 0.96);

  const finalBlack = smoothstep(0.72, 1.0, state.shutdown);
  const blackout = Math.max(1 - state.lightLevel, finalBlack);
  document.documentElement.style.setProperty('--blackout', blackout.toFixed(4));
}

function updateHover() {
  if (isCoarse || state.dragging || !state.calibrated || state.ending) return;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObject(core, false).length > 0;
  if (hit !== state.coreHovered) {
    state.coreHovered = hit;
    ui.cursor.classList.toggle('active', hit);
  }
}

function updateTransport() {
  const duration = resolveVisualScoreDuration();
  const current = state.audioReady ? ui.audio.currentTime : (state.activeSeconds % duration);
  ui.timeNow.textContent = formatTime(current);
  ui.timeTotal.textContent = formatTime(duration);
  const progress = duration > 0 ? clamp(current / duration, 0, 1) : 0;
  document.documentElement.style.setProperty('--progress', `${(progress * 100).toFixed(3)}%`);
  ui.index.textContent = `09–${String(Math.floor(progress * 9999)).padStart(4, '0')}`;
}

function advanceFrameState(dt, elapsed) {
  state.activeSeconds += dt;
  globals.time.value = elapsed;

  if (state.previewMode === 'main') {
    state.ritual = 1; state.ignite = 1; state.lightLevel = 1;
    globals.ritual.value = 1; globals.ignite.value = 1;
  } else if (state.previewMode === 'ending') {
    state.ritual = 1; state.ignite = 1; state.lightLevel = 1; state.shutdown = Math.max(state.shutdown, 0.68);
    globals.ritual.value = 1; globals.ignite.value = 1; globals.shutdown.value = state.shutdown;
  }

  updateAudio(dt, elapsed);
  updateCeremony(dt);
  updateEnding();
  updateTide(elapsed, dt);
  updateCamera(dt);
  updateCore(dt, elapsed);
  updateResonators(dt, elapsed);
  updatePulse(dt);
  updateWorld(dt, elapsed);
  updateHover();
  updateTransport();

}

function renderFrame(dt, elapsed) {
  advanceFrameState(dt, elapsed);
  composer.render(dt);
  frameRenderCount++;
}

function animate(timestamp) {
  animationFrameId = null;
  if (runtimePaused || deterministicCaptureActive || deterministicStepActive) return;
  timer.update(timestamp);
  const dt = clamp(timer.getDelta(), 0, 0.05);
  const elapsed = timer.getElapsed();
  renderFrame(dt, elapsed);
  recordRenderedFrame(timestamp);
  requestNextFrame();
}

function resize() {
  const width = innerWidth;
  const height = innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  const ratio = Math.min(devicePixelRatio, isMobile ? 1.15 : 1.6);
  renderer.setPixelRatio(ratio);
  renderer.setSize(width, height);
  composer.setSize(width, height);
  globals.pixelRatio.value = ratio;
  globals.resolution.value.set(width * ratio, height * ratio);
}
window.addEventListener('resize', resize);

function applyPreview(mode, section) {
  if (!['opening', 'main', 'ending'].includes(mode)) {
    throw new TypeError(`Unknown Ninth Tide preview mode: ${String(mode)}`);
  }
  if (!Number.isInteger(section) || section < 0 || section > 8) {
    throw new RangeError(`Ninth Tide preview section must be an integer from 0 through 8; received ${String(section)}.`);
  }

  state.previewMode = mode;
  state.previewSection = section;
  state.tideIndex = section;
  state.transitionFrom = section;
  state.pendingTide = -1;
  state.phaseLocal = 0;
  state.phaseTransition = 0;
  state.transitionClock = 99;
  state.transitionSwitched = false;
  state.shutdown = 0;
  state.ending = false;
  state.ended = false;
  state.endingCue = 0;
  state.ceremonyCue = 0;
  state.archiveOpen = 0;
  globals.section.value = section;
  globals.sectionLocal.value = 0;
  globals.phaseTransition.value = 0;
  globals.shutdown.value = 0;
  lastTide = -1;
  state.entered = true;
  state.calibrated = mode !== 'opening';
  state.ceremonyTime = mode === 'opening' ? 5.75 : 99;
  state.ritual = mode === 'opening' ? 0.73 : 1;
  state.ignite = mode === 'opening' ? 0.44 : 1;
  state.lightLevel = mode === 'opening' ? 0.72 : 1;
  state.archiveOpenTarget = mode === 'main' ? 0.76 : 0.45;
  state.diveTarget = mode === 'main' ? 0.28 : 0.2;
  globals.ritual.value = state.ritual;
  globals.ignite.value = state.ignite;
  document.body.classList.add('entered');
  document.body.classList.toggle('calibrated', state.calibrated);
  document.body.classList.toggle('ending', mode === 'ending');
  document.body.classList.remove('ended');
  document.documentElement.style.setProperty('--blackout', mode === 'opening' ? '0.28' : '0');
  const meta = tideMeta[section];
  ui.phaseNumber.textContent = meta[0];
  ui.phaseName.textContent = meta[1];
  ui.phaseSub.textContent = meta[2];
  ui.sideTicks.forEach((tick, index) => tick.classList.toggle('active', index === section));
  triggerPulse(new THREE.Vector2(0, 0), mode === 'ending' ? 0.45 : 1.15, 0.34, false);
}

const baselineMaterialScalarKeys = Object.freeze([
  'opacity', 'emissiveIntensity', 'roughness', 'metalness', 'linewidth', 'size', 'rotation', 'alphaTest'
]);
const baselineMaterialColorKeys = Object.freeze(['color', 'emissive', 'specular']);

function captureValue(value) {
  if (value === null || ['number', 'string', 'boolean'].includes(typeof value)) {
    return Object.freeze({ kind: 'primitive', value });
  }
  if (value instanceof THREE.Color) {
    return Object.freeze({ kind: 'color', value: Object.freeze([value.r, value.g, value.b]) });
  }
  if (value instanceof THREE.Vector2 || value instanceof THREE.Vector3 || value instanceof THREE.Vector4) {
    return Object.freeze({ kind: 'vector', value: Object.freeze(value.toArray()) });
  }
  if (value instanceof THREE.Quaternion) {
    return Object.freeze({ kind: 'quaternion', value: Object.freeze(value.toArray()) });
  }
  if (value instanceof THREE.Euler) {
    return Object.freeze({ kind: 'euler', value: Object.freeze([value.x, value.y, value.z, value.order]) });
  }
  return Object.freeze({ kind: 'reference', value });
}

function restoreValue(target, key, snapshot, label) {
  if (snapshot.kind === 'primitive') {
    target[key] = snapshot.value;
  } else if (snapshot.kind === 'color') {
    target[key].setRGB(...snapshot.value);
  } else if (snapshot.kind === 'vector' || snapshot.kind === 'quaternion') {
    target[key].fromArray(snapshot.value);
  } else if (snapshot.kind === 'euler') {
    target[key].set(...snapshot.value);
  } else if (target[key] !== snapshot.value) {
    throw new Error(`Ninth Tide deterministic baseline reference changed: ${label}.`);
  }
}

function captureRecord(record) {
  return Object.freeze(Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, captureValue(value)])
  ));
}

function restoreRecord(record, snapshot, label) {
  const keys = Object.keys(record).sort();
  const baselineKeys = Object.keys(snapshot).sort();
  if (keys.length !== baselineKeys.length || keys.some((key, index) => key !== baselineKeys[index])) {
    throw new Error(`Ninth Tide deterministic ${label} shape changed.`);
  }
  for (const key of baselineKeys) restoreValue(record, key, snapshot[key], `${label}.${key}`);
}

function captureMaterial(material) {
  const scalars = {};
  const colors = {};
  for (const key of baselineMaterialScalarKeys) {
    if (typeof material[key] === 'number') scalars[key] = material[key];
  }
  for (const key of baselineMaterialColorKeys) {
    if (material[key] instanceof THREE.Color) colors[key] = Object.freeze(material[key].toArray());
  }
  return Object.freeze({
    material,
    scalars: Object.freeze(scalars),
    colors: Object.freeze(colors),
    uniforms: material.uniforms ? captureRecord(
      Object.fromEntries(Object.entries(material.uniforms).map(([key, uniform]) => [key, uniform.value]))
    ) : null
  });
}

function restoreMaterial(snapshot) {
  for (const [key, value] of Object.entries(snapshot.scalars)) snapshot.material[key] = value;
  for (const [key, value] of Object.entries(snapshot.colors)) snapshot.material[key].fromArray(value);
  if (snapshot.uniforms) {
    const values = Object.fromEntries(
      Object.entries(snapshot.material.uniforms).map(([key, uniform]) => [key, uniform.value])
    );
    restoreRecord(values, snapshot.uniforms, `material ${snapshot.material.uuid} uniforms`);
    for (const [key, value] of Object.entries(values)) snapshot.material.uniforms[key].value = value;
  }
}

function captureSceneBaseline() {
  const objects = [];
  const materials = new Map();
  const geometries = new Map();
  const captureObject = (object) => {
    objects.push(Object.freeze({
      object,
      position: Object.freeze(object.position.toArray()),
      quaternion: Object.freeze(object.quaternion.toArray()),
      scale: Object.freeze(object.scale.toArray()),
      visible: object.visible,
      intensity: typeof object.intensity === 'number' ? object.intensity : null,
      color: object.color instanceof THREE.Color ? Object.freeze(object.color.toArray()) : null,
      instanceMatrix: object.isInstancedMesh ? new object.instanceMatrix.array.constructor(object.instanceMatrix.array) : null,
      instanceColor: object.isInstancedMesh && object.instanceColor
        ? new object.instanceColor.array.constructor(object.instanceColor.array)
        : null
    }));
    const objectMaterials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    for (const material of objectMaterials) {
      if (!materials.has(material.uuid)) materials.set(material.uuid, captureMaterial(material));
    }
    if (object.geometry && !geometries.has(object.geometry.uuid)) {
      const attributes = Object.fromEntries(Object.entries(object.geometry.attributes).map(([name, attribute]) => [
        name,
        Object.freeze({ attribute, array: new attribute.array.constructor(attribute.array) })
      ]));
      geometries.set(object.geometry.uuid, Object.freeze({ geometry: object.geometry, attributes: Object.freeze(attributes) }));
    }
  };
  scene.traverse(captureObject);
  captureObject(camera);
  return Object.freeze({
    objects: Object.freeze(objects),
    materials: Object.freeze([...materials.values()]),
    geometries: Object.freeze([...geometries.values()])
  });
}

function restoreSceneBaseline(snapshot) {
  for (const entry of snapshot.objects) {
    entry.object.position.fromArray(entry.position);
    entry.object.quaternion.fromArray(entry.quaternion);
    entry.object.scale.fromArray(entry.scale);
    entry.object.visible = entry.visible;
    if (entry.intensity !== null) entry.object.intensity = entry.intensity;
    if (entry.color) entry.object.color.fromArray(entry.color);
    if (entry.instanceMatrix) {
      entry.object.instanceMatrix.array.set(entry.instanceMatrix);
      entry.object.instanceMatrix.needsUpdate = true;
    }
    if (entry.instanceColor) {
      if (!entry.object.instanceColor || entry.object.instanceColor.array.length !== entry.instanceColor.length) {
        throw new Error(`Ninth Tide deterministic instance color changed: ${entry.object.uuid}.`);
      }
      entry.object.instanceColor.array.set(entry.instanceColor);
      entry.object.instanceColor.needsUpdate = true;
    }
    entry.object.updateMatrix();
  }
  for (const entry of snapshot.materials) restoreMaterial(entry);
  for (const entry of snapshot.geometries) {
    for (const [name, attributeSnapshot] of Object.entries(entry.attributes)) {
      const attribute = entry.geometry.getAttribute(name);
      if (attribute !== attributeSnapshot.attribute || attribute.array.length !== attributeSnapshot.array.length) {
        throw new Error(`Ninth Tide deterministic geometry attribute changed: ${entry.geometry.uuid}.${name}.`);
      }
      attribute.array.set(attributeSnapshot.array);
      attribute.needsUpdate = true;
    }
  }
  scene.updateMatrixWorld(true);
  camera.updateMatrixWorld(true);
}

function captureDomBaseline() {
  const elements = [...new Set([
    ...Object.values(ui).flatMap((value) => Array.isArray(value) ? value : [value]),
    ...ui.sideTicks
  ])];
  return Object.freeze({
    rootClassName: document.documentElement.className,
    rootStyle: document.documentElement.getAttribute('style'),
    bodyClassName: document.body.className,
    bodyStyle: document.body.getAttribute('style'),
    elements: Object.freeze(elements.map((element) => Object.freeze({
      element,
      className: element.className,
      style: element.getAttribute('style'),
      textContent: element instanceof HTMLAudioElement
        || element instanceof HTMLInputElement
        || element.children.length > 0
        ? null
        : element.textContent,
      hidden: 'hidden' in element ? element.hidden : null,
      disabled: 'disabled' in element ? element.disabled : null
    })))
  });
}

function restoreAttribute(element, name, value) {
  if (value === null) element.removeAttribute(name); else element.setAttribute(name, value);
}

function restoreDomBaseline(snapshot) {
  document.documentElement.className = snapshot.rootClassName;
  restoreAttribute(document.documentElement, 'style', snapshot.rootStyle);
  document.body.className = snapshot.bodyClassName;
  restoreAttribute(document.body, 'style', snapshot.bodyStyle);
  for (const entry of snapshot.elements) {
    entry.element.className = entry.className;
    restoreAttribute(entry.element, 'style', entry.style);
    if (entry.textContent !== null) entry.element.textContent = entry.textContent;
    if (entry.hidden !== null) entry.element.hidden = entry.hidden;
    if (entry.disabled !== null) entry.element.disabled = entry.disabled;
  }
}

function assertAfterimageTargets() {
  if (!(afterimage._textureComp instanceof THREE.WebGLRenderTarget)
    || !(afterimage._textureOld instanceof THREE.WebGLRenderTarget)
    || afterimage._textureComp === afterimage._textureOld) {
    throw new Error('Ninth Tide deterministic capture requires two distinct Afterimage render targets.');
  }
}

function clearRenderTarget(target) {
  if (!(target instanceof THREE.WebGLRenderTarget)) {
    throw new Error('Ninth Tide deterministic capture encountered an invalid render target.');
  }
  renderer.setRenderTarget(target);
  renderer.clear(true, true, true);
}

function resetPostprocessHistory(baseline) {
  assertAfterimageTargets();
  const previousTarget = renderer.getRenderTarget();
  const clearColor = renderer.getClearColor(new THREE.Color()).clone();
  const clearAlpha = renderer.getClearAlpha();
  renderer.setClearColor(0x000000, 0);
  composer.readBuffer = baseline.composerReadBuffer;
  composer.writeBuffer = baseline.composerWriteBuffer;
  const targets = new Set([
    composer.renderTarget1,
    composer.renderTarget2,
    afterimage._textureComp,
    afterimage._textureOld,
    bloom.renderTargetBright,
    ...bloom.renderTargetsHorizontal,
    ...bloom.renderTargetsVertical
  ]);
  for (const target of targets) clearRenderTarget(target);
  renderer.setClearColor(clearColor, clearAlpha);
  renderer.setRenderTarget(previousTarget);
}

function toHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256(bytes) {
  if (!crypto.subtle || typeof crypto.subtle.digest !== 'function') {
    throw new Error('Ninth Tide deterministic capture requires crypto.subtle.digest().');
  }
  return toHex(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)));
}

async function readCanonicalFramebuffer(gl) {
  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
    throw new Error('Ninth Tide deterministic capture requires a non-empty drawing buffer.');
  }
  const bottomLeft = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, bottomLeft);
  if (gl.getError() !== gl.NO_ERROR) throw new Error('Ninth Tide framebuffer readPixels failed.');
  const canonical = new Uint8Array(14 + bottomLeft.length);
  canonical.set(new TextEncoder().encode('rgba8\0'), 0);
  const header = new DataView(canonical.buffer, 0, 14);
  header.setUint32(6, width, false);
  header.setUint32(10, height, false);
  const rowBytes = width * 4;
  for (let topRow = 0; topRow < height; topRow++) {
    const sourceRow = height - 1 - topRow;
    canonical.set(bottomLeft.subarray(sourceRow * rowBytes, (sourceRow + 1) * rowBytes), 14 + topRow * rowBytes);
  }
  return { width, height, hash: await sha256(canonical) };
}

function inspectRenderer(gl) {
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) throw new Error('Ninth Tide deterministic capture requires WEBGL_debug_renderer_info.');
  const raw = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  const contextAttributes = gl.getContextAttributes();
  if (typeof raw !== 'string' || raw.length === 0 || !contextAttributes) {
    throw new Error('Ninth Tide deterministic capture could not audit the WebGL renderer.');
  }
  return { raw, debugInfoAvailable: true, contextAttributes: { ...contextAttributes } };
}

// URL/forced preview is the only capture mode. Live embedded preview commands keep the runtime loop.
if (deterministicCaptureRequested) {
  assertAfterimageTargets();
  if (core.geometry.boundingSphere === null) core.geometry.computeBoundingSphere();
}
const deterministicBaseline = deterministicCaptureRequested ? Object.freeze({
  state: captureRecord(state),
  globals: captureRecord(Object.fromEntries(Object.entries(globals).map(([key, uniform]) => [key, uniform.value]))),
  scene: captureSceneBaseline(),
  dom: captureDomBaseline(),
  pointer: Object.freeze(pointer.toArray()),
  pointerSmooth: Object.freeze(pointerSmooth.toArray()),
  spectrum: new Uint8Array(spectrumBytes),
  randomState: random.getState(),
  lastTide,
  frameStats: Object.freeze({ ...frameStats }),
  audioContext,
  analyser,
  frequencyData,
  timeData,
  rendererTarget: renderer.getRenderTarget(),
  rendererExposure: renderer.toneMappingExposure,
  fogDensity: scene.fog.density,
  bloomStrength: bloom.strength,
  bloomRadius: bloom.radius,
  bloomThreshold: bloom.threshold,
  afterimageDamp: afterimage.uniforms.damp.value,
  composerReadBuffer: composer.readBuffer,
  composerWriteBuffer: composer.writeBuffer,
  afterimageTextureComp: afterimage._textureComp,
  afterimageTextureOld: afterimage._textureOld,
  drawingBufferWidth: renderer.getContext().drawingBufferWidth,
  drawingBufferHeight: renderer.getContext().drawingBufferHeight
}) : null;

function restoreDeterministicBaseline() {
  if (!deterministicBaseline) throw new Error('Ninth Tide deterministic baseline is unavailable.');
  clearTimeout(showMessage.timer);
  showMessage.timer = undefined;
  if (audioContext !== deterministicBaseline.audioContext
    || analyser !== deterministicBaseline.analyser
    || frequencyData !== deterministicBaseline.frequencyData
    || timeData !== deterministicBaseline.timeData) {
    throw new Error('Ninth Tide audio graph changed after deterministic baseline capture.');
  }
  const gl = renderer.getContext();
  if (gl.drawingBufferWidth !== deterministicBaseline.drawingBufferWidth
    || gl.drawingBufferHeight !== deterministicBaseline.drawingBufferHeight) {
    throw new Error('Ninth Tide deterministic capture viewport changed after baseline capture.');
  }
  ui.audio.pause();
  restoreRecord(state, deterministicBaseline.state, 'state');
  const globalValues = Object.fromEntries(Object.entries(globals).map(([key, uniform]) => [key, uniform.value]));
  restoreRecord(globalValues, deterministicBaseline.globals, 'globals');
  for (const [key, value] of Object.entries(globalValues)) globals[key].value = value;
  restoreSceneBaseline(deterministicBaseline.scene);
  restoreDomBaseline(deterministicBaseline.dom);
  pointer.fromArray(deterministicBaseline.pointer);
  pointerSmooth.fromArray(deterministicBaseline.pointerSmooth);
  spectrumBytes.set(deterministicBaseline.spectrum);
  spectrumTexture.needsUpdate = true;
  resetOnsetDetector();
  random.setState(deterministicBaseline.randomState);
  lastTide = deterministicBaseline.lastTide;
  Object.assign(frameStats, deterministicBaseline.frameStats);
  frameStats.sampleStartedAt = 0;
  frameStats.sampleFrames = 0;
  scene.fog.density = deterministicBaseline.fogDensity;
  bloom.strength = deterministicBaseline.bloomStrength;
  bloom.radius = deterministicBaseline.bloomRadius;
  bloom.threshold = deterministicBaseline.bloomThreshold;
  afterimage.uniforms.damp.value = deterministicBaseline.afterimageDamp;
  afterimage._textureComp = deterministicBaseline.afterimageTextureComp;
  afterimage._textureOld = deterministicBaseline.afterimageTextureOld;
  renderer.toneMappingExposure = deterministicBaseline.rendererExposure;
  renderer.setRenderTarget(deterministicBaseline.rendererTarget);
  resetPostprocessHistory(deterministicBaseline);
}

function canonicalStateForDigest(mode, section, timestampMs) {
  return {
    mode,
    section,
    timestampMs,
    state: {
      ritual: state.ritual,
      ignite: state.ignite,
      lightLevel: state.lightLevel,
      shutdown: state.shutdown,
      archiveOpen: state.archiveOpen,
      pulseAge: state.pulseAge,
      pulseStrength: state.pulseStrength,
      low: state.low,
      mid: state.mid,
      high: state.high,
      rms: state.rms,
      energy: state.energy,
      transient: state.transient,
      tideIndex: state.tideIndex,
      tideFloat: state.tideFloat,
      phaseLocal: state.phaseLocal,
      phaseTransition: state.phaseTransition,
      dive: state.dive,
      yaw: state.yaw,
      pitch: state.pitch,
      activeSeconds: state.activeSeconds,
      syntheticPhase: state.syntheticPhase
    },
    globals: {
      time: globals.time.value,
      section: globals.section.value,
      sectionLocal: globals.sectionLocal.value,
      tide: globals.tide.value,
      open: globals.open.value,
      pulseAge: globals.pulseAge.value,
      pulseStrength: globals.pulseStrength.value
    },
    camera: {
      position: camera.position.toArray(),
      quaternion: camera.quaternion.toArray()
    },
    spectrum: [...spectrumBytes]
  };
}

async function digestCanonicalState(mode, section, timestampMs) {
  const bytes = new TextEncoder().encode(JSON.stringify(canonicalStateForDigest(mode, section, timestampMs)));
  return sha256(bytes);
}

function validateDeterministicStepRequest(request) {
  if (!hasExactKeys(request, ['mode', 'section', 'timestampMs'])) {
    throw new Error('Ninth Tide deterministic step requires exactly mode, section, and timestampMs.');
  }
  if (!['opening', 'main', 'ending'].includes(request.mode)) {
    throw new TypeError(`Unknown Ninth Tide deterministic mode: ${String(request.mode)}.`);
  }
  if (!Number.isInteger(request.section) || request.section < 0 || request.section > 8) {
    throw new RangeError(`Ninth Tide deterministic section must be an integer from 0 through 8; received ${String(request.section)}.`);
  }
  if (typeof request.timestampMs !== 'number' || !Number.isFinite(request.timestampMs) || request.timestampMs < 0) {
    throw new RangeError(`Ninth Tide deterministic timestampMs must be finite and non-negative; received ${String(request.timestampMs)}.`);
  }
}

async function stepDeterministicPreview(request) {
  if (deterministicStepActive) throw new Error('Ninth Tide deterministic step is already running.');
  validateDeterministicStepRequest(request);
  deterministicStepActive = true;
  try {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    restoreDeterministicBaseline();
    applyPreview(request.mode, request.section);
    if (request.mode === 'main') {
      const dt = 1 / 60;
      const targetElapsed = request.timestampMs / 1000;
      for (let step = 0; step < deterministicMainSettleSteps; step++) {
        advanceFrameState(
          dt,
          targetElapsed - (deterministicMainSettleSteps - step) * dt
        );
      }
    }
    const beforeFrameRenders = frameRenderCount;
    renderer.info.reset();
    renderer.setRenderTarget(null);
    renderFrame(1 / 60, request.timestampMs / 1000);
    const frameRenders = frameRenderCount - beforeFrameRenders;
    if (frameRenders !== 1) {
      throw new Error(`Ninth Tide deterministic step rendered ${frameRenders} top-level frames.`);
    }
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
      throw new Error('Ninth Tide deterministic step queued an animation frame.');
    }
    const gl = renderer.getContext();
    const rendererAudit = inspectRenderer(gl);
    gl.finish();
    const framebuffer = await readCanonicalFramebuffer(gl);
    const stateDigest = await digestCanonicalState(request.mode, request.section, request.timestampMs);
    renderer.setRenderTarget(deterministicBaseline.rendererTarget);
    const phase = request.mode === 'opening'
      ? tideMeta[0][0]
      : request.mode === 'ending'
        ? tideMeta[8][0]
        : tideMeta[request.section][0];
    return {
      mode: request.mode,
      section: request.section,
      timestampMs: request.timestampMs,
      frameRenders,
      queuedAnimationFrames: animationFrameId === null ? 0 : 1,
      stateDigest,
      framebuffer,
      renderer: rendererAudit,
      chapter: { mode: request.mode, section: request.section, phase },
      chapterNumber: request.section + 1
    };
  } finally {
    if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    renderer.setRenderTarget(deterministicBaseline.rendererTarget);
    deterministicStepActive = false;
  }
}

function hitTestDeterministicPreview(request) {
  if (!hasExactKeys(request, ['clientX', 'clientY'])
    || typeof request.clientX !== 'number'
    || !Number.isFinite(request.clientX)
    || typeof request.clientY !== 'number'
    || !Number.isFinite(request.clientY)) {
    throw new Error('Ninth Tide hit test requires finite clientX and clientY values.');
  }
  const rect = renderer.domElement.getBoundingClientRect();
  if (!(rect.width > 0) || !(rect.height > 0)) {
    throw new Error('Ninth Tide hit test requires a visible renderer canvas.');
  }
  const point = new THREE.Vector2(
    (request.clientX - rect.left) / rect.width * 2 - 1,
    -((request.clientY - rect.top) / rect.height) * 2 + 1
  );
  const queryRaycaster = new THREE.Raycaster();
  queryRaycaster.setFromCamera(point, camera);
  return queryRaycaster.intersectObject(core, false).length > 0;
}

// Preview modes are used only for still capture/testing.
if (deterministicCaptureRequested) {
  deterministicCaptureActive = true;
  const mode = forcedPreview ?? previewParams.get('preview');
  let section;
  const forcedSection = window.__NINTH_TIDE_PREVIEW_SECTION__;
  if (forcedSection !== undefined) {
    if (!Number.isInteger(forcedSection) || forcedSection < 0 || forcedSection > 8) {
      throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(forcedSection)}.`);
    }
    section = forcedSection;
  } else if (previewParams.has('section')) {
    const rawSection = previewParams.get('section');
    if (!/^[0-8]$/.test(rawSection)) {
      throw new RangeError(`Invalid explicit Ninth Tide preview section: ${String(rawSection)}.`);
    }
    section = Number(rawSection);
  } else {
    section = mode === 'ending' ? 8 : mode === 'opening' ? 0 : defaultMainPreviewSection;
  }
  applyPreview(mode, section);
  window.__NINTH_TIDE_STEP__ = stepDeterministicPreview;
  window.__NINTH_TIDE_HIT_TEST__ = hitTestDeterministicPreview;
}

initializeRuntimeControl();
resetStatsSample();
if (!deterministicCaptureRequested) requestNextFrame();

window.addEventListener('beforeunload', () => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('message', handleBridgeMessage);
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  timer.dispose();
  renderer.dispose();
});
