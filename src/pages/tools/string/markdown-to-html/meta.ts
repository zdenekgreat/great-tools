import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'markdown-to-html',
  icon: 'mdi:language-markdown',
  keywords: ['markdown', 'html', 'convert'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:markdownToHtml.title',
    description: 'string:markdownToHtml.description',
    shortDescription: 'string:markdownToHtml.shortDescription'
  }
});
