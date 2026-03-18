import JSZip from 'jszip';

export async function mergeDocxFiles(files: File[]): Promise<File | null> {
  if (files.length === 0) return null;
  if (files.length === 1) return files[0];

  try {
    // Use first file as template
    const firstZip = await JSZip.loadAsync(await files[0].arrayBuffer());
    const firstDocXml = await firstZip
      .file('word/document.xml')
      ?.async('string');
    if (!firstDocXml) return null;

    // Extract body content from first doc
    let allParagraphs = extractBodyContent(firstDocXml);

    // Add separator and content from remaining files
    for (let i = 1; i < files.length; i++) {
      const zip = await JSZip.loadAsync(await files[i].arrayBuffer());
      const docXml = await zip.file('word/document.xml')?.async('string');
      if (docXml) {
        // Add page break
        allParagraphs += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
        allParagraphs += extractBodyContent(docXml);
      }
    }

    // Build merged document
    const mergedDoc =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ' +
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<w:body>' +
      allParagraphs +
      '</w:body></w:document>';

    firstZip.file('word/document.xml', mergedDoc);
    const blob = await firstZip.generateAsync({ type: 'blob' });
    return new File([blob], 'merged.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  } catch (error) {
    console.error('Error merging DOCX:', error);
    return null;
  }
}

function extractBodyContent(xml: string): string {
  const bodyMatch = xml.match(/<w:body>([\s\S]*?)<\/w:body>/);
  if (!bodyMatch) return '';
  // Remove sectPr (section properties) to avoid conflicts
  return bodyMatch[1].replace(/<w:sectPr[\s\S]*?<\/w:sectPr>/g, '');
}
