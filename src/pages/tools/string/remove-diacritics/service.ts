export function removeDiacritics(input: string): string {
  return input.normalize('NFKD').replace(/\p{Diacritic}/gu, '');
}
