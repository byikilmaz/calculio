import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Prêt Immobilier 2026 | Calculio",
    description:
      "Calculez gratuitement votre mensualité de prêt immobilier 2026 : taux, assurance emprunteur, coût total et tableau d'amortissement annuel.",
  },
  h1: "Simulateur de Prêt Immobilier 2026 — Mensualités",
  intro:
    "Obtenez en un clic votre mensualité de prêt immobilier, le coût total du crédit et l'échéancier annuel complet. Formule officielle de calcul, taux d'assurance inclus.",
  explanation: {
    title: "Comment est calculée votre mensualité de prêt ?",
    body: `La mensualité d'un **prêt immobilier à taux fixe** se calcule à partir de trois paramètres : le capital emprunté (C), la durée en mois (n) et le taux mensuel d'emprunt (i = taux annuel / 12). La formule actuarielle standard est :

**Mensualité = C × i / (1 − (1 + i)⁻ⁿ)**

Cette formule garantit que le capital est entièrement remboursé à l'échéance avec des échéances constantes. Au début du crédit, la part des intérêts dans chaque mensualité est importante ; elle diminue progressivement au profit du remboursement du capital.

À cette mensualité s'ajoute l'**assurance emprunteur** (ADE), souvent calculée sur le capital initial : mensualité d'assurance = capital × (taux assurance / 12). Elle couvre généralement le décès, l'invalidité permanente (PTIA) et l'incapacité de travail (IT-ITT).

Les taux moyens du marché en 2026 varient selon la durée :

- **15 ans** : autour de 3,10 % à 3,40 %
- **20 ans** : autour de 3,30 % à 3,60 %
- **25 ans** : autour de 3,50 % à 3,80 %

Le **taux d'assurance** est généralement compris entre 0,10 % et 0,60 % du capital emprunté selon votre âge, votre état de santé et votre délégation d'assurance. La loi Lemoine permet de changer d'assurance à tout moment depuis 2022.

Les banques appliquent un **taux d'endettement maximal de 35 %** (HCSF) : vos mensualités totales ne peuvent pas dépasser 35 % de vos revenus nets. Ce ratio inclut toutes vos charges de crédit.

Le **TAEG** (Taux Annuel Effectif Global) est le taux à comparer entre offres. Il intègre le taux nominal, l'assurance obligatoire, les frais de dossier, les frais de garantie (hypothèque ou caution) et les frais d'expertise. Il doit respecter le **taux d'usure** publié chaque trimestre par la Banque de France.

**À savoir :** les frais de notaire (7 à 8 % dans l'ancien, 2 à 3 % dans le neuf) et l'**apport personnel** (souvent 10 % minimum) ne sont pas inclus dans cette simulation. Prévoyez également les frais de dossier (env. 1 %) et les frais de garantie (caution Crédit Logement ou hypothèque).`,
  },
  faq: [
    {
      question: "Comment est calculée la mensualité d'un prêt immobilier ?",
      answer:
        "La mensualité d'un prêt à taux fixe se calcule avec la formule actuarielle : M = C × i / (1 − (1 + i)⁻ⁿ), où C est le capital, i le taux mensuel (taux annuel ÷ 12) et n la durée en mois. Notre simulateur applique cette formule exactement et y ajoute la mensualité d'assurance.",
    },
    {
      question: "Le taux d'assurance est-il obligatoire dans le calcul ?",
      answer:
        "Oui, car l'assurance emprunteur est exigée par toutes les banques pour couvrir le décès, l'invalidité et l'incapacité de travail. Depuis la loi Lemoine de 2022, vous pouvez choisir librement votre assureur (délégation d'assurance) et résilier à tout moment. Un taux de 0,10 % à 0,34 % est réaliste selon votre profil.",
    },
    {
      question: "Quel est le taux d'endettement maximal autorisé en 2026 ?",
      answer:
        "Le Haut Conseil de Stabilité Financière (HCSF) limite le taux d'endettement à 35 % des revenus nets, assurance incluse, sur une durée maximum de 25 ans (27 ans avec différé pour le neuf). Les banques peuvent y déroger dans 20 % de leurs dossiers, mais restent prudentes.",
    },
    {
      question: "Que signifie TAEG et comment le comparer ?",
      answer:
        "Le TAEG (Taux Annuel Effectif Global) est le taux qui intègre tous les frais obligatoires du crédit : taux nominal, assurance, frais de dossier, frais de garantie, frais d'expertise. C'est le seul indicateur comparable entre banques. Il doit respecter le taux d'usure publié chaque trimestre par la Banque de France.",
    },
    {
      question: "Puis-je rembourser mon prêt par anticipation ?",
      answer:
        "Oui. Tout emprunteur peut rembourser son prêt de manière anticipée, totalement ou partiellement. La banque peut facturer des Indemnités de Remboursement Anticipé (IRA) plafonnées à 6 mois d'intérêts sur le capital remboursé, sans pouvoir dépasser 3 % du capital restant dû. Certains contrats prévoient des IRA nulles sous conditions.",
    },
  ],
  relatedSlugs: [
    "calcul-plus-value-immobiliere",
    "simulateur-epargne",
    "simulateur-salaire-brut-net",
  ],
};
