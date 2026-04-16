"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeDividendesRemunerationBE,
  type BERegimeDividende,
  type BETailleSociete,
  type DividendesRemunerationBEResult,
} from "@/lib/calculators/simulateur-dividendes-remuneration-be";
import { formatEuro, formatEuroPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function DividendesRemunerationBECalculator() {
  const [enveloppe, setEnveloppe] = useState<string>("120000");
  const [partPct, setPartPct] = useState<string>("50");
  const [regime, setRegime] = useState<BERegimeDividende>("vvprBis3");
  const [taille, setTaille] = useState<BETailleSociete>("pme");
  const [additionnels, setAdditionnels] = useState<string>("7.5");

  const result = useMemo<DividendesRemunerationBEResult | null>(() => {
    const env = parseNum(enveloppe);
    const pct = parseNum(partPct);
    const add = parseNum(additionnels);
    if (!Number.isFinite(env) || env <= 0) return null;
    if (!Number.isFinite(pct) || pct < 0 || pct > 100) return null;
    return computeDividendesRemunerationBE({
      enveloppeBrute: env,
      partRemuneration: pct / 100,
      regimeDividende: regime,
      tailleSociete: taille,
      additionnelsCommunaux: Number.isFinite(add) ? add / 100 : 0.075,
    });
  }, [enveloppe, partPct, regime, taille, additionnels]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre arbitrage salaire / dividende
          </h2>
          <p className="text-sm text-slate-500">
            Enveloppe brute disponible en société et répartition choisie
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="enveloppe">
                Enveloppe brute société (résultat avant IS)
              </Label>
              <div className="relative">
                <Input
                  id="enveloppe"
                  inputMode="decimal"
                  value={enveloppe}
                  onChange={(e) => setEnveloppe(e.target.value)}
                  placeholder="120000"
                  className="pr-12"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  €
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="part">Part en rémunération brute</Label>
              <div className="relative">
                <Input
                  id="part"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={partPct}
                  onChange={(e) => setPartPct(e.target.value)}
                />
                <div className="mt-1 text-sm text-slate-500">
                  {partPct} % en salaire / {100 - parseNum(partPct)} % en dividende
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label>Taille de la société</Label>
            <RadioGroup
              name="taille"
              value={taille}
              onChange={setTaille}
              options={[
                {
                  value: "pme",
                  label: "PME (art. 1:24 CSA)",
                  description:
                    "IS 20 % ≤ 100 000 € / 25 % au-delà, accès VVPR-bis",
                },
                {
                  value: "grande",
                  label: "Grande société",
                  description:
                    "IS 25 % plein, dividende 30 % ordinaire",
                },
              ]}
            />
          </div>

          <div>
            <Label>Régime de précompte mobilier</Label>
            <RadioGroup
              name="regime"
              value={regime}
              onChange={setRegime}
              options={[
                {
                  value: "ordinaire",
                  label: "Ordinaire — 30 %",
                  description: "Dividende classique",
                },
                {
                  value: "vvprBis2",
                  label: "VVPR-bis 2ᵉ exercice — 20 %",
                  description: "2 ans de réserve (PME uniquement)",
                },
                {
                  value: "vvprBis3",
                  label: "VVPR-bis 3ᵉ exercice — 15 %",
                  description: "≥ 3 ans de réserve (PME uniquement)",
                },
              ]}
            />
          </div>

          <div>
            <Label htmlFor="additionnels">Additionnels communaux</Label>
            <div className="relative max-w-xs">
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
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: DividendesRemunerationBEResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Net total dans la poche"
          value={formatEuro(result.netTotal)}
          accent
        />
        <Tile
          label="Prélèvements totaux"
          value={formatEuro(result.prelevementsTotaux)}
        />
        <Tile
          label="Taux effectif global"
          value={formatPercent(result.tauxEffectifGlobal, 1)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Branche rémunération
            </h3>
            <p className="text-sm text-slate-500">
              Brut dirigeant : {formatEuro(result.remunerationBrute)}
            </p>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <Row
              label="Cotisation INASTI"
              value={`− ${formatEuroPrecise(result.cotisationInasti)}`}
            />
            <Row
              label="Frais de gestion caisse"
              value={`− ${formatEuroPrecise(result.fraisGestionCaisse)}`}
            />
            <Row
              label="Base imposable"
              value={formatEuroPrecise(result.baseImposable)}
            />
            <Row
              label="Impôt selon barème IPP"
              value={formatEuroPrecise(result.impotBareme)}
            />
            <Row
              label="Réduction quotité exemptée"
              value={`− ${formatEuroPrecise(result.reductionQuotite)}`}
            />
            <Row
              label="Additionnels communaux"
              value={`+ ${formatEuroPrecise(result.additionnelsMontant)}`}
            />
            <Row
              label="Impôt total (IPP + communal)"
              value={formatEuroPrecise(result.impotTotalRemuneration)}
            />
            <Row
              label="Net rémunération"
              value={formatEuroPrecise(result.netRemuneration)}
              bold
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Branche dividende
            </h3>
            <p className="text-sm text-slate-500">
              Bénéfice après rémunération :{" "}
              {formatEuro(result.beneficeSocieteApresRemuneration)}
            </p>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <Row
              label="Impôt sociétés (IS)"
              value={`− ${formatEuroPrecise(result.impotSocietes)}`}
            />
            <Row
              label="Dividende brut distribuable"
              value={formatEuroPrecise(result.dividendeBrut)}
            />
            <Row
              label={`Précompte mobilier (${formatPercent(
                result.tauxPrecompteDividende,
                0,
              )})`}
              value={`− ${formatEuroPrecise(result.precompteDividende)}`}
            />
            <Row
              label="Net dividende"
              value={formatEuroPrecise(result.netDividende)}
              bold
            />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Synthèse finale
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Enveloppe brute société"
            value={formatEuroPrecise(result.enveloppeBrute)}
          />
          <Row
            label="Net rémunération"
            value={formatEuroPrecise(result.netRemuneration)}
          />
          <Row
            label="Net dividende"
            value={formatEuroPrecise(result.netDividende)}
          />
          <Row
            label="Net total perçu"
            value={formatEuroPrecise(result.netTotal)}
            bold
          />
          <Row
            label="Prélèvements totaux"
            value={formatEuroPrecise(result.prelevementsTotaux)}
          />
          <Row
            label="Taux effectif global"
            value={formatPercent(result.tauxEffectifGlobal, 2)}
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
