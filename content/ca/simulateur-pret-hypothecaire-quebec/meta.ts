import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Prêt Hypothécaire Québec 2026 | Calculio",
    description:
      "Mise de fonds SCHL 5/10/20 %, prime SCHL 0,6-4 %, amortissement 25 ans (prêt assuré) ou 30 ans (conventionnel), test de stress 5,25 % et ratios GDS/ATD.",
  },
  h1: "Simulateur Prêt Hypothécaire Québec 2026 — SCHL & Test de Stress",
  intro:
    "Vérifiez votre capacité hypothécaire au Québec avec les règles SCHL 2026 : mise de fonds minimale selon le prix, prime d'assurance obligatoire si mise < 20 %, test de stress au plus élevé de contractuel + 2 % ou 5,25 %.",
  explanation: {
    title: "Les règles du prêt hypothécaire canadien 2026",
    body: `Le crédit hypothécaire au Québec suit les **règles fédérales SCHL** (Société canadienne d'hypothèques et de logement) ainsi que les ratios d'endettement appliqués par l'**ARC et l'OSFI**.

**1. Mise de fonds minimale par palier**

- **5 %** sur la première tranche de 500 000 $
- **10 %** entre 500 000 $ et 1 000 000 $
- **20 %** pour un prix ≥ 1 000 000 $

Exemple : pour un prix de **700 000 $**, mise minimale = 25 000 $ (5 % × 500 k) + 20 000 $ (10 % × 200 k) = **45 000 $**.

**2. Prêt assuré SCHL obligatoire si mise < 20 %**

La prime SCHL dépend du ratio prêt/valeur (LTV) :

| LTV | Prime (% du prêt) |
|---|---|
| ≤ 65 % | 0,60 % |
| 65-75 % | 1,70 % |
| 75-80 % | 2,40 % |
| 80-85 % | 2,80 % |
| 85-90 % | 3,10 % |
| 90-95 % | 4,00 % |

La prime est **ajoutée au capital emprunté** (capitalisée).

**3. Amortissement maximum**

- **25 ans** si prêt assuré (mise < 20 %)
- **30 ans** si prêt conventionnel (mise ≥ 20 %)

Depuis 2024, amortissement 30 ans permis pour premiers acheteurs sur construction neuve.

**4. Test de stress (stress test) 2026**

Obligatoire depuis 2018, ce test vérifie que vous pouvez payer au **taux le plus élevé entre** :

- **Taux contractuel + 2 %**
- **Plancher fédéral 5,25 %**

**5. Ratios GDS et ATD**

- **GDS** (amortissement brut) : mensualité + taxes + chauffage ≤ **39 %** du revenu mensuel brut
- **ATD** (amortissement total) : GDS + autres dettes (auto, carte, pension) ≤ **44 %**

**Exemple — achat 500 000 $ Montréal, ménage 110 000 $/an**

- Mise requise : **25 000 $** (5 %)
- Capital + prime SCHL (4,00 % × 475 k = 19 k) = **494 000 $**
- Mensualité à 5,25 % / 25 ans ≈ **2 965 $**
- Test de stress à 7,25 % ≈ **3 567 $**
- GDS avec taxes/chauffage ≈ 3 900 / 9 167 = **42,5 %** → dépasse 39 %, dossier refusé sauf ajustement

Avec une mise de **50 000 $** (10 %), LTV 90 %, prime 3,1 %, le dossier passe généralement.`,
  },
  faq: [
    {
      question: "Pourquoi la prime SCHL est-elle aussi élevée ?",
      answer:
        "La SCHL assure le prêteur contre le défaut ; cette prime (0,6-4 % du prêt) est le coût de l'assurance. En contrepartie, vous accédez à la propriété avec seulement 5 % de mise. La prime est intégrée au capital, donc étalée sur l'amortissement.",
    },
    {
      question: "Puis-je prendre 30 ans d'amortissement partout ?",
      answer:
        "Non. 30 ans est permis uniquement sur prêts conventionnels (mise ≥ 20 %) ou, depuis 2024, pour les premiers acheteurs sur construction neuve. Les prêts assurés restent plafonnés à 25 ans.",
    },
    {
      question: "Le test de stress s'applique-t-il aux renouvellements ?",
      answer:
        "Chez la même banque, non (depuis 2023). Si vous changez de prêteur, oui. C'est une règle importante pour la négociation au renouvellement — votre banque a un levier supplémentaire.",
    },
    {
      question: "Qu'est-ce que le RAP (Régime d'accession à la propriété) ?",
      answer:
        "Le RAP permet de retirer jusqu'à 60 000 $ de votre REER (2024+) pour la mise de fonds, sans impôt immédiat, à rembourser sur 15 ans. Il est combinable avec le CELIAPP (compte d'épargne libre d'impôt pour premier achat). Ce simulateur ne modélise pas le RAP — ajoutez-le manuellement à votre mise.",
    },
    {
      question: "Les frais de clôture sont-ils inclus ?",
      answer:
        "Non. Prévoyez 1,5 à 2,5 % du prix en plus : taxe de bienvenue (voir notre simulateur dédié), notaire, inspection, arpentage, ajustements. Pour un achat 500 k, prévoyez ≈ 10 000 $ de frais hors mise.",
    },
  ],
  relatedSlugs: [
    "calcul-droits-mutation-quebec",
    "calcul-salaire-brut-net-quebec",
  ],
};
