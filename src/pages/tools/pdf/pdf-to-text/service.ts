import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += `--- Stránka ${i} ---\n${pageText}\n\n`;
    }
    const blob = new Blob([fullText], { type: 'text/plain' });
    return new File([blob], file.name.replace(/\.pdf$/i, '.txt'), {
      type: 'text/plain'
    });
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
