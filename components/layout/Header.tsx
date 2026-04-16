import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[var(--primary)]"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--primary)] text-white">
            C
          </span>
          <span>Calculio</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
          <Link href="/fr" className="hover:text-[var(--primary)]">
            France
          </Link>
          <Link href="/be" className="hover:text-[var(--primary)]">
            Belgique
          </Link>
          <Link href="/ch" className="hover:text-[var(--primary)]">
            Suisse
          </Link>
          <Link href="/ca" className="hover:text-[var(--primary)]">
            Canada
          </Link>
        </nav>
      </div>
    </header>
  );
}
