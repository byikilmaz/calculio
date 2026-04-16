import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Impôt sur le Revenu Luxembourg 2026 | Calculio",
    description:
      "Calculez votre impôt luxembourgeois 2026 : barème 23 tranches (0 % à 42 %), classes 1/1a/2, fonds emploi 7 %, contribution dépendance 1,4 %.",
  },
  h1: "Simulateur Impôt sur le Revenu Luxembourg 2026 — Barème 23 Tranches",
  intro:
    "Estimez votre impôt sur le revenu au Luxembourg : barème progressif 23 tranches (0 % à 42 %), classes 1, 1a et 2 (splitting marié), fonds pour l'emploi 7 %, contribution dépendance 1,4 % et crédit CIS / CIM.",
  explanation: {
    title: "Calcul de l'impôt luxembourgeois 2026",
    body: `L'impôt sur le revenu des personnes physiques au Luxembourg est régi par la **Loi modifiée concernant l'impôt sur le revenu (LIR)**. Il applique un barème progressif à **23 tranches**, avec trois classes d'imposition et des majorations additionnelles.

**1. Le barème progressif 2026 (tranches principales)**

- **0 %** jusqu'à **12 438 €** (minimum exonéré)
- Puis progression fine par tranches de ~2 100 € jusqu'à **39 %** (entre 50 k€ et 110 k€)
- **40 %** entre 110 k€ et 165 k€
- **41 %** entre 165 k€ et 235 k€
- **42 %** au-delà de **234 870 €**

Le barème est **indexé** en 2026 (indexation automatique).

**2. Classes d'impôt**

- **Classe 1** : célibataire sans enfant
- **Classe 1a** : monoparental / veuf(ve) / personne > 64 ans (abattement supplémentaire 4 500 €)
- **Classe 2** : marié en **splitting** — le revenu est divisé par 2, l'impôt calculé puis × 2 (gain fiscal important)

**3. Fonds pour l'emploi (ex-impôt de solidarité)**

Majoration appliquée sur l'impôt :
- **7 %** pour revenu imposable ≤ 150 000 € (classe 1) / 300 000 € (classe 2)
- **9 %** au-delà de ces seuils

**4. Contribution dépendance**

**1,4 %** sur le revenu imposable, après abattement équivalent à **SSM/4 mensuel** (≈ 677 €/mois soit ~8 124 €/an). Finance les prestations de dépendance.

**5. Crédits d'impôt 2026**

- **CIS** (Crédit Impôt Salarié) : **600 €/an**
- **CIM** (Crédit Impôt Monoparental) : **2 505 €/an**
- **CII** (Crédit Impôt Indépendant) : **600 €/an**
- **CIR** (Crédit Impôt Retraité) : **300 €/an**

**Exemple — célibataire classe 1, revenu imposable 75 000 €**

- Base imposable après forfaits ≈ 74 000 €
- Impôt barème ≈ **14 500 €**
- CIS − 600 € → 13 900 €
- Fonds emploi 7 % ≈ 970 €
- Dépendance 1,4 % ≈ 920 €
- **Total ≈ 15 800 €** (taux moyen ≈ 21 %)`,
  },
  faq: [
    {
      question: "Quels sont les barèmes 2026 indexés ?",
      answer:
        "Le Luxembourg indexe automatiquement son barème d'impôt. Les 23 tranches s'étalent de 0 % (sous 12 438 €) à 42 % (au-delà de 234 870 €). Les paliers intermédiaires correspondent aux progressions par paliers de 2 151 € environ jusqu'à 50 000 €, puis plus larges ensuite.",
    },
    {
      question: "Comment fonctionne le splitting de la classe 2 ?",
      answer:
        "Pour un couple marié en classe 2, on additionne les revenus, on divise par 2, on calcule l'impôt sur cette moitié, puis on multiplie par 2. Si un conjoint gagne beaucoup plus que l'autre, le splitting lisse la progressivité et permet une économie pouvant dépasser 10 000 €/an sur hauts revenus.",
    },
    {
      question: "Suis-je éligible au crédit monoparental CIM ?",
      answer:
        "Le CIM (2 505 €/an en 2026) s'applique aux contribuables classés en classe 1a avec au moins un enfant à charge. Il est dégressif pour les revenus > 35 000 €. Ne pas confondre avec les bonis pour enfants versés séparément.",
    },
    {
      question: "Puis-je déduire mes cotisations CCSS ?",
      answer:
        "Oui : les cotisations pension (8 %), maladie-espèces (2,8 %) et maladie soins (0,25 %) sont entièrement déductibles du revenu brut pour obtenir le revenu imposable. La contribution dépendance (1,4 %) n'est pas déductible car elle s'ajoute à l'impôt.",
    },
    {
      question: "Les frontaliers ont-ils droit aux mêmes classes ?",
      answer:
        "Un frontalier (résident FR/BE/DE travaillant au LU) est imposé au Luxembourg sur ses revenus LU. Pour bénéficier de la classe 2, il doit faire la preuve que ≥ 90 % des revenus mondiaux du ménage sont imposés au LU. Sinon classe 1 par défaut.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-luxembourg",
    "simulateur-independant-luxembourg",
    "simulateur-epargne-luxembourg",
  ],
};
