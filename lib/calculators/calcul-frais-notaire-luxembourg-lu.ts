import {
  LU_BELLEGEN_AKT_MAX,
  LU_DROIT_ENREGISTREMENT,
  LU_DROIT_SURCHARGE_SEUIL,
  LU_DROIT_SURCHARGE_VILLE,
  LU_DROIT_TRANSCRIPTION,
  LU_NOTAIRE_DEBOURS_FORFAIT,
  LU_NOTAIRE_EMOLUMENTS_TAUX,
  LU_TVA_NORMALE,
} from "../tax-rates/lu";

export interface FraisNotaireLUInput {
  prixBien: number;
  nbAcheteurs: number;
  residencePrincipale: boolean;
  surchargeVilleLuxembourg: boolean;
}

export interface FraisNotaireLUResult {
  prixBien: number;
  // Droits
  droitEnregistrement: number;
  droitTranscription: number;
  surchargeVille: number;
  totalDroitsBrut: number;
  // Crédit Bëllegen Akt
  bellegenAktCredit: number;
  totalDroitsNet: number;
  // Émoluments notaire
  emolumentsNotaire: number;
  tvaEmoluments: number;
  // Débours
  debours: number;
  // Totaux
  totalNotaire: number;
  totalFraisAcquisition: number;
  pourcentagePrix: number;
}

export function computeFraisNotaireLU(
  input: FraisNotaireLUInput,
): FraisNotaireLUResult {
  const prix = Math.max(0, input.prixBien);
  const nbAcheteurs = Math.max(1, input.nbAcheteurs);

  // Droits d'enregistrement (6 %) et transcription (1 %)
  const droitEnregistrement = prix * LU_DROIT_ENREGISTREMENT;
  const droitTranscription = prix * LU_DROIT_TRANSCRIPTION;

  // Surcharge ville de Luxembourg (3 % sur montant au-delà de 300 k€)
  let surchargeVille = 0;
  if (input.surchargeVilleLuxembourg && prix > LU_DROIT_SURCHARGE_SEUIL) {
    surchargeVille =
      (prix - LU_DROIT_SURCHARGE_SEUIL) * LU_DROIT_SURCHARGE_VILLE;
  }

  const totalDroitsBrut =
    droitEnregistrement + droitTranscription + surchargeVille;

  // Bëllegen Akt : crédit 40 000 €/acheteur pour résidence principale
  const bellegenAktCredit = input.residencePrincipale
    ? Math.min(LU_BELLEGEN_AKT_MAX * nbAcheteurs, totalDroitsBrut)
    : 0;
  const totalDroitsNet = Math.max(0, totalDroitsBrut - bellegenAktCredit);

  // Émoluments notaire (~ 0,8 % du prix, + TVA 17 %)
  const emolumentsNotaire = prix * LU_NOTAIRE_EMOLUMENTS_TAUX;
  const tvaEmoluments = emolumentsNotaire * LU_TVA_NORMALE;

  // Débours (frais administratifs : publication, copies, extraits)
  const debours = LU_NOTAIRE_DEBOURS_FORFAIT;

  const totalNotaire = emolumentsNotaire + tvaEmoluments + debours;
  const totalFraisAcquisition = totalDroitsNet + totalNotaire;
  const pourcentagePrix = prix > 0 ? totalFraisAcquisition / prix : 0;

  return {
    prixBien: prix,
    droitEnregistrement,
    droitTranscription,
    surchargeVille,
    totalDroitsBrut,
    bellegenAktCredit,
    totalDroitsNet,
    emolumentsNotaire,
    tvaEmoluments,
    debours,
    totalNotaire,
    totalFraisAcquisition,
    pourcentagePrix,
  };
}
