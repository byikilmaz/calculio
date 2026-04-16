import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Simulateur Dividendes vs Salaire Suisse 2026 | Calculio",
    description:
      "Arbitrage salaire vs dividende pour dirigeant SA/Sàrl : IS fédéral 8,5 % + canton, taxation partielle 70 % IFD / 50-70 % canton (VD GE VS FR NE JU BE).",
  },
  h1: "Simulateur Dividendes vs Salaire — Suisse 2026",
  intro:
    "Optimisez votre rémunération de dirigeant SA ou Sàrl : comparez salaire (AVS + LPP + IFD + canton) et dividende (IS + taxation partielle 70/50 %). 7 cantons romands.",
  explanation: {
    title: "Salaire ou dividende : l'arbitrage du dirigeant SA / Sàrl",
    body: `En Suisse, le dirigeant actionnaire d'une **SA** ou **Sàrl** peut se rémunérer en **salaire**, **dividende**, ou mix. L'arbitrage dépend de plusieurs leviers fiscaux et sociaux.

**1. Rémunération en salaire**

Le salaire est une **charge déductible** pour la société (réduit l'IS) mais il déclenche :

- AVS/AI/APG 5,3 % (salarié) + 5,3 % (société) = 10,6 %
- AC 1,1 % (plafond 148 200 CHF) + 1,1 % société
- LPP obligatoire (7-18 % selon âge)
- IFD + canton + commune côté personne physique

**2. Rémunération en dividende**

Le dividende ne déclenche **aucune charge sociale** pour le dirigeant s'il est actionnaire (≥ 10 % du capital). En revanche :

- Le bénéfice distribué est d'abord soumis à l'**impôt sur les sociétés** : IFD **8,5 %** + canton-commune (taux effectif variant de **11,85 % à Zoug** à **15 % à Vaud/Genève**, **13,87 % à Fribourg**, **20,5 % à Berne**)
- Au niveau personne physique, la **taxation partielle** s'applique (participation ≥ 10 %) :
  - **70 % imposé au niveau fédéral IFD** (toujours, art. 20 al. 1bis LIFD)
  - **50 à 70 % imposé au niveau cantonal** selon le canton (VD 70 %, GE 70 %, VS 60 %, FR 70 %, NE 60 %, JU 70 %, **BE 50 %**)
- L'**impôt anticipé 35 %** est retenu à la source par la société puis récupéré en déclaration

**3. Règle du salaire convenable (AVS)**

La caisse AVS peut **requalifier** un dividende excessif en salaire si le salaire effectif du dirigeant paraît insuffisant par rapport aux pratiques du secteur. Règle de prudence : verser un salaire au moins égal à celui qu'il faudrait pour embaucher un remplaçant.

**Exemple — enveloppe 200 kCHF, SA à Lausanne (IS 14 %), dirigeant célibataire 40 ans, 50/50**

- **Salaire** 100 kCHF → AVS + AC + LPP ~ 8,4 kCHF, IFD+cantonal/communal ~15 kCHF, net **~76,6 kCHF**
- Bénéfice restant 100 kCHF → IS Vaud 14 000 → dividende 86 000 CHF
- Imposition partielle dividende (70 %) : 60 200 CHF imposable au barème ~15 % effectif ≈ **9 kCHF**
- Net dividende ~77 kCHF
- **Net total ≈ 153 600 CHF** sur 200 000 CHF enveloppe → **taux global ≈ 23 %**

Comparer avec 100 % salaire : moins efficient car charges sociales et progression IFD plus fortes. 100 % dividende : risque de requalification AVS.`,
  },
  faq: [
    {
      question: "Quel ratio salaire/dividende est optimal en Suisse ?",
      answer:
        "Souvent 40-60 % en salaire et le reste en dividende pour un dirigeant Sàrl/SA, avec un salaire minimal conforme aux pratiques sectorielles pour éviter la requalification AVS. Utilisez le simulateur pour trouver votre optimum selon votre canton et votre âge (qui influence fortement la LPP).",
    },
    {
      question: "La taxation partielle s'applique-t-elle toujours ?",
      answer:
        "Uniquement si vous détenez au moins 10 % du capital de la société distribuant (art. 18b LIFD). En dessous, le dividende est imposé à 100 % comme tout revenu de placement. La détention directe et indirecte (via holding) compte.",
    },
    {
      question: "Pourquoi Berne a un taux partiel cantonal plus favorable (50 %) ?",
      answer:
        "Suite à la RFFA 2020, Berne a choisi de maintenir une taxation cantonale à 50 % pour rester attractif face à la forte charge IS totale du canton (20,5 %). Vaud, Genève, Fribourg et Jura ont porté leur taxation cantonale à 70 % alignée sur le fédéral. Valais et Neuchâtel sont à 60 %.",
    },
    {
      question: "L'impôt anticipé 35 % est-il perdu ?",
      answer:
        "Non, totalement récupérable pour un résident suisse qui déclare correctement le dividende. La société retient 35 % à la distribution, le bénéficiaire récupère le montant dans sa déclaration annuelle. Pour un non-résident, le taux final dépend de la convention fiscale bilatérale (0 %, 15 % ou 35 %).",
    },
    {
      question: "Dois-je me verser un salaire minimum ?",
      answer:
        "Il n'y a pas de minimum légal strict mais la caisse AVS peut requalifier en salaire les dividendes jugés excessifs. En pratique, pour un dirigeant à plein temps, un salaire AVS de 50-80 kCHF minimum est prudent, complété par dividende selon les résultats. Consultez un fiduciaire pour votre cas particulier.",
    },
  ],
  relatedSlugs: [
    "simulateur-independant-suisse",
    "calcul-salaire-brut-net-suisse",
  ],
};
