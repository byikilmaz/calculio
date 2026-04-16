import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRY_CODES, isCountryCode } from "@/lib/countries";
import { TOOLS, getTool } from "@/lib/tools";
import { getToolContent } from "@/content";
import { getCalculator } from "@/components/calculators/registry";
import { CalculatorPage } from "@/components/layout/CalculatorPage";

interface PageParams {
  params: Promise<{ country: string; tool: string }>;
}

export function generateStaticParams() {
  const params: Array<{ country: string; tool: string }> = [];
  for (const country of COUNTRY_CODES) {
    for (const tool of TOOLS) {
      if (tool.availableIn.includes(country)) {
        params.push({ country, tool: tool.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, tool } = await params;
  if (!isCountryCode(country)) return {};
  const content = getToolContent(country, tool);
  if (!content) return {};
  const url = `https://calculio.net/${country}/${tool}`;
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: PageParams) {
  const { country, tool } = await params;
  if (!isCountryCode(country)) notFound();
  const toolMeta = getTool(tool);
  if (!toolMeta || !toolMeta.availableIn.includes(country)) notFound();

  const content = getToolContent(country, tool);
  const Calculator = getCalculator(country, tool);

  if (!content || !Calculator) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {toolMeta.title}
        </h1>
        <p className="mt-4 text-slate-600">
          Ce simulateur sera bientôt disponible pour {country.toUpperCase()}.
        </p>
      </div>
    );
  }

  return (
    <CalculatorPage
      countryCode={country}
      toolSlug={tool}
      content={content}
    >
      <Calculator />
    </CalculatorPage>
  );
}
