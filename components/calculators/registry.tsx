import type { CountryCode } from "@/lib/types";
import { AutoEntrepreneurCalculator } from "./AutoEntrepreneur";
import { DividendesRemunerationBECalculator } from "./DividendesRemunerationBE";
import { DividendesSalaireCalculator } from "./DividendesSalaire";
import { DividendesSalaireCACalculator } from "./DividendesSalaireCA";
import { DividendesSalaireCHCalculator } from "./DividendesSalaireCH";
import { DroitsMutationCACalculator } from "./DroitsMutationCA";
import { DroitsSuccessionCalculator } from "./DroitsSuccession";
import { DroitsSuccessionBECalculator } from "./DroitsSuccessionBE";
import { DroitsSuccessionCHCalculator } from "./DroitsSuccessionCH";
import { EpargneCalculator } from "./Epargne";
import { EpargneBECalculator } from "./EpargneBE";
import { EpargneCACalculator } from "./EpargneCA";
import { EpargneCHCalculator } from "./EpargneCH";
import { FraisKilometriquesCalculator } from "./FraisKilometriques";
import { FraisKilometriquesBECalculator } from "./FraisKilometriquesBE";
import { FraisKilometriquesCACalculator } from "./FraisKilometriquesCA";
import { FraisNotaireBECalculator } from "./FraisNotaireBE";
import { FraisNotaireCHCalculator } from "./FraisNotaireCH";
import { ImpotPersonnesPhysiquesBECalculator } from "./ImpotPersonnesPhysiquesBE";
import { ImpotRevenuCalculator } from "./ImpotRevenu";
import { ImpotRevenuCACalculator } from "./ImpotRevenuCA";
import { ImpotRevenuCHCalculator } from "./ImpotRevenuCH";
import { IndependantBECalculator } from "./IndependantBE";
import { IndependantCHCalculator } from "./IndependantCH";
import { PensionBECalculator } from "./PensionBE";
import { PlusValueImmobiliereCalculator } from "./PlusValueImmobiliere";
import { PlusValueImmobiliereCACalculator } from "./PlusValueImmobiliereCA";
import { PlusValueImmoCHCalculator } from "./PlusValueImmobiliereCH";
import { PretHypothecaireBECalculator } from "./PretHypothecaireBE";
import { PretHypothecaireCACalculator } from "./PretHypothecaireCA";
import { PretHypothecaireCHCalculator } from "./PretHypothecaireCH";
import { PretImmobilierCalculator } from "./PretImmobilier";
import { RetraiteCalculator } from "./Retraite";
import { RetraiteCACalculator } from "./RetraiteCA";
import { RetraiteCHCalculator } from "./RetraiteCH";
import { SalaireBrutNetCalculator } from "./SalaireBrutNet";
import { SalaireBrutNetBECalculator } from "./SalaireBrutNetBE";
import { SalaireBrutNetCACalculator } from "./SalaireBrutNetCA";
import { SalaireBrutNetCHCalculator } from "./SalaireBrutNetCH";
import { TravailleurAutonomeCACalculator } from "./TravailleurAutonomeCA";

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
  ca: {
    "calcul-salaire-brut-net-quebec": () => <SalaireBrutNetCACalculator />,
    "simulateur-impot-revenu-quebec": () => <ImpotRevenuCACalculator />,
    "simulateur-pret-hypothecaire-quebec": () => (
      <PretHypothecaireCACalculator />
    ),
    "calculateur-retraite-quebec": () => <RetraiteCACalculator />,
    "simulateur-epargne-quebec": () => <EpargneCACalculator />,
    "calcul-plus-value-immobiliere-quebec": () => (
      <PlusValueImmobiliereCACalculator />
    ),
    "simulateur-travailleur-autonome-quebec": () => (
      <TravailleurAutonomeCACalculator />
    ),
    "calcul-frais-kilometriques-quebec": () => (
      <FraisKilometriquesCACalculator />
    ),
    "calcul-droits-mutation-quebec": () => <DroitsMutationCACalculator />,
    "simulateur-dividendes-salaire-quebec": () => (
      <DividendesSalaireCACalculator />
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
