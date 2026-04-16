import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Prêt Immobilier Luxembourg 2026 | Calculio",
    description:
      "Mensualité, coût du crédit, déduction intérêts résidence principale (3 000 €/pers.) et crédit Bëllegen Akt 40 000 €/personne jusque fin 2027.",
  },
  h1: "Simulateur Prêt Immobilier Luxembourg 2026 — Mensualité & Avantages Fiscaux",
  intro:
    "Calculez votre mensualité, le coût total du crédit, la déduction des intérêts d'emprunt (résidence principale) et le crédit Bëllegen Akt (40 000 €/personne prorogé jusqu'à fin 2027).",
  explanation: {
    title: "Prêt immobilier au Luxembourg : les règles 2026",
    body: `Le prêt immobilier luxembourgeois suit le modèle de l'**amortissement par annuités constantes** (mensualités fixes). Trois avantages fiscaux spécifiques s'ajoutent pour la résidence principale.

**1. Calcul de la mensualité**

Formule classique : M = C × t / (1 − (1+t)^(−n)) où C = capital emprunté, t = taux mensuel, n = nombre de mois.

Exemple : **800 000 € empruntés à 3,5 % sur 25 ans** → **mensualité ≈ 4 005 €**, coût total crédit ≈ 1 201 500 €, intérêts totaux ≈ 401 500 €.

**2. Déduction des intérêts d'emprunt (résidence principale)**

Article 98 LIR — plafond **par membre du foyer** :

- **Années 1-5** : **3 000 €/an/personne** (6 000 € pour un couple)
- **Années 6-10** : **2 250 €/an/personne**
- **Années 11+** : **1 500 €/an/personne**

Ces intérêts s'imputent sur le revenu imposable, l'économie réelle dépend de votre **taux marginal IR** (souvent 30-42 %).

**3. Crédit Bëllegen Akt — droits d'enregistrement**

Loi budgétaire 2024 prorogée jusqu'à **fin 2027** : crédit d'impôt de **40 000 € par personne** sur les droits d'enregistrement (6 %) + transcription (1 %) = **7 %** du prix, pour l'achat d'une résidence principale.

Pour un couple achetant 800 000 € : droits base = 56 000 €, crédit = 80 000 € → **droits effectifs = 0 €** (le crédit excède les droits).

**4. Ratio d'endettement bancaire LU**

Les banques luxembourgeoises appliquent généralement :
- **Apport minimum 10-20 %** du prix
- **Ratio mensualités/revenu net ≤ 33 %** (parfois 40 % sur profils solides)
- **Durée max 30 ans** (souvent 25 ans pour amortir avant 65 ans)

**5. Taux 2026**

Les taux fixes sur 20-25 ans s'établissent autour de **3,3-3,8 %** début 2026 (contre 4,5 % en 2023). Négociation en baisse probable au 2e semestre.

**Sanity check — couple, 800 k€ résidence principale, 150 k€ apport**

- Montant emprunté 650 k€, taux 3,5 %, 25 ans → **mensualité ≈ 3 254 €**
- Intérêts année 1 ≈ 22 600 €, plafond déductible = 6 000 € (couple × 3 000 €)
- Économie fiscale année 1 ≈ **2 340 €** (au TMI 39 %)
- Crédit Bëllegen Akt : **80 000 €** (couple × 40 000 €) → couvre entièrement les droits`,
  },
  faq: [
    {
      question: "Quel apport minimal faut-il pour emprunter au Luxembourg ?",
      answer:
        "Les banques luxembourgeoises demandent habituellement 10 à 20 % d'apport selon votre profil. Certaines accordent du 100 % mais avec garanties renforcées (nantissement d'épargne, assurance-vie). Prévoir en sus les frais de notaire (~7 %) : l'apport réel total recommandé est ~25 % du prix.",
    },
    {
      question: "Comment fonctionne concrètement le Bëllegen Akt ?",
      answer:
        "Le crédit est imputé directement lors de la signature chez le notaire : il réduit les droits d'enregistrement (6 %) et transcription (1 %) dus sur l'acte. Plafond 40 000 €/personne pour une résidence principale. Si le bien est revendu ou cessé d'être occupé avant 2 ans, le crédit est remboursable. Mesure prorogée jusqu'à fin 2027.",
    },
    {
      question: "Peut-on cumuler Bëllegen Akt et déduction intérêts ?",
      answer:
        "Oui, ces deux avantages sont cumulables. Le Bëllegen Akt porte sur les droits d'enregistrement (un crédit unique à l'achat), tandis que la déduction des intérêts s'applique chaque année sur le revenu imposable tant que le prêt court et que le bien sert de résidence principale.",
    },
    {
      question: "Comment le taux marginal d'impôt affecte-t-il l'économie ?",
      answer:
        "La déduction des intérêts réduit le revenu imposable. L'économie réelle = intérêts déductibles × taux marginal IR. Pour 6 000 € déductibles : au TMI 39 %, économie = 2 340 € ; au TMI 42 %, économie = 2 520 €. Plus vos revenus sont élevés, plus le levier est fort.",
    },
    {
      question: "Qu'en est-il des immeubles de rapport (locatif) ?",
      answer:
        "Pour le locatif, les intérêts d'emprunt sont **totalement déductibles** (pas de plafond) des revenus locatifs. En revanche, le Bëllegen Akt ne s'applique pas (réservé à la résidence principale), et les droits de 7 % sont dus intégralement.",
    },
  ],
  relatedSlugs: [
    "calcul-frais-notaire-luxembourg",
    "calcul-plus-value-immobiliere-luxembourg",
    "calcul-salaire-brut-net-luxembourg",
  ],
};
