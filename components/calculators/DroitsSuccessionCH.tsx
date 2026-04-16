"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeSuccessionCH,
  type SuccessionCHResult,
} from "@/lib/calculators/calcul-droits-succession-suisse-ch";
import {
  CH_CANTON_LABEL,
  type CHCanton,
  type CHLienSuccession,
} from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];
const LIENS: { value: CHLienSuccession; label: string }[] = [
  { value: "conjoint", label: "Conjoint / partenaire enregistré" },
  { value: "descendantDirect", label: "Descendant direct (enfant)" },
  { value: "ascendantDirect", label: "Ascendant direct (parent)" },
  { value: "frereSoeur", label: "Frère / sœur" },
  { value: "oncleNeveu", label: "Oncle / tante / neveu / nièce" },
  { value: "autre", label: "Tiers (sans parenté)" },
];

export function DroitsSuccessionCHCalculator() {
  const [montant, setMontant] = useState<string>("500000");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [lien, setLien] = useState<CHLienSuccession>("descendantDirect");

  const result = useMemo<SuccessionCHResult | null>(() => {
    const m = parseNum(montant);
    if (!Number.isFinite(m) || m < 0) return null;
    return computeSuccessionCH({
      montant: m,
      canton,
      lien,
    });
  }, [montant, canton, lien]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Succession en Suisse
          </h2>
          <p className="text-sm text-slate-500">
            Pas d&apos;impôt fédéral — compétence 100 % cantonale
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="m">Part reçue par l&apos;héritier</Label>
              <div className="relative">
                <Input
                  id="m"
                  inputMode="decimal"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="canton">Canton du défunt</Label>
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
            <Label htmlFor="lien">Lien de parenté</Label>
            <select
              id="lien"
              value={lien}
              onChange={(e) => setLien(e.target.value as CHLienSuccession)}
              className="flex h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              {LIENS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Droits de succession"
              value={formatCHF(result.droits)}
              accent
            />
            <Tile
              label="Net reçu"
              value={formatCHF(result.netRecu)}
            />
            <Tile
              label="Taux effectif"
              value={formatPercent(result.tauxEffectif, 2)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail
              </h3>
              <p className="text-sm text-slate-500">{result.commentaire}</p>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Part reçue"
                value={formatCHFPrecise(result.montant)}
              />
              {!result.exonere && (
                <>
                  <Row
                    label="Abattement"
                    value={`− ${formatCHFPrecise(result.abattement)}`}
                  />
                  <Row
                    label="Part taxable"
                    value={formatCHFPrecise(result.partTaxable)}
                    bold
                  />
                  <Row
                    label="Taux appliqué"
                    value={formatPercent(result.tauxApplique, 2)}
                  />
                </>
              )}
              <Row
                label="Droits dus"
                value={formatCHFPrecise(result.droits)}
                bold
              />
              <Row
                label="Net reçu par l'héritier"
                value={formatCHFPrecise(result.netRecu)}
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
