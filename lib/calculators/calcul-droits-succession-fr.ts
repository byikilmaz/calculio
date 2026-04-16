import {
  FR_SUCCESSION_ABATTEMENTS,
  FR_SUCCESSION_BAREME_DIRECT,
  FR_SUCCESSION_BAREME_FRERES,
  FR_SUCCESSION_TAUX_AUTRE,
  FR_SUCCESSION_TAUX_NEVEU,
} from "../tax-rates/fr";
import type { TaxBracket } from "../types";

export type LienParente =
  | "enfant"
  | "conjoint"
  | "frereSoeur"
  | "neveuNiece"
  | "autre";

export interface SuccessionInput {
  montant: number;
  lien: LienParente;
  handicap: boolean;
}

export interface SuccessionResult {
  montant: number;
  lien: LienParente;
  handicap: boolean;
  exoneree: boolean;
  abattement: number;
  partTaxable: number;
  droits: number;
  netRecu: number;
  tauxEffectif: number;
  tranches: Array<{
    min: number;
    max: number;
    rate: number;
    base: number;
    montant: number;
  }>;
}

function applyBrackets(
  base: number,
  brackets: TaxBracket[],
): {
  montant: number;
  tranches: Array<{
    min: number;
    max: number;
    rate: number;
    base: number;
    montant: number;
  }>;
} {
  let total = 0;
  const tranches = brackets.map((b) => {
    const basePart = Math.max(0, Math.min(base, b.max) - b.min);
    const m = basePart * b.rate;
    total += m;
    return {
      min: b.min,
      max: b.max,
      rate: b.rate,
      base: basePart,
      montant: m,
    };
  });
  return { montant: total, tranches };
}

export function computeDroitsSuccessionFR(
  input: SuccessionInput,
): SuccessionResult {
  const montant = Math.max(0, input.montant);

  if (input.lien === "conjoint") {
    return {
      montant,
      lien: input.lien,
      handicap: input.handicap,
      exoneree: true,
      abattement: Number.POSITIVE_INFINITY,
      partTaxable: 0,
      droits: 0,
      netRecu: montant,
      tauxEffectif: 0,
      tranches: [],
    };
  }

  const abattementBase = FR_SUCCESSION_ABATTEMENTS[input.lien];
  const abattementHandicap = input.handicap
    ? FR_SUCCESSION_ABATTEMENTS.handicap
    : 0;
  const abattement = abattementBase + abattementHandicap;
  const partTaxable = Math.max(0, montant - abattement);

  let droits = 0;
  let tranches: SuccessionResult["tranches"] = [];

  if (input.lien === "enfant") {
    const r = applyBrackets(partTaxable, FR_SUCCESSION_BAREME_DIRECT);
    droits = r.montant;
    tranches = r.tranches;
  } else if (input.lien === "frereSoeur") {
    const r = applyBrackets(partTaxable, FR_SUCCESSION_BAREME_FRERES);
    droits = r.montant;
    tranches = r.tranches;
  } else if (input.lien === "neveuNiece") {
    droits = partTaxable * FR_SUCCESSION_TAUX_NEVEU;
    tranches = [
      {
        min: 0,
        max: Number.POSITIVE_INFINITY,
        rate: FR_SUCCESSION_TAUX_NEVEU,
        base: partTaxable,
        montant: droits,
      },
    ];
  } else {
    // "autre"
    droits = partTaxable * FR_SUCCESSION_TAUX_AUTRE;
    tranches = [
      {
        min: 0,
        max: Number.POSITIVE_INFINITY,
        rate: FR_SUCCESSION_TAUX_AUTRE,
        base: partTaxable,
        montant: droits,
      },
    ];
  }

  const netRecu = montant - droits;
  const tauxEffectif = montant > 0 ? droits / montant : 0;

  return {
    montant,
    lien: input.lien,
    handicap: input.handicap,
    exoneree: false,
    abattement,
    partTaxable,
    droits,
    netRecu,
    tauxEffectif,
    tranches,
  };
}
