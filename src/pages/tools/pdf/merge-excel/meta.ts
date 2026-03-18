import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:mergeExcel.title',
    description: 'pdf:mergeExcel.description',
    shortDescription: 'pdf:mergeExcel.shortDescription'
  },

  path: 'merge-excel',
  icon: 'mdi:file-table-box-multiple',

  keywords: ['excel', 'xlsx', 'merge', 'sloucit', 'spojit', 'tabulka'],
  component: lazy(() => import('./index'))
});
