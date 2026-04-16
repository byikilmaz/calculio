"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeIndependantCH,
  type CHSituationInd,
  type IndependantCHResult,
} from "@/lib/calculators/simulateur-independant-suisse-ch";
import {
  CH_CANTON_LABEL,
  CH_COMMUNE_COEFFICIENT_MOYEN,
  type CHCanton,
} from "@/lib/tax-rates/ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

const CANTONS: CHCanton[] = ["VD", "GE", "VS", "FR", "NE", "JU", "BE"];

export function IndependantCHCalculator() {
  const [benefice, setBenefice] = useState<string>("110000");
  const [age, setAge] = useState<string>("42");
  const [canton, setCanton] = useState<CHCanton>("VD");
  const [situation, setSituation] = useState<CHSituationInd>("celibataire");
  const [enfants, setEnfants] = useState<number>(0);
  const [coef, setCoef] = useState<string>("0.75");
  const [v3a, setV3a] = useState<string>("15000");

  const result = useMemo<IndependantCHResult | null>(() => {
    const b = parseNum(benefice);
    if (!Number.isFinite(b) || b < 0) return null;
    const c = parseNum(coef);
    return computeIndependantCH({
      beneficeBrut: b,
      age: parseNum(age) || 35,
      canton,
      situation,
      enfants,
      coefficientCommunal: Number.isFinite(c)
        ? c
        : CH_COMMUNE_COEFFICIENT_MOYEN[canton],
      versement3a: parseNum(v3a) || 0,
    });
  }, [benefice, age, canton, situation, enfants, coef, v3a]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre activité indépendante
          </h2>
          <p className="text-sm text-slate-500">
            AVS indépendant 10 %, pas d&apos;AC, 3a renforcé possible
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="ben">Bénéfice annuel (CA − charges)</Label>
            <div className="relative">
              <Input
                id="ben"
                inputMode="decimal"
                value={benefice}
                onChange={(e) => setBenefice(e.target.value)}
                className="pr-14"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                CHF
              </span>
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
                {CANTONS.map((c) => (
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
                { value: "celibataire", label: "Célibataire" },
                { value: "marie", label: "Marié(e)" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="enfants">Enfants</Label>
              <Input
                id="enfants"
                type="number"
                min={0}
                max={10}
                value={enfants}
                onChange={(e) => setEnfants(Number(e.target.value) || 0)}
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
            <div>
              <Label htmlFor="v3a">Versement 3a / an</Label>
              <div className="relative">
                <Input
                  id="v3a"
                  inputMode="decimal"
                  value={v3a}
                  onChange={(e) => setV3a(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Revenu net mensuel"
              value={formatCHF(result.revenuMensuel)}
              accent
            />
            <Tile
              label="Revenu net annuel"
              value={formatCHF(result.revenuDisponible)}
            />
            <Tile
              label="Prélèvements totaux"
              value={formatPercent(result.tauxPrelevementGlobal, 1)}
            />
          </div>

          {!result.respecteSeuilMin && (
            <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-900">
              Attention : bénéfice inférieur au seuil AVS minimum annuel (514
              CHF). Cotisation minimale obligatoire appliquée par la caisse.
            </div>
          )}

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Bénéfice brut"
                value={formatCHFPrecise(result.beneficeBrut)}
              />
              <Row
                label="AVS / AI / APG indépendant (10 %)"
                value={`− ${formatCHFPrecise(result.cotisationAVSIndependant)}`}
              />
              <Row
                label={`3a renforcé (plafond ${formatCHF(result.plafond3a)})`}
                value={`− ${formatCHFPrecise(result.versement3aEffectif)}`}
              />
              <Row
                label="Bénéfice net"
                value={formatCHFPrecise(result.beneficeNet)}
                bold
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
              <Row label="IFD" value={formatCHFPrecise(result.ifd)} />
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
