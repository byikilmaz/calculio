"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeEpargneCH,
  type CHStatut3a,
  type CHSupportEpargne,
  type EpargneCHResult,
} from "@/lib/calculators/simulateur-epargne-suisse-ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function EpargneCHCalculator() {
  const [capital, setCapital] = useState<string>("10000");
  const [versement, setVersement] = useState<string>("600");
  const [taux, setTaux] = useState<string>("2");
  const [duree, setDuree] = useState<string>("20");
  const [support, setSupport] = useState<CHSupportEpargne>("pilier3a");
  const [statut3a, setStatut3a] = useState<CHStatut3a>("salarie");
  const [revenu, setRevenu] = useState<string>("95000");
  const [tmi, setTmi] = useState<string>("25");

  const result = useMemo<EpargneCHResult | null>(() => {
    return computeEpargneCH({
      capitalInitial: parseNum(capital) || 0,
      versementMensuel: parseNum(versement) || 0,
      tauxAnnuel: parseNum(taux) || 0,
      dureeAnnees: parseNum(duree) || 0,
      support,
      statut3a,
      revenuAnnuel: parseNum(revenu) || 0,
      tmiPct: parseNum(tmi) || 0,
    });
  }, [capital, versement, taux, duree, support, statut3a, revenu, tmi]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre épargne
          </h2>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cap">Capital initial</Label>
              <div className="relative">
                <Input
                  id="cap"
                  inputMode="decimal"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="vers">Versement mensuel</Label>
              <div className="relative">
                <Input
                  id="vers"
                  inputMode="decimal"
                  value={versement}
                  onChange={(e) => setVersement(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="taux">Taux annuel</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="dur">Durée (années)</Label>
              <Input
                id="dur"
                inputMode="decimal"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tmi">TMI %</Label>
              <Input
                id="tmi"
                inputMode="decimal"
                value={tmi}
                onChange={(e) => setTmi(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Support</Label>
            <RadioGroup
              name="support"
              value={support}
              onChange={setSupport}
              options={[
                {
                  value: "livret",
                  label: "Compte épargne",
                  description: "Intérêts imposés au revenu ordinaire",
                },
                {
                  value: "pilier3a",
                  label: "3e pilier A",
                  description: "Déductible fiscalement, max 7 258 CHF/an",
                },
              ]}
            />
          </div>

          {support === "pilier3a" && (
            <>
              <div>
                <Label>Statut 3a</Label>
                <RadioGroup
                  name="statut3a"
                  value={statut3a}
                  onChange={setStatut3a}
                  options={[
                    {
                      value: "salarie",
                      label: "Salarié",
                      description: "Plafond 7 258 CHF/an (affilié LPP)",
                    },
                    {
                      value: "independant",
                      label: "Indépendant sans LPP",
                      description: "20 % revenu, max 36 288 CHF/an",
                    },
                  ]}
                />
              </div>
              {statut3a === "independant" && (
                <div>
                  <Label htmlFor="rev">Revenu annuel</Label>
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
              )}
            </>
          )}
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Capital final net"
              value={formatCHF(result.capitalFinalNet)}
              accent
            />
            <Tile
              label="Total versé"
              value={formatCHF(result.totalVerse)}
            />
            <Tile
              label="Rendement net annualisé"
              value={formatPercent(result.rendementNetAnnualise, 2)}
            />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Détail
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              {result.plafond3a > 0 && (
                <Row
                  label="Plafond 3a applicable"
                  value={formatCHF(result.plafond3a)}
                />
              )}
              <Row
                label="Versements annuels effectifs"
                value={formatCHFPrecise(result.versementEffectifAnnuel)}
              />
              <Row
                label="Intérêts bruts cumulés"
                value={formatCHFPrecise(result.interetsBruts)}
              />
              {result.impotsIntereets > 0 && (
                <Row
                  label="Impôts sur intérêts (cumul)"
                  value={`− ${formatCHFPrecise(result.impotsIntereets)}`}
                />
              )}
              {result.economieImpotTotale > 0 && (
                <Row
                  label="Économie d'impôt 3a cumulée"
                  value={`+ ${formatCHFPrecise(result.economieImpotTotale)}`}
                  bold
                />
              )}
              <Row
                label="Capital final net"
                value={formatCHFPrecise(result.capitalFinalNet)}
                bold
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
