"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeFraisKmBE,
  type BETypeDeplacement,
  type FraisKmBEResult,
} from "@/lib/calculators/calcul-frais-kilometriques-belgique-be";
import { formatEuro, formatEuroPrecise, formatNumber } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const TYPE_LABELS: Record<BETypeDeplacement, string> = {
  professionnel: "Pro (0,4246 €/km)",
  domicileTravailFiscal: "Domicile-travail fiscal (0,15 €/km)",
  velo: "Vélo (0,35 €/km, max 2 500 km)",
};

export function FraisKilometriquesBECalculator() {
  const [kmParJour, setKmParJour] = useState<string>("30");
  const [joursParSemaine, setJoursParSemaine] = useState<string>("5");
  const [semaines, setSemaines] = useState<string>("46");
  const [type, setType] = useState<BETypeDeplacement>("professionnel");

  const result = useMemo<FraisKmBEResult | null>(() => {
    const k = parseNum(kmParJour);
    const j = parseNum(joursParSemaine);
    const s = parseNum(semaines);
    if (!Number.isFinite(k) || k <= 0) return null;
    if (!Number.isFinite(j) || j <= 0) return null;
    if (!Number.isFinite(s) || s <= 0) return null;
    return computeFraisKmBE({
      kmParJour: k,
      joursParSemaine: j,
      semaines: s,
      type,
    });
  }, [kmParJour, joursParSemaine, semaines, type]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Vos déplacements
          </h2>
          <p className="text-sm text-slate-500">
            Kilométrage, fréquence et type de trajet
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
                  placeholder="30"
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
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="semaines">Semaines par an</Label>
              <Input
                id="semaines"
                inputMode="decimal"
                value={semaines}
                onChange={(e) => setSemaines(e.target.value)}
                placeholder="46"
              />
              <p className="mt-1 text-xs text-slate-500">
                Typique : 52 − 6 semaines congés = 46
              </p>
            </div>
          </div>

          <div>
            <Label>Type de trajet</Label>
            <RadioGroup
              name="type"
              value={type}
              onChange={setType}
              options={[
                {
                  value: "professionnel",
                  label: "Déplacement professionnel",
                  description:
                    "Indemnité 0,4246 €/km (barème SPF Finances 2026)",
                },
                {
                  value: "domicileTravailFiscal",
                  label: "Domicile-travail (forfait IPP)",
                  description:
                    "Déduction fiscale max 0,15 €/km salarié",
                },
                {
                  value: "velo",
                  label: "Vélo domicile-travail",
                  description:
                    "Indemnité 0,35 €/km plafonnée à 2 500 km/an",
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

function ResultPanel({ result }: { result: FraisKmBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Indemnité annuelle"
          value={formatEuro(result.indemniteAnnuelle)}
          accent
        />
        <Tile
          label="Indemnité mensuelle"
          value={formatEuroPrecise(result.indemniteMensuelle)}
        />
        <Tile
          label="Kilomètres retenus"
          value={`${formatNumber(result.kmRetenus)} km`}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Km par jour (aller-retour)"
            value={`${formatNumber(result.kmParJour)} km`}
          />
          <Row
            label="Jours × semaines travaillées"
            value={`${result.joursParSemaine} × ${result.semaines}`}
          />
          <Row
            label="Km annuels parcourus"
            value={`${formatNumber(result.kmAnnuels)} km`}
          />
          <Row
            label="Km retenus (après plafonnement éventuel)"
            value={`${formatNumber(result.kmRetenus)} km`}
          />
          <Row
            label="Taux appliqué"
            value={`${result.tauxApplique.toFixed(4)} €/km`}
          />
          <Row
            label="Indemnité annuelle"
            value={formatEuro(result.indemniteAnnuelle)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Comparaison des 3 régimes
          </h3>
          <p className="text-sm text-slate-500">
            Pour le même volume de trajets annuels
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Régime</th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Taux €/km
                  </th>
                  <th className="py-2 font-medium text-right">
                    Montant annuel
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.comparaison.map((c) => (
                  <tr
                    key={c.type}
                    className={`border-b border-[var(--border)] last:border-0 ${
                      c.type === result.type ? "bg-[var(--primary)]/5" : ""
                    }`}
                  >
                    <td className="py-2 pr-4 text-slate-700">
                      {TYPE_LABELS[c.type]}
                    </td>
                    <td className="py-2 pr-4 text-right text-slate-700">
                      {c.taux.toFixed(4)}
                    </td>
                    <td className="py-2 text-right font-medium text-slate-900">
                      {formatEuro(c.montant)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
