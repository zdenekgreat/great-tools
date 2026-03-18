import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('png', {
  path: 'crop-png',
  icon: 'mdi:crop',
  keywords: ['crop', 'png', 'oříznout'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'image:cropPng.title',
    description: 'image:cropPng.description',
    shortDescription: 'image:cropPng.shortDescription'
  }
});
