import React, { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { lowercaseInput } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'Convert Text to Lowercase',
    description: 'This example transforms any text to all lowercase format.',
    sampleText: 'Hello World',
    sampleResult: 'hello world',
    sampleOptions: {}
  },
  {
    title: 'Lowercase Uppercase Text',
    description: 'Convert fully uppercase text to lowercase.',
    sampleText: 'THIS IS ALL UPPERCASE TEXT',
    sampleResult: 'this is all uppercase text',
    sampleOptions: {}
  },
  {
    title: 'Mixed Case to Lowercase',
    description:
      'Transform text with mixed casing to consistent all lowercase format.',
    sampleText: 'ThIs Is MiXeD CaSe TeXt!',
    sampleResult: 'this is mixed case text!',
    sampleOptions: {}
  }
];

export default function Lowercase({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    _optionsValues: typeof initialValues,
    input: string
  ) => {
    setResult(lowercaseInput(input));
  };

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={null}
      compute={computeExternal}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolTextInput
          title={t('lowercase.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('lowercase.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
