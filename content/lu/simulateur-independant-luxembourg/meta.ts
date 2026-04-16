import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Indépendant Luxembourg 2026 | Calculio",
    description:
      "Calculez votre net d'indépendant au Luxembourg : CCSS cumulée ~24 % (pension 16 % + maladie 5,45 % + accident + mutualité + dépendance), pas de chômage.",
  },
  h1: "Simulateur Indépendant Luxembourg 2026 — CCSS ~24 % & Impôt",
  intro:
    "Estimez votre revenu net d'indépendant luxembourgeois : cotisations CCSS cumulées (pension 16 %, maladie 5,5 %, accident 0,82 %, mutualité 0,81 %, dépendance 1,4 %), déduction forfait 540 € et impôt progressif.",
  explanation: {
    title: "L'indépendant luxembourgeois en 2026",
    body: `Au Luxembourg, le statut d'indépendant (profession libérale, commerçant, consultant) impose de **cotiser à la CCSS** à la fois comme salarié et comme employeur — soit environ **24 %** du bénéfice net, sans assurance-chômage.

**1. Cotisations CCSS indépendant 2026**

- **Pension** : **16,00 %** (double part : 8 % salarié + 8 % employeur)
- **Maladie soins de santé** : **5,45 %** (2,7 % + 2,8 %)
- **Maladie en espèces** : **0,05 %** (taux réduit indép.)
- **Assurance accident** : **0,82 %**
- **Mutualité classe moyenne** : **0,81 %** (facultative mais quasi-standard)
- **Contribution dépendance** : **1,40 %** (après abattement SSM/4)

**Total ≈ 24 %** du bénéfice, plafonné à **5× SSM = 162 480 €/an** pour pension/maladie.

**Important** : **pas d'assurance-chômage** pour les indépendants LU (différence majeure vs salariés).

**2. Impôt sur le revenu**

Barème identique salarié (23 tranches, 0 à 42 %) + **fonds emploi 7 %** + **dépendance 1,4 %**.

Crédit **CII** (Crédit Impôt Indépendant) : **600 €/an** en 2026.

**3. Déductions spécifiques**

- **Forfait frais d'obtention** : **540 €/an** (ou frais réels documentés)
- **Dépenses spéciales** : 480 € forfait + déductions réelles (assurances, dons, art. 111bis)
- **Amortissements** matériel professionnel
- **Charges d'exploitation** (local, matériel, logiciels)

**4. Sanity check — indépendant classe 1, bénéfice 80 000 €**

- Cotisations CCSS (24 %) ≈ **19 200 €**
- Revenu imposable ≈ 80 000 − pension (12 800 €) − maladie (4 400 €) − forfaits (1 020 €) = **61 780 €**
- Impôt barème ≈ **11 400 €**
- CII − 600 € = 10 800 €
- Fonds emploi 7 % ≈ 756 €
- **Impôt total ≈ 11 556 €**
- **Net ≈ 49 244 €/an** (≈ 4 104 €/mois)
- Taux prélèvement effectif ≈ **38 %**

**5. Classes 1a / 2**

- **Classe 1a** (monoparental, > 64 ans) : abattement 4 500 €
- **Classe 2** (marié) : splitting par 2 avec seuil fonds emploi doublé à 300 k€

**6. TVA**

Seuil exonération 2026 : **50 000 €/an** (régime de franchise). Au-delà, assujettissement TVA obligatoire (taux 17 % normal, 14 % intermédiaire, 8 % réduit, 3 % super-réduit).`,
  },
  faq: [
    {
      question: "Pourquoi cotise-t-on 'double part' en étant indépendant ?",
      answer:
        "L'indépendant ne bénéficie pas d'un employeur. Il prend en charge la totalité : part salarié + part patronale. Pour la pension : 8 % (salarié) + 8 % (employeur) = 16 % à sa seule charge. Même logique pour la maladie. Résultat : taux effectif plus élevé qu'un salarié (24 % vs 12,45 %).",
    },
    {
      question: "Puis-je cotiser volontairement à l'assurance-chômage ?",
      answer:
        "Non, contrairement à certains pays (France, Belgique), il n'existe pas de mécanisme d'assurance-chômage facultative pour indépendants au Luxembourg. Certains se couvrent via des assurances privées (perte de revenus) ou en se constituant une épargne de précaution (3-6 mois de revenus).",
    },
    {
      question: "Comment déclarer les frais réels au lieu du forfait ?",
      answer:
        "Dans votre déclaration fiscale, vous détaillez les frais d'obtention (trajet domicile-travail si vous avez un local, matériel professionnel amortissable, fournitures, formations) avec justificatifs. Si ce total dépasse 540 €, cochez 'frais réels'. Conservez toutes les factures pendant 10 ans.",
    },
    {
      question: "Quelle est la mutualité classe moyenne ?",
      answer:
        "La Mutualité des Employeurs (MDE) couvre les indépendants et professions libérales contre la continuation de salaire en cas de maladie de plus de 77 jours. Taux 0,81 % (2026). Affiliation quasi-obligatoire pour les indépendants à la CCSS.",
    },
    {
      question: "Comment fonctionne la TVA en franchise ?",
      answer:
        "Si votre CA annuel reste sous 50 000 € (2026), vous pouvez opter pour la franchise : pas de TVA facturée à vos clients, pas de TVA déduite sur vos achats. Mention obligatoire sur factures : 'Régime de franchise — Art. 57 TVA'. Au-delà de 50 k€, assujettissement obligatoire.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-luxembourg",
    "simulateur-impot-revenu-luxembourg",
    "simulateur-dividendes-salaire-luxembourg",
  ],
};
