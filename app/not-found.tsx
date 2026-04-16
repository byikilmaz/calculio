import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
      <div className="text-6xl font-bold text-[var(--primary)]">404</div>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        Page introuvable
      </h1>
      <p className="mt-3 text-slate-600">
        Le simulateur ou la page que vous cherchez n'existe pas ou a été
        déplacé.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary)]/90"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
