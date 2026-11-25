"use client";

import Image from "next/image";
import type { RefObject } from "react";
import type { Photo } from "@/lib/photos";
import { Icon } from "./brand";

export function PhotoViewer({
  dialog,
  photo,
  index,
  count,
  close,
  previous,
  next,
}: {
  dialog: RefObject<HTMLDialogElement | null>;
  photo: Photo;
  index: number;
  count: number;
  close: () => void;
  previous: () => void;
  next: () => void;
}) {
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
  return (
    <dialog
      ref={dialog}
      aria-label="Photo gallery viewer"
      aria-describedby="viewer-caption"
      onClose={close}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
      className="photo-viewer fixed inset-0 m-0 h-dvh w-full bg-ink p-6 text-white md:p-[30px]"
    >
      <div className="viewer-layout h-full">
        <div className="viewer-header flex items-center justify-between gap-4">
          <p className="eyebrow">J2E / PHOTO GALLERY</p>
          <button
            onClick={close}
            autoFocus
            aria-label="Close photo viewer"
            className="viewer-control"
          >
            <Icon name="x" tone="paper" />
          </button>
        </div>
        <div className="viewer-image relative min-h-0 min-w-0">
          <Image
            quality={90}
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), calc(100vw - 204px)"
            className="object-contain"
            loading="eager"
          />
        </div>
        <button
          onClick={previous}
          className="viewer-previous viewer-control"
          aria-label="Previous photo"
        >
          <Icon name="arrow-right" tone="paper" className="rotate-180" />
        </button>
        <button
          onClick={next}
          className="viewer-next viewer-control"
          aria-label="Next photo"
        >
          <Icon name="arrow-right" tone="paper" />
        </button>
        <div
          className="viewer-caption flex min-w-0 flex-col gap-3"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow uppercase text-lime">{photo.category}</p>
          <h2
            id="viewer-caption"
            className="card-text md:text-[40px] md:leading-[46px] md:tracking-[-1.2px]"
          >
            {photo.caption}
          </h2>
        </div>
        <a
          href={photo.src}
          target="_blank"
          rel="noopener noreferrer"
          className="viewer-original small-text inline-flex items-center gap-2 justify-self-start hover:underline"
        >
          Open original
          <Icon tone="paper" />
        </a>
        <p
          className="viewer-counter eyebrow"
          aria-live="polite"
          aria-label={`Photo ${index + 1} of ${count}`}
        >
          {counter}
        </p>
      </div>
    </dialog>
  );
}
