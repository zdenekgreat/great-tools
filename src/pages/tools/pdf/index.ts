import { tool as pdfPdfToPng } from './pdf-to-png/meta';
import { tool as pdfRotatePdf } from './rotate-pdf/meta';
import { meta as splitPdfMeta } from './split-pdf/meta';
import { meta as mergePdf } from './merge-pdf/meta';
import { DefinedTool } from '@tools/defineTool';
import { tool as compressPdfTool } from './compress-pdf/meta';
import { tool as protectPdfTool } from './protect-pdf/meta';
import { meta as pdfToEpub } from './pdf-to-epub/meta';
import { tool as pdfEditor } from './editor/meta';
import { tool as convertToPdf } from './convert-to-pdf/meta';
import { tool as wordToPdf } from './word-to-pdf/meta';
import { tool as excelToPdf } from './excel-to-pdf/meta';
import { tool as pdfToWord } from './pdf-to-word/meta';
import { tool as pdfToExcel } from './pdf-to-excel/meta';
import { tool as docxStats } from './docx-stats/meta';
import { tool as mergeWord } from './merge-word/meta';
import { tool as mergeExcel } from './merge-excel/meta';
import { tool as wordToHtml } from './word-to-html/meta';
import { tool as pdfToText } from './pdf-to-text/meta';

export const pdfTools: DefinedTool[] = [
  pdfEditor,
  splitPdfMeta,
  pdfRotatePdf,
  compressPdfTool,
  protectPdfTool,
  mergePdf,
  pdfToEpub,
  pdfPdfToPng,
  convertToPdf,
  wordToPdf,
  excelToPdf,
  pdfToWord,
  pdfToExcel,
  docxStats,
  mergeWord,
  mergeExcel,
  wordToHtml,
  pdfToText
];
