import {
  CH_AC_PLAFOND,
  CH_AC_TAUX,
  CH_AVS_AI_APG_SALARIE,
  CH_CANTON_BAREME,
  CH_CANTON_COEFFICIENT,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  CH_DIVIDENDE_TAXATION_PARTIELLE_CANTON,
  CH_DIVIDENDE_TAXATION_PARTIELLE_IFD,
  CH_IFD_BAREME_CELIBATAIRE,
  CH_IFD_BAREME_MARIE,
  CH_IS_TAUX_EFFECTIF_TOTAL,
  CH_LPP_DEDUCTION_COORD,
  CH_LPP_SALAIRE_MAX,
  CH_LPP_SEUIL_ENTREE,
  CH_LPP_TAUX_AGE,
  type CHCanton,
} from "../tax-rates/ch";
import type { TaxBracket } from "../types";

export type CHSituationDir = "celibataire" | "marie";

export interface DividendesSalaireCHInput {
  beneficeAvantRemuneration: number; // CHF, bénéfice avant rémunération dirigeant (enveloppe)
  partSalaire: number; // 0..1 : fraction allouée en salaire
  canton: CHCanton;
  situation: CHSituationDir;
  age: number;
  coefficientCommunal: number;
}

export interface DividendesSalaireCHResult {
  enveloppe: number;
  partSalaire: number;
  // Volet salaire
  salaireBrut: number;
  avsAiApg: number;
  ac: number;
  lppCotisation: number;
  totalChargesSalarie: number;
  salaireDeterminant: number;
  ifdSalaire: number;
  impotCantonalSalaire: number;
  impotCommunalSalaire: number;
  impotTotalSalaire: number;
  netSalaire: number;
  // Volet dividende
  beneficeSoumisIS: number;
  impotSocietes: number;
  dividendeBrut: number;
  baseImposablePartielleIFD: number;
  baseImposablePartielleCanton: number;
  ifdDividende: number;
  impotCantonalDividende: number;
  impotCommunalDividende: number;
  impotTotalDividende: number;
  netDividende: number;
  // Synthèse
  netTotal: number;
  prelevementsTotaux: number;
  tauxEffectifGlobal: number;
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
  return 0;
}

export function computeDividendesSalaireCH(
  input: DividendesSalaireCHInput,
): DividendesSalaireCHResult {
  const enveloppe = Math.max(0, input.beneficeAvantRemuneration);
  const part = Math.max(0, Math.min(1, input.partSalaire));

  // ─── Volet SALAIRE ───
  const salaireBrut = enveloppe * part;
  const avsAiApg = salaireBrut * CH_AVS_AI_APG_SALARIE;
  const ac = Math.min(salaireBrut, CH_AC_PLAFOND) * CH_AC_TAUX;
  const lppCoord =
    salaireBrut >= CH_LPP_SEUIL_ENTREE
      ? Math.max(
          0,
          Math.min(salaireBrut, CH_LPP_SALAIRE_MAX) - CH_LPP_DEDUCTION_COORD,
        )
      : 0;
  const lppCotisation = lppCoord * tauxLPPParAge(input.age) * 0.5;
  const totalChargesSalarie = avsAiApg + ac + lppCotisation;

  // Salaire déterminant imposable (simplifié)
  const salaireDeterminant = Math.max(0, salaireBrut - totalChargesSalarie);
  const baremeSalaire =
    input.situation === "marie"
      ? CH_IFD_BAREME_MARIE
      : CH_IFD_BAREME_CELIBATAIRE;
  const ifdSalaire = applyBrackets(salaireDeterminant, baremeSalaire);
  const impotCantonalBaseSal = applyBrackets(
    salaireDeterminant,
    CH_CANTON_BAREME[input.canton],
  );
  const impotCantonalSalaire =
    impotCantonalBaseSal * CH_CANTON_COEFFICIENT[input.canton];
  const coeffCommune = Number.isFinite(input.coefficientCommunal)
    ? input.coefficientCommunal
    : CH_COMMUNE_COEFFICIENT_MOYEN[input.canton];
  const impotCommunalSalaire = impotCantonalBaseSal * coeffCommune;
  const impotTotalSalaire =
    ifdSalaire + impotCantonalSalaire + impotCommunalSalaire;
  const netSalaire = salaireDeterminant - impotTotalSalaire;

  // ─── Volet DIVIDENDE ───
  // Bénéfice restant après salaire brut (le salaire est charge déductible pour la société)
  const beneficeSoumisIS = Math.max(0, enveloppe - salaireBrut);
  // IS effectif = taux cantonal combiné (moyenne statutaire)
  const tauxIS = CH_IS_TAUX_EFFECTIF_TOTAL[input.canton];
  const impotSocietes = beneficeSoumisIS * tauxIS;
  const dividendeBrut = Math.max(0, beneficeSoumisIS - impotSocietes);
  // Taxation partielle : 70 % IFD, 50-70 % canton selon canton
  const tauxPartielCanton =
    CH_DIVIDENDE_TAXATION_PARTIELLE_CANTON[input.canton];
  const baseImposablePartielleIFD =
    dividendeBrut * CH_DIVIDENDE_TAXATION_PARTIELLE_IFD;
  const baseImposablePartielleCanton = dividendeBrut * tauxPartielCanton;

  // Dividende imposé séparément (pas cumul) — simplification
  const ifdDividende = applyBrackets(baseImposablePartielleIFD, baremeSalaire);
  const impotCantonalBaseDiv = applyBrackets(
    baseImposablePartielleCanton,
    CH_CANTON_BAREME[input.canton],
  );
  const impotCantonalDividende =
    impotCantonalBaseDiv * CH_CANTON_COEFFICIENT[input.canton];
  const impotCommunalDividende = impotCantonalBaseDiv * coeffCommune;
  const impotTotalDividende =
    ifdDividende + impotCantonalDividende + impotCommunalDividende;
  const netDividende = dividendeBrut - impotTotalDividende;

  // ─── Synthèse ───
  const netTotal = netSalaire + netDividende;
  const prelevementsTotaux = enveloppe - netTotal;
  const tauxEffectifGlobal =
    enveloppe > 0 ? prelevementsTotaux / enveloppe : 0;

  return {
    enveloppe,
    partSalaire: part,
    salaireBrut,
    avsAiApg,
    ac,
    lppCotisation,
    totalChargesSalarie,
    salaireDeterminant,
    ifdSalaire,
    impotCantonalSalaire,
    impotCommunalSalaire,
    impotTotalSalaire,
    netSalaire,
    beneficeSoumisIS,
    impotSocietes,
    dividendeBrut,
    baseImposablePartielleIFD,
    baseImposablePartielleCanton,
    ifdDividende,
    impotCantonalDividende,
    impotCommunalDividende,
    impotTotalDividende,
    netDividende,
    netTotal,
    prelevementsTotaux,
    tauxEffectifGlobal,
  };
}
