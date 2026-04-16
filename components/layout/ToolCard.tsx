import Link from "next/link";
import type { CountryCode, ToolMeta } from "@/lib/types";

interface ToolCardProps {
  tool: ToolMeta;
  countryCode: CountryCode;
}

const categoryLabels: Record<ToolMeta["category"], string> = {
  salaire: "Salaire",
  impot: "Impôt",
  immobilier: "Immobilier",
  epargne: "Épargne",
  retraite: "Retraite",
  autre: "Autre",
};

export function ToolCard({ tool, countryCode }: ToolCardProps) {
  return (
    <Link
      href={`/${countryCode}/${tool.slug}`}
      className="group block rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm transition-all hover:border-[var(--primary)] hover:shadow-md"
    >
      <div className="mb-2 inline-flex rounded-full bg-[var(--primary)]/5 px-2.5 py-0.5 text-xs font-medium text-[var(--primary)]">
        {categoryLabels[tool.category]}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[var(--primary)]">
        {tool.shortTitle}
      </h3>
      <p className="mt-1.5 text-sm text-slate-600">{tool.description}</p>
      <div className="mt-3 inline-flex items-center text-sm font-medium text-[var(--accent)]">
        Calculer →
      </div>
    </Link>
  );
}
