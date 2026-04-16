"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeIndependantBE,
  type BEStatutIndependant,
  type IndependantBEResult,
} from "@/lib/calculators/simulateur-independant-belgique-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function IndependantBECalculator() {
  const [revenu, setRevenu] = useState<string>("45000");
  const [statut, setStatut] = useState<BEStatutIndependant>("principal");
  const [enfants, setEnfants] = useState<number>(0);
  const [additionnels, setAdditionnels] = useState<string>("7.5");
  const [forfait, setForfait] = useState<boolean>(true);

  const result = useMemo<IndependantBEResult | null>(() => {
    const r = parseNum(revenu);
    if (!Number.isFinite(r) || r < 0) return null;
    const add = parseNum(additionnels);
    const additionnelsRate =
      Number.isFinite(add) && add >= 0 ? add / 100 : 0.075;
    return computeIndependantBE({
      revenuNetProfessionnel: r,
      statut,
      enfantsACharge: enfants,
      additionnelsCommunaux: additionnelsRate,
      fraisProfessionnelsForfaitaires: forfait,
    });
  }, [revenu, statut, enfants, additionnels, forfait]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre activité d'indépendant
          </h2>
          <p className="text-sm text-slate-500">
            Revenu professionnel net et statut pour estimer cotisations INASTI
            et IPP
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="revenu">Revenu net professionnel annuel</Label>
            <div className="relative">
              <Input
                id="revenu"
                inputMode="decimal"
                value={revenu}
                onChange={(e) => setRevenu(e.target.value)}
                placeholder="45000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Chiffre d'affaires moins frais professionnels réels, avant
              cotisations sociales.
            </p>
          </div>

          <div>
            <Label>Statut</Label>
            <RadioGroup
              name="statut"
              value={statut}
              onChange={setStatut}
              options={[
                {
                  value: "principal",
                  label: "Titre principal",
                  description: "Activité principale, 4 trimestres soumis",
                },
                {
                  value: "debutant",
                  label: "Primo-indépendant",
                  description: "Réduction début d'activité possible",
                },
                {
                  value: "complementaire",
                  label: "Complémentaire",
                  description: "Activité secondaire (pas de plancher)",
                },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enfants">Enfants à charge</Label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEnfants(Math.max(0, enfants - 1))}
                  className="h-10 w-10 rounded-md border border-[var(--border)] text-lg hover:bg-slate-50"
                >
                  −
                </button>
                <div className="min-w-[3rem] text-center text-lg font-semibold text-slate-900">
                  {enfants}
                </div>
                <button
                  type="button"
                  onClick={() => setEnfants(Math.min(10, enfants + 1))}
                  className="h-10 w-10 rounded-md border border-[var(--border)] text-lg hover:bg-slate-50"
                >
                  +
                </button>
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

          <label className="flex items-start gap-3 rounded-md border border-[var(--border)] p-3">
            <input
              type="checkbox"
              checked={forfait}
              onChange={(e) => setForfait(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Frais professionnels forfaitaires (3 %)
              </span>
              <span className="block text-sm text-slate-500">
                Appliquer le forfait fiscal plafonné à 5 520 € × 3 %
              </span>
            </span>
          </label>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: IndependantBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Revenu net mensuel"
          value={formatEuro(result.revenuMensuelNet)}
          accent
        />
        <Tile
          label="Cotisation INASTI / trim."
          value={formatEuro(result.cotisationTotale / 4)}
        />
        <Tile
          label="Taux de prélèvement"
          value={formatPercent(result.tauxPrelevementGlobal, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
          <p className="text-sm text-slate-500">
            Cotisations INASTI 2026 + IPP fédéral + additionnels communaux
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Revenu net professionnel"
            value={formatEuroPrecise(result.revenuNetProfessionnel)}
          />
          <Row
            label="Cotisation INASTI (20,5 % / 14,16 %)"
            value={`− ${formatEuroPrecise(result.cotisationInasti)}`}
          />
          <Row
            label="Frais de gestion caisse (~3,05 %)"
            value={`− ${formatEuroPrecise(result.fraisGestionCaisse)}`}
          />
          <Row
            label="Cotisation sociale totale"
            value={formatEuroPrecise(result.cotisationTotale)}
            bold
          />
          <Row
            label="Base imposable"
            value={formatEuroPrecise(result.baseImposable)}
            bold
          />
          <Row
            label="Impôt selon barème IPP"
            value={formatEuroPrecise(result.impotBareme)}
          />
          <Row
            label={`Réduction quotité exemptée (${formatEuro(
              result.quotiteExemptee,
            )})`}
            value={`− ${formatEuroPrecise(result.reductionQuotite)}`}
          />
          <Row
            label="Impôt fédéral"
            value={formatEuroPrecise(result.impotFederal)}
          />
          <Row
            label="Additionnels communaux"
            value={`+ ${formatEuroPrecise(result.additionnelsMontant)}`}
          />
          <Row
            label="Impôt total (IPP + communal)"
            value={formatEuroPrecise(result.impotTotal)}
            bold
          />
          <Row
            label="Revenu net après impôt (annuel)"
            value={formatEuro(result.revenuNetApresImpot)}
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
