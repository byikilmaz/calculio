"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePlusValueImmobiliereFR,
  type PlusValueResult,
} from "@/lib/calculators/calcul-plus-value-immobiliere-fr";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PlusValueImmobiliereCalculator() {
  const now = new Date().getFullYear();
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [prixVente, setPrixVente] = useState<string>("320000");
  const [anneeAchat, setAnneeAchat] = useState<string>(String(now - 10));
  const [anneeVente, setAnneeVente] = useState<string>(String(now));
  const [rp, setRp] = useState<boolean>(false);
  const [fraisReels, setFraisReels] = useState<string>("");
  const [travauxReels, setTravauxReels] = useState<string>("");

  const result = useMemo<PlusValueResult | null>(() => {
    const pa = parseNum(prixAchat);
    const pv = parseNum(prixVente);
    const aa = parseNum(anneeAchat);
    const av = parseNum(anneeVente);
    if (!Number.isFinite(pa) || pa < 0) return null;
    if (!Number.isFinite(pv) || pv < 0) return null;
    if (!Number.isFinite(aa) || !Number.isFinite(av) || av < aa) return null;
    const fr = parseNum(fraisReels);
    const tr = parseNum(travauxReels);
    return computePlusValueImmobiliereFR({
      prixAchat: pa,
      prixVente: pv,
      anneeAchat: aa,
      anneeVente: av,
      residencePrincipale: rp,
      fraisAcquisitionReels: Number.isFinite(fr) && fr > 0 ? fr : undefined,
      travauxReels: Number.isFinite(tr) && tr > 0 ? tr : undefined,
    });
  }, [prixAchat, prixVente, anneeAchat, anneeVente, rp, fraisReels, travauxReels]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre opération immobilière
          </h2>
          <p className="text-sm text-slate-500">
            Renseignez prix, dates et nature du bien
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pa">Prix d'achat (acte)</Label>
              <div className="relative">
                <Input
                  id="pa"
                  inputMode="decimal"
                  value={prixAchat}
                  onChange={(e) => setPrixAchat(e.target.value)}
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="pv">Prix de vente</Label>
              <div className="relative">
                <Input
                  id="pv"
                  inputMode="decimal"
                  value={prixVente}
                  onChange={(e) => setPrixVente(e.target.value)}
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="aa">Année d'achat</Label>
              <Input
                id="aa"
                inputMode="numeric"
                value={anneeAchat}
                onChange={(e) => setAnneeAchat(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="av">Année de vente</Label>
              <Input
                id="av"
                inputMode="numeric"
                value={anneeVente}
                onChange={(e) => setAnneeVente(e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-md border border-[var(--border)] p-3 cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              checked={rp}
              onChange={(e) => setRp(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                Résidence principale
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Exonération totale de la plus-value (art. 150 U CGI)
              </span>
            </span>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fr">Frais d'acquisition réels (optionnel)</Label>
              <div className="relative">
                <Input
                  id="fr"
                  inputMode="decimal"
                  value={fraisReels}
                  onChange={(e) => setFraisReels(e.target.value)}
                  placeholder="Sinon forfait 7,5 %"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="tr">Travaux réels (optionnel)</Label>
              <div className="relative">
                <Input
                  id="tr"
                  inputMode="decimal"
                  value={travauxReels}
                  onChange={(e) => setTravauxReels(e.target.value)}
                  placeholder="Sinon forfait 15 % après 5 ans"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
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

function ResultPanel({ result }: { result: PlusValueResult }) {
  if (result.exoneree) {
    return (
      <div className="rounded-md border border-emerald-300 bg-emerald-50 p-5">
        <div className="text-lg font-semibold text-emerald-900">
          Aucun impôt sur la plus-value
        </div>
        <div className="mt-1 text-sm text-emerald-800">
          {result.motif}. Plus-value brute : {formatEuro(result.plusValueBrute)}.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Impôt total à payer"
          value={formatEuro(result.totalImpot)}
          accent
        />
        <Tile
          label="Plus-value brute"
          value={formatEuro(result.plusValueBrute)}
        />
        <Tile
          label="Plus-value nette"
          value={formatEuro(result.plusValueNette)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
          <p className="text-sm text-slate-500">
            Durée de détention : {result.dureeDetention} ans
          </p>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Frais d'acquisition retenus"
            value={formatEuroPrecise(result.fraisAcquisitionRetenus)}
          />
          <Row
            label="Travaux retenus"
            value={formatEuroPrecise(result.travauxRetenus)}
          />
          <Row
            label="Prix d'acquisition corrigé"
            value={formatEuroPrecise(result.prixAcquisitionCorrige)}
          />
          <Row
            label="Abattement IR"
            value={formatPercent(result.abattementIR, 1)}
          />
          <Row
            label="Base imposable IR"
            value={formatEuroPrecise(result.baseImposableIR)}
          />
          <Row
            label="IR dû (19 %)"
            value={formatEuroPrecise(result.impotIR)}
          />
          <Row
            label="Abattement prélèvements sociaux"
            value={formatPercent(result.abattementPS, 1)}
          />
          <Row
            label="Base imposable PS"
            value={formatEuroPrecise(result.baseImposablePS)}
          />
          <Row
            label="PS dû (17,2 %)"
            value={formatEuroPrecise(result.impotPS)}
          />
          {result.surtaxe > 0 && (
            <Row
              label="Surtaxe (plus-value > 50 000 €)"
              value={formatEuroPrecise(result.surtaxe)}
            />
          )}
          <Row
            label="Total impôt"
            value={formatEuro(result.totalImpot)}
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
