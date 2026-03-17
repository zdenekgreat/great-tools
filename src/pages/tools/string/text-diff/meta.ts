import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'text-diff',
  icon: 'mdi:file-compare',
  keywords: ['diff', 'compare', 'porovnat'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:textDiff.title',
    description: 'string:textDiff.description',
    shortDescription: 'string:textDiff.shortDescription'
  }
});
