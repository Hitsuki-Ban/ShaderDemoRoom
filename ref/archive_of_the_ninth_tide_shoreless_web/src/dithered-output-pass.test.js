import { describe, expect, it, vi } from 'vitest';
import {
  ACESFilmicToneMapping,
  AgXToneMapping,
  CineonToneMapping,
  CustomToneMapping,
  LinearSRGBColorSpace,
  LinearToneMapping,
  NeutralToneMapping,
  RawShaderMaterial,
  ReinhardToneMapping,
  SRGBColorSpace,
} from 'three';
import { DitheredOutputPass } from './dithered-output-pass.js';

const TONE_MAPPING_CASES = [
  [LinearToneMapping, 'LINEAR_TONE_MAPPING'],
  [ReinhardToneMapping, 'REINHARD_TONE_MAPPING'],
  [CineonToneMapping, 'CINEON_TONE_MAPPING'],
  [ACESFilmicToneMapping, 'ACES_FILMIC_TONE_MAPPING'],
  [AgXToneMapping, 'AGX_TONE_MAPPING'],
  [NeutralToneMapping, 'NEUTRAL_TONE_MAPPING'],
  [CustomToneMapping, 'CUSTOM_TONE_MAPPING'],
];

function createRenderer({
  outputColorSpace = SRGBColorSpace,
  toneMapping = ACESFilmicToneMapping,
  toneMappingExposure = 0.05,
} = {}) {
  return {
    outputColorSpace,
    toneMapping,
    toneMappingExposure,
    autoClearColor: true,
    autoClearDepth: false,
    autoClearStencil: true,
    setRenderTarget: vi.fn(),
    clear: vi.fn(),
    render: vi.fn(),
  };
}

describe('DitheredOutputPass seed contract', () => {
  it('requires a finite uint8 seed at construction', () => {
    for (const invalidSeed of [undefined, null, '0', NaN, Infinity, -Infinity, -1, 0.5, 256]) {
      expect(() => new DitheredOutputPass(invalidSeed)).toThrowError(
        'DitheredOutputPass seed must be an integer from 0 through 255.',
      );
    }

    expect(new DitheredOutputPass(0).uniforms.ditherSeed.value).toBe(0);
    expect(new DitheredOutputPass(255).uniforms.ditherSeed.value).toBe(255);
  });

  it('only changes the seed through an explicit validated setSeed call', () => {
    const pass = new DitheredOutputPass(17);

    expect(pass.setSeed(231)).toBe(pass);
    expect(pass.uniforms.ditherSeed.value).toBe(231);
    expect(() => pass.setSeed(232.5)).toThrowError(TypeError);
    expect(pass.uniforms.ditherSeed.value).toBe(231);

    const renderer = createRenderer();
    pass.render(renderer, {}, { texture: {} });
    pass.render(renderer, {}, { texture: {} });
    expect(pass.uniforms.ditherSeed.value).toBe(231);
  });
});

describe('DitheredOutputPass shader contract', () => {
  it('owns a RawShaderMaterial that tone maps, applies sRGB OETF, then dithers RGB only', () => {
    const pass = new DitheredOutputPass(0);
    const shader = pass.material.fragmentShader;

    expect(pass).toMatchObject({
      isPass: true,
      isOutputPass: true,
      isDitheredOutputPass: true,
      needsSwap: true,
    });
    expect(pass.material).toBeInstanceOf(RawShaderMaterial);
    expect(shader).toContain('vec3 ACESFilmicToneMapping');
    expect(shader).toContain('vec4 sRGBTransferOETF');
    expect(shader).not.toContain('#include <tonemapping_pars_fragment>');
    expect(shader).not.toContain('#include <colorspace_pars_fragment>');

    const toneMappingIndex = shader.indexOf('gl_FragColor.rgb = ACESFilmicToneMapping');
    const srgbIndex = shader.indexOf('gl_FragColor = sRGBTransferOETF');
    const ditherIndex = shader.indexOf('gl_FragColor.rgb = clamp(');
    expect(toneMappingIndex).toBeGreaterThan(-1);
    expect(srgbIndex).toBeGreaterThan(toneMappingIndex);
    expect(ditherIndex).toBeGreaterThan(srgbIndex);

    expect(shader).toContain('gradientNoise(ditherCoordinate)');
    expect(shader).toContain('gl_FragCoord.xy');
    expect(shader).toContain('vec3((ign - 0.5) / 255.0)');
    expect(shader).not.toMatch(/gl_FragColor\.a\s*[+\-*/]?=/);
  });
});

describe('DitheredOutputPass renderer synchronization', () => {
  it.each(TONE_MAPPING_CASES)('dispatches tone mapping %i to %s', (toneMapping, expectedDefine) => {
    const pass = new DitheredOutputPass(0);
    const renderer = createRenderer({ toneMapping });
    const texture = {};

    pass.render(renderer, {}, { texture });

    expect(pass.uniforms.tDiffuse.value).toBe(texture);
    expect(pass.uniforms.toneMappingExposure.value).toBe(0.05);
    expect(pass.material.defines).toEqual({ SRGB_TRANSFER: '', [expectedDefine]: '' });
    expect(renderer.render).toHaveBeenCalledOnce();
  });

  it('removes stale defines when renderer output settings change', () => {
    const pass = new DitheredOutputPass(0);
    const renderer = createRenderer();
    const writeBuffer = {};

    pass.render(renderer, writeBuffer, { texture: {} });
    const materialVersion = pass.material.version;
    expect(renderer.setRenderTarget).toHaveBeenLastCalledWith(writeBuffer);

    renderer.outputColorSpace = LinearSRGBColorSpace;
    renderer.toneMapping = 0;
    pass.render(renderer, writeBuffer, { texture: {} });

    expect(pass.material.defines).toEqual({});
    expect(pass.material.version).toBe(materialVersion + 1);
  });

  it('preserves OutputPass screen, clear, and disposal behavior', () => {
    const pass = new DitheredOutputPass(0);
    const renderer = createRenderer();
    const materialDispose = vi.spyOn(pass.material, 'dispose');
    const quadDispose = vi.spyOn(pass._fsQuad, 'dispose');

    pass.clear = true;
    pass.render(renderer, {}, { texture: {} });
    expect(renderer.clear).toHaveBeenCalledWith(true, false, true);

    pass.renderToScreen = true;
    pass.render(renderer, {}, { texture: {} });
    expect(renderer.setRenderTarget).toHaveBeenLastCalledWith(null);

    pass.dispose();
    expect(materialDispose).toHaveBeenCalledOnce();
    expect(quadDispose).toHaveBeenCalledOnce();
  });
});
