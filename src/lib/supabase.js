import { createClient } from '@supabase/supabase-js'

// Read from Vite env vars. Define these in your .env file.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase

if (!supabaseUrl || !supabaseAnonKey) {
  // Graceful fallback in dev when env vars are missing.
  console.warn('[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. Blog/Admin features are disabled.')
  supabase = {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      order: () => ({ select: async () => ({ data: [], error: null }) }),
      insert: async () => ({ error: { message: 'Supabase not configured' } }),
    }),
    auth: {
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_cb) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
