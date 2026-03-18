import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:mergeWord.title',
    description: 'pdf:mergeWord.description',
    shortDescription: 'pdf:mergeWord.shortDescription'
  },

  path: 'merge-word',
  icon: 'mdi:file-document-multiple',

  keywords: ['word', 'docx', 'merge', 'sloucit', 'spojit'],
  component: lazy(() => import('./index'))
});
