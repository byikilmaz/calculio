import type { TaxBracket } from "../types";

export const LU_YEAR = 2026;

// ─────────────────────────────────────────────────────────────
// Cotisations sociales CCSS — Centre Commun de la Sécurité Sociale
// Source : ccss.lu — taux 2026 (part salarié)
// Pension : 8,00 %
// Maladie espèces : 2,80 %
// Maladie soins de santé : 0,25 %
// Dépendance : 1,40 % (sur revenu imposable, après abattement SSM)
// Total salarié cotisations "classiques" (hors dépendance) : 11,05 %
// Avec dépendance (approx sur brut) : 12,45 %
// ─────────────────────────────────────────────────────────────
export const LU_CCSS_PENSION = 0.08; // 8,00 %
export const LU_CCSS_MALADIE_ESPECES = 0.028; // 2,80 %
export const LU_CCSS_MALADIE_SOINS = 0.0025; // 0,25 %
export const LU_CCSS_DEPENDANCE = 0.014; // 1,40 %
export const LU_CCSS_TOTAL_SALARIE_HORS_DEPENDANCE = 0.1105; // 11,05 %

// Indépendants — même cotisations salarié + employeur (cumulées)
export const LU_CCSS_INDEP_PENSION = 0.16; // 16 %
export const LU_CCSS_INDEP_MALADIE_ESPECES = 0.0005; // 0,05 % (réduite pour indép.)
export const LU_CCSS_INDEP_MALADIE_SOINS = 0.0545; // 5,45 % (cumul salarié + employeur)
export const LU_CCSS_INDEP_ACCIDENT = 0.0082; // 0,82 % assurance accident
export const LU_CCSS_INDEP_MUTUALITE = 0.0081; // 0,81 % mutualité classe moyenne
export const LU_CCSS_INDEP_DEPENDANCE = 0.014; // 1,40 %

// Revenu social minimum (SSM) 2026 mensuel — salarié non qualifié 18 ans
export const LU_SSM_MENSUEL = 2708; // €/mois
export const LU_SSM_ANNUEL = LU_SSM_MENSUEL * 12; // 32 496 €/an
// Plafond cotisable sécurité sociale (5× SSM)
export const LU_CCSS_PLAFOND_MENSUEL = LU_SSM_MENSUEL * 5; // 13 540 €/mois
export const LU_CCSS_PLAFOND_ANNUEL = LU_CCSS_PLAFOND_MENSUEL * 12; // 162 480 €/an

// Abattement pour dépendance (≈ SSM/12 exonéré par mois) — assiette dépendance
// La contribution dépendance s'applique au revenu imposable APRÈS déduction de
// l'abattement SSM/4 par mois (environ 677 €/mois).
export const LU_DEPENDANCE_ABATTEMENT_MENSUEL = LU_SSM_MENSUEL / 4; // 677 €/mois
export const LU_DEPENDANCE_ABATTEMENT_ANNUEL = LU_DEPENDANCE_ABATTEMENT_MENSUEL * 12;

// ─────────────────────────────────────────────────────────────
// Impôt sur le revenu 2026 — barème progressif 23 tranches
// Source : impotsdirects.public.lu (LIR, barème applicable 2026 indexé)
// Les tranches ci-dessous correspondent au barème adapté 2026 (tranches 0 à 22)
// Taux marginal max 42 %
// ─────────────────────────────────────────────────────────────
export const LU_IR_BAREME: TaxBracket[] = [
  { min: 0, max: 12438, rate: 0 },
  { min: 12438, max: 14508, rate: 0.08 },
  { min: 14508, max: 16578, rate: 0.09 },
  { min: 16578, max: 18648, rate: 0.1 },
  { min: 18648, max: 20718, rate: 0.11 },
  { min: 20718, max: 22788, rate: 0.12 },
  { min: 22788, max: 24939, rate: 0.14 },
  { min: 24939, max: 27090, rate: 0.16 },
  { min: 27090, max: 29241, rate: 0.18 },
  { min: 29241, max: 31392, rate: 0.2 },
  { min: 31392, max: 33543, rate: 0.22 },
  { min: 33543, max: 35694, rate: 0.24 },
  { min: 35694, max: 37845, rate: 0.26 },
  { min: 37845, max: 39996, rate: 0.28 },
  { min: 39996, max: 42147, rate: 0.3 },
  { min: 42147, max: 44298, rate: 0.32 },
  { min: 44298, max: 46449, rate: 0.34 },
  { min: 46449, max: 48600, rate: 0.36 },
  { min: 48600, max: 50751, rate: 0.38 },
  { min: 50751, max: 110403, rate: 0.39 },
  { min: 110403, max: 165600, rate: 0.4 },
  { min: 165600, max: 234870, rate: 0.41 },
  { min: 234870, max: Number.POSITIVE_INFINITY, rate: 0.42 },
];

// Fonds pour l'emploi — majoration de l'impôt (ex-"impôt de solidarité")
// 7 % pour revenu imposable ≤ 150 000 € (célibataire) / 300 000 € (marié splitting)
// 9 % au-delà. On retient 7 % pour la majorité des cas.
export const LU_FONDS_EMPLOI_TAUX_BAS = 0.07;
export const LU_FONDS_EMPLOI_TAUX_HAUT = 0.09;
export const LU_FONDS_EMPLOI_SEUIL_CELIB = 150000;
export const LU_FONDS_EMPLOI_SEUIL_MARIE = 300000;

// ─────────────────────────────────────────────────────────────
// Classes d'impôt — Luxembourg
// 1 : célibataire sans enfant
// 1a : monoparental / veuf / > 64 ans (barème allégé)
// 2 : marié en splitting (division du revenu par 2)
// ─────────────────────────────────────────────────────────────
export type LUClasse = "1" | "1a" | "2";

// Crédits d'impôt — 2026
// CIS : Crédit d'Impôt Salarié — 600 €/an (ajusté)
export const LU_CIS = 600; // salarié
// CIM : Crédit d'Impôt Monoparental — ~2 505 €/an (classe 1a avec enfant)
export const LU_CIM = 2505; // monoparental
// CIR : Crédit d'Impôt Retraité
export const LU_CIR = 300;
// Crédit d'impôt Indépendant
export const LU_CII = 600;

// Abattement forfaitaire frais d'obtention (salarié)
export const LU_FRAIS_OBTENTION_FORFAIT = 540; // € / an
// Déplacements domicile-travail : forfait déductible
export const LU_FRAIS_DEPLACEMENT_MIN = 396; // €/an dès 4 km
// Abattement forfaitaire pour dépenses spéciales (DS-AF)
export const LU_DS_FORFAIT = 480; // €/an

// ─────────────────────────────────────────────────────────────
// Prêt immobilier — déduction intérêts (résidence principale)
// Plafond par membre du foyer (indexé 2026)
// Source : art. 98 LIR / guichet.lu
// ─────────────────────────────────────────────────────────────
export const LU_PRET_INTERETS_PLAFOND_0_5 = 3000; // €/an — 5 premières années
export const LU_PRET_INTERETS_PLAFOND_6_10 = 2250; // €/an — années 6 à 10
export const LU_PRET_INTERETS_PLAFOND_11_PLUS = 1500; // €/an — après 11 ans

// Bëllegen Akt — crédit d'impôt sur droits d'enregistrement (résidence principale)
// Prorogé jusqu'à fin 2027 — 40 000 € / personne
export const LU_BELLEGEN_AKT_MAX = 40000; // €/personne

// Droits d'enregistrement et transcription
export const LU_DROIT_ENREGISTREMENT = 0.06; // 6 %
export const LU_DROIT_TRANSCRIPTION = 0.01; // 1 %
export const LU_DROIT_TOTAL_BASE = 0.07; // 7 % total base

// Surcharge ville de Luxembourg — 3 % sur communes à forte densité
export const LU_DROIT_SURCHARGE_VILLE = 0.03;
export const LU_DROIT_SURCHARGE_SEUIL = 300000; // au-delà : surcharge

// Émoluments notaire et TVA
export const LU_NOTAIRE_EMOLUMENTS_TAUX = 0.008; // ~ 0,8 % du prix en moyenne
export const LU_TVA_NORMALE = 0.17; // 17 % TVA 2026
export const LU_NOTAIRE_DEBOURS_FORFAIT = 1000; // €

// ─────────────────────────────────────────────────────────────
// Pension CNAP — système unique 2026
// Source : cnap.lu
// Formule : majoration proportionnelle + majoration forfaitaire
// Proportionnelle : 1,775 % × moyenne des salaires × années cotisation
// Forfaitaire : 23,75 % × SSM × années / 40 (plafonné)
// ─────────────────────────────────────────────────────────────
export const LU_PENSION_TAUX_PROPORTIONNEL = 0.01775; // 1,775 %
export const LU_PENSION_TAUX_FORFAITAIRE = 0.2375; // 23,75 % du SSM
export const LU_PENSION_ANNEES_CARRIERE_MAX = 40;
export const LU_PENSION_MIN_MENSUEL = 1925; // €/mois 2026 (40 ans)
export const LU_PENSION_MAX_MENSUEL = 9628; // €/mois 2026 (plafond 5× SSM)
export const LU_AGE_LEGAL = 65;
export const LU_AGE_ANTICIPE_60 = 60; // avec 40 ans de cotisation
export const LU_AGE_ANTICIPE_57 = 57; // avec 40 ans dont carrière longue

// 3e pilier — assurance prévoyance-vieillesse art. 111bis LIR
// Déduction max par personne — 3 200 €/an (indépendamment de l'âge depuis 2017)
export const LU_PREVOYANCE_PLAFOND = 3200;

// ─────────────────────────────────────────────────────────────
// Épargne et revenus capitaux
// Source : art. 97 et 115 LIR
// ─────────────────────────────────────────────────────────────
export const LU_CAPITAUX_PRECOMPTE = 0.2; // 20 % sur intérêts (libératoire)
export const LU_CAPITAUX_EXONERATION_INTERETS = 1500; // €/an exonéré par personne
// Retrait capital prévoyance (art. 131) : 50 % imposable au taux demi-global + 50 % à 25 %
export const LU_PREVOYANCE_RETRAIT_PART_DEMI_GLOBAL = 0.5;
export const LU_PREVOYANCE_RETRAIT_PART_FLAT = 0.5;
export const LU_PREVOYANCE_RETRAIT_TAUX_FLAT = 0.25;

// ─────────────────────────────────────────────────────────────
// Plus-value immobilière 2026
// Résidence principale : exonération totale si occupation ≥ 5 ans
// Locatif : détention < 2 ans → taux plein / ≥ 2 ans → taux demi-global max 21 %
// ─────────────────────────────────────────────────────────────
export const LU_PV_SPECULATION_DUREE = 2; // < 2 ans = spéculation
export const LU_PV_DEMI_GLOBAL_MAX = 0.21; // 21 % (= 42/2) plafond demi-global
export const LU_PV_ABATTEMENT_PERSONNE = 50000; // €/personne
export const LU_PV_ABATTEMENT_RENOUVELLEMENT_ANS = 11;
// Abattement pour détention longue (≥ 11 ans)
export const LU_PV_ABATTEMENT_DETENTION_LONGUE = 75000; // supplémentaire

// ─────────────────────────────────────────────────────────────
// Droits de succession 2026
// Source : administration.gouvernement.lu (Enregistrement des domaines)
// Barèmes selon lien de parenté + surcharges selon montant
// ─────────────────────────────────────────────────────────────
export type LULienSuccession =
  | "epouxEnfantsCommuns"
  | "ligneDirecte"
  | "frereSoeur"
  | "oncleTante"
  | "neveuNiece"
  | "grandOncle"
  | "cousin"
  | "nonParent";

export const LU_SUCCESSION_LABEL: Record<LULienSuccession, string> = {
  epouxEnfantsCommuns: "Époux(se) avec enfants communs",
  ligneDirecte: "Ligne directe (enfants, parents)",
  frereSoeur: "Frère / sœur",
  oncleTante: "Oncle / tante",
  neveuNiece: "Neveu / nièce",
  grandOncle: "Grand-oncle / grande-tante",
  cousin: "Cousin(e)",
  nonParent: "Non-parent",
};

// Taux de base (sur part légale) — part extra-légale taxée plus haut
export const LU_SUCCESSION_TAUX_BASE: Record<LULienSuccession, number> = {
  epouxEnfantsCommuns: 0, // exonération totale
  ligneDirecte: 0, // part légale exonérée, 2,5 % sur extra-légal
  frereSoeur: 0.06, // 6 %
  oncleTante: 0.09, // 9 %
  neveuNiece: 0.09, // 9 %
  grandOncle: 0.1, // 10 %
  cousin: 0.1, // 10 %
  nonParent: 0.15, // 15 % base
};

export const LU_SUCCESSION_TAUX_EXTRA: Record<LULienSuccession, number> = {
  epouxEnfantsCommuns: 0,
  ligneDirecte: 0.025, // 2,5 % sur extra-légal
  frereSoeur: 0.15, // 15 %
  oncleTante: 0.12, // 12 %
  neveuNiece: 0.12, // 12 %
  grandOncle: 0.13, // 13 %
  cousin: 0.15, // 15 %
  nonParent: 0.15,
};

// Surcharges selon montant (majoration appliquée au taux de base)
export interface LUSuccessionSurcharge {
  seuil: number; // montant reçu déclenchant la surcharge
  majoration: number; // % d'augmentation du taux
}
export const LU_SUCCESSION_SURCHARGES: LUSuccessionSurcharge[] = [
  { seuil: 10000, majoration: 0.1 },
  { seuil: 20000, majoration: 0.2 },
  { seuil: 40000, majoration: 0.3 },
  { seuil: 100000, majoration: 0.4 },
  { seuil: 200000, majoration: 0.5 },
  { seuil: 500000, majoration: 0.7 },
  { seuil: 1000000, majoration: 0.9 },
];

// Exonération sur part légale (enfants, conjoint)
export const LU_SUCCESSION_EXONERATION_PART_LEGALE = true;

// ─────────────────────────────────────────────────────────────
// Impôt sur les sociétés (IS) 2026
// Source : impotsdirects.public.lu
// IS : 17 % (>200 k€), 15 % (<175 k€), progressif entre les deux
// + Fonds emploi 7 % de l'IS
// + ICC (impôt commercial communal) : Luxembourg ville 6,75 % effectif
// ─────────────────────────────────────────────────────────────
export const LU_IS_TAUX = 0.17; // 17 % au-delà de 200 k€ bénéfice
export const LU_IS_TAUX_REDUIT = 0.15; // 15 % en dessous de 175 k€
export const LU_IS_FONDS_EMPLOI_PCT = 0.07; // 7 % majoration fonds emploi
export const LU_ICC_LUXEMBOURG_VILLE = 0.0675; // 6,75 %
export const LU_IS_EFFECTIF_TOTAL = 0.2494; // ~24,94 % combiné Luxembourg ville

// Taxation dividendes distribués aux personnes physiques
// 50 % exonération si société résidente (demi-imposition art. 115 LIR)
export const LU_DIVIDENDE_EXONERATION = 0.5; // 50 %
export const LU_DIVIDENDE_PRECOMPTE = 0.15; // 15 % retenue à la source (imputable)

// Frontaliers — seuil 90 % des revenus imposés au Luxembourg
export const LU_FRONTALIER_SEUIL_REVENUS_LU = 0.9;
