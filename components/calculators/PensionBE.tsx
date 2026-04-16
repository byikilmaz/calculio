"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computePensionBE,
  type BEEpargnePensionRegime,
  type BEFoyerPension,
  type BERegimePension,
  type PensionBEResult,
} from "@/lib/calculators/calculateur-pension-belgique-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PensionBECalculator() {
  const [ageActuel, setAgeActuel] = useState<string>("35");
  const [ageDepart, setAgeDepart] = useState<string>("65");
  const [salaire, setSalaire] = useState<string>("45000");
  const [carriere, setCarriere] = useState<string>("13");
  const [foyer, setFoyer] = useState<BEFoyerPension>("isole");
  const [regime, setRegime] = useState<BERegimePension>("salarie");
  const [versementGroupe, setVersementGroupe] = useState<string>("1200");
  const [rendementGroupe, setRendementGroupe] = useState<string>("2.25");
  const [versementEpargne, setVersementEpargne] = useState<string>("1020");
  const [epargneRegime, setEpargneRegime] =
    useState<BEEpargnePensionRegime>("ordinaire");
  const [rendementEpargne, setRendementEpargne] = useState<string>("3");

  const result = useMemo<PensionBEResult | null>(() => {
    const ageA = parseNum(ageActuel);
    const ageD = parseNum(ageDepart);
    const sal = parseNum(salaire);
    const car = parseNum(carriere);
    const vg = parseNum(versementGroupe);
    const rg = parseNum(rendementGroupe);
    const ve = parseNum(versementEpargne);
    const re = parseNum(rendementEpargne);
    if (!Number.isFinite(ageA) || ageA < 18 || ageA > 67) return null;
    if (!Number.isFinite(ageD) || ageD < ageA) return null;
    if (!Number.isFinite(sal) || sal < 0) return null;
    if (!Number.isFinite(car) || car < 0) return null;
    return computePensionBE({
      ageActuel: ageA,
      ageDepart: ageD,
      salaireMoyenAnnuel: sal,
      anneesCarriere: car,
      foyer,
      regime,
      versementGroupeAnnuel: Number.isFinite(vg) ? Math.max(0, vg) : 0,
      rendementAssuranceGroupe: Number.isFinite(rg) ? rg : 0,
      versementEpargnePensionAnnuel: Number.isFinite(ve) ? Math.max(0, ve) : 0,
      epargnePensionRegime: epargneRegime,
      rendementEpargnePension: Number.isFinite(re) ? re : 0,
    });
  }, [
    ageActuel,
    ageDepart,
    salaire,
    carriere,
    foyer,
    regime,
    versementGroupe,
    rendementGroupe,
    versementEpargne,
    epargneRegime,
    rendementEpargne,
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre carrière et votre foyer
          </h2>
          <p className="text-sm text-slate-500">
            Données de base pour projeter votre pension légale (1er pilier)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="ageActuel">Âge actuel</Label>
              <Input
                id="ageActuel"
                inputMode="decimal"
                value={ageActuel}
                onChange={(e) => setAgeActuel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ageDepart">Âge de départ en pension</Label>
              <Input
                id="ageDepart"
                inputMode="decimal"
                value={ageDepart}
                onChange={(e) => setAgeDepart(e.target.value)}
              />
              <p className="mt-1 text-xs text-slate-500">
                Âge légal : 65 ans (2026) → 66 ans (2025) → 67 ans (2030).
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="salaire">Salaire moyen annuel brut</Label>
              <div className="relative">
                <Input
                  id="salaire"
                  inputMode="decimal"
                  value={salaire}
                  onChange={(e) => setSalaire(e.target.value)}
                  placeholder="45000"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="carriere">Années déjà cotisées</Label>
              <Input
                id="carriere"
                inputMode="decimal"
                value={carriere}
                onChange={(e) => setCarriere(e.target.value)}
              />
              <p className="mt-1 text-xs text-slate-500">
                Carrière complète : 45 ans.
              </p>
            </div>
          </div>
          <div>
            <Label>Situation familiale</Label>
            <RadioGroup
              name="foyer"
              value={foyer}
              onChange={setFoyer}
              options={[
                {
                  value: "isole",
                  label: "Isolé — taux 60 %",
                  description: "Célibataire / divorcé / conjoint sans droit",
                },
                {
                  value: "menage",
                  label: "Taux ménage — 75 %",
                  description: "Conjoint à charge (sans revenu propre)",
                },
              ]}
            />
          </div>
          <div>
            <Label>Régime de pension</Label>
            <RadioGroup
              name="regime"
              value={regime}
              onChange={setRegime}
              options={[
                {
                  value: "salarie",
                  label: "Salarié",
                  description: "Régime général (Servicepension)",
                },
                {
                  value: "independant",
                  label: "Indépendant",
                  description: "Plafond salarial plus bas, mêmes taux",
                },
                {
                  value: "fonctionnaire",
                  label: "Fonctionnaire",
                  description: "Traitement de référence, tantièmes spécifiques",
                },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Piliers complémentaires (optionnel)
          </h2>
          <p className="text-sm text-slate-500">
            Assurance groupe (2ᵉ pilier) et épargne-pension (3ᵉ pilier)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="versementGroupe">
                Versement annuel assurance groupe
              </Label>
              <div className="relative">
                <Input
                  id="versementGroupe"
                  inputMode="decimal"
                  value={versementGroupe}
                  onChange={(e) => setVersementGroupe(e.target.value)}
                  placeholder="1200"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="rendementGroupe">
                Rendement assurance groupe
              </Label>
              <div className="relative">
                <Input
                  id="rendementGroupe"
                  inputMode="decimal"
                  value={rendementGroupe}
                  onChange={(e) => setRendementGroupe(e.target.value)}
                  placeholder="2.25"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="versementEpargne">
                Versement annuel épargne-pension
              </Label>
              <div className="relative">
                <Input
                  id="versementEpargne"
                  inputMode="decimal"
                  value={versementEpargne}
                  onChange={(e) => setVersementEpargne(e.target.value)}
                  placeholder="1020"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="rendementEpargne">
                Rendement épargne-pension
              </Label>
              <div className="relative">
                <Input
                  id="rendementEpargne"
                  inputMode="decimal"
                  value={rendementEpargne}
                  onChange={(e) => setRendementEpargne(e.target.value)}
                  placeholder="3"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label>Régime fiscal épargne-pension</Label>
            <RadioGroup
              name="epargneRegime"
              value={epargneRegime}
              onChange={setEpargneRegime}
              options={[
                {
                  value: "ordinaire",
                  label: "Plafond ordinaire (1 020 €)",
                  description: "Réduction d'impôt 30 %",
                },
                {
                  value: "majore",
                  label: "Plafond majoré (1 310 €)",
                  description: "Réduction d'impôt 25 % — option à déclarer",
                },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: PensionBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Pension totale estimée"
          value={formatEuro(result.pensionTotaleMensuelle) + "/mois"}
          accent
        />
        <Tile
          label="Pension légale (1er pilier)"
          value={formatEuro(result.pensionLegaleMensuelle) + "/mois"}
        />
        <Tile
          label="Taux de remplacement"
          value={formatPercent(result.tauxRemplacement, 0)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            1er pilier — pension légale
          </h3>
          <p className="text-sm text-slate-500">
            Carrière projetée : {result.anneesCarriereProjetees} / 45 années
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire moyen retenu (plafonné à 74 668 €)"
            value={formatEuroPrecise(result.salaireRetenu)}
          />
          <Row
            label={`Taux pension (${
              result.tauxPension === 0.75 ? "ménage 75 %" : "isolé 60 %"
            })`}
            value={formatPercent(result.tauxPension, 0)}
          />
          <Row
            label="Pension légale brute annuelle"
            value={formatEuroPrecise(result.pensionLegaleAnnuelle)}
            bold
          />
          <Row
            label="Pension légale mensuelle"
            value={formatEuroPrecise(result.pensionLegaleMensuelle)}
            bold
          />
          {result.pensionPlancherApplique && (
            <p className="text-xs text-emerald-700">
              Plancher pension minimum appliqué (
              {formatEuroPrecise(result.pensionMinimumMensuelle)}/mois).
            </p>
          )}
          {result.pensionPlafonnee && (
            <p className="text-xs text-amber-700">
              Plafond pension maximum atteint (
              {formatEuroPrecise(result.pensionMaximumMensuelle)}/mois).
            </p>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            2ᵉ pilier — assurance groupe
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Capital projeté à la retraite"
            value={formatEuro(result.capitalAssuranceGroupe)}
          />
          <Row
            label="Rente mensuelle estimée (4 %/an)"
            value={formatEuroPrecise(result.renteMensuelleGroupe)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            3ᵉ pilier — épargne-pension
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Plafond fiscal applicable"
            value={formatEuro(result.plafondEpargnePension)}
          />
          <Row
            label="Réduction d'impôt annuelle"
            value={formatEuroPrecise(result.reductionImpotEpargnePension)}
          />
          <Row
            label="Capital projeté à la retraite"
            value={formatEuro(result.capitalEpargnePension)}
          />
          <Row
            label="Rente mensuelle estimée (4 %/an)"
            value={formatEuroPrecise(result.renteMensuelleEpargnePension)}
            bold
          />
        </CardBody>
      </Card>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600">{label}</span>
      <span
        className={
          bold ? "font-semibold text-slate-900" : "font-medium text-slate-900"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Tile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-lg bg-[var(--primary)] p-5 text-white shadow-sm"
          : "rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm"
      }
    >
      <div
        className={accent ? "text-sm text-white/80" : "text-sm text-slate-500"}
      >
        {label}
      </div>
      <div
        className={
          accent
            ? "mt-1 text-2xl font-bold"
            : "mt-1 text-2xl font-bold text-slate-900"
        }
      >
        {value}
      </div>
    </div>
  );
}
