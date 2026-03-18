import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('csv', {
  i18n: {
    name: 'csv:csvToExcel.title',
    description: 'csv:csvToExcel.description',
    shortDescription: 'csv:csvToExcel.shortDescription'
  },

  path: 'csv-to-excel',
  icon: 'mdi:file-excel',

  keywords: ['csv', 'excel', 'xlsx', 'convert'],
  component: lazy(() => import('./index'))
});
