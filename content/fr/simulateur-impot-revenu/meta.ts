import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Impôt sur le Revenu 2026 | Calculio",
    description:
      "Calculez gratuitement votre impôt sur le revenu 2026 selon le barème officiel. Quotient familial, parts fiscales et taux marginal inclus.",
  },
  h1: "Simulateur Impôt sur le Revenu 2026 — Gratuit",
  intro:
    "Estimez immédiatement votre impôt sur le revenu 2026 à partir du barème officiel publié par la DGFiP. Prise en compte des parts fiscales et du plafonnement du quotient familial.",
  explanation: {
    title: "Comment fonctionne l'impôt sur le revenu 2026 ?",
    body: `L'impôt sur le revenu (IR) en France est un impôt **progressif** : plus vos revenus augmentent, plus le taux d'imposition s'applique sur les tranches supérieures. Le barème 2026, voté en loi de finances 2026 (LF 2026, promulguée le 19 février 2026) et applicable aux revenus 2025, se compose de cinq tranches principales.

Les tranches du barème progressif 2026 sont :

- **Jusqu'à 11 600 €** : 0 %
- **De 11 601 € à 29 579 €** : 11 %
- **De 29 580 € à 84 577 €** : 30 %
- **De 84 578 € à 181 917 €** : 41 %
- **Au-delà de 181 917 €** : 45 %

Le calcul se fait en deux étapes : on divise d'abord le **revenu net imposable** par le nombre de parts du foyer fiscal (c'est le **quotient familial**), on applique le barème sur cette base, puis on multiplie le résultat par le nombre de parts. Cette mécanique avantage les foyers ayant des enfants ou des personnes à charge.

**Combien de parts avez-vous ?** Un célibataire compte pour 1 part, un couple marié ou pacsé pour 2 parts. Chacun des deux premiers enfants à charge ajoute une demi-part, le troisième enfant et les suivants ajoutent une part entière. Un parent isolé (case T) bénéficie d'une demi-part supplémentaire.

Le **plafonnement du quotient familial** limite l'avantage fiscal lié aux personnes à charge à **1 807 € par demi-part** supplémentaire en 2026. Au-delà de ce plafond, la réduction d'impôt est rabotée. Cela concerne principalement les foyers à revenus élevés avec plusieurs enfants.

Le **revenu net imposable** à renseigner dans notre simulateur correspond à votre salaire net après abattement de 10 % pour frais professionnels (ou frais réels), majoré de vos éventuels revenus fonciers, mobiliers imposables et autres BIC/BNC. C'est le montant figurant sur votre avis d'imposition, ligne "revenu net imposable".

Attention, ce simulateur ne prend pas en compte les **réductions et crédits d'impôt** (dons, emploi à domicile, PER, investissements Pinel/Denormandie, frais de garde d'enfants) ni la **Contribution Exceptionnelle sur les Hauts Revenus** (CEHR) qui s'applique au-delà de 250 000 € pour un célibataire. Pour une déclaration officielle, rendez-vous sur impots.gouv.fr.`,
  },
  faq: [
    {
      question: "Qu'est-ce que le revenu net imposable ?",
      answer:
        "Le revenu net imposable correspond à vos revenus nets (salaires, pensions, BIC, BNC, revenus fonciers) après déduction de l'abattement forfaitaire de 10 % pour frais professionnels ou des frais réels. C'est la base sur laquelle s'applique le barème de l'impôt. Il figure sur votre avis d'imposition précédent.",
    },
    {
      question: "Comment calculer mon nombre de parts fiscales ?",
      answer:
        "Célibataire : 1 part. Marié(e) ou pacsé(e) : 2 parts. Parent isolé : 1,5 part. Chaque enfant à charge ajoute 0,5 part (0,5 pour le premier, 0,5 pour le deuxième, puis 1 part entière à partir du troisième). Un enfant en situation de handicap ouvre droit à une demi-part supplémentaire.",
    },
    {
      question: "Qu'est-ce que le plafonnement du quotient familial ?",
      answer:
        "Pour éviter que les foyers à hauts revenus profitent trop fortement de l'avantage des parts, l'administration plafonne la réduction d'impôt à 1 807 € par demi-part supplémentaire en 2026. Si votre avantage théorique dépasse ce plafond, l'impôt est recalculé sans en tenir compte intégralement.",
    },
    {
      question: "Quelle différence entre taux marginal et taux moyen ?",
      answer:
        "Le taux marginal est le taux de la tranche la plus haute que vous atteignez (11 %, 30 %, 41 % ou 45 %). Le taux moyen est votre impôt total divisé par votre revenu imposable. Il est toujours inférieur au taux marginal à cause de la progressivité du barème.",
    },
    {
      question: "Ce simulateur remplace-t-il ma déclaration de revenus ?",
      answer:
        "Non. Il fournit une estimation précise du barème 2026 mais n'intègre pas les réductions et crédits d'impôt, la contribution exceptionnelle sur les hauts revenus (CEHR), les revenus exceptionnels soumis au quotient, ni les régimes spécifiques (micro-BIC, micro-foncier). Pour votre déclaration officielle, utilisez impots.gouv.fr.",
    },
  ],
  relatedSlugs: [
    "simulateur-salaire-brut-net",
    "simulateur-auto-entrepreneur",
    "simulateur-dividendes-salaire",
  ],
};
