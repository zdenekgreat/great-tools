import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const workbook = XLSX.utils.book_new();

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      // Group text items by Y position to detect rows
      const items = textContent.items as any[];
      const rows: Map<number, { x: number; text: string }[]> = new Map();

      items.forEach((item) => {
        const y = Math.round(item.transform[5]);
        if (!rows.has(y)) rows.set(y, []);
        rows.get(y)!.push({ x: item.transform[4], text: item.str });
      });

      // Sort rows by Y (descending since PDF Y is bottom-up) and items by X
      const sortedRows = Array.from(rows.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([, items]) =>
          items.sort((a, b) => a.x - b.x).map((item) => item.text)
        );

      const sheetData =
        sortedRows.length > 0 ? sortedRows : [['No text found']];
      const sheet = XLSX.utils.aoa_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, sheet, `Page ${i}`);
    }

    const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([xlsxData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const fileName = file.name.replace(/\.pdf$/i, '.xlsx');
    return new File([blob], fileName, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  } catch (error) {
    console.error('Error converting PDF to Excel:', error);
    return null;
  }
}
