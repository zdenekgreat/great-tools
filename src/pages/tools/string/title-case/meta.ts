import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'title-case',
  icon: 'material-symbols-light:title',

  keywords: ['title case', 'capitalize'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:titleCase.title',
    description: 'string:titleCase.description',
    shortDescription: 'string:titleCase.shortDescription'
  }
});
