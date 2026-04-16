import {
  CA_FED_ABATTEMENT_QC,
  CA_FED_BAREME,
  CA_GAIN_CAPITAL_INCLUSION,
  CA_QC_BAREME,
} from "../tax-rates/ca";
import type { TaxBracket } from "../types";

export type QCTypeBien = "residencePrincipale" | "locatif" | "secondaire";

export interface PlusValueImmoQCInput {
  prixVente: number;
  fraisVente: number; // commission courtier, arpentage, notaire vendeur
  prixAchat: number;
  fraisAchat: number; // droits mutation, notaire acheteur
  ameliorations: number; // travaux capitalisés
  typeBien: QCTypeBien;
  revenuAnnuelBrut: number; // autres revenus
}

export interface PlusValueImmoQCResult {
  prixVente: number;
  prixNetVente: number;
  prixRevient: number;
  gainBrut: number;
  typeBien: QCTypeBien;
  exonere: boolean;
  gainImposable: number;
  // Impôt marginal appliqué au gain
  tauxMarginalFederal: number;
  tauxMarginalQC: number;
  tauxMarginalCombineEffectif: number;
  impotFederal: number;
  impotQuebec: number;
  impotTotal: number;
  netVendeur: number;
}

function tauxMarginal(revenu: number, brackets: TaxBracket[]): number {
  let taux = 0;
  for (const b of brackets) {
    if (revenu > b.min) taux = b.rate;
  }
  return taux;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

export function computePlusValueImmoQC(
  input: PlusValueImmoQCInput,
): PlusValueImmoQCResult {
  const prixVente = Math.max(0, input.prixVente);
  const prixNetVente = Math.max(0, prixVente - input.fraisVente);
  const prixRevient =
    Math.max(0, input.prixAchat) +
    Math.max(0, input.fraisAchat) +
    Math.max(0, input.ameliorations);
  const gainBrut = prixNetVente - prixRevient;

  const exonere = input.typeBien === "residencePrincipale";
  const gainImposable = exonere ? 0 : Math.max(0, gainBrut) * CA_GAIN_CAPITAL_INCLUSION;

  // Pour calculer l'impôt marginal effectif, on ajoute le gain au revenu
  const revenuAvant = Math.max(0, input.revenuAnnuelBrut);
  const revenuApres = revenuAvant + gainImposable;

  const tauxMargFed = tauxMarginal(revenuApres, CA_FED_BAREME);
  const tauxMargQC = tauxMarginal(revenuApres, CA_QC_BAREME);
  const tauxMargFedEffectif = tauxMargFed * (1 - CA_FED_ABATTEMENT_QC);
  const tauxMarginalCombineEffectif = tauxMargFedEffectif + tauxMargQC;

  // Différence d'impôt avec/sans gain
  const impotFedAvant =
    applyBrackets(revenuAvant, CA_FED_BAREME) * (1 - CA_FED_ABATTEMENT_QC);
  const impotFedApres =
    applyBrackets(revenuApres, CA_FED_BAREME) * (1 - CA_FED_ABATTEMENT_QC);
  const impotFederal = Math.max(0, impotFedApres - impotFedAvant);

  const impotQCAvant = applyBrackets(revenuAvant, CA_QC_BAREME);
  const impotQCApres = applyBrackets(revenuApres, CA_QC_BAREME);
  const impotQuebec = Math.max(0, impotQCApres - impotQCAvant);

  const impotTotal = impotFederal + impotQuebec;
  const netVendeur = prixNetVente - Math.max(0, input.prixAchat) - impotTotal;

  return {
    prixVente,
    prixNetVente,
    prixRevient,
    gainBrut,
    typeBien: input.typeBien,
    exonere,
    gainImposable,
    tauxMarginalFederal: tauxMargFed,
    tauxMarginalQC: tauxMargQC,
    tauxMarginalCombineEffectif,
    impotFederal,
    impotQuebec,
    impotTotal,
    netVendeur,
  };
}
