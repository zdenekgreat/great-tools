import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  path: 'yaml-to-json',
  icon: 'mdi:code-braces-box',
  keywords: ['yaml', 'json', 'convert'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'json:yamlToJson.title',
    description: 'json:yamlToJson.description',
    shortDescription: 'json:yamlToJson.shortDescription'
  }
});
