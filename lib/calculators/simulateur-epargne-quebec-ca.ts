import {
  CA_CELI_PLAFOND_ANNUEL,
  CA_REER_PLAFOND,
  CA_REER_TAUX_REVENU,
} from "../tax-rates/ca";

export type QCSupportEpargne = "reer" | "celi" | "comparaison";

export interface EpargneQCInput {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number; // %
  dureeAnnees: number;
  support: QCSupportEpargne;
  tmiActuelPct: number; // TMI au moment des versements
  tmiRetraitPct: number; // TMI prévu au retrait (pour REER)
  revenuAnnuel: number; // pour plafond REER
}

export interface EpargneQCYear {
  annee: number;
  versementsCumules: number;
  interetsCumules: number;
  capitalBrutCumule: number;
}

export interface EpargneQCScenario {
  label: string;
  capitalFinalBrut: number;
  capitalApresImpot: number;
  economieImpotCumulee: number;
  totalVerse: number;
  rendementNetApprox: number;
}

export interface EpargneQCResult {
  capitalInitial: number;
  dureeAnnees: number;
  tauxAnnuel: number;
  support: QCSupportEpargne;
  plafondREER: number;
  plafondCELI: number;
  versementMensuelEffectif: number;
  // Pour comparaison
  scenarioREER: EpargneQCScenario;
  scenarioCELI: EpargneQCScenario;
  recommandation: "reer" | "celi" | "equivalent";
  breakdown: EpargneQCYear[];
}

function simulerCapital(
  capInit: number,
  versementMensuel: number,
  tauxAnnuelPct: number,
  duree: number,
): { capital: number; versements: number; interets: number; breakdown: EpargneQCYear[] } {
  const mois = Math.round(duree * 12);
  const i = tauxAnnuelPct / 100 / 12;
  let capital = capInit;
  let verses = capInit;
  let interetsCumules = 0;
  const breakdown: EpargneQCYear[] = [];
  for (let m = 1; m <= mois; m++) {
    const interetsMois = capital * i;
    capital += interetsMois;
    interetsCumules += interetsMois;
    capital += versementMensuel;
    verses += versementMensuel;
    if (m % 12 === 0) {
      breakdown.push({
        annee: m / 12,
        versementsCumules: verses,
        interetsCumules,
        capitalBrutCumule: capital,
      });
    }
  }
  return { capital, versements: verses, interets: interetsCumules, breakdown };
}

export function computeEpargneQC(input: EpargneQCInput): EpargneQCResult | null {
  if (input.dureeAnnees <= 0) return null;
  const capInit = Math.max(0, input.capitalInitial);
  const vMensuel = Math.max(0, input.versementMensuel);
  const duree = Math.max(0, input.dureeAnnees);

  const plafondREER = Math.min(
    CA_REER_PLAFOND,
    input.revenuAnnuel * CA_REER_TAUX_REVENU,
  );
  const plafondCELI = CA_CELI_PLAFOND_ANNUEL;

  // Versement limité par support
  const vMensuelREER = Math.min(vMensuel, plafondREER / 12);
  const vMensuelCELI = Math.min(vMensuel, plafondCELI / 12);

  const tmiActuel = Math.max(0, input.tmiActuelPct) / 100;
  const tmiRetrait = Math.max(0, input.tmiRetraitPct) / 100;

  // Scénario REER : versement réinvesti (économie d'impôt récupérée et replacée)
  // Simplifié : on ajoute l'économie immédiate au calcul
  const simREER = simulerCapital(capInit, vMensuelREER, input.tauxAnnuel, duree);
  const economieImpotREERCumulee = vMensuelREER * 12 * duree * tmiActuel;
  const capitalBrutREER = simREER.capital;
  const capitalApresImpotREER = capitalBrutREER * (1 - tmiRetrait);

  // Scénario CELI : pas d'économie d'impôt, mais retrait 100 % exonéré
  const simCELI = simulerCapital(capInit, vMensuelCELI, input.tauxAnnuel, duree);
  const capitalBrutCELI = simCELI.capital;
  const capitalApresImpotCELI = capitalBrutCELI;

  const scenarioREER: EpargneQCScenario = {
    label: "REER",
    capitalFinalBrut: capitalBrutREER,
    capitalApresImpot: capitalApresImpotREER,
    economieImpotCumulee: economieImpotREERCumulee,
    totalVerse: simREER.versements,
    rendementNetApprox:
      simREER.versements > 0
        ? capitalApresImpotREER / simREER.versements - 1
        : 0,
  };
  const scenarioCELI: EpargneQCScenario = {
    label: "CELI",
    capitalFinalBrut: capitalBrutCELI,
    capitalApresImpot: capitalApresImpotCELI,
    economieImpotCumulee: 0,
    totalVerse: simCELI.versements,
    rendementNetApprox:
      simCELI.versements > 0
        ? capitalApresImpotCELI / simCELI.versements - 1
        : 0,
  };

  // Recommandation basée sur TMI relatif
  let recommandation: "reer" | "celi" | "equivalent" = "equivalent";
  if (tmiActuel > tmiRetrait + 0.01) recommandation = "reer";
  else if (tmiRetrait > tmiActuel + 0.01) recommandation = "celi";

  const versementMensuelEffectif =
    input.support === "reer"
      ? vMensuelREER
      : input.support === "celi"
        ? vMensuelCELI
        : vMensuel;
  const breakdown =
    input.support === "reer"
      ? simREER.breakdown
      : input.support === "celi"
        ? simCELI.breakdown
        : simCELI.breakdown;

  return {
    capitalInitial: capInit,
    dureeAnnees: duree,
    tauxAnnuel: input.tauxAnnuel,
    support: input.support,
    plafondREER,
    plafondCELI,
    versementMensuelEffectif,
    scenarioREER,
    scenarioCELI,
    recommandation,
    breakdown,
  };
}
