const reais = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export function parseCurrencyValueInCentsToBRL(valueInCents: number) {
  return reais.format(valueInCents);
}

export function parseMaskedCurrencyValueToNumber(value: string) {
  return parseFloat(value.replaceAll(".", "").replace(",", "."));
}

export function maskNumberToCurrency(rawValue: string | number) {
  const value =
    typeof rawValue === "string"
      ? parseMaskedCurrencyValueToNumber(rawValue)
      : rawValue;

  const maskedValue = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 2,
  }).format(isNaN(value) ? 0 : value);

  return maskedValue;
}
