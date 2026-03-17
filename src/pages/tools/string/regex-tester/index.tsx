import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { testRegex } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box } from '@mui/material';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  pattern: '',
  flags: 'g'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Find All Email Addresses',
    description: 'Use a regex to find email addresses in text.',
    sampleText: 'Contact us at info@example.com or support@test.org for help.',
    sampleResult:
      'Found 2 match(es):\n\nMatch: "info@example.com" at index 14\nMatch: "support@test.org" at index 34',
    sampleOptions: {
      pattern: '[\\w.+-]+@[\\w-]+\\.[\\w.]+',
      flags: 'g'
    }
  },
  {
    title: 'Match Numbers',
    description: 'Find all numbers in a string.',
    sampleText: 'There are 42 apples and 7 oranges.',
    sampleResult:
      'Found 2 match(es):\n\nMatch: "42" at index 10\nMatch: "7" at index 24',
    sampleOptions: { pattern: '\\d+', flags: 'g' }
  }
];

export default function RegexTester({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, input: string) => {
    if (input) {
      setResult(testRegex(input, values.pattern, values.flags));
    }
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('regexTester.title'),
      component: (
        <Box>
          <TextFieldWithDesc
            description={t('regexTester.flags')}
            value={values.pattern}
            onOwnChange={(val) => updateField('pattern', val)}
            placeholder="e.g. \\d+"
          />
          <TextFieldWithDesc
            description={t('regexTester.flagsDescription')}
            value={values.flags}
            onOwnChange={(val) => updateField('flags', val)}
            placeholder="e.g. gi"
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
      inputComponent={
        <ToolTextInput
          title={t('regexTester.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('regexTester.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
