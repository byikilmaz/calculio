import {
  BE_ADDITIONNELS_COMMUNAUX_MOYENNE,
  BE_INCOME_TAX_BRACKETS,
  BE_ONSS_SALARIE_RATE,
  BE_QUOTITE_EXEMPTEE,
  BE_QUOTITE_MAJORATION_ENFANT_SUPPL,
  BE_QUOTITE_MAJORATION_ENFANTS,
  BE_QUOTITE_REDUCTION_RATE,
  BE_WORKBONUS_SEUIL_PLEIN,
  BE_WORKBONUS_SEUIL_ZERO,
} from "../tax-rates/be";
import type { TaxBracket } from "../types";

export type BEStatut = "employe" | "ouvrier";
export type BESituationFamiliale = "isole" | "marieCohabitant";

export interface SalaireBrutNetBEInput {
  brutAnnuel: number;
  statut: BEStatut;
  situation: BESituationFamiliale;
  enfantsACharge: number;
  additionnelsCommunaux: number; // ex 0.075
}

export interface SalaireBrutNetBEResult {
  brutAnnuel: number;
  brutMensuel: number;
  onssSalarie: number;
  bonusEmploi: number;
  baseImposable: number;
  quotiteExemptee: number;
  impotBarème: number;
  reductionQuotite: number;
  precompteFederalAnnuel: number;
  additionnelsCommunauxMontant: number;
  precompteTotalAnnuel: number;
  precompteMensuel: number;
  netAnnuel: number;
  netMensuel: number;
  tauxGlobal: number;
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
  // Au-delà de 4 enfants : base de 4 + surcharge
  return (
    BE_QUOTITE_MAJORATION_ENFANTS[4] +
    (enfants - 4) * BE_QUOTITE_MAJORATION_ENFANT_SUPPL
  );
}

/**
 * Bonus à l'emploi (workbonus) — approximation simplifiée.
 * Sous le seuil plein : compense intégralement les 13,07 % d'ONSS.
 * Décroissance linéaire entre les deux seuils, puis 0.
 */
function computeBonusEmploi(brutMensuel: number): number {
  const onssMensuel = brutMensuel * BE_ONSS_SALARIE_RATE;
  if (brutMensuel <= BE_WORKBONUS_SEUIL_PLEIN) {
    return onssMensuel;
  }
  if (brutMensuel >= BE_WORKBONUS_SEUIL_ZERO) {
    return 0;
  }
  // Bonus plein à 2000 = 2000 * 0.1307 = 261.4
  const bonusPlein = BE_WORKBONUS_SEUIL_PLEIN * BE_ONSS_SALARIE_RATE;
  const pente =
    (brutMensuel - BE_WORKBONUS_SEUIL_PLEIN) /
    (BE_WORKBONUS_SEUIL_ZERO - BE_WORKBONUS_SEUIL_PLEIN);
  return Math.max(0, bonusPlein * (1 - pente));
}

export function computeSalaireBrutNetBE(
  input: SalaireBrutNetBEInput,
): SalaireBrutNetBEResult {
  const brutAnnuel = Math.max(0, input.brutAnnuel);
  const brutMensuel = brutAnnuel / 12;

  const onssSalarieBrute = brutAnnuel * BE_ONSS_SALARIE_RATE;
  const bonusEmploiMensuel = computeBonusEmploi(brutMensuel);
  const bonusEmploi = bonusEmploiMensuel * 12;
  const onssSalarie = Math.max(0, onssSalarieBrute - bonusEmploi);

  const baseImposable = Math.max(0, brutAnnuel - onssSalarie);

  // Impôt fédéral selon barème (IPP)
  const impotBarème = applyBrackets(baseImposable, BE_INCOME_TAX_BRACKETS);

  // Quotité exemptée : majorée selon enfants et situation familiale
  const majorationEnfants = quotiteMajoration(input.enfantsACharge);
  const quotiteExemptee = BE_QUOTITE_EXEMPTEE + majorationEnfants;
  const reductionQuotite = quotiteExemptee * BE_QUOTITE_REDUCTION_RATE;

  const precompteFederalAnnuel = Math.max(0, impotBarème - reductionQuotite);

  const additionnelsCommunauxMontant =
    precompteFederalAnnuel * input.additionnelsCommunaux;
  const precompteTotalAnnuel =
    precompteFederalAnnuel + additionnelsCommunauxMontant;
  const precompteMensuel = precompteTotalAnnuel / 12;

  const netAnnuel = baseImposable - precompteTotalAnnuel;
  const netMensuel = netAnnuel / 12;
  const tauxGlobal = brutAnnuel > 0 ? (brutAnnuel - netAnnuel) / brutAnnuel : 0;

  return {
    brutAnnuel,
    brutMensuel,
    onssSalarie,
    bonusEmploi,
    baseImposable,
    quotiteExemptee,
    impotBarème,
    reductionQuotite,
    precompteFederalAnnuel,
    additionnelsCommunauxMontant,
    precompteTotalAnnuel,
    precompteMensuel,
    netAnnuel,
    netMensuel,
    tauxGlobal,
  };
}
