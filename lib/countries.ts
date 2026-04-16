import type { Country, CountryCode } from "./types";

export const COUNTRIES: Record<CountryCode, Country> = {
  fr: {
    code: "fr",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr-FR",
  },
  be: {
    code: "be",
    name: "Belgique",
    flag: "🇧🇪",
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr-BE",
  },
  ch: {
    code: "ch",
    name: "Suisse",
    flag: "🇨🇭",
    currency: "CHF",
    currencySymbol: "CHF",
    locale: "fr-CH",
  },
  ca: {
    code: "ca",
    name: "Canada (Québec)",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "$",
    locale: "fr-CA",
  },
  lu: {
    code: "lu",
    name: "Luxembourg",
    flag: "🇱🇺",
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr-LU",
  },
};

export const COUNTRY_CODES: CountryCode[] = ["fr", "be", "ch", "ca", "lu"];

export function isCountryCode(value: string): value is CountryCode {
  return (COUNTRY_CODES as string[]).includes(value);
}

export function getCountry(code: CountryCode): Country {
  return COUNTRIES[code];
}
