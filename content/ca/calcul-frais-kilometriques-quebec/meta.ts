import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Frais Kilométriques Québec 2026 | Calculio",
    description:
      "Barème ARC 2026 : 0,72 $/km les 5 000 premiers km, 0,66 $/km au-delà. Québec aligné sur le fédéral. Employé et travailleur autonome.",
  },
  h1: "Calcul Frais Kilométriques Québec 2026 — Barème ARC Officiel",
  intro:
    "Calculez votre indemnité kilométrique selon le barème fédéral 2026 (l'ARC et le Québec utilisent les mêmes taux) : 0,72 $/km pour les 5 000 premiers km, 0,66 $/km au-delà.",
  explanation: {
    title: "Barème kilométrique ARC 2026 — règle unique fédéral/Québec",
    body: `L'**Agence du revenu du Canada (ARC)** publie chaque année le barème officiel d'**indemnité kilométrique** pour l'utilisation d'un véhicule personnel à des fins professionnelles. **Revenu Québec** suit le même barème.

**Barème 2026**

- **0,72 $/km** pour les **premiers 5 000 km**
- **0,66 $/km** au-delà

**Remboursement employeur — non imposable**

Si votre employeur vous rembourse à ces taux ou moins, l'indemnité est **non imposable** (considérée comme couvrant vos frais réels : carburant, entretien, assurance, amortissement, immatriculation). Au-delà, l'excédent est traité comme un **avantage imposable**.

Pour le Yukon, Nunavut et Territoires du Nord-Ouest : +0,04 $/km supplémentaires.

**Travailleur autonome — frais réels proportionnels**

Un autonome déduit les **frais réels** du véhicule (carburant, assurance, amortissement, entretien, intérêts de prêt auto, location) au **prorata de l'usage professionnel** :

\`Frais pro = Frais réels × (km pro / km total annuel)\`

Exemple : véhicule coûtant 8 000 $/an en frais totaux, 12 000 km pro sur 20 000 km total → **déduction = 8 000 × 60 % = 4 800 $**.

**Tenue de registre obligatoire**

Tant salarié qu'autonome doit tenir un **journal de bord** (logbook) consignant :
- Date, lieu de départ et destination
- Kilométrage pro
- Objet du déplacement (client, chantier, fournisseur)

Sans registre, l'ARC ou Revenu Québec peut refuser la déduction lors d'une vérification.

**Exemple — salarié 40 km/jour, 5 j/sem, 46 semaines**

- Km annuels : 40 × 5 × 46 = **9 200 km**
- Tranche 1 : 5 000 × 0,72 = **3 600 $**
- Tranche 2 : 4 200 × 0,66 = **2 772 $**
- **Indemnité annuelle = 6 372 $** (≈ 531 $/mois)

**Trajet domicile-travail**

**Non déductible** pour un salarié (considéré comme déplacement personnel). Seuls les déplacements entre deux lieux de travail ou depuis un bureau principal vers des clients ouvrent droit au barème. Pour l'autonome avec **bureau à domicile**, tout km vers un client est professionnel.`,
  },
  faq: [
    {
      question: "Puis-je déduire mes frais si l'employeur me rembourse déjà ?",
      answer:
        "Non, pas la même portion. Si l'employeur rembourse 0,55 $/km (inférieur au barème), vous pouvez potentiellement déduire la différence (0,17 $/km), mais uniquement si vos frais réels sont supérieurs au remboursement reçu — le formulaire T777 (T2200 attestation employeur requise) couvre ce cas.",
    },
    {
      question: "Le domicile-travail est-il déductible pour un autonome ?",
      answer:
        "Si votre bureau est à domicile (résidence = lieu principal de travail), alors oui : tout déplacement vers un client, fournisseur ou lieu de chantier est professionnel. Sans bureau à domicile reconnu, le trajet vers le « bureau principal » est personnel.",
    },
    {
      question: "Les frais réels sont-ils toujours supérieurs au barème ?",
      answer:
        "Souvent, pour un véhicule neuf ou coûteux. Un VUS 50 000 $ peut générer 15 000 $/an de frais vs 10 000 $ au barème sur 14 000 km. Un autonome a intérêt à tenir des reçus pour déduire les frais réels proportionnels plutôt que le barème (applicable à l'employé).",
    },
    {
      question: "L'électrique est-il traité différemment ?",
      answer:
        "Non pour le barème de base. Mais les véhicules zéro émission ont un plafond d'amortissement accéléré (catégorie 54/55) jusqu'à 61 000 $ — avantageux pour les autonomes. L'électricité consommée est déductible comme carburant si usage pro.",
    },
    {
      question: "Le stationnement est-il inclus ?",
      answer:
        "Non, le stationnement client (clients visités) est déductible en sus, avec reçus. Le stationnement au bureau principal (lieu fixe) est souvent non déductible pour les salariés.",
    },
  ],
  relatedSlugs: [
    "simulateur-travailleur-autonome-quebec",
    "calcul-salaire-brut-net-quebec",
  ],
};
