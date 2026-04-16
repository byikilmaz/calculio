"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePretImmobilierLU,
  type PretImmobilierLUResult,
} from "@/lib/calculators/simulateur-pret-immobilier-luxembourg-lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PretImmobilierLUCalculator() {
  const [prix, setPrix] = useState<string>("800000");
  const [apport, setApport] = useState<string>("150000");
  const [taux, setTaux] = useState<string>("3.5");
  const [duree, setDuree] = useState<string>("25");
  const [tauxMarginal, setTauxMarginal] = useState<string>("0.39");
  const [nbMembres, setNbMembres] = useState<number>(2);
  const [residencePrincipale, setResidencePrincipale] = useState<boolean>(true);
  const [anneesDeja, setAnneesDeja] = useState<string>("1");

  const result = useMemo<PretImmobilierLUResult | null>(() => {
    const p = parseNum(prix);
    if (!Number.isFinite(p) || p <= 0) return null;
    return computePretImmobilierLU({
      prixBien: p,
      apport: parseNum(apport) || 0,
      tauxAnnuel: parseNum(taux) || 0,
      dureeAnnees: parseNum(duree) || 25,
      tauxMarginalIR: parseNum(tauxMarginal) || 0.39,
      nbMembresFoyer: nbMembres,
      residencePrincipale,
      anneesDeja: parseNum(anneesDeja) || 1,
    });
  }, [
    prix,
    apport,
    taux,
    duree,
    tauxMarginal,
    nbMembres,
    residencePrincipale,
    anneesDeja,
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet immobilier au Luxembourg
          </h2>
          <p className="text-sm text-slate-500">
            Prix, apport, taux, durée et avantages fiscaux
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
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
              <Label htmlFor="apport">Apport personnel</Label>
              <div className="relative">
                <Input
                  id="apport"
                  inputMode="decimal"
                  value={apport}
                  onChange={(e) => setApport(e.target.value)}
                  placeholder="150000"
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
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
                  placeholder="3.5"
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="duree">Durée (ans)</Label>
              <Input
                id="duree"
                inputMode="numeric"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                placeholder="25"
              />
            </div>
            <div>
              <Label htmlFor="annees-deja">Ancienneté</Label>
              <Input
                id="annees-deja"
                inputMode="numeric"
                value={anneesDeja}
                onChange={(e) => setAnneesDeja(e.target.value)}
                placeholder="1"
              />
              <div className="mt-1 text-xs text-slate-500">
                ans depuis l&apos;achat
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="tmi">Taux marginal IR</Label>
              <Input
                id="tmi"
                inputMode="decimal"
                value={tauxMarginal}
                onChange={(e) => setTauxMarginal(e.target.value)}
                placeholder="0.39"
              />
              <div className="mt-1 text-xs text-slate-500">
                Ex. 0.39 pour 39 %
              </div>
            </div>
            <div>
              <Label htmlFor="membres">Membres foyer</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setNbMembres(Math.max(1, nbMembres - 1))}
                >
                  −
                </Button>
                <div className="min-w-[3rem] text-center text-lg font-semibold text-slate-900">
                  {nbMembres}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setNbMembres(Math.min(6, nbMembres + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-slate-50 p-4">
            <div>
              <div className="font-medium text-slate-900">
                Résidence principale
              </div>
              <div className="text-sm text-slate-500">
                Active déduction intérêts et crédit Bëllegen Akt (40 k€/pers.)
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
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: PretImmobilierLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Mensualité"
          value={formatEuro(result.mensualite)}
          accent
        />
        <Tile
          label="Coût total crédit"
          value={formatEuro(result.coutTotalCredit)}
        />
        <Tile
          label="LTV"
          value={formatPercent(result.ratioLTV, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail financier
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Prix du bien"
            value={formatEuroPrecise(result.prixBien)}
          />
          <Row
            label="Montant emprunté"
            value={formatEuroPrecise(result.montantEmprunte)}
          />
          <Row
            label="Intérêts totaux (durée du prêt)"
            value={formatEuroPrecise(result.interetsTotaux)}
          />
          <Row
            label="Intérêts année 1 estimés"
            value={formatEuroPrecise(result.interetsAnnee1)}
          />
          <Row
            label="Plafond intérêts déductibles (année)"
            value={formatEuroPrecise(result.plafondInteretsAnnuel)}
          />
          <Row
            label="Intérêts déductibles année 1"
            value={formatEuroPrecise(result.interetsDeductibles)}
          />
          <Row
            label="Économie fiscale année 1"
            value={formatEuroPrecise(result.economieFiscaleAn1)}
            bold
          />
          <Row
            label="Crédit Bëllegen Akt (enregistrement)"
            value={formatEuroPrecise(result.creditBellegenAkt)}
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
