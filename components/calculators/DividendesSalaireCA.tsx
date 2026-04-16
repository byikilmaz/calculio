"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  computeDividendesSalaireQC,
  type DividendesSalaireQCResult,
  type QCTypeDividende,
} from "@/lib/calculators/simulateur-dividendes-salaire-quebec-ca";
import { formatCAD, formatCADPrecise, formatPercent } from "@/lib/format";

function parseNum(s: string): number {
  return Number(s.replace(/\s/g, "").replace(",", "."));
}

export function DividendesSalaireCACalculator() {
  const [enveloppe, setEnveloppe] = useState<string>("150000");
  const [partSalairePct, setPartSalairePct] = useState<string>("60");
  const [type, setType] = useState<QCTypeDividende>("ordinaire");

  const result = useMemo<DividendesSalaireQCResult | null>(() => {
    const env = parseNum(enveloppe);
    if (!Number.isFinite(env) || env <= 0) return null;
    const part = parseNum(partSalairePct);
    return computeDividendesSalaireQC({
      enveloppeSociete: env,
      partSalaire: (Number.isFinite(part) ? part : 0) / 100,
      typeDividende: type,
    });
  }, [enveloppe, partSalairePct, type]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            Votre société (SPCC)
          </h2>
          <p className="text-sm text-slate-500">
            IS petite entreprise 12,2 %, RRQ double côté employé et employeur
          </p>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="env">Enveloppe brute société</Label>
              <div className="relative">
                <Input
                  id="env"
                  inputMode="decimal"
                  value={enveloppe}
                  onChange={(e) => setEnveloppe(e.target.value)}
                  className="pr-10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Bénéfice avant rémunération dirigeant
              </p>
            </div>
            <div>
              <Label htmlFor="part">Part en salaire</Label>
              <div className="relative">
                <Input
                  id="part"
                  inputMode="decimal"
                  value={partSalairePct}
                  onChange={(e) => setPartSalairePct(e.target.value)}
                  className="pr-8"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Complément versé en dividende
              </p>
            </div>
          </div>

          <div>
            <Label>Type de dividende</Label>
            <RadioGroup
              name="type"
              value={type}
              onChange={setType}
              options={[
                {
                  value: "ordinaire",
                  label: "Dividende ordinaire (SPCC)",
                  description: "Majoration 15 %, crédit fédéral 9,03 % + QC 3,42 %",
                },
                {
                  value: "determine",
                  label: "Dividende déterminé",
                  description: "Entreprise publique / GRIP — majoration 38 %, crédit plus généreux",
                },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: DividendesSalaireQCResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile
          label="Net total en main"
          value={formatCAD(result.netTotal)}
          accent
        />
        <Tile
          label="Prélèvements totaux"
          value={formatCAD(result.prelevementsTotaux)}
        />
        <Tile
          label="Taux effectif global"
          value={formatPercent(result.tauxEffectifGlobal, 1)}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Volet salaire
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Salaire brut"
            value={formatCADPrecise(result.salaireBrut)}
          />
          <Row
            label="Cotisations employé (RRQ, AE, RQAP, FSS)"
            value={`− ${formatCADPrecise(result.totalCotisationsEmploye)}`}
          />
          <Row
            label="Charges employeur (payées par société)"
            value={formatCADPrecise(result.totalCotisationsEmployeur)}
          />
          <Row
            label="Coût total salaire pour la société"
            value={formatCADPrecise(result.coutTotalSalaire)}
          />
          <Row
            label="Impôt fédéral + Québec"
            value={`− ${formatCADPrecise(result.impotFederalSalaire + result.impotQuebecSalaire)}`}
          />
          <Row
            label="Net salaire perçu"
            value={formatCADPrecise(result.netSalaire)}
            bold
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">
            Volet dividende
          </h3>
        </CardHeader>
        <CardBody className="space-y-3 text-sm">
          <Row
            label="Bénéfice société après salaire"
            value={formatCADPrecise(result.beneficeSoumisIS)}
          />
          <Row
            label="Impôt sociétés SPCC (12,2 %)"
            value={`− ${formatCADPrecise(result.impotSocietes)}`}
          />
          <Row
            label="Dividende brut distribuable"
            value={formatCADPrecise(result.dividendeBrut)}
            bold
          />
          <Row
            label="Dividende majoré (base imposable)"
            value={formatCADPrecise(result.dividendeMajore)}
          />
          <Row
            label="Crédits d'impôt fédéral + QC"
            value={`− ${formatCADPrecise(result.creditDividendeFed + result.creditDividendeQC)}`}
          />
          <Row
            label="Impôt fédéral + Québec"
            value={`− ${formatCADPrecise(result.impotFederalDividende + result.impotQuebecDividende)}`}
          />
          <Row
            label="Net dividende perçu"
            value={formatCADPrecise(result.netDividende)}
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
