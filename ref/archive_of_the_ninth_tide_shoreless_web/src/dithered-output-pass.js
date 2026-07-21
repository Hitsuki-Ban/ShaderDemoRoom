import {
  ACESFilmicToneMapping,
  AgXToneMapping,
  CineonToneMapping,
  ColorManagement,
  CustomToneMapping,
  LinearToneMapping,
  NeutralToneMapping,
  RawShaderMaterial,
  ReinhardToneMapping,
  SRGBTransfer,
  UniformsUtils,
} from 'three';
import { FullScreenQuad, Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import colorspaceParsFragment from 'three/src/renderers/shaders/ShaderChunk/colorspace_pars_fragment.glsl.js';
import tonemappingParsFragment from 'three/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js';

const TONE_MAPPING_DEFINES = new Map([
  [LinearToneMapping, 'LINEAR_TONE_MAPPING'],
  [ReinhardToneMapping, 'REINHARD_TONE_MAPPING'],
  [CineonToneMapping, 'CINEON_TONE_MAPPING'],
  [ACESFilmicToneMapping, 'ACES_FILMIC_TONE_MAPPING'],
  [AgXToneMapping, 'AGX_TONE_MAPPING'],
  [NeutralToneMapping, 'NEUTRAL_TONE_MAPPING'],
  [CustomToneMapping, 'CUSTOM_TONE_MAPPING'],
]);

const DITHERED_OUTPUT_SHADER = {
  name: 'DitheredOutputShader',
  uniforms: {
    tDiffuse: { value: null },
    toneMappingExposure: { value: 1 },
    ditherSeed: { value: null },
  },
  vertexShader: /* glsl */ `
    precision highp float;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform float ditherSeed;

    ${tonemappingParsFragment}
    ${colorspaceParsFragment}

    varying vec2 vUv;

    float gradientNoise(vec2 pixel) {
      return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715))));
    }

    void main() {
      gl_FragColor = texture2D(tDiffuse, vUv);

      #ifdef LINEAR_TONE_MAPPING
        gl_FragColor.rgb = LinearToneMapping(gl_FragColor.rgb);
      #elif defined(REINHARD_TONE_MAPPING)
        gl_FragColor.rgb = ReinhardToneMapping(gl_FragColor.rgb);
      #elif defined(CINEON_TONE_MAPPING)
        gl_FragColor.rgb = CineonToneMapping(gl_FragColor.rgb);
      #elif defined(ACES_FILMIC_TONE_MAPPING)
        gl_FragColor.rgb = ACESFilmicToneMapping(gl_FragColor.rgb);
      #elif defined(AGX_TONE_MAPPING)
        gl_FragColor.rgb = AgXToneMapping(gl_FragColor.rgb);
      #elif defined(NEUTRAL_TONE_MAPPING)
        gl_FragColor.rgb = NeutralToneMapping(gl_FragColor.rgb);
      #elif defined(CUSTOM_TONE_MAPPING)
        gl_FragColor.rgb = CustomToneMapping(gl_FragColor.rgb);
      #endif

      #ifdef SRGB_TRANSFER
        gl_FragColor = sRGBTransferOETF(gl_FragColor);
      #endif

      vec2 ditherCoordinate = gl_FragCoord.xy + vec2(ditherSeed * 5.588238, 0.0);
      float ign = gradientNoise(ditherCoordinate);
      gl_FragColor.rgb = clamp(
        gl_FragColor.rgb + vec3((ign - 0.5) / 255.0),
        vec3(0.0),
        vec3(1.0)
      );
    }
  `,
};

function assertThreeOutputPassApi() {
  const toneMappings = [...TONE_MAPPING_DEFINES.keys()];
  if (
    toneMappings.some((toneMapping) => !Number.isInteger(toneMapping))
    || new Set(toneMappings).size !== toneMappings.length
    || typeof SRGBTransfer !== 'string'
    || SRGBTransfer.length === 0
    || typeof ColorManagement?.getTransfer !== 'function'
    || typeof UniformsUtils?.clone !== 'function'
    || typeof RawShaderMaterial !== 'function'
    || typeof FullScreenQuad !== 'function'
  ) {
    throw new Error('DitheredOutputPass requires the three r184 OutputPass API.');
  }
}

function assertSeed(seed) {
  if (!Number.isFinite(seed) || !Number.isInteger(seed) || seed < 0 || seed > 255) {
    throw new TypeError('DitheredOutputPass seed must be an integer from 0 through 255.');
  }
}

assertThreeOutputPassApi();

class DitheredOutputPass extends Pass {
  constructor(seed) {
    super();
    assertSeed(seed);

    this.isDitheredOutputPass = true;
    this.isOutputPass = true;
    this.uniforms = UniformsUtils.clone(DITHERED_OUTPUT_SHADER.uniforms);
    this.uniforms.ditherSeed.value = seed;
    this.material = new RawShaderMaterial({
      name: DITHERED_OUTPUT_SHADER.name,
      uniforms: this.uniforms,
      vertexShader: DITHERED_OUTPUT_SHADER.vertexShader,
      fragmentShader: DITHERED_OUTPUT_SHADER.fragmentShader,
    });

    this._fsQuad = new FullScreenQuad(this.material);
    this._outputColorSpace = null;
    this._toneMapping = null;
  }

  setSeed(seed) {
    assertSeed(seed);
    this.uniforms.ditherSeed.value = seed;
    return this;
  }

  render(renderer, writeBuffer, readBuffer) {
    this.uniforms.tDiffuse.value = readBuffer.texture;
    this.uniforms.toneMappingExposure.value = renderer.toneMappingExposure;

    if (this._outputColorSpace !== renderer.outputColorSpace || this._toneMapping !== renderer.toneMapping) {
      this._outputColorSpace = renderer.outputColorSpace;
      this._toneMapping = renderer.toneMapping;
      this.material.defines = {};

      if (ColorManagement.getTransfer(this._outputColorSpace) === SRGBTransfer) {
        this.material.defines.SRGB_TRANSFER = '';
      }

      const toneMappingDefine = TONE_MAPPING_DEFINES.get(this._toneMapping);
      if (toneMappingDefine !== undefined) this.material.defines[toneMappingDefine] = '';

      this.material.needsUpdate = true;
    }

    if (this.renderToScreen === true) {
      renderer.setRenderTarget(null);
      this._fsQuad.render(renderer);
      return;
    }

    renderer.setRenderTarget(writeBuffer);
    if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    this._fsQuad.render(renderer);
  }

  dispose() {
    this.material.dispose();
    this._fsQuad.dispose();
  }
}

export { DitheredOutputPass };
