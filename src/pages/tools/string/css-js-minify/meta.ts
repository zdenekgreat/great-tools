import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'css-js-minify',
  icon: 'mdi:code-braces',
  keywords: ['minify', 'css', 'javascript', 'compress'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:cssJsMinify.title',
    description: 'string:cssJsMinify.description',
    shortDescription: 'string:cssJsMinify.shortDescription'
  }
});
