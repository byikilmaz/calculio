import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sources officielles",
  description:
    "Liste des sources officielles utilisées par Calculio pour les barèmes fiscaux et sociaux : impots.gouv.fr, URSSAF, AGIRC-ARRCO, etc.",
  robots: { index: true, follow: true },
};

export default function SourcesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Sources officielles
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Barèmes 2026 — mise à jour annuelle
      </p>

      <p className="text-slate-700 leading-relaxed mb-8">
        Les calculateurs Calculio s&apos;appuient exclusivement sur des sources
        publiques officielles. Les barèmes sont vérifiés et mis à jour chaque
        année lors de la publication de la loi de finances.
      </p>

      <CountryBlock
        flag="🇫🇷"
        name="France"
        sources={[
          {
            name: "Direction Générale des Finances Publiques (DGFiP)",
            desc: "Barèmes de l'impôt sur le revenu, quotient familial, réductions et crédits d'impôt.",
            url: "https://www.impots.gouv.fr",
          },
          {
            name: "URSSAF",
            desc: "Taux de cotisations sociales salariales et patronales, plafond de la Sécurité sociale.",
            url: "https://www.urssaf.fr",
          },
          {
            name: "AGIRC-ARRCO",
            desc: "Taux de retraite complémentaire des salariés du secteur privé (tranches T1 et T2).",
            url: "https://www.agirc-arrco.fr",
          },
          {
            name: "APEC",
            desc: "Cotisation cadres (statut Apec).",
            url: "https://www.apec.fr",
          },
          {
            name: "Service-Public.fr",
            desc: "Information administrative officielle (droits de succession, plus-values immobilières, frais kilométriques).",
            url: "https://www.service-public.fr",
          },
          {
            name: "Net-entreprises.fr",
            desc: "Référentiel des déclarations sociales.",
            url: "https://www.net-entreprises.fr",
          },
        ]}
      />

      <CountryBlock
        flag="🇧🇪"
        name="Belgique"
        sources={[
          {
            name: "SPF Finances",
            desc: "Barèmes du précompte professionnel, impôt des personnes physiques.",
            url: "https://finances.belgique.be",
          },
          {
            name: "ONSS",
            desc: "Office National de Sécurité Sociale — cotisations sociales.",
            url: "https://www.onss.be",
          },
        ]}
      />

      <CountryBlock
        flag="🇨🇭"
        name="Suisse"
        sources={[
          {
            name: "Administration fédérale des contributions (AFC)",
            desc: "Barèmes de l'impôt fédéral direct, TVA.",
            url: "https://www.estv.admin.ch",
          },
          {
            name: "Office fédéral des assurances sociales (OFAS)",
            desc: "AVS, AI, APG, cotisations sociales.",
            url: "https://www.bsv.admin.ch",
          },
        ]}
      />

      <CountryBlock
        flag="🇨🇦"
        name="Canada (Québec)"
        sources={[
          {
            name: "Agence du revenu du Canada (ARC)",
            desc: "Taux d'imposition fédéraux, crédits d'impôt, RRQ/RPC.",
            url: "https://www.canada.ca/fr/agence-revenu.html",
          },
          {
            name: "Revenu Québec",
            desc: "Barèmes d'imposition provinciaux du Québec.",
            url: "https://www.revenuquebec.ca",
          },
        ]}
      />

      <section className="mt-10 rounded-lg border border-[var(--border)] bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Vous constatez une erreur ?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Les barèmes évoluent et malgré nos vérifications, des écarts peuvent
          subsister. Si vous repérez une incohérence avec une source
          officielle, signalez-la à{" "}
          <a
            href="mailto:yikilmaz.bilal@gmail.com"
            className="text-[var(--accent)] underline"
          >
            yikilmaz.bilal@gmail.com
          </a>{" "}
          — nous corrigerons dans les plus brefs délais.
        </p>
      </section>
    </article>
  );
}

interface Source {
  name: string;
  desc: string;
  url: string;
}

function CountryBlock({
  flag,
  name,
  sources,
}: {
  flag: string;
  name: string;
  sources: Source[];
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">{flag}</span>
        {name}
      </h2>
      <ul className="space-y-4">
        {sources.map((s) => (
          <li
            key={s.url}
            className="rounded-lg border border-[var(--border)] bg-white p-4"
          >
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--primary)] hover:underline"
            >
              {s.name} →
            </a>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              {s.desc}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
