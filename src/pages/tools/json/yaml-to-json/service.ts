interface YamlLine {
  indent: number;
  key: string;
  value: string;
  isListItem: boolean;
}

function parseLine(line: string): YamlLine | null {
  if (line.trim() === '' || line.trim().startsWith('#')) return null;

  const indent = line.search(/\S/);
  const trimmed = line.trim();

  const isListItem = trimmed.startsWith('- ');
  const content = isListItem ? trimmed.slice(2) : trimmed;

  const colonIndex = content.indexOf(':');
  if (colonIndex === -1) {
    return {
      indent,
      key: '',
      value: content,
      isListItem
    };
  }

  const key = content.slice(0, colonIndex).trim();
  const value = content.slice(colonIndex + 1).trim();

  return { indent, key, value, isListItem };
}

function parseValue(val: string): unknown {
  if (val === '' || val === '~' || val === 'null') return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  // Remove quotes
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    return val.slice(1, -1);
  }
  // Inline array
  if (val.startsWith('[') && val.endsWith(']')) {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  // Inline object
  if (val.startsWith('{') && val.endsWith('}')) {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}

function parseYamlLines(
  lines: string[],
  startIdx: number,
  baseIndent: number
): [unknown, number] {
  if (startIdx >= lines.length) return [null, startIdx];

  const firstParsed = parseLine(lines[startIdx]);
  if (!firstParsed) return [null, startIdx + 1];

  // Determine if this block is a list or object
  if (firstParsed.isListItem) {
    const arr: unknown[] = [];
    let i = startIdx;
    while (i < lines.length) {
      const parsed = parseLine(lines[i]);
      if (!parsed) {
        i++;
        continue;
      }
      if (parsed.indent < baseIndent) break;
      if (parsed.indent > baseIndent) break;
      if (!parsed.isListItem) break;

      if (parsed.key && parsed.value === '') {
        // List item with nested object
        const [nested, nextIdx] = parseYamlLines(
          lines,
          i + 1,
          parsed.indent + 2
        );
        const obj: Record<string, unknown> = {};
        obj[parsed.key] = nested;
        arr.push(obj);
        i = nextIdx;
      } else if (parsed.key) {
        arr.push(parseValue(parsed.value));
        i++;
      } else {
        arr.push(parseValue(parsed.value));
        i++;
      }
    }
    return [arr, i];
  }

  // Object
  const obj: Record<string, unknown> = {};
  let i = startIdx;
  while (i < lines.length) {
    const parsed = parseLine(lines[i]);
    if (!parsed) {
      i++;
      continue;
    }
    if (parsed.indent < baseIndent) break;
    if (parsed.indent > baseIndent) {
      i++;
      continue;
    }

    if (parsed.key) {
      if (parsed.value === '') {
        // Check next line for nested content
        const [nested, nextIdx] = parseYamlLines(lines, i + 1, baseIndent + 2);
        obj[parsed.key] = nested;
        i = nextIdx;
      } else {
        obj[parsed.key] = parseValue(parsed.value);
        i++;
      }
    } else {
      i++;
    }
  }
  return [obj, i];
}

export function yamlToJson(input: string): string {
  try {
    const lines = input.split('\n');
    const [result] = parseYamlLines(lines, 0, 0);
    return JSON.stringify(result, null, 2);
  } catch {
    return 'Error: Unable to parse YAML input.';
  }
}
