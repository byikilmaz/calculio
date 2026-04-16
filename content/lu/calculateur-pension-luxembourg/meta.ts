import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calculateur Pension Luxembourg 2026 | Calculio",
    description:
      "Estimez votre pension CNAP 2026 : majoration proportionnelle 1,775 %, majoration forfaitaire 23,75 % × SSM, min 1 925 €/mois, max 9 628 €/mois + 3e pilier 3 200 €.",
  },
  h1: "Calculateur Pension Luxembourg 2026 — CNAP & 3e Pilier",
  intro:
    "Estimez votre future pension luxembourgeoise (CNAP) : majoration proportionnelle 1,775 % × salaire moyen × années, majoration forfaitaire 23,75 % × SSM × n/40, et prévoyance complémentaire art. 111bis jusqu'à 3 200 €/an déductibles.",
  explanation: {
    title: "La pension CNAP au Luxembourg en 2026",
    body: `Le Luxembourg dispose d'un **régime de pension unique** géré par la **CNAP** (Caisse Nationale d'Assurance Pension). La formule combine deux majorations, avec plafonds légaux et possibilité d'épargne complémentaire (3e pilier).

**1. Formule CNAP**

Pension mensuelle = **Majoration Proportionnelle (MP)** + **Majoration Forfaitaire (MF)**

- **MP annuelle = 1,775 % × salaire moyen × années de cotisation**
- **MF annuelle = 23,75 % × SSM annuel × (années / 40)**

SSM 2026 = **2 708 €/mois** (32 496 €/an).

**2. Plafonds 2026**

- **Minimum** : ~**1 925 €/mois** (pour 40 ans de carrière)
- **Maximum** : ~**9 628 €/mois** (plafond = 5× SSM)
- **Années de carrière max** : 40 (au-delà pas de MP supplémentaire)

**3. Âge de départ**

- **Âge légal** : **65 ans** (départ normal)
- **Anticipé 60 ans** : sous condition **40 ans** de cotisation
- **Anticipé 57 ans** : sous condition **40 ans** dont 480 mois effectifs

**4. Taux de remplacement**

Formule : (pension annuelle / salaire moyen annuel). Au Luxembourg, pour 40 ans cotisés :
- Salaire 45 k€/an → pension ~2 800 €/mois → remplacement ~**74 %**
- Salaire 75 k€/an → pension ~5 300 €/mois → remplacement ~**85 %**
- Salaire 120 k€/an → pension ~8 500 €/mois → remplacement ~**85 %** (plafond devient contraignant)

**5. 3e pilier — Prévoyance complémentaire art. 111bis LIR**

Versements sur assurance-prévoyance :
- **Déduction max** : **3 200 €/an** (depuis 2017, indépendamment de l'âge)
- Sortie en rente viagère ou **capital** (part imposable)
- Au retrait : **50 % taxé au taux demi-global** (art. 131), **50 % à 25 % flat**

**Sanity check — 45 ans, 35 ans cotisés à 75 000 €**

- MP annuelle ≈ 1,775 % × 75 000 × 35 = **46 594 €** → 3 883 €/mois
- MF annuelle ≈ 23,75 % × 32 496 × 35/40 = **6 751 €** → 563 €/mois
- **Pension estimée ≈ 4 446 €/mois** (taux de remplacement ~71 %)

3e pilier — 2 000 €/an × 20 ans restants au TMI 39 % = **15 600 € d'économie fiscale cumulée**.`,
  },
  faq: [
    {
      question: "Qu'est-ce que le SSM et pourquoi compte-t-il ?",
      answer:
        "Le SSM (Salaire Social Minimum) est le salaire minimum luxembourgeois. En 2026 : 2 708 €/mois pour un salarié non qualifié de 18 ans et +. Il sert de référence à de nombreux paramètres (plafond sécu 5× SSM, pension minimum, abattement dépendance SSM/4).",
    },
    {
      question: "Peut-on cumuler pension luxembourgeoise et étrangère ?",
      answer:
        "Oui. Les règlements européens coordonnent les pensions : les années cotisées en France, Belgique, Allemagne s'ajoutent aux années luxembourgeoises pour atteindre le seuil d'ouverture. Chaque État verse sa quote-part au prorata des années cotisées chez lui. Attention aux démarches à initier 6-12 mois avant l'âge légal.",
    },
    {
      question: "Le 3e pilier est-il vraiment intéressant ?",
      answer:
        "Oui pour un TMI ≥ 30 %. À 3 200 €/an versés et 39 % de TMI, vous économisez 1 248 €/an. Sur 20 ans = 24 960 € économisés + capitalisation + rendement du contrat. Le gain dépend du frais de gestion du produit choisi et du rendement réel (2-4 % usuel).",
    },
    {
      question: "Quand puis-je prendre ma retraite à 57 ans ?",
      answer:
        "À 57 ans avec 40 ans de cotisation (480 mois effectifs, enfants comptant partiellement). Les années d'études/formation ne comptent généralement pas. Attention : une pension prise anticipée n'est pas forcément inférieure (pas de décote au LU contrairement à la France), mais une année de moins = moins d'années de MP.",
    },
    {
      question: "Les frontaliers ont-ils droit à la pension CNAP ?",
      answer:
        "Oui, les frontaliers cotisent au CNAP comme les résidents et acquièrent les mêmes droits. Leur pension est versée au Luxembourg. Une convention fiscale détermine dans quel État la pension sera imposée (généralement à la résidence, avec application de la convention bilatérale).",
    },
  ],
  relatedSlugs: [
    "calcul-salaire-brut-net-luxembourg",
    "simulateur-epargne-luxembourg",
    "simulateur-impot-revenu-luxembourg",
  ],
};
