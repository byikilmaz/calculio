import { FR_PASS_ANNUAL } from "../tax-rates/fr";

export interface RetraiteInput {
  ageActuel: number;
  ageDepart: number;
  salaireBrutAnnuel: number;
  anneesCarriereActuelle?: number; // optionnel
}

export interface RetraiteResult {
  ageActuel: number;
  ageDepart: number;
  anneesRestantes: number;
  trimestresCotises: number;
  trimestresRequis: number;
  tauxLiquidation: number; // 0.5 max
  salairePlafonne: number;
  pensionBaseAnnuelle: number;
  pensionComplementaireAnnuelle: number;
  pensionTotaleAnnuelle: number;
  pensionTotaleMensuelle: number;
  tauxRemplacement: number;
  tauxPlein: boolean;
}

const TRIMESTRES_REQUIS = 172; // 43 ans pour génération née après 1965
const TAUX_PLEIN = 0.5;

export function computeRetraiteFR(input: RetraiteInput): RetraiteResult {
  const ageActuel = Math.max(18, input.ageActuel);
  const ageDepart = Math.max(ageActuel, Math.min(67, input.ageDepart));
  const salaire = Math.max(0, input.salaireBrutAnnuel);

  // Estimation simplifiée: démarrage de carrière à 22 ans
  const ageDebut = 22;
  const trimestresCotises = Math.min(
    TRIMESTRES_REQUIS,
    Math.max(0, (ageDepart - ageDebut) * 4),
  );
  const tauxLiquidation =
    (trimestresCotises / TRIMESTRES_REQUIS) * TAUX_PLEIN;

  // Pension de base régime général: salaire moyen annuel plafonné à 1 PASS × taux
  const salairePlafonne = Math.min(salaire, FR_PASS_ANNUAL);
  const pensionBaseAnnuelle = salairePlafonne * tauxLiquidation;

  // Pension complémentaire AGIRC-ARRCO (simplification):
  // approx 25% du salaire total × (années cotisées / 42)
  const anneesCotisees = Math.min(42, (ageDepart - ageDebut));
  const pensionComplementaireAnnuelle =
    salaire * 0.25 * (anneesCotisees / 42);

  const pensionTotaleAnnuelle =
    pensionBaseAnnuelle + pensionComplementaireAnnuelle;
  const pensionTotaleMensuelle = pensionTotaleAnnuelle / 12;
  const tauxRemplacement =
    salaire > 0 ? pensionTotaleAnnuelle / salaire : 0;

  return {
    ageActuel,
    ageDepart,
    anneesRestantes: Math.max(0, ageDepart - ageActuel),
    trimestresCotises,
    trimestresRequis: TRIMESTRES_REQUIS,
    tauxLiquidation,
    salairePlafonne,
    pensionBaseAnnuelle,
    pensionComplementaireAnnuelle,
    pensionTotaleAnnuelle,
    pensionTotaleMensuelle,
    tauxRemplacement,
    tauxPlein: trimestresCotises >= TRIMESTRES_REQUIS,
  };
}
