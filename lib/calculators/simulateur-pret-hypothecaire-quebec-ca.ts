import {
  CA_HYPO_AMORTISSEMENT_MAX_ASSURE,
  CA_HYPO_AMORTISSEMENT_MAX_CONV,
  CA_HYPO_MISE_MIN_TRANCHE1,
  CA_HYPO_MISE_MIN_TRANCHE1_PLAFOND,
  CA_HYPO_MISE_MIN_TRANCHE2,
  CA_HYPO_MISE_MIN_TRANCHE2_PLAFOND,
  CA_HYPO_MISE_MIN_TRANCHE3,
  CA_HYPO_PRIME_SCHL,
  CA_HYPO_TAUX_STRESS_PLANCHER,
} from "../tax-rates/ca";

export interface PretHypothecaireQCInput {
  prixBien: number;
  miseDeFonds: number;
  tauxContractuel: number; // %, ex 5.2
  amortissementAnnees: number; // 5..30
  revenuMenage: number;
  dettesMensuelles: number; // prêts auto, carte, pension etc.
}

export interface PretHypothecaireQCResult {
  prixBien: number;
  miseDeFonds: number;
  miseMinimumRequise: number;
  miseOK: boolean;
  amortissementAnnees: number;
  amortissementMaxAutorise: number;
  assuranceRequise: boolean;
  ltv: number;
  primeSCHLPct: number;
  primeSCHLMontant: number;
  montantEmprunte: number; // principal assuré inclus
  mensualite: number;
  tauxStressApplique: number;
  mensualiteStress: number;
  // GDS / ATD
  ratioGDS: number; // gross debt service
  ratioATD: number; // amortissement total (charges + autres dettes)
  gdsOK: boolean; // ≤ 39 %
  atdOK: boolean; // ≤ 44 %
  diagnostics: string[];
}

function miseMinimumRequise(prix: number): number {
  if (prix >= CA_HYPO_MISE_MIN_TRANCHE2_PLAFOND) {
    return prix * CA_HYPO_MISE_MIN_TRANCHE3;
  }
  if (prix <= CA_HYPO_MISE_MIN_TRANCHE1_PLAFOND) {
    return prix * CA_HYPO_MISE_MIN_TRANCHE1;
  }
  // 5 % du premier 500 k + 10 % du delta
  return (
    CA_HYPO_MISE_MIN_TRANCHE1_PLAFOND * CA_HYPO_MISE_MIN_TRANCHE1 +
    (prix - CA_HYPO_MISE_MIN_TRANCHE1_PLAFOND) * CA_HYPO_MISE_MIN_TRANCHE2
  );
}

function primeSCHL(ltv: number): number {
  if (ltv <= 0) return 0;
  for (const p of CA_HYPO_PRIME_SCHL) {
    if (ltv > p.ltvMin && ltv <= p.ltvMax) return p.prime;
  }
  return 0;
}

function mensualiteAmortie(
  principal: number,
  tauxAnnuelPct: number,
  annees: number,
): number {
  const n = annees * 12;
  const i = tauxAnnuelPct / 100 / 12;
  if (principal <= 0 || n <= 0) return 0;
  if (i === 0) return principal / n;
  return (principal * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
}

export function computePretHypothecaireQC(
  input: PretHypothecaireQCInput,
): PretHypothecaireQCResult | null {
  const prix = Math.max(0, input.prixBien);
  if (prix <= 0) return null;

  const mise = Math.max(0, input.miseDeFonds);
  const miseMin = miseMinimumRequise(prix);
  const miseOK = mise >= miseMin;

  const ratioMise = prix > 0 ? mise / prix : 0;
  const assuranceRequise = ratioMise < 0.2;

  const amortissementMaxAutorise = assuranceRequise
    ? CA_HYPO_AMORTISSEMENT_MAX_ASSURE
    : CA_HYPO_AMORTISSEMENT_MAX_CONV;
  const amortissementAnnees = Math.min(
    Math.max(5, input.amortissementAnnees),
    amortissementMaxAutorise,
  );

  const principalNonAssure = Math.max(0, prix - mise);
  const ltv = prix > 0 ? principalNonAssure / prix : 0;
  const primeSCHLPct = assuranceRequise ? primeSCHL(ltv) : 0;
  const primeSCHLMontant = principalNonAssure * primeSCHLPct;
  const montantEmprunte = principalNonAssure + primeSCHLMontant;

  const tauxContractuel = Math.max(0, input.tauxContractuel);
  const mensualite = mensualiteAmortie(
    montantEmprunte,
    tauxContractuel,
    amortissementAnnees,
  );

  // Test de stress : max(taux contractuel + 2 %, 5,25 %)
  const tauxStressApplique = Math.max(
    tauxContractuel + 2,
    CA_HYPO_TAUX_STRESS_PLANCHER * 100,
  );
  const mensualiteStress = mensualiteAmortie(
    montantEmprunte,
    tauxStressApplique,
    amortissementAnnees,
  );

  // GDS : mensualité stress + impôts fonciers + chauffage (approx 300 $/mois)
  const fraisConnexesMensuels = prix * 0.01 / 12 + 150; // approx 1 % prix/an + chauffage
  const revenuMensuel = Math.max(1, input.revenuMenage / 12);
  const ratioGDS = (mensualiteStress + fraisConnexesMensuels) / revenuMensuel;
  const gdsOK = ratioGDS <= 0.39;

  const dettes = Math.max(0, input.dettesMensuelles);
  const ratioATD =
    (mensualiteStress + fraisConnexesMensuels + dettes) / revenuMensuel;
  const atdOK = ratioATD <= 0.44;

  const diagnostics: string[] = [];
  if (!miseOK)
    diagnostics.push(
      `Mise de fonds insuffisante : il manque ${Math.round(miseMin - mise)} $ (minimum ${Math.round(miseMin)} $).`,
    );
  if (!gdsOK)
    diagnostics.push(
      `Ratio d'amortissement brut (GDS) > 39 % : dossier probablement refusé par les institutions.`,
    );
  if (!atdOK)
    diagnostics.push(
      `Ratio d'amortissement total (ATD) > 44 % : dossier probablement refusé — réduisez les autres dettes.`,
    );
  if (assuranceRequise)
    diagnostics.push(
      `Prêt assuré SCHL obligatoire (mise < 20 %) : prime ${(primeSCHLPct * 100).toFixed(1)} % ajoutée au capital.`,
    );
  if (miseOK && gdsOK && atdOK)
    diagnostics.push("Dossier conforme aux critères des prêteurs canadiens.");

  return {
    prixBien: prix,
    miseDeFonds: mise,
    miseMinimumRequise: miseMin,
    miseOK,
    amortissementAnnees,
    amortissementMaxAutorise,
    assuranceRequise,
    ltv,
    primeSCHLPct,
    primeSCHLMontant,
    montantEmprunte,
    mensualite,
    tauxStressApplique,
    mensualiteStress,
    ratioGDS,
    ratioATD,
    gdsOK,
    atdOK,
    diagnostics,
  };
}
