import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Informations légales du site Calculio : éditeur, hébergeur, directeur de publication et propriété intellectuelle.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Mentions légales</h1>
      <p className="text-sm text-slate-500 mb-8">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <Section title="Éditeur du site">
        <p>
          Le site <strong>calculio.net</strong> est édité par :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Bilal Yıkılmaz</li>
          <li>Contact : yikilmaz.bilal@gmail.com</li>
        </ul>
        <p>
          Le site est proposé à titre personnel et ne constitue pas une activité
          commerciale régulière. Les outils mis à disposition sont gratuits et
          ne nécessitent aucune inscription.
        </p>
      </Section>

      <Section title="Directeur de la publication">
        <p>Bilal Yıkılmaz</p>
      </Section>

      <Section title="Hébergeur">
        <p>
          Le site est hébergé sur une infrastructure fournie par :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Hetzner Online GmbH</strong>
          </li>
          <li>Industriestr. 25, 91710 Gunzenhausen, Allemagne</li>
          <li>Téléphone : +49 9831 505-0</li>
          <li>Site web : hetzner.com</li>
        </ul>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus (textes, visuels, code source, logos,
          marques) présents sur calculio.net sont la propriété exclusive de
          l&apos;éditeur, sauf mentions contraires. Toute reproduction,
          représentation, modification ou diffusion, totale ou partielle, est
          interdite sans autorisation écrite préalable.
        </p>
        <p>
          Les barèmes, taux et formules fiscales proviennent de sources
          officielles publiques (impots.gouv.fr, URSSAF, etc.) et sont
          reproduits à titre informatif.
        </p>
      </Section>

      <Section title="Limitation de responsabilité">
        <p>
          Les résultats fournis par les simulateurs sont indicatifs et ne
          sauraient engager la responsabilité de l&apos;éditeur. Malgré le soin
          apporté à la mise à jour des barèmes, des écarts avec les valeurs
          officielles peuvent subsister. Pour toute décision engageante
          (embauche, investissement, déclaration fiscale), l&apos;utilisateur
          est invité à consulter un professionnel qualifié ou l&apos;
          administration compétente.
        </p>
      </Section>

      <Section title="Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français. Tout
          litige relatif à l&apos;utilisation du site relève des tribunaux
          français compétents.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
