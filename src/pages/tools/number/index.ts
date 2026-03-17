import { tool as numberRandomPortGenerator } from './random-port-generator/meta';
import { tool as numberRandomNumberGenerator } from './random-number-generator/meta';
import { tool as numberSum } from './sum/meta';
import { tool as numberGenerate } from './generate/meta';
import { tool as numberArithmeticSequence } from './arithmetic-sequence/meta';
import { tool as numberByteConverter } from './byte-converter/meta';
import { tool as numberVatCalculator } from './vat-calculator/meta';
import { tool as numberUnitConverter } from './unit-converter/meta';
import { tool as numberBmiCalculator } from './bmi-calculator/meta';
import { tools as genericCalcTools } from './generic-calc/meta';

export const numberTools = [
  numberSum,
  numberGenerate,
  numberArithmeticSequence,
  numberRandomPortGenerator,
  numberRandomNumberGenerator,
  numberByteConverter,
  numberVatCalculator,
  numberUnitConverter,
  numberBmiCalculator,
  ...genericCalcTools
];
