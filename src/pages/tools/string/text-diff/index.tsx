import React, { useState } from 'react';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { textDiff } from './service';
import { ToolComponentProps } from '@tools/defineTool';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TextDiff({ title }: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<string>('');

  React.useEffect(() => {
    if (input1 || input2) {
      setResult(textDiff(input1, input2));
    }
  }, [input1, input2]);

  return (
    <Box>
      <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <ToolTextInput
            title={t('textDiff.inputTitle1')}
            value={input1}
            onChange={setInput1}
          />
        </Box>
        <Box flex={1}>
          <ToolTextInput
            title={t('textDiff.inputTitle2')}
            value={input2}
            onChange={setInput2}
          />
        </Box>
      </Box>
      <ToolTextResult title={t('textDiff.resultTitle')} value={result} />
    </Box>
  );
}
