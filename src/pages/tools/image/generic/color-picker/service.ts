export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

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
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
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

export function rgbToCmyk(
  r: number,
  g: number,
  b: number
): { c: number; m: number; y: number; k: number } {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  const c = (1 - rr - k) / (1 - k);
  const m = (1 - gg - k) / (1 - k);
  const y = (1 - bb - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
}

export function getComplementary(h: number): number {
  return (h + 180) % 360;
}

export function getTriadic(h: number): [number, number] {
  return [(h + 120) % 360, (h + 240) % 360];
}

export function getAnalogous(h: number): [number, number] {
  return [(h + 30) % 360, (h + 330) % 360];
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function getContrastRatio(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
): number {
  const luminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function contrastLabel(ratio: number): string {
  if (ratio >= 7) return 'Výborný (AAA)';
  if (ratio >= 4.5) return 'Dobrý (AA)';
  if (ratio >= 3) return 'Přijatelný (AA velký text)';
  return 'Nedostatečný';
}

export function formatColorInfo(r: number, g: number, b: number): string {
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);

  const comp = getComplementary(hsl.h);
  const [tri1, tri2] = getTriadic(hsl.h);
  const [ana1, ana2] = getAnalogous(hsl.h);

  const contrastWhite = getContrastRatio(r, g, b, 255, 255, 255);
  const contrastBlack = getContrastRatio(r, g, b, 0, 0, 0);

  return [
    `══ Vybraná barva ══`,
    ``,
    `HEX:  ${hex.toUpperCase()}`,
    `RGB:  rgb(${r}, ${g}, ${b})`,
    `HSL:  hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    `HSV:  hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
    `CMYK: cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    ``,
    `══ Barevné harmonie ══`,
    ``,
    `Komplementární: ${hslToHex(comp, hsl.s, hsl.l).toUpperCase()}`,
    `Triadická:      ${hslToHex(tri1, hsl.s, hsl.l).toUpperCase()}, ${hslToHex(
      tri2,
      hsl.s,
      hsl.l
    ).toUpperCase()}`,
    `Analogová:      ${hslToHex(ana1, hsl.s, hsl.l).toUpperCase()}, ${hslToHex(
      ana2,
      hsl.s,
      hsl.l
    ).toUpperCase()}`,
    ``,
    `══ Kontrast textu ══`,
    ``,
    `Bílý text: ${contrastWhite.toFixed(2)}:1 – ${contrastLabel(
      contrastWhite
    )}`,
    `Černý text: ${contrastBlack.toFixed(2)}:1 – ${contrastLabel(
      contrastBlack
    )}`
  ].join('\n');
}
