import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  path: 'crop-jpg',
  icon: 'mdi:crop',
  keywords: ['crop', 'jpg', 'jpeg', 'oříznout'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'image:cropJpg.title',
    description: 'image:cropJpg.description',
    shortDescription: 'image:cropJpg.shortDescription'
  }
});
