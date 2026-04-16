import {
  BE_BRANCHE_21_TAXE_PRIME,
  BE_LIVRET_EXONERATION_INTERETS,
  BE_LIVRET_PRECOMPTE_AU_DELA,
  BE_PRECOMPTE_MOBILIER_STANDARD,
} from "../tax-rates/be";

export type BESupportEpargne =
  | "livretReglemente"
  | "compteEpargneNonReglemente"
  | "branche21";

export interface EpargneBEInput {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number; // %
  dureeAnnees: number;
  support: BESupportEpargne;
}

export interface EpargneBEYear {
  annee: number;
  versementsCumules: number;
  interetsBrutsCumules: number;
  precompteCumule: number;
  taxeAssuranceCumulee: number;
  capitalNetCumule: number;
}

export interface EpargneBEResult {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number;
  dureeAnnees: number;
  support: BESupportEpargne;
  totalVerse: number;
  interetsBruts: number;
  taxeAssurancePrime: number;
  precompteMobilier: number;
  exonerationAppliquee: number;
  capitalFinalBrut: number;
  capitalFinalNet: number;
  rendementNetAnnualise: number;
  breakdown: EpargneBEYear[];
}

function annualize(finalValue: number, invested: number, years: number) {
  if (invested <= 0 || years <= 0) return 0;
  return Math.pow(finalValue / invested, 1 / years) - 1;
}

export function computeEpargneBE(input: EpargneBEInput): EpargneBEResult | null {
  const capitalInitial = Math.max(0, input.capitalInitial);
  const versementMensuel = Math.max(0, input.versementMensuel);
  const duree = Math.max(0, input.dureeAnnees);
  const taux = Number.isFinite(input.tauxAnnuel) ? input.tauxAnnuel : 0;

  if (duree <= 0) return null;

  const mois = Math.round(duree * 12);
  const iMensuel = taux / 100 / 12;
  const taxePrime =
    input.support === "branche21"
      ? capitalInitial * BE_BRANCHE_21_TAXE_PRIME +
        versementMensuel * 12 * duree * BE_BRANCHE_21_TAXE_PRIME
      : 0;

  // Itération mensuelle — capital net de taxes à l'entrée
  let capital = capitalInitial;
  let versesCumules = capitalInitial;
  let interetsBrutsCumules = 0;

  // Branche 21 : taxe de 2 % prélevée à l'entrée à chaque prime
  if (input.support === "branche21") {
    capital = capitalInitial * (1 - BE_BRANCHE_21_TAXE_PRIME);
  }

  const breakdown: EpargneBEYear[] = [];
  let interetsAnneeBrut = 0;

  for (let m = 1; m <= mois; m++) {
    // Intérêts du mois = capital × taux mensuel
    const interetsMois = capital * iMensuel;
    interetsBrutsCumules += interetsMois;
    interetsAnneeBrut += interetsMois;
    capital += interetsMois;

    // Versement mensuel (taxé en entrée pour Branche 21)
    const versementNet =
      input.support === "branche21"
        ? versementMensuel * (1 - BE_BRANCHE_21_TAXE_PRIME)
        : versementMensuel;
    capital += versementNet;
    versesCumules += versementMensuel;

    if (m % 12 === 0) {
      const annee = m / 12;
      // Précompte mobilier appliqué en fin d'année sur les intérêts de l'année (calcul indicatif)
      let precompteAnnee = 0;
      let exonerationAnnee = 0;
      if (input.support === "compteEpargneNonReglemente") {
        precompteAnnee = interetsAnneeBrut * BE_PRECOMPTE_MOBILIER_STANDARD;
      } else if (input.support === "livretReglemente") {
        const exoMax = BE_LIVRET_EXONERATION_INTERETS;
        exonerationAnnee = Math.min(interetsAnneeBrut, exoMax);
        const interetsTaxables = Math.max(0, interetsAnneeBrut - exoMax);
        precompteAnnee = interetsTaxables * BE_LIVRET_PRECOMPTE_AU_DELA;
      }
      // Pour Branche 21 : pas de précompte si contrat tenu ≥ 8 ans + 4 ans (fiscalité réglementaire)
      capital -= precompteAnnee;
      breakdown.push({
        annee,
        versementsCumules: versesCumules,
        interetsBrutsCumules,
        precompteCumule:
          (breakdown[breakdown.length - 1]?.precompteCumule ?? 0) +
          precompteAnnee,
        taxeAssuranceCumulee: input.support === "branche21" ? taxePrime : 0,
        capitalNetCumule: capital,
      });
      interetsAnneeBrut = 0;
    }
  }

  // Cas durée fractionnaire
  if (mois % 12 !== 0) {
    breakdown.push({
      annee: mois / 12,
      versementsCumules: versesCumules,
      interetsBrutsCumules,
      precompteCumule: breakdown[breakdown.length - 1]?.precompteCumule ?? 0,
      taxeAssuranceCumulee: input.support === "branche21" ? taxePrime : 0,
      capitalNetCumule: capital,
    });
  }

  // Totaux
  const capitalFinalNet = capital;
  // Brut : capital hypothétique sans précompte ni taxe d'assurance
  const precompteMobilier =
    breakdown.length > 0 ? breakdown[breakdown.length - 1].precompteCumule : 0;
  const capitalFinalBrut = capitalFinalNet + precompteMobilier + taxePrime;

  // Exonération cumulée (approx : min entre plafond annuel × années et intérêts totaux)
  let exonerationAppliquee = 0;
  if (input.support === "livretReglemente") {
    exonerationAppliquee = Math.min(
      BE_LIVRET_EXONERATION_INTERETS * duree,
      interetsBrutsCumules,
    );
  }

  const rendementNetAnnualise = annualize(capitalFinalNet, versesCumules, duree);

  return {
    capitalInitial,
    versementMensuel,
    tauxAnnuel: taux,
    dureeAnnees: duree,
    support: input.support,
    totalVerse: versesCumules,
    interetsBruts: interetsBrutsCumules,
    taxeAssurancePrime: taxePrime,
    precompteMobilier,
    exonerationAppliquee,
    capitalFinalBrut,
    capitalFinalNet,
    rendementNetAnnualise,
    breakdown,
  };
}
