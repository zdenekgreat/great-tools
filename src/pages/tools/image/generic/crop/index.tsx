import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
  ListSubheader
} from '@mui/material';
import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ToolFileResult from '@components/result/ToolFileResult';
import { ToolComponentProps } from '@tools/defineTool';
import { useTranslation } from 'react-i18next';

const aspectRatioPresets = [
  {
    group: 'Základní',
    label: 'FreeForm (volný)',
    value: 'free',
    ratio: undefined
  },
  { group: 'Základní', label: '1:1 (Čtverec)', value: '1:1', ratio: 1 },
  {
    group: 'Standardní poměry',
    label: '4:3 (Monitor)',
    value: '4:3',
    ratio: 4 / 3
  },
  { group: 'Standardní poměry', label: '14:9', value: '14:9', ratio: 14 / 9 },
  {
    group: 'Standardní poměry',
    label: '16:9 (Widescreen)',
    value: '16:9',
    ratio: 16 / 9
  },
  {
    group: 'Standardní poměry',
    label: '16:10',
    value: '16:10',
    ratio: 16 / 10
  },
  { group: 'Standardní poměry', label: '2:1', value: '2:1', ratio: 2 },
  {
    group: 'Standardní poměry',
    label: '3:1 (Panorama)',
    value: '3:1',
    ratio: 3
  },
  { group: 'Standardní poměry', label: '4:1', value: '4:1', ratio: 4 },
  {
    group: 'Standardní poměry',
    label: '3:2 (35mm Film)',
    value: '3:2',
    ratio: 3 / 2
  },
  { group: 'Standardní poměry', label: '5:4', value: '5:4', ratio: 5 / 4 },
  { group: 'Standardní poměry', label: '7:5', value: '7:5', ratio: 7 / 5 },
  {
    group: 'Standardní poměry',
    label: '19:10',
    value: '19:10',
    ratio: 19 / 10
  },
  {
    group: 'Standardní poměry',
    label: '21:9 (Cinemascope)',
    value: '21:9',
    ratio: 21 / 9
  },
  {
    group: 'Standardní poměry',
    label: '32:9 (Super Ultra Wide)',
    value: '32:9',
    ratio: 32 / 9
  },
  {
    group: 'Standardní poměry',
    label: '9:16 (Vertikální video)',
    value: '9:16',
    ratio: 9 / 16
  },
  {
    group: 'Standardní poměry',
    label: '3:4 (Portrét)',
    value: '3:4',
    ratio: 3 / 4
  },
  {
    group: 'Standardní poměry',
    label: '2:3 (Portrét foto)',
    value: '2:3',
    ratio: 2 / 3
  },

  {
    group: 'Facebook',
    label: 'Facebook Profile 170×170',
    value: 'fb-profile',
    ratio: 1
  },
  {
    group: 'Facebook',
    label: 'Facebook Cover 820×312',
    value: 'fb-cover',
    ratio: 820 / 312
  },
  {
    group: 'Facebook',
    label: 'Facebook Post 1200×900',
    value: 'fb-post',
    ratio: 1200 / 900
  },
  {
    group: 'Facebook',
    label: 'Facebook Ad 1280×720',
    value: 'fb-ad',
    ratio: 1280 / 720
  },
  {
    group: 'Facebook',
    label: 'Facebook Story 1080×1920',
    value: 'fb-story',
    ratio: 1080 / 1920
  },
  {
    group: 'Facebook',
    label: 'Facebook Event 1920×1005',
    value: 'fb-event',
    ratio: 1920 / 1005
  },

  {
    group: 'Instagram',
    label: 'Instagram Profile 110×110',
    value: 'ig-profile',
    ratio: 1
  },
  {
    group: 'Instagram',
    label: 'Instagram Post 1080×1080',
    value: 'ig-square',
    ratio: 1
  },
  {
    group: 'Instagram',
    label: 'Instagram Portrait 1080×1350',
    value: 'ig-portrait',
    ratio: 1080 / 1350
  },
  {
    group: 'Instagram',
    label: 'Instagram Landscape 1080×566',
    value: 'ig-landscape',
    ratio: 1080 / 566
  },
  {
    group: 'Instagram',
    label: 'Instagram Story 1080×1920',
    value: 'ig-story',
    ratio: 1080 / 1920
  },
  {
    group: 'Instagram',
    label: 'Instagram Reels 1080×1920',
    value: 'ig-reels',
    ratio: 1080 / 1920
  },

  {
    group: 'Twitter / X',
    label: 'Twitter Profile 400×400',
    value: 'x-profile',
    ratio: 1
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Header 1500×500',
    value: 'x-header',
    ratio: 1500 / 500
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Image 1024×512',
    value: 'x-image',
    ratio: 1024 / 512
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Card 1200×628',
    value: 'x-card',
    ratio: 1200 / 628
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Ad 1200×675',
    value: 'x-ad',
    ratio: 1200 / 675
  },

  {
    group: 'YouTube',
    label: 'YouTube Thumbnail 1280×720',
    value: 'yt-thumb',
    ratio: 1280 / 720
  },
  {
    group: 'YouTube',
    label: 'YouTube Banner 2560×1440',
    value: 'yt-banner',
    ratio: 2560 / 1440
  },
  {
    group: 'YouTube',
    label: 'YouTube Profile 800×800',
    value: 'yt-profile',
    ratio: 1
  },
  {
    group: 'YouTube',
    label: 'YouTube Shorts 1080×1920',
    value: 'yt-shorts',
    ratio: 1080 / 1920
  },

  {
    group: 'LinkedIn',
    label: 'LinkedIn Profile 400×400',
    value: 'li-profile',
    ratio: 1
  },
  {
    group: 'LinkedIn',
    label: 'LinkedIn Cover 1584×396',
    value: 'li-cover',
    ratio: 1584 / 396
  },
  {
    group: 'LinkedIn',
    label: 'LinkedIn Post 1200×627',
    value: 'li-post',
    ratio: 1200 / 627
  },

  {
    group: 'TikTok',
    label: 'TikTok Video 1080×1920',
    value: 'tt-video',
    ratio: 1080 / 1920
  },
  {
    group: 'Pinterest',
    label: 'Pinterest Pin 1000×1500',
    value: 'pin-pin',
    ratio: 1000 / 1500
  },
  {
    group: 'Pinterest',
    label: 'Pinterest Square 1000×1000',
    value: 'pin-sq',
    ratio: 1
  },
  {
    group: 'Snapchat',
    label: 'Snapchat Story 1080×1920',
    value: 'snap-story',
    ratio: 1080 / 1920
  },

  {
    group: 'Twitch',
    label: 'Twitch Banner 1200×480',
    value: 'tw-banner',
    ratio: 1200 / 480
  },
  {
    group: 'Twitch',
    label: 'Twitch Offline 1920×1080',
    value: 'tw-offline',
    ratio: 1920 / 1080
  },
  {
    group: 'Discord',
    label: 'Discord Avatar 128×128',
    value: 'dc-avatar',
    ratio: 1
  },
  {
    group: 'Discord',
    label: 'Discord Banner 960×540',
    value: 'dc-banner',
    ratio: 960 / 540
  },

  {
    group: 'Web rozlišení',
    label: 'Web Mini 1024×768',
    value: 'web-mini',
    ratio: 1024 / 768
  },
  {
    group: 'Web rozlišení',
    label: 'Web Common 1366×768',
    value: 'web-common',
    ratio: 1366 / 768
  },
  {
    group: 'Web rozlišení',
    label: 'Web Medium 1440×900',
    value: 'web-medium',
    ratio: 1440 / 900
  },

  {
    group: 'Tapety & Rozlišení',
    label: 'Full HD 1920×1080',
    value: 'fhd',
    ratio: 1920 / 1080
  },
  {
    group: 'Tapety & Rozlišení',
    label: '2K QHD 2560×1440',
    value: '2k',
    ratio: 2560 / 1440
  },
  {
    group: 'Tapety & Rozlišení',
    label: '4K UHD 3840×2160',
    value: '4k',
    ratio: 3840 / 2160
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'iPhone 1170×2532',
    value: 'iphone',
    ratio: 1170 / 2532
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'iPad 2048×2732',
    value: 'ipad',
    ratio: 2048 / 2732
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'Android 1080×2400',
    value: 'android',
    ratio: 1080 / 2400
  },

  { group: 'Tisk', label: 'A4 (210×297 mm)', value: 'a4', ratio: 210 / 297 },
  { group: 'Tisk', label: 'A3 (297×420 mm)', value: 'a3', ratio: 297 / 420 },
  { group: 'Tisk', label: 'A5 (148×210 mm)', value: 'a5', ratio: 148 / 210 },
  {
    group: 'Tisk',
    label: 'Letter (8.5×11")',
    value: 'letter',
    ratio: 8.5 / 11
  },
  {
    group: 'Tisk',
    label: 'Fotka 10×15 cm',
    value: 'photo-10x15',
    ratio: 10 / 15
  },
  { group: 'Tisk', label: 'Vizitka 85×55 mm', value: 'card', ratio: 85 / 55 }
];

export default function CropImage({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 10,
    y: 10,
    width: 80,
    height: 80
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [result, setResult] = useState<File | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string>('free');
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setInputFile(file);
      setResult(null);
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRatioChange = (value: string) => {
    setSelectedRatio(value);
    const preset = aspectRatioPresets.find((p) => p.value === value);
    if (preset?.ratio) {
      setCrop((prev) => ({ ...prev, aspect: preset.ratio }) as Crop);
    }
  };

  const getAspectRatio = (): number | undefined => {
    const preset = aspectRatioPresets.find((p) => p.value === selectedRatio);
    return preset?.ratio;
  };

  const handleCropImage = useCallback(() => {
    if (!completedCrop || !imgRef.current || !inputFile) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        setResult(
          new File([blob], inputFile.name, {
            type: inputFile.type || 'image/png'
          })
        );
      }
    }, inputFile.type || 'image/png');
  }, [completedCrop, inputFile]);

  // Build grouped menu items
  const groups: string[] = [];
  aspectRatioPresets.forEach((p) => {
    if (!groups.includes(p.group)) groups.push(p.group);
  });
  const menuItems: React.ReactNode[] = [];
  groups.forEach((group) => {
    menuItems.push(
      <ListSubheader
        key={group}
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          backgroundColor: 'background.paper'
        }}
      >
        {group}
      </ListSubheader>
    );
    aspectRatioPresets
      .filter((p) => p.group === group)
      .forEach((p) => {
        menuItems.push(
          <MenuItem key={p.value} value={p.value}>
            {p.label}
          </MenuItem>
        );
      });
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {/* File upload */}
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        {inputFile ? inputFile.name : t('crop.inputTitle')}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {imageSrc && (
        <>
          {/* Controls row */}
          <Box
            display="flex"
            gap={2}
            mb={2}
            flexWrap="wrap"
            alignItems="center"
          >
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <InputLabel>{t('crop.aspectRatio')}</InputLabel>
              <Select
                value={selectedRatio}
                label={t('crop.aspectRatio')}
                onChange={(e) => handleRatioChange(e.target.value)}
                MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
              >
                {menuItems}
              </Select>
            </FormControl>

            {completedCrop && (
              <Typography variant="body2" color="text.secondary">
                {Math.round(
                  (completedCrop.width * (imgRef.current?.naturalWidth || 0)) /
                    (imgRef.current?.width || 1)
                )}
                {' × '}
                {Math.round(
                  (completedCrop.height *
                    (imgRef.current?.naturalHeight || 0)) /
                    (imgRef.current?.height || 1)
                )}
                {' px'}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleCropImage}
              disabled={!completedCrop}
            >
              {t('crop.cropButton') || 'Oříznout'}
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setCrop({ unit: '%', x: 10, y: 10, width: 80, height: 80 });
                setSelectedRatio('free');
              }}
            >
              Reset
            </Button>
          </Box>

          {/* Interactive crop area */}
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              display: 'inline-block',
              maxWidth: '100%'
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={getAspectRatio()}
              ruleOfThirds
            >
              <img
                ref={imgRef}
                src={imageSrc}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  display: 'block'
                }}
                alt="Crop source"
              />
            </ReactCrop>
          </Box>
        </>
      )}

      {/* Result */}
      <Box mt={2}>
        <ToolFileResult
          value={result}
          title={t('crop.resultTitle')}
          extension={inputFile?.name.split('.').pop() || 'png'}
        />
      </Box>
    </Box>
  );
}
