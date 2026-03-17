import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { generateHash } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  algorithm: 'SHA-256'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'SHA-256 Hash',
    description: 'Generate a SHA-256 hash of a text string.',
    sampleText: 'Hello, World!',
    sampleResult:
      'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f',
    sampleOptions: { algorithm: 'SHA-256' }
  },
  {
    title: 'MD5 Hash',
    description: 'Generate an MD5 hash of a text string.',
    sampleText: 'Hello, World!',
    sampleResult: '65a8e27d8879283831b664bd8b7f0ad4',
    sampleOptions: { algorithm: 'MD5' }
  }
];

export default function HashGenerator({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, input: string) => {
    if (input) {
      generateHash(input, values.algorithm).then((hash) => setResult(hash));
    }
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('hashGenerator.title'),
      component: (
        <Box>
          <FormControl fullWidth>
            <InputLabel>{t('hashGenerator.algorithm')}</InputLabel>
            <Select
              value={values.algorithm}
              label={t('hashGenerator.algorithm')}
              onChange={(e) => updateField('algorithm', e.target.value)}
            >
              <MenuItem value="MD5">MD5</MenuItem>
              <MenuItem value="SHA-1">SHA-1</MenuItem>
              <MenuItem value="SHA-256">SHA-256</MenuItem>
              <MenuItem value="SHA-512">SHA-512</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolTextInput
          title={t('hashGenerator.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('hashGenerator.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
