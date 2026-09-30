// A single animation loop per canvas. Stop work when it cannot be seen, and
// respond immediately to motion preferences changed while the page is open.
export function createCanvasScheduler(element, { frame, still, resume = () => {}, motion = () => {} }) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let visible = false
  let frameId = null
  let disposed = false
  const animate = (time) => {
    frame(time)
    frameId = requestAnimationFrame(animate)
  }
  const sync = () => {
    if (disposed) return
    motion(preference.matches)
    const shouldRun = visible && !document.hidden && !preference.matches
    if (!shouldRun && frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
    if (shouldRun && frameId === null) {
      resume()
      frameId = requestAnimationFrame(animate)
    } else if (visible && !document.hidden && preference.matches) still()
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  observer.observe(element)
  preference.addEventListener('change', sync)
  document.addEventListener('visibilitychange', sync)
  motion(preference.matches)
  still()
  return () => {
    disposed = true
    if (frameId !== null) cancelAnimationFrame(frameId)
    observer.disconnect()
    preference.removeEventListener('change', sync)
    document.removeEventListener('visibilitychange', sync)
  }
}
