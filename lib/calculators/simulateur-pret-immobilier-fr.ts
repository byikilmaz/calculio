export interface PretImmobilierInput {
  montant: number;
  dureeAnnees: number;
  tauxAnnuel: number; // en pourcentage (ex 3.5)
  tauxAssurance: number; // en pourcentage (ex 0.34)
}

export interface AmortizationYear {
  annee: number;
  capitalRembourse: number;
  interetsPayes: number;
  assurancePayee: number;
  capitalRestantDu: number;
}

export interface PretImmobilierResult {
  montant: number;
  dureeAnnees: number;
  dureeMois: number;
  tauxAnnuel: number;
  tauxAssurance: number;
  mensualiteHorsAssurance: number;
  mensualiteAssurance: number;
  mensualiteTotale: number;
  coutTotalCredit: number;
  coutTotalAssurance: number;
  coutTotal: number;
  taegApprox: number;
  echeancier: AmortizationYear[];
}

export function computePretImmobilierFR(
  input: PretImmobilierInput,
): PretImmobilierResult | null {
  const { montant, dureeAnnees, tauxAnnuel, tauxAssurance } = input;
  if (
    !Number.isFinite(montant) ||
    montant <= 0 ||
    !Number.isFinite(dureeAnnees) ||
    dureeAnnees <= 0
  )
    return null;

  const n = Math.round(dureeAnnees * 12);
  const i = tauxAnnuel / 100 / 12;
  const mensualiteHorsAssurance =
    i === 0 ? montant / n : (montant * i) / (1 - Math.pow(1 + i, -n));
  const mensualiteAssurance = montant * (tauxAssurance / 100 / 12);
  const mensualiteTotale = mensualiteHorsAssurance + mensualiteAssurance;

  // Génération de l'échéancier annuel
  let capitalRestant = montant;
  const echeancier: AmortizationYear[] = [];
  const annees = Math.ceil(dureeAnnees);
  for (let annee = 1; annee <= annees; annee++) {
    let capitalRembourseAnnee = 0;
    let interetsAnnee = 0;
    let assuranceAnnee = 0;
    const moisDebut = (annee - 1) * 12 + 1;
    const moisFin = Math.min(annee * 12, n);
    for (let m = moisDebut; m <= moisFin; m++) {
      const interets = capitalRestant * i;
      const capitalMois = mensualiteHorsAssurance - interets;
      capitalRestant = Math.max(0, capitalRestant - capitalMois);
      capitalRembourseAnnee += capitalMois;
      interetsAnnee += interets;
      assuranceAnnee += mensualiteAssurance;
    }
    echeancier.push({
      annee,
      capitalRembourse: capitalRembourseAnnee,
      interetsPayes: interetsAnnee,
      assurancePayee: assuranceAnnee,
      capitalRestantDu: capitalRestant,
    });
  }

  const coutTotalCredit = mensualiteHorsAssurance * n - montant;
  const coutTotalAssurance = mensualiteAssurance * n;
  const coutTotal = coutTotalCredit + coutTotalAssurance;

  // TAEG approximatif (indicatif)
  const taegApprox =
    montant > 0 && dureeAnnees > 0
      ? (tauxAnnuel + tauxAssurance) / 1
      : 0;

  return {
    montant,
    dureeAnnees,
    dureeMois: n,
    tauxAnnuel,
    tauxAssurance,
    mensualiteHorsAssurance,
    mensualiteAssurance,
    mensualiteTotale,
    coutTotalCredit,
    coutTotalAssurance,
    coutTotal,
    taegApprox,
    echeancier,
  };
}
