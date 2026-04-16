"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePretHypothecaireCH,
  type PretHypothecaireCHResult,
} from "@/lib/calculators/simulateur-pret-hypothecaire-suisse-ch";
import { formatCHF, formatCHFPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PretHypothecaireCHCalculator() {
  const [prix, setPrix] = useState<string>("900000");
  const [fondsDurs, setFondsDurs] = useState<string>("120000");
  const [fonds2P, setFonds2P] = useState<string>("60000");
  const [revenu, setRevenu] = useState<string>("180000");
  const [taux, setTaux] = useState<string>("2.0");
  const [duree, setDuree] = useState<string>("25");

  const result = useMemo<PretHypothecaireCHResult | null>(() => {
    const p = parseNum(prix);
    if (!Number.isFinite(p) || p <= 0) return null;
    return computePretHypothecaireCH({
      prixBien: p,
      fondsPropresDurs: parseNum(fondsDurs) || 0,
      fondsPropres2ePilier: parseNum(fonds2P) || 0,
      revenuAnnuel: parseNum(revenu) || 0,
      tauxEffectif: parseNum(taux) || 0,
      dureeAnnees: parseNum(duree) || 25,
    });
  }, [prix, fondsDurs, fonds2P, revenu, taux, duree]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet immobilier en Suisse
          </h2>
          <p className="text-sm text-slate-500">
            Fonds propres min 20 % (dont 10 % durs hors 2e pilier), charges ≤
            33 % du revenu
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
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="revenu">Revenu annuel brut ménage</Label>
              <div className="relative">
                <Input
                  id="revenu"
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fdurs">Fonds propres durs (hors 2e pilier)</Label>
              <div className="relative">
                <Input
                  id="fdurs"
                  inputMode="decimal"
                  value={fondsDurs}
                  onChange={(e) => setFondsDurs(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="f2p">Retrait du 2e pilier</Label>
              <div className="relative">
                <Input
                  id="f2p"
                  inputMode="decimal"
                  value={fonds2P}
                  onChange={(e) => setFonds2P(e.target.value)}
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  CHF
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="taux">Taux d'intérêt effectif</Label>
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
              <Label htmlFor="duree">Durée (années)</Label>
              <Input
                id="duree"
                inputMode="numeric"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Tile
              label="Mensualité effective"
              value={formatCHF(result.mensualiteEffective)}
              accent
            />
            <Tile
              label="Montant emprunté"
              value={formatCHF(result.montantEmprunte)}
            />
            <Tile label="LTV" value={formatPercent(result.ltv, 1)} />
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Diagnostic FINMA / ASB
              </h3>
            </CardHeader>
            <CardBody className="space-y-2 text-sm">
              {result.diagnostics.map((d, i) => (
                <div
                  key={i}
                  className={
                    result.fondsPropresOK && result.ratioOK
                      ? "rounded-md bg-green-50 p-3 text-green-900"
                      : "rounded-md bg-amber-50 p-3 text-amber-900"
                  }
                >
                  {d}
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Structure du financement
              </h3>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Fonds propres totaux"
                value={formatCHFPrecise(result.fondsPropresTotaux)}
              />
              <Row
                label="Fonds propres requis (20 % du prix)"
                value={formatCHFPrecise(result.fondsPropresRequis)}
              />
              <Row
                label="Hypothèque 1er rang (≤ 66 % LTV)"
                value={formatCHFPrecise(result.hypo1erRang)}
              />
              <Row
                label="Hypothèque 2e rang (à amortir)"
                value={formatCHFPrecise(result.hypo2eRang)}
              />
              <Row
                label="Amortissement annuel (15 ans)"
                value={formatCHFPrecise(result.amortissementAnnuel)}
                bold
              />
              <Row
                label="Intérêts effectifs annuels"
                value={formatCHFPrecise(result.interetsAnnuelsEffectifs)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Test bancaire (charges théoriques)
              </h3>
              <p className="text-sm text-slate-500">
                Taux théorique 5 %, entretien 1 %, amortissement
              </p>
            </CardHeader>
            <CardBody className="space-y-3 text-sm">
              <Row
                label="Intérêts théoriques (5 %)"
                value={formatCHFPrecise(result.interetsTheoriques)}
              />
              <Row
                label="Entretien (1 % du prix)"
                value={formatCHFPrecise(result.entretienTheorique)}
              />
              <Row
                label="Amortissement"
                value={formatCHFPrecise(result.amortissementAnnuel)}
              />
              <Row
                label="Total charges théoriques"
                value={formatCHFPrecise(result.chargesTheoriques)}
                bold
              />
              <Row
                label="Ratio charges / revenu"
                value={`${formatPercent(result.ratioCharges, 1)} (max 33 %)`}
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
