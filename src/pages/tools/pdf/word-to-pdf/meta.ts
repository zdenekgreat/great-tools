import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:wordToPdf.title',
    description: 'pdf:wordToPdf.description',
    shortDescription: 'pdf:wordToPdf.shortDescription'
  },

  path: 'word-to-pdf',
  icon: 'mdi:file-word',

  keywords: ['word', 'docx', 'pdf', 'convert'],
  component: lazy(() => import('./index'))
});
