import {
  CH_CANTON_LABEL,
  CH_SUCCESSION_ABATTEMENT,
  CH_SUCCESSION_EXONERATIONS,
  CH_SUCCESSION_TAUX,
  type CHCanton,
  type CHLienSuccession,
} from "../tax-rates/ch";

export interface SuccessionCHInput {
  montant: number;
  canton: CHCanton;
  lien: CHLienSuccession;
}

export interface SuccessionCHResult {
  montant: number;
  canton: CHCanton;
  cantonLabel: string;
  lien: CHLienSuccession;
  exonere: boolean;
  abattement: number;
  partTaxable: number;
  tauxApplique: number;
  droits: number;
  netRecu: number;
  tauxEffectif: number;
  commentaire: string;
}

const LIEN_LABEL: Record<CHLienSuccession, string> = {
  conjoint: "Conjoint / partenaire enregistré",
  descendantDirect: "Descendant direct (enfant, petit-enfant)",
  ascendantDirect: "Ascendant direct (parent, grand-parent)",
  frereSoeur: "Frère / sœur",
  oncleNeveu: "Oncle, tante, neveu, nièce",
  autre: "Autre (sans lien de parenté)",
};

export function computeSuccessionCH(
  input: SuccessionCHInput,
): SuccessionCHResult {
  const montant = Math.max(0, input.montant);
  const exoMap = CH_SUCCESSION_EXONERATIONS[input.canton] ?? {};
  const exonere = exoMap[input.lien] === true;

  const cantonLabel = CH_CANTON_LABEL[input.canton];
  const lienLabel = LIEN_LABEL[input.lien];

  if (exonere) {
    return {
      montant,
      canton: input.canton,
      cantonLabel,
      lien: input.lien,
      exonere: true,
      abattement: Number.POSITIVE_INFINITY,
      partTaxable: 0,
      tauxApplique: 0,
      droits: 0,
      netRecu: montant,
      tauxEffectif: 0,
      commentaire: `Exonération totale en ${cantonLabel} pour : ${lienLabel}.`,
    };
  }

  const abattement = CH_SUCCESSION_ABATTEMENT[input.canton] ?? 0;
  const partTaxable = Math.max(0, montant - abattement);
  const tauxMap = CH_SUCCESSION_TAUX[input.canton] ?? {};
  const tauxApplique = tauxMap[input.lien] ?? 0.3; // par défaut 30 % (tiers non spécifié)
  const droits = partTaxable * tauxApplique;
  const netRecu = montant - droits;
  const tauxEffectif = montant > 0 ? droits / montant : 0;

  return {
    montant,
    canton: input.canton,
    cantonLabel,
    lien: input.lien,
    exonere: false,
    abattement,
    partTaxable,
    tauxApplique,
    droits,
    netRecu,
    tauxEffectif,
    commentaire: `Taux ${cantonLabel} applicable (${lienLabel}). Barème cantonal simplifié 2026.`,
  };
}
