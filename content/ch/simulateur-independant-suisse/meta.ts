import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Indépendant Suisse 2026 | Calculio",
    description:
      "Calcul indépendant suisse 2026 : AVS 10 % sur bénéfice, pas d'AC, 3a renforcé jusqu'à 36 288 CHF, IFD + canton. Raison individuelle et indépendants.",
  },
  h1: "Simulateur Indépendant Suisse 2026 — AVS 10 % & 3a Renforcé",
  intro:
    "Calculez votre net d'indépendant suisse : cotisation AVS 10 % sur bénéfice, absence d'assurance chômage, 3e pilier A renforcé, IFD et impôts cantonaux.",
  explanation: {
    title: "Être indépendant en Suisse : le régime fiscal et social 2026",
    body: `Le travailleur indépendant (raison individuelle ou société simple) est soumis à un régime social et fiscal spécifique, **différent du salarié**.

**1. AVS / AI / APG indépendant — taux plein 10 %**

L'indépendant paie **10 % de son bénéfice net** (AVS 8,1 % + AI 1,4 % + APG 0,5 %), soit **le double du salarié** qui partage la charge avec son employeur. Le calcul est effectué par la **caisse de compensation cantonale** sur la base de la dernière taxation disponible (décalage typique de 2-3 ans).

- **Seuil minimum** : revenu annuel < **514 CHF** → cotisation minimale forfaitaire
- **Barème dégressif réel** : 5,3 % sur les tout petits revenus, progression jusqu'à 10 % à partir d'environ **60 000 CHF** de bénéfice

**2. Pas d'assurance chômage (AC)**

Les indépendants ne cotisent **pas à l'AC** et n'ont **pas droit au chômage** en cas de cessation d'activité (sauf bref filet de sécurité LACI si reconversion salariée). Cela représente une économie immédiate de 1,1 % mais un risque financier en cas d'arrêt.

**3. LPP facultative + 3e pilier A renforcé**

L'indépendant n'est **pas soumis à la LPP obligatoire**, mais peut s'y affilier volontairement. En contrepartie, il peut verser un **3e pilier A renforcé** :

- **20 % du revenu net** de l'activité
- Plafonné à **36 288 CHF/an** en 2026
- Déduction intégrale du revenu imposable

**4. IFD + impôt cantonal + communal**

Le bénéfice net (après AVS et éventuelle LPP/3a) est ajouté aux autres revenus du contribuable et imposé selon les barèmes ordinaires vus au calculateur "Impôt sur le revenu Suisse".

**Exemple — Vaud, célibataire, bénéfice 110 kCHF**

- AVS indépendant : 10 % × 110 000 = **11 000 CHF**
- 3a renforcé max (20 % du reste) : min(36 288 ; 19 800) = 19 800 CHF versés, déductibles
- Bénéfice net imposable : 110 000 − 11 000 − 19 800 = **79 200 CHF**
- Après déductions personnelles : ~76 000 CHF → IFD ~**2 400 CHF** + cantonal/communal ~**12 500 CHF**
- **Revenu disponible net** : ~**63 300 CHF/an** (5 275 CHF/mois)
- Taux de prélèvement global : **42 %**`,
  },
  faq: [
    {
      question: "À partir de quel bénéfice dois-je m'inscrire à l'AVS ?",
      answer:
        "L'inscription comme indépendant auprès de la caisse de compensation est obligatoire dès le premier franc de bénéfice régulier. Une cotisation minimale forfaitaire (~514 CHF/an en 2026) s'applique sous le seuil bas ; elle monte en palier jusqu'au taux plein de 10 %.",
    },
    {
      question: "Dois-je affilier une caisse LPP ?",
      answer:
        "Non, l'affiliation LPP est facultative pour les indépendants. Elle est intéressante pour se constituer une retraite solide et bénéficier de rachats déductibles, mais nécessite des cotisations élevées. Alternative plus flexible : maximiser le 3a renforcé (20 % / 36 288 CHF).",
    },
    {
      question: "Que se passe-t-il si mon activité ne dégage pas de bénéfice ?",
      answer:
        "Vous restez redevable de la cotisation AVS minimale (514 CHF/an en 2026) qui compte pour votre année de cotisation. Un déficit peut être reporté sur les revenus futurs pour l'impôt mais n'efface pas l'AVS minimale.",
    },
    {
      question: "Puis-je cumuler emploi salarié et activité indépendante ?",
      answer:
        "Oui. Vous cotiserez AVS à 5,3 % sur votre salaire (+ 5,3 % employeur) et AVS à 10 % sur le bénéfice indépendant. Les plafonds LPP et 3a se cumulent aussi mais le 3a reste au plafond salarié (7 258 CHF) tant qu'on est affilié à une LPP par ailleurs.",
    },
    {
      question: "Dois-je facturer la TVA ?",
      answer:
        "Uniquement si votre chiffre d'affaires annuel dépasse 100 000 CHF (seuil 2026, art. 10 LTVA). En dessous, vous êtes dispensé. Le taux TVA normal suisse est de 8,1 % depuis 2024 (taux réduit 2,6 % pour denrées alimentaires, taux spécial hôtelier 3,8 %).",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu-suisse",
    "simulateur-epargne-suisse",
  ],
};
