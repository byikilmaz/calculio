import type { ToolContent, CountryCode } from "@/lib/types";
import { content as frSalaireBrutNet } from "./fr/simulateur-salaire-brut-net/meta";
import { content as frImpotRevenu } from "./fr/simulateur-impot-revenu/meta";
import { content as frPretImmobilier } from "./fr/simulateur-pret-immobilier/meta";
import { content as frRetraite } from "./fr/calculateur-retraite/meta";
import { content as frPlusValue } from "./fr/calcul-plus-value-immobiliere/meta";
import { content as frAutoEntrepreneur } from "./fr/simulateur-auto-entrepreneur/meta";
import { content as frSuccession } from "./fr/calcul-droits-succession/meta";
import { content as frEpargne } from "./fr/simulateur-epargne/meta";
import { content as frFraisKm } from "./fr/calcul-frais-kilometriques/meta";
import { content as frDividendesSalaire } from "./fr/simulateur-dividendes-salaire/meta";
import { content as beSalaireBrutNet } from "./be/calcul-salaire-brut-net-belgique/meta";
import { content as beIPP } from "./be/calcul-impot-personnes-physiques/meta";
import { content as bePretHypothecaire } from "./be/simulateur-pret-hypothecaire/meta";
import { content as beSuccession } from "./be/calcul-droits-succession-belgique/meta";
import { content as beFraisNotaire } from "./be/calcul-frais-notaire/meta";

const REGISTRY: Partial<Record<CountryCode, Record<string, ToolContent>>> = {
  fr: {
    "simulateur-salaire-brut-net": frSalaireBrutNet,
    "simulateur-impot-revenu": frImpotRevenu,
    "simulateur-pret-immobilier": frPretImmobilier,
    "calculateur-retraite": frRetraite,
    "calcul-plus-value-immobiliere": frPlusValue,
    "simulateur-auto-entrepreneur": frAutoEntrepreneur,
    "calcul-droits-succession": frSuccession,
    "simulateur-epargne": frEpargne,
    "calcul-frais-kilometriques": frFraisKm,
    "simulateur-dividendes-salaire": frDividendesSalaire,
  },
  be: {
    "calcul-salaire-brut-net-belgique": beSalaireBrutNet,
    "calcul-impot-personnes-physiques": beIPP,
    "simulateur-pret-hypothecaire": bePretHypothecaire,
    "calcul-droits-succession-belgique": beSuccession,
    "calcul-frais-notaire": beFraisNotaire,
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
