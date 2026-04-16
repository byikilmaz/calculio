import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Retraite 2025 | Calculio",
    description:
      "Estimation gratuite de votre pension de retraite 2025 : régime général, complémentaire AGIRC-ARRCO, taux de remplacement et trimestres requis.",
  },
  h1: "Simulateur Retraite 2025 — Estimation Pension",
  intro:
    "Obtenez une estimation indicative de votre pension de retraite mensuelle combinant régime général et complémentaire AGIRC-ARRCO, selon votre âge de départ et votre salaire.",
  explanation: {
    title: "Comment est calculée la pension de retraite en France ?",
    body: `La pension de retraite d'un salarié du privé en France se compose de deux étages principaux : la **pension de base** servie par le régime général (CNAV / Sécurité sociale) et la **pension complémentaire** obligatoire versée par l'AGIRC-ARRCO. Cette simulation donne une estimation indicative des deux.

**1. Pension de base (régime général) :**

Elle se calcule selon la formule :

Pension = Salaire Annuel Moyen (SAM) × Taux × (trimestres validés / trimestres requis)

Le **SAM** correspond à la moyenne des 25 meilleures années de salaire, revalorisées, **plafonnée au PASS** (47 100 € annuels en 2025). Le **taux plein** est de **50 %** et s'obtient lorsque vous avez validé le nombre de trimestres requis par votre génération (172 trimestres, soit 43 ans de cotisation pour les personnes nées à partir de 1965 depuis la réforme de 2023).

Si vous partez sans tous vos trimestres avant l'âge d'annulation de la décote (67 ans), une **décote de 1,25 % par trimestre manquant** s'applique. À l'inverse, chaque trimestre au-delà du requis vous donne une **surcote de 1,25 %**.

**2. Pension complémentaire AGIRC-ARRCO :**

Vos cotisations salariales et patronales vous font accumuler des **points** pendant votre carrière. À la retraite, le nombre de points est multiplié par la valeur du point (1,4159 € au 1er novembre 2024). Notre simulateur utilise une **approximation** : ~25 % du salaire moyen × (années cotisées / 42). Pour un calcul précis, seul votre compte AGIRC-ARRCO fait foi.

**3. Âge légal de départ :**

Depuis la réforme de 2023, l'âge légal augmente progressivement de 62 à **64 ans** (pour la génération née en 1968 et après). Vous pouvez partir à 62 ans mais avec une décote si vous n'avez pas tous vos trimestres. L'âge d'annulation de la décote reste **67 ans** : à cet âge, vous bénéficiez du taux plein même sans tous les trimestres.

**Limites de cette estimation :**

- Ne prend pas en compte les **carrières longues** (départ anticipé dès 60 ans)
- Ignore les **majorations parentales** (10 % au-delà de 3 enfants)
- Suppose une carrière ininterrompue à partir de 22 ans
- N'intègre pas les régimes spéciaux (fonction publique, SNCF, RATP, etc.)
- Le SAM réel dépend de vos 25 meilleures années, pas du dernier salaire

**Pour un calcul officiel**, créez votre compte retraite sur **info-retraite.fr** ou **lassuranceretraite.fr** : vous obtiendrez votre relevé de carrière et un simulateur personnalisé utilisant vos données réelles.`,
  },
  faq: [
    {
      question: "Combien de trimestres faut-il pour la retraite à taux plein en 2025 ?",
      answer:
        "Pour les personnes nées à partir de 1965, il faut 172 trimestres validés (soit 43 ans de cotisation) pour bénéficier du taux plein de 50 % sur le régime général, depuis la réforme de 2023. Les générations antérieures ont des exigences progressivement plus basses.",
    },
    {
      question: "À quel âge peut-on partir à la retraite en 2025 ?",
      answer:
        "L'âge légal augmente progressivement de 62 à 64 ans selon l'année de naissance (64 ans pour les personnes nées à partir de 1968). À 67 ans, vous obtenez automatiquement le taux plein quelle que soit votre durée de cotisation. Des départs anticipés existent pour carrières longues et incapacité permanente.",
    },
    {
      question: "Comment fonctionne la pension complémentaire AGIRC-ARRCO ?",
      answer:
        "Vous accumulez des points tout au long de votre carrière à partir de vos cotisations. À la retraite, pension = nombre de points × valeur du point (1,4159 € au 1er novembre 2024). Un coefficient de solidarité (malus de 10 % pendant 3 ans) s'applique si vous partez dès l'ouverture des droits sans attendre un an supplémentaire.",
    },
    {
      question: "Qu'est-ce que le taux de remplacement ?",
      answer:
        "Le taux de remplacement est le rapport entre votre pension de retraite et votre dernier salaire d'activité. En France, il est en moyenne de 60 à 75 % pour un salarié du privé ayant effectué une carrière complète au SMIC, et 50 à 60 % pour les cadres à hauts revenus (plafonnement du régime général au PASS).",
    },
    {
      question: "Cette simulation est-elle fiable pour préparer ma retraite ?",
      answer:
        "Elle donne un ordre de grandeur utile pour se projeter mais ne remplace pas une simulation officielle. Pour un calcul personnalisé basé sur votre historique de cotisations réel (salaires, trimestres, points AGIRC-ARRCO), créez votre compte sur info-retraite.fr : toutes vos caisses y sont centralisées.",
    },
  ],
  relatedSlugs: [
    "simulateur-salaire-brut-net",
    "simulateur-epargne",
    "simulateur-impot-revenu",
  ],
};
