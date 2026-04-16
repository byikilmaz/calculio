import {
  CH_AVS_AI_APG_INDEPENDANT,
  CH_AVS_INDEPENDANT_SEUIL_MIN,
  CH_CANTON_BAREME,
  CH_CANTON_COEFFICIENT,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  CH_DEDUCTIONS_PERSONNELLES,
  CH_IFD_BAREME_CELIBATAIRE,
  CH_IFD_BAREME_MARIE,
  CH_IFD_DEDUCTION_ENFANT,
  CH_IFD_DEDUCTION_MARIE,
  CH_PILIER_3A_INDEPENDANT_PCT,
  CH_PILIER_3A_INDEPENDANT_PLAFOND,
  type CHCanton,
} from "../tax-rates/ch";
import type { TaxBracket } from "../types";

export type CHSituationInd = "celibataire" | "marie";

export interface IndependantCHInput {
  beneficeBrut: number; // CA − charges avant cotisations sociales
  age: number;
  canton: CHCanton;
  situation: CHSituationInd;
  enfants: number;
  coefficientCommunal: number;
  versement3a: number; // CHF/an versés en 3a renforcé
}

export interface IndependantCHResult {
  beneficeBrut: number;
  cotisationAVSIndependant: number; // 10 % sur bénéfice
  plafond3a: number;
  versement3aEffectif: number;
  beneficeNet: number; // après AVS et déduction 3a
  deductionsPersonnelles: number;
  revenuImposable: number;
  ifd: number;
  impotCantonal: number;
  impotCommunal: number;
  impotTotal: number;
  revenuDisponible: number;
  revenuMensuel: number;
  tauxPrelevementGlobal: number;
  respecteSeuilMin: boolean;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

export function computeIndependantCH(
  input: IndependantCHInput,
): IndependantCHResult {
  const benefice = Math.max(0, input.beneficeBrut);

  const respecteSeuilMin = benefice >= CH_AVS_INDEPENDANT_SEUIL_MIN;

  // AVS/AI/APG indépendant : 10 % (taux plein, simplifié — barème dégressif réel omis)
  const cotisationAVSIndependant = benefice * CH_AVS_AI_APG_INDEPENDANT;

  // 3e pilier A renforcé (indépendants sans LPP) : 20 % du revenu net ou 36 288 CHF
  const beneficeApresAVS = Math.max(0, benefice - cotisationAVSIndependant);
  const plafond3a = Math.min(
    CH_PILIER_3A_INDEPENDANT_PLAFOND,
    beneficeApresAVS * CH_PILIER_3A_INDEPENDANT_PCT,
  );
  const versement3aEffectif = Math.min(
    Math.max(0, input.versement3a),
    plafond3a,
  );

  const beneficeNet = Math.max(0, beneficeApresAVS - versement3aEffectif);

  // Déductions personnelles cantonales
  const ded = CH_DEDUCTIONS_PERSONNELLES[input.canton];
  const deductionConjoint = input.situation === "marie" ? ded.marie : 0;
  const deductionEnfants = input.enfants * ded.parEnfant;
  const deductionForfait = Math.min(4000, beneficeNet * 0.03);
  const deductionsPersonnelles =
    deductionConjoint + deductionEnfants + deductionForfait;

  const revenuImposable = Math.max(0, beneficeNet - deductionsPersonnelles);

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

  const impotCantonalBase = applyBrackets(
    revenuImposable,
    CH_CANTON_BAREME[input.canton],
  );
  const impotCantonal = impotCantonalBase * CH_CANTON_COEFFICIENT[input.canton];
  const coeffCommune = Number.isFinite(input.coefficientCommunal)
    ? input.coefficientCommunal
    : CH_COMMUNE_COEFFICIENT_MOYEN[input.canton];
  const impotCommunal = impotCantonalBase * coeffCommune;

  const impotTotal = ifd + impotCantonal + impotCommunal;

  const revenuDisponible = beneficeNet - impotTotal;
  const revenuMensuel = revenuDisponible / 12;
  const tauxPrelevementGlobal =
    benefice > 0 ? (benefice - revenuDisponible) / benefice : 0;

  return {
    beneficeBrut: benefice,
    cotisationAVSIndependant,
    plafond3a,
    versement3aEffectif,
    beneficeNet,
    deductionsPersonnelles,
    revenuImposable,
    ifd,
    impotCantonal,
    impotCommunal,
    impotTotal,
    revenuDisponible,
    revenuMensuel,
    tauxPrelevementGlobal,
    respecteSeuilMin,
  };
}

// Exposer l'âge pour éviter un "unused" warning (âge non utilisé dans v1, réservé pour futur
// calcul 2e pilier facultatif)
export type _CH_AGE_RESERVED = IndependantCHInput["age"];
