"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeSalaireBrutNetQC,
  type QCSituation,
  type SalaireBrutNetQCResult,
} from "@/lib/calculators/calcul-salaire-brut-net-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

type Period = "mois" | "annee";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function SalaireBrutNetCACalculator() {
  const [amount, setAmount] = useState<string>("75000");
  const [period, setPeriod] = useState<Period>("annee");
  const [situation, setSituation] = useState<QCSituation>("celibataire");
  const [enfants, setEnfants] = useState<number>(0);
  const [conjointRevenu, setConjointRevenu] = useState<string>("0");

  const result = useMemo<SalaireBrutNetQCResult | null>(() => {
    const parsed = parseNum(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const brutAnnuel = period === "mois" ? parsed * 12 : parsed;
    const cr = parseNum(conjointRevenu);
    return computeSalaireBrutNetQC({
      brutAnnuel,
      situation,
      enfants,
      conjointRevenu: Number.isFinite(cr) ? cr : 0,
    });
  }, [amount, period, situation, enfants, conjointRevenu]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre salaire
          </h2>
          <p className="text-sm text-slate-500">
            Brut, situation familiale (Québec)
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
                  $
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
            <Label>Situation familiale</Label>
            <RadioGroup
              name="situation"
              value={situation}
              onChange={setSituation}
              options={[
                {
                  value: "celibataire",
                  label: "Célibataire",
                  description: "Aucune personne à charge déclarée",
                },
                {
                  value: "marie",
                  label: "Marié(e) / conjoint de fait",
                  description: "Crédit pour conjoint si son revenu est faible",
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
            {situation === "marie" && (
              <div>
                <Label htmlFor="conjoint-revenu">Revenu du conjoint</Label>
                <div className="relative">
                  <Input
                    id="conjoint-revenu"
                    inputMode="decimal"
                    value={conjointRevenu}
                    onChange={(e) => setConjointRevenu(e.target.value)}
                    placeholder="0"
                    className="pr-10"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: SalaireBrutNetQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Net mensuel"
          value={formatCAD(result.netMensuel)}
          accent
        />
        <Tile label="Net annuel" value={formatCAD(result.netAnnuel)} />
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
            Brut annuel : {formatCAD(result.brutAnnuel)}
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire brut annuel"
            value={formatCADPrecise(result.brutAnnuel)}
          />
          <Row
            label="RRQ base (6,4 %)"
            value={`− ${formatCADPrecise(result.rrqBase)}`}
          />
          <Row
            label="RRQ supplémentaire (4 %)"
            value={`− ${formatCADPrecise(result.rrqSupplementaire)}`}
          />
          <Row
            label="AE assurance-emploi (1,31 %)"
            value={`− ${formatCADPrecise(result.ae)}`}
          />
          <Row
            label="RQAP régime parental (0,494 %)"
            value={`− ${formatCADPrecise(result.rqap)}`}
          />
          {result.fss > 0 && (
            <Row
              label="FSS contribution santé"
              value={`− ${formatCADPrecise(result.fss)}`}
            />
          )}
          <Row
            label="Total cotisations sociales"
            value={formatCADPrecise(result.totalCotisations)}
            bold
          />
          <Row
            label="Impôt fédéral (avant abattement QC)"
            value={formatCADPrecise(result.impotFederalBrut)}
          />
          <Row
            label="Abattement Québec (−16,5 %)"
            value={`− ${formatCADPrecise(result.abattementQC)}`}
          />
          <Row
            label="Impôt fédéral net"
            value={formatCADPrecise(result.impotFederalNet)}
          />
          <Row
            label="Impôt Québec"
            value={formatCADPrecise(result.impotQuebec)}
          />
          <Row
            label="Total impôts"
            value={formatCADPrecise(result.impotTotal)}
            bold
          />
        </CardBody>
      </Card>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600">{label}</span>
      <span
        className={bold ? "font-semibold text-slate-900" : "font-medium text-slate-900"}
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
