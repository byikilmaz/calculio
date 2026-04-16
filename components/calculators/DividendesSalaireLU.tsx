"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeDividendeSalaireLU,
  type DividendeSalaireLUResult,
} from "@/lib/calculators/simulateur-dividendes-salaire-luxembourg-lu";
import type { LUClasse } from "@/lib/tax-rates/lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function DividendesSalaireLUCalculator() {
  const [benefice, setBenefice] = useState<string>("150000");
  const [classe, setClasse] = useState<LUClasse>("1");
  const [partSalaire, setPartSalaire] = useState<string>("0.5");

  const result = useMemo<DividendeSalaireLUResult | null>(() => {
    const b = parseNum(benefice);
    if (!Number.isFinite(b) || b <= 0) return null;
    return computeDividendeSalaireLU({
      beneficeSociete: b,
      tauxRemunerationEnSalaire: parseNum(partSalaire) || 0,
      classe,
    });
  }, [benefice, classe, partSalaire]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Dirigeant Sàrl / SA — Luxembourg
          </h2>
          <p className="text-sm text-slate-500">
            Comparez salaire vs dividende
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="benefice">Bénéfice annuel société (avant IS)</Label>
            <div className="relative">
              <Input
                id="benefice"
                inputMode="decimal"
                value={benefice}
                onChange={(e) => setBenefice(e.target.value)}
                placeholder="150000"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Classe d&apos;impôt personnelle</Label>
            <RadioGroup
              name="classe"
              value={classe}
              onChange={setClasse}
              options={[
                { value: "1", label: "Classe 1", description: "Célibataire" },
                {
                  value: "1a",
                  label: "Classe 1a",
                  description: "Monoparental",
                },
                {
                  value: "2",
                  label: "Classe 2",
                  description: "Marié — splitting",
                },
              ]}
            />
          </div>

          <div>
            <Label htmlFor="part">Part rémunérée en salaire (0-1)</Label>
            <Input
              id="part"
              inputMode="decimal"
              value={partSalaire}
              onChange={(e) => setPartSalaire(e.target.value)}
              placeholder="0.5"
            />
            <div className="mt-1 text-xs text-slate-500">
              Ex. 0.5 = 50 % salaire, 50 % dividende
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: DividendeSalaireLUResult }) {
  const best = Math.max(result.sceTS_net, result.sceTD_net, result.sceOpti_net);
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Tout salaire — Net"
          value={formatEuro(result.sceTS_net)}
          accent={result.sceTS_net === best}
        />
        <Tile
          label="Tout dividende — Net"
          value={formatEuro(result.sceTD_net)}
          accent={result.sceTD_net === best}
        />
        <Tile
          label="Mix choisi — Net"
          value={formatEuro(result.sceOpti_net)}
          accent={result.sceOpti_net === best}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Scénario 1 : Tout en salaire
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Bénéfice versé en salaire"
            value={formatEuroPrecise(result.sceTS_brut)}
          />
          <Row
            label="Cotisations CCSS (~11 %)"
            value={`− ${formatEuroPrecise(result.sceTS_cotisations)}`}
          />
          <Row
            label="Impôt IR + fonds emploi + dépendance"
            value={`− ${formatEuroPrecise(result.sceTS_impot)}`}
          />
          <Row
            label="Net perçu"
            value={formatEuroPrecise(result.sceTS_net)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Scénario 2 : Tout en dividende
          </h3>
          <p className="text-sm text-slate-500">
            IS société 24,94 % + demi-imposition dividende
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="IS société (17 % + FE 7 % + ICC 6,75 %)"
            value={`− ${formatEuroPrecise(result.sceTD_is)}`}
          />
          <Row
            label="Bénéfice après IS (distribuable)"
            value={formatEuroPrecise(result.sceTD_beneficeApresIS)}
          />
          <Row
            label="Demi-imposition (50 % exonéré)"
            value={formatEuroPrecise(result.sceTD_dividendeImposable)}
          />
          <Row
            label="IR personne + fonds emploi"
            value={`− ${formatEuroPrecise(result.sceTD_irPersonne)}`}
          />
          <Row
            label="Précompte 15 % (imputable)"
            value={formatEuroPrecise(result.sceTD_precompte)}
          />
          <Row
            label="Net perçu"
            value={formatEuroPrecise(result.sceTD_net)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Scénario 3 : Mix{" "}
            {formatPercent(result.sceOpti_partSalaire, 0)} salaire /{" "}
            {formatPercent(1 - result.sceOpti_partSalaire, 0)} dividende
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire versé"
            value={formatEuroPrecise(result.sceOpti_salaire)}
          />
          <Row
            label="Cotisations sur salaire"
            value={`− ${formatEuroPrecise(result.sceOpti_cotisations)}`}
          />
          <Row
            label="Impôt salaire"
            value={`− ${formatEuroPrecise(result.sceOpti_impot)}`}
          />
          <Row
            label="IS sur résidu"
            value={`− ${formatEuroPrecise(result.sceOpti_is)}`}
          />
          <Row
            label="Dividende brut distribuable"
            value={formatEuroPrecise(result.sceOpti_dividende)}
          />
          <Row
            label="IR sur dividende"
            value={`− ${formatEuroPrecise(result.sceOpti_irDividende)}`}
          />
          <Row
            label="Net total"
            value={formatEuroPrecise(result.sceOpti_net)}
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
