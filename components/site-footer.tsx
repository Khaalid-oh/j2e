import { links } from "@/lib/links";
import { Wordmark } from "./brand";

export function SiteFooter({ home = false }: { home?: boolean }) {
  return (
    <footer className="bg-white text-ink">
      <div className="site-container flex flex-col gap-10 pb-8 pt-12 md:gap-16 md:pt-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-16">
          <p className="display-text">
            Better futures
            <br />
            start with us.
          </p>
          <address className="flex shrink-0 flex-col gap-4 not-italic md:gap-6">
            <p className="eyebrow">LET’S KEEP IN TOUCH</p>
            <a href={links.email} className="card-text hover:underline">
              asdeinfo@nbed.nb.ca
            </a>
            <a href={links.phone} className="small-text hover:underline">
              506 856 3222
            </a>
            <p className="small-text md:hidden">
              Anglophone East School District
              <br />
              Moncton, New Brunswick
            </p>
            <p className="small-text hidden md:block">Moncton, New Brunswick</p>
            <p className="small-text hidden md:block">
              Anglophone East School District
            </p>
          </address>
        </div>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Wordmark footer />
          <p className="eyebrow">
            JOURNEY TO EXCELLENCE
            <span className="hidden md:inline">{home ? " / 2026" : ""}</span>
          </p>
          <p className="small-text hidden md:block">
            Learning that moves us forward.
          </p>
        </div>
      </div>
    </footer>
  );
}
