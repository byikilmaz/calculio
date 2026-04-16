import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Frais de Notaire Suisse 2026 | Calculio",
    description:
      "Frais d'achat immobilier suisse 2026 : droits de mutation cantonaux (VD 2,2 %, GE 3 %, VS 1,5 %, FR 1,5 %, NE 3,3 %, JU 2,1 %, BE 1,8 %), émoluments, RF, TVA 8,1 %.",
  },
  h1: "Calcul Frais de Notaire Suisse 2026 — Achat Immobilier",
  intro:
    "Estimez le coût total d'acquisition d'un bien immobilier en Suisse romande : droits de mutation cantonaux, émoluments notaire, registre foncier et TVA 8,1 %.",
  explanation: {
    title: "Frais d'acquisition immobilière en Suisse : 4 postes",
    body: `L'achat d'un bien immobilier en Suisse génère des frais d'acte qui s'ajoutent au prix de vente, typiquement **3-5 % selon le canton**.

**1. Droits de mutation (impôt cantonal)**

C'est le poste principal. Chaque canton fixe son taux, parfois différencié selon la nature du bien ou du propriétaire :

| Canton | Taux 2026 |
|--------|-----------|
| **Vaud** | 2,2 % (droit simple) + émoluments jusqu'à 3,3 % |
| **Genève** | 3 % + émoluments |
| **Valais** | 1,5 % (résidence principale) à 2,5 % |
| **Fribourg** | 1,5 % + émoluments |
| **Neuchâtel** | 3,3 % (lods) |
| **Jura** | 2,1 % |
| **Berne** | 1,8 % |

Certains cantons (Zoug, Schwyz, Uri) ont supprimé les droits de mutation — mais ne sont pas en zone francophone.

**2. Émoluments notaire**

Le notaire rédige l'acte authentique, obligatoire pour tout transfert immobilier. Ses émoluments sont calculés selon un **tarif cantonal** :

- **Vaud** : environ 0,1-0,3 % du prix (tarif des frais, RS 211.1)
- **Genève** : 0,3-0,5 % (tarif fixé par l'Ordre)
- Autres cantons romands : 0,1-0,4 % en moyenne

**3. Frais registre foncier (RF)**

L'inscription du transfert et de l'hypothèque au **Registre Foncier** génère des frais d'émolument (~0,1-0,3 % selon canton).

**4. TVA 8,1 % sur les émoluments**

Depuis le 1er janvier 2024, le taux normal de TVA en Suisse est passé à **8,1 %** (avant 7,7 %). La TVA s'applique sur les émoluments notaire et certains frais de service ; les **droits de mutation** ne sont pas soumis à TVA (c'est un impôt, pas une prestation).

**Exemple — achat résidence principale 900 kCHF à Lausanne**

- Droits de mutation Vaud : 2,2 % × 900 000 = **19 800 CHF**
- Émoluments notaire (0,3 %) : **2 700 CHF**
- TVA 8,1 % sur émoluments : **219 CHF**
- Frais RF (0,2 %) : **1 800 CHF**
- **Total frais** : ≈ **24 500 CHF** (2,7 % du prix)
- **Coût total acquisition** : **924 500 CHF**

À ajouter : les frais de constitution de la cédule hypothécaire (~1,5-2 % du montant emprunté si nouvelle cédule).`,
  },
  faq: [
    {
      question: "Qui paie les frais de notaire — acheteur ou vendeur ?",
      answer:
        "En Suisse, les frais de notaire (acte et émoluments) sont en principe partagés par les deux parties, sauf convention contraire qui les fait généralement tous supporter par l'acheteur. Les droits de mutation cantonaux sont toujours à la charge de l'acheteur, sauf Valais où vendeur et acheteur se partagent (50/50) les lods.",
    },
    {
      question: "Les frais sont-ils déductibles fiscalement ?",
      answer:
        "Pour une résidence principale : non au moment de l'achat, mais ils s'ajoutent au prix d'acquisition pour calculer la plus-value à la revente (déductibles dans le calcul de l'impôt sur les gains immobiliers). Pour un immeuble de rendement : oui, intégralement amortissables.",
    },
    {
      question: "Les taux sont-ils réduits pour la résidence principale ?",
      answer:
        "Dans certains cantons seulement. Le Valais applique le taux réduit de 1,5 % pour la résidence principale (vs 2,5 % sinon). Vaud, Genève, Neuchâtel ne différencient pas. Fribourg et Berne offrent parfois des remises partielles sur justification.",
    },
    {
      question: "La cédule hypothécaire génère-t-elle des frais supplémentaires ?",
      answer:
        "Oui. La constitution d'une nouvelle cédule hypothécaire coûte environ 1,5-2 % du montant hypothéqué (droit d'enregistrement + émoluments notaire + RF). Si vous reprenez une cédule existante lors de l'achat, vous économisez ces frais — bien à négocier avec le vendeur.",
    },
    {
      question: "La TVA s'applique-t-elle sur le prix du bien ?",
      answer:
        "Non. La vente d'un immeuble existant est exclue de la TVA (art. 21 LTVA). Seule la construction neuve par un professionnel (promoteur) peut être optionnellement soumise à TVA sur accord des parties. Les biens d'occasion entre particuliers sont toujours hors TVA.",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-hypothecaire-suisse",
    "calcul-plus-value-immobiliere-suisse",
  ],
};
