import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calculateur Retraite Québec 2026 | Calculio",
    description:
      "Projetez votre retraite québécoise 2026 : rente RRQ max 1 433 $/mois, PSV 734 $/mois, SRG, REER plafond 32 490 $, CELI plafond 7 000 $, taux de remplacement.",
  },
  h1: "Calculateur Retraite Québec 2026 — RRQ, PSV, SRG, REER & CELI",
  intro:
    "Projetez votre revenu mensuel à la retraite au Québec en combinant les 4 piliers : RRQ (Régie des rentes), PSV fédérale, SRG pour bas revenus, REER déductible et CELI exonéré.",
  explanation: {
    title: "Les 4 sources de revenu de retraite au Québec 2026",
    body: `La retraite québécoise combine deux régimes publics **obligatoires** (RRQ + PSV) et deux régimes individuels **volontaires** (REER + CELI), avec le SRG en filet de sécurité.

**1. RRQ — Régime de rentes du Québec**

Géré par **Retraite Québec**, le RRQ remplace le RPC (CPP) fédéral pour les Québécois. Rente maximale à 65 ans 2026 : **1 433 $/mois** (≈ 17 200 $/an).

- Carrière pleine : ~40 ans de cotisations
- Départ avant 65 : pénalité **-0,6 %/mois** (donc -36 % à 60 ans)
- Départ après 65 : bonification **+0,7 %/mois** (donc +42 % à 70 ans)

**2. PSV — Pension de la sécurité de la vieillesse (fédérale)**

Versée par Service Canada dès **65 ans**, universelle (sans condition de cotisation). 2026 :

- **65-74 ans** : **734 $/mois** (8 808 $/an)
- **75+** : **808 $/mois** (9 696 $/an) depuis la bonification de 10 % (2022)

**Récupération (clawback)** : si votre revenu > **93 454 $**, la PSV est réduite de **15 %** par dollar au-delà, jusqu'à élimination totale vers 154 196 $ (2026).

**3. SRG — Supplément de revenu garanti (fédéral)**

Pour personnes à faible revenu, en plus de la PSV. Maximum :

- **Célibataire** : ~1 098 $/mois
- **Couple (chacun)** : ~661 $/mois

Disparaît dès que le revenu hors PSV dépasse un seuil (~22 000 $ célibataire).

**4. REER — Régime enregistré d'épargne-retraite**

- Déduction fiscale **18 % du revenu gagné**
- Plafond 2026 : **32 490 $/an**
- Imposition au retrait (TMI typiquement plus bas qu'à l'actif)
- Conversion obligatoire en FERR à 71 ans

**5. CELI — Compte d'épargne libre d'impôt**

- Plafond annuel 2026 : **7 000 $**
- Plafond cumulatif depuis 2009 : **102 000 $**
- **100 % exonéré** au retrait (pas d'impact PSV clawback)

**Exemple — couple 65 ans, 75 000 $ brut, REER 300 k, CELI 80 k**

- RRQ 1 400 $ + PSV 734 $ = **2 134 $/mois public**
- Retrait REER 4 %/an → 1 000 $/mois + impôt
- Retrait CELI 4 %/an → 267 $/mois exonéré
- **Total ≈ 3 400 $/mois** (taux de remplacement ~54 % — cible idéale 60-70 %)`,
  },
  faq: [
    {
      question: "Puis-je prendre ma RRQ à 60 ans ?",
      answer:
        "Oui, mais avec une pénalité permanente de -0,6 %/mois, soit -36 % à 60 ans. La rente maximum à 60 ans est donc ~917 $/mois au lieu de 1 433 $ à 65. Différer à 70 ans donne +42 % (≈ 2 035 $/mois). Décision à peser selon espérance de vie et besoins.",
    },
    {
      question: "Quelle différence entre REER et CELI après 65 ans ?",
      answer:
        "Le REER est imposable au retrait (augmente le revenu imposable et peut déclencher la récupération PSV). Le CELI est 100 % exonéré et n'affecte ni la PSV ni le SRG — privilégiez-le pour les dépenses variables à la retraite.",
    },
    {
      question: "Les régimes d'employeur (RPA, RPDB) sont-ils inclus ?",
      answer:
        "Non. Ce simulateur couvre les 4 piliers publics et REER/CELI. Si vous avez un RPA (régime de pension agréé), ajoutez sa rente mensuelle au revenu total estimé. Les cotisations RPA sont soustraites du plafond REER disponible (facteur d'équivalence).",
    },
    {
      question: "Puis-je cumuler RRQ + travail ?",
      answer:
        "Oui, mais tout nouveau revenu donne droit à une majoration annuelle du supplément au régime RRQ (environ 0,5 % de la rente par année travaillée après 65 ans). C'est un mécanisme peu connu mais avantageux pour qui poursuit une activité partielle.",
    },
    {
      question: "Le CELIAPP est-il inclus ?",
      answer:
        "Non, le CELIAPP (compte libre d'impôt pour premier achat) sert à l'achat immobilier et non à la retraite. Si vous ne l'utilisez pas pour acheter dans 15 ans, il se convertit en REER et entre alors dans votre calcul retraite.",
    },
  ],
  relatedSlugs: [
    "simulateur-epargne-quebec",
    "calcul-salaire-brut-net-quebec",
  ],
};
