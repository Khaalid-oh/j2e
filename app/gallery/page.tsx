import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery";
import { CommunityCTA } from "@/components/community-cta";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Our journey, in pictures. Explore twelve moments of learning, connection and community from Journey to Excellence.",
};

export default function GalleryPage() {
  return (
    <>
      <main id="main-content">
        <GalleryExperience />
        <CommunityCTA gallery />
      </main>
      <SiteFooter />
    </>
  );
}
