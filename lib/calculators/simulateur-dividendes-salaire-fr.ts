import {
  FR_IS_TAUX_NORMAL,
  FR_IS_TAUX_REDUIT,
  FR_IS_TAUX_REDUIT_PLAFOND,
  FR_PRELEVEMENT_FORFAITAIRE_UNIQUE_RATE,
} from "../tax-rates/fr";

export interface DividendesSalaireInput {
  beneficeAvantRemuneration: number; // bénéfice disponible dans la société
  partSalaire: number; // 0..1
}

export interface DividendesSalaireResult {
  benefice: number;
  partSalaire: number;
  // Branche salaire
  budgetSalaire: number;
  cotisationsPatronales: number;
  salaireBrut: number;
  chargesSalarialesEtIR: number;
  salaireNetApresIR: number;
  // Branche dividende
  beneficeDividendes: number;
  impotSocietes: number;
  dividendesBruts: number;
  pfuSurDividendes: number;
  dividendesNets: number;
  // Total
  totalNetPercu: number;
  totalPrelevements: number;
  tauxEffectifGlobal: number;
}

const TAUX_COTISATIONS_PATRONALES = 0.42;
const TAUX_CHARGES_SALARIALES_ET_IR = 0.43; // salarial ~22% + IR estim 21%
// => net ≈ brut × 0.57

function calculerIS(benefice: number): number {
  if (benefice <= 0) return 0;
  const partTauxReduit = Math.min(benefice, FR_IS_TAUX_REDUIT_PLAFOND);
  const partTauxNormal = Math.max(0, benefice - FR_IS_TAUX_REDUIT_PLAFOND);
  return (
    partTauxReduit * FR_IS_TAUX_REDUIT +
    partTauxNormal * FR_IS_TAUX_NORMAL
  );
}

export function computeDividendesSalaireFR(
  input: DividendesSalaireInput,
): DividendesSalaireResult {
  const benefice = Math.max(0, input.beneficeAvantRemuneration);
  const part = Math.max(0, Math.min(1, input.partSalaire));

  // Budget alloué au salaire (brut + cotisations patronales)
  const budgetSalaire = benefice * part;
  const salaireBrut = budgetSalaire / (1 + TAUX_COTISATIONS_PATRONALES);
  const cotisationsPatronales = budgetSalaire - salaireBrut;
  const chargesSalarialesEtIR = salaireBrut * TAUX_CHARGES_SALARIALES_ET_IR;
  const salaireNetApresIR = salaireBrut - chargesSalarialesEtIR;

  // Branche dividendes
  const beneficeDividendes = benefice - budgetSalaire;
  const impotSocietes = calculerIS(beneficeDividendes);
  const dividendesBruts = beneficeDividendes - impotSocietes;
  const pfuSurDividendes =
    dividendesBruts * FR_PRELEVEMENT_FORFAITAIRE_UNIQUE_RATE;
  const dividendesNets = dividendesBruts - pfuSurDividendes;

  const totalNetPercu = salaireNetApresIR + dividendesNets;
  const totalPrelevements = benefice - totalNetPercu;
  const tauxEffectifGlobal =
    benefice > 0 ? totalPrelevements / benefice : 0;

  return {
    benefice,
    partSalaire: part,
    budgetSalaire,
    cotisationsPatronales,
    salaireBrut,
    chargesSalarialesEtIR,
    salaireNetApresIR,
    beneficeDividendes,
    impotSocietes,
    dividendesBruts,
    pfuSurDividendes,
    dividendesNets,
    totalNetPercu,
    totalPrelevements,
    tauxEffectifGlobal,
  };
}
