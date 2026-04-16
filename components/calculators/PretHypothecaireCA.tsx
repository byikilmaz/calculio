"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  computePretHypothecaireQC,
  type PretHypothecaireQCResult,
} from "@/lib/calculators/simulateur-pret-hypothecaire-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PretHypothecaireCACalculator() {
  const [prix, setPrix] = useState<string>("500000");
  const [mise, setMise] = useState<string>("50000");
  const [taux, setTaux] = useState<string>("5.25");
  const [amortissement, setAmortissement] = useState<string>("25");
  const [revenu, setRevenu] = useState<string>("110000");
  const [dettes, setDettes] = useState<string>("400");

  const result = useMemo<PretHypothecaireQCResult | null>(() => {
    const p = parseNum(prix);
    const m = parseNum(mise);
    const t = parseNum(taux);
    const a = parseNum(amortissement);
    const r = parseNum(revenu);
    const d = parseNum(dettes);
    if (!Number.isFinite(p) || p <= 0) return null;
    return computePretHypothecaireQC({
      prixBien: p,
      miseDeFonds: Number.isFinite(m) ? m : 0,
      tauxContractuel: Number.isFinite(t) ? t : 0,
      amortissementAnnees: Number.isFinite(a) ? a : 25,
      revenuMenage: Number.isFinite(r) ? r : 0,
      dettesMensuelles: Number.isFinite(d) ? d : 0,
    });
  }, [prix, mise, taux, amortissement, revenu, dettes]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre projet hypothécaire
          </h2>
          <p className="text-sm text-slate-500">
            Règles SCHL 2026 — mise, test de stress et ratios GDS/ATD
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="prix">Prix d&apos;achat</Label>
              <div className="relative">
                <Input
                  id="prix"
                  inputMode="decimal"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="mise">Mise de fonds</Label>
              <div className="relative">
                <Input
                  id="mise"
                  inputMode="decimal"
                  value={mise}
                  onChange={(e) => setMise(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="taux">Taux contractuel</Label>
              <div className="relative">
                <Input
                  id="taux"
                  inputMode="decimal"
                  value={taux}
                  onChange={(e) => setTaux(e.target.value)}
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="amort">Amortissement (années)</Label>
              <Input
                id="amort"
                inputMode="decimal"
                value={amortissement}
                onChange={(e) => setAmortissement(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dettes">Autres dettes (mensuel)</Label>
              <div className="relative">
                <Input
                  id="dettes"
                  inputMode="decimal"
                  value={dettes}
                  onChange={(e) => setDettes(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="revenu">Revenu brut annuel du ménage</Label>
            <div className="relative">
              <Input
                id="revenu"
                inputMode="decimal"
                value={revenu}
                onChange={(e) => setRevenu(e.target.value)}
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                $
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: PretHypothecaireQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile label="Mensualité" value={formatCAD(result.mensualite)} accent />
        <Tile
          label="Capital emprunté"
          value={formatCAD(result.montantEmprunte)}
        />
        <Tile label="Ratio GDS" value={formatPercent(result.ratioGDS, 1)} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Analyse SCHL
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Mise de fonds minimum requise"
            value={formatCADPrecise(result.miseMinimumRequise)}
          />
          <Row
            label="Prêt assuré SCHL ?"
            value={result.assuranceRequise ? "Oui (mise < 20 %)" : "Non (conventionnel)"}
          />
          {result.primeSCHLPct > 0 && (
            <>
              <Row
                label={`Prime SCHL (${(result.primeSCHLPct * 100).toFixed(1)} %)`}
                value={formatCADPrecise(result.primeSCHLMontant)}
              />
            </>
          )}
          <Row
            label="Ratio prêt/valeur (LTV)"
            value={formatPercent(result.ltv, 1)}
          />
          <Row
            label="Amortissement maximum autorisé"
            value={`${result.amortissementMaxAutorise} ans`}
          />
          <Row
            label="Mensualité au taux contractuel"
            value={formatCADPrecise(result.mensualite)}
            bold
          />
          <Row
            label={`Mensualité au test de stress (${result.tauxStressApplique.toFixed(2)} %)`}
            value={formatCADPrecise(result.mensualiteStress)}
          />
          <Row
            label="Ratio GDS (≤ 39 %)"
            value={formatPercent(result.ratioGDS, 1)}
          />
          <Row
            label="Ratio ATD (≤ 44 %)"
            value={formatPercent(result.ratioATD, 1)}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Diagnostic du dossier
          </h3>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2 text-sm text-slate-700">
            {result.diagnostics.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--primary)]">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
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
