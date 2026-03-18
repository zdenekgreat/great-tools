import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:pdfToText.title',
    description: 'pdf:pdfToText.description',
    shortDescription: 'pdf:pdfToText.shortDescription'
  },

  path: 'pdf-to-text',
  icon: 'mdi:text-box-outline',

  keywords: ['pdf', 'text', 'txt', 'extract'],
  component: lazy(() => import('./index'))
});
