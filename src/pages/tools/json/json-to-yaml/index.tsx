import { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { jsonToYaml } from './service';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import ToolContent from '@components/ToolContent';
import { useTranslation } from 'react-i18next';

const initialValues = {};

const exampleCards: CardExampleType<typeof initialValues>[] = [
  {
    title: 'Simple Object',
    description: 'Convert a simple JSON object to YAML.',
    sampleText: '{\n  "name": "John",\n  "age": 30,\n  "active": true\n}',
    sampleResult: 'name: John\nage: 30\nactive: true',
    sampleOptions: {}
  },
  {
    title: 'Nested Object with Array',
    description: 'Convert a nested JSON object with arrays to YAML.',
    sampleText:
      '{\n  "person": {\n    "name": "Jane",\n    "hobbies": ["reading", "coding"]\n  }\n}',
    sampleResult:
      'person:\n  name: Jane\n  hobbies:\n    - reading\n    - coding',
    sampleOptions: {}
  }
];

export default function JsonToYaml({ title }: ToolComponentProps) {
  const { t } = useTranslation('json');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const computeExternal = (
    _optionsValues: typeof initialValues,
    input: string
  ) => {
    setResult(jsonToYaml(input));
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
          title={t('jsonToYaml.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult title={t('jsonToYaml.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
    />
  );
}
