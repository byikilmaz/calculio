import {
  CA_AE_MAX_ASSURABLE,
  CA_AE_TAUX_QC,
  CA_DIV_DETERMINE_CREDIT_FED,
  CA_DIV_DETERMINE_CREDIT_QC,
  CA_DIV_DETERMINE_MAJORATION,
  CA_DIV_ORDINAIRE_CREDIT_FED,
  CA_DIV_ORDINAIRE_CREDIT_QC,
  CA_DIV_ORDINAIRE_MAJORATION,
  CA_FED_ABATTEMENT_QC,
  CA_FED_BAREME,
  CA_FED_CREDIT_BASE,
  CA_FED_TAUX_CREDIT,
  CA_IS_SPCC_TOTAL,
  CA_QC_BAREME,
  CA_QC_CREDIT_BASE,
  CA_QC_FSS_PLAFOND,
  CA_QC_FSS_SEUIL,
  CA_QC_FSS_TAUX,
  CA_QC_RQAP_MAX_ASSURABLE,
  CA_QC_RQAP_TAUX_EMPLOYE,
  CA_QC_RRQ_EXEMPTION_BASE,
  CA_QC_RRQ_MGA,
  CA_QC_RRQ_MGA_SUPPLEMENTAIRE,
  CA_QC_RRQ_TAUX_BASE_EMPLOYE,
  CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_EMPLOYE,
  CA_QC_TAUX_CREDIT,
} from "../tax-rates/ca";
import type { TaxBracket } from "../types";

export type QCTypeDividende = "ordinaire" | "determine";

export interface DividendesSalaireQCInput {
  enveloppeSociete: number; // bénéfice avant rémunération dirigeant
  partSalaire: number; // 0..1
  typeDividende: QCTypeDividende;
}

export interface DividendesSalaireQCResult {
  enveloppe: number;
  partSalaire: number;
  // Volet salaire
  salaireBrut: number;
  rrqEmploye: number;
  aeEmploye: number;
  rqapEmploye: number;
  fssEmploye: number;
  totalCotisationsEmploye: number;
  // Charges sociales employeur (payées par la société)
  rrqEmployeur: number;
  fssEmployeur: number;
  totalCotisationsEmployeur: number;
  coutTotalSalaire: number;
  impotFederalSalaire: number;
  impotQuebecSalaire: number;
  netSalaire: number;
  // Volet dividende
  beneficeSoumisIS: number;
  impotSocietes: number;
  dividendeBrut: number;
  dividendeMajore: number; // base imposable
  creditDividendeFed: number;
  creditDividendeQC: number;
  impotFederalDividende: number;
  impotQuebecDividende: number;
  netDividende: number;
  // Synthèse
  netTotal: number;
  prelevementsTotaux: number;
  tauxEffectifGlobal: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

export function computeDividendesSalaireQC(
  input: DividendesSalaireQCInput,
): DividendesSalaireQCResult {
  const enveloppe = Math.max(0, input.enveloppeSociete);
  const part = Math.max(0, Math.min(1, input.partSalaire));
  const salaireBrut = enveloppe * part;

  // ── Volet SALAIRE ──
  // Cotisations employé
  const rrqBase = Math.max(
    0,
    Math.min(salaireBrut, CA_QC_RRQ_MGA) - CA_QC_RRQ_EXEMPTION_BASE,
  ) * CA_QC_RRQ_TAUX_BASE_EMPLOYE;
  const rrqSupp = Math.max(
    0,
    Math.min(salaireBrut, CA_QC_RRQ_MGA_SUPPLEMENTAIRE) - CA_QC_RRQ_MGA,
  ) * CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_EMPLOYE;
  const rrqEmploye = rrqBase + rrqSupp;
  const aeEmploye = Math.min(salaireBrut, CA_AE_MAX_ASSURABLE) * CA_AE_TAUX_QC;
  const rqapEmploye =
    Math.min(salaireBrut, CA_QC_RQAP_MAX_ASSURABLE) * CA_QC_RQAP_TAUX_EMPLOYE;
  const fssEmploye = Math.min(
    Math.max(0, salaireBrut - CA_QC_FSS_SEUIL) * CA_QC_FSS_TAUX,
    CA_QC_FSS_PLAFOND,
  );
  const totalCotisationsEmploye =
    rrqEmploye + aeEmploye + rqapEmploye + fssEmploye;

  // Cotisations employeur (simplifiées — RRQ + FSS, le reste est négligé)
  const rrqEmployeur = rrqEmploye; // la part employeur = part employé
  const fssEmployeur = salaireBrut * 0.01925; // ~1,925 % FSS employeur (simplification)
  const totalCotisationsEmployeur = rrqEmployeur + fssEmployeur;
  const coutTotalSalaire = salaireBrut + totalCotisationsEmployeur;

  // Impôt sur le salaire
  const revenuImpSalaire = Math.max(0, salaireBrut);
  const creditsFedSal = CA_FED_CREDIT_BASE * CA_FED_TAUX_CREDIT;
  const creditsQCSal = CA_QC_CREDIT_BASE * CA_QC_TAUX_CREDIT;
  const fedBrutSal = applyBrackets(revenuImpSalaire, CA_FED_BAREME);
  const fedApresCreditSal = Math.max(0, fedBrutSal - creditsFedSal);
  const impotFederalSalaire = fedApresCreditSal * (1 - CA_FED_ABATTEMENT_QC);
  const qcBrutSal = applyBrackets(revenuImpSalaire, CA_QC_BAREME);
  const impotQuebecSalaire = Math.max(0, qcBrutSal - creditsQCSal);
  const netSalaire = Math.max(
    0,
    salaireBrut -
      totalCotisationsEmploye -
      impotFederalSalaire -
      impotQuebecSalaire,
  );

  // ── Volet DIVIDENDE ──
  // Bénéfice soumis à IS = enveloppe - coût total salaire (déductible)
  const beneficeSoumisIS = Math.max(0, enveloppe - coutTotalSalaire);
  const impotSocietes = beneficeSoumisIS * CA_IS_SPCC_TOTAL;
  const dividendeBrut = Math.max(0, beneficeSoumisIS - impotSocietes);

  // Majoration et crédit selon type
  const majoration =
    input.typeDividende === "determine"
      ? CA_DIV_DETERMINE_MAJORATION
      : CA_DIV_ORDINAIRE_MAJORATION;
  const creditFedTaux =
    input.typeDividende === "determine"
      ? CA_DIV_DETERMINE_CREDIT_FED
      : CA_DIV_ORDINAIRE_CREDIT_FED;
  const creditQCTaux =
    input.typeDividende === "determine"
      ? CA_DIV_DETERMINE_CREDIT_QC
      : CA_DIV_ORDINAIRE_CREDIT_QC;

  const dividendeMajore = dividendeBrut * (1 + majoration);
  const creditDividendeFed = dividendeMajore * creditFedTaux;
  const creditDividendeQC = dividendeMajore * creditQCTaux;

  const fedBrutDiv = applyBrackets(dividendeMajore, CA_FED_BAREME);
  const fedApresCreditDiv = Math.max(0, fedBrutDiv - creditDividendeFed);
  const impotFederalDividende =
    fedApresCreditDiv * (1 - CA_FED_ABATTEMENT_QC);
  const qcBrutDiv = applyBrackets(dividendeMajore, CA_QC_BAREME);
  const impotQuebecDividende = Math.max(0, qcBrutDiv - creditDividendeQC);
  const netDividende = Math.max(
    0,
    dividendeBrut - impotFederalDividende - impotQuebecDividende,
  );

  const netTotal = netSalaire + netDividende;
  const prelevementsTotaux = enveloppe - netTotal;
  const tauxEffectifGlobal =
    enveloppe > 0 ? prelevementsTotaux / enveloppe : 0;

  return {
    enveloppe,
    partSalaire: part,
    salaireBrut,
    rrqEmploye,
    aeEmploye,
    rqapEmploye,
    fssEmploye,
    totalCotisationsEmploye,
    rrqEmployeur,
    fssEmployeur,
    totalCotisationsEmployeur,
    coutTotalSalaire,
    impotFederalSalaire,
    impotQuebecSalaire,
    netSalaire,
    beneficeSoumisIS,
    impotSocietes,
    dividendeBrut,
    dividendeMajore,
    creditDividendeFed,
    creditDividendeQC,
    impotFederalDividende,
    impotQuebecDividende,
    netDividende,
    netTotal,
    prelevementsTotaux,
    tauxEffectifGlobal,
  };
}
