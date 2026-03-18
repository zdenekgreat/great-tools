import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Divider,
  ListSubheader
} from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolFileResult from '@components/result/ToolFileResult';
import { GetGroupsType, UpdateField } from '@components/options/ToolOptions';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import SimpleRadio from '@components/options/SimpleRadio';
import { useTranslation } from 'react-i18next';

const aspectRatioPresets = [
  // FreeForm / Original / Custom
  { group: 'Základní', label: 'FreeForm (volný)', value: 'free', w: 0, h: 0 },
  {
    group: 'Základní',
    label: 'Original (zachovat)',
    value: 'original',
    w: 0,
    h: 0
  },
  { group: 'Základní', label: 'Custom (vlastní)', value: 'custom', w: 0, h: 0 },

  // Standard Ratios
  {
    group: 'Standardní poměry',
    label: '1:1 (Čtverec)',
    value: '1:1',
    w: 1,
    h: 1
  },
  {
    group: 'Standardní poměry',
    label: '4:3 (Monitor)',
    value: '4:3',
    w: 4,
    h: 3
  },
  { group: 'Standardní poměry', label: '14:9', value: '14:9', w: 14, h: 9 },
  {
    group: 'Standardní poměry',
    label: '16:9 (Widescreen)',
    value: '16:9',
    w: 16,
    h: 9
  },
  { group: 'Standardní poměry', label: '16:10', value: '16:10', w: 16, h: 10 },
  { group: 'Standardní poměry', label: '2:1', value: '2:1', w: 2, h: 1 },
  {
    group: 'Standardní poměry',
    label: '3:1 (Panorama)',
    value: '3:1',
    w: 3,
    h: 1
  },
  { group: 'Standardní poměry', label: '4:1', value: '4:1', w: 4, h: 1 },
  {
    group: 'Standardní poměry',
    label: '3:2 (35mm Film)',
    value: '3:2',
    w: 3,
    h: 2
  },
  { group: 'Standardní poměry', label: '5:4', value: '5:4', w: 5, h: 4 },
  { group: 'Standardní poměry', label: '7:5', value: '7:5', w: 7, h: 5 },
  { group: 'Standardní poměry', label: '19:10', value: '19:10', w: 19, h: 10 },
  {
    group: 'Standardní poměry',
    label: '21:9 (Cinemascope)',
    value: '21:9',
    w: 21,
    h: 9
  },
  {
    group: 'Standardní poměry',
    label: '32:9 (Super Ultra Wide)',
    value: '32:9',
    w: 32,
    h: 9
  },
  {
    group: 'Standardní poměry',
    label: '9:16 (Vertikální video)',
    value: '9:16',
    w: 9,
    h: 16
  },
  {
    group: 'Standardní poměry',
    label: '3:4 (Portrét)',
    value: '3:4',
    w: 3,
    h: 4
  },
  {
    group: 'Standardní poměry',
    label: '2:3 (Portrét foto)',
    value: '2:3',
    w: 2,
    h: 3
  },

  // Facebook
  {
    group: 'Facebook',
    label: 'Facebook Profile 170×170',
    value: 'fb-profile',
    w: 170,
    h: 170
  },
  {
    group: 'Facebook',
    label: 'Facebook Cover 820×312',
    value: 'fb-cover',
    w: 820,
    h: 312
  },
  {
    group: 'Facebook',
    label: 'Facebook Post 1200×900',
    value: 'fb-post',
    w: 1200,
    h: 900
  },
  {
    group: 'Facebook',
    label: 'Facebook Ad 1280×720',
    value: 'fb-ad',
    w: 1280,
    h: 720
  },
  {
    group: 'Facebook',
    label: 'Facebook Story 1080×1920',
    value: 'fb-story',
    w: 1080,
    h: 1920
  },
  {
    group: 'Facebook',
    label: 'Facebook Event 1920×1005',
    value: 'fb-event',
    w: 1920,
    h: 1005
  },

  // Instagram
  {
    group: 'Instagram',
    label: 'Instagram Profile 110×110',
    value: 'ig-profile',
    w: 110,
    h: 110
  },
  {
    group: 'Instagram',
    label: 'Instagram Post 320×320',
    value: 'ig-post-sm',
    w: 320,
    h: 320
  },
  {
    group: 'Instagram',
    label: 'Instagram Post 1080×1080',
    value: 'ig-square',
    w: 1080,
    h: 1080
  },
  {
    group: 'Instagram',
    label: 'Instagram Portrait 1080×1350',
    value: 'ig-portrait',
    w: 1080,
    h: 1350
  },
  {
    group: 'Instagram',
    label: 'Instagram Landscape 1080×566',
    value: 'ig-landscape',
    w: 1080,
    h: 566
  },
  {
    group: 'Instagram',
    label: 'Instagram Story 1080×1920',
    value: 'ig-story',
    w: 1080,
    h: 1920
  },
  {
    group: 'Instagram',
    label: 'Instagram Reels 1080×1920',
    value: 'ig-reels',
    w: 1080,
    h: 1920
  },

  // Twitter / X
  {
    group: 'Twitter / X',
    label: 'Twitter Profile 400×400',
    value: 'x-profile',
    w: 400,
    h: 400
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Header 1500×1500',
    value: 'x-header',
    w: 1500,
    h: 1500
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Image 1024×512',
    value: 'x-image',
    w: 1024,
    h: 512
  },
  {
    group: 'Twitter / X',
    label: 'Twitter Card 1200×628',
    value: 'x-card',
    w: 1200,
    h: 628
  },

  // YouTube
  {
    group: 'YouTube',
    label: 'YouTube Thumbnail 1280×720',
    value: 'yt-thumb',
    w: 1280,
    h: 720
  },
  {
    group: 'YouTube',
    label: 'YouTube Banner 2560×1440',
    value: 'yt-banner',
    w: 2560,
    h: 1440
  },
  {
    group: 'YouTube',
    label: 'YouTube Profile 800×800',
    value: 'yt-profile',
    w: 800,
    h: 800
  },
  {
    group: 'YouTube',
    label: 'YouTube Shorts 1080×1920',
    value: 'yt-shorts',
    w: 1080,
    h: 1920
  },

  // LinkedIn
  {
    group: 'LinkedIn',
    label: 'LinkedIn Profile 400×400',
    value: 'li-profile',
    w: 400,
    h: 400
  },
  {
    group: 'LinkedIn',
    label: 'LinkedIn Cover 1584×396',
    value: 'li-cover',
    w: 1584,
    h: 396
  },
  {
    group: 'LinkedIn',
    label: 'LinkedIn Post 1200×627',
    value: 'li-post',
    w: 1200,
    h: 627
  },
  {
    group: 'LinkedIn',
    label: 'LinkedIn Company 300×300',
    value: 'li-company',
    w: 300,
    h: 300
  },

  // TikTok
  {
    group: 'TikTok',
    label: 'TikTok Video 1080×1920',
    value: 'tt-video',
    w: 1080,
    h: 1920
  },
  {
    group: 'TikTok',
    label: 'TikTok Profile 200×200',
    value: 'tt-profile',
    w: 200,
    h: 200
  },

  // Pinterest
  {
    group: 'Pinterest',
    label: 'Pinterest Pin 1000×1500',
    value: 'pin-pin',
    w: 1000,
    h: 1500
  },
  {
    group: 'Pinterest',
    label: 'Pinterest Square 1000×1000',
    value: 'pin-sq',
    w: 1000,
    h: 1000
  },
  {
    group: 'Pinterest',
    label: 'Pinterest Profile 165×165',
    value: 'pin-profile',
    w: 165,
    h: 165
  },
  {
    group: 'Pinterest',
    label: 'Pinterest Board 222×150',
    value: 'pin-board',
    w: 222,
    h: 150
  },

  // Snapchat
  {
    group: 'Snapchat',
    label: 'Snapchat Story 1080×1920',
    value: 'snap-story',
    w: 1080,
    h: 1920
  },
  {
    group: 'Snapchat',
    label: 'Snapchat Ad 1080×1920',
    value: 'snap-ad',
    w: 1080,
    h: 1920
  },
  {
    group: 'Snapchat',
    label: 'Snapchat Geofilter 1080×2340',
    value: 'snap-geo',
    w: 1080,
    h: 2340
  },

  // Twitch
  {
    group: 'Twitch',
    label: 'Twitch Profile 256×256',
    value: 'tw-profile',
    w: 256,
    h: 256
  },
  {
    group: 'Twitch',
    label: 'Twitch Banner 1200×480',
    value: 'tw-banner',
    w: 1200,
    h: 480
  },
  {
    group: 'Twitch',
    label: 'Twitch Offline 1920×1080',
    value: 'tw-offline',
    w: 1920,
    h: 1080
  },
  {
    group: 'Twitch',
    label: 'Twitch Emote 112×112',
    value: 'tw-emote',
    w: 112,
    h: 112
  },

  // Discord
  {
    group: 'Discord',
    label: 'Discord Avatar 128×128',
    value: 'dc-avatar',
    w: 128,
    h: 128
  },
  {
    group: 'Discord',
    label: 'Discord Banner 960×540',
    value: 'dc-banner',
    w: 960,
    h: 540
  },
  {
    group: 'Discord',
    label: 'Discord Emoji 128×128',
    value: 'dc-emoji',
    w: 128,
    h: 128
  },
  {
    group: 'Discord',
    label: 'Discord Server Icon 512×512',
    value: 'dc-server',
    w: 512,
    h: 512
  },

  // Twitter Ad
  {
    group: 'Twitter / X',
    label: 'Twitter Ad 1200×675',
    value: 'x-ad',
    w: 1200,
    h: 675
  },

  // Web rozlišení
  {
    group: 'Web rozlišení',
    label: 'Web Mini 1024×768',
    value: 'web-mini',
    w: 1024,
    h: 768
  },
  {
    group: 'Web rozlišení',
    label: 'Web Small 1280×800',
    value: 'web-small',
    w: 1280,
    h: 800
  },
  {
    group: 'Web rozlišení',
    label: 'Web Common 1366×768',
    value: 'web-common',
    w: 1366,
    h: 768
  },
  {
    group: 'Web rozlišení',
    label: 'Web Medium 1440×900',
    value: 'web-medium',
    w: 1440,
    h: 900
  },
  {
    group: 'Web rozlišení',
    label: 'Web Large 1600×900',
    value: 'web-large',
    w: 1600,
    h: 900
  },
  {
    group: 'Web rozlišení',
    label: 'Web XL 1920×1200',
    value: 'web-xl',
    w: 1920,
    h: 1200
  },

  // Tapety / Desktop / Mobile
  {
    group: 'Tapety & Rozlišení',
    label: 'HD 1280×720',
    value: 'hd',
    w: 1280,
    h: 720
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'Full HD 1920×1080',
    value: 'fhd',
    w: 1920,
    h: 1080
  },
  {
    group: 'Tapety & Rozlišení',
    label: '2K QHD 2560×1440',
    value: '2k',
    w: 2560,
    h: 1440
  },
  {
    group: 'Tapety & Rozlišení',
    label: '4K UHD 3840×2160',
    value: '4k',
    w: 3840,
    h: 2160
  },
  {
    group: 'Tapety & Rozlišení',
    label: '5K 5120×2880',
    value: '5k',
    w: 5120,
    h: 2880
  },
  {
    group: 'Tapety & Rozlišení',
    label: '8K 7680×4320',
    value: '8k',
    w: 7680,
    h: 4320
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'iPhone 1170×2532',
    value: 'iphone',
    w: 1170,
    h: 2532
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'iPhone Pro Max 1290×2796',
    value: 'iphone-max',
    w: 1290,
    h: 2796
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'iPad 2048×2732',
    value: 'ipad',
    w: 2048,
    h: 2732
  },
  {
    group: 'Tapety & Rozlišení',
    label: 'Android 1080×2400',
    value: 'android',
    w: 1080,
    h: 2400
  },

  // Tisk
  { group: 'Tisk', label: 'A4 (210×297 mm)', value: 'a4', w: 2480, h: 3508 },
  { group: 'Tisk', label: 'A3 (297×420 mm)', value: 'a3', w: 3508, h: 4961 },
  { group: 'Tisk', label: 'A5 (148×210 mm)', value: 'a5', w: 1748, h: 2480 },
  { group: 'Tisk', label: 'A6 (105×148 mm)', value: 'a6', w: 1280, h: 1748 },
  {
    group: 'Tisk',
    label: 'Letter (8.5×11")',
    value: 'letter',
    w: 2550,
    h: 3300
  },
  { group: 'Tisk', label: 'Legal (8.5×14")', value: 'legal', w: 2550, h: 4200 },
  {
    group: 'Tisk',
    label: 'Fotka 10×15 cm',
    value: 'photo-10x15',
    w: 1181,
    h: 1772
  },
  {
    group: 'Tisk',
    label: 'Fotka 13×18 cm',
    value: 'photo-13x18',
    w: 1535,
    h: 2126
  },
  {
    group: 'Tisk',
    label: 'Fotka 20×30 cm',
    value: 'photo-20x30',
    w: 2362,
    h: 3543
  },
  { group: 'Tisk', label: 'Vizitka 85×55 mm', value: 'card', w: 1004, h: 650 },
  {
    group: 'Tisk',
    label: 'Pohlednice 148×105 mm',
    value: 'postcard',
    w: 1748,
    h: 1240
  }
];

const initialValues = {
  xPosition: '0',
  yPosition: '0',
  cropWidth: '100',
  cropHeight: '100',
  cropShape: 'rectangular' as 'rectangular' | 'circular',
  aspectRatio: 'free'
};
type InitialValuesType = typeof initialValues;
const validationSchema = Yup.object({
  xPosition: Yup.number()
    .min(0, 'X position must be positive')
    .required('X position is required'),
  yPosition: Yup.number()
    .min(0, 'Y position must be positive')
    .required('Y position is required'),
  cropWidth: Yup.number()
    .min(1, 'Width must be at least 1px')
    .required('Width is required'),
  cropHeight: Yup.number()
    .min(1, 'Height must be at least 1px')
    .required('Height is required')
});

export default function CropImage({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);

  const compute = (optionsValues: InitialValuesType, input: any) => {
    if (!input) return;

    const { xPosition, yPosition, cropWidth, cropHeight, cropShape } =
      optionsValues;
    const x = parseInt(xPosition);
    const y = parseInt(yPosition);
    const width = parseInt(cropWidth);
    const height = parseInt(cropHeight);
    const isCircular = cropShape === 'circular';

    const processImage = async (
      file: File,
      x: number,
      y: number,
      width: number,
      height: number,
      isCircular: boolean
    ) => {
      const sourceCanvas = document.createElement('canvas');
      const sourceCtx = sourceCanvas.getContext('2d');
      if (sourceCtx == null) return;

      const destCanvas = document.createElement('canvas');
      const destCtx = destCanvas.getContext('2d');
      if (destCtx == null) return;

      const img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();

      sourceCanvas.width = img.width;
      sourceCanvas.height = img.height;
      sourceCtx.drawImage(img, 0, 0);

      destCanvas.width = width;
      destCanvas.height = height;

      if (isCircular) {
        destCtx.beginPath();
        const radius = Math.min(width, height) / 2;
        destCtx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
        destCtx.closePath();
        destCtx.clip();
        destCtx.drawImage(img, x, y, width, height, 0, 0, width, height);
      } else {
        destCtx.drawImage(img, x, y, width, height, 0, 0, width, height);
      }

      URL.revokeObjectURL(img.src);

      destCanvas.toBlob((blob) => {
        if (blob) {
          const newFile = new File([blob], file.name, { type: file.type });
          setResult(newFile);
        }
      }, file.type);
    };

    processImage(input, x, y, width, height, isCircular);
  };

  const handleCropChange =
    (values: InitialValuesType, updateField: UpdateField<InitialValuesType>) =>
    (
      position: { x: number; y: number },
      size: { width: number; height: number }
    ) => {
      updateField('xPosition', position.x.toString());
      updateField('yPosition', position.y.toString());
      updateField('cropWidth', size.width.toString());
      updateField('cropHeight', size.height.toString());
    };

  const handleAspectRatioChange = (
    value: string,
    updateField: UpdateField<InitialValuesType>
  ) => {
    updateField('aspectRatio', value);
    const preset = aspectRatioPresets.find((p) => p.value === value);
    if (preset && preset.w > 0 && preset.h > 0) {
      updateField('cropWidth', String(preset.w));
      updateField('cropHeight', String(preset.h));
    }
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => {
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

    return [
      {
        title: t('crop.aspectRatio') || 'Aspect Ratio',
        component: (
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel>{t('crop.aspectRatio') || 'Aspect Ratio'}</InputLabel>
              <Select
                value={values.aspectRatio}
                label={t('crop.aspectRatio') || 'Aspect Ratio'}
                onChange={(e) =>
                  handleAspectRatioChange(e.target.value, updateField)
                }
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 400 } }
                }}
              >
                {menuItems}
              </Select>
            </FormControl>
          </Box>
        )
      },
      {
        title: t('crop.positionAndSize') || 'Position and Size',
        component: (
          <Box>
            <Box display="flex" gap={2}>
              <TextFieldWithDesc
                value={values.cropWidth}
                onOwnChange={(val) => updateField('cropWidth', val)}
                description={t('crop.widthDesc') || 'Width (px)'}
                inputProps={{ type: 'number', min: 1 }}
              />
              <TextFieldWithDesc
                value={values.cropHeight}
                onOwnChange={(val) => updateField('cropHeight', val)}
                description={t('crop.heightDesc') || 'Height (px)'}
                inputProps={{ type: 'number', min: 1 }}
              />
            </Box>
            <Box display="flex" gap={2} mt={1}>
              <TextFieldWithDesc
                value={values.xPosition}
                onOwnChange={(val) => updateField('xPosition', val)}
                description={t('crop.xDesc') || 'X position (px)'}
                inputProps={{ type: 'number', min: 0 }}
              />
              <TextFieldWithDesc
                value={values.yPosition}
                onOwnChange={(val) => updateField('yPosition', val)}
                description={t('crop.yDesc') || 'Y position (px)'}
                inputProps={{ type: 'number', min: 0 }}
              />
            </Box>
          </Box>
        )
      },
      {
        title: t('crop.shape') || 'Crop Shape',
        component: (
          <Box>
            <SimpleRadio
              onClick={() => updateField('cropShape', 'rectangular')}
              checked={values.cropShape == 'rectangular'}
              description={t('crop.rectangularDesc') || 'Rectangular crop'}
              title={t('crop.rectangular') || 'Rectangle'}
            />
            <SimpleRadio
              onClick={() => updateField('cropShape', 'circular')}
              checked={values.cropShape == 'circular'}
              description={t('crop.circularDesc') || 'Circular crop'}
              title={t('crop.circular') || 'Circle'}
            />
          </Box>
        )
      }
    ];
  };

  const renderCustomInput = (
    values: InitialValuesType,
    updateField: UpdateField<InitialValuesType>
  ) => (
    <ToolImageInput
      value={input}
      onChange={setInput}
      accept={['image/*']}
      title={t('crop.inputTitle') || 'Input image'}
      showCropOverlay={!!input}
      cropShape={values.cropShape as 'rectangular' | 'circular'}
      cropPosition={{
        x: parseInt(values.xPosition || '0'),
        y: parseInt(values.yPosition || '0')
      }}
      cropSize={{
        width: parseInt(values.cropWidth || '100'),
        height: parseInt(values.cropHeight || '100')
      }}
      onCropChange={handleCropChange(values, updateField)}
    />
  );

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      input={input}
      validationSchema={validationSchema}
      renderCustomInput={renderCustomInput}
      resultComponent={
        <ToolFileResult
          title={t('crop.resultTitle') || 'Cropped image'}
          value={result}
        />
      }
    />
  );
}
