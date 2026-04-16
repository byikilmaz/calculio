import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Salaire Brut Net Suisse 2026 | Calculio",
    description:
      "Convertissez votre brut en net suisse 2026 : AVS/AI/APG 5,3 %, AC 1,1 %, LPP par tranche d'âge, IFD + canton + commune (VD, GE, VS, FR, NE, JU, BE).",
  },
  h1: "Calcul Salaire Brut Net Suisse 2026 — AVS, LPP & IFD",
  intro:
    "Estimez votre salaire net suisse à partir du brut en appliquant les taux 2026 : cotisations AVS/AI/APG, AC, LPP par tranche d'âge, IFD et impôts cantonaux/communaux. Cantons romands couverts.",
  explanation: {
    title: "Du brut au net en Suisse : les étapes 2026",
    body: `En Suisse, la transformation du **brut annuel** en **net à payer** passe par trois strates : les **cotisations sociales obligatoires**, la **prévoyance professionnelle (LPP)** et enfin les **impôts** (fédéral direct + cantonal + communal).

**1. AVS / AI / APG (1er pilier)**

Tout salarié verse **5,3 %** de son salaire brut à l'AVS (vieillesse et survivants), AI (invalidité) et APG (allocations pertes de gain). Ce taux s'applique sans plafond. L'employeur double la cotisation (5,3 % de son côté), soit **10,6 %** au total. Base légale : LAVS, art. 5 et 8.

**2. Assurance chômage (AC / LACI)**

La cotisation AC est de **1,1 %** du salaire brut, plafonnée à **148 200 CHF/an** (2026). Au-delà, aucune cotisation AC n'est prélevée (la surcotisation solidarité a été supprimée en 2023).

**3. 2e pilier — LPP obligatoire**

La LPP couvre le salaire **coordonné** (brut − déduction de coordination **26 460 CHF**), plafonné à **90 720 CHF**. Les **taux légaux minimaux** dépendent de l'âge :

- **25-34 ans** : 7 %
- **35-44 ans** : 10 %
- **45-54 ans** : 15 %
- **55-64 ans** : 18 %

La cotisation est partagée **50/50** entre employeur et salarié (convention usuelle, certains plans sont plus généreux côté employeur).

**4. Impôt fédéral direct (IFD)**

L'IFD 2026 applique un barème progressif : nul en dessous de ~**15 200 CHF** (célibataire), **11,5 %** de taux marginal plafond. Les couples mariés ont un barème séparé avec effet de splitting implicite. Déduction enfant : **6 700 CHF** par enfant.

**5. Impôt cantonal et communal**

Chaque canton romand (VD, GE, VS, FR, NE, JU, BE) applique son barème sur le revenu imposable. La charge totale = **impôt cantonal de base × coefficient cantonal** (ex. Vaud 154,5 %, Genève 100 %, Jura 285 %) + **impôt cantonal de base × coefficient communal** (moyenne ≈ 75 % de la base cantonale).

**Ordre de grandeur 2026 — célibataire Vaud**

- Brut **7 500 CHF/mois × 13 = 97 500 CHF/an** → net environ **78-80 kCHF/an** (≈ 6 100 CHF/mois en moyenne)
- Brut **10 000 CHF/mois × 13 = 130 000 CHF/an** → net environ **98-100 kCHF/an**

Ces chiffres **excluent** l'impôt à la source applicable aux non-résidents, les rachats LPP et les contributions au 3e pilier A (déductibles jusqu'à **7 258 CHF** en 2026).`,
  },
  faq: [
    {
      question: "Pourquoi mon salaire est-il souvent payé en 13 mensualités ?",
      answer:
        "Le 13e salaire est une convention largement répandue en Suisse (obligatoire dans la plupart des CCT). Le calculateur par défaut suppose 13 versements quand vous indiquez un brut mensuel, ce qui donne le brut annuel réel.",
    },
    {
      question: "Les taux LPP indiqués sont-ils les minimaux légaux ?",
      answer:
        "Oui. Les taux 7 % / 10 % / 15 % / 18 % correspondent aux bonifications de vieillesse LPP obligatoires de la loi fédérale. De nombreuses caisses de pensions offrent des taux supérieurs (plans surobligatoires), ce qui augmente la cotisation mais renforce la retraite.",
    },
    {
      question: "Puis-je utiliser ce simulateur pour l'impôt à la source ?",
      answer:
        "Non. L'impôt à la source s'applique aux travailleurs non-résidents ou sans permis C. Il suit un barème unifié par canton (ex. VD barème A, B, C, H) qui intègre déjà les déductions moyennes. Ce calculateur simule la taxation ordinaire par déclaration, pour résidents avec permis C ou suisses.",
    },
    {
      question: "Comment choisir le coefficient communal ?",
      answer:
        "Chaque commune vaudoise, genevoise, valaisanne, etc. fixe son propre coefficient (aussi appelé taux d'impôt communal). La valeur par défaut proposée est la moyenne cantonale (≈ 75 % de l'impôt cantonal de base). Pour un calcul exact, consultez le site de votre commune ou l'administration fiscale cantonale.",
    },
    {
      question: "Le 3e pilier A est-il inclus ?",
      answer:
        "Non, ce simulateur calcule le brut→net de base. Un versement 3a réduit votre revenu imposable (déduction intégrale jusqu'à 7 258 CHF en 2026 pour les salariés affiliés LPP). Utilisez notre simulateur d'épargne suisse pour chiffrer cet avantage fiscal.",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu-suisse",
    "calculateur-retraite-suisse",
  ],
};
