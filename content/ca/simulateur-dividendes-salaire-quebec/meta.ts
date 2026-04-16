import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Dividendes vs Salaire Québec 2026 | Calculio",
    description:
      "SPCC Québec 2026 : comparez dividende ordinaire (majoration 15 %), déterminé (38 %) vs salaire. Impôt corpo 12,2 % + personnel, intégration fiscale.",
  },
  h1: "Simulateur Dividendes vs Salaire Québec 2026 — Rémunération SPCC",
  intro:
    "Optimisez la rémunération de votre SPCC (société privée sous contrôle canadien) au Québec : compare salaire (déductible, RRQ/AE), dividende ordinaire et dividende déterminé avec intégration fiscale corpo + perso.",
  explanation: {
    title: "Salaire vs Dividende dans une SPCC québécoise",
    body: `Un actionnaire-dirigeant de **SPCC** (société privée sous contrôle canadien) peut se rémunérer selon deux grands régimes — **salaire** ou **dividende** — avec un troisième axe combiné. Le choix impacte l'impôt total corpo + perso, les cotisations sociales, et les droits RRQ/REER.

**1. Salaire — dépense déductible**

- **Déductible** au niveau corporatif → réduit le bénéfice imposable
- RRQ (double part 12,8 % + 8 %), AE (1,31 % employé + 1,83 % empl.), RQAP (1,21 % combiné), FSS
- Génère des **droits REER** (18 % du salaire) et des **crédits RRQ** (droits à pension)
- Imposé au **barème progressif** personnel fédéral + Québec

**2. Dividende ordinaire — versé sur bénéfice imposé à 12,2 %**

Versé à partir du **compte de revenu protégé à taux réduit (CRPTR)** — c'est-à-dire des bénéfices imposés au **taux SPCC** de 12,2 % (fédéral 9 % + QC 3,2 %). Il s'agit du cas typique pour les premiers 500 000 $ de bénéfices annuels.

Mécanisme d'intégration (éviter la double imposition) :
- **Majoration 15 %** au personnel (revenu imposable majoré)
- **Crédit d'impôt sur dividendes ordinaires** : ~11 % fédéral + ~3,8 % QC

**3. Dividende déterminé — bénéfice imposé au taux général 26,5 %**

Versé à partir du **compte de revenu général** (CRG) — bénéfices au-delà de 500 000 $ imposés au taux général 26,5 % (fédéral 15 % + QC 11,5 %).

- **Majoration 38 %** au personnel
- **Crédit d'impôt sur dividendes déterminés** : ~15 % fédéral + ~11,9 % QC

**4. Intégration fiscale — principe**

Le système canado-québécois vise la **neutralité** : un revenu gagné par une SPCC et versé en dividende devrait être imposé globalement au même taux qu'un salaire équivalent. En pratique :

- **Salaire** : imposition intégrale personnelle + cotisations
- **Dividende ordinaire** : corpo 12,2 % + perso majoré - crédit ≈ équivalent salaire à TMI élevé
- **Dividende déterminé** : corpo 26,5 % + perso ≈ très proche de salaire à haut TMI

**Exemple — SPCC, bénéfice avant rém. 150 000 $, actionnaire unique**

**Scénario Salaire 100 %** :
- Salaire : 150 000 (moins cotisations employeur ~12 k)
- Corpo : 0 impôt (tout déduit)
- Perso : salaire 138 000 → impôt ~38 000, RRQ 4 700, AE 834, RQAP 581
- **Net actionnaire : ~94 000 $**
- Avantage : droits REER 24 000 $, rente RRQ bonifiée

**Scénario Dividende ordinaire 100 %** :
- Corpo : 150 000 × 12,2 % = 18 300 → 131 700 $ versés en dividende
- Perso : dividende majoré 151 455, impôt après crédit ~29 000
- **Net actionnaire : ~103 000 $**
- Aucune cotisation RRQ/AE/REER généré

**Recommandation**

- Actionnaire **< 100 k$/an** et cherche rente RRQ/crédit REER : salaire
- Actionnaire **> 150 k$/an** déjà max RRQ/REER : dividende ordinaire (plus souple)
- **Hybride** : salaire jusqu'au max RRQ (environ 71 300 $) + dividende au-delà

L'écart fiscal typique entre salaire et dividende est **faible (1-3 %)**, mais varie selon province, revenu, et accès à RQAP/prestations.`,
  },
  faq: [
    {
      question: "Pourquoi la double imposition disparaît-elle avec le dividende ?",
      answer:
        "Grâce au mécanisme de majoration + crédit. La corpo paie 12,2 % sur le bénéfice, puis la majoration 15 % reconstitue le revenu « brut ». Le crédit d'impôt sur dividendes compense cet impôt déjà payé par la corpo — le total corpo + perso approche le TMI personnel.",
    },
    {
      question: "Un dividende donne-t-il droit à la RRQ ?",
      answer:
        "Non. Le dividende ne génère ni cotisation RRQ ni droits RRQ. À long terme, 30 ans de dividende 100 % peuvent signifier une rente RRQ quasi nulle à la retraite — vs 1 433 $/mois si salaire au plafond MGA. C'est un arbitrage majeur.",
    },
    {
      question: "Quelle est la limite 500 000 $ ?",
      answer:
        "Le plafond des affaires SPCC : au-delà de 500 k$ de bénéfice SPCC cumulé entre sociétés associées, le taux général 26,5 % s'applique. Ce seuil est partagé entre sociétés liées et réduit si revenu passif > 50 k$. Planifiez avec un comptable si vous approchez ce seuil.",
    },
    {
      question: "Les dividendes en capital sont-ils inclus ici ?",
      answer:
        "Non. Ce simulateur couvre les dividendes imposables (ordinaires et déterminés). Les dividendes en capital — versés à partir du compte de dividendes en capital (CDC) issu de la moitié non imposable des gains en capital — sont 100 % exonérés mais limités au solde CDC.",
    },
    {
      question: "Dois-je prendre un salaire minimum même si je préfère dividendes ?",
      answer:
        "Aucune obligation légale de salaire. Mais des raisons pratiques : qualifier un RPA personnel, cotiser REER, bâtir une histoire de crédit bancaire hypothécaire (dividendes moins valorisés par certains prêteurs), accéder aux prestations maternité/paternité du RQAP (requiert salaire/cotisations RQAP).",
    },
  ],
  relatedSlugs: [
    "simulateur-travailleur-autonome-quebec",
    "simulateur-impot-revenu-quebec",
  ],
};
