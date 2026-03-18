import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'currency-converter',
  icon: 'mdi:currency-usd',
  keywords: [
    'currency',
    'exchange',
    'rate',
    'měna',
    'kurz',
    'převod',
    'eur',
    'usd',
    'czk',
    'koruna'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:currencyConverter.title',
    description: 'number:currencyConverter.description',
    shortDescription: 'number:currencyConverter.shortDescription'
  }
});
