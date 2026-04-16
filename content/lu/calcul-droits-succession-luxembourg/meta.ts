import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Droits de Succession Luxembourg 2026 | Calculio",
    description:
      "Barèmes 2026 selon lien : époux-enfants communs exonérés, ligne directe 2,5 % extra-légal, frères/sœurs 6 %, neveux 9 %, non-parents jusqu'à 48 %. Surcharges progressives.",
  },
  h1: "Calcul Droits de Succession Luxembourg 2026 — Barème par Lien",
  intro:
    "Calculez les droits de succession luxembourgeois 2026 : barème variable selon le lien de parenté (époux exonérés, ligne directe quasi-exonérée, frères 6 %, non-parents 15 % + majorations) avec surcharges progressives selon le montant reçu.",
  explanation: {
    title: "Les droits de succession luxembourgeois en 2026",
    body: `Le Luxembourg applique des **droits de succession modestes** en ligne directe (enfants, conjoint) et plus élevés pour les parents éloignés ou non-parents. Le barème distingue **part légale** (réserve héréditaire) et **part extra-légale** (legs libre).

**1. Barème selon lien de parenté 2026**

**Exonération totale** :
- **Époux(se) avec enfants communs** : 0 %

**Ligne directe (enfants, parents, petits-enfants)** :
- Part légale (réserve) : **0 %** (exonérée)
- Part extra-légale (au-delà réserve) : **2,5 %** à **5 %**

**Frères / sœurs** :
- Part légale : **6 %**
- Part extra-légale : **15 %**

**Oncles / tantes / neveux / nièces** :
- **9 %** base, **12 %** extra-légal

**Grands-oncles, grandes-tantes** :
- **10 %** base, **13 %** extra-légal

**Cousins** :
- **10-15 %**

**Non-parents** :
- **15 %** base, majorations possibles → jusqu'à **48 %**

**2. Surcharges progressives**

S'ajoutent des majorations selon le montant reçu (appliquées au taux de base) :

- **10 k€** : +10 %
- **20 k€** : +20 %
- **40 k€** : +30 %
- **100 k€** : +40 %
- **200 k€** : +50 %
- **500 k€** : +70 %
- **1 M€** : +90 %

Ces majorations s'ajoutent multiplicativement au taux de base. Exemple : un frère recevant 250 000 € → taux base 6 %, majoration +50 % → **taux effectif 9 %** = 22 500 €.

**3. Différence part légale / extra-légale**

La **part légale** (ou réserve héréditaire) est la fraction minimale qui revient obligatoirement aux héritiers réservataires (enfants, conjoint). Elle est protégée par le Code civil. La **part extra-légale** est celle transmise par testament au-delà de cette réserve — plus lourdement taxée.

**4. Exemples chiffrés**

**Cas A — Enfant hérite 500 000 € (tout part légale)**
- Ligne directe, part légale : **0 % → droits = 0 €**

**Cas B — Enfant hérite 500 000 € dont 200 000 € part extra-légale**
- Part légale (300 k€) : 0 €
- Part extra-légale (200 k€) : 200 000 × 2,5 % = **5 000 €**
- Majoration 200 k€ : +50 % → **7 500 € total**

**Cas C — Frère hérite 300 000 € (part légale)**
- Taux base 6 % : 18 000 €
- Majoration 200 k€ : +50 % → **27 000 € droits**
- Taux effectif : **9 %**

**Cas D — Ami (non-parent) hérite 300 000 €**
- Taux base 15 % : 45 000 €
- Majoration 200 k€ : +50 % → **67 500 € droits**
- Taux effectif : **22,5 %**

**5. Abattement frais funéraires**

Frais funéraires raisonnables (jusqu'à 4 000 €) déductibles de la masse successorale avant calcul des droits.

**6. Convention fiscale — non-résidents**

Un non-résident luxembourgeois qui hérite d'un bien immobilier LU est soumis aux droits LU sur ce bien. La convention fiscale bilatérale détermine ensuite l'imputation éventuelle dans le pays de résidence.`,
  },
  faq: [
    {
      question: "Un conjoint survivant est-il toujours exonéré ?",
      answer:
        "Non, l'exonération totale s'applique uniquement au conjoint héritant d'une personne décédée avec enfants communs. Si le défunt n'a pas d'enfants ou a des enfants d'une précédente union, le conjoint peut être soumis à des droits (variables selon la fraction et la présence d'autres héritiers).",
    },
    {
      question: "Comment calculer la part légale vs extra-légale ?",
      answer:
        "La part légale (réserve) est fixée par le Code civil LU : pour 1 enfant, ½ du patrimoine ; pour 2 enfants, 2/3 ; pour 3 enfants et +, ¾. Au-delà, le défunt peut disposer librement (quotité disponible = 'extra-légale'). Le testament règle la répartition. Sans testament, tout va à la part légale.",
    },
    {
      question: "Les donations du vivant sont-elles taxées différemment ?",
      answer:
        "Les donations sont soumises à des droits d'enregistrement selon un barème proche mais distinct des droits de succession. Au Luxembourg, une donation antérieure au décès peut être 'rapportée' à la masse successorale pour calcul des parts — attention aux donations déguisées.",
    },
    {
      question: "Qu'en est-il de l'assurance-vie ?",
      answer:
        "Les capitaux décès d'assurance-vie au profit de bénéficiaires désignés sont généralement hors succession (art. L132-12 Code assurances). Ils peuvent toutefois être réintégrés si les primes versées étaient manifestement exagérées au regard du patrimoine du défunt.",
    },
    {
      question: "Comment fonctionne la majoration par seuil ?",
      answer:
        "La majoration se cumule au taux de base. Exemple frère recevant 500 000 € : taux base 6 %, majoration 70 % (seuil 500 k€) → taux effectif 6 % × 1,70 = 10,2 %, soit 51 000 € de droits. Cette mécanique vise à rendre le barème plus progressif pour les gros patrimoines.",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu-luxembourg",
    "calcul-frais-notaire-luxembourg",
  ],
};
