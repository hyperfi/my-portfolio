# Portfolio design audit

Date: 1 October 2026

Scope: the current Vue/Vite implementation in `E:/my-portfolio`, served locally. Home, Research, and Beyond the lab were reviewed through source inspection and browser observations at desktop and phone widths. No website source or assets were changed.

Method: the explicitly requested design-taste-frontend skill, applied to a scientific portfolio rather than a commercial landing page. The existing Vue architecture, routes, logo, scientific notation, real screenshots, and full bibliography are appropriate to preserve. A framework migration or strict marketing copy limit would not serve this brief.

## Verdict

The site has a credible and recognisable foundation, but its presentation is more decorated than minimal. Its strongest elements are personal and specific: the portrait, A-State logo, real scientific software, publication record, and published apps. Its weakest elements are repeated miniature labels, excessive vertical travel, persistent fading of readable content, and several contrast and image containment problems.

A targeted refinement is preferable to another complete redesign. Keep the identity and simplify how visitors reach and read the work.

Reading this as: a research portfolio for collaborators, students, and hiring committees, with a minimalist scientific and editorial language built with native CSS and Vue.

Estimated current skill dials: DESIGN_VARIANCE 6, MOTION_INTENSITY 5, VISUAL_DENSITY 4. Recommended direction: 6 / 4 / 3 for introductory surfaces, allowing greater information density in the bibliography. These are design judgments, not measured quality scores.

## Existing foundation

| Area | Current treatment | Judgment |
| --- | --- | --- |
| Palette | Warm paper `#f2f0e9`, dark ink `#15171a`, cobalt `#304ffe`; dark mode uses `#0d0f11` and `#8494ff` | Distinctive and worth retaining; separate text accent and button fill tokens |
| Typography | Manrope, Newsreader italic emphasis, DM Mono metadata | Appropriate editorial character, but repeated serif emphasis and tiny mono text weaken hierarchy |
| Logo | A-State mark beside Dr Abhishek / Nuclear physicist | Compact and integrated; preserve |
| Shapes | Mostly square sections, lightly rounded buttons, rounded app icons | Broadly coherent; native app icons reasonably retain their shape |
| Navigation | Home, Research, Beyond the lab; email contact; manual theme control | Clear and compact |
| Motion | 36-particle collision background, research illustration, hover/focus feedback, entry transitions | Scientific identity is useful; reduce automatic attention cues and keep content readable |
| Content | Research domains, current programme, searchable publications, four browser tools, two Android apps | Strong substance; access and evidence should lead the composition |

## Priority findings

### 1. High: dark-mode buttons fail text contrast

The primary home button and selected publication tab use white text on `#8494ff` in dark mode. The calculated contrast is **2.74:1**, below the **4.5:1** requirement for normal-sized text. The corresponding light-mode blue button is **5.71:1**.

Recommendation: retain the light accent for links, but use a darker button fill or dark text on the pale blue button. Check hover and selected tab counts as well.

Evidence: `src/style.css:82`, `src/style.css:614`, dark-mode computed styles observed in the browser. Contrast benchmark: [W3C SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### 2. High: domain selection makes other research content difficult to read

Inactive domain cards receive `opacity: .46`; unrelated project rows receive `.4`. These items are still available content, but look disabled. Hover also sets the persistent selection, so moving the pointer across a card can affect the programme below without an explicit choice.

Recommendation: keep text at full opacity, indicate the active domain with its border/background, and reserve persistent selection for deliberate activation. Keep a clear reset near the domain controls.

Evidence: `src/style.css:504`, `src/style.css:588`, `src/views/Research.vue:37`, `src/views/Research.vue:59`; selected-state browser inspection.

### 3. High: publications are too far from the research entry point

At 375 x 667, the Publications section begins approximately **5,133 CSS pixels** from the document top. At the desktop viewport inspected, it begins around **3,711 pixels**. Visitors seeking papers must first pass the large hero, illustration, five tall domain cards, and current programme.

Recommendation: provide an immediate Publications jump link in the research introduction. Consider placing the latest publication earlier. Preserve the complete searchable bibliography, which is useful on a research page.

Evidence: browser section geometry; `src/views/Research.vue:3`, `src/views/Research.vue:116`.

### 4. High: the publication statistic includes a preprint

The homepage displays **22+ Peer-reviewed works**, but its count adds 9 journal entries, 12 conference entries, and 1 preprint. That label is not supported by the counting logic; the plus sign also suggests a broader count than the exact dataset establishes.

Recommendation: use a neutral total such as Publications and preprints, or calculate a separately verified peer-reviewed count. Do not silently assume that all proceedings are peer-reviewed.

Evidence: `src/views/Home.vue:54`, `src/views/Home.vue:155`; current publication tabs and JSON categories.

### 5. Medium: app screenshots are unintentionally clipped

At desktop width, the app media frame measured about **337 pixels** high, while the gallery measured **452 pixels** and the first screenshot **434 pixels**. The frame's hidden overflow cuts off the lower interface. This limits the benefit of using accurate current screenshots.

Recommendation: give the gallery a definite height and constrain its children to that height. Show complete phone screenshots with their aspect ratio intact, or explicitly choose and label a deliberate crop.

Evidence: `src/style.css:732`, `src/style.css:743`, `src/style.css:747`; browser image/container geometry.

### 6. Medium: the phone hero delays both identity and action

At 390 x 844, the portrait begins around **807 pixels** down. At 375 x 667, the action group begins around **665 pixels** and the portrait around **799 pixels**; the hero totals roughly **1,159 pixels**. The first view contains four headline lines, repeated identity labels, and a long introduction before the visitor sees the portrait.

Recommendation: compose a dedicated mobile hero with a smaller visible portrait, a shorter introduction, and the research action higher up. Retain the 2D simulation as a supporting background.

Evidence: browser geometry; `src/views/Home.vue:15`, `src/views/Home.vue:24`; mobile rules in `src/style.css`.

### 7. Medium: light mode repeatedly turns into dark mode mid-page

The home hero, computational lab, app showcase, publication spotlight, and footer use fixed dark treatments while surrounding sections are warm/light. This can be an intentional art direction, but the repeated switching makes the theme control less consistent and amplifies the generic dark-tech appearance.

Recommendation: use theme-aware section surfaces and smaller changes in tone. If the dark hero remains a signature choice, make it the deliberate exception rather than repeating several full inversions.

Evidence: `src/style.css:172`, `src/style.css:616`, `src/style.css:715`, `src/style.css:915`; light-mode page inspection.

### 8. Medium: miniature labels and repeated framing compete with content

Research method chips are **7.68px**, flow labels **7.84px**, and many other metadata labels about 8-10px. Numbering, uppercase labels, thin grids, badges, status dots, and borders repeat across the site. The homepage has four section eyebrows plus the footer eyebrow, exceeding the skill's suggested restraint for its six major page blocks including the footer.

Recommendation: remove labels that repeat the heading, enlarge useful metadata, and reserve grids for actual charts. Keep scientific terminology; reduce the ornamental apparatus around it. Use Newsreader selectively rather than ending every page hero with an italic word.

Evidence: `src/style.css:564`, research browser computed styles, `src/views/Home.vue:14`, `:75`, `:101`, `:137`, and shared footer.

### 9. Medium: Creative practice describes work rather than showing it

Photography, astronomy, hiking, and 3D communication are presented through five bordered text cards and simple CSS icons. A page about visual practice has no examples of that practice before the app section. Large empty card regions make the interests feel generic.

Recommendation: introduce two or three real images or outputs from your own work, each with a concrete caption and link. Use a varied editorial layout, with fewer text chips. Existing personal material is more suitable than generated stock imagery.

Evidence: `src/views/Hobbies.vue:19`, `src/views/Hobbies.vue:30`, `src/style.css:782`.

### 10. Medium: publication author lists overwhelm scanning

Several papers expose full collaboration lists, which become large text blocks on phones. The latest paper is repeated immediately in the full journal list. This makes it harder to compare titles, years, venues, and your role.

Recommendation: show a compact author summary by default, preserving the complete list in an expandable detail. Keep your name visible and the full citation intact. Integrate the featured paper with the list so the duplication has a clear purpose.

Evidence: `src/views/Research.vue:145`, `src/views/Research.vue:186`; desktop and phone publication observations.

### 11. Medium: the response illustration needs a visible schematic label

The animated strength curve is assembled from Gaussian peaks and pointer-driven shifts. It is an illustration, not a numerical response calculation, but the visible labels include Live field and Strength function. Its accessible description does call it an illustration; that distinction should also be available to sighted visitors.

Recommendation: use a short visible caption such as Schematic collective response. A future data-driven figure could cite its system and calculation separately.

Evidence: `src/components/ResearchResponseLab.vue:72`, `:164`, `:173`.

## Smaller improvements

- The spotlight author highlight is overridden by a later CSS rule in light mode, yielding cobalt text on a navy background. It needs a specific, winning spotlight text color.
- Contact labels differ between Let’s talk, Get in touch, and Start a conversation. Pick one consistent phrase. The research collaboration band and shared footer also repeat the same large invitation.
- The research flow numbering does not match the card numbering: flow 01 is Structure, but card 01 is Response. Remove the decorative numbers or align the ordering.
- The search placeholder promises searching by method, but the filter searches title, author, journal, year, and DOI. Match the prompt to the implemented search fields.
- Publication tabs have selected-state attributes but lack a complete tab-panel/arrow-key model. Mobile navigation lacks an explicit Escape-to-close handler. Both merit keyboard verification during refinement.
- Routes share one title and description. Add page-specific metadata, absolute social-image URLs, and a canonical URL strategy. Search rankings and index coverage were not assessed.
- Google Fonts are externally loaded. Self-hosting the three fonts would align with the skill and reduce external dependencies; measure loading before claiming a speed improvement.
- Canvas loops stop on unmount and initially honor reduced motion, but do not visibly use viewport/visibility gating. Consider pausing offscreen rendering. No battery or frame-rate impact was measured.

## Checks and limits

- Reviewed all three local routes; desktop screenshots and mobile views at 390 x 844 and 375 x 667.
- Observed both themes, light-mode mobile menu, selected research states, and Preprints -> Journals transitions on desktop and phone.
- The light-mode mobile menu remained legible. The journal spotlight returned after switching back from Preprints.
- No horizontal page overflow was observed at the phone widths checked. No broken images or console errors were observed in the inspected research state.
- Source contains global focus styles, labelled publication inputs, lazy-loaded secondary images, real screenshots, and reduced-motion fallbacks.
- No em dashes were found in the inspected site source. En dashes remain in scientific names and imported bibliographic text; editing original bibliographic material would require separate consideration.
- No production build was run because this was an audit with no implementation changes. No Lighthouse, measured Core Web Vitals, physical-device tests, full accessibility certification, deployed-site comparison, link crawl, or search-ranking analysis was performed.

## Recommended sequence

1. Fix contrast, persistent fading, the publication count label, and screenshot containment.
2. Recompose the mobile introduction and add direct access to publications.
3. Simplify labels, spacing, theme surfaces, and repeated contact sections.
4. Add real creative work and refine the bibliography presentation.
5. Verify keyboard behavior and measure production performance after the visual changes.

The intended outcome is a personal scientific portfolio in which the work carries the visual interest, supported by the existing logo, portrait, cobalt accent, and restrained 2D motion.
