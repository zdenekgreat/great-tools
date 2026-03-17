import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  path: 'json-to-yaml',
  icon: 'mdi:code-json',
  keywords: ['json', 'yaml', 'convert'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'json:jsonToYaml.title',
    description: 'json:jsonToYaml.description',
    shortDescription: 'json:jsonToYaml.shortDescription'
  }
});
