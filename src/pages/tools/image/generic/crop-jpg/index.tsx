import { ToolComponentProps } from '@tools/defineTool';
import { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolFileResult from '@components/result/ToolFileResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { cropImage } from './service';
import { useTranslation } from 'react-i18next';

const initialValues = {
  x: '0',
  y: '0',
  width: '500',
  height: '500'
};
type InitialValuesType = typeof initialValues;

export default function CropJpg({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);

  const compute = async (values: InitialValuesType, input: any) => {
    if (!input) return;
    setResult(
      await cropImage(
        input,
        parseInt(values.x),
        parseInt(values.y),
        parseInt(values.width),
        parseInt(values.height),
        'image/jpeg'
      )
    );
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('cropJpg.dimensions') || 'Crop Dimensions',
      component: (
        <Box>
          <Box display="flex" gap={2}>
            <TextFieldWithDesc
              value={values.width}
              onOwnChange={(v) => updateField('width', v)}
              description="Width (px)"
              inputProps={{ type: 'number', min: 1 }}
            />
            <TextFieldWithDesc
              value={values.height}
              onOwnChange={(v) => updateField('height', v)}
              description="Height (px)"
              inputProps={{ type: 'number', min: 1 }}
            />
          </Box>
          <Box display="flex" gap={2} mt={1}>
            <TextFieldWithDesc
              value={values.x}
              onOwnChange={(v) => updateField('x', v)}
              description="X position (px)"
              inputProps={{ type: 'number', min: 0 }}
            />
            <TextFieldWithDesc
              value={values.y}
              onOwnChange={(v) => updateField('y', v)}
              description="Y position (px)"
              inputProps={{ type: 'number', min: 0 }}
            />
          </Box>
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
          title={t('cropJpg.inputTitle') || 'Input JPG'}
          accept={['image/jpeg,.jpg,.jpeg']}
        />
      }
      resultComponent={
        <ToolFileResult
          value={result}
          title={t('cropJpg.resultTitle') || 'Cropped JPG'}
          extension="jpg"
        />
      }
    />
  );
}
