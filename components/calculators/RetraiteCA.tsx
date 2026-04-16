"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeRetraiteQC,
  type QCFoyerRetraite,
  type RetraiteQCResult,
} from "@/lib/calculators/calculateur-retraite-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function RetraiteCACalculator() {
  const [ageActuel, setAgeActuel] = useState<string>("45");
  const [ageDepart, setAgeDepart] = useState<string>("65");
  const [revenuMoyen, setRevenuMoyen] = useState<string>("75000");
  const [anneesCot, setAnneesCot] = useState<string>("20");
  const [foyer, setFoyer] = useState<QCFoyerRetraite>("individuel");
  const [reerActuel, setReerActuel] = useState<string>("40000");
  const [reerVersement, setReerVersement] = useState<string>("7000");
  const [reerRendement, setReerRendement] = useState<string>("5");
  const [celiActuel, setCeliActuel] = useState<string>("20000");
  const [celiVersement, setCeliVersement] = useState<string>("7000");
  const [celiRendement, setCeliRendement] = useState<string>("5");
  const [tmi, setTmi] = useState<string>("37");

  const result = useMemo<RetraiteQCResult | null>(() => {
    return computeRetraiteQC({
      ageActuel: parseNum(ageActuel) || 45,
      ageDepart: parseNum(ageDepart) || 65,
      revenuAnnuelMoyen: parseNum(revenuMoyen) || 0,
      anneesCotiseesRRQ: parseNum(anneesCot) || 0,
      foyer,
      capitalREERActuel: parseNum(reerActuel) || 0,
      versementAnnuelREER: parseNum(reerVersement) || 0,
      rendementREER: parseNum(reerRendement) || 0,
      capitalCELIActuel: parseNum(celiActuel) || 0,
      versementAnnuelCELI: parseNum(celiVersement) || 0,
      rendementCELI: parseNum(celiRendement) || 0,
      tmiPct: parseNum(tmi) || 0,
    });
  }, [
    ageActuel,
    ageDepart,
    revenuMoyen,
    anneesCot,
    foyer,
    reerActuel,
    reerVersement,
    reerRendement,
    celiActuel,
    celiVersement,
    celiRendement,
    tmi,
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Vos paramètres
          </h2>
          <p className="text-sm text-slate-500">
            RRQ + PSV + SRG + REER + CELI — règles fédérales et québécoises 2026
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="age-actuel">Âge actuel</Label>
              <Input
                id="age-actuel"
                inputMode="numeric"
                value={ageActuel}
                onChange={(e) => setAgeActuel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="age-depart">Âge de départ à la retraite</Label>
              <Input
                id="age-depart"
                inputMode="numeric"
                value={ageDepart}
                onChange={(e) => setAgeDepart(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="revenu-moyen">Revenu annuel moyen</Label>
              <div className="relative">
                <Input
                  id="revenu-moyen"
                  inputMode="decimal"
                  value={revenuMoyen}
                  onChange={(e) => setRevenuMoyen(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="ann-cot">Années cotisées RRQ</Label>
              <Input
                id="ann-cot"
                inputMode="numeric"
                value={anneesCot}
                onChange={(e) => setAnneesCot(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Situation</Label>
            <RadioGroup
              name="foyer"
              value={foyer}
              onChange={setFoyer}
              options={[
                { value: "individuel", label: "Individuel" },
                { value: "couple", label: "Couple" },
              ]}
            />
          </div>

          <div>
            <div className="text-sm font-medium text-slate-900 mb-2">REER</div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="reer-actuel">Capital actuel</Label>
                <div className="relative">
                  <Input
                    id="reer-actuel"
                    inputMode="decimal"
                    value={reerActuel}
                    onChange={(e) => setReerActuel(e.target.value)}
                    className="pr-10"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="reer-versement">Versement annuel</Label>
                <div className="relative">
                  <Input
                    id="reer-versement"
                    inputMode="decimal"
                    value={reerVersement}
                    onChange={(e) => setReerVersement(e.target.value)}
                    className="pr-10"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="reer-rend">Rendement annuel</Label>
                <div className="relative">
                  <Input
                    id="reer-rend"
                    inputMode="decimal"
                    value={reerRendement}
                    onChange={(e) => setReerRendement(e.target.value)}
                    className="pr-8"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-900 mb-2">CELI</div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="celi-actuel">Capital actuel</Label>
                <div className="relative">
                  <Input
                    id="celi-actuel"
                    inputMode="decimal"
                    value={celiActuel}
                    onChange={(e) => setCeliActuel(e.target.value)}
                    className="pr-10"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="celi-versement">Versement annuel</Label>
                <div className="relative">
                  <Input
                    id="celi-versement"
                    inputMode="decimal"
                    value={celiVersement}
                    onChange={(e) => setCeliVersement(e.target.value)}
                    className="pr-10"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="celi-rend">Rendement annuel</Label>
                <div className="relative">
                  <Input
                    id="celi-rend"
                    inputMode="decimal"
                    value={celiRendement}
                    onChange={(e) => setCeliRendement(e.target.value)}
                    className="pr-8"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="tmi">Taux marginal d&apos;imposition (TMI)</Label>
            <div className="relative">
              <Input
                id="tmi"
                inputMode="decimal"
                value={tmi}
                onChange={(e) => setTmi(e.target.value)}
                className="pr-8"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                %
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Pour calculer l&apos;économie d&apos;impôt sur versements REER
            </p>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: RetraiteQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Revenu mensuel à la retraite"
          value={formatCAD(result.revenuMensuelTotalRetraite)}
          accent
        />
        <Tile
          label="Rente RRQ mensuelle"
          value={formatCAD(result.renteRRQMensuelle)}
        />
        <Tile
          label="Taux de remplacement"
          value={formatPercent(result.tauxRemplacement, 0)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Piliers de revenu à {result.ageDepart} ans
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="RRQ mensuelle"
            value={formatCADPrecise(result.renteRRQMensuelle)}
          />
          <Row
            label="Pension sécurité vieillesse (PSV)"
            value={formatCADPrecise(result.psvMensuelle)}
          />
          {result.psvClawback > 0 && (
            <Row
              label="Récupération PSV (clawback)"
              value={`− ${formatCADPrecise(result.psvClawback / 12)}/mois`}
            />
          )}
          {result.srgMensuelle > 0 && (
            <Row
              label="Supplément revenu garanti (SRG)"
              value={formatCADPrecise(result.srgMensuelle)}
            />
          )}
          <Row
            label="Retrait REER mensuel (4 % rule)"
            value={formatCADPrecise(result.retraitREERMensuel)}
          />
          <Row
            label="Retrait CELI mensuel (4 % rule)"
            value={formatCADPrecise(result.retraitCELIMensuel)}
          />
          <Row
            label="Total mensuel"
            value={formatCADPrecise(result.revenuMensuelTotalRetraite)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Projection REER / CELI
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label={`REER — plafond annuel (18 % revenu, max 32 490 $)`}
            value={formatCADPrecise(result.plafondREER)}
          />
          <Row
            label="Capital REER à la retraite"
            value={formatCADPrecise(result.capitalREERFutur)}
            bold
          />
          <Row
            label="Économie d'impôt REER annuelle"
            value={formatCADPrecise(result.economieImpotREER)}
          />
          <Row
            label="CELI — plafond annuel 2026"
            value={formatCADPrecise(result.plafondCELI)}
          />
          <Row
            label="Capital CELI à la retraite"
            value={formatCADPrecise(result.capitalCELIFutur)}
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
