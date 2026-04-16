"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeDroitsMutationQC,
  type DroitsMutationQCResult,
} from "@/lib/calculators/calcul-droits-mutation-quebec-ca";
import {
  CA_MUNICIPALITE_LABEL,
  type CAMunicipalite,
} from "@/lib/tax-rates/ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const MUN_OPTIONS: CAMunicipalite[] = ["montreal", "quebec", "laval", "autre"];

export function DroitsMutationCACalculator() {
  const [prix, setPrix] = useState<string>("500000");
  const [mun, setMun] = useState<CAMunicipalite>("montreal");

  const result = useMemo<DroitsMutationQCResult | null>(() => {
    return computeDroitsMutationQC({
      prixAchat: parseNum(prix) || 0,
      municipalite: mun,
    });
  }, [prix, mun]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre achat immobilier
          </h2>
          <p className="text-sm text-slate-500">
            Taxe de bienvenue — barème 2026 selon municipalité
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="prix">Prix d&apos;achat</Label>
              <div className="relative">
                <Input
                  id="prix"
                  inputMode="decimal"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="mun">Municipalité</Label>
              <select
                id="mun"
                value={mun}
                onChange={(e) => setMun(e.target.value as CAMunicipalite)}
                className="flex h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {MUN_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {CA_MUNICIPALITE_LABEL[m]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: DroitsMutationQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Taxe de bienvenue"
          value={formatCAD(result.droitsTotal)}
          accent
        />
        <Tile
          label="Taux effectif moyen"
          value={formatPercent(result.tauxEffectifMoyen, 2)}
        />
        <Tile label="Municipalité" value={result.municipaliteLabel} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail par tranche
          </h3>
          <p className="text-sm text-slate-500">
            Barème {result.municipaliteLabel}
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Tranche</th>
                  <th className="py-2 pr-4 font-medium text-right">Taux</th>
                  <th className="py-2 pr-4 font-medium text-right">Montant</th>
                  <th className="py-2 font-medium text-right">Droits</th>
                </tr>
              </thead>
              <tbody>
                {result.tranches
                  .filter((t) => t.montant > 0)
                  .map((t, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      <td className="py-2 pr-4 text-slate-700">
                        {t.min.toLocaleString("fr-CA")} –{" "}
                        {Number.isFinite(t.max)
                          ? t.max.toLocaleString("fr-CA")
                          : "∞"}{" "}
                        $
                      </td>
                      <td className="py-2 pr-4 text-right text-slate-700">
                        {formatPercent(t.taux, 2)}
                      </td>
                      <td className="py-2 pr-4 text-right text-slate-700">
                        {formatCADPrecise(t.montant)}
                      </td>
                      <td className="py-2 text-right font-medium text-slate-900">
                        {formatCADPrecise(t.droits)}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900" colSpan={3}>
                    Total
                  </td>
                  <td className="py-3 text-right font-semibold text-slate-900">
                    {formatCADPrecise(result.droitsTotal)}
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
