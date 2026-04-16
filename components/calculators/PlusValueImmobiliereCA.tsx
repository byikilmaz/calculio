"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computePlusValueImmoQC,
  type PlusValueImmoQCResult,
  type QCTypeBien,
} from "@/lib/calculators/calcul-plus-value-immobiliere-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PlusValueImmobiliereCACalculator() {
  const [prixVente, setPrixVente] = useState<string>("600000");
  const [fraisVente, setFraisVente] = useState<string>("30000");
  const [prixAchat, setPrixAchat] = useState<string>("400000");
  const [fraisAchat, setFraisAchat] = useState<string>("12000");
  const [ameliorations, setAmeliorations] = useState<string>("25000");
  const [typeBien, setTypeBien] = useState<QCTypeBien>("locatif");
  const [revenu, setRevenu] = useState<string>("85000");

  const result = useMemo<PlusValueImmoQCResult | null>(() => {
    return computePlusValueImmoQC({
      prixVente: parseNum(prixVente) || 0,
      fraisVente: parseNum(fraisVente) || 0,
      prixAchat: parseNum(prixAchat) || 0,
      fraisAchat: parseNum(fraisAchat) || 0,
      ameliorations: parseNum(ameliorations) || 0,
      typeBien,
      revenuAnnuelBrut: parseNum(revenu) || 0,
    });
  }, [prixVente, fraisVente, prixAchat, fraisAchat, ameliorations, typeBien, revenu]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre revente
          </h2>
          <p className="text-sm text-slate-500">
            Taux d&apos;inclusion 50 % 2026 (retour barème antérieur)
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pv">Prix de vente</Label>
              <div className="relative">
                <Input
                  id="pv"
                  inputMode="decimal"
                  value={prixVente}
                  onChange={(e) => setPrixVente(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="fv">Frais de vente (commission etc.)</Label>
              <div className="relative">
                <Input
                  id="fv"
                  inputMode="decimal"
                  value={fraisVente}
                  onChange={(e) => setFraisVente(e.target.value)}
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
              <Label htmlFor="pa">Prix d&apos;achat</Label>
              <div className="relative">
                <Input
                  id="pa"
                  inputMode="decimal"
                  value={prixAchat}
                  onChange={(e) => setPrixAchat(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="fa">Frais d&apos;achat (notaire, mutation)</Label>
              <div className="relative">
                <Input
                  id="fa"
                  inputMode="decimal"
                  value={fraisAchat}
                  onChange={(e) => setFraisAchat(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="am">Améliorations capitalisées</Label>
              <div className="relative">
                <Input
                  id="am"
                  inputMode="decimal"
                  value={ameliorations}
                  onChange={(e) => setAmeliorations(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Type de bien</Label>
            <RadioGroup
              name="type"
              value={typeBien}
              onChange={setTypeBien}
              options={[
                {
                  value: "residencePrincipale",
                  label: "Résidence principale",
                  description: "Exonération totale (principal residence exemption)",
                },
                {
                  value: "locatif",
                  label: "Immeuble locatif",
                  description: "Gain imposable à 50 %",
                },
                {
                  value: "secondaire",
                  label: "Résidence secondaire",
                  description: "Gain imposable à 50 %",
                },
              ]}
            />
          </div>

          <div>
            <Label htmlFor="revenu">Autres revenus annuels</Label>
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
            <p className="mt-1 text-xs text-slate-500">
              Pour calculer le taux marginal d&apos;imposition
            </p>
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: PlusValueImmoQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Impôt à payer"
          value={formatCAD(result.impotTotal)}
          accent
        />
        <Tile label="Gain brut" value={formatCAD(result.gainBrut)} />
        <Tile
          label="Gain imposable (50 %)"
          value={formatCAD(result.gainImposable)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">Détail</h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Prix de vente"
            value={formatCADPrecise(result.prixVente)}
          />
          <Row
            label="Prix net vente (après frais)"
            value={formatCADPrecise(result.prixNetVente)}
          />
          <Row
            label="Prix de revient (achat + frais + améliorations)"
            value={formatCADPrecise(result.prixRevient)}
          />
          <Row
            label="Gain en capital brut"
            value={formatCADPrecise(result.gainBrut)}
            bold
          />
          {result.exonere ? (
            <Row
              label="Exonération résidence principale"
              value="Gain 100 % exonéré"
              bold
            />
          ) : (
            <>
              <Row
                label="Gain imposable (inclusion 50 %)"
                value={formatCADPrecise(result.gainImposable)}
              />
              <Row
                label="Taux marginal fédéral"
                value={formatPercent(result.tauxMarginalFederal, 1)}
              />
              <Row
                label="Taux marginal Québec"
                value={formatPercent(result.tauxMarginalQC, 1)}
              />
              <Row
                label="Taux marginal combiné effectif"
                value={formatPercent(result.tauxMarginalCombineEffectif, 1)}
              />
              <Row
                label="Impôt fédéral (après abattement QC)"
                value={formatCADPrecise(result.impotFederal)}
              />
              <Row
                label="Impôt Québec"
                value={formatCADPrecise(result.impotQuebec)}
              />
              <Row
                label="Impôt total"
                value={formatCADPrecise(result.impotTotal)}
                bold
              />
            </>
          )}
          <Row
            label="Net vendeur (indicatif)"
            value={formatCADPrecise(result.netVendeur)}
            bold
          />
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
