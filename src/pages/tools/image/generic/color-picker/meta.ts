import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  path: 'color-picker',
  icon: 'mdi:eyedropper',
  keywords: [
    'color',
    'picker',
    'eyedropper',
    'hex',
    'rgb',
    'hsl',
    'cmyk',
    'barva',
    'kapátko'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'image:colorPicker.title',
    description: 'image:colorPicker.description',
    shortDescription: 'image:colorPicker.shortDescription'
  }
});
