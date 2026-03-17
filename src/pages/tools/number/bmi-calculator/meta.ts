import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'bmi-calculator',
  icon: 'mdi:human',

  keywords: ['bmi', 'body mass', 'zdraví', 'health'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:bmiCalculator.title',
    description: 'number:bmiCalculator.description',
    shortDescription: 'number:bmiCalculator.shortDescription'
  }
});
