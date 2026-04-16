"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeSuccessionLU,
  type SuccessionLUResult,
} from "@/lib/calculators/calcul-droits-succession-luxembourg-lu";
import {
  LU_SUCCESSION_LABEL,
  type LULienSuccession,
} from "@/lib/tax-rates/lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const LIEN_OPTIONS: LULienSuccession[] = [
  "epouxEnfantsCommuns",
  "ligneDirecte",
  "frereSoeur",
  "oncleTante",
  "neveuNiece",
  "grandOncle",
  "cousin",
  "nonParent",
];

export function DroitsSuccessionLUCalculator() {
  const [montant, setMontant] = useState<string>("300000");
  const [lien, setLien] = useState<LULienSuccession>("ligneDirecte");
  const [partLegale, setPartLegale] = useState<string>("1");

  const result = useMemo<SuccessionLUResult | null>(() => {
    const v = parseNum(montant);
    if (!Number.isFinite(v) || v <= 0) return null;
    return computeSuccessionLU({
      valeurNette: v,
      lien,
      partLegale: parseNum(partLegale) || 0,
    });
  }, [montant, lien, partLegale]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre part de succession
          </h2>
          <p className="text-sm text-slate-500">
            Luxembourg — barème 2026 par lien de parenté
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="montant">Montant net reçu</Label>
            <div className="relative">
              <Input
                id="montant"
                inputMode="decimal"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="300000"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="lien">Lien de parenté</Label>
            <select
              id="lien"
              value={lien}
              onChange={(e) => setLien(e.target.value as LULienSuccession)}
              className="flex h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              {LIEN_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {LU_SUCCESSION_LABEL[l]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="part-legale">Part légale (fraction 0-1)</Label>
            <Input
              id="part-legale"
              inputMode="decimal"
              value={partLegale}
              onChange={(e) => setPartLegale(e.target.value)}
              placeholder="1"
            />
            <div className="mt-1 text-xs text-slate-500">
              1 = tout légal, 0 = tout extra-légal (legs par testament au-delà
              de la réserve)
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: SuccessionLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Droits totaux"
          value={formatEuro(result.droitsTotaux)}
          accent
        />
        <Tile
          label="Net reçu après droits"
          value={formatEuro(result.valeurNette - result.droitsTotaux)}
        />
        <Tile
          label="Taux effectif"
          value={formatPercent(result.tauxEffectif, 2)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
          {result.exonere && (
            <p className="text-sm text-green-700">
              Époux avec enfants communs : exonération totale
            </p>
          )}
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Part légale reçue"
            value={formatEuroPrecise(result.partLegaleMontant)}
          />
          <Row
            label="Part extra-légale"
            value={formatEuroPrecise(result.partExtraLegaleMontant)}
          />
          <Row
            label="Taux part légale"
            value={formatPercent(result.tauxBase, 1)}
          />
          <Row
            label="Taux part extra-légale"
            value={formatPercent(result.tauxExtra, 1)}
          />
          <Row
            label="Droits part légale"
            value={formatEuroPrecise(result.droitsBase)}
          />
          <Row
            label="Droits part extra-légale"
            value={formatEuroPrecise(result.droitsExtra)}
          />
          <Row
            label="Majoration selon montant"
            value={`+ ${formatPercent(result.majoration, 0)}`}
          />
          <Row
            label="Droits totaux après majoration"
            value={formatEuroPrecise(result.droitsTotaux)}
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
