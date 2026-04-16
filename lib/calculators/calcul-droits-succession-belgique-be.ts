import {
  BE_SUCCESSION_ABATTEMENT_BRUXELLES,
  BE_SUCCESSION_ABATTEMENT_WALLONIE,
  BE_SUCCESSION_ABATTEMENT_WALLONIE_BONUS,
  BE_SUCCESSION_ABATTEMENT_WALLONIE_SEUIL,
  BE_SUCCESSION_AUTRES,
  BE_SUCCESSION_BRUXELLES_DIRECT,
  BE_SUCCESSION_FLANDRE_DIRECT,
  BE_SUCCESSION_FRERES,
  BE_SUCCESSION_ONCLES,
  BE_SUCCESSION_WALLONIE_DIRECT,
  type BELienParente,
  type BERegion,
} from "../tax-rates/be";
import type { TaxBracket } from "../types";

export interface SuccessionBEInput {
  montant: number;
  region: BERegion;
  lien: BELienParente;
  partenaireCohabitantLegal: boolean;
}

export interface SuccessionBEBranche {
  min: number;
  max: number;
  rate: number;
  base: number;
  montant: number;
}

export interface SuccessionBEResult {
  montant: number;
  region: BERegion;
  lien: BELienParente;
  partenaireCohabitantLegal: boolean;
  exoneree: boolean;
  abattement: number;
  partTaxable: number;
  droits: number;
  netRecu: number;
  tauxEffectif: number;
  tranches: SuccessionBEBranche[];
  bareme: string;
}

function applyBrackets(base: number, brackets: TaxBracket[]): {
  droits: number;
  tranches: SuccessionBEBranche[];
} {
  let droits = 0;
  const tranches = brackets.map((b) => {
    const basePart = Math.max(0, Math.min(base, b.max) - b.min);
    const m = basePart * b.rate;
    droits += m;
    return {
      min: b.min,
      max: b.max,
      rate: b.rate,
      base: basePart,
      montant: m,
    };
  });
  return { droits, tranches };
}

function getBareme(
  region: BERegion,
  lien: BELienParente,
): { brackets: TaxBracket[]; label: string } {
  if (lien === "ligneDirecte" || lien === "conjoint") {
    if (region === "wallonie")
      return { brackets: BE_SUCCESSION_WALLONIE_DIRECT, label: "Wallonie — ligne directe / partenaire" };
    if (region === "bruxelles")
      return { brackets: BE_SUCCESSION_BRUXELLES_DIRECT, label: "Bruxelles — ligne directe / partenaire" };
    return { brackets: BE_SUCCESSION_FLANDRE_DIRECT, label: "Flandre — ligne directe / partenaire" };
  }
  if (lien === "frereSoeur")
    return { brackets: BE_SUCCESSION_FRERES, label: "Frères / sœurs (v1 : barème wallon)" };
  if (lien === "oncleNeveu")
    return { brackets: BE_SUCCESSION_ONCLES, label: "Oncles, tantes, neveux, nièces (v1 : barème wallon)" };
  return { brackets: BE_SUCCESSION_AUTRES, label: "Autres héritiers (v1 : barème wallon)" };
}

function getAbattement(
  montant: number,
  region: BERegion,
  lien: BELienParente,
  partenaireCohabitantLegal: boolean,
): number {
  // Abattement concerne principalement ligne directe, conjoint et cohabitant légal
  if (lien === "ligneDirecte" || lien === "conjoint" || partenaireCohabitantLegal) {
    if (region === "wallonie") {
      let ab = BE_SUCCESSION_ABATTEMENT_WALLONIE;
      if (montant < BE_SUCCESSION_ABATTEMENT_WALLONIE_SEUIL) {
        ab += BE_SUCCESSION_ABATTEMENT_WALLONIE_BONUS;
      }
      return ab;
    }
    if (region === "bruxelles") {
      return BE_SUCCESSION_ABATTEMENT_BRUXELLES;
    }
    // Flandre : abattement mobilier pour partenaire uniquement (simplifié)
    if (partenaireCohabitantLegal || lien === "conjoint") {
      return 50000;
    }
    return 0;
  }
  return 0;
}

/**
 * Détermine une exonération totale éventuelle :
 * - Conjoint / cohabitant légal en Bruxelles et Flandre sur logement familial
 *   (approximation : exonération totale si conjoint ou cohabitant légal ET
 *    région = bruxelles ou flandre).
 * NB : En Wallonie, le logement familial est exonéré pour le conjoint — traité
 *       ici comme exonération totale par défaut pour le conjoint.
 */
function checkExoneration(
  lien: BELienParente,
  region: BERegion,
  partenaireCohabitantLegal: boolean,
): boolean {
  if (lien === "conjoint") return true;
  if (partenaireCohabitantLegal && (region === "bruxelles" || region === "flandre"))
    return true;
  return false;
}

export function computeDroitsSuccessionBE(
  input: SuccessionBEInput,
): SuccessionBEResult {
  const montant = Math.max(0, input.montant);

  const exoneree = checkExoneration(
    input.lien,
    input.region,
    input.partenaireCohabitantLegal,
  );

  const { brackets, label } = getBareme(input.region, input.lien);

  if (exoneree) {
    return {
      montant,
      region: input.region,
      lien: input.lien,
      partenaireCohabitantLegal: input.partenaireCohabitantLegal,
      exoneree: true,
      abattement: Number.POSITIVE_INFINITY,
      partTaxable: 0,
      droits: 0,
      netRecu: montant,
      tauxEffectif: 0,
      tranches: [],
      bareme: label,
    };
  }

  const abattement = getAbattement(
    montant,
    input.region,
    input.lien,
    input.partenaireCohabitantLegal,
  );
  const partTaxable = Math.max(0, montant - abattement);

  const { droits, tranches } = applyBrackets(partTaxable, brackets);
  const netRecu = montant - droits;
  const tauxEffectif = montant > 0 ? droits / montant : 0;

  return {
    montant,
    region: input.region,
    lien: input.lien,
    partenaireCohabitantLegal: input.partenaireCohabitantLegal,
    exoneree: false,
    abattement,
    partTaxable,
    droits,
    netRecu,
    tauxEffectif,
    tranches,
    bareme: label,
  };
}
