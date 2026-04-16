import {
  LU_CCSS_DEPENDANCE,
  LU_CCSS_MALADIE_ESPECES,
  LU_CCSS_MALADIE_SOINS,
  LU_CCSS_PENSION,
  LU_CIS,
  LU_DEPENDANCE_ABATTEMENT_ANNUEL,
  LU_DIVIDENDE_EXONERATION,
  LU_DIVIDENDE_PRECOMPTE,
  LU_FONDS_EMPLOI_TAUX_BAS,
  LU_FRAIS_OBTENTION_FORFAIT,
  LU_IR_BAREME,
  LU_IS_EFFECTIF_TOTAL,
  LU_IS_FONDS_EMPLOI_PCT,
  LU_IS_TAUX,
  LU_ICC_LUXEMBOURG_VILLE,
  type LUClasse,
} from "../tax-rates/lu";
import type { TaxBracket } from "../types";

export interface DividendeSalaireLUInput {
  beneficeSociete: number; // avant IS
  tauxRemunerationEnSalaire: number; // 0 à 1 (part distribuée en salaire)
  classe: LUClasse;
}

export interface DividendeSalaireLUResult {
  beneficeSociete: number;
  // Scénario tout salaire
  sceTS_brut: number;
  sceTS_cotisations: number;
  sceTS_impot: number;
  sceTS_net: number;
  // Scénario tout dividende
  sceTD_beneficeApresIS: number;
  sceTD_is: number;
  sceTD_dividendeAvantIR: number;
  sceTD_dividendeImposable: number;
  sceTD_irPersonne: number;
  sceTD_precompte: number;
  sceTD_net: number;
  // Scénario optimal (mix)
  sceOpti_partSalaire: number;
  sceOpti_salaire: number;
  sceOpti_cotisations: number;
  sceOpti_impot: number;
  sceOpti_dividende: number;
  sceOpti_is: number;
  sceOpti_irDividende: number;
  sceOpti_net: number;
}

function applyBrackets(revenu: number, brackets: TaxBracket[]): number {
  let impot = 0;
  for (const b of brackets) {
    const base = Math.max(0, Math.min(revenu, b.max) - b.min);
    impot += base * b.rate;
  }
  return impot;
}

function impotIR(baseImposable: number, classe: LUClasse): number {
  let impot = 0;
  if (classe === "2") {
    impot = applyBrackets(baseImposable / 2, LU_IR_BAREME) * 2;
  } else if (classe === "1a") {
    impot = applyBrackets(Math.max(0, baseImposable - 4500), LU_IR_BAREME);
  } else {
    impot = applyBrackets(baseImposable, LU_IR_BAREME);
  }
  return Math.max(0, impot - LU_CIS);
}

/**
 * Compare pour un dirigeant Sàrl/SA luxembourgeois le scénario
 * tout-salaire vs tout-dividende vs optimum.
 */
export function computeDividendeSalaireLU(
  input: DividendeSalaireLUInput,
): DividendeSalaireLUResult {
  const benefice = Math.max(0, input.beneficeSociete);

  // Taux IS effectif combiné (17 % IS + 7 % fonds emploi + ICC)
  // = 17 % × 1,07 + 6,75 % = ~24,94 %
  const tauxIS_FE = LU_IS_TAUX * (1 + LU_IS_FONDS_EMPLOI_PCT);
  const tauxISComplet = tauxIS_FE + LU_ICC_LUXEMBOURG_VILLE;

  // ---------- Scénario TOUT SALAIRE ----------
  // Salaire = bénéfice (charges patronales simplifiées ignorées)
  // Le salarié cotise ~12,45 % et paie l'IR
  const sceTS_brut = benefice;
  const cotisationSalarie =
    LU_CCSS_PENSION + LU_CCSS_MALADIE_ESPECES + LU_CCSS_MALADIE_SOINS;
  const sceTS_cotisations = sceTS_brut * cotisationSalarie;
  const baseDep = Math.max(0, sceTS_brut - LU_DEPENDANCE_ABATTEMENT_ANNUEL);
  const sceTS_dep = baseDep * LU_CCSS_DEPENDANCE;
  const sceTS_imposable = Math.max(
    0,
    sceTS_brut - sceTS_cotisations - LU_FRAIS_OBTENTION_FORFAIT,
  );
  const sceTS_impotPur = impotIR(sceTS_imposable, input.classe);
  const sceTS_fondsEmploi = sceTS_impotPur * LU_FONDS_EMPLOI_TAUX_BAS;
  const sceTS_impot = sceTS_impotPur + sceTS_fondsEmploi + sceTS_dep;
  const sceTS_net = Math.max(
    0,
    sceTS_brut - sceTS_cotisations - sceTS_impot,
  );

  // ---------- Scénario TOUT DIVIDENDE ----------
  // Société paie IS (~24,94 %), distribue résidu en dividende
  const sceTD_is = benefice * tauxISComplet;
  const sceTD_beneficeApresIS = benefice - sceTD_is;
  const sceTD_dividendeAvantIR = sceTD_beneficeApresIS;
  // Demi-imposition : 50 % exonéré
  const sceTD_dividendeImposable =
    sceTD_dividendeAvantIR * (1 - LU_DIVIDENDE_EXONERATION);
  const sceTD_irPur = impotIR(sceTD_dividendeImposable, input.classe);
  const sceTD_fondsEmploi = sceTD_irPur * LU_FONDS_EMPLOI_TAUX_BAS;
  const sceTD_irPersonne = sceTD_irPur + sceTD_fondsEmploi;
  // Précompte 15 % retenu à la source, imputable (neutre si bien imputé)
  const sceTD_precompte = sceTD_dividendeAvantIR * LU_DIVIDENDE_PRECOMPTE;
  const sceTD_net = sceTD_dividendeAvantIR - sceTD_irPersonne;

  // ---------- Scénario MIX OPTIMAL ----------
  const partSalaire = Math.max(0, Math.min(1, input.tauxRemunerationEnSalaire));
  const sceOpti_salaire = benefice * partSalaire;
  const sceOpti_cotisationsVar =
    sceOpti_salaire *
    (LU_CCSS_PENSION + LU_CCSS_MALADIE_ESPECES + LU_CCSS_MALADIE_SOINS);
  const baseDepOpti = Math.max(
    0,
    sceOpti_salaire - LU_DEPENDANCE_ABATTEMENT_ANNUEL,
  );
  const sceOpti_dep = baseDepOpti * LU_CCSS_DEPENDANCE;
  const sceOpti_imposable = Math.max(
    0,
    sceOpti_salaire - sceOpti_cotisationsVar - LU_FRAIS_OBTENTION_FORFAIT,
  );
  const sceOpti_impotPur = impotIR(sceOpti_imposable, input.classe);
  const sceOpti_fondsEmploi = sceOpti_impotPur * LU_FONDS_EMPLOI_TAUX_BAS;
  const sceOpti_impot = sceOpti_impotPur + sceOpti_fondsEmploi + sceOpti_dep;

  const beneficeApresSalaire = benefice - sceOpti_salaire;
  const sceOpti_is = beneficeApresSalaire * tauxISComplet;
  const sceOpti_dividende = beneficeApresSalaire - sceOpti_is;
  const sceOpti_divImposable =
    sceOpti_dividende * (1 - LU_DIVIDENDE_EXONERATION);
  const sceOpti_irDivPur = impotIR(sceOpti_divImposable, input.classe);
  const sceOpti_irDivFE = sceOpti_irDivPur * LU_FONDS_EMPLOI_TAUX_BAS;
  const sceOpti_irDividende = sceOpti_irDivPur + sceOpti_irDivFE;

  const netSalairePortion = Math.max(
    0,
    sceOpti_salaire - sceOpti_cotisationsVar - sceOpti_impot,
  );
  const netDividendePortion = Math.max(
    0,
    sceOpti_dividende - sceOpti_irDividende,
  );
  const sceOpti_net = netSalairePortion + netDividendePortion;

  return {
    beneficeSociete: benefice,
    sceTS_brut,
    sceTS_cotisations,
    sceTS_impot,
    sceTS_net,
    sceTD_beneficeApresIS,
    sceTD_is,
    sceTD_dividendeAvantIR,
    sceTD_dividendeImposable,
    sceTD_irPersonne,
    sceTD_precompte,
    sceTD_net,
    sceOpti_partSalaire: partSalaire,
    sceOpti_salaire,
    sceOpti_cotisations: sceOpti_cotisationsVar,
    sceOpti_impot,
    sceOpti_dividende,
    sceOpti_is,
    sceOpti_irDividende,
    sceOpti_net,
  };
}
