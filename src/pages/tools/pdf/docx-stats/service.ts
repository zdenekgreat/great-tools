import mammoth from 'mammoth';

export async function getDocxStats(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;

    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
    const lines = text.split('\n').length;

    // Estimate pages (roughly 250 words per page)
    const estimatedPages = Math.ceil(words / 250);

    // Estimate reading time (200 words per minute)
    const readingMinutes = Math.ceil(words / 200);

    return [
      'Document Statistics',
      '',
      `Estimated pages: ${estimatedPages}`,
      `Words: ${words.toLocaleString()}`,
      `Characters: ${chars.toLocaleString()}`,
      `Characters (no spaces): ${charsNoSpaces.toLocaleString()}`,
      `Sentences: ${sentences.toLocaleString()}`,
      `Paragraphs: ${paragraphs.toLocaleString()}`,
      `Lines: ${lines.toLocaleString()}`,
      '',
      `Estimated reading time: ${readingMinutes} min`
    ].join('\n');
  } catch (error) {
    return 'Error reading document: ' + (error as Error).message;
  }
}
