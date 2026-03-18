import { InitialValuesType } from './types';

// Convert Czech account number to IBAN
export function accountToIban(accountNumber: string, bankCode: string): string {
  // Remove spaces and dashes
  const acc = accountNumber.replace(/[\s-]/g, '');
  const bank = bankCode.replace(/[\s-]/g, '');

  if (!acc || !bank || bank.length !== 4) return '';

  // Pad account number to 16 digits (6 prefix + 10 account)
  let prefix = '0';
  let number = acc;

  if (acc.includes('-')) {
    const parts = acc.split('-');
    prefix = parts[0];
    number = parts[1];
  }

  const paddedPrefix = prefix.padStart(6, '0');
  const paddedNumber = number.padStart(10, '0');
  const bban = bank + paddedPrefix + paddedNumber;

  // Calculate check digits
  // Move CZ00 to end: BBAN + CZ00 -> BBAN + 1235 + 00
  const numericString = bban + '123500';
  // Calculate mod 97 using string-based division for large numbers
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
  }
  const checkDigits = (98 - remainder).toString().padStart(2, '0');

  return `CZ${checkDigits}${bban}`;
}

// Generate SPD (Short Payment Descriptor) string
export function generateSpdString(options: InitialValuesType): string {
  let iban = '';

  if (options.useIban) {
    iban = options.iban.replace(/\s/g, '').toUpperCase();
  } else {
    iban = accountToIban(options.accountNumber, options.bankCode);
  }

  if (!iban) return '';

  const parts: string[] = ['SPD*1.0'];
  parts.push(`ACC:${iban}`);

  if (options.amount && parseFloat(options.amount) > 0) {
    parts.push(`AM:${parseFloat(options.amount).toFixed(2)}`);
  }

  if (options.currency) {
    parts.push(`CC:${options.currency}`);
  }

  if (options.variableSymbol) {
    parts.push(`X-VS:${options.variableSymbol}`);
  }

  if (options.specificSymbol) {
    parts.push(`X-SS:${options.specificSymbol}`);
  }

  if (options.constantSymbol) {
    parts.push(`X-KS:${options.constantSymbol}`);
  }

  if (options.message) {
    parts.push(`MSG:${options.message}`);
  }

  if (options.recipientName) {
    parts.push(`RN:${options.recipientName}`);
  }

  return parts.join('*');
}

// Format display info
export function formatPaymentInfo(options: InitialValuesType): string {
  let iban = '';
  if (options.useIban) {
    iban = options.iban.replace(/\s/g, '').toUpperCase();
  } else {
    iban = accountToIban(options.accountNumber, options.bankCode);
  }

  const lines: string[] = ['══ Platební údaje ══', ''];

  if (!options.useIban && options.accountNumber) {
    lines.push(`Účet: ${options.accountNumber}/${options.bankCode}`);
  }
  if (iban) lines.push(`IBAN: ${iban}`);
  if (options.amount)
    lines.push(`Částka: ${options.amount} ${options.currency}`);
  if (options.variableSymbol) lines.push(`VS: ${options.variableSymbol}`);
  if (options.specificSymbol) lines.push(`SS: ${options.specificSymbol}`);
  if (options.constantSymbol) lines.push(`KS: ${options.constantSymbol}`);
  if (options.message) lines.push(`Zpráva: ${options.message}`);
  if (options.recipientName) lines.push(`Příjemce: ${options.recipientName}`);
  lines.push('');
  lines.push(`SPD řetězec: ${generateSpdString(options)}`);

  return lines.join('\n');
}
