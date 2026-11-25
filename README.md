# Journey to Excellence

A faithful implementation of the supplied Figma homepage (`/`), Upcoming Events (`/events`) and Gallery (`/gallery`), including the distinct 390px mobile designs. Uses Next.js App Router, TypeScript, Tailwind, Inter and DM Mono.

## Run locally

Node.js **20.9 or later** is required; verified with **26.13.0**. Use npm and the committed lockfile.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To run the production version:

```sh
npm run build
npm start
```

Installed versions: **Next.js 16.4.6**, **React / React DOM 19.3.1**, **Tailwind CSS / @tailwindcss/postcss 4.3.5**. These stable versions were resolved from npm at implementation time. Tailwind follows its [official Next.js PostCSS integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs). Production uses the documented [Next.js Webpack build option](https://nextjs.org/docs/app/api-reference/cli/next#next-build-options), because this environment blocked Turbopack's internal build-worker port binding. Development retains the default Turbopack bundler.

## Implemented behavior

- Shared responsive navigation, active states, breadcrumbs, original bracket wordmarks, J2E motif, footer and portal links.
- Complete homepage, original photographic video poster, YouTube player loaded only after Play, FAQ accordions and registration links.
- Working event category filters, with Professional Learning and Classroom Practice both mapped to Learning.
- All 30 original Drive photographs in a paginated gallery (12 per page), preserving the original twelve on page one, the staggered desktop composition, sequential mobile/keyboard order, clickable hero photographs and a full-screen viewer using `object-fit: contain`.
- Previous/next wraparound, accurate counts, captions, categories, Escape and arrow keys, explicit Tab/Shift+Tab focus containment, focus restoration and background scroll locking.
- Local original-image links, numbered pagination with Previous/Next controls, local optimized images, local fonts, reduced-motion support, visible keyboard focus and route metadata. Gallery visitors stay on the site; Drive URLs remain only as source provenance in the dataset and asset map.

## Content and assets

Photo metadata is in [lib/photos.ts](lib/photos.ts); event examples are in [lib/events.ts](lib/events.ts); portal and video URLs are in [lib/links.ts](lib/links.ts). Event dates, venues, categories and destinations can be replaced in the dataset.

The four events are **illustrative programme examples**, not confirmed upcoming events. They deliberately retain “To be announced” dates and venues. “View event” opens the supplied sign-in portal until real detail URLs are provided.

The homepage uses the owner-supplied **600+** participant metric. The 2026 retrospective, 100+ sessions, three days and 1:03 film duration follow the design. The owner should confirm these time-sensitive claims, contact information and portal availability before a public launch. No new dates or claims were invented.

All **30 original photographs from the supplied folder** are saved in `public/images/j2e/`; no thumbnail exports are used as viewer originals. The **12 isolated SVG assets** were exported directly from Figma. There are **no unresolved assets or development placeholders**. [docs/asset-map.json](docs/asset-map.json) maps every file to its original filename or Figma node, source URL, usage, byte size and SHA-256 checksum.

Figma asset-download URLs returned empty SVG responses. The authorized native Figma `exportAsync({ format: 'SVG_STRING' })` workflow recovered the exact wordmarks, motif and custom icons. No replacement branding was drawn. The video poster was identified as `IMG_2600.jpg` and downloaded from the supplied Drive folder. Temporary Figma URLs are absent from application code.

The homepage's first community photo intentionally differs between desktop (`IMG_3364.jpg`) and mobile (`IMG_3090.jpg`), matching the actual image fills despite inconsistent Figma layer names. Gallery desktop images 9, 10 and 11 use top-aligned crops; image 11 also remains top-aligned on mobile. The middle homepage community photograph uses `IMG_3398.jpg`, showing an educator speaking into a microphone beside her presentation laptop. Thumbnails crop with CSS; the viewer always displays the complete photograph. The removed homepage portrait (`IMG_3118.jpg`) remains available in the full gallery alongside every other Drive image.

Inter and DM Mono are locally hosted through `next/font/local`. Their OFL licenses are stored alongside the fonts in `public/fonts/`. The app icon reuses the exported J2E motif.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright suite starts a development server if needed. To test an already running production server:

```sh
PLAYWRIGHT_BASE_URL=http://localhost:3020 npm run test:e2e
```

The 26 browser tests cover all three routes at **360, 390, 768, 1024, 1440 and 1920px**, navigation, category filters, all 30 viewer images across three gallery pages, counts, boundary wrapping, keyboard/focus behavior, pagination navigation, local original-image links, the updated homepage metric/portrait, menu controls, portal links, FAQs and deferred video activation. Production browser checks also confirmed actual YouTube playback (`paused: false`, advancing playback time, ready state 4).

Generate full-page screenshots and an image/error/layout report with a running server:

```sh
npm run screenshots
# Or target a production server:
PLAYWRIGHT_BASE_URL=http://localhost:3020 npm run screenshots
```

Local verification artifacts are in `artifacts/browser/` and the exact Figma comparison images are in `artifacts/reference/`. They are intentionally excluded from Git. The browser report checks visible image loading, console/runtime errors and horizontal overflow. The original desktop/mobile layouts were compared with all six Figma page frames. The current version extends the gallery with pagination and applies the owner’s updated portrait and participant metric.

## Design sources

[Figma file](https://www.figma.com/design/t9QkArlTsktH3zv7rWjW5g/Journey-to-Excellence) · [Original photographs](https://drive.google.com/drive/folders/1hB0ha1xclHgimTkREymkrRzOCJe_z5eE?usp=sharing)

| View              | Desktop node | Mobile node |
| ----------------- | ------------ | ----------- |
| Homepage          | `38:214`     | `38:226`    |
| Upcoming Events   | `84:198`     | `84:443`    |
| Gallery           | `96:564`     | `96:704`    |
| Photo viewer      | `96:832`     | `96:936`    |
| Mobile navigation | —            | `96:816`    |

# j2e
