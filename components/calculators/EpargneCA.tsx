"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeEpargneQC,
  type EpargneQCResult,
  type QCSupportEpargne,
} from "@/lib/calculators/simulateur-epargne-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function EpargneCACalculator() {
  const [capitalInit, setCapitalInit] = useState<string>("5000");
  const [versement, setVersement] = useState<string>("500");
  const [taux, setTaux] = useState<string>("5");
  const [duree, setDuree] = useState<string>("20");
  const [support, setSupport] = useState<QCSupportEpargne>("comparaison");
  const [tmiActuel, setTmiActuel] = useState<string>("37");
  const [tmiRetrait, setTmiRetrait] = useState<string>("25");
  const [revenu, setRevenu] = useState<string>("75000");

  const result = useMemo<EpargneQCResult | null>(() => {
    return computeEpargneQC({
      capitalInitial: parseNum(capitalInit) || 0,
      versementMensuel: parseNum(versement) || 0,
      tauxAnnuel: parseNum(taux) || 0,
      dureeAnnees: parseNum(duree) || 0,
      support,
      tmiActuelPct: parseNum(tmiActuel) || 0,
      tmiRetraitPct: parseNum(tmiRetrait) || 0,
      revenuAnnuel: parseNum(revenu) || 0,
    });
  }, [capitalInit, versement, taux, duree, support, tmiActuel, tmiRetrait, revenu]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet d&apos;épargne
          </h2>
          <p className="text-sm text-slate-500">
            REER vs CELI — choix optimal selon votre TMI actuel et futur
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="cap-init">Capital initial</Label>
              <div className="relative">
                <Input
                  id="cap-init"
                  inputMode="decimal"
                  value={capitalInit}
                  onChange={(e) => setCapitalInit(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="versement">Versement mensuel</Label>
              <div className="relative">
                <Input
                  id="versement"
                  inputMode="decimal"
                  value={versement}
                  onChange={(e) => setVersement(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="duree">Durée (années)</Label>
              <Input
                id="duree"
                inputMode="decimal"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="taux">Rendement annuel</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="revenu">Revenu annuel (plafond REER)</Label>
              <div className="relative">
                <Input
                  id="revenu"
                  inputMode="decimal"
                  value={revenu}
                  onChange={(e) => setRevenu(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="tmi-actuel">TMI actuel (versement)</Label>
              <div className="relative">
                <Input
                  id="tmi-actuel"
                  inputMode="decimal"
                  value={tmiActuel}
                  onChange={(e) => setTmiActuel(e.target.value)}
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="tmi-retrait">TMI prévu au retrait</Label>
              <div className="relative">
                <Input
                  id="tmi-retrait"
                  inputMode="decimal"
                  value={tmiRetrait}
                  onChange={(e) => setTmiRetrait(e.target.value)}
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Compte d&apos;épargne</Label>
            <RadioGroup
              name="support"
              value={support}
              onChange={setSupport}
              options={[
                {
                  value: "reer",
                  label: "REER",
                  description: "Déductible à l'entrée, imposé au retrait",
                },
                {
                  value: "celi",
                  label: "CELI",
                  description: "Non-déductible, retrait 100 % exonéré",
                },
                {
                  value: "comparaison",
                  label: "Comparer REER vs CELI",
                  description: "Calcul parallèle des deux scénarios",
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

function ResultPanel({ result }: { result: EpargneQCResult }) {
  const gagnant =
    result.recommandation === "reer"
      ? "REER"
      : result.recommandation === "celi"
        ? "CELI"
        : "équivalent";
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="REER — capital net final"
          value={formatCAD(result.scenarioREER.capitalApresImpot)}
          accent={result.recommandation === "reer"}
        />
        <Tile
          label="CELI — capital net final"
          value={formatCAD(result.scenarioCELI.capitalApresImpot)}
          accent={result.recommandation === "celi"}
        />
        <Tile label="Recommandation" value={gagnant} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Scénario REER
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Plafond annuel (18 % revenu, max 32 490 $)"
            value={formatCADPrecise(result.plafondREER)}
          />
          <Row
            label="Total versé"
            value={formatCADPrecise(result.scenarioREER.totalVerse)}
          />
          <Row
            label="Capital brut (avant impôt au retrait)"
            value={formatCADPrecise(result.scenarioREER.capitalFinalBrut)}
          />
          <Row
            label="Économie d'impôt cumulée (à l'entrée)"
            value={formatCADPrecise(result.scenarioREER.economieImpotCumulee)}
          />
          <Row
            label="Capital net après impôt au retrait"
            value={formatCADPrecise(result.scenarioREER.capitalApresImpot)}
            bold
          />
          <Row
            label="Rendement net cumulé"
            value={formatPercent(result.scenarioREER.rendementNetApprox, 1)}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Scénario CELI
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Plafond annuel 2026"
            value={formatCADPrecise(result.plafondCELI)}
          />
          <Row
            label="Total versé"
            value={formatCADPrecise(result.scenarioCELI.totalVerse)}
          />
          <Row
            label="Capital final (100 % exonéré au retrait)"
            value={formatCADPrecise(result.scenarioCELI.capitalApresImpot)}
            bold
          />
          <Row
            label="Rendement net cumulé"
            value={formatPercent(result.scenarioCELI.rendementNetApprox, 1)}
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
