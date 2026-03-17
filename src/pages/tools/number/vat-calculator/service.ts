export function calculateVat(
  amount: number,
  rate: number,
  mode: 'add' | 'remove'
): string {
  if (mode === 'add') {
    const vat = amount * (rate / 100);
    const total = amount + vat;
    return `Základ: ${amount.toFixed(2)}\nDPH (${rate}%): ${vat.toFixed(
      2
    )}\nCelkem s DPH: ${total.toFixed(2)}`;
  } else {
    const base = amount / (1 + rate / 100);
    const vat = amount - base;
    return `Celkem s DPH: ${amount.toFixed(2)}\nDPH (${rate}%): ${vat.toFixed(
      2
    )}\nZáklad bez DPH: ${base.toFixed(2)}`;
  }
}
