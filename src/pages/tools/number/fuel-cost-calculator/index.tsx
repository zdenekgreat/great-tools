import { ToolComponentProps } from '@tools/defineTool';
import { InitialValuesType } from './types';
import { useState, useEffect } from 'react';
import { GetGroupsType } from '@components/options/ToolOptions';
import { Box } from '@mui/material';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import ToolContent from '@components/ToolContent';
import ToolTextResult from '@components/result/ToolTextResult';
import { calculateFuelCost } from './service';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  fuelPrice: 36.5,
  distance: 100,
  consumption: 6.5,
  passengers: 1,
  roundTrip: false
};

export default function FuelCostCalculator({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [result, setResult] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [currentValues, setCurrentValues] =
    useState<InitialValuesType>(initialValues);

  useEffect(() => {
    setResult(calculateFuelCost(currentValues));
  }, [currentValues]);

  const compute = (optionsValues: InitialValuesType, _input: string) => {
    setCurrentValues(optionsValues);
    setResult(calculateFuelCost(optionsValues));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('fuelCostCalculator.tripSettings'),
      component: (
        <Box>
          <TextFieldWithDesc
            value={String(values.distance)}
            onOwnChange={(val) => updateField('distance', Number(val))}
            description={t('fuelCostCalculator.distanceDescription')}
            inputProps={{ type: 'number', min: 0 }}
          />
          <CheckboxWithDesc
            checked={values.roundTrip}
            onChange={(val) => updateField('roundTrip', val)}
            description={t('fuelCostCalculator.roundTripDescription')}
            title={t('fuelCostCalculator.roundTrip')}
          />
        </Box>
      )
    },
    {
      title: t('fuelCostCalculator.fuelSettings'),
      component: (
        <Box>
          <TextFieldWithDesc
            value={String(values.fuelPrice)}
            onOwnChange={(val) => updateField('fuelPrice', Number(val))}
            description={t('fuelCostCalculator.fuelPriceDescription')}
            inputProps={{ type: 'number', min: 0, step: '0.1' }}
          />
          <TextFieldWithDesc
            value={String(values.consumption)}
            onOwnChange={(val) => updateField('consumption', Number(val))}
            description={t('fuelCostCalculator.consumptionDescription')}
            inputProps={{ type: 'number', min: 0, step: '0.1' }}
          />
        </Box>
      )
    },
    {
      title: t('fuelCostCalculator.passengerSettings'),
      component: (
        <Box>
          <TextFieldWithDesc
            value={String(values.passengers)}
            onOwnChange={(val) =>
              updateField('passengers', Math.max(1, Number(val)))
            }
            description={t('fuelCostCalculator.passengersDescription')}
            inputProps={{ type: 'number', min: 1 }}
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
      setInput={setInput}
      inputComponent={<></>}
      resultComponent={
        <ToolTextResult
          title={t('fuelCostCalculator.resultTitle')}
          value={result}
        />
      }
    />
  );
}
