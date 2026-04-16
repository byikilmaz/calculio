"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePlusValueImmoCH,
  type PlusValueImmoCHResult,
} from "@/lib/calculators/calcul-plus-value-immobiliere-suisse-ch";
import { CH_CANTON_LABEL, type CHCanton } from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];

export function PlusValueImmoCHCalculator() {
  const [vente, setVente] = useState<string>("950000");
  const [acq, setAcq] = useState<string>("700000");
  const [fraisAcq, setFraisAcq] = useState<string>("35000");
  const [inv, setInv] = useState<string>("40000");
  const [duree, setDuree] = useState<string>("8");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [remploi, setRemploi] = useState<boolean>(false);

  const result = useMemo<PlusValueImmoCHResult | null>(() => {
    const v = parseNum(vente);
    if (!Number.isFinite(v) || v <= 0) return null;
    return computePlusValueImmoCH({
      prixVente: v,
      prixAcquisition: parseNum(acq) || 0,
      fraisAcquisition: parseNum(fraisAcq) || 0,
      investissementsPlusValue: parseNum(inv) || 0,
      dureeDetentionAnnees: parseNum(duree) || 0,
      canton,
      remploi,
    });
  }, [vente, acq, fraisAcq, inv, duree, canton, remploi]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre plus-value
          </h2>
          <p className="text-sm text-slate-500">
            Imposition cantonale des gains immobiliers (IGI)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="vente">Prix de vente</Label>
              <div className="relative">
                <Input
                  id="vente"
                  inputMode="decimal"
                  value={vente}
                  onChange={(e) => setVente(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="acq">Prix d&apos;acquisition</Label>
              <div className="relative">
                <Input
                  id="acq"
                  inputMode="decimal"
                  value={acq}
                  onChange={(e) => setAcq(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fa">Frais d&apos;acquisition</Label>
              <div className="relative">
                <Input
                  id="fa"
                  inputMode="decimal"
                  value={fraisAcq}
                  onChange={(e) => setFraisAcq(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="inv">Travaux à plus-value</Label>
              <div className="relative">
                <Input
                  id="inv"
                  inputMode="decimal"
                  value={inv}
                  onChange={(e) => setInv(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="duree">Durée de détention (années)</Label>
              <Input
                id="duree"
                inputMode="decimal"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
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
              checked={remploi}
              onChange={(e) => setRemploi(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Remploi dans une nouvelle résidence principale
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Différé d&apos;imposition (report total sur le nouveau bien)
              </span>
            </span>
          </label>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Impôt gain immobilier"
              value={formatCHF(result.impotGainImmobilier)}
              accent
            />
            <Tile
              label="Taux applicable"
              value={formatPercent(result.tauxApplicable, 2)}
            />
            <Tile
              label="Plus-value brute"
              value={formatCHF(result.plusValueBrute)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail
              </h3>
              <p className="text-sm text-slate-500">{result.baremeLabel}</p>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Prix de vente"
                value={formatCHFPrecise(result.prixVente)}
              />
              <Row
                label="Prix d'acquisition"
                value={`− ${formatCHFPrecise(result.prixAcquisition)}`}
              />
              <Row
                label="Frais d'acquisition"
                value={`− ${formatCHFPrecise(result.fraisAcquisition)}`}
              />
              <Row
                label="Investissements à plus-value"
                value={`− ${formatCHFPrecise(result.investissementsPlusValue)}`}
              />
              <Row
                label="Plus-value brute"
                value={formatCHFPrecise(result.plusValueBrute)}
                bold
              />
              {result.remploi && (
                <Row
                  label="Remploi : plus-value imposable"
                  value={`0 CHF (différé)`}
                />
              )}
              <Row
                label="Plus-value imposable"
                value={formatCHFPrecise(result.plusValueImposable)}
                bold
              />
              <Row
                label="Impôt"
                value={formatCHFPrecise(result.impotGainImmobilier)}
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
