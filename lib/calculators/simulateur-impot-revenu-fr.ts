import {
  FR_INCOME_TAX_BRACKETS,
  FR_QUOTIENT_FAMILIAL_CAP,
} from "../tax-rates/fr";
import type { TaxBracket } from "../types";

export interface ImpotRevenuInput {
  revenuNetImposable: number;
  parts: number;
}

export interface BracketLine {
  min: number;
  max: number;
  rate: number;
  baseImposable: number;
  impot: number;
}

export interface ImpotRevenuResult {
  revenuNetImposable: number;
  parts: number;
  quotient: number;
  impotBrut: number;
  impotSansParts: number;
  reductionQuotient: number;
  plafonnementApplique: boolean;
  impotFinal: number;
  tauxMarginal: number;
  tauxMoyen: number;
  tranches: BracketLine[];
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): {
  impot: number;
  tranches: BracketLine[];
  taux: number;
} {
  let impot = 0;
  let tauxMarginal = 0;
  const tranches: BracketLine[] = [];
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    const lineImpot = base * b.rate;
    tranches.push({
      min: b.min,
      max: b.max,
      rate: b.rate,
      baseImposable: base,
      impot: lineImpot,
    });
    impot += lineImpot;
    if (base > 0) tauxMarginal = b.rate;
  }
  return { impot, tranches, taux: tauxMarginal };
}

export function computeImpotRevenuFR(
  input: ImpotRevenuInput,
): ImpotRevenuResult {
  const revenu = Math.max(0, input.revenuNetImposable);
  const parts = Math.max(1, input.parts);
  const quotient = revenu / parts;

  const byQuotient = applyBrackets(quotient, FR_INCOME_TAX_BRACKETS);
  const impotBrut = byQuotient.impot * parts;
  const tranches = byQuotient.tranches.map((t) => ({
    ...t,
    baseImposable: t.baseImposable * parts,
    impot: t.impot * parts,
  }));

  // Comparer avec célibataire (1 part) pour appliquer le plafonnement
  const byOnePart = applyBrackets(revenu, FR_INCOME_TAX_BRACKETS);
  const impotSansParts = byOnePart.impot;
  const reductionBrute = Math.max(0, impotSansParts - impotBrut);

  const nbDemiParts = Math.max(0, (parts - 1) * 2);
  const plafondReduction = FR_QUOTIENT_FAMILIAL_CAP * nbDemiParts;
  const plafonnementApplique =
    nbDemiParts > 0 && reductionBrute > plafondReduction;

  const reductionQuotient = plafonnementApplique
    ? plafondReduction
    : reductionBrute;

  const impotFinal = plafonnementApplique
    ? impotSansParts - reductionQuotient
    : impotBrut;

  const tauxMoyen = revenu > 0 ? impotFinal / revenu : 0;

  return {
    revenuNetImposable: revenu,
    parts,
    quotient,
    impotBrut,
    impotSansParts,
    reductionQuotient,
    plafonnementApplique,
    impotFinal: Math.max(0, Math.round(impotFinal)),
    tauxMarginal: byQuotient.taux,
    tauxMoyen,
    tranches,
  };
}
