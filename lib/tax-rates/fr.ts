import type { TaxBracket } from "../types";

export const FR_YEAR = 2026;

export const FR_PASS_MONTHLY = 4005;
export const FR_PASS_ANNUAL = FR_PASS_MONTHLY * 12;

// Barème IR 2026 applicable aux revenus 2025 (LF 2026, revalorisation +0,9 %)
export const FR_INCOME_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11600, rate: 0.0 },
  { min: 11600, max: 29579, rate: 0.11 },
  { min: 29579, max: 84577, rate: 0.3 },
  { min: 84577, max: 181917, rate: 0.41 },
  { min: 181917, max: Number.POSITIVE_INFINITY, rate: 0.45 },
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

// Abattement forfaitaire 10% frais professionnels - plafonds 2026 (revenus 2025)
export const FR_DEFAULT_PROFESSIONAL_ABATTEMENT = 0.1;
export const FR_PROFESSIONAL_ABATTEMENT_MIN = 509;
export const FR_PROFESSIONAL_ABATTEMENT_MAX = 14555;

// Quotient familial (parts) - plafonnement par demi-part 2026
export const FR_QUOTIENT_FAMILIAL_CAP = 1807;

// Micro-entreprise 2026 (URSSAF) - BNC libéral +1pt au 01/01/2026
export const FR_MICRO_RATES = {
  ventesBIC: { cotisations: 0.123, vfl: 0.01, plafond: 188700, abattement: 0.71 },
  servicesBIC: { cotisations: 0.212, vfl: 0.017, plafond: 77700, abattement: 0.50 },
  servicesBNC: { cotisations: 0.256, vfl: 0.022, plafond: 77700, abattement: 0.34 },
  liberaleCIPAV: { cotisations: 0.232, vfl: 0.022, plafond: 77700, abattement: 0.34 },
} as const;

// Succession - abattements (inchangés en 2026)
export const FR_SUCCESSION_ABATTEMENTS = {
  enfant: 100000,
  conjoint: Number.POSITIVE_INFINITY, // exonéré
  frereSoeur: 15932,
  neveuNiece: 7967,
  autre: 1594,
  handicap: 159325, // cumulable
} as const;

// Succession - barème ligne directe (enfants, parents) - inchangé depuis 2011
export const FR_SUCCESSION_BAREME_DIRECT: TaxBracket[] = [
  { min: 0, max: 8072, rate: 0.05 },
  { min: 8072, max: 12109, rate: 0.10 },
  { min: 12109, max: 15932, rate: 0.15 },
  { min: 15932, max: 552324, rate: 0.20 },
  { min: 552324, max: 902838, rate: 0.30 },
  { min: 902838, max: 1805677, rate: 0.40 },
  { min: 1805677, max: Number.POSITIVE_INFINITY, rate: 0.45 },
];

export const FR_SUCCESSION_BAREME_FRERES: TaxBracket[] = [
  { min: 0, max: 24430, rate: 0.35 },
  { min: 24430, max: Number.POSITIVE_INFINITY, rate: 0.45 },
];

export const FR_SUCCESSION_TAUX_NEVEU = 0.55;
export const FR_SUCCESSION_TAUX_AUTRE = 0.60;

// Plus-value immobilière (taux et abattements inchangés en 2026)
export const FR_PLUSVALUE_IR_RATE = 0.19;
export const FR_PLUSVALUE_PS_RATE = 0.172;
export const FR_PLUSVALUE_FRAIS_FORFAIT = 0.075; // 7.5% frais acquisition forfait
export const FR_PLUSVALUE_TRAVAUX_FORFAIT = 0.15; // 15% travaux forfait après 5 ans
// Abattement IR: 6%/an de la 6e à la 21e année, 4% la 22e année, 0% avant
// Abattement PS: 1.65%/an de la 6e à la 21e année, 1.6% la 22e année, 9%/an de la 23e à la 30e

// Barème kilométrique 2026 (non revalorisé, identique à 2025 - impots.gouv.fr)
export const FR_BAREME_KM_2025 = {
  "3cv": [
    { limit: 5000, coefA: 0.529, coefB: 0 },
    { limit: 20000, coefA: 0.316, coefB: 1065 },
    { limit: Infinity, coefA: 0.370, coefB: 0 },
  ],
  "4cv": [
    { limit: 5000, coefA: 0.606, coefB: 0 },
    { limit: 20000, coefA: 0.340, coefB: 1330 },
    { limit: Infinity, coefA: 0.407, coefB: 0 },
  ],
  "5cv": [
    { limit: 5000, coefA: 0.636, coefB: 0 },
    { limit: 20000, coefA: 0.357, coefB: 1395 },
    { limit: Infinity, coefA: 0.427, coefB: 0 },
  ],
  "6cv": [
    { limit: 5000, coefA: 0.665, coefB: 0 },
    { limit: 20000, coefA: 0.374, coefB: 1457 },
    { limit: Infinity, coefA: 0.447, coefB: 0 },
  ],
  "7cv": [
    { limit: 5000, coefA: 0.697, coefB: 0 },
    { limit: 20000, coefA: 0.394, coefB: 1515 },
    { limit: Infinity, coefA: 0.470, coefB: 0 },
  ],
} as const;

// Impôt sur les sociétés (taux inchangés en 2026)
export const FR_IS_TAUX_REDUIT = 0.15; // jusqu'à 42 500 €
export const FR_IS_TAUX_REDUIT_PLAFOND = 42500;
export const FR_IS_TAUX_NORMAL = 0.25;
