import {
  LU_CAPITAUX_EXONERATION_INTERETS,
  LU_CAPITAUX_PRECOMPTE,
  LU_PREVOYANCE_PLAFOND,
  LU_PREVOYANCE_RETRAIT_PART_DEMI_GLOBAL,
  LU_PREVOYANCE_RETRAIT_PART_FLAT,
  LU_PREVOYANCE_RETRAIT_TAUX_FLAT,
} from "../tax-rates/lu";

export interface EpargneLUInput {
  versementInitial: number;
  versementAnnuel: number;
  tauxRendementAnnuel: number; // % ex 3.0
  dureeAnnees: number;
  tauxMarginalIR: number; // pour scénario 3e pilier
  useTroisiemePilier: boolean;
}

export interface EpargneLUResult {
  capitalFinal: number;
  totalVerse: number;
  gainsBruts: number;
  // Précompte (compte classique)
  interetsAnneeFin: number;
  exonerationIntegrale: boolean;
  precompte: number;
  capitalFinalNet: number;
  // 3e pilier
  versement3eAnnuel: number;
  economieFiscaleAnnuelle: number;
  cumulEconomieFiscale: number;
  capital3eFinal: number;
  // Sortie 3e pilier (art 131 LIR)
  retraitImposableDemi: number;
  retraitImposableFlat: number;
  // Comparaison
  diffNet: number;
}

export function computeEpargneLU(input: EpargneLUInput): EpargneLUResult {
  const versementInitial = Math.max(0, input.versementInitial);
  const versementAnnuel = Math.max(0, input.versementAnnuel);
  const taux = Math.max(0, input.tauxRendementAnnuel) / 100;
  const n = Math.max(1, Math.round(input.dureeAnnees));

  // Calcul classique : capitalisation composée annuelle
  let capital = versementInitial;
  let totalVerse = versementInitial;
  let interetsCumules = 0;
  let interetsAnneeFin = 0;
  for (let y = 1; y <= n; y++) {
    const interets = capital * taux;
    interetsCumules += interets;
    capital = capital + interets + versementAnnuel;
    totalVerse += versementAnnuel;
    if (y === n) interetsAnneeFin = interets;
  }
  const capitalFinal = capital;
  const gainsBruts = capitalFinal - totalVerse;

  // Précompte 20 % sur intérêts > 1 500 €/an (exonération partielle)
  const exonerationIntegrale = interetsAnneeFin <= LU_CAPITAUX_EXONERATION_INTERETS;
  const baseImposable = exonerationIntegrale
    ? 0
    : interetsCumules; // simplifié : sur l'ensemble des intérêts
  const precompte = baseImposable * LU_CAPITAUX_PRECOMPTE;
  const capitalFinalNet = capitalFinal - precompte;

  // 3e pilier — versement déductible chaque année
  const versement3e = Math.min(versementAnnuel, LU_PREVOYANCE_PLAFOND);
  const tmi = Math.max(0, Math.min(0.42, input.tauxMarginalIR));
  const economieFiscaleAnnuelle = versement3e * tmi;
  const cumulEconomieFiscale = economieFiscaleAnnuelle * n;

  // Cumul 3e pilier : même capitalisation sur versement plafonné
  let capital3e = versementInitial;
  for (let y = 1; y <= n; y++) {
    capital3e = capital3e * (1 + taux) + versement3e;
  }

  // Sortie art. 131 : 50 % imposable demi-global + 50 % à 25 %
  const retraitImposableDemi =
    capital3e * LU_PREVOYANCE_RETRAIT_PART_DEMI_GLOBAL;
  const retraitImposableFlat =
    capital3e * LU_PREVOYANCE_RETRAIT_PART_FLAT;

  // Net après fiscalité retrait (approximation : demi-taux-global = tmi/2, flat = 25 %)
  const taxRetrait =
    retraitImposableDemi * (tmi / 2) +
    retraitImposableFlat * LU_PREVOYANCE_RETRAIT_TAUX_FLAT;
  const capital3eNet = capital3e - taxRetrait + cumulEconomieFiscale;

  const diffNet = capital3eNet - capitalFinalNet;

  return {
    capitalFinal,
    totalVerse,
    gainsBruts,
    interetsAnneeFin,
    exonerationIntegrale,
    precompte,
    capitalFinalNet,
    versement3eAnnuel: versement3e,
    economieFiscaleAnnuelle,
    cumulEconomieFiscale,
    capital3eFinal: capital3e,
    retraitImposableDemi,
    retraitImposableFlat,
    diffNet,
  };
}
