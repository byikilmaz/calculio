import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Prêt Hypothécaire Belgique 2026 | Calculio",
    description:
      "Calculez gratuitement votre mensualité de prêt hypothécaire belge 2026 : taux fixe, assurance solde restant dû, coût total et échéancier annuel détaillé.",
  },
  h1: "Simulateur Prêt Hypothécaire 2026 — Mensualité & Coût Total",
  intro:
    "Obtenez la mensualité de votre crédit hypothécaire belge à taux fixe et visualisez le coût total du crédit ainsi que l'assurance solde restant dû.",
  explanation: {
    title: "Comment est calculée une mensualité de crédit hypothécaire ?",
    body: `Le **prêt hypothécaire** belge à taux fixe suit la formule actuarielle standard. À partir du **capital emprunté (C)**, de la **durée en mois (n)** et du **taux mensuel (i = taux annuel / 12)**, la mensualité hors assurance se calcule par :

**Mensualité = C × i / (1 − (1 + i)⁻ⁿ)**

Au début du prêt, la part des intérêts dans chaque mensualité est importante ; elle diminue progressivement au profit du remboursement du capital. À l'échéance, le capital est intégralement remboursé.

**L'assurance solde restant dû (ASRD)**

Toutes les banques belges exigent une **assurance solde restant dû** (Schuldsaldoverzekering) qui garantit le remboursement du crédit en cas de décès de l'emprunteur. La prime peut être :

- **Unique** : payée en une fois à la signature (souvent intégrée au plan de financement)
- **Mensuelle** : calculée typiquement sur le capital initial ou le capital restant dû

Les taux 2026 varient de **0,10 %** (jeune emprunteur en bonne santé, crédit court) à **0,60 %** et plus (emprunteur âgé ou profil médical chargé). La moyenne pour un couple de trentenaires sur 25 ans se situe vers **0,20 %–0,30 %**.

**Taux d'emprunt du marché 2026**

Les taux hypothécaires belges en 2026, selon la BNB et les courtiers (Immoweb/Spaargids) :

- **10 ans** : environ **3,00 %–3,30 %**
- **20 ans** : environ **3,30 %–3,60 %**
- **25 ans** : environ **3,40 %–3,80 %**
- **30 ans** : environ **3,50 %–3,90 %**

**Le « bonus logement » wallon / bruxellois / flamand**

Depuis les réformes de 2020-2023, le **bonus logement fédéral** (chèque-habitat) a été **supprimé** pour les nouvelles acquisitions. Les régions ont chacune leur dispositif :

- **Wallonie** : chèque habitat supprimé depuis 2025 pour les nouveaux contrats ; réduction régionale limitée aux crédits antérieurs à 2025.
- **Bruxelles-Capitale** : plus de réduction fiscale sur les emprunts souscrits après 2017 ; compensation via l'**abattement** sur les droits d'enregistrement.
- **Flandre** : bonus logement supprimé en 2020 ; la Flandre privilégie désormais les taux de droits réduits.

**Ratio d'endettement**

Les banques belges appliquent généralement un **taux d'endettement maximal de 33 %–40 %** : la somme de vos mensualités de crédit (y compris l'ASRD) ne doit pas dépasser ce pourcentage de vos revenus nets. Depuis les recommandations de la BNB de 2020, la **quotité de financement** est plafonnée à **90 %** (80 % pour un second bien).

**À prévoir en plus du crédit**

La mensualité calculée ici n'inclut pas :

- Les **droits d'enregistrement** (voir notre simulateur frais de notaire)
- Les **frais de notaire et honoraires** (≈ 2 à 4 % du prix d'achat)
- L'**assurance incendie** (obligatoire en tant qu'emprunteur)
- Les **précomptes immobiliers** annuels
- Les **charges de copropriété** éventuelles`,
  },
  faq: [
    {
      question: "Quelle est la formule exacte de calcul de la mensualité ?",
      answer:
        "La mensualité d'un prêt hypothécaire à taux fixe se calcule via la formule actuarielle M = C × i / (1 − (1 + i)⁻ⁿ), où C est le capital, i le taux mensuel (taux annuel ÷ 12) et n la durée en mois. Notre simulateur applique cette formule et y ajoute la prime d'assurance solde restant dû calculée sur le capital initial.",
    },
    {
      question: "L'assurance solde restant dû est-elle obligatoire en Belgique ?",
      answer:
        "L'ASRD n'est pas légalement obligatoire mais toutes les banques l'exigent pour accorder un crédit hypothécaire. Depuis la loi du 22 avril 2019, vous êtes libre de choisir votre assureur (délégation) et vous pouvez résilier votre contrat à tout moment après un an, moyennant un préavis de 2 mois. Comparez les offres : des écarts de 30 à 50 % sont fréquents.",
    },
    {
      question: "Quel est le taux d'endettement maximal autorisé en 2026 ?",
      answer:
        "Selon les recommandations de la Banque nationale de Belgique, le taux d'endettement ne doit généralement pas excéder 33 % à 40 % des revenus nets du ménage, toutes mensualités confondues (y compris assurance). La quotité de financement est plafonnée à 90 % pour une première habitation et 80 % pour un second bien (depuis 2020).",
    },
    {
      question: "Puis-je rembourser mon prêt hypothécaire par anticipation ?",
      answer:
        "Oui. Toute loi belge permet le remboursement anticipé d'un crédit hypothécaire, total ou partiel. L'indemnité de remploi est plafonnée à 3 mois d'intérêts sur le capital remboursé (article VII.145 du Code de droit économique). Elle est due uniquement si le contrat le prévoit ; certains contrats la prévoient nulle pour un remboursement partiel annuel limité.",
    },
    {
      question: "Le taux annuel effectif global (TAEG) est-il inclus ?",
      answer:
        "Ce simulateur indique le taux d'emprunt nominal et le taux d'assurance séparément. Le TAEG officiel intègre en plus les frais de dossier (~500 €), les frais d'expertise (200-400 €), les frais d'inscription hypothécaire et les primes d'assurance obligatoires. Il figure obligatoirement sur l'offre de crédit remise par la banque avant signature.",
    },
  ],
  relatedSlugs: ["calcul-frais-notaire", "calcul-salaire-brut-net-belgique"],
};
