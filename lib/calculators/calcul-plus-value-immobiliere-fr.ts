import {
  FR_PLUSVALUE_IR_RATE,
  FR_PLUSVALUE_PS_RATE,
  FR_PLUSVALUE_FRAIS_FORFAIT,
  FR_PLUSVALUE_TRAVAUX_FORFAIT,
} from "../tax-rates/fr";

export interface PlusValueInput {
  prixAchat: number;
  prixVente: number;
  anneeAchat: number;
  anneeVente: number;
  residencePrincipale: boolean;
  fraisAcquisitionReels?: number; // optional
  travauxReels?: number; // optional
}

export interface PlusValueResult {
  exoneree: boolean;
  motif?: string;
  dureeDetention: number;
  prixAcquisitionCorrige: number;
  fraisAcquisitionRetenus: number;
  travauxRetenus: number;
  plusValueBrute: number;
  abattementIR: number;
  abattementPS: number;
  baseImposableIR: number;
  baseImposablePS: number;
  impotIR: number;
  impotPS: number;
  surtaxe: number;
  totalImpot: number;
  plusValueNette: number;
}

function abattementIR(annees: number): number {
  if (annees < 6) return 0;
  if (annees < 22) return Math.min(1, (annees - 5) * 0.06);
  if (annees === 22) return 1;
  return 1; // >22 ans: exonéré
}

function abattementPS(annees: number): number {
  if (annees < 6) return 0;
  if (annees < 22) return Math.min(1, (annees - 5) * 0.0165);
  if (annees === 22) return 16 * 0.0165 + 0.016; // 0.264 + 0.016 = 0.28
  if (annees >= 30) return 1;
  // 23 à 29 ans: base 0.28 + 0.09 par année au-delà de 22
  return Math.min(1, 0.28 + (annees - 22) * 0.09);
}

function calculerSurtaxe(plusValueNette: number): number {
  // Barème simplifié de surtaxe (CGI art. 1609 nonies G)
  // Appliqué sur plus-value imposable après abattement pour durée de détention
  // Simplification pédagogique par tranches.
  if (plusValueNette <= 50000) return 0;
  if (plusValueNette <= 100000) return plusValueNette * 0.02;
  if (plusValueNette <= 150000) return plusValueNette * 0.03;
  if (plusValueNette <= 200000) return plusValueNette * 0.04;
  if (plusValueNette <= 250000) return plusValueNette * 0.05;
  return plusValueNette * 0.06;
}

export function computePlusValueImmobiliereFR(
  input: PlusValueInput,
): PlusValueResult {
  const prixAchat = Math.max(0, input.prixAchat);
  const prixVente = Math.max(0, input.prixVente);
  const annees = Math.max(0, input.anneeVente - input.anneeAchat);

  if (input.residencePrincipale) {
    return {
      exoneree: true,
      motif: "Exonération totale au titre de la résidence principale",
      dureeDetention: annees,
      prixAcquisitionCorrige: prixAchat,
      fraisAcquisitionRetenus: 0,
      travauxRetenus: 0,
      plusValueBrute: prixVente - prixAchat,
      abattementIR: 1,
      abattementPS: 1,
      baseImposableIR: 0,
      baseImposablePS: 0,
      impotIR: 0,
      impotPS: 0,
      surtaxe: 0,
      totalImpot: 0,
      plusValueNette: prixVente - prixAchat,
    };
  }

  // Frais d'acquisition: réels si renseignés, sinon forfait 7.5% du prix d'achat
  const fraisForfait = prixAchat * FR_PLUSVALUE_FRAIS_FORFAIT;
  const fraisAcquisitionRetenus =
    input.fraisAcquisitionReels != null && input.fraisAcquisitionReels > 0
      ? Math.max(input.fraisAcquisitionReels, fraisForfait)
      : fraisForfait;

  // Travaux: réels si renseignés, sinon forfait 15% si détenu ≥ 5 ans
  let travauxRetenus = 0;
  if (input.travauxReels != null && input.travauxReels > 0) {
    travauxRetenus = input.travauxReels;
    if (annees >= 5) {
      const forfaitTravaux = prixAchat * FR_PLUSVALUE_TRAVAUX_FORFAIT;
      travauxRetenus = Math.max(travauxRetenus, forfaitTravaux);
    }
  } else if (annees >= 5) {
    travauxRetenus = prixAchat * FR_PLUSVALUE_TRAVAUX_FORFAIT;
  }

  const prixAcquisitionCorrige =
    prixAchat + fraisAcquisitionRetenus + travauxRetenus;
  const plusValueBrute = prixVente - prixAcquisitionCorrige;

  if (plusValueBrute <= 0) {
    return {
      exoneree: false,
      motif: "Aucune plus-value imposable",
      dureeDetention: annees,
      prixAcquisitionCorrige,
      fraisAcquisitionRetenus,
      travauxRetenus,
      plusValueBrute,
      abattementIR: 0,
      abattementPS: 0,
      baseImposableIR: 0,
      baseImposablePS: 0,
      impotIR: 0,
      impotPS: 0,
      surtaxe: 0,
      totalImpot: 0,
      plusValueNette: plusValueBrute,
    };
  }

  const abIR = abattementIR(annees);
  const abPS = abattementPS(annees);
  const baseImposableIR = plusValueBrute * (1 - abIR);
  const baseImposablePS = plusValueBrute * (1 - abPS);
  const impotIR = baseImposableIR * FR_PLUSVALUE_IR_RATE;
  const impotPS = baseImposablePS * FR_PLUSVALUE_PS_RATE;
  const surtaxe = calculerSurtaxe(baseImposableIR);
  const totalImpot = impotIR + impotPS + surtaxe;
  const plusValueNette = plusValueBrute - totalImpot;

  return {
    exoneree: false,
    dureeDetention: annees,
    prixAcquisitionCorrige,
    fraisAcquisitionRetenus,
    travauxRetenus,
    plusValueBrute,
    abattementIR: abIR,
    abattementPS: abPS,
    baseImposableIR,
    baseImposablePS,
    impotIR,
    impotPS,
    surtaxe,
    totalImpot,
    plusValueNette,
  };
}
