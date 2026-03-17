export function encodeHtmlEntities(input: string): string {
  const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return input.replace(/[&<>"']/g, (char) => entityMap[char]);
}

export function decodeHtmlEntities(input: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}
