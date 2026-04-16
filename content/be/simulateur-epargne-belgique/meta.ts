import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Épargne Belgique 2026 | Calculio",
    description:
      "Projetez votre épargne belge avec intérêts composés : livret réglementé (exo. 1 020 €), compte non réglementé (30 % précompte), assurance Branche 21.",
  },
  h1: "Simulateur Épargne Belgique 2026 — Intérêts Composés & Précompte",
  intro:
    "Estimez le capital final de votre épargne belge en tenant compte du précompte mobilier 30 %, de l'exonération des livrets réglementés et de la fiscalité Branche 21.",
  explanation: {
    title: "Fiscalité de l'épargne en Belgique en 2026",
    body: `En Belgique, le rendement brut d'un placement d'épargne est quasi systématiquement **taxé**. Trois grandes familles de supports se distinguent, avec des régimes fiscaux très différents.

**1. Livret d'épargne réglementé**

Les livrets classiques proposés par les banques belges (ING, KBC, BNP Paribas Fortis, Belfius, Argenta…) bénéficient d'une **exonération fiscale partielle** : les premiers **1 020 € d'intérêts bruts** perçus en 2026 sont exonérés. Au-delà de ce seuil, un **précompte mobilier réduit de 15 %** s'applique (au lieu de 30 %).

Exemple : si vous percevez 1 500 € d'intérêts sur un livret réglementé en 2026 :

- 1 020 € exonérés
- 480 € × 15 % = **72 € de précompte mobilier**
- Intérêts nets : **1 428 €**

Pour bénéficier de l'exonération, la banque doit proposer un livret dit **réglementé** respectant le cadre légal (taux de base + prime de fidélité, plafonds, paiement trimestriel des intérêts).

**2. Compte d'épargne non réglementé / comptes à terme**

Les comptes d'épargne **non réglementés** (comptes à haut rendement de néo-banques étrangères) et les **comptes à terme** classiques sont soumis au **précompte mobilier standard de 30 %** dès le premier euro d'intérêt, sans exonération.

Exemple : 1 500 € d'intérêts sur un compte non réglementé → 450 € de précompte → **1 050 € nets**. Moins avantageux qu'un livret réglementé tant que vous restez sous 1 020 € d'intérêts annuels.

**3. Assurance-épargne Branche 21**

Les produits d'assurance-vie de **Branche 21** (Ethias, AG Insurance, Belfius Insurance…) offrent :

- Un **rendement garanti** (actuellement **~2,00 %** brut)
- Une **participation bénéficiaire** variable selon les résultats de l'assureur
- Une **taxe sur prime de 2 %** prélevée à chaque versement (au lieu du précompte)
- **Pas de précompte mobilier** à la sortie si le contrat est détenu **≥ 8 ans** ou fait l'objet d'un **décès**
- **Protection du capital** garantie par le **Fonds de Garantie** à concurrence de 100 000 € par assuré et par compagnie

Si le contrat est dénoué avant 8 ans, la plus-value est taxée à 30 %.

**4. Comparaison des trois supports (exemple 2026)**

Capital initial 5 000 €, versement 200 €/mois, taux 2,5 %, durée 10 ans :

- **Total versé** : 5 000 + 200 × 120 = **29 000 €**
- **Capital brut** (intérêts composés) : **≈ 34 100 €**
- **Livret réglementé** : capital net **≈ 34 000 €** (précompte quasi nul grâce à l'exonération annuelle)
- **Compte non réglementé** : capital net **≈ 32 500 €** (30 % sur ~5 100 € d'intérêts)
- **Branche 21** : capital net **≈ 33 400 €** (taxe 2 % à l'entrée mais pas de précompte à la sortie si ≥ 8 ans)

**5. Règle d'or : intérêts composés**

Le véritable levier n'est pas le taux, c'est la **durée**. 200 €/mois à 3 % pendant 30 ans = **116 500 €**, dont **44 500 € d'intérêts** (vs 72 000 € versés). C'est le principe de l'**intérêt composé** : les intérêts génèrent à leur tour des intérêts.

**À retenir**

- **Petite épargne de précaution (< 1 020 € d'intérêts/an)** → livret réglementé, simple et quasi défiscalisé
- **Épargne moyenne (> 10 000 € de capital)** → envisager Branche 21 ou compte-titres investi
- **Épargne longue (> 8 ans)** → Branche 21 ou fonds d'investissement Branche 23 bien plus efficaces

Ce simulateur ne couvre pas la fiscalité des **fonds d'investissement** (compte-titres, taxe TOB, taxe sur compte-titres au-delà de 1 M€), ni les **placements immobiliers** (revenus cadastraux, location).`,
  },
  faq: [
    {
      question: "Quelle est l'exonération d'intérêts pour un livret réglementé en 2026 ?",
      answer:
        "L'exonération est de 1 020 € d'intérêts par personne et par an en 2026, selon la publication du SPF Finances. Pour un couple, ce sont donc 2 040 € d'intérêts exonérés à condition que chaque livret soit au nom d'un seul titulaire. Au-delà, le précompte mobilier est de 15 % (et non 30 %) pour les livrets réglementés. Un compte joint est comptabilisé 50/50 pour l'exonération.",
    },
    {
      question: "Dois-je déclarer les intérêts de mon livret dans ma déclaration fiscale ?",
      answer:
        "Non si la banque a déjà retenu le précompte mobilier libératoire (ce qui est le cas pour la quasi-totalité des banques belges). Les intérêts exonérés (≤ 1 020 €) n'apparaissent pas sur votre déclaration. Les intérêts taxés à la source sont libératoires — aucune ligne à remplir. Vous devez toutefois déclarer les comptes détenus à l'étranger dans la section III de la déclaration (revenus 2025, exercice 2026).",
    },
    {
      question: "Comment fonctionne concrètement la taxe de 2 % sur Branche 21 ?",
      answer:
        "La taxe sur prime d'assurance (dénommée TPA) de 2 % est retenue par l'assureur à chaque versement. Concrètement, si vous versez 100 €, 98 € sont investis et capitalisés. C'est donc un coût d'entrée, pas une taxation des plus-values. Combiné à la non-imposition à la sortie (si contrat ≥ 8 ans), le Branche 21 reste compétitif face au livret sur les grosses sommes et durées longues.",
    },
    {
      question: "Les taux indiqués par ce simulateur sont-ils les taux réels ?",
      answer:
        "Non, vous saisissez le taux de votre choix. En 2026, les livrets réglementés belges offrent des taux totaux (taux de base + prime de fidélité) entre 0,5 % (ING, KBC de base) et 3,0 % (banques plus rémunératrices comme MeDirect, Santander, Keytrade pour certaines offres). Les comptes à terme atteignent 2,5–3,5 % selon la durée bloquée. Les Branche 21 garantissent ~2,00–2,25 % hors participation bénéficiaire.",
    },
    {
      question: "Les intérêts composés sont-ils vraiment garantis mensuellement ?",
      answer:
        "Mathématiquement, oui — mais dans la pratique, les livrets belges paient les intérêts annuellement (taux de base prorata temporis + prime de fidélité après 12 mois). Notre simulateur applique la capitalisation mensuelle pour un calcul lissé comparable, ce qui peut légèrement surestimer le rendement réel (≈ 0,1 % par an). Pour un résultat exact, demandez à votre banque la formule exacte de votre livret (jour de valeur, date de paiement, prime de fidélité).",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-hypothecaire",
    "calculateur-pension-belgique",
    "calcul-impot-personnes-physiques",
  ],
};
