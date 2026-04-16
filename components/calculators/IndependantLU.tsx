"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeIndependantLU,
  type IndependantLUResult,
} from "@/lib/calculators/simulateur-independant-luxembourg-lu";
import type { LUClasse } from "@/lib/tax-rates/lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function IndependantLUCalculator() {
  const [benefice, setBenefice] = useState<string>("80000");
  const [classe, setClasse] = useState<LUClasse>("1");
  const [useForfait, setUseForfait] = useState<boolean>(true);

  const result = useMemo<IndependantLUResult | null>(() => {
    const b = parseNum(benefice);
    if (!Number.isFinite(b) || b <= 0) return null;
    return computeIndependantLU({
      beneficeAnnuel: b,
      classe,
      useForfaitFrais: useForfait,
    });
  }, [benefice, classe, useForfait]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre activité d&apos;indépendant
          </h2>
          <p className="text-sm text-slate-500">
            Bénéfice annuel (chiffre d&apos;affaires − charges)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="benefice">Bénéfice annuel</Label>
            <div className="relative">
              <Input
                id="benefice"
                inputMode="decimal"
                value={benefice}
                onChange={(e) => setBenefice(e.target.value)}
                placeholder="80000"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Classe d&apos;impôt</Label>
            <RadioGroup
              name="classe"
              value={classe}
              onChange={setClasse}
              options={[
                { value: "1", label: "Classe 1", description: "Célibataire" },
                {
                  value: "1a",
                  label: "Classe 1a",
                  description: "Monoparental / veuf",
                },
                {
                  value: "2",
                  label: "Classe 2",
                  description: "Marié — splitting",
                },
              ]}
            />
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-slate-50 p-4">
            <div>
              <div className="font-medium text-slate-900">
                Forfait frais d&apos;obtention (540 €)
              </div>
              <div className="text-sm text-slate-500">
                Décochez si vous déclarez frais réels supérieurs
              </div>
            </div>
            <Button
              type="button"
              variant={useForfait ? "primary" : "ghost"}
              onClick={() => setUseForfait(!useForfait)}
            >
              {useForfait ? "Oui" : "Non"}
            </Button>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: IndependantLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Net mensuel"
          value={formatEuro(result.netMensuel)}
          accent
        />
        <Tile label="Net annuel" value={formatEuro(result.netAnnuel)} />
        <Tile
          label="Taux de prélèvement"
          value={formatPercent(result.tauxGlobal, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Cotisations CCSS indépendant
          </h3>
          <p className="text-sm text-slate-500">
            Bénéfice : {formatEuro(result.beneficeAnnuel)}
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Pension (16 %)"
            value={`− ${formatEuroPrecise(result.pension)}`}
          />
          <Row
            label="Maladie soins (5,45 %)"
            value={`− ${formatEuroPrecise(result.maladieSoins)}`}
          />
          <Row
            label="Maladie espèces (0,05 %)"
            value={`− ${formatEuroPrecise(result.maladieEspeces)}`}
          />
          <Row
            label="Assurance accident (0,82 %)"
            value={`− ${formatEuroPrecise(result.accident)}`}
          />
          <Row
            label="Mutualité classe moyenne (0,81 %)"
            value={`− ${formatEuroPrecise(result.mutualite)}`}
          />
          <Row
            label="Contribution dépendance (1,40 %)"
            value={`− ${formatEuroPrecise(result.dependance)}`}
          />
          <Row
            label="Total cotisations"
            value={formatEuroPrecise(result.totalCotisations)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Impôt sur le revenu
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Revenu imposable"
            value={formatEuroPrecise(result.revenuImposable)}
          />
          <Row
            label="Impôt barème"
            value={formatEuroPrecise(result.impotBareme)}
          />
          <Row
            label="Crédit CII (indépendant)"
            value={`− ${formatEuroPrecise(result.creditCII)}`}
          />
          <Row
            label="Fonds emploi (7 %)"
            value={`+ ${formatEuroPrecise(result.fondsEmploi)}`}
          />
          <Row
            label="Impôt total"
            value={formatEuroPrecise(result.impotTotal)}
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
