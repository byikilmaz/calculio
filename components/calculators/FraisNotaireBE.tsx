"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeFraisNotaireBE,
  type FraisNotaireBEResult,
} from "@/lib/calculators/calcul-frais-notaire-be";
import type { BERegion } from "@/lib/tax-rates/be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function FraisNotaireBECalculator() {
  const [prix, setPrix] = useState<string>("300000");
  const [region, setRegion] = useState<BERegion>("wallonie");
  const [premiereHabitation, setPremiereHabitation] = useState<boolean>(true);

  const result = useMemo<FraisNotaireBEResult | null>(() => {
    const p = parseNum(prix);
    if (!Number.isFinite(p) || p <= 0) return null;
    return computeFraisNotaireBE({
      prixAchat: p,
      region,
      premiereHabitation,
    });
  }, [prix, region, premiereHabitation]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre achat immobilier
          </h2>
          <p className="text-sm text-slate-500">
            Prix d'achat, région et statut d'acquéreur
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="prix">Prix d'achat</Label>
            <div className="relative">
              <Input
                id="prix"
                inputMode="decimal"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                placeholder="300000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Région</Label>
            <RadioGroup
              name="region"
              value={region}
              onChange={setRegion}
              options={[
                {
                  value: "wallonie",
                  label: "Wallonie",
                  description: "12,5 % standard / 3 % habitation unique",
                },
                {
                  value: "bruxelles",
                  label: "Bruxelles-Capitale",
                  description: "12,5 % + abattement 200 000 €",
                },
                {
                  value: "flandre",
                  label: "Flandre",
                  description: "12 % standard / 2 % primo-accédant",
                },
              ]}
            />
          </div>

          <label className="flex items-start gap-3 rounded-md border border-[var(--border)] p-3 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={premiereHabitation}
              onChange={(e) => setPremiereHabitation(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Habitation propre et unique
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Vous n'êtes pas déjà propriétaire d'une autre habitation
              </span>
            </span>
          </label>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: FraisNotaireBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Frais de notaire"
          value={formatEuro(result.totalFrais)}
          accent
        />
        <Tile
          label="Coût total d'acquisition"
          value={formatEuro(result.totalAcquisition)}
        />
        <Tile
          label="Droits d'enregistrement"
          value={formatPercent(result.tauxDroitsEnregistrement, 2)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail des frais
          </h3>
          <p className="text-sm text-slate-500">
            Sur un prix d'achat de {formatEuro(result.prixAchat)}
          </p>
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
                      {formatEuroPrecise(d.montant)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-semibold">
                  <td className="py-3 pr-4 text-slate-900">
                    Total frais de notaire
                  </td>
                  <td className="py-3 text-right text-slate-900">
                    {formatEuroPrecise(result.totalFrais)}
                  </td>
                </tr>
                <tr className="bg-slate-100 font-semibold">
                  <td className="py-3 pr-4 text-slate-900">
                    Coût total d'acquisition (prix + frais)
                  </td>
                  <td className="py-3 text-right text-slate-900">
                    {formatEuroPrecise(result.totalAcquisition)}
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
