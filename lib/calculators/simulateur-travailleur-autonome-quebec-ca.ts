import {
  CA_FED_ABATTEMENT_QC,
  CA_FED_BAREME,
  CA_FED_CREDIT_BASE,
  CA_FED_TAUX_CREDIT,
  CA_QC_BAREME,
  CA_QC_CREDIT_BASE,
  CA_QC_FSS_PLAFOND,
  CA_QC_FSS_SEUIL,
  CA_QC_FSS_TAUX,
  CA_QC_RQAP_MAX_ASSURABLE,
  CA_QC_RQAP_TAUX_AUTONOME,
  CA_QC_RRQ_EXEMPTION_BASE,
  CA_QC_RRQ_MGA,
  CA_QC_RRQ_MGA_SUPPLEMENTAIRE,
  CA_QC_RRQ_TAUX_BASE_AUTONOME,
  CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_AUTONOME,
  CA_QC_TAUX_CREDIT,
  CA_QC_TVQ_TAUX,
  CA_TPS_TAUX,
  CA_TVQ_SEUIL_INSCRIPTION,
} from "../tax-rates/ca";
import type { TaxBracket } from "../types";

export interface TravailleurAutonomeQCInput {
  chiffreAffaires: number; // CA annuel
  fraisReels: number; // bureau domicile, véhicule, fournitures
  fraisRepasClients: number; // repas clients (50 % déductibles)
  inscritTPSTVQ: boolean;
}

export interface TravailleurAutonomeQCResult {
  chiffreAffaires: number;
  beneficeAvantImpot: number;
  doitInscription: boolean; // CA > 30 000 $
  tpsAPercevoir: number;
  tvqAPercevoir: number;
  // Cotisations
  rrqBase: number;
  rrqSupplementaire: number;
  rrqTotal: number;
  rqap: number;
  fss: number;
  totalCotisations: number;
  // Impôt
  revenuImposable: number;
  impotFederalNet: number;
  impotQuebec: number;
  impotTotal: number;
  // Net
  revenuNet: number;
  revenuNetMensuel: number;
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

export function computeTravailleurAutonomeQC(
  input: TravailleurAutonomeQCInput,
): TravailleurAutonomeQCResult {
  const ca = Math.max(0, input.chiffreAffaires);
  const frais = Math.max(0, input.fraisReels);
  const repas = Math.max(0, input.fraisRepasClients);
  const repasDeductible = repas * 0.5;

  const beneficeAvantImpot = Math.max(0, ca - frais - repasDeductible);

  const doitInscription = ca > CA_TVQ_SEUIL_INSCRIPTION;
  const tpsAPercevoir =
    doitInscription && input.inscritTPSTVQ ? ca * CA_TPS_TAUX : 0;
  const tvqAPercevoir =
    doitInscription && input.inscritTPSTVQ ? ca * CA_QC_TVQ_TAUX : 0;

  // RRQ (2 parts = 12,8 % base + 8 % supp)
  const rrqBaseBase = Math.max(
    0,
    Math.min(beneficeAvantImpot, CA_QC_RRQ_MGA) - CA_QC_RRQ_EXEMPTION_BASE,
  );
  const rrqBase = rrqBaseBase * CA_QC_RRQ_TAUX_BASE_AUTONOME;
  const rrqSuppBase = Math.max(
    0,
    Math.min(beneficeAvantImpot, CA_QC_RRQ_MGA_SUPPLEMENTAIRE) -
      CA_QC_RRQ_MGA,
  );
  const rrqSupplementaire =
    rrqSuppBase * CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_AUTONOME;
  const rrqTotal = rrqBase + rrqSupplementaire;

  // RQAP autonome (2 parts = 0,878 %)
  const rqapBase = Math.min(beneficeAvantImpot, CA_QC_RQAP_MAX_ASSURABLE);
  const rqap = rqapBase * CA_QC_RQAP_TAUX_AUTONOME;

  // FSS
  const fssBase = Math.max(0, beneficeAvantImpot - CA_QC_FSS_SEUIL);
  const fss = Math.min(fssBase * CA_QC_FSS_TAUX, CA_QC_FSS_PLAFOND);

  const totalCotisations = rrqTotal + rqap + fss;

  // Revenu imposable : on déduit la moitié du RRQ (part employeur) et RQAP
  // Approximation simplifiée : on prend bénéfice avant impôt
  const revenuImposable = Math.max(0, beneficeAvantImpot - rrqTotal / 2 - rqap);

  // Impôt
  const creditsFed = CA_FED_CREDIT_BASE * CA_FED_TAUX_CREDIT;
  const creditsQC = CA_QC_CREDIT_BASE * CA_QC_TAUX_CREDIT;
  const fedBrut = applyBrackets(revenuImposable, CA_FED_BAREME);
  const fedApresCredits = Math.max(0, fedBrut - creditsFed);
  const impotFederalNet = fedApresCredits * (1 - CA_FED_ABATTEMENT_QC);
  const qcBrut = applyBrackets(revenuImposable, CA_QC_BAREME);
  const impotQuebec = Math.max(0, qcBrut - creditsQC);

  const impotTotal = impotFederalNet + impotQuebec;
  const revenuNet = Math.max(
    0,
    beneficeAvantImpot - totalCotisations - impotTotal,
  );
  const revenuNetMensuel = revenuNet / 12;
  const tauxGlobal = ca > 0 ? (ca - revenuNet) / ca : 0;

  return {
    chiffreAffaires: ca,
    beneficeAvantImpot,
    doitInscription,
    tpsAPercevoir,
    tvqAPercevoir,
    rrqBase,
    rrqSupplementaire,
    rrqTotal,
    rqap,
    fss,
    totalCotisations,
    revenuImposable,
    impotFederalNet,
    impotQuebec,
    impotTotal,
    revenuNet,
    revenuNetMensuel,
    tauxGlobal,
  };
}
