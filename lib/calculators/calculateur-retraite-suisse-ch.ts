import {
  CH_AVS_ANNEES_COTISATION_PLEINE,
  CH_AVS_PLAFOND_RENTE,
  CH_AVS_RENTE_COUPLE_MAX,
  CH_AVS_RENTE_MAX_MENSUELLE,
  CH_AVS_RENTE_MIN_MENSUELLE,
  CH_PILIER_3A_INDEPENDANT_PCT,
  CH_PILIER_3A_INDEPENDANT_PLAFOND,
  CH_PILIER_3A_SALARIE,
} from "../tax-rates/ch";

export type CHFoyerRetraite = "individuel" | "couple";
export type CHStatutRetraite = "salarie" | "independant";

export interface RetraiteCHInput {
  ageActuel: number;
  ageDepart: number;
  revenuMoyenAnnuel: number;
  anneesCotiseesAVS: number;
  foyer: CHFoyerRetraite;
  statut: CHStatutRetraite;
  // 2e pilier (LPP)
  capitalLPPActuel: number;
  versementAnnuelLPP: number;
  rendementLPP: number; // % annuel
  // 3e pilier A
  versementAnnuel3a: number;
  rendement3a: number; // % annuel
  // Taux marginal d'imposition (pour économie d'impôt 3a)
  tmiPct: number; // ex 25 pour 25 %
}

export interface RetraiteCHResult {
  ageActuel: number;
  ageDepart: number;
  anneesRestantes: number;
  anneesCotiseesProjetees: number;
  // 1er pilier AVS
  revenuDeterminantPlafonne: number;
  tauxCarriere: number; // 0-1
  renteAVSMensuelle: number;
  renteAVSAnnuelle: number;
  rentePleinePlafond: number;
  // 2e pilier LPP
  capitalLPPFutur: number;
  renteLPPMensuelle: number;
  // 3e pilier 3a
  plafond3a: number;
  versement3aEffectif: number;
  economieImpot3aAnnuelle: number;
  capital3aFutur: number;
  renteMensuelle3a: number;
  // Synthèse
  renteTotaleMensuelle: number;
  tauxRemplacement: number; // rente / revenu
}

const TAUX_RENTE_VIAGERE = 0.04; // approximation 4 %/an → mensuel

function projectCapital(
  capitalInitial: number,
  versementAnnuel: number,
  rendementPct: number,
  annees: number,
): number {
  if (annees <= 0) return capitalInitial;
  const r = rendementPct / 100;
  if (r === 0) return capitalInitial + versementAnnuel * annees;
  const capitalCroissance = capitalInitial * Math.pow(1 + r, annees);
  const versementsCroissance =
    (versementAnnuel * (Math.pow(1 + r, annees) - 1)) / r;
  return capitalCroissance + versementsCroissance;
}

export function computeRetraiteCH(input: RetraiteCHInput): RetraiteCHResult {
  const ageActuel = Math.max(18, input.ageActuel);
  const ageDepart = Math.max(ageActuel, Math.min(70, input.ageDepart));
  const anneesRestantes = Math.max(0, ageDepart - ageActuel);
  const anneesCotiseesProjetees = Math.min(
    CH_AVS_ANNEES_COTISATION_PLEINE,
    Math.max(0, input.anneesCotiseesAVS) + anneesRestantes,
  );

  // 1er pilier — formule AVS
  // Rente = barème OFAS. Approximation : rente max × (revenu/plafond) bornée entre min et max,
  // ajustée par (années cotisées / 44).
  const revenuDeterminantPlafonne = Math.min(
    input.revenuMoyenAnnuel,
    CH_AVS_PLAFOND_RENTE,
  );
  const ratioRevenu = revenuDeterminantPlafonne / CH_AVS_PLAFOND_RENTE;
  // Rente théorique pleine (44 ans de cotisation)
  const rentePleineTheorique =
    CH_AVS_RENTE_MIN_MENSUELLE +
    (CH_AVS_RENTE_MAX_MENSUELLE - CH_AVS_RENTE_MIN_MENSUELLE) * ratioRevenu;
  const tauxCarriere =
    anneesCotiseesProjetees / CH_AVS_ANNEES_COTISATION_PLEINE;
  let renteAVSMensuelle = rentePleineTheorique * Math.min(1, tauxCarriere);
  // Couple : plafonné à 150 % de la rente individuelle max
  const rentePleinePlafond =
    input.foyer === "couple"
      ? CH_AVS_RENTE_COUPLE_MAX
      : CH_AVS_RENTE_MAX_MENSUELLE;
  if (input.foyer === "couple") {
    renteAVSMensuelle = Math.min(renteAVSMensuelle * 1.5, rentePleinePlafond);
  } else {
    renteAVSMensuelle = Math.min(renteAVSMensuelle, rentePleinePlafond);
  }
  const renteAVSAnnuelle = renteAVSMensuelle * 12;

  // 2e pilier — capital projeté
  const capitalLPPFutur = projectCapital(
    input.capitalLPPActuel,
    input.versementAnnuelLPP,
    input.rendementLPP,
    anneesRestantes,
  );
  const renteLPPMensuelle = (capitalLPPFutur * TAUX_RENTE_VIAGERE) / 12;

  // 3e pilier A
  const plafond3a =
    input.statut === "independant"
      ? Math.min(
          CH_PILIER_3A_INDEPENDANT_PLAFOND,
          Math.max(
            0,
            input.revenuMoyenAnnuel * CH_PILIER_3A_INDEPENDANT_PCT,
          ),
        )
      : CH_PILIER_3A_SALARIE;
  const versement3aEffectif = Math.min(
    Math.max(0, input.versementAnnuel3a),
    plafond3a,
  );
  const tmi = Math.max(0, input.tmiPct) / 100;
  const economieImpot3aAnnuelle = versement3aEffectif * tmi;
  const capital3aFutur = projectCapital(
    0,
    versement3aEffectif,
    input.rendement3a,
    anneesRestantes,
  );
  const renteMensuelle3a = (capital3aFutur * TAUX_RENTE_VIAGERE) / 12;

  const renteTotaleMensuelle =
    renteAVSMensuelle + renteLPPMensuelle + renteMensuelle3a;
  const tauxRemplacement =
    input.revenuMoyenAnnuel > 0
      ? (renteTotaleMensuelle * 12) / input.revenuMoyenAnnuel
      : 0;

  return {
    ageActuel,
    ageDepart,
    anneesRestantes,
    anneesCotiseesProjetees,
    revenuDeterminantPlafonne,
    tauxCarriere,
    renteAVSMensuelle,
    renteAVSAnnuelle,
    rentePleinePlafond,
    capitalLPPFutur,
    renteLPPMensuelle,
    plafond3a,
    versement3aEffectif,
    economieImpot3aAnnuelle,
    capital3aFutur,
    renteMensuelle3a,
    renteTotaleMensuelle,
    tauxRemplacement,
  };
}
