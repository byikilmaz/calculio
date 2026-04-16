import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Frais Kilométriques 2025 | Calculio",
    description:
      "Barème kilométrique 2025 officiel impots.gouv.fr : calcul gratuit des frais réels voiture (3 à 7 CV) pour votre déclaration d'impôt.",
  },
  h1: "Calcul Frais Kilométriques 2025 — Barème Officiel",
  intro:
    "Calculez vos frais de déplacement déductibles selon le barème kilométrique officiel 2025 publié par la DGFiP, pour votre déclaration d'impôt en frais réels.",
  explanation: {
    title: "Comment utiliser le barème kilométrique 2025 ?",
    body: `Le **barème kilométrique** de l'administration fiscale permet aux salariés d'évaluer forfaitairement leurs frais de déplacement domicile-travail et leurs déplacements professionnels lorsqu'ils optent pour la déduction des **frais réels** plutôt que l'abattement forfaitaire de 10 %.

Ce barème couvre l'ensemble des dépenses du véhicule : dépréciation, assurance, entretien, carburant, réparations. Il est publié chaque année au **Bulletin Officiel des Finances Publiques (BOFiP)** et utilisé pour la déclaration des revenus de l'année précédente.

**Barème 2025 (pour les revenus 2024) — Voitures**

Le montant déductible est calculé selon deux coefficients A et B, appliqués au kilométrage parcouru (d) :

Pour **3 CV et moins** :
- Jusqu'à 5 000 km : **d × 0,529**
- De 5 001 à 20 000 km : **d × 0,316 + 1 065 €**
- Au-delà de 20 000 km : **d × 0,370**

Pour **4 CV** : 0,606 · 0,340 + 1 330 · 0,407
Pour **5 CV** : 0,636 · 0,357 + 1 395 · 0,427
Pour **6 CV** : 0,665 · 0,374 + 1 457 · 0,447
Pour **7 CV et plus** : 0,697 · 0,394 + 1 515 · 0,470

**Majoration véhicules électriques**

Depuis 2021, le barème est **majoré de 20 %** pour les véhicules 100 % électriques, afin d'encourager la transition énergétique. Appliquez simplement un coefficient 1,20 au résultat du barème thermique correspondant.

**Conditions de déduction**

Pour déduire vos frais kilométriques en frais réels, vous devez :

- **Renoncer à la déduction forfaitaire de 10 %** pour l'ensemble du foyer fiscal
- **Justifier la réalité** des déplacements (distance domicile-travail, adresse professionnelle, tenue d'un carnet de route conseillée)
- **Être propriétaire ou utilisateur** du véhicule (location longue durée, crédit-bail inclus)
- Respecter la règle des **40 km** : au-delà d'un trajet quotidien de 40 km, l'administration peut demander des justifications
- Tenir compte du **plafond de 7 CV** : pour les véhicules de plus de 7 CV, c'est le barème 7 CV qui s'applique (pas au-delà)

**Quand opter pour les frais réels ?**

Calculez d'abord votre abattement forfaitaire de 10 % sur votre salaire net imposable (plafonné à 14 171 € en 2025). Si vos frais réels justifiés dépassent ce montant, l'option frais réels est avantageuse. Cela concerne principalement :

- Les salariés avec un long trajet domicile-travail (plus de 25 km / jour)
- Les commerciaux, consultants, techniciens mobiles
- Les salariés utilisant leur véhicule personnel pour des missions professionnelles

**Autres frais déductibles avec les frais réels**

En plus du barème kilométrique, vous pouvez déduire :

- Les frais de péage et de stationnement liés aux déplacements professionnels
- Les intérêts d'emprunt pour l'achat du véhicule au prorata d'utilisation professionnelle
- Les repas hors domicile (forfait 2025 : 5,40 € par repas)
- Les frais de formation professionnelle
- Les cotisations syndicales, vêtements de travail spécifiques, double résidence imposée

**Conservation des justificatifs** : gardez tous les justificatifs (factures, carte grise, attestations) pendant **3 ans** en cas de contrôle. Un carnet de route est fortement conseillé pour tracer vos déplacements.`,
  },
  faq: [
    {
      question: "Quelle différence entre frais réels et déduction forfaitaire de 10 % ?",
      answer:
        "La déduction forfaitaire de 10 % est automatiquement appliquée par l'administration sur votre salaire net imposable, plafonnée à 14 171 € en 2025. L'option frais réels vous permet de déduire vos dépenses réelles (barème kilométrique, repas, formation) si elles dépassent le forfait. Le choix se fait globalement pour chaque membre du foyer fiscal et pour l'année entière.",
    },
    {
      question: "Comment trouver la puissance fiscale de ma voiture ?",
      answer:
        "La puissance fiscale (exprimée en chevaux fiscaux ou CV) est indiquée sur votre carte grise à la rubrique P.6. Elle est différente de la puissance réelle (DIN) et dépend des émissions de CO₂ et de la cylindrée depuis la réforme de 1998. Une Renault Clio courante fait 4 à 5 CV, une SUV compacte 6 à 7 CV.",
    },
    {
      question: "Puis-je déduire les péages et le stationnement en plus du barème ?",
      answer:
        "Oui. Le barème kilométrique couvre uniquement les frais propres au véhicule (carburant, usure, assurance, entretien). Les frais de péage autoroutier et de parking payants liés aux déplacements professionnels sont déductibles en plus, sur présentation des tickets et factures.",
    },
    {
      question: "Le barème est-il applicable pour un véhicule de société ?",
      answer:
        "Non. Le barème kilométrique concerne uniquement les véhicules dont vous êtes propriétaire ou locataire (leasing / LLD). Si votre employeur met un véhicule de fonction à disposition, vous ne pouvez pas déduire de frais kilométriques : les frais sont déjà pris en charge par l'entreprise et constituent un avantage en nature imposable.",
    },
    {
      question: "Combien de kilomètres puis-je déclarer entre mon domicile et mon travail ?",
      answer:
        "Vous pouvez déduire un aller-retour quotidien jusqu'à 40 km sans justification particulière. Au-delà de 40 km de trajet simple, l'administration demande des justifications spéciales (éloignement géographique imposé, situation familiale, marché du travail). Le barème ne s'applique qu'aux jours effectivement travaillés (congés, RTT et arrêts exclus).",
    },
  ],
  relatedSlugs: [
    "simulateur-impot-revenu",
    "simulateur-salaire-brut-net",
    "simulateur-auto-entrepreneur",
  ],
};
