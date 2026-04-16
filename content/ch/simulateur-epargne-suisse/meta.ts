import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Épargne Suisse 2026 — Livret & 3a | Calculio",
    description:
      "Capital final d'épargne suisse 2026 : compte épargne classique ou 3e pilier A (max 7 258 CHF déductible). Économie d'impôt selon TMI.",
  },
  h1: "Simulateur Épargne Suisse 2026 — Intérêts & 3e Pilier A",
  intro:
    "Comparez épargne libre et 3e pilier A : projection du capital, intérêts composés, imposition sur intérêts vs économie d'impôt sur versement.",
  explanation: {
    title: "Épargner en Suisse en 2026 : les choix fiscalement efficaces",
    body: `L'épargne suisse offre **deux grandes voies** fiscalement différenciées : le compte épargne classique et le **3e pilier A** lié à la prévoyance.

**Compte épargne classique**

- Versements **libres**, retrait **sans contrainte**
- Intérêts **imposés** au revenu ordinaire (TMI du contribuable, soit 15-35 % selon canton et revenu)
- Le **capital** est aussi soumis à l'**impôt sur la fortune** (cantonal) au-delà d'un seuil (~80-100 kCHF selon le canton)

**3e pilier A (bancaire ou assurance)**

- Plafonds 2026 : **7 258 CHF/an** pour un salarié affilié LPP, **20 % du revenu net** pour un indépendant sans LPP (plafond **36 288 CHF**)
- **Déduction fiscale intégrale** du versement (économie = versement × TMI)
- Pas d'impôt sur le rendement annuel ni sur la fortune tant que le capital reste dans le 3a
- Retrait uniquement aux conditions légales (5 ans avant la retraite, résidence principale, émigration, invalidité)
- Au retrait : **imposition séparée à taux réduit** (5-10 % typiquement, contre 20-40 % au taux marginal ordinaire)

**Arbitrage indicatif — TMI 25 %, horizon 20 ans, rendement 2,5 %**

- **Épargne libre** : 7 258 × 20 = 145 160 CHF versés, capital net ~180 kCHF (intérêts partiellement imposés)
- **3e pilier A** : même 145 160 CHF, capital brut ~188 kCHF, **économie fiscale cumulée 36 290 CHF**, net après retrait ~175 kCHF

Le 3a est presque toujours gagnant si vous pouvez attendre la retraite. Stratégie recommandée : **plusieurs comptes 3a** chez différentes banques/assureurs pour échelonner les retraits et optimiser le barème de retrait progressif.

**Retrait anticipé du 3a : 3 cas principaux**

1. **Achat résidence principale** (apport personnel)
2. **Départ définitif à l'étranger** (sans reprise d'activité en Suisse)
3. **Invalidité totale** (≥ 70 %)`,
  },
  faq: [
    {
      question: "Puis-je ouvrir plusieurs comptes 3a ?",
      answer:
        "Oui, il n'y a pas de limite au nombre de comptes 3a mais le total des versements annuels reste plafonné (7 258 CHF pour salariés en 2026). Multiplier les comptes permet ensuite de retirer les capitaux sur plusieurs années fiscales et de lisser l'imposition à la sortie.",
    },
    {
      question: "Quelle différence entre 3a bancaire et 3a assurance ?",
      answer:
        "3a bancaire : comme un compte épargne ou fonds d'investissement, totalement flexible. 3a assurance : inclut une couverture décès/invalidité, moins flexible, souvent moins rentable sur le long terme à cause des frais. La majorité des conseillers indépendants recommandent le 3a bancaire.",
    },
    {
      question: "Les intérêts du compte épargne sont-ils tous imposés ?",
      answer:
        "Oui, en Suisse il n'y a pas d'exonération équivalente au livret A français ou au livret belge réglementé. Les intérêts sont ajoutés au revenu imposable et suivent le barème IFD + cantonal + communal. L'impôt anticipé (35 %) prélevé par la banque est remboursé au moment de la déclaration.",
    },
    {
      question: "Puis-je investir mon 3a en actions ?",
      answer:
        "Oui via des fonds 3a ou des solutions 3a numériques (VIAC, Frankly, etc.) qui permettent d'investir jusqu'à 99 % en actions. Rendement attendu plus élevé (~5-7 % historique long terme) mais volatilité accrue. À privilégier sur un horizon ≥ 10 ans.",
    },
    {
      question: "Le rendement net affiché tient-il compte des frais ?",
      answer:
        "Non, ce simulateur prend le taux annuel brut que vous saisissez. Pour un 3a fonds, retranchez les frais de gestion annuels (0,4-1,5 % selon solution). Pour un 3a bancaire classique, le taux affiché par la banque est généralement déjà net de frais mais très bas (0,1-0,5 % en 2026).",
    },
  ],
  relatedSlugs: [
    "calculateur-retraite-suisse",
    "simulateur-impot-revenu-suisse",
  ],
};
