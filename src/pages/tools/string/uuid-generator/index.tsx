import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextResult from '@components/result/ToolTextResult';
import { generateUuids } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box } from '@mui/material';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  count: 1
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Generate Single UUID',
    description: 'Generate a single UUID v4.',
    sampleText: '',
    sampleResult: 'e.g. 550e8400-e29b-41d4-a716-446655440000',
    sampleOptions: { count: 1 }
  },
  {
    title: 'Generate Multiple UUIDs',
    description: 'Generate 5 UUIDs at once.',
    sampleText: '',
    sampleResult:
      '550e8400-e29b-41d4-a716-446655440000\n6fa459ea-ee8a-3ca4-894e-db77e160355e\n...',
    sampleOptions: { count: 5 }
  }
];

export default function UuidGenerator({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType) => {
    const count = Math.max(1, Math.min(100, Number(values.count) || 1));
    setResult(generateUuids(count));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('uuidGenerator.title'),
      component: (
        <Box>
          <TextFieldWithDesc
            description={t('uuidGenerator.countDescription')}
            value={values.count}
            onOwnChange={(val) => updateField('count', Number(val) || 1)}
            type="number"
          />
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
      inputComponent={null}
      resultComponent={
        <ToolTextResult title={t('uuidGenerator.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
