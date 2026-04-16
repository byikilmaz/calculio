import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Plus-Value Immobilière Suisse 2026 | Calculio",
    description:
      "Impôt sur les gains immobiliers 2026 : barème dégressif cantonal (VD 30→7 %, GE 50→0 %, VS, FR, NE, JU, BE). Différé si remploi résidence.",
  },
  h1: "Calcul Plus-Value Immobilière Suisse 2026 — IGI Cantonal",
  intro:
    "Estimez l'impôt sur les gains immobiliers suisse selon votre canton et la durée de détention. Barèmes cantonaux officiels, déductions travaux, différé pour remploi.",
  explanation: {
    title: "L'impôt sur les gains immobiliers (IGI) en Suisse",
    body: `La plus-value dégagée à la vente d'un immeuble est soumise à un **impôt spécial cantonal** — **pas d'impôt fédéral**. Chaque canton fixe son propre barème, le plus souvent **dégressif selon la durée de détention** pour décourager la spéculation.

**Calcul de la plus-value imposable**

    Plus-value = Prix de vente − Prix d'acquisition − Frais d'acquisition − Travaux à plus-value

Sont **déductibles** :

- **Frais d'acquisition** (droits de mutation, émoluments notaire, frais de courtage à l'achat)
- **Travaux à plus-value** (agrandissement, rénovation lourde majorant la valeur ; exclut l'entretien courant déjà déduit chaque année)

**Barèmes dégressifs cantonaux 2026 (simplifiés)**

| Canton | < 2 ans | 5-10 ans | 15-20 ans | > 25 ans |
|--------|---------|----------|-----------|----------|
| **Vaud** | 30 % | 18→14 % | 11→9 % | 7 % |
| **Genève** | 50 % | 30→15 % | 10 % | **0 %** (exonéré) |
| **Valais** | 48 % | 22-16 % | 12 % | 8 % |
| **Fribourg** | 36 % | 20-14 % | 10 % | 6 % |
| **Neuchâtel** | 40 % | 22-15 % | 10 % | 5 % |
| **Jura** | 40 % | 20 % | — | 8 % |
| **Berne** | 40 % | 20-14 % | 10 % | 5 % |

Genève est particulièrement incitatif à la longue détention : **exonération totale après 25 ans**.

**Différé d'imposition pour remploi**

Si vous réinvestissez le produit de la vente dans **une nouvelle résidence principale** (en Suisse, dans un délai d'environ 2-4 ans selon canton), l'imposition est **différée** : la plus-value "suit" le nouveau bien et ne sera imposée qu'à la revente ultérieure, cumulativement. Condition : usage **personnel** des deux biens.

**Exemple — vente à Lausanne, détention 8 ans**

- Prix achat : 700 000 CHF ; frais acquisition : 35 000 CHF ; travaux : 40 000 CHF
- Prix vente : 950 000 CHF
- Plus-value brute : 950 000 − 700 000 − 35 000 − 40 000 = **175 000 CHF**
- Taux Vaud 8 ans : **14 %**
- Impôt = 175 000 × 14 % = **24 500 CHF**`,
  },
  faq: [
    {
      question: "Les travaux d'entretien sont-ils déductibles ?",
      answer:
        "Non : seuls les travaux dits 'à plus-value' (transformation, agrandissement, rénovation majorant la valeur) sont déductibles ici. Les travaux d'entretien (peinture, remplacement d'appareils, etc.) ont déjà été déduits chaque année du revenu dans votre déclaration d'impôt.",
    },
    {
      question: "Combien de temps dois-je attendre pour l'exonération à Genève ?",
      answer:
        "À Genève, l'exonération totale intervient après 25 ans de détention continue. Entre 10 et 25 ans, le taux descend progressivement de 10 % à 0 %. C'est unique en Suisse romande — la plupart des autres cantons gardent un taux plancher de 5-8 %.",
    },
    {
      question: "Le différé de remploi s'applique-t-il toujours ?",
      answer:
        "Uniquement si les deux biens (celui vendu et celui acheté) sont utilisés comme résidence principale par le vendeur. Si vous vendez pour réinvestir dans du locatif ou une résidence secondaire, le remploi n'est pas admis et l'impôt est dû à la vente.",
    },
    {
      question: "Qui paie l'impôt — le vendeur ou l'acheteur ?",
      answer:
        "C'est le vendeur qui est redevable de l'impôt sur les gains immobiliers. En pratique, le notaire retient souvent le montant sur le prix de vente à titre de sûreté jusqu'à la taxation définitive par l'administration cantonale.",
    },
    {
      question: "Puis-je déduire les frais de courtage à la vente ?",
      answer:
        "Oui : les frais de vente (commission de courtier, publicité, frais notaire à la charge du vendeur) sont déductibles du prix de vente au même titre que les frais d'acquisition étaient déductibles du prix d'achat. Ajoutez-les à votre ligne 'frais d'acquisition' dans le calculateur pour une approximation.",
    },
  ],
  relatedSlugs: [
    "calcul-frais-notaire-suisse",
    "simulateur-pret-hypothecaire-suisse",
  ],
};
