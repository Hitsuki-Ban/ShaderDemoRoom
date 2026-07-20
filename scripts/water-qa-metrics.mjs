import { inflateSync } from 'node:zlib';

export function parsePng(buffer) {
  if (buffer[0] !== 137 || buffer[1] !== 80) {
    throw new Error('Expected a PNG screenshot.');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    offset += 4;
    const type = buffer.subarray(offset, offset + 4).toString('ascii');
    offset += 4;
    const data = buffer.subarray(offset, offset + length);
    offset += length + 4;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
    throw new Error(`Unsupported PNG format ${bitDepth}/${colorType}.`);
  }

  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const stride = width * bytesPerPixel;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(width * height * bytesPerPixel);
  let source = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = raw[source];
    source += 1;
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const previousRow = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x += 1) {
      const value = raw[source];
      source += 1;
      const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
      const up = previousRow ? previousRow[x] : 0;
      const upLeft = previousRow && x >= bytesPerPixel ? previousRow[x - bytesPerPixel] : 0;
      let reconstructed = value;

      if (filter === 1) {
        reconstructed += left;
      } else if (filter === 2) {
        reconstructed += up;
      } else if (filter === 3) {
        reconstructed += Math.floor((left + up) / 2);
      } else if (filter === 4) {
        const predictor = left + up - upLeft;
        const leftDistance = Math.abs(predictor - left);
        const upDistance = Math.abs(predictor - up);
        const upLeftDistance = Math.abs(predictor - upLeft);
        reconstructed += leftDistance <= upDistance && leftDistance <= upLeftDistance
          ? left
          : upDistance <= upLeftDistance
            ? up
            : upLeft;
      } else if (filter !== 0) {
        throw new Error(`Unsupported PNG filter ${filter}.`);
      }

      row[x] = reconstructed & 255;
    }
  }

  return { width, height, bytesPerPixel, pixels };
}

export function compareFrames(previous, next, sampleScale) {
  let total = 0;
  let strong = 0;
  let max = 0;
  let count = 0;

  for (let y = 0; y < previous.height; y += sampleScale) {
    for (let x = 0; x < previous.width; x += sampleScale) {
      const index = (y * previous.width + x) * previous.bytesPerPixel;
      const delta = (
        Math.abs(previous.pixels[index] - next.pixels[index]) +
        Math.abs(previous.pixels[index + 1] - next.pixels[index + 1]) +
        Math.abs(previous.pixels[index + 2] - next.pixels[index + 2])
      ) / 3;

      total += delta;
      if (delta > 28) {
        strong += 1;
      }
      if (delta > max) {
        max = delta;
      }
      count += 1;
    }
  }

  return {
    meanDelta: total / count,
    strongRatio: strong / count,
    maxDelta: max,
  };
}

export function summarize(diffs, key) {
  return diffs.reduce((sum, diff) => sum + diff[key], 0) / diffs.length;
}

export function luma(r, g, b) {
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

export function saturation(r, g, b) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const lightness = (max + min) / 2;

  if (max === min) {
    return 0;
  }

  return (max - min) / (1 - Math.abs(2 * lightness - 1));
}

export function hue(r, g, b) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  if (delta === 0) {
    return 0;
  }

  let value = 0;
  if (max === red) {
    value = ((green - blue) / delta) % 6;
  } else if (max === green) {
    value = (blue - red) / delta + 2;
  } else {
    value = (red - green) / delta + 4;
  }

  return (value * 60 + 360) % 360;
}

export function measureRegion(frame, region, sampleScale) {
  const x0 = Math.floor(region.x0 * frame.width);
  const x1 = Math.floor(region.x1 * frame.width);
  const y0 = Math.floor(region.y0 * frame.height);
  const y1 = Math.floor(region.y1 * frame.height);
  let lumaTotal = 0;
  let saturationMin = 1;
  let saturationMax = 0;
  let lumaMin = 255;
  let lumaMax = 0;
  let redTotal = 0;
  let greenTotal = 0;
  let blueTotal = 0;
  let saturationTotal = 0;
  let hueX = 0;
  let hueY = 0;
  let waterLike = 0;
  let localContrastTotal = 0;
  let localContrastCount = 0;
  const lumaSamples = [];
  const lumaBands = new Array(12).fill(0);
  let count = 0;

  for (let y = y0; y < y1; y += sampleScale) {
    for (let x = x0; x < x1; x += sampleScale) {
      const index = (y * frame.width + x) * frame.bytesPerPixel;
      const r = frame.pixels[index];
      const g = frame.pixels[index + 1];
      const b = frame.pixels[index + 2];
      const pixelLuma = luma(r, g, b);
      const pixelSaturation = saturation(r, g, b);
      const pixelHue = hue(r, g, b);
      const hueRadians = (pixelHue * Math.PI) / 180;

      redTotal += r;
      greenTotal += g;
      blueTotal += b;
      lumaTotal += pixelLuma;
      saturationTotal += pixelSaturation;
      hueX += Math.cos(hueRadians) * pixelSaturation;
      hueY += Math.sin(hueRadians) * pixelSaturation;
      lumaMin = Math.min(lumaMin, pixelLuma);
      lumaMax = Math.max(lumaMax, pixelLuma);
      lumaSamples.push(pixelLuma);
      lumaBands[Math.min(lumaBands.length - 1, Math.floor(pixelLuma / 22))] += 1;
      saturationMin = Math.min(saturationMin, pixelSaturation);
      saturationMax = Math.max(saturationMax, pixelSaturation);
      if (g > r * 1.05 && b > r * 1.08 && g + b > 92) {
        waterLike += 1;
      }

      const nextX = Math.min(frame.width - 1, x + sampleScale);
      const nextY = Math.min(frame.height - 1, y + sampleScale);
      const nextIndex = (nextY * frame.width + nextX) * frame.bytesPerPixel;
      localContrastTotal += (
        Math.abs(r - frame.pixels[nextIndex]) +
        Math.abs(g - frame.pixels[nextIndex + 1]) +
        Math.abs(b - frame.pixels[nextIndex + 2])
      ) / 3;
      localContrastCount += 1;
      count += 1;
    }
  }

  lumaSamples.sort((a, b) => a - b);
  const p10 = lumaSamples[Math.floor(lumaSamples.length * 0.1)] ?? lumaMin;
  const p90 = lumaSamples[Math.floor(lumaSamples.length * 0.9)] ?? lumaMax;
  const activeLumaBands = lumaBands.filter((bandCount) => bandCount / count > 0.018).length;
  const hueMean = (Math.atan2(hueY, hueX) * 180 / Math.PI + 360) % 360;
  const redMean = redTotal / count;
  const greenMean = greenTotal / count;
  const blueMean = blueTotal / count;
  const colorSignature = {
    rMean: Number(redMean.toFixed(2)),
    gMean: Number(greenMean.toFixed(2)),
    bMean: Number(blueMean.toFixed(2)),
    hueMean: Number(hueMean.toFixed(2)),
    saturationMean: Number((saturationTotal / count).toFixed(4)),
    cyanBias: Number(((greenMean + blueMean - redMean * 2) / 510).toFixed(4)),
    warmCoolBias: Number(((redMean - blueMean) / 255).toFixed(4)),
  };

  return {
    lumaMean: lumaTotal / count,
    waterLuma: lumaTotal / count,
    waterCoverage: waterLike / count,
    saturationRange: saturationMax - saturationMin,
    waterSaturationRange: saturationMax - saturationMin,
    toonBandSeparation: (p90 - p10) / Math.max(1, activeLumaBands - 1),
    voxelLocalContrast: localContrastTotal / localContrastCount,
    hueMean,
    colorSignature,
  };
}

export function regionMetrics(frame, sampleScale) {
  const sky = measureRegion(frame, { x0: 0.08, x1: 0.92, y0: 0.02, y1: 0.28 }, sampleScale);
  const horizon = measureRegion(frame, { x0: 0.06, x1: 0.94, y0: 0.24, y1: 0.52 }, sampleScale);
  const water = measureRegion(frame, { x0: 0.06, x1: 0.94, y0: 0.42, y1: 0.94 }, sampleScale);

  return {
    sky: {
      lumaMean: Number(sky.lumaMean.toFixed(2)),
      skyLuma: Number(sky.lumaMean.toFixed(2)),
      saturationRange: Number(sky.saturationRange.toFixed(4)),
      colorSignature: sky.colorSignature,
    },
    horizon: {
      lumaMean: Number(horizon.lumaMean.toFixed(2)),
      waterCoverage: Number(horizon.waterCoverage.toFixed(5)),
      saturationRange: Number(horizon.saturationRange.toFixed(4)),
      colorSignature: horizon.colorSignature,
    },
    water: {
      lumaMean: Number(water.lumaMean.toFixed(2)),
      waterLuma: Number(water.waterLuma.toFixed(2)),
      waterCoverage: Number(water.waterCoverage.toFixed(5)),
      saturationRange: Number(water.saturationRange.toFixed(4)),
      waterSaturationRange: Number(water.waterSaturationRange.toFixed(4)),
      toonBandSeparation: Number(water.toonBandSeparation.toFixed(3)),
      voxelLocalContrast: Number(water.voxelLocalContrast.toFixed(3)),
      hueMean: Number(water.hueMean.toFixed(2)),
      colorSignature: water.colorSignature,
    },
  };
}

export const MAX_VERTICAL_SEAM_SCORE = 1.5;
export const MAX_STORM_FOREGROUND_SEAM_SCORE = 1.0;

export function measureVerticalSeam(frame, scan = {
  yStartRatio: 0.28,
  yEndRatio: 0.94,
  xStartRatio: 0.08,
  xEndRatio: 0.92,
}) {
  const yStart = Math.floor(frame.height * scan.yStartRatio);
  const yEnd = Math.floor(frame.height * scan.yEndRatio);
  const xStart = Math.floor(frame.width * scan.xStartRatio);
  const xEnd = Math.floor(frame.width * scan.xEndRatio);
  const neighborOffset = 5;
  let bestScore = -Infinity;
  let bestXTop = xStart;
  let bestSlope = 0;

  for (let slopeStep = -15; slopeStep <= 0; slopeStep += 1) {
    const slope = slopeStep / 100;
    const pathHeight = yEnd - yStart - 1;
    for (let xTop = xStart; xTop < xEnd; xTop += 1) {
      const xBottom = Math.round(xTop + slope * pathHeight);
      if (xBottom < xStart || xBottom >= xEnd) {
        continue;
      }
      const rowScores = [];

      for (let y = yStart; y < yEnd; y += 1) {
        const x = Math.round(xTop + slope * (y - yStart));
        if (x < neighborOffset || x >= frame.width - neighborOffset) {
          continue;
        }

        const centerIndex = (y * frame.width + x) * frame.bytesPerPixel;
        const leftIndex = (y * frame.width + x - neighborOffset) * frame.bytesPerPixel;
        const rightIndex = (y * frame.width + x + neighborOffset) * frame.bytesPerPixel;
        let rowScore = 0;
        for (let channel = 0; channel < 3; channel += 1) {
          const left = frame.pixels[leftIndex + channel];
          const right = frame.pixels[rightIndex + channel];
          const center = frame.pixels[centerIndex + channel];
          rowScore += Math.min(
            Math.abs(center - left),
            Math.abs(center - right),
          ) / 3;
        }
        rowScores.push(rowScore);
      }

      if (rowScores.length === 0) {
        continue;
      }
      rowScores.sort((left, right) => left - right);
      const continuityIndex = Math.floor((rowScores.length - 1) * 0.4);
      const score = rowScores[continuityIndex];
      if (score > bestScore) {
        bestScore = score;
        bestXTop = xTop;
        bestSlope = slope;
      }
    }
  }

  const pathHeight = yEnd - yStart - 1;
  return {
    score: bestScore,
    xTop: bestXTop,
    yTop: yStart,
    xBottom: Math.round(bestXTop + bestSlope * pathHeight),
    yBottom: yEnd - 1,
    slope: bestSlope,
  };
}

export function measurePersistentVerticalSeam(frames, scan) {
  if (frames.length === 0) {
    throw new Error('Persistent vertical seam measurement requires at least one frame.');
  }

  const seams = frames.map((frame, frameIndex) => ({
    ...measureVerticalSeam(frame, scan),
    frameIndex,
  }));
  const sorted = [...seams].sort((left, right) => left.score - right.score);
  const middle = Math.floor(sorted.length / 2);
  const persistentScore = sorted.length % 2 === 0
    ? (sorted[middle - 1].score + sorted[middle].score) / 2
    : sorted[middle].score;
  const representative = sorted.reduce((closest, seam) => (
    Math.abs(seam.score - persistentScore) < Math.abs(closest.score - persistentScore)
      ? seam
      : closest
  ));

  return {
    ...representative,
    score: persistentScore,
    maxScore: sorted.at(-1).score,
    frameScores: seams.map((seam) => seam.score),
  };
}
