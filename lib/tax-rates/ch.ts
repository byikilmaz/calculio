import type { TaxBracket } from "../types";

export const CH_YEAR = 2026;

// ─────────────────────────────────────────────────────────────
// 1er pilier — AVS / AI / APG 2026
// Source : admin.ch (OFAS) — taux inchangés depuis 2020 côté employé/employeur
// Taux global salarié : 5,3 % (AVS 4,35 % + AI 0,7 % + APG 0,25 %)
// Même taux côté employeur (total 10,6 %)
// ─────────────────────────────────────────────────────────────
export const CH_AVS_AI_APG_SALARIE = 0.053;
export const CH_AVS_AI_APG_EMPLOYEUR = 0.053;
export const CH_AVS_AI_APG_INDEPENDANT = 0.1; // 10 % sur bénéfice (taux plein)
// Revenu annuel minimal pour indépendants (cotisation minimum obligatoire)
export const CH_AVS_INDEPENDANT_SEUIL_MIN = 514; // CHF/an 2026
// Plafond d'assurance pour calcul de la rente (revenu déterminant)
export const CH_AVS_PLAFOND_RENTE = 88200; // CHF/an 2026

// ─────────────────────────────────────────────────────────────
// Assurance chômage (AC / LACI) 2026
// Source : SECO, LACI
// Taux salarié : 1,1 % jusqu'au plafond LACI, 0 % au-delà
// (supprimée la surcotisation solidarité en 2023, donc plafond simple)
// ─────────────────────────────────────────────────────────────
export const CH_AC_TAUX = 0.011;
export const CH_AC_PLAFOND = 148200; // CHF/an 2026

// ─────────────────────────────────────────────────────────────
// 2e pilier — LPP (prévoyance professionnelle obligatoire) 2026
// Source : OFAS, LPP art. 7 et 8
// Seuil d'entrée, déduction de coordination, limite supérieure
// ─────────────────────────────────────────────────────────────
export const CH_LPP_SEUIL_ENTREE = 22680; // CHF/an 2026 (3/4 rente AVS max)
export const CH_LPP_DEDUCTION_COORD = 26460; // CHF/an 2026 (7/8 rente AVS max)
export const CH_LPP_SALAIRE_MAX = 90720; // CHF/an 2026 (plafond LPP obligatoire)
// Taux bonifications LPP par classe d'âge (employé + employeur = taux total)
// Les cotisations sont réparties moitié-moitié par défaut ; on retient ici le total.
export const CH_LPP_TAUX_AGE: { min: number; max: number; taux: number }[] = [
  { min: 25, max: 34, taux: 0.07 },
  { min: 35, max: 44, taux: 0.1 },
  { min: 45, max: 54, taux: 0.15 },
  { min: 55, max: 64, taux: 0.18 },
];

// ─────────────────────────────────────────────────────────────
// 3e pilier A (prévoyance individuelle liée) — plafonds 2026
// Source : OFAS, art. 7 OPP 3
// ─────────────────────────────────────────────────────────────
export const CH_PILIER_3A_SALARIE = 7258; // CHF/an 2026 (affilié à une caisse LPP)
export const CH_PILIER_3A_INDEPENDANT_PCT = 0.2; // 20 % du revenu net
export const CH_PILIER_3A_INDEPENDANT_PLAFOND = 36288; // CHF/an 2026 (plafond absolu)

// ─────────────────────────────────────────────────────────────
// IFD (Impôt fédéral direct) — barème 2026 personnes physiques
// Source : estv.admin.ch, LIFD art. 36
// Barèmes simplifiés célibataire / marié (mariés bénéficient d'un splitting via barème séparé)
// Plafond progressif 11,5 %
// ─────────────────────────────────────────────────────────────
export const CH_IFD_BAREME_CELIBATAIRE: TaxBracket[] = [
  { min: 0, max: 15200, rate: 0 },
  { min: 15200, max: 33200, rate: 0.0077 },
  { min: 33200, max: 43500, rate: 0.0088 },
  { min: 43500, max: 58000, rate: 0.0264 },
  { min: 58000, max: 76100, rate: 0.0297 },
  { min: 76100, max: 82000, rate: 0.0594 },
  { min: 82000, max: 108800, rate: 0.066 },
  { min: 108800, max: 141500, rate: 0.088 },
  { min: 141500, max: 184700, rate: 0.11 },
  { min: 184700, max: 793300, rate: 0.132 }, // taux marginal max
  { min: 793300, max: Number.POSITIVE_INFINITY, rate: 0.115 }, // plafond 11,5 %
];
// Pour couple marié, IFD applique un barème séparé (art. 36a LIFD)
export const CH_IFD_BAREME_MARIE: TaxBracket[] = [
  { min: 0, max: 30800, rate: 0 },
  { min: 30800, max: 50900, rate: 0.01 },
  { min: 50900, max: 58400, rate: 0.02 },
  { min: 58400, max: 75300, rate: 0.03 },
  { min: 75300, max: 90300, rate: 0.04 },
  { min: 90300, max: 103400, rate: 0.05 },
  { min: 103400, max: 114700, rate: 0.06 },
  { min: 114700, max: 124200, rate: 0.07 },
  { min: 124200, max: 131700, rate: 0.08 },
  { min: 131700, max: 137300, rate: 0.09 },
  { min: 137300, max: 141200, rate: 0.1 },
  { min: 141200, max: 143100, rate: 0.11 },
  { min: 143100, max: 145000, rate: 0.12 },
  { min: 145000, max: 895800, rate: 0.13 },
  { min: 895800, max: Number.POSITIVE_INFINITY, rate: 0.115 },
];

// ─────────────────────────────────────────────────────────────
// Impôt cantonal + communal — barèmes simplifiés 2026
// (moyenne observée avec coefficient communal moyen)
// Sources : administrations fiscales cantonales VD, GE, VS, FR, NE, JU, BE
// Ces barèmes produisent l'impôt cantonal de base (coefficient 1) ;
// on applique ensuite le coefficient cantonal puis communal pour la charge totale.
// ─────────────────────────────────────────────────────────────
export type CHCanton = "VD" | "GE" | "VS" | "FR" | "NE" | "JU" | "BE";

export const CH_CANTON_LABEL: Record<CHCanton, string> = {
  VD: "Vaud",
  GE: "Genève",
  VS: "Valais",
  FR: "Fribourg",
  NE: "Neuchâtel",
  JU: "Jura",
  BE: "Berne",
};

// Barème cantonal de base (impôt cantonal simple, célibataire)
// Simplifié à 5 paliers progressifs représentatifs
export const CH_CANTON_BAREME: Record<CHCanton, TaxBracket[]> = {
  VD: [
    { min: 0, max: 17500, rate: 0 },
    { min: 17500, max: 33000, rate: 0.01 },
    { min: 33000, max: 55000, rate: 0.05 },
    { min: 55000, max: 100000, rate: 0.08 },
    { min: 100000, max: 200000, rate: 0.115 },
    { min: 200000, max: Number.POSITIVE_INFINITY, rate: 0.155 },
  ],
  GE: [
    { min: 0, max: 18100, rate: 0 },
    { min: 18100, max: 40000, rate: 0.02 },
    { min: 40000, max: 75000, rate: 0.07 },
    { min: 75000, max: 140000, rate: 0.12 },
    { min: 140000, max: 260000, rate: 0.15 },
    { min: 260000, max: Number.POSITIVE_INFINITY, rate: 0.19 },
  ],
  VS: [
    { min: 0, max: 14700, rate: 0 },
    { min: 14700, max: 29700, rate: 0.01 },
    { min: 29700, max: 55000, rate: 0.05 },
    { min: 55000, max: 100000, rate: 0.09 },
    { min: 100000, max: 200000, rate: 0.12 },
    { min: 200000, max: Number.POSITIVE_INFINITY, rate: 0.14 },
  ],
  FR: [
    { min: 0, max: 14000, rate: 0 },
    { min: 14000, max: 32000, rate: 0.02 },
    { min: 32000, max: 60000, rate: 0.06 },
    { min: 60000, max: 110000, rate: 0.09 },
    { min: 110000, max: 200000, rate: 0.12 },
    { min: 200000, max: Number.POSITIVE_INFINITY, rate: 0.1375 },
  ],
  NE: [
    { min: 0, max: 13000, rate: 0 },
    { min: 13000, max: 30000, rate: 0.02 },
    { min: 30000, max: 60000, rate: 0.07 },
    { min: 60000, max: 120000, rate: 0.1 },
    { min: 120000, max: 220000, rate: 0.13 },
    { min: 220000, max: Number.POSITIVE_INFINITY, rate: 0.15 },
  ],
  JU: [
    { min: 0, max: 15000, rate: 0 },
    { min: 15000, max: 35000, rate: 0.02 },
    { min: 35000, max: 65000, rate: 0.06 },
    { min: 65000, max: 120000, rate: 0.09 },
    { min: 120000, max: 220000, rate: 0.11 },
    { min: 220000, max: Number.POSITIVE_INFINITY, rate: 0.13 },
  ],
  BE: [
    { min: 0, max: 16300, rate: 0 },
    { min: 16300, max: 32000, rate: 0.016 },
    { min: 32000, max: 60000, rate: 0.05 },
    { min: 60000, max: 110000, rate: 0.08 },
    { min: 110000, max: 200000, rate: 0.11 },
    { min: 200000, max: Number.POSITIVE_INFINITY, rate: 0.131 },
  ],
};

// Coefficient cantonal appliqué sur l'impôt de base (multiplicateur 2026)
// Source : rapports administratifs cantonaux
export const CH_CANTON_COEFFICIENT: Record<CHCanton, number> = {
  VD: 1.545,
  GE: 1.0,
  VS: 1.55,
  FR: 1.0,
  NE: 1.41,
  JU: 2.85,
  BE: 3.02,
};

// Coefficient communal moyen (en pourcentage de l'impôt cantonal de base)
// Moyenne pondérée observée par canton (souvent ≈ 70-80 % de la charge cantonale)
export const CH_COMMUNE_COEFFICIENT_MOYEN: Record<CHCanton, number> = {
  VD: 0.75,
  GE: 0.455,
  VS: 1.1,
  FR: 0.813,
  NE: 0.65,
  JU: 2.0,
  BE: 1.54,
};

// Déductions personnelles simplifiées (abattement pour déterminer revenu imposable)
// Célibataire / marié / par enfant
export const CH_DEDUCTIONS_PERSONNELLES: Record<
  CHCanton,
  { celibataire: number; marie: number; parEnfant: number }
> = {
  VD: { celibataire: 0, marie: 2600, parEnfant: 3600 },
  GE: { celibataire: 0, marie: 28500, parEnfant: 13000 },
  VS: { celibataire: 0, marie: 7100, parEnfant: 8150 },
  FR: { celibataire: 0, marie: 2800, parEnfant: 8500 },
  NE: { celibataire: 0, marie: 3600, parEnfant: 6500 },
  JU: { celibataire: 0, marie: 3500, parEnfant: 5300 },
  BE: { celibataire: 0, marie: 5400, parEnfant: 8000 },
};

// Déduction IFD pour enfant à charge (2026)
export const CH_IFD_DEDUCTION_ENFANT = 6700;
// Déduction IFD pour couple marié (2026)
export const CH_IFD_DEDUCTION_MARIE = 2800;

// ─────────────────────────────────────────────────────────────
// Droits de mutation / enregistrement immobilier (transferts de propriété)
// Source : administrations cantonales (Offices des impôts)
// Taux moyen acheteur, souvent moitié acheteur / moitié vendeur selon canton
// ─────────────────────────────────────────────────────────────
export const CH_DROITS_MUTATION: Record<CHCanton, number> = {
  VD: 0.022, // Vaud : 2,2 % (droit simple) + émoluments communaux jusqu'à 3,3 %
  GE: 0.03, // Genève : 3 % + émoluments
  VS: 0.015, // Valais : 1,5 % (résidence principale) à 2,5 %
  FR: 0.015, // Fribourg : 1,5 % + émoluments
  NE: 0.033, // Neuchâtel : lods 3,3 %
  JU: 0.021, // Jura : 2,1 %
  BE: 0.018, // Berne : 1,8 %
};

// Émoluments notaire (approximation : 0,1-0,5 % du prix selon canton)
export const CH_NOTAIRE_HONORAIRES_TAUX = 0.003; // 0,3 % moyenne
// Frais registre foncier (inscription + émoluments de l'autorité)
export const CH_RF_FRAIS_TAUX = 0.002; // 0,2 % moyenne
// TVA suisse 2026 — relevée au 1er janvier 2024 à 8,1 %
export const CH_TVA_NORMALE = 0.081;

// ─────────────────────────────────────────────────────────────
// Impôt sur les gains immobiliers (compétence cantonale)
// Barèmes dégressifs selon la durée de détention — 2026
// Source : LCP cantonales (VD, GE, VS, FR, NE, JU, BE)
// ─────────────────────────────────────────────────────────────
export interface CHGainImmoPalier {
  dureeMin: number; // nombre d'années de détention ≥
  taux: number; // taux sur le gain
}
export const CH_GAIN_IMMO_BAREME: Record<CHCanton, CHGainImmoPalier[]> = {
  VD: [
    { dureeMin: 0, taux: 0.3 },
    { dureeMin: 1, taux: 0.25 },
    { dureeMin: 4, taux: 0.18 },
    { dureeMin: 8, taux: 0.14 },
    { dureeMin: 12, taux: 0.11 },
    { dureeMin: 17, taux: 0.09 },
    { dureeMin: 24, taux: 0.07 },
  ],
  GE: [
    { dureeMin: 0, taux: 0.5 }, // < 2 ans
    { dureeMin: 2, taux: 0.4 },
    { dureeMin: 4, taux: 0.3 },
    { dureeMin: 6, taux: 0.2 },
    { dureeMin: 8, taux: 0.15 },
    { dureeMin: 10, taux: 0.1 },
    { dureeMin: 25, taux: 0 }, // exonération après 25 ans
  ],
  VS: [
    { dureeMin: 0, taux: 0.48 }, // < 2 ans
    { dureeMin: 2, taux: 0.3 },
    { dureeMin: 5, taux: 0.22 },
    { dureeMin: 10, taux: 0.16 },
    { dureeMin: 15, taux: 0.12 },
    { dureeMin: 25, taux: 0.08 },
  ],
  FR: [
    { dureeMin: 0, taux: 0.36 },
    { dureeMin: 2, taux: 0.28 },
    { dureeMin: 5, taux: 0.2 },
    { dureeMin: 10, taux: 0.14 },
    { dureeMin: 15, taux: 0.1 },
    { dureeMin: 25, taux: 0.06 },
  ],
  NE: [
    { dureeMin: 0, taux: 0.4 },
    { dureeMin: 2, taux: 0.3 },
    { dureeMin: 5, taux: 0.22 },
    { dureeMin: 10, taux: 0.15 },
    { dureeMin: 15, taux: 0.1 },
    { dureeMin: 25, taux: 0.05 },
  ],
  JU: [
    { dureeMin: 0, taux: 0.4 },
    { dureeMin: 2, taux: 0.3 },
    { dureeMin: 5, taux: 0.2 },
    { dureeMin: 10, taux: 0.12 },
    { dureeMin: 20, taux: 0.08 },
  ],
  BE: [
    { dureeMin: 0, taux: 0.4 },
    { dureeMin: 2, taux: 0.3 },
    { dureeMin: 5, taux: 0.2 },
    { dureeMin: 10, taux: 0.14 },
    { dureeMin: 15, taux: 0.1 },
    { dureeMin: 25, taux: 0.05 },
  ],
};

// ─────────────────────────────────────────────────────────────
// Droits de succession (compétence cantonale — pas d'impôt fédéral)
// Exonérations conjoint / descendants en ligne directe
// Source : lois cantonales sur les successions
// ─────────────────────────────────────────────────────────────
export type CHLienSuccession =
  | "conjoint"
  | "descendantDirect"
  | "ascendantDirect"
  | "frereSoeur"
  | "oncleNeveu"
  | "autre";

// Exonérations 2026 (true = exonéré dans ce canton pour ce lien)
export const CH_SUCCESSION_EXONERATIONS: Record<
  CHCanton,
  Partial<Record<CHLienSuccession, boolean>>
> = {
  VD: { conjoint: true, descendantDirect: true, ascendantDirect: false },
  GE: { conjoint: true, descendantDirect: false }, // GE : descendants imposés 0-6 %
  VS: { conjoint: true, descendantDirect: true },
  FR: { conjoint: true, descendantDirect: false }, // FR : descendants 0-15 % selon tranche
  NE: { conjoint: true, descendantDirect: false }, // NE : 3 % descendants
  JU: { conjoint: true, descendantDirect: false }, // JU : 7-14 % descendants
  BE: { conjoint: true, descendantDirect: true },
};

// Barème simplifié pour héritiers non exonérés (taux moyen appliqué à la part reçue)
// Structure : taux par lien et canton
export const CH_SUCCESSION_TAUX: Record<
  CHCanton,
  Partial<Record<CHLienSuccession, number>>
> = {
  VD: {
    frereSoeur: 0.1235, // 3,30 % à 12,35 % selon tranche
    oncleNeveu: 0.25,
    autre: 0.35,
  },
  GE: {
    descendantDirect: 0.03,
    ascendantDirect: 0.08,
    frereSoeur: 0.16,
    oncleNeveu: 0.24,
    autre: 0.54,
  },
  VS: {
    ascendantDirect: 0.1,
    frereSoeur: 0.15,
    oncleNeveu: 0.2,
    autre: 0.25,
  },
  FR: {
    descendantDirect: 0.05, // progressive 0-15 %, moyenne 5 %
    frereSoeur: 0.1485,
    oncleNeveu: 0.22,
    autre: 0.3525,
  },
  NE: {
    descendantDirect: 0.03,
    frereSoeur: 0.1,
    oncleNeveu: 0.15,
    autre: 0.45,
  },
  JU: {
    descendantDirect: 0.07,
    frereSoeur: 0.14,
    oncleNeveu: 0.22,
    autre: 0.35,
  },
  BE: {
    frereSoeur: 0.15,
    oncleNeveu: 0.26,
    autre: 0.4,
  },
};

// Abattement moyen sur part reçue (variable par canton)
export const CH_SUCCESSION_ABATTEMENT: Record<CHCanton, number> = {
  VD: 250000,
  GE: 0,
  VS: 10000,
  FR: 5000,
  NE: 50000,
  JU: 10000,
  BE: 12000,
};

// ─────────────────────────────────────────────────────────────
// Prêt hypothécaire : règles prudentielles suisses (FINMA / ASB)
// ─────────────────────────────────────────────────────────────
export const CH_HYPO_FONDS_PROPRES_MIN = 0.2; // 20 % dont
export const CH_HYPO_FONDS_PROPRES_DURS_MIN = 0.1; // 10 % "durs" hors 2e pilier
export const CH_HYPO_LTV_AMORTISSEMENT = 0.66; // LTV cible à atteindre en amortissement
export const CH_HYPO_AMORTISSEMENT_ANNEES = 15; // ou avant 65 ans
export const CH_HYPO_TAUX_THEORIQUE = 0.05; // 5 % taux théorique bancaire
export const CH_HYPO_ENTRETIEN_TAUX = 0.01; // 1 % de la valeur du bien / an
export const CH_HYPO_RATIO_CHARGES_MAX = 0.33; // 33 % du revenu brut

// ─────────────────────────────────────────────────────────────
// AVS — Rente 2026
// Source : OFAS, barèmes 01/2026 (rentes ordinaires)
// ─────────────────────────────────────────────────────────────
export const CH_AVS_RENTE_MAX_MENSUELLE = 2450; // CHF/mois rente individuelle max
export const CH_AVS_RENTE_MIN_MENSUELLE = 1225; // CHF/mois rente individuelle min
export const CH_AVS_RENTE_COUPLE_MAX = 3675; // CHF/mois plafond couple (150 % max individuelle)
export const CH_AVS_ANNEES_COTISATION_PLEINE = 44; // hommes et femmes dès 2028 (2026 : ~44)

// ─────────────────────────────────────────────────────────────
// Impôt sur les sociétés (IFD + cantonal) 2026
// Source : estv.admin.ch, admininistrations cantonales
// ─────────────────────────────────────────────────────────────
export const CH_IS_TAUX_FEDERAL = 0.085; // 8,5 % IFD sur bénéfice net
// Taux cantonal effectif moyen (combinant canton + commune + IFD)
// Source : Credit Suisse / KPMG Tax Rate Card 2026
export const CH_IS_TAUX_EFFECTIF_TOTAL: Record<CHCanton, number> = {
  VD: 0.14,
  GE: 0.14,
  VS: 0.135,
  FR: 0.1387,
  NE: 0.135,
  JU: 0.16,
  BE: 0.205,
};

// Taxation partielle des dividendes (participation ≥ 10 %)
// 70 % au niveau fédéral (toujours)
// 50-70 % au niveau cantonal selon canton
export const CH_DIVIDENDE_TAXATION_PARTIELLE_IFD = 0.7; // 70 % imposé
export const CH_DIVIDENDE_TAXATION_PARTIELLE_CANTON: Record<CHCanton, number> =
  {
    VD: 0.7, // Vaud : taxation à 70 %
    GE: 0.7, // Genève : 70 %
    VS: 0.6, // Valais : 60 %
    FR: 0.7, // Fribourg : 70 %
    NE: 0.6, // Neuchâtel : 60 %
    JU: 0.7, // Jura : 70 %
    BE: 0.5, // Berne : 50 %
  };

// Impôt anticipé (retenue à la source sur dividende) — 35 %, récupérable
export const CH_IMPOT_ANTICIPE = 0.35;
