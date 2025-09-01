import { ref, readonly } from 'vue'
import { supabase } from './supabase'

const sessionRef = ref(null)
const readyRef = ref(false)

// Auto-logout configuration: 15 minutes of inactivity
const AUTO_LOGOUT_MS = 15 * 60 * 1000
let inactivityTimer = null
let activityListenerAttached = false

const activityEvents = ['click', 'mousemove', 'keydown', 'touchstart', 'scroll']

function resetInactivityTimer() {
  if (typeof window === 'undefined') return
  clearInactivityTimer()
  // start fresh
  inactivityTimer = setTimeout(() => {
    // fire-and-forget sign out due to inactivity
    // use exported signOut so the same cleanup logic runs
    // ignore errors here
    // eslint-disable-next-line no-unused-vars
    signOut().catch(() => {})
  }, AUTO_LOGOUT_MS)
}

function clearInactivityTimer() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
    inactivityTimer = null
  }
  if (activityListenerAttached && typeof window !== 'undefined') {
    for (const ev of activityEvents) {
      window.removeEventListener(ev, resetInactivityTimer)
    }
    activityListenerAttached = false
  }
}

function attachActivityListeners() {
  if (activityListenerAttached || typeof window === 'undefined') return
  for (const ev of activityEvents) {
    window.addEventListener(ev, resetInactivityTimer, { passive: true })
  }
  activityListenerAttached = true
}

async function init() {
  try {
    const { data } = await supabase.auth.getSession()
    sessionRef.value = data?.session || null
  } catch (err) {
    // defensive: if getSession fails, leave session null but mark ready
    console.warn('Failed to initialize auth session:', err)
    sessionRef.value = null
  } finally {
    readyRef.value = true
  }

  // keep session in sync
  supabase.auth.onAuthStateChange((_event, newSession) => {
    sessionRef.value = newSession
    try {
      if (newSession) {
        // start auto-logout tracking
        attachActivityListeners()
        resetInactivityTimer()
      } else {
        // clear any timers/listeners when signed out
        clearInactivityTimer()
      }
    } catch (e) {
      // ignore
    }
  })
}

// initialize on first import
init()

export function useAuth() {
  return {
    session: readonly(sessionRef),
    ready: readonly(readyRef),
  }
}

export async function signOut() {
  try {
    // If there is no session locally, skip the server signOut call which will return
    // "Auth session missing!" and a 403 in some SDK/server states.
    if (!sessionRef.value) {
      console.info('signOut called but no local session exists; skipping server logout')
    } else {
      // Double-check with the SDK whether a server-side session exists before calling signOut.
      // This avoids a server 403 response like "Auth session missing!" when the client
      // still has a stale local session object but the server has no active session.
      try {
        const { data } = await supabase.auth.getSession()
        if (!data?.session) {
          console.info('No server session present; skipping server logout')
        } else {
          const { error } = await supabase.auth.signOut()
          if (error) {
            // suppress the common "Auth session missing!" message which leads to a 403
            const msg = (error?.message || '').toString()
            if (msg.includes('Auth session missing')) {
              console.info('Supabase signOut returned auth-missing; ignoring')
            } else {
              console.warn('Supabase signOut returned error:', msg)
            }
          }
        }
      } catch (err) {
        // network or SDK error while checking session; log and continue with local cleanup
        console.warn('Error while verifying server session for signOut:', err)
      }
    }
  } catch (err) {
    console.warn('Error while calling signOut:', err)
  } finally {
    // Always clear client-side session state so the UI isn't stuck.
    try {
      sessionRef.value = null
      // Best-effort: remove SDK token key from storage (may vary across SDK versions)
      localStorage.removeItem('supabase.auth.token')
      localStorage.removeItem('sb:token')
    } catch (e) {
      // ignore
    }
    // ensure inactivity timer and listeners are cleared on sign out
    try {
      clearInactivityTimer()
    } catch (e) {
      // ignore
    }
  }
}

