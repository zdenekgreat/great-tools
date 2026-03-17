function valueToYaml(value: unknown, indent: number): string {
  const prefix = '  '.repeat(indent);

  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    if (
      value.includes('\n') ||
      value.includes(':') ||
      value.includes('#') ||
      value.includes('"') ||
      value.includes("'") ||
      value.trim() !== value ||
      value === ''
    ) {
      return `"${value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')}"`;
    }
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => {
      const itemStr = valueToYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const lines = itemStr.split('\n');
        return `${prefix}- ${lines[0]}\n${lines
          .slice(1)
          .map((l) => `${prefix}  ${l}`)
          .join('\n')}`;
      }
      return `${prefix}- ${itemStr}`;
    });
    return '\n' + items.join('\n');
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const lines = entries.map(([key, val]) => {
      const valStr = valueToYaml(val, indent + 1);
      if (
        typeof val === 'object' &&
        val !== null &&
        ((Array.isArray(val) && val.length > 0) ||
          (!Array.isArray(val) && Object.keys(val).length > 0))
      ) {
        return `${prefix}${key}:${valStr}`;
      }
      return `${prefix}${key}: ${valStr}`;
    });
    return '\n' + lines.join('\n');
  }

  return String(value);
}

export function jsonToYaml(input: string): string {
  try {
    const parsed = JSON.parse(input);
    const result = valueToYaml(parsed, 0);
    return result.startsWith('\n') ? result.slice(1) : result;
  } catch {
    return 'Error: Invalid JSON input.';
  }
}
