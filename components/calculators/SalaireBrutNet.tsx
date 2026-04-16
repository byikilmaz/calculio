"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeBrutNetFR,
  type BrutNetResult,
} from "@/lib/calculators/salaire-brut-net-fr";
import {
  formatEuro,
  formatEuroPrecise,
  formatPercent,
} from "@/lib/format";
import type { EmployeeStatus } from "@/lib/tax-rates/fr";

type Period = "mois" | "annee";

export function SalaireBrutNetCalculator() {
  const [amount, setAmount] = useState<string>("3000");
  const [period, setPeriod] = useState<Period>("mois");
  const [status, setStatus] = useState<EmployeeStatus>("non-cadre");

  const result = useMemo<BrutNetResult | null>(() => {
    const parsed = Number(amount.replace(/\s/g, "").replace(",", "."));
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const brutAnnuel = period === "mois" ? parsed * 12 : parsed;
    return computeBrutNetFR({ brutAnnuel, status });
  }, [amount, period, status]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre salaire
          </h2>
          <p className="text-sm text-slate-500">
            Indiquez votre salaire brut et votre statut
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <Label htmlFor="salaire-brut">Salaire brut</Label>
              <div className="relative">
                <Input
                  id="salaire-brut"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="3000"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="periode">Période</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={period === "mois" ? "primary" : "ghost"}
                  onClick={() => setPeriod("mois")}
                  className="flex-1"
                >
                  Mensuel
                </Button>
                <Button
                  type="button"
                  variant={period === "annee" ? "primary" : "ghost"}
                  onClick={() => setPeriod("annee")}
                  className="flex-1"
                >
                  Annuel
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label>Statut</Label>
            <RadioGroup
              name="status"
              value={status}
              onChange={setStatus}
              options={[
                {
                  value: "non-cadre",
                  label: "Non-cadre",
                  description: "Employé, ouvrier, technicien, agent de maîtrise",
                },
                {
                  value: "cadre",
                  label: "Cadre",
                  description: "Position ≥ 2.1 (APEC + T2 AGIRC-ARRCO)",
                },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: BrutNetResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <ResultTile
          label="Net mensuel"
          value={formatEuro(result.netAvantImpotMensuel)}
          accent
        />
        <ResultTile
          label="Net annuel"
          value={formatEuro(result.netAvantImpot)}
        />
        <ResultTile
          label="Taux de prélèvement"
          value={formatPercent(result.tauxPrelevementTotal)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail des cotisations salariales
          </h3>
          <p className="text-sm text-slate-500">
            Sur la base d'un brut annuel de {formatEuro(result.brutAnnuel)}
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Cotisation</th>
                  <th className="py-2 pr-4 font-medium">Taux</th>
                  <th className="py-2 font-medium text-right">Montant annuel</th>
                </tr>
              </thead>
              <tbody>
                {result.contributions.map((line, i) => (
                  <tr key={i} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-2 pr-4 text-slate-700">{line.label}</td>
                    <td className="py-2 pr-4 text-slate-500">
                      {formatPercent(line.rate, 2)}
                    </td>
                    <td className="py-2 text-right font-medium text-slate-900">
                      {formatEuroPrecise(line.amount)}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 pr-4 text-slate-700">CSG déductible</td>
                  <td className="py-2 pr-4 text-slate-500">
                    {formatPercent(0.068, 2)}
                  </td>
                  <td className="py-2 text-right font-medium text-slate-900">
                    {formatEuroPrecise(result.csgDeductible)}
                  </td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 pr-4 text-slate-700">CSG non déductible</td>
                  <td className="py-2 pr-4 text-slate-500">
                    {formatPercent(0.024, 2)}
                  </td>
                  <td className="py-2 text-right font-medium text-slate-900">
                    {formatEuroPrecise(result.csgNonDeductible)}
                  </td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 pr-4 text-slate-700">CRDS</td>
                  <td className="py-2 pr-4 text-slate-500">
                    {formatPercent(0.005, 2)}
                  </td>
                  <td className="py-2 text-right font-medium text-slate-900">
                    {formatEuroPrecise(result.crds)}
                  </td>
                </tr>
                <tr className="bg-slate-50 font-semibold">
                  <td className="py-3 pr-4 text-slate-900">Total prélèvements</td>
                  <td className="py-3 pr-4 text-slate-500">
                    {formatPercent(result.tauxPrelevementTotal, 2)}
                  </td>
                  <td className="py-3 text-right text-slate-900">
                    {formatEuroPrecise(
                      result.totalContributions +
                        result.csgDeductible +
                        result.csgNonDeductible +
                        result.crds,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InfoTile
              label="Net imposable (annuel)"
              value={formatEuro(result.netImposable)}
              hint="Utilisé pour le prélèvement à la source"
            />
            <InfoTile
              label="Net imposable (mensuel)"
              value={formatEuro(result.netImposableMensuel)}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

interface ResultTileProps {
  label: string;
  value: string;
  accent?: boolean;
}

function ResultTile({ label, value, accent }: ResultTileProps) {
  return (
    <div
      className={
        accent
          ? "rounded-lg bg-[var(--primary)] p-5 text-white shadow-sm"
          : "rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm"
      }
    >
      <div
        className={
          accent ? "text-sm text-white/80" : "text-sm text-slate-500"
        }
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

interface InfoTileProps {
  label: string;
  value: string;
  hint?: string;
}

function InfoTile({ label, value, hint }: InfoTileProps) {
  return (
    <div className="rounded-md border border-[var(--border)] p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
