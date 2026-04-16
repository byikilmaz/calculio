import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Plus-Value Immobilière 2025 | Calculio",
    description:
      "Simulez gratuitement l'imposition de votre plus-value immobilière 2025 : IR 19%, prélèvements sociaux 17,2%, abattements pour durée de détention.",
  },
  h1: "Calcul Plus-Value Immobilière 2025",
  intro:
    "Estimez l'impôt dû sur la revente d'un bien immobilier selon la durée de détention, avec application des abattements IR et prélèvements sociaux et de la surtaxe éventuelle.",
  explanation: {
    title: "Comment est imposée la plus-value immobilière en 2025 ?",
    body: `La **plus-value immobilière** est la différence entre le **prix de vente** d'un bien et son **prix d'acquisition corrigé**. Cette plus-value est soumise à deux impositions distinctes : l'**impôt sur le revenu (IR) à 19 %** et les **prélèvements sociaux (PS) à 17,2 %**, soit un total de **36,2 %** avant abattement.

**Exonération totale : la résidence principale**

La vente de votre résidence principale (RP) est **totalement exonérée** de plus-value (article 150 U du CGI). Le bien doit être votre habitation effective et habituelle au jour de la cession, ou vous devez l'avoir quittée depuis moins d'un an si vous avez engagé des diligences de vente.

**Le prix d'acquisition corrigé**

Il se compose de trois éléments :

- **Le prix d'achat initial** figurant sur l'acte notarié
- **Les frais d'acquisition** : frais réels sur justificatifs, ou **forfait de 7,5 %** du prix d'achat. Le plus favorable des deux est retenu.
- **Les travaux** (construction, agrandissement, amélioration) : frais réels sur factures d'entreprises, ou **forfait de 15 %** du prix d'achat **si le bien est détenu depuis plus de 5 ans**. Les travaux d'entretien et de réparation ne sont pas pris en compte.

**Les abattements pour durée de détention**

La plus-value brute est diminuée par des abattements progressifs, différents pour l'IR et les prélèvements sociaux :

- **Abattement IR** : 0 % avant 5 ans, puis 6 % par an de la 6ᵉ à la 21ᵉ année, et 4 % la 22ᵉ année → **exonération totale après 22 ans**.
- **Abattement PS** : 0 % avant 5 ans, puis 1,65 % par an de la 6ᵉ à la 21ᵉ année, 1,60 % la 22ᵉ année, puis 9 % par an de la 23ᵉ à la 30ᵉ année → **exonération totale après 30 ans**.

**Surtaxe sur les plus-values élevées**

Une **surtaxe progressive** s'ajoute lorsque la plus-value imposable (après abattements) dépasse **50 000 €** (article 1609 nonies G du CGI). Les taux vont de 2 % à 6 % par tranches de 50 000 €.

**Autres cas d'exonération**

- Cession d'un logement autre que la RP lorsque le cédant remploie le prix pour acquérir sa résidence principale dans les 24 mois
- Première cession d'un logement autre que la RP si le vendeur n'est pas propriétaire de sa RP
- Vente à un prix inférieur à **15 000 €**
- Détention supérieure à 22 ans (IR) ou 30 ans (PS)
- Retraités et invalides sous conditions de ressources

**Déclaration** : la plus-value est calculée et déclarée par le **notaire** lors de la vente sur le formulaire 2048-IMM. L'impôt est prélevé directement sur le prix de vente et reversé à l'administration fiscale.`,
  },
  faq: [
    {
      question: "Quel est le taux d'imposition de la plus-value immobilière en 2025 ?",
      answer:
        "La plus-value nette (après abattements) est taxée à 19 % au titre de l'impôt sur le revenu et 17,2 % au titre des prélèvements sociaux, soit un total de 36,2 %. Une surtaxe de 2 % à 6 % s'ajoute si la plus-value imposable dépasse 50 000 €.",
    },
    {
      question: "Quand la plus-value est-elle totalement exonérée ?",
      answer:
        "La résidence principale est exonérée en totalité quelle que soit la durée de détention. Pour un bien autre, l'exonération est totale après 22 ans pour l'IR et après 30 ans pour les prélèvements sociaux. D'autres cas existent (prix < 15 000 €, première cession d'un non-propriétaire, remploi pour achat de RP).",
    },
    {
      question: "Dois-je fournir les factures des travaux ?",
      answer:
        "Oui, pour retenir les travaux réels, vous devez produire les factures d'entreprises TVA incluse. Les travaux d'entretien et les dépenses locatives ne sont pas admis. Si vous détenez le bien depuis plus de 5 ans, vous pouvez opter pour le forfait de 15 % du prix d'achat sans justificatif.",
    },
    {
      question: "Qui calcule et paie l'impôt sur la plus-value ?",
      answer:
        "Le notaire procède au calcul lors de la signature de l'acte de vente sur le formulaire 2048-IMM, prélève le montant sur le prix de vente et le reverse à l'administration fiscale. Le vendeur reçoit donc le prix net d'impôt. La plus-value est ensuite mentionnée pour information sur la déclaration de revenus.",
    },
    {
      question: "L'abattement s'applique-t-il dès la première année de détention ?",
      answer:
        "Non. Aucun abattement n'est appliqué durant les 5 premières années de détention. Les abattements commencent à courir à partir de la 6ᵉ année révolue. Pour une vente anticipée (moins de 5 ans), la plus-value est donc imposée à 36,2 % sur la totalité.",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-immobilier",
    "simulateur-impot-revenu",
    "simulateur-epargne",
  ],
};
