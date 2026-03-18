import * as XLSX from 'xlsx';

export async function mergeExcelFiles(files: File[]): Promise<File | null> {
  if (files.length === 0) return null;

  try {
    const mergedWorkbook = XLSX.utils.book_new();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        // Ensure unique sheet names
        let newName = `${file.name.replace(/\.xlsx?$/i, '')}_${sheetName}`;
        if (newName.length > 31) newName = newName.substring(0, 31); // Excel limit
        XLSX.utils.book_append_sheet(mergedWorkbook, sheet, newName);
      });
    }

    const xlsxData = XLSX.write(mergedWorkbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    const blob = new Blob([xlsxData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    return new File([blob], 'merged.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
  } catch (error) {
    console.error('Error merging Excel:', error);
    return null;
  }
}
