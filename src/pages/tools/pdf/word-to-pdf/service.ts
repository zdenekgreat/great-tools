import mammoth from 'mammoth';
import jsPDF from 'jspdf';

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Parse HTML and add text to PDF
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';

    const lines = doc.splitTextToSize(text, 180);
    let y = 15;
    const pageHeight = 280;

    for (const line of lines) {
      if (y > pageHeight) {
        doc.addPage();
        y = 15;
      }
      doc.text(line, 15, y);
      y += 7;
    }

    const pdfBlob = doc.output('blob');
    const fileName = file.name.replace(/\.docx?$/i, '.pdf');
    return new File([pdfBlob], fileName, { type: 'application/pdf' });
  } catch (error) {
    console.error('Error converting Word to PDF:', error);
    return null;
  }
}
