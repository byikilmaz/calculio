import type { CountryCode } from "@/lib/types";
import { AutoEntrepreneurCalculator } from "./AutoEntrepreneur";
import { DividendesRemunerationBECalculator } from "./DividendesRemunerationBE";
import { DividendesSalaireCalculator } from "./DividendesSalaire";
import { DroitsSuccessionCalculator } from "./DroitsSuccession";
import { DroitsSuccessionBECalculator } from "./DroitsSuccessionBE";
import { EpargneCalculator } from "./Epargne";
import { EpargneBECalculator } from "./EpargneBE";
import { FraisKilometriquesCalculator } from "./FraisKilometriques";
import { FraisKilometriquesBECalculator } from "./FraisKilometriquesBE";
import { FraisNotaireBECalculator } from "./FraisNotaireBE";
import { ImpotPersonnesPhysiquesBECalculator } from "./ImpotPersonnesPhysiquesBE";
import { ImpotRevenuCalculator } from "./ImpotRevenu";
import { IndependantBECalculator } from "./IndependantBE";
import { PensionBECalculator } from "./PensionBE";
import { PlusValueImmobiliereCalculator } from "./PlusValueImmobiliere";
import { PretHypothecaireBECalculator } from "./PretHypothecaireBE";
import { PretImmobilierCalculator } from "./PretImmobilier";
import { RetraiteCalculator } from "./Retraite";
import { SalaireBrutNetCalculator } from "./SalaireBrutNet";
import { SalaireBrutNetBECalculator } from "./SalaireBrutNetBE";

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
  be: {
    "calcul-salaire-brut-net-belgique": () => <SalaireBrutNetBECalculator />,
    "calcul-impot-personnes-physiques": () => (
      <ImpotPersonnesPhysiquesBECalculator />
    ),
    "simulateur-pret-hypothecaire": () => <PretHypothecaireBECalculator />,
    "calcul-droits-succession-belgique": () => (
      <DroitsSuccessionBECalculator />
    ),
    "calcul-frais-notaire": () => <FraisNotaireBECalculator />,
    "simulateur-independant-belgique": () => <IndependantBECalculator />,
    "calculateur-pension-belgique": () => <PensionBECalculator />,
    "simulateur-epargne-belgique": () => <EpargneBECalculator />,
    "calcul-frais-kilometriques-belgique": () => (
      <FraisKilometriquesBECalculator />
    ),
    "simulateur-dividendes-remuneration": () => (
      <DividendesRemunerationBECalculator />
    ),
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
