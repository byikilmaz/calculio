"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeRetraiteCH,
  type CHFoyerRetraite,
  type CHStatutRetraite,
  type RetraiteCHResult,
} from "@/lib/calculators/calculateur-retraite-suisse-ch";
import { formatCHF, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function RetraiteCHCalculator() {
  const [ageActuel, setAgeActuel] = useState<string>("40");
  const [ageDepart, setAgeDepart] = useState<string>("65");
  const [revenu, setRevenu] = useState<string>("100000");
  const [anneesCot, setAnneesCot] = useState<string>("20");
  const [foyer, setFoyer] = useState<CHFoyerRetraite>("individuel");
  const [statut, setStatut] = useState<CHStatutRetraite>("salarie");
  const [capLPP, setCapLPP] = useState<string>("180000");
  const [vLPP, setVLPP] = useState<string>("9000");
  const [rLPP, setRLPP] = useState<string>("2");
  const [v3a, setV3a] = useState<string>("7258");
  const [r3a, setR3a] = useState<string>("3");
  const [tmi, setTmi] = useState<string>("25");

  const result = useMemo<RetraiteCHResult | null>(() => {
    const r = parseNum(revenu);
    if (!Number.isFinite(r) || r < 0) return null;
    return computeRetraiteCH({
      ageActuel: parseNum(ageActuel) || 40,
      ageDepart: parseNum(ageDepart) || 65,
      revenuMoyenAnnuel: r,
      anneesCotiseesAVS: parseNum(anneesCot) || 0,
      foyer,
      statut,
      capitalLPPActuel: parseNum(capLPP) || 0,
      versementAnnuelLPP: parseNum(vLPP) || 0,
      rendementLPP: parseNum(rLPP) || 0,
      versementAnnuel3a: parseNum(v3a) || 0,
      rendement3a: parseNum(r3a) || 0,
      tmiPct: parseNum(tmi) || 0,
    });
  }, [
    ageActuel,
    ageDepart,
    revenu,
    anneesCot,
    foyer,
    statut,
    capLPP,
    vLPP,
    rLPP,
    v3a,
    r3a,
    tmi,
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre situation
          </h2>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="age">Âge actuel</Label>
              <Input
                id="age"
                inputMode="numeric"
                value={ageActuel}
                onChange={(e) => setAgeActuel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dep">Âge de départ</Label>
              <Input
                id="dep"
                inputMode="numeric"
                value={ageDepart}
                onChange={(e) => setAgeDepart(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="annees">Années cotisées AVS</Label>
              <Input
                id="annees"
                inputMode="numeric"
                value={anneesCot}
                onChange={(e) => setAnneesCot(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="rev">Revenu annuel moyen (AVS déterminant)</Label>
            <div className="relative">
              <Input
                id="rev"
                inputMode="decimal"
                value={revenu}
                onChange={(e) => setRevenu(e.target.value)}
                className="pr-14"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                CHF
              </span>
            </div>
          </div>

          <div>
            <Label>Foyer</Label>
            <RadioGroup
              name="foyer"
              value={foyer}
              onChange={setFoyer}
              options={[
                { value: "individuel", label: "Individuel" },
                { value: "couple", label: "Couple (rente plafonnée à 150 %)" },
              ]}
            />
          </div>

          <div>
            <Label>Statut</Label>
            <RadioGroup
              name="statut"
              value={statut}
              onChange={setStatut}
              options={[
                { value: "salarie", label: "Salarié (affilié LPP)" },
                { value: "independant", label: "Indépendant (3a renforcé)" },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            2e pilier (LPP) et 3e pilier A
          </h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="caplpp">Capital LPP actuel</Label>
              <Input
                id="caplpp"
                inputMode="decimal"
                value={capLPP}
                onChange={(e) => setCapLPP(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="vlpp">Versement LPP / an</Label>
              <Input
                id="vlpp"
                inputMode="decimal"
                value={vLPP}
                onChange={(e) => setVLPP(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rlpp">Rendement LPP %</Label>
              <Input
                id="rlpp"
                inputMode="decimal"
                value={rLPP}
                onChange={(e) => setRLPP(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="v3a">Versement 3a / an</Label>
              <Input
                id="v3a"
                inputMode="decimal"
                value={v3a}
                onChange={(e) => setV3a(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="r3a">Rendement 3a %</Label>
              <Input
                id="r3a"
                inputMode="decimal"
                value={r3a}
                onChange={(e) => setR3a(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tmi">TMI indicatif %</Label>
              <Input
                id="tmi"
                inputMode="decimal"
                value={tmi}
                onChange={(e) => setTmi(e.target.value)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Rente totale / mois"
              value={formatCHF(result.renteTotaleMensuelle)}
              accent
            />
            <Tile
              label="Taux de remplacement"
              value={formatPercent(result.tauxRemplacement, 1)}
            />
            <Tile
              label="Éco. impôt 3a / an"
              value={formatCHF(result.economieImpot3aAnnuelle)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail des 3 piliers
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="AVS rente mensuelle (1er pilier)"
                value={formatCHF(result.renteAVSMensuelle)}
              />
              <Row
                label={`Capital LPP à ${result.ageDepart} ans`}
                value={formatCHF(result.capitalLPPFutur)}
              />
              <Row
                label="Rente LPP mensuelle (2e pilier, 4 %/an)"
                value={formatCHF(result.renteLPPMensuelle)}
              />
              <Row
                label="Plafond 3a applicable"
                value={formatCHF(result.plafond3a)}
              />
              <Row
                label="Capital 3a à la retraite"
                value={formatCHF(result.capital3aFutur)}
              />
              <Row
                label="Rente 3a mensuelle"
                value={formatCHF(result.renteMensuelle3a)}
              />
              <Row
                label="Années cotisées projetées"
                value={`${result.anneesCotiseesProjetees.toFixed(0)} / 44`}
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
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
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
