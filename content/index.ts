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
import { content as beIndependant } from "./be/simulateur-independant-belgique/meta";
import { content as bePension } from "./be/calculateur-pension-belgique/meta";
import { content as beEpargne } from "./be/simulateur-epargne-belgique/meta";
import { content as beFraisKm } from "./be/calcul-frais-kilometriques-belgique/meta";
import { content as beDividendesRem } from "./be/simulateur-dividendes-remuneration/meta";
import { content as chSalaireBrutNet } from "./ch/calcul-salaire-brut-net-suisse/meta";
import { content as chImpotRevenu } from "./ch/simulateur-impot-revenu-suisse/meta";
import { content as chPretHypothecaire } from "./ch/simulateur-pret-hypothecaire-suisse/meta";
import { content as chRetraite } from "./ch/calculateur-retraite-suisse/meta";
import { content as chEpargne } from "./ch/simulateur-epargne-suisse/meta";
import { content as chPlusValue } from "./ch/calcul-plus-value-immobiliere-suisse/meta";
import { content as chIndependant } from "./ch/simulateur-independant-suisse/meta";
import { content as chSuccession } from "./ch/calcul-droits-succession-suisse/meta";
import { content as chFraisNotaire } from "./ch/calcul-frais-notaire-suisse/meta";
import { content as chDividendesSalaire } from "./ch/simulateur-dividendes-salaire-suisse/meta";
import { content as caSalaireBrutNet } from "./ca/calcul-salaire-brut-net-quebec/meta";
import { content as caImpotRevenu } from "./ca/simulateur-impot-revenu-quebec/meta";
import { content as caPretHypothecaire } from "./ca/simulateur-pret-hypothecaire-quebec/meta";
import { content as caRetraite } from "./ca/calculateur-retraite-quebec/meta";
import { content as caEpargne } from "./ca/simulateur-epargne-quebec/meta";
import { content as caPlusValue } from "./ca/calcul-plus-value-immobiliere-quebec/meta";
import { content as caTravailleurAutonome } from "./ca/simulateur-travailleur-autonome-quebec/meta";
import { content as caFraisKm } from "./ca/calcul-frais-kilometriques-quebec/meta";
import { content as caDroitsMutation } from "./ca/calcul-droits-mutation-quebec/meta";
import { content as caDividendesSalaire } from "./ca/simulateur-dividendes-salaire-quebec/meta";
import { content as luSalaireBrutNet } from "./lu/calcul-salaire-brut-net-luxembourg/meta";
import { content as luImpotRevenu } from "./lu/simulateur-impot-revenu-luxembourg/meta";
import { content as luPretImmobilier } from "./lu/simulateur-pret-immobilier-luxembourg/meta";
import { content as luPension } from "./lu/calculateur-pension-luxembourg/meta";
import { content as luEpargne } from "./lu/simulateur-epargne-luxembourg/meta";
import { content as luPlusValue } from "./lu/calcul-plus-value-immobiliere-luxembourg/meta";
import { content as luIndependant } from "./lu/simulateur-independant-luxembourg/meta";
import { content as luSuccession } from "./lu/calcul-droits-succession-luxembourg/meta";
import { content as luFraisNotaire } from "./lu/calcul-frais-notaire-luxembourg/meta";
import { content as luDividendesSalaire } from "./lu/simulateur-dividendes-salaire-luxembourg/meta";

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
    "simulateur-independant-belgique": beIndependant,
    "calculateur-pension-belgique": bePension,
    "simulateur-epargne-belgique": beEpargne,
    "calcul-frais-kilometriques-belgique": beFraisKm,
    "simulateur-dividendes-remuneration": beDividendesRem,
  },
  ch: {
    "calcul-salaire-brut-net-suisse": chSalaireBrutNet,
    "simulateur-impot-revenu-suisse": chImpotRevenu,
    "simulateur-pret-hypothecaire-suisse": chPretHypothecaire,
    "calculateur-retraite-suisse": chRetraite,
    "simulateur-epargne-suisse": chEpargne,
    "calcul-plus-value-immobiliere-suisse": chPlusValue,
    "simulateur-independant-suisse": chIndependant,
    "calcul-droits-succession-suisse": chSuccession,
    "calcul-frais-notaire-suisse": chFraisNotaire,
    "simulateur-dividendes-salaire-suisse": chDividendesSalaire,
  },
  ca: {
    "calcul-salaire-brut-net-quebec": caSalaireBrutNet,
    "simulateur-impot-revenu-quebec": caImpotRevenu,
    "simulateur-pret-hypothecaire-quebec": caPretHypothecaire,
    "calculateur-retraite-quebec": caRetraite,
    "simulateur-epargne-quebec": caEpargne,
    "calcul-plus-value-immobiliere-quebec": caPlusValue,
    "simulateur-travailleur-autonome-quebec": caTravailleurAutonome,
    "calcul-frais-kilometriques-quebec": caFraisKm,
    "calcul-droits-mutation-quebec": caDroitsMutation,
    "simulateur-dividendes-salaire-quebec": caDividendesSalaire,
  },
  lu: {
    "calcul-salaire-brut-net-luxembourg": luSalaireBrutNet,
    "simulateur-impot-revenu-luxembourg": luImpotRevenu,
    "simulateur-pret-immobilier-luxembourg": luPretImmobilier,
    "calculateur-pension-luxembourg": luPension,
    "simulateur-epargne-luxembourg": luEpargne,
    "calcul-plus-value-immobiliere-luxembourg": luPlusValue,
    "simulateur-independant-luxembourg": luIndependant,
    "calcul-droits-succession-luxembourg": luSuccession,
    "calcul-frais-notaire-luxembourg": luFraisNotaire,
    "simulateur-dividendes-salaire-luxembourg": luDividendesSalaire,
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
