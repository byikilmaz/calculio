import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Droits Mutation Québec 2026 — Taxe Bienvenue | Calculio",
    description:
      "Taxe de bienvenue Québec 2026 : barème progressif 0,5 % / 1 % / 1,5 %, paliers majorés Montréal, Québec, Laval. Calcul droits mutation immobilière.",
  },
  h1: "Calcul Droits de Mutation Québec 2026 — Taxe de Bienvenue",
  intro:
    "Estimez la taxe de mutation (taxe de bienvenue) due à l'achat d'un immeuble au Québec : barème progressif par tranches avec paliers majorés pour Montréal, Québec et Laval.",
  explanation: {
    title: "Taxe de bienvenue : fonctionnement 2026",
    body: `Les **droits de mutation immobilière** — surnommés **taxe de bienvenue** depuis le ministre Bienvenue (1976) — sont perçus par la municipalité lors du **transfert de propriété** d'un immeuble au Québec. Elle est payable par l'**acheteur** dans les 30 jours suivant la publication du titre au registre foncier.

**Base d'imposition**

La taxe est calculée sur la **plus élevée** des trois valeurs :
- Prix de vente convenu
- Valeur au rôle d'évaluation × facteur comparatif
- Autre contrepartie stipulée à l'acte

**Barème provincial de base (toutes municipalités sauf exceptions)**

- **0,5 %** sur la tranche 0 à 59 700 $
- **1,0 %** sur la tranche 59 700 à 298 700 $
- **1,5 %** au-delà de 298 700 $

**Paliers municipaux majorés**

Les grandes villes appliquent des tranches supplémentaires au-delà de 500 000 $ :

**Montréal** :
- **2,0 %** : 500 000 - 1 000 000 $
- **2,5 %** : 1 000 000 - 2 000 000 $
- **3,5 %** : 2 000 000 - 3 000 000 $
- **4,0 %** : 3 000 000 +

**Ville de Québec** :
- **2,0 %** : 500 000 - 1 000 000 $
- **2,5 %** : 1 000 000 - 2 000 000 $
- **3,0 %** : 2 000 000 +

**Laval** :
- **2,0 %** : 500 000 - 1 000 000 $
- **2,5 %** : 1 000 000 +

**Autres municipalités** : 1,5 % continue au-delà de 298 700 $ (pas de palier supplémentaire).

**Exemple — maison 500 000 $ à Montréal**

- Tranche 1 : 59 700 × 0,5 % = **298 $**
- Tranche 2 : (298 700 - 59 700) × 1 % = **2 390 $**
- Tranche 3 : (500 000 - 298 700) × 1,5 % = **3 019 $**
- **Total taxe de bienvenue ≈ 5 707 $**

**Exemple — copropriété 750 000 $ à Montréal**

- Tranches 1-3 : 5 707 $ (comme ci-dessus)
- Tranche 4 : (750 000 - 500 000) × 2 % = **5 000 $**
- **Total = 10 707 $**

**Date de paiement**

La municipalité envoie l'avis **2 à 4 mois** après la transaction. À budgéter impérativement lors du montage financier (l'avis ne passe pas par l'hypothèque mais par la ville directement).

**Exemptions partielles courantes**

- Transfert entre conjoints mariés/unis civilement : **exemption totale**
- Transfert parent-enfant en ligne directe : exemption dans certaines conditions (résidence principale)
- Société contrôlée par le cédant : exemption selon montage
- Prime accession propriété Montréal : remboursement partiel aux nouveaux acquéreurs éligibles

**Rôle du notaire**

Le notaire perçoit généralement la taxe dans son compte en fidéicommis le jour de la signature et la remet à la municipalité. Certaines municipalités facturent directement l'acheteur après publication du titre.`,
  },
  faq: [
    {
      question: "Qui paie les droits de mutation ?",
      answer:
        "L'acheteur paie, systématiquement. C'est distinct des frais de notaire (qui couvrent les honoraires du juriste) et des frais hypothécaires. Montant à budgéter séparément dès la promesse d'achat — comptez 1 à 2 % du prix d'achat en règle générale.",
    },
    {
      question: "Les premiers acheteurs sont-ils exonérés ?",
      answer:
        "Pas au niveau provincial. Mais Montréal offre le Programme d'accession à la propriété : remboursement de 5 000 à 15 000 $ pour premier acheteur d'une habitation neuve, selon revenus et prix. Des programmes similaires existent ailleurs — vérifiez avec votre municipalité.",
    },
    {
      question: "Quelle valeur sert de base si le prix diffère de l'évaluation ?",
      answer:
        "La plus élevée entre prix convenu, valeur au rôle × facteur comparatif municipal (qui ajuste le rôle au marché actuel), et toute autre contrepartie. Attendre une valeur faible via négociation n'aide donc pas si l'évaluation municipale récente est supérieure.",
    },
    {
      question: "Peut-on financer cette taxe via l'hypothèque ?",
      answer:
        "Non, généralement. L'avis est émis après la transaction et payé à la municipalité directement. Prévoyez le cash nécessaire en plus de la mise de fonds et des frais de démarrage (notaire, inspection, déménagement). Certains prêts « complets » l'incluent mais c'est rare.",
    },
    {
      question: "Un achat en société ou fiducie change-t-il la donne ?",
      answer:
        "Pas directement sur le calcul — les paliers restent identiques. Mais certaines restructurations (fusion, roulement article 85) peuvent bénéficier d'exemptions. Consultez un notaire fiscaliste pour tout montage commercial ou patrimonial complexe.",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-hypothecaire-quebec",
    "calcul-plus-value-immobiliere-quebec",
  ],
};
