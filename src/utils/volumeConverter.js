export const volumeConverter = (number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(number);
