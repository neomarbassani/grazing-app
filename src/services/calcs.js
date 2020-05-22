/* eslint-disable radix */
export function supplementQuantityCalc(calcData) {
  const animalsQuantity = parseInt(calcData.animals_quantity);
  const weigth = parseInt(calcData.weigth);
  const grazingHeight = parseInt(calcData.grazing_height);
  const numberOfTracks = parseInt(calcData.number_of_tracks);
  const daysOfStay = parseInt(calcData.days_of_stay);

  const result =
    animalsQuantity + weigth + grazingHeight + numberOfTracks + daysOfStay;

  const supplementQuantityValue = {
    name: 'Quantidade total de animais',
    value: result.toString(),
  };

  return supplementQuantityValue;
}
