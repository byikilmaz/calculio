import type { ToolContent, CountryCode } from "@/lib/types";
import { content as frSalaireBrutNet } from "./fr/simulateur-salaire-brut-net/meta";

const REGISTRY: Partial<Record<CountryCode, Record<string, ToolContent>>> = {
  fr: {
    "simulateur-salaire-brut-net": frSalaireBrutNet,
  },
};

export function getToolContent(
  country: CountryCode,
  slug: string,
): ToolContent | undefined {
  return REGISTRY[country]?.[slug];
}

export function hasToolContent(country: CountryCode, slug: string): boolean {
  return Boolean(REGISTRY[country]?.[slug]);
}
