"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeTravailleurAutonomeQC,
  type TravailleurAutonomeQCResult,
} from "@/lib/calculators/simulateur-travailleur-autonome-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function TravailleurAutonomeCACalculator() {
  const [ca, setCa] = useState<string>("100000");
  const [frais, setFrais] = useState<string>("15000");
  const [repas, setRepas] = useState<string>("3000");
  const [inscription, setInscription] = useState<"oui" | "non">("oui");

  const result = useMemo<TravailleurAutonomeQCResult | null>(() => {
    return computeTravailleurAutonomeQC({
      chiffreAffaires: parseNum(ca) || 0,
      fraisReels: parseNum(frais) || 0,
      fraisRepasClients: parseNum(repas) || 0,
      inscritTPSTVQ: inscription === "oui",
    });
  }, [ca, frais, repas, inscription]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre activité autonome
          </h2>
          <p className="text-sm text-slate-500">
            Calcul RRQ double, RQAP autonome, FSS et imposition personnelle
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="ca">Chiffre d&apos;affaires</Label>
              <div className="relative">
                <Input
                  id="ca"
                  inputMode="decimal"
                  value={ca}
                  onChange={(e) => setCa(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="frais">Frais réels déductibles</Label>
              <div className="relative">
                <Input
                  id="frais"
                  inputMode="decimal"
                  value={frais}
                  onChange={(e) => setFrais(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Bureau domicile, véhicule, fournitures, etc.
              </p>
            </div>
            <div>
              <Label htmlFor="repas">Repas clients (50 % déductible)</Label>
              <div className="relative">
                <Input
                  id="repas"
                  inputMode="decimal"
                  value={repas}
                  onChange={(e) => setRepas(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Inscription TPS/TVQ</Label>
            <RadioGroup
              name="inscription"
              value={inscription}
              onChange={setInscription}
              options={[
                {
                  value: "oui",
                  label: "Inscrit TPS/TVQ",
                  description: "Obligatoire si CA > 30 000 $ (4 trimestres glissants)",
                },
                {
                  value: "non",
                  label: "Non inscrit",
                  description: "Autorisé seulement si CA ≤ 30 000 $",
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

function ResultPanel({ result }: { result: TravailleurAutonomeQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Revenu net annuel"
          value={formatCAD(result.revenuNet)}
          accent
        />
        <Tile
          label="Revenu net mensuel"
          value={formatCAD(result.revenuNetMensuel)}
        />
        <Tile
          label="Taux de prélèvement"
          value={formatPercent(result.tauxGlobal, 1)}
        />
      </div>

      {result.doitInscription && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              TPS / TVQ à percevoir (en plus du CA)
            </h3>
            <p className="text-sm text-slate-500">
              CA supérieur à 30 000 $ → inscription obligatoire
            </p>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <Row
              label="TPS (5 %) à facturer puis remettre"
              value={formatCADPrecise(result.tpsAPercevoir)}
            />
            <Row
              label="TVQ (9,975 %) à facturer puis remettre"
              value={formatCADPrecise(result.tvqAPercevoir)}
            />
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Chiffre d'affaires"
            value={formatCADPrecise(result.chiffreAffaires)}
          />
          <Row
            label="Bénéfice avant impôt"
            value={formatCADPrecise(result.beneficeAvantImpot)}
            bold
          />
          <Row
            label="RRQ base (12,8 % — 2 parts)"
            value={`− ${formatCADPrecise(result.rrqBase)}`}
          />
          <Row
            label="RRQ supplémentaire (8 %)"
            value={`− ${formatCADPrecise(result.rrqSupplementaire)}`}
          />
          <Row
            label="RQAP autonome (0,878 %)"
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
            label="Impôt fédéral (après abattement QC)"
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
          <Row
            label="Revenu net disponible"
            value={formatCADPrecise(result.revenuNet)}
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
