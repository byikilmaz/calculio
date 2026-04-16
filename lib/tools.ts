import type { ToolMeta } from "./types";

export const TOOLS: ToolMeta[] = [
  {
    slug: "simulateur-salaire-brut-net",
    title: "Simulateur Salaire Brut → Net",
    shortTitle: "Salaire Brut → Net",
    description: "Convertissez votre salaire brut en net avec le barème 2025",
    h1: "Simulateur Salaire Brut Net 2025 — Gratuit et Officiel",
    category: "salaire",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-impot-revenu",
    title: "Simulateur Impôt sur le Revenu",
    shortTitle: "Impôt sur le Revenu",
    description: "Calculez votre impôt 2025 selon le barème officiel",
    h1: "Simulateur Impôt sur le Revenu 2025 — Gratuit",
    category: "impot",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-pret-immobilier",
    title: "Simulateur Prêt Immobilier",
    shortTitle: "Prêt Immobilier",
    description: "Mensualités, intérêts et capacité d'emprunt",
    h1: "Simulateur de Prêt Immobilier 2025 — Mensualités",
    category: "immobilier",
    availableIn: ["fr"],
  },
  {
    slug: "calculateur-retraite",
    title: "Calculateur Retraite",
    shortTitle: "Retraite",
    description: "Estimez votre pension de retraite future",
    h1: "Simulateur Retraite 2025 — Estimation Pension",
    category: "retraite",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-plus-value-immobiliere",
    title: "Plus-Value Immobilière",
    shortTitle: "Plus-Value Immobilière",
    description: "Imposition sur la revente d'un bien immobilier",
    h1: "Calcul Plus-Value Immobilière 2025",
    category: "immobilier",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-auto-entrepreneur",
    title: "Simulateur Auto-Entrepreneur",
    shortTitle: "Auto-Entrepreneur",
    description: "Charges et revenu net micro-entreprise",
    h1: "Simulateur Charges Auto-Entrepreneur 2025",
    category: "salaire",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-droits-succession",
    title: "Calcul Droits de Succession",
    shortTitle: "Droits de Succession",
    description: "Abattements et taux selon le lien de parenté",
    h1: "Calcul Droits de Succession 2025",
    category: "autre",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-epargne",
    title: "Simulateur Épargne",
    shortTitle: "Intérêts Composés",
    description: "Intérêts composés et projection d'épargne",
    h1: "Simulateur Épargne & Intérêts Composés 2025",
    category: "epargne",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-frais-kilometriques",
    title: "Frais Kilométriques",
    shortTitle: "Frais Kilométriques",
    description: "Barème kilométrique officiel 2025",
    h1: "Calcul Frais Kilométriques 2025 — Barème Officiel",
    category: "autre",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-dividendes-salaire",
    title: "Dividendes vs Salaire",
    shortTitle: "Dividendes vs Salaire",
    description: "Comparez la rémunération en dividendes ou salaire",
    h1: "Simulateur Dividendes vs Salaire — SASU / SARL",
    category: "salaire",
    availableIn: ["fr"],
  },
];

export const TOOLS_BY_SLUG = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
) as Record<string, ToolMeta>;

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS_BY_SLUG[slug];
}

export function getToolsForCountry(countryCode: string): ToolMeta[] {
  return TOOLS.filter((t) =>
    t.availableIn.includes(countryCode as ToolMeta["availableIn"][number]),
  );
}
