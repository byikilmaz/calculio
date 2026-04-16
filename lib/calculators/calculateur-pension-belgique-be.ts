import {
  BE_EPARGNE_PENSION_PLAFOND_MAJORE,
  BE_EPARGNE_PENSION_PLAFOND_ORDINAIRE,
  BE_EPARGNE_PENSION_REDUCTION_MAJOREE,
  BE_EPARGNE_PENSION_REDUCTION_ORDINAIRE,
  BE_PENSION_CARRIERE_COMPLETE,
  BE_PENSION_MAX_ISOLE_MENSUEL,
  BE_PENSION_MIN_ISOLE_MENSUEL,
  BE_PENSION_MIN_MENAGE_MENSUEL,
  BE_PENSION_PLAFOND_SALARIAL,
  BE_PENSION_TAUX_ISOLE,
  BE_PENSION_TAUX_MENAGE,
} from "../tax-rates/be";

export type BEFoyerPension = "isole" | "menage";
export type BERegimePension = "salarie" | "independant" | "fonctionnaire";
export type BEEpargnePensionRegime = "ordinaire" | "majore";

export interface PensionBEInput {
  ageActuel: number;
  ageDepart: number;
  salaireMoyenAnnuel: number;
  anneesCarriere: number;
  foyer: BEFoyerPension;
  regime: BERegimePension;
  // 2ème pilier — assurance groupe
  versementGroupeAnnuel: number;
  rendementAssuranceGroupe: number; // % annuel
  // 3ème pilier — épargne-pension
  versementEpargnePensionAnnuel: number;
  epargnePensionRegime: BEEpargnePensionRegime;
  rendementEpargnePension: number; // % annuel
}

export interface PensionBEResult {
  ageActuel: number;
  ageDepart: number;
  anneesRestantes: number;
  anneesCarriereProjetees: number;
  // 1er pilier
  tauxPension: number;
  salaireRetenu: number;
  pensionLegaleAnnuelle: number;
  pensionLegaleMensuelle: number;
  pensionMinimumMensuelle: number;
  pensionMaximumMensuelle: number;
  pensionPlafonnee: boolean;
  pensionPlancherApplique: boolean;
  // 2e pilier
  capitalAssuranceGroupe: number;
  renteMensuelleGroupe: number; // rente viagère approximative 4 %/an
  // 3e pilier
  plafondEpargnePension: number;
  reductionImpotEpargnePension: number; // économie d'impôt annuelle
  capitalEpargnePension: number;
  renteMensuelleEpargnePension: number;
  // synthèse
  pensionTotaleMensuelle: number;
  tauxRemplacement: number;
}

const TAUX_RENTE_VIAGERE = 0.04; // approximation rente mensuelle = capital × 4 % / 12

/**
 * Projette un capital avec versements annuels et rendement composé.
 */
function projectCapital(
  versementAnnuel: number,
  rendementPct: number,
  annees: number,
): number {
  if (annees <= 0 || versementAnnuel <= 0) return 0;
  const r = rendementPct / 100;
  if (r === 0) return versementAnnuel * annees;
  // Annuité échue : capital = V × ((1+r)^n − 1) / r
  return versementAnnuel * (Math.pow(1 + r, annees) - 1) / r;
}

export function computePensionBE(input: PensionBEInput): PensionBEResult {
  const ageActuel = Math.max(18, input.ageActuel);
  const ageDepart = Math.max(ageActuel, Math.min(67, input.ageDepart));
  const salaire = Math.max(0, input.salaireMoyenAnnuel);
  const anneesCarriere = Math.max(0, Math.min(50, input.anneesCarriere));

  const anneesRestantes = Math.max(0, ageDepart - ageActuel);
  const anneesCarriereProjetees = Math.min(
    BE_PENSION_CARRIERE_COMPLETE,
    anneesCarriere + anneesRestantes,
  );

  // 1er pilier — pension légale
  const tauxPension =
    input.foyer === "menage"
      ? BE_PENSION_TAUX_MENAGE
      : BE_PENSION_TAUX_ISOLE;
  const salaireRetenu = Math.min(salaire, BE_PENSION_PLAFOND_SALARIAL);
  const pensionLegaleAnnuelleBrute =
    (salaireRetenu * tauxPension * anneesCarriereProjetees) /
    BE_PENSION_CARRIERE_COMPLETE;

  const pensionMinAnnuelleMensualisee =
    (input.foyer === "menage"
      ? BE_PENSION_MIN_MENAGE_MENSUEL
      : BE_PENSION_MIN_ISOLE_MENSUEL);
  // Plancher : applicable proportionnellement à la carrière effective
  const pensionPlancherMensuel =
    pensionMinAnnuelleMensualisee *
    Math.min(1, anneesCarriereProjetees / BE_PENSION_CARRIERE_COMPLETE);
  const pensionPlafondMensuel = BE_PENSION_MAX_ISOLE_MENSUEL;

  let pensionLegaleMensuelle = pensionLegaleAnnuelleBrute / 12;
  let pensionPlafonnee = false;
  let pensionPlancherApplique = false;
  if (pensionLegaleMensuelle < pensionPlancherMensuel) {
    pensionLegaleMensuelle = pensionPlancherMensuel;
    pensionPlancherApplique = true;
  }
  if (pensionLegaleMensuelle > pensionPlafondMensuel) {
    pensionLegaleMensuelle = pensionPlafondMensuel;
    pensionPlafonnee = true;
  }
  const pensionLegaleAnnuelle = pensionLegaleMensuelle * 12;

  // 2e pilier — assurance groupe (capital projeté à l'âge de départ)
  const capitalAssuranceGroupe = projectCapital(
    input.versementGroupeAnnuel,
    input.rendementAssuranceGroupe,
    anneesRestantes,
  );
  // Rente viagère approximative : 4 %/an × capital / 12
  const renteMensuelleGroupe =
    (capitalAssuranceGroupe * TAUX_RENTE_VIAGERE) / 12;

  // 3e pilier — épargne-pension
  const plafondEpargnePension =
    input.epargnePensionRegime === "majore"
      ? BE_EPARGNE_PENSION_PLAFOND_MAJORE
      : BE_EPARGNE_PENSION_PLAFOND_ORDINAIRE;
  const tauxReduction =
    input.epargnePensionRegime === "majore"
      ? BE_EPARGNE_PENSION_REDUCTION_MAJOREE
      : BE_EPARGNE_PENSION_REDUCTION_ORDINAIRE;
  const versementEffectif = Math.min(
    input.versementEpargnePensionAnnuel,
    plafondEpargnePension,
  );
  const reductionImpotEpargnePension = versementEffectif * tauxReduction;
  const capitalEpargnePension = projectCapital(
    versementEffectif,
    input.rendementEpargnePension,
    anneesRestantes,
  );
  const renteMensuelleEpargnePension =
    (capitalEpargnePension * TAUX_RENTE_VIAGERE) / 12;

  const pensionTotaleMensuelle =
    pensionLegaleMensuelle + renteMensuelleGroupe + renteMensuelleEpargnePension;
  const tauxRemplacement =
    salaire > 0 ? (pensionTotaleMensuelle * 12) / salaire : 0;

  return {
    ageActuel,
    ageDepart,
    anneesRestantes,
    anneesCarriereProjetees,
    tauxPension,
    salaireRetenu,
    pensionLegaleAnnuelle,
    pensionLegaleMensuelle,
    pensionMinimumMensuelle: pensionPlancherMensuel,
    pensionMaximumMensuelle: pensionPlafondMensuel,
    pensionPlafonnee,
    pensionPlancherApplique,
    capitalAssuranceGroupe,
    renteMensuelleGroupe,
    plafondEpargnePension,
    reductionImpotEpargnePension,
    capitalEpargnePension,
    renteMensuelleEpargnePension,
    pensionTotaleMensuelle,
    tauxRemplacement,
  };
}
