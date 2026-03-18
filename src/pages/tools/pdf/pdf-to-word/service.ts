import * as pdfjsLib from 'pdfjs-dist';

// Set worker
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
      fullText += pageText + '\n\n';
    }

    // Create a simple DOCX file (it's actually a ZIP containing XML)
    // We'll use a minimal DOCX structure
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();

    // Required DOCX structure
    zip.file(
      '[Content_Types].xml',
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
        '</Types>'
    );

    zip.file(
      '_rels/.rels',
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
        '</Relationships>'
    );

    zip.file(
      'word/_rels/document.xml.rels',
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '</Relationships>'
    );

    // Escape XML special characters
    const escapeXml = (text: string) =>
      text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    // Build document.xml with paragraphs
    const paragraphs = fullText.split('\n').filter((p) => p.trim());
    const bodyContent = paragraphs
      .map(
        (p) =>
          '<w:p><w:r><w:t xml:space="preserve">' +
          escapeXml(p) +
          '</w:t></w:r></w:p>'
      )
      .join('');

    zip.file(
      'word/document.xml',
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
        '<w:body>' +
        bodyContent +
        '</w:body>' +
        '</w:document>'
    );

    const blob = await zip.generateAsync({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    const fileName = file.name.replace(/\.pdf$/i, '.docx');
    return new File([blob], fileName, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    return null;
  }
}
