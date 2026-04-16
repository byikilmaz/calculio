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

// ─────────────────────────────────────────────────────────────
// INASTI — Cotisations sociales travailleurs indépendants 2026
// Source : INASTI (Institut national d'assurances sociales pour travailleurs indépendants)
// Assiette : revenu net professionnel de l'avant-dernière année (N-3) indexé
// ─────────────────────────────────────────────────────────────
// Paliers dégressifs 2026 (indexation habituelle ~2 %)
export const BE_INASTI_SEUIL_HAUT = 75546.63; // Seuil au-delà duquel le taux passe à 14,16 %
export const BE_INASTI_PLAFOND = 111275.57; // Plafond au-delà duquel aucune cotisation n'est due
export const BE_INASTI_TAUX_BAS = 0.205; // 20,5 % jusqu'au seuil
export const BE_INASTI_TAUX_HAUT = 0.1416; // 14,16 % entre seuil et plafond
// Cotisation minimale forfaitaire pour début d'activité (primo-indépendants) 2026
// Revenu minimum fictif 2026 : ~17 170 €
export const BE_INASTI_REVENU_MIN_DEBUT = 17170;
// Cotisation de solidarité trimestrielle minimale (début d'activité, 2026)
export const BE_INASTI_COTISATION_MIN_TRIMESTRIELLE = 880;
// Frais de gestion caisse d'assurance sociale (~3,05 % moyenne)
export const BE_INASTI_FRAIS_GESTION = 0.0305;

// ─────────────────────────────────────────────────────────────
// Pension légale Belgique (1er pilier) — SFPD / INASTI 2026
// ─────────────────────────────────────────────────────────────
// Formule générale : pension = (salaire moyen revalorisé × taux × années cotisées) / 45
// Taux : 60 % isolé / 75 % taux ménage (si conjoint à charge)
export const BE_PENSION_TAUX_ISOLE = 0.6;
export const BE_PENSION_TAUX_MENAGE = 0.75;
export const BE_PENSION_CARRIERE_COMPLETE = 45; // 45 ans de carrière
// Plafond salarial annuel pris en compte pour le calcul (2026, estimé)
export const BE_PENSION_PLAFOND_SALARIAL = 74668;
// Pension minimum 2026 (GRAPA + minimum légal complément) pour carrière complète
// Source : SFPD — Service fédéral des Pensions, barèmes 01/2026
export const BE_PENSION_MIN_ISOLE_MENSUEL = 1738; // €/mois isolé carrière complète
export const BE_PENSION_MIN_MENAGE_MENSUEL = 2172; // €/mois taux ménage carrière complète
// Pension maximum 2026 (approximation salarié carrière complète plein plafond)
export const BE_PENSION_MAX_ISOLE_MENSUEL = 3150;

// Épargne-pension (3e pilier) — plafonds 2026, SPF Finances
// Deux régimes fiscaux au choix du contribuable :
// - 30 % de réduction d'impôt sur max 1 020 €/an (plafond ordinaire 2026)
// - 25 % de réduction d'impôt sur max 1 310 €/an (plafond majoré 2026)
export const BE_EPARGNE_PENSION_PLAFOND_ORDINAIRE = 1020;
export const BE_EPARGNE_PENSION_REDUCTION_ORDINAIRE = 0.3;
export const BE_EPARGNE_PENSION_PLAFOND_MAJORE = 1310;
export const BE_EPARGNE_PENSION_REDUCTION_MAJOREE = 0.25;

// ─────────────────────────────────────────────────────────────
// Précompte mobilier — revenus de capitaux (intérêts, dividendes) 2026
// Source : SPF Finances, art. 269 CIR 92
// ─────────────────────────────────────────────────────────────
export const BE_PRECOMPTE_MOBILIER_STANDARD = 0.3; // 30 % régime ordinaire
// Livret/compte d'épargne réglementé : exonération partielle 2026
// Exonération des intérêts jusqu'à 1 020 € (avis publication SPF Finances 2026)
// Au-delà : précompte mobilier réduit de 15 %
export const BE_LIVRET_EXONERATION_INTERETS = 1020;
export const BE_LIVRET_PRECOMPTE_AU_DELA = 0.15;
// Branche 21 — assurance-vie épargne : taxe prime 2 % + rendement garanti + participation bénéficiaire
export const BE_BRANCHE_21_TAXE_PRIME = 0.02;
// Précompte mobilier VVPR-bis (régime privilégié PME pour dividendes)
// Art. 269, § 2 CIR 92 — conditions : petite société, apports en numéraire après 01/07/2013,
// bénéfices mis en réserve 2 années au moins, SRL/SA
export const BE_VVPR_BIS_2E_EXERCICE = 0.2; // 20 % dividende 2e exercice après apport
export const BE_VVPR_BIS_3E_EXERCICE = 0.15; // 15 % dividende 3e exercice et suivants

// ─────────────────────────────────────────────────────────────
// Impôt des sociétés (IS) Belgique 2026
// Source : SPF Finances, art. 215 CIR 92
// ─────────────────────────────────────────────────────────────
export const BE_IS_TAUX_PME = 0.2; // 20 % tranche ≤ 100 000 € pour les PME (petite société art. 1:24 CSA)
export const BE_IS_TAUX_NORMAL = 0.25; // 25 % au-delà de 100 000 € / grandes sociétés
export const BE_IS_PLAFOND_PME = 100000;

// ─────────────────────────────────────────────────────────────
// Indemnités kilométriques Belgique 2026
// Sources : Circulaire SPF Finances 2026/C/13 ; arrêté fonctionnaires fédéraux
// ─────────────────────────────────────────────────────────────
// Indemnité forfaitaire pour déplacements professionnels (fonctionnaire / usage référence)
// Taux 01/07/2025 → 30/06/2026 : 0,4297 €/km (indexation trimestrielle)
// Taux moyen 2026 retenu : 0,4246 €/km
export const BE_BAREME_KM_FORFAIT_PRO = 0.4246;
// Déplacement domicile-travail : forfait IPP (déduction fiscale) max 0,15 €/km
export const BE_BAREME_KM_DOMICILE_TRAVAIL_FISCAL = 0.15;
// Indemnité vélo domicile-travail 2026 (CCT 164 + arrêté royal 2023 : 0,35 €/km, plafond 2 500 km/an)
export const BE_BAREME_KM_VELO = 0.35;
export const BE_BAREME_KM_VELO_PLAFOND_KM = 2500;

// Cotisation ONSS dirigeant d'entreprise (assimilé indépendant)
// Les dirigeants d'entreprise sont soumis au régime INASTI, PAS à l'ONSS 13,07 %
// Taux global approximatif sur rémunération annuelle : utilisation des paliers INASTI ci-dessus

