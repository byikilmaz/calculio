import {
  CH_CANTON_BAREME,
  CH_CANTON_COEFFICIENT,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  CH_DEDUCTIONS_PERSONNELLES,
  CH_IFD_BAREME_CELIBATAIRE,
  CH_IFD_BAREME_MARIE,
  CH_IFD_DEDUCTION_ENFANT,
  CH_IFD_DEDUCTION_MARIE,
  type CHCanton,
} from "../tax-rates/ch";
import type { TaxBracket } from "../types";

export type CHImpotSituation = "celibataire" | "marie";

export interface ImpotRevenuCHInput {
  revenuNet: number; // revenu net imposable (après AVS/LPP)
  canton: CHCanton;
  situation: CHImpotSituation;
  enfants: number;
  coefficientCommunal: number; // ex 0.75
}

export interface ImpotRevenuCHResult {
  revenuNet: number;
  deductionsPersonnelles: number;
  revenuImposable: number;
  ifd: number;
  impotCantonalBase: number;
  impotCantonal: number;
  impotCommunal: number;
  impotTotal: number;
  tauxMoyen: number;
  tauxMarginal: number;
  tranchesIFD: { min: number; max: number; rate: number; base: number; impot: number }[];
}

function applyBrackets(
  revenu: number,
  brackets: TaxBracket[],
): {
  impot: number;
  tauxMarginal: number;
  tranches: { min: number; max: number; rate: number; base: number; impot: number }[];
} {
  let impot = 0;
  let tauxMarginal = 0;
  const tranches: {
    min: number;
    max: number;
    rate: number;
    base: number;
    impot: number;
  }[] = [];
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
  return { impot, tauxMarginal, tranches };
}

export function computeImpotRevenuCH(
  input: ImpotRevenuCHInput,
): ImpotRevenuCHResult {
  const revenu = Math.max(0, input.revenuNet);

  const deductionsCanton = CH_DEDUCTIONS_PERSONNELLES[input.canton];
  const deductionConjoint =
    input.situation === "marie" ? deductionsCanton.marie : 0;
  const deductionEnfants = input.enfants * deductionsCanton.parEnfant;
  const deductionForfait = Math.min(4000, revenu * 0.03);

  const deductionsPersonnelles =
    deductionConjoint + deductionEnfants + deductionForfait;
  const revenuImposable = Math.max(0, revenu - deductionsPersonnelles);

  // IFD
  const bareme =
    input.situation === "marie"
      ? CH_IFD_BAREME_MARIE
      : CH_IFD_BAREME_CELIBATAIRE;
  const deductionIFDMarie =
    input.situation === "marie" ? CH_IFD_DEDUCTION_MARIE : 0;
  const revenuIFD = Math.max(
    0,
    revenuImposable -
      deductionIFDMarie -
      input.enfants * CH_IFD_DEDUCTION_ENFANT,
  );
  const ifdResult = applyBrackets(revenuIFD, bareme);

  const cantonalResult = applyBrackets(
    revenuImposable,
    CH_CANTON_BAREME[input.canton],
  );
  const impotCantonal =
    cantonalResult.impot * CH_CANTON_COEFFICIENT[input.canton];
  const coeffCommune = Number.isFinite(input.coefficientCommunal)
    ? input.coefficientCommunal
    : CH_COMMUNE_COEFFICIENT_MOYEN[input.canton];
  const impotCommunal = cantonalResult.impot * coeffCommune;

  const impotTotal = ifdResult.impot + impotCantonal + impotCommunal;
  const tauxMoyen = revenu > 0 ? impotTotal / revenu : 0;

  return {
    revenuNet: revenu,
    deductionsPersonnelles,
    revenuImposable,
    ifd: ifdResult.impot,
    impotCantonalBase: cantonalResult.impot,
    impotCantonal,
    impotCommunal,
    impotTotal,
    tauxMoyen,
    tauxMarginal: ifdResult.tauxMarginal,
    tranchesIFD: ifdResult.tranches,
  };
}
