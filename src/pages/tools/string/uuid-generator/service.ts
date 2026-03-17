export function generateUuids(count: number): string {
  return Array.from({ length: count }, () => crypto.randomUUID()).join('\n');
}
