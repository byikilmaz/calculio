import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Plus-Value Immobilière Luxembourg 2026 | Calculio",
    description:
      "Résidence principale exonérée (5 ans occupation) ; locatif < 2 ans = taux plein (spéculation), ≥ 2 ans = demi-global max 21 %. Abattements 50 k€/pers.",
  },
  h1: "Calcul Plus-Value Immobilière Luxembourg 2026",
  intro:
    "Calculez l'impôt sur la plus-value immobilière luxembourgeoise : exonération résidence principale (5 ans), taux plein pour spéculation (< 2 ans), taux demi-global plafonné à 21 % (≥ 2 ans), abattements 50 000 €/personne renouvelables tous les 11 ans.",
  explanation: {
    title: "La plus-value immobilière luxembourgeoise 2026",
    body: `La plus-value sur vente immobilière au Luxembourg distingue **résidence principale** (quasi-exonération) de **bien locatif / résidence secondaire** (imposition selon durée de détention).

**1. Résidence principale — exonération totale**

Si le bien a été **occupé comme résidence principale** pendant au moins **5 ans** (continus ou cumulés) dans les **dernières années précédant la vente**, la plus-value est **entièrement exonérée**. C'est le cas le plus fréquent. Source : art. 102 LIR.

**2. Immeuble locatif ou résidence secondaire**

Deux régimes selon la durée de détention :

- **Détention < 2 ans** : **spéculation** — imposée au **taux plein** de votre TMI (jusqu'à 42 %)
- **Détention ≥ 2 ans** : **taux demi-global** (= TMI/2), plafonné à **21 %** (soit 42 %/2)

**3. Abattements**

Deux abattements distincts s'appliquent :

- **Abattement personnel** : **50 000 € par personne** (100 000 € couple), utilisable **une fois tous les 11 ans**
- **Abattement pour détention longue** (≥ 11 ans) : **75 000 €** supplémentaires

**4. Frais déductibles**

Du coût d'acquisition on déduit :
- **Prix d'achat** (historique)
- **Frais de notaire / enregistrement** effectivement payés
- **Travaux** (rénovation, extension, remise aux normes énergétiques)
- Frais d'agence immobilière à la revente (côté vendeur)

**5. Fonds pour l'emploi**

Comme pour l'impôt classique, majoration **7 % sur l'impôt dû** (9 % au-delà de 150 k€).

**6. Exemples chiffrés**

**Cas A — Résidence principale 800 k€ vendue 1 M€ après 8 ans**
- Plus-value brute : 200 k€
- Occupation ≥ 5 ans : **exonération totale** → impôt = 0

**Cas B — Investissement locatif, vente 900 k€ après 8 ans, prix acqui 500 k€, 35 k€ frais, 50 k€ travaux**
- Coût de revient : 585 k€
- Plus-value brute : **315 k€**
- Abattement personnel (1 pers.) : −50 k€
- Base imposable : 265 k€
- Taux demi-global (TMI 39 %) → 19,5 %
- Impôt : 265 k€ × 19,5 % = **51 675 €** + 7 % fonds emploi = **55 292 €**
- Plus-value nette : **259 708 €**

**Cas C — Flip rapide (spéculation) 1 an, même prix**
- Taux plein 39 % → impôt ≈ **102 885 €**
- Plus-value nette : ≈ 212 115 €

**7. Frontaliers**

Un non-résident luxembourgeois vendant un bien au LU est imposé au LU (règle du lieu de situation). Convention fiscale ensuite pour éviter la double imposition.`,
  },
  faq: [
    {
      question: "Qu'appelle-t-on 'résidence principale' au Luxembourg ?",
      answer:
        "Le bien doit être votre résidence effective (où vous êtes déclaré domicilié, où vous recevez votre courrier, où votre famille vit). Occupation minimale de 5 ans dans les années précédant la vente. Une absence temporaire (expatriation professionnelle, séjour en EHPAD) ne rompt pas nécessairement la continuité.",
    },
    {
      question: "Comment calculer le taux demi-global ?",
      answer:
        "Taux demi-global = (impôt calculé avec plus-value / impôt calculé sans plus-value) × plus-value, divisé par 2. En pratique simplifiée : TMI/2, plafonné à 21 % (moitié du taux marginal max 42 %). La fonction commune est la division par 2 de la progressivité.",
    },
    {
      question: "L'abattement 50 k€ est-il renouvelable ?",
      answer:
        "Oui, l'abattement personnel de 50 000 €/personne peut être utilisé une fois tous les 11 ans. Si vous avez vendu un bien locatif en 2015 en utilisant l'abattement, vous pourrez à nouveau l'utiliser à partir de 2026.",
    },
    {
      question: "Quels travaux sont déductibles ?",
      answer:
        "Les travaux d'amélioration durable : rénovation énergétique, agrandissement, modernisation (cuisine, salle de bains), mise aux normes (électrique, chauffage). Les travaux d'entretien courant (peinture, plomberie ponctuelle) ne le sont pas. Conservez toutes les factures (nom, TVA, dates).",
    },
    {
      question: "La plus-value est-elle soumise à la contribution dépendance ?",
      answer:
        "La plus-value imposable entre dans le revenu imposable de l'année, donc elle est soumise à la contribution dépendance 1,4 % sur la part dépassant l'abattement SSM/4. Le calculateur inclut le fonds emploi 7 % mais omet la dépendance par simplification (impact < 1,4 % supplémentaire).",
    },
  ],
  relatedSlugs: [
    "calcul-frais-notaire-luxembourg",
    "simulateur-pret-immobilier-luxembourg",
    "simulateur-impot-revenu-luxembourg",
  ],
};
