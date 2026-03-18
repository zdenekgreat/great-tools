import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:excelToPdf.title',
    description: 'pdf:excelToPdf.description',
    shortDescription: 'pdf:excelToPdf.shortDescription'
  },

  path: 'excel-to-pdf',
  icon: 'mdi:file-excel',

  keywords: ['excel', 'xlsx', 'xls', 'pdf', 'convert', 'spreadsheet'],
  component: lazy(() => import('./index'))
});
