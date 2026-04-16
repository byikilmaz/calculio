import {
  LU_SUCCESSION_SURCHARGES,
  LU_SUCCESSION_TAUX_BASE,
  LU_SUCCESSION_TAUX_EXTRA,
  type LULienSuccession,
} from "../tax-rates/lu";

export interface SuccessionLUInput {
  valeurNette: number; // part brute reçue par l'héritier
  lien: LULienSuccession;
  partLegale: number; // fraction héritée relevant de la part légale (0-1)
}

export interface SuccessionLUResult {
  valeurNette: number;
  partLegaleMontant: number;
  partExtraLegaleMontant: number;
  exonere: boolean;
  tauxBase: number;
  tauxExtra: number;
  droitsBase: number;
  droitsExtra: number;
  majoration: number;
  droitsTotaux: number;
  tauxEffectif: number;
}

export function computeSuccessionLU(
  input: SuccessionLUInput,
): SuccessionLUResult {
  const valeurNette = Math.max(0, input.valeurNette);
  const partLegaleFrac = Math.max(0, Math.min(1, input.partLegale));

  const partLegaleMontant = valeurNette * partLegaleFrac;
  const partExtraLegaleMontant = valeurNette - partLegaleMontant;

  const tauxBase = LU_SUCCESSION_TAUX_BASE[input.lien];
  const tauxExtra = LU_SUCCESSION_TAUX_EXTRA[input.lien];

  // Époux avec enfants communs : exonération totale
  // Ligne directe : part légale exonérée, extra-légale imposée
  const exonere = input.lien === "epouxEnfantsCommuns";

  let droitsBase = 0;
  let droitsExtra = 0;
  if (!exonere) {
    if (input.lien === "ligneDirecte") {
      // part légale exonérée, extra-légale taxée
      droitsBase = 0;
      droitsExtra = partExtraLegaleMontant * tauxExtra;
    } else {
      droitsBase = partLegaleMontant * tauxBase;
      droitsExtra = partExtraLegaleMontant * tauxExtra;
    }
  }

  // Majoration selon montant reçu
  let majoration = 0;
  for (const s of LU_SUCCESSION_SURCHARGES) {
    if (valeurNette >= s.seuil) {
      majoration = s.majoration;
    }
  }
  const droitsAvantMajoration = droitsBase + droitsExtra;
  const droitsTotaux = droitsAvantMajoration * (1 + majoration);
  const tauxEffectif = valeurNette > 0 ? droitsTotaux / valeurNette : 0;

  return {
    valeurNette,
    partLegaleMontant,
    partExtraLegaleMontant,
    exonere,
    tauxBase,
    tauxExtra,
    droitsBase,
    droitsExtra,
    majoration,
    droitsTotaux,
    tauxEffectif,
  };
}
