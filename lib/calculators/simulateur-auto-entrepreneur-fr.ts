import {
  FR_MICRO_RATES,
  FR_INCOME_TAX_BRACKETS,
} from "../tax-rates/fr";
import type { TaxBracket } from "../types";

export type ActiviteType =
  | "ventesBIC"
  | "servicesBIC"
  | "servicesBNC"
  | "liberaleCIPAV";

export interface AutoEntrepreneurInput {
  chiffreAffaires: number;
  type: ActiviteType;
  versementLiberatoire: boolean;
  autresRevenus?: number; // pour estimer l'IR classique
}

export interface AutoEntrepreneurResult {
  chiffreAffaires: number;
  type: ActiviteType;
  plafond: number;
  seuilDepasse: boolean;
  cotisationsSociales: number;
  tauxCotisations: number;
  versementLiberatoire: boolean;
  vflMontant: number;
  abattementForfaitaire: number;
  revenuImposable: number;
  impotSurLeRevenu: number;
  netAvantIR: number;
  netFinal: number;
  tauxEffectifGlobal: number;
  netMensuel: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

export function computeAutoEntrepreneurFR(
  input: AutoEntrepreneurInput,
): AutoEntrepreneurResult {
  const ca = Math.max(0, input.chiffreAffaires);
  const rates = FR_MICRO_RATES[input.type];
  const autresRevenus = input.autresRevenus ?? 0;

  const cotisationsSociales = ca * rates.cotisations;

  let vflMontant = 0;
  let revenuImposable = 0;
  let impotSurLeRevenu = 0;

  if (input.versementLiberatoire) {
    vflMontant = ca * rates.vfl;
    // En VFL, l'IR est libéré via le prélèvement forfaitaire
    revenuImposable = ca * (1 - rates.abattement); // on l'affiche à titre info
    impotSurLeRevenu = 0;
  } else {
    // Régime classique: abattement forfaitaire sur CA = revenu imposable
    revenuImposable = ca * (1 - rates.abattement);
    // IR estimé en ajoutant aux autres revenus, 1 part
    const impotAvec = applyBrackets(
      autresRevenus + revenuImposable,
      FR_INCOME_TAX_BRACKETS,
    );
    const impotSans = applyBrackets(autresRevenus, FR_INCOME_TAX_BRACKETS);
    impotSurLeRevenu = Math.max(0, impotAvec - impotSans);
  }

  const netAvantIR = ca - cotisationsSociales - vflMontant;
  const netFinal = netAvantIR - impotSurLeRevenu;
  const tauxEffectifGlobal = ca > 0 ? 1 - netFinal / ca : 0;

  return {
    chiffreAffaires: ca,
    type: input.type,
    plafond: rates.plafond,
    seuilDepasse: ca > rates.plafond,
    cotisationsSociales,
    tauxCotisations: rates.cotisations,
    versementLiberatoire: input.versementLiberatoire,
    vflMontant,
    abattementForfaitaire: rates.abattement,
    revenuImposable,
    impotSurLeRevenu,
    netAvantIR,
    netFinal,
    tauxEffectifGlobal,
    netMensuel: netFinal / 12,
  };
}
