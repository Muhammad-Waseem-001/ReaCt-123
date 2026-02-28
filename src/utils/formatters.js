const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return "$0.00";
  }

  return currency.format(amount);
}
