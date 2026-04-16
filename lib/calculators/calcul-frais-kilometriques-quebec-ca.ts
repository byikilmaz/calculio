import {
  CA_KM_SEUIL_TRANCHE,
  CA_KM_TAUX_TRANCHE1,
  CA_KM_TAUX_TRANCHE2,
} from "../tax-rates/ca";

export type QCTypeKm = "employe" | "autonome";

export interface FraisKmQCInput {
  kmParJour: number;
  joursParSemaine: number;
  semaines: number;
  type: QCTypeKm;
  // Autonome : kilométrage total du véhicule
  kmTotalVehicule: number;
}

export interface FraisKmQCResult {
  kmAnnuels: number;
  kmPro: number; // pour autonome : proportionnel
  tranche1: number; // km dans tranche 1 (5 000 premiers)
  tranche2: number; // km au-delà
  indemniteAnnuelle: number;
  indemniteMensuelle: number;
  indemniteJournaliere: number;
  ratioUsagePro: number; // 0..1 pour autonome
}

export function computeFraisKmQC(input: FraisKmQCInput): FraisKmQCResult | null {
  const kmParJour = Math.max(0, input.kmParJour);
  const jours = Math.max(0, Math.min(7, input.joursParSemaine));
  const sem = Math.max(0, Math.min(52, input.semaines));
  if (kmParJour === 0 || jours === 0 || sem === 0) return null;

  const kmAnnuels = kmParJour * jours * sem;

  let ratioUsagePro = 1;
  let kmPro = kmAnnuels;
  if (input.type === "autonome" && input.kmTotalVehicule > 0) {
    ratioUsagePro = Math.min(1, kmAnnuels / input.kmTotalVehicule);
    kmPro = kmAnnuels; // on ne coupe pas les km parcourus pour usage pro
  }

  const tranche1 = Math.min(kmPro, CA_KM_SEUIL_TRANCHE);
  const tranche2 = Math.max(0, kmPro - CA_KM_SEUIL_TRANCHE);
  const indemniteAnnuelle =
    tranche1 * CA_KM_TAUX_TRANCHE1 + tranche2 * CA_KM_TAUX_TRANCHE2;
  const indemniteMensuelle = indemniteAnnuelle / 12;
  const indemniteJournaliere = (kmParJour * CA_KM_TAUX_TRANCHE1); // jour typique 1re tranche

  return {
    kmAnnuels,
    kmPro,
    tranche1,
    tranche2,
    indemniteAnnuelle,
    indemniteMensuelle,
    indemniteJournaliere,
    ratioUsagePro,
  };
}
