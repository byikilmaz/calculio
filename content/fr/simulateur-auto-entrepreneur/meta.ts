import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Auto-Entrepreneur 2026 | Calculio",
    description:
      "Calculez gratuitement vos cotisations URSSAF et revenu net micro-entreprise 2026 : vente, prestations BIC/BNC, versement libératoire IR.",
  },
  h1: "Simulateur Charges Auto-Entrepreneur 2026",
  intro:
    "Évaluez instantanément vos cotisations sociales, le versement libératoire de l'IR et votre revenu net de micro-entrepreneur selon votre type d'activité et votre chiffre d'affaires.",
  explanation: {
    title: "Comment fonctionnent les charges micro-entreprise en 2026 ?",
    body: `Le régime **micro-entreprise** (ex auto-entrepreneur) offre une fiscalité simplifiée calculée directement sur le chiffre d'affaires (CA), sans déduction de charges réelles. Les taux de cotisations sociales et les plafonds diffèrent selon la nature de l'activité.

**Taux de cotisations sociales 2026 (URSSAF)**

- **Vente de marchandises (BIC)** : **12,3 %** du CA — plafond **188 700 €**
- **Prestations de services commerciaux / artisanaux (BIC)** : **21,2 %** du CA — plafond **77 700 €**
- **Prestations de services (BNC)** : **25,6 %** du CA (+1 pt au 01/01/2026) — plafond **77 700 €**
- **Profession libérale CIPAV** : **23,2 %** du CA — plafond **77 700 €**

Ces cotisations couvrent la maladie-maternité, les indemnités journalières, la CSG-CRDS, la retraite de base et complémentaire, l'invalidité-décès et les allocations familiales. Elles sont déclarées **mensuellement ou trimestriellement** sur autoentrepreneur.urssaf.fr.

**Le versement libératoire de l'IR (VFL)**

Si votre Revenu Fiscal de Référence (RFR) N−2 est inférieur à **29 315 € par part** (2024 pour 2026), vous pouvez opter pour le versement libératoire : vous réglez l'impôt sur le revenu en même temps que les cotisations sociales, à taux fixe :

- **Vente (BIC)** : 1 %
- **Prestations BIC** : 1,7 %
- **Prestations BNC et libérale** : 2,2 %

Cette option est intéressante si vous êtes imposable. Si vous êtes non-imposable, elle coûte plus cher que l'imposition classique (abattement + barème progressif).

**L'imposition classique (sans VFL)**

Sans VFL, votre revenu imposable est calculé par l'administration en appliquant un **abattement forfaitaire pour frais professionnels** :

- **Vente (BIC)** : **71 %** d'abattement
- **Prestations BIC** : **50 %** d'abattement
- **Prestations BNC et libérale** : **34 %** d'abattement

Le solde (29 %, 50 % ou 66 % du CA selon l'activité) s'ajoute aux autres revenus du foyer et suit le barème progressif de l'IR.

**Autres charges à anticiper**

- La **CFE** (Cotisation Foncière des Entreprises) : forfaitaire environ 300 € par an à partir de la 2ᵉ année, variable selon la commune
- La **franchise de TVA** : vous ne facturez pas la TVA tant que le CA est inférieur à 85 000 € (vente) ou 37 500 € (services). Au-delà, vous devez facturer la TVA et la reverser.
- L'**assurance responsabilité civile professionnelle** souvent obligatoire
- L'**adhésion à un Centre de Gestion Agréé** (CGA) n'est plus requise depuis 2023

**Dépassement de plafond**

Si votre CA dépasse le plafond deux années consécutives, vous basculez automatiquement dans le régime **réel simplifié** (entreprise individuelle classique) l'année suivante, avec déclaration de résultat et charges sociales calculées sur bénéfices.`,
  },
  faq: [
    {
      question: "Dois-je choisir le versement libératoire de l'IR ?",
      answer:
        "Le VFL est intéressant si votre foyer fiscal est imposable : il fige votre imposition à un taux fixe (1 %, 1,7 % ou 2,2 %) sans progressivité. Si vous êtes non-imposable ou proche de la non-imposabilité, le régime classique avec abattement forfaitaire est plus avantageux. Option réservée aux RFR inférieurs à 29 315 € par part.",
    },
    {
      question: "Les cotisations sont-elles calculées sur le CA encaissé ou facturé ?",
      answer:
        "Sur le CA encaissé. Vous déclarez uniquement les sommes effectivement perçues sur votre compte bancaire pendant la période (mois ou trimestre). Les factures impayées ne sont pas incluses. Attention : en cas d'avance client à régulariser, elles doivent être déclarées au moment de l'encaissement.",
    },
    {
      question: "Que se passe-t-il si je dépasse le plafond de CA ?",
      answer:
        "Vous restez dans le régime micro pendant l'année de dépassement et l'année suivante si le dépassement est ponctuel. Si le dépassement dure deux années consécutives, vous basculez au régime réel (entreprise individuelle). La franchise de TVA cesse dès que vous franchissez les seuils majorés (93 500 € vente / 41 250 € services).",
    },
    {
      question: "Dois-je payer la CFE en tant qu'auto-entrepreneur ?",
      answer:
        "Oui, à partir de la 2ᵉ année d'activité. La Cotisation Foncière des Entreprises est une taxe locale forfaitaire, environ 200 € à 600 € selon la commune et le CA. Vous êtes exonéré la première année et de manière permanente si votre CA est inférieur à 5 000 €.",
    },
    {
      question: "Puis-je cumuler micro-entreprise et salariat ?",
      answer:
        "Oui. Le cumul est possible avec un emploi salarié, sous réserve du respect de votre contrat de travail (clause d'exclusivité, devoir de loyauté). Vos cotisations micro sont indépendantes de vos cotisations salariales. Attention : le cumul peut avoir un impact sur vos droits chômage et indemnités journalières.",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu",
    "simulateur-salaire-brut-net",
    "simulateur-dividendes-salaire",
  ],
};
