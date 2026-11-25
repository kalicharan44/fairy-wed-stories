# Responsive Preview Screenshots

Captured on 25 November 2026 from the local Fairy Wed Stories preview at `http://127.0.0.1:5175/`.

These captures predate the 25 November logo and Indian wedding photo refresh, so they do not show the current logo or imagery. The refresh passed lint, TypeScript, production build and local asset endpoint checks, but this screenshot set has not been regenerated.

The `artifacts/screenshots/` directory contains 60 after screenshots for the routes below:

- 50 full-page JPEGs at 360×800, 390×844, 430×932, 768×1024, and 1440×900.
- 10 desktop viewport captures at exactly 1920×1080, one per route, created with isolated headless Chrome.

The `artifacts/screenshots/before/` directory contains 60 baseline full-page captures across all six requested widths. Before and after sets can be compared by matching file names.

| Screenshot suffix | Route |
| --- | --- |
| `home` | `/` |
| `about` | `/about` |
| `services` | `/services` |
| `portfolio` | `/portfolio` |
| `invitations` | `/invitations` |
| `blog` | `/blog` |
| `blog-preview` | `/blog/preview` |
| `contact` | `/contact` |
| `admin-login` | `/admin/login` |
| `not-found` | `/not-found` (fallback route) |

File names use `<width>x<height>-<suffix>.jpg`, for example `390x844-home.jpg`, `1440x900-portfolio.jpg`, and `1920x1080-home.jpg`. The 1920 captures show the initial 1080-pixel viewport; the other after captures are full-page images.

Before each full-page capture, the page was scrolled through and returned to the top so scroll-triggered reveals were visible. Mobile browser emulation used touch input and a 2× CPU slowdown. Browser checks found no horizontal page overflow and no broken images across the five full-page viewport widths. The separate 1920 captures were checked for exact image dimensions and route rendering.

On mobile, the hero image transform changed with scrolling and the featured image mask reveal completed. The mobile navigation opened by tap and closed with Escape. Hero, social-wall row, services, and venue carousel controls advanced; portfolio filtering and the image viewer opened. The contact fields are disabled by their fieldset and the submit control is disabled. The administrator route shows the unconfigured-project notice and no login fields.

The screenshot directory contains visual review artifacts only. It is not source content and does not indicate that a backend or production deployment has been configured.
