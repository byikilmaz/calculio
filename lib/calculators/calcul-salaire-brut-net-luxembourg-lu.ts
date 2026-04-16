import {
  LU_CCSS_DEPENDANCE,
  LU_CCSS_MALADIE_ESPECES,
  LU_CCSS_MALADIE_SOINS,
  LU_CCSS_PENSION,
  LU_CCSS_PLAFOND_ANNUEL,
  LU_CIS,
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

export interface SalaireBrutNetLUInput {
  brutAnnuel: number;
  classe: LUClasse;
  frontalier: boolean;
}

export interface SalaireBrutNetLUResult {
  brutAnnuel: number;
  brutMensuel: number;
  // Cotisations sociales
  pension: number;
  maladieEspeces: number;
  maladieSoins: number;
  dependance: number;
  totalCotisations: number;
  // Impôt
  revenuImposable: number;
  impotBrut: number;
  creditCIS: number;
  impotApresCredit: number;
  fondsEmploi: number;
  impotTotal: number;
  // Synthèse
  netAnnuel: number;
  netMensuel: number; // divisé par 13 (13e mois)
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
 * Calcule le salaire net luxembourgeois à partir du brut annuel.
 * Cotisations CCSS (pension, maladie, dépendance) + IR + fonds emploi.
 * Classes 1 / 1a / 2 (splitting marié).
 */
export function computeSalaireBrutNetLU(
  input: SalaireBrutNetLUInput,
): SalaireBrutNetLUResult {
  const brutAnnuel = Math.max(0, input.brutAnnuel);
  const brutMensuel = brutAnnuel / 12;

  // 1. Cotisations sociales (plafonnées à 5× SSM)
  const baseCotisation = Math.min(brutAnnuel, LU_CCSS_PLAFOND_ANNUEL);
  const pension = baseCotisation * LU_CCSS_PENSION;
  const maladieEspeces = baseCotisation * LU_CCSS_MALADIE_ESPECES;
  const maladieSoins = baseCotisation * LU_CCSS_MALADIE_SOINS;
  // Dépendance : assiette = revenu imposable - abattement SSM/4
  const baseDependance = Math.max(
    0,
    baseCotisation - LU_DEPENDANCE_ABATTEMENT_ANNUEL,
  );
  const dependance = baseDependance * LU_CCSS_DEPENDANCE;

  const totalCotisations =
    pension + maladieEspeces + maladieSoins + dependance;

  // 2. Revenu imposable (après cotisations et forfaits)
  const revenuImposable = Math.max(
    0,
    brutAnnuel -
      pension -
      maladieEspeces -
      maladieSoins -
      LU_FRAIS_OBTENTION_FORFAIT -
      LU_DS_FORFAIT,
  );

  // 3. Impôt sur le revenu — classes
  let impotBrut = 0;
  if (input.classe === "2") {
    // Splitting marié : revenu /2 → impôt → ×2
    const impotDemi = applyBrackets(revenuImposable / 2, LU_IR_BAREME);
    impotBrut = impotDemi * 2;
  } else if (input.classe === "1a") {
    // 1a : barème légèrement allégé — approximation : abattement supplémentaire 4 500 €
    const revenuAjuste = Math.max(0, revenuImposable - 4500);
    impotBrut = applyBrackets(revenuAjuste, LU_IR_BAREME);
  } else {
    impotBrut = applyBrackets(revenuImposable, LU_IR_BAREME);
  }

  // 4. Crédit d'impôt salarié
  const creditCIS = Math.min(impotBrut, LU_CIS);
  const impotApresCredit = Math.max(0, impotBrut - creditCIS);

  // 5. Fonds emploi (majoration)
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

  const netAnnuel = Math.max(0, brutAnnuel - totalCotisations - impotTotal);
  // Convention luxembourgeoise : 13 mensualités usuelles (13e mois)
  const netMensuel = netAnnuel / 12;
  const tauxGlobal =
    brutAnnuel > 0 ? (brutAnnuel - netAnnuel) / brutAnnuel : 0;

  return {
    brutAnnuel,
    brutMensuel,
    pension,
    maladieEspeces,
    maladieSoins,
    dependance,
    totalCotisations,
    revenuImposable,
    impotBrut,
    creditCIS,
    impotApresCredit,
    fondsEmploi,
    impotTotal,
    netAnnuel,
    netMensuel,
    tauxGlobal,
  };
}
