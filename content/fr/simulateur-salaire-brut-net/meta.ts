import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Salaire Brut Net 2025 | Calculio",
    description:
      "Convertissez votre salaire brut en net en quelques secondes. Barème 2025 officiel, cotisations sociales détaillées, net imposable inclus.",
  },
  h1: "Simulateur Salaire Brut → Net 2025",
  intro:
    "Calculez instantanément votre salaire net à partir du brut selon les taux de cotisations 2025. Résultat détaillé avec CSG, CRDS et retraite complémentaire.",
  explanation: {
    title: "Comment passer du brut au net en 2025 ?",
    body: `En France, le salaire net correspond au salaire brut diminué des cotisations sociales salariales (sécurité sociale, retraite complémentaire AGIRC-ARRCO, CSG et CRDS). Pour un salarié non-cadre, les charges salariales représentent environ 22 % du salaire brut. Pour un cadre, ce taux monte à 25 % en raison de la cotisation APEC et de la tranche T2 plus élevée.

Les principales cotisations prélevées sur votre fiche de paie sont les suivantes :

- **Sécurité sociale vieillesse** : 6,90 % plafonnée (sur la tranche jusqu'au PASS) et 0,40 % déplafonnée (sur la totalité du salaire).
- **Retraite complémentaire AGIRC-ARRCO** : 3,15 % sur la tranche 1 (jusqu'au PASS) et 8,64 % sur la tranche 2 (au-delà du PASS et jusqu'à 8 PASS).
- **CEG (contribution d'équilibre général)** : 0,86 % T1, 1,08 % T2.
- **APEC** (cadres uniquement) : 0,024 %.
- **CSG déductible** : 6,80 % sur 98,25 % du brut (plafond à 4 PASS), puis 100 % du brut au-delà.
- **CSG non déductible** : 2,40 % sur la même base.
- **CRDS** : 0,50 % sur la même base.

Le plafond annuel de la sécurité sociale (PASS) en 2025 est fixé à **47 100 €** (soit 3 925 € par mois).

Le **net imposable** diffère du net à payer : il inclut la CSG non déductible et la CRDS. C'est ce montant qui est communiqué à l'administration fiscale pour le prélèvement à la source.`,
  },
  faq: [
    {
      question: "Quelle est la différence entre net à payer et net imposable ?",
      answer:
        "Le net à payer est la somme effectivement versée sur votre compte bancaire après toutes les cotisations. Le net imposable est le montant utilisé pour le calcul de l'impôt sur le revenu : il intègre la CSG non déductible (2,40 %) et la CRDS (0,50 %) qui sont prélevées mais restent imposables.",
    },
    {
      question: "Comment calculer rapidement le net à partir du brut ?",
      answer:
        "Pour une estimation rapide, vous pouvez multiplier le brut par 0,78 pour un non-cadre (charges ~22 %) ou par 0,75 pour un cadre (charges ~25 %). Pour un résultat précis, notre simulateur applique les taux officiels par tranche.",
    },
    {
      question: "Les charges sont-elles les mêmes pour tous les salariés ?",
      answer:
        "Non. Les cadres paient des cotisations supplémentaires : l'APEC (0,024 %) et une tranche T2 AGIRC-ARRCO plus élevée (8,64 %) sur la portion du salaire dépassant le PASS. Ils ont donc un taux de prélèvement global supérieur.",
    },
    {
      question: "Le prélèvement à la source est-il inclus dans le calcul ?",
      answer:
        "Non. Ce simulateur calcule le net avant impôt sur le revenu. Le prélèvement à la source s'applique ensuite au net imposable, selon votre taux personnalisé transmis par l'administration fiscale.",
    },
    {
      question: "Les taux de cotisations sont-ils à jour ?",
      answer:
        "Oui. Ce simulateur utilise les taux et plafonds officiels 2025 publiés par l'URSSAF et la Sécurité sociale. Les barèmes sont actualisés chaque année en janvier.",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu",
    "simulateur-auto-entrepreneur",
    "simulateur-dividendes-salaire",
  ],
};
