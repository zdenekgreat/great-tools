import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'unit-converter',
  icon: 'mdi:swap-horizontal',

  keywords: [
    'unit',
    'convert',
    'převod',
    'jednotky',
    'km',
    'mile',
    'celsius',
    'fahrenheit'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:unitConverter.title',
    description: 'number:unitConverter.description',
    shortDescription: 'number:unitConverter.shortDescription'
  }
});
