import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'word-counter',
  icon: 'mdi:counter',
  keywords: ['word count', 'character count', 'counter'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:wordCounter.title',
    description: 'string:wordCounter.description',
    shortDescription: 'string:wordCounter.shortDescription'
  }
});
