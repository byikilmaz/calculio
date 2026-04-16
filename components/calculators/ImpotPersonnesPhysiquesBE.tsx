"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeIPPBelgique,
  type BESituationIPP,
  type IPPBEResult,
} from "@/lib/calculators/calcul-impot-personnes-physiques-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function ImpotPersonnesPhysiquesBECalculator() {
  const [revenu, setRevenu] = useState<string>("40000");
  const [situation, setSituation] = useState<BESituationIPP>("isole");
  const [enfants, setEnfants] = useState<number>(0);
  const [additionnels, setAdditionnels] = useState<string>("7.5");

  const result = useMemo<IPPBEResult | null>(() => {
    const r = parseNum(revenu);
    if (!Number.isFinite(r) || r < 0) return null;
    const add = parseNum(additionnels);
    const additionnelsRate =
      Number.isFinite(add) && add >= 0 ? add / 100 : 0.075;
    return computeIPPBelgique({
      revenuNetImposable: r,
      situation,
      enfantsACharge: enfants,
      additionnelsCommunaux: additionnelsRate,
    });
  }, [revenu, situation, enfants, additionnels]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre situation
          </h2>
          <p className="text-sm text-slate-500">
            Indiquez votre revenu net imposable et votre foyer fiscal
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="revenu">Revenu net imposable annuel</Label>
            <div className="relative">
              <Input
                id="revenu"
                inputMode="decimal"
                value={revenu}
                onChange={(e) => setRevenu(e.target.value)}
                placeholder="40000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Situation familiale</Label>
            <RadioGroup
              name="situation"
              value={situation}
              onChange={setSituation}
              options={[
                {
                  value: "isole",
                  label: "Isolé",
                  description: "Célibataire, divorcé(e), veuf(ve)",
                },
                {
                  value: "marieCohabitant",
                  label: "Marié / cohabitant légal",
                  description: "Déclaration conjointe",
                },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
            <div>
              <Label htmlFor="additionnels">Additionnels communaux</Label>
              <div className="relative">
                <Input
                  id="additionnels"
                  inputMode="decimal"
                  value={additionnels}
                  onChange={(e) => setAdditionnels(e.target.value)}
                  placeholder="7.5"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: IPPBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Impôt total"
          value={formatEuro(result.impotTotal)}
          accent
        />
        <Tile
          label="Taux marginal"
          value={formatPercent(result.tauxMarginal, 0)}
        />
        <Tile label="Taux moyen" value={formatPercent(result.tauxMoyen, 2)} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail par tranche
          </h3>
          <p className="text-sm text-slate-500">
            Barème IPP 2026 — exercice d'imposition 2026, revenus 2025
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Tranche</th>
                  <th className="py-2 pr-4 font-medium">Taux</th>
                  <th className="py-2 pr-4 font-medium text-right">Base</th>
                  <th className="py-2 font-medium text-right">Impôt</th>
                </tr>
              </thead>
              <tbody>
                {result.tranches.map((t, i) => {
                  const label =
                    t.max === Number.POSITIVE_INFINITY
                      ? `> ${formatEuro(t.min)}`
                      : `${formatEuro(t.min)} – ${formatEuro(t.max)}`;
                  return (
                    <tr
                      key={i}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      <td className="py-2 pr-4 text-slate-700">{label}</td>
                      <td className="py-2 pr-4 text-slate-500">
                        {formatPercent(t.rate, 0)}
                      </td>
                      <td className="py-2 pr-4 text-right text-slate-700">
                        {formatEuroPrecise(t.base)}
                      </td>
                      <td className="py-2 text-right font-medium text-slate-900">
                        {formatEuroPrecise(t.impot)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-50 font-medium">
                  <td className="py-2 pr-4 text-slate-900" colSpan={3}>
                    Impôt selon barème
                  </td>
                  <td className="py-2 text-right text-slate-900">
                    {formatEuroPrecise(result.impotBareme)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Réductions et additionnels
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label={`Quotité exemptée (${formatEuro(result.quotiteExemptee)} × 25 %)`}
            value={`− ${formatEuroPrecise(result.reductionQuotite)}`}
          />
          <Row
            label="Impôt fédéral"
            value={formatEuroPrecise(result.impotFederal)}
            bold
          />
          <Row
            label={`Additionnels communaux (${formatPercent(
              result.additionnelsCommunaux,
              1,
            )})`}
            value={`+ ${formatEuroPrecise(result.additionnelsMontant)}`}
          />
          <Row
            label="Impôt total"
            value={formatEuro(result.impotTotal)}
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
