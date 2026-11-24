"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { photos, type Photo } from "@/lib/photos";
import { links } from "@/lib/links";
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

export function GalleryGrid({ onOpen }: { onOpen: (index: number) => void }) {
  const nextRows = [1, 1];
  return (
    <div className="gallery-grid flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-0">
      {photos.map((photo, index) => {
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
  const dialog = useRef<HTMLDialogElement>(null);
  const modal = useModal(dialog);
  function openPhoto(index: number) {
    setIndex(index);
    modal.open();
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
            <p className="hidden md:block">EXPLORE 12 SELECTED MOMENTS</p>
          </div>
        </div>
      </section>
      <section id="photo-collection" className="bg-ink text-white">
        <div className="site-container flex flex-col gap-10 py-16 md:gap-16 md:py-20">
          <div className="rail-layout gap-6">
            <p className="eyebrow text-lime">
              12 SELECTED
              <span className="hidden md:inline">
                <br />
              </span>
              <span className="md:hidden"> </span>MOMENTS
            </p>
            <div className="flex flex-col gap-5">
              <h2 className="heading-text">
                Our community,
                <br />
                in focus.
              </h2>
              <p className="body-text text-muted">
                Select a photo to take a closer look.
              </p>
            </div>
          </div>
          <GalleryGrid onOpen={openPhoto} />
          <div className="collection-link flex flex-col gap-6 md:border-t md:border-line md:pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-muted">
              <span className="small-text md:hidden">
                More moments from our community.
              </span>
              <span className="eyebrow hidden md:inline">
                MORE MOMENTS FROM OUR COMMUNITY
              </span>
            </p>
            <Button
              href={links.collection}
              external
              tone="outline-light"
              className="w-full md:w-auto"
            >
              View the full collection
            </Button>
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
