import React, { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { markdownToHtml } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [];

export default function MarkdownToHtml({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (_: typeof initialValues, input: string) => {
    setResult(markdownToHtml(input));
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
          title={t('markdownToHtml.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('markdownToHtml.resultTitle')}
          value={result}
        />
      }
      exampleCards={exampleCards}
    />
  );
}
