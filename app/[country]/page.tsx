import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRY_CODES, COUNTRIES, isCountryCode } from "@/lib/countries";
import { getToolsForCountry } from "@/lib/tools";
import { ToolCard } from "@/components/layout/ToolCard";
import { AdSlot } from "@/components/layout/AdSlot";

interface PageParams {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return COUNTRY_CODES.map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = COUNTRIES[country];
  return {
    title: `Simulateurs ${c.name} 2026`,
    description: `Tous les simulateurs financiers et fiscaux pour ${c.name} — barème officiel 2026.`,
  };
}

export default async function CountryPage({ params }: PageParams) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();

  const c = COUNTRIES[country];
  const tools = getToolsForCountry(country);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-8">
        <div className="text-4xl mb-3">{c.flag}</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Simulateurs pour {c.name}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {tools.length > 0
            ? `${tools.length} outil${tools.length > 1 ? "s" : ""} disponible${tools.length > 1 ? "s" : ""} pour ${c.name}.`
            : `Les outils pour ${c.name} arrivent bientôt.`}
        </p>
      </header>

      <AdSlot placement="top" className="mb-8" />

      {tools.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} countryCode={country} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[var(--border)] bg-slate-50 p-12 text-center text-slate-500">
          Bientôt disponible. En attendant, consultez nos outils pour la
          France.
        </div>
      )}
    </div>
  );
}
