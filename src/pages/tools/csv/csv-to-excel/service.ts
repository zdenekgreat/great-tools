import * as XLSX from 'xlsx';

export async function processFile(file: File): Promise<File | null> {
  try {
    const text = await file.text();
    const workbook = XLSX.read(text, { type: 'string' });
    const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([xlsxData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return new File([blob], file.name.replace(/\.csv$/i, '.xlsx'), {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
