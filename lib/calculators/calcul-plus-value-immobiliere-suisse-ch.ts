import { CH_GAIN_IMMO_BAREME, type CHCanton } from "../tax-rates/ch";

export interface PlusValueImmoCHInput {
  prixVente: number;
  prixAcquisition: number;
  fraisAcquisition: number; // frais notaire, droits mutation payés à l'achat
  investissementsPlusValue: number; // travaux améliorant la valeur
  dureeDetentionAnnees: number;
  canton: CHCanton;
  remploi: boolean; // réinvestissement dans une nouvelle résidence principale → différé
}

export interface PlusValueImmoCHResult {
  prixVente: number;
  prixAcquisition: number;
  fraisAcquisition: number;
  investissementsPlusValue: number;
  plusValueBrute: number;
  plusValueImposable: number;
  dureeDetentionAnnees: number;
  tauxApplicable: number;
  impotGainImmobilier: number;
  netVendeur: number;
  remploi: boolean;
  baremeLabel: string;
}

function tauxGainImmo(canton: CHCanton, duree: number): number {
  const bareme = CH_GAIN_IMMO_BAREME[canton];
  // Parcourt les paliers triés par dureeMin croissant, prend le dernier valide
  let taux = bareme[0].taux;
  for (const p of bareme) {
    if (duree >= p.dureeMin) taux = p.taux;
  }
  return taux;
}

export function computePlusValueImmoCH(
  input: PlusValueImmoCHInput,
): PlusValueImmoCHResult {
  const prixVente = Math.max(0, input.prixVente);
  const prixAcquisition = Math.max(0, input.prixAcquisition);
  const fraisAcq = Math.max(0, input.fraisAcquisition);
  const inv = Math.max(0, input.investissementsPlusValue);
  const duree = Math.max(0, input.dureeDetentionAnnees);

  const plusValueBrute = prixVente - prixAcquisition - fraisAcq - inv;
  const plusValueImposable = input.remploi ? 0 : Math.max(0, plusValueBrute);

  const tauxApplicable = tauxGainImmo(input.canton, duree);
  const impotGainImmobilier = plusValueImposable * tauxApplicable;
  const netVendeur = prixVente - prixAcquisition - impotGainImmobilier; // indicatif

  return {
    prixVente,
    prixAcquisition,
    fraisAcquisition: fraisAcq,
    investissementsPlusValue: inv,
    plusValueBrute,
    plusValueImposable,
    dureeDetentionAnnees: duree,
    tauxApplicable,
    impotGainImmobilier,
    netVendeur,
    remploi: input.remploi,
    baremeLabel: `Barème ${input.canton} — détention ${duree.toFixed(0)} an${duree > 1 ? "s" : ""}`,
  };
}
