import {
  BE_INCOME_TAX_BRACKETS,
  BE_QUOTITE_EXEMPTEE,
  BE_QUOTITE_MAJORATION_ENFANT_SUPPL,
  BE_QUOTITE_MAJORATION_ENFANTS,
  BE_QUOTITE_REDUCTION_RATE,
} from "../tax-rates/be";
import type { TaxBracket } from "../types";

export type BESituationIPP = "isole" | "marieCohabitant";

export interface IPPBEInput {
  revenuNetImposable: number;
  situation: BESituationIPP;
  enfantsACharge: number;
  additionnelsCommunaux: number; // ex 0.075 = 7,5 %
}

export interface IPPBranche {
  min: number;
  max: number;
  rate: number;
  base: number;
  impot: number;
}

export interface IPPBEResult {
  revenuNetImposable: number;
  situation: BESituationIPP;
  enfantsACharge: number;
  additionnelsCommunaux: number;
  quotiteExemptee: number;
  impotBareme: number;
  reductionQuotite: number;
  impotFederal: number;
  additionnelsMontant: number;
  impotTotal: number;
  tauxMarginal: number;
  tauxMoyen: number;
  tranches: IPPBranche[];
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): {
  impot: number;
  tranches: IPPBranche[];
  tauxMarginal: number;
} {
  let impot = 0;
  let tauxMarginal = 0;
  const tranches: IPPBranche[] = [];
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    const lineImpot = base * b.rate;
    tranches.push({
      min: b.min,
      max: b.max,
      rate: b.rate,
      base,
      impot: lineImpot,
    });
    impot += lineImpot;
    if (base > 0) tauxMarginal = b.rate;
  }
  return { impot, tranches, tauxMarginal };
}

function quotiteMajoration(enfants: number): number {
  if (enfants <= 0) return 0;
  if (enfants <= 4) return BE_QUOTITE_MAJORATION_ENFANTS[enfants] ?? 0;
  return (
    BE_QUOTITE_MAJORATION_ENFANTS[4] +
    (enfants - 4) * BE_QUOTITE_MAJORATION_ENFANT_SUPPL
  );
}

export function computeIPPBelgique(input: IPPBEInput): IPPBEResult {
  const revenu = Math.max(0, input.revenuNetImposable);

  const byBareme = applyBrackets(revenu, BE_INCOME_TAX_BRACKETS);

  const majoration = quotiteMajoration(input.enfantsACharge);
  const quotiteExemptee = BE_QUOTITE_EXEMPTEE + majoration;
  const reductionQuotite = quotiteExemptee * BE_QUOTITE_REDUCTION_RATE;

  const impotFederal = Math.max(0, byBareme.impot - reductionQuotite);
  const additionnelsMontant = impotFederal * input.additionnelsCommunaux;
  const impotTotal = impotFederal + additionnelsMontant;

  const tauxMoyen = revenu > 0 ? impotTotal / revenu : 0;

  return {
    revenuNetImposable: revenu,
    situation: input.situation,
    enfantsACharge: input.enfantsACharge,
    additionnelsCommunaux: input.additionnelsCommunaux,
    quotiteExemptee,
    impotBareme: byBareme.impot,
    reductionQuotite,
    impotFederal,
    additionnelsMontant,
    impotTotal,
    tauxMarginal: byBareme.tauxMarginal,
    tauxMoyen,
    tranches: byBareme.tranches,
  };
}
