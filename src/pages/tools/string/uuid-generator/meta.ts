import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'uuid-generator',
  icon: 'mdi:identifier',
  keywords: ['uuid', 'guid', 'unique id'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:uuidGenerator.title',
    description: 'string:uuidGenerator.description',
    shortDescription: 'string:uuidGenerator.shortDescription'
  }
});
