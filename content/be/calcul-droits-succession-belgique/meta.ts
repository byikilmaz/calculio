import type { ToolContent } from "@/lib/types";

export const content: ToolContent = {
  meta: {
    title: "Calcul Droits de Succession Belgique 2026 | Calculio",
    description:
      "Simulez les droits de succession 2026 en Wallonie, Bruxelles et Flandre : barèmes par lien de parenté, abattements et exonération du logement familial.",
  },
  h1: "Calcul Droits de Succession Belgique 2026 — 3 Régions",
  intro:
    "Estimez les droits de succession dus selon la région du défunt et votre lien de parenté. Barèmes 2026 Wallonie, Bruxelles-Capitale et Flandre, avec abattements et exonérations.",
  explanation: {
    title: "Les droits de succession en Belgique : 3 régimes régionaux",
    body: `Depuis la **loi spéciale de financement** (1989) modifiée en 2001, les **droits de succession** sont une compétence **régionale** en Belgique. Les trois régions — Wallonie, Bruxelles-Capitale et Flandre — ont chacune leur propre code, leurs propres barèmes et leurs propres exonérations. Le régime applicable est celui de la région où le défunt avait sa **résidence fiscale** pendant au moins **5 ans avant son décès** (principe de fiscalité du domicile).

**Principe de calcul**

Quelle que soit la région, le calcul suit trois étapes :

1. Détermination de la **part nette** reçue (biens transmis moins passif et frais funéraires)
2. Application d'un **abattement** selon le lien de parenté
3. Application d'un **barème progressif** par tranches

**Wallonie — Ligne directe, conjoint, cohabitant légal**

Barème (Code wallon, art. 48) :

- 0 à 12 500 € : **3 %**
- 12 500 à 25 000 € : **4 %**
- 25 000 à 50 000 € : **5 %**
- 50 000 à 100 000 € : **7 %**
- 100 000 à 150 000 € : **10 %**
- 150 000 à 200 000 € : **14 %**
- 200 000 à 250 000 € : **18 %**
- 250 000 à 500 000 € : **24 %**
- Au-delà de 500 000 € : **30 %**

Abattement **12 500 €**, majoré de 12 500 € si l'actif net successoral est < 125 000 €. Le **conjoint** (et le **cohabitant légal**) est **exonéré sur le logement familial**.

**Bruxelles-Capitale — Ligne directe, conjoint, cohabitant légal**

Barème (Code bruxellois) :

- 0 à 50 000 € : **3 %**
- 50 000 à 100 000 € : **8 %**
- 100 000 à 175 000 € : **9 %**
- 175 000 à 250 000 € : **18 %**
- 250 000 à 500 000 € : **24 %**
- Au-delà de 500 000 € : **30 %**

Abattement **15 000 €**. **Conjoint et cohabitant légal sont totalement exonérés** sur le logement familial.

**Flandre — Ligne directe et partenaire**

Barème très simplifié (VLABEL) :

- 0 à 50 000 € : **3 %**
- 50 000 à 250 000 € : **9 %**
- Au-delà de 250 000 € : **27 %**

Pour le partenaire (marié ou cohabitant légal), **exonération totale** du **gezinswoning** (logement familial) et abattement de **50 000 €** sur le mobilier.

**Autres liens de parenté (simplifiés au barème wallon v1)**

Pour les successions non-directes (frères/sœurs, oncles/neveux, autres), les trois régions appliquent des barèmes proches mais non identiques. Cette simulation applique en v1 le **barème wallon** comme référence :

- **Frères / sœurs** : 20 % / 25 % / 35 % / 50 % / 65 % par tranches de 12 500 / 25 000 / 75 000 / 175 000 €.
- **Oncles, tantes, neveux, nièces** : 25 / 30 / 40 / 55 / 70 %.
- **Autres** (amis, concubins non cohabitants légaux) : 30 / 35 / 60 / 80 %.

Pour une simulation précise d'une succession bruxelloise ou flamande hors ligne directe, consultez un **notaire**.

**Exonérations remarquables**

- **Wallonie** : logement familial pour conjoint/cohabitant légal, entreprise familiale (0 %) sous conditions, certains dons manuels.
- **Bruxelles** : conjoint/cohabitant légal sur logement familial ; tarifs préférentiels pour entreprises familiales (3 %).
- **Flandre** : exonération totale du logement familial pour partenaire ; tarifs réduits pour actifs professionnels (3 %/7 %).

**Délai de déclaration et de paiement**

La **déclaration de succession** doit être déposée dans les **4 mois** suivant le décès si celui-ci a eu lieu en Belgique (5 mois si ailleurs en Europe, 6 mois hors Europe). Le paiement est dû lors du dépôt. Des intérêts de retard (7 %/an) s'appliquent passé ce délai.`,
  },
  faq: [
    {
      question: "Selon quelle région s'applique la succession d'un Belge expatrié ?",
      answer:
        "Le régime applicable est celui de la région où le défunt avait sa résidence fiscale principale pendant les 5 années précédant son décès. Pour un Belge expatrié depuis moins de 5 ans, les règles belges continuent à s'appliquer. Pour un décès à l'étranger, la région belge compétente est celle du dernier domicile belge durant ces 5 années.",
    },
    {
      question: "Le conjoint paie-t-il des droits de succession en Belgique ?",
      answer:
        "Cela dépend de la région et du bien transmis. En Wallonie, Bruxelles et Flandre, le conjoint (ou cohabitant légal) est totalement exonéré sur le logement familial. Sur les autres biens, il paie le barème ligne directe. La Flandre va plus loin : abattement de 50 000 € sur le mobilier pour le partenaire. Le cohabitant de fait (non légal) n'est PAS exonéré.",
    },
    {
      question: "Qu'est-ce que le cohabitant légal et comment le prouver ?",
      answer:
        "Le cohabitant légal est une personne ayant fait une déclaration formelle de cohabitation légale à la commune, selon l'article 1475 du Code civil. Il est assimilé au conjoint pour les droits de succession dans les trois régions. Le cohabitant de fait (sans déclaration) ne bénéficie d'aucune exonération — d'où l'intérêt de régulariser la situation.",
    },
    {
      question: "Pourquoi cette simulation applique-t-elle le barème wallon pour les frères/sœurs dans les 3 régions ?",
      answer:
        "Il s'agit d'une simplification v1. Les barèmes non-ligne-directe varient légèrement entre les trois régions (Bruxelles et Flandre ont des tranches et taux spécifiques). Pour une succession bruxelloise entre frères ou flamande entre amis, consultez un notaire ou les sites officiels VLABEL (Flandre), SPF Finances Bruxelles et SPW Finances (Wallonie).",
    },
    {
      question: "Quelle est la différence entre la Flandre et la Wallonie sur les successions ?",
      answer:
        "La Flandre a profondément simplifié son barème (3 tranches : 3/9/27 %) et exonère totalement le logement familial pour les partenaires. La Wallonie conserve un barème à 9 tranches (3 à 30 %) plus progressif mais avec un abattement plus faible. À patrimoine comparable, la Flandre est souvent plus avantageuse pour les successions moyennes, la Wallonie pour les très petits patrimoines (< 25 000 €).",
    },
  ],
  relatedSlugs: [
    "calcul-impot-personnes-physiques",
    "calcul-frais-notaire",
  ],
};
