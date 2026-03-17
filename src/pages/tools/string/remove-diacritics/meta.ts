import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'remove-diacritics',
  icon: 'mdi:format-clear',

  keywords: ['diacritics', 'diakritika', 'accents'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:removeDiacritics.title',
    description: 'string:removeDiacritics.description',
    shortDescription: 'string:removeDiacritics.shortDescription'
  }
});
