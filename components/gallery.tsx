"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { photos, GALLERY_PAGE_SIZE, type Photo } from "@/lib/photos";
import { Breadcrumb } from "./breadcrumb";
import { Button } from "./button";
import { PhotoViewer } from "./photo-viewer";
import { useModal } from "./use-modal";

export function GalleryPhoto({
  photo,
  onOpen,
  style,
}: {
  photo: Photo;
  onOpen: () => void;
  style?: CSSProperties;
}) {
  return (
    <button
      className="photo-trigger flex w-full min-w-0 flex-col gap-3 text-left md:gap-4"
      style={style}
      onClick={onOpen}
      aria-label={`Enlarge photo ${photo.id}: ${photo.caption}`}
      data-photo-id={photo.id}
    >
      <span className="photo-thumbnail relative block w-full overflow-hidden">
        <Image
          quality={90}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1920px) calc((100vw - 84px) / 2), 918px"
          className="object-cover"
        />
      </span>
      <span className="eyebrow uppercase text-muted">
        {String(photo.id).padStart(2, "0")} / {photo.category}
      </span>
      <span className="body-text md:text-[24px] md:leading-[30px] md:tracking-[-0.5px]">
        {photo.caption}
      </span>
    </button>
  );
}

export function GalleryGrid({
  items,
  onOpen,
}: {
  items: readonly Photo[];
  onOpen: (index: number) => void;
}) {
  const nextRows = [1, 1];
  return (
    <div className="gallery-grid flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-0">
      {items.map((photo, index) => {
        const column = index % 2;
        const row = nextRows[column];
        const span = photo.thumbnailHeight.desktop + 81;
        nextRows[column] += span + 48;
        return (
          <GalleryPhoto
            key={photo.id}
            photo={photo}
            onOpen={() => onOpen(index)}
            style={
              {
                "--column": column + 1,
                "--row": row,
                "--span": span,
                "--mobile-height": `${photo.thumbnailHeight.mobile}px`,
                "--desktop-height": `${photo.thumbnailHeight.desktop}px`,
                "--desktop-position": photo.crop.desktop,
                "--mobile-position": photo.crop.mobile,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export function GalleryExperience() {
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const collectionHeading = useRef<HTMLHeadingElement>(null);
  const pageCount = Math.ceil(photos.length / GALLERY_PAGE_SIZE);
  const firstIndex = (page - 1) * GALLERY_PAGE_SIZE;
  const pagePhotos = photos.slice(firstIndex, firstIndex + GALLERY_PAGE_SIZE);
  const dialog = useRef<HTMLDialogElement>(null);
  const modal = useModal(dialog);
  function openPhoto(index: number) {
    setIndex(index);
    modal.open();
  }
  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount || nextPage === page) return;
    setPage(nextPage);
    requestAnimationFrame(() => {
      collectionHeading.current?.focus({ preventScroll: true });
      collectionHeading.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });
  }
  return (
    <>
      <section className="site-container flex flex-col gap-8 pb-12 pt-8 md:gap-12 md:pb-20">
        <Breadcrumb current="Gallery" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10 lg:gap-20">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <p className="eyebrow">JOURNEY TO EXCELLENCE / GALLERY</p>
            <h1 className="page-title gallery-title">
              Our journey.
              <br />
              In pictures.
            </h1>
          </div>
          <div className="flex flex-col gap-6 md:w-[34%] lg:w-[30.4348%]">
            <p className="body-text">
              The people, ideas and connections that bring Journey to Excellence
              to life.
            </p>
            <Button
              href="#photo-collection"
              className="w-full md:self-start md:w-auto"
            >
              Explore the gallery
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,930fr)_minmax(0,426fr)]">
            {[0, 1].map((index) => (
              <button
                key={index}
                className={`photo-trigger relative h-[166px] w-full overflow-hidden md:h-auto ${index === 1 ? "hidden md:block md:aspect-[426/450]" : "md:aspect-[930/450]"}`}
                onClick={() => openPhoto(index)}
                aria-label={`Enlarge featured photo: ${photos[index].caption}`}
              >
                <Image
                  quality={90}
                  src={photos[index].src}
                  alt={photos[index].alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 767px) calc(100vw - 48px), 66vw"
                      : "30vw"
                  }
                  preload={index === 0}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="eyebrow flex justify-between gap-4">
            <p>OUR PEOPLE. OUR SHARED JOURNEY.</p>
            <p className="hidden md:block">EXPLORE {photos.length} MOMENTS</p>
          </div>
        </div>
      </section>
      <section id="photo-collection" className="bg-ink text-white">
        <div className="site-container flex flex-col gap-10 py-16 md:gap-16 md:py-20">
          <div className="rail-layout gap-6">
            <p className="eyebrow text-lime">
              {photos.length}
              <span className="hidden md:inline">
                <br />
              </span>
              <span className="md:hidden"> </span>MOMENTS
            </p>
            <div className="flex flex-col gap-5">
              <h2
                ref={collectionHeading}
                id="collection-heading"
                tabIndex={-1}
                className="heading-text"
              >
                Our community,
                <br />
                in focus.
              </h2>
              <p className="body-text text-muted">
                Select a photo to take a closer look.
              </p>
            </div>
          </div>
          <div id="gallery-results" aria-labelledby="collection-heading">
            <GalleryGrid
              items={pagePhotos}
              onOpen={(localIndex) => openPhoto(firstIndex + localIndex)}
            />
          </div>
          <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="small-text text-muted"
            >
              Showing {firstIndex + 1}–
              {Math.min(firstIndex + GALLERY_PAGE_SIZE, photos.length)} of{" "}
              {photos.length} photos
            </p>
            <nav
              aria-label="Gallery pagination"
              className="flex items-center justify-between gap-2"
            >
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous gallery page"
                aria-controls="gallery-results"
                className="small-text min-h-12 border border-line px-2 transition-colors enabled:hover:border-white disabled:cursor-default disabled:opacity-40 md:px-5"
              >
                Previous
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => goToPage(number)}
                    aria-label={`Gallery page ${number}`}
                    aria-current={page === number ? "page" : undefined}
                    aria-controls="gallery-results"
                    className={`small-text size-12 shrink-0 border transition-colors ${page === number ? "border-lime bg-lime text-ink" : "border-line hover:border-white"}`}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === pageCount}
                aria-label="Next gallery page"
                aria-controls="gallery-results"
                className="small-text min-h-12 border border-line px-2 transition-colors enabled:hover:border-white disabled:cursor-default disabled:opacity-40 md:px-5"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>
      <PhotoViewer
        dialog={dialog}
        photo={photos[index]}
        index={index}
        count={photos.length}
        close={modal.close}
        previous={() =>
          setIndex((i) => (i + photos.length - 1) % photos.length)
        }
        next={() => setIndex((i) => (i + 1) % photos.length)}
      />
    </>
  );
}
