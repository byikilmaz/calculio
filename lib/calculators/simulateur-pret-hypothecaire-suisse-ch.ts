import {
  CH_HYPO_AMORTISSEMENT_ANNEES,
  CH_HYPO_ENTRETIEN_TAUX,
  CH_HYPO_FONDS_PROPRES_DURS_MIN,
  CH_HYPO_FONDS_PROPRES_MIN,
  CH_HYPO_LTV_AMORTISSEMENT,
  CH_HYPO_RATIO_CHARGES_MAX,
  CH_HYPO_TAUX_THEORIQUE,
} from "../tax-rates/ch";

export interface PretHypothecaireCHInput {
  prixBien: number;
  fondsPropresDurs: number; // hors 2e pilier
  fondsPropres2ePilier: number;
  revenuAnnuel: number; // brut annuel du ménage
  tauxEffectif: number; // %, ex 2.0 pour simulateur réel
  dureeAnnees: number; // durée hypothèque (ex 10-25)
}

export interface PretHypothecaireCHResult {
  prixBien: number;
  fondsPropresTotaux: number;
  fondsPropresRequis: number;
  fondsPropresDursRequis: number;
  fondsPropresOK: boolean;
  fondsPropresDursOK: boolean;
  montantEmprunte: number;
  ltv: number; // loan-to-value
  // Hypothèque 1er et 2e rang
  hypo1erRang: number; // jusqu'à 66 % LTV
  hypo2eRang: number; // au-delà de 66 %, à amortir
  amortissementAnnuel: number;
  amortissementMensuel: number;
  // Mensualité effective
  interetsAnnuelsEffectifs: number;
  interetsMensuelsEffectifs: number;
  mensualiteEffective: number;
  // Test bancaire (charges théoriques)
  interetsTheoriques: number;
  entretienTheorique: number;
  chargesTheoriques: number;
  ratioCharges: number;
  ratioOK: boolean;
  // Diagnostic
  diagnostics: string[];
}

export function computePretHypothecaireCH(
  input: PretHypothecaireCHInput,
): PretHypothecaireCHResult | null {
  const prix = Math.max(0, input.prixBien);
  if (prix <= 0) return null;

  const fondsDurs = Math.max(0, input.fondsPropresDurs);
  const fonds2P = Math.max(0, input.fondsPropres2ePilier);
  const fondsPropresTotaux = fondsDurs + fonds2P;

  const fondsPropresRequis = prix * CH_HYPO_FONDS_PROPRES_MIN;
  const fondsPropresDursRequis = prix * CH_HYPO_FONDS_PROPRES_DURS_MIN;

  const fondsPropresOK = fondsPropresTotaux >= fondsPropresRequis;
  const fondsPropresDursOK = fondsDurs >= fondsPropresDursRequis;

  const montantEmprunte = Math.max(0, prix - fondsPropresTotaux);
  const ltv = prix > 0 ? montantEmprunte / prix : 0;

  // Répartition 1er / 2e rang : 1er rang jusqu'à 66 %, le 2e rang est la partie > 66 %
  const seuil1erRang = prix * CH_HYPO_LTV_AMORTISSEMENT;
  const hypo1erRang = Math.min(montantEmprunte, seuil1erRang);
  const hypo2eRang = Math.max(0, montantEmprunte - hypo1erRang);

  // Amortissement du 2e rang en 15 ans (linéaire)
  const amortissementAnnuel =
    hypo2eRang > 0 ? hypo2eRang / CH_HYPO_AMORTISSEMENT_ANNEES : 0;
  const amortissementMensuel = amortissementAnnuel / 12;

  // Intérêts effectifs (mensualités)
  const tauxEffAnnuel = Math.max(0, input.tauxEffectif) / 100;
  const interetsAnnuelsEffectifs = montantEmprunte * tauxEffAnnuel;
  const interetsMensuelsEffectifs = interetsAnnuelsEffectifs / 12;
  const mensualiteEffective = interetsMensuelsEffectifs + amortissementMensuel;

  // Test bancaire : taux théorique 5 % + 1 % entretien/an + amortissement
  const interetsTheoriques = montantEmprunte * CH_HYPO_TAUX_THEORIQUE;
  const entretienTheorique = prix * CH_HYPO_ENTRETIEN_TAUX;
  const chargesTheoriques =
    interetsTheoriques + entretienTheorique + amortissementAnnuel;
  const revenu = Math.max(1, input.revenuAnnuel);
  const ratioCharges = chargesTheoriques / revenu;
  const ratioOK = ratioCharges <= CH_HYPO_RATIO_CHARGES_MAX;

  const diagnostics: string[] = [];
  if (!fondsPropresOK)
    diagnostics.push(
      `Fonds propres insuffisants : il manque ${Math.round(fondsPropresRequis - fondsPropresTotaux)} CHF (20 % minimum requis).`,
    );
  if (!fondsPropresDursOK)
    diagnostics.push(
      `Fonds propres "durs" (hors 2e pilier) insuffisants : 10 % minimum sans utiliser la prévoyance.`,
    );
  if (!ratioOK)
    diagnostics.push(
      `Charges théoriques > 33 % du revenu : la banque refusera probablement le dossier (règle de tenue des charges).`,
    );
  if (fondsPropresOK && fondsPropresDursOK && ratioOK)
    diagnostics.push(
      "Dossier conforme aux critères FINMA/ASB : fonds propres et capacité financière OK.",
    );

  return {
    prixBien: prix,
    fondsPropresTotaux,
    fondsPropresRequis,
    fondsPropresDursRequis,
    fondsPropresOK,
    fondsPropresDursOK,
    montantEmprunte,
    ltv,
    hypo1erRang,
    hypo2eRang,
    amortissementAnnuel,
    amortissementMensuel,
    interetsAnnuelsEffectifs,
    interetsMensuelsEffectifs,
    mensualiteEffective,
    interetsTheoriques,
    entretienTheorique,
    chargesTheoriques,
    ratioCharges,
    ratioOK,
    diagnostics,
  };
}
