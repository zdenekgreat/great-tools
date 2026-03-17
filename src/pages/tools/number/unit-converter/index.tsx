import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import SelectWithDesc from '@components/options/SelectWithDesc';
import { convertUnit } from './service';
import { ToolComponentProps } from '@tools/defineTool';
import { useTranslation } from 'react-i18next';
import { InitialValuesType } from './types';

const LENGTH_UNITS = [
  { label: 'Kilometer (km)', value: 'km' },
  { label: 'Meter (m)', value: 'm' },
  { label: 'Centimeter (cm)', value: 'cm' },
  { label: 'Millimeter (mm)', value: 'mm' },
  { label: 'Mile (mi)', value: 'mi' },
  { label: 'Yard (yd)', value: 'yd' },
  { label: 'Foot (ft)', value: 'ft' },
  { label: 'Inch (in)', value: 'in' }
];

const WEIGHT_UNITS = [
  { label: 'Tonne (t)', value: 't' },
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Gram (g)', value: 'g' },
  { label: 'Milligram (mg)', value: 'mg' },
  { label: 'Pound (lb)', value: 'lb' },
  { label: 'Ounce (oz)', value: 'oz' }
];

const TEMPERATURE_UNITS = [
  { label: 'Celsius (°C)', value: 'C' },
  { label: 'Fahrenheit (°F)', value: 'F' },
  { label: 'Kelvin (K)', value: 'K' }
];

const ALL_UNITS = [
  ...LENGTH_UNITS.map((u) => ({ ...u, label: `[Length] ${u.label}` })),
  ...WEIGHT_UNITS.map((u) => ({ ...u, label: `[Weight] ${u.label}` })),
  ...TEMPERATURE_UNITS.map((u) => ({
    ...u,
    label: `[Temperature] ${u.label}`
  }))
];

const initialValues: InitialValuesType = {
  from: 'km',
  to: 'm'
};

export default function UnitConverter({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (optionsValues: InitialValuesType, input: string) => {
    const value = Number(input);
    if (isNaN(value)) {
      setResult('Invalid number');
      return;
    }
    setResult(convertUnit(value, optionsValues.from, optionsValues.to));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      initialValues={initialValues}
      inputComponent={
        <ToolTextInput
          title={t('unitConverter.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('unitConverter.resultTitle')} value={result} />
      }
      getGroups={({ values, updateField }) => [
        {
          title: t('unitConverter.title'),
          component: (
            <Box>
              <SelectWithDesc
                selected={values.from}
                options={ALL_UNITS}
                onChange={(value) => updateField('from', value)}
                description={t('unitConverter.from')}
              />
              <SelectWithDesc
                selected={values.to}
                options={ALL_UNITS}
                onChange={(value) => updateField('to', value)}
                description={t('unitConverter.to')}
              />
            </Box>
          )
        }
      ]}
      compute={compute}
    />
  );
}
