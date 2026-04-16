import type { ToolMeta } from "./types";

export const TOOLS: ToolMeta[] = [
  {
    slug: "simulateur-salaire-brut-net",
    title: "Simulateur Salaire Brut → Net",
    shortTitle: "Salaire Brut → Net",
    description: "Convertissez votre salaire brut en net avec le barème 2026",
    h1: "Simulateur Salaire Brut Net 2026 — Gratuit et Officiel",
    category: "salaire",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-impot-revenu",
    title: "Simulateur Impôt sur le Revenu",
    shortTitle: "Impôt sur le Revenu",
    description: "Calculez votre impôt 2026 selon le barème officiel",
    h1: "Simulateur Impôt sur le Revenu 2026 — Gratuit",
    category: "impot",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-pret-immobilier",
    title: "Simulateur Prêt Immobilier",
    shortTitle: "Prêt Immobilier",
    description: "Mensualités, intérêts et capacité d'emprunt",
    h1: "Simulateur de Prêt Immobilier 2026 — Mensualités",
    category: "immobilier",
    availableIn: ["fr"],
  },
  {
    slug: "calculateur-retraite",
    title: "Calculateur Retraite",
    shortTitle: "Retraite",
    description: "Estimez votre pension de retraite future",
    h1: "Simulateur Retraite 2026 — Estimation Pension",
    category: "retraite",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-plus-value-immobiliere",
    title: "Plus-Value Immobilière",
    shortTitle: "Plus-Value Immobilière",
    description: "Imposition sur la revente d'un bien immobilier",
    h1: "Calcul Plus-Value Immobilière 2026",
    category: "immobilier",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-auto-entrepreneur",
    title: "Simulateur Auto-Entrepreneur",
    shortTitle: "Auto-Entrepreneur",
    description: "Charges et revenu net micro-entreprise",
    h1: "Simulateur Charges Auto-Entrepreneur 2026",
    category: "salaire",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-droits-succession",
    title: "Calcul Droits de Succession",
    shortTitle: "Droits de Succession",
    description: "Abattements et taux selon le lien de parenté",
    h1: "Calcul Droits de Succession 2026",
    category: "autre",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-epargne",
    title: "Simulateur Épargne",
    shortTitle: "Intérêts Composés",
    description: "Intérêts composés et projection d'épargne",
    h1: "Simulateur Épargne & Intérêts Composés 2026",
    category: "epargne",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-frais-kilometriques",
    title: "Frais Kilométriques",
    shortTitle: "Frais Kilométriques",
    description: "Barème kilométrique officiel 2026",
    h1: "Calcul Frais Kilométriques 2026 — Barème Officiel",
    category: "autre",
    availableIn: ["fr"],
  },
  {
    slug: "simulateur-dividendes-salaire",
    title: "Dividendes vs Salaire",
    shortTitle: "Dividendes vs Salaire",
    description: "Comparez la rémunération en dividendes ou salaire",
    h1: "Simulateur Dividendes vs Salaire — SASU / SARL",
    category: "salaire",
    availableIn: ["fr"],
  },
  {
    slug: "calcul-salaire-brut-net-belgique",
    title: "Salaire Brut → Net Belgique",
    shortTitle: "Salaire Brut → Net",
    description:
      "Convertissez votre salaire brut en net selon les barèmes ONSS et IPP 2026",
    h1: "Calcul Salaire Brut Net Belgique 2026 — ONSS & Précompte",
    category: "salaire",
    availableIn: ["be"],
  },
  {
    slug: "calcul-impot-personnes-physiques",
    title: "Impôt des Personnes Physiques (IPP)",
    shortTitle: "Impôt IPP",
    description:
      "Calculez votre IPP 2026 avec barème fédéral, quotité exemptée et additionnels communaux",
    h1: "Calcul Impôt des Personnes Physiques 2026 — Barème Officiel",
    category: "impot",
    availableIn: ["be"],
  },
  {
    slug: "simulateur-pret-hypothecaire",
    title: "Prêt Hypothécaire Belgique",
    shortTitle: "Prêt Hypothécaire",
    description:
      "Mensualité, intérêts et assurance solde restant dû pour votre crédit hypothécaire",
    h1: "Simulateur Prêt Hypothécaire 2026 — Mensualité & Coût Total",
    category: "immobilier",
    availableIn: ["be"],
  },
  {
    slug: "calcul-droits-succession-belgique",
    title: "Droits de Succession Belgique",
    shortTitle: "Droits de Succession",
    description:
      "Wallonie, Bruxelles et Flandre — barèmes par région et lien de parenté",
    h1: "Calcul Droits de Succession Belgique 2026 — 3 Régions",
    category: "autre",
    availableIn: ["be"],
  },
  {
    slug: "calcul-frais-notaire",
    title: "Frais de Notaire Belgique",
    shortTitle: "Frais de Notaire",
    description:
      "Droits d'enregistrement, honoraires notaire et TVA pour votre achat immobilier",
    h1: "Calcul Frais de Notaire Belgique 2026 — Achat Immobilier",
    category: "immobilier",
    availableIn: ["be"],
  },
  {
    slug: "simulateur-independant-belgique",
    title: "Simulateur Indépendant Belgique",
    shortTitle: "Indépendant Belgique",
    description:
      "Cotisations INASTI 2026 et revenu net d'indépendant avec barème IPP",
    h1: "Simulateur Indépendant Belgique 2026 — Cotisations INASTI & Net",
    category: "salaire",
    availableIn: ["be"],
  },
  {
    slug: "calculateur-pension-belgique",
    title: "Calculateur Pension Belgique",
    shortTitle: "Pension Belgique",
    description:
      "1er pilier légal, 2ᵉ pilier assurance groupe, 3ᵉ pilier épargne-pension 2026",
    h1: "Calculateur Pension Belgique 2026 — 1er / 2ᵉ / 3ᵉ Pilier",
    category: "retraite",
    availableIn: ["be"],
  },
  {
    slug: "simulateur-epargne-belgique",
    title: "Simulateur Épargne Belgique",
    shortTitle: "Épargne Belgique",
    description:
      "Intérêts composés, précompte mobilier 30 % et exonération livret réglementé 2026",
    h1: "Simulateur Épargne Belgique 2026 — Intérêts Composés & Précompte",
    category: "epargne",
    availableIn: ["be"],
  },
  {
    slug: "calcul-frais-kilometriques-belgique",
    title: "Frais Kilométriques Belgique",
    shortTitle: "Frais Kilométriques",
    description:
      "Barème 2026 : 0,4246 €/km pro, 0,15 €/km IPP, 0,35 €/km vélo",
    h1: "Calcul Frais Kilométriques Belgique 2026 — Barème Officiel",
    category: "autre",
    availableIn: ["be"],
  },
  {
    slug: "simulateur-dividendes-remuneration",
    title: "Dividendes vs Rémunération SRL/SA",
    shortTitle: "Dividendes vs Rémunération",
    description:
      "Arbitrez salaire dirigeant vs dividende : IS PME 20 %, VVPR-bis 15 %, INASTI",
    h1: "Simulateur Dividendes vs Rémunération SRL/SA — Belgique 2026",
    category: "salaire",
    availableIn: ["be"],
  },
  {
    slug: "calcul-salaire-brut-net-suisse",
    title: "Salaire Brut → Net Suisse",
    shortTitle: "Salaire Brut → Net",
    description:
      "Convertissez votre salaire brut en net : AVS/AI/APG, AC, LPP, IFD et impôt cantonal 2026",
    h1: "Calcul Salaire Brut Net Suisse 2026 — AVS, LPP, IFD & Cantonal",
    category: "salaire",
    availableIn: ["ch"],
  },
  {
    slug: "simulateur-impot-revenu-suisse",
    title: "Impôt sur le Revenu Suisse",
    shortTitle: "Impôt Revenu",
    description:
      "IFD + impôt cantonal et communal 2026 pour les 7 cantons romands (VD, GE, VS, FR, NE, JU, BE)",
    h1: "Simulateur Impôt sur le Revenu Suisse 2026 — IFD & Cantonal",
    category: "impot",
    availableIn: ["ch"],
  },
  {
    slug: "simulateur-pret-hypothecaire-suisse",
    title: "Prêt Hypothécaire Suisse",
    shortTitle: "Prêt Hypothécaire",
    description:
      "Mensualité, fonds propres 20 %/10 % durs, charges théoriques ≤ 33 % et amortissement 2ᵉ rang",
    h1: "Simulateur Prêt Hypothécaire Suisse 2026 — Mensualité & Charges",
    category: "immobilier",
    availableIn: ["ch"],
  },
  {
    slug: "calculateur-retraite-suisse",
    title: "Calculateur Retraite Suisse",
    shortTitle: "Retraite",
    description:
      "AVS rente max 2 450 CHF, capital LPP projeté et 3ᵉ pilier A 7 258 CHF 2026",
    h1: "Calculateur Retraite Suisse 2026 — AVS, LPP & 3e Pilier",
    category: "retraite",
    availableIn: ["ch"],
  },
  {
    slug: "simulateur-epargne-suisse",
    title: "Simulateur Épargne Suisse",
    shortTitle: "Épargne",
    description:
      "Livret vs 3ᵉ pilier A déductible : intérêts composés et économie fiscale 2026",
    h1: "Simulateur Épargne Suisse 2026 — Livret & 3ᵉ Pilier A",
    category: "epargne",
    availableIn: ["ch"],
  },
  {
    slug: "calcul-plus-value-immobiliere-suisse",
    title: "Plus-Value Immobilière Suisse",
    shortTitle: "Plus-Value Immobilière",
    description:
      "Impôt sur les gains immobiliers 2026 : barème dégressif cantonal et différé de remploi",
    h1: "Calcul Plus-Value Immobilière Suisse 2026 — IGI Cantonal",
    category: "immobilier",
    availableIn: ["ch"],
  },
  {
    slug: "simulateur-independant-suisse",
    title: "Simulateur Indépendant Suisse",
    shortTitle: "Indépendant",
    description:
      "AVS 10 % sur bénéfice, absence d'AC, 3ᵉ pilier A renforcé 36 288 CHF et IFD 2026",
    h1: "Simulateur Indépendant Suisse 2026 — AVS 10 % & 3a Renforcé",
    category: "salaire",
    availableIn: ["ch"],
  },
  {
    slug: "calcul-droits-succession-suisse",
    title: "Droits de Succession Suisse",
    shortTitle: "Droits de Succession",
    description:
      "100 % cantonal : conjoint exonéré partout, barèmes VD, GE, VS, FR, NE, JU, BE 2026",
    h1: "Droits de Succession Suisse 2026 — 7 Cantons Romands",
    category: "autre",
    availableIn: ["ch"],
  },
  {
    slug: "calcul-frais-notaire-suisse",
    title: "Frais de Notaire Suisse",
    shortTitle: "Frais de Notaire",
    description:
      "Droits de mutation cantonaux, émoluments notaire, registre foncier et TVA 8,1 % 2026",
    h1: "Calcul Frais de Notaire Suisse 2026 — Achat Immobilier",
    category: "immobilier",
    availableIn: ["ch"],
  },
  {
    slug: "simulateur-dividendes-salaire-suisse",
    title: "Dividendes vs Salaire Suisse",
    shortTitle: "Dividendes vs Salaire",
    description:
      "Arbitrez salaire vs dividende dirigeant SA/Sàrl : IS cantonal et taxation partielle 70/50 %",
    h1: "Simulateur Dividendes vs Salaire Suisse 2026 — SA / Sàrl",
    category: "salaire",
    availableIn: ["ch"],
  },
  {
    slug: "calcul-salaire-brut-net-quebec",
    title: "Salaire Brut → Net Québec",
    shortTitle: "Salaire Brut → Net",
    description:
      "Convertissez votre salaire brut en net : RRQ, AE, RQAP, FSS, impôt fédéral + Québec 2026",
    h1: "Calcul Salaire Brut Net Québec 2026 — RRQ, AE, RQAP & Impôt",
    category: "salaire",
    availableIn: ["ca"],
  },
  {
    slug: "simulateur-impot-revenu-quebec",
    title: "Impôt sur le Revenu Québec",
    shortTitle: "Impôt Revenu",
    description:
      "Impôt fédéral + provincial Québec 2026 : 5 tranches fédérales, 4 tranches QC, abattement 16,5 %",
    h1: "Simulateur Impôt sur le Revenu Québec 2026 — Fédéral + Provincial",
    category: "impot",
    availableIn: ["ca"],
  },
  {
    slug: "simulateur-pret-hypothecaire-quebec",
    title: "Prêt Hypothécaire Québec",
    shortTitle: "Prêt Hypothécaire",
    description:
      "Mensualité, SCHL, stress test max(taux+2 %, 5,25 %), ABD ≤ 39 %, ATD ≤ 44 % — barèmes 2026",
    h1: "Simulateur Prêt Hypothécaire Québec 2026 — Mensualité, SCHL & Stress Test",
    category: "immobilier",
    availableIn: ["ca"],
  },
  {
    slug: "calculateur-retraite-quebec",
    title: "Calculateur Retraite Québec",
    shortTitle: "Retraite",
    description:
      "RRQ 1 433 $/mois max, PSV 734 $, SRG, REER plafond 32 490 $, CELI 7 000 $ — projection 2026",
    h1: "Calculateur Retraite Québec 2026 — RRQ, PSV, SRG, REER & CELI",
    category: "retraite",
    availableIn: ["ca"],
  },
  {
    slug: "simulateur-epargne-quebec",
    title: "Simulateur Épargne Québec",
    shortTitle: "Épargne",
    description:
      "REER vs CELI 2026 : TMI actuel vs retraite, intérêts composés, économie d'impôt",
    h1: "Simulateur Épargne Québec 2026 — REER vs CELI",
    category: "epargne",
    availableIn: ["ca"],
  },
  {
    slug: "calcul-plus-value-immobiliere-quebec",
    title: "Plus-Value Immobilière Québec",
    shortTitle: "Plus-Value Immobilière",
    description:
      "Gain en capital 2026 : résidence principale exonérée, locatif 50 % inclusion, taux combiné fédéral + QC",
    h1: "Calcul Plus-Value Immobilière Québec 2026 — Gain en Capital",
    category: "immobilier",
    availableIn: ["ca"],
  },
  {
    slug: "simulateur-travailleur-autonome-quebec",
    title: "Travailleur Autonome Québec",
    shortTitle: "Travailleur Autonome",
    description:
      "Double RRQ 12,8 % + 8 %, RQAP 0,878 %, FSS, TPS 5 % + TVQ 9,975 %, revenu net 2026",
    h1: "Simulateur Travailleur Autonome Québec 2026 — RRQ Double & Net",
    category: "salaire",
    availableIn: ["ca"],
  },
  {
    slug: "calcul-frais-kilometriques-quebec",
    title: "Frais Kilométriques Québec",
    shortTitle: "Frais Kilométriques",
    description:
      "Barème ARC 2026 : 0,72 $/km les 5 000 premiers km, 0,66 $/km au-delà (identique fédéral/QC)",
    h1: "Calcul Frais Kilométriques Québec 2026 — Barème ARC Officiel",
    category: "autre",
    availableIn: ["ca"],
  },
  {
    slug: "calcul-droits-mutation-quebec",
    title: "Droits de Mutation Québec",
    shortTitle: "Taxe de Bienvenue",
    description:
      "Taxe de bienvenue 2026 : 0,5 % / 1 % / 1,5 % avec paliers majorés Montréal, Québec, Laval",
    h1: "Calcul Droits de Mutation Québec 2026 — Taxe de Bienvenue",
    category: "immobilier",
    availableIn: ["ca"],
  },
  {
    slug: "simulateur-dividendes-salaire-quebec",
    title: "Dividendes vs Salaire Québec",
    shortTitle: "Dividendes vs Salaire",
    description:
      "SPCC Québec 2026 : dividende ordinaire (15 %) / déterminé (38 %) vs salaire, intégration corpo + perso",
    h1: "Simulateur Dividendes vs Salaire Québec 2026 — Rémunération SPCC",
    category: "salaire",
    availableIn: ["ca"],
  },
  {
    slug: "calcul-salaire-brut-net-luxembourg",
    title: "Salaire Brut → Net Luxembourg",
    shortTitle: "Salaire Brut → Net",
    description:
      "CCSS 12,45 %, barème IR 23 tranches, classes 1/1a/2 et fonds pour l'emploi 7 % — 2026",
    h1: "Calcul Salaire Brut Net Luxembourg 2026 — CCSS & Barème IR",
    category: "salaire",
    availableIn: ["lu"],
  },
  {
    slug: "simulateur-impot-revenu-luxembourg",
    title: "Impôt sur le Revenu Luxembourg",
    shortTitle: "Impôt Revenu",
    description:
      "Barème 23 tranches 0-42 %, classes 1/1a/2, CIS/CIM, fonds emploi 7 %/9 % et dépendance 1,4 % — 2026",
    h1: "Simulateur Impôt sur le Revenu Luxembourg 2026 — Barème 23 Tranches",
    category: "impot",
    availableIn: ["lu"],
  },
  {
    slug: "simulateur-pret-immobilier-luxembourg",
    title: "Prêt Immobilier Luxembourg",
    shortTitle: "Prêt Immobilier",
    description:
      "Mensualité, déduction intérêts (3000/2250/1500 €), crédit Bëllegen Akt 40 k€/pers. — 2026",
    h1: "Simulateur Prêt Immobilier Luxembourg 2026 — Mensualité & Déduction",
    category: "immobilier",
    availableIn: ["lu"],
  },
  {
    slug: "calculateur-pension-luxembourg",
    title: "Pension Luxembourg",
    shortTitle: "Pension",
    description:
      "CNAP : formule proportionnelle 1,775 % × carrière + forfaitaire 23,75 % × SSM, plafond 9 628 €/mois — 2026",
    h1: "Calculateur Pension Luxembourg 2026 — CNAP & 3ᵉ Pilier",
    category: "retraite",
    availableIn: ["lu"],
  },
  {
    slug: "simulateur-epargne-luxembourg",
    title: "Simulateur Épargne Luxembourg",
    shortTitle: "Épargne",
    description:
      "Livret classique vs 3ᵉ pilier art. 111bis LIR (3 200 €/an déductibles) — intérêts composés 2026",
    h1: "Simulateur Épargne Luxembourg 2026 — Livret vs 3ᵉ Pilier",
    category: "epargne",
    availableIn: ["lu"],
  },
  {
    slug: "calcul-plus-value-immobiliere-luxembourg",
    title: "Plus-Value Immobilière Luxembourg",
    shortTitle: "Plus-Value Immobilière",
    description:
      "Spéculation < 2 ans plein barème, demi-global max 21 %, résidence principale exonérée, abattement 50 k€ — 2026",
    h1: "Calcul Plus-Value Immobilière Luxembourg 2026 — Demi-Global 21 %",
    category: "immobilier",
    availableIn: ["lu"],
  },
  {
    slug: "simulateur-independant-luxembourg",
    title: "Simulateur Indépendant Luxembourg",
    shortTitle: "Indépendant",
    description:
      "Cotisations CCSS cumulées ~24 % (salarié + employeur), pas d'AC, barème IR + fonds emploi 2026",
    h1: "Simulateur Indépendant Luxembourg 2026 — CCSS 24 % & IR",
    category: "salaire",
    availableIn: ["lu"],
  },
  {
    slug: "calcul-droits-succession-luxembourg",
    title: "Droits de Succession Luxembourg",
    shortTitle: "Droits de Succession",
    description:
      "Barèmes par lien (descendants 0 %, collatéraux 6-15 %, tiers 15 %), surcharges par seuil, part légale/extra-légale — 2026",
    h1: "Calcul Droits de Succession Luxembourg 2026 — Barèmes & Surcharges",
    category: "autre",
    availableIn: ["lu"],
  },
  {
    slug: "calcul-frais-notaire-luxembourg",
    title: "Frais de Notaire Luxembourg",
    shortTitle: "Frais de Notaire",
    description:
      "Droits 7 %, surcharge Luxembourg-Ville +3 % > 300 k€, Bëllegen Akt 40 k€/pers., émoluments TVA 17 % — 2026",
    h1: "Calcul Frais de Notaire Luxembourg 2026 — Droits & Bëllegen Akt",
    category: "immobilier",
    availableIn: ["lu"],
  },
  {
    slug: "simulateur-dividendes-salaire-luxembourg",
    title: "Dividendes vs Salaire Luxembourg",
    shortTitle: "Dividendes vs Salaire",
    description:
      "Arbitrage Sàrl/SA : salaire (CCSS + IR) vs dividende (IS 24,94 % + demi-imposition + précompte 15 %) — 2026",
    h1: "Simulateur Dividendes vs Salaire Luxembourg 2026 — Sàrl / SA",
    category: "salaire",
    availableIn: ["lu"],
  },
];

export const TOOLS_BY_SLUG = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
) as Record<string, ToolMeta>;

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS_BY_SLUG[slug];
}

export function getToolsForCountry(countryCode: string): ToolMeta[] {
  return TOOLS.filter((t) =>
    t.availableIn.includes(countryCode as ToolMeta["availableIn"][number]),
  );
}
