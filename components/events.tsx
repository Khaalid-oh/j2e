"use client";

import Image from "next/image";
import { useState } from "react";
import {
  events,
  eventCategories,
  type ProgrammeEvent,
  type EventFilter,
} from "@/lib/events";
import { Button } from "./button";

export function EventCard({ event }: { event: ProgrammeEvent }) {
  return (
    <article
      className="rail-layout gap-6 border-t border-line py-10 md:py-12"
      data-event-id={event.id}
    >
      <div className="eyebrow flex justify-between gap-4 md:flex-col md:gap-4">
        <p className="text-muted">
          <span className="md:hidden">
            {event.date === "To be announced" ? "DATES TBA" : event.date}
          </span>
          <span className="hidden md:inline">DATE</span>
        </p>
        <p className="card-text hidden md:block">
          {event.date === "To be announced" ? (
            <>
              To be
              <br />
              announced
            </>
          ) : (
            event.date
          )}
        </p>
        <p className="text-lime">DETAILS COMING SOON</p>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[minmax(0,620fr)_minmax(0,420fr)] md:items-center md:gap-10">
        <div className="relative h-[228px] w-full overflow-hidden md:order-2 md:h-[300px]">
          <Image
            quality={90}
            src={event.photo.src}
            alt={event.photo.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), 30vw"
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start gap-4 md:gap-5">
          <p className="eyebrow uppercase text-lime">{event.category}</p>
          <h3 className="text-[32px] leading-[37px] tracking-[-0.8px] md:text-[40px] md:leading-[46px] md:tracking-[-1.2px]">
            {event.title}
          </h3>
          <p className="small-text text-muted md:text-lg md:leading-[27px] md:tracking-[-0.2px]">
            {event.description}
          </p>
          <p className="small-text text-muted">{event.venue}</p>
          <Button
            href={event.href}
            external
            tone="outline-light"
            className="w-full md:w-auto"
          >
            View event<span className="sr-only">: {event.title}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function EventFilters({
  active,
  onChange,
}: {
  active: EventFilter;
  onChange: (filter: EventFilter) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter events by category"
      className="grid grid-cols-2 gap-2 md:flex md:flex-wrap"
    >
      {eventCategories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          aria-pressed={category === active}
          aria-controls="event-results"
          className={`small-text min-h-12 border px-5 py-[11px] transition-colors ${category === active ? "border-lime bg-lime text-ink" : "border-line hover:border-muted"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export function EventDirectory() {
  const [filter, setFilter] = useState<EventFilter>("All events");
  const filtered =
    filter === "All events"
      ? events
      : events.filter((event) => event.filter === filter);
  return (
    <section id="event-directory" className="bg-ink text-white">
      <div className="site-container flex flex-col gap-8 pb-12 pt-16 md:gap-12 md:pb-16 md:pt-20">
        <div className="rail-layout gap-6">
          <p className="eyebrow text-muted">
            FIND YOUR NEXT
            <span className="hidden md:inline">
              <br />
            </span>
            <span className="md:hidden"> </span>LEARNING MOMENT
          </p>
          <h2 className="heading-text">All upcoming events</h2>
        </div>
        <div className="rail-layout !gap-y-0">
          <div className="hidden md:block" />
          <EventFilters active={filter} onChange={setFilter} />
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {filtered.length}{" "}
          {filter === "All events" ? "upcoming" : filter.toLowerCase()} events
        </p>
        <div id="event-results">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
