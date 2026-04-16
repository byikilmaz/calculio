"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeImpotRevenuCH,
  type CHImpotSituation,
  type ImpotRevenuCHResult,
} from "@/lib/calculators/simulateur-impot-revenu-suisse-ch";
import {
  CH_CANTON_LABEL,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  type CHCanton,
} from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];

export function ImpotRevenuCHCalculator() {
  const [revenu, setRevenu] = useState<string>("95000");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [situation, setSituation] = useState<CHImpotSituation>("celibataire");
  const [enfants, setEnfants] = useState<number>(0);
  const [coef, setCoef] = useState<string>("0.75");

  const result = useMemo<ImpotRevenuCHResult | null>(() => {
    const r = parseNum(revenu);
    if (!Number.isFinite(r) || r <= 0) return null;
    const c = parseNum(coef);
    return computeImpotRevenuCH({
      revenuNet: r,
      canton,
      situation,
      enfants,
      coefficientCommunal: Number.isFinite(c)
        ? c
        : CH_COMMUNE_COEFFICIENT_MOYEN[canton],
    });
  }, [revenu, canton, situation, enfants, coef]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre revenu imposable
          </h2>
          <p className="text-sm text-slate-500">
            Après déduction AVS/AI/APG et LPP
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="revenu">Revenu net annuel</Label>
              <div className="relative">
                <Input
                  id="revenu"
                  inputMode="decimal"
                  value={revenu}
                  onChange={(e) => setRevenu(e.target.value)}
                  placeholder="95000"
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="canton">Canton</Label>
              <select
                id="canton"
                value={canton}
                onChange={(e) => setCanton(e.target.value as CHCanton)}
                className="flex h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {CANTONS.map((c) => (
                  <option key={c} value={c}>
                    {CH_CANTON_LABEL[c]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label>Situation familiale</Label>
            <RadioGroup
              name="situation"
              value={situation}
              onChange={setSituation}
              options={[
                { value: "celibataire", label: "Célibataire" },
                { value: "marie", label: "Marié(e)" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enfants">Enfants à charge</Label>
              <Input
                id="enfants"
                type="number"
                min={0}
                max={10}
                value={enfants}
                onChange={(e) => setEnfants(Number(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="coef">Coefficient communal</Label>
              <Input
                id="coef"
                inputMode="decimal"
                value={coef}
                onChange={(e) => setCoef(e.target.value)}
                placeholder="0.75"
              />
              <div className="mt-1 text-xs text-slate-500">
                Moyenne {CH_CANTON_LABEL[canton]} :{" "}
                {CH_COMMUNE_COEFFICIENT_MOYEN[canton]}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Impôt total"
              value={formatCHF(result.impotTotal)}
              accent
            />
            <Tile
              label="Taux moyen"
              value={formatPercent(result.tauxMoyen, 2)}
            />
            <Tile
              label="Taux marginal IFD"
              value={formatPercent(result.tauxMarginal, 2)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail de l'impôt
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Revenu net avant déductions"
                value={formatCHFPrecise(result.revenuNet)}
              />
              <Row
                label="Déductions personnelles"
                value={`− ${formatCHFPrecise(result.deductionsPersonnelles)}`}
              />
              <Row
                label="Revenu imposable"
                value={formatCHFPrecise(result.revenuImposable)}
                bold
              />
              <Row
                label="IFD (impôt fédéral direct)"
                value={formatCHFPrecise(result.ifd)}
              />
              <Row
                label="Impôt cantonal"
                value={formatCHFPrecise(result.impotCantonal)}
              />
              <Row
                label="Impôt communal"
                value={formatCHFPrecise(result.impotCommunal)}
              />
              <Row
                label="Total impôt"
                value={formatCHFPrecise(result.impotTotal)}
                bold
              />
            </CardBody>
          </Card>
        </div>
      )}
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
