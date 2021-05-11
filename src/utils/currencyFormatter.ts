export function currency(bal: Number | String, currency = 'EUR') {
  bal = Number(bal) / 100;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency
  }).format(Number(bal));
}
