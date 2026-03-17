import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { encodeHtmlEntities, decodeHtmlEntities } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box } from '@mui/material';
import SimpleRadio from '@components/options/SimpleRadio';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  mode: 'encode'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Encode HTML Entities',
    description: 'Encode special characters to HTML entities.',
    sampleText: '<div class="test">Hello & World</div>',
    sampleResult:
      '&lt;div class=&quot;test&quot;&gt;Hello &amp; World&lt;/div&gt;',
    sampleOptions: { mode: 'encode' }
  },
  {
    title: 'Decode HTML Entities',
    description: 'Decode HTML entities back to characters.',
    sampleText: '&lt;p&gt;Hello &amp; World&lt;/p&gt;',
    sampleResult: '<p>Hello & World</p>',
    sampleOptions: { mode: 'decode' }
  }
];

export default function HtmlEntity({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, input: string) => {
    if (input) {
      setResult(
        values.mode === 'encode'
          ? encodeHtmlEntities(input)
          : decodeHtmlEntities(input)
      );
    }
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('htmlEntity.title'),
      component: (
        <Box>
          <SimpleRadio
            onClick={() => updateField('mode', 'encode')}
            checked={values.mode === 'encode'}
            title={t('htmlEntity.encode')}
          />
          <SimpleRadio
            onClick={() => updateField('mode', 'decode')}
            checked={values.mode === 'decode'}
            title={t('htmlEntity.decode')}
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
          title={t('htmlEntity.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('htmlEntity.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
