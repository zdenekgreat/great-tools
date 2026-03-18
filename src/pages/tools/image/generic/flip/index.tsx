import { ToolComponentProps } from '@tools/defineTool';
import { InitialValuesType } from './type';
import { useState } from 'react';
import { GetGroupsType } from '@components/options/ToolOptions';
import SimpleRadio from '@components/options/SimpleRadio';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolFileResult from '@components/result/ToolFileResult';
import { processImage } from './service';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  direction: 'horizontal'
};

export default function FlipImage({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);

  const compute = async (optionsValues: InitialValuesType, input: any) => {
    if (!input) return;
    setResult(await processImage(input, optionsValues));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('flip.directionTitle'),
      component: (
        <Box>
          <SimpleRadio
            onClick={() => updateField('direction', 'horizontal')}
            checked={values.direction === 'horizontal'}
            description={t('flip.horizontalDescription')}
            title={t('flip.horizontal')}
          />
          <SimpleRadio
            onClick={() => updateField('direction', 'vertical')}
            checked={values.direction === 'vertical'}
            description={t('flip.verticalDescription')}
            title={t('flip.vertical')}
          />
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      input={input}
      inputComponent={
        <ToolImageInput
          value={input}
          onChange={setInput}
          title={t('flip.inputTitle')}
          accept={['image/*']}
        />
      }
      resultComponent={
        <ToolFileResult
          value={result}
          title={t('flip.resultTitle')}
          extension={input?.name.split('.').pop() || 'png'}
        />
      }
    />
  );
}
