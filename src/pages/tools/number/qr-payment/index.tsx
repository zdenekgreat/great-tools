import { ToolComponentProps } from '@tools/defineTool';
import { InitialValuesType } from './types';
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { generateSpdString, formatPaymentInfo } from './service';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';

const initialValues: InitialValuesType = {
  accountNumber: '',
  bankCode: '',
  iban: '',
  useIban: false,
  amount: '',
  currency: 'CZK',
  variableSymbol: '',
  specificSymbol: '',
  constantSymbol: '',
  message: '',
  recipientName: ''
};

export default function QrPayment({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [values, setValues] = useState<InitialValuesType>(initialValues);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [info, setInfo] = useState<string>('');

  const updateField = <K extends keyof InitialValuesType>(
    key: K,
    value: InitialValuesType[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const spd = generateSpdString(values);
    if (spd && spd !== 'SPD*1.0') {
      QRCode.toDataURL(spd, {
        width: 400,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' }
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => setQrDataUrl(''));
      setInfo(formatPaymentInfo(values));
    } else {
      setQrDataUrl('');
      setInfo('');
    }
  }, [values]);

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'qr-platba.png';
    a.click();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Box display="flex" gap={3} flexWrap="wrap">
        {/* Left - Form */}
        <Box sx={{ flex: 1, minWidth: 320 }}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('qrPayment.accountSection')}
            </Typography>

            <CheckboxWithDesc
              checked={values.useIban}
              onChange={(v) => updateField('useIban', v)}
              title={t('qrPayment.useIban')}
              description={t('qrPayment.useIbanDesc')}
            />

            {values.useIban ? (
              <TextFieldWithDesc
                value={values.iban}
                onOwnChange={(v) => updateField('iban', v)}
                description={t('qrPayment.ibanDesc')}
                inputProps={{ placeholder: 'CZ6508000000192000145399' }}
              />
            ) : (
              <Box display="flex" gap={2}>
                <Box flex={2}>
                  <TextFieldWithDesc
                    value={values.accountNumber}
                    onOwnChange={(v) => updateField('accountNumber', v)}
                    description={t('qrPayment.accountNumberDesc')}
                    inputProps={{ placeholder: '19-2000145399' }}
                  />
                </Box>
                <Box flex={1}>
                  <TextFieldWithDesc
                    value={values.bankCode}
                    onOwnChange={(v) => updateField('bankCode', v)}
                    description={t('qrPayment.bankCodeDesc')}
                    inputProps={{ placeholder: '0800' }}
                  />
                </Box>
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('qrPayment.paymentSection')}
            </Typography>

            <Box display="flex" gap={2}>
              <Box flex={2}>
                <TextFieldWithDesc
                  value={values.amount}
                  onOwnChange={(v) => updateField('amount', v)}
                  description={t('qrPayment.amountDesc')}
                  inputProps={{
                    type: 'number',
                    placeholder: '1500',
                    min: 0,
                    step: '0.01'
                  }}
                />
              </Box>
              <Box flex={1}>
                <TextFieldWithDesc
                  value={values.currency}
                  onOwnChange={(v) => updateField('currency', v)}
                  description={t('qrPayment.currencyDesc')}
                  inputProps={{ placeholder: 'CZK' }}
                />
              </Box>
            </Box>

            <TextFieldWithDesc
              value={values.variableSymbol}
              onOwnChange={(v) => updateField('variableSymbol', v)}
              description={t('qrPayment.vsDesc')}
              inputProps={{ placeholder: '1234567890' }}
            />

            <Box display="flex" gap={2}>
              <TextFieldWithDesc
                value={values.specificSymbol}
                onOwnChange={(v) => updateField('specificSymbol', v)}
                description={t('qrPayment.ssDesc')}
                inputProps={{ placeholder: '' }}
              />
              <TextFieldWithDesc
                value={values.constantSymbol}
                onOwnChange={(v) => updateField('constantSymbol', v)}
                description={t('qrPayment.ksDesc')}
                inputProps={{ placeholder: '0308' }}
              />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('qrPayment.additionalSection')}
            </Typography>

            <TextFieldWithDesc
              value={values.message}
              onOwnChange={(v) => updateField('message', v)}
              description={t('qrPayment.messageDesc')}
              inputProps={{ placeholder: 'Platba za fakturu' }}
            />

            <TextFieldWithDesc
              value={values.recipientName}
              onOwnChange={(v) => updateField('recipientName', v)}
              description={t('qrPayment.recipientDesc')}
              inputProps={{ placeholder: 'Jan Novák s.r.o.' }}
            />
          </Paper>
        </Box>

        {/* Right - QR Code */}
        <Box sx={{ minWidth: 300, textAlign: 'center' }}>
          {qrDataUrl ? (
            <>
              <Paper sx={{ p: 3, display: 'inline-block', mb: 2 }}>
                <img
                  src={qrDataUrl}
                  alt="QR platba"
                  style={{ width: 300, height: 300 }}
                />
              </Paper>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleDownloadQr}
                  sx={{ mb: 2 }}
                >
                  {t('qrPayment.downloadQr')}
                </Button>
              </Box>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'left',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  whiteSpace: 'pre-wrap',
                  backgroundColor: 'background.default'
                }}
              >
                {info}
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 4, color: 'text.secondary' }}>
              <Typography>{t('qrPayment.enterAccount')}</Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}
