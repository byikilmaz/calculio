"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeRetraiteFR,
  type RetraiteResult,
} from "@/lib/calculators/calculateur-retraite-fr";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function RetraiteCalculator() {
  const [ageActuel, setAgeActuel] = useState<string>("40");
  const [ageDepart, setAgeDepart] = useState<string>("64");
  const [salaire, setSalaire] = useState<string>("38000");

  const result = useMemo<RetraiteResult | null>(() => {
    const a = parseNum(ageActuel);
    const d = parseNum(ageDepart);
    const s = parseNum(salaire);
    if (!Number.isFinite(a) || a <= 0) return null;
    if (!Number.isFinite(d) || d <= 0) return null;
    if (!Number.isFinite(s) || s < 0) return null;
    return computeRetraiteFR({
      ageActuel: a,
      ageDepart: d,
      salaireBrutAnnuel: s,
    });
  }, [ageActuel, ageDepart, salaire]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Estimation indicative.</strong> Cette simulation est une
        approximation pédagogique qui ne remplace pas votre relevé de carrière
        officiel. Pour un calcul précis basé sur votre historique réel, rendez-vous
        sur <span className="underline">info-retraite.fr</span>.
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre situation
          </h2>
          <p className="text-sm text-slate-500">
            Renseignez votre âge et votre salaire moyen de carrière
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="ageActuel">Âge actuel</Label>
              <Input
                id="ageActuel"
                inputMode="numeric"
                value={ageActuel}
                onChange={(e) => setAgeActuel(e.target.value)}
                placeholder="40"
              />
            </div>
            <div>
              <Label htmlFor="ageDepart">Âge de départ souhaité</Label>
              <Input
                id="ageDepart"
                type="range"
                min={62}
                max={67}
                step={1}
                value={ageDepart}
                onChange={(e) => setAgeDepart(e.target.value)}
              />
              <div className="mt-1 text-sm text-slate-500">{ageDepart} ans</div>
            </div>
          </div>

          <div>
            <Label htmlFor="salaire">Salaire brut annuel moyen</Label>
            <div className="relative">
              <Input
                id="salaire"
                inputMode="decimal"
                value={salaire}
                onChange={(e) => setSalaire(e.target.value)}
                placeholder="38000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: RetraiteResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Pension mensuelle estimée"
          value={formatEuro(result.pensionTotaleMensuelle)}
          accent
        />
        <Tile
          label="Pension annuelle"
          value={formatEuro(result.pensionTotaleAnnuelle)}
        />
        <Tile
          label="Taux de remplacement"
          value={formatPercent(result.tauxRemplacement, 1)}
        />
      </div>

      {!result.tauxPlein && (
        <div className="rounded-md border border-orange-300 bg-orange-50 p-4 text-sm text-orange-900">
          Avec un départ à {result.ageDepart} ans, vous auriez{" "}
          <strong>{result.trimestresCotises} trimestres</strong> sur les{" "}
          {result.trimestresRequis} requis : une décote s'applique. Prolonger la
          carrière augmentera votre taux de liquidation.
        </div>
      )}

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">Détail</h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Trimestres estimés"
            value={`${result.trimestresCotises} / ${result.trimestresRequis}`}
          />
          <Row
            label="Taux de liquidation"
            value={formatPercent(result.tauxLiquidation, 2)}
          />
          <Row
            label="Pension de base (régime général)"
            value={formatEuroPrecise(result.pensionBaseAnnuelle / 12) + " / mois"}
          />
          <Row
            label="Pension complémentaire (AGIRC-ARRCO)"
            value={
              formatEuroPrecise(result.pensionComplementaireAnnuelle / 12) +
              " / mois"
            }
          />
          <Row
            label="Total annuel"
            value={formatEuro(result.pensionTotaleAnnuelle)}
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
