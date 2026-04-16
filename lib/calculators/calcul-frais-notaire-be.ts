import {
  BE_DROITS_ENREG,
  BE_NOTAIRE_FRAIS_DIVERS,
  BE_NOTAIRE_HONORAIRES,
  BE_NOTAIRE_TVA,
  type BERegion,
} from "../tax-rates/be";

export interface FraisNotaireBEInput {
  prixAchat: number;
  region: BERegion;
  premiereHabitation: boolean;
}

export interface FraisNotaireBEResult {
  prixAchat: number;
  region: BERegion;
  premiereHabitation: boolean;
  droitsEnregistrement: number;
  tauxDroitsEnregistrement: number;
  honorairesNotaire: number;
  tvaHonoraires: number;
  fraisDivers: number;
  totalFrais: number;
  totalAcquisition: number;
  detail: {
    label: string;
    montant: number;
  }[];
}

function computeDroitsEnregistrement(
  prix: number,
  region: BERegion,
  premiereHabitation: boolean,
): { droits: number; taux: number } {
  if (region === "wallonie") {
    const taux = premiereHabitation
      ? BE_DROITS_ENREG.wallonie.reduit
      : BE_DROITS_ENREG.wallonie.standard;
    return { droits: prix * taux, taux };
  }
  if (region === "flandre") {
    const taux = premiereHabitation
      ? BE_DROITS_ENREG.flandre.reduit
      : BE_DROITS_ENREG.flandre.standard;
    return { droits: prix * taux, taux };
  }
  // Bruxelles : 12,5 % standard, abattement 200 000 € si prix ≤ 600 000 € et 1ère habitation
  const tauxStd = BE_DROITS_ENREG.bruxelles.standard;
  if (
    premiereHabitation &&
    prix <= BE_DROITS_ENREG.bruxelles.plafondAbattement
  ) {
    const baseImposable = Math.max(
      0,
      prix - BE_DROITS_ENREG.bruxelles.abattement,
    );
    return { droits: baseImposable * tauxStd, taux: tauxStd };
  }
  return { droits: prix * tauxStd, taux: tauxStd };
}

function computeHonoraires(prix: number): number {
  let honoraires = 0;
  let precedentPalier = 0;
  for (const palier of BE_NOTAIRE_HONORAIRES) {
    const tranche = Math.max(0, Math.min(prix, palier.limit) - precedentPalier);
    honoraires += tranche * palier.rate;
    precedentPalier = palier.limit;
    if (prix <= palier.limit) break;
  }
  return honoraires;
}

export function computeFraisNotaireBE(
  input: FraisNotaireBEInput,
): FraisNotaireBEResult {
  const prix = Math.max(0, input.prixAchat);

  const { droits: droitsEnregistrement, taux: tauxDroitsEnregistrement } =
    computeDroitsEnregistrement(prix, input.region, input.premiereHabitation);

  const honorairesNotaire = computeHonoraires(prix);
  const tvaHonoraires = honorairesNotaire * BE_NOTAIRE_TVA;
  const fraisDivers = BE_NOTAIRE_FRAIS_DIVERS;

  const totalFrais =
    droitsEnregistrement + honorairesNotaire + tvaHonoraires + fraisDivers;
  const totalAcquisition = prix + totalFrais;

  return {
    prixAchat: prix,
    region: input.region,
    premiereHabitation: input.premiereHabitation,
    droitsEnregistrement,
    tauxDroitsEnregistrement,
    honorairesNotaire,
    tvaHonoraires,
    fraisDivers,
    totalFrais,
    totalAcquisition,
    detail: [
      { label: "Droits d'enregistrement", montant: droitsEnregistrement },
      { label: "Honoraires notaire (HT)", montant: honorairesNotaire },
      { label: "TVA 21 % sur honoraires", montant: tvaHonoraires },
      { label: "Frais divers (recherches, inscription)", montant: fraisDivers },
    ],
  };
}
