import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Salaire Brut Net Québec 2026 | Calculio",
    description:
      "Convertissez votre salaire brut en net au Québec 2026 : RRQ, assurance-emploi, RQAP, FSS, impôt fédéral avec abattement Québec -16,5 % et impôt du Québec.",
  },
  h1: "Calcul Salaire Brut Net Québec 2026 — RRQ, AE, RQAP & Impôts",
  intro:
    "Estimez votre salaire net québécois à partir du brut annuel : cotisations RRQ (base + supplémentaire), assurance-emploi au taux réduit 1,31 %, RQAP 0,494 %, FSS, puis impôt fédéral (avec abattement -16,5 %) et impôt du Québec.",
  explanation: {
    title: "Du brut au net au Québec : les étapes 2026",
    body: `Au Québec, passer du **salaire brut** au **net à déposer** implique trois ensembles de prélèvements : les **cotisations sociales** (RRQ, AE, RQAP, FSS), l'**impôt fédéral** (avec l'abattement québécois) et l'**impôt du Québec**.

**1. RRQ — Régime de rentes du Québec**

Le RRQ remplace le RPC (CPP) pour les Québécois. En 2026, taux employé :
- **Base** : **6,4 %** sur la tranche 3 500 $ (exemption) à **MGA 71 300 $**
- **Supplémentaire** (RRQ₂) : **4 %** sur MGA → MGAP₂ **81 200 $**

Un travailleur à 75 000 $ paie ≈ 4 339 $ de base + 148 $ de supplémentaire = ≈ **4 487 $/an**.

**2. Assurance-emploi (AE) — taux réduit Québec**

Comme le Québec gère son RQAP, le taux AE est **réduit à 1,31 %** (vs 1,63 % ailleurs au Canada), plafonné à un maximum assurable **65 700 $/an**.

**3. RQAP — Régime québécois d'assurance parentale**

Le RQAP cotise **0,494 % côté employé** jusqu'à un maximum assurable de **94 000 $**, soit max **464 $/an**.

**4. FSS — Fonds des services de santé**

Au-delà de **17 183 $** de revenu, 1 % du dépassement, plafonné à **1 000 $/an**.

**5. Impôt fédéral 2026 avec abattement Québec -16,5 %**

Les 5 tranches fédérales (15 % < 57 375 $ / 20,5 % / 26 % / 29 % / 33 % > 253 414 $) s'appliquent normalement, puis l'impôt est **réduit de 16,5 %** grâce à l'**abattement Québec**. Crédit personnel de base **16 129 $**.

**6. Impôt du Québec 2026**

Quatre tranches progressives : **14 %** < 53 255 $ / **19 %** / **24 %** / **25,75 %** > 129 590 $. Crédit personnel de base **18 571 $**.

**Ordre de grandeur — célibataire 75 000 $ Montréal**

- Cotisations sociales ≈ **5 400 $** (RRQ + AE + RQAP)
- Impôt fédéral net (après abattement) ≈ **6 200 $**
- Impôt Québec ≈ **9 800 $**
- **Net ≈ 53 600 $/an** (≈ 4 470 $/mois)
- Taux de prélèvement effectif ≈ **28,5 %**`,
  },
  faq: [
    {
      question: "Pourquoi l'assurance-emploi est-elle moins chère au Québec ?",
      answer:
        "Le Québec gère son propre régime parental (RQAP), remplaçant les congés parentaux fédéraux. Ottawa réduit donc la cotisation AE québécoise à 1,31 % (vs 1,63 % ailleurs). En contrepartie, on cotise 0,494 % au RQAP.",
    },
    {
      question: "Qu'est-ce que l'abattement Québec de 16,5 % ?",
      answer:
        "Puisque le Québec finance lui-même de nombreux programmes fédéraux (santé, aide sociale), le gouvernement fédéral accorde un remboursement forfaitaire de 16,5 % de l'impôt fédéral payé par les résidents du Québec. Ce calcul l'applique automatiquement.",
    },
    {
      question: "Les régimes de retraite privés (REER, RPA) sont-ils inclus ?",
      answer:
        "Non, ce simulateur calcule le brut→net de base. Un versement REER réduit votre revenu imposable (déduction au taux marginal). Utilisez notre simulateur d'épargne Québec pour chiffrer l'avantage fiscal REER vs CELI.",
    },
    {
      question: "Pourquoi le FSS s'applique-t-il à mon salaire ?",
      answer:
        "Le Fonds des services de santé s'applique aux particuliers dès 17 183 $ de revenu (1 % du dépassement, max 1 000 $). Il finance le système de santé québécois et s'ajoute à l'impôt QC standard — rarement plafonné à 1 000 $ car il sature à 117 183 $ de revenu.",
    },
    {
      question: "Ce calcul inclut-il les taxes municipales et scolaires ?",
      answer:
        "Non, les taxes foncières, scolaires et de logement sont distinctes et dépendent de votre municipalité. Ce simulateur porte uniquement sur l'impôt sur le revenu + cotisations sociales fédérales/provinciales.",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu-quebec",
    "calculateur-retraite-quebec",
  ],
};
