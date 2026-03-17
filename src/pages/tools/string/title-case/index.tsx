import React, { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { titleCaseInput } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'Convert Text to Title Case',
    description:
      'This example transforms text so each word starts with a capital letter.',
    sampleText: 'hello world foo',
    sampleResult: 'Hello World Foo',
    sampleOptions: {}
  },
  {
    title: 'Title Case from Uppercase',
    description: 'Convert fully uppercase text to title case.',
    sampleText: 'THE QUICK BROWN FOX',
    sampleResult: 'The Quick Brown Fox',
    sampleOptions: {}
  },
  {
    title: 'Title Case Mixed Input',
    description: 'Transform mixed case text to consistent title case format.',
    sampleText: 'javaScript is AWESOME',
    sampleResult: 'Javascript Is Awesome',
    sampleOptions: {}
  }
];

export default function TitleCase({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    _optionsValues: typeof initialValues,
    input: string
  ) => {
    setResult(titleCaseInput(input));
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
          title={t('titleCase.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('titleCase.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
