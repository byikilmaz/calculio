"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeImpotRevenuQC,
  type ImpotRevenuQCResult,
  type QCImpotSituation,
} from "@/lib/calculators/simulateur-impot-revenu-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function ImpotRevenuCACalculator() {
  const [revenu, setRevenu] = useState<string>("75000");
  const [situation, setSituation] = useState<QCImpotSituation>("celibataire");
  const [enfants, setEnfants] = useState<number>(0);
  const [conjointRevenu, setConjointRevenu] = useState<string>("0");

  const result = useMemo<ImpotRevenuQCResult | null>(() => {
    const r = parseNum(revenu);
    if (!Number.isFinite(r) || r <= 0) return null;
    const cr = parseNum(conjointRevenu);
    return computeImpotRevenuQC({
      revenuBrut: r,
      situation,
      enfants,
      conjointRevenu: Number.isFinite(cr) ? cr : 0,
    });
  }, [revenu, situation, enfants, conjointRevenu]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre revenu imposable
          </h2>
          <p className="text-sm text-slate-500">
            Barèmes fédéral + Québec 2026 avec abattement Québec −16,5 %
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="revenu">Revenu imposable annuel</Label>
            <div className="relative">
              <Input
                id="revenu"
                inputMode="decimal"
                value={revenu}
                onChange={(e) => setRevenu(e.target.value)}
                placeholder="75000"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                $
              </span>
            </div>
          </div>

          <div>
            <Label>Situation</Label>
            <RadioGroup
              name="situation"
              value={situation}
              onChange={setSituation}
              options={[
                { value: "celibataire", label: "Célibataire" },
                {
                  value: "marie",
                  label: "Marié(e) / conjoint de fait",
                  description: "Crédit conjoint si revenu du conjoint < seuil",
                },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Enfants à charge</Label>
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
                <Label htmlFor="conjoint">Revenu du conjoint</Label>
                <div className="relative">
                  <Input
                    id="conjoint"
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

function ResultPanel({ result }: { result: ImpotRevenuQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Impôt total combiné"
          value={formatCAD(result.impotTotal)}
          accent
        />
        <Tile
          label="Taux moyen"
          value={formatPercent(result.tauxMoyen, 1)}
        />
        <Tile
          label="Taux marginal combiné"
          value={formatPercent(result.tauxMarginalCombine, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">Détail</h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Revenu imposable"
            value={formatCADPrecise(result.revenuBrut)}
          />
          <Row
            label="Impôt fédéral avant crédits"
            value={formatCADPrecise(result.impotFederalBrut)}
          />
          <Row
            label="Crédits non remboursables fédéral"
            value={`− ${formatCADPrecise(result.creditsFederaux)}`}
          />
          <Row
            label="Abattement Québec (−16,5 %)"
            value={`− ${formatCADPrecise(result.abattementQC)}`}
          />
          <Row
            label="Impôt fédéral net"
            value={formatCADPrecise(result.impotFederalNet)}
            bold
          />
          <Row
            label="Impôt Québec avant crédits"
            value={formatCADPrecise(
              result.tranchesQuebec.reduce((a, t) => a + t.impot, 0),
            )}
          />
          <Row
            label="Crédits non remboursables Québec"
            value={`− ${formatCADPrecise(result.creditsQuebec)}`}
          />
          <Row
            label="Impôt Québec net"
            value={formatCADPrecise(result.impotQuebec)}
            bold
          />
          <Row
            label="Impôt total combiné"
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
