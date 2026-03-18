import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:wordToHtml.title',
    description: 'pdf:wordToHtml.description',
    shortDescription: 'pdf:wordToHtml.shortDescription'
  },

  path: 'word-to-html',
  icon: 'mdi:language-html5',

  keywords: ['word', 'docx', 'html'],
  component: lazy(() => import('./index'))
});
