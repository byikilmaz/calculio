import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Dividendes vs Salaire 2026 | Calculio",
    description:
      "Simulateur gratuit SASU 2026 : comparez rémunération en salaire ou dividendes, avec cotisations, IS et PFU 30 %. Arbitrage optimal en 2 clics.",
  },
  h1: "Simulateur Dividendes vs Salaire — SASU / SARL",
  intro:
    "Comparez en un clin d'œil la rémunération en salaire et en dividendes pour votre SASU. Cotisations, impôt sur les sociétés et flat tax pris en compte.",
  explanation: {
    title: "Salaire ou dividendes en SASU : comment choisir ?",
    body: `Le **dirigeant de SASU** (Société par Actions Simplifiée Unipersonnelle) a le choix entre se verser un **salaire** (assimilé-salarié, rattaché au régime général de la Sécurité sociale) et toucher des **dividendes** (taxés à la flat tax de 30 %). Chaque option a ses avantages et ses contraintes.

**Le salaire : protection sociale maximale**

Le salaire d'un président de SASU est soumis aux **cotisations sociales** du régime général :

- **Cotisations patronales** : environ **42 %** du salaire brut (couvrant maladie, vieillesse, famille, formation, accidents du travail)
- **Cotisations salariales** : environ **22 %** du salaire brut (CSG-CRDS, retraite, chômage)
- **Impôt sur le revenu** : barème progressif 0 %, 11 %, 30 %, 41 %, 45 %

**Coût total employeur** = salaire brut × 1,42 environ. Pour un bénéfice de 100 000 €, un budget salaire de 70 000 € donne un brut de ~49 300 € et un net après IR de ~28 000 €. Les cotisations ouvrent des droits à la **Sécurité sociale**, à la **retraite** (base + complémentaire AGIRC-ARRCO), aux **indemnités journalières** en cas d'arrêt maladie, et au **chômage** uniquement si vous êtes aussi salarié d'une autre entité.

**Les dividendes : fiscalité optimisée**

Les dividendes sont distribués sur le **bénéfice après impôt sur les sociétés**. La société paie d'abord l'IS :

- **15 %** jusqu'à 42 500 € de bénéfice (taux réduit PME)
- **25 %** au-delà (taux normal 2026)

Le dividende brut est ensuite soumis au **Prélèvement Forfaitaire Unique (PFU)** de **30 %** (12,8 % d'IR + 17,2 % de prélèvements sociaux), appelé aussi **flat tax**. L'option pour le barème de l'IR reste possible avec abattement de 40 %, souvent favorable aux TMI basses.

**Spécificité SARL gérant majoritaire**

Le **gérant majoritaire de SARL** (TNS — Travailleur Non Salarié) est dans une situation différente : les dividendes au-delà de **10 % du capital social, primes d'émission et apports en compte courant** sont soumis aux cotisations TNS (~45 %) et non au PFU. Ce calcul ne couvre pas ce cas.

**Arbitrage type**

Pour un bénéfice de **80 000 €** avant rémunération :

- **100 % salaire** : net final ≈ 32 000 € (taux effectif ~60 %)
- **100 % dividendes** : net final ≈ 47 000 € (IS 15 %, puis PFU 30 %)
- **Mixte 50/50** : net final ≈ 40 000 €, bon compromis protection sociale + optimisation fiscale

Les dividendes offrent un meilleur rendement immédiat, mais n'ouvrent **aucun droit social** : pas de cotisation retraite, pas d'assurance maladie (sauf affiliation personnelle), pas d'indemnités journalières.

**Stratégie recommandée**

- **Démarrage d'activité** : privilégier un **salaire minimum** pour valider des trimestres de retraite et cotiser à l'Assurance maladie, compléter par des dividendes
- **Situation stable avec autre couverture** (conjoint salarié, cumul emploi) : **majorer les dividendes**
- **Cotisation retraite complémentaire** : le salaire permet de cotiser à l'AGIRC-ARRCO, les dividendes non
- **Trésorerie** : les dividendes nécessitent un bénéfice constaté, votés en Assemblée Générale — moins souples qu'un salaire mensuel

**Simulation simplifiée** : ce simulateur applique des taux moyens (cotisations patronales 42 %, charges salariales + IR 43 % ≈ net/brut ×0,57). Les taux exacts dépendent de votre TMI, de votre couverture mutuelle, de la classe cadre/non-cadre et de la taille de la société. Pour une optimisation précise, consultez un expert-comptable.`,
  },
  faq: [
    {
      question: "Quel est l'arbitrage optimal entre salaire et dividendes en SASU ?",
      answer:
        "Il n'existe pas de règle universelle. Si vous avez une autre protection sociale (conjoint salarié, affiliation PUMA), les dividendes sont plus rentables. Si vous dépendez exclusivement de votre entreprise, un salaire minimum (environ 20 000 € brut) permet de valider 4 trimestres de retraite et de bénéficier de la Sécu. Au-delà, les dividendes sont plus avantageux fiscalement.",
    },
    {
      question: "Les dividendes SASU sont-ils soumis aux charges sociales ?",
      answer:
        "Non, contrairement aux SARL gérant majoritaire. Les dividendes d'une SASU sont soumis uniquement aux prélèvements sociaux (17,2 %) et à l'IR (12,8 % via PFU, ou barème). C'est un avantage majeur par rapport aux SARL où les dividendes au-delà de 10 % du capital sont soumis aux cotisations TNS (~45 %).",
    },
    {
      question: "Le PFU à 30 % est-il toujours applicable ?",
      answer:
        "Le PFU (flat tax) de 30 % est la règle par défaut depuis 2018. Vous pouvez opter pour l'imposition au barème progressif de l'IR lors de votre déclaration, avec un abattement de 40 % sur les dividendes bruts. Cette option est avantageuse si votre Tranche Marginale d'Imposition est à 11 % (économie sur IR), neutre à 30 %, et pénalisante à 41/45 %.",
    },
    {
      question: "Quels droits sociaux couvrent les cotisations de SASU ?",
      answer:
        "Les cotisations du président de SASU ouvrent les mêmes droits qu'un salarié du régime général : assurance maladie, maternité/paternité, retraite de base CNAV, retraite complémentaire AGIRC-ARRCO, prévoyance, accidents du travail. Attention : pas d'assurance chômage sauf en cas de cumul avec un contrat de travail salarié ailleurs.",
    },
    {
      question: "Faut-il créer une SASU plutôt qu'une SARL unipersonnelle (EURL) ?",
      answer:
        "Dépend de vos objectifs. SASU : statut assimilé-salarié (protection régime général), dividendes sans charges sociales, coûts de constitution équivalents. EURL : statut TNS (cotisations SSI 45 %), dividendes taxés au-delà de 10 % du capital. La SASU est souvent préférée pour les dirigeants voulant optimiser les dividendes ; l'EURL pour ceux cherchant des cotisations TNS moins chères sur le salaire.",
    },
  ],
  relatedSlugs: [
    "simulateur-auto-entrepreneur",
    "simulateur-salaire-brut-net",
    "simulateur-impot-revenu",
  ],
};
