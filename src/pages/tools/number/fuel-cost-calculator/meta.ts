import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'fuel-cost-calculator',
  icon: 'mdi:gas-station',
  keywords: [
    'fuel',
    'cost',
    'benzin',
    'nafta',
    'palivo',
    'cesta',
    'spotřeba',
    'auto',
    'car',
    'trip',
    'gas'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:fuelCostCalculator.title',
    description: 'number:fuelCostCalculator.description',
    shortDescription: 'number:fuelCostCalculator.shortDescription'
  }
});
