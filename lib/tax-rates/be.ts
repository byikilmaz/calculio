import type { TaxBracket } from "../types";

export const BE_YEAR = 2026;

// Impôt des personnes physiques — exercice d'imposition 2026 (revenus 2025)
// Source : SPF Finances, articles 130 et suivants du CIR 92
export const BE_INCOME_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 16320, rate: 0.25 },
  { min: 16320, max: 28800, rate: 0.4 },
  { min: 28800, max: 49840, rate: 0.45 },
  { min: 49840, max: Number.POSITIVE_INFINITY, rate: 0.5 },
];

// Quotité du revenu exemptée d'impôt (exercice 2026)
export const BE_QUOTITE_EXEMPTEE = 10910;
// La quotité exemptée produit une réduction d'impôt au taux de la première tranche (25%)
export const BE_QUOTITE_REDUCTION_RATE = 0.25;
// Majoration de quotité exemptée pour enfants à charge (valeurs forfaitaires 2026)
export const BE_QUOTITE_MAJORATION_ENFANTS: Record<number, number> = {
  0: 0,
  1: 1920,
  2: 4920,
  3: 11030,
  4: 17800,
};
// Au-delà de 4 enfants, on ajoute 6 770 € par enfant supplémentaire
export const BE_QUOTITE_MAJORATION_ENFANT_SUPPL = 6770;

// Sécurité sociale salarié (ONSS travailleur) — taux global
export const BE_ONSS_SALARIE_RATE = 0.1307;

// Additionnels communaux moyens (Wallonie + Bruxelles)
// Moyenne pondérée observée ~7,5 % — ajustable par l'utilisateur
export const BE_ADDITIONNELS_COMMUNAUX_MOYENNE = 0.075;

// Bonus à l'emploi (workbonus) — simplifié
// Plein : brut mensuel ≤ 2 000 € → compense intégralement les 13,07 % d'ONSS
// Décroissance linéaire jusqu'à annulation à 3 100 € brut mensuel
export const BE_WORKBONUS_SEUIL_PLEIN = 2000;
export const BE_WORKBONUS_SEUIL_ZERO = 3100;

// Droits de succession — Région wallonne, ligne directe + conjoint/cohabitant légal
// Source : Code des droits de succession wallon (Décret SCRIS)
export const BE_SUCCESSION_WALLONIE_DIRECT: TaxBracket[] = [
  { min: 0, max: 12500, rate: 0.03 },
  { min: 12500, max: 25000, rate: 0.04 },
  { min: 25000, max: 50000, rate: 0.05 },
  { min: 50000, max: 100000, rate: 0.07 },
  { min: 100000, max: 150000, rate: 0.1 },
  { min: 150000, max: 200000, rate: 0.14 },
  { min: 200000, max: 250000, rate: 0.18 },
  { min: 250000, max: 500000, rate: 0.24 },
  { min: 500000, max: Number.POSITIVE_INFINITY, rate: 0.3 },
];

// Droits de succession — Région de Bruxelles-Capitale, ligne directe
// Source : Code des droits de succession bruxellois
export const BE_SUCCESSION_BRUXELLES_DIRECT: TaxBracket[] = [
  { min: 0, max: 50000, rate: 0.03 },
  { min: 50000, max: 100000, rate: 0.08 },
  { min: 100000, max: 175000, rate: 0.09 },
  { min: 175000, max: 250000, rate: 0.18 },
  { min: 250000, max: 500000, rate: 0.24 },
  { min: 500000, max: Number.POSITIVE_INFINITY, rate: 0.3 },
];

// Droits de succession — Région flamande, ligne directe + partenaire
// Source : VLABEL (Vlaamse Belastingdienst)
export const BE_SUCCESSION_FLANDRE_DIRECT: TaxBracket[] = [
  { min: 0, max: 50000, rate: 0.03 },
  { min: 50000, max: 250000, rate: 0.09 },
  { min: 250000, max: Number.POSITIVE_INFINITY, rate: 0.27 },
];

// Droits de succession — Frères/sœurs (base Wallonie utilisée pour les 3 régions en v1)
export const BE_SUCCESSION_FRERES: TaxBracket[] = [
  { min: 0, max: 12500, rate: 0.2 },
  { min: 12500, max: 25000, rate: 0.25 },
  { min: 25000, max: 75000, rate: 0.35 },
  { min: 75000, max: 175000, rate: 0.5 },
  { min: 175000, max: Number.POSITIVE_INFINITY, rate: 0.65 },
];

// Droits de succession — Oncles/tantes/neveux/nièces (base Wallonie v1)
export const BE_SUCCESSION_ONCLES: TaxBracket[] = [
  { min: 0, max: 12500, rate: 0.25 },
  { min: 12500, max: 25000, rate: 0.3 },
  { min: 25000, max: 75000, rate: 0.4 },
  { min: 75000, max: 175000, rate: 0.55 },
  { min: 175000, max: Number.POSITIVE_INFINITY, rate: 0.7 },
];

// Droits de succession — Autres (non-parents) (base Wallonie v1)
export const BE_SUCCESSION_AUTRES: TaxBracket[] = [
  { min: 0, max: 12500, rate: 0.3 },
  { min: 12500, max: 25000, rate: 0.35 },
  { min: 25000, max: 75000, rate: 0.6 },
  { min: 75000, max: Number.POSITIVE_INFINITY, rate: 0.8 },
];

// Abattements successoraux (ligne directe / conjoint / cohabitant légal)
export const BE_SUCCESSION_ABATTEMENT_WALLONIE = 12500; // +12 500 € supplémentaire si actif net < 125 000 €
export const BE_SUCCESSION_ABATTEMENT_WALLONIE_SEUIL = 125000;
export const BE_SUCCESSION_ABATTEMENT_WALLONIE_BONUS = 12500;
export const BE_SUCCESSION_ABATTEMENT_BRUXELLES = 15000;
// Flandre : pas d'abattement strict en ligne directe, mais 50 000 € exemptés pour conjoint sur mobilier
// et exonération complète du logement familial pour conjoint/cohabitant.

// Droits d'enregistrement — achat immobilier
// Wallonie : 12,5 % standard / 3 % habitation propre et unique (Décret du 19/12/2023)
// Bruxelles : 12,5 % standard / abattement 200 000 € si prix ≤ 600 000 € pour 1ère habitation
// Flandre : 12 % standard / 2 % pour primo-accédant (depuis 2024 remplace les 3 %)
export const BE_DROITS_ENREG = {
  wallonie: { standard: 0.125, reduit: 0.03 },
  bruxelles: {
    standard: 0.125,
    abattement: 200000,
    plafondAbattement: 600000,
  },
  flandre: { standard: 0.12, reduit: 0.02 },
} as const;

// Honoraires notaire — barème dégressif (Arrêté royal 16/12/1950, simplifié)
// Paliers appliqués cumulativement sur la tranche correspondante
export const BE_NOTAIRE_HONORAIRES: { limit: number; rate: number }[] = [
  { limit: 50000, rate: 0.04 },
  { limit: 100000, rate: 0.025 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.0057 },
];

// TVA sur honoraires (21 % — taux normal belge)
export const BE_NOTAIRE_TVA = 0.21;

// Frais divers forfaitaires (recherches hypothécaires, inscription, cadastre…)
export const BE_NOTAIRE_FRAIS_DIVERS = 1200;

export type BERegion = "wallonie" | "bruxelles" | "flandre";
export type BELienParente =
  | "ligneDirecte"
  | "conjoint"
  | "frereSoeur"
  | "oncleNeveu"
  | "autre";
