export function minifyCss(input: string): string {
  let result = input;
  // Remove comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove newlines and extra whitespace
  result = result.replace(/\s+/g, ' ');
  // Remove spaces around special characters
  result = result.replace(/\s*([{}:;,>~+])\s*/g, '$1');
  // Remove trailing semicolons before closing braces
  result = result.replace(/;}/g, '}');
  // Trim
  result = result.trim();
  return result;
}

export function minifyJs(input: string): string {
  let result = input;
  // Remove single-line comments (but not URLs with //)
  result = result.replace(/(?<![:"'])\/\/.*$/gm, '');
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove leading/trailing whitespace on each line
  result = result
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(' ');
  // Reduce multiple spaces to one
  result = result.replace(/\s+/g, ' ');
  // Remove spaces around operators and punctuation
  result = result.replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1');
  result = result.trim();
  return result;
}
