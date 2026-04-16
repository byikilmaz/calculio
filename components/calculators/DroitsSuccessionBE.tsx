"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeDroitsSuccessionBE,
  type SuccessionBEResult,
} from "@/lib/calculators/calcul-droits-succession-belgique-be";
import type { BELienParente, BERegion } from "@/lib/tax-rates/be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function DroitsSuccessionBECalculator() {
  const [montant, setMontant] = useState<string>("250000");
  const [region, setRegion] = useState<BERegion>("wallonie");
  const [lien, setLien] = useState<BELienParente>("ligneDirecte");
  const [partenaireCohabitantLegal, setPartenaireCohabitantLegal] =
    useState<boolean>(false);

  const result = useMemo<SuccessionBEResult | null>(() => {
    const m = parseNum(montant);
    if (!Number.isFinite(m) || m < 0) return null;
    return computeDroitsSuccessionBE({
      montant: m,
      region,
      lien,
      partenaireCohabitantLegal,
    });
  }, [montant, region, lien, partenaireCohabitantLegal]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre héritage
          </h2>
          <p className="text-sm text-slate-500">
            Part nette reçue, région et lien de parenté
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="montant">Part nette reçue (après passif)</Label>
            <div className="relative">
              <Input
                id="montant"
                inputMode="decimal"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="250000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Région du défunt</Label>
            <RadioGroup
              name="region"
              value={region}
              onChange={setRegion}
              options={[
                {
                  value: "wallonie",
                  label: "Wallonie",
                  description: "Barème progressif, abattement 12 500 €",
                },
                {
                  value: "bruxelles",
                  label: "Bruxelles-Capitale",
                  description: "Barème progressif, abattement 15 000 €",
                },
                {
                  value: "flandre",
                  label: "Flandre",
                  description: "Barème simplifié 3 / 9 / 27 %",
                },
              ]}
            />
          </div>

          <div>
            <Label>Lien de parenté</Label>
            <RadioGroup
              name="lien"
              value={lien}
              onChange={setLien}
              options={[
                {
                  value: "ligneDirecte",
                  label: "Ligne directe",
                  description: "Enfant, petit-enfant, parent",
                },
                {
                  value: "conjoint",
                  label: "Conjoint",
                  description: "Exonération logement familial",
                },
                {
                  value: "frereSoeur",
                  label: "Frère / sœur",
                  description: "Barème majoré",
                },
                {
                  value: "oncleNeveu",
                  label: "Oncle, tante, neveu, nièce",
                  description: "Barème encore plus élevé",
                },
                {
                  value: "autre",
                  label: "Autre / non-parent",
                  description: "Concubin, ami, étranger",
                },
              ]}
            />
          </div>

          <label className="flex items-start gap-3 rounded-md border border-[var(--border)] p-3 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={partenaireCohabitantLegal}
              onChange={(e) => setPartenaireCohabitantLegal(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Cohabitant légal (déclaration à la commune)
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Assimilé au conjoint à Bruxelles / Flandre
              </span>
            </span>
          </label>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: SuccessionBEResult }) {
  if (result.exoneree) {
    return (
      <div className="rounded-md border border-emerald-300 bg-emerald-50 p-5">
        <div className="text-lg font-semibold text-emerald-900">
          Exonération totale
        </div>
        <div className="mt-1 text-sm text-emerald-800">
          Selon le régime applicable, cette transmission peut être totalement
          exonérée de droits de succession (logement familial pour conjoint,
          cohabitant légal assimilé en Bruxelles / Flandre). Vous recevez
          l'intégralité de votre part, soit {formatEuro(result.montant)}.
          Un notaire confirmera les conditions précises.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Droits à payer"
          value={formatEuro(result.droits)}
          accent
        />
        <Tile label="Net perçu" value={formatEuro(result.netRecu)} />
        <Tile
          label="Taux effectif"
          value={formatPercent(result.tauxEffectif, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
          <p className="text-sm text-slate-500">Barème : {result.bareme}</p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row label="Part nette reçue" value={formatEuroPrecise(result.montant)} />
          <Row
            label="Abattement applicable"
            value={
              result.abattement === Number.POSITIVE_INFINITY
                ? "∞"
                : formatEuroPrecise(result.abattement)
            }
          />
          <Row
            label="Part taxable"
            value={formatEuroPrecise(result.partTaxable)}
          />
          {result.tranches.length > 0 && result.partTaxable > 0 && (
            <div className="mt-4">
              <div className="mb-2 font-medium text-slate-700">
                Application du barème
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                      <th className="py-2 pr-4 font-medium">Tranche</th>
                      <th className="py-2 pr-4 font-medium">Taux</th>
                      <th className="py-2 pr-4 font-medium text-right">Base</th>
                      <th className="py-2 font-medium text-right">Droits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.tranches
                      .filter((t) => t.base > 0)
                      .map((t, i) => {
                        const label =
                          t.max === Number.POSITIVE_INFINITY
                            ? `> ${formatEuro(t.min)}`
                            : `${formatEuro(t.min)} – ${formatEuro(t.max)}`;
                        return (
                          <tr
                            key={i}
                            className="border-b border-[var(--border)] last:border-0"
                          >
                            <td className="py-2 pr-4 text-slate-700">
                              {label}
                            </td>
                            <td className="py-2 pr-4 text-slate-500">
                              {formatPercent(t.rate, 0)}
                            </td>
                            <td className="py-2 pr-4 text-right text-slate-700">
                              {formatEuroPrecise(t.base)}
                            </td>
                            <td className="py-2 text-right font-medium text-slate-900">
                              {formatEuroPrecise(t.montant)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <Row
            label="Droits de succession"
            value={formatEuro(result.droits)}
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
