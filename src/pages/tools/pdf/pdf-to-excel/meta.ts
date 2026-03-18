import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:pdfToExcel.title',
    description: 'pdf:pdfToExcel.description',
    shortDescription: 'pdf:pdfToExcel.shortDescription'
  },

  path: 'pdf-to-excel',
  icon: 'mdi:file-excel-outline',

  keywords: ['pdf', 'excel', 'xlsx', 'spreadsheet', 'convert', 'tabulka'],
  component: lazy(() => import('./index'))
});
