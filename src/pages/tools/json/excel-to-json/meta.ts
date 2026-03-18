import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  i18n: {
    name: 'json:excelToJson.title',
    description: 'json:excelToJson.description',
    shortDescription: 'json:excelToJson.shortDescription'
  },

  path: 'excel-to-json',
  icon: 'mdi:code-json',

  keywords: ['excel', 'json', 'xlsx', 'convert'],
  component: lazy(() => import('./index'))
});
