import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Dividendes vs Rémunération Belgique 2026 | Calculio",
    description:
      "Optimisez votre rémunération de dirigeant SRL/SA : IS 20 %/25 %, VVPR-bis 15 %, INASTI 20,5 %, IPP. Comparez salaire vs dividende en Belgique.",
  },
  h1: "Simulateur Dividendes vs Rémunération SRL/SA — Belgique 2026",
  intro:
    "Comparez votre net dans la poche en choisissant entre rémunération de dirigeant et dividende pour une enveloppe brute société donnée en Belgique.",
  explanation: {
    title: "Arbitrer salaire vs dividende en société belge en 2026",
    body: `Un dirigeant de **SRL** (société à responsabilité limitée, ex-SPRL) ou **SA** en Belgique dispose de deux canaux principaux pour extraire de la valeur de sa société : la **rémunération de dirigeant** (charge déductible à l'IS) et le **dividende** (distribué sur bénéfices après impôt). L'arbitrage se joue entre quatre barèmes fiscaux.

**1. Rémunération de dirigeant**

La rémunération est une **charge déductible** pour la société. Elle ne paye pas d'IS, mais elle subit dans la sphère du dirigeant :

- **Cotisations INASTI** (le dirigeant est assimilé indépendant, PAS soumis à l'ONSS 13,07 %)
  - 20,5 % jusqu'à **75 546,63 €** (2026)
  - 14,16 % entre seuil et plafond (**111 275,57 €** en 2026)
  - Plus frais de gestion caisse (~3,05 %)
- **IPP** selon barème 25 / 40 / 45 / 50 %
- **Additionnels communaux** (≈ 7,5 % en moyenne)

**2. Dividende ordinaire**

Le bénéfice reste dans la société et subit d'abord l'**impôt des sociétés (IS)** :

- **Petite société (PME)** au sens de l'art. 1:24 CSA : **20 %** sur les premiers **100 000 €**, puis **25 %**
- **Grande société** : **25 %** dès le premier euro

Le résultat net est distribué en **dividende**, soumis au **précompte mobilier** :

- **30 %** ordinaire (dividende classique, grande société ou SRL sans conditions)
- **20 %** VVPR-bis — 2ᵉ exercice après l'apport en numéraire (PME)
- **15 %** VVPR-bis — 3ᵉ exercice et au-delà (PME)

**Conditions VVPR-bis** (art. 269, § 2 CIR 92) :

- Société qualifiée de **petite société** (art. 1:24 CSA : 2 critères / 3 non dépassés — 50 ETP, 9 M€ CA, 4,5 M€ total bilan)
- **Apports en numéraire** réalisés après le 01/07/2013
- Bénéfices **mis en réserve** pendant au minimum 2 ans (pour le 20 %) ou 3 ans (pour le 15 %)
- Actions émises lors de l'apport n'ayant fait l'objet d'aucun remboursement partiel
- SRL ou SA

**3. Comparaison simple sur 120 000 € d'enveloppe brute société (PME, VVPR-bis 15 %, commune 7,5 %)**

*Scénario 100 % salaire :*

- Rémunération brute dirigeant : **120 000 €**
- INASTI (taux dégressif, plafond 20 570 €) : **≈ 19 500 €**
- Frais gestion caisse : ≈ 595 €
- Base imposable : ≈ 99 905 €
- Impôt IPP + additionnels : **≈ 39 200 €**
- **Net rémunération : ≈ 60 700 €**

*Scénario 100 % dividende :*

- IS PME : 100 000 × 20 % + 20 000 × 25 % = **25 000 €**
- Dividende brut : 120 000 − 25 000 = 95 000 €
- Précompte VVPR-bis 15 % : **14 250 €**
- **Net dividende : 80 750 €**

*Scénario 50/50 (60 000 salaire + 60 000 à la société → dividende) :*

- Salaire : brut 60 000 € → INASTI ≈ 12 300 €, IPP ≈ 15 200 € → **net ≈ 32 500 €**
- Dividende : 60 000 × (1 − 20 %) × (1 − 15 %) = **40 800 €**
- **Net total : ≈ 73 300 €**

Sur cet exemple, le **dividende pur** bat largement le salaire pur grâce au cumul IS PME (20 %) + VVPR-bis (15 %) = **32 %** au lieu de 50-60 % pour le salaire. Mais attention aux contreparties.

**4. Contreparties du dividende**

- **Pas de droit au chômage** en cas d'échec de la société
- **Cotisations INASTI à 0** si vous ne vous versez aucune rémunération → moins de points pension, moins de couverture soins de santé étendue
- Le **salaire minimum d'administrateur** pour bénéficier du taux réduit à l'IS (20 %) est de **45 000 €/an** (ou ≥ bénéfice imposable si < 45 000)
- Les **frais déductibles** (voiture, frais de représentation…) transitent plus facilement via une rémunération que via un dividende
- Le régime **VVPR-bis** exige une patience de 2-3 ans de mise en réserve

**5. Règle pratique de l'administrateur rémunéré**

Pour conserver le **taux IS réduit à 20 %** (PME), vous devez vous verser une rémunération minimum de **45 000 €/an** (ou l'équivalent de votre bénéfice imposable si celui-ci est inférieur à 45 000). Sinon, l'IS passe à 25 % pleine (surcoût de 5 000 €/100 000 € de bénéfice).

**6. Optimum mathématique 2026 pour une PME**

Souvent, le couple optimal est :

- **45 000 € de rémunération** (minimum IS réduit + couverture sociale décente)
- Le reste en **dividende VVPR-bis 15 %**

Le taux effectif global descend alors vers **30-35 %** (vs 50 %+ en pur salaire), pour un budget brut société de 100 000 €. À affiner avec votre comptable selon votre situation familiale et patrimoniale.`,
  },
  faq: [
    {
      question: "Un dirigeant de SRL paye-t-il l'ONSS de 13,07 % ?",
      answer:
        "Non. Le dirigeant d'entreprise (gérant, administrateur) est juridiquement assimilé à un travailleur indépendant. Il cotise à l'INASTI aux taux 20,5 % / 14,16 % (2026), pas à l'ONSS salarié. Seuls les salariés sous contrat de travail (ouvrier, employé) paient les 13,07 % ONSS. Cette distinction est fondamentale pour comprendre l'arbitrage salaire vs dividende d'un dirigeant.",
    },
    {
      question: "Quelles sont exactement les conditions VVPR-bis 2026 ?",
      answer:
        "Votre société doit être une petite société (art. 1:24 CSA : 2 critères sur 3 respectés — ≤ 50 ETP, ≤ 9 M€ CA, ≤ 4,5 M€ bilan) durant l'exercice de distribution. Les actions concernées doivent provenir d'un apport en numéraire postérieur au 01/07/2013 (les apports en nature sont exclus). Les bénéfices doivent être mis en réserve 2 ans complets (précompte 20 % au 2ᵉ exercice) ou 3 ans (15 % au 3ᵉ exercice et suivants). Les actions ne doivent avoir fait l'objet d'aucun remboursement partiel entre l'apport et la distribution.",
    },
    {
      question: "Quelle rémunération minimum pour le taux IS réduit à 20 % ?",
      answer:
        "Pour bénéficier du taux réduit PME à 20 % sur la première tranche de 100 000 € de bénéfice (art. 215 CIR 92), la société doit attribuer à au moins un dirigeant d'entreprise une rémunération minimum de 45 000 €/an ou ≥ bénéfice imposable si celui-ci est inférieur à 45 000 €. À défaut, le taux normal de 25 % s'applique à tout le bénéfice, entraînant un surcoût fiscal de 5 000 €/100 000 €.",
    },
    {
      question: "Le dividende est-il plus avantageux que le salaire dans tous les cas ?",
      answer:
        "Non. Sur le pur plan fiscal, un dividende VVPR-bis 15 % + IS PME 20 % (soit 32 % cumul) bat le salaire (50 % IPP + INASTI au-delà de certains seuils). Mais le salaire ouvre des droits sociaux (pension, chômage dirigeants via ASCB, maladie plus complète), permet la déduction de frais professionnels (voiture, assurance groupe déductible) et doit atteindre 45 000 € pour sauvegarder l'IS réduit. L'optimum typique est souvent un mix 45 000 € salaire + reste en dividende.",
    },
    {
      question: "Ce simulateur tient-il compte de la taxe sur les comptes-titres ?",
      answer:
        "Non. La taxe annuelle sur les comptes-titres (TACT, 0,15 % sur comptes > 1 000 000 €) et la taxe sur opérations de bourse (TOB, 0,12–1,32 %) ne sont pas incluses. De même, les frais notariés d'augmentation de capital pour VVPR-bis, l'assurance dirigeant (EIP, PLCI), et les réserves de liquidation (alternative à la VVPR-bis : 10 % à la mise en réserve, puis 5 % après 5 ans à la sortie = ~14,5 % cumul) ne sont pas intégrés. Consultez votre comptable pour une optimisation sur mesure.",
    },
  ],
  relatedSlugs: [
    "simulateur-independant-belgique",
    "calcul-salaire-brut-net-belgique",
    "calcul-impot-personnes-physiques",
  ],
};
