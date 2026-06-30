import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const assetDir =
  'C:\\Users\\Krishna\\.cursor\\projects\\c-Musfi-Wedding-Page\\assets';

const sources = [
  {
    input: path.join(
      assetDir,
      'c__Users_Krishna_AppData_Roaming_Cursor_User_workspaceStorage_3e67aa65c6ba697027b201bc447a1f89_images_Gemini_Generated_Image_1zx10a1zx10a1zx1-9806925f-8892-4efd-99b3-e4213230581a.png',
    ),
    output: path.join(root, 'public/images/musfir-fasna.png'),
  },
  {
    input: path.join(
      assetDir,
      'c__Users_Krishna_AppData_Roaming_Cursor_User_workspaceStorage_3e67aa65c6ba697027b201bc447a1f89_images_Gemini_Generated_Image_2en3pw2en3pw2en3-a4928a8c-dd8f-4d23-b1a5-f2b96a0bc5cf.png',
    ),
    output: path.join(root, 'public/images/fasil-rinshana.png'),
  },
];

function isBackgroundPixel(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  if (lum >= 225 && sat <= 0.16) return true;
  if (r >= 168 && g >= 168 && b >= 168 && Math.abs(r - g) <= 14 && Math.abs(g - b) <= 14) {
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

function getTrimBounds(pixels, width, height, alphaThreshold = 12) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha <= alphaThreshold) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return { left: 0, top: 0, width, height };
  }

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

async function loadTrimmed(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = removeBackground(data, info.width, info.height);
  const bounds = getTrimBounds(pixels, info.width, info.height);

  const trimmed = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(bounds)
    .png()
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  return { buffer: trimmed, width: meta.width, height: meta.height };
}

async function normalizePair(items) {
  const trimmed = [];
  for (const item of items) {
    trimmed.push({ ...(await loadTrimmed(item.input)), output: item.output });
  }

  const targetFigureHeight = Math.max(...trimmed.map((t) => t.height));
  const scaled = [];

  for (const item of trimmed) {
    const resized = await sharp(item.buffer)
      .resize({
        height: targetFigureHeight,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const meta = await sharp(resized).metadata();
    scaled.push({ buffer: resized, width: meta.width, height: meta.height, output: item.output });
  }

  const canvasWidth = Math.max(...scaled.map((s) => s.width));
  const canvasHeight = targetFigureHeight;

  for (const item of scaled) {
    const left = Math.floor((canvasWidth - item.width) / 2);
    const canvas = await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: item.buffer, left, top: 0 }])
      .png({ compressionLevel: 2, effort: 1 })
      .toBuffer();

    const temp = `${item.output}.tmp.png`;
    const fs = await import('fs/promises');
    await sharp(canvas).toFile(temp);
    await fs.copyFile(temp, item.output);
    await fs.unlink(temp);

    console.log(
      `Saved ${path.basename(item.output)} — ${canvasWidth}x${canvasHeight}px (lossless PNG)`,
    );
  }

  return { width: canvasWidth, height: canvasHeight };
}

const dimensions = await normalizePair(sources);
console.log('Shared canvas:', dimensions);
