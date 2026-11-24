"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { links } from "@/lib/links";
import { Button, buttonClasses } from "./button";
import { Icon, JourneyMotif } from "./brand";

export function HomeIntro() {
  const [playing, setPlaying] = useState(false);
  const film = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLIFrameElement>(null);
  function play() {
    setPlaying(true);
    film.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  }
  useEffect(() => {
    if (playing) player.current?.focus({ preventScroll: true });
  }, [playing]);
  return (
    <>
      <section className="site-container flex flex-col gap-8 pb-10 pt-6 md:gap-10 md:pt-8">
        <p className="eyebrow">
          PROFESSIONAL LEARNING FOR
          <br />
          PEOPLE WHO SHAPE THE FUTURE
        </p>
        <div className="flex items-center gap-[60px]">
          <h1 className="home-title min-w-0 md:w-[70.4348%]">
            Journey to
            <br />
            Excellence.
          </h1>
          <JourneyMotif size={240} className="hidden md:block" />
        </div>
        <div className="flex items-center justify-between md:hidden">
          <p className="small-text">
            For the people
            <br />
            shaping the future
            <br />
            of education.
          </p>
          <JourneyMotif size={96} />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-6 lg:flex lg:justify-between">
          <p className="small-text md:w-[280px]">
            Anglophone East School District
            <br />
            Moncton, New Brunswick
          </p>
          <p className="small-text hidden md:block">
            Learn from each other.
            <br />
            Bring it back to your classroom.
          </p>
          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row">
            <Button href="/events">Explore sessions</Button>
            <button className={buttonClasses("outline-dark")} onClick={play}>
              Watch the Video
              <Icon name="play" />
            </button>
          </div>
        </div>
      </section>
      <div
        id="film"
        ref={film}
        className="video-section relative bg-ink text-white"
      >
        {playing ? (
          <div className="relative aspect-video">
            <iframe
              ref={player}
              src={links.videoEmbed}
              title="Summer Learning Week 2026 — Journey to Excellence"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
            <a
              href={links.video}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-ink px-3 py-2 text-sm underline"
            >
              Watch on YouTube
            </a>
          </div>
        ) : (
          <button
            className="group block w-full text-left"
            onClick={play}
            aria-label="Play Summer Learning Week 2026 video"
          >
            <div className="relative aspect-video">
              <Image
                quality={90}
                preload
                src="/images/j2e/IMG_2600.jpg"
                alt="Educators work together on laptops during Summer Learning Week."
                fill
                sizes="100vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/20" />
            </div>
            <div className="video-caption flex items-center justify-between gap-4 bg-ink px-6 py-5 md:absolute md:inset-x-[30px] md:bottom-[30px] md:h-[78px] md:py-0 md:pr-4">
              <span className="flex flex-col gap-2">
                <span className="eyebrow text-lime">
                  <span className="hidden md:inline">A LOOK BACK / 2026</span>
                  <span className="md:hidden">SUMMER LEARNING WEEK 2026</span>
                </span>
                <span className="small-text md:text-[18px] md:leading-[27px] lg:text-[24px] lg:leading-[30px] lg:tracking-[-0.5px]">
                  <span className="hidden md:inline">
                    Summer Learning Week. In good company.
                  </span>
                  <span className="md:hidden">Watch the video · 1:03</span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-4">
                <span className="eyebrow hidden lg:inline">
                  WATCH VIDEO · 1:03
                </span>
                <span className="flex size-12 items-center justify-center rounded-full bg-lime transition-transform group-hover:scale-105 md:size-14">
                  <Icon name="play" />
                </span>
              </span>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
