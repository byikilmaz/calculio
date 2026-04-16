import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Épargne 2026 | Calculio",
    description:
      "Calculez gratuitement la croissance de votre épargne 2026 avec intérêts composés : capital final, versements cumulés, intérêts et projection année par année.",
  },
  h1: "Simulateur Épargne & Intérêts Composés 2026",
  intro:
    "Projetez la croissance de votre épargne mois après mois grâce aux intérêts composés. Résultat détaillé année par année, total versé et intérêts gagnés.",
  explanation: {
    title: "Comment fonctionnent les intérêts composés ?",
    body: `Les **intérêts composés** sont le principe fondamental de l'épargne à long terme : les intérêts générés une année sont ajoutés au capital et produisent eux-mêmes des intérêts l'année suivante. Cette boule de neige financière, qu'Einstein aurait qualifiée de **"huitième merveille du monde"**, transforme une épargne régulière en capital significatif.

**La formule mathématique**

Avec un capital initial **C₀**, un versement mensuel **V**, un taux annuel **r** (converti en taux mensuel i = r/12) et une durée de **n** mois, le capital final est :

**Cₙ = C₀ × (1 + i)ⁿ + V × [(1 + i)ⁿ − 1] / i**

Le premier terme représente la croissance de votre capital initial, le second la somme des versements capitalisés.

**L'effet du temps**

L'impact du temps est exponentiel, pas linéaire. Un exemple concret : 200 € placés chaque mois à 5 % pendant 30 ans donnent environ **166 450 €**, dont **72 000 € de versements** et **94 450 € d'intérêts**. Le capital généré par les intérêts dépasse largement les versements à partir de la 20ᵉ année.

**Les placements usuels en France en 2026**

- **Livret A** : 2,4 % net (plafond 22 950 €), garanti par l'État, sans fiscalité
- **LDDS (Livret de Développement Durable et Solidaire)** : 2,4 % net (plafond 12 000 €)
- **LEP (Livret d'Épargne Populaire)** : 3,5 % net sous conditions de ressources (plafond 10 000 €)
- **Assurance-vie en fonds euros** : ~2,5 % à 3,5 % brut, fiscalité avantageuse après 8 ans
- **PEA (Plan d'Épargne en Actions)** : rendement moyen actions européennes ~6 à 8 % long terme, exonération après 5 ans
- **PER (Plan d'Épargne Retraite)** : déduction fiscale à l'entrée, imposition à la sortie

**Fiscalité des intérêts**

Les livrets réglementés (Livret A, LDDS, LEP, Livret Jeune) sont **exonérés d'impôt et de prélèvements sociaux**. Les autres placements sont soumis au **Prélèvement Forfaitaire Unique (PFU) de 30 %** : 12,8 % d'IR + 17,2 % de prélèvements sociaux. L'option barème progressif reste possible.

**Stratégies pour optimiser**

- **Automatiser les versements** : virement programmé en début de mois (avant les dépenses)
- **Maximiser les enveloppes à fiscalité favorable** : remplir Livret A, LDDS, LEP avant diversification
- **Diversifier à long terme** : mixer fonds euros (sécurité) et unités de compte (performance)
- **Inflation** : viser un rendement supérieur à l'inflation (2 % env.) pour conserver le pouvoir d'achat
- **Frais** : attention aux frais d'entrée, de gestion et d'arbitrage qui grignotent la performance

**Avertissement** : ce simulateur suppose un taux constant. Dans la réalité, les rendements varient (notamment en actions) et l'inflation érode le capital. Diversifiez et consultez un conseiller financier pour des projets long terme.`,
  },
  faq: [
    {
      question: "Qu'est-ce que le principe des intérêts composés ?",
      answer:
        "Les intérêts composés sont les intérêts générés non seulement par votre capital initial mais aussi par les intérêts accumulés des périodes précédentes. Plus la durée est longue, plus l'effet est spectaculaire : c'est le moteur principal de la capitalisation sur le long terme.",
    },
    {
      question: "Quel taux utiliser pour ma simulation ?",
      answer:
        "Utilisez un taux réaliste selon votre placement : 2,4 % pour le Livret A 2026, 2,5-3,5 % pour l'assurance-vie en fonds euros, 5-7 % pour un portefeuille actions diversifié long terme (ex. ETF monde). Pour une projection prudente, retenez le taux net après fiscalité et après inflation (2 %).",
    },
    {
      question: "Faut-il privilégier versement unique ou versements mensuels ?",
      answer:
        "Les versements mensuels (Dollar Cost Averaging) permettent de lisser les points d'entrée et de réduire le risque de timing, particulièrement utile pour les actions. Un versement unique est optimal si vous avez un capital disponible et que le marché est attractif. La combinaison des deux est souvent recommandée.",
    },
    {
      question: "Quels sont les placements sans risque en France en 2026 ?",
      answer:
        "Les livrets réglementés (Livret A, LDDS, LEP) sont garantis par l'État sans risque de perte en capital. Les fonds euros d'assurance-vie offrent une garantie du capital assurée par l'assureur. Les placements boursiers (PEA, actions, ETF) comportent un risque de perte en capital mais offrent historiquement le meilleur rendement long terme.",
    },
    {
      question: "Les intérêts sont-ils imposés chaque année ?",
      answer:
        "Cela dépend du support. Livret A, LDDS et LEP sont totalement exonérés. L'assurance-vie en fonds euros génère des prélèvements sociaux annuels (17,2 %), mais l'IR n'est dû qu'au rachat et avec abattement après 8 ans (4 600 € / 9 200 € couple). Le PEA est exonéré d'IR (pas de PS) si conservé 5 ans. Comptes-titres et livrets fiscalisés : PFU de 30 % sur intérêts perçus chaque année.",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-immobilier",
    "calculateur-retraite",
    "simulateur-impot-revenu",
  ],
};
