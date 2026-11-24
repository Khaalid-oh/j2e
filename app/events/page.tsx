import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { CommunityCTA } from "@/components/community-cta";
import { EventDirectory } from "@/components/events";
import { SiteFooter } from "@/components/site-footer";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Find your next learning moment. Explore professional learning, leadership and community programmes with Anglophone East School District.",
};

export default function EventsPage() {
  return (
    <>
      <main id="main-content">
        <section className="site-container flex flex-col gap-8 pb-12 pt-8 md:gap-12 md:pb-20">
          <Breadcrumb current="Upcoming events" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-[60px]">
            <div className="flex flex-col items-start gap-6">
              <p className="eyebrow">LEARNING NEVER STANDS STILL</p>
              <h1 className="page-title">
                Upcoming
                <br />
                events.
              </h1>
              <p className="body-text max-w-[520px]">
                Make time for fresh ideas, new connections and your next
                learning opportunity.
              </p>
              <Button href="#event-directory" className="w-full md:w-auto">
                Browse events
              </Button>
            </div>
            <figure className="flex flex-col gap-4">
              <div className="relative h-[242px] overflow-hidden md:aspect-[660/430] md:h-auto">
                <Image
                  quality={90}
                  src={photos[7].src}
                  alt={photos[7].alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 48px), calc((100vw - 120px) / 2)"
                  className="object-cover"
                  preload
                />
              </div>
              <figcaption className="eyebrow flex justify-between gap-4">
                <span>CONNECTIONS START HERE.</span>
                <span className="hidden md:block">J2E / COMMUNITY</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <EventDirectory />
        <CommunityCTA />
      </main>
      <SiteFooter />
    </>
  );
}
