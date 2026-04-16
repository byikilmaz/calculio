import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Impôt Revenu Québec 2026 | Calculio",
    description:
      "Calculez votre impôt fédéral + Québec 2026 avec abattement -16,5 % : 5 tranches fédérales + 4 tranches québécoises, crédits non remboursables, taux marginal combiné.",
  },
  h1: "Simulateur Impôt sur le Revenu Québec 2026 — Fédéral & QC",
  intro:
    "Estimez l'impôt fédéral et l'impôt du Québec sur votre revenu imposable avec les barèmes officiels 2026 : 5 tranches ARC + 4 tranches Revenu Québec, abattement Québec -16,5 %, crédits personnels de base, conjoint et enfants.",
  explanation: {
    title: "Deux ordres de gouvernement, une seule déclaration intégrée",
    body: `Au Québec, vous produisez **deux déclarations** : la **T1 fédérale** à l'ARC et la **TP-1 québécoise** à Revenu Québec. Chaque ordre de gouvernement applique son propre barème progressif, puis ses propres crédits.

**Barème fédéral 2026** (ARC) :

- **15 %** sur les premiers **57 375 $**
- **20,5 %** de 57 375 à 114 750 $
- **26 %** de 114 750 à 177 882 $
- **29 %** de 177 882 à 253 414 $
- **33 %** au-delà de 253 414 $

**Abattement Québec** : l'impôt fédéral est ensuite **réduit de 16,5 %** pour les résidents du Québec (loi fédérale, compensation des transferts).

**Barème du Québec 2026** (Revenu Québec) :

- **14 %** sur les premiers **53 255 $**
- **19 %** de 53 255 à 106 495 $
- **24 %** de 106 495 à 129 590 $
- **25,75 %** au-delà de 129 590 $

**Crédits personnels de base 2026**

- Fédéral : **16 129 $** × 15 % = **2 419 $** de crédit
- Québec : **18 571 $** × 14 % = **2 600 $** de crédit

**Taux marginal combiné effectif** : si votre dernier dollar est dans la tranche fédérale 29 % et QC 25,75 %, le taux marginal réel est :

\`29 % × (1 - 16,5 %) + 25,75 % = 24,2 % + 25,75 % = 49,95 %\`

**Exemple — 100 000 $ revenu imposable célibataire**

- Impôt fédéral brut ≈ 17 686 $
- Crédits fédéraux ≈ 2 419 $ → 15 267 $
- Abattement Québec (-16,5 %) = 2 519 $ → **fédéral net ≈ 12 748 $**
- Impôt Québec ≈ 16 316 $ - crédits 2 600 $ ≈ **13 716 $**
- **Total ≈ 26 464 $** (taux moyen 26,5 %, marginal combiné 37,12 %)`,
  },
  faq: [
    {
      question: "Pourquoi le fédéral est-il réduit de 16,5 % au Québec ?",
      answer:
        "L'abattement Québec existe depuis 1966 : le gouvernement fédéral reverse 16,5 % de l'impôt fédéral aux Québécois pour compenser des programmes provinciaux financés de manière autonome (santé, aide sociale, retraite). C'est équivalent à une subvention indirecte au régime fiscal québécois.",
    },
    {
      question: "Mon taux marginal est-il vraiment ~50 % à haut revenu ?",
      answer:
        "Oui, un résident du Québec gagnant > 253 414 $ paie 27,56 % fédéral effectif (33 % × 0,835) + 25,75 % QC = 53,3 % sur chaque dollar additionnel — un des taux marginaux les plus élevés d'Amérique du Nord.",
    },
    {
      question: "Le simulateur couvre-t-il les crédits pour enfants ?",
      answer:
        "Oui, il intègre un crédit fédéral (Canada Child Benefit approximatif via montant de base) et le crédit Québec pour enfant mineur à charge, appliqués aux deux barèmes. Pour le détail complet (garde, adoption, études), consultez canada.ca ou revenuquebec.ca.",
    },
    {
      question: "Et les cotisations RRQ, AE, RQAP ?",
      answer:
        "Elles sont des prélèvements sociaux, pas de l'impôt. Utilisez notre calcul salaire brut-net Québec pour l'ensemble. Ici on part du revenu imposable déjà net de ces cotisations.",
    },
    {
      question: "Puis-je utiliser ce simulateur pour un revenu de dividendes ?",
      answer:
        "Non, les dividendes déclarés ou ordinaires requièrent une majoration (15 % ou 38 %) et des crédits d'impôt spécifiques. Voyez notre simulateur Dividendes vs Salaire Québec pour ce calcul.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-quebec",
    "simulateur-dividendes-salaire-quebec",
  ],
};
