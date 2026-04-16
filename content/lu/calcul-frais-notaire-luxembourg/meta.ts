import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Frais de Notaire Luxembourg 2026 | Calculio",
    description:
      "Droits d'enregistrement 6 %, transcription 1 %, surcharge ville Luxembourg +3 %, crédit Bëllegen Akt 40 k€/pers. et émoluments notaire + TVA 17 %.",
  },
  h1: "Calcul Frais de Notaire Luxembourg 2026 — Droits & Bëllegen Akt",
  intro:
    "Calculez les frais d'acquisition pour un achat immobilier au Luxembourg 2026 : droits d'enregistrement 6 %, transcription 1 %, surcharge ville +3 %, crédit Bëllegen Akt (40 000 €/personne résidence principale) et émoluments notaire TVA 17 %.",
  explanation: {
    title: "Les frais d'acquisition immobilière au Luxembourg 2026",
    body: `L'achat immobilier au Luxembourg est grevé de frais **d'environ 7 à 10 %** du prix du bien, mais le **crédit Bëllegen Akt** peut réduire drastiquement ces frais pour une résidence principale.

**1. Droits d'enregistrement et transcription**

- **Droit d'enregistrement** : **6 %** du prix d'achat (droit fixe)
- **Droit de transcription** : **1 %** (publication au bureau des hypothèques)
- **Total base** : **7 %** du prix

Source : Loi du 22 frimaire an VII (loi de l'Enregistrement) — taux actualisés 2026.

**2. Surcharge communale ville de Luxembourg**

Pour les biens situés dans la commune de Luxembourg-Ville et certaines communes à forte densité :
- **+3 %** supplémentaires **sur la fraction du prix dépassant 300 000 €**

Exemple : 800 000 € à Luxembourg-Ville → surcharge = (800 000 − 300 000) × 3 % = **15 000 €**

**3. Crédit Bëllegen Akt — 40 000 € par personne**

Pour l'achat d'une **résidence principale** par une personne physique :
- Crédit de **40 000 € par acheteur** sur les droits d'enregistrement et transcription
- Plafonné aux droits effectivement dus (n'est pas remboursable)
- Loi budgétaire 2024 prorogée jusqu'à **fin 2027**
- Doit occuper le bien comme résidence principale dans les 2 ans, ≥ 2 ans consécutifs

**4. Émoluments notaire**

Le notaire perçoit des **émoluments** fixés par arrêté grand-ducal, dégressifs par tranches :
- Environ **0,5 à 1 %** du prix (en moyenne 0,8 %)
- Assujettis à **TVA 17 %**

**5. Débours (frais administratifs)**

- Frais de publication au bureau des hypothèques
- Extraits cadastraux
- Copies certifiées conformes
- Estimation : **500 à 1 500 €** selon complexité du dossier

**6. Sanity check — couple achetant 800 000 € résidence principale à Luxembourg-Ville**

- Droit enregistrement 6 % : **48 000 €**
- Droit transcription 1 % : **8 000 €**
- Surcharge ville (500 k€ × 3 %) : **15 000 €**
- **Total droits bruts : 71 000 €**
- Crédit Bëllegen Akt (couple × 40 k€) : **−71 000 €** (plafonné)
- **Droits nets : 0 €**
- Émoluments notaire (0,8 %) : 6 400 € + TVA 17 % = **7 488 €**
- Débours : 1 000 €
- **Total frais d'acquisition : ≈ 8 488 € (≈ 1,1 % du prix)**

Sans le Bëllegen Akt (ex : résidence secondaire ou locatif) : **79 488 €** soit ~10 % du prix.

**7. Cas particuliers**

- **Achat en VEFA** (vente en l'état futur d'achèvement) : TVA 17 % sur la construction + 7 % sur le terrain
- **SCI** ou société : pas de Bëllegen Akt disponible, droits pleins
- **Logement social** : exonération partielle sur programmes agréés (SNHBM, Fonds du Logement)`,
  },
  faq: [
    {
      question: "Le Bëllegen Akt est-il remboursable si je n'utilise pas tout ?",
      answer:
        "Non, le Bëllegen Akt n'est pas remboursable : il ne peut réduire les droits qu'à hauteur du montant dû. Pour un jeune couple achetant un bien de 200 000 € : droits dus 14 000 €, crédit disponible 80 000 €, crédit effectivement utilisé 14 000 € → droits à payer 0 €. Les 66 000 € restants sont perdus.",
    },
    {
      question: "Qu'est-ce que la surcharge ville de Luxembourg exactement ?",
      answer:
        "Depuis 2017, la commune de Luxembourg-Ville et plusieurs communes voisines appliquent une surcharge communale de 3 % sur les droits d'enregistrement pour la fraction du prix dépassant 300 000 €. Objectif : canaliser les recettes vers les communes les plus tendues. Informez-vous auprès de votre commune.",
    },
    {
      question: "Peut-on appliquer le Bëllegen Akt sur un bien ancien + rénovation ?",
      answer:
        "Oui, le Bëllegen Akt s'applique aux achats de biens existants (anciens) et neufs, à condition que le bien serve de résidence principale. Les travaux de rénovation postérieurs à l'achat ne sont pas concernés par ce crédit (ils peuvent en revanche ouvrir droit à d'autres aides comme PRIMeHouse).",
    },
    {
      question: "Les frais d'acquisition sont-ils déductibles ?",
      answer:
        "Pour la résidence principale : non, les frais d'acquisition ne sont pas déductibles de l'impôt sur le revenu (hors intérêts d'emprunt qui eux le sont). Pour un bien locatif, les frais entrent dans le coût de revient et réduisent la plus-value imposable lors de la revente.",
    },
    {
      question: "Faut-il payer en espèces les frais de notaire ?",
      answer:
        "Non, tout se règle par virement bancaire auprès de l'étude notariale. Le notaire calcule les droits dus, perçoit la somme totale (prix + frais) et reverse droits + TVA aux administrations compétentes. Vous recevez un décompte détaillé.",
    },
  ],
  relatedSlugs: [
    "simulateur-pret-immobilier-luxembourg",
    "calcul-plus-value-immobiliere-luxembourg",
  ],
};
