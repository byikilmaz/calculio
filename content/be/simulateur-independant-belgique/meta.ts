import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Indépendant Belgique 2026 | Calculio",
    description:
      "Calculez vos cotisations INASTI 2026 et votre revenu net d'indépendant belge : paliers 20,5 % / 14,16 %, IPP fédéral, additionnels communaux.",
  },
  h1: "Simulateur Indépendant Belgique 2026 — Cotisations INASTI & Net",
  intro:
    "Estimez vos cotisations sociales INASTI et votre revenu net d'indépendant en Belgique à partir de votre revenu net professionnel annuel. Barèmes 2026 officiels.",
  explanation: {
    title: "Cotisations INASTI et IPP de l'indépendant belge en 2026",
    body: `Un travailleur **indépendant** belge (à titre principal, complémentaire ou étudiant) cotise auprès de l'**INASTI** (Institut national d'assurances sociales pour travailleurs indépendants) via une **caisse d'assurance sociale** (Acerta, Partena, Securex, Xerius, UCM…). Il paye ensuite l'**impôt des personnes physiques (IPP)** sur le revenu net professionnel.

**1. Assiette des cotisations INASTI**

Les cotisations sont calculées sur le **revenu professionnel net de l'année de cotisation** (provisoire la 1ʳᵉ année, définitif ensuite par régularisation). L'assiette = chiffre d'affaires − frais professionnels réels (ou forfaitaires).

**2. Paliers dégressifs 2026**

Les taux INASTI 2026, appliqués par tranches cumulatives :

- **20,50 %** sur la tranche **0 € → 75 546,63 €**
- **14,16 %** sur la tranche **75 546,63 € → 111 275,57 €**
- **0 %** au-delà du plafond de **111 275,57 €**

À ces cotisations s'ajoutent les **frais de gestion** de votre caisse d'assurance sociale (≈ 3,05 % des cotisations).

**3. Cotisation minimale forfaitaire (début d'activité)**

Un **primo-indépendant à titre principal** est soumis à une cotisation minimale calculée sur un revenu fictif de **17 170 € en 2026**, soit environ **880 €/trimestre** de cotisation forfaitaire. Les **primo-indépendants** peuvent demander une réduction des cotisations provisoires les 4 premiers trimestres si leur revenu est inférieur à certains seuils (13 039 € / 18 123 € en 2026).

**4. Indépendant à titre complémentaire**

Si vous exercez votre activité d'indépendant **en plus d'un emploi salarié** à au moins mi-temps (ou êtes pensionné, fonctionnaire…), vous relevez du régime complémentaire. Vous cotisez uniquement sur votre **revenu net réel** ; si celui-ci est inférieur à **1 865,45 €/an** (2026), vous êtes **dispensé** de cotisations.

**5. Déduction des cotisations et calcul de l'IPP**

Les cotisations INASTI sont **intégralement déductibles** du revenu professionnel. Vous obtenez ainsi la **base imposable** sur laquelle s'applique le barème IPP 2026 :

- 25 % jusqu'à 16 320 €
- 40 % de 16 320 € à 28 800 €
- 45 % de 28 800 € à 49 840 €
- 50 % au-delà

La **quotité du revenu exemptée d'impôt** (10 910 € en 2026) produit une réduction de 2 727,50 € (× 25 %), majorée pour enfants à charge. Les **additionnels communaux** (≈ 7,5 % en moyenne) s'appliquent ensuite sur l'impôt fédéral.

**6. Frais professionnels forfaitaires 2026**

Vous pouvez opter pour le **forfait fiscal de 3 %** (plafonné à 5 520 € × 3 %, soit max. 165 €) sans justificatifs, ou déduire vos **frais réels** (voiture, comptable, téléphone, bureau…). Pour la majorité des indépendants, les frais réels sont plus avantageux au-delà d'un certain niveau d'activité.

**Exemple : indépendant principal, revenu net 45 000 €, sans enfant, commune à 7,5 %**

- Cotisation INASTI : 45 000 × 20,5 % = **9 225 €**
- Frais de gestion caisse (~3,05 %) : **≈ 281 €**
- Cotisation totale : **≈ 9 506 €** (soit 2 377 €/trimestre)
- Base imposable ≈ 35 494 €
- Impôt selon barème ≈ 10 997 €
- Réduction quotité : −2 727 €
- Impôt fédéral ≈ 8 270 €
- Additionnels communaux : +620 €
- **Impôt total ≈ 8 890 €**
- **Revenu net ≈ 26 604 €/an** ou **2 217 €/mois**

**Prévoir les régularisations**

Vos cotisations sont provisoires et recalculées 2-3 ans plus tard sur la base du revenu réel. Si votre revenu augmente, une **régularisation** peut vous demander plusieurs milliers d'euros. Il est prudent de **surcotiser volontairement** dès que votre activité prend de l'ampleur ou de provisionner 20 à 25 % du revenu pour les cotisations finales.`,
  },
  faq: [
    {
      question: "Quelle est la différence entre indépendant principal et complémentaire ?",
      answer:
        "L'indépendant à titre principal consacre son activité principale à son activité indépendante et cotise sur l'ensemble de son revenu net, avec un plancher de ~880 €/trimestre en 2026. L'indépendant à titre complémentaire exerce son activité en plus d'un emploi salarié (mi-temps minimum) ou d'un statut assimilé (fonctionnaire, pensionné) : il cotise uniquement sur le revenu réel et peut être dispensé si celui-ci est inférieur à 1 865,45 €/an.",
    },
    {
      question: "Comment sont calculées les cotisations INASTI la première année ?",
      answer:
        "En début d'activité, l'INASTI fixe une cotisation provisoire sur un revenu fictif (~17 170 € en 2026 pour l'indépendant principal), soit ~880 €/trimestre. Le primo-indépendant peut demander une réduction s'il anticipe un revenu faible. Trois ans plus tard, les cotisations sont régularisées sur la base du revenu réel (via la déclaration fiscale). Une régularisation importante peut être réclamée si les revenus réels dépassent le fictif.",
    },
    {
      question: "Puis-je déduire mes cotisations INASTI de mes impôts ?",
      answer:
        "Oui, intégralement. Les cotisations sociales INASTI et les frais de gestion de la caisse d'assurance sociale sont déductibles en totalité comme frais professionnels. Ils réduisent donc votre base imposable avant calcul de l'IPP et des additionnels communaux.",
    },
    {
      question: "Quel est le plafond de cotisation INASTI en 2026 ?",
      answer:
        "Au-delà de 111 275,57 € de revenu net professionnel en 2026, aucune cotisation INASTI supplémentaire n'est due. Entre 75 546,63 € et ce plafond, le taux est réduit à 14,16 % (au lieu de 20,5 % sur la première tranche). Cela représente un plafonnement total annuel d'environ 20 570 € de cotisations INASTI.",
    },
    {
      question: "Ce simulateur tient-il compte de la PLCI (pension complémentaire) ?",
      answer:
        "Non. La Pension libre complémentaire pour indépendants (PLCI), plafonnée en 2026 à 8,17 % du revenu de référence (max 3 968,22 €), et la PLCI sociale (max 4 567,01 €) sont déductibles fiscalement mais non intégrées ici. Elles peuvent significativement réduire votre impôt et sont fortement recommandées. Consultez votre caisse ou un conseiller patrimonial.",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-belgique",
    "calcul-impot-personnes-physiques",
    "simulateur-dividendes-remuneration",
  ],
};
