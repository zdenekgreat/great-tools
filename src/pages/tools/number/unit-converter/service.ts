const conversions: Record<string, Record<string, number>> = {
  // length - base: meter
  km: { m: 1000 },
  m: { m: 1 },
  cm: { m: 0.01 },
  mm: { m: 0.001 },
  mi: { m: 1609.344 },
  yd: { m: 0.9144 },
  ft: { m: 0.3048 },
  in: { m: 0.0254 },
  // weight - base: kg
  t: { kg: 1000 },
  kg: { kg: 1 },
  g: { kg: 0.001 },
  mg: { kg: 0.000001 },
  lb: { kg: 0.453592 },
  oz: { kg: 0.0283495 }
  // temperature handled separately
};

export function convertUnit(value: number, from: string, to: string): string {
  // handle temperature separately
  if (['C', 'F', 'K'].includes(from) && ['C', 'F', 'K'].includes(to)) {
    let celsius: number;
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = ((value - 32) * 5) / 9;
    else celsius = value - 273.15;

    let result: number;
    if (to === 'C') result = celsius;
    else if (to === 'F') result = (celsius * 9) / 5 + 32;
    else result = celsius + 273.15;

    return `${value} ${from}° = ${result.toFixed(4)} ${to}°`;
  }

  const fromBase = Object.values(conversions[from] || {})[0];
  const toBase = Object.values(conversions[to] || {})[0];
  const baseKey1 = Object.keys(conversions[from] || {})[0];
  const baseKey2 = Object.keys(conversions[to] || {})[0];

  if (!fromBase || !toBase || baseKey1 !== baseKey2)
    return 'Incompatible units';

  const result = (value * fromBase) / toBase;
  return `${value} ${from} = ${result.toFixed(6)} ${to}`;
}
