import {
  CH_AC_PLAFOND,
  CH_AC_TAUX,
  CH_AVS_AI_APG_SALARIE,
  CH_CANTON_BAREME,
  CH_CANTON_COEFFICIENT,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  CH_DEDUCTIONS_PERSONNELLES,
  CH_IFD_BAREME_CELIBATAIRE,
  CH_IFD_BAREME_MARIE,
  CH_IFD_DEDUCTION_ENFANT,
  CH_IFD_DEDUCTION_MARIE,
  CH_LPP_DEDUCTION_COORD,
  CH_LPP_SALAIRE_MAX,
  CH_LPP_SEUIL_ENTREE,
  CH_LPP_TAUX_AGE,
  type CHCanton,
} from "../tax-rates/ch";
import type { TaxBracket } from "../types";

export type CHSituation = "celibataire" | "marie";

export interface SalaireBrutNetCHInput {
  brutAnnuel: number;
  age: number;
  canton: CHCanton;
  situation: CHSituation;
  enfants: number;
  coefficientCommunal: number; // multiplicateur communal (défaut : moyenne canton)
}

export interface SalaireBrutNetCHResult {
  brutAnnuel: number;
  brutMensuel: number;
  // Cotisations sociales (côté salarié)
  avsAiApg: number;
  ac: number;
  lppTaux: number;
  lppSalaireCoordonne: number;
  lppCotisationSalarie: number; // 50 % du total par défaut
  totalCotisationsSociales: number;
  salaireDeterminant: number; // revenu après cotisations
  // Impôts
  deductionsPersonnelles: number;
  revenuImposable: number;
  ifd: number;
  impotCantonalBase: number;
  impotCantonal: number;
  impotCommunal: number;
  impotTotal: number;
  // Net
  netAnnuel: number;
  netMensuel: number;
  tauxGlobal: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

function tauxLPPParAge(age: number): number {
  for (const t of CH_LPP_TAUX_AGE) {
    if (age >= t.min && age <= t.max) return t.taux;
  }
  return 0; // <25 ou >=65 : pas de bonification vieillesse obligatoire
}

/**
 * Calcule le salaire net suisse à partir du brut annuel.
 * Applique cotisations AVS/AI/APG, AC (plafonnée), LPP par âge
 * puis IFD + impôt cantonal (base + coefficient) + communal.
 */
export function computeSalaireBrutNetCH(
  input: SalaireBrutNetCHInput,
): SalaireBrutNetCHResult {
  const brutAnnuel = Math.max(0, input.brutAnnuel);
  const brutMensuel = brutAnnuel / 12;

  // 1. Cotisations AVS/AI/APG (pas de plafond)
  const avsAiApg = brutAnnuel * CH_AVS_AI_APG_SALARIE;

  // 2. AC (plafonnée à 148 200 CHF)
  const acBase = Math.min(brutAnnuel, CH_AC_PLAFOND);
  const ac = acBase * CH_AC_TAUX;

  // 3. LPP — salaire coordonné (brut − déduction de coordination) plafonné
  const lppSalaireCoordonne =
    brutAnnuel >= CH_LPP_SEUIL_ENTREE
      ? Math.max(
          0,
          Math.min(brutAnnuel, CH_LPP_SALAIRE_MAX) - CH_LPP_DEDUCTION_COORD,
        )
      : 0;
  const lppTaux = tauxLPPParAge(input.age);
  // Part salariée = 50 % du taux total (convention la plus fréquente)
  const lppCotisationSalarie = lppSalaireCoordonne * lppTaux * 0.5;

  const totalCotisationsSociales = avsAiApg + ac + lppCotisationSalarie;

  const salaireDeterminant = Math.max(0, brutAnnuel - totalCotisationsSociales);

  // Déductions personnelles cantonales (marié + enfants)
  const deductionsCanton = CH_DEDUCTIONS_PERSONNELLES[input.canton];
  const deductionConjoint =
    input.situation === "marie" ? deductionsCanton.marie : 0;
  const deductionEnfants = input.enfants * deductionsCanton.parEnfant;
  // Déduction frais d'acquisition du revenu (forfait 3 % plafonné, simplifié 4000 CHF)
  const deductionForfaitFrais = Math.min(4000, salaireDeterminant * 0.03);

  const deductionsPersonnelles =
    deductionConjoint + deductionEnfants + deductionForfaitFrais;

  const revenuImposable = Math.max(
    0,
    salaireDeterminant - deductionsPersonnelles,
  );

  // IFD
  const bareme =
    input.situation === "marie"
      ? CH_IFD_BAREME_MARIE
      : CH_IFD_BAREME_CELIBATAIRE;
  const deductionIFDMarie =
    input.situation === "marie" ? CH_IFD_DEDUCTION_MARIE : 0;
  const revenuIFD = Math.max(
    0,
    revenuImposable -
      deductionIFDMarie -
      input.enfants * CH_IFD_DEDUCTION_ENFANT,
  );
  const ifd = applyBrackets(revenuIFD, bareme);

  // Impôt cantonal de base (barème simple)
  const impotCantonalBase = applyBrackets(
    revenuImposable,
    CH_CANTON_BAREME[input.canton],
  );
  // Charge cantonale effective = base × coefficient cantonal
  const impotCantonal = impotCantonalBase * CH_CANTON_COEFFICIENT[input.canton];
  // Charge communale = base × coefficient communal
  const coeffCommune = Number.isFinite(input.coefficientCommunal)
    ? input.coefficientCommunal
    : CH_COMMUNE_COEFFICIENT_MOYEN[input.canton];
  const impotCommunal = impotCantonalBase * coeffCommune;

  const impotTotal = ifd + impotCantonal + impotCommunal;

  const netAnnuel = salaireDeterminant - impotTotal;
  const netMensuel = netAnnuel / 12;
  const tauxGlobal = brutAnnuel > 0 ? (brutAnnuel - netAnnuel) / brutAnnuel : 0;

  return {
    brutAnnuel,
    brutMensuel,
    avsAiApg,
    ac,
    lppTaux,
    lppSalaireCoordonne,
    lppCotisationSalarie,
    totalCotisationsSociales,
    salaireDeterminant,
    deductionsPersonnelles,
    revenuImposable,
    ifd,
    impotCantonalBase,
    impotCantonal,
    impotCommunal,
    impotTotal,
    netAnnuel,
    netMensuel,
    tauxGlobal,
  };
}
