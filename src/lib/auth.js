import { ref, readonly } from 'vue'
import { supabase } from './supabase'

const sessionRef = ref(null)
const readyRef = ref(false)

async function init() {
  try {
    const { data } = await supabase.auth.getSession()
    sessionRef.value = data?.session || null
  } finally {
    readyRef.value = true
  }
  supabase.auth.onAuthStateChange((_event, newSession) => {
    sessionRef.value = newSession
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
  await supabase.auth.signOut()
}

