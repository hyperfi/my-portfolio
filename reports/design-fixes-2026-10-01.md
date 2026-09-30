# Portfolio design refinements

Implemented against the recommendations in `design-audit-2026-10-01.md`. The design-taste-frontend skill guided a targeted refinement, retaining the Vue architecture, A-State mark, routes, identity, scientific terminology, and 36-particle 2D simulation. No deployment, commit, or push was performed.

## Changes

- Added separate foreground tokens for accent-filled controls. Dark buttons and selected publication tabs now use dark text on the pale blue accent.
- Removed persistent fading of domains/projects and the research entry fade. Domain selection requires click, Enter, or Space; focus and hover no longer select. A reset sits beside the domain controls.
- Moved the latest article into the research introduction and the complete bibliography before the domain/programme sections. Added a direct Publications jump link. At 375 x 667, the bibliography begins around 1,270 CSS pixels, compared with roughly 5,130 in the audit.
- Changed the home statistic to the exact total: 22 publications and preprints. Publication classifications and bibliography contents are unchanged.
- Rebuilt the phone hero around a small visible portrait and compact introduction. At 375 x 667, the portrait begins at 100px and both buttons fit before 490px. Confirmed the email link has an unobstructed hit target. The mail app itself was not launched.
- Made the lab, apps, spotlight, and footer theme-aware. The dark homepage hero remains a deliberate signature exception. Preserved both manual themes and the supplied logo.
- Reduced decorative numbering, repeated labels, grids, CSS pictograms, and status pulses. Enlarged useful research metadata and made page headings consistently sans-serif. Retained the existing Newsreader treatment on the home headline and research perspective.
- Constrained app galleries to a definite height. All four phone screenshots fit inside their frames with intact aspect ratios on desktop and phones.
- Added two real creative outputs with captions and working links: the TDSE tool and PES visualizer. Retained photography, astronomy, outdoors, and communication descriptions without invented imagery. Instagram blocked automated access, so no new personal photographs were imported.
- Added compact author summaries for long collaborations, keeping Abhishek visible and the complete list expandable. Citation copying still uses the full original author string. The introductory latest article is independent of publication category selection; the complete record intentionally includes every paper.
- Clearly labelled the animated response as schematic and not a numerical calculation.
- Standardized contact actions as Get in touch and removed the duplicate research collaboration band.
- Matched the search prompt to its actual fields. Added tab-panel relationships, roving tab stops, Arrow/Home/End navigation, and mobile-menu Escape with focus restoration.
- Self-hosted Manrope, DM Mono, and Newsreader through Fontsource packages with license copies in `public/fonts`. Removed Google Fonts requests. Loaded KaTeX styles only with Research.
- Added route-specific titles/descriptions, canonical/social URLs, generated route HTML metadata, robots.txt, and a sitemap. These are metadata shells, not server-rendered publication pages.
- Added responsive WebP portrait/tool variants while retaining every original image. The mobile portrait is 8,978 bytes versus the original 1,038,111-byte PNG. Regenerate with `npm run images:optimize` after replacing originals.
- Centralized canvas scheduling: pause offscreen and in hidden tabs, react to reduced-motion preference changes, and clean up listeners/observers/frames.

## Validation

- `npm test`: passed the canvas lifecycle regression covering offscreen, hidden-tab, reduced-motion, resume, and cleanup behavior.
- `npm run build`: passed, including bibliography generation and route metadata output.
- `git diff --check`: passed. Original bibliography content and both JSON mirrors preserved.
- Browser inspected at 1280 x 720, 390 x 844, and 375 x 667 in light/dark modes. Checked header alignment, phone menu, Escape focus, direct publication access, Preprints-to-Journals, keyboard selection, domain reset, search empty state, author expansion, screenshot containment, and no horizontal overflow.
- Original favicon and logo asset references remain valid. The mark itself was not redesigned; its accessible link name now follows its visible text.

### Final Lighthouse production runs

| Route | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home, simulated mobile | 96 | 100 | 100 | 100 |
| Research, simulated mobile | Not measured | 100 | 100 | 100 |
| Beyond the lab, simulated mobile | Not measured | 100 | 100 | 100 |

Home lab metrics: LCP 2.4s, total blocking time 50ms, CLS 0. These are local simulated results, not field Core Web Vitals or an accessibility certification. Initial home run before delivery optimizations scored 85, with LCP 3.8s; results vary by machine/run. Full JSON reports are alongside this file.

No em dashes found in website source. Original scientific en dashes remain. No physical-device testing, live deployment, indexing verification, or mail-client launch was performed. The dev tab briefly logged a missing newly generated image during an intermediate hot reload; production assets were subsequently generated and verified without broken images.

`npm audit` reports 13 dependency findings (1 low, 2 moderate, 10 high). A broad dependency/security upgrade was not part of this visual refinement; no automatic or breaking audit fix was run.

## Files changed

Existing: `index.html`, `package.json`, `package-lock.json`, `src/main.js`, `src/style.css`, `src/router/index.js`, `src/views/Home.vue`, `src/views/Research.vue`, `src/views/Hobbies.vue`, `src/components/BrandLogo.vue`, `src/components/Navbar.vue`, `src/components/Footer.vue`, `src/components/ParticleCollisionField.vue`, `src/components/ResearchResponseLab.vue`.

Added: `src/fonts.css`, `src/data/page-meta.json`, `src/components/PublicationAuthors.vue`, `src/lib/canvasScheduler.js`, `scripts/build-page-metadata.mjs`, `scripts/optimize-images.mjs`, `scripts/canvas-scheduler.test.mjs`, `public/robots.txt`, `public/sitemap.xml`, two portrait WebP variants, and eight tool WebP variants in `public/images/demos`.

Reports: this implementation summary, Lighthouse JSON files, and desktop/mobile screenshots in `reports/`. The prior audit report is preserved.
