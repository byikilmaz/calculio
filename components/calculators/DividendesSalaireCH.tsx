"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeDividendesSalaireCH,
  type CHSituationDir,
  type DividendesSalaireCHResult,
} from "@/lib/calculators/simulateur-dividendes-salaire-suisse-ch";
import {
  CH_CANTON_LABEL,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  CH_IS_TAUX_EFFECTIF_TOTAL,
  type CHCanton,
} from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];

export function DividendesSalaireCHCalculator() {
  const [enveloppe, setEnveloppe] = useState<string>("200000");
  const [part, setPart] = useState<string>("50");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [situation, setSituation] = useState<CHSituationDir>("celibataire");
  const [age, setAge] = useState<string>("40");
  const [coef, setCoef] = useState<string>("0.75");

  const result = useMemo<DividendesSalaireCHResult | null>(() => {
    const e = parseNum(enveloppe);
    if (!Number.isFinite(e) || e <= 0) return null;
    const p = parseNum(part);
    const c = parseNum(coef);
    return computeDividendesSalaireCH({
      beneficeAvantRemuneration: e,
      partSalaire: Number.isFinite(p) ? p / 100 : 0.5,
      canton,
      situation,
      age: parseNum(age) || 35,
      coefficientCommunal: Number.isFinite(c)
        ? c
        : CH_COMMUNE_COEFFICIENT_MOYEN[canton],
    });
  }, [enveloppe, part, canton, situation, age, coef]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Dirigeant SA/Sàrl — Salaire vs Dividende
          </h2>
          <p className="text-sm text-slate-500">
            Taxation partielle 70 % IFD / 50-70 % canton (participation ≥ 10 %)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="env">
                Enveloppe brute (bénéfice avant rémunération)
              </Label>
              <div className="relative">
                <Input
                  id="env"
                  inputMode="decimal"
                  value={enveloppe}
                  onChange={(e) => setEnveloppe(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="part">Part en salaire %</Label>
              <Input
                id="part"
                type="range"
                min={0}
                max={100}
                step={5}
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
              <div className="mt-1 text-sm text-slate-500">
                {part} % salaire, {100 - parseNum(part)} % dividende
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                    {CH_CANTON_LABEL[c]} — IS{" "}
                    {formatPercent(CH_IS_TAUX_EFFECTIF_TOTAL[c], 1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="age">Âge du dirigeant</Label>
              <Input
                id="age"
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Situation</Label>
              <RadioGroup
                name="situation"
                value={situation}
                onChange={setSituation}
                options={[
                  { value: "celibataire", label: "Célibataire" },
                  { value: "marie", label: "Marié(e)" },
                ]}
              />
            </div>
            <div>
              <Label htmlFor="coef">Coefficient communal</Label>
              <Input
                id="coef"
                inputMode="decimal"
                value={coef}
                onChange={(e) => setCoef(e.target.value)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Net total (après tous prélèvements)"
              value={formatCHF(result.netTotal)}
              accent
            />
            <Tile
              label="Net salaire"
              value={formatCHF(result.netSalaire)}
            />
            <Tile
              label="Net dividende"
              value={formatCHF(result.netDividende)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Volet salaire
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Salaire brut"
                value={formatCHFPrecise(result.salaireBrut)}
              />
              <Row
                label="AVS/AI/APG (5,3 %)"
                value={`− ${formatCHFPrecise(result.avsAiApg)}`}
              />
              <Row
                label="AC (1,1 %)"
                value={`− ${formatCHFPrecise(result.ac)}`}
              />
              <Row
                label="LPP (part salariée)"
                value={`− ${formatCHFPrecise(result.lppCotisation)}`}
              />
              <Row
                label="Salaire déterminant"
                value={formatCHFPrecise(result.salaireDeterminant)}
                bold
              />
              <Row
                label="IFD"
                value={formatCHFPrecise(result.ifdSalaire)}
              />
              <Row
                label="Impôt cantonal + communal"
                value={formatCHFPrecise(
                  result.impotCantonalSalaire + result.impotCommunalSalaire,
                )}
              />
              <Row
                label="Net salaire"
                value={formatCHFPrecise(result.netSalaire)}
                bold
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Volet dividende
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Bénéfice soumis à l'IS"
                value={formatCHFPrecise(result.beneficeSoumisIS)}
              />
              <Row
                label={`Impôt sur les sociétés (IFD + canton)`}
                value={`− ${formatCHFPrecise(result.impotSocietes)}`}
              />
              <Row
                label="Dividende brut distribuable"
                value={formatCHFPrecise(result.dividendeBrut)}
                bold
              />
              <Row
                label="Base imposable IFD (70 %)"
                value={formatCHFPrecise(result.baseImposablePartielleIFD)}
              />
              <Row
                label="Base imposable canton"
                value={formatCHFPrecise(result.baseImposablePartielleCanton)}
              />
              <Row
                label="Impôt dividende (IFD + canton + commune)"
                value={formatCHFPrecise(result.impotTotalDividende)}
              />
              <Row
                label="Net dividende"
                value={formatCHFPrecise(result.netDividende)}
                bold
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Synthèse
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Enveloppe brute"
                value={formatCHFPrecise(result.enveloppe)}
              />
              <Row
                label="Prélèvements totaux"
                value={formatCHFPrecise(result.prelevementsTotaux)}
              />
              <Row
                label="Taux effectif global"
                value={formatPercent(result.tauxEffectifGlobal, 2)}
                bold
              />
              <Row
                label="Net total perçu"
                value={formatCHFPrecise(result.netTotal)}
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
