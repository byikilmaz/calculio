import {
  CA_MUNICIPALITE_LABEL,
  getMutationBareme,
  type CAMunicipalite,
  type CAMutationPalier,
} from "../tax-rates/ca";

export interface DroitsMutationQCInput {
  prixAchat: number;
  municipalite: CAMunicipalite;
}

export interface DroitsMutationQCResult {
  prixAchat: number;
  municipalite: CAMunicipalite;
  municipaliteLabel: string;
  tranches: Array<{
    min: number;
    max: number;
    taux: number;
    montant: number;
    droits: number;
  }>;
  droitsTotal: number;
  tauxEffectifMoyen: number;
}

function computeOnBareme(
  prix: number,
  bareme: CAMutationPalier[],
): {
  tranches: Array<{
    min: number;
    max: number;
    taux: number;
    montant: number;
    droits: number;
  }>;
  total: number;
} {
  let total = 0;
  const tranches: Array<{
    min: number;
    max: number;
    taux: number;
    montant: number;
    droits: number;
  }> = [];
  for (const p of bareme) {
    const base = Math.max(0, Math.min(prix, p.max) - p.min);
    const droits = base * p.taux;
    tranches.push({
      min: p.min,
      max: p.max,
      taux: p.taux,
      montant: base,
      droits,
    });
    total += droits;
  }
  return { tranches, total };
}

export function computeDroitsMutationQC(
  input: DroitsMutationQCInput,
): DroitsMutationQCResult | null {
  const prix = Math.max(0, input.prixAchat);
  if (prix <= 0) return null;
  const bareme = getMutationBareme(input.municipalite);
  const { tranches, total } = computeOnBareme(prix, bareme);
  const tauxEffectifMoyen = prix > 0 ? total / prix : 0;

  return {
    prixAchat: prix,
    municipalite: input.municipalite,
    municipaliteLabel: CA_MUNICIPALITE_LABEL[input.municipalite],
    tranches,
    droitsTotal: total,
    tauxEffectifMoyen,
  };
}
