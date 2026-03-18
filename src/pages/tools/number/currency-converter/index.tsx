import { ToolComponentProps } from '@tools/defineTool';
import { InitialValuesType, ExchangeRate } from './types';
import { useState, useEffect } from 'react';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { fetchRates, convertCurrency } from './service';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  from: 'EUR',
  to: 'CZK'
};

const CZK_OPTION = { code: 'CZK', name: 'Česká koruna' };

export default function CurrencyConverter({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [input, setInput] = useState<string>('100');
  const [result, setResult] = useState<string>('');
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates().then((r) => {
      setRates(r);
      setLoading(false);
    });
  }, []);

  const compute = (optionsValues: InitialValuesType, input: string) => {
    const value = parseFloat(input.replace(',', '.'));
    if (isNaN(value) || rates.length === 0) {
      setResult(loading ? 'Načítání kurzů...' : 'Zadejte platnou částku.');
      return;
    }
    setResult(
      convertCurrency(value, optionsValues.from, optionsValues.to, rates)
    );
  };

  const allCurrencies = [
    CZK_OPTION,
    ...rates.map((r) => ({ code: r.code, name: r.name }))
  ];

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('currencyConverter.fromCurrency'),
      component: (
        <Box>
          <FormControl fullWidth size="small">
            <InputLabel>{t('currencyConverter.fromCurrency')}</InputLabel>
            <Select
              value={values.from}
              label={t('currencyConverter.fromCurrency')}
              onChange={(e) => updateField('from', e.target.value)}
            >
              {allCurrencies.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {c.code} – {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )
    },
    {
      title: t('currencyConverter.toCurrency'),
      component: (
        <Box>
          <FormControl fullWidth size="small">
            <InputLabel>{t('currencyConverter.toCurrency')}</InputLabel>
            <Select
              value={values.to}
              label={t('currencyConverter.toCurrency')}
              onChange={(e) => updateField('to', e.target.value)}
            >
              {allCurrencies.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {c.code} – {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      setInput={setInput}
      inputComponent={
        <ToolTextInput
          title={t('currencyConverter.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('currencyConverter.resultTitle')}
          value={result}
        />
      }
    />
  );
}
