import { ToolComponentProps } from '@tools/defineTool';
import { useState, useRef, useCallback } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { formatColorInfo, rgbToHex } from './service';
import { useTranslation } from 'react-i18next';

export default function ColorPicker({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [pickedColor, setPickedColor] = useState<string>('#000000');
  const [cursorColor, setCursorColor] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    setInput(file);
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scale to fit max 800px wide
      const maxW = 800;
      const scale = img.width > maxW ? maxW / img.width : 1;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const getColorAtPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(
        ((e.clientX - rect.left) / rect.width) * canvas.width
      );
      const y = Math.floor(
        ((e.clientY - rect.top) / rect.height) * canvas.height
      );
      const ctx = canvas.getContext('2d')!;
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      return { r: pixel[0], g: pixel[1], b: pixel[2] };
    },
    []
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const color = getColorAtPos(e);
      if (!color) return;
      const hex = rgbToHex(color.r, color.g, color.b);
      setPickedColor(hex);
      setResult(formatColorInfo(color.r, color.g, color.b));
    },
    [getColorAtPos]
  );

  const handleCanvasMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const color = getColorAtPos(e);
      if (!color) return;
      setCursorColor(rgbToHex(color.r, color.g, color.b));
    },
    [getColorAtPos]
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <ToolImageInput
        value={input}
        onChange={handleFileChange}
        title={t('colorPicker.inputTitle')}
        accept={['image/*']}
      />

      {input && (
        <Box mt={2}>
          <Box display="flex" gap={2} alignItems="center" mb={1}>
            <Paper
              sx={{
                width: 48,
                height: 48,
                backgroundColor: pickedColor,
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: 1
              }}
            />
            <Typography variant="body1" fontFamily="monospace">
              {pickedColor.toUpperCase()}
            </Typography>
            {cursorColor && (
              <>
                <Paper
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: cursorColor,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    ml: 2
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {t('colorPicker.hover')}: {cursorColor.toUpperCase()}
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              cursor: 'crosshair',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              display: 'inline-block'
            }}
          >
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMove}
              style={{ display: 'block', maxWidth: '100%' }}
            />
          </Box>
        </Box>
      )}

      <Box mt={2}>
        <ToolTextResult title={t('colorPicker.resultTitle')} value={result} />
      </Box>
    </Box>
  );
}
