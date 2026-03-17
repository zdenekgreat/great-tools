import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'color-converter',
  icon: 'mdi:palette',
  keywords: ['color', 'hex', 'rgb', 'hsl', 'barva'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:colorConverter.title',
    description: 'string:colorConverter.description',
    shortDescription: 'string:colorConverter.shortDescription'
  }
});
