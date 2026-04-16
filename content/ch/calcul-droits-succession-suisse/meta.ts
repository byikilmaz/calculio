import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Droits de Succession Suisse 2026 — 7 Cantons | Calculio",
    description:
      "Droits de succession suisses 2026 : 100 % cantonal. Conjoint exonéré partout, descendants directs exonérés VD/VS/BE, barèmes frères/tiers VD GE VS FR NE JU BE.",
  },
  h1: "Droits de Succession Suisse 2026 — Cantons Romands",
  intro:
    "Calculez les droits de succession selon le canton et le lien de parenté. Pas d'impôt fédéral en Suisse — compétence 100 % cantonale avec exonérations variables.",
  explanation: {
    title: "La succession en Suisse : cantonale, pas fédérale",
    body: `La Suisse est le **seul pays d'Europe** où il n'existe **aucun impôt fédéral sur les successions** : la matière est exclusivement **cantonale**, avec 26 régimes différents. La plupart des cantons exonèrent largement les proches, mais taxent lourdement les héritiers plus éloignés.

**Exonérations 2026 — cantons romands**

| Canton | Conjoint | Descendants directs | Ascendants |
|--------|----------|---------------------|------------|
| **Vaud** | Exonéré | **Exonérés** | Taxés |
| **Genève** | Exonéré | Taxés (0-6 %) | Taxés (8 %) |
| **Valais** | Exonéré | **Exonérés** | Taxés (10 %) |
| **Fribourg** | Exonéré | Taxés (0-15 %) | Taxés |
| **Neuchâtel** | Exonéré | Taxés (3 %) | Taxés |
| **Jura** | Exonéré | Taxés (7-14 %) | Taxés |
| **Berne** | Exonéré | **Exonérés** | Taxés |

**Frères/sœurs, neveux, tiers**

Les taux grimpent rapidement : 10 % (NE) à 20 % (VS) pour les **frères/sœurs**, et jusqu'à **54 %** (GE) ou **45 %** (NE) pour un **tiers sans lien de parenté**.

**Abattements**

Les cantons appliquent des abattements variables sur la part reçue avant imposition :

- **Vaud** : 250 000 CHF pour descendants éloignés (si imposés)
- **Neuchâtel** : 50 000 CHF
- **Jura** : 10 000 CHF
- **Berne** : 12 000 CHF
- **Genève / Fribourg / Valais** : peu ou pas d'abattement forfaitaire

**Canton compétent**

C'est le **dernier domicile du défunt** qui détermine le canton d'imposition (et non la résidence de l'héritier ou la localisation des biens, sauf immeubles qui restent imposés dans leur canton).

**Exemple — part de 500 kCHF reçue par un neveu à Lausanne**

Barème VD pour oncle/neveu : 25 % (moyenne) → 500 000 × 25 % = **125 000 CHF** de droits, net reçu **375 kCHF**.

Le même montant reçu par un enfant serait **entièrement exonéré** à Vaud.`,
  },
  faq: [
    {
      question: "Le conjoint est-il vraiment toujours exonéré ?",
      answer:
        "Oui, dans tous les cantons romands (et dans 24 des 26 cantons suisses au total). Seuls les cantons d'Appenzell Rhodes-Intérieures et de Vaud imposaient historiquement un peu le conjoint — Vaud a abrogé cette taxation en 2003. Les partenaires enregistrés (LPart) sont assimilés au conjoint.",
    },
    {
      question: "Un concubin (couple non marié) est-il traité comme conjoint ?",
      answer:
        "Non. Les concubins sans contrat LPart restent taxés comme des tiers (taux parfois > 50 %). Des exonérations partielles existent dans certains cantons après plusieurs années de vie commune (Neuchâtel, Vaud sous conditions), mais restent très marginales.",
    },
    {
      question: "L'impôt se calcule sur la succession totale ou par héritier ?",
      answer:
        "En Suisse romande et à Berne, c'est toujours par héritier (la 'part reçue'). Chaque héritier déclare sa part et applique le barème correspondant à son lien de parenté. C'est différent de la France où l'abattement s'applique par héritier mais le calcul de base est différent.",
    },
    {
      question: "Les donations anticipées sont-elles comprises ?",
      answer:
        "Ce calculateur ne traite que de la succession au décès. Les donations entre vifs sont en général soumises aux mêmes taux cantonaux mais avec leurs propres abattements et règles de rapport fiscal (les donations des 5 dernières années peuvent être ajoutées à la succession dans certains cantons).",
    },
    {
      question: "Un bien immobilier hors canton est-il taxé ?",
      answer:
        "Les immeubles sont toujours imposés dans le canton de leur situation, même si le défunt résidait ailleurs. Cela peut déclencher une double procédure cantonale (canton du domicile pour les biens mobiliers, canton de l'immeuble pour la part immobilière), avec règles de répartition pour éviter la double imposition.",
    },
  ],
  relatedSlugs: [
    "calcul-frais-notaire-suisse",
    "simulateur-impot-revenu-suisse",
  ],
};
