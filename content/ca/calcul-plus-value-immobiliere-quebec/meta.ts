import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Plus-Value Immobilière Québec 2026 | Calculio",
    description:
      "Gain en capital sur revente immobilière : résidence principale exonérée, locatif/secondaire imposé à 50 % d'inclusion (retour au taux antérieur 2026).",
  },
  h1: "Calcul Plus-Value Immobilière Québec 2026 — Gain en Capital",
  intro:
    "Estimez l'impôt sur la revente d'un immeuble au Québec : exonération totale pour la résidence principale, inclusion 50 % pour les biens locatifs et secondaires (taux revenu au barème antérieur en 2026).",
  explanation: {
    title: "Gain en capital immobilier : règles 2026",
    body: `La plus-value immobilière s'appelle **gain en capital** au Canada. Deux régimes s'appliquent selon la nature du bien.

**1. Résidence principale — exonération totale**

Si le bien était votre **résidence principale** pendant toutes les années de détention, le gain est **100 % exonéré** (principal residence exemption). Une seule résidence principale par famille par année peut être désignée.

**2. Locatif ou secondaire — 50 % imposable**

Pour les autres biens (chalet, condo locatif, flip immobilier à des fins d'investissement), le gain est imposé au **taux d'inclusion 50 %** — c'est-à-dire que **50 % du gain** s'ajoute à votre revenu et est imposé au **taux marginal combiné** fédéral + Québec.

*Note 2026* : le taux d'inclusion **était à 66,7 %** sur la portion > 250 000 $ (Trudeau, juin 2024), mais il est **revenu à 50 %** en 2026 après élection Carney.

**Calcul du gain brut**

\`Gain brut = (Prix vente - Frais vente) - (Prix achat + Frais achat + Améliorations)\`

- **Frais vente** : commission courtier (5-6 %), certificat localisation, notaire vendeur, pénalité hypothécaire
- **Frais achat** : droits de mutation (taxe de bienvenue), notaire acheteur, inspection
- **Améliorations capitalisées** : rénovations majeures (cuisine, toiture, agrandissement), **pas** les réparations courantes

**Gain imposable = Gain brut × 50 %**

Ce montant s'ajoute au revenu total de l'année.

**Exemple — vente 600 000 $, achat 400 000 $, locatif 10 ans**

- Prix vente 600 000 $ - frais 30 000 $ = **570 000 $**
- Prix achat 400 000 $ + frais 12 000 $ + améliorations 25 000 $ = **437 000 $**
- Gain brut = **133 000 $**
- Gain imposable (50 %) = **66 500 $**
- À 85 000 $ revenu autre → revenu total 151 500 $
- Taux marginal combiné ≈ 45 % → **impôt ~30 000 $**
- Net vendeur ≈ 570 - 400 - 30 = **140 000 $**

**Attention au changement d'usage**

Transformer une résidence principale en locatif (ou inverse) déclenche une **disposition réputée** à la juste valeur marchande — possibilité de cristalliser un gain imposable. Consultez un fiscaliste avant toute conversion.`,
  },
  faq: [
    {
      question: "Comment désigner la résidence principale en cas de 2 biens ?",
      answer:
        "Vous pouvez désigner l'une des deux comme principale pour chaque année, en visant à couvrir celle qui a le plus pris de valeur. La désignation se fait lors de la vente, via le formulaire T2091 (fédéral) et TP-274 (QC). Règle « +1 » : une année bonus est toujours ajoutée.",
    },
    {
      question: "Les rénovations courantes sont-elles déductibles ?",
      answer:
        "Non. Réparations, peinture, entretien régulier sont des dépenses courantes, à déduire chaque année si le bien est locatif. Seules les améliorations capitalisées (durée de vie > 1 an, augmentation de valeur) s'ajoutent au prix de revient du gain en capital.",
    },
    {
      question: "Qu'est-ce que la règle anti-flip ?",
      answer:
        "Depuis 2023, la vente dans les 12 mois suivant l'achat est présumée être un revenu d'entreprise (100 % imposable, pas 50 %). Des exceptions s'appliquent (décès, divorce, perte d'emploi, naissance). Ce simulateur ne couvre pas ce régime — consultez un fiscaliste si ce cas s'applique.",
    },
    {
      question: "Le taux d'inclusion a-t-il vraiment changé en 2026 ?",
      answer:
        "Oui. Après un bref passage à 66,7 % (juin 2024 à 2025) sur la portion > 250 000 $/an, le gouvernement Carney a rétabli le taux unique de 50 % en 2026, dans le cadre de la simplification fiscale. Le simulateur utilise ce nouveau 50 % uniforme.",
    },
    {
      question: "Dois-je déclarer même si c'est ma résidence principale ?",
      answer:
        "Oui depuis 2016 : même exonérée, la vente de la résidence principale doit être déclarée (T2091 / TP-274). Oublier cette déclaration peut retirer l'exemption pour une partie des années — pénalité cher payée.",
    },
  ],
  relatedSlugs: [
    "calcul-droits-mutation-quebec",
    "simulateur-pret-hypothecaire-quebec",
  ],
};
