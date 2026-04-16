import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Dividendes vs Salaire Luxembourg 2026 | Calculio",
    description:
      "Comparez rémunération dirigeant Sàrl/SA : salaire (CCSS 12,45 % + IR) vs dividende (IS 24,94 % + demi-imposition + précompte 15 %). Scénarios optimisés.",
  },
  h1: "Simulateur Dividendes vs Salaire Luxembourg 2026 — Sàrl / SA",
  intro:
    "Comparez les trois scénarios de rémunération pour un dirigeant de Sàrl ou SA luxembourgeois : tout salaire (cotisations CCSS + IR), tout dividende (IS 24,94 % + demi-imposition actionnaire) ou mix optimisé.",
  explanation: {
    title: "Arbitrage salaire / dividende au Luxembourg 2026",
    body: `Le dirigeant d'une **Sàrl ou SA luxembourgeoise** peut choisir sa rémunération entre **salaire** et **dividende**. L'arbitrage dépend de son TMI personnel, de sa classe d'impôt et du bénéfice annuel de la société.

**1. Fiscalité société — IS 2026**

- **IS** : **17 %** (bénéfice > 200 000 €) / **15 %** (bénéfice < 175 000 €)
- **Fonds pour l'emploi** : **+7 %** de l'IS (majoration)
- **Impôt commercial communal (ICC)** : **6,75 %** à Luxembourg-Ville (variable 6-10 % selon commune)
- **Taux effectif combiné** : **≈ 24,94 %** à Luxembourg-Ville

**2. Salaire — côté dirigeant**

- **Cotisations CCSS salarié** : ~11-12,45 %
  - Pension 8,00 %
  - Maladie espèces 2,80 %
  - Maladie soins 0,25 %
  - Dépendance 1,40 %
- **IR** progressif 0-42 %
- **Fonds emploi +7 %** et dépendance

**3. Dividende — demi-imposition art. 115 LIR**

Pour des dividendes d'une **société résidente luxembourgeoise** :
- **50 % exonéré** (art. 115 LIR, demi-imposition)
- Les 50 % restants entrent dans le revenu imposable personnel
- **Précompte libératoire 15 %** retenu à la source, **imputable** sur l'IR dû
- Pas de cotisations CCSS

**4. Sanity check — bénéfice société 150 000 €, classe 1**

**Scénario A — Tout salaire (150 k€ brut)**
- Cotisations CCSS (11 %) ≈ 16 575 €
- IR + fonds emploi + dépendance ≈ 45 000 €
- **Net personnel ≈ 88 425 €**

**Scénario B — Tout dividende**
- IS société (24,94 %) : −37 410 €
- Bénéfice net distribué : 112 590 €
- Dividende imposable (50 %) : 56 295 €
- IR + fonds emploi ≈ 16 500 €
- Précompte 15 % imputable (16 890 €) → neutre
- **Net personnel ≈ 96 090 €**

**Scénario C — Mix 50/50**
- Salaire 75 k€ : net ≈ 48 000 €
- IS sur 75 k€ : −18 705 €
- Dividende : 56 295 € → net ≈ 48 000 €
- **Net total ≈ 96 000 €**

**Conclusion** : au Luxembourg, le **tout dividende** est souvent avantageux sur des revenus élevés grâce à la demi-imposition combinée à l'IS effectif modéré. Le tout salaire reste valable pour construire des droits à la pension CNAP et accéder au 3e pilier.

**5. Considérations non chiffrées**

- **Salaire** : cotise à CNAP (droits retraite) et couverture maladie complète
- **Dividende** : pas de cotisation pension, mais possible de cotiser comme indépendant en parallèle
- **Cash-flow société** : le versement de salaire est régulier ; le dividende requiert l'assemblée et un bénéfice distribuable
- **Conventions fiscales** : les frontaliers et non-résidents peuvent avoir un traitement spécifique`,
  },
  faq: [
    {
      question: "Quel seuil de salaire minimum pour un dirigeant Sàrl ?",
      answer:
        "Pas de minimum légal, mais la CCSS vérifie que le salaire est 'approprié' (lutte anti-évasion). Un dirigeant actif dans sa société doit généralement percevoir au moins le SSM (2 708 €/mois) pour éviter requalification. En dessous, la CCSS peut rétablir des cotisations fictives sur revenu plancher.",
    },
    {
      question: "Comment fonctionne exactement la demi-imposition ?",
      answer:
        "Article 115 LIR : 50 % des dividendes de sociétés résidentes LU (ou UE remplissant critères) sont exonérés. Les 50 % restants s'ajoutent au revenu imposable et sont taxés au barème progressif. L'objectif est d'éviter la double imposition économique (société + associé) : la société paie l'IS, l'associé paie seulement sur la moitié.",
    },
    {
      question: "Le précompte 15 % est-il perdu en fin d'année ?",
      answer:
        "Non : le précompte 15 % retenu à la source par la société est un acompte imputé sur l'IR dû à la personne. Si votre IR sur les dividendes est > 15 %, vous complétez ; s'il est < 15 %, vous récupérez l'excédent lors de la déclaration. Neutre au final pour un résident luxembourgeois.",
    },
    {
      question: "Pourquoi l'ICC varie-t-il selon la commune ?",
      answer:
        "L'Impôt Commercial Communal est fixé par chaque commune luxembourgeoise (taux d'assiette 3 % × coefficient multiplicateur 2,25-3,5 selon commune). Luxembourg-Ville : 6,75 % effectif. Communes rurales : parfois ≤ 6 %. Pour optimiser fiscalement, le siège social peut être implanté en zone à faible ICC.",
    },
    {
      question: "Le mix optimum dépend-il de ma classe d'impôt ?",
      answer:
        "Oui. En classe 2 (marié splitting), le barème est plus doux donc le salaire devient plus compétitif vs dividende. En classe 1 avec TMI élevé (39-42 %), le dividende garde l'avantage. Pour un calcul précis, testez plusieurs parts (0,3 / 0,5 / 0,7) avec votre bénéfice réel.",
    },
  ],
  relatedSlugs: [
    "simulateur-independant-luxembourg",
    "calcul-salaire-brut-net-luxembourg",
    "simulateur-impot-revenu-luxembourg",
  ],
};
