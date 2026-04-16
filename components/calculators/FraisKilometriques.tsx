"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeFraisKilometriquesFR,
  type FraisKmResult,
  type PuissanceFiscale,
} from "@/lib/calculators/calcul-frais-kilometriques-fr";
import { formatEuro, formatEuroPrecise } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CV_LABELS: Record<PuissanceFiscale, string> = {
  "3cv": "3 CV et moins",
  "4cv": "4 CV",
  "5cv": "5 CV",
  "6cv": "6 CV",
  "7cv": "7 CV et plus",
};

export function FraisKilometriquesCalculator() {
  const [km, setKm] = useState<string>("10000");
  const [puissance, setPuissance] = useState<PuissanceFiscale>("5cv");

  const result = useMemo<FraisKmResult | null>(() => {
    const k = parseNum(km);
    if (!Number.isFinite(k) || k < 0) return null;
    return computeFraisKilometriquesFR({ kilometrage: k, puissance });
  }, [km, puissance]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Vos déplacements professionnels
          </h2>
          <p className="text-sm text-slate-500">
            Kilométrage annuel et puissance fiscale de votre véhicule
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="km">Kilométrage annuel</Label>
            <div className="relative">
              <Input
                id="km"
                inputMode="decimal"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                placeholder="10000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                km
              </span>
            </div>
          </div>

          <div>
            <Label>Puissance fiscale</Label>
            <RadioGroup
              name="puissance"
              value={puissance}
              onChange={setPuissance}
              options={[
                { value: "3cv", label: "3 CV et moins", description: "Citadines" },
                { value: "4cv", label: "4 CV", description: "Compactes" },
                { value: "5cv", label: "5 CV", description: "Berlines moyennes" },
                { value: "6cv", label: "6 CV", description: "Grandes berlines" },
                { value: "7cv", label: "7 CV et plus", description: "Véhicules haut de gamme, SUV" },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: FraisKmResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Tile
          label="Montant déductible"
          value={formatEuro(result.montantDeductible)}
          accent
        />
        <Tile
          label="Tranche appliquée"
          value={result.trancheAppliquee}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Formule appliquée
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <div className="rounded-md bg-slate-50 p-4 font-mono text-slate-900">
            {result.formule} = {formatEuroPrecise(result.montantDeductible)}
          </div>
          <p className="text-slate-600">
            Pour un véhicule de {CV_LABELS[result.puissance]} avec{" "}
            {result.kilometrage.toLocaleString("fr-FR")} km parcourus (tranche{" "}
            {result.trancheAppliquee}), les coefficients du barème 2025 sont A ={" "}
            {result.coefA}
            {result.coefB > 0 ? ` et B = ${result.coefB}` : ""}.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Comparaison par puissance fiscale
          </h3>
          <p className="text-sm text-slate-500">
            Montant déductible pour {result.kilometrage.toLocaleString("fr-FR")} km
            selon la puissance
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Puissance fiscale</th>
                  <th className="py-2 font-medium text-right">
                    Montant déductible
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.tousLesCV.map((r) => {
                  const isCurrent = r.cv === result.puissance;
                  return (
                    <tr
                      key={r.cv}
                      className={
                        isCurrent
                          ? "border-b border-[var(--border)] last:border-0 bg-[var(--primary)]/5"
                          : "border-b border-[var(--border)] last:border-0"
                      }
                    >
                      <td className="py-2 pr-4 text-slate-700">
                        {CV_LABELS[r.cv]}
                      </td>
                      <td className="py-2 text-right font-medium text-slate-900">
                        {formatEuroPrecise(r.montant)}
                      </td>
                    </tr>
                  );
                })}
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
