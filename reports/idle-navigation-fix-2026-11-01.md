# Navigation after long idle periods

Reported: after leaving the site open for hours or days, Research and other links stop opening until a manual reload.

## Diagnosis and scope

Research and Beyond the lab use dynamic imports. A tab that predates a deployment can request hashed JS/CSS files that no longer exist. The router had no error handler, so a rejected import left navigation aborted. This is a plausible cause of the report, confirmed as an unhandled code path; no days-long real-session trace was available. Vite documents the deployment case at https://vite.dev/guide/build#load-error-handling.

## Change

- Recover known route-module and CSS-preload failures by opening the requested same-origin URL as a full document, preserving its query and hash.
- Store a retry marker in sessionStorage: one automatic recovery per destination per minute, persisted across document loads. Suppress concurrent recovery calls.
- When offline, storage is blocked, or the automatic retry has already been used, show an accessible notice and native “Open page again” link. Other application errors receive the notice without automatic reload.
- Clear the notice after successful navigation. Do not update route metadata for failed navigations.

## Verification

- `npm test`: 5 passed, including existing canvas lifecycle coverage and 4 navigation-recovery tests. Covers browser error variants, query/hash preservation, retry guard across fresh documents, offline/storage failures, and unrelated errors/external destinations.
- `npm run build`: passed. Unrelated generated publication timestamp changes reverted.
- Production-build browser fault injection on localhost: Research module requests returned HTTP 404 until a new `/research` document was requested. Clicking Explore research automatically reached Research. Server recorded two failed module requests (preload/import) and exactly one recovery document.
- Persistent HTTP 404: one automatic document navigation, then fallback notice; no reload loop observed. Recorded documents were the original home document and `/research` only.
- After restoring asset availability, the native fallback link opened Research, the notice disappeared, and Beyond the lab opened normally.
- Screenshots: `navigation-recovery-research.jpg` and `navigation-recovery-fallback.jpg`.

No literal hours/days idle soak, physical mobile browser, or production deployment was performed. Tests reproduce failed route assets rather than all possible browser suspension failures. The local test server and tabs were closed after verification.
