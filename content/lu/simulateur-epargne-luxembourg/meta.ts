import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Épargne Luxembourg 2026 | Calculio",
    description:
      "Compte épargne classique vs 3e pilier art. 111bis : déduction 3 200 €/an, précompte 20 % (exonération < 1 500 €), intérêts composés et fiscalité retrait.",
  },
  h1: "Simulateur Épargne Luxembourg 2026 — Classique vs 3e Pilier",
  intro:
    "Comparez un compte épargne classique luxembourgeois (précompte 20 %, exonération 1 500 €/an) avec le 3e pilier art. 111bis (déduction 3 200 €/an) : intérêts composés et fiscalité au retrait.",
  explanation: {
    title: "L'épargne luxembourgeoise en 2026",
    body: `Le résident luxembourgeois dispose de **deux grandes familles** d'épargne individuelle : l'**épargne liquide** (compte bancaire, OPC) avec un précompte libératoire de 20 %, et l'**épargne-prévoyance** (art. 111bis LIR) à déduction fiscale plafonnée.

**1. Compte épargne classique**

- Rendement en 2026 : **1,5-3,5 %** sur comptes à terme ou obligations privées
- **Précompte libératoire 20 %** sur les intérêts (RELIBI) — prélevé à la source
- **Exonération 1 500 €/an** par personne sur intérêts bancaires
- Liquidité immédiate, souple mais peu optimisé fiscalement

**2. Épargne-prévoyance art. 111bis LIR**

Produit d'assurance-vie ou compte-épargne prévoyance dédié :
- **Déduction max 3 200 €/an** (indépendamment de l'âge depuis 2017)
- Versements **bloqués jusqu'à 60 ans minimum** (10 ans minimum de contrat)
- Sortie en **capital ou rente viagère**
- **Fiscalité retrait (art. 131 LIR)** :
  - **50 % du capital** taxé au **taux demi-global** (tmi/2)
  - **50 % du capital** taxé à **25 % flat**

**3. Comparaison chiffrée — 3 200 €/an × 25 ans, rendement 3 %**

**Compte classique** :
- Capital brut final : ≈ **121 500 €**
- Précompte 20 % sur intérêts (~44 000 €) : ≈ **−8 800 €**
- **Net ≈ 112 700 €**

**3e pilier** (même versements) :
- Capital brut final : ≈ **121 500 €**
- Économie fiscale cumulée au TMI 39 % : 25 × 3 200 × 39 % = **31 200 €**
- Au retrait (60 ans) :
  - 60 750 € × 19,5 % (demi tmi) = 11 846 €
  - 60 750 € × 25 % = 15 188 €
  - Fiscalité retrait : ~27 000 €
- **Net ≈ 125 700 € + 31 200 € économisés pendant la phase d'épargne**

**Conclusion** : le 3e pilier bat le compte classique de ≈ **40 000 €** sur 25 ans pour un TMI ≥ 30 %, au prix d'un blocage jusqu'à 60 ans.

**4. Autres véhicules**

- **PEPP** (Pan-European Personal Pension Product) : produit paneuropéen, frais plafonnés 1 %
- **Assurance-vie classique** : pas de déduction mais sortie en capital exonérée après 8 ans
- **OPC** : fiscalité selon type de fonds (distribution vs capitalisation)`,
  },
  faq: [
    {
      question: "Quel plafond pour la déduction 3e pilier au Luxembourg ?",
      answer:
        "Depuis la réforme 2017, le plafond est unique et fixe : 3 200 €/an par personne, quel que soit l'âge (contrairement à l'ancien barème progressif de 1 500-3 200 € par tranche d'âge). Les couples mariés en classe 2 peuvent déduire 6 400 € au total si les deux conjoints versent.",
    },
    {
      question: "Quand puis-je récupérer mon 3e pilier ?",
      answer:
        "Au plus tôt à 60 ans, et après 10 ans minimum d'ancienneté du contrat. Retrait anticipé possible pour maladie grave ou invalidité. La sortie peut se faire en capital (fiscalité art. 131) ou en rente viagère (imposée à 50 % comme pension classique).",
    },
    {
      question: "L'exonération 1 500 € sur intérêts vaut-elle par banque ?",
      answer:
        "Non, elle vaut par personne, toutes banques confondues. Vous devez déclarer les intérêts dépassant ce seuil dans votre déclaration fiscale. Au-delà, précompte libératoire 20 % (pas de double imposition ensuite). Couple marié : 1 500 € chacun = 3 000 € exonérés.",
    },
    {
      question: "Puis-je cumuler 3e pilier et prévoyance entreprise (2e pilier) ?",
      answer:
        "Oui. Le 2e pilier (régime complémentaire de pension entreprise, art. 31 LIR) est une déduction supplémentaire, indépendante du plafond 3 200 € du 3e pilier. Certaines entreprises financent le 2e pilier côté employeur — ce n'est pas imposable pour le salarié jusqu'à 20 % du salaire (avec cotisations patronales).",
    },
    {
      question: "Le 3e pilier convient-il aux petits revenus ?",
      answer:
        "Moins intéressant si votre TMI est < 20 % (économie fiscale faible). Pour un revenu ~30 k€ (TMI ~12-14 %), l'économie annuelle ne dépasse pas 450 €, à mettre en regard du blocage jusqu'à 60 ans. Une assurance-vie classique ou un OPC peuvent être plus adaptés.",
    },
  ],
  relatedSlugs: [
    "calculateur-pension-luxembourg",
    "simulateur-impot-revenu-luxembourg",
    "calcul-salaire-brut-net-luxembourg",
  ],
};
