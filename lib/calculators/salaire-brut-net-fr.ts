import {
  FR_CRDS_RATE,
  FR_CSG_CRDS_ABATTEMENT,
  FR_CSG_CRDS_ABATTEMENT_CAP_MULTIPLE,
  FR_CSG_DEDUCTIBLE_RATE,
  FR_CSG_NON_DEDUCTIBLE_RATE,
  FR_EMPLOYEE_CONTRIBUTIONS_ANNUAL,
  FR_PASS_ANNUAL,
  type EmployeeStatus,
} from "../tax-rates/fr";

export interface BrutNetInput {
  brutAnnuel: number;
  status: EmployeeStatus;
}

export interface ContributionLine {
  label: string;
  base: number;
  rate: number;
  amount: number;
}

export interface BrutNetResult {
  brutAnnuel: number;
  brutMensuel: number;
  contributions: ContributionLine[];
  totalContributions: number;
  csgDeductible: number;
  csgNonDeductible: number;
  crds: number;
  netAvantImpot: number;
  netAvantImpotMensuel: number;
  netImposable: number;
  netImposableMensuel: number;
  tauxPrelevementTotal: number;
}

function clampToRange(
  amount: number,
  floor: number,
  ceiling: number,
): number {
  return Math.max(0, Math.min(amount, ceiling) - floor);
}

function csgCrdsBase(brutAnnuel: number): number {
  const cap = FR_CSG_CRDS_ABATTEMENT_CAP_MULTIPLE * FR_PASS_ANNUAL;
  const abattuePortion = Math.min(brutAnnuel, cap) * FR_CSG_CRDS_ABATTEMENT;
  const remainder = Math.max(0, brutAnnuel - cap);
  return abattuePortion + remainder;
}

export function computeBrutNetFR(input: BrutNetInput): BrutNetResult {
  const { brutAnnuel, status } = input;
  const pass = FR_PASS_ANNUAL;

  const contributions: ContributionLine[] = FR_EMPLOYEE_CONTRIBUTIONS_ANNUAL
    .filter((c) => !c.cadreOnly || status === "cadre")
    .map((c) => {
      const floor = (c.floorMultiplier ?? 0) * pass;
      const ceiling =
        c.ceilingMultiplier == null
          ? brutAnnuel
          : c.ceilingMultiplier * pass;
      const base = clampToRange(brutAnnuel, floor, ceiling);
      const amount = Math.round(base * c.rate * 100) / 100;
      return { label: c.label, base, rate: c.rate, amount };
    });

  const totalContributions = contributions.reduce(
    (sum, line) => sum + line.amount,
    0,
  );

  const csgBase = csgCrdsBase(brutAnnuel);
  const csgDeductible = Math.round(csgBase * FR_CSG_DEDUCTIBLE_RATE * 100) / 100;
  const csgNonDeductible =
    Math.round(csgBase * FR_CSG_NON_DEDUCTIBLE_RATE * 100) / 100;
  const crds = Math.round(csgBase * FR_CRDS_RATE * 100) / 100;

  const netAvantImpot =
    brutAnnuel -
    totalContributions -
    csgDeductible -
    csgNonDeductible -
    crds;

  const netImposable = netAvantImpot + csgNonDeductible + crds;

  const tauxPrelevementTotal =
    brutAnnuel > 0 ? (brutAnnuel - netAvantImpot) / brutAnnuel : 0;

  return {
    brutAnnuel,
    brutMensuel: brutAnnuel / 12,
    contributions,
    totalContributions,
    csgDeductible,
    csgNonDeductible,
    crds,
    netAvantImpot,
    netAvantImpotMensuel: netAvantImpot / 12,
    netImposable,
    netImposableMensuel: netImposable / 12,
    tauxPrelevementTotal,
  };
}
