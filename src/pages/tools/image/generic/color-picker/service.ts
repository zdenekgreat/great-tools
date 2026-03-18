export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const m = hex
    .replace('#', '')
    .match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function rgbToHsv(
  r: number,
  g: number,
  b: number
): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const v = max,
    d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

export function hsvToRgb(
  h: number,
  s: number,
  v: number
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  v /= 100;
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function rgbToCmyk(
  r: number,
  g: number,
  b: number
): { c: number; m: number; y: number; k: number } {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rr = r / 255,
    gg = g / 255,
    bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  return {
    c: Math.round(((1 - rr - k) / (1 - k)) * 100),
    m: Math.round(((1 - gg - k) / (1 - k)) * 100),
    y: Math.round(((1 - bb - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
}

// Extract dominant colors from image using color quantization
export function extractPalette(
  imageData: ImageData,
  colorCount: number = 10
): { r: number; g: number; b: number }[] {
  const pixels: { r: number; g: number; b: number }[] = [];
  const data = imageData.data;
  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
  }

  // Simple median cut quantization
  return medianCut(pixels, colorCount);
}

function medianCut(
  pixels: { r: number; g: number; b: number }[],
  depth: number
): { r: number; g: number; b: number }[] {
  if (depth === 0 || pixels.length === 0) {
    const avg = pixels.reduce(
      (acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }),
      { r: 0, g: 0, b: 0 }
    );
    const len = pixels.length || 1;
    return [
      {
        r: Math.round(avg.r / len),
        g: Math.round(avg.g / len),
        b: Math.round(avg.b / len)
      }
    ];
  }

  // Find channel with greatest range
  let rMin = 255,
    rMax = 0,
    gMin = 255,
    gMax = 0,
    bMin = 255,
    bMax = 0;
  pixels.forEach((p) => {
    rMin = Math.min(rMin, p.r);
    rMax = Math.max(rMax, p.r);
    gMin = Math.min(gMin, p.g);
    gMax = Math.max(gMax, p.g);
    bMin = Math.min(bMin, p.b);
    bMax = Math.max(bMax, p.b);
  });
  const rRange = rMax - rMin,
    gRange = gMax - gMin,
    bRange = bMax - bMin;

  let sortKey: 'r' | 'g' | 'b' = 'r';
  if (gRange >= rRange && gRange >= bRange) sortKey = 'g';
  else if (bRange >= rRange && bRange >= gRange) sortKey = 'b';

  pixels.sort((a, b) => a[sortKey] - b[sortKey]);
  const mid = Math.floor(pixels.length / 2);

  return [
    ...medianCut(pixels.slice(0, mid), depth - 1),
    ...medianCut(pixels.slice(mid), depth - 1)
  ];
}

export function formatPaletteAs(
  colors: { r: number; g: number; b: number }[],
  format: string
): string {
  switch (format) {
    case 'hex':
      return colors
        .map((c) => rgbToHex(c.r, c.g, c.b).toUpperCase())
        .join('\n');
    case 'rgb':
      return colors.map((c) => `rgb(${c.r}, ${c.g}, ${c.b})`).join('\n');
    case 'html':
      return colors
        .map((c) => `style="color: ${rgbToHex(c.r, c.g, c.b).toUpperCase()};"`)
        .join('\n');
    case 'css':
      return colors
        .map(
          (c, i) =>
            `.color-${i + 1} { color: ${rgbToHex(
              c.r,
              c.g,
              c.b
            ).toUpperCase()} };`
        )
        .join('\n');
    case 'scss':
      return colors
        .map(
          (c, i) => `$color-${i + 1}: ${rgbToHex(c.r, c.g, c.b).toUpperCase()};`
        )
        .join('\n');
    case 'hsv':
      return colors
        .map((c) => {
          const hsv = rgbToHsv(c.r, c.g, c.b);
          return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
        })
        .join('\n');
    case 'hsl':
      return colors
        .map((c) => {
          const hsl = rgbToHsl(c.r, c.g, c.b);
          return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        })
        .join('\n');
    case 'cmyk':
      return colors
        .map((c) => {
          const cmyk = rgbToCmyk(c.r, c.g, c.b);
          return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        })
        .join('\n');
    default:
      return '';
  }
}
