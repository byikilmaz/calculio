import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Salaire Brut Net Luxembourg 2026 | Calculio",
    description:
      "Convertissez votre salaire brut en net au Luxembourg 2026 : cotisations CCSS (pension 8 %, maladie 3,05 %, dépendance 1,4 %) + impôt par classe + fonds emploi.",
  },
  h1: "Calcul Salaire Brut Net Luxembourg 2026 — CCSS & Impôt par Classe",
  intro:
    "Estimez votre salaire net luxembourgeois : cotisations CCSS (pension 8 %, maladie-espèces 2,8 %, soins 0,25 %, dépendance 1,4 %), impôt sur le revenu selon classe 1 / 1a / 2, et fonds pour l'emploi 7 %.",
  explanation: {
    title: "Du brut au net au Luxembourg : les étapes 2026",
    body: `Au Luxembourg, passer du **salaire brut** au **net** implique trois blocs : les **cotisations CCSS**, l'**impôt sur le revenu** par classe et la **majoration fonds emploi** de 7 %.

**1. Cotisations sociales CCSS — part salarié 2026**

- **Assurance pension** : **8,00 %** (plafonnée à 5× SSM = 162 480 €/an)
- **Maladie en espèces** : **2,80 %**
- **Maladie soins de santé** : **0,25 %**
- **Contribution dépendance** : **1,40 %** sur revenu imposable (après abattement SSM/4)
- **Total part salarié** ≈ **12,45 %** du brut

L'employeur double ces cotisations, portant le coût total sécurité sociale à ~25 % du brut. Source : **ccss.lu**.

**2. Impôt sur le revenu — barème progressif 23 tranches 2026**

Le barème luxembourgeois indexé va de **0 %** (jusqu'à 12 438 €) à **42 %** (au-delà de 234 870 €). 23 paliers intermédiaires, forte progressivité entre 22 k€ et 50 k€.

**Classes d'impôt** :
- **Classe 1** : célibataire sans enfant
- **Classe 1a** : monoparental, veuf(ve) ou > 64 ans — barème allégé
- **Classe 2** : marié en splitting — le revenu est **divisé par 2**, l'impôt calculé puis multiplié par 2 (avantage fiscal substantiel)

**3. Fonds pour l'emploi — majoration de l'impôt**

Ancien "impôt de solidarité" : **7 %** de l'IR pour revenu ≤ 150 k€ (célib.) / 300 k€ (marié). **9 %** au-delà. Source : **impotsdirects.public.lu**.

**4. Crédit d'impôt salarié (CIS)**

Salarié : **600 €/an**. Monoparental (CIM) : **2 505 €/an**. Indépendant (CII) : **600 €/an**.

**Ordre de grandeur — classe 1 célibataire Luxembourg ville**

- **Brut 75 000 €/an** → cotisations ~9 100 € + impôt ~13 800 € + fonds emploi ~970 € = **net ≈ 51 100 €/an** (~4 260 €/mois)
- **Brut 100 000 €/an** → net ≈ **65 000-66 000 €/an** (~5 430 €/mois)
- Taux de prélèvement effectif ≈ **32-35 %**

**Convention 13e mois** : courante dans de nombreux secteurs. Le brut mensuel affiché est souvent × 13 pour obtenir le brut annuel réel.`,
  },
  faq: [
    {
      question: "Quelle est la différence entre classe 1, 1a et 2 ?",
      answer:
        "La classe 1 est le barème standard (célibataire sans enfant). La classe 1a concerne les monoparentaux, veufs et personnes > 64 ans : un abattement supplémentaire allège l'impôt. La classe 2 (marié) applique le splitting allemand : le revenu du couple est divisé par 2, l'impôt calculé sur cette moitié, puis × 2. L'économie peut atteindre 10-20 % vs classe 1 double.",
    },
    {
      question: "Suis-je frontalier ? Quelles conséquences ?",
      answer:
        "Un frontalier travaille au Luxembourg mais réside en France, Belgique ou Allemagne. Pour bénéficier de la classe 2 (couple), au moins 90 % des revenus mondiaux du ménage doivent être imposés au Luxembourg. Sinon, imposition en classe 1 quelle que soit la situation matrimoniale. Les cotisations CCSS restent identiques.",
    },
    {
      question: "Qu'est-ce que la contribution dépendance ?",
      answer:
        "Créée en 1999, la contribution dépendance finance les prestations de dépendance (aide aux personnes âgées et handicapées). Taux : 1,4 % sur le revenu imposable après abattement SSM/4 (~677 €/mois). S'applique même aux retraités.",
    },
    {
      question: "Le 13e mois est-il obligatoire ?",
      answer:
        "Non, mais il est conventionnel dans la majorité des secteurs (finance, industrie, public). Certaines entreprises versent une 13e ou 14e mensualité au titre du gratification de fin d'année. Votre contrat de travail précise le montant annuel brut.",
    },
    {
      question: "Les 3e pilier et contributions LPP sont-elles incluses ?",
      answer:
        "Non, ce simulateur calcule le brut→net standard. La prévoyance complémentaire (art. 111bis LIR) est déductible jusqu'à 3 200 €/an et réduit le revenu imposable. Utilisez notre simulateur d'épargne Luxembourg pour chiffrer l'économie fiscale du 3e pilier.",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu-luxembourg",
    "calculateur-pension-luxembourg",
    "simulateur-epargne-luxembourg",
  ],
};
