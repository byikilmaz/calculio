export function formatEuro(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatEuroPrecise(value: number): string {
  return formatEuro(value, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function formatCHF(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatCHFPrecise(value: number): string {
  return formatCHF(value, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function formatPercent(value: number, digits = 1): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: digits,
  }).format(value);
}
