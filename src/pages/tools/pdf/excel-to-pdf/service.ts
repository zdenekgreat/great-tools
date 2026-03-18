import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    workbook.SheetNames.forEach((sheetName, sheetIndex) => {
      if (sheetIndex > 0) doc.addPage();

      const sheet = workbook.Sheets[sheetName];
      const data: string[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1
      }) as string[][];

      doc.setFontSize(14);
      doc.text(sheetName, 15, 15);
      doc.setFontSize(9);

      let y = 25;
      const pageHeight = 190;
      const colWidth = Math.min(
        40,
        (277 - 15) / Math.max(1, data[0]?.length || 1)
      );

      for (const row of data) {
        if (y > pageHeight) {
          doc.addPage();
          y = 15;
        }
        row.forEach((cell, colIndex) => {
          const cellStr = cell != null ? String(cell) : '';
          const truncated = cellStr.substring(0, 20);
          doc.text(truncated, 15 + colIndex * colWidth, y);
        });
        y += 6;
      }
    });

    const pdfBlob = doc.output('blob');
    const fileName = file.name.replace(/\.xlsx?$/i, '.pdf');
    return new File([pdfBlob], fileName, { type: 'application/pdf' });
  } catch (error) {
    console.error('Error converting Excel to PDF:', error);
    return null;
  }
}
