export interface EpargneInput {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number; // en %
  dureeAnnees: number;
}

export interface YearlyBreakdown {
  annee: number;
  capitalCumule: number;
  versementsCumules: number;
  interetsCumules: number;
}

export interface EpargneResult {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number;
  dureeAnnees: number;
  capitalFinal: number;
  totalVerse: number;
  interetsTotal: number;
  breakdown: YearlyBreakdown[];
}

export function computeEpargneFR(input: EpargneInput): EpargneResult | null {
  const {
    capitalInitial,
    versementMensuel,
    tauxAnnuel,
    dureeAnnees,
  } = input;

  if (!Number.isFinite(capitalInitial) || capitalInitial < 0) return null;
  if (!Number.isFinite(versementMensuel) || versementMensuel < 0) return null;
  if (!Number.isFinite(tauxAnnuel)) return null;
  if (!Number.isFinite(dureeAnnees) || dureeAnnees <= 0) return null;

  const mois = Math.round(dureeAnnees * 12);
  const i = tauxAnnuel / 100 / 12;

  // Itération mensuelle pour générer le breakdown annuel précis
  const breakdown: YearlyBreakdown[] = [];
  let capital = capitalInitial;
  let versesCumules = capitalInitial;
  for (let m = 1; m <= mois; m++) {
    capital = capital * (1 + i) + versementMensuel;
    versesCumules += versementMensuel;
    if (m % 12 === 0) {
      const annee = m / 12;
      breakdown.push({
        annee,
        capitalCumule: capital,
        versementsCumules: versesCumules,
        interetsCumules: capital - versesCumules,
      });
    }
  }
  // Si la durée n'est pas un multiple de 12, ajouter le dernier point
  if (mois % 12 !== 0) {
    breakdown.push({
      annee: mois / 12,
      capitalCumule: capital,
      versementsCumules: versesCumules,
      interetsCumules: capital - versesCumules,
    });
  }

  const capitalFinal = capital;
  const totalVerse = versesCumules;
  const interetsTotal = capitalFinal - totalVerse;

  return {
    capitalInitial,
    versementMensuel,
    tauxAnnuel,
    dureeAnnees,
    capitalFinal,
    totalVerse,
    interetsTotal,
    breakdown,
  };
}
