import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calculateur Pension Belgique 2026 | Calculio",
    description:
      "Estimez votre pension légale (1er pilier), assurance groupe (2ᵉ pilier) et épargne-pension (3ᵉ pilier) en Belgique. Barèmes SFPD et plafonds fiscaux 2026.",
  },
  h1: "Calculateur Pension Belgique 2026 — 1er / 2ᵉ / 3ᵉ Pilier",
  intro:
    "Projetez votre pension totale à 65 ans en combinant les trois piliers du système belge : pension légale (SFPD), assurance groupe employeur et épargne-pension individuelle.",
  explanation: {
    title: "Les trois piliers de la pension belge en 2026",
    body: `Le système de pension belge repose sur **trois piliers** complémentaires. Cumulés, ils définissent votre taux de remplacement à la retraite (pension / dernier salaire).

**1er pilier : pension légale (Service fédéral des Pensions — SFPD)**

C'est la pension de répartition financée par les cotisations ONSS / INASTI. Son montant dépend de trois éléments :

- **Le salaire moyen revalorisé** sur l'ensemble de la carrière (plafonné à ~74 668 € en 2026)
- **La durée de carrière** (max 45 ans pour une carrière complète)
- **Le taux** : 60 % (isolé) ou 75 % (ménage avec conjoint à charge sans revenu)

**Formule simplifiée** :

    Pension annuelle = (salaire moyen plafonné × taux × années) / 45

**Pension minimum 2026** (carrière complète) :

- Isolé : **~1 738 €/mois** brut
- Ménage : **~2 172 €/mois** brut

**Pension maximum 2026** (salarié, carrière complète, salaire ≥ plafond) : **~3 150 €/mois**.

Les carrières incomplètes reçoivent une pension proportionnelle, mais le plancher de pension minimum s'applique au prorata si au moins 30 ans de carrière effective sont prouvés.

**2ᵉ pilier : assurance groupe / PLCI**

Mise en place par l'**employeur** (assurance groupe collective ou individuelle) ou par l'**indépendant** (PLCI — pension libre complémentaire). Les versements sont :

- Déductibles fiscalement via la **règle des 80 %** (pension totale ne doit pas excéder 80 % du dernier salaire)
- Taxés à la sortie à **10 %** (si liquidation à l'âge légal, après carrière complète)

Le capital constitué porte un rendement garanti (actuellement **~2,00–2,25 %** pour les contrats récents type Branche 21), parfois augmenté d'une participation bénéficiaire.

**3ᵉ pilier : épargne-pension individuelle**

C'est un placement **volontaire** souscrit auprès d'une banque ou assurance, avec avantage fiscal 2026 :

- **Plafond ordinaire** : **1 020 €/an** → réduction d'impôt de **30 %** = économie max **306 €/an**
- **Plafond majoré** : **1 310 €/an** → réduction d'impôt de **25 %** = économie max **327,50 €/an** (l'option majorée doit être déclarée explicitement auprès de votre organisme)

Le capital final est taxé à **8 %** à 60 ans (taxation anticipée). Les rendements varient selon le support choisi (fonds d'épargne-pension, assurance Branche 21 ou 23).

**Exemple type 2026**

Salarié isolé de 35 ans, salaire moyen 45 000 €, 13 ans de carrière à date, départ à 65 ans avec :

- **1er pilier** : (45 000 × 60 % × 43) / 45 = **25 800 €/an** → **2 150 €/mois**
- **2ᵉ pilier** : 1 200 €/an × 30 ans × rendement 2,25 % → capital **≈ 50 800 €** → rente 4 %/an ≈ **170 €/mois**
- **3ᵉ pilier** : 1 020 €/an × 30 ans × rendement 3 % → capital **≈ 48 500 €** → rente ≈ **162 €/mois**
- **Total estimé** : **≈ 2 480 €/mois** (taux remplacement **≈ 66 %**)

**À retenir**

Le 1er pilier couvre rarement plus de **50–60 %** du dernier salaire. Les piliers 2 et 3 sont essentiels pour maintenir votre niveau de vie à la retraite. Plus vous commencez tôt, plus l'**effet d'intérêts composés** est décisif.`,
  },
  faq: [
    {
      question: "Quel est l'âge légal de la pension en Belgique en 2026 ?",
      answer:
        "L'âge légal est de 65 ans en 2026, 66 ans pour les personnes nées entre le 01/01/1960 et 31/12/1963 (départ dès 2025), et 67 ans pour celles nées après le 31/12/1963 (départ dès 2030). Une pension anticipée reste possible dès 63 ans si vous avez ≥ 42 années de carrière, ou dès 60 ans avec 44 années.",
    },
    {
      question: "Comment calcule-t-on le nombre d'années de carrière ?",
      answer:
        "Une année = 312 jours équivalents temps plein prestés. Comptent les périodes salariées, indépendantes et assimilées : chômage indemnisé, maladie, incapacité, service militaire, congé parental, crédit-temps. La carrière complète est de 45 ans (14 040 jours). Le Service fédéral des Pensions tient à jour votre compte sur mypension.be.",
    },
    {
      question: "Quelle différence entre taux isolé et taux ménage ?",
      answer:
        "Le taux isolé (60 %) s'applique à la plupart des pensionnés. Le taux ménage (75 %) s'applique si votre conjoint n'a pas de pension propre ou perçoit une pension très faible (< plafond ménage). Les deux conjoints peuvent choisir le taux le plus avantageux par décompte comparatif. Divorce ou décès : retour au taux isolé mais un pourcentage de la pension du conjoint décédé peut s'ajouter (pension de survie).",
    },
    {
      question: "L'épargne-pension est-elle intéressante si j'ai peu d'impôt ?",
      answer:
        "Non, pas forcément. Si votre taux marginal d'imposition est de 25 % (base), la réduction d'impôt de 30 % reste avantageuse. Mais au-delà de 60 ans, la taxation anticipée de 8 % réduit le rendement net. Si votre taux marginal est déjà de 25 % et que vous disposez d'autres placements fiscalement neutres (immobilier, compte-titres investi long terme), l'avantage peut être marginal. À arbitrer avec un conseiller patrimonial.",
    },
    {
      question: "Ce simulateur tient-il compte de la réforme des pensions 2024-2030 ?",
      answer:
        "Le simulateur applique les règles en vigueur en 2026. La réforme Vandenbroucke introduit progressivement une pension à points (malus/bonus pension), un bonus de pension jusqu'à 5 556 €/an net pour prolongation au-delà de l'âge légal, et un resserrement des années assimilées. L'impact précis dépend de votre date de naissance et sera affiné par le SFPD. Consultez votre estimation personnalisée sur mypension.be.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-belgique",
    "simulateur-epargne-belgique",
    "simulateur-independant-belgique",
  ],
};
