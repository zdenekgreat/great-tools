import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'hash-generator',
  icon: 'mdi:shield-key',
  keywords: ['hash', 'md5', 'sha', 'sha256'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:hashGenerator.title',
    description: 'string:hashGenerator.description',
    shortDescription: 'string:hashGenerator.shortDescription'
  }
});
