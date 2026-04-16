import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Frais Kilométriques Belgique 2026 | Calculio",
    description:
      "Calculez vos indemnités kilométriques belges 2026 : barème fonctionnaire 0,4246 €/km, forfait IPP 0,15 €/km, indemnité vélo 0,35 €/km.",
  },
  h1: "Calcul Frais Kilométriques Belgique 2026 — Barème Officiel",
  intro:
    "Estimez vos indemnités pour déplacements professionnels, trajets domicile-travail et vélo selon les barèmes officiels SPF Finances 2026.",
  explanation: {
    title: "Barèmes kilométriques belges 2026",
    body: `En Belgique, trois barèmes kilométriques coexistent selon la nature du trajet et le statut du bénéficiaire. Les montants sont **indexés trimestriellement** en fonction des prix des carburants et de l'IPC (Indice des Prix à la Consommation).

**1. Déplacements professionnels — 0,4246 €/km (barème fonctionnaires fédéraux 2026)**

Lorsqu'un employé utilise sa voiture personnelle pour des **déplacements professionnels** (visites clients, chantiers, missions), l'employeur peut lui verser une **indemnité forfaitaire** de **0,4246 €/km** en 2026. Ce taux est :

- **Totalement exempté d'impôt** et de cotisations sociales (dans la limite de 24 000 km/an)
- Référencé par la **Circulaire SPF Finances 2026/C/13** et l'**arrêté ministériel du 28/06/2023**
- Réindexé au **1er juillet** de chaque année

Le taux 01/07/2025 → 30/06/2026 est de **0,4297 €/km**. À partir du 01/07/2026, il sera réindexé (estimation : ~0,4246 € moyen sur l'année civile).

**2. Trajets domicile-travail — 0,15 €/km (forfait IPP salarié)**

Pour le trajet entre votre domicile et votre lieu de travail principal, le **forfait fiscal déductible IPP** est limité à **0,15 €/km**, quel que soit le mode de transport (voiture personnelle, train, métro, bus, etc.). Ce forfait s'applique :

- Sans justificatifs (coché sur la déclaration fiscale via code 1254/2254)
- Sur la distance effective domicile-lieu de travail, plafonnée à **100 km/trajet simple**
- Comme alternative aux **frais professionnels réels** (à justifier pièces à l'appui)

Au-delà de 100 km/trajet, le forfait reste à 0,15 € pour les premiers 100 km.

**3. Indemnité vélo — 0,35 €/km (CCT 164 + arrêté royal 2023)**

Pour encourager la mobilité active, l'indemnité vélo est fixée à **0,35 €/km** depuis le 01/01/2024 (indexée, 2026 inchangé) :

- Versée par l'employeur à ses salariés effectuant tout ou partie du trajet domicile-travail à vélo
- **Obligation pour tous les secteurs** depuis le 01/05/2023 (CCT 164 du Conseil national du Travail)
- **Exonérée d'impôt et de cotisations** jusqu'à **2 500 km/an** (5 500 € max annuel d'indemnité, 2026)
- Cumulable avec l'indemnité voiture les jours où vous ne faites pas le trajet à vélo

**4. Cas particulier : vélo électrique, speed pedelec, trottinette**

- **Vélo classique et VAE (< 25 km/h)** : indemnité de 0,35 €/km
- **Speed pedelec (25–45 km/h, catégorie L1e-B)** : même indemnité 0,35 €/km, mais nécessité d'un permis AM
- **Trottinette personnelle** : non couverte par la CCT 164 mais possibilité négociée en entreprise (rare)

**5. Exemples pratiques 2026**

*Exemple 1 — Commercial qui parcourt 30 km/jour, 5 jours/semaine, 46 semaines/an :*

- Km annuels : 30 × 5 × 46 = **6 900 km**
- Régime professionnel (0,4246) : **6 900 × 0,4246 = 2 929,74 €/an** (exonéré)
- Régime domicile-travail fiscal (0,15) : **6 900 × 0,15 = 1 035 €** (déduction IPP, pas un versement)
- Régime vélo (plafonné à 2 500 km) : **2 500 × 0,35 = 875 €/an**

*Exemple 2 — Salarié qui fait 15 km à vélo, 4 jours/semaine, 46 semaines :*

- Km annuels : 15 × 4 × 46 = 2 760 km → **plafonné à 2 500 km**
- Indemnité annuelle : **2 500 × 0,35 = 875 €/an** (exonérée d'impôt et ONSS)

**6. Pour qui quel barème ?**

| Situation | Barème applicable |
|-----------|-------------------|
| Remboursement employeur pour mission pro | 0,4246 €/km |
| Déduction fiscale trajet maison → bureau (voiture) | 0,15 €/km |
| Indemnité vélo domicile-travail | 0,35 €/km (max 2 500 km) |
| Indépendant, déplacements pros voiture | Frais réels (amortissement, carburant, entretien, assurance) ou forfait 0,4246 €/km |

**Pièges à éviter**

- Le barème 0,4246 € est **un plafond d'exonération**, pas une obligation de versement. Votre employeur peut verser moins, négociable par CCT d'entreprise.
- Au-delà du plafond de 24 000 km/an, l'excédent est traité comme salaire imposable.
- Pour l'indépendant, mieux vaut souvent les **frais réels** (amortissement véhicule + carburant + entretien) que le forfait 0,4246, surtout pour une voiture chère.`,
  },
  faq: [
    {
      question: "Le barème 0,4246 €/km est-il imposé ou exonéré ?",
      answer:
        "L'indemnité kilométrique professionnelle versée par un employeur à son salarié au barème SPF Finances (0,4246 €/km en 2026) est intégralement exonérée d'impôt et de cotisations sociales ONSS, dans la limite de 24 000 km/an. Au-delà, la partie excédentaire est requalifiée en salaire imposable. L'employeur exige en général un tableau de bord ou justificatif trimestriel.",
    },
    {
      question: "Puis-je cumuler l'indemnité voiture et l'indemnité vélo ?",
      answer:
        "Oui, depuis la CCT 164 (01/05/2023), les jours où vous faites le trajet à vélo vous pouvez toucher 0,35 €/km vélo, et les autres jours (pluie, météo, enfants à déposer) bénéficier de l'intervention de l'employeur dans vos frais transport (forfait mensuel train, carte Mobib, remboursement voiture…). Ces deux avantages sont additifs dans la limite du kilométrage réel prouvé par mode.",
    },
    {
      question: "Le forfait IPP 0,15 €/km est-il un remboursement ou une déduction ?",
      answer:
        "C'est une déduction fiscale, pas un versement. Vous portez la distance totale parcourue en 2025 (ou 2026 pour la déclaration 2027) × 0,15 € × nombre de jours travaillés dans la case frais professionnels (code 1254). Cela réduit votre base imposable. En alternative, vous pouvez déduire vos frais réels (amortissement, carburant, entretien, assurance, parking) à justifier.",
    },
    {
      question: "Qu'en est-il des indépendants ?",
      answer:
        "Un indépendant qui utilise sa voiture pour ses trajets professionnels peut déduire soit les frais réels (amortissement linéaire 5 ans + carburant + entretien + assurance + taxe circulation — pondérés par le % d'usage pro), soit opter pour le forfait de 0,4246 €/km (barème fonctionnaire). Pour un véhicule amorti avec usage pro > 75 %, les frais réels sont généralement plus avantageux. Consultez votre comptable.",
    },
    {
      question: "Le taux de 0,4246 € va-t-il changer en cours d'année ?",
      answer:
        "Oui, le barème fonctionnaire est indexé trimestriellement sur l'IPC et le prix des carburants. Il est officialisé par circulaire SPF Finances. Les ajustements historiques 2023-2026 oscillent entre 0,41 € et 0,44 €. Nous utilisons la moyenne annuelle 2026 (0,4246 €) pour ce simulateur. Consultez finances.belgium.be → circulaires pour le taux exact du trimestre courant.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-belgique",
    "calcul-impot-personnes-physiques",
    "simulateur-independant-belgique",
  ],
};
