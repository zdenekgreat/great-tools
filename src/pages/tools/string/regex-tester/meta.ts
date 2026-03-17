import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'regex-tester',
  icon: 'mdi:regex',
  keywords: ['regex', 'regular expression', 'pattern'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:regexTester.title',
    description: 'string:regexTester.description',
    shortDescription: 'string:regexTester.shortDescription'
  }
});
