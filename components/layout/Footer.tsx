import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] bg-slate-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Calculio</h4>
          <p className="text-slate-600 leading-relaxed">
            Simulateurs financiers et fiscaux gratuits. Barèmes officiels
            actualisés chaque année.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Pays</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link href="/fr">France</Link>
            </li>
            <li>
              <Link href="/be">Belgique</Link>
            </li>
            <li>
              <Link href="/ch">Suisse</Link>
            </li>
            <li>
              <Link href="/ca">Canada</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Informations</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/confidentialite">Confidentialité</Link>
            </li>
            <li>
              <Link href="/sources">Sources officielles</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">À propos</h4>
          <p className="text-slate-600 leading-relaxed">
            Les résultats fournis sont indicatifs. Consultez un professionnel
            pour toute décision engageante.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 sm:px-6 py-4 text-center text-xs text-slate-500">
        © {year} Calculio. Tous droits réservés.
      </div>
    </footer>
  );
}
