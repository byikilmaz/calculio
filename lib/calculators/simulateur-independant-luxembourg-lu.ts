import {
  LU_CCSS_DEPENDANCE,
  LU_CCSS_INDEP_ACCIDENT,
  LU_CCSS_INDEP_MALADIE_ESPECES,
  LU_CCSS_INDEP_MALADIE_SOINS,
  LU_CCSS_INDEP_MUTUALITE,
  LU_CCSS_INDEP_PENSION,
  LU_CCSS_PLAFOND_ANNUEL,
  LU_CII,
  LU_DEPENDANCE_ABATTEMENT_ANNUEL,
  LU_DS_FORFAIT,
  LU_FONDS_EMPLOI_SEUIL_CELIB,
  LU_FONDS_EMPLOI_SEUIL_MARIE,
  LU_FONDS_EMPLOI_TAUX_BAS,
  LU_FONDS_EMPLOI_TAUX_HAUT,
  LU_FRAIS_OBTENTION_FORFAIT,
  LU_IR_BAREME,
  type LUClasse,
} from "../tax-rates/lu";
import type { TaxBracket } from "../types";

export interface IndependantLUInput {
  beneficeAnnuel: number; // CA - charges pros
  classe: LUClasse;
  useForfaitFrais: boolean;
}

export interface IndependantLUResult {
  beneficeAnnuel: number;
  // Cotisations indépendant
  pension: number;
  maladieSoins: number;
  maladieEspeces: number;
  accident: number;
  mutualite: number;
  dependance: number;
  totalCotisations: number;
  // Impôt
  revenuImposable: number;
  impotBareme: number;
  creditCII: number;
  impotApresCredit: number;
  fondsEmploi: number;
  impotTotal: number;
  netAnnuel: number;
  netMensuel: number;
  tauxGlobal: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

/**
 * Indépendant luxembourgeois — CCSS cumulée (salarié + employeur).
 * Source : ccss.lu
 */
export function computeIndependantLU(
  input: IndependantLUInput,
): IndependantLUResult {
  const benefice = Math.max(0, input.beneficeAnnuel);

  // Cotisations plafonnées à 5× SSM annuel
  const baseCotisation = Math.min(benefice, LU_CCSS_PLAFOND_ANNUEL);

  // Pension : 16 % (double part)
  const pension = baseCotisation * LU_CCSS_INDEP_PENSION;
  // Maladie soins de santé 5,45 % cumul (2,7 % + 2,8 %)
  const maladieSoins = baseCotisation * LU_CCSS_INDEP_MALADIE_SOINS;
  // Maladie espèces 0,05 %
  const maladieEspeces = baseCotisation * LU_CCSS_INDEP_MALADIE_ESPECES;
  // Accident 0,82 %
  const accident = baseCotisation * LU_CCSS_INDEP_ACCIDENT;
  // Mutualité (classe moyenne) 0,81 %
  const mutualite = baseCotisation * LU_CCSS_INDEP_MUTUALITE;
  // Dépendance 1,4 % sur base après abattement
  const baseDep = Math.max(0, baseCotisation - LU_DEPENDANCE_ABATTEMENT_ANNUEL);
  const dependance = baseDep * LU_CCSS_DEPENDANCE;

  const totalCotisations =
    pension + maladieSoins + maladieEspeces + accident + mutualite + dependance;

  // Revenu imposable
  const forfait = input.useForfaitFrais ? LU_FRAIS_OBTENTION_FORFAIT : 0;
  const revenuImposable = Math.max(
    0,
    benefice - pension - maladieSoins - maladieEspeces - forfait - LU_DS_FORFAIT,
  );

  // Impôt barème selon classe
  let impotBareme = 0;
  if (input.classe === "2") {
    const impotDemi = applyBrackets(revenuImposable / 2, LU_IR_BAREME);
    impotBareme = impotDemi * 2;
  } else if (input.classe === "1a") {
    const ajuste = Math.max(0, revenuImposable - 4500);
    impotBareme = applyBrackets(ajuste, LU_IR_BAREME);
  } else {
    impotBareme = applyBrackets(revenuImposable, LU_IR_BAREME);
  }

  // Crédit d'impôt indépendant (CII)
  const creditCII = Math.min(impotBareme, LU_CII);
  const impotApresCredit = Math.max(0, impotBareme - creditCII);

  // Fonds emploi
  const seuilFE =
    input.classe === "2"
      ? LU_FONDS_EMPLOI_SEUIL_MARIE
      : LU_FONDS_EMPLOI_SEUIL_CELIB;
  const tauxFE =
    revenuImposable > seuilFE
      ? LU_FONDS_EMPLOI_TAUX_HAUT
      : LU_FONDS_EMPLOI_TAUX_BAS;
  const fondsEmploi = impotApresCredit * tauxFE;
  const impotTotal = impotApresCredit + fondsEmploi;

  const netAnnuel = Math.max(0, benefice - totalCotisations - impotTotal);
  const netMensuel = netAnnuel / 12;
  const tauxGlobal = benefice > 0 ? (benefice - netAnnuel) / benefice : 0;

  return {
    beneficeAnnuel: benefice,
    pension,
    maladieSoins,
    maladieEspeces,
    accident,
    mutualite,
    dependance,
    totalCotisations,
    revenuImposable,
    impotBareme,
    creditCII,
    impotApresCredit,
    fondsEmploi,
    impotTotal,
    netAnnuel,
    netMensuel,
    tauxGlobal,
  };
}
