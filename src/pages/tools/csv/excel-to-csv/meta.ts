import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('csv', {
  i18n: {
    name: 'csv:excelToCsv.title',
    description: 'csv:excelToCsv.description',
    shortDescription: 'csv:excelToCsv.shortDescription'
  },

  path: 'excel-to-csv',
  icon: 'mdi:file-delimited',

  keywords: ['excel', 'csv', 'xlsx', 'convert', 'tabulka'],
  component: lazy(() => import('./index'))
});
