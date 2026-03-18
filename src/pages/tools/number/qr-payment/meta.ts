import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'qr-payment',
  icon: 'mdi:qrcode',
  keywords: [
    'qr',
    'payment',
    'platba',
    'banka',
    'bank',
    'spd',
    'iban',
    'účet',
    'převod',
    'variabilní symbol'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:qrPayment.title',
    description: 'number:qrPayment.description',
    shortDescription: 'number:qrPayment.shortDescription'
  }
});
