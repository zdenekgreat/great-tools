import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'lowercase',
  icon: 'material-symbols-light:format-textdirection-l-to-r',

  keywords: ['lowercase', 'malá písmena'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:lowercase.title',
    description: 'string:lowercase.description',
    shortDescription: 'string:lowercase.shortDescription'
  }
});
