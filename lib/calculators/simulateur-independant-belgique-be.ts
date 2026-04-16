import {
  BE_ADDITIONNELS_COMMUNAUX_MOYENNE,
  BE_INASTI_COTISATION_MIN_TRIMESTRIELLE,
  BE_INASTI_FRAIS_GESTION,
  BE_INASTI_PLAFOND,
  BE_INASTI_SEUIL_HAUT,
  BE_INASTI_TAUX_BAS,
  BE_INASTI_TAUX_HAUT,
  BE_INCOME_TAX_BRACKETS,
  BE_QUOTITE_EXEMPTEE,
  BE_QUOTITE_MAJORATION_ENFANT_SUPPL,
  BE_QUOTITE_MAJORATION_ENFANTS,
  BE_QUOTITE_REDUCTION_RATE,
} from "../tax-rates/be";
import type { TaxBracket } from "../types";

export type BEStatutIndependant = "principal" | "debutant" | "complementaire";

export interface IndependantBEInput {
  revenuNetProfessionnel: number; // revenu net avant INASTI (CA − frais)
  statut: BEStatutIndependant;
  enfantsACharge: number;
  additionnelsCommunaux: number; // ex 0.075
  fraisProfessionnelsForfaitaires: boolean; // prendre le forfait fiscal 3 % sans justifier
}

export interface IndependantBEResult {
  revenuNetProfessionnel: number;
  statut: BEStatutIndependant;
  cotisationInasti: number; // montant des cotisations sociales INASTI
  fraisGestionCaisse: number; // frais de la caisse d'assurance sociale
  cotisationTotale: number; // INASTI + frais gestion
  cotisationMinimum: number; // plancher appliqué
  cotisationMensuelle: number;
  baseImposable: number;
  quotiteExemptee: number;
  impotBareme: number;
  reductionQuotite: number;
  impotFederal: number;
  additionnelsMontant: number;
  impotTotal: number;
  revenuNetApresImpot: number;
  revenuMensuelNet: number;
  tauxPrelevementGlobal: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

function quotiteMajoration(enfants: number): number {
  if (enfants <= 0) return 0;
  if (enfants <= 4) return BE_QUOTITE_MAJORATION_ENFANTS[enfants] ?? 0;
  return (
    BE_QUOTITE_MAJORATION_ENFANTS[4] +
    (enfants - 4) * BE_QUOTITE_MAJORATION_ENFANT_SUPPL
  );
}

/**
 * Calcule les cotisations INASTI selon les paliers 2026.
 * 20,5 % jusqu'au seuil haut, 14,16 % entre seuil et plafond.
 */
function computeInasti(revenu: number): number {
  if (revenu <= 0) return 0;
  const plafonneBas = Math.min(revenu, BE_INASTI_SEUIL_HAUT);
  const trancheBasse = plafonneBas * BE_INASTI_TAUX_BAS;
  if (revenu <= BE_INASTI_SEUIL_HAUT) return trancheBasse;

  const plafonneHaut = Math.min(revenu, BE_INASTI_PLAFOND) - BE_INASTI_SEUIL_HAUT;
  const trancheHaute = plafonneHaut * BE_INASTI_TAUX_HAUT;
  return trancheBasse + trancheHaute;
}

export function computeIndependantBE(
  input: IndependantBEInput,
): IndependantBEResult {
  const revenu = Math.max(0, input.revenuNetProfessionnel);

  // INASTI
  const cotisationInastiBrute = computeInasti(revenu);
  const fraisGestionCaisse = cotisationInastiBrute * BE_INASTI_FRAIS_GESTION;
  let cotisationTotale = cotisationInastiBrute + fraisGestionCaisse;

  // Cotisation minimale : primo-indépendants et complémentaires peuvent avoir un régime réduit
  // Indépendant à titre principal : plancher de 4 × cotisation trimestrielle minimale
  const cotisationMinimum =
    input.statut === "complementaire"
      ? 0 // activité complémentaire : pas de plancher forfaitaire
      : BE_INASTI_COTISATION_MIN_TRIMESTRIELLE * 4;
  const cotisationInasti = cotisationInastiBrute;
  cotisationTotale = Math.max(cotisationTotale, cotisationMinimum);

  // Base imposable = revenu − cotisations sociales − frais professionnels forfaitaires éventuels
  const fraisForfait = input.fraisProfessionnelsForfaitaires
    ? Math.min(revenu - cotisationTotale, 5520) * 0.03 // forfait 3 % plafonné (2026)
    : 0;
  const baseImposable = Math.max(0, revenu - cotisationTotale - fraisForfait);

  // Impôt selon barème IPP
  const impotBareme = applyBrackets(baseImposable, BE_INCOME_TAX_BRACKETS);

  // Quotité exemptée
  const majoration = quotiteMajoration(input.enfantsACharge);
  const quotiteExemptee = BE_QUOTITE_EXEMPTEE + majoration;
  const reductionQuotite = quotiteExemptee * BE_QUOTITE_REDUCTION_RATE;

  const impotFederal = Math.max(0, impotBareme - reductionQuotite);
  const additionnelsMontant = impotFederal * input.additionnelsCommunaux;
  const impotTotal = impotFederal + additionnelsMontant;

  const revenuNetApresImpot = baseImposable - impotTotal;
  const revenuMensuelNet = revenuNetApresImpot / 12;
  const tauxPrelevementGlobal =
    revenu > 0 ? (revenu - revenuNetApresImpot) / revenu : 0;

  return {
    revenuNetProfessionnel: revenu,
    statut: input.statut,
    cotisationInasti,
    fraisGestionCaisse,
    cotisationTotale,
    cotisationMinimum,
    cotisationMensuelle: cotisationTotale / 12,
    baseImposable,
    quotiteExemptee,
    impotBareme,
    reductionQuotite,
    impotFederal,
    additionnelsMontant,
    impotTotal,
    revenuNetApresImpot,
    revenuMensuelNet,
    tauxPrelevementGlobal,
  };
}

export const DEFAULT_ADDITIONNELS_IND = BE_ADDITIONNELS_COMMUNAUX_MOYENNE;
