export function countWords(input: string): string {
  if (!input.trim()) return '';
  const chars = input.length;
  const charsNoSpaces = input.replace(/\s/g, '').length;
  const words = input.trim().split(/\s+/).length;
  const sentences = input.split(/[.!?]+/).filter((s) => s.trim()).length;
  const lines = input.split('\n').length;
  const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim()).length;
  return `Characters: ${chars}\nCharacters (no spaces): ${charsNoSpaces}\nWords: ${words}\nSentences: ${sentences}\nLines: ${lines}\nParagraphs: ${paragraphs}`;
}
