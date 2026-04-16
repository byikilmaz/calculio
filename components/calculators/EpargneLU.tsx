"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeEpargneLU,
  type EpargneLUResult,
} from "@/lib/calculators/simulateur-epargne-luxembourg-lu";
import { formatEuro, formatEuroPrecise } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function EpargneLUCalculator() {
  const [initial, setInitial] = useState<string>("10000");
  const [annuel, setAnnuel] = useState<string>("3200");
  const [taux, setTaux] = useState<string>("3");
  const [duree, setDuree] = useState<string>("25");
  const [tmi, setTmi] = useState<string>("0.39");

  const result = useMemo<EpargneLUResult | null>(() => {
    const i = parseNum(initial);
    if (!Number.isFinite(i)) return null;
    return computeEpargneLU({
      versementInitial: i,
      versementAnnuel: parseNum(annuel) || 0,
      tauxRendementAnnuel: parseNum(taux) || 0,
      dureeAnnees: parseNum(duree) || 25,
      tauxMarginalIR: parseNum(tmi) || 0.39,
      useTroisiemePilier: true,
    });
  }, [initial, annuel, taux, duree, tmi]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet d&apos;épargne
          </h2>
          <p className="text-sm text-slate-500">
            Comparer compte classique et 3e pilier art. 111bis
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="initial">Versement initial</Label>
              <div className="relative">
                <Input
                  id="initial"
                  inputMode="decimal"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                  placeholder="10000"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="annuel">Versement annuel</Label>
              <div className="relative">
                <Input
                  id="annuel"
                  inputMode="decimal"
                  value={annuel}
                  onChange={(e) => setAnnuel(e.target.value)}
                  placeholder="3200"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="taux">Rendement annuel</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  placeholder="3"
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="duree">Durée (ans)</Label>
              <Input
                id="duree"
                inputMode="numeric"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                placeholder="25"
              />
            </div>
            <div>
              <Label htmlFor="tmi">Taux marginal IR</Label>
              <Input
                id="tmi"
                inputMode="decimal"
                value={tmi}
                onChange={(e) => setTmi(e.target.value)}
                placeholder="0.39"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: EpargneLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Capital final (compte classique)"
          value={formatEuro(result.capitalFinalNet)}
          accent
        />
        <Tile
          label="Capital 3e pilier (brut)"
          value={formatEuro(result.capital3eFinal)}
        />
        <Tile
          label="Différentiel net"
          value={formatEuro(result.diffNet)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Compte épargne classique
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Total versé"
            value={formatEuroPrecise(result.totalVerse)}
          />
          <Row
            label="Gains bruts (intérêts composés)"
            value={formatEuroPrecise(result.gainsBruts)}
          />
          <Row
            label="Intérêts dernière année"
            value={formatEuroPrecise(result.interetsAnneeFin)}
          />
          <Row
            label="Exonération (< 1 500 € intérêts/an)"
            value={result.exonerationIntegrale ? "Oui" : "Non"}
          />
          <Row
            label="Précompte 20 % sur intérêts"
            value={`− ${formatEuroPrecise(result.precompte)}`}
          />
          <Row
            label="Capital final net"
            value={formatEuroPrecise(result.capitalFinalNet)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            3e pilier — Art. 111bis LIR
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Versement annuel éligible (max 3 200 €)"
            value={formatEuroPrecise(result.versement3eAnnuel)}
          />
          <Row
            label="Économie fiscale annuelle"
            value={formatEuroPrecise(result.economieFiscaleAnnuelle)}
          />
          <Row
            label="Cumul économie fiscale"
            value={formatEuroPrecise(result.cumulEconomieFiscale)}
            bold
          />
          <Row
            label="Capital 3e pilier (avant retrait)"
            value={formatEuroPrecise(result.capital3eFinal)}
          />
          <Row
            label="Part à taux demi-global (50 %)"
            value={formatEuroPrecise(result.retraitImposableDemi)}
          />
          <Row
            label="Part à taux flat 25 % (50 %)"
            value={formatEuroPrecise(result.retraitImposableFlat)}
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
