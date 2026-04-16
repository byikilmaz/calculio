import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Prêt Hypothécaire Suisse 2026 | Calculio",
    description:
      "Achat immobilier en Suisse 2026 : fonds propres min 20 % (10 % durs), charges théoriques ≤ 33 %, amortissement 2e rang 15 ans, test bancaire FINMA.",
  },
  h1: "Simulateur Prêt Hypothécaire Suisse 2026 — FINMA & ASB",
  intro:
    "Vérifiez que votre dossier hypothécaire respecte les règles prudentielles suisses : fonds propres, capacité financière, amortissement du 2e rang. Test bancaire au taux théorique 5 %.",
  explanation: {
    title: "Les règles du prêt hypothécaire suisse (FINMA / ASB 2026)",
    body: `Le crédit hypothécaire suisse obéit à un **cadre prudentiel strict** défini par la FINMA et l'Association suisse des banquiers (ASB), pensé pour la stabilité du système.

**1. Fonds propres minimaux : 20 %**

L'acquéreur doit apporter au moins **20 % du prix d'achat** en fonds propres. Ce seuil est intangible et uniforme sur tout le territoire.

**2. Fonds propres "durs" : 10 % minimum**

Au minimum **10 % du prix** doivent provenir de **fonds propres durs**, c'est-à-dire **hors 2e pilier (LPP)**. Sources acceptées : épargne, 3e pilier A, dons, héritage, titres, vente d'un bien. Le **retrait LPP anticipé** ne compte que pour les 10 % restants.

**3. Amortissement obligatoire (2e rang)**

L'hypothèque est scindée en deux tranches :

- **1er rang** : jusqu'à **66 % de la valeur du bien**, non amortissable obligatoirement
- **2e rang** : entre 66 % et 80 %, doit être **amorti linéairement en 15 ans** ou avant l'âge de la retraite (65 ans), la règle la plus courte s'applique

**4. Test bancaire : charges théoriques ≤ 33 % du revenu**

Avant d'octroyer le crédit, la banque calcule les **charges théoriques** :

- **Intérêts au taux théorique 5 %** (indépendant du taux réel du marché)
- **Entretien** : 1 % de la valeur du bien / an
- **Amortissement** du 2e rang

Si ces charges dépassent **33 % du revenu brut annuel**, la banque refuse le dossier — c'est la règle de la **tenue des charges** (ou "Tragbarkeit").

**Exemple — achat 900 000 CHF, ménage 180 000 CHF/an**

- Fonds propres requis : **180 000 CHF** (dont 90 000 durs)
- Hypothèque totale : **720 000 CHF**
- 1er rang 594 000 CHF, 2e rang 126 000 CHF → amortissement 8 400 CHF/an
- Charges théoriques : intérêts 5 % × 720 000 = 36 000 + entretien 9 000 + amort. 8 400 = **53 400 CHF/an**
- Ratio 53 400 / 180 000 = **29,7 %** ≤ 33 % → **dossier acceptable**

Avec un taux réel de 2 %, la mensualité effective est de **720 000 × 2 % / 12 + 8 400 / 12 ≈ 1 900 CHF/mois**.`,
  },
  faq: [
    {
      question: "Puis-je utiliser la totalité de mon 2e pilier pour l'apport ?",
      answer:
        "Non. Vous pouvez retirer ou nantir votre avoir LPP pour financer une résidence principale, mais cela ne compte que dans les 10 % supérieurs aux fonds propres durs. Au moins 10 % du prix doit toujours venir d'une autre source (épargne, 3a, donation, héritage).",
    },
    {
      question: "Le test à 5 % est-il obligatoire même si les taux sont bas ?",
      answer:
        "Oui. Le taux théorique de 5 % est un garde-fou macroprudentiel FINMA, indépendant du niveau réel du marché. Il simule un scénario de hausse durable et protège contre le risque de défaut en cas de remontée des taux.",
    },
    {
      question: "Combien de temps pour amortir le 2e rang ?",
      answer:
        "La tranche entre 66 % et 80 % de LTV doit être amortie en 15 ans maximum, ou jusqu'à l'âge ordinaire de la retraite (65 ans pour les hommes, 64 pour les femmes en 2026, alignement à 65 en cours). L'amortissement peut être direct (remboursement de capital) ou indirect (via 3e pilier A nanti).",
    },
    {
      question: "Le calcul inclut-il les impôts fonciers ?",
      answer:
        "Non. Les impôts fonciers, assurance bâtiment et éventuellement charges de copropriété sont supplémentaires et varient fortement selon le canton et la commune. Pour un budget complet, ajoutez environ 0,5-1 % de la valeur du bien par an.",
    },
    {
      question: "Qu'est-ce que la valeur locative ?",
      answer:
        "Si vous habitez votre bien, la Suisse vous impose sur une valeur locative fictive (revenu en nature). En contrepartie, les intérêts hypothécaires et les frais d'entretien sont déductibles. La réforme abolissant la valeur locative est en cours mais non effective en 2026.",
    },
  ],
  relatedSlugs: [
    "calcul-frais-notaire-suisse",
    "calcul-salaire-brut-net-suisse",
  ],
};
