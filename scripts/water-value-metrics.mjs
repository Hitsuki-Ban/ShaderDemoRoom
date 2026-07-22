import { deflateSync } from 'node:zlib';

export const VALUE_BOUNDS = Object.freeze([64, 128, 192]);
export const THUMBNAIL_LEVELS = Object.freeze([0, 85, 170, 255]);

function assertFrame(frame) {
  if (!Number.isInteger(frame?.width) || frame.width <= 0
    || !Number.isInteger(frame?.height) || frame.height <= 0
    || ![3, 4].includes(frame?.bytesPerPixel)) {
    throw new Error('Expected a positive RGB or RGBA frame.');
  }
  if (frame.pixels?.length !== frame.width * frame.height * frame.bytesPerPixel) {
    throw new Error('Frame pixel buffer length does not match its dimensions.');
  }
}

function regionBounds(frame, region) {
  const x0 = Math.max(0, Math.floor(region.x0 * frame.width));
  const y0 = Math.max(0, Math.floor(region.y0 * frame.height));
  const x1 = Math.min(frame.width, Math.ceil(region.x1 * frame.width));
  const y1 = Math.min(frame.height, Math.ceil(region.y1 * frame.height));
  if (x0 >= x1 || y0 >= y1) {
    throw new Error('Region does not contain any pixels.');
  }
  return { x0, y0, x1, y1 };
}

function channelOffset(frame, x, y) {
  return (y * frame.width + x) * frame.bytesPerPixel;
}

function pixelLuma(frame, x, y) {
  const offset = channelOffset(frame, x, y);
  return encodedRec709Luma(
    frame.pixels[offset],
    frame.pixels[offset + 1],
    frame.pixels[offset + 2],
  );
}

function pixelSaturation(frame, x, y) {
  const offset = channelOffset(frame, x, y);
  const red = frame.pixels[offset] / 255;
  const green = frame.pixels[offset + 1] / 255;
  const blue = frame.pixels[offset + 2] / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  return max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1));
}

function containsPixel(frame, region, x, y) {
  const centerX = (x + 0.5) / frame.width;
  const centerY = (y + 0.5) / frame.height;
  return centerX >= region.x0 && centerX < region.x1
    && centerY >= region.y0 && centerY < region.y1;
}

export function encodedRec709Luma(red, green, blue) {
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

export function percentile(values, quantile) {
  if (values.length === 0) {
    throw new Error('A percentile requires at least one value.');
  }
  if (!Number.isFinite(quantile) || quantile < 0 || quantile > 1) {
    throw new Error(`Percentile quantile must be within 0..1; received ${quantile}.`);
  }
  const sorted = [...values].sort((left, right) => left - right);
  const position = (sorted.length - 1) * quantile;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  const weight = position - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export function fourBinCoverage(frame) {
  assertFrame(frame);
  const counts = [0, 0, 0, 0];
  const pixelCount = frame.width * frame.height;
  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    const offset = pixel * frame.bytesPerPixel;
    const value = encodedRec709Luma(
      frame.pixels[offset],
      frame.pixels[offset + 1],
      frame.pixels[offset + 2],
    );
    const bin = value < VALUE_BOUNDS[0] ? 0
      : value < VALUE_BOUNDS[1] ? 1
        : value < VALUE_BOUNDS[2] ? 2 : 3;
    counts[bin] += 1;
  }
  return counts.map((count) => count / pixelCount);
}

export function measureRegionLuma(frame, region) {
  assertFrame(frame);
  const bounds = regionBounds(frame, region);
  const samples = [];
  let total = 0;
  for (let y = bounds.y0; y < bounds.y1; y += 1) {
    for (let x = bounds.x0; x < bounds.x1; x += 1) {
      const value = pixelLuma(frame, x, y);
      samples.push(value);
      total += value;
    }
  }
  return {
    mean: total / samples.length,
    median: percentile(samples, 0.5),
    p10: percentile(samples, 0.1),
    p90: percentile(samples, 0.9),
    pixelCount: samples.length,
  };
}

export function measureWaterMetrics(frame, { inclusion, exclusion, sampleScale = 4 }) {
  assertFrame(frame);
  if (!Number.isInteger(sampleScale) || sampleScale <= 0) {
    throw new Error('Water sample scale must be a positive integer.');
  }
  const bounds = regionBounds(frame, inclusion);
  const samples = [];
  const bands = new Array(12).fill(0);
  let lumaTotal = 0;
  let localContrastTotal = 0;
  let count = 0;
  for (let y = bounds.y0; y < bounds.y1; y += sampleScale) {
    for (let x = bounds.x0; x < bounds.x1; x += sampleScale) {
      if (containsPixel(frame, exclusion, x, y)) continue;
      const value = pixelLuma(frame, x, y);
      const nextX = Math.min(frame.width - 1, x + sampleScale);
      const nextY = Math.min(frame.height - 1, y + sampleScale);
      if (containsPixel(frame, exclusion, nextX, nextY)) continue;
      const offset = channelOffset(frame, x, y);
      const nextOffset = channelOffset(frame, nextX, nextY);
      lumaTotal += value;
      samples.push(value);
      bands[Math.min(bands.length - 1, Math.floor(value / 22))] += 1;
      localContrastTotal += (
        Math.abs(frame.pixels[offset] - frame.pixels[nextOffset])
        + Math.abs(frame.pixels[offset + 1] - frame.pixels[nextOffset + 1])
        + Math.abs(frame.pixels[offset + 2] - frame.pixels[nextOffset + 2])
      ) / 3;
      count += 1;
    }
  }
  if (count === 0) throw new Error('Water inclusion contains no samples outside exclusion.');
  const activeBands = bands.filter((bandCount) => bandCount / count > 0.018).length;
  return {
    waterLuma: lumaTotal / count,
    toonBandSeparation: (
      percentile(samples, 0.9) - percentile(samples, 0.1)
    ) / Math.max(1, activeBands - 1),
    voxelLocalContrast: localContrastTotal / count,
  };
}

export function aggregateFrameMetrics(frameMetrics) {
  if (frameMetrics.length === 0) {
    throw new Error('Frame aggregation requires at least one frame.');
  }
  return {
    waterLuma: percentile(frameMetrics.map((metrics) => metrics.waterLuma), 0.5),
    toonBandSeparation: percentile(
      frameMetrics.map((metrics) => metrics.toonBandSeparation),
      0.1,
    ),
    voxelLocalContrast: percentile(
      frameMetrics.map((metrics) => metrics.voxelLocalContrast),
      0.1,
    ),
  };
}

export function aggregateCoverage(frameCoverages) {
  if (frameCoverages.length === 0) {
    throw new Error('Coverage aggregation requires at least one frame.');
  }
  return [0, 1, 2, 3].map((bin) => percentile(
    frameCoverages.map((coverage) => coverage[bin]),
    0.1,
  ));
}

export function connectedComponents(mask, width, height) {
  if (!(mask instanceof Uint8Array) || mask.length !== width * height) {
    throw new Error('Connected-component mask length does not match its dimensions.');
  }
  const labels = new Int32Array(mask.length);
  const parents = [0];
  const find = (label) => {
    let root = label;
    while (parents[root] !== root) root = parents[root];
    let cursor = label;
    while (parents[cursor] !== cursor) {
      const next = parents[cursor];
      parents[cursor] = root;
      cursor = next;
    }
    return root;
  };
  const unite = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parents[Math.max(leftRoot, rightRoot)] = Math.min(leftRoot, rightRoot);
  };
  let nextLabel = 1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      if (!mask[index]) continue;
      const adjacent = [];
      if (x > 0 && labels[index - 1]) adjacent.push(labels[index - 1]);
      if (y > 0) {
        if (x > 0 && labels[index - width - 1]) adjacent.push(labels[index - width - 1]);
        if (labels[index - width]) adjacent.push(labels[index - width]);
        if (x + 1 < width && labels[index - width + 1]) adjacent.push(labels[index - width + 1]);
      }
      if (adjacent.length === 0) {
        labels[index] = nextLabel;
        parents[nextLabel] = nextLabel;
        nextLabel += 1;
      } else {
        const label = Math.min(...adjacent);
        labels[index] = label;
        for (const neighbor of adjacent) unite(label, neighbor);
      }
    }
  }
  const componentsByLabel = new Map();
  for (let index = 0; index < labels.length; index += 1) {
    if (!labels[index]) continue;
    const label = find(labels[index]);
    const x = index % width;
    const y = Math.floor(index / width);
    let component = componentsByLabel.get(label);
    if (!component) {
      component = {
        pixels: [], area: 0,
        minX: width, minY: height, maxX: -1, maxY: -1,
        xTotal: 0, yTotal: 0,
      };
      componentsByLabel.set(label, component);
    }
    component.pixels.push(index);
    component.area += 1;
    component.minX = Math.min(component.minX, x);
    component.minY = Math.min(component.minY, y);
    component.maxX = Math.max(component.maxX, x);
    component.maxY = Math.max(component.maxY, y);
    component.xTotal += x;
    component.yTotal += y;
  }
  return [...componentsByLabel.values()].map((component) => ({
    pixels: component.pixels,
    area: component.area,
    bbox: {
      x: component.minX,
      y: component.minY,
      width: component.maxX - component.minX + 1,
      height: component.maxY - component.minY + 1,
    },
    centroid: {
      x: component.xTotal / component.area,
      y: component.yTotal / component.area,
    },
  }));
}

function cross(origin, left, right) {
  return (left.x - origin.x) * (right.y - origin.y)
    - (left.y - origin.y) * (right.x - origin.x);
}

export function convexHull(points) {
  if (points.length <= 1) return points.map((point) => ({ ...point }));
  const unique = [...new Map(points.map((point) => [`${point.x},${point.y}`, point])).values()]
    .sort((left, right) => left.x - right.x || left.y - right.y);
  if (unique.length <= 1) return unique.map((point) => ({ ...point }));
  const lower = [];
  for (const point of unique) {
    while (lower.length >= 2 && cross(lower.at(-2), lower.at(-1), point) <= 0) lower.pop();
    lower.push(point);
  }
  const upper = [];
  for (let index = unique.length - 1; index >= 0; index -= 1) {
    const point = unique[index];
    while (upper.length >= 2 && cross(upper.at(-2), upper.at(-1), point) <= 0) upper.pop();
    upper.push(point);
  }
  lower.pop();
  upper.pop();
  return [...lower, ...upper].map((point) => ({ ...point }));
}

export function polygonArea(points) {
  if (points.length < 3) return 0;
  let twiceArea = 0;
  for (let index = 0; index < points.length; index += 1) {
    const next = (index + 1) % points.length;
    twiceArea += points[index].x * points[next].y - points[next].x * points[index].y;
  }
  return Math.abs(twiceArea) / 2;
}

export function polygonPerimeter(points) {
  if (points.length < 2) return 0;
  let perimeter = 0;
  for (let index = 0; index < points.length; index += 1) {
    const next = (index + 1) % points.length;
    perimeter += Math.hypot(
      points[index].x - points[next].x,
      points[index].y - points[next].y,
    );
  }
  return perimeter;
}

function componentGeometry(component, width) {
  const corners = [];
  for (const index of component.pixels) {
    const x = index % width;
    const y = Math.floor(index / width);
    corners.push(
      { x, y }, { x: x + 1, y }, { x: x + 1, y: y + 1 }, { x, y: y + 1 },
    );
  }
  const hull = convexHull(corners);
  const hullArea = polygonArea(hull);
  const perimeter = polygonPerimeter(hull);
  return {
    hull,
    hullArea,
    perimeter,
    circularity: perimeter === 0 ? 0 : 4 * Math.PI * component.area / (perimeter ** 2),
    solidity: hullArea === 0 ? 0 : component.area / hullArea,
  };
}

function longestVerticalRun(component, width) {
  const centerX = Math.round(component.centroid.x);
  const rows = component.pixels
    .filter((index) => index % width === centerX)
    .map((index) => Math.floor(index / width))
    .sort((left, right) => left - right);
  let longest = 0;
  let current = 0;
  let previous = -2;
  for (const row of rows) {
    current = row === previous + 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
    previous = row;
  }
  return longest;
}

export function measureSun(frame, region = { x0: 0.05, y0: 0.02, x1: 0.95, y1: 0.30 }) {
  assertFrame(frame);
  const bounds = regionBounds(frame, region);
  const width = bounds.x1 - bounds.x0;
  const height = bounds.y1 - bounds.y0;
  const mask = new Uint8Array(width * height);
  for (let localY = 0; localY < height; localY += 1) {
    const y = bounds.y0 + localY;
    const reds = [];
    const blueDifferences = [];
    for (let x = bounds.x0; x < bounds.x1; x += 1) {
      const offset = channelOffset(frame, x, y);
      const red = frame.pixels[offset];
      const blue = frame.pixels[offset + 2];
      reds.push(red);
      blueDifferences.push(red - blue);
    }
    const rowMedianRed = percentile(reds, 0.5);
    const rowMedianDifference = percentile(blueDifferences, 0.5);
    for (let localX = 0; localX < width; localX += 1) {
      const x = bounds.x0 + localX;
      const offset = channelOffset(frame, x, y);
      const red = frame.pixels[offset];
      const green = frame.pixels[offset + 1];
      const blue = frame.pixels[offset + 2];
      if (
        encodedRec709Luma(red, green, blue) >= 180
        && red - rowMedianRed >= 12
        && (red - blue) - rowMedianDifference >= 10
      ) {
        mask[localY * width + localX] = 1;
      }
    }
  }
  const component = connectedComponents(mask, width, height)
    .sort((left, right) => right.area - left.area)[0];
  if (!component) return null;
  const geometry = componentGeometry(component, width);
  const equivalentDiameter = Math.sqrt(4 * component.area / Math.PI);
  const verticalRun = longestVerticalRun(component, width);
  return {
    area: component.area,
    bbox: {
      x: component.bbox.x + bounds.x0,
      y: component.bbox.y + bounds.y0,
      width: component.bbox.width,
      height: component.bbox.height,
    },
    centroid: {
      x: component.centroid.x + bounds.x0,
      y: component.centroid.y + bounds.y0,
    },
    aspectRatio: component.bbox.width / component.bbox.height,
    circularity: geometry.circularity,
    solidity: geometry.solidity,
    equivalentDiameter,
    verticalRun,
    verticalRunRatio: verticalRun / equivalentDiameter,
  };
}

function ridgeResult(
  frame,
  localMask,
  localWidth,
  localHeight,
  bounds,
  contract,
) {
  const qualifying = connectedComponents(localMask, localWidth, localHeight).filter((component) => (
    component.area >= contract.area
    && component.bbox.width >= contract.width
    && component.bbox.width / component.bbox.height >= contract.aspect
  ));
  const outputMask = new Uint8Array(frame.width * frame.height);
  const lumas = [];
  for (const component of qualifying) {
    for (const localIndex of component.pixels) {
      const localX = localIndex % localWidth;
      const localY = Math.floor(localIndex / localWidth);
      const index = (bounds.y0 + localY) * frame.width + bounds.x0 + localX;
      outputMask[index] = 1;
      const offset = index * frame.bytesPerPixel;
      lumas.push(encodedRec709Luma(
        frame.pixels[offset],
        frame.pixels[offset + 1],
        frame.pixels[offset + 2],
      ));
    }
  }
  return {
    mask: outputMask,
    pixelCount: lumas.length,
    componentCount: qualifying.length,
    median: lumas.length === 0 ? null : percentile(lumas, 0.5),
  };
}

function strongerBoundaryResult(frame, source, strongerResults, radius, minimumNeighbors) {
  if (!Number.isInteger(radius) || radius <= 0) {
    throw new Error('Stronger ridge boundary radius must be a positive integer.');
  }
  const maximumNeighbors = (radius * 2 + 1) ** 2 - 1;
  if (
    !Number.isInteger(minimumNeighbors)
    || minimumNeighbors <= 0
    || minimumNeighbors > maximumNeighbors
  ) {
    throw new Error(
      `Stronger ridge boundary minimum neighbors must be between 1 and ${maximumNeighbors}.`,
    );
  }
  if (strongerResults.length === 0) {
    throw new Error('Stronger ridge boundary requires a higher-threshold contract.');
  }
  const strongerMask = new Uint8Array(source.mask.length);
  for (const result of strongerResults) {
    for (let pixel = 0; pixel < strongerMask.length; pixel += 1) {
      if (result.mask[pixel]) strongerMask[pixel] = 1;
    }
  }
  const mask = new Uint8Array(source.mask.length);
  const lumas = [];
  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      const index = y * frame.width + x;
      if (!source.mask[index] || strongerMask[index]) continue;
      let strongerNeighborCount = 0;
      for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
        for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
          if (offsetX === 0 && offsetY === 0) continue;
          const neighborX = x + offsetX;
          const neighborY = y + offsetY;
          if (
            neighborX >= 0
            && neighborX < frame.width
            && neighborY >= 0
            && neighborY < frame.height
            && strongerMask[neighborY * frame.width + neighborX]
          ) {
            strongerNeighborCount += 1;
          }
        }
      }
      if (strongerNeighborCount < minimumNeighbors) continue;
      mask[index] = 1;
      const offset = index * frame.bytesPerPixel;
      lumas.push(encodedRec709Luma(
        frame.pixels[offset],
        frame.pixels[offset + 1],
        frame.pixels[offset + 2],
      ));
    }
  }
  return {
    mask,
    pixelCount: lumas.length,
    componentCount: source.componentCount,
    median: lumas.length === 0 ? null : percentile(lumas, 0.5),
  };
}

export function measureRidgeMasks(frame, region, contracts, exclusion) {
  assertFrame(frame);
  const bounds = regionBounds(frame, region);
  const localWidth = bounds.x1 - bounds.x0;
  const localHeight = bounds.y1 - bounds.y0;
  const masks = contracts.map(() => new Uint8Array(localWidth * localHeight));
  const lumas = new Float32Array(frame.width * frame.height);
  for (let y = Math.max(0, bounds.y0 - 7); y < Math.min(frame.height, bounds.y1 + 7); y += 1) {
    for (let x = bounds.x0; x < bounds.x1; x += 1) lumas[y * frame.width + x] = pixelLuma(frame, x, y);
  }
  for (let y = Math.max(bounds.y0, 7); y < Math.min(bounds.y1, frame.height - 7); y += 1) {
    for (let x = bounds.x0; x < bounds.x1; x += 1) {
      if (containsPixel(frame, exclusion, x, y)
        || containsPixel(frame, exclusion, x, y - 7)
        || containsPixel(frame, exclusion, x, y + 7)) continue;
      const ridgeDelta = lumas[y * frame.width + x]
        - (lumas[(y - 7) * frame.width + x] + lumas[(y + 7) * frame.width + x]) / 2;
      const localIndex = (y - bounds.y0) * localWidth + x - bounds.x0;
      contracts.forEach((contract, index) => {
        if (ridgeDelta >= contract.threshold) masks[index][localIndex] = 1;
      });
    }
  }
  const baseResults = contracts.map((contract, index) => (
    ridgeResult(
      frame,
      masks[index],
      localWidth,
      localHeight,
      bounds,
      contract,
    )
  ));
  return contracts.map((contract, index) => {
    if (contract.strongerBoundaryRadius === undefined) return baseResults[index];
    return strongerBoundaryResult(
      frame,
      baseResults[index],
      baseResults.filter((_, otherIndex) => (
        contracts[otherIndex].threshold > contract.threshold
      )),
      contract.strongerBoundaryRadius,
      contract.strongerBoundaryMinimumNeighbors,
    );
  });
}

export function measureRidgeMask(frame, region, contract, exclusion) {
  return measureRidgeMasks(frame, region, [contract], exclusion)[0];
}

function warmBeaconCorePixel(frame, x, y) {
  const offset = channelOffset(frame, x, y);
  const red = frame.pixels[offset];
  const green = frame.pixels[offset + 1];
  const blue = frame.pixels[offset + 2];
  return red >= green * 1.05
    && green >= blue * 1.03
    && pixelSaturation(frame, x, y) >= 0.35
    && pixelLuma(frame, x, y) <= 220;
}

function emptyLandmarkResult(frame) {
  return {
    area: 0,
    bbox: null,
    towerHeightRatio: 0,
    widthRatio: 0,
    supportAt160: 0,
    localContrastP10: 0,
    mask: new Uint8Array(frame.width * frame.height),
  };
}

export function measureLandmarkSilhouette(frame, region) {
  assertFrame(frame);
  const bounds = regionBounds(frame, region);
  const centerX = Math.round(frame.width * 0.35);
  const centerSamples = [];
  for (let y = bounds.y0; y < bounds.y1; y += 1) {
    centerSamples.push({
      y,
      luma: pixelLuma(frame, centerX, y),
      saturation: pixelSaturation(frame, centerX, y),
      warm: warmBeaconCorePixel(frame, centerX, y),
    });
  }
  const stableRuns = [];
  let stableStart = 0;
  for (let index = 1; index <= centerSamples.length; index += 1) {
    const previous = centerSamples[index - 1];
    const current = centerSamples[index];
    const continues = index < centerSamples.length
      && previous.saturation <= 0.35
      && current.saturation <= 0.35
      && Math.abs(previous.luma - current.luma) <= 2;
    if (continues) continue;
    stableRuns.push({
      start: centerSamples[stableStart].y,
      end: previous.y,
      length: index - stableStart,
      luma: percentile(
        centerSamples.slice(stableStart, index).map((sample) => sample.luma),
        0.5,
      ),
    });
    stableStart = index;
  }
  const body = stableRuns.sort((left, right) => right.length - left.length)[0];
  const minimumBodyHeight = Math.round(frame.height * 0.15);
  if (!body || body.length < minimumBodyHeight) return emptyLandmarkResult(frame);

  const warmRuns = [];
  let warmStart = null;
  for (const sample of centerSamples) {
    if (sample.y >= body.start || !sample.warm) {
      if (warmStart !== null) {
        warmRuns.push({ start: warmStart, end: sample.y - 1 });
        warmStart = null;
      }
      continue;
    }
    if (warmStart === null) warmStart = sample.y;
  }
  if (warmStart !== null) warmRuns.push({ start: warmStart, end: body.start - 1 });
  const maximumCapGap = Math.round(frame.height * 0.08);
  const beacon = warmRuns
    .filter((run) => run.end - run.start + 1 >= 5 && body.start - run.end <= maximumCapGap)
    .sort((left, right) => (
      (right.end - right.start) - (left.end - left.start) || right.end - left.end
    ))[0];
  if (!beacon) return emptyLandmarkResult(frame);

  const maximumRoofGap = 2;
  const scanRoofRun = (start, direction, limit) => {
    let y = start;
    let gap = 0;
    const withinLimit = () => (direction < 0 ? y >= limit : y <= limit);
    while (
      withinLimit()
      && pixelLuma(frame, centerX, y) > body.luma - 32
      && gap < maximumRoofGap
    ) {
      y += direction;
      gap += 1;
    }
    let rows = 0;
    while (withinLimit() && pixelLuma(frame, centerX, y) <= body.luma - 32) {
      rows += 1;
      y += direction;
    }
    return { gap, rows };
  };
  const roofBeforeBeacon = scanRoofRun(beacon.start - 1, -1, bounds.y0);
  const roofAfterBeacon = scanRoofRun(beacon.end + 1, 1, body.start - 1);
  const minimumRoofRun = 4;
  if (Math.max(roofBeforeBeacon.rows, roofAfterBeacon.rows) < minimumRoofRun) {
    return emptyLandmarkResult(frame);
  }
  const capTop = roofBeforeBeacon.rows >= minimumRoofRun
    ? beacon.start - roofBeforeBeacon.gap - roofBeforeBeacon.rows
    : beacon.start;

  const outputMask = new Uint8Array(frame.width * frame.height);
  let bboxLeft = centerX;
  let bboxRight = centerX;
  let bboxTop = frame.height;
  let bboxBottom = -1;
  let area = 0;
  const maximumRunWidth = Math.floor(frame.width * 0.14);
  const markCenterRun = (y, predicate) => {
    if (!predicate(centerX)) return;
    let left = centerX;
    let right = centerX;
    while (left > bounds.x0 && predicate(left - 1)) left -= 1;
    while (right + 1 < bounds.x1 && predicate(right + 1)) right += 1;
    const runWidth = right - left + 1;
    if (
      runWidth < 8
      || runWidth > maximumRunWidth
      || left === bounds.x0
      || right === bounds.x1 - 1
    ) return;
    const nextLeft = Math.min(bboxLeft, left);
    const nextRight = Math.max(bboxRight, right);
    if (nextRight - nextLeft + 1 > maximumRunWidth) return;
    bboxLeft = nextLeft;
    bboxRight = nextRight;
    bboxTop = Math.min(bboxTop, y);
    bboxBottom = Math.max(bboxBottom, y);
    for (let x = left; x <= right; x += 1) {
      outputMask[y * frame.width + x] = 1;
      area += 1;
    }
  };
  for (let y = capTop; y < body.start; y += 1) {
    markCenterRun(y, (x) => (
      warmBeaconCorePixel(frame, x, y)
      || pixelLuma(frame, x, y) <= body.luma - 32
    ));
  }
  for (let y = body.start; y <= body.end; y += 1) {
    markCenterRun(y, (x) => (
      pixelSaturation(frame, x, y) <= 0.35
      && Math.abs(pixelLuma(frame, x, y) - body.luma) <= 4
    ));
  }
  if (bboxBottom < bboxTop) return emptyLandmarkResult(frame);
  const rowContrasts = [];
  for (let y = bboxTop; y <= bboxBottom; y += 1) {
    const inside = [];
    for (let x = bboxLeft; x <= bboxRight; x += 1) {
      if (outputMask[y * frame.width + x]) inside.push(pixelLuma(frame, x, y));
    }
    if (inside.length === 0) continue;
    const leftBackground = [];
    const rightBackground = [];
    for (let distance = 2; distance <= 4; distance += 1) {
      if (bboxLeft - distance >= 0) leftBackground.push(pixelLuma(frame, bboxLeft - distance, y));
      if (bboxRight + distance < frame.width) {
        rightBackground.push(pixelLuma(frame, bboxRight + distance, y));
      }
    }
    if (leftBackground.length === 0 || rightBackground.length === 0) continue;
    const insideMedian = percentile(inside, 0.5);
    rowContrasts.push(Math.max(
      Math.abs(insideMedian - percentile(leftBackground, 0.5)),
      Math.abs(insideMedian - percentile(rightBackground, 0.5)),
    ));
  }
  const targetHeight = Math.max(1, Math.round(frame.height * 160 / frame.width));
  const supportAt160 = resizeMaskSupport(
    outputMask,
    frame.width,
    frame.height,
    160,
    targetHeight,
  );
  return {
    area,
    bbox: {
      x: bboxLeft,
      y: bboxTop,
      width: bboxRight - bboxLeft + 1,
      height: bboxBottom - bboxTop + 1,
    },
    towerHeightRatio: (bboxBottom - bboxTop + 1) / frame.height,
    widthRatio: (bboxRight - bboxLeft + 1) / frame.width,
    supportAt160,
    localContrastP10: rowContrasts.length === 0 ? 0 : percentile(rowContrasts, 0.1),
    mask: outputMask,
  };
}

export function areaAverageResize(frame, targetWidth, targetHeight) {
  assertFrame(frame);
  if (!Number.isInteger(targetWidth) || targetWidth <= 0
    || !Number.isInteger(targetHeight) || targetHeight <= 0) {
    throw new Error('Resize target dimensions must be positive integers.');
  }
  const pixels = Buffer.alloc(targetWidth * targetHeight * 4);
  const scaleX = frame.width / targetWidth;
  const scaleY = frame.height / targetHeight;
  for (let targetY = 0; targetY < targetHeight; targetY += 1) {
    const sourceY0 = targetY * scaleY;
    const sourceY1 = (targetY + 1) * scaleY;
    for (let targetX = 0; targetX < targetWidth; targetX += 1) {
      const sourceX0 = targetX * scaleX;
      const sourceX1 = (targetX + 1) * scaleX;
      const totals = [0, 0, 0, 0];
      let weightTotal = 0;
      for (let sourceY = Math.floor(sourceY0); sourceY < Math.ceil(sourceY1); sourceY += 1) {
        const yWeight = Math.min(sourceY1, sourceY + 1) - Math.max(sourceY0, sourceY);
        for (let sourceX = Math.floor(sourceX0); sourceX < Math.ceil(sourceX1); sourceX += 1) {
          const xWeight = Math.min(sourceX1, sourceX + 1) - Math.max(sourceX0, sourceX);
          const weight = xWeight * yWeight;
          const offset = channelOffset(frame, sourceX, sourceY);
          totals[0] += frame.pixels[offset] * weight;
          totals[1] += frame.pixels[offset + 1] * weight;
          totals[2] += frame.pixels[offset + 2] * weight;
          totals[3] += (frame.bytesPerPixel === 4 ? frame.pixels[offset + 3] : 255) * weight;
          weightTotal += weight;
        }
      }
      const targetOffset = (targetY * targetWidth + targetX) * 4;
      for (let channel = 0; channel < 4; channel += 1) {
        pixels[targetOffset + channel] = Math.round(totals[channel] / weightTotal);
      }
    }
  }
  return { width: targetWidth, height: targetHeight, bytesPerPixel: 4, pixels };
}

export function posterizeFrame(frame) {
  assertFrame(frame);
  const pixels = Buffer.alloc(frame.width * frame.height * 4);
  const graySamples = [];
  for (let pixel = 0; pixel < frame.width * frame.height; pixel += 1) {
    const offset = pixel * frame.bytesPerPixel;
    const value = encodedRec709Luma(
      frame.pixels[offset],
      frame.pixels[offset + 1],
      frame.pixels[offset + 2],
    );
    graySamples.push(value);
    const bin = value < VALUE_BOUNDS[0] ? 0
      : value < VALUE_BOUNDS[1] ? 1
        : value < VALUE_BOUNDS[2] ? 2 : 3;
    const targetOffset = pixel * 4;
    pixels[targetOffset] = THUMBNAIL_LEVELS[bin];
    pixels[targetOffset + 1] = THUMBNAIL_LEVELS[bin];
    pixels[targetOffset + 2] = THUMBNAIL_LEVELS[bin];
    pixels[targetOffset + 3] = 255;
  }
  const posterized = { width: frame.width, height: frame.height, bytesPerPixel: 4, pixels };
  return {
    frame: posterized,
    coverage: fourBinCoverage(posterized),
    grayP05: percentile(graySamples, 0.05),
    grayP95: percentile(graySamples, 0.95),
  };
}

export function resizeMaskSupport(mask, width, height, targetWidth, targetHeight) {
  if (!(mask instanceof Uint8Array) || mask.length !== width * height) {
    throw new Error('Resize mask length does not match its dimensions.');
  }
  const scaleX = width / targetWidth;
  const scaleY = height / targetHeight;
  let supportedPixels = 0;
  for (let targetY = 0; targetY < targetHeight; targetY += 1) {
    const y0 = Math.floor(targetY * scaleY);
    const y1 = Math.ceil((targetY + 1) * scaleY);
    for (let targetX = 0; targetX < targetWidth; targetX += 1) {
      const x0 = Math.floor(targetX * scaleX);
      const x1 = Math.ceil((targetX + 1) * scaleX);
      let occupied = false;
      for (let y = y0; y < y1 && !occupied; y += 1) {
        for (let x = x0; x < x1; x += 1) {
          if (mask[y * width + x]) {
            occupied = true;
            break;
          }
        }
      }
      if (occupied) supportedPixels += 1;
    }
  }
  return supportedPixels;
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii');
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return chunk;
}

export function encodePng(frame) {
  assertFrame(frame);
  const rgba = Buffer.alloc((frame.width * 4 + 1) * frame.height);
  for (let y = 0; y < frame.height; y += 1) {
    const row = y * (frame.width * 4 + 1);
    rgba[row] = 0;
    for (let x = 0; x < frame.width; x += 1) {
      const source = channelOffset(frame, x, y);
      const target = row + 1 + x * 4;
      rgba[target] = frame.pixels[source];
      rgba[target + 1] = frame.pixels[source + 1];
      rgba[target + 2] = frame.pixels[source + 2];
      rgba[target + 3] = frame.bytesPerPixel === 4 ? frame.pixels[source + 3] : 255;
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(frame.width, 0);
  header.writeUInt32BE(frame.height, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(rgba)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

export function composeContactSheet(frames, columns = 2) {
  if (frames.length === 0) throw new Error('Contact sheet requires at least one frame.');
  const { width, height } = frames[0];
  for (const frame of frames) {
    assertFrame(frame);
    if (frame.width !== width || frame.height !== height) {
      throw new Error('Contact sheet frames must have identical dimensions.');
    }
  }
  const rows = Math.ceil(frames.length / columns);
  const pixels = Buffer.alloc(width * columns * height * rows * 4, 20);
  const sheetWidth = width * columns;
  for (let index = 0; index < frames.length; index += 1) {
    const originX = (index % columns) * width;
    const originY = Math.floor(index / columns) * height;
    const frame = frames[index];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const source = channelOffset(frame, x, y);
        const target = ((originY + y) * sheetWidth + originX + x) * 4;
        pixels[target] = frame.pixels[source];
        pixels[target + 1] = frame.pixels[source + 1];
        pixels[target + 2] = frame.pixels[source + 2];
        pixels[target + 3] = frame.bytesPerPixel === 4 ? frame.pixels[source + 3] : 255;
      }
    }
  }
  return { width: sheetWidth, height: height * rows, bytesPerPixel: 4, pixels };
}
