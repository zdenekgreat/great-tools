import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'html-entity',
  icon: 'mdi:language-html5',
  keywords: ['html', 'entity', 'encode', 'decode'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:htmlEntity.title',
    description: 'string:htmlEntity.description',
    shortDescription: 'string:htmlEntity.shortDescription'
  }
});
