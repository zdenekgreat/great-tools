import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolFileResult from '@components/result/ToolFileResult';
import { ToolComponentProps } from '@tools/defineTool';
import { processFile } from './service';
import { useTranslation } from 'react-i18next';

const initialValues = {};

export default function PdfToExcel({ title }: ToolComponentProps) {
  const { t } = useTranslation('pdf');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);

  const compute = async (_: typeof initialValues, input: any) => {
    if (!input) return;
    setResult(await processFile(input));
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
          title={t('pdfToExcel.inputTitle')}
          accept={['application/pdf,.pdf']}
        />
      }
      resultComponent={
        <ToolFileResult
          value={result}
          title={t('pdfToExcel.resultTitle')}
          extension="xlsx"
        />
      }
    />
  );
}
