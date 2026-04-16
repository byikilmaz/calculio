"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import {
  computeImpotRevenuFR,
  type ImpotRevenuResult,
} from "@/lib/calculators/simulateur-impot-revenu-fr";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

type Situation = "celibataire" | "marie" | "parent";

const SITUATION_PARTS: Record<Situation, number> = {
  celibataire: 1,
  marie: 2,
  parent: 1.5,
};

export function ImpotRevenuCalculator() {
  const [revenu, setRevenu] = useState<string>("40000");
  const [situation, setSituation] = useState<Situation>("celibataire");
  const [enfants, setEnfants] = useState<number>(0);

  const parts = useMemo(() => {
    const base = SITUATION_PARTS[situation];
    // Les 2 premiers enfants donnent 0.5 part chacun, à partir du 3e = 1 part
    let bonus = 0;
    if (enfants <= 2) bonus = enfants * 0.5;
    else bonus = 1 + (enfants - 2) * 1;
    return base + bonus;
  }, [situation, enfants]);

  const result = useMemo<ImpotRevenuResult | null>(() => {
    const parsed = Number(revenu.replace(/\s/g, "").replace(",", "."));
    if (!Number.isFinite(parsed) || parsed < 0) return null;
    return computeImpotRevenuFR({ revenuNetImposable: parsed, parts });
  }, [revenu, parts]);

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
                  value: "celibataire",
                  label: "Célibataire",
                  description: "Divorcé(e), veuf(ve) — 1 part",
                },
                {
                  value: "marie",
                  label: "Marié(e) / PACS",
                  description: "Déclaration commune — 2 parts",
                },
                {
                  value: "parent",
                  label: "Parent isolé",
                  description: "Case T cochée — 1,5 part",
                },
              ]}
            />
          </div>

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
              <span className="ml-3 text-sm text-slate-500">
                = {parts.toFixed(1).replace(".", ",")} part{parts > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: ImpotRevenuResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Impôt sur le revenu"
          value={formatEuro(result.impotFinal)}
          accent
        />
        <Tile label="Taux marginal" value={formatPercent(result.tauxMarginal, 0)} />
        <Tile label="Taux moyen" value={formatPercent(result.tauxMoyen, 2)} />
      </div>

      {result.plafonnementApplique && (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Plafonnement du quotient familial appliqué :</strong> la
          réduction accordée par vos parts supplémentaires est plafonnée à{" "}
          {formatEuro(result.reductionQuotient)}.
        </div>
      )}

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail par tranche
          </h3>
          <p className="text-sm text-slate-500">
            Quotient familial : {formatEuroPrecise(result.quotient)} (revenu /
            parts)
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Tranche</th>
                  <th className="py-2 pr-4 font-medium">Taux</th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Base imposable
                  </th>
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
                        {formatEuroPrecise(t.baseImposable)}
                      </td>
                      <td className="py-2 text-right font-medium text-slate-900">
                        {formatEuroPrecise(t.impot)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-50 font-semibold">
                  <td className="py-3 pr-4 text-slate-900" colSpan={3}>
                    Impôt brut (quotient familial)
                  </td>
                  <td className="py-3 text-right text-slate-900">
                    {formatEuroPrecise(result.impotBrut)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
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
