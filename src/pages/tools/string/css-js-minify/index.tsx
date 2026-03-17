import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { minifyCss, minifyJs } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box } from '@mui/material';
import SimpleRadio from '@components/options/SimpleRadio';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  type: 'css'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Minify CSS',
    description: 'Remove whitespace and comments from CSS code.',
    sampleText:
      '/* Main styles */\nbody {\n  margin: 0;\n  padding: 0;\n  background: #fff;\n}',
    sampleResult: 'body{margin:0;padding:0;background:#fff}',
    sampleOptions: { type: 'css' }
  },
  {
    title: 'Minify JavaScript',
    description: 'Remove whitespace and comments from JavaScript code.',
    sampleText:
      '// Say hello\nfunction hello() {\n  console.log("Hello, World!");\n}',
    sampleResult: 'function hello(){console.log("Hello,World!")}',
    sampleOptions: { type: 'js' }
  }
];

export default function CssJsMinify({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, input: string) => {
    if (input) {
      setResult(values.type === 'css' ? minifyCss(input) : minifyJs(input));
    }
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('cssJsMinify.title'),
      component: (
        <Box>
          <SimpleRadio
            onClick={() => updateField('type', 'css')}
            checked={values.type === 'css'}
            title="CSS"
          />
          <SimpleRadio
            onClick={() => updateField('type', 'js')}
            checked={values.type === 'js'}
            title="JavaScript"
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
          title={t('cssJsMinify.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('cssJsMinify.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
