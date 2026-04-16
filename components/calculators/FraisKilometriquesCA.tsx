"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeFraisKmQC,
  type FraisKmQCResult,
  type QCTypeKm,
} from "@/lib/calculators/calcul-frais-kilometriques-quebec-ca";
import { formatCAD, formatCADPrecise, formatNumber, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function FraisKilometriquesCACalculator() {
  const [kmParJour, setKmParJour] = useState<string>("40");
  const [joursParSemaine, setJoursParSemaine] = useState<string>("5");
  const [semaines, setSemaines] = useState<string>("46");
  const [type, setType] = useState<QCTypeKm>("employe");
  const [kmTotalVehicule, setKmTotalVehicule] = useState<string>("20000");

  const result = useMemo<FraisKmQCResult | null>(() => {
    return computeFraisKmQC({
      kmParJour: parseNum(kmParJour) || 0,
      joursParSemaine: parseNum(joursParSemaine) || 0,
      semaines: parseNum(semaines) || 0,
      type,
      kmTotalVehicule: parseNum(kmTotalVehicule) || 0,
    });
  }, [kmParJour, joursParSemaine, semaines, type, kmTotalVehicule]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Vos déplacements
          </h2>
          <p className="text-sm text-slate-500">
            Barème ARC 2026 — 0,72 $/km (1ers 5 000 km) puis 0,66 $/km
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="kmJour">Km par jour (aller-retour)</Label>
              <div className="relative">
                <Input
                  id="kmJour"
                  inputMode="decimal"
                  value={kmParJour}
                  onChange={(e) => setKmParJour(e.target.value)}
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  km
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="joursSem">Jours par semaine</Label>
              <Input
                id="joursSem"
                inputMode="decimal"
                value={joursParSemaine}
                onChange={(e) => setJoursParSemaine(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="semaines">Semaines par an</Label>
              <Input
                id="semaines"
                inputMode="decimal"
                value={semaines}
                onChange={(e) => setSemaines(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Statut</Label>
            <RadioGroup
              name="type"
              value={type}
              onChange={setType}
              options={[
                {
                  value: "employe",
                  label: "Employé",
                  description: "Remboursement non imposable si ≤ taux ARC",
                },
                {
                  value: "autonome",
                  label: "Travailleur autonome",
                  description: "Proportion véhicule usage pro vs total",
                },
              ]}
            />
          </div>

          {type === "autonome" && (
            <div>
              <Label htmlFor="kmTotal">Km total du véhicule dans l&apos;année</Label>
              <div className="relative">
                <Input
                  id="kmTotal"
                  inputMode="decimal"
                  value={kmTotalVehicule}
                  onChange={(e) => setKmTotalVehicule(e.target.value)}
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  km
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Pour calculer le ratio d&apos;usage pro/perso
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} typeInput={type} />}
    </div>
  );
}

function ResultPanel({
  result,
  typeInput,
}: {
  result: FraisKmQCResult;
  typeInput: QCTypeKm;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Indemnité annuelle"
          value={formatCAD(result.indemniteAnnuelle)}
          accent
        />
        <Tile
          label="Indemnité mensuelle"
          value={formatCADPrecise(result.indemniteMensuelle)}
        />
        <Tile
          label="Kilomètres annuels"
          value={`${formatNumber(result.kmAnnuels)} km`}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">Détail</h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Km parcourus dans l'année"
            value={`${formatNumber(result.kmAnnuels)} km`}
          />
          {typeInput === "autonome" && (
            <Row
              label="Ratio usage professionnel"
              value={formatPercent(result.ratioUsagePro, 0)}
            />
          )}
          <Row
            label={`Tranche 1 (${formatNumber(result.tranche1)} km × 0,72 $)`}
            value={formatCADPrecise(result.tranche1 * 0.72)}
          />
          {result.tranche2 > 0 && (
            <Row
              label={`Tranche 2 (${formatNumber(result.tranche2)} km × 0,66 $)`}
              value={formatCADPrecise(result.tranche2 * 0.66)}
            />
          )}
          <Row
            label="Indemnité annuelle totale"
            value={formatCADPrecise(result.indemniteAnnuelle)}
            bold
          />
        </CardBody>
      </Card>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600">{label}</span>
      <span
        className={bold ? "font-semibold text-slate-900" : "font-medium text-slate-900"}
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
      <div className={accent ? "text-sm text-white/80" : "text-sm text-slate-500"}>
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
