import Image from "next/image";
import Link from "next/link";
import { HomeIntro } from "@/components/home-intro";
import { RailSection } from "@/components/section";
import { Button } from "@/components/button";
import { SiteFooter } from "@/components/site-footer";
import { FAQAccordion } from "@/components/faq";
import { homeMoments, photos } from "@/lib/photos";
import { links } from "@/lib/links";

const benefits = [
  {
    category: "01 / LEARN",
    title: "Fresh perspectives.",
    description:
      "Explore workshops and practical approaches shared by district educators and partners.",
  },
  {
    category: "02 / CONNECT",
    title: "People who get it.",
    description:
      "Meet colleagues beyond your own school. Make room for conversations that keep going.",
  },
  {
    category: "03 / TAKE IT BACK",
    title: "Ideas for your classroom.",
    description:
      "Leave with strategies, resources and a fresh perspective to put into practice.",
  },
  {
    category: "04 / GROW",
    title: "A shared purpose.",
    description:
      "Celebrate the care, curiosity and everyday work that move education forward.",
  },
];

function CommunityPhotos() {
  return (
    <div className="site-container grid grid-cols-2 items-end gap-4 pb-16 md:grid-cols-[540fr_300fr_492fr] md:gap-6 md:pt-4">
      <div className="relative col-span-2 h-[228px] overflow-hidden md:col-span-1 md:h-[360px]">
        <Image
          quality={90}
          src={photos[0].src}
          alt={photos[0].alt}
          fill
          sizes="(max-width: 767px) calc(100vw - 48px), 0px"
          className="object-cover md:hidden"
        />
        <Image
          quality={90}
          src={photos[5].src}
          alt={photos[5].alt}
          fill
          sizes="(max-width: 767px) 0px, 38vw"
          className="hidden object-cover md:block"
        />
        <span className="absolute inset-0 hidden bg-black/30 md:block" />
      </div>
      <div className="relative h-[217px] overflow-hidden md:h-[450px]">
        <Image
          quality={90}
          src="/images/j2e/IMG_3398.jpg"
          alt="An educator speaking into a microphone beside her presentation laptop."
          fill
          sizes="(max-width: 767px) calc((100vw - 64px) / 2), 22vw"
          className="object-cover"
        />
        <span className="absolute inset-0 hidden bg-black/20 md:block" />
      </div>
      <div className="relative h-[217px] overflow-hidden md:h-[360px]">
        <Image
          quality={90}
          src="/images/j2e/IMG_2913.jpg"
          alt="Educators exchange ideas in the atrium during a community gathering."
          fill
          sizes="(max-width: 767px) calc((100vw - 64px) / 2), 35vw"
          className="object-cover"
        />
        <span className="absolute inset-0 hidden bg-black/20 md:block" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HomeIntro />
        <div className="bg-ink text-white">
          <RailSection
            label={
              <>
                GOOD IDEAS TRAVEL.
                <br />
                START YOUR JOURNEY.
              </>
            }
            className="py-16 md:py-24"
          >
            <h2 className="display-text">
              Learn with purpose.
              <br />
              Connect with people.
              <br />
              Bring it back.
            </h2>
            <p className="body-text mt-8 max-w-[810px] text-muted md:mt-12 md:text-[24px] md:leading-[30px] md:tracking-[-0.5px]">
              A shared space for educators to learn from one another, challenge
              familiar thinking and bring fresh ideas back to every classroom.
            </p>
          </RailSection>
          <CommunityPhotos />
          <RailSection
            label={
              <>
                <span className="md:hidden">SUMMER LEARNING WEEK / 2026</span>
                <span className="hidden md:inline">
                  SUMMER LEARNING
                  <br />
                  WEEK / 2026
                </span>
              </>
            }
            className="pb-16 md:pb-24 md:pt-8"
          >
            <dl className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-[60px]">
              {[
                { value: "600+", label: "Educators & staff registered" },
                { value: "100+", label: "Sessions offered" },
                { value: "3 days", label: "Of learning and connection" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-6 px-[21px] md:gap-3 md:px-0"
                >
                  <dt className="small-text order-2 text-muted">
                    {index === 2 ? (
                      <>
                        <span className="md:hidden">
                          Days of learning and connection
                        </span>
                        <span className="hidden md:inline">{stat.label}</span>
                      </>
                    ) : (
                      stat.label
                    )}
                  </dt>
                  <dd className="display-text order-1">
                    {index === 2 ? (
                      <>
                        <span className="md:hidden">3</span>
                        <span className="hidden md:inline">{stat.value}</span>
                      </>
                    ) : (
                      stat.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </RailSection>
          <RailSection
            id="why-attend"
            label="WHY ATTEND"
            className="pb-16 md:pb-24 md:pt-8"
          >
            <h2 className="display-text">
              Make space for
              <br />
              what’s next.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-x-[60px] md:gap-y-12">
              {benefits.map((benefit) => (
                <article
                  key={benefit.category}
                  className="flex flex-col gap-4 border-t border-line pt-6"
                >
                  <p className="eyebrow text-lime">{benefit.category}</p>
                  <h3 className="text-[40px] leading-[46px] tracking-[-1.2px]">
                    {benefit.title}
                  </h3>
                  <p className="body-text text-muted">{benefit.description}</p>
                </article>
              ))}
            </div>
          </RailSection>
          <RailSection
            label="MEMORABLE MOMENTS"
            className="pb-16 pt-6 md:pb-24 md:pt-16"
          >
            <div className="flex items-end justify-between gap-6">
              <h2 className="display-text">
                Big ideas.
                <br />
                Real connections.
              </h2>
              <Button
                href="/gallery"
                tone="outline-light"
                className="hidden shrink-0 md:inline-flex"
              >
                View gallery
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-x-[60px] md:gap-y-12">
              {homeMoments.map((moment) => (
                <Link
                  href="/gallery"
                  key={moment.title}
                  className="photo-trigger flex min-w-0 flex-col gap-4"
                  aria-label={`${moment.title} View photo gallery`}
                >
                  <div className="relative h-[320px] w-full overflow-hidden">
                    <Image
                      quality={90}
                      src={moment.photo.src}
                      alt={moment.photo.alt}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 48px), 36vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="eyebrow text-muted">{moment.category}</p>
                  <p className="card-text">{moment.title}</p>
                </Link>
              ))}
            </div>
            <Button
              href="/gallery"
              tone="outline-light"
              className="mt-8 w-full md:hidden"
            >
              View gallery
            </Button>
          </RailSection>
          <RailSection label="A LITTLE CLARITY" className="pb-16 pt-6 md:py-24">
            <h2 className="heading-text mb-8 md:mb-12">
              A few good questions.
            </h2>
            <FAQAccordion />
          </RailSection>
          <RailSection
            label="YOUR NEXT CHAPTER"
            className="pb-20 pt-6 md:pb-[120px] md:pt-16"
          >
            <div className="flex flex-col gap-6 border-2 border-dashed border-white p-6 md:gap-8 md:p-10">
              <p className="eyebrow text-lime">
                COME CURIOUS.
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>LEAVE INSPIRED.
              </p>
              <h2 className="heading-text">
                Bring your curiosity.
                <br />
                We’ll bring the community.
              </h2>
              <p className="body-text max-w-[820px] text-muted md:text-[24px] md:leading-[30px] md:tracking-[-0.5px]">
                Create your event account to discover available sessions and
                build your personal schedule.
              </p>
              <div className="flex flex-col gap-6 md:flex-row-reverse md:items-center md:justify-end">
                <Button href={links.signup} external tone="lime">
                  Create your account
                </Button>
                <a
                  href={links.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small-text underline md:no-underline md:hover:underline"
                >
                  Already registered? Sign in
                </a>
              </div>
            </div>
          </RailSection>
        </div>
      </main>
      <SiteFooter home />
    </>
  );
}
