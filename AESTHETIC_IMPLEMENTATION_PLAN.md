# Fairy Wed Stories — Aesthetic Implementation Plan

Status: approved for local execution. Work stays inside Fairy Wed Stories. No deployment, Supabase connection, database write, production content change, or contact activation is included.

## Creative target

Create a mobile-first wedding editorial experience with the restraint of a fine-art photography journal and the warmth of a bespoke planning studio. Photography leads; typography and transitions provide structure. The site should feel art-directed at 360–430px, not like a desktop card grid compressed to a phone.

The benchmark is a premium international creative studio: strong photography, clear hierarchy, intentional pacing, and a few memorable interactions. Avoid template-like grids of identical cards, excessive wedding motifs, too much gold, decorative blobs, and motion on every element.

## Current visual audit

The React 18 / Vite application has ten routes. It already uses an Embla fading hero, Framer Motion, GSAP ScrollTrigger, a three-row social wall, image ribbons, an image editor, portfolio filters, a viewer, and a mobile menu. The CMS and contact restrictions are already implemented.

The foundation works, but the homepage leaned on repeated carousels and similarly cropped photos. The introductory content read like a strip; demo records reused images; social thumbnails were uniform; and the display font was not bundled, leaving its rendering to local fallback. Old JP Events imagery was referenced through remote paths and mixed with unsupported couple names, venues, dates, guest counts, awards, and claims. None of those claims should travel with the photographs.

Baseline screenshots are under artifacts/screenshots/before for all ten routes at 360, 390, 430, 768, 1440, and 1920 CSS-pixel widths. The restored images and local rendering were inspected in a real browser.

## Proposed visual system

- Warm ivory #FAF7F0 is the canvas; espresso #30251F is the ink and cinematic contrast; champagne #B89A65 is a restrained accent; beige #E8DED0 carries transitions; muted rose #C69A9A appears sparingly.
- Self-host the Cormorant Garamond variable Latin font, weights 300–700, under its SIL Open Font License. Use it for editorial display type; keep body copy on a system sans stack.
- Use fluid heading sizes, tight display leading, small tracked labels, readable body type, narrow text measures, and controlled mobile gutters.
- Favor edge-to-edge photography, asymmetric desktop columns, varied photo proportions, and mostly square edges. Avoid a repeated floating-card treatment.
- Tokens live in src/index.css and tailwind.config.js. Preserve current Fairy brand copy; add no unverified credentials, customers, dates, pricing, places, partnerships, or promises.

## Interaction specifications

### Cinematic homepage hero

Location: homepage hero; keep home.hero.slide-01 through slide-03 and Embla Fade.

Behavior: full-viewport photography, short active-slide mask reveal, low-amplitude scroll drift, count/progress, previous/next controls, existing pause control, portrait-focused mobile crops, and swipe. First image eager; later frames lazy. Text and navigation work if motion is disabled.

Implementation: Embla owns the slide track. CSS owns a short mask on the inner frame. GSAP ScrollTrigger moves a separate parallax wrapper, preventing transform conflicts. Framer Motion owns copy entrance. CSS and JavaScript honor reduced motion.

### Editorial introduction and featured story

Location: immediately below the hero. A large typographic statement transitions into the CMS-editable featured photograph and copy.

Mobile: natural vertical flow, short label, fluid headline, no pinned scroll scene. Desktop: asymmetric image-and-copy layout.

Implementation: existing home.experiences.featured slot, existing GSAP reveal, Cormorant display type. Do not add decorative photos that cannot be edited through the existing data model.

### Galleries and destination inspiration

Location: film moodboard, services preview, destination and venue carousels.

Behavior: one photo leads; secondary images vary in aspect; swipe and accessible controls remain; destination images are explicitly inspiration; captions stay minimal; sections remain short and natural scrolling continues.

Implementation: existing Embla and EditableImage; lazy-load below-fold frames. No pinned mobile story.

### Three-row social wall

Location: homepage Follow The Magic / SOCIAL WALL. Preserve social_wall_row and social_wall_sort_order.

Behavior: three independent native horizontal rows, differing parallax direction/speed, mixed portrait/landscape/square crops, touch swipe, arrow keys, and visible row progress. No marquee autoplay.

Implementation: ImmersiveImageRibbon consumes the CMS portfolio feed. Development preview uses twelve unique restored photos. Published records retain the existing supported home.moments.portfolio-<record-id> editing key. Demo-only rows never expose an invalid edit action.

### Portfolio and navigation

Keep filters, search, masonry/grid options, fullscreen viewer, keyboard arrows, Escape-to-close, and touch scrolling. Opening an image must not wait for an animation. Keep the full-screen mobile menu's focus behavior, Escape handling, body lock, and visible close button. Hover is a desktop enhancement only; every action must remain available to touch and keyboard.

### Supporting routes

About, Services, Contact, Invitations, Blog, administrator, and not-found routes retain their behavior and content boundaries. Make service information easy to scan and use large editorial photos without repeating identical grids. Contact remains demo-only and transmits no form data.

## Motion and performance rules

- Embla owns carousel motion; GSAP / ScrollTrigger owns parallax and one-shot image reveals; Framer Motion owns brief entrances and dialogs.
- Never let two systems write transform on the same element.
- Prefer transform and opacity; use short clip-path only on one focal image at a time.
- Keep parallax low amplitude, transform-only, and disabled/simplified for prefers-reduced-motion.
- Do not add smooth-scroll wrappers, WebGL, or new animation libraries.
- Do not eagerly load all portfolio images. Only the leading hero image is eager.

## Asset and rights boundary

The selected files reference old JP Events legacy photo IDs. Three canonical Pexels URLs were present in legacyCmsData.ts; the other selected IDs were referenced through Postimage paths or the original content inventory. Those IDs were retrieved from the canonical Pexels CDN and stored locally. That proves a source match, not JP Events ownership or Fairy Wed Stories association.

The original recovered JP Events files under src/assets/legacy-demo are retained only for traceability and are not referenced directly. At the owner's request, two of those Pexels photo IDs were restored from Pexels at 3840 px wide under neutral filenames in public/images/indian-wedding; they now supply the first two homepage hero slides and related demo content. Creator, source page, source resolution, local resolution and hashes are in DEMO_ASSET_MANIFEST.md. The logo is the supplied user image at public/images/brand/fairy-wed-stories-logo.png. These preview photos are illustrative and are never described as completed Fairy projects. Keep explicit on-page preview labels, do not suggest participant endorsement, and replace the stock set with approved Fairy-owned or permission-cleared work before a real client portfolio launch. A production build must contain no jp-legacy-pexels file.

Unknown Postimage screenshots, developer photos, AI/Freepik-labelled venue imagery, and the marketplace-like 1000_F image remain excluded. Full source, destination, hash, size, and rights status appear in RESTORED_IMAGE_MANIFEST.md.

## CMS and backend preservation

Keep Supabase architecture, role/MFA boundaries, CMS tables, RLS, media storage, published-content precedence, realtime/cache behavior, and stable image slots. Do not modify functions, policies, migrations, production data, or connect to JP Events Supabase.

Preserve identifiers: home.hero.slide-01/02/03; home.experiences.featured; about.story-01/02/03; existing service IDs and slots; fairy-inspiration-01 through fairy-inspiration-12; social-wall row and sort fields. Published CMS remains authoritative when configured. This aesthetic task does not verify live Supabase authentication, upload, or publishing.

## File-by-file roadmap

- src/data/demoMedia.ts: local, base-path-aware mapping to the current high-resolution Indian wedding inspiration set.
- public/images/brand/fairy-wed-stories-logo.png: supplied user logo used in shared brand placements and browser icons.
- public/images/indian-wedding: locally hosted high-resolution illustrative photography; credits and Pexels source pages are in DEMO_ASSET_MANIFEST.md.
- src/assets/legacy-demo: archived historical source copies; not referenced by the app and excluded from production output. Two Pexels photos are separately restored under public/images/indian-wedding with neutral filenames and documented as illustrative stock imagery.
- src/assets/fonts: licensed Cormorant variable font and OFL notice.
- src/data/demoCmsData.ts: unique illustrative images and neutral captions; preserve identifiers, categories, and ordering.
- src/config/brandConfig.ts: retain Fairy copy/service IDs and refer to the supplied brand logo and distinct preview photos.
- src/components/home/HomeHero.tsx: image crop, mask/parallax separation; retain Embla and hero slot IDs.
- src/components/home/HomeEditorialSections.tsx: editorial statement, featured proportions, distinct gallery mapping, published-row edit keys.
- src/components/ImmersiveImageRibbon.tsx: varied row proportions and refined warm palette; retain native touch scroll/progress.
- src/index.css and tailwind.config.js: font, system body stack, tokens, reduced-motion reveal.
- package-lock.json: compatible non-forced audit fixes; no new package.
- artifacts/screenshots: before/after captures and audit reports.

## Acceptance criteria

Test first at 360×800, 390×844, and 430×932, then 768×1024, 1440×900, and 1920×1080. Inspect all routes and interactions in a real browser.

- No horizontal page overflow; intentional gallery overflow stays inside its viewport.
- Mobile uses natural scroll and swipe; no hover-only content, autoplay social wall, scroll hijack, or pinned mobile story.
- Controls are keyboard operable, focus is visible, touch targets are suitable, dialogs close with Escape, and carousels have names.
- Reduced motion disables or simplifies GSAP/CSS movement.
- Image boxes reserve proportions; below-fold photos are lazy; no broken images.
- Public visitors never see admin edit controls; demo contact sends no data.
- No restored unverified asset is present in production build.
- Run TypeScript, lint, production build, route/interaction and image-load checks, npm audit, and comparable mobile performance traces. Report actual measurements, not estimated scores.

## Adversarial review

For each effect ask: does the photo remain the subject? Does it work with motion disabled? Does it aid navigation or story comprehension? Is the image appropriately sourced and labelled? Does the mobile composition feel designed rather than shrunk? If not, simplify or remove it.
