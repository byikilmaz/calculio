import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Droits de Succession 2026 | Calculio",
    description:
      "Simulez gratuitement les droits de succession 2026 : abattements selon le lien de parenté (enfant, conjoint, frère), barème progressif et taux effectif.",
  },
  h1: "Calcul Droits de Succession 2026",
  intro:
    "Estimez les droits de succession à régler selon votre lien de parenté avec le défunt et le montant de votre part. Abattement handicap cumulable et exonération conjoint appliquées.",
  explanation: {
    title: "Comment sont calculés les droits de succession en 2026 ?",
    body: `Les **droits de succession** sont un impôt dû lors de la transmission d'un patrimoine au décès d'une personne. Leur calcul suit trois étapes : détermination de la part nette, application d'un **abattement** personnel selon le lien de parenté, puis application d'un **barème progressif** (ou d'un taux fixe) sur la part taxable.

**Étape 1 : la part nette reçue**

On additionne les biens transmis (immobilier, liquidités, placements, meubles, véhicules, parts d'entreprise) et on déduit :

- Le **passif** du défunt (dettes au jour du décès, impôts dus, factures impayées)
- Les **frais funéraires** (forfait de 1 500 € sur l'actif successoral)
- Les **donations antérieures** de moins de 15 ans (rappel fiscal)

**Étape 2 : les abattements personnels**

- **Enfant ou parent (ligne directe)** : 100 000 €
- **Conjoint marié ou partenaire de PACS** : **exonération totale** depuis la loi TEPA de 2007
- **Frère ou sœur** : 15 932 €
- **Neveu ou nièce** : 7 967 €
- **Autre héritier** (ami, concubin non PACS, cousin) : 1 594 €

**Abattement handicap** : 159 325 € supplémentaires **cumulables** avec l'abattement personnel si l'héritier est atteint d'une infirmité le rendant inapte au travail.

Ces abattements se reconstituent tous les **15 ans** pour les donations : vous pouvez donc donner 100 000 € à chacun de vos enfants tous les 15 ans en franchise d'impôt.

**Étape 3 : application du barème**

En ligne directe (enfants, parents), le barème 2026 est :

- Jusqu'à 8 072 € : **5 %**
- 8 072 € à 12 109 € : **10 %**
- 12 109 € à 15 932 € : **15 %**
- 15 932 € à 552 324 € : **20 %**
- 552 324 € à 902 838 € : **30 %**
- 902 838 € à 1 805 677 € : **40 %**
- Au-delà de 1 805 677 € : **45 %**

Entre **frères et sœurs** : 35 % jusqu'à 24 430 €, 45 % au-delà. Pour les **neveux et nièces** : taux fixe de **55 %**. Pour les **autres** (non-parents, concubins non pacsés) : taux fixe de **60 %**.

**Les exonérations totales**

- Conjoint marié / partenaire de PACS (loi TEPA)
- Frère ou sœur vivant sous le même toit que le défunt, célibataire, veuf ou divorcé, âgé de plus de 50 ans ou invalide
- Organismes reconnus d'utilité publique, fondations, associations caritatives

**Paiement des droits**

Les droits de succession sont à régler par les héritiers lors du dépôt de la déclaration de succession, dans les **6 mois** du décès (12 mois si le décès a eu lieu à l'étranger). Des facilités de paiement existent : paiement différé (actifs en nue-propriété), paiement fractionné (jusqu'à 10 ans avec intérêts). Consultez un **notaire** pour toute succession complexe.`,
  },
  faq: [
    {
      question: "Le conjoint paie-t-il vraiment 0 € de droits de succession ?",
      answer:
        "Oui. Depuis la loi TEPA du 21 août 2007, le conjoint marié et le partenaire de PACS sont totalement exonérés de droits de succession, quel que soit le montant transmis. Pour les couples en concubinage (union libre), aucune exonération ne s'applique et les droits sont calculés au taux de 60 % avec un abattement réduit à 1 594 €.",
    },
    {
      question: "Comment fonctionne l'abattement de 100 000 € entre parents et enfants ?",
      answer:
        "Chaque enfant bénéficie d'un abattement de 100 000 € sur la part qu'il reçoit de chacun de ses parents. Cet abattement se reconstitue tous les 15 ans : si votre parent vous a donné 100 000 € il y a plus de 15 ans, vous pourrez à nouveau en recevoir 100 000 € en franchise d'impôt, par donation ou succession.",
    },
    {
      question: "Les frais funéraires sont-ils déductibles ?",
      answer:
        "Oui, un forfait de 1 500 € est automatiquement déduit de l'actif successoral pour couvrir les frais d'obsèques, sans justificatifs. Au-delà, les frais réels peuvent être déduits sur présentation des factures. Les dettes au jour du décès (crédit en cours, impôts, factures) sont également déductibles.",
    },
    {
      question: "Quel est le délai pour payer les droits de succession ?",
      answer:
        "La déclaration de succession doit être déposée dans les 6 mois suivant le décès (12 mois si décès à l'étranger), avec paiement des droits à cette date. Un paiement fractionné sur 1 à 3 ans peut être demandé avec intérêts légaux. Un paiement différé (jusqu'à 6 mois après le dernier paiement) est possible si vous recevez de la nue-propriété.",
    },
    {
      question: "Le contrat d'assurance-vie est-il soumis aux droits de succession ?",
      answer:
        "Non, pas directement : l'assurance-vie bénéficie d'un régime fiscal propre. Les primes versées avant 70 ans profitent à chaque bénéficiaire d'un abattement de 152 500 €, au-delà un prélèvement de 20 % jusqu'à 852 500 € puis 31,25 %. Les primes versées après 70 ans suivent le barème des droits de succession au-delà de 30 500 € global.",
    },
  ],
  relatedSlugs: [
    "calcul-plus-value-immobiliere",
    "simulateur-epargne",
    "simulateur-impot-revenu",
  ],
};
