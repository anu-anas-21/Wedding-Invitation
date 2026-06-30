import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesDir = path.join(root, 'public/images');

const pairs = [
  {
    input: path.join(imagesDir, 'musfir-fasna.png'),
    output: path.join(imagesDir, 'musfir-fasna.png'),
  },
  {
    input: path.join(imagesDir, 'fasil-rinshana.png'),
    output: path.join(imagesDir, 'fasil-rinshana.png'),
  },
];

function isBackgroundPixel(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  // White / off-white studio background
  if (lum >= 232 && sat <= 0.14) return true;
  // Light gray checkerboard export artifacts
  if (r >= 185 && g >= 185 && b >= 185 && Math.abs(r - g) <= 12 && Math.abs(g - b) <= 12) {
    return true;
  }
  return false;
}

function removeBackground(data, width, height) {
  const pixels = new Uint8Array(data);
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pixelAt = (x, y) => y * width + x;
  const offset = (x, y) => pixelAt(x, y) * 4;

  const trySeed = (x, y) => {
    const pi = pixelAt(x, y);
    const i = offset(x, y);
    if (visited[pi]) return;
    if (!isBackgroundPixel(pixels[i], pixels[i + 1], pixels[i + 2])) return;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x += 1) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const pi = pixelAt(x, y);
    if (visited[pi]) continue;

    const i = offset(x, y);
    if (!isBackgroundPixel(pixels[i], pixels[i + 1], pixels[i + 2])) continue;

    visited[pi] = 1;
    pixels[i + 3] = 0;

    if (x > 0) queue.push([x - 1, y]);
    if (x < width - 1) queue.push([x + 1, y]);
    if (y > 0) queue.push([x, y - 1]);
    if (y < height - 1) queue.push([x, y + 1]);
  }

  return pixels;
}

async function processImage({ input, output }) {
  const temp = `${output}.tmp.png`;
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = removeBackground(data, info.width, info.height);

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(temp);

  const fs = await import('fs/promises');
  await fs.copyFile(temp, output);
  await fs.unlink(temp);

  const meta = await sharp(output).metadata();
  console.log(`Processed ${path.basename(output)} (${info.width}x${info.height}, alpha=${meta.hasAlpha})`);
}

for (const pair of pairs) {
  await processImage(pair);
}
