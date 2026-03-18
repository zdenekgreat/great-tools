import * as XLSX from 'xlsx';

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const csv = XLSX.utils.sheet_to_csv(firstSheet);
    const blob = new Blob([csv], { type: 'text/csv' });
    return new File([blob], file.name.replace(/\.xlsx?$/i, '.csv'), {
      type: 'text/csv'
    });
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
