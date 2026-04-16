"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeEpargneBE,
  type BESupportEpargne,
  type EpargneBEResult,
} from "@/lib/calculators/simulateur-epargne-belgique-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function EpargneBECalculator() {
  const [capitalInitial, setCapitalInitial] = useState<string>("5000");
  const [versementMensuel, setVersementMensuel] = useState<string>("200");
  const [taux, setTaux] = useState<string>("2.5");
  const [duree, setDuree] = useState<string>("10");
  const [support, setSupport] = useState<BESupportEpargne>("livretReglemente");

  const result = useMemo<EpargneBEResult | null>(() => {
    const c = parseNum(capitalInitial);
    const v = parseNum(versementMensuel);
    const t = parseNum(taux);
    const d = parseNum(duree);
    if (!Number.isFinite(c) || c < 0) return null;
    if (!Number.isFinite(v) || v < 0) return null;
    if (!Number.isFinite(t)) return null;
    if (!Number.isFinite(d) || d <= 0) return null;
    return computeEpargneBE({
      capitalInitial: c,
      versementMensuel: v,
      tauxAnnuel: t,
      dureeAnnees: d,
      support,
    });
  }, [capitalInitial, versementMensuel, taux, duree, support]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet d'épargne
          </h2>
          <p className="text-sm text-slate-500">
            Indiquez le montant initial, vos versements et le support choisi
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
                  value={capitalInitial}
                  onChange={(e) => setCapitalInitial(e.target.value)}
                  placeholder="5000"
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
                  value={versementMensuel}
                  onChange={(e) => setVersementMensuel(e.target.value)}
                  placeholder="200"
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
              <Label htmlFor="taux">Taux annuel brut</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  placeholder="2.5"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="duree">Durée</Label>
              <div className="relative">
                <Input
                  id="duree"
                  inputMode="decimal"
                  value={duree}
                  onChange={(e) => setDuree(e.target.value)}
                  placeholder="10"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  ans
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Support d'épargne</Label>
            <RadioGroup
              name="support"
              value={support}
              onChange={setSupport}
              options={[
                {
                  value: "livretReglemente",
                  label: "Livret réglementé",
                  description:
                    "Exo. intérêts jusqu'à 1 020 €/an, puis 15 % précompte",
                },
                {
                  value: "compteEpargneNonReglemente",
                  label: "Compte non réglementé",
                  description: "30 % précompte mobilier dès le 1er euro",
                },
                {
                  value: "branche21",
                  label: "Assurance Branche 21",
                  description: "Taxe prime 2 % en entrée, rendement garanti",
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

function ResultPanel({ result }: { result: EpargneBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Capital final net"
          value={formatEuro(result.capitalFinalNet)}
          accent
        />
        <Tile
          label="Total versé"
          value={formatEuro(result.totalVerse)}
        />
        <Tile
          label="Rendement net annualisé"
          value={formatPercent(result.rendementNetAnnualise, 2)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Décomposition fiscale
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Intérêts bruts cumulés"
            value={formatEuroPrecise(result.interetsBruts)}
          />
          {result.support === "livretReglemente" && (
            <Row
              label="Intérêts exonérés (1 020 €/an)"
              value={`− ${formatEuroPrecise(result.exonerationAppliquee)}`}
            />
          )}
          <Row
            label={
              result.support === "compteEpargneNonReglemente"
                ? "Précompte mobilier (30 %)"
                : result.support === "livretReglemente"
                  ? "Précompte mobilier (15 % sur excédent)"
                  : "Précompte mobilier"
            }
            value={`− ${formatEuroPrecise(result.precompteMobilier)}`}
          />
          {result.support === "branche21" && (
            <Row
              label="Taxe prime assurance (2 %)"
              value={`− ${formatEuroPrecise(result.taxeAssurancePrime)}`}
            />
          )}
          <Row
            label="Capital brut avant prélèvements"
            value={formatEuroPrecise(result.capitalFinalBrut)}
          />
          <Row
            label="Capital net final"
            value={formatEuroPrecise(result.capitalFinalNet)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Évolution annuelle
          </h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-[var(--border)]">
                  <th className="py-2 pr-4 font-medium">Année</th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Versements
                  </th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Intérêts bruts
                  </th>
                  <th className="py-2 pr-4 font-medium text-right">
                    Précompte
                  </th>
                  <th className="py-2 font-medium text-right">
                    Capital net
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((y) => (
                  <tr
                    key={y.annee}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="py-2 pr-4 text-slate-700">{y.annee}</td>
                    <td className="py-2 pr-4 text-right text-slate-700">
                      {formatEuroPrecise(y.versementsCumules)}
                    </td>
                    <td className="py-2 pr-4 text-right text-slate-700">
                      {formatEuroPrecise(y.interetsBrutsCumules)}
                    </td>
                    <td className="py-2 pr-4 text-right text-slate-700">
                      {formatEuroPrecise(y.precompteCumule)}
                    </td>
                    <td className="py-2 text-right font-medium text-slate-900">
                      {formatEuroPrecise(y.capitalNetCumule)}
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
