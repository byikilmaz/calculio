"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeImpotRevenuLU,
  type ImpotRevenuLUResult,
  type LUStatut,
} from "@/lib/calculators/simulateur-impot-revenu-luxembourg-lu";
import type { LUClasse } from "@/lib/tax-rates/lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function ImpotRevenuLUCalculator() {
  const [revenu, setRevenu] = useState<string>("75000");
  const [classe, setClasse] = useState<LUClasse>("1");
  const [statut, setStatut] = useState<LUStatut>("salarie");
  const [enfants, setEnfants] = useState<number>(0);

  const result = useMemo<ImpotRevenuLUResult | null>(() => {
    const r = parseNum(revenu);
    if (!Number.isFinite(r) || r <= 0) return null;
    return computeImpotRevenuLU({
      revenuImposable: r,
      classe,
      statut,
      enfants,
    });
  }, [revenu, classe, statut, enfants]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre revenu imposable
          </h2>
          <p className="text-sm text-slate-500">
            Revenu annuel net après cotisations sociales
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="revenu">Revenu imposable annuel</Label>
            <div className="relative">
              <Input
                id="revenu"
                inputMode="decimal"
                value={revenu}
                onChange={(e) => setRevenu(e.target.value)}
                placeholder="75000"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Classe d&apos;impôt</Label>
            <RadioGroup
              name="classe"
              value={classe}
              onChange={setClasse}
              options={[
                { value: "1", label: "Classe 1", description: "Célibataire" },
                {
                  value: "1a",
                  label: "Classe 1a",
                  description: "Monoparental / veuf / > 64 ans",
                },
                {
                  value: "2",
                  label: "Classe 2",
                  description: "Marié(e) — splitting",
                },
              ]}
            />
          </div>

          <div>
            <Label>Statut</Label>
            <RadioGroup
              name="statut"
              value={statut}
              onChange={setStatut}
              options={[
                { value: "salarie", label: "Salarié", description: "CIS 600 €" },
                {
                  value: "independant",
                  label: "Indépendant",
                  description: "CIM 600 €",
                },
                {
                  value: "retraite",
                  label: "Retraité",
                  description: "Pension imposable",
                },
              ]}
            />
          </div>

          {classe === "1a" && (
            <div>
              <Label htmlFor="enfants">Enfants à charge</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEnfants(Math.max(0, enfants - 1))}
                >
                  −
                </Button>
                <div className="min-w-[3rem] text-center text-lg font-semibold text-slate-900">
                  {enfants}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEnfants(Math.min(10, enfants + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: ImpotRevenuLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Impôt total"
          value={formatEuro(result.impotTotal)}
          accent
        />
        <Tile
          label="Taux moyen"
          value={formatPercent(result.tauxMoyen, 2)}
        />
        <Tile
          label="Taux marginal"
          value={formatPercent(result.tauxMarginal, 0)}
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
            label="Revenu imposable"
            value={formatEuroPrecise(result.revenuImposable)}
          />
          <Row
            label="Base imposable (après forfaits)"
            value={formatEuroPrecise(result.baseImposable)}
          />
          <Row
            label="Impôt barème progressif"
            value={formatEuroPrecise(result.impotBareme)}
          />
          <Row
            label="Crédit d'impôt"
            value={`− ${formatEuroPrecise(result.credit)}`}
          />
          <Row
            label="Impôt après crédit"
            value={formatEuroPrecise(result.impotApresCredit)}
            bold
          />
          <Row
            label="Fonds pour l'emploi (7 %)"
            value={`+ ${formatEuroPrecise(result.fondsEmploi)}`}
          />
          <Row
            label="Contribution dépendance (1,4 %)"
            value={`+ ${formatEuroPrecise(result.dependance)}`}
          />
          <Row
            label="Total à payer"
            value={formatEuroPrecise(result.impotTotal)}
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
