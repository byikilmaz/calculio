import {
  CA_FED_ABATTEMENT_QC,
  CA_FED_BAREME,
  CA_FED_CREDIT_BASE,
  CA_FED_CREDIT_CONJOINT,
  CA_FED_CREDIT_ENFANT,
  CA_FED_TAUX_CREDIT,
  CA_QC_BAREME,
  CA_QC_CREDIT_BASE,
  CA_QC_CREDIT_CONJOINT,
  CA_QC_CREDIT_ENFANT,
  CA_QC_TAUX_CREDIT,
} from "../tax-rates/ca";
import type { TaxBracket } from "../types";

export type QCImpotSituation = "celibataire" | "marie";

export interface ImpotRevenuQCInput {
  revenuBrut: number;
  situation: QCImpotSituation;
  enfants: number;
  conjointRevenu: number;
}

export interface ImpotRevenuQCResult {
  revenuBrut: number;
  creditsFederaux: number;
  creditsQuebec: number;
  // Fédéral
  impotFederalBrut: number;
  abattementQC: number;
  impotFederalNet: number;
  // Québec
  impotQuebec: number;
  // Synthèse
  impotTotal: number;
  tauxMoyen: number;
  tauxMarginalFederal: number;
  tauxMarginalQC: number;
  tauxMarginalCombine: number;
  tranchesFederal: TrancheDetail[];
  tranchesQuebec: TrancheDetail[];
}

interface TrancheDetail {
  min: number;
  max: number;
  rate: number;
  base: number;
  impot: number;
}

function applyBrackets(
  revenu: number,
  brackets: TaxBracket[],
): { impot: number; tauxMarginal: number; tranches: TrancheDetail[] } {
  let impot = 0;
  let tauxMarginal = 0;
  const tranches: TrancheDetail[] = [];
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

export function computeImpotRevenuQC(
  input: ImpotRevenuQCInput,
): ImpotRevenuQCResult {
  const revenu = Math.max(0, input.revenuBrut);

  // Crédits fédéraux
  const conjointBesoinFed =
    input.situation === "marie" && input.conjointRevenu < CA_FED_CREDIT_CONJOINT;
  const montantConjointFed = conjointBesoinFed
    ? Math.max(0, CA_FED_CREDIT_CONJOINT - input.conjointRevenu)
    : 0;
  const montantsFed =
    CA_FED_CREDIT_BASE +
    montantConjointFed +
    input.enfants * CA_FED_CREDIT_ENFANT;
  const creditsFederaux = montantsFed * CA_FED_TAUX_CREDIT;

  // Crédits Québec
  const montantConjointQC =
    input.situation === "marie" && input.conjointRevenu < CA_QC_CREDIT_CONJOINT
      ? Math.max(0, CA_QC_CREDIT_CONJOINT - input.conjointRevenu)
      : 0;
  const montantsQC =
    CA_QC_CREDIT_BASE +
    montantConjointQC +
    input.enfants * CA_QC_CREDIT_ENFANT;
  const creditsQuebec = montantsQC * CA_QC_TAUX_CREDIT;

  // Fédéral
  const fedBrut = applyBrackets(revenu, CA_FED_BAREME);
  const fedApresCredits = Math.max(0, fedBrut.impot - creditsFederaux);
  const abattementQC = fedApresCredits * CA_FED_ABATTEMENT_QC;
  const impotFederalNet = Math.max(0, fedApresCredits - abattementQC);

  // Québec
  const qcBrut = applyBrackets(revenu, CA_QC_BAREME);
  const impotQuebec = Math.max(0, qcBrut.impot - creditsQuebec);

  const impotTotal = impotFederalNet + impotQuebec;
  const tauxMoyen = revenu > 0 ? impotTotal / revenu : 0;
  // Taux marginal combiné : fédéral effectif (×0,835) + QC
  const tauxMarginalCombine =
    fedBrut.tauxMarginal * (1 - CA_FED_ABATTEMENT_QC) + qcBrut.tauxMarginal;

  return {
    revenuBrut: revenu,
    creditsFederaux,
    creditsQuebec,
    impotFederalBrut: fedBrut.impot,
    abattementQC,
    impotFederalNet,
    impotQuebec,
    impotTotal,
    tauxMoyen,
    tauxMarginalFederal: fedBrut.tauxMarginal,
    tauxMarginalQC: qcBrut.tauxMarginal,
    tauxMarginalCombine,
    tranchesFederal: fedBrut.tranches,
    tranchesQuebec: qcBrut.tranches,
  };
}
