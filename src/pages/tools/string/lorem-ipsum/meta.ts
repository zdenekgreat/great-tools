import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'lorem-ipsum',
  icon: 'mdi:text-long',
  keywords: ['lorem ipsum', 'placeholder', 'dummy text'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:loremIpsum.title',
    description: 'string:loremIpsum.description',
    shortDescription: 'string:loremIpsum.shortDescription'
  }
});
