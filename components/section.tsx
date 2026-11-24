import type { ReactNode } from "react";

export function RailSection({
  label,
  children,
  className = "",
  id,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`site-container rail-layout ${className}`}>
      <p className="eyebrow text-muted">{label}</p>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
