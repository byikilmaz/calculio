"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeSalaireBrutNetLU,
  type SalaireBrutNetLUResult,
} from "@/lib/calculators/calcul-salaire-brut-net-luxembourg-lu";
import type { LUClasse } from "@/lib/tax-rates/lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

type Period = "mois" | "annee";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function SalaireBrutNetLUCalculator() {
  const [amount, setAmount] = useState<string>("75000");
  const [period, setPeriod] = useState<Period>("annee");
  const [classe, setClasse] = useState<LUClasse>("1");
  const [frontalier, setFrontalier] = useState<boolean>(false);

  const result = useMemo<SalaireBrutNetLUResult | null>(() => {
    const parsed = parseNum(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const brutAnnuel = period === "mois" ? parsed * 12 : parsed;
    return computeSalaireBrutNetLU({
      brutAnnuel,
      classe,
      frontalier,
    });
  }, [amount, period, classe, frontalier]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre salaire
          </h2>
          <p className="text-sm text-slate-500">
            Brut, classe d&apos;impôt, statut frontalier (Luxembourg)
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
                  placeholder="75000"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
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
                  Mensuel
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

          <div>
            <Label>Classe d&apos;impôt</Label>
            <RadioGroup
              name="classe"
              value={classe}
              onChange={setClasse}
              options={[
                {
                  value: "1",
                  label: "Classe 1",
                  description: "Célibataire sans enfant",
                },
                {
                  value: "1a",
                  label: "Classe 1a",
                  description: "Monoparental, veuf(ve) ou > 64 ans",
                },
                {
                  value: "2",
                  label: "Classe 2",
                  description: "Marié(e) — splitting (/2)",
                },
              ]}
            />
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-slate-50 p-4">
            <div>
              <div className="font-medium text-slate-900">
                Travailleur frontalier
              </div>
              <div className="text-sm text-slate-500">
                90 % des revenus imposés au Luxembourg (accès classe 2)
              </div>
            </div>
            <Button
              type="button"
              variant={frontalier ? "primary" : "ghost"}
              onClick={() => setFrontalier(!frontalier)}
            >
              {frontalier ? "Oui" : "Non"}
            </Button>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: SalaireBrutNetLUResult }) {
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
            Détail du calcul
          </h3>
          <p className="text-sm text-slate-500">
            Brut annuel : {formatEuro(result.brutAnnuel)}
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire brut annuel"
            value={formatEuroPrecise(result.brutAnnuel)}
          />
          <Row
            label="Pension CCSS (8,00 %)"
            value={`− ${formatEuroPrecise(result.pension)}`}
          />
          <Row
            label="Maladie espèces (2,80 %)"
            value={`− ${formatEuroPrecise(result.maladieEspeces)}`}
          />
          <Row
            label="Maladie soins (0,25 %)"
            value={`− ${formatEuroPrecise(result.maladieSoins)}`}
          />
          <Row
            label="Contribution dépendance (1,40 %)"
            value={`− ${formatEuroPrecise(result.dependance)}`}
          />
          <Row
            label="Total cotisations CCSS"
            value={formatEuroPrecise(result.totalCotisations)}
            bold
          />
          <Row
            label="Revenu imposable (après cotisations & forfaits)"
            value={formatEuroPrecise(result.revenuImposable)}
          />
          <Row
            label="Impôt sur le revenu brut"
            value={formatEuroPrecise(result.impotBrut)}
          />
          <Row
            label="Crédit d'impôt salarié (CIS)"
            value={`− ${formatEuroPrecise(result.creditCIS)}`}
          />
          <Row
            label="Fonds pour l'emploi (7 %)"
            value={`+ ${formatEuroPrecise(result.fondsEmploi)}`}
          />
          <Row
            label="Total impôt"
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
