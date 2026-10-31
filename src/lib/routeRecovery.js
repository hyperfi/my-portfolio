const RETRY_KEY = 'portfolio:route-recovery'
const RETRY_WINDOW_MS = 60_000

// Browsers use different messages for missing JS modules and Vite CSS chunks.
export function isRouteAssetError(error) {
  return /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css|loading (?:css )?chunk .+ failed/i.test(error?.message || '')
}

export function createRouteRecovery({ location, getStorage, isOnline, onFailure, now = Date.now }) {
  let navigating = false

  return (error, to) => {
    const destination = new URL(to.fullPath, location.origin)
    if (destination.origin !== location.origin) return
    const href = destination.pathname + destination.search + destination.hash

    if (isRouteAssetError(error) && isOnline()) {
      if (navigating) return
      try {
        const storage = getStorage()
        const previous = JSON.parse(storage.getItem(RETRY_KEY) || 'null')
        const time = now()
        // Persist across a full page load so an unavailable asset cannot cause
        // a reload loop. A later deployment can recover again after a minute.
        if (!previous || previous.href !== href || time - previous.time >= RETRY_WINDOW_MS) {
          storage.setItem(RETRY_KEY, JSON.stringify({ href, time }))
          navigating = true
          location.assign(href)
          return
        }
      } catch {
        // With blocked storage, prefer a manual link over an unbounded reload.
      }
    }

    onFailure({ href, offline: !isOnline() })
  }
}
