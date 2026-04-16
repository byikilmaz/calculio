import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Calculio : collecte de données, cookies, publicités Google AdSense et vos droits (RGPD).",
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <Section title="1. Principe général">
        <p>
          Calculio accorde une importance fondamentale à la protection de vos
          données personnelles. Nous appliquons le principe de{" "}
          <strong>minimisation</strong> : aucune information personnelle
          n&apos;est collectée directement par le site, et les simulateurs
          fonctionnent entièrement dans votre navigateur.
        </p>
        <p>
          Les saisies effectuées dans les calculateurs (salaire, revenus, etc.)
          ne quittent jamais votre appareil et ne sont ni transmises à nos
          serveurs, ni stockées.
        </p>
      </Section>

      <Section title="2. Responsable du traitement">
        <p>
          Bilal Yıkılmaz — contact : yikilmaz.bilal@gmail.com
        </p>
      </Section>

      <Section title="3. Données collectées">
        <h3 className="font-semibold text-slate-900 mt-4 mb-2">
          Données techniques (journaux serveur)
        </h3>
        <p>
          Notre hébergeur conserve temporairement des journaux techniques
          (adresse IP, user-agent, URL visitée, horodatage) aux fins de
          sécurité et de diagnostic. Ces journaux sont conservés pendant une
          durée maximale de 30 jours puis supprimés.
        </p>

        <h3 className="font-semibold text-slate-900 mt-4 mb-2">
          Cookies et traceurs tiers
        </h3>
        <p>
          Calculio utilise les services tiers suivants, susceptibles de déposer
          des cookies ou des identifiants sur votre navigateur :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Google AdSense</strong> — affichage de publicités
            contextuelles. Google peut utiliser des cookies pour personnaliser
            les annonces en fonction de votre historique de navigation.
          </li>
          <li>
            <strong>Google Analytics</strong> (si activé) — mesure d&apos;
            audience anonymisée.
          </li>
        </ul>
        <p className="mt-3">
          Pour plus d&apos;informations sur les données traitées par Google,
          consultez la{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="text-[var(--accent)] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            politique de Google concernant les sites partenaires
          </a>
          .
        </p>
      </Section>

      <Section title="4. Base légale">
        <p>
          Le traitement des données techniques de journalisation repose sur
          l&apos;intérêt légitime de l&apos;éditeur à assurer la sécurité et le
          bon fonctionnement du site (art. 6.1.f du RGPD).
        </p>
        <p>
          Le dépôt de cookies publicitaires et de mesure d&apos;audience est
          soumis à votre consentement, que vous pouvez accepter ou refuser via
          le bandeau prévu à cet effet. Ce consentement est révocable à tout
          moment.
        </p>
      </Section>

      <Section title="5. Destinataires des données">
        <p>
          Aucune donnée personnelle collectée par Calculio n&apos;est vendue,
          louée ou transmise à des tiers en dehors des prestataires techniques
          nécessaires à l&apos;exploitation du site (hébergeur, régie
          publicitaire Google). Ces prestataires agissent en qualité de
          sous-traitants ou de responsables conjoints selon les cas.
        </p>
      </Section>

      <Section title="6. Transfert hors UE">
        <p>
          Les services Google (AdSense, Analytics) peuvent impliquer un
          transfert de données vers les États-Unis. Google est adhérent au
          cadre « Data Privacy Framework » encadrant ces transferts
          conformément à la décision d&apos;adéquation de la Commission
          européenne du 10 juillet 2023.
        </p>
      </Section>

      <Section title="7. Vos droits">
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD) et à la loi « Informatique et Libertés », vous disposez des
          droits suivants :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Droit d&apos;accès et de rectification</li>
          <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d&apos;opposition</li>
          <li>Droit à la portabilité des données</li>
          <li>
            Droit d&apos;introduire une réclamation auprès de la CNIL (
            <a
              href="https://www.cnil.fr"
              className="text-[var(--accent)] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              cnil.fr
            </a>
            )
          </li>
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à l&apos;adresse
          yikilmaz.bilal@gmail.com.
        </p>
      </Section>

      <Section title="8. Modifications">
        <p>
          La présente politique peut être mise à jour à tout moment pour
          refléter les évolutions législatives ou les changements de services
          tiers. La date de dernière mise à jour figure en haut de page.
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
