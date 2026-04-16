import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calculateur Retraite Suisse 2026 — 3 Piliers | Calculio",
    description:
      "Rente AVS 2026 (max 2 450 CHF mensuels, couple 3 675), capital LPP projeté, 3e pilier A (max 7 258 CHF). Estimation complète de votre retraite suisse.",
  },
  h1: "Calculateur Retraite Suisse 2026 — AVS, LPP & 3e Pilier A",
  intro:
    "Projetez votre retraite suisse en combinant 1er pilier AVS, 2e pilier LPP et 3e pilier A. Valeurs officielles OFAS 2026.",
  explanation: {
    title: "Les 3 piliers de la prévoyance suisse en 2026",
    body: `La retraite en Suisse repose sur **trois piliers** complémentaires, dont seuls les deux premiers sont obligatoires.

**1er pilier — AVS (Assurance-vieillesse et survivants)**

Couverture universelle gérée par la Confédération (OFAS). Barème 01/2026 :

- Rente **maximale individuelle** : **2 450 CHF/mois**
- Rente **minimale** : **1 225 CHF/mois**
- **Plafond couple** : **3 675 CHF/mois** (150 % de la rente maximale individuelle)
- **44 années de cotisation** requises pour la rente pleine (année manquante = -1/44)
- **Revenu déterminant** plafonné à **88 200 CHF/an** pour le calcul

**2e pilier — LPP / Caisse de pensions**

Obligatoire pour tout salarié gagnant ≥ **22 680 CHF/an**. Les cotisations (7 %/10 %/15 %/18 % selon l'âge) s'accumulent sur un **compte individuel** qui génère des intérêts. À la retraite : conversion en **rente viagère** (taux ≈ 5 %) ou **retrait en capital** (imposé une seule fois au taux réduit).

**3e pilier A (prévoyance liée) — volontaire**

Plafonds 2026 :

- **Salarié** affilié à une caisse LPP : **7 258 CHF/an** déductible intégralement du revenu imposable
- **Indépendant sans LPP** : **20 % du revenu net**, plafonné à **36 288 CHF/an**

Avantage fiscal immédiat : versement × **TMI** (taux marginal d'imposition). Exemple : un versement de 7 258 CHF avec un TMI de 25 % économise **1 815 CHF d'impôt**.

Le capital ne peut être retiré qu'au départ en retraite (5 ans avant l'âge légal au plus tôt), à l'achat d'une résidence principale, à l'émigration ou à l'invalidité.

**Exemple — Salarié Vaud, 40 ans, 100 kCHF/an**

- AVS projetée à 65 ans : rente pleine ~2 200-2 400 CHF/mois (dépend du revenu moyen sur 44 ans)
- LPP (capital 180 kCHF aujourd'hui + 9 kCHF/an à 2 %/an pendant 25 ans) → ~**520 kCHF** de capital, soit ~1 730 CHF/mois en rente (4 %/an)
- 3a maximal 7 258 CHF/an à 3 %/an → ~**275 kCHF** → ~920 CHF/mois
- **Rente totale estimée ≈ 4 900 CHF/mois** soit ~59 % de taux de remplacement`,
  },
  faq: [
    {
      question: "La rente AVS est-elle imposable ?",
      answer:
        "Oui, intégralement. La rente AVS et la rente LPP sont additionnées au revenu imposable comme un salaire. Le 3e pilier A retiré fait l'objet d'une imposition séparée à taux réduit (environ 5-10 % selon le canton et le montant).",
    },
    {
      question: "Je suis née en 1965 : quel est mon âge de retraite ?",
      answer:
        "La réforme AVS21 relève progressivement l'âge de référence des femmes de 64 à 65 ans entre 2025 et 2028. Pour 2026, il est de 64 ans et 3 mois. Les hommes sont déjà à 65 ans. Un départ anticipé est possible dès 63 ans (avec réduction de rente), un report jusqu'à 70 ans (augmentation).",
    },
    {
      question: "Puis-je cumuler 3a avec des rachats LPP ?",
      answer:
        "Oui, les deux sont indépendants et tous deux déductibles. Les rachats LPP sont souvent plus efficaces fiscalement en fin de carrière (montants plus importants et TMI élevé) mais le capital est bloqué jusqu'à la retraite. Le 3a offre plus de flexibilité (achat immobilier, émigration, invalidité).",
    },
    {
      question: "Le taux de rente viagère 4 %/an est-il réaliste ?",
      answer:
        "C'est une approximation pour un retrait mensuel linéaire sur ~25 ans sans erosion. Les caisses de pensions appliquent en réalité un taux de conversion légal (6,8 % en 2026, en cours de réduction à 6 % selon la réforme LPP21) pour la part obligatoire LPP. Pour un capital 3a, 4 % reste une règle de prudence.",
    },
    {
      question: "Que se passe-t-il si j'ai cotisé moins de 44 ans ?",
      answer:
        "La rente AVS est proportionnellement réduite : chaque année manquante coûte 1/44 de la rente théorique. Les personnes arrivées en Suisse en cours de vie active peuvent avoir une rente partielle AVS, que complètent souvent des rentes de leur pays d'origine (conventions bilatérales).",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-suisse",
    "simulateur-epargne-suisse",
  ],
};
