export function calculateBmi(weight: number, height: number): string {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category: string;
  if (bmi < 18.5) category = 'Podváha';
  else if (bmi < 25) category = 'Normální váha';
  else if (bmi < 30) category = 'Nadváha';
  else if (bmi < 35) category = 'Obezita I. stupně';
  else if (bmi < 40) category = 'Obezita II. stupně';
  else category = 'Obezita III. stupně';
  return `BMI: ${bmi.toFixed(
    1
  )}\nKategorie: ${category}\n\nVáha: ${weight} kg\nVýška: ${height} cm`;
}
