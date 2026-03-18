import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:pdfToWord.title',
    description: 'pdf:pdfToWord.description',
    shortDescription: 'pdf:pdfToWord.shortDescription'
  },

  path: 'pdf-to-word',
  icon: 'mdi:file-word-outline',

  keywords: ['pdf', 'word', 'docx', 'convert'],
  component: lazy(() => import('./index'))
});
