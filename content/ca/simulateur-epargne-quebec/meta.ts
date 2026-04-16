import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Épargne Québec 2026 — REER vs CELI | Calculio",
    description:
      "Comparez REER et CELI 2026 : déduction immédiate 18 %, plafond REER 32 490 $, CELI 7 000 $, TMI actuel vs retraite, intérêts composés.",
  },
  h1: "Simulateur Épargne Québec 2026 — REER vs CELI",
  intro:
    "Choisissez entre REER et CELI selon votre taux marginal d'imposition (TMI) actuel et futur, avec simulation complète par intérêts composés et économie d'impôt calculée.",
  explanation: {
    title: "REER ou CELI ? Le choix selon votre TMI",
    body: `REER et CELI sont les deux piliers de l'**épargne fiscalement avantageuse** au Canada. Leur logique est opposée : le REER déduit **à l'entrée** et impose **au retrait**, le CELI paie **à l'entrée** (argent net) et exonère **au retrait**.

**REER — Régime enregistré d'épargne-retraite**

- **Déduction fiscale** à l'entrée : versement × TMI actuel
- Plafond 2026 : **18 % du revenu gagné**, max **32 490 $**
- Capital et intérêts exonérés pendant la détention
- **Imposable au retrait** au TMI de la retraite

**CELI — Compte d'épargne libre d'impôt**

- Versement avec de l'argent **après impôt** (pas de déduction)
- Plafond annuel 2026 : **7 000 $**
- Plafond cumulatif depuis 2009 : **102 000 $**
- Capital, intérêts et retraits **100 % exonérés**

**Règle simple de choix**

\`TMI actuel > TMI retraite → REER gagnant\`
\`TMI actuel < TMI retraite → CELI gagnant\`
\`TMI identique → équivalent mathématique (intégration parfaite)\`

**Exemple — 500 $/mois sur 20 ans, 5 % rendement**

Versement annuel 6 000 $ × 20 ans = 120 000 $ versé

**Scénario REER** (TMI entrée 37 %, retrait 25 %) :
- Capital brut : ≈ 206 700 $
- Économie d'impôt entrée : 44 400 $ cumulés
- Impôt retrait : 25 % × 206 700 = 51 700 $
- **Capital net final : 155 000 $**

**Scénario CELI** (TMI 37 %, versement net après impôt) :
- Capital brut = net : ≈ 206 700 $
- **Capital net final : 206 700 $** (à rendement égal)

Mais attention : le CELI implique de **déjà avoir payé l'impôt** sur les 120 000 $ versés (soit ≈ 44 400 $ déboursés en impôts ailleurs), donc à égalité de **coût total pour vous**, le REER est souvent supérieur quand le TMI chute à la retraite.

**Cas optimal de chaque produit**

- **REER** : haut revenu actuel (TMI 45+ %), retraite modeste
- **CELI** : revenu modeste aujourd'hui, ou épargne avec retrait à court terme, ou si vous recevrez PSV/SRG (REER les réduit)`,
  },
  faq: [
    {
      question: "Puis-je cotiser REER et CELI en même temps ?",
      answer:
        "Oui, ce sont des comptes distincts. L'idéal : maximiser le REER au-dessus du TMI 33 % (fédéral 26 % + QC ~19 % net), puis basculer sur CELI. Les droits inutilisés des deux régimes se reportent indéfiniment.",
    },
    {
      question: "Le CELIAPP est-il mieux que le REER pour un premier achat ?",
      answer:
        "Oui. Le CELIAPP (premier achat) combine la déduction REER à l'entrée et la sortie exonérée du CELI — mieux des deux mondes, plafond 8 000 $/an / 40 000 $ à vie. À utiliser avant REER pour un achat.",
    },
    {
      question: "Et si mon TMI de retraite est incertain ?",
      answer:
        "Diversifiez : 50/50 REER/CELI. Cela donne de la flexibilité fiscale à la retraite (retirer plus du CELI une année à haut revenu, plus du REER une année calme pour lisser le TMI).",
    },
    {
      question: "Le rendement utilisé est-il réaliste ?",
      answer:
        "5 %/an est une moyenne prudente pour un portefeuille équilibré (60/40). En actions pur long terme, 7-8 % est historique. Ajustez selon votre profil. Le simulateur utilise un rendement constant, la réalité varie par année (séquence de rendements).",
    },
    {
      question: "Les frais de gestion sont-ils inclus ?",
      answer:
        "Non. Soustrayez vos RFG (ratio de frais de gestion) du rendement saisi. Un fonds commun à 2 % RFG transforme un 6 % brut en 4 % net — impact majeur sur 20+ ans. Les FNB à 0,1-0,3 % RFG sont souvent plus avantageux.",
    },
  ],
  relatedSlugs: [
    "calculateur-retraite-quebec",
    "calcul-salaire-brut-net-quebec",
  ],
};
