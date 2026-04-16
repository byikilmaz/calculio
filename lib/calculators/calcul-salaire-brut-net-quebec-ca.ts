import {
  CA_AE_MAX_ASSURABLE,
  CA_AE_TAUX_QC,
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

export type QCSituation = "celibataire" | "marie";

export interface SalaireBrutNetQCInput {
  brutAnnuel: number;
  situation: QCSituation;
  enfants: number;
  conjointRevenu: number; // revenu du conjoint (pour crédit conjoint)
}

export interface SalaireBrutNetQCResult {
  brutAnnuel: number;
  brutMensuel: number;
  // Cotisations
  rrqBase: number;
  rrqSupplementaire: number;
  rrqTotal: number;
  ae: number;
  rqap: number;
  fss: number;
  totalCotisations: number;
  // Impôt fédéral
  creditsFederaux: number;
  impotFederalBrut: number;
  abattementQC: number;
  impotFederalNet: number;
  // Impôt Québec
  creditsQuebec: number;
  impotQuebec: number;
  // Synthèse
  impotTotal: number;
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

/**
 * Calcule le salaire net québécois à partir du brut annuel.
 * RRQ (base + supplémentaire), AE (taux réduit QC), RQAP, FSS,
 * impôt fédéral (avec abattement QC -16,5 %) + impôt Québec.
 */
export function computeSalaireBrutNetQC(
  input: SalaireBrutNetQCInput,
): SalaireBrutNetQCResult {
  const brutAnnuel = Math.max(0, input.brutAnnuel);
  const brutMensuel = brutAnnuel / 12;

  // 1. RRQ (Régime de rentes du Québec)
  // Base : 6,4 % sur tranche (exemption 3 500 $ — MGA 71 300 $)
  const rrqBaseBase = Math.max(
    0,
    Math.min(brutAnnuel, CA_QC_RRQ_MGA) - CA_QC_RRQ_EXEMPTION_BASE,
  );
  const rrqBase = rrqBaseBase * CA_QC_RRQ_TAUX_BASE_EMPLOYE;
  // Supplémentaire : 4 % sur tranche MGA → MGAP₂ (71 300 → 81 200 $)
  const rrqSuppBase = Math.max(
    0,
    Math.min(brutAnnuel, CA_QC_RRQ_MGA_SUPPLEMENTAIRE) - CA_QC_RRQ_MGA,
  );
  const rrqSupplementaire =
    rrqSuppBase * CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_EMPLOYE;
  const rrqTotal = rrqBase + rrqSupplementaire;

  // 2. AE (Assurance-emploi) — taux réduit au Québec
  const aeBase = Math.min(brutAnnuel, CA_AE_MAX_ASSURABLE);
  const ae = aeBase * CA_AE_TAUX_QC;

  // 3. RQAP (Régime québécois d'assurance parentale)
  const rqapBase = Math.min(brutAnnuel, CA_QC_RQAP_MAX_ASSURABLE);
  const rqap = rqapBase * CA_QC_RQAP_TAUX_EMPLOYE;

  // 4. FSS (contribution santé Québec) — particulier au-delà du seuil
  const fssBase = Math.max(0, brutAnnuel - CA_QC_FSS_SEUIL);
  const fss = Math.min(fssBase * CA_QC_FSS_TAUX, CA_QC_FSS_PLAFOND);

  const totalCotisations = rrqTotal + ae + rqap + fss;

  // 5. Revenu imposable (cotisations RRQ supp/AE/RQAP déductibles fédéralement)
  // Simplifié : on utilise le brut pour les deux ordres de gouvernement
  // (RRQ supp. et RQAP sont techniquement déductibles, légère approximation)
  const revenuImposable = Math.max(0, brutAnnuel);

  // 6. Crédits d'impôt non remboursables
  const conjointBesoin =
    input.situation === "marie" && input.conjointRevenu < CA_FED_CREDIT_CONJOINT;
  // Fédéral
  const creditBaseFed = CA_FED_CREDIT_BASE;
  const creditConjointFed = conjointBesoin
    ? Math.max(0, CA_FED_CREDIT_CONJOINT - input.conjointRevenu)
    : 0;
  const creditEnfantsFed = input.enfants * CA_FED_CREDIT_ENFANT;
  const totalMontantsFed = creditBaseFed + creditConjointFed + creditEnfantsFed;
  const creditsFederaux = totalMontantsFed * CA_FED_TAUX_CREDIT;

  // Québec
  const creditBaseQC = CA_QC_CREDIT_BASE;
  const creditConjointQC =
    input.situation === "marie" && input.conjointRevenu < CA_QC_CREDIT_CONJOINT
      ? Math.max(0, CA_QC_CREDIT_CONJOINT - input.conjointRevenu)
      : 0;
  const creditEnfantsQC = input.enfants * CA_QC_CREDIT_ENFANT;
  const totalMontantsQC = creditBaseQC + creditConjointQC + creditEnfantsQC;
  const creditsQuebec = totalMontantsQC * CA_QC_TAUX_CREDIT;

  // 7. Impôt fédéral brut (sur barème) puis abattement QC -16,5 %
  const impotFederalBrut = applyBrackets(revenuImposable, CA_FED_BAREME);
  const impotApresCreditFed = Math.max(0, impotFederalBrut - creditsFederaux);
  const abattementQC = impotApresCreditFed * CA_FED_ABATTEMENT_QC;
  const impotFederalNet = Math.max(0, impotApresCreditFed - abattementQC);

  // 8. Impôt Québec
  const impotQuebecBrut = applyBrackets(revenuImposable, CA_QC_BAREME);
  const impotQuebec = Math.max(0, impotQuebecBrut - creditsQuebec);

  const impotTotal = impotFederalNet + impotQuebec;

  const netAnnuel = Math.max(0, brutAnnuel - totalCotisations - impotTotal);
  const netMensuel = netAnnuel / 12;
  const tauxGlobal =
    brutAnnuel > 0 ? (brutAnnuel - netAnnuel) / brutAnnuel : 0;

  return {
    brutAnnuel,
    brutMensuel,
    rrqBase,
    rrqSupplementaire,
    rrqTotal,
    ae,
    rqap,
    fss,
    totalCotisations,
    creditsFederaux,
    impotFederalBrut,
    abattementQC,
    impotFederalNet,
    creditsQuebec,
    impotQuebec,
    impotTotal,
    netAnnuel,
    netMensuel,
    tauxGlobal,
  };
}
