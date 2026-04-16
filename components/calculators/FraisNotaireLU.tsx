"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computeFraisNotaireLU,
  type FraisNotaireLUResult,
} from "@/lib/calculators/calcul-frais-notaire-luxembourg-lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function FraisNotaireLUCalculator() {
  const [prix, setPrix] = useState<string>("800000");
  const [nbAcheteurs, setNbAcheteurs] = useState<number>(2);
  const [residencePrincipale, setResidencePrincipale] = useState<boolean>(true);
  const [surchargeVille, setSurchargeVille] = useState<boolean>(true);

  const result = useMemo<FraisNotaireLUResult | null>(() => {
    const p = parseNum(prix);
    if (!Number.isFinite(p) || p <= 0) return null;
    return computeFraisNotaireLU({
      prixBien: p,
      nbAcheteurs,
      residencePrincipale,
      surchargeVilleLuxembourg: surchargeVille,
    });
  }, [prix, nbAcheteurs, residencePrincipale, surchargeVille]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre achat immobilier
          </h2>
          <p className="text-sm text-slate-500">
            Luxembourg — droits, émoluments et Bëllegen Akt
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="prix">Prix du bien</Label>
            <div className="relative">
              <Input
                id="prix"
                inputMode="decimal"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                placeholder="800000"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                €
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="nb-acheteurs">Nombre d&apos;acheteurs</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setNbAcheteurs(Math.max(1, nbAcheteurs - 1))}
              >
                −
              </Button>
              <div className="min-w-[3rem] text-center text-lg font-semibold text-slate-900">
                {nbAcheteurs}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setNbAcheteurs(Math.min(6, nbAcheteurs + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-slate-50 p-4">
            <div>
              <div className="font-medium text-slate-900">
                Résidence principale
              </div>
              <div className="text-sm text-slate-500">
                Crédit Bëllegen Akt 40 k€/acheteur
              </div>
            </div>
            <Button
              type="button"
              variant={residencePrincipale ? "primary" : "ghost"}
              onClick={() => setResidencePrincipale(!residencePrincipale)}
            >
              {residencePrincipale ? "Oui" : "Non"}
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-slate-50 p-4">
            <div>
              <div className="font-medium text-slate-900">
                Ville de Luxembourg
              </div>
              <div className="text-sm text-slate-500">
                Surcharge +3 % au-delà de 300 k€
              </div>
            </div>
            <Button
              type="button"
              variant={surchargeVille ? "primary" : "ghost"}
              onClick={() => setSurchargeVille(!surchargeVille)}
            >
              {surchargeVille ? "Oui" : "Non"}
            </Button>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: FraisNotaireLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Frais d'acquisition totaux"
          value={formatEuro(result.totalFraisAcquisition)}
          accent
        />
        <Tile
          label="Droits nets (après Bëllegen)"
          value={formatEuro(result.totalDroitsNet)}
        />
        <Tile
          label="% du prix"
          value={formatPercent(result.pourcentagePrix, 2)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail des frais
          </h3>
          <p className="text-sm text-slate-500">
            Prix du bien : {formatEuro(result.prixBien)}
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Droits d'enregistrement (6 %)"
            value={formatEuroPrecise(result.droitEnregistrement)}
          />
          <Row
            label="Droits de transcription (1 %)"
            value={formatEuroPrecise(result.droitTranscription)}
          />
          {result.surchargeVille > 0 && (
            <Row
              label="Surcharge Ville de Luxembourg (+3 %)"
              value={formatEuroPrecise(result.surchargeVille)}
            />
          )}
          <Row
            label="Total droits bruts"
            value={formatEuroPrecise(result.totalDroitsBrut)}
            bold
          />
          {result.bellegenAktCredit > 0 && (
            <Row
              label="Crédit Bëllegen Akt"
              value={`− ${formatEuroPrecise(result.bellegenAktCredit)}`}
            />
          )}
          <Row
            label="Droits nets à payer"
            value={formatEuroPrecise(result.totalDroitsNet)}
            bold
          />
          <Row
            label="Émoluments notaire (~0,8 %)"
            value={formatEuroPrecise(result.emolumentsNotaire)}
          />
          <Row
            label="TVA 17 % sur émoluments"
            value={formatEuroPrecise(result.tvaEmoluments)}
          />
          <Row
            label="Débours (forfait)"
            value={formatEuroPrecise(result.debours)}
          />
          <Row
            label="Total frais notaire"
            value={formatEuroPrecise(result.totalNotaire)}
            bold
          />
          <Row
            label="Frais d'acquisition totaux"
            value={formatEuroPrecise(result.totalFraisAcquisition)}
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
