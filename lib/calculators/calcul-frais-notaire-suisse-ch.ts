import {
  CH_CANTON_LABEL,
  CH_DROITS_MUTATION,
  CH_NOTAIRE_HONORAIRES_TAUX,
  CH_RF_FRAIS_TAUX,
  CH_TVA_NORMALE,
  type CHCanton,
} from "../tax-rates/ch";

export interface FraisNotaireCHInput {
  prixAchat: number;
  canton: CHCanton;
  residencePrincipale: boolean;
}

export interface FraisNotaireCHResult {
  prixAchat: number;
  canton: CHCanton;
  cantonLabel: string;
  droitsMutation: number;
  tauxDroitsMutation: number;
  honorairesNotaire: number;
  tvaHonoraires: number;
  fraisRF: number;
  totalFrais: number;
  totalAcquisition: number;
  detail: { label: string; montant: number }[];
}

export function computeFraisNotaireCH(
  input: FraisNotaireCHInput,
): FraisNotaireCHResult {
  const prix = Math.max(0, input.prixAchat);

  let tauxDroitsMutation = CH_DROITS_MUTATION[input.canton];
  // Certains cantons (ex Valais) appliquent un taux réduit pour résidence principale
  if (input.residencePrincipale && input.canton === "VS") {
    tauxDroitsMutation = 0.015;
  }
  const droitsMutation = prix * tauxDroitsMutation;

  const honorairesNotaire = prix * CH_NOTAIRE_HONORAIRES_TAUX;
  const tvaHonoraires = honorairesNotaire * CH_TVA_NORMALE;
  const fraisRF = prix * CH_RF_FRAIS_TAUX;

  const totalFrais = droitsMutation + honorairesNotaire + tvaHonoraires + fraisRF;
  const totalAcquisition = prix + totalFrais;

  return {
    prixAchat: prix,
    canton: input.canton,
    cantonLabel: CH_CANTON_LABEL[input.canton],
    droitsMutation,
    tauxDroitsMutation,
    honorairesNotaire,
    tvaHonoraires,
    fraisRF,
    totalFrais,
    totalAcquisition,
    detail: [
      { label: "Droits de mutation", montant: droitsMutation },
      { label: "Émoluments notaire (HT)", montant: honorairesNotaire },
      { label: `TVA 8,1 % sur émoluments`, montant: tvaHonoraires },
      { label: "Frais registre foncier", montant: fraisRF },
    ],
  };
}
