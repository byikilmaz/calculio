import {
  BE_BAREME_KM_DOMICILE_TRAVAIL_FISCAL,
  BE_BAREME_KM_FORFAIT_PRO,
  BE_BAREME_KM_VELO,
  BE_BAREME_KM_VELO_PLAFOND_KM,
} from "../tax-rates/be";

export type BETypeDeplacement =
  | "professionnel"
  | "domicileTravailFiscal"
  | "velo";

export interface FraisKmBEInput {
  kmParJour: number;
  joursParSemaine: number;
  semaines: number; // par an
  type: BETypeDeplacement;
}

export interface FraisKmBEResult {
  kmParJour: number;
  joursParSemaine: number;
  semaines: number;
  type: BETypeDeplacement;
  kmAnnuels: number;
  kmRetenus: number; // après plafonnement éventuel (vélo)
  tauxApplique: number;
  indemniteAnnuelle: number;
  indemniteMensuelle: number;
  indemniteJournaliere: number;
  comparaison: Array<{ type: BETypeDeplacement; montant: number; taux: number }>;
}

function tauxPour(type: BETypeDeplacement): number {
  if (type === "professionnel") return BE_BAREME_KM_FORFAIT_PRO;
  if (type === "velo") return BE_BAREME_KM_VELO;
  return BE_BAREME_KM_DOMICILE_TRAVAIL_FISCAL;
}

export function computeFraisKmBE(input: FraisKmBEInput): FraisKmBEResult | null {
  const kmParJour = Math.max(0, input.kmParJour);
  const joursParSemaine = Math.max(0, Math.min(7, input.joursParSemaine));
  const semaines = Math.max(0, Math.min(52, input.semaines));

  if (kmParJour === 0 || joursParSemaine === 0 || semaines === 0) return null;

  const kmAnnuels = kmParJour * joursParSemaine * semaines;
  let kmRetenus = kmAnnuels;
  if (input.type === "velo") {
    kmRetenus = Math.min(kmAnnuels, BE_BAREME_KM_VELO_PLAFOND_KM);
  }

  const tauxApplique = tauxPour(input.type);
  const indemniteAnnuelle = kmRetenus * tauxApplique;
  const indemniteMensuelle = indemniteAnnuelle / 12;
  const indemniteJournaliere =
    (kmParJour * tauxApplique) * (input.type === "velo" ? Math.min(1, BE_BAREME_KM_VELO_PLAFOND_KM / kmAnnuels) : 1);

  const types: BETypeDeplacement[] = [
    "professionnel",
    "domicileTravailFiscal",
    "velo",
  ];
  const comparaison = types.map((t) => {
    const taux = tauxPour(t);
    const km = t === "velo" ? Math.min(kmAnnuels, BE_BAREME_KM_VELO_PLAFOND_KM) : kmAnnuels;
    return { type: t, montant: km * taux, taux };
  });

  return {
    kmParJour,
    joursParSemaine,
    semaines,
    type: input.type,
    kmAnnuels,
    kmRetenus,
    tauxApplique,
    indemniteAnnuelle,
    indemniteMensuelle,
    indemniteJournaliere,
    comparaison,
  };
}
