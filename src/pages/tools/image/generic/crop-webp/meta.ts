import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  path: 'crop-webp',
  icon: 'mdi:crop',
  keywords: ['crop', 'webp', 'oříznout'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'image:cropWebp.title',
    description: 'image:cropWebp.description',
    shortDescription: 'image:cropWebp.shortDescription'
  }
});
