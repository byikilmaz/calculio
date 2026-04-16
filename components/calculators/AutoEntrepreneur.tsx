"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeAutoEntrepreneurFR,
  type ActiviteType,
  type AutoEntrepreneurResult,
} from "@/lib/calculators/simulateur-auto-entrepreneur-fr";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function AutoEntrepreneurCalculator() {
  const [ca, setCa] = useState<string>("40000");
  const [type, setType] = useState<ActiviteType>("servicesBIC");
  const [vfl, setVfl] = useState<boolean>(false);
  const [autresRevenus, setAutresRevenus] = useState<string>("0");

  const result = useMemo<AutoEntrepreneurResult | null>(() => {
    const c = parseNum(ca);
    const a = parseNum(autresRevenus);
    if (!Number.isFinite(c) || c < 0) return null;
    return computeAutoEntrepreneurFR({
      chiffreAffaires: c,
      type,
      versementLiberatoire: vfl,
      autresRevenus: Number.isFinite(a) && a >= 0 ? a : 0,
    });
  }, [ca, type, vfl, autresRevenus]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre activité micro-entreprise
          </h2>
          <p className="text-sm text-slate-500">
            Indiquez votre chiffre d'affaires et votre type d'activité
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="ca">Chiffre d'affaires annuel</Label>
            <div className="relative">
              <Input
                id="ca"
                inputMode="decimal"
                value={ca}
                onChange={(e) => setCa(e.target.value)}
                placeholder="40000"
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label>Type d'activité</Label>
            <RadioGroup
              name="type"
              value={type}
              onChange={setType}
              options={[
                {
                  value: "ventesBIC",
                  label: "Vente de marchandises (BIC)",
                  description: "Cotisations 12,3 % · plafond 188 700 €",
                },
                {
                  value: "servicesBIC",
                  label: "Prestations services (BIC)",
                  description: "Cotisations 21,2 % · plafond 77 700 €",
                },
                {
                  value: "servicesBNC",
                  label: "Prestations services (BNC)",
                  description: "Cotisations 21,1 % · plafond 77 700 €",
                },
                {
                  value: "liberaleCIPAV",
                  label: "Profession libérale CIPAV",
                  description: "Cotisations 21,2 % · plafond 77 700 €",
                },
              ]}
            />
          </div>

          <label className="flex items-start gap-3 rounded-md border border-[var(--border)] p-3 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={vfl}
              onChange={(e) => setVfl(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Versement libératoire de l'IR
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Paiement de l'impôt sur le revenu à taux fixe au fil de l'eau
                (option éligible selon RFR N−2)
              </span>
            </span>
          </label>

          {!vfl && (
            <div>
              <Label htmlFor="autres">
                Autres revenus du foyer (pour estimer l'IR)
              </Label>
              <div className="relative">
                <Input
                  id="autres"
                  inputMode="decimal"
                  value={autresRevenus}
                  onChange={(e) => setAutresRevenus(e.target.value)}
                  placeholder="0"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: AutoEntrepreneurResult }) {
  return (
    <div className="space-y-4">
      {result.seuilDepasse && (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <strong>Seuil de franchise dépassé :</strong> votre CA ({formatEuro(
            result.chiffreAffaires,
          )}
          ) dépasse le plafond de {formatEuro(result.plafond)} du régime
          micro-entreprise.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Revenu net après cotisations et IR"
          value={formatEuro(result.netFinal)}
          accent
        />
        <Tile
          label="Net mensuel moyen"
          value={formatEuro(result.netMensuel)}
        />
        <Tile
          label="Taux effectif global"
          value={formatPercent(result.tauxEffectifGlobal, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail des prélèvements
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Chiffre d'affaires"
            value={formatEuroPrecise(result.chiffreAffaires)}
          />
          <Row
            label={`Cotisations sociales (${formatPercent(
              result.tauxCotisations,
              2,
            )})`}
            value={formatEuroPrecise(result.cotisationsSociales)}
          />
          {result.versementLiberatoire && (
            <Row
              label="Versement libératoire IR"
              value={formatEuroPrecise(result.vflMontant)}
            />
          )}
          {!result.versementLiberatoire && (
            <>
              <Row
                label={`Abattement forfaitaire (${formatPercent(
                  result.abattementForfaitaire,
                  0,
                )})`}
                value="appliqué"
              />
              <Row
                label="Revenu imposable"
                value={formatEuroPrecise(result.revenuImposable)}
              />
              <Row
                label="Impôt sur le revenu estimé"
                value={formatEuroPrecise(result.impotSurLeRevenu)}
              />
            </>
          )}
          <Row
            label="Net final annuel"
            value={formatEuro(result.netFinal)}
            bold
          />
        </CardBody>
      </Card>

      <div className="rounded-md border border-[var(--border)] bg-slate-50 p-4 text-sm text-slate-700">
        <strong>À ajouter :</strong> la CFE (Cotisation Foncière des Entreprises),
        forfaitaire environ 300 € par an, est à prévoir à partir de la deuxième
        année d'activité. Elle n'est pas incluse dans ce calcul.
      </div>
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
