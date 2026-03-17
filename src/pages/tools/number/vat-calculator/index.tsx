import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import SelectWithDesc from '@components/options/SelectWithDesc';
import { calculateVat } from './service';
import { ToolComponentProps } from '@tools/defineTool';
import { useTranslation } from 'react-i18next';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  rate: 21,
  mode: 'add'
};

export default function VatCalculator({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (optionsValues: InitialValuesType, input: string) => {
    const amount = Number(input);
    if (isNaN(amount)) {
      setResult('Invalid number');
      return;
    }
    setResult(calculateVat(amount, optionsValues.rate, optionsValues.mode));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      initialValues={initialValues}
      inputComponent={
        <ToolTextInput
          title={t('vatCalculator.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('vatCalculator.resultTitle')} value={result} />
      }
      getGroups={({ values, updateField }) => [
        {
          title: t('vatCalculator.title'),
          component: (
            <Box>
              <SelectWithDesc
                selected={values.rate}
                options={[
                  { label: '21%', value: 21 as any },
                  { label: '15%', value: 15 as any },
                  { label: '12%', value: 12 as any },
                  { label: '10%', value: 10 as any }
                ]}
                onChange={(value) => updateField('rate', Number(value) as any)}
                description={t('vatCalculator.rateDescription')}
              />
              <SelectWithDesc
                selected={values.mode}
                options={[
                  { label: t('vatCalculator.addVat'), value: 'add' },
                  { label: t('vatCalculator.removeVat'), value: 'remove' }
                ]}
                onChange={(value) => updateField('mode', value)}
                description={t('vatCalculator.mode')}
              />
            </Box>
          )
        }
      ]}
      compute={compute}
    />
  );
}
