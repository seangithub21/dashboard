export const decimalConverter = (number) => {
  if (number) return Number.parseFloat(number).toFixed(2);
};

export const priceChangeConverter = (number) => {
  if (number && number.includes("-")) {
    return decimalConverter(number);
  } else {
    return `+${decimalConverter(number)}`;
  }
};

export const percentPriceChangeConverter = (number) => {
  return `${priceChangeConverter(number)}%`;
};
