import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCanvasScheduler } from '../src/lib/canvasScheduler.js'

test('canvas pauses offscreen, in hidden tabs and for reduced motion; cleans up', () => {
  const preference = new EventTarget()
  preference.matches = false
  const page = new EventTarget()
  page.hidden = false
  globalThis.window = { matchMedia: () => preference }
  globalThis.document = page
  const callbacks = new Map()
  let nextId = 0
  globalThis.requestAnimationFrame = (callback) => { callbacks.set(++nextId, callback); return nextId }
  globalThis.cancelAnimationFrame = (id) => callbacks.delete(id)
  let visibility, disconnected = false, frames = 0, stills = 0, reduced
  globalThis.IntersectionObserver = class {
    constructor(callback) { visibility = callback }
    observe() {}
    disconnect() { disconnected = true }
  }
  const stop = createCanvasScheduler({}, { frame: () => { frames++ }, still: () => { stills++ }, motion: (value) => { reduced = value } })
  assert.equal(callbacks.size, 0)
  visibility([{ isIntersecting: true }])
  assert.equal(callbacks.size, 1)
  const [id, callback] = [...callbacks][0]
  callbacks.delete(id)
  callback(100)
  assert.equal(frames, 1)
  visibility([{ isIntersecting: false }])
  assert.equal(callbacks.size, 0)
  visibility([{ isIntersecting: true }])
  page.hidden = true
  page.dispatchEvent(new Event('visibilitychange'))
  assert.equal(callbacks.size, 0)
  page.hidden = false
  page.dispatchEvent(new Event('visibilitychange'))
  assert.equal(callbacks.size, 1)
  preference.matches = true
  preference.dispatchEvent(new Event('change'))
  assert.equal(callbacks.size, 0)
  assert.equal(reduced, true)
  assert.ok(stills > 1)
  preference.matches = false
  preference.dispatchEvent(new Event('change'))
  assert.equal(callbacks.size, 1)
  stop()
  assert.equal(callbacks.size, 0)
  assert.equal(disconnected, true)
  page.dispatchEvent(new Event('visibilitychange'))
  preference.dispatchEvent(new Event('change'))
  assert.equal(callbacks.size, 0)
})
