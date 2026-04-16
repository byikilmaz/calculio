"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeSalaireBrutNetCH,
  type CHSituation,
  type SalaireBrutNetCHResult,
} from "@/lib/calculators/calcul-salaire-brut-net-suisse-ch";
import {
  CH_CANTON_LABEL,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  type CHCanton,
} from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

type Period = "mois" | "annee";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTON_OPTIONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];

export function SalaireBrutNetCHCalculator() {
  const [amount, setAmount] = useState<string>("8500");
  const [period, setPeriod] = useState<Period>("mois");
  const [age, setAge] = useState<string>("38");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [situation, setSituation] = useState<CHSituation>("celibataire");
  const [enfants, setEnfants] = useState<number>(0);
  const [coefCom, setCoefCom] = useState<string>("0.75");

  const result = useMemo<SalaireBrutNetCHResult | null>(() => {
    const parsed = parseNum(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const brutAnnuel = period === "mois" ? parsed * 13 : parsed; // 13e salaire usuel
    const ageNum = parseNum(age);
    const coef = parseNum(coefCom);
    return computeSalaireBrutNetCH({
      brutAnnuel,
      age: Number.isFinite(ageNum) ? ageNum : 35,
      canton,
      situation,
      enfants,
      coefficientCommunal: Number.isFinite(coef)
        ? coef
        : CH_COMMUNE_COEFFICIENT_MOYEN[canton],
    });
  }, [amount, period, age, canton, situation, enfants, coefCom]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre salaire
          </h2>
          <p className="text-sm text-slate-500">
            Brut, canton romand et situation familiale
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
                  placeholder="8500"
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
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
                  Mensuel (×13)
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="38"
              />
            </div>
            <div>
              <Label htmlFor="canton">Canton</Label>
              <select
                id="canton"
                value={canton}
                onChange={(e) => setCanton(e.target.value as CHCanton)}
                className="flex h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {CANTON_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {CH_CANTON_LABEL[c]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label>Situation familiale</Label>
            <RadioGroup
              name="situation"
              value={situation}
              onChange={setSituation}
              options={[
                {
                  value: "celibataire",
                  label: "Célibataire",
                  description: "Barème individuel (IFD + canton)",
                },
                {
                  value: "marie",
                  label: "Marié(e)",
                  description: "Barème séparé marié avec splitting",
                },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enfants">Enfants à charge</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEnfants(Math.max(0, enfants - 1))}
                >
                  −
                </Button>
                <div className="min-w-[3rem] text-center text-lg font-semibold text-slate-900">
                  {enfants}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEnfants(Math.min(10, enfants + 1))}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="coef-commune">Coefficient communal</Label>
              <Input
                id="coef-commune"
                inputMode="decimal"
                value={coefCom}
                onChange={(e) => setCoefCom(e.target.value)}
                placeholder="0.75"
              />
              <div className="mt-1 text-xs text-slate-500">
                Moyenne {CH_CANTON_LABEL[canton]} :{" "}
                {CH_COMMUNE_COEFFICIENT_MOYEN[canton]}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: SalaireBrutNetCHResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Net mensuel"
          value={formatCHF(result.netMensuel)}
          accent
        />
        <Tile label="Net annuel" value={formatCHF(result.netAnnuel)} />
        <Tile
          label="Taux de prélèvement"
          value={formatPercent(result.tauxGlobal, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
          <p className="text-sm text-slate-500">
            Brut annuel : {formatCHF(result.brutAnnuel)}
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire brut annuel"
            value={formatCHFPrecise(result.brutAnnuel)}
          />
          <Row
            label="AVS / AI / APG (5,3 %)"
            value={`− ${formatCHFPrecise(result.avsAiApg)}`}
          />
          <Row
            label="AC — assurance chômage (1,1 %)"
            value={`− ${formatCHFPrecise(result.ac)}`}
          />
          <Row
            label={`LPP 2e pilier (${formatPercent(result.lppTaux, 0)} sur salaire coordonné)`}
            value={`− ${formatCHFPrecise(result.lppCotisationSalarie)}`}
          />
          <Row
            label="Total cotisations sociales"
            value={formatCHFPrecise(result.totalCotisationsSociales)}
            bold
          />
          <Row
            label="Salaire déterminant (après cotisations)"
            value={formatCHFPrecise(result.salaireDeterminant)}
          />
          <Row
            label="Déductions personnelles"
            value={`− ${formatCHFPrecise(result.deductionsPersonnelles)}`}
          />
          <Row
            label="Revenu imposable"
            value={formatCHFPrecise(result.revenuImposable)}
            bold
          />
          <Row
            label="IFD (impôt fédéral direct)"
            value={formatCHFPrecise(result.ifd)}
          />
          <Row
            label="Impôt cantonal"
            value={formatCHFPrecise(result.impotCantonal)}
          />
          <Row
            label="Impôt communal"
            value={formatCHFPrecise(result.impotCommunal)}
          />
          <Row
            label="Total impôt"
            value={formatCHFPrecise(result.impotTotal)}
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
