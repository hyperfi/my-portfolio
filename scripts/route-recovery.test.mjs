import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRouteRecovery, isRouteAssetError } from '../src/lib/routeRecovery.js'

function browser({ online = true, storageBlocked = false } = {}) {
  const entries = new Map()
  const visits = []
  const failures = []
  const options = {
    location: { origin: 'https://www.dr-abhishek.com', assign: href => visits.push(href) },
    getStorage: () => {
      if (storageBlocked) throw new Error('Storage disabled')
      return { getItem: key => entries.get(key), setItem: (key, value) => entries.set(key, value) }
    },
    isOnline: () => online,
    onFailure: issue => failures.push(issue),
    now: () => 1000
  }
  return { options, visits, failures }
}

const missingModule = new TypeError('Failed to fetch dynamically imported module: /assets/Research-old.js')

test('recognizes browser module failures and Vite CSS preload failures', () => {
  for (const message of [
    missingModule.message,
    'error loading dynamically imported module: /assets/Research-old.js',
    'Importing a module script failed.',
    'Unable to preload CSS for /assets/Research-old.css',
    'Loading chunk 12 failed.'
  ]) assert.equal(isRouteAssetError(new Error(message)), true, message)
  assert.equal(isRouteAssetError(new Error('Cannot read properties of undefined')), false)
})

test('opens the intended route including query/hash, once even after a fresh page load', () => {
  const b = browser()
  const route = { fullPath: '/research?year=2026#publications' }
  const recover = createRouteRecovery(b.options)
  recover(missingModule, route)
  recover(missingModule, route)
  assert.deepEqual(b.visits, [route.fullPath])
  // Simulate a new JS document with the same sessionStorage.
  createRouteRecovery(b.options)(missingModule, route)
  assert.equal(b.visits.length, 1)
  assert.deepEqual(b.failures, [{ href: route.fullPath, offline: false }])
  createRouteRecovery({ ...b.options, now: () => 61_000 })(missingModule, route)
  assert.equal(b.visits.length, 2)
})

test('offline or storage-blocked tabs offer a manual destination without reloading', () => {
  for (const setup of [{ online: false }, { storageBlocked: true }]) {
    const b = browser(setup)
    createRouteRecovery(b.options)(missingModule, { fullPath: '/hobbies' })
    assert.deepEqual(b.visits, [])
    assert.deepEqual(b.failures, [{ href: '/hobbies', offline: setup.online === false }])
  }
})

test('ordinary application errors do not cause automatic reloads or external redirects', () => {
  const b = browser()
  const recover = createRouteRecovery(b.options)
  recover(new Error('Application bug'), { fullPath: '/research' })
  assert.equal(b.visits.length, 0)
  assert.equal(b.failures.length, 1)
  recover(missingModule, { fullPath: '//example.com/research' })
  assert.equal(b.visits.length, 0)
  assert.equal(b.failures.length, 1)
})
