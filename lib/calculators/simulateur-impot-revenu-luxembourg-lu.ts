import {
  LU_CIM,
  LU_CIS,
  LU_DEPENDANCE_ABATTEMENT_ANNUEL,
  LU_DS_FORFAIT,
  LU_FONDS_EMPLOI_SEUIL_CELIB,
  LU_FONDS_EMPLOI_SEUIL_MARIE,
  LU_FONDS_EMPLOI_TAUX_BAS,
  LU_FONDS_EMPLOI_TAUX_HAUT,
  LU_FRAIS_OBTENTION_FORFAIT,
  LU_IR_BAREME,
  LU_CCSS_DEPENDANCE,
  type LUClasse,
} from "../tax-rates/lu";
import type { TaxBracket } from "../types";

export type LUStatut = "salarie" | "independant" | "retraite";

export interface ImpotRevenuLUInput {
  revenuImposable: number;
  classe: LUClasse;
  statut: LUStatut;
  enfants: number;
}

export interface ImpotRevenuLUResult {
  revenuImposable: number;
  baseImposable: number;
  impotBareme: number;
  credit: number;
  impotApresCredit: number;
  fondsEmploi: number;
  dependance: number;
  impotTotal: number;
  tauxMoyen: number;
  tauxMarginal: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

function getTauxMarginal(revenu: number, brackets: TaxBracket[]): number {
  for (const b of brackets) {
    if (revenu >= b.min && revenu < b.max) return b.rate;
  }
  return brackets[brackets.length - 1].rate;
}

export function computeImpotRevenuLU(
  input: ImpotRevenuLUInput,
): ImpotRevenuLUResult {
  const revenuImposable = Math.max(0, input.revenuImposable);

  // Forfaits déductibles
  const forfaits =
    input.statut === "salarie"
      ? LU_FRAIS_OBTENTION_FORFAIT + LU_DS_FORFAIT
      : LU_DS_FORFAIT;
  const baseImposable = Math.max(0, revenuImposable - forfaits);

  // Impôt barème selon classe
  let impotBareme = 0;
  if (input.classe === "2") {
    const impotDemi = applyBrackets(baseImposable / 2, LU_IR_BAREME);
    impotBareme = impotDemi * 2;
  } else if (input.classe === "1a") {
    const abatt1a = 4500 + input.enfants * 4500;
    const ajuste = Math.max(0, baseImposable - abatt1a);
    impotBareme = applyBrackets(ajuste, LU_IR_BAREME);
  } else {
    impotBareme = applyBrackets(baseImposable, LU_IR_BAREME);
  }

  // Crédit d'impôt
  let credit = 0;
  if (input.statut === "salarie") credit = LU_CIS;
  if (input.statut === "independant") credit = LU_CIS;
  if (input.classe === "1a" && input.enfants > 0) credit = LU_CIM;
  credit = Math.min(credit, impotBareme);

  const impotApresCredit = Math.max(0, impotBareme - credit);

  // Fonds emploi
  const seuilFE =
    input.classe === "2"
      ? LU_FONDS_EMPLOI_SEUIL_MARIE
      : LU_FONDS_EMPLOI_SEUIL_CELIB;
  const tauxFE =
    baseImposable > seuilFE
      ? LU_FONDS_EMPLOI_TAUX_HAUT
      : LU_FONDS_EMPLOI_TAUX_BAS;
  const fondsEmploi = impotApresCredit * tauxFE;

  // Contribution dépendance — 1,4 % après abattement SSM/4
  const baseDependance = Math.max(
    0,
    baseImposable - LU_DEPENDANCE_ABATTEMENT_ANNUEL,
  );
  const dependance = baseDependance * LU_CCSS_DEPENDANCE;

  const impotTotal = impotApresCredit + fondsEmploi + dependance;
  const tauxMoyen = revenuImposable > 0 ? impotTotal / revenuImposable : 0;
  const tauxMarginal = getTauxMarginal(
    input.classe === "2" ? baseImposable / 2 : baseImposable,
    LU_IR_BAREME,
  );

  return {
    revenuImposable,
    baseImposable,
    impotBareme,
    credit,
    impotApresCredit,
    fondsEmploi,
    dependance,
    impotTotal,
    tauxMoyen,
    tauxMarginal,
  };
}
