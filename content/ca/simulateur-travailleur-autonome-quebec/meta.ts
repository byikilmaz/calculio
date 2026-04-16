import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Travailleur Autonome Québec 2026 | Calculio",
    description:
      "Travailleur autonome Québec 2026 : RRQ double 12,8 % + 8 %, RQAP 0,878 %, FSS, TPS 5 % + TVQ 9,975 %, revenu net et impôt fédéral + QC.",
  },
  h1: "Simulateur Travailleur Autonome Québec 2026 — RRQ Double & Net",
  intro:
    "Calculez le revenu net d'un travailleur autonome québécois en tenant compte des 2 parts RRQ (12,8 % + 8 %), du RQAP autonome (0,878 %), du FSS et de l'obligation TPS/TVQ au-delà de 30 000 $.",
  explanation: {
    title: "Travailleur autonome au Québec : la double cotisation RRQ",
    body: `Le **travailleur autonome** (pigiste, consultant, entrepreneur individuel) au Québec paie à la fois la part employé **et** la part employeur des cotisations sociales, tout en conservant la flexibilité des déductions de frais réels.

**1. RRQ — 2 parts cumulées**

- **Base** : **12,8 %** (6,4 % × 2) sur la tranche 3 500 $ - MGA 71 300 $
- **Supplémentaire** : **8 %** (4 % × 2) sur MGA - MGAP₂ (71 300 - 81 200 $)

Soit pour un autonome à 100 000 $ de bénéfice :
- Base : (71 300 - 3 500) × 12,8 % = **8 678 $**
- Supp : (81 200 - 71 300) × 8 % = **792 $**
- Total RRQ : **9 470 $**

*Une moitié est déductible fédéralement (considérée part employeur).*

**2. AE — optionnelle**

Pas de cotisation AE obligatoire pour autonome. Inscription volontaire possible (1,31 %) pour prestations maternité/paternité/adoption — rarement rentable au Québec vu le RQAP.

**3. RQAP — 0,878 % (2 parts)**

Les deux parts (0,494 % + 0,384 %) sont dues par l'autonome, jusqu'au maximum assurable **94 000 $**, soit max **825 $/an**.

**4. FSS — identique au salarié**

Au-delà de **17 183 $**, 1 % du dépassement, plafond **1 000 $/an**.

**5. TPS / TVQ — obligation au-delà de 30 000 $**

Dès que le chiffre d'affaires des **4 derniers trimestres glissants** dépasse **30 000 $**, inscription obligatoire :
- **TPS 5 %** (fédéral — ARC)
- **TVQ 9,975 %** (Québec — Revenu Québec)

La taxe perçue est **remise au trimestre** (mensuelle si CA > 6 M). Les **CTI/RTI** (crédits de taxes sur intrants) permettent de récupérer la TPS/TVQ payée sur vos fournitures professionnelles.

**6. Déductions permises**

- Bureau à domicile : % superficie utilisée × (hypothèque intérêts, taxes, électricité, assurance, entretien)
- Véhicule : km pro / km total × (essence, entretien, amortissement, assurance, intérêts prêt auto)
- **Repas clients : 50 % déductibles seulement**
- Fournitures, sous-traitance, publicité, formation, frais bancaires : 100 %

**Exemple — pigiste 100 000 $ CA, 15 000 $ frais, 3 000 $ repas**

- Bénéfice imposable : 100 000 - 15 000 - 1 500 = **83 500 $**
- RRQ : ≈ 8 728 $
- RQAP : 825 $
- FSS : 663 $
- Impôt fédéral (après abattement QC) ≈ 7 750 $
- Impôt Québec ≈ 12 180 $
- **Revenu net ≈ 53 350 $** (≈ 4 450 $/mois)
- Taux global : **46,6 %**
- En plus : TPS 5 000 $ + TVQ 9 975 $ à percevoir et remettre`,
  },
  faq: [
    {
      question: "Puis-je m'incorporer pour payer moins ?",
      answer:
        "Oui, une SPCC (Société privée sous contrôle canadien) paie 12,2 % d'impôt sur la première tranche de 500 000 $. Utilisez notre simulateur Dividendes vs Salaire Québec pour comparer l'avantage d'incorporation.",
    },
    {
      question: "Dois-je payer des acomptes provisionnels ?",
      answer:
        "Oui, si votre impôt net dû dépasse 3 000 $ pour 2 années consécutives. Les acomptes sont trimestriels (mars, juin, septembre, décembre). Sans acomptes, vous aurez une grosse facture d'impôt en avril + des intérêts (6-8 %).",
    },
    {
      question: "Le bureau à domicile est-il vraiment déductible ?",
      answer:
        "Oui, si vous y effectuez votre activité principale (ou > 50 % du temps, ou l'utilisez régulièrement pour rencontrer des clients). Déduction proportionnelle à la superficie (ex : bureau 15 m² / maison 120 m² = 12,5 %). Ce simulateur agrège les frais réels dans le champ « frais réels ».",
    },
    {
      question: "Puis-je demeurer sous 30 000 $ pour éviter TPS/TVQ ?",
      answer:
        "Oui, c'est le seuil légal des petits fournisseurs. Mais attention : sans inscription TPS/TVQ, vous ne pouvez pas récupérer les taxes payées sur vos fournitures (CTI/RTI). Au-delà de 20 000 $ de frais pro annuels, l'inscription devient généralement avantageuse même sous 30 000 $ CA.",
    },
    {
      question: "Les contrats B2B sont-ils différents ?",
      answer:
        "Si votre client principal contrôle votre horaire, fournit vos outils et dicte vos méthodes, l'ARC peut requalifier la relation en salariat (« Personal Services Business »). Conséquences : pas de déductions, impôt fédéral majoré à 33 %. Contrats multiples, facturation indépendante et marque personnelle sont essentiels.",
    },
  ],
  relatedSlugs: [
    "simulateur-dividendes-salaire-quebec",
    "calcul-salaire-brut-net-quebec",
  ],
};
