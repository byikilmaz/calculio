import {
  CA_CELI_PLAFOND_ANNUEL,
  CA_CELI_PLAFOND_CUMULATIF,
  CA_PSV_MENSUELLE_65_74,
  CA_PSV_MENSUELLE_75_PLUS,
  CA_PSV_SEUIL_RECUP,
  CA_PSV_TAUX_RECUP,
  CA_QC_RRQ_RENTE_MAX_MENSUELLE,
  CA_REER_PLAFOND,
  CA_REER_TAUX_REVENU,
  CA_SRG_COUPLE_MAX,
  CA_SRG_PERSONNE_SEULE_MAX,
} from "../tax-rates/ca";

export type QCFoyerRetraite = "individuel" | "couple";

export interface RetraiteQCInput {
  ageActuel: number;
  ageDepart: number; // 60..70
  revenuAnnuelMoyen: number;
  anneesCotiseesRRQ: number;
  foyer: QCFoyerRetraite;
  // REER
  capitalREERActuel: number;
  versementAnnuelREER: number;
  rendementREER: number; // %
  // CELI
  capitalCELIActuel: number;
  versementAnnuelCELI: number;
  rendementCELI: number; // %
  // TMI pour économies d'impôt REER
  tmiPct: number;
}

export interface RetraiteQCResult {
  ageActuel: number;
  ageDepart: number;
  anneesRestantes: number;
  // RRQ
  renteRRQMensuelle: number;
  renteRRQAnnuelle: number;
  // PSV
  psvMensuelle: number;
  psvAnnuelle: number;
  psvClawback: number;
  // SRG
  srgMensuelle: number;
  // REER
  plafondREER: number;
  capitalREERFutur: number;
  retraitREERMensuel: number;
  economieImpotREER: number;
  // CELI
  plafondCELI: number;
  capitalCELIFutur: number;
  retraitCELIMensuel: number;
  // Synthèse
  revenuMensuelTotalRetraite: number;
  tauxRemplacement: number;
}

const TAUX_ANNUITE_RETRAITE = 0.04; // retrait annuel typique 4 %

function projectCapital(
  capInit: number,
  versementAnnuel: number,
  rendementPct: number,
  annees: number,
): number {
  if (annees <= 0) return capInit;
  const r = rendementPct / 100;
  if (r === 0) return capInit + versementAnnuel * annees;
  return (
    capInit * Math.pow(1 + r, annees) +
    (versementAnnuel * (Math.pow(1 + r, annees) - 1)) / r
  );
}

export function computeRetraiteQC(input: RetraiteQCInput): RetraiteQCResult {
  const ageActuel = Math.max(18, input.ageActuel);
  const ageDepart = Math.max(60, Math.min(70, input.ageDepart));
  const anneesRestantes = Math.max(0, ageDepart - ageActuel);

  // RRQ — carrière 40 ans pour pleine rente
  const anneesCotPleine = 40;
  const anneesCot = Math.min(
    anneesCotPleine,
    Math.max(0, input.anneesCotiseesRRQ) + anneesRestantes,
  );
  const ratioCarriere = anneesCot / anneesCotPleine;
  // Ajustement âge : +0,7 %/mois après 65, -0,6 %/mois avant 65
  const moisEcart = (ageDepart - 65) * 12;
  const ajustementAge =
    moisEcart >= 0 ? 1 + moisEcart * 0.007 : 1 + moisEcart * 0.006;
  let renteRRQMensuelle =
    CA_QC_RRQ_RENTE_MAX_MENSUELLE * ratioCarriere * ajustementAge;
  renteRRQMensuelle = Math.max(0, renteRRQMensuelle);
  const renteRRQAnnuelle = renteRRQMensuelle * 12;

  // PSV — 65-74 ans
  const psvMensuelle = ageDepart >= 75 ? CA_PSV_MENSUELLE_75_PLUS : CA_PSV_MENSUELLE_65_74;
  const psvAnnuelle = psvMensuelle * 12;
  // Clawback : 15 % au-delà du seuil
  const revenuApproxRetraite = renteRRQAnnuelle + psvAnnuelle + input.revenuAnnuelMoyen * 0.7; // approximation
  const psvClawback = Math.max(
    0,
    Math.min(
      psvAnnuelle,
      (revenuApproxRetraite - CA_PSV_SEUIL_RECUP) * CA_PSV_TAUX_RECUP,
    ),
  );

  // SRG — si faible revenu seulement
  const srgMax =
    input.foyer === "couple" ? CA_SRG_COUPLE_MAX : CA_SRG_PERSONNE_SEULE_MAX;
  // Approximation : SRG si RRQ mensuelle + PSV < 2 000 $ / mois
  const srgMensuelle =
    renteRRQMensuelle + psvMensuelle < 2000 ? srgMax * 0.5 : 0;

  // REER
  const plafondREER = Math.min(
    CA_REER_PLAFOND,
    input.revenuAnnuelMoyen * CA_REER_TAUX_REVENU,
  );
  const capitalREERFutur = projectCapital(
    input.capitalREERActuel,
    Math.min(input.versementAnnuelREER, plafondREER),
    input.rendementREER,
    anneesRestantes,
  );
  const retraitREERMensuel = (capitalREERFutur * TAUX_ANNUITE_RETRAITE) / 12;
  const tmi = Math.max(0, input.tmiPct) / 100;
  const economieImpotREER =
    Math.min(input.versementAnnuelREER, plafondREER) * tmi;

  // CELI
  const plafondCELI = CA_CELI_PLAFOND_ANNUEL;
  const capitalCELIFutur = projectCapital(
    input.capitalCELIActuel,
    Math.min(input.versementAnnuelCELI, plafondCELI),
    input.rendementCELI,
    anneesRestantes,
  );
  const retraitCELIMensuel = (capitalCELIFutur * TAUX_ANNUITE_RETRAITE) / 12;

  const revenuMensuelTotalRetraite =
    renteRRQMensuelle +
    psvMensuelle -
    psvClawback / 12 +
    srgMensuelle +
    retraitREERMensuel +
    retraitCELIMensuel;
  const tauxRemplacement =
    input.revenuAnnuelMoyen > 0
      ? (revenuMensuelTotalRetraite * 12) / input.revenuAnnuelMoyen
      : 0;

  return {
    ageActuel,
    ageDepart,
    anneesRestantes,
    renteRRQMensuelle,
    renteRRQAnnuelle,
    psvMensuelle,
    psvAnnuelle,
    psvClawback,
    srgMensuelle,
    plafondREER,
    capitalREERFutur,
    retraitREERMensuel,
    economieImpotREER,
    plafondCELI,
    capitalCELIFutur,
    retraitCELIMensuel,
    revenuMensuelTotalRetraite,
    tauxRemplacement,
  };
}

export { CA_CELI_PLAFOND_CUMULATIF };
