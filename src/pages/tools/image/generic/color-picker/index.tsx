import { ToolComponentProps } from '@tools/defineTool';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Slider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';
import {
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToCmyk,
  hsvToRgb,
  extractPalette,
  formatPaletteAs
} from './service';

type ColorMode = 'picker' | 'image';
type FormatTab = 'rgb' | 'hsv' | 'hsl' | 'cmyk';

export default function ColorPicker({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [mode, setMode] = useState<ColorMode>('picker');
  const [r, setR] = useState(178);
  const [g, setG] = useState(54);
  const [b, setB] = useState(54);
  const [formatTab, setFormatTab] = useState<FormatTab>('rgb');

  // Image picker state
  const [imageSrc, setImageSrc] = useState<string>('');
  const [palette, setPalette] = useState<{ r: number; g: number; b: number }[]>(
    []
  );
  const [paletteFormat, setPaletteFormat] = useState<string>('hex');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Color picker canvas
  const pickerCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueSliderRef = useRef<HTMLCanvasElement>(null);
  const [hue, setHue] = useState(0);

  const hex = rgbToHex(r, g, b).toUpperCase();
  const hsl = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);

  const setColorFromRgb = (nr: number, ng: number, nb: number) => {
    setR(nr);
    setG(ng);
    setB(nb);
    setHue(rgbToHsv(nr, ng, nb).h);
  };

  // Draw color picker canvas (saturation/value square)
  useEffect(() => {
    const canvas = pickerCanvasRef.current;
    if (!canvas || mode !== 'picker') return;
    const ctx = canvas.getContext('2d')!;
    const w = canvas.width;
    const h = canvas.height;

    // Draw saturation-value gradient
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const s = (x / w) * 100;
        const v = (1 - y / h) * 100;
        const rgb = hsvToRgb(hue, s, v);
        ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [hue, mode]);

  // Draw hue strip
  useEffect(() => {
    const canvas = hueSliderRef.current;
    if (!canvas || mode !== 'picker') return;
    const ctx = canvas.getContext('2d')!;
    const h = canvas.height;
    for (let y = 0; y < h; y++) {
      const hueVal = (y / h) * 360;
      const rgb = hsvToRgb(hueVal, 100, 100);
      ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
      ctx.fillRect(0, y, canvas.width, 1);
    }
  }, [mode]);

  const handlePickerCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = pickerCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const s = x * 100;
    const v = (1 - y) * 100;
    const rgb = hsvToRgb(hue, s, v);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
  };

  const handleHueClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = hueSliderRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = (e.clientY - rect.top) / rect.height;
    const newHue = Math.round(y * 360);
    setHue(newHue);
    const rgb = hsvToRgb(newHue, hsv.s, hsv.v);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
  };

  // Image handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const scale = Math.min(800 / img.width, 600 / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Extract palette
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractPalette(imageData, 10);
        setPalette(colors);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(
      ((e.clientY - rect.top) / rect.height) * canvas.height
    );
    const ctx = canvas.getContext('2d')!;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setColorFromRgb(pixel[0], pixel[1], pixel[2]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getFormatValue = (): string => {
    switch (formatTab) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsv':
        return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
      case 'hsl':
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case 'cmyk':
        return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {/* Mode toggle */}
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="picker">Color Picker</ToggleButton>
        <ToggleButton value="image">Image Color Picker</ToggleButton>
      </ToggleButtonGroup>

      <Box display="flex" gap={3} flexWrap="wrap">
        {/* Left panel */}
        <Box sx={{ minWidth: 300, maxWidth: 380 }}>
          {/* Selected Color Preview */}
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Selected Color
          </Typography>
          <Paper
            sx={{
              width: '100%',
              height: 60,
              backgroundColor: hex,
              border: '2px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 2
            }}
          />

          {/* Hex Code */}
          <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
            Hex Code
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Paper
              sx={{
                px: 2,
                py: 1,
                flex: 1,
                fontFamily: 'monospace',
                fontSize: 16,
                backgroundColor: 'background.default'
              }}
            >
              {hex}
            </Paper>
            <IconButton color="primary" onClick={() => copyToClipboard(hex)}>
              <ContentCopyIcon />
            </IconButton>
          </Box>

          {/* Other formats */}
          <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
            Other Color Formats
          </Typography>
          <ToggleButtonGroup
            value={formatTab}
            exclusive
            onChange={(_, v) => v && setFormatTab(v)}
            size="small"
            sx={{ mb: 1 }}
          >
            <ToggleButton value="rgb">RGB</ToggleButton>
            <ToggleButton value="hsv">HSV</ToggleButton>
            <ToggleButton value="hsl">HSL</ToggleButton>
            <ToggleButton value="cmyk">CMYK</ToggleButton>
          </ToggleButtonGroup>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Paper
              sx={{
                px: 2,
                py: 1,
                flex: 1,
                fontFamily: 'monospace',
                fontSize: 14,
                backgroundColor: 'background.default'
              }}
            >
              {getFormatValue()}
            </Paper>
            <IconButton
              color="primary"
              onClick={() => copyToClipboard(getFormatValue())}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

          {/* RGB Sliders */}
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Edit Color
          </Typography>
          <Box>
            {[
              {
                label: 'R',
                value: r,
                set: (v: number) => setR(v),
                color: '#f44336'
              },
              {
                label: 'G',
                value: g,
                set: (v: number) => setG(v),
                color: '#4caf50'
              },
              {
                label: 'B',
                value: b,
                set: (v: number) => setB(v),
                color: '#2196f3'
              }
            ].map(({ label, value, set, color }) => (
              <Box key={label} display="flex" alignItems="center" gap={1}>
                <Typography sx={{ width: 16, fontWeight: 'bold' }}>
                  {label}
                </Typography>
                <Slider
                  value={value}
                  onChange={(_, v) => {
                    set(v as number);
                    setHue(
                      rgbToHsv(
                        label === 'R' ? (v as number) : r,
                        label === 'G' ? (v as number) : g,
                        label === 'B' ? (v as number) : b
                      ).h
                    );
                  }}
                  min={0}
                  max={255}
                  sx={{
                    flex: 1,
                    color,
                    '& .MuiSlider-track': { backgroundColor: color },
                    '& .MuiSlider-thumb': { backgroundColor: color }
                  }}
                />
                <Typography
                  sx={{
                    width: 35,
                    textAlign: 'right',
                    fontFamily: 'monospace'
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right panel - Color picker or Image */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          {mode === 'picker' ? (
            <Box display="flex" gap={1}>
              {/* Saturation/Value canvas */}
              <Box sx={{ position: 'relative', cursor: 'crosshair' }}>
                <canvas
                  ref={pickerCanvasRef}
                  width={400}
                  height={400}
                  onClick={handlePickerCanvasClick}
                  onMouseDown={(e) => {
                    const handler = (ev: MouseEvent) =>
                      handlePickerCanvasClick(ev as any);
                    document.addEventListener('mousemove', handler);
                    document.addEventListener(
                      'mouseup',
                      () => document.removeEventListener('mousemove', handler),
                      { once: true }
                    );
                    handlePickerCanvasClick(e);
                  }}
                  style={{
                    borderRadius: 4,
                    display: 'block',
                    maxWidth: '100%'
                  }}
                />
              </Box>
              {/* Hue strip */}
              <Box sx={{ cursor: 'pointer' }}>
                <canvas
                  ref={hueSliderRef}
                  width={30}
                  height={400}
                  onClick={handleHueClick}
                  onMouseDown={(e) => {
                    const handler = (ev: MouseEvent) =>
                      handleHueClick(ev as any);
                    document.addEventListener('mousemove', handler);
                    document.addEventListener(
                      'mouseup',
                      () => document.removeEventListener('mousemove', handler),
                      { once: true }
                    );
                    handleHueClick(e);
                  }}
                  style={{ borderRadius: 4, display: 'block' }}
                />
              </Box>
            </Box>
          ) : (
            <Box>
              <Button variant="contained" component="label" sx={{ mb: 2 }}>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>

              {imageSrc && (
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
                    onClick={handleImageClick}
                    style={{ display: 'block', maxWidth: '100%' }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Palette section (only when image mode and palette extracted) */}
      {mode === 'image' && palette.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Color palette from image
          </Typography>

          {/* Palette strip */}
          <Box
            display="flex"
            mb={2}
            sx={{ borderRadius: 1, overflow: 'hidden' }}
          >
            {palette.map((c, i) => (
              <Tooltip key={i} title={rgbToHex(c.r, c.g, c.b).toUpperCase()}>
                <Box
                  sx={{
                    flex: 1,
                    height: 50,
                    backgroundColor: rgbToHex(c.r, c.g, c.b),
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                  }}
                  onClick={() => setColorFromRgb(c.r, c.g, c.b)}
                />
              </Tooltip>
            ))}
          </Box>

          {/* Format selector */}
          <ToggleButtonGroup
            value={paletteFormat}
            exclusive
            onChange={(_, v) => v && setPaletteFormat(v)}
            size="small"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="hex">HEX</ToggleButton>
            <ToggleButton value="rgb">RGB</ToggleButton>
            <ToggleButton value="html">HTML</ToggleButton>
            <ToggleButton value="css">CSS</ToggleButton>
            <ToggleButton value="scss">SCSS</ToggleButton>
            <ToggleButton value="hsv">HSV</ToggleButton>
            <ToggleButton value="hsl">HSL</ToggleButton>
            <ToggleButton value="cmyk">CMYK</ToggleButton>
          </ToggleButtonGroup>

          {/* Palette in selected format */}
          <Box display="flex" alignItems="flex-start" gap={1}>
            <Paper
              sx={{
                p: 2,
                flex: 1,
                fontFamily: 'monospace',
                fontSize: 13,
                whiteSpace: 'pre-wrap',
                backgroundColor: 'background.default'
              }}
            >
              {formatPaletteAs(palette, paletteFormat)}
            </Paper>
            <IconButton
              color="primary"
              onClick={() =>
                copyToClipboard(formatPaletteAs(palette, paletteFormat))
              }
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
