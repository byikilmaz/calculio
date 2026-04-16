import type { ReactNode } from "react";
import Link from "next/link";
import { AdSlot } from "./AdSlot";
import { getToolContent } from "@/content";
import { getTool } from "@/lib/tools";
import type { CountryCode, ToolContent } from "@/lib/types";

interface CalculatorPageProps {
  countryCode: CountryCode;
  toolSlug: string;
  content: ToolContent;
  children: ReactNode;
}

export function CalculatorPage({
  countryCode,
  toolSlug,
  content,
  children,
}: CalculatorPageProps) {
  const relatedTools = content.relatedSlugs
    .map((slug) => getTool(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-slate-900">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${countryCode}`} className="hover:text-slate-900">
          {countryCode.toUpperCase()}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">
          {getTool(toolSlug)?.shortTitle ?? toolSlug}
        </span>
      </nav>

      <AdSlot placement="top" className="mb-6" />

      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.h1}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{content.intro}</p>
      </header>

      {children}

      <AdSlot placement="inline" className="my-10" />

      <section className="prose-fr mt-10">
        <h2>{content.explanation.title}</h2>
        <ExplanationBody body={content.explanation.body} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Questions fréquentes
        </h2>
        <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-white">
          {content.faq.map((item, i) => (
            <details
              key={i}
              className="group p-5 [&[open]>summary>svg]:rotate-180"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-slate-900">
                {item.question}
                <svg
                  className="h-5 w-5 text-slate-400 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-slate-700 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Outils liés
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/${countryCode}/${t.slug}`}
                className="rounded-md border border-[var(--border)] bg-white p-4 hover:border-[var(--primary)] hover:shadow-sm"
              >
                <div className="font-medium text-slate-900">{t.shortTitle}</div>
                <div className="mt-1 text-sm text-slate-500">
                  {t.description}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdSlot placement="bottom" className="mt-12" />

      <FaqSchema
        faq={content.faq}
        toolTitle={content.meta.title}
        url={`https://calculio.net/${countryCode}/${toolSlug}`}
      />
    </div>
  );
}

function ExplanationBody({ body }: { body: string }) {
  return (
    <>
      {body.split(/\n\n+/).map((para, i) => {
        if (para.trim().startsWith("- ")) {
          const items = para.split("\n").map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li
                  key={j}
                  dangerouslySetInnerHTML={{ __html: parseInline(item) }}
                />
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            dangerouslySetInnerHTML={{ __html: parseInline(para) }}
          />
        );
      })}
    </>
  );
}

function parseInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

interface FaqSchemaProps {
  faq: ToolContent["faq"];
  toolTitle: string;
  url: string;
}

function FaqSchema({ faq, toolTitle, url }: FaqSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "WebApplication",
        name: toolTitle,
        url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
