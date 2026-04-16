import type { CountryCode } from "@/lib/types";
import { AutoEntrepreneurCalculator } from "./AutoEntrepreneur";
import { DividendesRemunerationBECalculator } from "./DividendesRemunerationBE";
import { DividendesSalaireCalculator } from "./DividendesSalaire";
import { DividendesSalaireCHCalculator } from "./DividendesSalaireCH";
import { DroitsSuccessionCalculator } from "./DroitsSuccession";
import { DroitsSuccessionBECalculator } from "./DroitsSuccessionBE";
import { DroitsSuccessionCHCalculator } from "./DroitsSuccessionCH";
import { EpargneCalculator } from "./Epargne";
import { EpargneBECalculator } from "./EpargneBE";
import { EpargneCHCalculator } from "./EpargneCH";
import { FraisKilometriquesCalculator } from "./FraisKilometriques";
import { FraisKilometriquesBECalculator } from "./FraisKilometriquesBE";
import { FraisNotaireBECalculator } from "./FraisNotaireBE";
import { FraisNotaireCHCalculator } from "./FraisNotaireCH";
import { ImpotPersonnesPhysiquesBECalculator } from "./ImpotPersonnesPhysiquesBE";
import { ImpotRevenuCalculator } from "./ImpotRevenu";
import { ImpotRevenuCHCalculator } from "./ImpotRevenuCH";
import { IndependantBECalculator } from "./IndependantBE";
import { IndependantCHCalculator } from "./IndependantCH";
import { PensionBECalculator } from "./PensionBE";
import { PlusValueImmobiliereCalculator } from "./PlusValueImmobiliere";
import { PlusValueImmoCHCalculator } from "./PlusValueImmobiliereCH";
import { PretHypothecaireBECalculator } from "./PretHypothecaireBE";
import { PretHypothecaireCHCalculator } from "./PretHypothecaireCH";
import { PretImmobilierCalculator } from "./PretImmobilier";
import { RetraiteCalculator } from "./Retraite";
import { RetraiteCHCalculator } from "./RetraiteCH";
import { SalaireBrutNetCalculator } from "./SalaireBrutNet";
import { SalaireBrutNetBECalculator } from "./SalaireBrutNetBE";
import { SalaireBrutNetCHCalculator } from "./SalaireBrutNetCH";

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
  ch: {
    "calcul-salaire-brut-net-suisse": () => <SalaireBrutNetCHCalculator />,
    "simulateur-impot-revenu-suisse": () => <ImpotRevenuCHCalculator />,
    "simulateur-pret-hypothecaire-suisse": () => (
      <PretHypothecaireCHCalculator />
    ),
    "calculateur-retraite-suisse": () => <RetraiteCHCalculator />,
    "simulateur-epargne-suisse": () => <EpargneCHCalculator />,
    "calcul-plus-value-immobiliere-suisse": () => <PlusValueImmoCHCalculator />,
    "simulateur-independant-suisse": () => <IndependantCHCalculator />,
    "calcul-droits-succession-suisse": () => <DroitsSuccessionCHCalculator />,
    "calcul-frais-notaire-suisse": () => <FraisNotaireCHCalculator />,
    "simulateur-dividendes-salaire-suisse": () => (
      <DividendesSalaireCHCalculator />
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
