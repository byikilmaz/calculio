import { FR_BAREME_KM_2025 } from "../tax-rates/fr";

export type PuissanceFiscale = "3cv" | "4cv" | "5cv" | "6cv" | "7cv";

export interface FraisKmInput {
  kilometrage: number;
  puissance: PuissanceFiscale;
}

export interface FraisKmResult {
  kilometrage: number;
  puissance: PuissanceFiscale;
  montantDeductible: number;
  trancheAppliquee: string;
  coefA: number;
  coefB: number;
  formule: string;
  tousLesCV: Array<{ cv: PuissanceFiscale; montant: number }>;
}

function applyBareme(km: number, puissance: PuissanceFiscale): {
  montant: number;
  coefA: number;
  coefB: number;
  tranche: string;
} {
  const bareme = FR_BAREME_KM_2025[puissance];
  // Determine which bracket based on km
  for (const b of bareme) {
    if (km <= b.limit) {
      const montant = km * b.coefA + b.coefB;
      const tranche =
        b.limit === Infinity
          ? "> 20 000 km"
          : b.limit === 5000
            ? "≤ 5 000 km"
            : "5 001 à 20 000 km";
      return { montant, coefA: b.coefA, coefB: b.coefB, tranche };
    }
  }
  // Fallback (shouldn't happen since last limit is Infinity)
  const last = bareme[bareme.length - 1];
  return {
    montant: km * last.coefA + last.coefB,
    coefA: last.coefA,
    coefB: last.coefB,
    tranche: "> 20 000 km",
  };
}

export function computeFraisKilometriquesFR(
  input: FraisKmInput,
): FraisKmResult | null {
  const km = Math.max(0, input.kilometrage);
  if (!Number.isFinite(km)) return null;

  const applied = applyBareme(km, input.puissance);
  const sign = applied.coefB >= 0 ? "+" : "−";
  const formule =
    applied.coefB === 0
      ? `${km} × ${applied.coefA}`
      : `${km} × ${applied.coefA} ${sign} ${Math.abs(applied.coefB)}`;

  const tousLesCV: Array<{ cv: PuissanceFiscale; montant: number }> = (
    ["3cv", "4cv", "5cv", "6cv", "7cv"] as const
  ).map((cv) => ({
    cv,
    montant: applyBareme(km, cv).montant,
  }));

  return {
    kilometrage: km,
    puissance: input.puissance,
    montantDeductible: applied.montant,
    trancheAppliquee: applied.tranche,
    coefA: applied.coefA,
    coefB: applied.coefB,
    formule,
    tousLesCV,
  };
}
