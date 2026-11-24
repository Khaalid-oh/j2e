"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { links } from "@/lib/links";
import { Button } from "./button";
import { Icon, Wordmark } from "./brand";
import { useModal } from "./use-modal";

export function SiteHeader() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const { open, close } = useModal(dialog);
  return (
    <header className="bg-white">
      <div className="site-container flex h-[88px] items-center justify-between md:h-[104px]">
        <Wordmark />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          <Link
            className="nav-link"
            href="/events"
            aria-current={pathname === "/events" ? "page" : undefined}
          >
            Upcoming Events
          </Link>
          <Link
            className="nav-link"
            href="/gallery"
            aria-current={pathname === "/gallery" ? "page" : undefined}
          >
            Gallery
          </Link>
          <Button href={links.signup} external>
            Register now
          </Button>
        </nav>
        <button
          onClick={open}
          className="flex size-12 items-center justify-center md:hidden"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
        >
          <Icon name="menu" />
        </button>
      </div>
      <dialog
        ref={dialog}
        className="mobile-menu m-0 w-full max-w-none bg-white px-6 pb-8 pt-4 text-ink"
        aria-label="Navigation menu"
        onClose={close}
      >
        <div className="flex items-center justify-between">
          <span className="flex" onClick={close}>
            <Wordmark />
          </span>
          <button
            onClick={close}
            className="flex size-12 items-center justify-center"
            aria-label="Close navigation menu"
          >
            <Icon name="x" />
          </button>
        </div>
        <nav
          className="mt-6 flex flex-col gap-6"
          aria-label="Mobile navigation"
        >
          {[
            { href: "/", label: "Home" },
            { href: "/events", label: "Upcoming Events" },
            { href: "/gallery", label: "Photo gallery" },
            { href: links.login, label: "Sign in" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="py-3 text-[24px] leading-[30px] tracking-[-0.5px]"
              aria-current={href === pathname ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Button
          href={links.signup}
          external
          className="mt-6 w-full"
          onClick={close}
        >
          Create your account
        </Button>
      </dialog>
    </header>
  );
}
