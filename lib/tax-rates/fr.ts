import type { TaxBracket } from "../types";

export const FR_YEAR = 2025;

export const FR_PASS_MONTHLY = 3925;
export const FR_PASS_ANNUAL = FR_PASS_MONTHLY * 12;

export const FR_INCOME_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11294, rate: 0.0 },
  { min: 11294, max: 28797, rate: 0.11 },
  { min: 28797, max: 82341, rate: 0.3 },
  { min: 82341, max: 177106, rate: 0.41 },
  { min: 177106, max: Number.POSITIVE_INFINITY, rate: 0.45 },
];

export type EmployeeStatus = "non-cadre" | "cadre";

export interface SocialContribution {
  label: string;
  rate: number;
  ceilingMultiplier?: number | null;
  floorMultiplier?: number | null;
  cadreOnly?: boolean;
}

export const FR_EMPLOYEE_CONTRIBUTIONS_ANNUAL: SocialContribution[] = [
  {
    label: "Sécurité sociale — vieillesse plafonnée",
    rate: 0.069,
    ceilingMultiplier: 1,
  },
  { label: "Sécurité sociale — vieillesse déplafonnée", rate: 0.004 },
  {
    label: "Retraite complémentaire AGIRC-ARRCO T1",
    rate: 0.0315,
    ceilingMultiplier: 1,
  },
  {
    label: "Retraite complémentaire AGIRC-ARRCO T2",
    rate: 0.0864,
    floorMultiplier: 1,
    ceilingMultiplier: 8,
  },
  {
    label: "Contribution d'équilibre général CEG T1",
    rate: 0.0086,
    ceilingMultiplier: 1,
  },
  {
    label: "Contribution d'équilibre général CEG T2",
    rate: 0.0108,
    floorMultiplier: 1,
    ceilingMultiplier: 8,
  },
  { label: "APEC (cadres)", rate: 0.00024, cadreOnly: true },
];

export const FR_CSG_DEDUCTIBLE_RATE = 0.068;
export const FR_CSG_NON_DEDUCTIBLE_RATE = 0.024;
export const FR_CRDS_RATE = 0.005;
export const FR_CSG_CRDS_ABATTEMENT = 0.9825;
export const FR_CSG_CRDS_ABATTEMENT_CAP_MULTIPLE = 4;

export const FR_PRELEVEMENT_FORFAITAIRE_UNIQUE_RATE = 0.3;
export const FR_SOCIAL_CONTRIBUTIONS_ON_INVESTMENT = 0.172;

export const FR_DEFAULT_PROFESSIONAL_ABATTEMENT = 0.1;
export const FR_PROFESSIONAL_ABATTEMENT_MIN = 495;
export const FR_PROFESSIONAL_ABATTEMENT_MAX = 14171;
