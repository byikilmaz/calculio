export type CountryCode = "fr" | "be" | "ch" | "ca" | "lu";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  locale: string;
}

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface ToolMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  h1: string;
  category: "salaire" | "impot" | "immobilier" | "epargne" | "retraite" | "autre";
  availableIn: CountryCode[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolContent {
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  intro: string;
  explanation: {
    title: string;
    body: string;
  };
  faq: FaqItem[];
  relatedSlugs: string[];
}
