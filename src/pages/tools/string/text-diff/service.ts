export function textDiff(text1: string, text2: string): string {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const result: string[] = [];
  const maxLen = Math.max(lines1.length, lines2.length);
  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i];
    const l2 = lines2[i];
    if (l1 === undefined) {
      result.push(`+ ${l2}`);
    } else if (l2 === undefined) {
      result.push(`- ${l1}`);
    } else if (l1 === l2) {
      result.push(`  ${l1}`);
    } else {
      result.push(`- ${l1}`);
      result.push(`+ ${l2}`);
    }
  }
  return result.join('\n');
}
