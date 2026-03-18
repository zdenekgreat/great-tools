import { ExchangeRate } from './types';

const FALLBACK_RATES: ExchangeRate[] = [
  { code: 'EUR', name: 'Euro', rate: 25.12, amount: 1 },
  { code: 'USD', name: 'US Dollar', rate: 23.45, amount: 1 },
  { code: 'GBP', name: 'British Pound', rate: 29.5, amount: 1 },
  { code: 'CHF', name: 'Swiss Franc', rate: 26.8, amount: 1 },
  { code: 'PLN', name: 'Polish Zloty', rate: 5.85, amount: 1 },
  { code: 'HUF', name: 'Hungarian Forint', rate: 0.063, amount: 1 },
  { code: 'SEK', name: 'Swedish Krona', rate: 2.25, amount: 1 },
  { code: 'NOK', name: 'Norwegian Krone', rate: 2.18, amount: 1 },
  { code: 'DKK', name: 'Danish Krone', rate: 3.37, amount: 1 },
  { code: 'JPY', name: 'Japanese Yen', rate: 0.156, amount: 100 },
  { code: 'CAD', name: 'Canadian Dollar', rate: 17.1, amount: 1 },
  { code: 'AUD', name: 'Australian Dollar', rate: 15.2, amount: 1 },
  { code: 'CNY', name: 'Chinese Yuan', rate: 3.22, amount: 1 },
  { code: 'TRY', name: 'Turkish Lira', rate: 0.62, amount: 1 },
  { code: 'RON', name: 'Romanian Leu', rate: 5.04, amount: 1 },
  { code: 'HRK', name: 'Croatian Kuna', rate: 3.33, amount: 1 },
  { code: 'RUB', name: 'Russian Ruble', rate: 0.25, amount: 1 },
  { code: 'THB', name: 'Thai Baht', rate: 0.67, amount: 1 },
  { code: 'BRL', name: 'Brazilian Real', rate: 4.1, amount: 1 },
  { code: 'KRW', name: 'South Korean Won', rate: 0.017, amount: 100 }
];

let cachedRates: ExchangeRate[] | null = null;
let cacheTime = 0;

export async function fetchRates(): Promise<ExchangeRate[]> {
  const now = Date.now();
  if (cachedRates && now - cacheTime < 3600000) {
    return cachedRates;
  }

  try {
    const response = await fetch(
      'https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt'
    );
    const text = await response.text();
    const lines = text.split('\n').filter((l) => l.includes('|'));

    // Skip header line
    const rates: ExchangeRate[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split('|');
      if (parts.length >= 5) {
        const name = parts[1].trim();
        const amount = parseInt(parts[2].trim());
        const code = parts[3].trim();
        const rate = parseFloat(parts[4].trim().replace(',', '.'));
        if (code && !isNaN(rate) && !isNaN(amount)) {
          rates.push({ code, name, rate, amount });
        }
      }
    }

    if (rates.length > 0) {
      cachedRates = rates;
      cacheTime = now;
      return rates;
    }
  } catch (e) {
    console.warn('Failed to fetch CNB rates, using fallback:', e);
  }

  return FALLBACK_RATES;
}

export function convertCurrency(
  value: number,
  from: string,
  to: string,
  rates: ExchangeRate[]
): string {
  if (value <= 0) return 'Zadejte kladnou částku.';

  // Convert everything through CZK as base
  let valueInCzk: number;

  if (from === 'CZK') {
    valueInCzk = value;
  } else {
    const fromRate = rates.find((r) => r.code === from);
    if (!fromRate) return `Neznámá měna: ${from}`;
    valueInCzk = value * (fromRate.rate / fromRate.amount);
  }

  let result: number;
  if (to === 'CZK') {
    result = valueInCzk;
  } else {
    const toRate = rates.find((r) => r.code === to);
    if (!toRate) return `Neznámá měna: ${to}`;
    result = valueInCzk / (toRate.rate / toRate.amount);
  }

  return [
    `${value.toLocaleString('cs-CZ')} ${from}`,
    `= ${result.toLocaleString('cs-CZ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    })} ${to}`,
    ``,
    `Kurz: 1 ${from} = ${(result / value).toLocaleString('cs-CZ', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    })} ${to}`,
    ``,
    `Zdroj: Česká národní banka (ČNB)`
  ].join('\n');
}
