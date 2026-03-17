import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'jwt-decoder',
  icon: 'mdi:key-variant',
  keywords: ['jwt', 'token', 'decode', 'json web token'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:jwtDecoder.title',
    description: 'string:jwtDecoder.description',
    shortDescription: 'string:jwtDecoder.shortDescription'
  }
});
