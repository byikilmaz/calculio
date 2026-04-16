import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Impôt Revenu Suisse 2026 | Calculio",
    description:
      "Calculez votre impôt suisse 2026 : IFD (plafond 11,5 %), impôt cantonal VD/GE/VS/FR/NE/JU/BE avec coefficient, et commune. Célibataire, marié, enfants.",
  },
  h1: "Simulateur Impôt sur le Revenu Suisse 2026 — IFD + Canton",
  intro:
    "Estimez votre charge fiscale suisse 2026 selon votre canton romand : IFD fédéral, impôt cantonal avec son coefficient officiel et part communale. Barèmes célibataire et marié.",
  explanation: {
    title: "Comment fonctionne l'impôt sur le revenu en Suisse (2026)",
    body: `La fiscalité directe suisse suit le **principe de la triple souveraineté** : **Confédération** (IFD), **canton** et **commune** prélèvent chacun leur part sur le même revenu.

**Impôt fédéral direct (IFD) 2026**

Le barème LIFD applique une progression douce : nul jusqu'à ~**15 200 CHF** (célibataire) ou **30 800 CHF** (marié), puis grimpe jusqu'au **plafond constitutionnel de 11,5 %** au sommet. Art. 36 LIFD. Déductions principales :

- **Enfant à charge** : 6 700 CHF / enfant
- **Couple marié** : 2 800 CHF supplémentaires

**Impôt cantonal**

Chaque canton fixe son propre **barème de base** et son **coefficient** (multiplicateur appliqué à l'impôt de base) :

- **Vaud** : coefficient 154,5 %
- **Genève** : coefficient 100 % (intégré dans le barème)
- **Valais** : coefficient 155 %
- **Fribourg** : coefficient 100 %
- **Neuchâtel** : coefficient 141 %
- **Jura** : coefficient 285 %
- **Berne** : coefficient 302 %

**Impôt communal**

La commune applique **son propre coefficient** (moyenne observée ≈ 75 % de l'impôt cantonal de base). Lausanne 79 %, Genève-Ville 45,5 %, Sion 110 %, Neuchâtel-Ville 66 %.

**Splitting pour couples mariés**

La LIFD utilise un barème séparé pour les mariés (art. 36a) qui applique de facto un splitting d'environ 1,6-1,8 par rapport aux célibataires. Cela compense l'effet de la progressivité sur un revenu cumulé.

**Exemple 2026 Vaud**

- Revenu imposable 90 000 CHF célibataire à Lausanne → IFD ~**2 400 CHF**, cantonal+communal ~**15 000 CHF**, total ~**17 500 CHF** (≈ 19 %)
- Couple marié 150 000 CHF à Lausanne → IFD ~**4 500 CHF**, cantonal+communal ~**24 000 CHF**, total ~**28 500 CHF** (≈ 19 %)`,
  },
  faq: [
    {
      question: "Le calcul tient-il compte du 3e pilier A déductible ?",
      answer:
        "Non dans la version simple : vous devez déduire vous-même votre versement 3a (max 7 258 CHF en 2026) du revenu avant de saisir le revenu net imposable. Idem pour les rachats LPP, frais médicaux, primes d'assurance maladie, dons, etc.",
    },
    {
      question: "Pourquoi le coefficient Jura ou Berne paraît-il très élevé ?",
      answer:
        "Les cantons choisissent des bases de calcul différentes. Jura et Berne ont des barèmes de base faibles multipliés par des coefficients élevés (285 % / 302 %), tandis que Vaud et Valais ont des barèmes plus élevés avec coefficients modérés (~155 %). La charge finale est comparable à CAQ égal.",
    },
    {
      question: "L'impôt à la source est-il couvert ?",
      answer:
        "Non. L'impôt à la source (applicable aux travailleurs sans permis C) suit un barème unifié par canton et non la taxation ordinaire. Ce simulateur s'adresse aux résidents suisses, aux frontaliers quasi-résidents et aux titulaires du permis C.",
    },
    {
      question: "Comment déclarer un revenu accessoire indépendant ?",
      answer:
        "Additionnez-le au salaire net (après déductions AVS+LPP côté salarié) et déclarez le total en revenu imposable. Les cotisations AVS indépendant (10 % du bénéfice) et les charges sont déjà à déduire en amont.",
    },
    {
      question: "Les barèmes cantonaux sont-ils exacts pour ma commune ?",
      answer:
        "Les barèmes cantonaux utilisés sont officiels (estv.admin.ch, administrations cantonales). Le coefficient communal dépend de votre commune de domicile au 31 décembre. Le champ est ajustable : la valeur par défaut est la moyenne cantonale.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-suisse",
    "calculateur-retraite-suisse",
  ],
};
