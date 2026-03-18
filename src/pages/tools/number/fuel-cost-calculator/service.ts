import { InitialValuesType } from './types';

export function calculateFuelCost(options: InitialValuesType): string {
  const { fuelPrice, distance, consumption, passengers, roundTrip } = options;

  if (fuelPrice <= 0 || distance <= 0 || consumption <= 0) {
    return 'Zadejte kladné hodnoty pro všechny položky.';
  }

  const totalDistance = roundTrip ? distance * 2 : distance;
  const litersUsed = (totalDistance / 100) * consumption;
  const totalCost = litersUsed * fuelPrice;
  const costPerKm = totalCost / totalDistance;
  const costPerPerson = passengers > 1 ? totalCost / passengers : totalCost;

  const lines: string[] = [
    `═══ Výpočet nákladů na cestu ═══`,
    ``,
    `📍 Vzdálenost: ${totalDistance} km${roundTrip ? ' (tam a zpět)' : ''}`,
    `⛽ Spotřeba: ${consumption} l/100km`,
    `💰 Cena paliva: ${fuelPrice.toFixed(2)} Kč/l`,
    ``,
    `───────────────────────────`,
    `⛽ Spotřebované palivo: ${litersUsed.toFixed(2)} l`,
    `💵 Celková cena: ${totalCost.toFixed(2)} Kč`,
    `📊 Cena za km: ${costPerKm.toFixed(2)} Kč/km`
  ];

  if (passengers > 1) {
    lines.push(`👥 Počet cestujících: ${passengers}`);
    lines.push(`🧑 Cena na osobu: ${costPerPerson.toFixed(2)} Kč`);
  }

  return lines.join('\n');
}
