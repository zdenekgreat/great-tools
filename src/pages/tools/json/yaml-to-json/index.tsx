import { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { yamlToJson } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'Simple YAML to JSON',
    description: 'Convert a simple YAML document to JSON.',
    sampleText: 'name: John\nage: 30\nactive: true',
    sampleResult: '{\n  "name": "John",\n  "age": 30,\n  "active": true\n}',
    sampleOptions: {}
  },
  {
    title: 'YAML with List',
    description: 'Convert YAML with a list to JSON.',
    sampleText: 'fruits:\n  - apple\n  - banana\n  - cherry',
    sampleResult:
      '{\n  "fruits": [\n    "apple",\n    "banana",\n    "cherry"\n  ]\n}',
    sampleOptions: {}
  }
];

export default function YamlToJson({ title }: ToolComponentProps) {
  const { t } = useTranslation('json');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    _optionsValues: typeof initialValues,
    input: string
  ) => {
    setResult(yamlToJson(input));
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
          title={t('yamlToJson.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('yamlToJson.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
