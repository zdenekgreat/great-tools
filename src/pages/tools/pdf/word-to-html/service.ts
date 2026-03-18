import mammoth from 'mammoth';

export async function processFile(file: File): Promise<File | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><title>${file.name}</title>
<style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;}</style>
</head>
<body>${result.value}</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    return new File([blob], file.name.replace(/\.docx?$/i, '.html'), {
      type: 'text/html'
    });
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
