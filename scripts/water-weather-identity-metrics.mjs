import { connectedComponents, encodedRec709Luma, percentile } from './water-value-metrics.mjs';
import { LANDMARK_EXCLUSION_ROI } from './water-roi-contract.mjs';

export const WEATHER_IDENTITY_THRESHOLDS = Object.freeze({
  minimumPairwiseStructureDistance: 0.025,
  rainSkyStreaks: 3,
  rainWaterRings: 1,
  rainRingSupportMultiplier: 1.25,
  stormSkyStreaks: 3,
  cloudBoundaryCoverage: 0.48,
  cloudBoundaryRange: 5,
  cloudBoundaryRoughness: 0.32,
  cloudBoundaryTurns: 3,
  stormCloudTurns: 3,
  minimumStormCloudPassRate: 0.75,
  maximumClearCloudPassRate: 0.625,
  foamLocalContrast: 20,
  foamSupportRatio: 0.0015,
  foamSpatialCells: 3,
  stormFoamSupportPixels: 100,
  stormFoamSpatialCells: 2,
  minimumStormFoamPassRate: 0.625,
  minimumStormFoamSupportGainRatio: 0.004,
});

const SKY_ROI = Object.freeze({ x0: 0.04, y0: 0.04, x1: 0.96, y1: 0.57 });
const CLOUD_ROI = Object.freeze({ x0: 0.04, y0: 0.08, x1: 0.96, y1: 0.42 });
const WATER_ROI = Object.freeze({ x0: 0.04, y0: 0.48, x1: 0.96, y1: 0.96 });
const MAX_LOCAL_RING_RADIUS = 16;

function assertFrame(frame) {
  if (!Number.isInteger(frame?.width) || frame.width <= 0
    || !Number.isInteger(frame?.height) || frame.height <= 0
    || ![3, 4].includes(frame?.bytesPerPixel)
    || frame.pixels?.length !== frame.width * frame.height * frame.bytesPerPixel) {
    throw new Error('Expected a positive RGB or RGBA frame with a matching pixel buffer.');
  }
}

function bounds(frame, region) {
  return {
    x0: Math.max(0, Math.floor(frame.width * region.x0)),
    y0: Math.max(0, Math.floor(frame.height * region.y0)),
    x1: Math.min(frame.width, Math.ceil(frame.width * region.x1)),
    y1: Math.min(frame.height, Math.ceil(frame.height * region.y1)),
  };
}

function inside(frame, region, x, y) {
  const unitX = (x + 0.5) / frame.width;
  const unitY = (y + 0.5) / frame.height;
  return unitX >= region.x0 && unitX < region.x1 && unitY >= region.y0 && unitY < region.y1;
}

function lumaAt(frame, x, y) {
  const offset = (y * frame.width + x) * frame.bytesPerPixel;
  return encodedRec709Luma(
    frame.pixels[offset], frame.pixels[offset + 1], frame.pixels[offset + 2],
  );
}

function localMean(frame, x, y, radius) {
  let total = 0;
  let count = 0;
  for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
    for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
      if (offsetX === 0 && offsetY === 0) continue;
      const sampleX = Math.max(0, Math.min(frame.width - 1, x + offsetX));
      const sampleY = Math.max(0, Math.min(frame.height - 1, y + offsetY));
      total += lumaAt(frame, sampleX, sampleY);
      count += 1;
    }
  }
  return total / count;
}

function localMask(frame, region, exclusion, predicate) {
  const regionBounds = bounds(frame, region);
  const width = regionBounds.x1 - regionBounds.x0;
  const height = regionBounds.y1 - regionBounds.y0;
  const mask = new Uint8Array(width * height);
  for (let localY = 0; localY < height; localY += 1) {
    for (let localX = 0; localX < width; localX += 1) {
      const x = regionBounds.x0 + localX;
      const y = regionBounds.y0 + localY;
      if (!inside(frame, exclusion, x, y) && predicate(x, y)) {
        mask[localY * width + localX] = 1;
      }
    }
  }
  return { bounds: regionBounds, width, height, mask };
}

function pcaGeometry(component, width) {
  let xx = 0;
  let yy = 0;
  let xy = 0;
  for (const index of component.pixels) {
    const x = index % width - component.centroid.x;
    const y = Math.floor(index / width) - component.centroid.y;
    xx += x * x;
    yy += y * y;
    xy += x * y;
  }
  xx /= component.area;
  yy /= component.area;
  xy /= component.area;
  const trace = xx + yy;
  const discriminant = Math.sqrt(Math.max(0, (xx - yy) ** 2 + 4 * xy ** 2));
  const majorVariance = (trace + discriminant) / 2;
  const minorVariance = Math.max(0.04, (trace - discriminant) / 2);
  return {
    majorLength: Math.sqrt(majorVariance) * 4,
    minorLength: Math.sqrt(minorVariance) * 4,
    aspect: Math.sqrt(majorVariance / minorVariance),
  };
}

export function toRec709Grayscale(frame) {
  assertFrame(frame);
  const pixels = Buffer.alloc(frame.width * frame.height * 4);
  for (let pixel = 0; pixel < frame.width * frame.height; pixel += 1) {
    const source = pixel * frame.bytesPerPixel;
    const value = Math.round(encodedRec709Luma(
      frame.pixels[source], frame.pixels[source + 1], frame.pixels[source + 2],
    ));
    pixels.set([value, value, value, 255], pixel * 4);
  }
  return { width: frame.width, height: frame.height, bytesPerPixel: 4, pixels };
}

export function measureSkyStreaks(
  frame,
  region = SKY_ROI,
  exclusion = LANDMARK_EXCLUSION_ROI,
) {
  assertFrame(frame);
  const qualifying = [1, -1].flatMap((polarity) => {
    const source = localMask(frame, region, exclusion, (x, y) => (
      (lumaAt(frame, x, y) - localMean(frame, x, y, 2)) * polarity >= 13
    ));
    return connectedComponents(source.mask, source.width, source.height)
      .map((component) => ({ ...component, geometry: pcaGeometry(component, source.width) }))
      .filter((component) => (
        component.area >= 6
        && component.geometry.majorLength >= 6
        && component.geometry.aspect >= 3.2
        && component.bbox.height >= 5
        && component.bbox.height >= component.bbox.width * 0.65
      ));
  });
  return {
    qualifyingCount: qualifying.length,
    supportPixels: qualifying.reduce((total, component) => total + component.area, 0),
    longest: qualifying.reduce(
      (longest, component) => Math.max(longest, component.geometry.majorLength), 0,
    ),
    candidates: qualifying.map((component) => ({
      area: component.area,
      bbox: component.bbox,
      aspect: component.geometry.aspect,
      majorLength: component.geometry.majorLength,
    })),
  };
}

function ringGeometry(component, width) {
  const halfWidth = Math.max(1, component.bbox.width / 2);
  const halfHeight = Math.max(1, component.bbox.height / 2);
  const radii = [];
  const angleBins = new Uint8Array(16);
  for (const index of component.pixels) {
    const x = index % width;
    const y = Math.floor(index / width);
    const normalizedX = (x - component.centroid.x) / halfWidth;
    const normalizedY = (y - component.centroid.y) / halfHeight;
    radii.push(Math.hypot(normalizedX, normalizedY));
    const angle = (Math.atan2(normalizedY, normalizedX) + Math.PI * 2) % (Math.PI * 2);
    angleBins[Math.floor(angle / (Math.PI * 2) * angleBins.length)] = 1;
  }
  const radiusMean = radii.reduce((sum, radius) => sum + radius, 0) / radii.length;
  const radiusVariance = radii.reduce(
    (sum, radius) => sum + (radius - radiusMean) ** 2, 0,
  ) / radii.length;
  return {
    angularBins: angleBins.reduce((sum, occupied) => sum + occupied, 0),
    radiusMean,
    radiusCv: Math.sqrt(radiusVariance) / Math.max(radiusMean, 0.001),
  };
}

function bitCount(value) {
  let count = 0;
  let remaining = value >>> 0;
  while (remaining !== 0) {
    remaining &= remaining - 1;
    count += 1;
  }
  return count;
}

function longestCircularRun(bits, binCount = 16) {
  let longest = 0;
  let current = 0;
  for (let index = 0; index < binCount * 2; index += 1) {
    if ((bits & (1 << (index % binCount))) !== 0) {
      current += 1;
      longest = Math.max(longest, Math.min(current, binCount));
    } else {
      current = 0;
    }
  }
  return longest;
}

function measureBrokenEllipseSupports(source, components) {
  const eligible = components.filter((component) => component.area >= 2 && component.area <= 140);
  const samples = [];
  eligible.forEach((component, componentIndex) => {
    for (const index of component.pixels) {
      samples.push({
        x: index % source.width,
        y: Math.floor(index / source.width),
        componentIndex,
      });
    }
  });
  if (samples.length < 10) return [];
  const configurations = [];
  const aspects = [0.3, 0.45, 0.6];
  for (let centerY = 4; centerY < source.height - 4; centerY += 2) {
    for (let centerX = 4; centerX < source.width - 4; centerX += 2) {
      for (const aspect of aspects) {
        const support = new Uint16Array(23);
        const angularBits = new Uint16Array(23);
        for (const sample of samples) {
          const normalizedY = (sample.y - centerY) / aspect;
          const radius = Math.hypot(sample.x - centerX, normalizedY);
          const radiusBin = Math.round(radius);
          if (radiusBin < 4 || radiusBin > MAX_LOCAL_RING_RADIUS
            || Math.abs(radius - radiusBin) > 0.8) continue;
          const angle = (
            Math.atan2(normalizedY, sample.x - centerX) + Math.PI * 2
          ) % (Math.PI * 2);
          const angleBin = Math.min(15, Math.floor(angle / (Math.PI * 2) * 16));
          support[radiusBin] += 1;
          angularBits[radiusBin] |= 1 << angleBin;
        }
        for (let radius = 4; radius <= MAX_LOCAL_RING_RADIUS; radius += 1) {
          const angularBins = bitCount(angularBits[radius]);
          const longestArcBins = longestCircularRun(angularBits[radius]);
          const neighboringSupport = [radius - 2, radius - 1, radius + 1, radius + 2]
            .filter((neighbor) => neighbor >= 4 && neighbor <= MAX_LOCAL_RING_RADIUS)
            .map((neighbor) => support[neighbor]);
          const neighboringMean = neighboringSupport.reduce((sum, value) => sum + value, 0)
            / neighboringSupport.length;
          const radialProminence = support[radius] / Math.max(1, neighboringMean);
          if (support[radius] < 10
            || angularBins < 7
            || longestArcBins < 3
            || radialProminence < 1.45) continue;
          configurations.push({
            centerX,
            centerY,
            aspect,
            radius,
            supportPixels: support[radius],
            angularBins,
            longestArcBins,
            radialProminence,
            score: angularBins * 10 + support[radius] + longestArcBins * 2,
          });
        }
      }
    }
  }
  configurations.sort((left, right) => right.score - left.score);
  const qualifying = [];
  for (const configuration of configurations) {
    if (qualifying.some((candidate) => (
      Math.hypot(
        candidate.centerX - configuration.centerX,
        candidate.centerY - configuration.centerY,
      ) <= Math.min(candidate.radius, configuration.radius) * 0.55
    ))) continue;
    const componentSupport = new Map();
    for (const sample of samples) {
      const normalizedY = (sample.y - configuration.centerY) / configuration.aspect;
      const radius = Math.hypot(sample.x - configuration.centerX, normalizedY);
      if (Math.abs(radius - configuration.radius) > 0.8) continue;
      componentSupport.set(
        sample.componentIndex,
        (componentSupport.get(sample.componentIndex) ?? 0) + 1,
      );
    }
    const supportingComponents = [...componentSupport.values()].filter((count) => count >= 3);
    if (supportingComponents.length < 2
      || supportingComponents.reduce((total, count) => total + count, 0) < 10) continue;
    qualifying.push({
      kind: 'broken-ellipse',
      ...configuration,
      componentCount: supportingComponents.length,
    });
    if (qualifying.length >= 8) break;
  }
  return qualifying;
}

export function measureRadialRings(
  frame,
  region = WATER_ROI,
  exclusion = LANDMARK_EXCLUSION_ROI,
) {
  assertFrame(frame);
  const source = localMask(frame, region, exclusion, (x, y) => (
    lumaAt(frame, x, y) - localMean(frame, x, y, 3) >= 12
  ));
  const components = connectedComponents(source.mask, source.width, source.height)
    .map((component) => ({ ...component, ring: ringGeometry(component, source.width) }));
  const directRings = components.filter((component) => (
    component.area >= 14
    && component.bbox.width >= 7
    && component.bbox.height >= 4
    && component.bbox.width / component.bbox.height >= 0.55
    && component.bbox.width / component.bbox.height <= 4.5
    && component.ring.angularBins >= 10
    && component.ring.radiusMean >= 0.62
    && component.ring.radiusCv <= 0.28
  ));
  const brokenEllipses = measureBrokenEllipseSupports(source, components);
  return {
    qualifyingCount: directRings.length + brokenEllipses.length,
    supportPixels: directRings.reduce((total, component) => total + component.area, 0)
      + brokenEllipses.reduce((total, candidate) => total + candidate.supportPixels, 0),
    candidates: directRings.map((component) => ({
      kind: 'connected-ring',
      area: component.area,
      bbox: component.bbox,
      ...component.ring,
    })).concat(brokenEllipses),
  };
}

function sign(value, deadZone = 0.18) {
  if (value > deadZone) return 1;
  if (value < -deadZone) return -1;
  return 0;
}

export function measureCloudLowerEdge(
  frame,
  region = CLOUD_ROI,
  exclusion = LANDMARK_EXCLUSION_ROI,
) {
  assertFrame(frame);
  const regionBounds = bounds(frame, region);
  const skySamples = [];
  const skyReferenceBottom = Math.max(2, Math.floor(frame.height * 0.10));
  for (let y = 1; y < skyReferenceBottom; y += 1) {
    for (let x = regionBounds.x0; x < regionBounds.x1; x += 1) {
      if (!inside(frame, exclusion, x, y)) skySamples.push(lumaAt(frame, x, y));
    }
  }
  if (skySamples.length === 0) throw new Error('Cloud detector has no unobstructed sky samples.');
  const skyMedian = percentile(skySamples, 0.5);
  const localWidth = regionBounds.x1 - regionBounds.x0;
  const localHeight = regionBounds.y1 - regionBounds.y0;
  const mask = new Uint8Array(localWidth * localHeight);
  for (let localY = 1; localY < localHeight - 1; localY += 1) {
    const y = regionBounds.y0 + localY;
    for (let localX = 1; localX < localWidth - 1; localX += 1) {
      const x = regionBounds.x0 + localX;
      if (inside(frame, exclusion, x, y)) continue;
      const value = lumaAt(frame, x, y);
      if (value > skyMedian - 18) continue;
      const coherentNeighbors = [
        lumaAt(frame, x - 1, y), lumaAt(frame, x + 1, y),
        lumaAt(frame, x, y - 1), lumaAt(frame, x, y + 1),
      ].filter((neighbor) => Math.abs(neighbor - value) <= 12).length;
      if (coherentNeighbors >= 2) mask[localY * localWidth + localX] = 1;
    }
  }
  const cloudCandidates = connectedComponents(mask, localWidth, localHeight).filter((component) => (
    component.area >= 10
    && component.bbox.width >= 5
    && component.bbox.height >= 2
    && component.bbox.width / component.bbox.height >= 2
    && component.bbox.y + component.bbox.height < localHeight - 1
  ));
  const cloudTop = cloudCandidates.length === 0
    ? Infinity
    : Math.min(...cloudCandidates.map((component) => component.bbox.y));
  const components = cloudCandidates.filter((component) => component.bbox.y <= cloudTop + 10);
  const boundary = Array.from({ length: localWidth }, () => null);
  let supportPixels = 0;
  for (const component of components) {
    supportPixels += component.area;
    for (const index of component.pixels) {
      const localX = index % localWidth;
      const localY = Math.floor(index / localWidth);
      boundary[localX] = boundary[localX] === null
        ? localY + regionBounds.y0
        : Math.max(boundary[localX], localY + regionBounds.y0);
    }
  }
  const values = boundary.filter((value) => value !== null);
  let measurableColumns = 0;
  const cloudMidY = Math.floor((regionBounds.y0 + regionBounds.y1) / 2);
  for (let localX = 0; localX < localWidth; localX += 1) {
    if (!inside(frame, exclusion, localX + regionBounds.x0, cloudMidY)) measurableColumns += 1;
  }
  const coverage = measurableColumns === 0 ? 0 : values.length / measurableColumns;
  const range = values.length === 0 ? 0 : Math.max(...values) - Math.min(...values);
  const steps = [];
  for (let index = 1; index < boundary.length; index += 1) {
    if (boundary[index - 1] !== null && boundary[index] !== null) {
      steps.push(boundary[index] - boundary[index - 1]);
    }
  }
  const secondDifferences = [];
  let turns = 0;
  for (let index = 1; index < steps.length; index += 1) {
    secondDifferences.push(Math.abs(steps[index] - steps[index - 1]));
    const previousSign = sign(steps[index - 1]);
    const currentSign = sign(steps[index]);
    if (previousSign !== 0 && currentSign !== 0 && previousSign !== currentSign) turns += 1;
  }
  const roughness = secondDifferences.length === 0
    ? 0
    : Math.max(
      percentile(secondDifferences, 0.75),
      steps.reduce((total, step) => total + Math.abs(step), 0) / steps.length,
    );
  const passesShape = coverage >= WEATHER_IDENTITY_THRESHOLDS.cloudBoundaryCoverage
    && range >= WEATHER_IDENTITY_THRESHOLDS.cloudBoundaryRange
    && roughness >= WEATHER_IDENTITY_THRESHOLDS.cloudBoundaryRoughness
    && turns >= WEATHER_IDENTITY_THRESHOLDS.cloudBoundaryTurns;
  return {
    skyMedian,
    coverage,
    range,
    roughness,
    turns,
    componentCount: components.length,
    supportPixels,
    candidates: components.map((component) => ({
      area: component.area,
      bbox: {
        x: component.bbox.x + regionBounds.x0,
        y: component.bbox.y + regionBounds.y0,
        width: component.bbox.width,
        height: component.bbox.height,
      },
    })),
    passesShape,
  };
}

export function measureFoamSupport(
  frame,
  region = WATER_ROI,
  exclusion = LANDMARK_EXCLUSION_ROI,
) {
  assertFrame(frame);
  const source = localMask(frame, region, exclusion, (x, y) => {
    const luma = lumaAt(frame, x, y);
    return luma - localMean(frame, x, y, 3)
      >= WEATHER_IDENTITY_THRESHOLDS.foamLocalContrast;
  });
  const qualifying = connectedComponents(source.mask, source.width, source.height).filter(
    (component) => component.area >= 12
      && component.bbox.width >= 7
      && (component.bbox.width >= component.bbox.height * 1.25 || component.bbox.width >= 14),
  );
  const supportPixels = qualifying.reduce((total, component) => total + component.area, 0);
  const occupiedCells = new Set();
  for (const component of qualifying) {
    for (const index of component.pixels) {
      const x = index % source.width;
      const y = Math.floor(index / source.width);
      occupiedCells.add(`${Math.min(3, Math.floor(x / source.width * 4))},${Math.min(1, Math.floor(y / source.height * 2))}`);
    }
  }
  const supportRatio = supportPixels / (source.width * source.height);
  const spatialCells = occupiedCells.size;
  const passesShape = supportRatio >= WEATHER_IDENTITY_THRESHOLDS.foamSupportRatio
    && spatialCells >= WEATHER_IDENTITY_THRESHOLDS.foamSpatialCells;
  return {
    supportPixels,
    supportRatio,
    componentCount: qualifying.length,
    spatialCells,
    passesShape,
  };
}

function structureSignature(frame) {
  assertFrame(frame);
  const grayscale = toRec709Grayscale(frame);
  const cellsX = 4;
  const cellsY = 3;
  const histograms = Array.from({ length: cellsX * cellsY }, () => new Float64Array(5));
  const magnitudes = [];
  const samples = [];
  for (let y = 1; y < frame.height - 1; y += 1) {
    for (let x = 1; x < frame.width - 1; x += 1) {
      const gx = (
        lumaAt(grayscale, x + 1, y - 1) + 2 * lumaAt(grayscale, x + 1, y)
        + lumaAt(grayscale, x + 1, y + 1) - lumaAt(grayscale, x - 1, y - 1)
        - 2 * lumaAt(grayscale, x - 1, y) - lumaAt(grayscale, x - 1, y + 1)
      );
      const gy = (
        lumaAt(grayscale, x - 1, y + 1) + 2 * lumaAt(grayscale, x, y + 1)
        + lumaAt(grayscale, x + 1, y + 1) - lumaAt(grayscale, x - 1, y - 1)
        - 2 * lumaAt(grayscale, x, y - 1) - lumaAt(grayscale, x + 1, y - 1)
      );
      const magnitude = Math.hypot(gx, gy);
      magnitudes.push(magnitude);
      samples.push({ x, y, gx, gy, magnitude });
    }
  }
  const positive = magnitudes.filter((magnitude) => magnitude > 0.5);
  const threshold = positive.length === 0 ? Infinity : percentile(positive, 0.55);
  for (const sample of samples) {
    const cellX = Math.min(cellsX - 1, Math.floor(sample.x / frame.width * cellsX));
    const cellY = Math.min(cellsY - 1, Math.floor(sample.y / frame.height * cellsY));
    const histogram = histograms[cellY * cellsX + cellX];
    if (sample.magnitude < threshold) continue;
    const angle = (Math.atan2(sample.gy, sample.gx) + Math.PI) % Math.PI;
    const bin = Math.min(3, Math.floor(angle / Math.PI * 4));
    histogram[bin] += 1;
    histogram[4] += 1;
  }
  return histograms.flatMap((histogram) => {
    const total = histogram[4];
    if (total === 0) return [0, 0, 0, 0, 0];
    return [
      histogram[0] / total,
      histogram[1] / total,
      histogram[2] / total,
      histogram[3] / total,
      Math.min(1, total / (frame.width * frame.height / (cellsX * cellsY) * 0.25)),
    ];
  });
}

function signatureDistance(left, right) {
  if (left.length !== right.length) throw new Error('Structure signatures must have equal length.');
  return left.reduce((total, value, index) => total + Math.abs(value - right[index]), 0)
    / left.length;
}

function evaluateStructure(frames) {
  const ids = ['clear', 'rain', 'storm'];
  const signatures = Object.fromEntries(ids.map((id) => [id, structureSignature(frames[id])]));
  const pairwise = {
    clearRain: signatureDistance(signatures.clear, signatures.rain),
    rainStorm: signatureDistance(signatures.rain, signatures.storm),
    clearStorm: signatureDistance(signatures.clear, signatures.storm),
  };
  const minimumPairwiseDistance = Math.min(...Object.values(pairwise));
  return {
    pass: minimumPairwiseDistance
      >= WEATHER_IDENTITY_THRESHOLDS.minimumPairwiseStructureDistance,
    pairwise,
    minimumPairwiseDistance,
  };
}

function measureCues(frame) {
  return {
    skyStreaks: measureSkyStreaks(frame),
    waterRings: measureRadialRings(frame),
    cloudLowerEdge: measureCloudLowerEdge(frame),
    foam: measureFoamSupport(frame),
  };
}

export function evaluateWeatherIdentity(frames) {
  const ids = ['clear', 'rain', 'storm'];
  for (const id of ids) assertFrame(frames[id]);
  const structure = evaluateStructure(frames);
  const cues = Object.fromEntries(ids.map((id) => [id, measureCues(frames[id])]));
  const comparisons = {
    rainRingSupportVsClear: cues.rain.waterRings.supportPixels
      / Math.max(1, cues.clear.waterRings.supportPixels),
    stormCloudTurnsMinusClear: cues.storm.cloudLowerEdge.turns
      - cues.clear.cloudLowerEdge.turns,
    stormFoamSupportRatioMinusClear: cues.storm.foam.supportRatio
      - cues.clear.foam.supportRatio,
  };
  const gates = {
    structure: structure.pass,
    rainSkyStreaks: cues.rain.skyStreaks.qualifyingCount
      >= WEATHER_IDENTITY_THRESHOLDS.rainSkyStreaks,
    rainWaterRings: cues.rain.waterRings.qualifyingCount
      >= WEATHER_IDENTITY_THRESHOLDS.rainWaterRings
      && comparisons.rainRingSupportVsClear
        >= WEATHER_IDENTITY_THRESHOLDS.rainRingSupportMultiplier,
    stormSkyStreaks: cues.storm.skyStreaks.qualifyingCount
      >= WEATHER_IDENTITY_THRESHOLDS.stormSkyStreaks,
    stormCloudLowerEdge: cues.storm.cloudLowerEdge.passesShape
      && cues.storm.cloudLowerEdge.turns >= WEATHER_IDENTITY_THRESHOLDS.stormCloudTurns
      && !cues.clear.cloudLowerEdge.passesShape,
    stormFoam: cues.storm.foam.passesShape
      && cues.storm.foam.supportPixels >= WEATHER_IDENTITY_THRESHOLDS.stormFoamSupportPixels
      && cues.storm.foam.spatialCells >= WEATHER_IDENTITY_THRESHOLDS.stormFoamSpatialCells
      && comparisons.stormFoamSupportRatioMinusClear
        >= WEATHER_IDENTITY_THRESHOLDS.minimumStormFoamSupportGainRatio,
  };
  return {
    pass: Object.values(gates).every(Boolean),
    thresholds: WEATHER_IDENTITY_THRESHOLDS,
    structure,
    cues,
    comparisons,
    gates,
  };
}

function robustStats(values) {
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    throw new Error('Robust weather identity statistics require finite samples.');
  }
  return {
    min: Math.min(...values),
    p25: percentile(values, 0.25),
    median: percentile(values, 0.5),
    p75: percentile(values, 0.75),
    max: Math.max(...values),
  };
}

function summarizeCueSeries(cues) {
  const values = (path) => cues.map((cue) => path(cue));
  return {
    skyStreaks: {
      qualifyingCount: robustStats(values((cue) => cue.skyStreaks.qualifyingCount)),
      supportPixels: robustStats(values((cue) => cue.skyStreaks.supportPixels)),
      longest: robustStats(values((cue) => cue.skyStreaks.longest)),
    },
    waterRings: {
      qualifyingCount: robustStats(values((cue) => cue.waterRings.qualifyingCount)),
      supportPixels: robustStats(values((cue) => cue.waterRings.supportPixels)),
    },
    cloudLowerEdge: {
      coverage: robustStats(values((cue) => cue.cloudLowerEdge.coverage)),
      range: robustStats(values((cue) => cue.cloudLowerEdge.range)),
      roughness: robustStats(values((cue) => cue.cloudLowerEdge.roughness)),
      turns: robustStats(values((cue) => cue.cloudLowerEdge.turns)),
      passRate: values((cue) => cue.cloudLowerEdge.passesShape ? 1 : 0)
        .reduce((sum, value) => sum + value, 0) / cues.length,
    },
    foam: {
      supportPixels: robustStats(values((cue) => cue.foam.supportPixels)),
      supportRatio: robustStats(values((cue) => cue.foam.supportRatio)),
      componentCount: robustStats(values((cue) => cue.foam.componentCount)),
      spatialCells: robustStats(values((cue) => cue.foam.spatialCells)),
      passRate: values((cue) => cue.foam.passesShape ? 1 : 0)
        .reduce((sum, value) => sum + value, 0) / cues.length,
    },
  };
}

function selectStructureMedoid(frames) {
  const signatures = frames.map((frame) => structureSignature(frame));
  const totalDistances = signatures.map((signature, index) => signatures.reduce(
    (sum, other, otherIndex) => sum + (index === otherIndex
      ? 0
      : signatureDistance(signature, other)),
    0,
  ));
  const index = totalDistances.reduce((best, distance, candidate) => (
    distance < totalDistances[best] ? candidate : best
  ), 0);
  return { index, totalDistances };
}

export function evaluateWeatherIdentitySeries(frameSeries, sampleTimesMs) {
  const ids = ['clear', 'rain', 'storm'];
  const frameCount = frameSeries.clear?.length;
  if (!Number.isInteger(frameCount) || frameCount < 3) {
    throw new Error('Weather identity series requires at least three frames per state.');
  }
  if (!Array.isArray(sampleTimesMs) || sampleTimesMs.length !== frameCount
    || sampleTimesMs.some((time, index) => (
      !Number.isFinite(time) || time <= 0 || (index > 0 && time <= sampleTimesMs[index - 1])
    ))) {
    throw new Error('Weather identity sample times must be finite, positive, strictly increasing, and aligned with the frame count.');
  }
  for (const id of ids) {
    if (!Array.isArray(frameSeries[id]) || frameSeries[id].length !== frameCount) {
      throw new Error(`Weather identity ${id} series must contain ${frameCount} frames.`);
    }
    frameSeries[id].forEach(assertFrame);
  }
  const medoids = Object.fromEntries(ids.map((id) => {
    const medoid = selectStructureMedoid(frameSeries[id]);
    return [id, {
      ...medoid,
      sampleTimeMs: sampleTimesMs[medoid.index],
    }];
  }));
  const representativeFrames = Object.fromEntries(ids.map((id) => (
    [id, frameSeries[id][medoids[id].index]]
  )));
  const structure = evaluateStructure(representativeFrames);
  const frameMetrics = Object.fromEntries(ids.map((id) => (
    [id, frameSeries[id].map((frame, index) => ({
      index,
      sampleTimeMs: sampleTimesMs[index],
      cues: measureCues(frame),
    }))]
  )));
  const cues = Object.fromEntries(ids.map((id) => (
    [id, summarizeCueSeries(frameMetrics[id].map((frame) => frame.cues))]
  )));
  const aligned = (measure) => Array.from({ length: frameCount }, (_, index) => measure(index));
  const ringRatios = aligned((index) => (
    frameMetrics.rain[index].cues.waterRings.supportPixels
      / Math.max(1, frameMetrics.clear[index].cues.waterRings.supportPixels)
  ));
  const cloudTurnDeltas = aligned((index) => (
    frameMetrics.storm[index].cues.cloudLowerEdge.turns
      - frameMetrics.clear[index].cues.cloudLowerEdge.turns
  ));
  const foamSupportRatioDeltas = aligned((index) => (
    frameMetrics.storm[index].cues.foam.supportRatio
      - frameMetrics.clear[index].cues.foam.supportRatio
  ));
  const comparisons = {
    rainRingSupportVsClear: robustStats(ringRatios),
    rainRingP25SupportVsClearP25: cues.rain.waterRings.supportPixels.p25
      / Math.max(1, cues.clear.waterRings.supportPixels.p25),
    stormCloudTurnsMinusClear: robustStats(cloudTurnDeltas),
    stormFoamSupportRatioMinusClear: robustStats(foamSupportRatioDeltas),
  };
  const gates = {
    structure: structure.pass,
    rainSkyStreaks: cues.rain.skyStreaks.qualifyingCount.p25
      >= WEATHER_IDENTITY_THRESHOLDS.rainSkyStreaks,
    rainWaterRings: cues.rain.waterRings.qualifyingCount.p25
      >= WEATHER_IDENTITY_THRESHOLDS.rainWaterRings
      && comparisons.rainRingP25SupportVsClearP25
        >= WEATHER_IDENTITY_THRESHOLDS.rainRingSupportMultiplier,
    stormSkyStreaks: cues.storm.skyStreaks.qualifyingCount.p25
      >= WEATHER_IDENTITY_THRESHOLDS.stormSkyStreaks,
    stormCloudLowerEdge: cues.storm.cloudLowerEdge.passRate
        >= WEATHER_IDENTITY_THRESHOLDS.minimumStormCloudPassRate
      && cues.storm.cloudLowerEdge.turns.p25 >= WEATHER_IDENTITY_THRESHOLDS.stormCloudTurns
      && cues.clear.cloudLowerEdge.passRate
        <= WEATHER_IDENTITY_THRESHOLDS.maximumClearCloudPassRate,
    stormFoam: cues.storm.foam.passRate
        >= WEATHER_IDENTITY_THRESHOLDS.minimumStormFoamPassRate
      && cues.storm.foam.supportPixels.p25
        >= WEATHER_IDENTITY_THRESHOLDS.stormFoamSupportPixels
      && cues.storm.foam.spatialCells.p25
        >= WEATHER_IDENTITY_THRESHOLDS.stormFoamSpatialCells
      && comparisons.stormFoamSupportRatioMinusClear.p25
        >= WEATHER_IDENTITY_THRESHOLDS.minimumStormFoamSupportGainRatio,
  };
  return {
    pass: Object.values(gates).every(Boolean),
    thresholds: WEATHER_IDENTITY_THRESHOLDS,
    aggregation: {
      frameCount,
      robustGateQuantile: 0.25,
      minimumPassRate: 0.75,
      medoids,
    },
    structure,
    cues,
    comparisons,
    gates,
    frameMetrics,
  };
}
