import { links } from "@/lib/links";
import { JourneyMotif } from "./brand";
import { Button } from "./button";

export function CommunityCTA({ gallery = false }: { gallery?: boolean }) {
  return (
    <section className={gallery ? "bg-violet" : "bg-lime"}>
      <div className="site-container rail-layout gap-8 py-16 md:py-20">
        <div className="flex items-center justify-between md:flex-col md:items-start md:justify-start md:gap-8">
          <p className="eyebrow">
            {gallery ? (
              <>
                THE JOURNEY
                <br />
                CONTINUES
              </>
            ) : (
              <>
                MAKE YOUR NEXT
                <br />
                CONNECTION
              </>
            )}
          </p>
          <JourneyMotif size={64} className="md:hidden" />
          <JourneyMotif size={120} className="hidden md:block" />
        </div>
        <div className="flex min-w-0 flex-col gap-8">
          <h2 className="heading-text">
            {gallery ? (
              <>
                Be part of
                <br />
                what’s next.
              </>
            ) : (
              <>
                Keep learning.
                <br />
                Keep growing.
              </>
            )}
          </h2>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <p className="body-text max-w-[660px]">
              {gallery
                ? "More conversations. More shared ideas. Find your next opportunity to learn together."
                : "Create your account to explore sessions and register when event details are available."}
            </p>
            <div className="flex w-full shrink-0 flex-col gap-3 md:w-[300px]">
              <Button
                href={gallery ? "/events" : links.signup}
                external={!gallery}
              >
                {gallery ? "Explore upcoming events" : "Create your account"}
              </Button>
              <Button
                href={gallery ? links.signup : links.login}
                external
                tone="outline-dark"
                className="md:self-start"
              >
                {gallery ? "Register to attend" : "Sign in"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
