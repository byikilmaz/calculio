"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computePlusValueLU,
  type LUTypePV,
  type PlusValueLUResult,
} from "@/lib/calculators/calcul-plus-value-immobiliere-luxembourg-lu";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function PlusValueImmobiliereLUCalculator() {
  const [prixVente, setPrixVente] = useState<string>("900000");
  const [prixAcqui, setPrixAcqui] = useState<string>("500000");
  const [frais, setFrais] = useState<string>("35000");
  const [travaux, setTravaux] = useState<string>("50000");
  const [duree, setDuree] = useState<string>("8");
  const [nbMembres, setNbMembres] = useState<number>(1);
  const [typeBien, setTypeBien] = useState<LUTypePV>("locatif");
  const [occupation5Ans, setOccupation5Ans] = useState<boolean>(false);
  const [tmi, setTmi] = useState<string>("0.39");
  const [dernAns, setDernAns] = useState<string>("20");

  const result = useMemo<PlusValueLUResult | null>(() => {
    const pv = parseNum(prixVente);
    if (!Number.isFinite(pv) || pv <= 0) return null;
    return computePlusValueLU({
      prixVente: pv,
      prixAcquisition: parseNum(prixAcqui) || 0,
      fraisAcquisition: parseNum(frais) || 0,
      travaux: parseNum(travaux) || 0,
      dureeDetentionAnnees: parseNum(duree) || 0,
      nbMembresFoyer: nbMembres,
      occupationResidencePrincipale5Ans: occupation5Ans,
      typeBien,
      tauxMarginalIR: parseNum(tmi) || 0.39,
      abattementsDejaUtilisesAnnees: parseNum(dernAns) || 0,
    });
  }, [
    prixVente,
    prixAcqui,
    frais,
    travaux,
    duree,
    nbMembres,
    typeBien,
    occupation5Ans,
    tmi,
    dernAns,
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre revente immobilière
          </h2>
          <p className="text-sm text-slate-500">
            Luxembourg — 2026
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="prix-vente">Prix de vente</Label>
              <Input
                id="prix-vente"
                inputMode="decimal"
                value={prixVente}
                onChange={(e) => setPrixVente(e.target.value)}
                placeholder="900000"
              />
            </div>
            <div>
              <Label htmlFor="prix-acqui">Prix d&apos;acquisition</Label>
              <Input
                id="prix-acqui"
                inputMode="decimal"
                value={prixAcqui}
                onChange={(e) => setPrixAcqui(e.target.value)}
                placeholder="500000"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="frais">Frais notaire</Label>
              <Input
                id="frais"
                inputMode="decimal"
                value={frais}
                onChange={(e) => setFrais(e.target.value)}
                placeholder="35000"
              />
            </div>
            <div>
              <Label htmlFor="travaux">Travaux déductibles</Label>
              <Input
                id="travaux"
                inputMode="decimal"
                value={travaux}
                onChange={(e) => setTravaux(e.target.value)}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="duree">Durée détention</Label>
              <Input
                id="duree"
                inputMode="numeric"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                placeholder="8"
              />
            </div>
          </div>

          <div>
            <Label>Type de bien</Label>
            <RadioGroup
              name="typebien"
              value={typeBien}
              onChange={setTypeBien}
              options={[
                {
                  value: "residencePrincipale",
                  label: "Résidence principale",
                  description: "Exonérée si ≥ 5 ans d'occupation",
                },
                {
                  value: "locatif",
                  label: "Immeuble locatif",
                  description: "Imposable (spéculation < 2 ans / demi-global ≥ 2 ans)",
                },
              ]}
            />
          </div>

          {typeBien === "residencePrincipale" && (
            <div className="flex items-center justify-between rounded-md border border-[var(--border)] bg-slate-50 p-4">
              <div>
                <div className="font-medium text-slate-900">
                  Occupation ≥ 5 ans
                </div>
                <div className="text-sm text-slate-500">
                  Déclenche l&apos;exonération totale
                </div>
              </div>
              <Button
                type="button"
                variant={occupation5Ans ? "primary" : "ghost"}
                onClick={() => setOccupation5Ans(!occupation5Ans)}
              >
                {occupation5Ans ? "Oui" : "Non"}
              </Button>
            </div>
          )}

          {typeBien === "locatif" && (
            <div className="grid gap-4 sm:grid-cols-3">
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
              <div>
                <Label htmlFor="tmi">Taux marginal IR</Label>
                <Input
                  id="tmi"
                  inputMode="decimal"
                  value={tmi}
                  onChange={(e) => setTmi(e.target.value)}
                  placeholder="0.39"
                />
              </div>
              <div>
                <Label htmlFor="dern">Abattement : ans depuis usage</Label>
                <Input
                  id="dern"
                  inputMode="numeric"
                  value={dernAns}
                  onChange={(e) => setDernAns(e.target.value)}
                  placeholder="20"
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: PlusValueLUResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Plus-value nette"
          value={formatEuro(result.plusValueNette)}
          accent
        />
        <Tile
          label="Impôt total"
          value={formatEuro(result.impotTotal)}
        />
        <Tile
          label="Taux appliqué"
          value={formatPercent(result.tauxApplique, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Détail du calcul
          </h3>
          {result.exonereResidencePrincipale && (
            <p className="text-sm text-green-700">
              Résidence principale occupée ≥ 5 ans : exonération totale
            </p>
          )}
          {result.speculation && (
            <p className="text-sm text-amber-700">
              Détention &lt; 2 ans : taxation au taux plein (spéculation)
            </p>
          )}
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Prix de vente"
            value={formatEuroPrecise(result.prixVente)}
          />
          <Row
            label="Coût de revient"
            value={formatEuroPrecise(result.coutRevient)}
          />
          <Row
            label="Plus-value brute"
            value={formatEuroPrecise(result.plusValueBrute)}
            bold
          />
          {!result.exonereResidencePrincipale && (
            <>
              <Row
                label="Abattement personnel (50 k€/pers.)"
                value={`− ${formatEuroPrecise(result.abattementPersonnel)}`}
              />
              <Row
                label="Abattement détention longue (≥ 11 ans)"
                value={`− ${formatEuroPrecise(result.abattementDetentionLongue)}`}
              />
              <Row
                label="Plus-value imposable"
                value={formatEuroPrecise(result.plusValueImposable)}
                bold
              />
              <Row
                label="Impôt (taux demi-global / spéculation)"
                value={formatEuroPrecise(result.impot)}
              />
              <Row
                label="Fonds pour l'emploi (7 %)"
                value={formatEuroPrecise(result.fondsEmploi)}
              />
              <Row
                label="Impôt total"
                value={formatEuroPrecise(result.impotTotal)}
                bold
              />
            </>
          )}
          <Row
            label="Plus-value nette après impôt"
            value={formatEuroPrecise(result.plusValueNette)}
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
