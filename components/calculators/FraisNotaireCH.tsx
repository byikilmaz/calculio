"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeFraisNotaireCH,
  type FraisNotaireCHResult,
} from "@/lib/calculators/calcul-frais-notaire-suisse-ch";
import { CH_CANTON_LABEL, type CHCanton } from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];

export function FraisNotaireCHCalculator() {
  const [prix, setPrix] = useState<string>("900000");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [residence, setResidence] = useState<boolean>(true);

  const result = useMemo<FraisNotaireCHResult | null>(() => {
    const p = parseNum(prix);
    if (!Number.isFinite(p) || p <= 0) return null;
    return computeFraisNotaireCH({
      prixAchat: p,
      canton,
      residencePrincipale: residence,
    });
  }, [prix, canton, residence]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Achat immobilier en Suisse
          </h2>
          <p className="text-sm text-slate-500">
            Droits de mutation, émoluments, registre foncier, TVA 8,1 %
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="p">Prix d&apos;achat</Label>
              <div className="relative">
                <Input
                  id="p"
                  inputMode="decimal"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
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

          <label className="flex items-start gap-3 rounded-md border border-[var(--border)] p-3 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={residence}
              onChange={(e) => setResidence(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Résidence principale
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Taux réduit dans certains cantons (ex. Valais)
              </span>
            </span>
          </label>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Frais de notaire"
              value={formatCHF(result.totalFrais)}
              accent
            />
            <Tile
              label="Coût total acquisition"
              value={formatCHF(result.totalAcquisition)}
            />
            <Tile
              label="Droits de mutation"
              value={formatPercent(result.tauxDroitsMutation, 2)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail des frais — {result.cantonLabel}
              </h3>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                      <th className="py-2 pr-4 font-medium">Poste</th>
                      <th className="py-2 font-medium text-right">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.detail.map((d, i) => (
                      <tr
                        key={i}
                        className="border-b border-[var(--border)] last:border-0"
                      >
                        <td className="py-2 pr-4 text-slate-700">{d.label}</td>
                        <td className="py-2 text-right font-medium text-slate-900">
                          {formatCHFPrecise(d.montant)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-semibold">
                      <td className="py-3 pr-4 text-slate-900">
                        Total frais de notaire
                      </td>
                      <td className="py-3 text-right text-slate-900">
                        {formatCHFPrecise(result.totalFrais)}
                      </td>
                    </tr>
                    <tr className="bg-slate-100 font-semibold">
                      <td className="py-3 pr-4 text-slate-900">
                        Coût total (prix + frais)
                      </td>
                      <td className="py-3 text-right text-slate-900">
                        {formatCHFPrecise(result.totalAcquisition)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
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
