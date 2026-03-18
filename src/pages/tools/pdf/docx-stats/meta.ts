import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('pdf', {
  i18n: {
    name: 'pdf:docxStats.title',
    description: 'pdf:docxStats.description',
    shortDescription: 'pdf:docxStats.shortDescription'
  },

  path: 'docx-stats',
  icon: 'mdi:file-document-check',

  keywords: [
    'word',
    'docx',
    'statistics',
    'count',
    'words',
    'pages',
    'pocet',
    'slov',
    'stranek'
  ],
  component: lazy(() => import('./index'))
});
