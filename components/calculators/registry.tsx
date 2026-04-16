import type { CountryCode } from "@/lib/types";
import { AutoEntrepreneurCalculator } from "./AutoEntrepreneur";
import { DividendesSalaireCalculator } from "./DividendesSalaire";
import { DroitsSuccessionCalculator } from "./DroitsSuccession";
import { EpargneCalculator } from "./Epargne";
import { FraisKilometriquesCalculator } from "./FraisKilometriques";
import { ImpotRevenuCalculator } from "./ImpotRevenu";
import { PlusValueImmobiliereCalculator } from "./PlusValueImmobiliere";
import { PretImmobilierCalculator } from "./PretImmobilier";
import { RetraiteCalculator } from "./Retraite";
import { SalaireBrutNetCalculator } from "./SalaireBrutNet";

const REGISTRY: Partial<
  Record<CountryCode, Record<string, () => React.ReactElement>>
> = {
  fr: {
    "simulateur-salaire-brut-net": () => <SalaireBrutNetCalculator />,
    "simulateur-impot-revenu": () => <ImpotRevenuCalculator />,
    "simulateur-pret-immobilier": () => <PretImmobilierCalculator />,
    "calculateur-retraite": () => <RetraiteCalculator />,
    "calcul-plus-value-immobiliere": () => <PlusValueImmobiliereCalculator />,
    "simulateur-auto-entrepreneur": () => <AutoEntrepreneurCalculator />,
    "calcul-droits-succession": () => <DroitsSuccessionCalculator />,
    "simulateur-epargne": () => <EpargneCalculator />,
    "calcul-frais-kilometriques": () => <FraisKilometriquesCalculator />,
    "simulateur-dividendes-salaire": () => <DividendesSalaireCalculator />,
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
