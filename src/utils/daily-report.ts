export const formatValues = (meanValue: any, maxValue: any) => {
  return `(${meanValue ? meanValue.toFixed(1) : 0} | ${
    maxValue ? maxValue.toFixed(1) : 0
  })`;
};
export const formatCoordinates = (values: any) => {
  const splitCoordinates = values.split(';');
  const splitedValues = splitCoordinates.map((value: string) =>
    parseFloat(value),
  );

  return `(${splitedValues[0].toFixed(2)} | ${splitedValues[1].toFixed(2)})`;
};
