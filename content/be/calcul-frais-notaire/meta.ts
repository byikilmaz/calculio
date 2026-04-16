import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Frais de Notaire Belgique 2026 | Calculio",
    description:
      "Calculez gratuitement vos frais de notaire 2026 : droits d'enregistrement par région, honoraires notaire barème AR 1950, TVA 21 % et frais divers.",
  },
  h1: "Calcul Frais de Notaire Belgique 2026 — Achat Immobilier",
  intro:
    "Estimez le coût total d'achat d'un bien immobilier en Belgique : droits d'enregistrement selon la région, honoraires du notaire et frais divers.",
  explanation: {
    title: "Composition des frais de notaire en Belgique",
    body: `Lors d'un achat immobilier en Belgique, les **frais d'acte** (couramment « frais de notaire ») regroupent quatre éléments : les **droits d'enregistrement**, les **honoraires du notaire**, la **TVA** sur ces honoraires et les **frais divers** (recherches hypothécaires, inscriptions, documents cadastraux…).

**1. Droits d'enregistrement 2026**

Les droits d'enregistrement sont une compétence **régionale** : les taux varient donc selon la région du bien.

**Région wallonne** (Décret SCRIS du 19/12/2023, applicable depuis le 01/01/2025) :

- **12,5 %** : taux standard (investissement locatif, second bien, terrain à bâtir).
- **3 %** : taux réduit pour **habitation propre et unique** (le bien doit devenir votre résidence principale dans les 3 ans et vous ne devez pas déjà posséder un autre bien au moment de l'achat).

**Région de Bruxelles-Capitale** (Code bruxellois des droits d'enregistrement) :

- **12,5 %** : taux standard.
- **Abattement de 200 000 €** : si le bien est votre première habitation et son prix est ≤ 600 000 €, la base taxable est diminuée de 200 000 €. Exemple : bien à 400 000 € → droits calculés sur 200 000 € × 12,5 % = **25 000 €** (au lieu de 50 000 €).

**Région flamande** (VLABEL, depuis le 01/01/2024) :

- **12 %** : taux standard.
- **2 %** : taux réduit pour **primo-accédant** résidant dans le bien (remplace l'ancien 3 %).

**2. Honoraires du notaire (barème dégressif)**

Les honoraires suivent un barème officiel fixé par l'**Arrêté royal du 16 décembre 1950**. Ils sont dégressifs : plus le prix augmente, plus le pourcentage appliqué à la tranche supérieure diminue. En version simplifiée :

- De 0 à 50 000 € : **4 %**
- De 50 000 à 100 000 € : **2,5 %**
- Au-delà de 100 000 € : **0,57 %**

Exemple pour un bien à **300 000 €** : 50 000 × 4 % + 50 000 × 2,5 % + 200 000 × 0,57 % = **2 000 + 1 250 + 1 140 = 4 390 €** d'honoraires hors TVA.

**3. TVA sur les honoraires (21 %)**

Les honoraires du notaire sont soumis à la **TVA au taux normal belge de 21 %**. Dans l'exemple ci-dessus : 4 390 × 21 % ≈ **922 €** de TVA.

**4. Frais divers forfaitaires**

Un forfait couvre les recherches hypothécaires, cadastrales, urbanistiques, les extraits d'actes, les frais de mainlevée éventuelle et les inscriptions au registre des hypothèques. Ce forfait tourne autour de **1 000 à 1 400 €** selon le bien et la commune. Nous retenons **1 200 €** en valeur médiane pour cette simulation.

**Exemple complet : achat de 300 000 € en Wallonie, habitation unique**

- Droits d'enregistrement : 300 000 × 3 % = **9 000 €**
- Honoraires notaire : **4 390 €**
- TVA 21 % : **922 €**
- Frais divers : **1 200 €**
- **Total frais ≈ 15 512 €** (≈ **5,2 %** du prix)

Le même achat hors habitation unique entraînerait 300 000 × 12,5 % = 37 500 € de droits, soit ≈ 44 000 € de frais totaux (14,6 %).

**Ce que cette simulation n'inclut pas**

- **TVA 21 % sur le bien lui-même** : pour un logement neuf (< 2 ans ou « première vente »), la vente est soumise à 21 % de TVA et les droits d'enregistrement ne s'appliquent qu'au terrain.
- **Frais de crédit hypothécaire** : dossier banque, expertise, inscription hypothécaire (1 % du capital emprunté environ).
- **Frais d'agence immobilière** : 3–4 % + TVA, habituellement à charge du vendeur en Belgique.

**Paiement des frais d'acte**

Les frais sont avancés au notaire le jour de la signature de l'acte authentique, par virement sur le compte tiers de l'étude. Il les reverse ensuite aux différents créanciers (administration fiscale régionale, conservation des hypothèques, cadastre, TVA).`,
  },
  faq: [
    {
      question: "Les frais de notaire sont-ils négociables ?",
      answer:
        "Les honoraires du notaire et les droits d'enregistrement ne sont PAS négociables : ils suivent un barème officiel (Arrêté royal du 16/12/1950) et des taux régionaux. En revanche, les notaires ont la possibilité de réduire leurs honoraires sur les ventes de plus de 875 000 € (jusqu'à 50 % sur la tranche excédentaire). Les frais divers peuvent légèrement varier selon l'étude.",
    },
    {
      question: "Quand s'applique le taux réduit de 3 % (Wallonie) / 2 % (Flandre) ?",
      answer:
        "En Wallonie (depuis 2025) : vous devez devenir propriétaire de l'habitation, en faire votre résidence principale dans les 3 ans, et ne pas déjà posséder un autre bien au moment de l'achat. En Flandre (depuis 2024) : même principe pour le taux de 2 %. Ces conditions sont vérifiées par la Région ; en cas de non-respect (revente rapide, non-occupation), le supplément de droits est dû avec intérêts.",
    },
    {
      question: "Comment fonctionne l'abattement de 200 000 € à Bruxelles ?",
      answer:
        "Selon le Code bruxellois, si vous achetez votre première habitation et que le prix ne dépasse pas 600 000 €, la base imposable est réduite de 200 000 €. Vous devez devenir propriétaire et occuper le bien dans les 2 ans. L'économie maximale est de 25 000 € (200 000 × 12,5 %). Pour un bien à 600 001 €, aucun abattement ne s'applique — l'effet de seuil est brutal.",
    },
    {
      question: "Puis-je déduire les frais de notaire de mes impôts ?",
      answer:
        "Non pour une résidence principale (supprimé dans les 3 régions depuis 2020). Pour un investissement locatif, les frais d'acte peuvent être amortis sur la durée d'usage du bien (généralement 33 ans), mais pas directement déduits l'année de l'achat. Consultez votre comptable ou le SPF Finances pour votre situation précise.",
    },
    {
      question: "Y a-t-il des différences entre notaires ?",
      answer:
        "Les honoraires et droits sont identiques quel que soit le notaire (barème officiel). Vous choisissez donc votre notaire selon la proximité, la disponibilité et la qualité du conseil. Pour une vente, acheteur et vendeur peuvent désigner chacun leur notaire : les honoraires sont alors partagés en deux, sans surcoût pour les parties. Votre choix de notaire ne coûte rien de plus.",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-hypothecaire",
    "calcul-droits-succession-belgique",
  ],
};
