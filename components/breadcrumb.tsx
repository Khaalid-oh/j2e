import Link from "next/link";

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="small-text flex gap-3">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <span aria-hidden="true" className="text-muted">
        /
      </span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
