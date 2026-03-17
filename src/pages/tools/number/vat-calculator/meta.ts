import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'vat-calculator',
  icon: 'mdi:percent',

  keywords: ['vat', 'dph', 'tax', 'daň'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:vatCalculator.title',
    description: 'number:vatCalculator.description',
    shortDescription: 'number:vatCalculator.shortDescription'
  }
});
