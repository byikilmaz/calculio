"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeDividendesSalaireFR,
  type DividendesSalaireResult,
} from "@/lib/calculators/simulateur-dividendes-salaire-fr";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function DividendesSalaireCalculator() {
  const [benefice, setBenefice] = useState<string>("80000");
  const [partSalaire, setPartSalaire] = useState<string>("50"); // 0..100

  const result = useMemo<DividendesSalaireResult | null>(() => {
    const b = parseNum(benefice);
    const p = parseNum(partSalaire);
    if (!Number.isFinite(b) || b < 0) return null;
    if (!Number.isFinite(p) || p < 0 || p > 100) return null;
    return computeDividendesSalaireFR({
      beneficeAvantRemuneration: b,
      partSalaire: p / 100,
    });
  }, [benefice, partSalaire]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Simulation simplifiée SASU.</strong> Ne couvre pas les
        spécificités SARL gérant majoritaire, la CSG sur dividendes au-delà de
        10 % du capital, le régime micro-social ou l'IR au barème. Les taux
        utilisés sont des moyennes indicatives.
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre SASU
          </h2>
          <p className="text-sm text-slate-500">
            Arbitrez entre salaire et dividendes selon votre bénéfice
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="benefice">Bénéfice avant rémunération</Label>
            <div className="relative">
              <Input
                id="benefice"
                inputMode="decimal"
                value={benefice}
                onChange={(e) => setBenefice(e.target.value)}
                placeholder="80000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="part">
              Répartition : {partSalaire} % en salaire · {100 - Number(partSalaire)} %
              en dividendes
            </Label>
            <Input
              id="part"
              type="range"
              min={0}
              max={100}
              step={5}
              value={partSalaire}
              onChange={(e) => setPartSalaire(e.target.value)}
            />
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>100 % dividendes</span>
              <span>Mixte</span>
              <span>100 % salaire</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: DividendesSalaireResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Total net perçu"
          value={formatEuro(result.totalNetPercu)}
          accent
        />
        <Tile
          label="Total prélèvements"
          value={formatEuro(result.totalPrelevements)}
        />
        <Tile
          label="Taux effectif global"
          value={formatPercent(result.tauxEffectifGlobal, 1)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Branche salaire
            </h3>
            <p className="text-sm text-slate-500">
              {formatPercent(result.partSalaire, 0)} du bénéfice affecté
            </p>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <Row
              label="Budget alloué"
              value={formatEuroPrecise(result.budgetSalaire)}
            />
            <Row
              label="Cotisations patronales (42 %)"
              value={formatEuroPrecise(result.cotisationsPatronales)}
            />
            <Row
              label="Salaire brut"
              value={formatEuroPrecise(result.salaireBrut)}
            />
            <Row
              label="Charges salariales + IR (43 %)"
              value={formatEuroPrecise(result.chargesSalarialesEtIR)}
            />
            <Row
              label="Salaire net après IR"
              value={formatEuro(result.salaireNetApresIR)}
              bold
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Branche dividendes
            </h3>
            <p className="text-sm text-slate-500">
              {formatPercent(1 - result.partSalaire, 0)} du bénéfice affecté
            </p>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <Row
              label="Bénéfice imposable"
              value={formatEuroPrecise(result.beneficeDividendes)}
            />
            <Row
              label="Impôt sur les sociétés (IS)"
              value={formatEuroPrecise(result.impotSocietes)}
            />
            <Row
              label="Dividendes bruts distribuables"
              value={formatEuroPrecise(result.dividendesBruts)}
            />
            <Row
              label="PFU 30 % (flat tax)"
              value={formatEuroPrecise(result.pfuSurDividendes)}
            />
            <Row
              label="Dividendes nets perçus"
              value={formatEuro(result.dividendesNets)}
              bold
            />
          </CardBody>
        </Card>
      </div>
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
