import {
  BE_ADDITIONNELS_COMMUNAUX_MOYENNE,
  BE_INASTI_COTISATION_MIN_TRIMESTRIELLE,
  BE_INASTI_FRAIS_GESTION,
  BE_INASTI_PLAFOND,
  BE_INASTI_SEUIL_HAUT,
  BE_INASTI_TAUX_BAS,
  BE_INASTI_TAUX_HAUT,
  BE_INCOME_TAX_BRACKETS,
  BE_IS_PLAFOND_PME,
  BE_IS_TAUX_NORMAL,
  BE_IS_TAUX_PME,
  BE_PRECOMPTE_MOBILIER_STANDARD,
  BE_QUOTITE_EXEMPTEE,
  BE_QUOTITE_REDUCTION_RATE,
  BE_VVPR_BIS_2E_EXERCICE,
  BE_VVPR_BIS_3E_EXERCICE,
} from "../tax-rates/be";
import type { TaxBracket } from "../types";

export type BERegimeDividende = "ordinaire" | "vvprBis2" | "vvprBis3";
export type BETailleSociete = "pme" | "grande";

export interface DividendesRemunerationBEInput {
  enveloppeBrute: number; // budget brut avant IPP / IS disponible dans la société
  partRemuneration: number; // 0..1 : part allouée en salaire dirigeant
  regimeDividende: BERegimeDividende;
  tailleSociete: BETailleSociete;
  additionnelsCommunaux: number;
}

export interface DividendesRemunerationBEResult {
  enveloppeBrute: number;
  partRemuneration: number;
  // Volet rémunération dirigeant
  remunerationBrute: number;
  cotisationInasti: number;
  fraisGestionCaisse: number;
  cotisationTotale: number;
  baseImposable: number;
  impotBareme: number;
  reductionQuotite: number;
  impotFederal: number;
  additionnelsMontant: number;
  impotTotalRemuneration: number;
  netRemuneration: number;
  // Volet dividende
  beneficeSocieteApresRemuneration: number;
  impotSocietes: number;
  dividendeBrut: number;
  precompteDividende: number;
  tauxPrecompteDividende: number;
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

function computeInasti(revenu: number): { inasti: number; fraisGestion: number } {
  if (revenu <= 0) return { inasti: 0, fraisGestion: 0 };
  const plafonneBas = Math.min(revenu, BE_INASTI_SEUIL_HAUT);
  const trancheBasse = plafonneBas * BE_INASTI_TAUX_BAS;
  let inasti = trancheBasse;
  if (revenu > BE_INASTI_SEUIL_HAUT) {
    const plafonneHaut =
      Math.min(revenu, BE_INASTI_PLAFOND) - BE_INASTI_SEUIL_HAUT;
    inasti += plafonneHaut * BE_INASTI_TAUX_HAUT;
  }
  const fraisGestion = inasti * BE_INASTI_FRAIS_GESTION;
  return { inasti, fraisGestion };
}

function precompteParRegime(
  regime: BERegimeDividende,
  taille: BETailleSociete,
): number {
  if (taille === "grande") return BE_PRECOMPTE_MOBILIER_STANDARD;
  if (regime === "vvprBis2") return BE_VVPR_BIS_2E_EXERCICE;
  if (regime === "vvprBis3") return BE_VVPR_BIS_3E_EXERCICE;
  return BE_PRECOMPTE_MOBILIER_STANDARD;
}

function impotSocietes(benefice: number, taille: BETailleSociete): number {
  if (benefice <= 0) return 0;
  if (taille === "grande") return benefice * BE_IS_TAUX_NORMAL;
  // PME : 20 % jusqu'à 100 000 €, 25 % au-delà
  const tranchePme = Math.min(benefice, BE_IS_PLAFOND_PME);
  const trancheNormale = Math.max(0, benefice - BE_IS_PLAFOND_PME);
  return tranchePme * BE_IS_TAUX_PME + trancheNormale * BE_IS_TAUX_NORMAL;
}

export function computeDividendesRemunerationBE(
  input: DividendesRemunerationBEInput,
): DividendesRemunerationBEResult {
  const enveloppe = Math.max(0, input.enveloppeBrute);
  const part = Math.max(0, Math.min(1, input.partRemuneration));

  // Pour une société, la rémunération du dirigeant est une charge déductible
  // Elle sort donc avant impôt des sociétés.
  // Cotisation INASTI du dirigeant : il la paye lui-même (déductible ensuite)
  const remunerationBrute = enveloppe * part;

  // INASTI calculée sur la rémunération brute (dirigeant = indépendant)
  const { inasti, fraisGestion } = computeInasti(remunerationBrute);
  const cotisationTotale = Math.max(
    inasti + fraisGestion,
    // Plancher primo-dirigeant principal : 4 × 880 €
    remunerationBrute > 0 ? BE_INASTI_COTISATION_MIN_TRIMESTRIELLE * 4 : 0,
  );

  const baseImposable = Math.max(0, remunerationBrute - cotisationTotale);
  const impotBareme = applyBrackets(baseImposable, BE_INCOME_TAX_BRACKETS);
  const reductionQuotite = BE_QUOTITE_EXEMPTEE * BE_QUOTITE_REDUCTION_RATE;
  const impotFederal = Math.max(0, impotBareme - reductionQuotite);
  const additionnelsMontant = impotFederal * input.additionnelsCommunaux;
  const impotTotalRemuneration = impotFederal + additionnelsMontant;
  const netRemuneration = baseImposable - impotTotalRemuneration;

  // Volet dividende : l'enveloppe restante est un bénéfice de société
  const beneficeSocieteApresRemuneration = Math.max(0, enveloppe - remunerationBrute);
  const impotSoc = impotSocietes(
    beneficeSocieteApresRemuneration,
    input.tailleSociete,
  );
  const dividendeBrut = beneficeSocieteApresRemuneration - impotSoc;
  const tauxPrecompteDividende = precompteParRegime(
    input.regimeDividende,
    input.tailleSociete,
  );
  const precompteDividende = Math.max(0, dividendeBrut * tauxPrecompteDividende);
  const netDividende = dividendeBrut - precompteDividende;

  const netTotal = netRemuneration + netDividende;
  const prelevementsTotaux = enveloppe - netTotal;
  const tauxEffectifGlobal =
    enveloppe > 0 ? prelevementsTotaux / enveloppe : 0;

  return {
    enveloppeBrute: enveloppe,
    partRemuneration: part,
    remunerationBrute,
    cotisationInasti: inasti,
    fraisGestionCaisse: fraisGestion,
    cotisationTotale,
    baseImposable,
    impotBareme,
    reductionQuotite,
    impotFederal,
    additionnelsMontant,
    impotTotalRemuneration,
    netRemuneration,
    beneficeSocieteApresRemuneration,
    impotSocietes: impotSoc,
    dividendeBrut,
    precompteDividende,
    tauxPrecompteDividende,
    netDividende,
    netTotal,
    prelevementsTotaux,
    tauxEffectifGlobal,
  };
}

export const DEFAULT_ADDITIONNELS_DIV = BE_ADDITIONNELS_COMMUNAUX_MOYENNE;
