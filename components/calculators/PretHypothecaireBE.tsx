"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePretHypothecaireBE,
  type PretHypothecaireBEResult,
} from "@/lib/calculators/simulateur-pret-hypothecaire-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PretHypothecaireBECalculator() {
  const [montant, setMontant] = useState<string>("200000");
  const [duree, setDuree] = useState<string>("20");
  const [taux, setTaux] = useState<string>("3.5");
  const [assurance, setAssurance] = useState<string>("0.25");
  const [showTable, setShowTable] = useState<boolean>(false);

  const result = useMemo<PretHypothecaireBEResult | null>(() => {
    const m = parseNum(montant);
    const d = parseNum(duree);
    const t = parseNum(taux);
    const a = parseNum(assurance);
    if (!Number.isFinite(m) || m <= 0) return null;
    if (!Number.isFinite(d) || d <= 0) return null;
    if (!Number.isFinite(t) || t < 0) return null;
    const tauxAssurance = Number.isFinite(a) && a >= 0 ? a : 0;
    return computePretHypothecaireBE({
      montant: m,
      dureeAnnees: d,
      tauxAnnuel: t,
      tauxAssurance,
    });
  }, [montant, duree, taux, assurance]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet immobilier
          </h2>
          <p className="text-sm text-slate-500">
            Montant, durée et taux pour obtenir votre mensualité hypothécaire
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="montant">Montant emprunté</Label>
              <div className="relative">
                <Input
                  id="montant"
                  inputMode="decimal"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder="200000"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="duree">Durée (années)</Label>
              <Input
                id="duree"
                type="range"
                min={5}
                max={30}
                step={1}
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
              <div className="mt-1 text-sm text-slate-500">{duree} ans</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="taux">Taux annuel d'emprunt</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  placeholder="3.5"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="assurance">
                Assurance solde restant dû
              </Label>
              <div className="relative">
                <Input
                  id="assurance"
                  inputMode="decimal"
                  value={assurance}
                  onChange={(e) => setAssurance(e.target.value)}
                  placeholder="0.25"
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

      {result && (
        <ResultPanel
          result={result}
          showTable={showTable}
          onToggleTable={() => setShowTable((v) => !v)}
        />
      )}
    </div>
  );
}

function ResultPanel({
  result,
  showTable,
  onToggleTable,
}: {
  result: PretHypothecaireBEResult;
  showTable: boolean;
  onToggleTable: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Mensualité totale"
          value={formatEuroPrecise(result.mensualiteTotale)}
          accent
        />
        <Tile
          label="Mensualité (hors ass.)"
          value={formatEuroPrecise(result.mensualiteHorsAssurance)}
        />
        <Tile
          label="Coût total du crédit"
          value={formatEuro(result.coutTotal)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du financement
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row label="Montant emprunté" value={formatEuro(result.montant)} />
          <Row
            label="Durée"
            value={`${result.dureeAnnees} ans (${result.dureeMois} mois)`}
          />
          <Row
            label="Taux annuel (hors assurance)"
            value={formatPercent(result.tauxAnnuel / 100, 2)}
          />
          <Row
            label="Taux assurance solde restant dû"
            value={formatPercent(result.tauxAssurance / 100, 2)}
          />
          <Row
            label="Intérêts totaux"
            value={formatEuro(result.coutTotalCredit)}
          />
          <Row
            label="Coût total assurance"
            value={formatEuro(result.coutTotalAssurance)}
          />
          <Row
            label="Total remboursé"
            value={formatEuro(result.montant + result.coutTotal)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Échéancier annuel
          </h3>
          <button
            type="button"
            onClick={onToggleTable}
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            {showTable ? "Masquer" : "Afficher"}
          </button>
        </CardHeader>
        {showTable && (
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                    <th className="py-2 pr-4 font-medium">Année</th>
                    <th className="py-2 pr-4 font-medium text-right">
                      Capital remboursé
                    </th>
                    <th className="py-2 pr-4 font-medium text-right">
                      Intérêts
                    </th>
                    <th className="py-2 pr-4 font-medium text-right">
                      Assurance
                    </th>
                    <th className="py-2 font-medium text-right">
                      Capital restant
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.echeancier.map((a) => (
                    <tr
                      key={a.annee}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      <td className="py-2 pr-4 text-slate-700">{a.annee}</td>
                      <td className="py-2 pr-4 text-right text-slate-900">
                        {formatEuroPrecise(a.capitalRembourse)}
                      </td>
                      <td className="py-2 pr-4 text-right text-slate-700">
                        {formatEuroPrecise(a.interetsPayes)}
                      </td>
                      <td className="py-2 pr-4 text-right text-slate-700">
                        {formatEuroPrecise(a.assurancePayee)}
                      </td>
                      <td className="py-2 text-right font-medium text-slate-900">
                        {formatEuroPrecise(a.capitalRestantDu)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        )}
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
