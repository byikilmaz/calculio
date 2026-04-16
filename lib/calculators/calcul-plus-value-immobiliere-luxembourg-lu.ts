import {
  LU_PV_ABATTEMENT_DETENTION_LONGUE,
  LU_PV_ABATTEMENT_PERSONNE,
  LU_PV_ABATTEMENT_RENOUVELLEMENT_ANS,
  LU_PV_DEMI_GLOBAL_MAX,
  LU_PV_SPECULATION_DUREE,
} from "../tax-rates/lu";

export type LUTypePV = "residencePrincipale" | "locatif";

export interface PlusValueLUInput {
  prixVente: number;
  prixAcquisition: number;
  fraisAcquisition: number;
  travaux: number;
  dureeDetentionAnnees: number;
  nbMembresFoyer: number;
  occupationResidencePrincipale5Ans: boolean;
  typeBien: LUTypePV;
  tauxMarginalIR: number; // pour calcul de taux demi-global
  abattementsDejaUtilisesAnnees: number; // dernière utilisation abattement
}

export interface PlusValueLUResult {
  prixVente: number;
  coutRevient: number;
  plusValueBrute: number;
  // Exonération résidence principale
  exonereResidencePrincipale: boolean;
  // Abattements
  abattementPersonnel: number;
  abattementDetentionLongue: number;
  plusValueImposable: number;
  // Taxation
  speculation: boolean;
  tauxApplique: number;
  impot: number;
  fondsEmploi: number;
  impotTotal: number;
  plusValueNette: number;
}

export function computePlusValueLU(
  input: PlusValueLUInput,
): PlusValueLUResult {
  const prixVente = Math.max(0, input.prixVente);
  const prixAcqui = Math.max(0, input.prixAcquisition);
  const frais = Math.max(0, input.fraisAcquisition);
  const travaux = Math.max(0, input.travaux);

  const coutRevient = prixAcqui + frais + travaux;
  const plusValueBrute = Math.max(0, prixVente - coutRevient);

  // Résidence principale : exonération totale si occupation ≥ 5 ans
  if (
    input.typeBien === "residencePrincipale" &&
    input.occupationResidencePrincipale5Ans
  ) {
    return {
      prixVente,
      coutRevient,
      plusValueBrute,
      exonereResidencePrincipale: true,
      abattementPersonnel: 0,
      abattementDetentionLongue: 0,
      plusValueImposable: 0,
      speculation: false,
      tauxApplique: 0,
      impot: 0,
      fondsEmploi: 0,
      impotTotal: 0,
      plusValueNette: plusValueBrute,
    };
  }

  // Locatif : abattements
  const nbMembres = Math.max(1, input.nbMembresFoyer);
  // Abattement personnel si pas utilisé dans les 11 dernières années
  const dernAns = Math.max(0, input.abattementsDejaUtilisesAnnees);
  const abattementPersonnel =
    dernAns >= LU_PV_ABATTEMENT_RENOUVELLEMENT_ANS
      ? LU_PV_ABATTEMENT_PERSONNE * nbMembres
      : 0;

  // Abattement détention longue (≥ 11 ans)
  const abattementDetentionLongue =
    input.dureeDetentionAnnees >= 11 ? LU_PV_ABATTEMENT_DETENTION_LONGUE : 0;

  const plusValueImposable = Math.max(
    0,
    plusValueBrute - abattementPersonnel - abattementDetentionLongue,
  );

  // Taxation
  const speculation = input.dureeDetentionAnnees < LU_PV_SPECULATION_DUREE;
  const tmi = Math.max(0, Math.min(0.42, input.tauxMarginalIR));
  const tauxApplique = speculation
    ? tmi
    : Math.min(tmi / 2, LU_PV_DEMI_GLOBAL_MAX);

  const impot = plusValueImposable * tauxApplique;
  const fondsEmploi = impot * 0.07; // 7 %
  const impotTotal = impot + fondsEmploi;

  const plusValueNette = plusValueBrute - impotTotal;

  return {
    prixVente,
    coutRevient,
    plusValueBrute,
    exonereResidencePrincipale: false,
    abattementPersonnel,
    abattementDetentionLongue,
    plusValueImposable,
    speculation,
    tauxApplique,
    impot,
    fondsEmploi,
    impotTotal,
    plusValueNette,
  };
}
