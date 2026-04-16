import Link from "next/link";
import { COUNTRY_CODES, COUNTRIES } from "@/lib/countries";
import { getToolsForCountry } from "@/lib/tools";
import { ToolCard } from "@/components/layout/ToolCard";
import { AdSlot } from "@/components/layout/AdSlot";

export default function HomePage() {
  const frTools = getToolsForCountry("fr");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="py-12 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/5 px-3 py-1 text-xs font-medium text-[var(--primary)]">
          Barème 2026 · Gratuit · Sans inscription
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Simulateurs financiers pour la francophonie
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Calculez votre salaire net, impôt, prêt immobilier, retraite ou
          épargne en quelques secondes. Barèmes officiels France, Belgique,
          Suisse et Canada.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {COUNTRY_CODES.map((code) => {
            const country = COUNTRIES[code];
            return (
              <Link
                key={code}
                href={`/${code}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <span className="text-lg">{country.flag}</span>
                {country.name}
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot placement="top" className="mb-10" />

      <section className="pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            🇫🇷 Outils pour la France
          </h2>
          <Link
            href="/fr"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {frTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} countryCode="fr" />
          ))}
        </div>
      </section>

      <section className="py-12 border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Pourquoi Calculio ?
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Feature
            title="Barèmes officiels"
            body="Toutes les données fiscales et sociales sont issues des sources officielles (impots.gouv.fr, URSSAF, etc.) et actualisées chaque année."
          />
          <Feature
            title="Aucune inscription"
            body="Pas de compte, pas de collecte de données personnelles. Les calculs sont effectués directement dans votre navigateur."
          />
          <Feature
            title="Rapide et précis"
            body="Résultats instantanés avec le détail complet des cotisations, tranches et montants nets."
          />
        </div>
      </section>

      <AdSlot placement="bottom" className="mb-12" />
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-white p-6 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
        ✓
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}
