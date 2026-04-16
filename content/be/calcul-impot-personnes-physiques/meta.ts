import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Impôt Personnes Physiques Belgique 2026 | Calculio",
    description:
      "Simulez gratuitement votre IPP 2026 : barème fédéral 25/40/45/50 %, quotité exemptée 10 910 €, enfants à charge et additionnels communaux.",
  },
  h1: "Calcul Impôt des Personnes Physiques 2026 — Barème Officiel",
  intro:
    "Calculez votre impôt des personnes physiques (IPP) pour l'exercice 2026 (revenus 2025) selon le barème fédéral, avec quotité exemptée et additionnels communaux.",
  explanation: {
    title: "Comment est calculé l'IPP en 2026 ?",
    body: `L'**Impôt des personnes physiques (IPP)** est l'impôt annuel que tout résident belge paie sur ses revenus nets imposables. Il est fixé par le **SPF Finances** selon un barème progressif par tranches. L'exercice d'imposition 2026 porte sur les **revenus perçus en 2025** et suit les montants revalorisés par arrêté royal du 21 décembre 2024.

**Le barème 2026**

- De 0 € à **16 320 €** : **25 %**
- De 16 320 € à **28 800 €** : **40 %**
- De 28 800 € à **49 840 €** : **45 %**
- Au-delà de 49 840 € : **50 %**

Ce barème s'applique **individuellement** à chaque conjoint marié ou cohabitant légal (**décumul fiscal**), mais certaines charges sont communes (enfants à charge, habitation propre).

**La quotité du revenu exemptée d'impôt**

Chaque contribuable bénéficie d'une **quotité exemptée d'impôt** : un montant de revenu non imposé. Pour l'exercice 2026, cette quotité s'élève à **10 910 €**. Concrètement, elle produit une **réduction d'impôt de 2 727,50 €** (10 910 × 25 %, le taux de la première tranche).

**Majoration pour enfants à charge**

La quotité exemptée est majorée selon le nombre d'enfants à charge au 1er janvier 2026 :

- **1 enfant** : +1 920 €
- **2 enfants** : +4 920 €
- **3 enfants** : +11 030 €
- **4 enfants** : +17 800 €
- **Au-delà de 4 enfants** : +6 770 € par enfant supplémentaire

Un enfant handicapé compte pour deux. Un enfant de moins de 3 ans sans frais de garde déclarés donne droit à une majoration supplémentaire de **720 €**.

**Additionnels communaux**

Toute commune belge prélève une **taxe additionnelle** sur l'impôt fédéral (impôt dit « État »). Le taux varie :

- En **Flandre**, il est souvent entre **6 % et 8 %** (0 % à Knokke-Heist).
- En **Wallonie**, la moyenne pondérée se situe entre **7 % et 8,5 %**.
- À **Bruxelles-Capitale**, la Ville de Bruxelles applique par exemple **7 %**, Etterbeek **6,5 %**, Ixelles **5,5 %**.

La moyenne nationale s'établit autour de **7,5 %**. Ce taux se multiplie à l'impôt fédéral dû pour obtenir l'**additionnel à payer**.

**Exemple : un célibataire à 40 000 € imposables**

- Tranche 1 : 16 320 × 25 % = **4 080 €**
- Tranche 2 : 12 480 × 40 % = **4 992 €**
- Tranche 3 : 11 200 × 45 % = **5 040 €**
- Impôt barème = **14 112 €**
- Réduction quotité exemptée = 10 910 × 25 % = **2 727,50 €**
- Impôt fédéral = **11 384,50 €**
- Additionnels 7,5 % = **853,84 €**
- **Impôt total ≈ 12 238 €**

**Autres éléments déductibles ou réducteurs (non inclus ici)**

Cette simulation donne un résultat de base. D'autres mécanismes modulent l'impôt réel : **frais professionnels** (forfait ou réels), **épargne-pension** (réduction 30 %), **titres-services**, **chèques ALE**, **dons**, **habitation propre et unique**, **emprunt hypothécaire** (bonus logement), **quotient conjugal** pour les couples à un seul revenu. Pour une simulation détaillée, consultez **Tax-on-web** sur MyMinfin.`,
  },
  faq: [
    {
      question: "Quelle est la différence entre l'IPP et le précompte professionnel ?",
      answer:
        "Le précompte professionnel est une retenue mensuelle à la source opérée par votre employeur selon des barèmes indicatifs du SPF Finances. L'IPP est l'impôt définitif calculé annuellement sur l'ensemble de vos revenus, après déclaration. La régularisation (à payer ou à récupérer) se fait via l'avertissement-extrait de rôle, en moyenne 12 à 18 mois après l'année des revenus.",
    },
    {
      question: "Qui peut être considéré comme enfant à charge en 2026 ?",
      answer:
        "Selon le SPF Finances 2026, un enfant à charge est un enfant (biologique, adopté, recueilli) qui fait partie du ménage au 1er janvier, pour qui aucune personne étrangère au ménage ne perçoit de rente alimentaire déductible, et dont les ressources nettes n'excèdent pas un plafond annuel (3 980 € pour un couple marié, 5 740 € pour un isolé, 7 290 € pour un handicapé en 2026 — chiffres indicatifs).",
    },
    {
      question: "La quotité exemptée est-elle la même pour tout le monde ?",
      answer:
        "Non. La quotité de base est 10 910 € en 2026 mais elle est majorée pour enfants à charge, personnes handicapées à charge, parents âgés à charge (+3 980 € par personne). Depuis 2021, la distinction entre isolé et marié a été abolie : la quotité de base est identique pour tous (auparavant 10 160 € pour les mariés et 10 770 € pour les isolés).",
    },
    {
      question: "Comment connaître mon taux d'additionnels communaux exact ?",
      answer:
        "Consultez le site de votre commune ou la base de données du SPF Finances (finances.belgium.be). Le taux applicable est celui de la commune où vous êtes domicilié au 1er janvier de l'exercice d'imposition. Pour 2026, il s'agit du taux fixé par la commune au 1er janvier 2026, appliqué à l'impôt sur les revenus 2025.",
    },
    {
      question: "Ce simulateur tient-il compte du quotient conjugal ?",
      answer:
        "Non. Le quotient conjugal permet, lorsque l'un des conjoints a un revenu professionnel faible (< 30 % du revenu cumulé), d'attribuer fictivement 30 % des revenus à ce conjoint (plafonné à 13 440 € en 2026) pour bénéficier du barème progressif plus avantageux. Cette simulation traite chaque revenu individuellement ; pour un calcul conjugal complet, utilisez Tax-on-web.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-belgique",
    "calcul-droits-succession-belgique",
  ],
};
