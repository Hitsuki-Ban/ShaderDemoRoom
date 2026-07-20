function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

export function downsampleFrame(frame, scale) {
  invariant(Number.isInteger(scale) && scale > 0, 'Downsample scale must be a positive integer.');
  const width = Math.ceil(frame.width / scale);
  const height = Math.ceil(frame.height / scale);
  const pixels = Buffer.alloc(width * height * frame.bytesPerPixel);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      for (let channel = 0; channel < frame.bytesPerPixel; channel += 1) {
        let total = 0;
        let sampleCount = 0;
        for (let offsetY = 0; offsetY < scale && y * scale + offsetY < frame.height; offsetY += 1) {
          for (let offsetX = 0; offsetX < scale && x * scale + offsetX < frame.width; offsetX += 1) {
            const sourceX = x * scale + offsetX;
            const sourceY = y * scale + offsetY;
            const sourceIndex = (
              sourceY * frame.width + sourceX
            ) * frame.bytesPerPixel + channel;
            total += frame.pixels[sourceIndex];
            sampleCount += 1;
          }
        }
        pixels[(y * width + x) * frame.bytesPerPixel + channel] = Math.round(
          total / sampleCount,
        );
      }
    }
  }

  return { width, height, bytesPerPixel: frame.bytesPerPixel, pixels };
}

export function srgbByteToLinear(value) {
  const encoded = value / 255;
  return encoded <= 0.04045
    ? encoded / 12.92
    : ((encoded + 0.055) / 1.055) ** 2.4;
}

function pixelLuma(frame, pixelIndex, linear) {
  const index = pixelIndex * frame.bytesPerPixel;
  const red = frame.pixels[index];
  const green = frame.pixels[index + 1];
  const blue = frame.pixels[index + 2];
  if (!linear) return red * 0.2126 + green * 0.7152 + blue * 0.0722;
  return srgbByteToLinear(red) * 0.2126
    + srgbByteToLinear(green) * 0.7152
    + srgbByteToLinear(blue) * 0.0722;
}

function percentile(sortedValues, ratio) {
  return sortedValues[Math.min(
    sortedValues.length - 1,
    Math.floor(sortedValues.length * ratio),
  )] ?? 0;
}

export function measureCausticsDifference(onFrame, offFrame) {
  invariant(
    onFrame.width === offFrame.width
      && onFrame.height === offFrame.height
      && onFrame.bytesPerPixel === offFrame.bytesPerPixel,
    'Caustics ON/OFF frames must have identical dimensions.',
  );
  const pixelCount = onFrame.width * onFrame.height;
  const linearDeltas = new Float32Array(pixelCount);
  const positiveLinear = [];
  const positiveBytes = [];

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    const linearDelta = Math.max(
      0,
      pixelLuma(onFrame, pixelIndex, true) - pixelLuma(offFrame, pixelIndex, true),
    );
    const byteDelta = Math.max(
      0,
      pixelLuma(onFrame, pixelIndex, false) - pixelLuma(offFrame, pixelIndex, false),
    );
    linearDeltas[pixelIndex] = linearDelta;
    if (linearDelta > 0) positiveLinear.push(linearDelta);
    if (byteDelta > 0) positiveBytes.push(byteDelta);
  }
  invariant(
    positiveLinear.length > 0 && positiveBytes.length > 0,
    'Caustics ON/OFF pair produced no positive luminance delta.',
  );
  positiveLinear.sort((left, right) => left - right);
  positiveBytes.sort((left, right) => left - right);
  const peakLinear = percentile(positiveLinear, 0.999);
  const peakBytes = percentile(positiveBytes, 0.999);
  const activeThreshold = Math.max(peakLinear * 0.08, srgbByteToLinear(2));
  const halfThreshold = peakLinear * 0.5;
  const plateauThreshold = peakLinear * 0.995;
  let activePixels = 0;
  let activeLinearTotal = 0;
  let halfMaxPixels = 0;
  let plateauPixels = 0;
  let anyChannelClipped = 0;
  let allChannelsClipped = 0;
  let weightTotal = 0;
  let weightedX = 0;
  let weightedY = 0;
  const onHalfMaxLinear = [];
  const onHalfMaxBytes = [];

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    const delta = linearDeltas[pixelIndex];
    if (delta >= activeThreshold) {
      activePixels += 1;
      activeLinearTotal += delta;
    }
    if (delta < halfThreshold) continue;
    halfMaxPixels += 1;
    if (delta >= plateauThreshold) plateauPixels += 1;
    const x = pixelIndex % onFrame.width;
    const y = Math.floor(pixelIndex / onFrame.width);
    const weight = (delta - halfThreshold) ** 2;
    weightTotal += weight;
    weightedX += x * weight;
    weightedY += y * weight;
    onHalfMaxLinear.push(pixelLuma(onFrame, pixelIndex, true));
    onHalfMaxBytes.push(pixelLuma(onFrame, pixelIndex, false));
    const channelIndex = pixelIndex * onFrame.bytesPerPixel;
    const red = onFrame.pixels[channelIndex];
    const green = onFrame.pixels[channelIndex + 1];
    const blue = onFrame.pixels[channelIndex + 2];
    if (red === 255 || green === 255 || blue === 255) anyChannelClipped += 1;
    if (red === 255 && green === 255 && blue === 255) allChannelsClipped += 1;
  }
  invariant(
    halfMaxPixels > 0 && weightTotal > 0,
    'Caustics ON/OFF pair did not produce a measurable half-maximum focus.',
  );
  onHalfMaxLinear.sort((left, right) => left - right);
  onHalfMaxBytes.sort((left, right) => left - right);

  return {
    positivePixels: positiveLinear.length,
    activePixels,
    activeCoverage: activePixels / pixelCount,
    activeMeanLinear: activeLinearTotal / activePixels,
    peakLinearP999: peakLinear,
    peakByteP999: peakBytes,
    halfMaxPixels,
    halfMaxEquivalentRadius: Math.sqrt(halfMaxPixels / Math.PI),
    plateauPixels,
    plateauRatio: plateauPixels / halfMaxPixels,
    plateauCoverage: plateauPixels / activePixels,
    centroid: {
      x: weightedX / weightTotal / onFrame.width,
      y: weightedY / weightTotal / onFrame.height,
    },
    onHalfMaxLinearP999: percentile(onHalfMaxLinear, 0.999),
    onHalfMaxByteP999: percentile(onHalfMaxBytes, 0.999),
    anyChannelClipRatio: anyChannelClipped / halfMaxPixels,
    allChannelClipRatio: allChannelsClipped / halfMaxPixels,
  };
}
