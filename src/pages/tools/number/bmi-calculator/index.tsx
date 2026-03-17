import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { calculateBmi } from './service';
import { ToolComponentProps } from '@tools/defineTool';
import { useTranslation } from 'react-i18next';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  height: 175
};

export default function BmiCalculator({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (optionsValues: InitialValuesType, input: string) => {
    const weight = Number(input);
    if (isNaN(weight)) {
      setResult('Invalid number');
      return;
    }
    setResult(calculateBmi(weight, optionsValues.height));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      initialValues={initialValues}
      inputComponent={
        <ToolTextInput
          title={t('bmiCalculator.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('bmiCalculator.resultTitle')} value={result} />
      }
      getGroups={({ values, updateField }) => [
        {
          title: t('bmiCalculator.title'),
          component: (
            <Box>
              <TextFieldWithDesc
                description={t('bmiCalculator.heightDescription')}
                value={String(values.height)}
                onOwnChange={(val) => updateField('height', Number(val))}
                type="number"
              />
            </Box>
          )
        }
      ]}
      compute={compute}
    />
  );
}
