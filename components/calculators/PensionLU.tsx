"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePensionLU,
  type PensionLUResult,
} from "@/lib/calculators/calculateur-pension-luxembourg-lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PensionLUCalculator() {
  const [salaire, setSalaire] = useState<string>("75000");
  const [annees, setAnnees] = useState<string>("35");
  const [age, setAge] = useState<string>("45");
  const [versement3e, setVersement3e] = useState<string>("2000");
  const [tauxMarginal, setTauxMarginal] = useState<string>("0.39");
  const [anneesRestantes, setAnneesRestantes] = useState<string>("20");

  const result = useMemo<PensionLUResult | null>(() => {
    const s = parseNum(salaire);
    if (!Number.isFinite(s) || s <= 0) return null;
    return computePensionLU({
      salaireMoyenAnnuel: s,
      anneesCotisation: parseNum(annees) || 0,
      age: parseNum(age) || 0,
      versement3eAnnuel: parseNum(versement3e) || 0,
      tauxMarginalIR: parseNum(tauxMarginal) || 0.39,
      anneesResteAvantRetraite: parseNum(anneesRestantes) || 0,
    });
  }, [salaire, annees, age, versement3e, tauxMarginal, anneesRestantes]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre carrière au Luxembourg
          </h2>
          <p className="text-sm text-slate-500">
            CNAP — Caisse Nationale d&apos;Assurance Pension
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="salaire">Salaire moyen annuel</Label>
              <div className="relative">
                <Input
                  id="salaire"
                  inputMode="decimal"
                  value={salaire}
                  onChange={(e) => setSalaire(e.target.value)}
                  placeholder="75000"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="annees">Années de cotisation</Label>
              <Input
                id="annees"
                inputMode="numeric"
                value={annees}
                onChange={(e) => setAnnees(e.target.value)}
                placeholder="35"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="age">Âge actuel</Label>
            <Input
              id="age"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="45"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            3e pilier — Prévoyance art. 111bis
          </h2>
          <p className="text-sm text-slate-500">
            Déduction max 3 200 €/an (2026)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="versement">Versement annuel</Label>
              <div className="relative">
                <Input
                  id="versement"
                  inputMode="decimal"
                  value={versement3e}
                  onChange={(e) => setVersement3e(e.target.value)}
                  placeholder="2000"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="tmi">Taux marginal IR</Label>
              <Input
                id="tmi"
                inputMode="decimal"
                value={tauxMarginal}
                onChange={(e) => setTauxMarginal(e.target.value)}
                placeholder="0.39"
              />
            </div>
            <div>
              <Label htmlFor="restantes">Années restantes</Label>
              <Input
                id="restantes"
                inputMode="numeric"
                value={anneesRestantes}
                onChange={(e) => setAnneesRestantes(e.target.value)}
                placeholder="20"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: PensionLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Pension mensuelle estimée"
          value={formatEuro(result.pensionPlafonnee)}
          accent
        />
        <Tile
          label="Pension annuelle brute"
          value={formatEuro(result.pensionPlafonnee * 12)}
        />
        <Tile
          label="Taux de remplacement"
          value={formatPercent(result.tauxRemplacement, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail CNAP
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Majoration proportionnelle mensuelle (1,775 %)"
            value={formatEuroPrecise(result.majorationProportionnelle)}
          />
          <Row
            label="Majoration forfaitaire mensuelle (23,75 % × SSM × n/40)"
            value={formatEuroPrecise(result.majorationForfaitaire)}
          />
          <Row
            label="Pension mensuelle brute (avant plafonds)"
            value={formatEuroPrecise(result.pensionMensuelleBrute)}
          />
          <Row
            label="Pension mensuelle plafonnée (min 1 925 € / max 9 628 €)"
            value={formatEuroPrecise(result.pensionPlafonnee)}
            bold
          />
          <Row
            label="Éligibilité âge légal (65 ans)"
            value={result.eligibleAgeLegal ? "Oui" : "Non"}
          />
          <Row
            label="Anticipée 60 ans (40 ans carrière)"
            value={result.eligibleAnticipee60 ? "Oui" : "Non"}
          />
          <Row
            label="Anticipée 57 ans (carrière longue)"
            value={result.eligibleAnticipee57 ? "Oui" : "Non"}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            3e pilier — Art. 111bis
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Versement annuel déductible"
            value={formatEuroPrecise(result.versementDeductible)}
          />
          <Row
            label="Économie fiscale annuelle"
            value={formatEuroPrecise(result.economieFiscaleAnnuelle)}
          />
          <Row
            label="Cumul versements (années restantes)"
            value={formatEuroPrecise(result.cumul3e)}
          />
          <Row
            label="Gain fiscal cumulé"
            value={formatEuroPrecise(result.gainCumule3e)}
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
