"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeSalaireBrutNetBE,
  type BEStatut,
  type BESituationFamiliale,
  type SalaireBrutNetBEResult,
} from "@/lib/calculators/calcul-salaire-brut-net-belgique-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

type Period = "mois" | "annee";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function SalaireBrutNetBECalculator() {
  const [amount, setAmount] = useState<string>("3500");
  const [period, setPeriod] = useState<Period>("mois");
  const [statut, setStatut] = useState<BEStatut>("employe");
  const [situation, setSituation] =
    useState<BESituationFamiliale>("isole");
  const [enfants, setEnfants] = useState<number>(0);
  const [additionnels, setAdditionnels] = useState<string>("7.5");

  const result = useMemo<SalaireBrutNetBEResult | null>(() => {
    const parsed = parseNum(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const brutAnnuel = period === "mois" ? parsed * 12 : parsed;
    const add = parseNum(additionnels);
    const additionnelsRate =
      Number.isFinite(add) && add >= 0 ? add / 100 : 0.075;
    return computeSalaireBrutNetBE({
      brutAnnuel,
      statut,
      situation,
      enfantsACharge: enfants,
      additionnelsCommunaux: additionnelsRate,
    });
  }, [amount, period, statut, situation, enfants, additionnels]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre salaire
          </h2>
          <p className="text-sm text-slate-500">
            Indiquez votre salaire brut, statut et situation familiale
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
                  placeholder="3500"
                  className="pr-12"
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
            <Label>Statut</Label>
            <RadioGroup
              name="statut"
              value={statut}
              onChange={setStatut}
              options={[
                {
                  value: "employe",
                  label: "Employé",
                  description: "Travailleur salarié (contrat d'employé)",
                },
                {
                  value: "ouvrier",
                  label: "Ouvrier",
                  description: "Travailleur manuel — même taux ONSS",
                },
              ]}
            />
          </div>

          <div>
            <Label>Situation familiale</Label>
            <RadioGroup
              name="situation"
              value={situation}
              onChange={setSituation}
              options={[
                {
                  value: "isole",
                  label: "Isolé",
                  description: "Célibataire, divorcé(e), veuf(ve)",
                },
                {
                  value: "marieCohabitant",
                  label: "Marié / cohabitant légal",
                  description: "Conjoint ou cohabitation légale",
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
            <div>
              <Label htmlFor="additionnels">Additionnels communaux</Label>
              <div className="relative">
                <Input
                  id="additionnels"
                  inputMode="decimal"
                  value={additionnels}
                  onChange={(e) => setAdditionnels(e.target.value)}
                  placeholder="7.5"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: SalaireBrutNetBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Net mensuel"
          value={formatEuro(result.netMensuel)}
          accent
        />
        <Tile
          label="Net annuel"
          value={formatEuro(result.netAnnuel)}
        />
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
            Sur la base d'un brut annuel de {formatEuro(result.brutAnnuel)}
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire brut annuel"
            value={formatEuroPrecise(result.brutAnnuel)}
          />
          <Row
            label="ONSS salarié (13,07 %)"
            value={`− ${formatEuroPrecise(
              result.onssSalarie + result.bonusEmploi,
            )}`}
          />
          {result.bonusEmploi > 0 && (
            <Row
              label="Bonus à l'emploi (workbonus)"
              value={`+ ${formatEuroPrecise(result.bonusEmploi)}`}
            />
          )}
          <Row
            label="Base imposable"
            value={formatEuroPrecise(result.baseImposable)}
            bold
          />
          <Row
            label="Impôt selon barème"
            value={formatEuroPrecise(result.impotBarème)}
          />
          <Row
            label={`Réduction quotité exemptée (${formatEuro(
              result.quotiteExemptee,
            )})`}
            value={`− ${formatEuroPrecise(result.reductionQuotite)}`}
          />
          <Row
            label="Précompte fédéral annuel"
            value={formatEuroPrecise(result.precompteFederalAnnuel)}
          />
          <Row
            label="Additionnels communaux"
            value={formatEuroPrecise(result.additionnelsCommunauxMontant)}
          />
          <Row
            label="Précompte total annuel"
            value={formatEuroPrecise(result.precompteTotalAnnuel)}
            bold
          />
          <Row
            label="Précompte mensuel (retenu à la source)"
            value={formatEuroPrecise(result.precompteMensuel)}
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
