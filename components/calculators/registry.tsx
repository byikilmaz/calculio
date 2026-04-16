import type { CountryCode } from "@/lib/types";
import { SalaireBrutNetCalculator } from "./SalaireBrutNet";

const REGISTRY: Partial<
  Record<CountryCode, Record<string, () => React.ReactElement>>
> = {
  fr: {
    "simulateur-salaire-brut-net": () => <SalaireBrutNetCalculator />,
  },
};

export function getCalculator(
  country: CountryCode,
  slug: string,
): (() => React.ReactElement) | undefined {
  return REGISTRY[country]?.[slug];
}

export function hasCalculator(country: CountryCode, slug: string): boolean {
  return Boolean(REGISTRY[country]?.[slug]);
}
