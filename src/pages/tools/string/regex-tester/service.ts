export function testRegex(
  text: string,
  pattern: string,
  flags: string
): string {
  if (!pattern) {
    return 'Please enter a regex pattern.';
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: string[] = [];

    if (flags.includes('g')) {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        matches.push(`Match: "${match[0]}" at index ${match.index}`);
        if (match[0] === '') {
          regex.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push(`Match: "${match[0]}" at index ${match.index}`);
        if (match.length > 1) {
          for (let i = 1; i < match.length; i++) {
            matches.push(`  Group ${i}: "${match[i]}"`);
          }
        }
      }
    }

    if (matches.length === 0) {
      return 'No matches found.';
    }

    return `Found ${
      matches.filter((m) => m.startsWith('Match')).length
    } match(es):\n\n${matches.join('\n')}`;
  } catch (e) {
    return `Error: Invalid regex pattern - ${
      e instanceof Error ? e.message : 'Unknown error'
    }`;
  }
}
