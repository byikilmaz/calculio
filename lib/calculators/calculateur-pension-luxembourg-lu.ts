import {
  LU_PENSION_ANNEES_CARRIERE_MAX,
  LU_PENSION_MAX_MENSUEL,
  LU_PENSION_MIN_MENSUEL,
  LU_PENSION_TAUX_FORFAITAIRE,
  LU_PENSION_TAUX_PROPORTIONNEL,
  LU_PREVOYANCE_PLAFOND,
  LU_SSM_MENSUEL,
  LU_AGE_LEGAL,
} from "../tax-rates/lu";

export interface PensionLUInput {
  salaireMoyenAnnuel: number;
  anneesCotisation: number;
  age: number;
  // 3e pilier optionnel
  versement3eAnnuel: number;
  tauxMarginalIR: number;
  anneesResteAvantRetraite: number;
}

export interface PensionLUResult {
  salaireMoyenAnnuel: number;
  anneesCotisation: number;
  // Formule CNAP
  majorationProportionnelle: number;
  majorationForfaitaire: number;
  pensionMensuelleBrute: number;
  pensionAnnuelleBrute: number;
  // Clamping min/max
  pensionPlafonnee: number;
  tauxRemplacement: number;
  // Eligibilité
  eligibleAgeLegal: boolean;
  eligibleAnticipee60: boolean; // 40 ans
  eligibleAnticipee57: boolean; // carrière longue
  // 3e pilier (art 111bis)
  versement3eAnnuel: number;
  versementDeductible: number;
  economieFiscaleAnnuelle: number;
  cumul3e: number;
  gainCumule3e: number;
}

export function computePensionLU(input: PensionLUInput): PensionLUResult {
  const salaireMoyen = Math.max(0, input.salaireMoyenAnnuel);
  const annees = Math.max(
    0,
    Math.min(LU_PENSION_ANNEES_CARRIERE_MAX, input.anneesCotisation),
  );

  // Majoration proportionnelle : 1,775 % × salaire moyen × années
  const majorationProportionnelleAnnuelle =
    LU_PENSION_TAUX_PROPORTIONNEL * salaireMoyen * annees;

  // Majoration forfaitaire : 23,75 % × SSM × années / 40 (prorata)
  const ssmAnnuel = LU_SSM_MENSUEL * 12;
  const majorationForfaitaireAnnuelle =
    LU_PENSION_TAUX_FORFAITAIRE *
    ssmAnnuel *
    (annees / LU_PENSION_ANNEES_CARRIERE_MAX);

  const pensionAnnuelleBrute =
    majorationProportionnelleAnnuelle + majorationForfaitaireAnnuelle;
  const pensionMensuelleBrute = pensionAnnuelleBrute / 12;

  // Plafonds min (si carrière ≥ 40 ans) / max (5× SSM)
  let pensionPlafonnee = pensionMensuelleBrute;
  if (
    annees >= LU_PENSION_ANNEES_CARRIERE_MAX &&
    pensionPlafonnee < LU_PENSION_MIN_MENSUEL
  ) {
    pensionPlafonnee = LU_PENSION_MIN_MENSUEL;
  }
  if (pensionPlafonnee > LU_PENSION_MAX_MENSUEL) {
    pensionPlafonnee = LU_PENSION_MAX_MENSUEL;
  }

  const tauxRemplacement =
    salaireMoyen > 0 ? (pensionPlafonnee * 12) / salaireMoyen : 0;

  // Éligibilité
  const eligibleAgeLegal = input.age >= LU_AGE_LEGAL;
  const eligibleAnticipee60 = input.age >= 60 && annees >= 40;
  const eligibleAnticipee57 = input.age >= 57 && annees >= 40;

  // 3e pilier — art. 111bis
  const versement = Math.max(0, input.versement3eAnnuel);
  const versementDeductible = Math.min(versement, LU_PREVOYANCE_PLAFOND);
  const economieFiscaleAnnuelle =
    versementDeductible *
    Math.max(0, Math.min(0.42, input.tauxMarginalIR));

  const anneesRestantes = Math.max(0, input.anneesResteAvantRetraite);
  const cumul3e = versementDeductible * anneesRestantes;
  const gainCumule3e = economieFiscaleAnnuelle * anneesRestantes;

  majorationForfaitaireAnnuelle;
  majorationProportionnelleAnnuelle;

  return {
    salaireMoyenAnnuel: salaireMoyen,
    anneesCotisation: annees,
    majorationProportionnelle: majorationProportionnelleAnnuelle / 12,
    majorationForfaitaire: majorationForfaitaireAnnuelle / 12,
    pensionMensuelleBrute,
    pensionAnnuelleBrute,
    pensionPlafonnee,
    tauxRemplacement,
    eligibleAgeLegal,
    eligibleAnticipee60,
    eligibleAnticipee57,
    versement3eAnnuel: versement,
    versementDeductible,
    economieFiscaleAnnuelle,
    cumul3e,
    gainCumule3e,
  };
}
