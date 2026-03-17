import { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { convertColor } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'HEX to All Formats',
    description: 'Convert a HEX color to RGB and HSL.',
    sampleText: '#ff0000',
    sampleResult: 'HEX: #ff0000\nRGB: rgb(255, 0, 0)\nHSL: hsl(0, 100%, 50%)',
    sampleOptions: {}
  },
  {
    title: 'RGB to All Formats',
    description: 'Convert an RGB color to HEX and HSL.',
    sampleText: 'rgb(0, 128, 255)',
    sampleResult:
      'HEX: #0080ff\nRGB: rgb(0, 128, 255)\nHSL: hsl(210, 100%, 50%)',
    sampleOptions: {}
  },
  {
    title: 'HSL to All Formats',
    description: 'Convert an HSL color to HEX and RGB.',
    sampleText: 'hsl(120, 100%, 50%)',
    sampleResult: 'HEX: #00ff00\nRGB: rgb(0, 255, 0)\nHSL: hsl(120, 100%, 50%)',
    sampleOptions: {}
  }
];

export default function ColorConverter({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    _optionsValues: typeof initialValues,
    input: string
  ) => {
    setResult(convertColor(input));
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
          title={t('colorConverter.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('colorConverter.resultTitle')}
          value={result}
        />
      }
      exampleCards={exampleCards}
    />
  );
}
