import * as XLSX from 'xlsx';

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const result: Record<string, any[]> = {};
    workbook.SheetNames.forEach((name) => {
      result[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
    });
    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    return new File([blob], file.name.replace(/\.xlsx?$/i, '.json'), {
      type: 'application/json'
    });
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
