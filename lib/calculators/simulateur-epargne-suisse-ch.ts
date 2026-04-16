import {
  CH_PILIER_3A_INDEPENDANT_PCT,
  CH_PILIER_3A_INDEPENDANT_PLAFOND,
  CH_PILIER_3A_SALARIE,
} from "../tax-rates/ch";

export type CHSupportEpargne = "livret" | "pilier3a";
export type CHStatut3a = "salarie" | "independant";

export interface EpargneCHInput {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number; // %
  dureeAnnees: number;
  support: CHSupportEpargne;
  // Pour 3a — statut et revenu pour calculer plafond
  statut3a: CHStatut3a;
  revenuAnnuel: number;
  tmiPct: number; // taux marginal d'imposition (ex 25 = 25 %)
}

export interface EpargneCHYear {
  annee: number;
  versementsCumules: number;
  interetsBrutsCumules: number;
  impotsCumules: number;
  economiesImpotCumulees: number;
  capitalNetCumule: number;
}

export interface EpargneCHResult {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number;
  dureeAnnees: number;
  support: CHSupportEpargne;
  plafond3a: number;
  versementEffectifAnnuel: number;
  totalVerse: number;
  interetsBruts: number;
  impotsIntereets: number; // impôt revenu sur intérêts (livret)
  economieImpotAnnuelle: number; // éco 3a par année
  economieImpotTotale: number;
  capitalFinalBrut: number;
  capitalFinalNet: number;
  rendementNetAnnualise: number;
  breakdown: EpargneCHYear[];
}

function annualize(finalValue: number, invested: number, years: number) {
  if (invested <= 0 || years <= 0) return 0;
  return Math.pow(finalValue / invested, 1 / years) - 1;
}

/**
 * Épargne suisse :
 * - Livret : intérêts soumis à impôt sur le revenu (au taux marginal TMI)
 *   + impôt sur la fortune non simulé ici (variable par canton).
 * - 3a : versements déductibles fiscalement (économie = versement × TMI),
 *   capital non imposé pendant la durée, retrait au taux réduit (non simulé — capital brut final).
 */
export function computeEpargneCH(input: EpargneCHInput): EpargneCHResult | null {
  const capitalInitial = Math.max(0, input.capitalInitial);
  const versementMensuel = Math.max(0, input.versementMensuel);
  const duree = Math.max(0, input.dureeAnnees);
  if (duree <= 0) return null;

  // Plafond 3a si pertinent
  const plafond3a =
    input.support === "pilier3a"
      ? input.statut3a === "independant"
        ? Math.min(
            CH_PILIER_3A_INDEPENDANT_PLAFOND,
            Math.max(0, input.revenuAnnuel * CH_PILIER_3A_INDEPENDANT_PCT),
          )
        : CH_PILIER_3A_SALARIE
      : Number.POSITIVE_INFINITY;

  const versementMensuelEffectif =
    input.support === "pilier3a"
      ? Math.min(versementMensuel, plafond3a / 12)
      : versementMensuel;
  const versementEffectifAnnuel = versementMensuelEffectif * 12;

  const tmi = Math.max(0, input.tmiPct) / 100;

  const mois = Math.round(duree * 12);
  const iMensuel = input.tauxAnnuel / 100 / 12;

  let capital = capitalInitial;
  let versesCumules = capitalInitial;
  let interetsBrutsCumules = 0;
  let impotsCumules = 0;
  let ecoCumulee = 0;

  const breakdown: EpargneCHYear[] = [];
  let interetsAnneeBrut = 0;

  for (let m = 1; m <= mois; m++) {
    const interetsMois = capital * iMensuel;
    capital += interetsMois;
    interetsBrutsCumules += interetsMois;
    interetsAnneeBrut += interetsMois;
    capital += versementMensuelEffectif;
    versesCumules += versementMensuelEffectif;
    if (m % 12 === 0) {
      // Fin d'année : imposition des intérêts (livret)
      let impotAnnee = 0;
      if (input.support === "livret") {
        impotAnnee = interetsAnneeBrut * tmi;
        capital -= impotAnnee;
      }
      impotsCumules += impotAnnee;
      // Économie d'impôt 3a (sur versement annuel)
      if (input.support === "pilier3a") {
        ecoCumulee += versementEffectifAnnuel * tmi;
      }
      breakdown.push({
        annee: m / 12,
        versementsCumules: versesCumules,
        interetsBrutsCumules,
        impotsCumules,
        economiesImpotCumulees: ecoCumulee,
        capitalNetCumule: capital,
      });
      interetsAnneeBrut = 0;
    }
  }

  const capitalFinalNet = capital;
  const capitalFinalBrut = capitalFinalNet + impotsCumules;
  const rendementNetAnnualise = annualize(
    capitalFinalNet,
    versesCumules,
    duree,
  );
  const economieImpotAnnuelle =
    input.support === "pilier3a" ? versementEffectifAnnuel * tmi : 0;

  return {
    capitalInitial,
    versementMensuel: versementMensuelEffectif,
    tauxAnnuel: input.tauxAnnuel,
    dureeAnnees: duree,
    support: input.support,
    plafond3a: input.support === "pilier3a" ? plafond3a : 0,
    versementEffectifAnnuel,
    totalVerse: versesCumules,
    interetsBruts: interetsBrutsCumules,
    impotsIntereets: impotsCumules,
    economieImpotAnnuelle,
    economieImpotTotale: ecoCumulee,
    capitalFinalBrut,
    capitalFinalNet,
    rendementNetAnnualise,
    breakdown,
  };
}
