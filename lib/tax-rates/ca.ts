import type { TaxBracket } from "../types";

export const CA_YEAR = 2026;

// ─────────────────────────────────────────────────────────────
// Régime de rentes du Québec (RRQ) — 2026
// Sources : retraitequebec.gouv.qc.ca, revenuquebec.ca
// Québec applique le RRQ (équivalent CPP fédéral)
// Taux de base employé : 6,40 % sur la partie de 3 500 $ à MGA 71 300 $
// Taux supplémentaire RRQ2 : 4,00 % sur MGA-MGAP₂ (81 200 $ 2026)
// ─────────────────────────────────────────────────────────────
export const CA_QC_RRQ_EXEMPTION_BASE = 3500; // exemption générale
export const CA_QC_RRQ_MGA = 71300; // maximum gains admissibles 2026
export const CA_QC_RRQ_MGA_SUPPLEMENTAIRE = 81200; // MGAP₂ 2026 (supplémentaire)
export const CA_QC_RRQ_TAUX_BASE_EMPLOYE = 0.064; // 6,4 %
export const CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_EMPLOYE = 0.04; // 4,0 %
export const CA_QC_RRQ_TAUX_BASE_AUTONOME = 0.128; // 12,8 % (2 parts)
export const CA_QC_RRQ_TAUX_SUPPLEMENTAIRE_AUTONOME = 0.08; // 8,0 %

// ─────────────────────────────────────────────────────────────
// Assurance-emploi (AE) 2026 — taux réduit au Québec (RQAP)
// Source : canada.ca/fr/agence-revenu/services/impot/entreprises
// ─────────────────────────────────────────────────────────────
export const CA_AE_TAUX_QC = 0.0131; // 1,31 % (taux réduit Québec 2026)
export const CA_AE_TAUX_HORS_QC = 0.0163; // 1,63 % ailleurs au Canada
export const CA_AE_MAX_ASSURABLE = 65700; // $ / an 2026

// ─────────────────────────────────────────────────────────────
// Régime québécois d'assurance parentale (RQAP) 2026
// Source : rqap.gouv.qc.ca
// ─────────────────────────────────────────────────────────────
export const CA_QC_RQAP_TAUX_EMPLOYE = 0.00494; // 0,494 %
export const CA_QC_RQAP_TAUX_EMPLOYEUR = 0.00692; // 0,692 %
export const CA_QC_RQAP_TAUX_AUTONOME = 0.00878; // 0,878 %
export const CA_QC_RQAP_MAX_ASSURABLE = 94000; // $ / an 2026

// ─────────────────────────────────────────────────────────────
// Fonds des services de santé du Québec (FSS) 2026
// Contribution santé sur revenus autres que salaires.
// Pour les particuliers : si revenu net > 17 183 $ alors 1 % du dépassement, plafond 1 000 $.
// Source : revenuquebec.ca
// ─────────────────────────────────────────────────────────────
export const CA_QC_FSS_SEUIL = 17183;
export const CA_QC_FSS_TAUX = 0.01;
export const CA_QC_FSS_PLAFOND = 1000;

// ─────────────────────────────────────────────────────────────
// Impôt fédéral canadien — Barème 2026 (particuliers)
// Source : canada.ca/fr/agence-revenu/services/impot/particuliers
// 5 tranches. L'abattement Québec réduit l'impôt fédéral de 16,5 %.
// ─────────────────────────────────────────────────────────────
export const CA_FED_BAREME: TaxBracket[] = [
  { min: 0, max: 57375, rate: 0.15 },
  { min: 57375, max: 114750, rate: 0.205 },
  { min: 114750, max: 177882, rate: 0.26 },
  { min: 177882, max: 253414, rate: 0.29 },
  { min: 253414, max: Number.POSITIVE_INFINITY, rate: 0.33 },
];
// Abattement Québec appliqué à l'impôt fédéral (remboursement 16,5 %)
export const CA_FED_ABATTEMENT_QC = 0.165;
// Crédit personnel de base fédéral 2026
export const CA_FED_CREDIT_BASE = 16129;
// Taux du crédit d'impôt non remboursable fédéral (plancher)
export const CA_FED_TAUX_CREDIT = 0.15;

// ─────────────────────────────────────────────────────────────
// Impôt du Québec — Barème 2026 (particuliers)
// Source : revenuquebec.ca — Impôt sur le revenu des particuliers
// 4 tranches progressives
// ─────────────────────────────────────────────────────────────
export const CA_QC_BAREME: TaxBracket[] = [
  { min: 0, max: 53255, rate: 0.14 },
  { min: 53255, max: 106495, rate: 0.19 },
  { min: 106495, max: 129590, rate: 0.24 },
  { min: 129590, max: Number.POSITIVE_INFINITY, rate: 0.2575 },
];
// Crédit personnel de base Québec 2026
export const CA_QC_CREDIT_BASE = 18571;
// Taux crédit d'impôt Québec (plancher applicable aux montants personnels)
export const CA_QC_TAUX_CREDIT = 0.14;

// ─────────────────────────────────────────────────────────────
// Crédits conjoint / personne à charge / enfant 2026
// ─────────────────────────────────────────────────────────────
export const CA_FED_CREDIT_CONJOINT = 16129;
export const CA_FED_CREDIT_ENFANT = 2616; // crédit canadien pour enfants (approximation)
export const CA_QC_CREDIT_CONJOINT = 18571;
export const CA_QC_CREDIT_ENFANT = 3000; // Montant pour enfant mineur à charge (approximation)

// ─────────────────────────────────────────────────────────────
// REER / CELI 2026
// Source : canada.ca
// ─────────────────────────────────────────────────────────────
export const CA_REER_TAUX_REVENU = 0.18; // 18 % du revenu gagné
export const CA_REER_PLAFOND = 32490; // $ / an 2026
export const CA_CELI_PLAFOND_ANNUEL = 7000; // $ / an 2026
export const CA_CELI_PLAFOND_CUMULATIF = 102000; // $ cumulatif depuis 2009

// ─────────────────────────────────────────────────────────────
// Pension (régime universel)
// RRQ rente max mensuelle — 65 ans, carrière pleine 2026
// PSV (Pension sécurité vieillesse) et SRG
// ─────────────────────────────────────────────────────────────
export const CA_QC_RRQ_RENTE_MAX_MENSUELLE = 1433; // $ / mois 2026 (retraite 65 ans)
export const CA_PSV_MENSUELLE_65_74 = 734; // $ / mois 2026
export const CA_PSV_MENSUELLE_75_PLUS = 808; // $ / mois 2026
export const CA_SRG_PERSONNE_SEULE_MAX = 1098; // $ / mois 2026 (célibataire)
export const CA_SRG_COUPLE_MAX = 661; // $ / mois 2026 (chacun, conjoint reçoit PSV)
// Récupération PSV (clawback) — seuil 2026
export const CA_PSV_SEUIL_RECUP = 93454;
export const CA_PSV_TAUX_RECUP = 0.15;

// ─────────────────────────────────────────────────────────────
// Prêt hypothécaire canadien — règles SCHL 2026
// Source : cmhc-schl.gc.ca
// ─────────────────────────────────────────────────────────────
export const CA_HYPO_MISE_MIN_TRANCHE1 = 0.05; // 5 % sur premier 500 000 $
export const CA_HYPO_MISE_MIN_TRANCHE1_PLAFOND = 500000;
export const CA_HYPO_MISE_MIN_TRANCHE2 = 0.1; // 10 % entre 500 000 et 1 000 000
export const CA_HYPO_MISE_MIN_TRANCHE2_PLAFOND = 1000000;
export const CA_HYPO_MISE_MIN_TRANCHE3 = 0.2; // 20 % >= 1 000 000
export const CA_HYPO_AMORTISSEMENT_MAX_ASSURE = 25; // ans si prêt assuré SCHL
export const CA_HYPO_AMORTISSEMENT_MAX_CONV = 30; // ans si conventionnel (20 % mise)
export const CA_HYPO_TAUX_STRESS_PLANCHER = 0.0525; // 5,25 % plancher test de stress

// Prime SCHL selon ratio prêt/valeur (LTV)
export interface CASCHLPrime {
  ltvMin: number;
  ltvMax: number;
  prime: number; // % du prêt
}
export const CA_HYPO_PRIME_SCHL: CASCHLPrime[] = [
  { ltvMin: 0, ltvMax: 0.65, prime: 0.006 }, // 0,6 %
  { ltvMin: 0.65, ltvMax: 0.75, prime: 0.017 },
  { ltvMin: 0.75, ltvMax: 0.8, prime: 0.024 },
  { ltvMin: 0.8, ltvMax: 0.85, prime: 0.028 },
  { ltvMin: 0.85, ltvMax: 0.9, prime: 0.031 },
  { ltvMin: 0.9, ltvMax: 0.95, prime: 0.04 },
];

// ─────────────────────────────────────────────────────────────
// Plus-value immobilière — Gain en capital 2026
// Le taux d'inclusion est revenu à 50 % (gouvernement Carney 2026)
// Résidence principale exonérée.
// ─────────────────────────────────────────────────────────────
export const CA_GAIN_CAPITAL_INCLUSION = 0.5; // 50 % imposable

// ─────────────────────────────────────────────────────────────
// Barème kilométrique ARC 2026 — Indemnité pour véhicule personnel
// Source : canada.ca/fr/agence-revenu
// ─────────────────────────────────────────────────────────────
export const CA_KM_TAUX_TRANCHE1 = 0.72; // $ / km premiers 5 000 km
export const CA_KM_SEUIL_TRANCHE = 5000;
export const CA_KM_TAUX_TRANCHE2 = 0.66; // $ / km au-delà

// ─────────────────────────────────────────────────────────────
// Droits de mutation immobilière du Québec — « Taxe de bienvenue »
// Loi concernant les droits sur les mutations immobilières
// Barème légal 2026 — seuils ajustés au 1er janvier
// Source : Éducaloi / MAMH
// ─────────────────────────────────────────────────────────────
export interface CAMutationPalier {
  min: number;
  max: number;
  taux: number;
}
// Barème légal de base (toute municipalité)
export const CA_QC_MUTATION_BAREME_BASE: CAMutationPalier[] = [
  { min: 0, max: 58900, taux: 0.005 },
  { min: 58900, max: 294600, taux: 0.01 },
  { min: 294600, max: Number.POSITIVE_INFINITY, taux: 0.015 },
];

// Barèmes municipaux spécifiques (Montréal, Québec, Laval)
// Montréal ajoute des tranches supérieures au-delà du barème légal
export type CAMunicipalite = "montreal" | "quebec" | "laval" | "autre";
export const CA_MUNICIPALITE_LABEL: Record<CAMunicipalite, string> = {
  montreal: "Montréal",
  quebec: "Ville de Québec",
  laval: "Laval",
  autre: "Autre municipalité",
};

// Montréal : au-delà de 500 000 $ les tranches municipales prennent le relais
export const CA_QC_MUTATION_MONTREAL: CAMutationPalier[] = [
  { min: 0, max: 58900, taux: 0.005 },
  { min: 58900, max: 294600, taux: 0.01 },
  { min: 294600, max: 500000, taux: 0.015 },
  { min: 500000, max: 1000000, taux: 0.02 },
  { min: 1000000, max: 2000000, taux: 0.025 },
  { min: 2000000, max: 3000000, taux: 0.035 },
  { min: 3000000, max: Number.POSITIVE_INFINITY, taux: 0.04 },
];

// Québec (ville) et Laval suivent le barème légal mais peuvent imposer
// une tranche supérieure au-delà de 500 000 $ (max autorisé 3 %)
export const CA_QC_MUTATION_QUEBEC: CAMutationPalier[] = [
  { min: 0, max: 58900, taux: 0.005 },
  { min: 58900, max: 294600, taux: 0.01 },
  { min: 294600, max: 500000, taux: 0.015 },
  { min: 500000, max: Number.POSITIVE_INFINITY, taux: 0.03 },
];

export const CA_QC_MUTATION_LAVAL: CAMutationPalier[] = [
  { min: 0, max: 58900, taux: 0.005 },
  { min: 58900, max: 294600, taux: 0.01 },
  { min: 294600, max: 500000, taux: 0.015 },
  { min: 500000, max: Number.POSITIVE_INFINITY, taux: 0.03 },
];

export const CA_QC_MUTATION_AUTRE: CAMutationPalier[] = CA_QC_MUTATION_BAREME_BASE;

export function getMutationBareme(mun: CAMunicipalite): CAMutationPalier[] {
  if (mun === "montreal") return CA_QC_MUTATION_MONTREAL;
  if (mun === "quebec") return CA_QC_MUTATION_QUEBEC;
  if (mun === "laval") return CA_QC_MUTATION_LAVAL;
  return CA_QC_MUTATION_AUTRE;
}

// ─────────────────────────────────────────────────────────────
// Impôt sur les sociétés (SPCC — Petite Entreprise) 2026
// Source : canada.ca et revenuquebec.ca
// ─────────────────────────────────────────────────────────────
export const CA_IS_SPCC_FEDERAL = 0.09; // 9 % fédéral petite entreprise
export const CA_IS_SPCC_QC = 0.032; // 3,2 % Québec petite entreprise
export const CA_IS_SPCC_TOTAL = 0.122; // combiné
export const CA_IS_SPCC_PLAFOND = 500000; // $ 1ère tranche

// Impôt société général (au-delà du plafond SPCC)
export const CA_IS_GENERAL_FEDERAL = 0.15;
export const CA_IS_GENERAL_QC = 0.1175;
export const CA_IS_GENERAL_TOTAL = 0.2675;

// ─────────────────────────────────────────────────────────────
// Dividendes — majorations et crédits d'impôt 2026
// Déterminé : GRIP (entreprise publique) — majoration 38 %
// Ordinaire : LRIP (SPCC) — majoration 15 %
// ─────────────────────────────────────────────────────────────
export const CA_DIV_DETERMINE_MAJORATION = 0.38;
export const CA_DIV_DETERMINE_CREDIT_FED = 0.1502; // 15,02 %
export const CA_DIV_DETERMINE_CREDIT_QC = 0.117; // 11,7 %

export const CA_DIV_ORDINAIRE_MAJORATION = 0.15;
export const CA_DIV_ORDINAIRE_CREDIT_FED = 0.0903; // 9,03 %
export const CA_DIV_ORDINAIRE_CREDIT_QC = 0.0342; // 3,42 %

// ─────────────────────────────────────────────────────────────
// TPS / TVQ 2026
// ─────────────────────────────────────────────────────────────
export const CA_TPS_TAUX = 0.05; // 5 %
export const CA_QC_TVQ_TAUX = 0.09975; // 9,975 %
export const CA_TVQ_SEUIL_INSCRIPTION = 30000; // $ CA 4 trimestres glissants
