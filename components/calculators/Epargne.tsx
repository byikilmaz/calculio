"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeEpargneFR,
  type EpargneResult,
} from "@/lib/calculators/simulateur-epargne-fr";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function EpargneCalculator() {
  const [capital, setCapital] = useState<string>("1000");
  const [versement, setVersement] = useState<string>("100");
  const [taux, setTaux] = useState<string>("3");
  const [duree, setDuree] = useState<string>("10");

  const result = useMemo<EpargneResult | null>(() => {
    const c = parseNum(capital);
    const v = parseNum(versement);
    const t = parseNum(taux);
    const d = parseNum(duree);
    return computeEpargneFR({
      capitalInitial: c,
      versementMensuel: v,
      tauxAnnuel: t,
      dureeAnnees: d,
    });
  }, [capital, versement, taux, duree]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet d'épargne
          </h2>
          <p className="text-sm text-slate-500">
            Simulez la croissance de votre capital avec intérêts composés
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="capital">Capital initial</Label>
              <div className="relative">
                <Input
                  id="capital"
                  inputMode="decimal"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  placeholder="1000"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="versement">Versement mensuel</Label>
              <div className="relative">
                <Input
                  id="versement"
                  inputMode="decimal"
                  value={versement}
                  onChange={(e) => setVersement(e.target.value)}
                  placeholder="100"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="taux">Taux annuel estimé</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  placeholder="3"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="duree">Durée (années)</Label>
              <Input
                id="duree"
                type="range"
                min={1}
                max={40}
                step={1}
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
              <div className="mt-1 text-sm text-slate-500">{duree} ans</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: EpargneResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Capital final"
          value={formatEuro(result.capitalFinal)}
          accent
        />
        <Tile
          label="Total versé"
          value={formatEuro(result.totalVerse)}
        />
        <Tile
          label="Intérêts gagnés"
          value={formatEuro(result.interetsTotal)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Évolution année par année
          </h3>
          <p className="text-sm text-slate-500">
            Capitalisation mensuelle à {formatPercent(result.tauxAnnuel / 100, 2)}{" "}
            annuel
          </p>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Fin année</th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Versements cumulés
                  </th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Intérêts cumulés
                  </th>
                  <th className="py-2 font-medium text-right">
                    Capital cumulé
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row) => (
                  <tr
                    key={row.annee}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="py-2 pr-4 text-slate-700">
                      Année {row.annee}
                    </td>
                    <td className="py-2 pr-4 text-right text-slate-700">
                      {formatEuroPrecise(row.versementsCumules)}
                    </td>
                    <td className="py-2 pr-4 text-right text-emerald-700">
                      {formatEuroPrecise(row.interetsCumules)}
                    </td>
                    <td className="py-2 text-right font-medium text-slate-900">
                      {formatEuroPrecise(row.capitalCumule)}
                    </td>
                  </tr>
                ))}
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
