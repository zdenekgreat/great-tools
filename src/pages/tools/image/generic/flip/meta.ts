import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  path: 'flip',
  icon: 'mdi:flip-horizontal',
  keywords: ['flip', 'mirror', 'image', 'horizontal', 'vertical'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'image:flip.title',
    description: 'image:flip.description',
    shortDescription: 'image:flip.shortDescription'
  }
});
