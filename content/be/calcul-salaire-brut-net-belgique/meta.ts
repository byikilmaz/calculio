import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Salaire Brut Net Belgique 2026 | Calculio",
    description:
      "Convertissez votre brut en net belge 2026 : ONSS salarié 13,07 %, bonus à l'emploi, précompte professionnel, additionnels communaux. Barème officiel SPF Finances.",
  },
  h1: "Calcul Salaire Brut Net Belgique 2026 — ONSS & Précompte",
  intro:
    "Estimez votre salaire net belge à partir du brut en appliquant les taux 2026 : cotisations ONSS, bonus à l'emploi, barème IPP et additionnels communaux. Détail complet ligne par ligne.",
  explanation: {
    title: "Du brut au net en Belgique : les étapes 2026",
    body: `En Belgique, le passage du **salaire brut** au **net à payer** suit une mécanique en trois étapes : cotisations de sécurité sociale (**ONSS**), calcul de la **base imposable**, puis application du **précompte professionnel** (impôt retenu à la source) majoré des **additionnels communaux**.

**1. Cotisations ONSS salarié (13,07 %)**

Tout travailleur salarié (employé ou ouvrier) verse à l'Office national de sécurité sociale une cotisation globale de **13,07 %** de son salaire brut. Cette cotisation finance l'assurance maladie-invalidité, les allocations familiales, le chômage, les pensions et les vacances annuelles. Depuis 2024, l'assiette des ouvriers a été alignée sur celle des employés (plus de requalification à 108 %).

**2. Bonus à l'emploi (workbonus) 2026**

Pour soutenir les bas salaires, l'ONSS accorde une **réduction personnelle des cotisations** aux travailleurs dont le salaire brut mensuel reste modéré. En 2026, le bonus maximal compense intégralement les 13,07 % d'ONSS pour un brut mensuel inférieur à environ **2 000 €** ; il décroît linéairement pour s'annuler vers **3 100 €** brut. Ce bonus apparaît directement sur la fiche de paie et augmente le net à payer.

**3. Base imposable et précompte professionnel**

Après déduction de l'ONSS, on obtient la **base imposable**. Le précompte professionnel est calculé selon le **barème IPP 2026** applicable à l'exercice d'imposition 2026 (revenus 2025) :

- Jusqu'à **16 320 €** : **25 %**
- De 16 320 € à **28 800 €** : **40 %**
- De 28 800 € à **49 840 €** : **45 %**
- Au-delà de 49 840 € : **50 %**

De ce montant est soustraite la **quotité du revenu exemptée d'impôt** (10 910 € en 2026), qui produit une réduction de **2 727,50 €** (10 910 × 25 %). La quotité est majorée pour **enfants à charge** : +1 920 € pour 1 enfant, +4 920 € pour 2, +11 030 € pour 3, +17 800 € pour 4 (barème 2026 SPF Finances).

**4. Additionnels communaux**

Les communes belges prélèvent une **taxe additionnelle** sur le précompte fédéral, variant de **0 %** (quelques communes flamandes) à **9 %** (certaines communes wallonnes). La moyenne se situe autour de **7,5 %** en Wallonie et à Bruxelles. Cet additionnel s'ajoute à l'impôt fédéral pour donner le précompte total retenu.

**5. Net à payer**

Le **net mensuel** est enfin calculé en divisant : (base imposable − précompte total annuel) / 12. Un décompte annuel définitif intervient lors de votre **déclaration fiscale** l'année suivante : vous pouvez récupérer un trop-perçu (enfants à charge, achats épargne-pension, etc.) ou devoir un complément (revenus accessoires).

**Ordres de grandeur en 2026**

Pour un salarié isolé sans enfant, on observe typiquement :

- Brut **2 000 €/mois** → net environ **1 700–1 750 €** (bonus emploi plein)
- Brut **3 000 €/mois** → net environ **2 000–2 100 €**
- Brut **4 500 €/mois** → net environ **2 650–2 800 €**

Ces chiffres excluent chèques-repas, éco-chèques, voiture de société, bonus CCT 90 et 13e mois.`,
  },
  faq: [
    {
      question: "Quelle est la différence entre employé et ouvrier au niveau du net ?",
      answer:
        "Depuis 2024, il n'existe quasiment plus de différence. Les ouvriers et employés paient le même taux d'ONSS (13,07 % du brut réel) et suivent le même barème fiscal. Des différences subsistent sur le jour de carence, le pécule de vacances, le préavis et les formules de rémunération mais pas sur le net à payer du salaire courant.",
    },
    {
      question: "Qu'est-ce que le bonus à l'emploi (workbonus) 2026 ?",
      answer:
        "Le bonus à l'emploi est une réduction des cotisations ONSS personnelles accordée aux bas salaires. Selon le SPF Sécurité sociale 2026, il compense intégralement les 13,07 % d'ONSS pour un brut mensuel ≤ 2 000 € environ, puis décroît linéairement jusqu'à s'annuler autour de 3 100 €. Il figure explicitement sur la fiche de paie et augmente le net.",
    },
    {
      question: "Comment fonctionnent les additionnels communaux ?",
      answer:
        "Chaque commune belge fixe un taux d'additionnel communal appliqué sur l'impôt fédéral dû. Pour l'exercice 2026, ils varient de 0 % (ex. Knokke-Heist) à 9 % (certaines communes rurales wallonnes), avec une moyenne autour de 7,5 %. Consultez le site de votre commune ou le SPF Finances pour connaître le taux exact applicable à votre domicile au 1er janvier.",
    },
    {
      question: "Le précompte professionnel correspond-il exactement à l'impôt final ?",
      answer:
        "Pas exactement. Le précompte est une retenue à la source calculée par l'employeur selon des barèmes indicatifs du SPF Finances. Votre impôt définitif est fixé l'année suivante par l'avertissement-extrait de rôle après votre déclaration, qui tient compte de toutes vos charges (pension complémentaire, frais professionnels réels, chèques-repas, réductions pour dons, etc.).",
    },
    {
      question: "Ce simulateur tient-il compte des chèques-repas et éco-chèques ?",
      answer:
        "Non. Les chèques-repas (max. 8 €/jour dont 6,91 € à charge employeur), les éco-chèques (max. 250 €/an) et autres avantages extra-légaux (assurance groupe, voiture de société, GSM, bonus CCT 90) ne sont pas inclus. Ce simulateur couvre le salaire brut contractuel et ses retenues obligatoires.",
    },
  ],
  relatedSlugs: [
    "calcul-impot-personnes-physiques",
    "simulateur-pret-hypothecaire",
  ],
};
