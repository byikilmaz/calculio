import {
  LU_BELLEGEN_AKT_MAX,
  LU_PRET_INTERETS_PLAFOND_0_5,
  LU_PRET_INTERETS_PLAFOND_6_10,
  LU_PRET_INTERETS_PLAFOND_11_PLUS,
} from "../tax-rates/lu";

export interface PretImmobilierLUInput {
  prixBien: number;
  apport: number;
  tauxAnnuel: number; // % ex 3.5
  dureeAnnees: number; // ex 25
  tauxMarginalIR: number; // ex 0.39 pour plafonner l'économie d'impôt
  nbMembresFoyer: number; // 1 ou 2
  residencePrincipale: boolean;
  anneesDeja: number; // années depuis acquisition (pour plafond intérêts)
}

export interface PretImmobilierLUResult {
  prixBien: number;
  montantEmprunte: number;
  mensualite: number;
  coutTotalCredit: number;
  interetsTotaux: number;
  // Economie fiscale sur intérêts d'emprunt
  plafondInteretsAnnuel: number;
  interetsAnnee1: number;
  interetsDeductibles: number;
  economieFiscaleAn1: number;
  // Bëllegen Akt
  creditBellegenAkt: number;
  // Diagnostic
  ratioLTV: number;
  amortissement: {
    mois: number;
    capital: number;
    interets: number;
    capitalRestant: number;
  }[];
}

export function computePretImmobilierLU(
  input: PretImmobilierLUInput,
): PretImmobilierLUResult | null {
  const prix = Math.max(0, input.prixBien);
  if (prix <= 0) return null;

  const apport = Math.max(0, input.apport);
  const montantEmprunte = Math.max(0, prix - apport);
  const nbMois = Math.max(1, Math.round(input.dureeAnnees * 12));
  const tauxMensuel = Math.max(0, input.tauxAnnuel) / 100 / 12;

  // Mensualité (annuités constantes)
  let mensualite = 0;
  if (tauxMensuel === 0) {
    mensualite = montantEmprunte / nbMois;
  } else {
    mensualite =
      (montantEmprunte * tauxMensuel) /
      (1 - Math.pow(1 + tauxMensuel, -nbMois));
  }

  const coutTotalCredit = mensualite * nbMois;
  const interetsTotaux = coutTotalCredit - montantEmprunte;

  // Tableau d'amortissement (12 premiers mois pour simplicité)
  const amortissement: PretImmobilierLUResult["amortissement"] = [];
  let capitalRestant = montantEmprunte;
  let interetsAnnee1 = 0;
  for (let m = 1; m <= Math.min(nbMois, 12); m++) {
    const interetsMois = capitalRestant * tauxMensuel;
    const capitalMois = mensualite - interetsMois;
    capitalRestant = Math.max(0, capitalRestant - capitalMois);
    interetsAnnee1 += interetsMois;
    amortissement.push({
      mois: m,
      capital: capitalMois,
      interets: interetsMois,
      capitalRestant,
    });
  }

  // Plafond intérêts déductibles (résidence principale)
  const nbMembres = Math.max(1, input.nbMembresFoyer);
  let plafondParPersonne: number;
  if (input.anneesDeja <= 5) {
    plafondParPersonne = LU_PRET_INTERETS_PLAFOND_0_5;
  } else if (input.anneesDeja <= 10) {
    plafondParPersonne = LU_PRET_INTERETS_PLAFOND_6_10;
  } else {
    plafondParPersonne = LU_PRET_INTERETS_PLAFOND_11_PLUS;
  }
  const plafondInteretsAnnuel = input.residencePrincipale
    ? plafondParPersonne * nbMembres
    : 0;
  const interetsDeductibles = Math.min(interetsAnnee1, plafondInteretsAnnuel);
  const economieFiscaleAn1 =
    interetsDeductibles * Math.max(0, Math.min(0.42, input.tauxMarginalIR));

  // Bëllegen Akt (40 000 € / personne, résidence principale)
  const creditBellegenAkt = input.residencePrincipale
    ? LU_BELLEGEN_AKT_MAX * nbMembres
    : 0;

  const ratioLTV = prix > 0 ? montantEmprunte / prix : 0;

  return {
    prixBien: prix,
    montantEmprunte,
    mensualite,
    coutTotalCredit,
    interetsTotaux,
    plafondInteretsAnnuel,
    interetsAnnee1,
    interetsDeductibles,
    economieFiscaleAn1,
    creditBellegenAkt,
    ratioLTV,
    amortissement,
  };
}
