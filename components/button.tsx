import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "./brand";

export type ButtonTone = "dark" | "lime" | "outline-dark" | "outline-light";
export function buttonClasses(tone: ButtonTone = "dark", className = "") {
  const tones = {
    dark: "border-ink bg-ink text-white hover:bg-[#343434]",
    lime: "border-lime bg-lime text-ink hover:bg-[#e5fb8d]",
    "outline-dark": "border-ink bg-white text-ink hover:bg-soft",
    "outline-light": "border-white bg-ink text-white hover:bg-[#2a2a2a]",
  };
  return `site-button min-h-12 items-center justify-center gap-3 whitespace-nowrap border px-6 py-[11px] text-base leading-[23px] tracking-[-0.15px] transition-colors ${tones[tone]} ${className}`;
}

export function Button({
  children,
  href,
  tone = "dark",
  className,
  external = false,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  tone?: ButtonTone;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={buttonClasses(tone, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      <Icon
        tone={tone === "dark" || tone === "outline-light" ? "paper" : "ink"}
      />
    </Link>
  );
}
