import { ToolComponentProps } from '@tools/defineTool';
import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { getDocxStats } from './service';
import { useTranslation } from 'react-i18next';

const initialValues = {};

export default function DocxStats({ title }: ToolComponentProps) {
  const { t } = useTranslation('pdf');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');

  const compute = async (_: typeof initialValues, input: any) => {
    if (!input) return;
    setResult(await getDocxStats(input));
  };

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={null}
      compute={compute}
      input={input}
      inputComponent={
        <ToolImageInput
          value={input}
          onChange={setInput}
          title={t('docxStats.inputTitle')}
          accept={['.doc,.docx']}
        />
      }
      resultComponent={
        <ToolTextResult title={t('docxStats.resultTitle')} value={result} />
      }
    />
  );
}
