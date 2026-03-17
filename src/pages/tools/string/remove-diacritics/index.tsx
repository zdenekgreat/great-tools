import React, { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { removeDiacritics } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'Remove Czech Diacritics',
    description: 'Remove diacritical marks from Czech text.',
    sampleText: 'příliš žluťoučký kůň',
    sampleResult: 'prilis zlutoucky kun',
    sampleOptions: {}
  },
  {
    title: 'Remove French Accents',
    description: 'Strip accents from French text.',
    sampleText: 'café résumé naïve',
    sampleResult: 'cafe resume naive',
    sampleOptions: {}
  },
  {
    title: 'Remove Spanish Diacritics',
    description: 'Remove tildes and accents from Spanish text.',
    sampleText: 'El niño está en la montaña',
    sampleResult: 'El nino esta en la montana',
    sampleOptions: {}
  }
];

export default function RemoveDiacritics({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    _optionsValues: typeof initialValues,
    input: string
  ) => {
    setResult(removeDiacritics(input));
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
          title={t('removeDiacritics.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('removeDiacritics.resultTitle')}
          value={result}
        />
      }
      exampleCards={exampleCards}
    />
  );
}
