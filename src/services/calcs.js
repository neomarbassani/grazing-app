/* eslint-disable radix */
export function areaOfFoal({weigth, score, days_of_use, pastureHeight}) {
  const result =
    parseInt(weigth) +
    parseInt(score) +
    parseInt(days_of_use) +
    parseInt(pastureHeight);

  const area = {
    name: 'Área do potreiro',
    value: result.toString(),
  };

  return area;
}
